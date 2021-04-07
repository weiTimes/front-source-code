/*
 * @Author: yewei
 * @Date: 2021-03-22 18:03:47
 * @Last Modified by: yewei
 * @Last Modified time: 2021-03-25 22:53:19
 *
 * 设计一种请求池，支持传入最大并发数：
 *
 * function createRequest({ pool = 3 }) {}
 * const request = createRequest({ pool: 5 });
 * Array(10).fill(1).forEach(() => request('http://xxx'));
 */
// --- 按顺序发起请求，当所有请求完成后，将结果返回
function fetch2(url) {
  return new Promise(function (resolve, reject) {
    const req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onload = function () {
      if (req.status === 200) {
        resolve(req.responseText);
      } else {
        reject(new Error(req.status));
      }
    };
    req.onerror = function () {
      reject(new Error(req.responseText));
    };
    req.send();
  });
}

function promiseSequence(promises) {
  function recordValue(arr, val) {
    arr.push(val);

    return arr;
  }

  const pushValue = recordValue.bind(null, []);

  return promises.reduce((promise, cur) => {
    return promise
      .then(() => cur)
      .then(JSON.parse)
      .then(pushValue);
  }, Promise.resolve());
}

// --- Promisie.all 并行执行，当所有请求都执行完将结果数组返回
function proiseAll(promises) {
  return new Promise(function (resolve, reject) {
    const result = [];

    promises.forEach((promise, promiseIndex) => {
      promise
        .then((res) => {
          result[promiseIndex] = JSON.parse(res);

          if (promiseIndex === promises.length - 1) {
            resolve(result);
          }
        })
        .catch((e) => {
          reject(new Error(e));
        });
    });
  });
}

// 测试用例
// promiseSequence([
//   fetch2('http://localhost:3000/api/hello'),
//   fetch2('http://localhost:3000/api/info'),
// ])
//   .then((res) => {
//     console.log(res, '按顺序执行-sequence-res');
//   })
//   .catch((e) => console.log(e));

// 测试用例
// proiseAll([
//   fetch2('http://localhost:3000/api/hello'),
//   fetch2('http://localhost:3000/api/info'),
// ])
//   .then((res) => {
//     console.log(res, '并行执行-Promise.all-res');
//   })
//   .catch((e) => console.log(e));

// --- 可以控制并发数，最多有 maxNum 个请求，但是请求是一个个发的
function multiRequest(urls, maxNum) {
  if (!maxNum) return;

  const len = urls.length;
  const results = new Array(len).fill(false);
  let count = 0; // 已完成 成功 | 失败

  return new Promise((resolve, reject) => {
    // 最大并行请求数量
    while (count < maxNum) {
      request();
    }

    function request() {
      // 正在进行中的请求索引 先赋值，后自增
      let current = count++;

      // 所有请求结束
      if (current >= len) {
        !results.includes(false) && resolve(results);

        return;
      }

      const url = urls[current];

      fetch(url)
        .then(async (res) => {
          results[current] = await res.json();

          // 当前请求已结束，如果还有请求，进入下一次请求（递归调用）
          if (current < len) {
            request();
          }
        })
        .catch((err) => {
          results[current] = err;

          if (current < len) {
            request();
          }
        });
    }
  });
}

// 测试用例
multiRequest(
  [
    // 'https://v1.alapi.cn/api/mryw',
    // 'https://v1.alapi.cn/api/joke',
    // 'https://v1.alapi.cn/api/mingyan',
    'http://localhost:3000/api/hello',
    'http://localhost:3000/api/hello',
    'http://localhost:3000/api/hello',
    'http://localhost:3000/api/hello',
    'http://localhost:3000/api/hello',
    'http://localhost:3000/api/hello',
    'http://localhost:3000/api/hello',
    'http://localhost:3000/api/hello',
    'http://localhost:3000/api/hello',
    'http://localhost:3000/api/hello',
  ],
  2
).then((res) => {
  const logs = res.map((r) => r.data);

  // console.log(res, 'res-请发请求，带并发数-promise');
});

// --- 页面上有一个输入框，两个按钮，A按钮和B按钮，点击A或者B分别会发送一个异步请求，请求完成后，结果会显示在输入框中。
// 要求：用户随机点击A和B多次，要求输入框显示结果时，按照用户点击的顺序显示
const pInput = document.querySelector('.promise-input');
const pa = document.querySelector('.promise-a');
const pb = document.querySelector('.promise-b');

let promiseIns = Promise.resolve();

pa.onclick = function () {
  promiseIns = promiseIns.then(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
        pInput.value = '我是 A';
      }, 2000);
    });
  });
};
pb.onclick = function () {
  promiseIns = promiseIns.then(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
        pInput.value = '我是 B';
      }, 1000);
    });
  });
};

// 工具函数
const timeout = (ms) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

const ajax1 = () =>
  timeout(5000).then(() => {
    console.log('1');
    return 1;
  });

const ajax2 = () =>
  timeout(1000).then(() => {
    console.log('2');
    return 2;
  });

const ajax3 = () =>
  timeout(2000).then(() => {
    console.log('3');
    return 3;
  });

// --- 实现 mergePromise 函数，把传进去的函数数组按顺序先后执行，并且把返回的数据先后放到数组 data 中。
const mergePromise = (ajaxArray) => {
  // 在这里实现你的代码
  const result = [];

  return ajaxArray.reduce((promise, cur) => {
    return promise.then(cur).then((res) => {
      result.push(res);

      return result;
    });
  }, Promise.resolve());
};

// 测试用例
// mergePromise([ajax1, ajax2, ajax3]).then((data) => {
//   console.log(data, 'done'); // data 为 [1, 2, 3]
// });

// --- 实现并发地执行，按顺序输出
const mergePromise2 = async (ajaxArray) => {
  const promises = [];
  const res = [];

  // 并发执行
  ajaxArray.forEach((ajax) => {
    promises.push(ajax());
  });

  // 按顺序放入结果数组
  for (let r of promises) {
    res.push(await r);
  }

  return res;
};

// 测试用例
// mergePromise2([ajax1, ajax2, ajax3]).then((data) => {
//   console.log(data, '并发执行，按顺序输出结果');
// });

// --- 实现以下函数，可以批量请求数据，所有的 URL 地址在 urls 参数中，可以同时通过 max 参数控制请求的并发度，
// 当所有请求结束之后，需要执行 callback 回调函数，发送的请求使用 fetch
function sendRequest(urls, max, callback) {
  const len = urls.length;
  let count = 0;

  const result = new Array(len).fill(false);

  while (count < max && count < len) {
    request();
  }

  function request() {
    let current = count++;

    if (current >= len) {
      // current 当 current 大于请求数组的长度时，仍有可能有未响应的请求，未响应的请求对应的值是默认值 false
      // 即如果还有 false，就说明还有值为返回，不能将结果数组传给回调函数。
      !result.includes(false) && callback(result);
      return;
    }

    const url = urls[current];

    fetch(url)
      .then((res) => {
        result[current] = res;

        if (current < len) {
          request();
        }
      })
      .catch((e) => {
        result[current] = new Error('error');

        if (current < len) {
          request();
        }
      });
  }
}

// 测试用例
// sendRequest(
//   ['http://localhost:3000/api/hello', 'http://localhost:3000/api/info'],
//   3,
//   (res) => {
//     console.log(res, '我是并发数为3，请求完拿到结果的回调');
//   }
// );

// --- 设计一个并发请求池
function createRequest({ pool = 2 }) {
  const queue = []; // 并发池
  const waitQueue = []; // 等待队列，并发池满的情况下，放入等待队列
  const result = [];
  let index = 0;

  console.log('创建请求池');

  // 将请求推入请求池
  function setTask(url) {
    if (!url) return;

    const task = fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log('当前并发数', queue.length);

        result[index++] = res;
        queue.splice(queue.indexOf(task), 1);

        if (waitQueue.length > 0) {
          setTask(waitQueue.shift());
        } else {
          console.log(result, 'res');
        }
      });

    queue.push(task);
  }

  function request(url) {
    if (queue.length < pool) {
      // 推入并发池
      setTask(url);
    } else {
      waitQueue.push(url);
    }
  }

  return request;
}

// --- 测试用例
const request = createRequest({ pool: 3 }); // 创建并发数为 3 的请求池
new Array(10).fill(1).forEach(() => request('http://localhost:3000/api/hello'));

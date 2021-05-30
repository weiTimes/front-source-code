/*
 * @Author: yewei
 * @Date: 2021-05-27 23:40:29
 * @Last Modified by: yewei
 * @Last Modified time: 2021-05-28 08:37:09
 *
 * 实现 mergePromise 函数，把传进去的数组顺序先后执行，并且把返回的数据先后放到数组 data 中
 */
const timeout = (ms) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

const ajax1 = () =>
  timeout(2000).then(() => {
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

// 解法一：使用 reduce
const mergePromise = (ajaxArray) => {
  // 在这里实现你的代码
  return new Promise((resolve, reject) => {
    const result = [];

    ajaxArray.reduce((promise, ajax) => {
      return promise
        .then(() => ajax())
        .then((res) => {
          result.push(res);

          if (result.length === ajaxArray.length) {
            resolve(result);
          }
        });
    }, Promise.resolve());
  });
};

// 解法二，for...of
const mergePromise2 = (ajaxArray) => {
  // 在这里实现你的代码
  let promise = Promise.resolve();
  let result = [];

  return new Promise((resolve, reject) => {
    for (const ajax of ajaxArray) {
      promise = promise
        .then(() => ajax())
        .then((res) => {
          result.push(res);

          if (result.length === ajaxArray.length) {
            resolve(result);
          }
        });
    }
  });
};

// 题意是串行，这里使用并行请求试试
const mergePromise3 = (ajaxs) => {
  const result = [];

  return new Promise((resolve, reject) => {
    ajaxs.forEach((ajax, index) => {
      ajax().then((res) => {
        result[index] = res;

        if (index === ajaxs.length - 1) {
          resolve(result);
        }
      });
    });
  });
};

mergePromise2([ajax1, ajax2, ajax3]).then((data) => {
  console.log('done');
  console.log(data); // data 为 [1, 2, 3]
});

/*
 * @Author: yewei
 * @Date: 2021-03-23 21:48:39
 * @Last Modified by: yewei
 * @Last Modified time: 2021-03-23 23:24:07
 *
 * 使用 Promise.race 和 delay 取消 XHR 请求
 */
// 定义一个继承自 Error 的类
function copyOwnFrom(target, source) {
  Object.getOwnPropertyNames(source).forEach(function (propName) {
    Object.defineProperty(
      target,
      propName,
      Object.getOwnPropertyDescriptor(source, propName)
    );
  });

  return target;
}
function TimeoutError() {
  // 借用构造函数实现属性继承
  const superInstance = Error.apply(null, arguments);

  // 将 Error 身上的属性及描述完整地拷贝到 TimeoutError 的实例上
  copyOwnFrom(this, superInstance);
}
// 原型继承
TimeoutError.prototype = Object.create(Error.prototype);
TimeoutError.prototype.constructor = TimeoutError;

// 超时器
function delayPromise(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, ms);
  });
}

// 带取消请求的方法
function cancelableXHR(url) {
  const req = new XMLHttpRequest();

  const promise = new Promise(function (resolve, reject) {
    req.open('GET', url, true);
    req.onload = function () {
      if (req.status === 200) {
        resolve(req.responseText);
      } else {
        reject(new Error(req.statusText));
      }
    };
    req.onerror = function () {
      reject(new Error(req.statusText));
    };
    req.onabort = function () {
      console.log('request canceled...');

      reject(new Error('abort this request'));
    };
    req.send();
  });

  const abort = function () {
    // 如果 request 还没结束就执行 abort
    if (req.readyState !== XMLHttpRequest.UNSENT) {
      console.log('canceling...');

      req.abort();
    }
  };

  return {
    promise,
    abort,
  };
}

function timeoutPromise(promise, ms) {
  const timeout = delayPromise(ms).then(() => {
    return Promise.reject(new TimeoutError('超时发生在' + ms + 'ms'));
  });

  // promise 和超时器是竞争关系，只要有一个先完成就进入 FulFilled 状态
  return Promise.race([promise, timeout]);
}

// 创建一个随机 2000 内到期的任务
const taskPromise = new Promise((resolve, reject) => {
  const delay = Math.random() * 2000;

  setTimeout(() => {
    resolve(delay + 'ms');
  }, delay);
});

const getHello = cancelableXHR('http://localhost:3000/api/hello');

// taskPromise 如果发生超时
// 如果超时先到期，则会走到 catch，判断抛出的错误是否是 TimeoutError 的实例，如果是，则取消当前请求
timeoutPromise(getHello.promise, 0)
  .then((res) => console.log(res, '在规定时间在内'))
  .catch((e) => {
    if (e instanceof TimeoutError) {
      getHello.abort();
      return console.log(e);
    }

    console.log('XHR Error: ', e);
  });

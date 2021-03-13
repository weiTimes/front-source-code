/*
 * @Author: yewei
 * @Date: 2021-03-08 23:32:21
 * @Last Modified by: yewei
 * @Last Modified time: 2021-03-08 23:38:38
 *
 * 将 nodejs 中的 api 转换成 promise 的写法
 * nodejs 12.18后支持 promisify: const fs = require('fs').promises;
 */
const promisify = (fn) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, (error, data) => {
        if (error) reject(error);

        resolve(data);
      });
    });
  };
};

// 将 nodejs 中所有 api 转换成 promise 的写法。
const promisifyAll = (target) => {
  Reflect.ownKeys(target).forEach((key) => {
    if (typeof key === 'function') {
      // // 默认会将原有的方法 全部增加一个 Async 后缀 变成 promise 写法
      target[`${key}Async`] = promisify(target[key]);
    }
  });

  return target;
};

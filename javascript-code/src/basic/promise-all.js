/*
 * @Author: yewei
 * @Date: 2021-08-13 11:43:15
 * @Last Modified by: yewei
 * @Last Modified time: 2021-08-13 15:01:59
 *
 * 实现Promise.all方法
 *
 * 1. 接收可迭代对象
 * 2. 判断可迭代对象是否为空，如果为空，直接返回Promise.resolve([])
 * 3. 当所有 Promise 完成时，resolve 一个结果数组
 * 4. 当其中有一个失败，立刻 reject
 */
const promiseAll = (iterators) => {
  return new Promise((resolve, reject) => {
    if (!iterators || iterators.length === 0) {
      return resolve([]);
    }

    let results = [];

    for (let i = 0; i < iterators.length; i++) {
      const item = iterators[i];

      // item 可能不是 Promise 对象，统一转换为 Promise 对象
      Promise.resolve(item)
        .then((res) => {
          results[i] = res; // 按顺序保存对应的结果

          // 当所有任务都执行完毕后，resolve一个结果数组
          if (results.length === iterators.length) {
            resolve(results);
          }
        })
        .catch((e) => {
          // 一旦有一个 Promise 失败，立刻 reject
          return reject(e);
        });
    }
  });
};

const timeout = (ms) =>
  new Promise((resolve, reject) => {
    if (!ms) {
      reject('未传入时间');
    } else {
      setTimeout(() => {
        resolve(ms);
      }, ms);
    }
  });

promiseAll([timeout(1000), timeout(2000), timeout(), timeout(3000)])
  .then((res) => {
    console.log(res, 'res');
  })
  .catch((e) => {
    console.log(e, 'e');
  });

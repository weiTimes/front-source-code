/*
 * @Author: yewei
 * @Date: 2021-08-13 14:32:15
 * @Last Modified by: yewei
 * @Last Modified time: 2021-08-13 14:41:46
 *
 * 实现 Promise.race
 *
 * 1. 接收一个可迭代对象
 * 2. 可迭代项统一使用 Promise.resolve 包装
 * 3. 如果没有传入则一直处于 pending 状态
 * 4. 迭代过程中一旦有个 Promise 对象 resolve 或 reject 就返回
 */
const promiseRace = (iterators) => {
  return new Promise((resolve, reject) => {
    if (iterators && iterators.length > 0) {
      for (const item of iterators) {
        Promise.resolve(item)
          .then((res) => {
            return resolve(res);
          })
          .catch((e) => {
            return reject(e);
          });
      }
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

promiseRace([timeout(4000), timeout(3000), timeout(2000)])
  .then((res) => console.log(res))
  .catch((e) => console.log(e));

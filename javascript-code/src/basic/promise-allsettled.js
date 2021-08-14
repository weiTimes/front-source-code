/*
 * @Author: yewei
 * @Date: 2021-08-13 14:51:05
 * @Last Modified by: yewei
 * @Last Modified time: 2021-08-13 15:09:16
 *
 * 实现 Promsie.allSettled()
 *
 * 当所有promise都完成（解决或拒绝 - fulfilled或rejected）时，resolve 结果数组，结果项包含成功或失败的对象；
 * 结果对象：{ status: 'fulfilled', value: {} } | { status: 'rejected', reason: {} }
 */
const promiseAllSettled = (promises) => {
  return new Promise((resolve, reject) => {
    if (!promises || promises.length === 0) {
      return resolve([]);
    }

    const results = [];

    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i];

      Promise.resolve(promise)
        .then((res) => {
          results[i] = { status: 'fulfilled', value: res };
        })
        .catch((e) => {
          results[i] = { status: 'rejected', reason: e };
        })
        .finally(() => {
          if (results.length === promises.length) {
            resolve(results);
          }
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

promiseAllSettled([
  timeout(1000),
  timeout(2000),
  timeout(3000),
  timeout(),
]).then((res) => console.log(res)); // [ { status: 'fulfilled', value: 1000 }, ... ]

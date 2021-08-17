/*
 * @Author: yewei
 * @Date: 2021-08-14 10:09:00
 * @Last Modified by: yewei
 * @Last Modified time: 2021-08-14 11:06:35
 *
 * 参照 async-pool
 * 并发控制的具体实现
 *
 * 实现中用到了 Promise.all 和 Promise.race
 */

// async-pool 使用示例
// const asyncPool = require('tiny-async-pool');

// const fn = async () => {
//   const timeout = (i) =>
//     new Promise((resolve) => setTimeout(() => resolve(i), i));
//   return await asyncPool(2, [1000, 5000, 3000, 2000], timeout);
// };

// fn().then((res) => console.log(res)); // [1000, 5000, 3000, 2000]

/**
 * 实现一： es7 实现
 *
 * @param {*} poolLimit 任务池最大并发数
 * @param {*} array 任务队列
 * @param {*} iteratorFn 任务执行函数
 */
// async function asyncPool(poolLimit, array, iteratorFn) {
//   const ret = []; // 所有的异步任务
//   const executing = []; // 正在执行的任务

//   for (const item of array) {
//     // 创建异步任务
//     const promise = Promise.resolve().then(() => iteratorFn(item, array));

//     ret.push(promise);

//     // 只有并发数小于总任务数才进行并发控制
//     if (poolLimit < array) {
//       // 任务完成后将该任务从任务池中删除
//       const finishPromise = promise.then(() =>
//         executing.splice(executing.indexOf(finishPromise), 1)
//       );

//       executing.push(finishPromise);

//       if (executing.length >= poolLimit) {
//         await Promise.race(executing); // 等待较快的任务完成
//       }
//     }
//   }

//   return Promise.all(ret);
// }

/**
 * 实现二：es6 实现
 *
 * @param {*} poolLimit 任务池最大并发数
 * @param {*} array 任务队列
 * @param {*} iteratorFn 任务执行函数
 */
function asyncPool(poolLimit, array, iteratorFn) {
  let i = 0;
  const ret = []; // 所有任务
  const executing = []; // 正在执行的任务

  const enqueue = () => {
    if (i === array.length) {
      return Promise.resolve();
    }

    const item = array[i++]; // 当前任务
    const promise = Promise.resolve().then(() => iteratorFn(item, array)); // 创建异步任务

    ret.push(promise);

    const resolved = Promise.resolve();

    // 如果最大并发数小于总任务数才进行并发控制
    if (poolLimit < array) {
      // 当当前任务完成后将该任务从任务池中删除
      const finishPromise = promise.then(() =>
        executing.splice(executing.indexOf(finishPromise), 1)
      );

      // 推入正在执行的任务队列
      executing.push(finishPromise);

      // 如果正在执行的任务数大于最大并发数，则等待较快的任务完成
      if (executing.length >= poolLimit) {
        resolved = Promise.race(executing);
      }
    }

    // 并发任务池未满，直接进入下一个任务；满了则等待其中一个任务完成
    return resolved.then(() => enqueue());
  };

  return enqueue().then(() => Promise.all(ret));
}

const timeout = (i) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve(i);
    }, i)
  );

asyncPool(2, [1000, 5000, 3000, 2000], timeout).then((res) => console.log(res));

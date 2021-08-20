/*
 * @Author: yewei
 * @Date: 2021-08-14 15:39:09
 * @Last Modified by: yewei
 * @Last Modified time: 2021-08-20 16:44:50
 *
 * Promise 完整版实现
 * 符合 Promise/A+ 规范
 */
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class SuperPromise {
  status = PENDING;
  value = null;
  reason = null;
  onResolvedCallbacks = [];
  onRejectedCallback = [];

  static resolve(value) {
    return new SuperPromise((resolve, reject) => {
      if (value instanceof SuperPromise) {
        // 如果是 Promise 对象，则继续等待
        return value.then(resolve, reject);
      }

      resolve(value);
    });
  }

  static reject(reason) {
    return new SuperPromise((resolve, reject) => {
      reject(reason);
    });
  }

  static resolvePromise(promise, value, resolve, reject) {
    // value 为 Promise 对象
    if (value instanceof SuperPromise) {
      if (value === promise) {
        // 循环引用，抛出异常
        return reject(new TypeError('Cannot resolve promise with self'));
      } else {
        // 等 promise 执行完继续执行 resolvePromise
        value.then((val) => {
          SuperPromise.resolvePromise(promise, val, resolve, reject);
        }, reject);
      }
    } else {
      // 普通值
      resolve(value);
    }
  }

  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      // 捕获到错误 reject
      this.reject(error);
    }
  }

  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      this.onResolvedCallbacks.forEach((callback) => callback());
    }
  };

  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      this.onRejectedCallback.forEach((callback) => callback());
    }
  };

  then = (onFulfilled, onRjected) => {
    // 如果传入的不是函数，则构造一个返回传入参数的函数
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRjected =
      typeof onRjected === 'function' ? onRjected : (reason) => reason;

    const newPromise = new SuperPromise((resolve, reject) => {
      switch (this.status) {
        case PENDING:
          if (this.status === PENDING) {
            // 使用 try...catch 捕获错误
            this.onResolvedCallbacks.push(() => {
              setTimeout(() => {
                try {
                  const value = onFulfilled(this.value);

                  SuperPromise.resolvePromise(
                    newPromise,
                    value,
                    resolve,
                    reject
                  );
                } catch (error) {
                  reject(error);
                }
              }, 0);
            });
            this.onRejectedCallback.push(() => {
              setTimeout(() => {
                try {
                  const value = onRjected(this.reason);

                  SuperPromise.resolvePromise(
                    newPromise,
                    value,
                    resolve,
                    reject
                  );
                } catch (error) {
                  reject(error);
                }
              }, 0);
            });
          }
          break;
        case FULFILLED:
          setTimeout(() => {
            try {
              const value = onFulfilled(this.value);

              SuperPromise.resolvePromise(newPromise, value, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
          break;
        case REJECTED:
          setTimeout(() => {
            try {
              const value = onRjected(this.reason);

              SuperPromise.resolvePromise(newPromise, value, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
          break;
      }
    });

    return newPromise;
  };

  catch = (callback) => {
    return this.then(null, callback);
  };

  finally = (callback) => {
    return this.then(
      (value) => {
        return SuperPromise.resolve(callback()).then(() => value);
      },
      (reason) => {
        return SuperPromise.resolve(callback()).then(() => {
          throw reason;
        });
      }
    );
  };
}

SuperPromise.defer = SuperPromise.deferred = function () {
  let dfd = {};
  dfd.promise = new SuperPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

const promise1 = new SuperPromise((resolve, reject) => {
  fetch('http://localhost:3300/user/info', { method: 'POST' }).then(
    async (res) => {
      const data = await res.json();
      reject(data);
    }
  );
}).then(
  () => {},
  (err) => {
    console.log(err, 'err');
  }
);

SuperPromise.resolve(456)
  .finally(() => {
    return new SuperPromise((resolve, reject) => {
      setTimeout(() => {
        resolve(123);
      }, 3000);
    });
  })
  .then((data) => {
    console.log(data, 'success');
  })
  .catch((err) => {
    console.log(err, 'error');
  });

// const promise2 = new SuperPromise((resolve, reject) => {
//   fetch('http://localhost:3300/roles', { method: 'POST' }).then(async (res) => {
//     const data = await res.json();
//     resolve(data);
//   });
// })
//   .then((res) => {
//     console.log(res, 'promise2-res');
//   })
//   .then(3)
//   .then((res) => {
//     console.log(res, 'promise2-res2');
//   });

// module.exports = SuperPromise;

/*
 * @Author: yewei
 * @Date: 2021-03-08 00:12:29
 * @Last Modified by: yewei
 * @Last Modified time: 2021-03-09 19:17:12
 *
 * Promise 源码实现，符合 Promise/A+ 规范
 *
 * https://mp.weixin.qq.com/s/yXOstYUDXldXJ4M-38q1xg
 */
class Container {
  state = undefined;
  value = undefined;
  reason = undefined;
  onResolvedCallbacks = [];
  onRejectedCallbacks = [];

  constructor(executor) {
    try {
      this.state = Container.PENDING;
      executor(this.resolved, this.rejected);
    } catch (error) {
      this.rejected(error);
    }
  }

  resolved = (value) => {
    if (this.state !== Container.PENDING) return;

    this.state = Container.FULFILLED;
    this.value = value;
    this.onResolvedCallbacks.forEach((callback) => callback());
  };

  rejected = (reason) => {
    if (this.state !== Container.PENDING) return;

    this.state = Container.REJECTED;
    this.reason = reason;
    this.onRejectedCallbacks.forEach((callback) => callback());
  };

  then(onResolved, onRejected) {
    // 解决没有传参，或传递的参数不合法的问题
    onResolved =
      typeof onResolved === 'function' ? onResolved : (value) => value;
    // 抛出异常，后面 then 执行时 onRejected 就能捕获到了
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason;
          };

    // 每次 then 都会返回一个新的 Promise
    const newPromise = new Container((resolve, reject) => {
      switch (this.state) {
        case Container.PENDING:
          // 处理异步，将成功和失败回调都先暂存到数组中。
          // 发布订阅模式：收集依赖 => 触发通知 => 执行依赖
          this.onResolvedCallbacks.push(() => {
            setTimeout(() => {
              try {
                const value = onResolved(this.value); // 成功回调的返回值，可能是 Promise

                resolveContainer(newPromise, value, resolve, reject);
              } catch (error) {
                reject(error);
              }
            });
          });
          this.onRejectedCallbacks.push(() => {
            settimeout(() => {
              try {
                const value = onRejected(this.reason);

                resolveContainer(newPromise, value, resolve, reject);
              } catch (error) {
                // 捕获到抛出的异常
                reject(error);
              }
            });
          });
          break;
        case Container.FULFILLED:
          setTimeout(() => {
            try {
              const value = onResolved(this.value);

              resolveContainer(newPromise, value, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
          break;
        case Container.REJECTED:
          setTimeout(() => {
            try {
              const value = onResolved(this.reason);

              resolveContainer(newPromise, value, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
          break;
        default:
          break;
      }
    });

    return newPromise;
  }
}

Container.PENDING = 'pending';
Container.FULFILLED = 'fulfilled';
Container.REJECTED = 'rejected';

function resolveContainer(newPromise, value, resolve, reject) {
  if (value instanceof Container) {
    // 是一个 Promise
    if (value !== newPromise) {
      // 不是同一个对象，防止循环引用
      value.then(resolve, reject);
    } else {
      // 循环引用，抛出异常
      reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    }
  } else {
    // 不是 Promise
    resolve(value);
  }
}

const promise = new Container(function (resolve, reject) {
  setTimeout(() => {
    resolve('hello');
  }, 2000);
})
  .then(
    (value) => {
      console.log(value, 'resolve');
      return 'world';
    },
    (reason) => {
      console.log(reason, 'reject');
    }
  )
  .then(
    (value2) => {
      console.log(value2, 'resolve2');
    },
    (reason2) => {
      console.log(reason2, 'reject2');
    }
  );

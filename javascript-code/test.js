const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  state = PENDING;
  value = '';
  reason = '';
  onResolvedCallbacks = [];
  onRejectedCallbacks = [];

  constructor(executor) {
    executor(this.resolve, this.reject);
  }

  resolve = (value) => {
    if (this.state === PENDING) {
      this.state = FULFILLED;
      this.value = value;

      while (this.onResolvedCallbacks.length > 0) {
        this.onResolvedCallbacks.shift()(this.value);
      }
    }
  };

  reject = (reason) => {
    if (this.state === PENDING) {
      this.state = REJECTED;
      this.reason = reason;

      while (this.onRejectedCallbacks.length > 0) {
        this.onRejectedCallbacks.shift()(this.reason);
      }
    }
  };

  then = (onResolved, onRejected) => {
    const promise = new MyPromise((resolve, reject) => {
      if (this.state === FULFILLED) {
        setTimeout(() => {
          const res = onResolved(this.value);

          resolvePromise(promise, res, resolve, reject);
        }, 0);
      } else if (this.state === REJECTED) {
        onRejected(this.reason);
      } else if (this.state === PENDING) {
        this.onResolvedCallbacks.push(onResolved);
        this.onRejectedCallbacks.push(onRejected);
      }
    });

    return promise;
  };
}

function resolvePromise(promise, res, resolve, reject) {
  if (promise === res) {
    return reject(new TypeError('Chaning cycle detected for promise'));
  }

  if (res instanceof MyPromise) {
    res.then(resolve, reject);
  } else {
    resolve(res);
  }
}

const promsie = new MyPromise(function (resolve, reject) {
  resolve('hello');
  // setTimeout(function () {
  //   resolve('hello');
  //   reject('error');
  // }, 2000);
});

const p1 = promsie.then(
  function (value) {
    console.log(value, 'value');

    return new MyPromise((resolve, reject) => {
      resolve('other');
    });
  },
  function (reason) {
    console.log(reason, 'reason');
  }
);

p1.then(
  (value) => {
    console.log(value, 'o');
  },
  (reason) => {
    console.log(reason, 'error');
  }
);

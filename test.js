class Container {
  state = undefined;
  value = undefined;
  reason = undefined;
  onResolvedCallbacks = [];
  onRejectedCallbacks = [];

  constructor(executor) {
    this.state = Container.PENDING;
    executor(this.resolve, this.rejected);
  }

  resolve = (value) => {
    if (this.state !== Container.PENDING) return;

    this.value = value;
    this.state = Container.FULFILLED;
  };
  rejected = (reason) => {
    if (this.state !== Container.PENDING) return;

    this.reason = reason;
    this.state = Container.REJECTED;
  };

  then = (onResolved, onRejected) => {
    switch (this.state) {
      case Container.PENDING:
        break;
      case Container.FULFILLED:
        onResolved(this.value);
        break;
      case Container.REJECTED:
        onRejected(this.reason);
        break;

      default:
        break;
    }
  };
}

Container.PENDING = 'pending';
Container.FULFILLED = 'fulfilled';
Container.REJECTED = 'rejected';

const promise = new Container(function (resolve, reject) {
  resolve('hello');
}).then(
  (value) => {
    console.log(value);
  },
  (reason) => {
    console.log(reason);
  }
);

function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (error, result) => {
        if (error) reject(error);

        resolve(result);
      });
    });
  };
}

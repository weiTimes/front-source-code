const { SyncHook, AsyncSeriesHook } = require('tapable');

const hook = new SyncHook(['h', 'e', 'l']);

// 注册一个简单的事件
hook.tap('myhook', (a, b, c) => {
  console.log(a, b, c);
});

// 触发事件
hook.call(1, 2, 3);

console.time('cost');

class Car {
  constructor() {
    this.hooks = {
      acclerate: new SyncHook(['newspped']), // 加速
      brake: new SyncHook(), // 刹车
      calculateRoutes: new AsyncSeriesHook(['source', 'target', 'routes']), // 计算路径
    };
  }
}

const myCar = new Car();

// 绑定同步钩子
myCar.hooks.brake.tap('WarningLmapPlugin', () => {
  console.log('WarningLmapPlugin');
});

// 绑定同步钩子并传参
myCar.hooks.acclerate.tap('LoggerPlugin', (newSpeed) => {
  console.log(`accelerating spped to ${newSpeed}`);
});

// 绑定一个异步的 promise
myCar.hooks.calculateRoutes.tapPromise(
  'calculateRoutes tabPromise',
  (params) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`tapPromise to ${params}`);
        resolve();
      }, 1000);
    })
);

// 触发同步钩子
myCar.hooks.brake.call();
// 触发同步钩子并传入参数
myCar.hooks.acclerate.call(120);
// 触发异步钩子
myCar.hooks.calculateRoutes
  .promise(['Async', 'hook', 'demo'])
  .then(() => {
    console.timeEnd('cost');
  })
  .catch((err) => {
    console.error(err);
    console.timeEnd('cost');
  });

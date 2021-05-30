/*
 * @Author: yewei
 * @Date: 2021-05-30 11:29:58
 * @Last Modified by: yewei
 * @Last Modified time: 2021-05-30 12:01:59
 *
 * 模拟 webpack 插件运行机制
 * Compiler 对象，挂载了一些 hook
 */
const { SyncHook, AsyncSeriesHook } = require('tapable');

module.exports = class Compiler {
  constructor() {
    this.hooks = {
      acclerate: new SyncHook(['newspped']),
      brake: new SyncHook(),
      calculateRoutes: new AsyncSeriesHook(['source', 'target', 'routesList']),
    };
  }

  run() {
    this.acclerate(100);
    this.brake();
    this.calculateRoutes('Async', 'hook', 'demo');
  }

  acclerate(speed) {
    this.hooks.acclerate.call(speed);
  }

  brake() {
    this.hooks.brake.call();
  }

  calculateRoutes(...params) {
    this.hooks.calculateRoutes.promise(...params).then(
      () => {},
      (err) => {
        console.log(err);
      }
    );
  }
};

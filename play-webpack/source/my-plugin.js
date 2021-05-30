/*
 * @Author: yewei
 * @Date: 2021-05-30 11:49:04
 * @Last Modified by: yewei
 * @Last Modified time: 2021-05-30 12:05:23
 *
 * webpack 插件，根据传入的 compiler 对象，选择性监听了一些 hook
 */
const Compiler = require('./compiler');

class MyPlugin {
  apply(compiler) {
    // 绑定事件
    compiler.hooks.acclerate.tap('打印速度', (newSpeed) =>
      console.log(`speed acclerating to ${newSpeed}`)
    );
    compiler.hooks.brake.tap('刹车警告', () => console.log('正在刹车'));
    compiler.hooks.calculateRoutes.tapPromise(
      '计算路径',
      (source, target, routesList) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log(`计算路径: ${source} ${target} ${routesList}`);
            resolve();
          }, 1000);
        })
    );
  }
}

// 模拟插件执行
const compiler = new Compiler();
const myPlugin = new MyPlugin();

// 模拟 webpack.config.js 的 plugins 配置
const options = { plugins: [myPlugin] };

for (const plugin of options.plugins) {
  if (typeof plugin === 'function') {
    plugin.call(compiler, compiler);
  } else {
    plugin.apply(compiler); // 绑定事件
  }
}

compiler.run(); // 触发事件

module.exports = class MyPlugin {
  constructor(options) {
    console.log(options);
  }

  apply(compiler) {
    console.log('执行 my-plugin');
  }
};

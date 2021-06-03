const loaderUtils = require('loader-utils');

module.exports = function (source) {
  console.log('loader a is running');

  // 匹配出符合规则的文件名称，如这里会匹配到 index.js
  const filename = loaderUtils.interpolateName(this, '[name].[ext]', source);

  //   this.emitFile('demo.txt', '在 loader 中输出文件。');

  this.emitFile(filename, source);

  return source;
};

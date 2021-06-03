const loaderUtils = require('loader-utils');
const fs = require('fs');
const path = require('path');

module.exports = function rawLoader(source) {
  const { name } = loaderUtils.getOptions(this);
  const callback = this.async();

  console.log(name, 'name');

  this.cacheable(false);

  const str = JSON.stringify(source)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029'); // 模板字符串存在安全问题，这里对模板字符串进行转义处理

  fs.readFile(
    path.join(__dirname, '../src/async.txt'),
    'utf-8',
    (err, data) => {
      if (err) {
        callback(err, '');
      }
      callback(null, data);
    }
  );

  //   return `export default ${str}`; // 将文件内容转换成模块

  //   this.callback(new Error('yw'), str, 2);
  //   this.callback(null, str, 2);
};

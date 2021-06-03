module.exports = function rawLoader(source) {
  const str = JSON.stringify(source)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029'); // 模板字符串存在安全问题，这里对模板字符串进行转义处理

  return `export default ${str}`; // 将文件内容转换成模块
};

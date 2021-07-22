const loaderUtils = require('loader-utils');

module.exports = function (source) {
  console.log('html-loader 开始解析 html: ');

  const { origin, target } = loaderUtils.getOptions(this);

  const startTagReg = new RegExp(`<${origin}`, 'g');
  const endTagReg = new RegExp(`</${origin}`, 'g');

  const code = source
    .replace(startTagReg, `<${target}`)
    .replace(endTagReg, `</${target}`);

  return code;
};

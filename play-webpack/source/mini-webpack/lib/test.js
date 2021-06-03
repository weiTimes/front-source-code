const path = require('path');
const { getAST, getDependencies, transform } = require('./parser.js');

const ast = getAST(path.join(__dirname, '../src/index.js'));
const dependencies = getDependencies(ast);
const code = transform(ast);

console.log(dependencies);
console.log(code);

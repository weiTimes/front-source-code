/*
 * @Author: yewei
 * @Date: 2021-06-02 21:09:06
 * @Last Modified by: yewei
 * @Last Modified time: 2021-06-03 13:26:57
 *
 * 1. 将代码转换成 AST，然后将 AST 最终转换成 es5
 * 2. 分析依赖
 */
const fs = require('fs');
// const traverse = require('babel-traverse').default;
const { parse, transformFromAstSync, traverse } = require('@babel/core');

module.exports = {
  // es5 -> AST
  getAST: (path) => {
    const source = fs.readFileSync(path, 'utf-8');

    return parse(source, {
      sourceType: 'module',
    });
  },
  // 获取依赖
  getDependencies: (ast) => {
    const dependencies = [];

    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencies.push(node.source.value);
      },
    });

    return dependencies;
  },
  transform: (ast) => {
    const res = transformFromAstSync(ast, null, {
      presets: ['@babel/preset-env'],
    });

    return res.code;
  },
};

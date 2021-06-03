/*
 * @Author: yewei
 * @Date: 2021-06-02 21:09:49
 * @Last Modified by: yewei
 * @Last Modified time: 2021-06-03 13:24:32
 *
 * 实现模块的构建和资源的输出
 */
const fs = require('fs');
const path = require('path');
const { getAST, getDependencies, transform } = require('./parser.js');

module.exports = class Compiler {
  constructor(options) {
    const { entry, output } = options;

    this.entry = entry;
    this.output = output;
    this.modules = [];
  }

  run() {
    const entryModule = this.buildModule(this.entry, true);

    this.modules.push(entryModule);

    for (const module of this.modules) {
      for (const dependence of module.dependencies) {
        this.modules.push(this.buildModule(dependence));
      }
    }

    this.emitFiles();
  }

  /**
   * 构建模块
   * @param {*} path 构建模块的路径
   * @param {*} isEntry 是否是入口
   */
  buildModule(modulePath, isEntry) {
    let ast;

    if (isEntry) {
      ast = getAST(modulePath);
    } else {
      const absolutePath = path.join(process.cwd(), './src', modulePath);

      ast = getAST(absolutePath);
    }

    return {
      modulePath, // 模块路径作为模块名称
      dependencies: getDependencies(ast),
      source: transform(ast),
    };
  }

  // 输出文件
  emitFiles() {
    const outputPath = path.join(this.output.path, this.output.filename);
    let modules = '';

    for (const module of this.modules) {
      modules += `'${module.modulePath}': function(require, module, exports) { ${module.source} },`;
    }

    const bundle = `(function(modules) {
        function require(modulePath) {
            var fn = modules[modulePath];
            var module = { exports: {} };

            fn(require, module, module.exports);

            return module.exports;
        }

        require( '${this.entry}' );
    })({${modules}})`;

    fs.writeFileSync(outputPath, bundle, 'utf-8');

    console.log('输出成功~');
  }
};

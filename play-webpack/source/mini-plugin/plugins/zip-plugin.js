const JSZip = require('jszip');
const path = require('path');
const { Compilation, sources } = require('webpack');

module.exports = class ZipPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const { filename } = this.options;

    compiler.hooks.compilation.tap('ZipPlugin', (compilation) => {
      compilation.hooks.processAssets.tapPromise(
        {
          name: 'ZipPlugin',
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        (assets) => {
          return new Promise((resolve, reject) => {
            const zip = new JSZip();

            // 创建压缩包
            const folder = zip.folder(filename);

            Object.entries(assets).forEach(([fname, source]) => {
              // 将打包好的资源文件添加到压缩包中
              folder.file(fname, source.source());
            });

            zip.generateAsync({ type: 'nodebuffer' }).then(function (content) {
              // /Users/yewei/Project/source-code-realize/play-webpack/source/mini-plugin/dist/ywhoo.zip
              const outputPath = path.join(
                compilation.options.output.path,
                `${filename}.zip`
              );

              // 相对路径 ywhoo.zip
              const relativeOutputPath = path.relative(
                compilation.options.output.path,
                outputPath
              );

              // 将 buffer 转船 raw source
              // 将 zip 包添加到 compilation 的构建资源中
              compilation.emitAsset(
                relativeOutputPath,
                new sources.RawSource(content)
              );

              resolve();
            });
          }).catch((e) => {
            console.log(e, 'e');
          });
        }
      );
    });
  }
};

const path = require('path');
const Spritesmith = require('spritesmith');
const fs = require('fs');

module.exports = function (source) {
  const callback = this.async();
  const regex = /url\((\S*)\?__sprite\S*\)/g;

  let imgs = source.match(regex); // [ "url('./images/girl.jpg?__sprite", "url('./images/glasses.jpg?__sprite" ]

  imgs = imgs.map((img) => {
    const imgPath = img.match(/\/(images\/\S*)\?/)[1];

    return path.join(__dirname, '../src', imgPath);
  });

  Spritesmith.run({ src: imgs }, function handleResult(err, result) {
    // 将生成的图片写入 dist/sprites.jpg
    // 在 webpack 中，应该使用 emitFile 来写入文件
    fs.writeFileSync(
      path.join(process.cwd(), 'dist/sprites.jpg'),
      result.image
    );

    const code = source.replace(regex, (match) => "url('./sprites.jpg')");

    // 输出 index.css
    fs.writeFileSync(path.join(process.cwd(), 'dist/index.css'), code);

    callback(null, code);
  });

  return source;
};

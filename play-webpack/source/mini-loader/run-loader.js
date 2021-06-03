const path = require('path');
const { runLoaders } = require('loader-runner');
const fs = require('fs');

runLoaders(
  {
    resource: path.join(__dirname, './src/info.txt'),
    loaders: [path.join(__dirname, './loaders/raw-loader.js')],
    context: { minimize: true },
    readResource: fs.readFile.bind(fs),
  },
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  }
);

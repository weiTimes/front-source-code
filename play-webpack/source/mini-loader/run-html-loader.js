const path = require('path');
const { runLoaders } = require('loader-runner');
const fs = require('fs');

runLoaders(
  {
    resource: path.join(__dirname, './src/index.html'),
    loaders: [
      {
        loader: path.join(__dirname, './loaders/html-loader.js'),
        options: {
          origin: 'h2',
          target: 'h4',
        },
      },
    ],
    context: { minimize: true },
    readResource: fs.readFile.bind(fs),
  },
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result, 'loader-runner is success.');
    }
  }
);

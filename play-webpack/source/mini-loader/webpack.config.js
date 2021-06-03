const path = require('path');

module.exports = {
  entry: {
    main: path.join(__dirname, './src/index.js'),
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },

  module: {
    rules: [
      {
        test: /\.js/,
        use: [
          path.join(__dirname, './loaders/loader-a.js'),
          path.join(__dirname, './loaders/loader-b.js'),
        ],
      },
    ],
  },
};

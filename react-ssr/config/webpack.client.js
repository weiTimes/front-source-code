const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    app: path.join(__dirname, '../client/index.tsx'),
  },
  output: {
    filename: 'assets/bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts(x)$/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
};

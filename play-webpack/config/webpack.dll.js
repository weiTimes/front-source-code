const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    library: ['react', 'react-dom'],
  },
  output: {
    filename: '[name]_[chunkhash].dll.js',
    path: path.resolve(__dirname, '../build/library'),
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      name: '[name]_[hash]',
      path: path.join(__dirname, '../build/library/[name].json'),
    }),
  ],
};

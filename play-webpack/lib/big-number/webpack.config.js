const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    'big-number': path.join(__dirname, './src/index.js'),
    'big-number.min': path.join(__dirname, './src/index.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    library: 'bigNumber',
    libraryTarget: 'umd',
    clean: true,
  },
  optimization: {
    //   minimize: false,
    minimizer: [
      new TerserWebpackPlugin({
        test: /\.min\.js$/i,
      }),
    ],
  },
};

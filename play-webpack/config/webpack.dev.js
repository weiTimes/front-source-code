const { merge } = require('webpack-merge');
// const webpack = require('webpack');
const path = require('path');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  // devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../public'),
    hot: true,
    historyApiFallback: true, // 首页会被用来替代任何 404 响应
    // open: false,
    quiet: true,
    port: 8083,
    // compress: false, // gzip
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer')],
              },
            },
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer')],
              },
            },
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
        ],
      },
    ],
  },
  // plugins: [new webpack.HotModuleReplacementPlugin()],
});

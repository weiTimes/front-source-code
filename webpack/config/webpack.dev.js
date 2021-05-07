const { merge } = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, '../public'),
    historyApiFallback: true, // 首页会被用来替代任何 404 响应
    hot: true,
    open: false,
    quiet: true,
    port: 8082,
    compress: true, // gzip
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  //   plugins: [new webpack.HotModuleReplacementPlugin()],
});

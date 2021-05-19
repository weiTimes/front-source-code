const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production', // production
  entry: {
    app: path.join(__dirname, '../src/app.jsx'),
  },
  // experiments: {
  //   outputModule: true,
  // },
  output: {
    filename: '[name]-server.js',
    path: path.resolve(__dirname, '../', 'dist'),
    clean: true,
    // globalObject: 'this',
    library: {
      type: 'umd',
    },
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
          MiniCssExtractPlugin.loader,
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
          MiniCssExtractPlugin.loader,
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    // new HtmlWebpackPlugin({
    //   chunks: ['app'],
    //   template: path.join(__dirname, '../', 'public/app.ejs'),
    // }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...'],
    // splitChunks: {
    //   cacheGroups: {
    //     commons: {
    //       test: /(react|react-dom)/,
    //       name: 'vendors',
    //       chunks: 'all',
    //     },
    //   },
    // },
  },
});

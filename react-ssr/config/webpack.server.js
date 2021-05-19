const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: {
    app: path.join(__dirname, '../server/app.tsx'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
  target: 'node',
  externals: [nodeExternals()],
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

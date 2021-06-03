const path = require('path');
const MyPlugin = require('./plugins/my-plugin');
const ZipPlugin = require('./plugins/zip-plugin');

module.exports = {
  entry: path.join(__dirname, './src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [
    new MyPlugin({ name: 'ywhoo' }),
    new ZipPlugin({ filename: 'ywhoo' }),
  ],
};

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/big-number.min.js');
} else {
  module.exports = require('./dist/big-number.js');
}

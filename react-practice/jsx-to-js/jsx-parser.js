module.exports = function () {
  return {
    manipulateOptions: function (opts, parserOpts) {
      parserOpts.plugins.push('jsx');
    },
  };
};

// const checkIsArray = (obj) => Array.isArray(obj);

// const checkIsArray = (obj) =>
//   Object.prototype.toString.call(obj) === '[object Array]';

const checkIsArray = (obj) => obj instanceof Array;

console.log(checkIsArray({}));

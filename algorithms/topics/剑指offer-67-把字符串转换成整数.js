/**
 *
 * 符号位
 * 长度为0，全部为空字符
 * 遇到非空字符退出循环
 * 边界判断
 * @param {*} str
 */
var strToInt = function (str) {
  var len = str.length;
  var sign = 1;
  var res = 0;
  var i = 0;

  if (len === 0) {
    return res;
  }

  while (str[i] === ' ') {
    i++;

    if (i === len) {
      return res;
    }
  }

  sign = str[i] === '-' ? -1 : 1;
  if (str[i] === '-' || str[i] === '+') {
    i++;
  }

  var bage = Math.pow(2, 31);

  while (i < len) {
    var cur = +str[i];

    if (str[i] < '0' || str[i] > '9') {
      break;
    }

    res = res * 10 + cur;

    if (res > bage || (res === bage && cur > 7)) {
      return sign === 1 ? bage - 1 : Math.pow(-2, 31);
    }

    i++;
  }

  return res * sign;
};

strToInt('  -0012a42');

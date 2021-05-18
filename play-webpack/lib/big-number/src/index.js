/*
 * @Author: yewei
 * @Date: 2021-05-18 11:12:47
 * @Last Modified by: yewei
 * @Last Modified time: 2021-05-18 11:26:41
 *
 * 大整数相加
 */

/**
 * 从个位开始加，注意进位
 *
 * @export
 * @param {*} a string
 * @param {*} b string
 */
export default function add(a, b) {
  let i = a.length - 1;
  let j = b.length - 1;
  let res = '';
  let carry = 0; // 进位

  while (i >= 0 || j >= 0) {
    let x = 0;
    let y = 0;
    let sum = 0;

    if (i >= 0) {
      x = +a[i];
      i -= 1;
    }

    if (j >= 0) {
      y = +b[j];
      j -= 1;
    }

    sum = x + y + carry;

    if (sum >= 10) {
      carry = 1;
      sum -= 10;
    } else {
      carry = 0;
    }

    res = sum + res;
  }

  if (carry) {
    res = carry + res;
  }

  return res;
}

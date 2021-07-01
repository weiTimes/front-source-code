/*
 * @Author: yewei
 * @Date: 2021-07-01 12:33:48
 * @Last Modified by: yewei
 * @Last Modified time: 2021-07-01 12:57:16
 *
 * 解法一：
 * 先计算阶乘，然后计算末尾 0 的数量，对结果进行取余，如果为 0，则能除尽，count+1
 */
var trailingZeroes = function (n) {
  let res = 1;

  for (let i = 1; i <= n; i++) {
    res *= i;
  }

  let count = 0;

  while (res % 10 === 0) {
    count += 1;
    res /= 10;
  }

  return count;
};

/**
 * 解法二
 * 判断 5 出现的次数即可，因为 5 总是可以和 2 进行配对，凑成一个 10
 * 这个方法会造成堆栈溢出
 * @param {*} n
 * @returns
 */
const trailingZeroes2 = (n) => {
  let count = 0;

  for (let i = 1; i <= n; i++) {
    let cur = i;

    while (i % 5 === 0) {
      count += 1;
      cur /= 5;
    }
  }

  return count;
};

/**
 * 解法3，最优解
 * 1 * 5 ... 1 * 5 * 5 ... 2 * 5 * 5 ... 3 * 5 * 5
 * @param {*} n
 * @returns
 */
var trailingZeroes3 = function (n) {
  let count = 0;

  while (n > 0) {
    n = Math.floor(n / 5);
    count += n;
  }

  return count;
};

const res = trailingZeroes3(125); // (125/5) + (125/5/5) + (125/5/5/5) ->  25 + 5 + 1

console.log(res, 'res');

/**
 * 解法一：先排序，再取前 k 个数
 * 时间复杂度 O(nlgn)
 * @param {*} arr
 * @param {*} k
 * @returns
 */
var getLeastNumbers = function (arr, k) {
  if (!arr || k <= 0) return [];

  const len = arr.length;

  if (len <= k) return arr;

  arr.sort((a, b) => a - b);

  return arr.slice(0, k);
};

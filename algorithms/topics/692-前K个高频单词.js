/*
 * @Author: yewei
 * @Date: 2021-06-30 09:30:51
 * @Last Modified by: yewei
 * @Last Modified time: 2021-06-30 09:39:10
 */

/**
 * 解法一：
 * 先用哈希表存储字符串和次数的映射关系，然后对键值对进行降序排序，最后取前 k 个数
 * @param {*} words
 * @param {*} k
 * @returns
 */
var topKFrequent = function (words, k) {
  if (!words || k <= 0) return [];

  const map = new Map();

  for (let word of words) {
    const count = map.has(word) ? map.get(word) : 0;
    map.set(word, count + 1);
  }

  // Object.entries(Object.fromEntries(map))
  const res = [...map].sort((a, b) => {
    const compared = b[1] - a[1];

    if (compared === 0) {
      return a[0].localeCompare(b[0]);
    }

    return compared;
  });

  return res.slice(0, k).map((item) => item[0]);
};

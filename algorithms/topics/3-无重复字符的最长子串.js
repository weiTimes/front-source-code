/*
 * @Author: yewei
 * @Date: 2021-06-23 22:38:52
 * @Last Modified by: yewei
 * @Last Modified time: 2021-06-23 22:40:06
 */

/**
 * 解法1：暴力解法，两重循环
 * 优化：当字符串长度 - 左指针的长度小于最大长度时，终止循环
 * @param {*} s
 * @returns
 */
var lengthOfLongestSubstring = function (s) {
  if (!s) return 0;

  const len = s.length;
  let left = 0;
  let maxLength = 0;

  while (left < len && len - left > maxLength) {
    let right = left;

    while (right < len) {
      const str = s.slice(left, right + 1);

      if (right + 1 >= len || str.includes(s[right + 1])) {
        maxLength = Math.max(maxLength, right - left + 1);

        break;
      } else {
        right += 1;
      }
    }

    left += 1;
  }

  return maxLength;
};

console.log(lengthOfLongestSubstring(' '));

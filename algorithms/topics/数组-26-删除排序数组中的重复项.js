/*
 * @Author: yewei
 * @Date: 2020-12-05 10:52:16
 * @Last Modified by: yewei
 * @Last Modified time: 2021-02-26 12:46:45
 *
 *
 */

/**
 * 数组去重
 *
 *  双指针
 *  是一个排序好的数组，重复的元素一定相邻，实际上就是将不重复的元素移动到数组的左侧
 *  比较当前元素和前一个元素是否相等，如果不相等就将当前元素赋值到索引为前一个位置，两个指针均后移
 *
 *  优化
 *  如果一个数组中没有重复项，会将cur指针指向的元素原地赋值一遍，这是不必要的
 *  当cur - prev > 1时才进行赋值s
 * @param {*} nums
 */
var removeDuplicates = function (nums) {
  if (!nums || nums.length === 0) return 0;

  var prev = 0;
  var cur = 1;

  while (cur < nums.length) {
    if (nums[prev] !== nums[cur]) {
      if (cur - prev > 1) {
        nums[prev + 1] = nums[cur];
      }

      prev++;
    }

    cur++;
  }

  return prev + 1;
};

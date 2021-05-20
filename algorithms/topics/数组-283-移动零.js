/*
 * @Author: yewei
 * @Date: 2020-10-28 14:36:34
 * @Last Modified by: yewei
 * @Last Modified time: 2020-11-21 15:35:19
 *
 *  +1
 *  +1
 *  +1
 */

/**
 *  1. 两次遍历
 * @param {*} nums 
 * 
 *  我们创建两个指针i和j，第一次遍历的时候指针j用来记录当前有多少非0元素。即遍历的时候每遇到一个非0元素就将其往数组左边挪，第一次遍历完后，j指针的下标就指向了最后一个非0元素下标。
第二次遍历的时候，起始位置就从j开始到结束，将剩下的这段区域内的元素全部置为0。
 */
var moveZeroes = function (nums) {
  var j = 0;

  // 非零放入按顺序放入左边
  for (var i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[j++] = nums[i];
    }
  }

  // 剩余的放入0
  while (j < nums.length) {
    nums[j++] = 0;
  }
};

/**
 *  2.1 一次遍历
 *  时间最快
 * @param {*} nums
 */
var moveZeroes = function (nums) {
  var j = 0;

  for (var i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[j] = nums[i];
      if (i !== j) {
        nums[i] = 0;
      }
      j++;
    }
  }
};

/**
 *  2.2 一层遍历
 *  使用0作为中间点，左边的是不为0的数，右边的是为0的数
 * @param {*} nums
 */
var moveZeroes = function (nums) {
  if (!nums || nums.length === 0) return;

  var j = 0;

  for (var i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      var temp = nums[i];
      nums[i] = nums[j];
      nums[j++] = temp;
    }
  }
};

// moveZeroes([0, 1, 0, 3, 12]);

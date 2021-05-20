/**
 *  1. 暴力解法
 *  旋转k次，每次旋转一个元素
 * @param {} nums
 * @param {*} k
 */
var rotate = function (nums, k) {
  var temp;

  for (var i = 0; i < k; i++) {
    var prev = nums[nums.length - 1];
    for (var j = 0; j < nums.length; j++) {
      temp = nums[j];
      nums[j] = prev;
      prev = temp;
    }
  }
};

/**
 *  解法二
 *  用一个额外的数组存放移动后的数组，最后再将新数组的元素复制给原数组
 * @param {*} nums
 * @param {*} k
 */
var rotate = function (nums, k) {
  var newArray = [];

  for (var i = 0; i < nums.length; i++) {
    newArray[(i + k) % nums.length] = nums[i];
  }

  for (var j = 0; j < newArray.length; j++) {
    nums[j] = newArray[j];
  }
};

/**
 *  解法三，环状替代
 * @param {*} nums
 * @param {*} k
 */
var rotate = function (nums, k) {
  var len = nums.length;
  var count = 0; // 需要交换的次数，每个元素交换一次，n个元素就要交换n次
  k = k % len;

  // 循环终止提交为count === len;
  for (var start = 0; count < len; start++) {
    var cur = start; // 从0开始换位置
    var prev = nums[cur]; // 放到角落的值，在下次while循环中去抢别人的位置

    do {
      var next = (cur + k) % len; // 要替换的下一个位置
      var temp = nums[next]; // 被替换的值
      nums[next] = prev; // 替换成角落的值
      prev = temp; // 更新角落的值

      count++; // 新增一个完成替换的元素
      cur = next; // 更新当前指针
    } while (cur !== start); // 回到了初始位置，结束while循环，下一次for循环从start+1开始
  }
};

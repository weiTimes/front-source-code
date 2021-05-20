/**
 * @param {number[]} nums
 * @return {number[][]}
 *  1. 排序 + 双指针
 *  2. O(n^2)
 *
 *  难点在于如何去除重复解
 *  1. 特判，对于数组长度 n，如果数组为 null 或者数组长度小于 3，返回 []
 *  2. 对数组进行排序
 *  3. 遍历排序后数组
 */
var threeSum = function (nums) {
  var res = [];

  if (!nums || nums.length < 3) return res; // 边界判断

  nums.sort((a, b) => a - b); // 排序

  // 遍历排序好的数组
  for (var i = 0; i < nums.length; i++) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] === nums[i - 1]) continue; // 如果和上一个值相等，则跳过

    // 定义两个指针
    var l = i + 1;
    var r = nums.length - 1;

    // 相当于遍历i后面的值，找b, c
    while (l < r) {
      var sum = nums[i] + nums[l] + nums[r];

      if (sum === 0) {
        res.push([nums[i], nums[l], nums[r]]); // 找到推入结果数组

        while (l < r && nums[l] === nums[l + 1]) l++; // 如果遇到和左指针一样的值跳过，即指针右移
        while (l < r && nums[r] === nums[r - 1]) r--; // 如果遇到和右指针一样的值跳过，即指针左移

        // 当前两个指针的值都用过了，分别移动一个
        l++;
        r--;
      } else if (sum < 0) {
        //因为排好序所以可以这样移动，后面的判断条件也一样
        // 将值较小的右移
        l++;
      } else if (sum > 0) {
        // 将值叫大的左移
        r--;
      }
    }
  }

  return res;
};

// --哈希表

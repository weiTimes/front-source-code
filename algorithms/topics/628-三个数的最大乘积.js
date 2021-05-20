var maximumProduct = function (nums) {
  //  三个变量存放最大的值，两个变量存放最小的值，用来考虑两个负数的情况
  var max1 = -Infinity;
  var max2 = -Infinity;
  var max3 = -Infinity;
  var min1 = Infinity;
  var min2 = Infinity;

  // 找出最大的三个值和最小的两个值
  for (var i = 0; i < nums.length; i++) {
    if (nums[i] > max1) {
      max3 = max2;
      max2 = max1;
      max1 = nums[i];
    } else if (nums[i] > max2) {
      max3 = max2;
      max2 = nums[i];
    } else if (nums[i] > max3) {
      max3 = nums[i];
    }

    if (nums[i] < min1) {
      min2 = min1;
      min1 = nums[i];
    } else if (nums[i] < min2) {
      min2 = nums[i];
    }
  }

  return Math.max(max1 * max2 * max3, max1 * min1 * min2);
};

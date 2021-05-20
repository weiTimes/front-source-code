/**
 *  解法1
 *  暴力求解
 *  两层循环
 *  时间复杂度： O(n * k)
 * @param {*} nums
 * @param {*} k
 */
var maxSlidingWindow = function (nums, k) {
  if (!nums || nums.length < 2) return nums;

  var maxArray = [];

  for (var i = 0; i < nums.length - k + 1; i++) {
    console.log(nums[i]);
    var currentMax = nums[i];
    for (var j = i + 1; j < i + k; j++) {
      currentMax = Math.max(currentMax, nums[j]);
    }

    maxArray.push(currentMax);
  }

  return maxArray;
};

/**
 *  解法二
 *  双端队列
 *
 *  一层循环遍历数组
 *  判断队尾的值是否小于等于当前值，如果小于先pop出队列之后再push当前值；否则直接push - 保证了队列从大到小的顺序排列，想要取最大的值，直接取队首
 *  判断队首的值是否在当前滑动窗口内，如果不在即不是有效值，shift队首; 队首索引 <= i(右边界) - k
 *  如果i >= k，即形成滑动窗口，则将队首push到结果数组中
 * @param {*} nums
 * @param {*} k
 */
var maxSlidingWindow = function (nums, k) {
  if (!nums) return [];
  if (nums.length === 1) return [nums[0]];

  var deque = [];
  var result = [];

  function getDequeLastIndex() {
    return deque[deque.length - 1];
  }

  for (var i = 0; i < nums.length; i++) {
    // 如果队尾小于等于当前的值，则弹出队尾
    while (deque.length > 0 && nums[i] >= nums[getDequeLastIndex()]) {
      deque.pop();
    }

    // 推入当前索引
    deque.push(i);

    // 队首不在当前滑动窗口内，弹出队首
    if (deque[0] <= i - k) {
      deque.shift();
    }

    // 达到滑动窗口的最小数量，也就是形成了滑动窗口，出去队首，即最大值
    if (i + 1 >= k) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
};

maxSlidingWindow([1, 2, 3, 4, 5], 3);

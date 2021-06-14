var maxSlidingWindow = function (nums, k) {
  if (!nums) return [];
  if (nums.length === 1) return [nums[0]];

  var deque = [];
  var result = [];

  function getDequeLastIndex() {
    return deque[deque.length - 1];
  }

  for (var i = 0; i < nums.length; i++) {
    // 单调队列，这里利用单调递减队里
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

    // 达到滑动窗口的最小数量，也就是形成了滑动窗口，、每遍历一项，就将队首放入结果数组，即放入队列的最大值。
    if (i + 1 >= k) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
};

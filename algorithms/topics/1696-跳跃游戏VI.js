/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxResult = function (nums, k) {
  const len = nums.length;
  if (!nums || len === 0 || k <= 0) return 0;

  // 存放每个位置可以手机到的金币数
  const coins = [nums[0]];
  // 长度为 k 的滑动窗口，存放索引
  const queue = [0];

  const isEmpty = () => queue.length === 0;
  const peek = () => queue[0];
  const peekLast = () => queue[queue.length - 1];

  for (let i = 1; i < len; i++) {
    // 队首索引对应的值（最大） + 当前遍历的值
    coins[i] = coins[peek()] + nums[i];

    // 单调递减队列，如果队尾的值不大于当前值，就移出队列，只要移出队列 queue 的就行，即移出索引。
    while (!isEmpty() && coins[peekLast()] <= coins[i]) {
      queue.pop();
    }

    // 当队首的索引不在窗口内，就移出，给后面推入的索引留出空间
    // 如当前索引为 2, k = 2, 如果队首元素为 0，就将其移出队首
    while (!isEmpty() && peek() <= i - k) {
      queue.shift();
    }

    // 将当前索引推入队列
    queue.push(i);
  }

  return coins[len - 1];
};

const res = maxResult([40, 30, -100, -100, -10, -7, -3, -3], 2);

console.log(res, 'res');

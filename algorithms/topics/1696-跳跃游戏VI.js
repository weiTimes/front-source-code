/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxResult = function (nums, k) {
  const len = nums.length;
  if (!nums || len === 0 || k <= 0) return 0;

  // 存放每个位置可以手机到的金币数
  const coins = [];
  const queue = [];

  const isEmpty = () => queue.length === 0;
  const peek = () => queue[0];
  const peekLast = () => queue[queue.length - 1];

  for (let i = 0; i < len; i++) {
    if (i - k > 0) {
      // 队首等于 i - k - 1 的值，控制队列的数量在滑动窗口内，即 k 个数
      while (!isEmpty() && peek() === coins[i - k - 1]) {
        queue.shift();
      }
    }

    const old = isEmpty() ? 0 : peek();
    coins[i] = old + nums[i];

    while (!isEmpty() && peekLast() < coins[i]) {
      queue.pop();
    }

    queue.push(coins[i]);
  }

  return coins[len - 1];
};

const res = maxResult([40, 30, -100, -100, -10, -7, -3, -3], 2);

console.log(res, 'res');

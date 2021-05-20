/*
 * @Author: yewei
 * @Date: 2020-10-28 14:36:18
 * @Last Modified by: yewei
 * @Last Modified time: 2020-11-21 14:40:22
 *
 *  +1
 *  +1
 *  +1
 *  +1
 *
 *  题解
 *  https://leetcode-cn.com/problems/climbing-stairs/solution/cong-zhi-jue-si-wei-fen-xi-dong-tai-gui-hua-si-lu-/
 */

// 1. 递归 调用栈深度n，空间复杂度O(n)，时间复杂度O(2^n)，所有节点都遍历到
var climbStairs = function (n) {
  if (n <= 1) return 1;
  if (n < 3) return n;

  return climbStairs(n - 2) + climbStairs(n - 1);
};

// 2. 优化重复递归。相同的子树不用再重复递归，将子树的计算结果保存到哈希表或者是数组中，遇到就不用进入递归，直接取，优化后的时间复杂度和空间复杂度均是O(n)

// 3. 尾递归优化
var climbStairs = function (n) {
  return Fibonacci(n, 1, 1);
};

function Fibonacci(n, a, b) {
  if (n <= 1) return b;

  return Fibonacci(n - 1, b, a + b);
}

/**
 *
 * @param {*} n
 * 4. 动态规划，自底向上思考
 * f(n) = f(n - 2) + f(n -1);
 * 有两个base case；f(0) = 1; f(1) = 1;
 *  用一个数组存放中间子树的结果
 *  从f(0)、f(1)出发，顺序计算，知道f(n);
 */
var climbStairs = function (n) {
  if (n <= 2) {
    return n;
  }

  var dp = new Array(n + 1).fill(0);

  dp[0] = 1;
  dp[1] = 1;

  for (var i = 2; i <= n; i++) {
    dp[i] = dp[i - 2] + dp[i - 1];
  }

  return dp[n];
};
/**
 *  5. 压缩空间优化
 *  只用两个变量存放过去的两个值，不用再申请一个长度为n+1的数组了
 * @param {} n
 */
var climbStairs = function (n) {
  if (n <= 2) {
    return n;
  }

  var pre = 1;
  var cur = 1;

  for (var i = 2; i <= n; i++) {
    var temp = cur;
    cur = pre + cur;
    pre = temp;
  }

  return cur;
};

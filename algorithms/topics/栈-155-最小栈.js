/*
 * @Author: yewei
 * @Date: 2020-12-09 15:37:20
 * @Last Modified by: yewei
 * @Last Modified time: 2020-12-09 15:40:41
 *
 * 使用辅助栈 - 辅助栈维护了最小值，查询的时候时间复杂度未O(1)
 * push(x)
 *   如辅助栈为空直接push
 *   辅助栈不为空，比较x和辅助栈栈顶的值，小于等于则push
 * pop()
 *   拿到主栈pop后的值，比较是否和辅助栈栈顶的值的值相等，如果相等，则辅助栈也pop()
 */
var MinStack = function () {
  this.stack = [];
  this.minStack = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  this.stack.push(x);

  if (this.minStack.length === 0) {
    this.minStack.push(x);
  } else {
    if (x <= this.minStack[this.minStack.length - 1]) {
      this.minStack.push(x);
    }
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  if (this.stack.length > 0) {
    var popValue = this.stack.pop();
    if (popValue === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
  }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  if (this.stack.length > 0) {
    return this.stack[this.stack.length - 1];
  }
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  if (this.minStack.length > 0) {
    return this.minStack[this.minStack.length - 1];
  }
};

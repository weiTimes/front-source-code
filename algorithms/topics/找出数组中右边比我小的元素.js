/*
 * @Author: yewei
 * @Date: 2021-06-05 21:18:26
 * @Last Modified by: yewei
 * @Last Modified time: 2021-06-05 21:21:31
 *
 * 使用单调递增栈
 * 当前值和栈顶的值比较
 *   比栈顶大，入栈
 *   比栈顶小，当前下标即为栈顶元素的右边最小的元素下标，栈顶出栈，当前下标入栈
 * 最后将剩余的栈元素状态置为 -1
 */
const findSmallSeq = (nums) => {
  const res = [];
  const stack = [];

  const isEmpty = () => stack.length === 0;
  const peek = () => stack[stack.length - 1];

  for (let i = 0; i < nums.length; i++) {
    const cur = nums[i];

    while (!isEmpty() && nums[peek()] > cur) {
      // 栈顶的值比当前值大，记录下标，出栈
      res[peek()] = i;

      stack.pop();
    }

    stack.push(i);
  }

  while (!isEmpty()) {
    res[peek()] = -1;

    stack.pop();
  }

  return res;
};

// console.log(findSmallSeq([5, 2])); // [1, -1]
console.log(findSmallSeq([1, 2, 4, 9, 4, 0, 5])); // [5, 5, 5, 4, 5, -1, -1]

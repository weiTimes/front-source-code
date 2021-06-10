const findSmallSep = (nums, k) => {
  const res = [];
  const stack = [];

  const size = () => stack.length;
  const peek = () => stack[size() - 1];
  const isEmpty = () => size() === 0;

  for (let i = 0; i < nums.length; i++) {
    // 栈不为空 && 栈顶元素大于当前值 && (栈长度 + 剩余未遍历的数量) > k
    while (!isEmpty() && nums[i] < peek() && size() + (nums.length - i) > k) {
      stack.pop();
    }

    stack.push(nums[i]);
  }

  while (size() > k) {
    stack.pop();
  }

  for (let i = k - 1; i >= 0; i--) {
    res[i] = peek();
    stack.pop();
  }

  return res;
};

// [1, 2, 0]
console.log(findSmallSep([9, 2, 4, 5, 1, 2, 3, 0], 3));

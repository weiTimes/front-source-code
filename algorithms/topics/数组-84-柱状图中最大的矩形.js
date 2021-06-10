/**
 *  解法一
 * 暴力1
 * 依次遍历柱形的高度，对于每一个高度分别向两边扩散，求出以当前高度为矩形的最大宽度多少。
 * @param {*} heights
 */
var largestRectangleArea = function (heights) {
  const len = heights.length;

  if (len === 0) return 0;
  if (len === 1) return heights[0];

  let max = 0;

  // 遍历每一项，向左，向右一直扩散，直到高度严格小于当前项停止
  for (let i = 0; i < len; i++) {
    const cur = heights[i];

    let left = i;
    let right = i;

    // 左右指针不能超出索引范围
    while (left > 0 && heights[left - 1] >= cur) {
      left--;
    }

    while (right < len - 1 && heights[right + 1] >= cur) {
      right++;
    }

    const area = (right - left + 1) * cur;
    max = Math.max(max, area);
  }

  return max;
};
/**
 *  解法二
 *  暴力2
 *
 *  一层遍历，找出当前柱子的左右边界
 *  两个指针，分别指向左右边界，大于等于当前柱子的高度则left--或者right++
 *  最终面积：(right - left + 1) * 当前高度
 * @param {*} heights
 */
var largestRectangleArea = function (heights) {
  const len = heights.length;

  if (len === 0) return 0;
  if (len === 1) return heights[0];

  let max = 0;

  // 遍历每一项，向左，向右一直扩散，直到高度严格小于当前项停止
  for (let i = 0; i < len; i++) {
    const cur = heights[i];

    let left = i;
    let right = i;

    // 左右指针不能超出索引范围
    while (left - 1 >= 0 && heights[left - 1] >= cur) {
      left--;
    }

    while (right + 1 <= len - 1 && heights[right + 1] >= cur) {
      right++;
    }

    const area = (right - left + 1) * cur;
    max = Math.max(max, area);
  }

  return max;
};

/**
 *  解法三
 *  单调栈（递增） + 哨兵
 *  看到元素的高度严格小于栈顶的高度时，出栈，计算面积，否则入栈
 * @param {*} heights
 */
var largestRectangleArea = function (heights) {
  let len = heights.length;

  if (len === 0) return 0;
  if (len === 1) return heights[0];

  // 前后加入哨兵，可以保证栈不为空
  const newHeight = [0, ...heights, 0];
  len = newHeight.length;

  let area = 0;

  const peek = () => stack[stack.length - 1];
  const stack = [0];

  // 遍历数组，下标从 1 开始
  for (let i = 1; i < len; i++) {
    const curHeight = newHeight[i];

    // 当前元素 < 栈顶元素 -> 出栈 -> 确认面积
    while (curHeight < newHeight[peek()]) {
      // 先出栈
      const topIndex = stack.pop();
      // 最后栈顶元素为哨兵元素，下标为0，即元素最左可以到达0，最右边是当前遍历到的最后一个元素下标
      const width = i - peek() - 1;
      area = Math.max(area, width * newHeight[topIndex]);
    }

    stack.push(i);
  }

  return area;
};

const result = largestRectangleArea([2, 1, 2]);
// const result = largestRectangleArea([2, 1, 5, 6, 2, 3]);
// const result = largestRectangleArea([1, 1]);
console.log(result, 'res');

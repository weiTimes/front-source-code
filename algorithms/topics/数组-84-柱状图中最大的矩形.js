/**
 *  解法一
 * 暴力1
 * @param {*} heights
 */
var largestRectangleArea = function (heights) {
  if (heights.length === 1) return heights[0];

  var max = 0;

  for (var i = 0; i < heights.length - 1; i++) {
    max = Math.max(max, heights[i]);

    for (var j = i + 1; j < heights.length; j++) {
      max = Math.max(max, heights[j]);

      var minHeight = heights[j];

      for (var k = i; k <= j; k++) {
        minHeight = Math.min(minHeight, heights[k]);
      }

      max = Math.max(max, (j - i + 1) * minHeight);
    }
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
  var left;
  var right;
  var max = 0;

  for (var i = 0; i < heights.length; i++) {
    left = i;
    right = i;

    while (left > 0 && heights[left - 1] >= heights[i]) {
      left--;
    }
    while (right < heights.length && heights[right + 1] >= heights[i]) {
      right++;
    }

    max = Math.max(max, (right - left + 1) * heights[i]);
  }

  return max;
};

/**
 *  解法三
 *  栈
 * @param {*} heights
 */
var largestRectangleArea = function (heights) {
  if (heights.length === 0) return 0;
  if (heights.length === 1) return heights[0];

  var stack = [{ index: -1, value: -1 }];
  var max = 0;

  function getLast() {
    return stack[stack.length - 1];
  }

  for (var i = 0; i < heights.length; i++) {
    while (stack.length !== 1 && heights[i] < getLast().value) {
      var popItem = stack.pop();

      while (stack.length !== 1 && getLast().value === popItem.value) {
        stack.pop();
      }

      var widthOffset = i - getLast().index - 1;
      max = Math.max(max, widthOffset * popItem.value);
    }

    stack.push({ index: i, value: heights[i] });
  }

  var last = getLast();

  while (stack.length > 1) {
    var currentPop = stack.pop();

    while (stack.length > 0 && currentPop.value === getLast().value) {
      stack.pop();
    }

    var curWidth = last.index - getLast().index;

    max = Math.max(max, curWidth * currentPop.value);
  }

  return max;
};

const result = largestRectangleArea([0, 9]);
console.log(result, 'res');

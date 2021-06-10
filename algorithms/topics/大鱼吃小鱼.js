/*
 * @Author: yewei
 * @Date: 2021-06-04 17:53:45
 * @Last Modified by: yewei
 * @Last Modified time: 2021-06-04 21:23:25
 *
 * 在水中有许多鱼，可以认为这些鱼停放在 x 轴上。再给定两个数组 Size，Dir，Size[i] 表示第 i 条鱼的大小，
 * Dir[i] 表示鱼的方向 （0 表示向左游，1 表示向右游）。这两个数组分别表示鱼的大小和游动的方向，
 * 并且两个数组的长度相等。鱼的行为符合以下几个条件:
 *
 * 1. 所有的鱼都同时开始游动，每次按照鱼的方向，都游动一个单位距离；
 * 2. 当方向相对时，大鱼会吃掉小鱼；
 * 3. 鱼的大小都不一样。
 *
 * 输入：Size = [4, 2, 5, 3, 1], Dir = [1, 1, 0, 0, 0]
 */

/**
 * 时间复杂度 为 O(N)，空间复杂度为 O(N)
 * @param {*} fishSize
 * @param {*} fishDirections
 * @returns
 */
const solution = (fishSize, fishDirections) => {
  const len = fishSize.length;

  if (len <= 1) {
    return len;
  }

  const left = 0;
  const right = 1;
  const stack = [];

  const isEmptyStack = () => stack.length === 0;
  const peekStack = () => stack[stack.length - 1];

  for (let i = 0; i < len; i++) {
    const currentFishSize = fishSize[i];
    const currentFishDirection = fishDirections[i];
    let hasEate = false;

    while (
      !isEmptyStack() &&
      fishDirections[peekStack()] === right &&
      currentFishDirection === left
    ) {
      if (fishSize[peekStack()] > currentFishSize) {
        hasEate = true;
        break;
      }

      stack.pop();
    }

    if (!hasEate) {
      stack.push(i); // 将鱼的索引入栈
    }
  }

  return stack.length;
};

// 1
console.log(solution([4, 3, 2, 1, 5], [1, 1, 0, 0, 0]), 'solution');

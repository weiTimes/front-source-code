/*
 * @Author: yewei
 * @Date: 2021-06-07 15:04:18
 * @Last Modified by: yewei
 * @Last Modified time: 2021-06-07 15:38:40
 *
 * 算法：给你一个纯数字字符串，判断旋转180度之后是否和自己相等，‘121‘ 输出 false，因为2旋转之后不是数字，
 * '1691' => true 因为1691选装180度还是1691， 1991 => false 因为1991旋转之后是1661
 *
 * 第一位和最后一位应该相等
 */
const checkNumValid = (nums) => {
  const len = nums.length;
  const validMap = new Map([
    ['0', '0'],
    ['1', '1'],
    ['6', '9'],
    ['8', '8'],
    ['9', '6'],
  ]);

  let i = 0;
  let flag = true;

  // len >> 1 等价于 Math.floor(len / 2)
  // 只需遍历前一半
  while (i <= len >> 1) {
    const cur = validMap.get(nums[i]);

    if (!cur || cur !== nums[len - i - 1]) {
      flag = false;
      break;
    }

    i++;
  }

  return flag;
};

// 1, 121, 1691, 1991, 000
console.log(checkNumValid('121'), 'ss');

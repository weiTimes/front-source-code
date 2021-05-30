/*
 * @Author: yewei
 * @Date: 2021-05-25 11:56:36
 * @Last Modified by: yewei
 * @Last Modified time: 2021-05-26 13:00:50
 *
 * 实现一个 flat 方法，可以根据传入的层级展开对应深度的数组嵌套
 */

/**
 * 定义一个变量控制深度
 * 遍历该层数组，将非数组元素推入结果数组，数组元素放入新的数组，新数组为下次循环的数组
 *
 * @param {*} array
 * @param {*} deep
 * @returns
 */
const flat = (array, deep) => {
  if (deep <= 0) return array;

  let i = 0;
  let res = [].concat(array); // copy 数组

  console.log(...res); // [1, 2, [3, 4, [5]]] -> 1, 2, [3, 4, [5]]

  while (i < deep) {
    res = [].concat(...res);

    i++;
  }

  return res;
};

/**
 * 使用 reduce 实现
 * @param {*} array
 * @param {*} deep
 * @returns
 */
const flatRecursive = (array, deep) => {
  if (deep <= 0) return array;

  return array.reduce((prev, cur) => {
    const isRecursive = Array.isArray(cur);

    const ele = isRecursive ? flatRecursive(cur, deep - 1) : cur;

    return prev.concat(ele);
  }, []);
};

const array = [1, 2, [3, 4, [5, 6, [7, 8]]]];

console.log(flatRecursive(array, 1), 'h'); // [1, 2, 3]

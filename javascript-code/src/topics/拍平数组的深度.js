/*
 * @Author: yewei
 * @Date: 2021-06-05 20:11:12
 * @Last Modified by:   yewei
 * @Last Modified time: 2021-06-05 20:11:12
 *
 * 将数组拍平，可以指定拍平的层级
 */

const flat = (array, maxDeep) => {
  if (maxDeep <= 0) return array;

  const flatten = (array, deep) => {
    return array.reduce((prev, cur) => {
      const item =
        Array.isArray(cur) && deep < maxDeep ? flatten(cur, deep + 1) : cur;

      return prev.concat(item);
    }, []);
  };

  return flatten(array, 1);
};

const array = [1, [2, [3, [4, [5, [6]]]]]];

console.log(flat(array, 2)); // [1, 2, 3, [4, [5, [6]]]]

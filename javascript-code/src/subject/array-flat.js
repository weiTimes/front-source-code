/*
 * @Author: yewei
 * @Date: 2021-03-25 00:00:35
 * @Last Modified by: yewei
 * @Last Modified time: 2021-03-25 00:09:35
 *
 * 拍平数组
 */

const array = [1, 2, 3, [3, 3, 3, [5, 4, 5, 6, 6, 7, 8]], [333, 4444]];

// --- 方法1 粗暴
// const res = array.join(',').split(',');
// console.log(res, 'res');

// --- 方法2
function arrayFlatten() {
  const arr = [];

  return function flatten(array) {
    for (let item of array) {
      if (!Array.isArray(item)) {
        arr.push(item);
      } else {
        arr.concat(flatten(item));
      }
    }

    return arr;
  };
}

// 测试用例
// const flat = arrayFlatten();
// console.log(flat(array), '数组拍平-遍历');

// --- 方法3 reduce
function flatReduce(array) {
  return array.reduce((res, cur) => {
    if (!Array.isArray(cur)) {
      return [...res, cur];
    } else {
      return [...res, ...flatReduce(cur)];
    }
  }, []);
}

console.log(flatReduce(array), '数组拍平-reduce');

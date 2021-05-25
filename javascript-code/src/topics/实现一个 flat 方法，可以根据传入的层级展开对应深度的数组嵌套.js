/*
 * @Author: yewei
 * @Date: 2021-05-25 11:56:36
 * @Last Modified by: yewei
 * @Last Modified time: 2021-05-25 13:41:28
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
// const flat = (array, deep) => {
//   let i = 0;
//   let newArray = array;
//   let res = [];

//   while (i < deep) {
//     let curArray = [];

//     for (let j = 0; j < newArray.length; j++) {
//       if (Array.isArray(array[j])) {
//         curArray = curArray.concat(newArray[j]);
//       } else {
//         res.push(newArray[j]);
//       }
//     }

//     newArray = curArray;

//     i++;
//   }

//   return res;
// };

// const flatRecursive = (array, deep) => {
//   return array.reduce((prev, cur) => {
//     const isRecursive = Array.isArray(cur) && deep > 0;

//     const ele = isRecursive ? flatRecursive(cur, deep - 1) : cur;

//     return [...prev, ele];
//   }, []);
// };

const array = [1, [2, [3, [4, [5, [6]]]]]];

array.flat(2);

console.log(array); // [1, 2, 3]

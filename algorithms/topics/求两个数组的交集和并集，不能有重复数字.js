/*
 * @Author: yewei
 * @Date: 2021-06-08 13:47:00
 * @Last Modified by: yewei
 * @Last Modified time: 2021-06-08 14:22:58
 *
 * 两个有序整数数组，数组中可能会有重复数字，求两个数组的交集和并集，要求交集和并集中没有重复数字
 */
// 方法1：使用 Set api
const getArrayCollectionWithSet = (arr1, arr2) => {
  // unionSet, intersectionSet
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  // 交集
  const intersectionSet = new Set();

  for (const item of set1) {
    if (set2.has(item)) {
      intersectionSet.add(item);
    }
  }

  // 并集
  const unionSet = new Set([...arr1, ...arr2]);

  return {
    unionSet: Array.from(unionSet),
    intersectionSet: Array.from(intersectionSet),
  };
};

// 方法二：不使用 api
const getArrayCollection = (arr1, arr2) => {
  const unionSet = {};
  const intersectionSet = {};

  const hash = {};

  // 并集
  for (const item of arr1.concat(arr2)) {
    unionSet[item] = undefined;
  }

  // 缓存 arr1 的值
  for (const item of arr1) {
    hash[item] = undefined;
  }

  for (const item of arr2) {
    if (Reflect.has(hash, item)) {
      intersectionSet[item] = undefined;
    }
  }

  const transform = (set) => {
    return Reflect.ownKeys(set).map((n) => Number(n));
  };

  return {
    unionSet: transform(unionSet),
    intersectionSet: transform(intersectionSet),
  };
};

const collection = getArrayCollection(
  [1, 3, 5, 5, 8, 9, 9],
  [2, 3, 4, 4, 7, 8]
);

console.log(collection);

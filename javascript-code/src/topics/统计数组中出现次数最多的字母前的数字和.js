/*
 * @Author: yewei
 * @Date: 2021-05-31 14:13:22
 * @Last Modified by:   yewei
 * @Last Modified time: 2021-05-31 14:13:22
 *
 * [‘12a’,’3b’,’4c’,’15d’,'15e',’2a’] 统计这个数组中出现次数最多的字母前的数字和，这个数组就是a, 12+2 = 14
 */

const getMaxSum = (array) => {
  const map = new Map();

  for (const item of array) {
    const num = parseInt(item);
    const char = item.slice(String(num).length);

    if (map.has(char)) {
      map.set(char, {
        count: map.get(char).count + 1,
        sum: map.get(char).sum + num,
      });
    } else {
      map.set(char, {
        count: 1,
        sum: num,
      });
    }
  }

  let res;

  for (const [char, info] of map) {
    if (!res || info.count > res[1]) {
      res = [char, info.sum];
    }
  }

  return res;
};

getMaxSum(['12a', '3b', '4c', '15d', '15e', '2a']);

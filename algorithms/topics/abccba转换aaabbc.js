/*
 * @Author: yewei
 * @Date: 2020-12-21 10:49:58
 * @Last Modified by: yewei
 * @Last Modified time: 2020-12-21 12:06:33
 *
 *  abacba 转成 aaa,bb,c
 *
 *
 */

/**
 *  方法一：排序后，使用两个指针，遇到不一样则插入逗号
 * @param {*} str
 */
function transformStr(str) {
  let sortStr = str.split('').sort().join('');
  let prev = 0;
  let cur = 1;
  let result = sortStr[prev];

  while (cur < sortStr.length) {
    if (sortStr[cur] !== sortStr[prev]) {
      result += `,${sortStr[cur]}`;
    } else {
      result += sortStr[cur];
    }

    prev++;
    cur++;
  }

  return result;
}

/**
 *  方法二：哈希表
 * @param {*} str
 */
function transformStr(str) {
  const map = new Map();
  let result = '';

  for (let i = 0; i < str.length; i++) {
    const mapStr = map.get(str[i]);
    map.set(str[i], mapStr ? mapStr + 1 : 1);
  }

  for (const [key, value] of map) {
    result += `${key.repeat(value)},`;
  }

  return result.substr(0, result.length - 1);
}

const result = transformStr('abacba');
console.log(result);

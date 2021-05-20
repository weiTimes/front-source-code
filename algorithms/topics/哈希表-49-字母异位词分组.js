/**
 *  解法一
 *  排序后的字符串作为map的key值
 * @param {*} strs
 */
var groupAnagrams = function (strs) {
  var hashTable = new Map();

  for (var i = 0; i < strs.length; i++) {
    var str = [...strs[i]].sort().join('');
    if (hashTable.has(str)) {
      hashTable.get(str).push(strs[i]);
    } else {
      hashTable.set(str, [strs[i]]);
    }
  }

  return Array.from(hashTable.values());
};

/**
 *  解法二
 *  计数
 * @param {*} strs
 */
var groupAnagrams = function (strs) {
  var map = new Map();

  for (str of strs) {
    var keys = new Array(26).fill(0);

    for (s of str) {
      keys[s.charCodeAt() - 'a'.charCodeAt()]++;
    }

    map.get(keys.toString())
      ? map.get(keys.toString()).push(str)
      : map.set(keys.toString(), [str]);
  }

  return Array.from(map.values());
};

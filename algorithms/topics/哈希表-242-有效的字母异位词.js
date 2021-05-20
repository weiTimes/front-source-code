/**
 *  解法一 排序
 *  长度不相等肯定不是字母异位词
 *  转成数组排序后再转成字符串，判断两个字符串是否相等
 * @param {*} s
 * @param {*} t
 */
var isAnagram = function (s, t) {
  return (
    s.length === t.length && [...s].sort().join('') === [...t].sort().join('')
  );
};

/**
 *  解法二 哈希表
 *  初始化长度为26的数组，初始值为0，代表出现的次数，排列顺序是a-z
 *  s负责++，t负责--
 *  如果数组中的值有小于0的，则说明不是，直接return false;
 * @param {*} s
 * @param {*} t
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;

  var hashTable = new Array(26).fill(0);
  for (var i = 0; i < s.length; i++) {
    hashTable[s.codePointAt(i) - 'a'.codePointAt(0)]++;
    hashTable[t.codePointAt(i) - 'a'.codePointAt(0)]--;
  }

  for (var j = 0; j < hashTable.length; j++) {
    if (hashTable[j] !== 0) {
      return false;
    }
  }

  return true;
};

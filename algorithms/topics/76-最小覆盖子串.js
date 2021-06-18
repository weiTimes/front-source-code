var minWindow = function (s, t) {
  if (!s || !t) return '';

  // 当 map 中的键值都小于等于 0 时，表示找到符合要求的子串
  const map = new Map();

  for (let str of t) {
    if (map.has(str)) {
      map.set(str, map.get(str) + 1);
    } else {
      map.set(str, 1);
    }
  }

  let left = 0;
  let needCount = t.length; // 必须字符串的长度，为 0 时，表示都包含了
  let area = [];

  for (let right = 0; right < s.length; right++) {
    const curStr = s[right];

    // 目标字符
    if (map.get(curStr) > 0) {
      needCount -= 1;
    }

    // 对应的字典键值 - 1
    const pervCount = map.has(curStr) ? map.get(curStr) : 0;
    map.set(curStr, pervCount - 1);

    // 找到符合的子串
    if (needCount === 0) {
      // 移除前面不需要的字符，直到遇到必须字符
      while (true) {
        if (map.get(s[left]) === 0) {
          break;
        }

        map.set(s[left], map.get(s[left]) + 1);
        left++;
      }

      if (area.length === 0 || right - left < area[1] - area[0]) {
        area = [left, right];
        35;
      }

      // i 后移一位，对应的必须字符的 count + 1;
      map.set(s[left], map.get(s[left]) + 1);
      needCount++;
      left++;
    }
  }

  return area.length === 0 ? '' : s.slice(area[0], area[1] + 1);
};

const res = minWindow('ADOBECODEBANC', 'ABC');

console.log(res, 'res');

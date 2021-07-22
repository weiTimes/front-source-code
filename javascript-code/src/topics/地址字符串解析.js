/*
 * @Author: yewei
 * @Date: 2021-07-15 12:35:42
 * @Last Modified by: yewei
 * @Last Modified time: 2021-07-15 16:48:31
 *
 *
字符串解析，要求
相同key的多个值用数组封装
如果能用JSON解析则作为json对象
没有value，赋值false的boolean值
需要转义
input: name=adam&name=bob&obj={a:1,b:2}&use&encodeStr=%20
output:
{
  name: ['adam', 'bob'],
  obj: {a:1, b:2},
  use: false,
  encodeStr: ' '
}
 */
const parseSearch = (str) => {
  const pairs = decodeURI(str).split('&');
  const map = new Map();
  const regex = /{.*}/g;

  const generatedJSON = (s) => {
    console.log(s, 's');

    s = s.slice(1, s.length - 1);
    const obj = Object.create(null);

    for (const pair of s.split(',')) {
      const splitIndex = pair.search(':');
      const key = pair.slice(0, splitIndex);
      const value = pair.slice(splitIndex + 1);

      if (regex.test(value)) {
        obj[key] = generatedJSON(value);
      } else {
        obj[key] = value;
      }
    }

    return obj;
  };

  const parseValue = (val) => {
    if (!val) return false;

    if (regex.test(val)) {
      return generatedJSON(val);
    }

    return val;
  };

  for (const pair of pairs) {
    const [key, value] = pair.split('=');
    const cur = parseValue(value);

    if (map.has(key)) {
      const oldVal = map.get(key);

      map.set(key, Array.isArray(oldVal) ? [...oldVal, cur] : [oldVal, cur]);
    } else {
      map.set(key, cur);
    }
  }

  return Object.fromEntries(map);
};

const res = parseSearch(
  'name=adam&name=bob&obj={a:1,b:{c:2,d:3,f:{g:4}}}&use&encodeStr=%20'
);

console.log(res, 'res');

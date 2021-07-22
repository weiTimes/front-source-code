/*
 * @Author: yewei
 * @Date: 2021-06-11 15:58:18
 * @Last Modified by: yewei
 * @Last Modified time: 2021-06-11 17:00:27
 *
 * 写一个 flatten 函数，输入 input，返回 flatten 后的 input:
 * input:
 * {
 *  a: 1,
 *  b: [1, 2, { c: 3 }, [4]],
 *  c: {
 *    d: 5,
 *    e: [6, 7]
 *  },
 *  f: null
 * }
 *
 * output:
 * {
 *   a: 1,
 *  "b[0]": 1,
 *  "b[1]": 2,
 *  "b[2].c": 3
 *  "b[3][0]": 4,
 *  "c.d": 5,
 *  "c.e[0]": 6,
 *  "c.e[1]": 7
 * }
 *
 * 忽略 null 或 undefined
 */
const flatten = (input) => {
  if (!input) return null;

  const obj = Object.create(null);

  const recursion = (data, prevKey) => {
    if (data === null || data === undefined) return;

    if (Array.isArray(data) || typeof data === 'object') {
      // 数组类型 或 对象类型
      for (let [key, val] of Object.entries(data)) {
        let k = key;

        if (prevKey) {
          k = `${prevKey}${
            Array.isArray(data) ? `[${Number(key)}]` : `.${key}`
          }`;
        }

        recursion(val, k);
      }
    } else {
      // 基础类型
      obj[prevKey] = data;
    }
  };

  recursion(input);

  return obj;
};

const res = flatten({
  a: 1,
  b: [1, 2, { c: 3 }, [4]],
  c: {
    d: 5,
    e: [6, 7],
  },
  f: null,
});

console.log(res, 'res');

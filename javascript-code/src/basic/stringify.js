/*
 * @Author: yewei
 * @Date: 2021-03-18 23:19:19
 * @Last Modified by: yewei
 * @Last Modified time: 2021-03-19 22:17:30
 *
 * JSON.stringify
 *
 * undefined
 *  => 如果是 undefined 本身，转换为 "undefined"
 *  => 如果是 数组元素，转换为 "[null]"
 *  => 如果是 对象属性值，忽略该属性
 *
 * JSON.parse
 *  => eval
 */

const basicType = ['number', 'string', 'boolean', 'undefined', 'function'];

function stringify(obj) {
  let type = typeof obj;

  if (basicType.includes(type)) {
    // 基本数据类型，直接将其转换成字符串类型并返回
    return `"${obj}"`;
  }

  if (obj instanceof Array) {
    // 数组
    const len = obj.length;
    const res = [];

    for (let i = 0; i < len; i++) {
      let curType = typeof obj[i];
      if (basicType.includes(curType)) {
        if (curType === 'undefined' || curType === 'function') {
          // undefined 转换为 null
          res.push('null');
        } else {
          // 其它基本类型
          res.push(`"${obj[i]}"`);
        }
      } else {
        // 复杂类型，递归处理
        res.push(stringify(obj[i]));
      }
    }

    return `[${res.join(',')}]`;
  }

  // 普通对象类型
  if (obj instanceof Object) {
    if (type === null) {
      return 'null';
    }

    let res = [];

    for (let prop in obj) {
      let curType = typeof obj[prop];

      if (basicType.includes(curType)) {
        if (curType !== 'undefined') {
          res.push(`"${prop}":"${obj[prop]}"`);
        }
      } else {
        res.push(`"${props}:${stringify(obj[prop])}"`);
      }
    }

    return `{${res.join(',')}}`;
  }
}

const strObj = stringify({ name: 'ywhoo', age: 18 });

console.log(strObj);

// 直接使用 eval => 应该避免使用，它允许未知代码的运行，在运行时会修改应用的作用域，非常危险，有 XSS 漏洞。
const parse = (str) => {
  return eval(`(${str})`);
};

// eval 和 Function 一样，都有着动态编译 js 代码的作用
const parseWithFunction = (str) => {
  return new Function('return ' + str)();
};

console.log(parseWithFunction(strObj));

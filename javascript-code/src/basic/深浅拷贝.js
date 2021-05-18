/*
 * @Author: yewei
 * @Date: 2021-04-06 21:12:30
 * @Last Modified by: yewei
 * @Last Modified time: 2021-05-09 23:53:12
 *
 * 深浅拷贝
 */

// ---- 浅拷贝：只复制第一层的基本数据类型和引用类型值的地址

// --- Object.assign 模拟实现
// 1. 判断是否有该方法，如果没有，则使用 Object.defineProperty
// 2. 传入的第一个参数必须是对象，如果不是则抛出异常
// 3. 将原始类型（第一个参数）包装成对象
// 4. 使用 for...in 遍历可枚举属性，使用 hasOwnProperty 获取自有属性，将其复制给新的对象
if (!Object.assign2) {
  Object.defineProperty(Object, 'assign2', {
    value: function (target, ...sourses) {
      if (!target) {
        throw new Error('undefined or null cannot convert to object');
      }

      // 将原始类型包装成对象
      const to = Object(target);

      for (let i = 0; i < sourses.length; i++) {
        const source = sourses[i];

        if (source) {
          for (let key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              to[key] = source[key];
            }
          }
        }
      }

      return to;
    },
    writable: true,
    configurable: true,
  });
}

let a = {
  name: 'muyiy',
  age: 18,
};
let b = {
  b1: Symbol('muyiy'),
  b2: null,
  b3: undefined,
};

const c = Object.assign(a, b);

c.name = 'ywhoo';

// console.log(a, 'a');

// --- 深拷贝实现
// 浅拷贝 + 递归
// 处理循环引用和引用丢失 => WeakMap 缓存值
// 拷贝 Symbol
// 破解递归爆栈 => while 循环
function cloneDeep(source, hash = new WeakMap()) {
  // 不是对象类型返回自身
  if (!isObject(source)) return source;

  if (hash.has(source)) return hash.get(source);

  // 数组 | 对象
  const target = Array.isArray(source) ? [] : Object.create(null);

  hash.set(source, target); // 哈希表设值

  // - 方法一
  // 处理属性类型为 Symbol 的情况
  //   const symKeys = Object.getOwnPropertySymbols(source);

  //   if (symKeys.length) {
  //     symKeys.forEach((sym) => {
  //       if (isObject(source[sym])) {
  //         target[sym] = cloneDeep(source[sym], hash);
  //       } else {
  //         target[sym] = source[sym];
  //       }
  //     });
  //   }

  //   for (let key in source) {
  //     if (Object.prototype.hasOwnProperty.call(source, key)) {
  //       if (isObject(source[key])) {
  //         // 对象类型递归处理
  //         target[key] = cloneDeep(source[key], hash);
  //       } else {
  //         target[key] = source[key];
  //       }
  //     }
  //   }

  // 或者是用 Reflect.ownKeys === Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))
  // 方法二
  Reflect.ownKeys(source).forEach((key) => {
    if (isObject(key)) {
      target[key] = cloneDeep(source[key], hash);
    } else {
      target[key] = source[key];
    }
  });

  return target;
}

/**
 * 使用循环防止递归爆栈
 *
 * 使用一个栈模拟树的遍历，当栈为空时结束循环
 *
 * 1. while 解决递归爆栈
 * 2. Reflect.ownKeys 拷贝 Symbol 类型的属性
 * 3. 使用缓存解决循环引用和引用丢失的问题
 */
function cloneDeepWithLoop(source) {
  const root = Object.create(null);
  const hash = new WeakMap();

  const loopStack = [
    {
      parent: root,
      key: undefined,
      data: source,
    },
  ];

  while (loopStack.length) {
    const node = loopStack.pop();
    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    let target = parent;
    // 如果 key 为 undefined，拷贝到父元素 parent，否则拷贝到子元素，子元素默认 {}
    if (key !== undefined) {
      target = parent[key] = {};
    }

    if (hash.has(data)) {
      // 如果缓存中有，直接使用缓存中的，并停止本次循环
      parent[key] = hash.get(data);
      break;
    }

    hash.set(data, target);

    Reflect.ownKeys(data).forEach((prop) => {
      if (isObject(data[prop])) {
        loopStack.push({
          parent: target,
          key: prop,
          data: data[prop],
        });
      } else {
        target[prop] = data[prop];
      }
    });
  }

  return root;
}

function isObject(o) {
  return typeof o === 'object' && o !== null;
}

const obj2 = {
  name: 'ywhoo',
  age: 27,
  info: { dev: 'yeap' },
  [Symbol('a')]: { s: 'b' },
};

obj2.loop = obj2;

// const res = cloneDeep(obj2);
const res = cloneDeepWithLoop(obj2);

res.cc = 'cc';

console.log(obj2, 'obj2');
console.log(res, 'res');

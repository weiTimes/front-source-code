// const toString = Object.prototype.toString;

// function isFunction(obj) {
//   return toString.call(obj) === '[object Function]';
// }

// function eq(a, b) {
//   // 如果两个值相等，除 0 外，那就是相等的（基本数据类型）; 对于 0 需要特殊判断: 1/0 和 1/-0 是不相等的
//   // 数据类型为 string, number, boolean, null, undefined 通过
//   if (a === b) return a !== 0 || 1 / a === 1 / b;

//   // 只有 NaN 不等于自身，而我们认为应该是相等的
//   if (a !== a) return b !== b;

//   const typeA = typeof a;
//   const typeB = typeof b;

//   // a 是基本数据类型，b 不为 object 时，就返回 false
//   if (typeA !== 'function' && typeA !== 'object' && typeB !== 'object') {
//     return false;
//   }

//   // 复杂类型判断
//   return deepEq(a, b);
// }

// /**
//  * 'a' 应等于 new String('a')
//  * Number(NaN) 应等于 Number(NaN)
//  *
//  * @param {*} a
//  * @param {*} b
//  */
// function deepEq(a, b) {
//   let classNameA = toString.call(a); // if string => [object String]
//   let classNameB = toString.call(b); // the same

//   // 类型不相同直接返回 false
//   if (classNameA !== classNameB) return false;

//   // 利用隐式转换，转换成基本数据类型
//   // 处理类似 'a' === new String('')
//   switch (classNameA) {
//     case '[object String]':
//     case '[object Regexp]':
//       return classNameA + '' === classNameB + '';
//     case '[object Boolean]':
//     case '[object Date]':
//       return +classNameA === +classNameB;
//     case '[object Number]':
//       // new Number(NaN)
//       if (+classNameA !== +classNameA) return +classNameB !== +classNameB;

//       return +classNameA === 0
//         ? 1 / +classNameA === 1 / +classNameB
//         : +classNameA === +classNameB;
//     default:
//       break;
//   }

//   // 这里的类型是 [object Function], [object Array], [object Object]

//   // 对象
//   // 类的实例不相等
//   // 对于 Object.create(null) 创建出来的对象，应和字面量创建的相同: const obj = Object.create(null); obj.name = 'ywhoo'; // obj === { name: 'ywhoo' }

//   const isArray = classNameA === '[object Array]';

//   if (!isArray) {
//     // 不是数组，剩余可能 [object Function], [object Object]

//     // 对于不同构造函数下的实例，直接返回 false
//     const aConstructor = a.constructor;
//     const bConstructor = b.constructor;

//     // 不同构造函数 TODO:
//     // if(aConstructor !== bConstructor && ) {}
//   }
// }

// console.log(eq(new Number(NaN), new Number(NaN)));

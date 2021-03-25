// 使用 apply 来合并数组
const array = [1, 2];
const anotherArray = [3, 4, 5];

Array.prototype.push.apply(array, anotherArray);

console.log(array, 'arr'); // [1,2,3,4,5]

// 函数可接受的参数有长度限制，如果要使用 apply 传递，需要进行切片后传入
function concatOfArray(arr1, arr2) {
  const PIECE = 32768;
  const len = arr2.length;

  for (let i = 0; i < len; i += PIECE) {
    Array.prototype.push.apply(arr1, arr2.slice(i, Math.min(i + PIECE, len)));
  }

  return arr1;
}

var arr1 = [-3, -2, -1];
var arr2 = [];
for (var i = 0; i < 1000000; i++) {
  arr2.push(i);
}

concatOfArray(arr1, arr2);

// 获取数组中的最大值
const maxArray = [3, -2, 10, 90, 30];

const result = Math.max(...maxArray);

// call 模拟实现
// 1. 将函数设置为对象的属性
// 2. 调用该函数
// 3. 删除该属性
Function.prototype.call1 = function (context, ...args) {
  // context 如果传入为基本数据类型，使用 Object 进行包装，如果传入为 falsy 值，赋值为 window
  context = context ? Object(context) : global;
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;

  // 函数调用结果返回
  return result;
};

global.value = 2;
const obj = { value: 1 };

function bar(name) {
  return `${this.value}${name}`;
}

const call1 = bar.call1(null, 'ywhoo');
console.log(call1, 'call1');

// apply 模拟实现
Function.prototype.apply2 = function (context, array) {
  context = context ? Object(context) : global;
  context.fn = this;

  let res;

  if (array) {
    res = context.fn(...array);
  } else {
    res = context.fn();
  }

  return res;
};

const objYw = { name: 'ywhoo' };

function bindYw(age) {
  return this.name + age;
}

const res = bindYw.apply(objYw, [18]);

console.log(res, 'apply');

// bind 实现
Function.prototype.bind2 = function (context) {
  if (typeof this !== 'function') {
    throw new Error('Function.prototype.bind2 - not callable');
  }

  const fn = this;

  const curried = [].slice.call(arguments, 1);

  const bound = function () {
    const args = [].slice.call(arguments, 0);
    context = this instanceof bound ? this : context;

    return fn.apply(context, curried.concat(args));
  };

  const fNOP = function () {};

  fNOP = fn.prototype;
  bound.prototype = new fNOP();

  return bound;
};

var value = 2;
var foo = {
  value: 1,
};
function bar(name, age) {
  this.habit = 'shopping';
  console.log(this.value);
  console.log(name);
  console.log(age);
}
bar.prototype.friend = 'kevin';

const bindBar = bar.bind2(foo, 'ywhoo');
const result2 = new bindBar(18);
console.log(result2, 'res');

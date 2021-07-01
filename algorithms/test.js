/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */

class MinHeap {
  constructor(k) {
    this.a = new Array(k);
    this.n = 0;
  }

  size() {
    return this.n;
  }

  /**
   * 如果 aVal < bVal 说明 aVal 的值更小
   * 在上浮过程中， aVal 往上游
   *
   * @param {*} aVal
   * @param {*} bVal
   * @memberof MinHeap
   */
  isLessPriority(aVal, bVal) {
    if (!aVal || !bVal) return false;

    return aVal[1] < bVal[1] || (aVal[1] === bVal[1] && aVal[0] > bVal[0]);
  }

  push(val) {
    this.a[this.n++] = val;

    this.swim(this.n - 1);
  }

  pop() {
    const ret = this.a[0];

    this.a[0] = this.a[--this.n];

    this.sink(0);

    return ret;
  }

  swim(i) {
    while (i > 0) {
      const parentIndex = (i - 1) >> 1;
      const parentVal = this.a[parentIndex];
      const temp = this.a[i];

      if (this.isLessPriority(temp, parentVal)) {
        this.a[i] = parentVal;
        this.a[parentIndex] = temp;

        i = parentIndex;
      } else {
        break;
      }
    }
  }

  sink(i) {
    while (i < this.n) {
      const leftChildIndex = (i << 1) + 1;
      const rightChildIndex = (i << 1) + 2;
      const leftVal = this.a[leftChildIndex];
      const rightVal = this.a[rightChildIndex];
      const temp = this.a[i];

      let smallerIndex = leftChildIndex; // 更小值的节点索引

      if (rightChildIndex < this.n) {
        // 有右边节点，并且更小
        if (this.isLessPriority(rightVal, leftVal)) {
          smallerIndex = rightChildIndex;
        }
      }

      // 子节点比要下沉的节点更小，交换位置
      if (
        smallerIndex < this.n &&
        this.isLessPriority(this.a[smallerIndex], temp)
      ) {
        this.a[i] = this.a[smallerIndex];
        this.a[smallerIndex] = temp;

        i = smallerIndex;
      } else {
        break;
      }
    }
  }
}

var topKFrequent = function (words, k) {
  if (!words || k <= 0) return [];

  const map = new Map();

  for (let word of words) {
    const count = map.has(word) ? map.get(word) : 0;
    map.set(word, count + 1);
  }

  const heap = new MinHeap(k + 1);

  for (let item of map.entries()) {
    heap.push(item);

    if (heap.n > k) {
      heap.pop();
    }
  }

  const res = [];

  while (heap.n > 0 && res.length < k) {
    res.push(heap.pop()[0]);
  }

  return res.reverse();
};

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

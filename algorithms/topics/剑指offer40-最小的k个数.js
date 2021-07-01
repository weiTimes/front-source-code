/**
 * 解法一：先排序，再取前 k 个数
 * 时间复杂度 O(nlgn)
 * @param {*} arr
 * @param {*} k
 * @returns
 */
var getLeastNumbers = function (arr, k) {
  if (!arr || k <= 0) return [];

  const len = arr.length;

  if (len <= k) return arr;

  arr.sort((a, b) => a - b);

  return arr.slice(0, k);
};
// 解法二：使用最小堆，k 个数以内 push 操作，超过 k 个执行 pop，最后对结果进行翻转
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

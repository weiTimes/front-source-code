/*
 * @Author: yewei
 * @Date: 2021-06-27 20:54:41
 * @Last Modified by: yewei
 * @Last Modified time: 2021-06-28 09:38:20
 *
 * 小堆的实现
 * 最小堆的第一个节点时最小节点
 */

class MinHeap {
  constructor(k) {
    this.a = new Array(k);
    this.n = 0;
  }

  size() {
    return this.n;
  }

  push(val) {
    this.a[this.n] = val;

    this.swim(this.n);

    this.n += 1;
  }

  pop() {
    const ret = this.a[0];

    this.a[0] = this.a[this.n - 1];

    this.sink(0);

    this.n -= 1;

    return ret;
  }

  swim(i) {
    const temp = this.a[i];
    let parent = 0;

    while (i > 0 && (parent = (i - 1) >> 1) !== i) {
      if (this.a[parent][1] > temp[1]) {
        this.a[i] = this.a[parent];
        i = parent;
      } else {
        break;
      }
    }

    this.a[i] = temp;
  }

  sink(i) {
    const temp = this.a[i];

    let j = 0;

    while ((j = (i << 1) + 1) < this.n) {
      if (j + 1 < this.n && this.a[j + 1][1] < this.a[j][1]) {
        j = j + 1;
      }

      if (this.a[j][1] < temp[1]) {
        this.a[i] = this.a[j];
        i = j;
      } else {
        break;
      }
    }

    this.a[i] = temp;
  }
}

var topKFrequent = function (nums, k) {
  if (!nums || k <= 0) return [];

  let len = nums.length;

  const heap = new MinHeap(k + 1);
  const map = new Map();

  for (let i = 0; i < len; i++) {
    const count = map.has(nums[i]) ? map.get(nums[i]) : 0;
    map.set(nums[i], count + 1);
  }

  for (const item of map) {
    heap.push(item);

    if (heap.n > k) {
      heap.pop();
    }
  }

  return heap.a.map((item) => item[0]).slice(0, k);
};

const res = topKFrequent([4, 1, -1, 2, -1, 2, 3], 2);

console.log(res, 'res');

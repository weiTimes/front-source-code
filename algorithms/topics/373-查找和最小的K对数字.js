class Heap {
  constructor(k) {
    this.a = new Array(k);
    this.n = 0;
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
      const temp = this.a[i];
      const parentIndex = (i - 1) >> 1;

      if (this.isMorePriority(temp, this.a[parentIndex])) {
        this.a[i] = this.a[parentIndex];
        this.a[parentIndex] = temp;
        i = parentIndex;
      } else {
        break;
      }
    }
  }

  sink(i) {
    while (i < this.n) {
      const temp = this.a[i];
      let j = i * 2 + 1;

      if (j + 1 < this.n && this.isMorePriority(this.a[j + 1], this.a[j])) {
        j = j + 1;
      }

      if (j < this.n && this.isMorePriority(this.a[j], temp)) {
        this.a[i] = this.a[j];
        this.a[j] = temp;
        i = j;
      } else {
        break;
      }
    }
  }

  isMorePriority(nodeA, nodeB) {
    if (!nodeA || !nodeB) return false;

    const sumA = nodeA[0] + nodeA[1];
    const sumB = nodeB[0] + nodeB[1];

    return sumA > sumB || (sumA === sumB && nodeA[0] > nodeB[0]);
  }
}

var kSmallestPairs = function (nums1, nums2, k) {
  if (!nums1 || !nums2 || !k) return [];

  const len1 = nums1.length;
  const len2 = nums2.length;

  const heap = new Heap(k + 1);

  for (let i = 0; i < len1; i++) {
    for (let j = 0; j < len2; j++) {
      const pairs = [nums1[i], nums2[j]];

      heap.push(pairs);

      if (heap.n > k) {
        heap.pop();
      }
    }
  }

  const res = [];
  const breakCondition = heap.n > k ? k : heap.n;

  while (res.length < breakCondition) {
    const cur = heap.pop();
    res.push(cur);
  }

  return res.reverse();
};

const r = kSmallestPairs([1, 1, 2], [1, 2, 3], 10);

console.log(r, 'r');

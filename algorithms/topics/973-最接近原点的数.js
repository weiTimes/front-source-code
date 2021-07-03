/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
class Heap {
  constructor(k) {
    this.a = new Array(k);
    this.n = 0;
  }

  size() {
    return this.n;
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
      const parentNode = this.a[parentIndex];

      if (this.isMorePriority(temp, parentNode)) {
        this.a[i] = parentNode;
        this.a[parentIndex] = temp;
        i = parentIndex;
      } else {
        break;
      }
    }
  }

  sink(i) {
    let j = 0;

    while (i < this.n) {
      const temp = this.a[i];
      j = 2 * i + 1;

      if (this.isMorePriority(this.a[j + 1], this.a[j])) {
        j = j + 1;
      }

      if (this.isMorePriority(this.a[j], temp)) {
        this.a[i] = this.a[j];
        this.a[j] = temp;
        i = j;
      } else {
        break;
      }
    }
  }

  isMorePriority(pointA, pointB) {
    if (!pointA || !pointB) return false;

    const disA = this.calDistance(pointA);
    const disB = this.calDistance(pointB);

    return disA > disB;
  }

  calDistance(point) {
    return Math.sqrt(Math.pow(point[0], 2) + Math.pow(point[1], 2));
  }
}

var kClosest = function (points, k) {
  if (!points || points.length <= 0 || k <= 0) return [];

  const heap = new Heap(k + 1);

  for (let i = 0; i < points.length; i++) {
    heap.push(points[i]);

    if (heap.n > k) {
      heap.pop();
    }
  }

  return heap.a.slice(0, k);
};

const res = kClosest(
  [
    [3, 3],
    [5, -1],
    [-2, 4],
  ],
  2
);

console.log(res, 'e');

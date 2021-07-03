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
      let j = 2 * i + 1;

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

  isMorePriority(a, b) {
    return a > b;
  }
}

var furthestBuilding = function (heights, bricks, ladders) {
  if (!heights || heights.length <= 0) return -1;

  const len = heights.length;
  const heap = new Heap(len + 1);
  let prevHeight = heights[0];
  let needHeight = 0;
  let pos = 0;

  for (let i = 1; i < len; i++) {
    const cur = heights[i];

    if (cur <= prevHeight) {
      pos = i;
    } else {
      const delta = cur - prevHeight;

      heap.push(delta);
      needHeight += delta;

      // 只有在砖头不够用的情况下用梯子
      while (needHeight > bricks && ladders > 0) {
        ladders -= 1;
        const topHeight = heap.pop();
        needHeight -= topHeight;
      }

      if (needHeight <= bricks) {
        pos = i;
      } else {
        break;
      }
    }

    prevHeight = cur;
  }

  return pos;
};

const re = furthestBuilding([4, 2, 7, 6, 9, 14, 12], 5, 1);
console.log(re, 're');

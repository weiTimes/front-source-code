/**
 * @param {number} target
 * @param {number} startFuel
 * @param {number[][]} stations
 * @return {number}
 */
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

var minRefuelStops = function (target, startFuel, stations) {
  if (target <= startFuel) return 0;

  const len = stations.length;

  if (len <= 0) return -1;

  const firstStation = stations[0];

  // 现有的油不足以开到第一个加油站
  if (startFuel < firstStation[0]) {
    return -1;
  }

  const heap = new Heap(len + 1);
  let pos = 0; // 初始的位置
  let remainFuel = startFuel; // 初始的油
  let i = 0;
  let addTimes = 0;

  // 达到目的地退出循环，油不足以到达目的地，需要加油
  while (pos + remainFuel < target) {
    const curStation = stations[i];
    let curPos = target; // 默认下一站是目的地
    let curFuel = 0; // 可加的油 为 0

    // target 在当前站点后面
    if (i < len && curStation[0] < target) {
      curPos = curStation[0];
      curFuel = curStation[1];
    }

    while (pos + remainFuel < curPos) {
      if (heap.n <= 0) {
        return -1;
      }

      const topFuel = heap.pop();

      remainFuel += topFuel;
      addTimes += 1;
    }

    // 到达了站点，消耗了油
    remainFuel -= curPos - pos;
    pos = curPos;

    if (curFuel > 0) {
      heap.push(curFuel);
    }

    i++;
  }

  return addTimes;
};

const r = minRefuelStops(100, 10, [
  [10, 60],
  [20, 30],
  [30, 30],
  [60, 40],
]);

console.log(r, 'r');

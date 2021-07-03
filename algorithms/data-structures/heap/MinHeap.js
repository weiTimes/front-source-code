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

/*
 * @Author: yewei
 * @Date: 2021-06-25 22:07:13
 * @Last Modified by: yewei
 * @Last Modified time: 2021-06-26 23:19:24
 *
 * 大堆的实现
 */

class Heap {
  n = 0; // 堆中元素的数量

  constructor(size) {
    this.a = new Array(size);
  }

  size() {
    return this.n;
  }

  /**
   * 向堆中加入元素
   * push是先把元素追加到数组尾巴上，然后再执行上浮操作
   * 假设 a[i] 比它的父结点要大，就进行上浮
   *
   * @param {*} val
   * @memberof Heap
   */
  push(val) {
    this.a[this.n] = val;

    this.swim(this.n);

    this.n++;
  }

  /**
   * 取出 a[0] 的值作为返回值
   * 将 a[n - 1] 存放至 a[0]
   * 将 a[0] 进行下沉操作
   *
   * @return {*}
   * @memberof Heap
   */
  pop() {
    const ret = this.a[0];
    this.a[0] = this.a[this.n - 1];

    this.sink(0);

    this.n--;

    return ret;
  }

  /**
   * 下沉
   * 假设 a[i] 比它的子结点要小，那么除 a[i] 以外，其他子树都满足堆的性质
   * 通过下沉操作，帮助 a[i] 找到正确的位置。
   *
   * @param {*} i
   * @memberof Heap
   */
  sink(i) {
    const temp = this.a[i];
    let j = 0; // 子节点的指针

    // 找到左子节点，并且在堆中元素长度范围内
    while ((j = (i << 1) + 1) < this.n) {
      // n - 1 为最后一个元素的索引，如果比它小，说明还有右节点
      // 有右节点，并且右节点大，将 j 指向右节点
      if (j < this.n - 1 && this.a[j] < this.a[j + 1]) {
        j = j + 1;
      }

      if (this.a[j] > temp) {
        this.a[i] = this.a[j];
        i = j;
      } else {
        break;
      }
    }

    this.a[i] = temp;
  }

  /**
   * 上浮
   * 在数组尾部加入元素，如果比父节点大，则上浮到对应的位置，父节点下沉。
   *
   * @param {*} i
   * @memberof Heap
   */
  swim(i) {
    const temp = this.a[i]; // 新 push 的元素
    let parent = 0;

    // 如果还存在父节点，下标从 0 开始，0 没有父节点
    while (i > 0 && (parent = (i - 1) >> 1) !== i) {
      if (this.a[parent] < temp) {
        // 将父节点向下移动，更新 i 的位置
        this.a[i] = this.a[parent];
        i = parent;
      } else {
        break;
      }
    }

    this.a[i] = temp;
  }
}

const heap = new Heap(100);

heap.push(3);
heap.push(6);
heap.push(10);
heap.push(5);
heap.pop();

console.log(heap, 'heap');

class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class MinHeap {
  constructor() {
    this.a = [];
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
      const parentNode = this.a[parentIndex];

      if (this.isLessPriority(temp, parentNode)) {
        this.a[i] = parentNode;
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

      if (j + 1 < this.n && this.isLessPriority(this.a[j + 1], this.a[j])) {
        j += 1;
      }

      if (j < this.n && this.isLessPriority(this.a[j], temp)) {
        this.a[i] = this.a[j];
        this.a[j] = temp;
        i = j;
      } else {
        break;
      }
    }
  }

  isLessPriority(nodeA, nodeB) {
    if (!nodeA || !nodeB) return false;

    return nodeA.val <= nodeB.val;
  }
}

var mergeKLists = function (lists) {
  const linkedLength = lists.length;

  if (!lists || linkedLength <= 0) return null;

  if (linkedLength === 1) return lists[0];

  const heap = new MinHeap(100);

  for (let i = 0; i < linkedLength; i++) {
    let curLinkedList = lists[i];

    while (curLinkedList !== null) {
      heap.push(curLinkedList);

      curLinkedList = curLinkedList.next;
    }
  }

  console.log(heap, 'heap');

  const dummy = new ListNode();
  let tail = dummy;

  while (heap.n > 0) {
    const node = heap.pop();

    tail.next = node;
    tail = tail.next;
  }

  tail.next = null;

  return dummy.next;
};

const l1 = { val: 1, next: { val: 4, next: { val: 5, next: null } } };
const l2 = { val: 1, next: { val: 3, next: { val: 4, next: null } } };
const l3 = { val: 2, next: { val: 6, next: null } };

const res = mergeKLists([l1, l2, l3]);

console.log(res, 'res');

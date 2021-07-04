class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

var swapPairs = function (head) {
  if (!head) return null;

  const evenDummy = new ListNode();
  const oddDummy = new ListNode();
  let evenTail = evenDummy;
  let oddTail = oddDummy;
  let count = 0;

  while (head !== null) {
    const isEven = count % 2 == 0; // 偶数
    count += 1;

    if (isEven) {
      evenTail.next = head;
      evenTail = head;
    } else {
      oddTail.next = head;
      oddTail = head;
    }

    head = head.next;
  }

  evenTail.next = null;
  oddTail.next = null;

  evenTail = evenDummy.next;
  oddTail = oddDummy.next;

  const dummy = new ListNode();
  let tail = dummy;
  count = 1; // 奇数先加入新链表

  //   // 两个新链表均不为空
  while (evenTail !== null && oddTail !== null) {
    const isEven = count % 2 === 0;
    count += 1;

    if (isEven) {
      tail.next = evenTail;
      tail = evenTail;
      evenTail = evenTail.next;
    } else {
      tail.next = oddTail;
      tail = oddTail;
      oddTail = oddTail.next;
    }
  }

  if (evenTail !== null) {
    tail.next = evenTail;
  }
  if (oddTail !== null) {
    tail.next = oddTail;
  }

  return dummy.next;
};

const res = swapPairs({
  val: 1,
  next: { val: 2, next: { val: 3, next: { val: 4, next: null } } },
});

console.log(res, 'res');

class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

const reverseDummy = (head) => {
  const dummy = new ListNode();
  let tail = dummy;

  while (head !== null) {
    const headNext = head.next;
    const next = dummy.next;
    dummy.next = head;
    dummy.next.next = next;
    if (!tail.val) {
      tail = head;
    }
    head = headNext;
  }

  console.log(dummy, 'dummy');

  return { dummy: dummy.next, tail };
};

var reverseBetween = function (head, left, right) {
  if (!head) return null;

  if (left === right) return head;

  const dummy = new ListNode();
  const needReversedDummy = new ListNode();
  let tail = dummy;
  let needReversedTail = needReversedDummy;

  let pos = 1;

  while (head !== null) {
    if (pos < left) {
      tail.next = head;
      tail = head;
    } else if (pos > right) {
      if (needReversedDummy.next !== null) {
        // 将 next 指向翻转链表
        needReversedTail.next = null;
        const reversed = reverseDummy(needReversedDummy.next);
        tail.next = reversed.dummy;
        tail = reversed.tail;

        // 用完置空
        needReversedDummy.next = null;
        needReversedTail = needReversedDummy;
      }

      tail.next = head;
      tail = head;
    } else {
      needReversedTail.next = head;
      needReversedTail = head;
    }

    pos += 1;
    head = head.next;
  }

  if (needReversedDummy.next !== null) {
    const reversed = reverseDummy(needReversedDummy.next);
    tail.next = reversed.dummy;
    tail = reversed.tail;
  }

  return dummy.next;
};

const re = reverseBetween(
  {
    val: 3,
    next: { val: 5, next: null },
  },
  1,
  2
);

console.log(re, 'reee');

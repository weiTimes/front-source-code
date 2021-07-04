var deleteDuplicates = function (head) {
  if (!head) return;

  const dummy = new ListNode();
  let tail = dummy;

  while (head !== null) {
    let cur = head;

    while (cur.next !== null && cur.val === cur.next.val) {
      cur = cur.next;
    }

    if (head === cur) {
      tail.next = cur;
      tail = cur;
    }

    head = cur.next;
  }

  tail.next = null;

  return dummy.next;
};

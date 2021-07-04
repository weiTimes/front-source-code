/**
 * 解法1
 * 使用一个新链表，包含头尾节点
 * 如果尾节点和当前遍历到的节点不相等，就插入节点（初始时头尾节点相等，直接插入）
 * 最后需要将尾节点的指向改为 null，因为已经到最后了
 *
 * @param {*} head
 * @return {*}
 */
var deleteDuplicates = function (head) {
  const dummy = new ListNode();
  let tail = dummy;

  while (head !== null) {
    const temp = head.next;

    if (dummy === tail || tail.val !== head.val) {
      tail.next = head;
      tail = head;
    }

    head = temp;
  }

  tail.next = null;

  return dummy.next;
};

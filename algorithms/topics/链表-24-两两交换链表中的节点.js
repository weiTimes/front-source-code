/**
 *
 *  解法一，递归解法
 *
 *  每一次递归完成两个节点的交换，然后返回互换后的第一个节点
 *  出口链表尾部，链表只剩下一个元素
 *   time O(n)
 *   space O(n)
 * @param {*} head
 */
var swapPairs = function (head) {
  // 递归出口
  if (!head || !head.next) return head;

  // 先保存下一个节点，避免丢失
  const next = head.next;

  // 下一个递归会返回互换后的第一个节点
  // head 是当前组互换后的第二个节点，head.next 指向下一组就好
  head.next = swapPairs(next.next);

  // 将当前组的两个节点互换
  next.next = head;

  // 返回互换后的第一个节点
  return next;
};

/**
 *  解法二 循环解法
 * @param {} head
 */
var swapPairs = function (head) {
  // dummy节点总是指向头结点，最后也是将头结点返回
  var dummy = new ListNode(null, head);
  // 定义两个指针，分别指向dummy，和当前节点，默认cur是头结点
  var prev = dummy;
  var cur = head;

  while (cur && cur.next) {
    // 先将下一个节点保存
    var next = cur.next;
    // 当前节点指向next.next
    cur.next = next.next;
    // 下一个节点指向当前节点，实现局部互换
    next.next = cur;
    // prev指向next，在第一次循环中，也就是dummy指向了第一次循环的next，dummy不动最后最终返回头结点，移动的是prev
    prev.next = next;

    // 两个指针向后移动一个
    prev = cur;
    cur = cur.next;
  }

  return dummy.next;
};

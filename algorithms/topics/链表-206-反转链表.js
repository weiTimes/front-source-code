/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 *  +1
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 *
 * 1. 双指针迭代法
 */
var reverseList = function (head) {
  // 定义两个指针，pre在前，cur指向当前节点
  var pre = null;
  var cur = head;

  while (cur !== null) {
    var temp = cur.next; // 临时存放当前节点的下一个节点
    cur.next = pre; // 当前节点指向上一个
    // pre, cur都往前前进一步
    pre = cur;
    cur = temp;
  }

  return pre; // 返回最后一个节点，最后的结果 5 -> 4 -> 3 -> 2 -> 1 -> null
};

/**
 *  递归实现
 *
 *  遍历到最后一个节点返回，其它节点与对应的下一个节点局部反转，执行到第一个节点时实现了全部反转，并将最后一个节点返回
 */
var reverseList = function (head) {
  // 终止条件 遍历到最后一个节点后返回
  if (head === null || head.next === null) {
    return head;
  }

  var current = reverseList(head.next);
  head.next.next = head; // 当前节点的下一个节点指向当前节点，实现了局部反转
  head.next = null; // 避免循环引用

  return current; // 最后返回的是节点5
};

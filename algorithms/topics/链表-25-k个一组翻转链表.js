/*
 * @Author: yewei
 * @Date: 2020-12-03 14:16:22
 * @Last Modified by: yewei
 * @Last Modified time: 2020-12-03 14:41:38
 *
 * 题解
 * https://leetcode-cn.com/problems/reverse-nodes-in-k-group/solution/tu-jie-kge-yi-zu-fan-zhuan-lian-biao-by-user7208t/
 */
var reverseKGroup = function (head, k) {
  // 定义一个假节点，并且指向了head
  // dummy -> 1 -> 2 -> 3 -> 4 -> 5
  var dummy = new ListNode(null, head);
  // 初始化两个指针，均指向dummy。pre指每次要翻转的链表的头节点的上一个节点；end指每次要翻转的链表的尾节点
  var prev = dummy;
  var end = dummy;

  while (end.next) {
    // 循环k次，找到要翻转的链表的尾节点，需要判断end是否为空，如果为空end.next会报错
    // dummy -> 1 -> 2 -> 3 -> 4 -> 5 若k为2，循环2次，end指向2
    for (var i = 0; i < k && end; i++) {
      end = end.next;
    }

    // end为空，要翻转的链表节点数小于k，不执行翻转，即结束while循环
    if (!end) break;

    // 待翻转链表的头节点
    var start = prev.next;
    // 记录end.next，方便后面连接
    var next = end.next;
    // 断开链表
    end.next = null;
    // 翻转链表，prev指向翻转后的链表的头结点
    prev.next = reverseLinkedList(start);
    // 连接链表
    start.next = next;
    // 移动两个指针到翻转后链表的尾节点
    prev = start;
    end = start;
  }

  return dummy.next;
};

function reverseLinkedList(head) {
  if (!head) return;

  var prev = null;
  var cur = head;

  while (cur) {
    var next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }

  return prev;
}

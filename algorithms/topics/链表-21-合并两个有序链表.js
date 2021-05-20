/*
 * @Author: yewei
 * @Date: 2020-12-08 11:53:00
 * @Last Modified by: yewei
 * @Last Modified time: 2020-12-08 14:04:45
 */

/**
 *  递归
 *  哪个链表节点的值小，那个链表的next就指向递归
 *  退出条件：
 *  - 因为是有序，子链表可直接返回
 *  l1为空则返回l2
 *  l2为空则返回l1
 *
 * @param {*} l1
 * @param {*} l2
 */
var mergeTwoLists = function (l1, l2) {
  if (l1 === null) {
    return l2;
  }
  if (l2 === null) {
    return l1;
  }

  if (l1.val <= l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);

    return l1;
  }

  l2.next = mergeTwoLists(l1, l2.next);
  return l2;
};

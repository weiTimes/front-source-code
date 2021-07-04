/*
 * @Author: yewei
 * @Date: 2020-12-08 11:53:00
 * @Last Modified by: yewei
 * @Last Modified time: 2021-07-04 20:53:09
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

/**
 * 解法二：
 * 迭代法
 * 使用一个指针指向较小的链表节点，不断地更新 tail 指针
 * 最后判断哪个链表不为空，将不为空的链表加到 tail 后面
 * @param {*} l1
 * @param {*} l2
 * @returns
 */
var mergeTwoLists = function (l1, l2) {
  if (l1 === null && l2 === null) return null;
  if (l1 === null) return l2;
  if (l2 === null) return l1;

  const dummy = new ListNode();
  let tail = dummy;

  while (l1 !== null && l2 !== null) {
    const isL1Smaller = l1.val <= l2.val;
    let cur = isL1Smaller ? l1 : l2;

    tail.next = cur;
    tail = cur;

    if (isL1Smaller) {
      l1 = l1.next;
    } else {
      l2 = l2.next;
    }
  }

  tail.next = l1 === null ? l2 : l1;
  tail = tail.next;

  return dummy.next;
};

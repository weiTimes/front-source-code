/*
 * @Author: yewei
 * @Date: 2020-12-02 22:35:00
 * @Last Modified by: yewei
 * @Last Modified time: 2020-12-02 22:57:43
 *
 * 题解
 * https://leetcode-cn.com/problems/linked-list-cycle/solution/javascript-kuai-man-zhi-zhen-wu-ran-lian-biao-2-ch/
 */

// 1. 快慢指针
const hasCycle = (head) => {
  // 至少 2 个节点才能构成一个环
  if (!head || !head.next) {
    return false;
  }

  // 设置快慢指针
  let slow = head;
  let fast = head.next;

  // 如果快指针一直没有追上慢指针
  while (slow !== fast) {
    // 如果没有环，则快指针会抵达终点
    if (!fast || !fast.next) {
      return false;
    }
    slow = slow.next;
    fast = fast.next.next;
  }

  // 如果有环，那么快指针会追上慢指针
  return true;
};

// 2 哈希表
var hasCycle = function (head) {
  if (!head || !head.next) return false;

  var map = new Map();

  while (head) {
    if (map.has(head)) {
      return true;
    }

    map.set(head, true);
    head = head.next;
  }

  return false;
};

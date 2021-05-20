/*
 * @Author: yewei
 * @Date: 2020-12-02 23:41:59
 * @Last Modified by: yewei
 * @Last Modified time: 2020-12-03 08:32:53
 *
 * https://leetcode-cn.com/problems/linked-list-cycle-ii/solution/142-huan-xing-lian-biao-ii-cxiang-xi-tu-jie-jian-h/
 */

var detectCycle = function (head) {
  if (!head || !head.next) return null;

  var slow = head;
  var fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    // 相遇
    if (slow === fast) {
      var index1 = head;
      var index2 = slow;

      // 再定义一个指针，从头结点开始走，每次一步，再次相遇时就是入口-sdf
      while (index1 !== index2) {
        index1 = index1.next;
        index2 = index2.next;
      }

      return index1;
    }
  }

  return null;
};

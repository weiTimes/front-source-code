/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  // 定义一个队列
  const queue = [];

  if (root) {
    // 入队列
    queue.push(root);
  }

  // 队列的长度
  const size = () => queue.length;
  // 队列是否为空
  const isEmpty = () => size() === 0;

  const res = [];

  while (!isEmpty()) {
    // 保存当前层的节点值
    const curLevelArray = [];

    const queueSize = size();

    for (let i = 0; i < queueSize; i++) {
      // 出队
      const curNode = queue.shift();
      curLevelArray.push(curNode.val);

      if (curNode.left) {
        queue.push(curNode.left);
      }

      if (curNode.right) {
        queue.push(curNode.right);
      }
    }

    res.push(curLevelArray);
  }

  return res;
};

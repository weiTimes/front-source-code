/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/** 解法 1
 * 层序遍历
 * 使用两个队列分别存储节点和节点索引
 * 先获取队列的大小，即该层需要遍历的节点，然后将各个子节点推入队列，新的队列即为下一层节点
 * 孩子节点索引的计算方式为当前节点索引 - 该层最左边节点的索引
 * @param {TreeNode} root
 * @return {number}
 */
var widthOfBinaryTree = function (root) {
  if (!root) return 0;

  const nodeQueue = [root];
  const indexQueue = [1];

  const size = () => nodeQueue.length;
  const isEmpty = () => size() === 0;
  const peekIndex = () => indexQueue[0];
  let maxWidth = 0;

  while (!isEmpty()) {
    const curLevelLength = size();
    const startIndex = peekIndex();
    let curIndex = startIndex;

    for (let i = 0; i < curLevelLength; i++) {
      const curNode = nodeQueue.shift();
      curIndex = indexQueue.shift();

      if (curNode.val !== null) {
        const diff = curIndex - startIndex;

        if (curNode.left) {
          nodeQueue.push(curNode.left);
          indexQueue.push(diff * 2);
        }

        if (curNode.right) {
          nodeQueue.push(curNode.right);
          indexQueue.push(diff * 2 + 1);
        }
      }
    }

    maxWidth = Math.max(maxWidth, curIndex - startIndex + 1);
  }

  return maxWidth;
};

/**
 * 解法二
 * 采用递归的方式
 * 用一个数组保存每层最左边节点的索引
 * 从跟节点开始递归，初始层级为 0，索引为 0
 * 每次递归计算当前索引与该层最左边节点的差值，以此计算宽度和孩子节点的宽度
 * @param {} root
 * @returns
 */
var widthOfBinaryTree = function (root) {
  if (!root) return 0;

  const minPos = [0]; // 记录每一层的最左边节点索引
  let maxWidth = 0;

  const bfsTree = (node, level, pos) => {
    if (!node) return;

    if (minPos[level] === undefined) {
      minPos.push(pos);
    }

    const diff = pos - minPos[level];

    maxWidth = Math.max(maxWidth, diff + 1);

    bfsTree(node.left, level + 1, diff * 2);
    bfsTree(node.right, level + 1, diff * 2 + 1);
  };

  bfsTree(root, 0, 0);

  return maxWidth;
};

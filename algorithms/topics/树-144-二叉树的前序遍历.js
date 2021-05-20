/**
 *  递归
 * @param {*} root
 */
var preorderTraversal = function (root) {
  if (!root) return [];

  var res = [];

  function inorder(node) {
    if (!node) return null;

    res.push(node.val);
    inorder(node.left);
    inorder(node.right);
  }

  inorder(root);

  return res;
};

/**
 *  解法二
 *  迭代 栈
 * @param {*} root
 */
var preorderTraversal = function (root) {
  if (!root) return [];

  var stack = [];
  var res = [];
  var node = root;

  while (node || stack.length) {
    while (node) {
      stack.push(node);
      res.push(node.val);
      node = node.left;
    }

    var topNode = stack[stack.length - 1];
    stack.pop();
    node = topNode.right;
  }

  return res;
};

/**
 *  解法一
 *  递归
 * @param {*} root
 */
var inorderTraversal = function (root) {
  if (!root) return [];

  var result = [];

  function inorder(node) {
    if (!node) return null;

    inorder(node.left);
    result.push(node.val);
    inorder(node.right);
  }

  inorder(root);

  return result;
};

/**
 *  解法二
 *  栈
 * @param {*} root
 */
var inorderTraversal = function (root) {
  var stack = [];
  var res = [];

  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }

    var cur = stack.pop();
    res.push(cur.val);
    root = cur.right;
  }

  return res;
};

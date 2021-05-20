/**
 *  解法一
 *  递归
 * @param {*} root
 */
var preorder = function (root) {
  if (!root) return [];

  var res = [];

  function inorder(node) {
    if (!node) return;

    res.push(node.val);

    for (var i = 0; i < node.children.length; i++) {
      inorder(node.children[i]);
    }
  }

  inorder(root);

  return res;
};

/**
 *  解法二
 *  迭代
 * @param {*} root
 */
var preorder = function (root) {
  if (!root) return [];

  var stack = [root];
  var res = [];

  while (stack.length > 0) {
    var cur = stack.pop();
    res.push(cur.val);

    for (var i = cur.children.length - 1; i >= 0; i--) {
      stack.push(cur.children[i]);
    }
  }

  return res;
};

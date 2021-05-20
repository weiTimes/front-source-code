/**
 *  解法一
 *  递归
 * @param {*} root
 */
var postorder = function (root) {
  if (!root) return [];

  var res = [];

  function inorder(node) {
    if (!node) return;

    for (var i = 0; i < node.children.length; i++) {
      inorder(node.children[i]);
    }

    res.push(node.val);
  }

  inorder(root);

  return res;
};

/**
 *  解法二
 *  迭代 将前序遍历得到的结果反转
 * @param {*} root
 */
var postorder = function (root) {
  if (!root) return [];

  var res = [];
  var stack = [root];

  while (stack.length) {
    var cur = stack.pop();
    res.push(cur.val);

    for (var i = 0; i < cur.children.length; i++) {
      stack.push(cur.children[i]);
    }
  }

  return res.reverse();
};

/**
 *  解法一
 *  使用队列，队列的长度表示每一层的节点数，遍历完当前队列，即把得到的list存入res中
 *  遵循先进先出，每个队列项都去除孩子节点放入队列中，表示了下一层的节点
 * @param {*} root
 */
var levelOrder = function (root) {
  if (!root) return [];

  var res = [];
  var queue = [root];

  while (queue.length > 0) {
    var len = queue.length;
    var list = [];

    for (var i = 0; i < len; i++) {
      var cur = queue.shift();
      list.push(cur.val);

      for (var j = 0; j < cur.children.length; j++) {
        queue.push(cur.children[j]);
      }
    }

    res.push(list);
  }

  return res;
};

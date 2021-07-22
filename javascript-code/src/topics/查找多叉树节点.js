/*
 * @Author: yewei
 * @Date: 2021-07-19 13:49:12
 * @Last Modified by: yewei
 * @Last Modified time: 2021-07-19 14:18:54
 *
 *
a、自定义多叉树节点node结构（只需要定义节点结构即可，无需构建树）
b、按照广度优先查找符合要求的节点（没有符合要求的节点返回null），比如查找电话号码为 phone的用户信息，调用如下：
let node = wideTraversal(node,(e)=>e.phone===phone)
 */

class TreeNode {
  constructor(phone, children) {
    this.phone = phone;
    this.children = children;
  }
}

const tree = {
  phone: '1',
  children: [
    {
      phone: '11',
      children: [
        {
          phone: '111',
          children: [
            {
              phone: '1111',
              children: [
                {
                  phone: '1516',
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      phone: '12',
      children: [
        {
          phone: '121',
          children: [
            {
              phone: '189',
              children: [],
            },
          ],
        },
      ],
    },
    {
      phone: '13',
      children: [
        {
          phone: '131',
          children: [],
        },
      ],
    },
  ],
};

const wideTraversal = (node, traverseFunc) => {
  if (!node) return null;

  let queue = [node];

  const size = () => queue.length;
  const isEmpty = () => size() === 0;

  while (!isEmpty()) {
    const len = size();

    for (let i = 0; i < len; i++) {
      const topNode = queue.shift();

      if (traverseFunc(topNode)) {
        Reflect.deleteProperty(topNode, 'children');

        return topNode;
      }

      queue = [...queue, ...topNode.children];
    }
  }

  return null;
};

const key = '199';

const node = wideTraversal(tree, (e) => e.phone === key);

console.log(node, key);

/*
 * @Author: yewei
 * @Date: 2021-06-24 21:09:51
 * @Last Modified by: yewei
 * @Last Modified time: 2021-06-25 09:21:58
 *
 * interface Node {
 *   id: number;
 *   name: string;
 *   score?: number; // 只有老师（叶子）节点才有
 *   children: Node[];
 * }
 *
 * TeamScorePercent = 子节点下面所有老师得分总数 / 子节点下面所有老师数量
 *
 * 找出 TeamScorePercent 排名前 3 的非老师节点
 */
import data from './averageNode.json';

console.log(data, 'data');

const findTopThreeNode = (nodes) => {
  if (!nodes) return [];

  const res = [];

  const calulate = (node) => {
    if (Reflect.has(node, 'score')) {
      return { score: node.score, num: 1 };
    } else {
      let sum = 0;
      let count = 0;

      for (const childNode of node.children) {
        const { score, num } = calulate(childNode);

        sum += score;
        count += num;
      }

      const average = count === 0 ? 0 : sum / count;

      res.push({ name: node.name, average });

      return { score: sum, num: count };
    }
  };

  for (const node of nodes) {
    calulate(node);
  }

  res.sort((a, b) => b.average - a.average);

  return res.slice(0, 3);
};

console.log(findTopThreeNode(data));

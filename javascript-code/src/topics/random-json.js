/*
 * @Author: yewei
 * @Date: 2021-03-23 18:42:19
 * @Last Modified by: yewei
 * @Last Modified time: 2021-03-23 19:05:05
 *
 * 随机生成一段json
 *
 * level => json 的层级maxChildren => 属性最大数目数
 * jsongenerateJson(level, maxChildren) {}
 */

function jsongenerateJson(level, maxChildren) {
  const obj = Object.create(null);
  const maxLevel = level;

  function recursion(obj, level) {
    if (level <= 0) return;

    const len = Math.floor(Math.random(0, 1) * maxChildren + 1);

    const curLevel = maxLevel - level + 1;
    obj.val = curLevel;
    obj.children = new Array(len).fill({ val: curLevel }).map((child) => {
      recursion(child, level - 1);

      return child;
    });
  }

  recursion(obj, level);

  return obj;
}

console.log(jsongenerateJson(2, 5), 'json');

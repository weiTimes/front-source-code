/*
 * @Author: yewei
 * @Date: 2021-05-21 16:25:15
 * @Last Modified by: yewei
 * @Last Modified time: 2021-05-21 16:39:02
 *
 * 查找dom中包含img标签的dom
 */
const getCurrentImgParents = (img, res) => {
  let node = img.parentNode;

  while (node) {
    res.push(node);
    node = node.parentNode;
  }
};

const searchContainImgElements = () => {
  const domsWithImg = document.querySelectorAll('img');

  const res = [];

  Array.from(domsWithImg).forEach((img) => {
    getCurrentImgParents(img, res);
  });

  return Array.from(new Set(res));
};

console.log(searchContainImgElements());

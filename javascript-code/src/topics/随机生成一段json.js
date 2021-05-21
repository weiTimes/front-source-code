/*
 * @Author: yewei
 * @Date: 2021-05-21 16:23:41
 * @Last Modified by: yewei
 * @Last Modified time: 2021-05-21 17:23:02
 *
 * 随机生成一段 json
 */

/**
 *
 * @param {*} level 目标 json 的层级
 * @param {*} maxChildren 属性最大的数目数，每一层级的属性随机
 */
const generateJson = (level = 0, maxChildren = 0) => {
  if (!level) return {};

  const plainObject = () => Object.create(null);

  const random = () => Math.floor(Math.random() * maxChildren);

  const createObj = (l) => {
    const obj = plainObject();
    const propertyLength = random();

    Array.from({ length: propertyLength }, (v, i) => {
      obj[`${l}-${i}`] = l < level ? createObj(l + 1) : undefined;
    });

    return obj;
  };

  return createObj(1);
};

console.log(generateJson(5, 20));

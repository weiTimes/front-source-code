/*
 * @Author: yewei
 * @Date: 2021-06-10 13:09:23
 * @Last Modified by: yewei
 * @Last Modified time: 2021-06-10 13:11:08
 */

/**
 * 解法1：用两个标记数组记录每一行每一列是否有 0 出现，二次遍历时，判断该行列是否为 true，如果是则置为 0
 * 时间复杂度 O(mn)
 * 空间复杂度 O(m + n)
 */
var setZeroes = function (matrix) {
  const rowLen = matrix.length;
  const colLen = matrix[0].length;
  let rows = new Array(rowLen).fill(false);
  let cols = new Array(colLen).fill(false);

  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      if (matrix[i][j] === 0) {
        rows[i] = true;
        cols[j] = true;
      }
    }
  }

  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      if (rows[i] || cols[j]) {
        matrix[i][j] = 0;
      }
    }
  }
};

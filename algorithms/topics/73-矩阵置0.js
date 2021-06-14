/*
 * @Author: yewei
 * @Date: 2021-06-10 13:09:23
 * @Last Modified by: yewei
 * @Last Modified time: 2021-06-10 22:16:42
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

/**
 * 解法2：
 * 使用行首和列首作为标记位，遇到 0，将所在行的列首和所在列的行首标记位 0。
 * 时间复杂度: O(mn)
 * 空间复杂度: O(1)
 * @param {*} matrix
 * @returns
 */
var setZeroes2 = function (matrix) {
  const rowLength = matrix.length;
  const colLength = matrix[0].length;

  let firstRowHasZero = false;
  let firstColHasZero = false;

  // 判断首行首列是否有 0，并作好标记
  for (let i = 0; i < rowLength; i++) {
    for (let j = 0; j < colLength; j++) {
      if (matrix[0][j] === 0) {
        firstRowHasZero = true;
      }

      if (matrix[i][0] === 0) {
        firstColHasZero = true;
      }
    }
  }

  // 遍历非首行首列，将为 0 的状态移到行首和列首
  for (let i = 1; i < rowLength; i++) {
    for (let j = 1; j < colLength; j++) {
      if (matrix[i][j] === 0) {
        matrix[0][j] = 0;
        matrix[i][0] = 0;
      }
    }
  }

  // 根据行首和列首的 0 的位置，将该行和该列都置为 0
  for (let i = 1; i < rowLength; i++) {
    for (let j = 1; j < colLength; j++) {
      if (matrix[0][j] === 0 || matrix[i][0] === 0) {
        matrix[i][j] = 0;
      }
    }
  }

  // 根据行首和列首的标记，处理行首和列首的为 0 情况
  if (firstRowHasZero) {
    for (let i = 0; i < colLength; i++) {
      matrix[0][i] = 0;
    }
  }

  if (firstColHasZero) {
    for (let i = 0; i < rowLength; i++) {
      matrix[i][0] = 0;
    }
  }

  return matrix;
};

/*
 * @Author: yewei 
 * @Date: 2020-12-02 14:14:19 
 * @Last Modified by: yewei
 * @Last Modified time: 2020-12-02 14:24:30
 * 
### 股票的最大利润

```js
假设把某股票的价格按照时间先后顺序存储在数组中，请问买卖该股票一次可能获得的最大利润是多少？
示例 1:
输入: [7,1,5,3,6,4]
输出: 5
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格。
示例 2:
输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
限制：
0 <= 数组长度 <= 10^5
```
 * 
 */
// 解法一
function getMax(array) {
  if (!array || array.length > Math.pow(10, 5)) return array;

  var j = 0;
  var max = 0;

  for (var i = 0; i < array.length; i++) {
    j = i + 1;
    while (j++ < array.length) {
      if (array[j] > array[i]) {
        max = Math.max(max, array[j] - array[i]);
      }
    }
  }

  return max;
}
// 解法二
function getMax(array) {
  if (!array || array.length > Math.pow(10, 5)) return array;

  var left = 0;
  var right = array.length - 1;
  var min = array[left];
  var max = array[right];

  while (left < right) {
    if (array[left] < min) {
      min = array[left];
    }

    if (array[right] > max) {
      max = array[right];
    }

    left++;
    right--;
  }

  return Math.max(0, max - min);
}

console.log(getMax([7, 1, 5, 3, 6, 4]));
console.log(getMax([7, 6, 4, 3, 1]));

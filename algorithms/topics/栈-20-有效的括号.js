/*
 * @Author: yewei
 * @Date: 2020-12-09 15:43:12
 * @Last Modified by: yewei
 * @Last Modified time: 2020-12-09 15:45:54
 *
 *  使用栈
 *  遍历字符串，匹配左边的括号，然后将其相对应的括号入栈
 *  1. 匹配不到时，执行出栈，与当前遍历到的元素进行对比，遇到不相等则表明不是有效的括号
 *  2. 如第一次就匹配不到，判断栈是否为空，为空则不是有效的括号
 */

var isValid = function (s) {
  var stack = [];

  for (var i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push(')');
    } else if (s[i] === '{') {
      stack.push('}');
    } else if (s[i] === '[') {
      stack.push(']');
    } else if (stack.length === 0 || stack.pop() !== s[i]) {
      return false;
    }
  }

  return stack.length === 0;
};

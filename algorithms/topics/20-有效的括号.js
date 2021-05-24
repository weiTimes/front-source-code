function isValid(s) {
  if (!s) return true;

  const validMap = { '[': ']', '{': '}', '(': ')' };

  let stack = [];
  let i = 0;

  while (i < s.length) {
    const cur = s[i];

    if (Object.hasOwnProperty.call(validMap, cur)) {
      stack.push(cur);
    } else {
      if (validMap[stack.pop()] !== cur) {
        return false;
      }
    }

    i++;
  }

  return stack.length === 0;
}

console.log(isValid('{[()]}'));

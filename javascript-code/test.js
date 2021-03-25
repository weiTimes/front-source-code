const array = [1, 2, 3, [3, 3, 3, [5, 4, 5, 6, 6, 7, 8]], [333, 4444]];

function arrayReduce(array) {
  return array.reduce((pre, cur) => {
    if (Array.isArray(cur)) {
      return [...pre, ...arrayReduce(cur)];
    } else {
      return [...pre, cur];
    }
  }, []);
}

console.log(arrayReduce(array));

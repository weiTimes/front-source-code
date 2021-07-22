const instanceofFunc = (left, right) => {
  const rightProto = right.prototype;

  console.log(Array, 'array');

  let leftProto = left.__proto__;

  while (leftProto !== null) {
    if (leftProto === rightProto) return true;

    console.log(left.__proto__, 'obj');

    leftProto = left.__proto__;
  }

  return false;
};

console.log(instanceofFunc([], Array));

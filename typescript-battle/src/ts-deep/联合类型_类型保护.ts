interface Bird {
  fly: boolean;
  sing: () => {};
}

interface Dog {
  fly: boolean;
  bark: () => {};
}

// 类型保护-类型断言
function trainAnimal(animal: Bird | Dog) {
  if (animal.fly) {
    (animal as Bird).sing();
  } else {
    (animal as Dog).bark();
  }
}

// 类型保护-in语法
function trainAnimalSecond(animal: Bird | Dog) {
  if ('sing' in animal) {
    animal.sing();
  } else {
    animal.bark();
  }
}

// 类型保护-typeof
function add(first: number | string, second: number | string) {
  if (typeof first === 'string' || typeof second === 'string')
    return `${first}${second}`;

  return first + second;
}

class NumberObj {
  count: number;
}

// instanceof
function addSecond(first: object | NumberObj, second: object | NumberObj) {
  if (first instanceof NumberObj && second instanceof NumberObj) {
    return first.count + second.count;
  }
  return 0;
}

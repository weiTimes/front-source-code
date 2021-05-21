interface Person {
  name: string;
  age: number;
  gender: string;
}

class Teacher {
  constructor(private info: Person) {}

  // 泛型继承Person的属性名称，keyof表示循环遍历Person的属性
  getInfo<T extends keyof Person>(key: T): Person[T] {
    return this.info[key];
  }
}

const teacher = new Teacher({
  name: 'yewei',
  age: 26,
  gender: 'male',
});

const text = teacher.getInfo('age');

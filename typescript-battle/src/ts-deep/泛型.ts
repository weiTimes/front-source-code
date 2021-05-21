// 泛型 generic 泛指的类型

// --函数泛型
function join<T, P>(first: T, second: P) {
  return `${first}${second}`;
}

function map<T>(params: T[]) {
  return params;
}

join<string, number>('1', 2);
map<string>(['1']);

// --类泛型
interface Item {
  name: string;
}

// T extends string | nubmer
class DataManager<T extends Item> {
  constructor(private data: T[]) {}

  getItem(index: number): string {
    return this.data[index].name;
  }
}

const data = new DataManager([{ name: 'yewei' }]);

// --使用泛型作为一个具体的类型注解
const func: <T>(params: T) => T = <T>(params: T) => params;

func('1'); // 会推断出T的类型是string，表示func函数接收string的类型，并且参数和返回值都是string

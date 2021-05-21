/** 简易的decorator */
// function addActionWrap(flag: boolean) {
//   if (flag) {
//     return function addAction(constructor: any) {
//       constructor.prototype.run = function () {
//         console.log("I'm running");
//       };
//     };
//   } else {
//     return function addAction(constructor: any) {};
//   }
// }

// @addActionWrap(false)
// class Person {}

// const yw = new Person();

// (yw as any).run();

/** 复杂的decorator */
// 泛型T继承自一个可以接收任何参数的实例化对象
// function addAction<T extends new (...args: any[]) => {}>(constructor: T) {
//   return class extends constructor {
//     name = '扩展名';

//     getName() {
//       return this.name;
//     }
//   };
// }

// @addAction
// class Person {
//   name: string;

//   constructor(name: string) {
//     this.name = name;
//   }
// }

// const yw = new Person('yewei');
// console.log(yw);

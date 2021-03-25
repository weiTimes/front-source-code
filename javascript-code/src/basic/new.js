/*
 * @Author: yewei
 * @Date: 2021-03-18 22:17:46
 * @Last Modified by: yewei
 * @Last Modified time: 2021-03-21 16:05:11
 *
 * 实现 new 操作符
 */
function create() {
  // 创建新对象
  var obj = new Object();

  // 获取传入的构造函数
  var Con = [].shift.call(arguments);

  // 继承该构造函数的原型
  obj.__proto__ = Con.prototype;
  // 调用父构造函数实现继承（执行构造函数中的代码）
  var ret = Con.apply(obj, arguments);

  // 如果调用构造函数返回的是对象，则返回该对象，否则返回新创建的对象
  return ret instanceof Object ? ret : obj;
}

function Person(name) {
  this.name = name;
}
Person.prototype.getName = function () {
  return `Hi, ${this.name}`;
};

var ywhoo = create(Person, 'yewei');
console.log(ywhoo.getName());

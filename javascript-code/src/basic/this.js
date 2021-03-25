function foo(greeting) {
  return this.name + greeting;
}

const o = {
  name: 'ywhoo, ',
};

// 实现 bind，可以显示地绑定函数的 this 到指定的对象上。
function bind(fn, obj) {
  return function () {
    return fn.apply(obj, arguments);
  };
}

const greet = bind(foo, o);

console.log(greet('hello'));

// 软绑定
if (!Function.prototype.softBind) {
  Function.prototype.softBind = function (obj) {
    let fn = this;

    const curried = [].slice.call(arguments, 1);
    const bound = function () {
      // 如果 this 为 undefined 或 指向 window/glboal，使用软绑定的对象，否则使用其它绑定规则的绑定对象。
      const _this = !this || this === global ? obj : this;

      // 返回的函数的原型和调用函数的原型一致
      bound.prototype = fn.prototype;
      fn.apply(_this, curried.concat(curried, arguments));
    };

    return bound;
  };
}

const obj = { name: 'obj' };
const obj2 = { name: 'obj2' };
const obj3 = { name: 'obj3' };

function yw() {
  console.log('name:' + this.name);
}

const ywBind = yw.softBind(obj);

// 默认绑定规则
ywBind(); // name: obj

// 隐式绑定规则
obj2.yw = yw.softBind(obj);
obj2.yw(); // name: obj2

// 显示绑定规则
ywBind.call(obj3); // name: obj3

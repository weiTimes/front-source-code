/*
 * @Author: yewei
 * @Date: 2021-03-23 12:49:44
 * @Last Modified by: yewei
 * @Last Modified time: 2021-03-23 14:19:07
 *
 * 发布订阅模式
 * 实现一个 Events 模块，可以实现自定义事件的订阅、触发、移除功能
 *
 * const fn1 = (...args) => console.log('I want sleep1', ...args);
 * const fn2 = (...args) => console.log('I want sleep2', ...args);
 *
 * const event = new Events();
 *
 * event.on('sleep', fn1, 1, 2, 3);
 * event.on('sleep', fn2, 1, 2, 3);
 *
 * event.fire('sleep', 4, 5, 6);
 *
 * event.off('sleep', fn1);
 * event.once('sleep', () => console.log('I want sleep'))
 * event.fire('sleep');
 *
 * event.fire('sleep');
 */

class Events {
  constructor() {
    this.events = new Map();
  }

  addEvent(key, fn, isOnce, ...args) {
    const event = this.events.get(key);

    const map = event ? event : this.events.set(key, new Map()).get(key);

    map.set(fn, (...args1) => {
      fn(...args, ...args1);

      if (isOnce) {
        // 只执行一次，执行完后就删除 map 对应的函数映射
        this.off(key, fn);
      }
    });
  }

  // 注册事件
  on(key, fn, ...args) {
    if (!fn) {
      console.log('没有传入回调函数');
    }

    this.addEvent(key, fn, false, ...args);
  }

  // 触发事件
  fire(key, ...args) {
    if (!this.events.get(key)) {
      console.log(`没有注册 ${key} 事件`);
      return;
    }

    for (let [, cb] of this.events.get(key).entries()) {
      cb(...args);
    }
  }

  // 移除事件
  off(key, fn) {
    if (this.events.get(key)) {
      this.events.get(key).delete(fn);
    }
  }

  // 只执行一次
  once(key, fn, args) {
    this.addEvent(key, fn, true, args);
  }
}

const events = new Events();

const fn1 = (...args) => console.log('I want sleep1', ...args);
const fn2 = (...args) => console.log('I want sleep2', ...args);

events.on('sleep', fn1, 1, 2);
events.on('sleep', fn2, 1, 2);

events.fire('sleep', 3, 4);

console.log('fire------------------');

events.off('sleep', fn1);

events.once('sleep', () => console.log('I want sleep once'));

events.fire('sleep');

console.log('fire------------------');

events.fire('sleep');

console.log('fire------------------');

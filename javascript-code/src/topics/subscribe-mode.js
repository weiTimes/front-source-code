/*
 * @Author: yewei
 * @Date: 2021-03-23 12:49:44
 * @Last Modified by: yewei
 * @Last Modified time: 2021-06-04 16:49:54
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

  on(eventName, fn, ...args) {
    if (!fn) {
      throw new Error('没有传入回调函数！');
    }

    this.addEvent(eventName, fn, false, ...args);
  }

  once(eventName, fn, ...args) {
    if (!fn) {
      throw new Error('没有传入回调函数！');
    }

    this.addEvent(eventName, fn, true, ...args);
  }

  off(eventName, fn) {
    if (!eventName) {
      throw new Error('没有传入事件名');
    }

    this.events.get(eventName).delete(fn);
  }

  fire(eventName, ...args) {
    for (const [, fn] of this.events.get(eventName)) {
      fn(...args);
    }
  }

  addEvent(eventName, fn, isOnce, ...args) {
    let eventMap = this.events.get(eventName);

    if (!eventMap) {
      eventMap = this.events.set(eventName, new Map()).get(eventName);
    }

    eventMap.set(fn, (...args1) => {
      fn(...args, ...args1);

      if (isOnce) {
        this.off(eventName, fn);
      }
    });
  }
}

const events = new Events();

const workMe = (tool, doc) => {
  console.log('我正在工作...', tool, doc);
};

const workShe = (tool, doc) => {
  console.log('她正在工作...', tool, doc);
};

events.on('work', workMe, 'Mac Pro.');
events.on('work', workShe, 'windows');

events.fire('work', '迭代1.0.0');

events.off('work', workShe);

console.log('-----------移除 她的工作-----------');

events.fire('work', '迭代1.0.1');

console.log('-----------只玩一把游戏-----------');

const playGame = (game) => {
  console.log('我正在玩' + game);
};
events.once('play', playGame, '王者荣耀');

events.fire('play');
events.fire('play');

console.log('---------移除娱乐');

events.off('play', playGame);
events.fire('play');

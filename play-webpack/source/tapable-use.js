const { SyncHook } = require('tapable');

const hook = new SyncHook(['h', 'e', 'l']);

hook.tap('myhook', (a, b, c) => {
  console.log(a, b, c);
});

hook.call(1, 2, 3);

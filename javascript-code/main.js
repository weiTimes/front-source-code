import './style.css';

// import './src/promise/xhr-deferred';
// import './src/promise/xhr-cancel';
// import './src/promise/concurrent-request';
// import './src/subject/array-flat';
// import './src/basic/深浅拷贝';
// import './test';
// import './src/topics/查找dom中包含img标签的dom';
// import './src/topics/随机生成一段json';
// import './src/topics/实现一个 flat 方法，可以根据传入的层级展开对应深度的数组嵌套';
// import './src/topics/统计数组中出现次数最多的字母前的数字和';
// import './src/topics/求所有非叶子节点的平均数';
// import './src/topics/获取模块引用关系';
// import './src/topics/地址字符串解析';
// import './src/topics/js判断一个对象是数组的方式';
// import './src/basic/instanceof';
// import './src/basic/promise-all';
// import './src/basic/promise-allsettled';
// import './src/topics/设计一种请求池，支持传入最大并发数';
// import './src/topics/移除dom树上的class属性';
import './src/promise/promise-full';

const prosimify = (fn) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) return reject(err);

        resolve(result);
      });
    });
  };
};

const prosimifyAll = (target) => {
  Reflect.ownKeys(target).forEach((value) => {
    if (typeof target[value] === 'function') {
      target[`${value}Async`] = prosimify(target[value]);
    }
  });
};

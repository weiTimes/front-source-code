/*
 * @Author: yewei
 * @Date: 2021-07-14 20:31:19
 * @Last Modified by: yewei
 * @Last Modified time: 2021-07-14 20:51:04
 *
 * 实现retry(func, times, interval)，如果func失败了，会在interval后重试，最大重试次数times（func可能是异步）
 */
const retry = (func, times = 0, interval = 1000) => {
  let count = 0;
  let timer = null;

  const fn = async () => {
    try {
      await func();
    } catch (error) {
      console.log(`捕获到错误信息 ${error}`);

      if (times > 0 && count < times) {
        timer = setTimeout(() => {
          count += 1;
          console.log(`正在执行第 ${count} 次重试`);

          fn();
        }, interval);
      }
    }
  };

  fn();
};

const execute = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('请求失败了');
    }, 2000);
  });
};

retry(execute, 5);

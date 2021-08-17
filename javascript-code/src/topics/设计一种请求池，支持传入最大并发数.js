/*
 * @Author: yewei
 * @Date: 2021-03-22 18:03:47
 * @Last Modified by: yewei
 * @Last Modified time: 2021-08-14 14:19:00
 *
 * 设计一种请求池，支持传入最大并发数：
 *
 * function createRequest({ pool = 3 }) {}
 * const request = createRequest({ pool: 5 });
 * Array(10).fill(1).forEach(() => request('http://xxx'));
 */
function createRequest({ pool = 3 }) {
  const queue = [];
  const waitQueue = [];

  const toQueueAndExecute = (url) => {
    const promise = fetch(url, { method: 'POST' }).then(async (res) => {
      queue.splice(queue.indexOf(promise), 1);

      if (waitQueue.length > 0) {
        toQueueAndExecute(waitQueue.shift());
      }
    });

    queue.push(promise);
  };

  const request = (url) => {
    if (queue.length < pool) {
      toQueueAndExecute(url);
    } else {
      // 加入等待队列
      waitQueue.push(url);
    }
  };

  return request;
}

const request = createRequest({ pool: 2 });

new Array(11)
  .fill('http://localhost:3300/user/info')
  .map((url) => request(url));

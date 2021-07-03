/*
 * @Author: yewei
 * @Date: 2021-07-02 13:48:08
 * @Last Modified by:   yewei
 * @Last Modified time: 2021-07-02 13:48:08
 *
 * 支持重试机制，重试的时间是上一次的 2 倍
 */

const request = (url, options = { isRetry: true, retryCount: 5 }) => {
  return new Promise((resolve, reject) => {
    const { isRetry, retryCount } = options;
    let reCount = 0;
    let retryDelay = 200;
    let timer = null;

    function retry() {
      if (reCount < retryCount) {
        clearTimeout(timer);

        timer = setTimeout(() => {
          fn();
          reCount++;

          console.log(
            `正在尝试第${reCount}次重试，延时时间：${retryDelay / 1000}s~`
          );

          retryDelay *= 2;
        }, retryDelay);
      } else {
        reject('请求失败，请稍后再试~');
      }
    }

    const fn = () => {
      return fetch(url)
        .then((res) => res.json)
        .then((res) => resolve(res))
        .catch((e) => {
          if (isRetry) retry();
        });
    };

    fn();
  });
};

request('http://ywhoo.com/api/v1/sayno')
  .then((res) => console.log(res, '成功'))
  .catch((e) => {
    console.log(e, '失败提示信息');
  });

/*
 * @Author: yewei
 * @Date: 2021-08-13 15:14:28
 * @Last Modified by: yewei
 * @Last Modified time: 2021-08-13 22:16:52
 *
 * 需求：
 * 常见的token过期做法是跳转到登陆页面，但是这样体验可能不太好，现在我们要求过期之后自动刷新token,
 * 然后再去请求，这样用户体验更好，刷新token的方法已经写好了叫refreshToken,
 * 要求封装一个request方法发请求当token过期时自动刷新token,对于request调
 * 用者来说是没有感知的，也就是说调用者是不知道token过期了，刷新token都是request内部自己完成的。
 * 最后一点：如果是同时发起请求的情况下，不做处理可能会refershToken多次，对于并发情况的话，
 * 要求只调用一次refershToken。实现request方法。
 */
const getToken = () => localStorage.getItem('token');
const refreshToken = () => {
  console.log('当过期时，刷新token');
  localStorage.setItem('token', `token-${Math.floor(Math.random(0, 1) * 100)}`); // 模拟
};
const throttle = (fn, delay) => {
  let isRunning = false;

  return function () {
    if (isRunning) return;

    isRunning = true;
    fn();

    setTimeout(() => {
      isRunning = false;
    }, delay);
  };
};
const refreshTokenWithThrottle = throttle(refreshToken, 2000);

const request = (url = '', options = { method: 'GET' }) => {
  let headers = {};

  if (getToken()) {
    headers = { ...headers, Authorization: `Bearer ${getToken()}` };
  }

  return fetch(url, {
    ...options,
    headers,
  }).then(async (res) => {
    const data = await res.json();

    if (data.code === 403) {
      // 过期，先刷新token，然后重新请求
      refreshTokenWithThrottle();
      request(url, options);
    }

    return data;
  });
};

request('http://localhost:3300/user/info', { method: 'POST' }).then((res) =>
  console.log(res)
);

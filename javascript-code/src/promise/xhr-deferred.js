/*
 * @Author: yewei
 * @Date: 2021-03-23 21:20:33
 * @Last Modified by: yewei
 * @Last Modified time: 2021-03-23 21:31:11
 *
 * 实现简易版的 Deferred
 * Deferred 拥有对 Promise 的控制权，即能对 Promise 对象的状态进行 resolve、reject 等方法的调用
 *
 * 不需要将代码包裹在 new Promise 中，更易读
 */
function Deferred() {
  this.promise = new Promise(
    function (resolve, reject) {
      this._resolve = resolve;
      this._reject = reject;
    }.bind(this)
  );
}
Deferred.prototype.resolve = function (value) {
  this._resolve.call(this.promise, value);
};
Deferred.prototype.reject = function (reason) {
  this._reject.call(this.promise, reason);
};

function getUrl(url) {
  const deferred = new Deferred();
  const req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.onload = function () {
    if (req.status === 200) {
      deferred.resolve(req.responseText);
    } else {
      deferred.reject(req.status);
    }
  };
  req.onerror = function () {
    deferred.reject(req.responseText);
  };
  req.send();

  return deferred.promise;
}

getUrl('http://localhost:3000/api/hello')
  .then((res) => console.log(JSON.parse(res), 'defer'))
  .catch((err) => console.error(err));

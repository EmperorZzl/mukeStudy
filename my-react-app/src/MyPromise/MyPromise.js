/**
 * 1.new Promise 时，需要传递一个executor执行器，执行器立刻执行
 * 2.executor 接收俩个参数，分别是resolve和reject
 * 3.promise 只能从pending到rejected，或者从pengding到fulfilled
 * 4.promise的状态一旦确认，就不会发生改变
 * 5.promise 都有then方法，then接收俩个参数，分别是promise成功的回调onfulfilled，和promise失败的回调onRejected
 * 6.如果低矮哦用then时，promise已经成功，则执行onFulfilled，并将promise的值作为参数传递进去。
 *    如果promise已经失败，那么执行 onRejected,并将promise失败的原因作为参数传递进去。
 *    如果promise的状态是pending，需要将onFulfilled和onRejected函数存放起来，等待状态确认后，在依次将对应的函数执行（发布订阅）
 * 7.then 的参数onFulfilled和onRejected可以缺省
 * 8.promise 可以then多次，promise的then方法返回一个promise
 * 9.如果then 返回的是一个结果，那么就会把这个结果作为参数，传递给下一个then的成功的回调（onFulfilled)
 * 10.如果then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败的回调（onRejected)
 * 11.如果 then返回的是一个promise，那么需要等这个promise，那么回等这个promise执行完，promise如果成功就会走下一个then的成功，如果失败，就走下一个then的失败。
 * 
 */
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(executor) {
  let self = this;
  self.status = PENDING;
  self.onFulfilled = [];//成功的回调
  self.onRejected = [];//失败的回调

  function resolve(value) {
    if (self.status === PENDING) {
      self.status = FULFILLED;
      self.value = value;
      self.onFulfilled.forEach((fn) => fn());
    }
  }
  function reject(reason) {
    if (self.status === PENDING) {
      self.status = REJECTED;
      self.reason = reason;
      self.onRejected.forEach((fn) => fn());
    }
  }
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
  console.log('self', self);
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  onRejected = typeof onRejected === 'function' ? onRejected : value => value;
  let self = this;
  let promise2 = new MyPromise((resolve, reject) => {
    if (self.status === FULFILLED) {
      setTimeout(() => {
        try {
          let x = onFulfilled(self.value);
          console.log('xxxx',x,self.value)
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      })
    } else if (self.status === REJECTED) {
      setTimeout(() => {
        try {
          let x = onRejected(self.reason);
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e);
        }
      })
    } else if (self.status === PENDING) {
      self.onFulfilled.push(() => {
        setTimeout(() => {
          try {
            let x = onFulfilled(self.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        })
      });
      self.onRejected.push(() => {
        setTimeout(() => {
          try {
            let x = onRejected(self.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        })
      })
    }
  })
  return promise2;
}
function resolvePromise(promise2, x, resolve, reject) {
  let self = this;
  if (promise2 === x) {
    reject(new TypeError('Chaining cycle'));
  }
  if (x && typeof x === 'object' || typeof x == 'function') {
    let used;
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, (y) => {
          if (used) return;
          used = true;
          resolvePromise(promise2, y, resolve, reject);
        }, (r) => {
          if (used) return;
          used = true;
          reject(r);
        });
      } else {
        if (used) { return; }
        used = true;
        resolve(x);
      }
    } catch (e) {
      if (used) return;
      used = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

export default MyPromise;

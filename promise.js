var p1 = new Promise((resolve, reject) => {
  resolve("give");
});

var p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("give1");
  }, 5000);
});


// promise.all => give prirority to reject. time is not matter if it is a reject it should throw reject.
Promise.all([p1, p2]).then((res) => {
  console.log(res);
});

//output : 
node:internal/process/promises:288
            triggerUncaughtException(err, true /* fromPromise */);
            ^

[UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "give1".] {
  code: 'ERR_UNHANDLED_REJECTION'
}
-----------------------------------------------------------------------
var p1 = new Promise((resolve, reject) => {
  reject("give");
});

var p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("give1");
  }, 5000);
});

// it wont wait for all promise to be setttled if reject is there it should reject immediately
--------------------------------------------------------------------------
// promise.allSettled => either resolve or reject not an matter it should wait for all promise to be settled and return the status
Promise.allSettled([p1, p2]).then((res) => {
  console.log(res);
});

//output: 
[
  { status: 'fulfilled', value: 'give' },
  { status: 'rejected', reason: 'give1' }
]

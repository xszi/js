/**
 *  promise then()
 */
function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
    });
}

timeout(100).then((value) => {
    console.log(value);
});
/**
 *  promise all()
 */
const p1 = new Promise((resolve, reject) => {
    resolve('hello');
})
    .then(result => result)
    .catch(e => e);

const p2 = new Promise((resolve, reject) => {
    throw new Error('报错了');
})
    .then(result => result)
    .catch(e => e);

Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(e => console.log(e));
/**
 *  promise race()
 */
const p = Promise.race([
    new Promise(function (resolve, reject) {
        setTimeout(() => resolve(1), 1000)
    }),
    new Promise(function (resolve, reject) {
        setTimeout(() => resolve(5), 5000)
    })
]);

p
    .then(console.log)
    .catch(console.error);

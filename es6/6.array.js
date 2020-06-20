/**
 *  扩展运算符
 */
function add(x, y) {
    return x + y;
}

const numbers = [4, 38];
add(...numbers) // 42

/* 替代函数的 apply 方法 */
// ES5 的写法
function f(x, y, z) {
    // ...
}
var args = [0, 1, 2];
f.apply(null, args);

// ES6的写法
function f(x, y, z) {
    // ...
}
let args = [0, 1, 2];
f(...args);
/**
 *  from（）
 */
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
/**
 *  find()
 */
[1, 4, -5, 10].find((n) => n < 0)
// -5
/**
 *  flat()
 */
    [1, 2, [3, 4]].flat()
// [1, 2, 3, 4]
    [1, 2, [3, [4, 5]]].flat()
// [1, 2, 3, [4, 5]]

    [1, 2, [3, [4, 5]]].flat(2)
// [1, 2, 3, 4, 5]
/**
 *  fill()
 */
    ['a', 'b', 'c'].fill(7)
// [7, 7, 7]
    ['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']

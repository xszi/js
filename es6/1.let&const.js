/**
 * 块级作用域
 */
/* let 只在代码块内有效，var全局有效 */
{
    let a = 10;
    var b = 1;
}
console.log(a);// ReferenceError: a is not defined.
console.log(b);// 1

/* for循环使用避免污染其他作用域 */

for (let i = 0; i < 10; i++) {
    // ...
}
console.log(i);// ReferenceError: i is not defined

for (var i = 0; i < 10; i++) {
    // ...
}
console.log(i);// 10
/* 块级作用域在函数内 */
function f1() {
    let n = 5;
    if (true) {
        let n = 10;
    }
    console.log(n); // 5
}
/**
 * 无变量提升
 */
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
/**
 * 暂时性死区
 */
var tmp = 123;

if (true) {
    tmp = 'abc'; // ReferenceError
    let tmp;
}
//ES6 规定暂时性死区和let、const语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量
//从而导致意料之外的行为。这样的错误在 ES5 是很常见的，现在有了这种规定，避免此类错误就很容易了。

/**
 * 不允许重复声明
 */
// 报错
function func() {
    let a = 10;
    var a = 1;
}

// 报错
function func() {
    let a = 10;
    let a = 1;
}
/**
 * const常量不可变
 */
const PI = 3.1415;
console.log(PI); // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.

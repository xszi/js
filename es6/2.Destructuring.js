/**
 * 数组的解构赋值
 */
/* 过去 */
let a = 1;
let b = 2;
let c = 3;
/* 现在 */
let [a, b, c] = [1, 2, 3];

let [foo, [[bar], baz]] = [1, [[2], 3]];
console.log(foo); // 1
console.log(bar); // 2
console.log(baz); // 3

/* 默认值 */
let [foo = true] = [];
foo // true
let [x, y = 'b'] = ['a']; // x='a', y='b'

let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError: y is not defined

/**
 * 对象的解构赋值
 */
/* 对象的属性没有次序 */
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
console.log(foo) // "aaa"
console.log(bar) // "bbb"

/* 对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者 */
/* foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo */
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
foo // error: foo is not defined

const { log } = console;
log('hello') // hello
/* 默认值 */
var {x: y = 3} = {};
y // 3

var {x: y = 3} = {x: 5};
y // 5
/**
 * 字符串的解构赋值
 */
const [a, b, c, d, e] = 'hello';
console.log(a) // "h"
console.log(b) // "e"
console.log(c) // "l"
console.log(d) // "l"
console.log(e) // "o"

let {length : len} = 'hello';
len // 5
/**
 * 函数参数的解构赋值
 */
function add([x, y]){
    return x + y;
}

add([1, 2]); // 3

function move({x, y} = { x: 0, y: 0 }) {
    return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
/**
 * 数值和布尔值的解构赋值
 */
let {toString: s} = 123;
console.log(s === Number.prototype.toString) // true

let {toString: s} = true;
console.log(s === Boolean.prototype.toString) // true

/**
 * 用途
 */
/* 交换变量的值 */
let x = 1;
let y = 2;

[x, y] = [y, x];

/* 提取 JSON 数据 */
let jsonData = {
    id: 42,
    status: "OK",
    data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]

/* 从函数返回多个值 */
// 返回一个数组
function example() {
    return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象
function example() {
    return {
        foo: 1,
        bar: 2
    };
}
let { foo, bar } = example();

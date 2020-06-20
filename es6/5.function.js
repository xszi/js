/**
 * 函数参数的默认值
 */
/* 以前 */
function log(x, y) {
    y = y || 'World';
    console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello World
/* 现在 */
function log(x, y = 'World') {
    console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
/**
 * rest参数
 */
// arguments变量的写法
function sortNumbers() {
    //arguments对象不是数组，而是一个类似数组的对象。所以为了使用数组的方法，必须使用Array.prototype.slice.call先将其转为数组
    return Array.prototype.slice.call(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();
/**
 * name
 */

function foo() {}
foo.name // "foo"
const sortNumbers = (...numbers) => numbers.sort();
/**
 * 箭头函数
 */
var f = v => v;

// 等同于
var f = function (v) {
    return v;
};

/* 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象 */
/* settimeout是100毫秒后运行，箭头函数可以让setTimeout里面的this，绑定定义时所在的作用域，而不是指向运行时所在的作用域 */
// ES6
function foo() {
    setTimeout(() => {
        console.log('id:', this.id);
    }, 100);
}

// ES5
function foo() {
    var _this = this;

    setTimeout(function () {
        console.log('id:', _this.id);
    }, 100);
}

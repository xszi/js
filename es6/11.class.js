/**
 *  class
 */

//es5

function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.toString = function () {
    return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);

//es6

class Point {
    //constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}
/**
 *  class
 */
//与 ES5 完全一样，也是使用new命令
class Point {
    // ...
}

// 报错
var point = Point(2, 3);
// 正确
var point = new Point(2, 3);

/**
 * 私有方法
 */
//私有方法和私有属性，是只能在类的内部访问的方法和属性，外部不能访问。这是常见需求，有利于代码的封装，但 ES6 不提供，只能通过变通方法模拟实现
class Widget {

    // 公有方法
    foo (baz) {
        this._bar(baz);
    }

    // 私有方法
    _bar(baz) {
        return this.snaf = baz;
    }

    // ...
}
/**
 * 继承
 */
//Class 可以通过extends关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。
class Point {
}

class ColorPoint extends Point {
}

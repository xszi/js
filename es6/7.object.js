/**
 *  super
 */
//对象obj.find()方法之中，通过super.foo引用了原型对象proto的foo属性
const proto = {
    foo: 'hello'
};

const obj = {
    foo: 'world',
    find() {
        return super.foo;
    }
};

Object.setPrototypeOf(obj, proto);
obj.find(); // "hello"

/**
 *  扩展运算符
 */
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }

/**
 *  Object.is()
 */
//S5 比较两个值是否相等，只有两个运算符：相等运算符（==）和严格相等运算符（===）。它们都有缺点，前者会自动转换数据类型，后者的NaN不等于自身
Object.is('foo', 'foo')
// true
Object.is({}, {})
// false

/**
 *  Object.assign() 浅拷贝
 */
const target = { a: 1 };

const source1 = { b: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
console.log(target) // {a:1, b:2, c:3}

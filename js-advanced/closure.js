

// Javascript语言的特殊之处，就在于函数内部可以直接读取全局变量。
var n=999;
function f1() {
    console.log(n);
}
f1();
// 另一方面，在函数外部自然无法读取函数内的局部变量。
function f2() {
    // 必须加上var声明，否则m为全局变量
    var m=1000;
}
console.log(m);

// 如何从外部读取局变量？
function f3(){
    var a=999;//a对f4 可见
    function f4(){
        console.log(a);
    }
    return f4;
}
var result=f3();
result(); // 999

// 闭包概念：闭包就是能够读取其他函数内部变量的函数。
// 在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。
// 闭包的用途：
// （1）可以读取函数内部的变量；
// （2）让这些变量的值始终保持在内存中。

function f1(){
    var n=999;
    //前面未加var进行声明，所以aAdd是全局的，该匿名函数本身也是一个闭包
    nAdd=function(){n+=1}
    function f2(){
        console.log(n);
    }
    return f2;
}
var result=f1();
result(); // 999
nAdd();
result(); // 1000

// 结果表明，函数f1中的局部变量n一直保存在内存中，并没有在f1调用后被自动清除。
// 原因就在于f1是f2的父函数，而f2被赋给了一个全局变量，这导致f2始终在内存中，而f2的存在依赖于f1，
// 因此f1也始终在内存中，不会在调用结束后，被垃圾回收机制（garbage collection）回收。
// 使用注意事项：
// 1）不能滥用，因为局部变量一直保存在内存中，大量使用会导致内存泄漏；
// 2）闭包会在父函数外部，改变父函数内部变量的值，容易造成混乱。

var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function(){
        return function(){
            console.log("haha"+this);
            return this.name;
        };
    }
};
// 首先需要强调的是，调用this是，this指向当前this所在函数的最近的父对象。
// 关于本题的个人理解:此时this为global对象， 是 javascript 运行时所在宿主环境提供的全局对象，不存在父元素，所以此时name结果为未定义
console.log(object.getNameFunc()());//undefined



var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function(){
        var that = this;//
        return function(){
            console.log(that);
            return that.name;
        };
    }
};
//此时this指向object对象
console.log(object.getNameFunc()());//My Object

// 关于this的总结
// 1.this的值通常是由当前函数的执行环境所决定；
// 2.在全局作用域，this指向全局对象 (window对象)；
// 3.当使用new关键字声明，this指向新建对象；
// 4.我们可以使用call(), bind(), apply()来设置this；
// 5.箭头函数不会绑定this。

// 参考文献：1，https://segmentfault.com/a/1190000009556703
//         2，http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html

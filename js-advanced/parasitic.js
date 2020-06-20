//基本思想：创建一个仅用于封装继承过程的函数，
//该函数在内部实现以某种方式来增强对象，最后再像真地是它做了所有工作一样返回对象。

function createAnother(original) {
    var clone=Object(original);  //通过调用函数创建一个新对象；
    clone.sayHi=function () {    //以某种方式增强一个对象
        console.log('hi');
    };
    return clone;
}

var person={
    name:'waltz',
    friends:['liuxia','liqiang','wenbin']
};

var anotherPerson=createAnother(person);
console.log(anotherPerson.name);
anotherPerson.sayHi();

//存在的问题：会使得不能复用函数而降低效率，与构造函数类似

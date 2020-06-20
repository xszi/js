//2、构造函数模式

 function Person(name,age,job) {
     this.name=name;
     this.age=age;
     this.job=job;
     this.sayName=function () {
         alert(this.name);
     }
 }

//可以这么理解，调用Person函数只完成了属性赋值操作，没有return语句不会返回一个对象，
//只有通过new操作符之后才生成一个对象
var person1=new Person('June',18,'teacher');
var person2=new Person('waltz',26,'coder');

//这两个对象都有一个constructor（构造函数）属性，指向Person

console.log(person1.constructor==Person);
console.log(person2.constructor==Person);

console.log(person1);
console.log(person2);
//与工厂模式对比，有一下不同之处
    //没有显式的创建对象；
    //直接将属性和方法赋给了this对象；
    //没有return语句
    //要使用new创建实例

//***构造函数存在的问题：
//创建了两个完成同样任务的sayName方法

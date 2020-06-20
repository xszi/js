//3、原型方法
//要充分理解原型概念、原理，记住原理图
//（1）
 function Person() {}
 Person.prototype.name='waltz';
 Person.prototype.age=26;
 Person.prototype.job='coder';
 Person.prototype.sayName=function () {
     console.log(this.name);
 }

 var person=new Person();
 person1.name='liu';
 console.log(person1.age);
 person1.sayName();

 console.log(Person.prototype.isPrototypeOf(person1));
 console.log(Object.getPrototypeOf(person1)==Person.prototype);

//判断是否为原型属性的方法
 function hasPrototypeProperty(object,name) {
     return !object.hasOwnProperty(name)&&(name in object);
 }
 console.log(hasPrototypeProperty(person,"name"));


//Object.keys和Object.getOwnPropertyNames()方法都可以用来替代for-in循环

//(2) 更简单的原型语法（用字面量形式定义属性）
function Person() {};
Person.prototype={
   // constructor : Person,//特别指向Person
    name:'waltz',
    age:26,
    job:'coder',
    sayName:function () {
        console.log(this.name);
    }

};

var person=new Person();
console.log(person instanceof Object);
console.log(person instanceof Person);
console.log(person.constructor==Person);
console.log(person.constructor==Object);

//基本思想：使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承

function SuperType(name) {
    this.name=name;
    this.color=['red','blue','green'];
}

SuperType.prototype.sayName=function () {
    console.log(this.name);
}

function SubType(name,age) {
    //通过构造函数继承实例属性
    SuperType.call(this,name);

    this.age=age;
}

// var instance=new SubType('waltz',26);
// console.log(instance.name);
// console.log(instance.sayName());

//通过原型链继承方法
SubType.prototype=new SuperType();
SubType.prototype.constructor=SubType;

SubType.prototype.sayAge=function () {
    console.log(this.age);
};

var instance1=new SubType('waltz','26');
instance1.color.push('black');
console.log(instance1.color);
instance1.sayName();
instance1.sayAge();

var instance2=new SubType('liuxia','25');
console.log(instance2.color);
instance2.sayName();
instance2.sayAge();

//i was too curious about future to look back.

//基本思想：即通过借用构造函数来继承属性，通过原型链的混成模式来继承方法。
//不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型原型的一个副本而已
//就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型

function inheritPrototype(subType,superType) {
    var proto=Object(superType.prototype);//创建对象
    proto.constructor=superType;          //增强对象---为创建的副本添加constructor属性，从而弥补因重写原型而失去的默认的constructor
    subType.prototype=proto;              //指定对象
}

function SuperType(name) {
    this.name=name;
    this.colors=['red','blue','green'];
}

SuperType.prototype.sayName=function () {
    console.log(this.name);
}

function SubType(name,age) {
    SuperType.call(this,name);

    this.age=age;
}

inheritPrototype(SubType,SuperType);

SubType.prototype.sayAge=function () {
    console.log(this.age);
}

var instance=new SubType('waltz',26);
console.log(instance.name);

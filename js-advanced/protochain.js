//原型链的基本思想：利用原型让一个引用类型继承另一个引用类型的属性和方法
//构造函数，原型和实例的关系：每个构造函数都有一个原型对象，
//原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。
//实现的本质是重写原型对象

function SuperType() {
    this.property = true;
    this.name='waltz';
}

SuperType.method.getSuperValue = 
function () {
    return this.property;
};

function SubType() {
    this.subproperty = false;
    this.name='liuxia';
};

//继承了SuperType
SubType.method=new SuperType();

SubType.method.getSubValue=function () {
    return this.subproperty;
};

var instance=new SubType();
console.log(instance.property);
console.log(instance.name);
console.log(instance.getSuperValue());


//给原型添加方法一定要放在替换原型语句之后
function SuperType() {
    this.property=true;
};

SuperType.prototype.getSuperValue=function () {
  return this.property;
};

function SubType() {
    this.subproperty=false;
}

 //继承了SuperType
SubType.prototype=new SuperType();

SubType.prototype.getSubValue=function () {
    return this.subproperty;
};

//重写
SubType.prototype.getSuperValue=function () {
    return false;
}

//特别提醒：在通过原型链实现继承时，不能使用对象字面量创建原型方法，因为这样做会重写原型链。
//因此使用字面量添加新方法，会导致上一行代码无效。
SubType.method={
    getSubValue:function () {
        return this.subproperty;
    },
    someOtherMethod:function () {
        return false;
    }
}

var instance =new SubType();
console.log(instance.getSuperValue());//会报错!

var instance1=new SubType();
var instance2=new SuperType();

console.log(instance1.getSuperValue());
console.log(instance2.getSuperValue());

//原型链的问题
//1、最主要的问题来自包含引用类型值的原型（实例属性变为原型属性）；
//2、在创建子类型的实例时，不能向超类型的构造函数传递参数。

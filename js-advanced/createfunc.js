
//基本思想：在子类型构造函数的内部调用超类型构造函数
function SuperType() {
    this.colors=['red','blue','green'];
}

function SubType() {
    //继承SuperType
    SuperType.call(this);
}

var instance1=new SubType();
instance1.colors.push('black');
console.log(instance1.colors);

var instance2=new SubType();
console.log(instance2.colors);


//传递参数

function SuperType(name) {
    this.name=name;
}

function SubType() {
    //继承了SuperType,同时还传递了参数
    SuperType.call(this,'waltz');

    //实例属性
    this.age=29;
}

var instance=new SubType();
console.log(instance.name);
console.log(instance.age);

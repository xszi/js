//1、工厂模式
function createPerson(name, age, job){
    //可以把name，age，job，想象成原材料
    var o=new Object();
    o.name=name;
    o.age=age;
    o.job=job;
    o.sayName=function(){
        alert(this.name);
    };
    return o;
    //可以把返回的对象o看作工厂生产的产品
}
//函数createPerson为一产品为一个实例对象的工厂
var person1= createPerson('June', 18, 'coder');
var person2= createPerson('waltz' ,26, 'teacher');

console.log(person1);
console.log(person2);

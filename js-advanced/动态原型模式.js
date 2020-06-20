//动态原型模式
function Person(name,age,job) {
    this.name=name;
    this.age=age;
    this.job=job;
    this.friends=['liuxia','lidan'];
    //通过检查某个应该存在的方法是否有效，来觉得是否需要初始化原型
    if(typeof this.sayName!='function'){
        Person.prototype.sayName=function () {
            console.log(this.name);
        }
    }
 }

var person=new Person('jiuhua',26,'coder');
person.sayName();

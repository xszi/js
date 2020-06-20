//组合使用原型模式和构造函数模式
function Person(name,age,job) {
    this.name=name;
    this.age=age;
    this.job=job;
    this.friends=['liuxia','lidan'];
}

Person.prototype={
    constructor:Person,
    sayName:function () {
        console.log(this.name);
    }
}

var person=new Person('waltz',26,'coder');
person.friends.push('liuwu');
console.log(person.friends);
var person1=new Person('wanzi',27,'fixer');
console.log(person1.friends);

console.log(person.sayName===person1.sayName);

//知识的价值不在于占有，而在于使用

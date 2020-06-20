//基本思想：借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型。

//ES5新增Object.create()方法规范了原型式继承
function object(o) {
    function F() {};
    F.prototype=o;
    return new F();
}
//object 对传入其中的对象执行了一次浅复制

var person={
    name:'waltz',
    friends:['liuxia','liqiang','wenbin']
};

var anontherPerson=Object.create(person);
anontherPerson.name='chenglong';
anontherPerson.friends.push('junjun');

var yetAnotherPerson=Object.create(person);
yetAnotherPerson.name='dajun';
yetAnotherPerson.friends.push('kunhuang');

//个人理解：相当于把person的属性格式拿过来用，类似于浅复制。

### 第九章 JavaScript 中的类

> ES6中的类与其他语言中的还是不太一样，其语法的设计实际上借鉴了Javascript的动态性。

ES5 中的近类结构，创建一个自定义类型：

1. 首先，创建一个构造函数；
2. 然后，定义另一个方法并赋值给构造函数的原型。

```
function PersonType(name) {
    this.name = name;
}

PersonType.prototype.sayName = function() {
    console.log(this.name);
}

var person = new PersonType('waltz');
person.sayName(); //'waltz'

console.log(person instanceof PersonType); //true
console.log(person instance of Object); //true

```

#### 一、 类的声明

- 基本的类声明方法

```
class PersonClass {
    
    //等价于PersonType的构造函数
    constructor(name){
        this.name = name;
    }
    
    //等价于PersonType.protoType.sayName
    sayName() {
        console.log(this.name);
    }
}

let person = new PersonClass('waltz');
person.sayName(); //'waltz'

console.log(person instanceof PersonClass); //true
console.log(person instanceof Object); //true

console.log(typeof PersonClass); //'function'
console.log(typeof PersonClass.prototype.sayName) //'function'
```
自有属性是实例中的属性，不会出现在原型上，且只能在类的构造函数或方法中创建。建议你在构造函数中创建所有的自有属性，从而只通过一处就可以控制类中的所有自有属性。

> 与函数不同的是，类属性不可被赋予新值。

#### 二、 为何使用类语法

- 函数声明可以被提升，而类声明与```let```声明类似，不能被提升；真正执行声明语句之前，它们会一直存在于临时死区（**TDZ**）中。
- 类声明中的所有代码将自动运行在严格模式下，而且无法强行让代码脱离严格模式执行。
- 在自定义类型中，需要通过```Object.defineProperty()``` 方法手工指定某个方法为不可枚举；而在类中，所有的方法都是不可枚举的。
- 每个类都有一个名为```[[Construct]]```的内部方法，通过关键字new调用那些不含```[[Construct]]```的方法会导致程序抛出错误。
- 使用除关键字```new```以外的方式调用类的构造函数会导致程序抛出错误。
- 在类中修改类名会导致程序报错。

#### 三、类表达式

和函数的声明形式和表达式类似。

> 在js引擎中，类表达式的实现与类声明稍有不同。对于类声明来说，通过let定义的外部绑定与通过const定义的内部绑定具有相同的名称。而命名类表达式通过const定义名称，从而只能在类的内部使用。

#### 四、作为一等公民的类

> 在程序中。一等公民是指一个可以传入函数，可以从函数返回，并且可以赋值给变量的值。(JS函数是一等公民)

```
function createIbject(classDef) {
    return new classDef();
}

let Obj = createObject(class {

    sayHi() {
        console.log('Hi!')
    }
});
obj.sayHi(); //'Hi!'
```

类表达式还有另一种使用方式，通过立即调用类构造函数可以创建单例。用```new```调用类表达式，紧接着通过一对小括号调用这个表达式:

```
let person = new class {

    constructor(name) {
        this.name = name;
    }
    
    sayName() {
        console.log(this.name);
    }
}('waltz');

person.sayName(); // 'waltz'

```
依照这种模式可以使用类语法创建单例，并且不会再作用域中暴露类的引用。

#### 五、访问器属性

```
class CustomHtmlElement() {

    constructor(element){
        this.element = element;
    }
    
    //创建getter
    get html() {
        return this.element.innerHTML;
    }
    
    //创建setter
    set html(value) {
        this.element.innnerHTML = value;
    }
    
}

var descriptor = Object.getOwnPropertyDescriptor(CustomHtmlElement.prototype, "html");
console.log("get" in descriptor); //true
console.log("set" in descriptor); //true
console.log(descriptor.enumerable); //false
```
#### 六、可计算成员名称

```
//类方法
let methodName = "sayName";

class PersonClass(name) {
    
    constructor(name) {
        this.name = name;
    }
    
    [methodName]() {
        console.log(this.name);
    }
};

let me = new PersonClass("waltz");
me.sayName(); // 'waltz'
```
```
//访问器属性
let propertyName = 'html';
class CustomHTMLElement)() {
    
    constructor(element) {
        this.element = element;
    }
    
    get [propertyName]() {
        return this.element.innerHTML;
    }
    
    set [propertyName](value) {
        this.element.innerHTML = value;
    }
}
```

#### 七、生成器方法

```

class MyClass {

    *createIterator() {
        yield 1;
        yield 2;
        yield 3;
    }
    
}

let instance = new MyClass();
let iterator = instance.createIterator();

````
如果用对象来表示集合，又希望通过简单的方法迭代集合中的值，那么生成器方法就派上用场了。

尽管生成器方法很实用，但如果你的类是用来表示值的 **集合** 的，那么为它定义一个 **默认迭代器** 更有用。

#### 八、静态成员

直接将方法添加到构造函数中来模拟静态成员是一种常见的模式。

```
function PersonType(name) {
    this.name = name;
}

//静态方法
PersonType.create = function(name) {
    return new PersonType(name);
}

//实例方法
PersonType.protoType.sayName = function() {
    console.log(this.name);
};

var person = PersonType.create('waltz');
```
类等价：

```
class PersonClass {

    // 等价于PersonType构造函数
    constructor(name) {
        this.name = name;
    }
    
    //等价于PersonType.prototype.sayName
    sayName() {
        console.log(this.name);
    }
    
    //等价于PersonType.create
    static create(name) {
        return new PersonClass(name);
    }
}

let person = PersonClass.create('waltz');
```
类中的所有方法和访问器属性都可以用static关键字来定义，唯一的限制是不能将static用于定义构造函数方法。

> <font color="red">不可在实例中访问静态成员，必须要直接在类中访问静态成员。</font>

#### 九、继承与派生类

**ES5实现**
```
function Rectangle(length, width) {
    this.length = length;
    this.width = width;
}

Rectangle.prototype.getArea = function() {
    return this.length * this.width;
};

function Square(length) {
    Rectangle.call(this, length, length);
}

Square.prototype = Object.create(Rectangle.prototype, {
    constuctor: {
        value: Square,
        enumerable: true,
        writable: true,
        configurable: true
    }
});

var square = new Square(3);

console.log(square.getArea()); // 9
console.log(square instanceof Square); //true
console.log(square instanceof Rectangle); true

```

ES6类实现

```
class Rectangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }
    
    getArea() {
        return this.length * this.width;
    }
}

class Square extends Rectangle {
    //派生类指定了构造函数则必须要调用 super()
    constructor(length) {
        
        //等价于Retangle.call(this, length, length)
        super(length, length);
    }
    
    //如果不使用构造函数，则当创建新的类实例时会自动调用 super() 并传入所有参数
}

var square = new Square(3);

console.log(square.getArea()); //9
console.log(square instanceof Square); //true
console.log(square instanceof Rectangle); //true
```

使用super()的小贴士：
> - 只可在派生类的构造函数中使用```super()```,如果尝试在非派生类（不是用```extends```声明的类）或函数中使用则会导致程序抛出错误。
> - 在构造函数中访问```this```之前一定要调用```super()```,它负责初始化```this```，如果在调用```super()```之前尝试访问```this```会导致程序错误。
> - 如果不想调用```super()```,则唯一的方法是让类的构造函数返回一个对象。

 **类方法遮蔽** --- 派生类中的方法总会覆盖基类中的同名方法。
 
**静态成员继承** --- 如果基类有静态成员，那么这些静态成员在派生类中也可用。

**派生自表达式的类** --- 只要表达式可以解析为一个函数并且具有[[Constructor]]属性和原型，那么就可以用extends进行派生。 extends强大的功能使得类可以继承自任意类型的表达式，从而创造更多可能性。

**由于可以动态确定使用哪个基类，因而可以创建不同的继承方法**
```
let SerializationMixin = {
    serialize() {
        return JSON.stringify(this);
    }
};

let AreaMixin = {
    getArea() {
        return this.length * this.width;
    }
};

function mixin(...mixins) {
    var base = function() {};
    Object.assign(base.prototype, ...mixins);
    return base;
}

class Square extends mixin(AreaMixin, SerializableMixin) {
    constructor(length) {
        super();
        this.length = length;
        this.width = length;
    }
}

var x = new Square(3);
console.log(x.getArea());  //9
console.log(x.serialize()); // "{'length': 3, 'width': 3}"

//如果多个mixin对象具有相同属性，那么只有最后一个被添加的属性被保留。
```

**内建对象的继承**
```
class MyArray extends Array {
    //空
}

var colors = new MyArray();
colors[0] = "red";

console.log(colors.length); //1
colors.length = 0;
console.log(colors[0]); //undefined

```

**```Symbol.species```属性**

> 内建对象继承的一个实用之处，原本在内建对象中返回实例自身的方法将自动返回派生类的实例。

```Symbol.species```是诸多内部Symbol中的一个，它被用于**定义返回函数的静态访问器属性**。被返回的函数是一个构造函数，每当要在实例的方法中（不是在构造函数中）创建类的实例时必须使用这个构造函数。

> 一般来说，只要想在类方法中调用```this.constructor```,就应该使用```Symbol.species```属性，从而让派生类重写返回类型。而且如果你正从一个已定义```Symbol.species```属性的类创建派生类，那么确保使用哪个值而不是使用构造函数。

```
class MyArray extends Array {
    static get [Symbol.species]() {
        return Array;
    }
}

let items = new MyArray(1, 2, 3, 4),
    subitems = items.slice(1, 3);
    
console.log(items instanceof MyArray); //true
console.log(subitems instanceof Array); //true
console.log(subitems instanceof MyArray); //false
```
#### 十、在类的构造函数中使用```new.target```

在简单情况下，```new.target```等于类的构造函数。

因为类必须通过```new```关键字才能调用，所以在列的构造函数中，```new.target```属性永远不会是```undefined```。

### 第2章 this全面解析

#### 2.1 调用位置---分析调用栈

利用浏览器的调式工具

#### 2.2 绑定规则

- 默认绑定（独立函数调用）

```
function foo() {
    console.log( this.a );
}

var a = 2;
// 无任何修饰调用，默认绑定[非严格模式]
foo(); //2

```
严格模式
```
function foo() {
    "use strict";
    
    console.log( this.a );
}

var a = 2;
// 严格模式
foo(); // TypeError: this is not defined

```

> 虽然```this```的绑定规则完全取决于调用位置，但是只有```foo()```运行在非```strict mode```下时，默认绑定才能绑定到全局对象；在严格模式下调用```foo()```则不影响默认绑定：
```
function foo() {
    console.log( this.a );
}

var a = 2;

(function(){
    "use strict";
    
    foo();//2
})();
```
- 隐式绑定

考虑的规则： 调用的位置是否具有上下文对象。
```
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2,
    foo: foo
};

obj.foo(); //2 函数被调用时obj对象“拥有”或者“包含”函数引用。
```
<font color=red>对象属性引用链中只有上一层或者说最后一层在调用位置中起作用。</font>

```
function foo() {
    console.log( this.a );
}

var obj2 = {
    a: 42,
    foo: foo
};

var obj1 = {
    a: 2,
    obj2: obj2
}

obj1.obj2.foo(); //42
```
<font color=red>隐式丢失---隐式绑定的函数会丢失绑定对象，会应用默认绑定，从而帮this绑定到全局对象或者undefined上（取决于是否严格模式）</font>

```
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2,
    foo: foo
}

var bar = obj.foo; //函数别名
var a = "oops, global"; // a 是全局对象的属性
bar(); // "oops, global"
```
发生在传入回调函数的情况（更常见，更微妙【更变态】）:

```
function foo() {
    console.log( this.a );
}

function doFoo(fn) {
    //fn 其实引用的是foo
    fn(); // <--调用位置
}

var obj = {
    a: 2,
    foo: foo
}

var a = "oops, global"; // a是全局对象的属性
doFoo( obj.foo ); // "oops, global"

//把函数传入语言内置的函数而不是传入你自己声明的函数，结果一样。比如传入setTimeout
```

- 显示绑定

```call```, ```apply```和```bind```

```
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2
};

foo.call( obj ); // 2
```
如果你传入额余个原始值（字符串类型、布尔类型或者数字类型）来当做this的绑定对象，这个原始值会被转换成它的对象形式（也就是```new String(..)```、```new Boolean(..)```或者```new Number(..)```）。这通常被成为装箱。

    1. 硬绑定 call, apply和bind

    2. API调用的上下文
    ```
    function foo(el) {
        console.log( el, this.id );
    }
    
    var obj = {
        id: "awesome"
    }
    
    //调用foo(..)时把this绑定到obj
    [1, 2, 3].forEach( foo, obj );
    //1 awesome 2 awesome 3 awesome
    //实际上就是使用call或者apply实现了现实绑定
    ```
- new绑定

```JavaScript```中的构造函数： 在```JavaScript```中，构造函数只是一些使用```new```操作符时被调用的函数。它们并不会属于某个类，也不会实例化一个类。实际上，它们甚至都不能说是一种特殊的函数类型，它们只是被```new```操作符调用的普通函数而已。

<font color=red>实际上并不存在所谓的“构造函数”，只有对于函数的构造调用。</font>

使用new来调用函数，会自动执行下面的操作：

1. 创建（或者构造）一个全新的对象；
2. 这个新对象会执行```[[Prototype]]```连接；
3. 这个新对象会绑定到函数调用的```this```；
4. 如果函数没有返回其他对象，那么```new```表达式中的函数调用会自动返回这个新对象。

```
function foo(a) {
    this.a = a
}

var bar = new foo(2);
console.log( bar.a ); // 2
```

#### 2.3 优先级

判断```this```

1. 函数是否在```new```中调用（```new```绑定）？如果是，this绑定的是新创建的对象；
2. 函数是否通过```call```，```apply```（显示绑定）或硬绑定调用？如果是，```this```绑定的是指定的对象；
3. 函数是否在某个上下文对象中调用（隐式绑定）？如果是，```this```绑定的是哪个上下文对象；
4. 如果都不是，使用默认绑定。严格模式，绑定到```undefined```，否则绑定到全局对象。


#### 2.4 绑定例外

- 被忽略的this

如果你把null或者undefined作为this的绑定对象传入call, apply或者bind，这些值在调用时会被忽略，实际应用的是默认绑定规则。

> 总是使用```null```来忽略```this```绑定可能产生一些副作用。如果这个函数确实使用了```this```（比如第三方库中的一个函数），那默认绑定规则会把```this```绑定了全局对象（在浏览器中这个对象是```window```），这将导致不可预计的后果（比如修改全局对象）。

更安全的this（不对全局对象产生影响）
```
function foo(a, b){
    console.log( "a:" + a + ", b:" + b );
}

//我们的DMZ空对象
var Ø = Object.create( null );

//把数组展开成参数
foo.apply( Ø, [2, 3] ); // a: 2, b: 3

//使用bind()进行柯里化
var bar = foo.bind( Ø, 2 );
bar(3); // a: 2, b: 3
```
- 间接引用

```
function foo() {
    console.log( this.a );
}

var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };

o.foo(); //3 隐式绑定
(p.foo = 0.foo)(); //2 默认绑定
```

**注意：**对于默认绑定来说，决定this绑定对象的并不是调用位置是否处于严格模式，而是函数体是否处于严格模式。

- 软绑定

> 基于硬绑定的问题：硬绑定会大大降低函数的灵活性，使用硬绑定之后就无法使用隐式绑定或者显示绑定来修改```this```。

如果可以给默认绑定指定一个全局对象和undefined以外的值，那就可以实现和硬绑定相同的效果，同时保留隐式绑定或者显示绑定修改this的能力。--- <font color=red>软绑定</font>

```
if ( !Function.prototype.softBind ){
    Function.prototype.softBind = function(obj) {
        var fn = this;
        // 捕获所有curried参数
        var curried = [].slice.call( arguments. 1)；
        var bound = function() {
            return fn.apply(
                ( !this||this === (window||global) ) ? obj : this,
                curried.concat.apply( curried, arguments );
            );
        };
        bound.prototype = Object.create( fn.prototype );
        return bound;
    }
}
```

#### 2.5 this词法

箭头函数不使用```this```的四种标准规则，而是根据外层（函数或者全局）作用域来决定```this```。

```
function foo() {
    // 返回一个箭头函数
    return (a) => {
        // this 继承自foo()
        console.log( this.a );
    };
}

var obj1 = {
    a: 2
}

var obj2 = {
    a: 3
}

var bar = foo.call( obj1);
bar.call(obj2); // 2
```

箭头函数最常用于回调函数中，例如事件处理器或者定时器。

建议：

1. 只使用词法作用域并完全抛弃错误```this```风格的代码；
2. 完全采用```this```风格，在必要时使用```bind(..)```,尽量避免使用```self = this```和箭头函数。

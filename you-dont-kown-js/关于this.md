## <font color=red>第二部分：this和对象原型</font>

### 第1章 关于this

##### <font  color=red>任何足够先进的技术都和魔法无异。--- Arthur C.Clarke</font>

使用```this```可以自动引用合适的上下文对象，而不需要显式传递上下文对象，这样可以让代码更简洁。

#### 1.1 关于this的误解：

- 指向自身

```
function foo() {
    console.log( "foo: " + num );
    
    //记录count被调用的次数
    this.count++; //无意中创建了一个全局变量，它的值为NaN, this（默认）指向全局。
}

foo.count = 0;

var i;

for(i=0; i<10; i++) {
    if(i > 5) {
        foo( i );
    }
}
// foo: 6
// foo: 7
// foo: 8
// f00: 9

console..log(foo.count); // 0 为什么是0？
```
改进：
```
function foo() {
    console.log( "foo: " + num );
    
    //记录count被调用的次数
    //注意，在当前的调用方式下（参见下方代码），this确实指向foo
}

foo.count = 0;

var i;
for(i=0; i<10; i++){
    if(i > 5) {
        //使用call(..)可以确保this指向函数对象foo本身
        foo.call( foo, i )
    }
}

// foo: 6
// foo: 7
// foo: 8
// f00: 9

console..log(foo.count); // 4
```
- 它的作用域（this指向函数的作用域）

> <font color=red>this在任何情况下都不指向函数的词法作用域。</font> 在```Javascript```内部，作用域确实和对象类似，可见的标识符都是它的属性。但是作用域"对象"无法通过```Javascript```代码访问，它存在于```Javascript```引擎内部。

```
function foo() {
    var a = 2;
    this.bar();
}

function bar() {
    console.log( this.a );
}

foo(); //ReferenceError: a is not defined
```
<font color=red>每当你想把```this```和词法作用域的查找混合使用时，一定要提醒自己，这是无法实现的。</font>

#### 1.2 总结

```this```实际上是在函数被调用时发生的绑定，它指向什么完全取决于函数在哪里被调用。


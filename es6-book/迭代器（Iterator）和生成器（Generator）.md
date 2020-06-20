### 第八章 迭代器（Iterator）和生成器（Generator）

> 迭代器的出现旨在消除循环复杂性并减少循环中的错误。

#### 一、什么是迭代器？

迭代器是一种特殊对象，他具有一些专门为迭代过程设计的专有端口，所有的迭代器对象都有一个```next()```方法，每次调用都返回一个结果对象。

**ES5语法** 实现一个迭代器

```
function createIterator(items) {
    
    var i = 0;
    
    return {
        next: function() {
        
            var done = (i >= items.length);
            var value = !done ? items[i++] : undefined;
            
            return {
                done: done,
                value: value
            };
        }
    }
}

var iterator = createIterator([1, 2, 3]);

console.log(iterator.next()); //"{ value: 1, done: false}"
console.log(iterator.next()); //"{ value: 2, done: false}"
console.log(iterator.next()); //"{ value: 3, done: false}"
console.log(iterator.next()); //"{ value: undefined, done: true}"
```
#### 二、什么是生成器？

生成器是一种返回迭代器的函数，通过```function```关键字后的星号（*）来表示，函数中会用到新的关键字```yield```。

```
function *createIterator() {
    yield 1;
    yield 2;
    yield 3;
}

let iterator = createIterator();

console.log(iterator.next().value); //1
console.log(iterator.next().value); //2
console.log(iterator.next().value); //3
```

**```yield```的使用限制**

```yield```关键字只可在生成器内部使用，在其他地方使用会导致程序抛出语法错误，即使在生成器内部的函数里使用也会报错，与```return```关键字一样，不能穿透函数的边界。

> 不能用箭头函数来创建生成器

#### 三、可迭代对象和```for-of```循环

可迭代对象具有```Symbol.iterator```属性，是一种与迭代器密切相关的对象。```Symbol.iterator```通过指定的函数可以返回一个作用于附属对象的迭代器。

- **检测对象是否为可迭代对象**

```
function isIterable(object) {
    return typeof object[Symbol.iterator] === 'function';
}

console.log(isIterable([1, 2, 3])); //true
```
- **创建可迭代对象**

默认情况下，开发者定义的对象都是不可迭代对象，但如果给Symbol.iterator添加一个生成器，则可以将其变为可迭代对象。

```
let collection = {
    items: [],
    *[Symbol.iterator]() {
        for (let item of this.items) {
            yield item;
        }
    }
}

collection.items.push(1);
collection.items.push(2);
collection.items.push(3);

for (let x of collection) {
    console.log(x);
}

1
2
3
```

#### 四、内建迭代器

- 集合对象迭代器
    - entries()
    - values()
    - keys()
    
- 字符串迭代器
- NodeList迭代器

#### 五、高级迭代器功能

- 给迭代器传递参数

```
function *createIterator() {
    let first = yield 1;
    let second = yield first + 2; //4 + 2
    yield second + 3; //5 + 3
}

let iterator = createIterator();

console.log(iterator.next()); // '{ value: 1, done: false }'
console.log(iterator.next(4)); // '{ value: 6, done: false }'
console.log(iterator.next(5)); // '{ value: 8, done: false }'
console.log(iterator.next()); // '{ value: undefined, done: true }'
```

- 在迭代器中抛出错误

调用next()方法命令迭代器继续执行（可能提供一个值），调用throw()方法也会命令迭代器继续执行，但同时也抛出一个错误，在此之后的执行过程取决于生成器内部的代码。

- 生成器返回语句

> 展开运算符与```for-of```循环语句会直接忽略通过return语句指定的任何返回值，只要```done```一变为```true```就立即停止读取其他的值。

- 委托生成器

**在生成器里面再委托另外两个生成器**

- 异步任务执行（******）

生成器令人兴奋的特性与异步编程有关。

```
function run(taskDef) {
    
    //创建一个无使用限制的迭代器
    let task = taskDef();
    
    //开始执行任务
    let result = task.next();
    
    //循环调用next() 的函数
    function step() {
    
        //如果任务未完成，则继续执行
        if(!result.done){
            result = task.next();
            //result = task.next(result.value) 向任务执行器传递数据
            step();
        }
    }
    
    //开始迭代执行
    step();
}
```

### 第十一章、Promise与异步编程

#### 一、异步编程的背景知识

JavaScript既可以像事件和回调函数一样指定稍后执行的代码，也可以明确指示代码是否成功执行。

JavaScript引擎一次只能执行一个代码块，所以需要跟踪即将运行的代码，那些代码被放在一个任务队列中，每当一段代码准备执行时，都会被添加到任务队列。每当JavaScript引擎中的一段代码结束执行，**事件循环(event loop)** 会执行队列中的下一个任务，它是JavaScript引擎中的一段程序，负责监督代码执行并管理任务队列。

事件模型--->回调模式--->Promise

#### 二、Promise的基础知识

Promise相当于异步操作结果的占位符，它不会去订阅一个事件，也不会传递一个回调函数给目标函数，而是让函数返回一个Promise对象。like:
```
// readFile承诺将在未来的某个时刻完成
let promise = readFile("example.txt");
```

操作完成后，Promise会进入两个状态：

- ```Fulfilled``` Promise异步操作成功完成；
- ```Rejected``` 由于程序错误或一些其他原因，Promise异步操作未能成功完成。

内部属性```[[PromiseState]]```被用来表示```Promise```的三种状态："pending"、"fulfilled"、"rejected"。这个属性不暴露在```Promise```对象上，所以不能以编程的方式检测```Promise```的状态，只有当```Promise```的状态改变时，通过```then()```方法采取特定的行动。

>  如果一个对象实现了上述的```then()```方法，那这个对象我们称之为```thenable```对象。所有的Promise都是```thenable```对象，但并非所有```thenable```对象都是```Promise```。

**then方法**

**catch方法**（相当于只给其传入拒绝处理程序的then()方法）

```
// 拒绝
promise.catch(function(err)) {
    console.error(err.message);
});
```
与下面调用相同
```
promise.then(null, function(err)){
    // 拒绝
    console.error(error.message);
});
```

Promise比事件和回调函数更好用

- 如果使用事件，在遇到错误时不会主动触发；
- 如果使用回调函数，则必须要记得每次都检查错误参数；
- 不给Promise添加拒绝处理程序，那所有失败就自动被忽略了，所以一段要添加拒绝处理程序。


> 如果一个Promise处于已处理状态，在这之后添加到任务队列中的处理程序仍将进行。

#### 三、创建未完成的Promise

Promise的执行器会立即执行，然后才执行后续流程中的代码：

```
let promise = new Promise(function(resolve, reject){
    console.log("Promise");
    resolve();
})

console.log("Hi!");

//Promise
//Hi!
```

完成处理程序和拒绝处理程序总是在 **执行器** 完成后被添加到任务队列的末尾。

#### 四、创建已处理的Promise

- 使用```Promise.resolve()```
- 使用```Promise.reject()```

    > 如果向```Promise.resolve()```方法或```Promise.reject()```方法传入一个```Promise```, 那么这个```Promise```会被直接返回。
- 非```Promise```的```Thenable```对象
    > ```Promise.resolve()```方法和```Promise.reject()```方法都可以接受非```Promise```的```Thenable```对象作为参数。如果传入一个非```Promise```的```Thenable```对象，则这些方法会创建一个新的```Promise```，并在```then()```函数中被调用。
    
   **非```Promise```的```Thenable```对象**: 拥有```then()```方法并且接受```resolve```和```reject```这两个参数的普通对象。
   
   如果不确定某个对象是不是```Promise```对象，那么可以根据预期的结果将其传入```Promise.resolve()```方法中或```Promise.object()```方法中，如果它是```Promise```对象，则不会有任何变化。
  
#### 五、执行器错误

每个执行器都隐含一个```try-catch```块，所以错误会被捕获并传入拒绝处理程序。

#### 六、全局的```Promise```拒绝处理

有关```Promise```的其中一个 **最具争议** 的问题是，如果在没有拒绝处理程序的情况下拒绝一个```Promise```，那么不会提示失败信息。

**6.1** **Node.js**环境的拒绝处理

- **```unhandledRejection```**

    在一个事件循环中，当```Promise```被拒绝，并且没有提供拒绝处理程序时，触发该事件。
    ```
    let rejected;
    
    process.on("unhandledRejection", function(reason, promise){
        console.log(reason.message); // "Explosion!"
        console.log(rejected === promise); // true
    });
    
    rejected = Promise.reject(new Error("Explosion!"));
    ```
- **```rejectionHandled```**

    在一个事件循环之后，当```Promise```被拒绝时，若拒绝处理程序被调用，触发该事件。
    ```
    let rejected;
    
    process.on("rejectionHandled", function(promise){
        console.log(rejected === promise); // true
    });
    
    rejected = Promise.reject(new Error("Explosion!"));
    
    //等待添加拒绝处理程序
    setTimeout(function(){
        rejected.catch(function(value){
            console.log(value.message); // "Explosion!"
        });   
    }, 1000);
    ```
**6.2** **浏览器环境** 的拒绝处理  

- **```unhandledRejection```**（描述与Node.js相同）

- **```rejectionHandled```**

> 浏览器中的实现与```Node.js```中的几乎完全相同，二者都是用同样的方法将```Promise```及其拒绝值存储在Map集合中，然后再进行检索。唯一的区别是，在事件处理程序中检索信息的位置不同。

#### 七、串联```Promise```

> 每次调用```then()```方法或```catch()```方法时实际上创建并返回了另一个```Promise```，只有当第一个```Promise```完成或被拒绝后，第二个才会被解决。

> 务必在```Promise```链的末尾留有一个拒绝处理程序以确保能够正确处理所有可能发生的错误。

> 拒绝处理程序中返回的值仍可用在下一个```Promise```的完成处理程序中，在必要时，即使其中一个```Promise```失败也能恢复整条链的执行。

#### 八、在```Promise```中返回```Promise```

在完成或拒绝处理程序中返回```Thenable```对象不会改变```Promise```执行器的执行动机，先定义的```Promise```的执行器先执行，后定义的后执行。

#### 九、响应多个```Promise```

- ```Promise.All()```方法
- ```Promise.race()```方法

#### 十、自```Promise```继承

Promise与其他内建类型一样，也可以作为基类派生其他类，所以你可以定义自己的```Promise```变量来扩展内建```Promise```的功能。

#### 十一、基于```Promise```的异步任务执行

```
let fs = require("fs");
function run(taskDef) {

    //创建迭代器
    let task = taskDef();
    
    //开始执行任务
    let result = task.next();
    
    //递归函数遍历
    (function step() {
    
        //如果有更多任务要做
        if(!result.done) {
            
            //用一个Promise来解决会简化问题
            let promise = Promise.resolve(result.value);
            promise.then(function(value) {
                result = task.next(value);
                step();
            }).catch(function(error){
                result = task.throw(error);
                step();
            })
        }
    }());
}

//定义一个可用于任务执行器的函数

function readFile(filename) {
    return new Promise(function(resolve, reject) {
       fs.readFile(filename, function(err, contents){
            if(err){
                reject(err);
            }else{
                resolve(contents);
            }
       }); 
    });
}

//执行一个任务

run(function*(){
    let contents = yield readFile("config.json");
    doSomethingWith(contents);
    console.log("done");
})
```

ES2017 **await**


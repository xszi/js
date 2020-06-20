### 第六章 ```Symbol```和```Symbol```属性

> 在```Symbol```出现之前，人们一直通过属性名来访问所有属性，无论属性名由什么元素构成，全部通过一个字符串类型的名称来访问；私有名称原来是为了让开发者们创建非字符串名称而设计的，但是一般的技术无法检测这些属性的私有名称。

**通过```Symbol```可以为属性添加非字符串名称，但是其隐私性就被打破了。**

#### 一、创建、使用```Symbol```、```Symbol```共享体系

- 创建、使用
```
let firstName = Symbol();
let person = {};

person[firstName] = 'xszi';
console.log(person[firstName]); //xszi
```
<font color="red">由于```Symbol```是原始值，因此调用```new Symbol()```会导致程序抛出错误。</font>

```Symbol```函数接受一个可选参数，其可以让你添加一段文本描述即将创建的```Symbol```，这段描述 **不可用于属性访问**。该描述被存储在内部的 **[[Description]]** 属性中，只有当调用```Symbol```的```toString()```方法时才可以读取这个属性。

- ```Symbol```共享体系

> 有时我们可能希望在不同代码中共享同一个```Symbol```（在很大的代码库中或跨文件追踪```Symbol```非常困难），ES6提供了一个可以全局访问的全局```Symbol```注册表，即使用```Symbol.for()```方法。

```
let uid = Symbol.for('uid');
let object = {};

object[uid] = '12345';

console.log(object[uid]); //'12345'
console.log(uid); // 'Symbol(uid)'
```

**实现原理**： ```Symbol.for()```方法首先在全局```Symbol```注册表中搜索键为‘uid’的```Symbol```是否存在，如果存在，直接返回已有的```Symbol```;否则，创建一个新的```Symbol```，并使用这个键在```Symbol```全局注册表中注册，随即返回新创建的```Symbol```。

**可以使用```Symbol.keyFor()```方法在```Symbol```全局注册表中检索与```Symbol```有关的键。**

```Symbol```全局注册表是一个类似全局作用域的共享环境，也就是说你不能假设目前环境中存在哪些键。**当使用第三方组件时，尽量使用```Symbol```键的命名空间减少命名冲突**。如 **jQuery**.

#### 二、Symbol与类型强制转换，属性检索

- ```console.log()```会调用```Symbol```的```String()```方法

```
desc = String(uid);

desc = uid + ''; //报错，不能转为字符串类型

desc = uid / 2; //报错，不能转为数字类型
```

- 属性检索
    - **```Object.keys()```**  返回可枚举属性
    - **```Object.getOwnPropertyNames()```**  不考虑可枚举性，一律返回
    - **```Object.getOwnProperty-Symbols()```**   ES6用来检索对象中的Symbol属性
    
所有对象一开始没有自己独有的属性，但是对象可以从原型链中继承Symbol属性。

#### 三、通过```well-know Symbol```暴露内部操作

<font color="red">还是不怎么理解，找到一个使用```Symbol```的实际场景才能更好理解！</font>

### A ECMAScript6中较小的改动

#### 一、 安全整数

```IEEE 754```只能准确的表示-2^53 ~ 2^53之间的整数：
```
var inside = Number.MAX_SAFE_INTEGER,
    outside = inside + 1;

console.log(Number.isInteger(inside)); //true
console.log(Number.isSafeInteger(inside)); //true

console.log(Number.isInteger(outside)); //true
console.log(Number.isSafeInteger(outside)); //false
```
#### 二、 新的```Math```方法

> 提高通常的数学计算的速度

#### 三、 ```Unicode``` 标识符
#### 四、正式化```_ptoto_```属性

实际上，```_proto_```是```Object.getPrototypeOf()```方法和```Object.setPrototypeOf()```方法的早期实现。

### B 了解ECMAScript 7 (2016)

#### 一、指数运算符

```
5 ** 2 == Math.pow(5, 2); //true
```

求幂运算符在JavaScript所有二进制运算符中具有最高的优先级（一元运算符的优先级高于**）

#### 二、Array.prototype.includes()方法

奇怪之处：

```includes()```方法认为+0和-0是相等的，```Object.is()```方法会将+0和-0识别为不同的值。

#### 三、函数作用域严格模式的一处改动

```ECMAScript 2016``` 规定在参数被解构或有默认参数的函数中禁止使用```"use strict"```指令。只有参数为不包含解构或默认值的简单参数列表才可以在函数体中使用```"use strict"```。

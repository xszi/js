### 第十二章、代理（Proxy）和反射（Reflection）API

> 代理```（Proxy）```是一种可以拦截并改变底层JavaScript引擎操作的包装器，在新语言中通过它暴露内部运作的对象。

#### 一、代理和反射

调用 ```new Proxy()```可创建代替其他目标对象的代理，它虚拟化了目标，所以二者看起来功能一致。

代理可以拦截 ```JavaScript``` 引擎内部目标的底层对象操作，这些底层操作被拦截后会触发响应特定操作的陷阱函数。

反射```API```以```Reflect```对象的形式出现，对象中方法的默认特性与相同的底层操作一致，而代理可以覆写这些操作，每个代理陷阱对应一个命名和参数都相同的```Reflect```方法。

#### 二、使用```set```陷阱验证属性 / 用```get```陷阱验证对象解构```（Object Shape）```

```set```代理陷阱可以拦截写入属性的操作，```get```代理陷阱可以拦截读取属性的操作。
```
let target = {
    name: "target"
}

let proxy = new Proxy(target, {
    set(trapTarget, key, value, receiver) {
        
        //忽略不希望受到影响的已有属性
        if(!trapTarget.hasOwnProperty(key)) {
            if(isNaN(value)) {
                throw new TypeError("属性必须是数字");
            }
        }
        
        //添加属性
        return Reflect.set(trapTarget, key, value, receiver);
    }
});

//添加一个新属性
proxy.count = 1;
console.log(proxy.count); //1
console.log(target.count); //1

//由于目标已有name属性因而可以给它赋值
proxy.name = "proxy";
console.log(proxy.name); //"proxy"
console.log(target.name); //"proxy"
```

```
let proxy = new Proxy({},{
    get(trapTarget, key, receiver) {
        if (!(key in receiver)) {
            throw new TypeError("属性" + key + "不存在");
        }
        
        return Reflect.get(trapTarget, key, receiver);
    }
});

//添加一个属性，程序仍正常运行
proxy.name = "proxy";
console.log(proxy.name); // "proxy"

//如果属性不存在，则抛出错误
console.log(proxy.nme); // 抛出错误
```

#### 三、使用```has```陷阱隐藏已有属性
#### 四、使用```deleteProperty```陷阱防止删除属性

#### 五、原型代理陷阱

- 原型代理陷阱的运行机制

原型代理陷阱有一些限制：

1. ```getPrototypeOf```陷阱必须返回对象或```null```，只要返回值必将导致运行时错误，返回值检查可以确保```Object.getPropertyOf()```返回的总是预期的值；
2. 在```setPropertyOf```陷阱中，如果操作失败则返回的一定是```false```，此时```Object.setPrototypeOf()```会抛出错误，如果```setPrototypeOf```返回了任何不是```false```的值，那么```Object.setPrototypeOf()```便假设操作成功。
- 为什么有两组方法

```Object.getPrototypeOf()```和```Object.setPrototypeOf()```是高级操作，创建伊始便给开发者使用的；而```Reflect.getPrototypeOf()```和```Reflect.setPrototypeOf()```方法则是底层操作，其赋予开发者可以访问之前只在内部操作的```[[GetPrototypeOf]]```和```[[SetPrototypeOf]]```的权限。

```Object.setPrototypeOf()```和```Reflect.setPrototypeOf()```之间在返回值上有微妙的差异，前者返回传入的对象，后者返回布尔值。

#### 六、对象可扩展性陷阱

- ```preventExtensions```(阻止扩展)
- ```isExtensible```(判断是否可扩展)

> 相比高级功能方法而言，底层的具有更严格的错误检查。

#### 七、属性描述符陷阱

- ```defineProperty```(定义属性)
- ```getOwnPropertyDescriptor```(获取属性)

**给Object.defineProperty()添加限制**
> 如果让陷阱返回```true```并且不调用```Reflect.defineProperty()```方法，则可以让```Object.definePropperty()```方法静默失效，这既消除了错误又不会真正定义属性。

**描述符对象限制**
> 当```defineProperty```陷阱被调用时，```descriptor```对象有```value```属性却没有```name```属性，这是因为```descriptor```不是实际传入```Object.defineProperty()```方法的第三个参数的引用，而是一个只包含那些被允许使用的属性的新对象。```Reflect.defineProperty()```方法同样也忽略了描述符上的所有非标准属性。

#### 八、```ownKeys```陷阱

> ```ownKeys```陷阱通过```Reflect.ownKeys()```方法实现默认的行为，返回的数组中包含所有自有属性的键名，字符串类型和```Symbol```类型的都包含在内。

- ```Object.getOwnPropertyNames()```方法和```Object.keys()```方法返回的结果将```Symbol```类型的属性名排除在外。
- ```Object.getOwnPropertySymbols()```方法返回的结果将字符串类型的属性名排除在外。
- ```Object.assign()```方法支持字符串和```Symbol```两种类型。
#### 九、函数代理中的```apply```和```construct```陷阱

> 所有的代理陷阱中，只有```apply```和```construct```的代理目标是一个函数。

- 验证函数参数
- 不用```new```调用构造函数
    
可以通过检查```new target```的值来确定函数是否是通过```new```来调用的。

假设```Numbers()```函数定义在你无法修改的代码中，你知道代码依赖```new target```,希望函数避免检查却仍想调用函数。在这种情况下，用```new```调用时的行为已被设定，所以你只能使用```apply```陷阱。

- 覆写抽象基类构造函数
- 可调用的类构造函数

#### 十、可撤销代理

#### 十一、解决数组问题

- 检测数组索引
- 添加新元素时增加```length```的值
- 减少```length```的值来删除元素

#### 十二、实现MyArray类

想要创建使用代理的类，最简单的方法是像往常一样定义类，然后在构造函数中返回一个代理，那样的话，当类实例化时返回的对象是代理而不是实例（构造函数中的```this```是该实例）。

**将代理用作原型**

虽然从类构造函数返回代理很容易，但这也意味着每创建一个实例都要创建一个新代理。然而有一种方法可以让所有的实例共享一个代理：将代理用作原型。

- 在原型上使用get陷阱
- 在原型上使用set陷阱
- 在原型上使用has陷阱
- 将代理用作类的原型

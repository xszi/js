### 第七章 Set集合与Map集合

> Set 和 Map 主要的应用场景在于 **数据重组** 和 **数据储存**

> Set 是一种叫做**集合**的数据结构，Map 是一种叫做**字典**的数据结构

#### 一、用对象属性模拟Set和Map集合

```
//set
var set = Object.create(null);

set.foo = true;

//检查属性是否存在
if(set.foo){
    //要执行的代码
}
```

```
//map
var map = Object.create(null);

map.foo = "bar";

//获取已存值
var value = map.foo;

console.log(value);
```

一般来说，Set集合常被用于检查对象中是否存在某个键名，而Map集合常被用来获取已存的信息。

**所有对象的属性名必须是字符串类型，必须确保每个键名都是字符串类型且在对象中是唯一的**

#### 二、Set集合

    - 有序
    - 不重复

    +0和-0在Set中被认为是相等的。
    
    Set构造函数可以接受所有可迭代对象作为参数

- Set中的方法： add、has、delete、clear，forEach，size（属性）

forEach遍历Set，回调函数中value和key的值相等，我的理解： Set集合中的元素都是不重复的，所以可以把值作为键，即“**以值为键**”。如下：
```
let set = new Set([1, 2]);

set.forEach(function(value, key, ownerSet)){
    console.log(key + " " + value);
    console.log(ownerSet === set);
});
```
在回调函数中使用this引用
```
let set = new Set([1, 2]);

let processor = {
    output(value) {
        console.log(value);
    },
    process(dataSet) {
        dataSet.forEach(function(value){
            this.output(value);
        }, this);
    }
};

processor.process(set);
```
箭头函数this
```
let set = new Set([1, 2]);

let processor = {
    output(value) {
        console.log(value);
    },
    process(dataSet) {
        dataSet.forEach(value => this.output(value));
    }
};

processor.process(set);
```

- 将Set集合转换为数组

```
let set = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
    array = [...set];
    
console.log(array); //[1, 2, 3, 4, 5]
```

```
function eliminbateDuplicates(items){
    return [...new Set(items)]
}

let numbers = [1, 2, 3, 3, 3, 4, 5];
    noDuplicates = eliminateDuplicates(numbers);

console.log(noDuolicates); //[1, 2, 3, 4, 5]
```

#### 三、 Weak Set 集合

解决Set集合的强引用导致的内存泄漏问题

 Weak Set集合只存储对象的弱引用，并且不可以存储原始值；集合中的弱引用如果是对象唯一的引用，则会被回收并释放相应内存。
 
  Weak Set集合的方法：add， has，delete
  
 - **Set** 和 **Weak Set** 的区别：
 
|  | | |
| :------: | :------: |:------: |
| **差异** | Set | Weak Set |
| 最大区别 | 保存对象值的强引用 | 保存对象值的弱引用 |
| 方法传入非对象参数 | 正常 | 报错 |
| 可迭代性 | 可迭代 | 不可迭代 |
| 支持forEach方法 | 支持 | 不支持 |
| 支持size属性 | 支持 | 不支持 |

#### 四、 Map集合

    - 有序
    - 键值对
    
在对象中，无法用对象作为对象属性的键名；但是Map集合中，却可以这样做。

```
let map = new Map(),
    key1 = {},
    key2 = {};
    
map.set(key1, 5);
map.set(key2, 42);

console.log(map.get(key1)); //5
console.log(map.get(key2)); //42
```
以上代码分别用对象 **key1** 和 **key2** 作为两个键名在Map集合里存储了不同的值。这些键名不会强制转换成其他形式，所以这两个对象在集合中是独立存在的，也就是说，**不需要修改对象本身就可以为其添加一些附加信息**。

Map集合的方法：**set**，**get**，**has(key)**，**delete(key)**，**clear**，**forEach**，**size**(属性)

Map集合初始化过程中，可以接受任意数据类型的键名，为了确保它们在被存储到Map集合中之前不会被强制转换为其他数据类型，因而只能将它们放在数组中，因为这是唯一一种可以准确地呈现键名类型的方式。

#### 五、 Weak Map集合

无序
键值对

    - 弱引用Map集合，集合中键名必须是一个对象，如果使用非对象键名会报错；
    - 键名对于的值如果是一个对象，则保存的是对象的强引用，不会触发垃圾回收机制。
    
- Weak Map 最大的用途是保存Web页面中的DOM元素。

```
let map = new WeakMap(),
    element = document.querySelector('.element');
    
map.set(element, "Original");

let value = map.get(element);
console.log(value); //"Original"

//移除element元素
element.parentNode.removeChild(element);
element = null;

//此时 Weak Map集合为空，数据被同步清除

```
- Weak Map集合的方法

set, get, has, delete

<font color="red">私有对象数据</font>

存储对象实例的私有数据是Weak Map的另外一个应用：

```
var Person = (function(){
    var privateData = {},
    privateData = 0;
    
    function Person(name){
        Object.defineProperty(this, "_id", { value: privateId++ });
        
        privateData[this._id] = {
            name: name
        };
    }
    
    Person.prototype.getName = function() {
        return privateData[this._id].name;
    }
    
    return Person;
}());

```
上面这种方法无法获知对象实例何时被销毁，不主动管理的话，privateData中的数据就永远不会消失，需要使用Weak Map来解决这个问题。

```
let Person = (function(){
    let privateData = new WeakMap(),
    privateData = 0;
    
    function Person(name){
        privateData.set(this, {name: name});
    }
    
    Person.prototype.getName = function() {
        return privateData.get(this).name;
    }
    
    return Person;
}());
```

**当你要在Weak Map集合与普通的Map集合之间做出选择时，需要考虑的主要问题是，是否只用对象作为集合的键名。**

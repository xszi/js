/**
 *  proxy
 */
var obj = new Proxy({}, {
    get: function (target, propKey, receiver) {
        console.log(`getting ${propKey}!`);
        return Reflect.get(target, propKey, receiver);
    },
    set: function (target, propKey, value, receiver) {
        console.log(`setting ${propKey}!`);
        return Reflect.set(target, propKey, value, receiver);
    }
});

obj.count = 1
//  setting count!
++obj.count
//  getting count!
//  setting count!
//  2
/**
 *
 * get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']。
 set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
 has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
 deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
 ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
 getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
 defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
 preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
 getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
 isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
 setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
 apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
 construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
 */

/**
 * Web 服务的客户端
 */

const service = createWebService('http://example.com/data');

service.employees().then(json => {
    const employees = JSON.parse(json);
    // ···
});
// 上面代码新建了一个 Web 服务的接口，这个接口返回各种数据。Proxy 可以拦截这个对象的任意属性，
// 所以不用为每一种数据写一个适配方法，只要写一个 Proxy 拦截就可以了。
function createWebService(baseUrl) {
    return new Proxy({}, {
        get(target, propKey, receiver) {
            return () => httpGet(baseUrl + '/' + propKey);
        }
    });
}

/**
 * 字符串的遍历器接口
 */
for (let codePoint of 'foo') {
    console.log(codePoint)
}
// "f"
// "o"
// "o"
/**
 *  模版字符串
 */
(
    // 传统写法为
    // 'User '
    // + user.name
    // + ' is not authorized to do '
    // + action
    // + '.'
    `User ${user.name} is not authorized to do ${action}.`
);
/* 　${执行js} */
function fn() {
    return "Hello World";
}

`foo ${fn()} bar`
// foo Hello World bar
/**
 *  repeat（）
 */

'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""

/**
 *  includes(), startsWith(), endsWith()
 *  传统上，JavaScript 只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法。
 */
let s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true

/**
 *  trimStart()，trimEnd()
 */
const s = '  abc  ';

s.trim() // "abc"
s.trimStart() // "abc  "
s.trimEnd() // "  abc"

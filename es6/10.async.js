/**
 *  async await
 */
function timeout(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value);
}

asyncPrint('hello world', 50);


async function main() {
    try {
        const val1 = await firstStep();
        const val2 = await secondStep(val1);
        const val3 = await thirdStep(val1, val2);

        console.log('Final: ', val3);
    }
    catch (err) {
        console.error(err);
    }
}

/**
 * 使用注意点
 */
/* 第一点，前面已经说过，await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。 */

async function myFunction() {
    try {
        await somethingThatReturnsAPromise();
    } catch (err) {
        console.log(err);
    }
}

// 另一种写法

async function myFunction() {
    await somethingThatReturnsAPromise()
        .catch(function (err) {
            console.log(err);
        });
}

/* 多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。 */

// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;

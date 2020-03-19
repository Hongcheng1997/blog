通常处理异步会使用三种方案： 1、回调函数 2、promise 3、async、await

# 回调函数

```
function ajax(callBack) {
    setTimeout(() => {
        callBack()
    }, 2000)
}

ajax(() => {
    console.log(1)
})
```

回调函数是最通俗易懂的，但是回调函数一多就会出现所谓的回调地狱，代码非常丑陋且难以理解

```
function ajax(callBack) {
    setTimeout(() => {
        callBack()
    }, 2000)
}

ajax(() => {
    ajax(() => {
        ajax(() => {
            ajax(() => {
                ajax(() => {
                    console.log(1)
                })
            })
        })
    })
})
```

# Promise

Promise 是异步编程的一种解决方案，比传统的回调函数更强大、更优雅。

```
function ajax() {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                resolve()
            }, 2000)
        } catch (err) {
            reject(err)
        }
    })
}

ajax().then(() => {
    console.log('success')
}).catch(err => {
    console.log(err)
})
```

**高级用法**

一、 Promise.all

Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。需要传入一个数组作为参数

```
const p = Promise.all([p1, p2, p3]);
```

Promise.all 的两种状态：

1. 只有当p1、p2、p3状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数

2. 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数

二、Promise.race

Promise.race 用法与 Promise.all 类似，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

# async 函数

ES2017 标准引入了 async 函数，使得异步操作变成同步写法。

```
async function asyncFn() {
    await ajax()
    // do something
    console.log(1)
}

function ajax() {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                resolve()
            }, 2000)
        } catch (err) {
            reject(err)
        }
    })
}

asyncFn()
```

await 后面做异步操作，需要注意的是 await 后面需要是一个 Promise 对象

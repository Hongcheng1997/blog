通常处理异步会使用三种方案：

1. 回调函数
2. promise
3. async、await

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

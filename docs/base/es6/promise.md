# Promise 实现

记录一下 Promise 实现，简单的 Promise 实现主要内部维护两个数组（resolveCallBack、rejectCallBack），这两个数组用来储存 then 函数中传入的两个函数，在 Promise 状态改变后分别的去调用 resolveCallBack 或 rejectCallBack

``` 
const PENDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = "rejected"

function MyPromise(fn) {
    this.status = PENDING
    this.resolveCallBack = []
    this.rejectCallBack = []

    const resolve = (data) => {
        this.status = FULFILLED
        this.resolveCallBack.forEach(callBack => callBack(data))
    }

    const reject = (data) => {
        this.status = REJECTED
        this.rejectCallBack.forEach(callBack => callBack(data))
    }

    fn(resolve, reject)
}

MyPromise.prototype.then = function (resolve, reject) {
    this.resolveCallBack.push(resolve)
    this.rejectCallBack.push(reject)

    return this
}
```

# 测试例子

``` 
new MyPromise((resolve, reject) => {
    setTimeout(() => {
        console.log(1)
        resolve('value')
    }, 1000)
}).then((data) => {
    console.log(data)
}).then((data) => {
    console.log(data)
})
```

这里对 Promise 实现了链式调用，但是没有实现对 then 函数返回 Promise 后的处理，如以下情况：

``` 
new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(1)
        resolve()
    }, 1000)
}).then(() => {
    console.log(2)
    return new Promise((resolve) => {
        resolve()
        console.log(3)
    }).then(() => {
        console.log(4)
    })
}).then(() => {
    console.log(5)
})
```

修改 resolve 函数，如果 then 函数返回的是一个 Promise，那么要让这个 Promise 的 resolve 在下一个队列执行，目的是为了让它的 then 函数先一步执行

``` 
const resolve = (data) => {
    setTimeout(() => {
        this.status = FULFILLED
        this.resolveCallBack.forEach(callBack => callBack(data))
    });
}
```

修改 then 函数让它返回一个新的 Promise，先调用 then 函数的回调判断是否为一个 Promise，如果是就把上一个 Promise 的 resolve 挂载到新的 Promise 的末端，否则直接调用 resolve

``` 
MyPromise.prototype.then = function (onResolve, onReject) {
    return new MyPromise(resolve => {
        this.resolveCallBack.push(() => {
            const result = onResolve()
            if (result instanceof MyPromise) {
                result.then(resolve)
            } else {
                resolve()
            }
        })
    })
}
```

# 测试例子

``` 
new MyPromise((resolve, reject) => {
    setTimeout(() => {
        console.log(1)
        resolve()
    }, 1000)
}).then(() => {
    console.log(2)
    return new Promise((resolve) => {
        console.log(3)
        resolve()
    }).then(() => {
        console.log(4)
    })
}).then(() => {
    console.log(5)
})
```


# 节流(throttle)

节流的定义就是不管函数触发多少次，只有在第一次触发函数的一段时间后，才触发一次。 类似游戏中的技能 cd，释放了一次技能后，只能在 cd 完成后才能再次释放。就算你把键盘按烂了也不能放第二次~

```
function throttle(fn, delay) {
    if (typeof fn !== 'function') return
    let lastTime = 0
    return function (...rest) {
        let newTime = +new Date()
        if (newTime - lastTime >= delay) {
            lastTime = newTime
            fn.apply(this, rest)
        }
    }
}
```

# 防抖(debounce)

防抖的定义是不管函数触发多少次，只有在最后一次触发的一段时间后才执行函数，关注点在最后一次。

```
function debounce(fn, delay) {
    if (typeof fn !== 'function') return
    let timer = null
    return function (...rest) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, rest)
        }, delay)
    }
}
```

防抖的缺点是如果操作过于频繁，那么定时器将一直被重置，函数一直无法执行。解决这个问题可以通过结合节流和防抖实现一个加强版 throttle

```
function throttle(fn, delay) {
    let lastTime = 0, timer = null
    return function (...rest) {
        let newTime = +new Date()
        if (newTime - lastTime >= delay) {
            lastTime = newTime
            fn.apply(this, rest)
        } else {
            clearTimeout(timer)
            timer = setTimeout(() => {
                lastTime = newTime
                fn.apply(this, rest)
            }, delay);
        }
    }
}
```

节流只认第一次

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

防抖是只执行最后一次

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

加强版 throttle

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


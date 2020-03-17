this 的指向，要结合上下文，常见的三种方式：

<ol>
<li>普通函数中的 this 指向全局 global，浏览器中也就是指 window 对象</li>
<li>对象方法中的 this 指向调用该方法的对象</li>
<li>
构造函数中的 this 指向生成的实例，同时 new 方式调用 call，bind，apply 无法改变 this 指向</li>
</ol>

其他的方式如：call，bind，apply。this 指向传入的对象。
如箭头函数 this 指向定义时的 this，与调用方式无关。

**1、普通函数中的 this**

```
    function foo() {
        this.name = 'ghc'
    }

    foo()
    console.log(window.name)
```

此处 this 指向 window，所以 window.name 会输出 ghc

**2、对象方法中的 this**

```
    var person = {
        age: 23,
        getAge: function () {
            return this.age
        }
    }

    console.log(person.getAge())
```

此处 this 指向 person，所以 person.getAge() 会输出 23

**3、构造函数中的 this**

```
    function Person () {
        this.name = 'ghc'
        this.age = 23
    }

    var person = new Person()
    console.log(person)
```

此处 this 指向 生成的实例 person，所以 person.name 会输出 ghc，person.age 会输出 23

**4、call、bind、apply**

```
    var name = 'wyz'
    var age = 18
    var person = {
        name: 'ghc',
        age: 23
    }

    function foo() {
        return {
            name: this.name,
            age: this.age
        }
    }

    console.log(foo())
    console.log(foo.call(person))
    console.log(foo.apply(person))
    console.log(foo.bind(person)())
```

普通函数直接调用 this 指向 window，所以第一处输出的 name 是 wyz，age 是 18。
通过 call、apply、bind 改变 this 指向为传入的对象，所以输出的 name 是 ghc，age 是 23。

**5、箭头函数中的 this**

箭头函数中的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。

```
    function foo() {
        setTimeout(() => {
            console.log('id:', this.id);
        }, 100);
    }

    var id = 21;
    foo.call({ id: 42 });
```

此处 this 为定义时的对象，也就是 { id: 42 }
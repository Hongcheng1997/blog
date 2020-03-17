每个 JavaScript 对象都有一个  \_\_proto\_\_ 属性指向它的原型，同时函数的 prototype 属性也是指向它的原型，而原型的原型还有原型，直至 null 为止形成一条原型链。原型的用途的是，可以由特定类型的实例共享属性和方法。

举个栗子：定义一个构造函数 Person：

```
    function Person() { }
    Person.prototype.name = 'ghc'
    Person.prototype.age = 24
    Person.prototype.getName = function () {
        return this.name
    }
    const person = new Person()
    console.log(person)  // { }
    console.log(person.age)  // 24
    console.log(person.getName())  // ghc
```

可以看到 person 实例是一个空对象，但是却可以访问到 age 属性和 getName 方法，这是因为
这些属性和方法都定义在了 person 的原型上，当代码访问 age 属性时，会执行一次搜索，搜索
age 属性，首先在实例本身开始，如果找到了 age 属性，则返回该属性，如果没有，就会继续去
搜索 person 的原型，如果找到了 age 属性，则返回该属性，如果没有，则继续向上搜索知道
null 为止。

**实例、原型、构造函数之间的关系**

构造函数 Person 有个属性 prototype 就是构造函数的原型，这个原型默认有两个属性，一个是 constructor，一个是 \_\_proto\_\_。

constructor 就是指向构造函数 Person，即 Person.prototype.constructor === Person

 \_\_proto\_\_ 指向 Person 的原型的原型（Object.prototype）

然而 person 实例的原型就是 Person 构造函数的原型，即 Object.getPrototypeOf(person) === Person.prototype

具体逻辑如下图：

![微信图片_20200107150143](https://user-images.githubusercontent.com/46236709/71875179-ab5e6b00-315e-11ea-828e-0b5dc05bf144.png)
# 解构赋值

在 ES5 为变量赋值只能直接指定一个值，如：var a = 1，ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，如下：

```
数组
let [a, b, c] = [1, 2, 3]
相当于
var a = 1
var b = 2
var c = 3

对象
let obj = { foo: "aaa", bar: "bbb" }
let { foo, bar } = obj
相当于
var foo = obj.foo
var bar = obj.bar

字符串
const [a, b, c, d, e] = 'hello'

数字
let {toString: s} = 123
相当于
let s = new Number(123).toString

布尔
let {toString: s} = true
相当于
let s = new Boolean(true).toString
```

# 扩展运算符

**数组扩展运算符**

数组扩展运算符好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列

```
console.log(...[1, 2, 3])  // 1 2 3

console.log(1, ...[2, 3, 4], 5)  // 1 2 3 4 5

function add(x, y) {
  return x + y;
}

const numbers = [4, 38];
add(...numbers)  // 42
```

**对象扩展运算符**

对象的扩展运算符用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。

```
let z = { a: 3, b: 4 };
let n = { ...z };
n  // { a: 3, b: 4 }
```

# 扩展运算符与解构赋值结合

只能放在参数的最后一位，否则会报错

```
数组扩展运算符可以与解构赋值结合起来，用于生成数组。

const [first, ...rest] = [1, 2, 3, 4, 5];

const [first, ...middle, last] = [1, 2, 3, 4, 5]; //err

对象

对象的解构赋值用于从一个对象取值，相当于将目标对象自身的所有可遍历的、但尚未被读取
的属性，分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。

let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }
```

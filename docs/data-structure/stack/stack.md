# 栈

栈遵循后进先出的原则

用数组表示，可以简单的实现

```
class Stack {
  constructor() {
    this.list = [];
  }

  push(item) {
    this.list.push(item);
  }

  pop() {
    return this.list.pop();
  }

  peek() {
    return this.list[0];
  }

  isEmpty() {
    return this.list.length === 0;
  }

  size() {
    return this.list.length;
  }
}
```

用数组实现在添加或删除元素的时候时间复杂度为 O(n)，可以用对象来实现更高效的栈。

```
class Stack {
  constructor() {
    this.count = 0;
    this.list = {};
  }

  push(item) {
    this.list[this.count] = item;
    this.count++;
  }

  pop() {
    delete this.list[this.count];
    this.count--;
  }

  peek() {
    return this.list[0];
  }

  isEmpty() {
    return this.count === 0;
  }

  size() {
    return this.count;
  }
}
```

用对象来实现栈，其时间复杂度是 O(1)，相比于数组来的更高效。

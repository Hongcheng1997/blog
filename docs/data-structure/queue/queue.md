# 队列

队列遵循先进先出的原则，类似时常生活中排队，要分先来后到。

```
class Queue {
  constructor() {
    this.count = 0;
    this.firstCount = 0;
    this.list = {};
  }

  enqueue(item) {
    this.list[this.count] = item;
    this.count++;
  }

  dequeue() {
    delete this.list[this.firstCount];
    this.count--;
    this.firstCount++;
  }

  peek() {
    return this.list[this.firstCount];
  }

  isEmpty() {
    this.count = 0;
    this.firstCount = 0;
    return this.count === 0;
  }

  size() {
    return this.count;
  }
}
```
# 双端队列

队列除了普通的先进先出队列，还有一种头尾均可添加或删除的队列叫双端队列。

```
class Deque {
  constructor() {
    this.count = 0;
    this.firstCount = 0;
    this.list = [];
  }

  addFront(item) {
    if (this.isEmpty()) {
      this.addBack(item);
    } else if (this.firstCount > 0) {
      this.firstCount--;
      this.list[this.firstCount] = item;
    } else {
      for (let i = this.count; i > 0; i--) {
        this.list[i] = this.list[i - 1];
      }
      this.list[0] = item;
      this.count++;
      this.firstCount--;
    }
  }

  addBack(item) {
    this.list[this.count] = item;
  }

  removeFront() {
    delete this.list[this.firstCount];
    this.count--;
    this.firstCount++;
  }

  removeBack() {
    delete this.list[this.count - 1];
    this.count--;
  }

  peekFront() {
    return this.list[this.firstCount];
  }

  peekBack() {
    return this.list[this.count - 1];
  }

  isEmpty() {
    return this.count === 0;
  }

  clear() {
    this.list = {};
    this.firstCount = 0;
    this.count = 0;
  }

  size() {
    return this.count;
  }
}
```

比较绕的是 addFront 方法，向队列头部添加元素，可分为 3 种情况：

1. 队列是空的，直接向队列种添加元素
2. 队列头部删除过元素，那么 firstCount 一定是大于 0 的，这时只需要把 firstCount 减一，同时把值添加到第一个位置
3. 队列第一个元素是 0，即 firstCount 为 0，那么要将所有的元素向后移动一位，再把值插入到第一个位置
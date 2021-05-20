// 链表节点
class Comparator {
  constructor() {
    this.compare = Comparator.defaultCompareFunction;
  }

  static defaultCompareFunction(a, b) {
    if (a === b) {
      return 0;
    }

    return a < b ? -1 : 1;
  }

  equal(a, b) {
    return this.compare(a, b) === 0;
  }
}

class LinkNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

// 链表
class LinkList {
  constructor() {
    this.head = null; // 头节点
    this.tail = null; // 尾节点

    this.compare = new Comparator();
  }

  prepend(value) {
    const newNode = new LinkNode(value, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value) {
    const newNode = new LinkNode(value);

    if (!this.head) {
      // 链表为空，头尾节点都设置为新的节点
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    //将新的节点添加到尾节点
    this.tail.next = newNode; // 指向
    this.tail = newNode; // 值
  }

  delete(value) {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;

    // 头结点开始遍历
    // 退出循环时，head指向不等于value的那个节点
    while (this.head && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    // 尾节点没遍历到（因为没有next），需要再判断一下
    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode;
    }

    return deletedNode;
  }
}

const linkList = new LinkList();
linkList.append('yewei');
linkList.append('xiang');
linkList.append('jun');
linkList.append('hong');
linkList.delete('jun');
// linkList.append('yetao');
// linkList.append('xiang');

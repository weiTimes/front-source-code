class LinkNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class MyLinkedList {
  constructor() {
    const node = new LinkNode();
    this.dummy = node;
    this.tail = node;
    this.size = 0;
  }

  size() {
    return this.size;
  }

  // 在尾部添加新节点
  addAtTail(val) {
    this.tail.next = new LinkNode(val);
    this.tail = this.tail.next;

    this.size += 1;
  }

  // 在头部添加新节点
  addAtHead(val) {
    const node = new LinkNode(val);

    node.next = this.dummy.next;
    this.dummy.next = node;

    if (this.tail === this.dummy) {
      this.tail = node;
    }

    this.size += 1;
  }

  // 获取目标索引的上一个节点
  // 假设链表索引 从 0 开始
  getPrevNode(index) {
    let front = this.dummy.next; // 前指针
    let back = this.dummy; // 后指针

    for (let i = 0; i < index && front !== null; i++) {
      back = front;
      front = back.next;
    }

    return back;
  }

  // 获取链表中 index 节点的值，如果索引无效，则返回 -1
  get(index) {
    if (index < 0 || index >= this.size) {
      return -1;
    }

    return this.getPrevNode(index).next.val;
  }

  addAtIndex(index, val) {
    if (index > this.size) {
      return;
    } else if (index === this.size) {
      this.addAtTail(val);
    } else if (index <= 0) {
      this.addAtHead(val);
    } else {
      const node = new LinkNode(val);
      const prevNode = this.getPrevNode(index);

      node.next = prevNode.next;
      prevNode.next = node;

      this.size += 1;
    }
  }

  deleteAtIndex(index) {
    if (index < 0 || index >= this.size) {
      return;
    } else {
      const prevNode = this.getPrevNode(index);

      // 删除的是最后一个节点，改变 tail 指针
      if (prevNode.next === this.tail) {
        this.tail = prevNode;
      }

      prevNode.next = prevNode.next.next;
      this.size -= 1;
    }
  }
}

const linkedList = new MyLinkedList();

linkedList.addAtTail('h');
linkedList.addAtTail('e');
linkedList.addAtTail('l');
linkedList.deleteAtIndex(2);

console.log(linkedList, 'linked');

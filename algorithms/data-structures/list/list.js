// 模拟列表的实现
function List() {
  this.listSize = 0; // 列表元素个数
  this.pos = 0; // 列表当前位置
  this.dataStore = []; // 初始化一个空数组用来保存列表元素
  this.clear = clear; // 清空列表中的所有元素
  this.find = find; // 查找元素
  this.toString = toString; // 返回列表字符串形式
  this.insert = insert; // 在目标元素后插入新元素
  this.append = append; // 在列表元素末尾增加新元素
  this.remove = remove; // 从列表中删除元素
  this.front = front; // 从列表的当前位置移动到第一个位置
  this.end = end; // 从列表的当前位置移动到最后一个位置
  this.prev = prev; // 将当前位置前移一位
  this.next = next; // 将当前位置后移一位
  this.length = length; // 列表包含元素的个数
  this.currPos = currPos; // 列表的当前位置
  this.moveTo = moveTo; // 当前位置移动到指定位置
  this.getElement = getElement; // 显示当前索引的元素
  this.contains = contains; // 是否包含元素
}

// 清空数组
function clear() {
  this.dataStore = [];
  this.listSize = this.pos = 0;
}

function find(element) {
  for (let i = 0; i < this.dataStore.length; i++) {
    if (element === this.dataStore[i]) {
      return i;
    }
  }

  return -1;
}

function toString() {
  return this.dataStore.toString();
}

function append(element) {
  this.dataStore[this.listSize++] = element;
}

// 在目标元素后插入一个元素
function insert(element, target) {
  var targetIndex = this.find(target);

  if (targetIndex > -1) {
    this.dataStore.splice(targetIndex + 1, 0, element);
    this.listSize++;

    return this.dataStore;
  }

  return false;
}

function remove(element) {
  var findIndex = this.find(element);

  if (findIndex > -1) {
    var removeElement = this.dataStore.splice(findIndex, 1);
    this.listSize--;

    return removeElement;
  }

  return false;
}

function front() {
  this.pos = 0;
}

function end() {
  this.pos = this.listSize - 1;
}

function prev() {
  if (this.pos > 0) {
    this.pos--;
  }
}

function next() {
  if (this.pos < this.listSize) {
    this.pos++;
  }
}

function length() {
  return this.listSize;
}

function currPos() {
  return this.pos;
}

function moveTo(position) {
  this.pos = position;
}

function getElement() {
  return this.dataStore[this.pos];
}

function contains(element) {
  if (this.find(element) > -1) return true;

  return false;
}

const list = new List();
list.append('yewei');
list.append('yetao');
list.append('huge');
list.next();
list.next();

console.log(list.getElement());

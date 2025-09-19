# C++标准库容器：高效数据结构的集合

在前面的课程中，我们学习了C++的模板编程特性。在这节课中，我们将探讨C++标准库中的容器，这些是预先实现好的、高效的数据结构，可以直接在我们的程序中使用。

## 容器概览

C++标准库提供了各种类型的容器，用于存储和管理不同类型的数据。这些容器可以分为以下几类：

1. 序列容器（Sequence Containers）：按顺序存储元素
2. 关联容器（Associative Containers）：按键存储元素，提供快速查找
3. 无序关联容器（Unordered Associative Containers）：基于哈希表实现，提供平均常数时间的查找
4. 容器适配器（Container Adapters）：基于其他容器实现的特殊接口

## 序列容器

序列容器按顺序存储元素，保持元素的插入顺序。

### std::vector

`std::vector`是一个动态数组，可以在运行时调整大小。它提供了快速的随机访问，在尾部插入和删除元素的性能也很高。

```cpp
#include <iostream>
#include <vector>

int main() {
    // 创建一个空的vector
    std::vector<int> numbers;
    
    // 向vector中添加元素
    numbers.push_back(10);
    numbers.push_back(20);
    numbers.push_back(30);
    numbers.push_back(40);
    numbers.push_back(50);
    
    // 使用下标访问元素
    std::cout << "First element: " << numbers[0] << std::endl;
    std::cout << "Third element: " << numbers[2] << std::endl;
    
    // 使用at()方法访问元素（带边界检查）
    std::cout << "Last element: " << numbers.at(numbers.size() - 1) << std::endl;
    
    // 遍历vector（使用范围for循环）
    std::cout << "All elements: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // 插入元素
    numbers.insert(numbers.begin() + 2, 25);  // 在第三个位置插入25
    
    // 删除元素
    numbers.erase(numbers.begin() + 4);  // 删除第五个元素
    
    // 再次遍历vector（使用迭代器）
    std::cout << "After insert and erase: ";
    for (auto it = numbers.begin(); it != numbers.end(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;
    
    // 检查vector是否为空
    if (numbers.empty()) {
        std::cout << "Vector is empty" << std::endl;
    } else {
        std::cout << "Vector size: " << numbers.size() << std::endl;
    }
    
    // 清空vector
    numbers.clear();
    std::cout << "After clear, vector size: " << numbers.size() << std::endl;
    
    return 0;
}
```

### std::list

`std::list`是一个双向链表，支持在任意位置快速插入和删除元素，但不支持随机访问。

```cpp
#include <iostream>
#include <list>

int main() {
    // 创建一个list
    std::list<int> numbers = {10, 20, 30, 40, 50};
    
    // 在头部和尾部添加元素
    numbers.push_front(5);
    numbers.push_back(60);
    
    // 遍历list
    std::cout << "All elements: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // 插入元素
    auto it = numbers.begin();
    ++it;  // 移动到第二个元素
    numbers.insert(it, 7);  // 在第二个位置插入7
    
    // 删除元素
    it = numbers.begin();
    ++it;  // 移动到第二个元素
    ++it;  // 移动到第三个元素
    numbers.erase(it);  // 删除第三个元素
    
    // 再次遍历list
    std::cout << "After insert and erase: ";
    for (auto it = numbers.begin(); it != numbers.end(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;
    
    // 合并两个list
    std::list<int> another_list = {100, 200, 300};
    numbers.merge(another_list);
    
    // 排序
    numbers.sort();
    
    // 再次遍历list
    std::cout << "After merge and sort: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### std::deque

`std::deque`（双端队列）支持在两端快速插入和删除元素，同时也支持随机访问。

```cpp
#include <iostream>
#include <deque>

int main() {
    // 创建一个deque
    std::deque<int> numbers = {10, 20, 30};
    
    // 在头部和尾部添加元素
    numbers.push_front(5);
    numbers.push_back(40);
    numbers.push_back(50);
    
    // 使用下标访问元素
    std::cout << "First element: " << numbers[0] << std::endl;
    std::cout << "Third element: " << numbers[2] << std::endl;
    std::cout << "Last element: " << numbers[numbers.size() - 1] << std::endl;
    
    // 遍历deque
    std::cout << "All elements: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // 删除头部和尾部的元素
    numbers.pop_front();
    numbers.pop_back();
    
    // 再次遍历deque
    std::cout << "After pop front and back: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### std::array

`std::array`是一个固定大小的数组，提供了更好的类型安全性和更多的成员函数。

```cpp
#include <iostream>
#include <array>

int main() {
    // 创建一个大小为5的array
    std::array<int, 5> numbers = {10, 20, 30, 40, 50};
    
    // 使用下标访问元素
    std::cout << "First element: " << numbers[0] << std::endl;
    std::cout << "Third element: " << numbers[2] << std::endl;
    
    // 使用at()方法访问元素（带边界检查）
    std::cout << "Last element: " << numbers.at(numbers.size() - 1) << std::endl;
    
    // 遍历array
    std::cout << "All elements: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // 获取第一个和最后一个元素
    std::cout << "Front element: " << numbers.front() << std::endl;
    std::cout << "Back element: " << numbers.back() << std::endl;
    
    // 获取array的大小
    std::cout << "Array size: " << numbers.size() << std::endl;
    
    // 检查array是否为空（对于std::array，这个总是返回false，因为大小是固定的）
    if (numbers.empty()) {
        std::cout << "Array is empty" << std::endl;
    } else {
        std::cout << "Array is not empty" << std::endl;
    }
    
    return 0;
}
```

## 关联容器

关联容器按键存储元素，并提供快速查找。默认情况下，它们按键的升序排列元素。

### std::map

`std::map`是一个有序的键值对容器，其中每个键都是唯一的。

```cpp
#include <iostream>
#include <map>
#include <string>

int main() {
    // 创建一个map，键为string类型，值为int类型
    std::map<std::string, int> scores;
    
    // 插入键值对
    scores["Alice"] = 95;
    scores["Bob"] = 87;
    scores["Charlie"] = 92;
    scores["David"] = 78;
    scores["Eva"] = 90;
    
    // 使用insert方法插入键值对
    scores.insert(std::make_pair("Frank", 85));
    
    // 访问元素
    std::cout << "Alice's score: " << scores["Alice"] << std::endl;
    
    // 检查键是否存在
    if (scores.find("George") != scores.end()) {
        std::cout << "George's score: " << scores["George"] << std::endl;
    } else {
        std::cout << "George is not in the map" << std::endl;
    }
    
    // 遍历map
    std::cout << "All scores: " << std::endl;
    for (const auto& pair : scores) {
        std::cout << pair.first << ": " << pair.second << std::endl;
    }
    
    // 删除元素
    scores.erase("Bob");
    
    // 再次遍历map
    std::cout << "\nAfter deleting Bob: " << std::endl;
    for (const auto& pair : scores) {
        std::cout << pair.first << ": " << pair.second << std::endl;
    }
    
    // 获取map的大小
    std::cout << "\nMap size: " << scores.size() << std::endl;
    
    // 清空map
    scores.clear();
    std::cout << "After clear, map size: " << scores.size() << std::endl;
    
    return 0;
}
```

### std::set

`std::set`是一个有序的容器，其中每个元素都是唯一的。

```cpp
#include <iostream>
#include <set>
#include <string>

int main() {
    // 创建一个set，存储int类型的元素
    std::set<int> numbers = {10, 20, 30, 40, 50};
    
    // 插入元素
    numbers.insert(25);
    numbers.insert(10);  // 重复元素，不会被插入
    
    // 检查元素是否存在
    if (numbers.find(30) != numbers.end()) {
        std::cout << "30 is in the set" << std::endl;
    } else {
        std::cout << "30 is not in the set" << std::endl;
    }
    
    // 遍历set
    std::cout << "All elements: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // 删除元素
    numbers.erase(40);
    
    // 再次遍历set
    std::cout << "After deleting 40: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // 获取set的大小
    std::cout << "Set size: " << numbers.size() << std::endl;
    
    // 清空set
    numbers.clear();
    std::cout << "After clear, set size: " << numbers.size() << std::endl;
    
    return 0;
}
```

## 无序关联容器

无序关联容器基于哈希表实现，提供平均常数时间的查找、插入和删除操作。

### std::unordered_map

`std::unordered_map`是一个基于哈希表的键值对容器，其中每个键都是唯一的。

```cpp
#include <iostream>
#include <unordered_map>
#include <string>

int main() {
    // 创建一个unordered_map，键为string类型，值为int类型
    std::unordered_map<std::string, int> scores;
    
    // 插入键值对
    scores["Alice"] = 95;
    scores["Bob"] = 87;
    scores["Charlie"] = 92;
    scores["David"] = 78;
    scores["Eva"] = 90;
    
    // 访问元素
    std::cout << "Alice's score: " << scores["Alice"] << std::endl;
    
    // 检查键是否存在
    if (scores.find("George") != scores.end()) {
        std::cout << "George's score: " << scores["George"] << std::endl;
    } else {
        std::cout << "George is not in the map" << std::endl;
    }
    
    // 遍历unordered_map
    std::cout << "All scores: " << std::endl;
    for (const auto& pair : scores) {
        std::cout << pair.first << ": " << pair.second << std::endl;
    }
    
    // 获取桶的数量和负载因子
    std::cout << "\nBucket count: " << scores.bucket_count() << std::endl;
    std::cout << "Load factor: " << scores.load_factor() << std::endl;
    
    return 0;
}
```

### std::unordered_set

`std::unordered_set`是一个基于哈希表的容器，其中每个元素都是唯一的。

```cpp
#include <iostream>
#include <unordered_set>
#include <string>

int main() {
    // 创建一个unordered_set，存储int类型的元素
    std::unordered_set<int> numbers = {10, 20, 30, 40, 50};
    
    // 插入元素
    numbers.insert(25);
    numbers.insert(10);  // 重复元素，不会被插入
    
    // 检查元素是否存在
    if (numbers.find(30) != numbers.end()) {
        std::cout << "30 is in the set" << std::endl;
    } else {
        std::cout << "30 is not in the set" << std::endl;
    }
    
    // 遍历unordered_set
    std::cout << "All elements: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // 获取桶的数量和负载因子
    std::cout << "Bucket count: " << numbers.bucket_count() << std::endl;
    std::cout << "Load factor: " << numbers.load_factor() << std::endl;
    
    return 0;
}
```

## 容器适配器

容器适配器是基于其他容器实现的特殊接口，提供了限制的功能。

### std::stack

`std::stack`是一个后进先出（LIFO）的数据结构，只允许在栈顶插入和删除元素。

```cpp
#include <iostream>
#include <stack>

int main() {
    // 创建一个stack，存储int类型的元素
    std::stack<int> numbers;
    
    // 压入元素
    numbers.push(10);
    numbers.push(20);
    numbers.push(30);
    numbers.push(40);
    numbers.push(50);
    
    // 获取栈顶元素
    std::cout << "Top element: " << numbers.top() << std::endl;
    
    // 弹出元素
    numbers.pop();
    std::cout << "After pop, top element: " << numbers.top() << std::endl;
    
    // 获取栈的大小
    std::cout << "Stack size: " << numbers.size() << std::endl;
    
    // 检查栈是否为空
    if (numbers.empty()) {
        std::cout << "Stack is empty" << std::endl;
    } else {
        std::cout << "Stack is not empty" << std::endl;
    }
    
    // 弹出所有元素
    std::cout << "Popping all elements: ";
    while (!numbers.empty()) {
        std::cout << numbers.top() << " ";
        numbers.pop();
    }
    std::cout << std::endl;
    
    return 0;
}
```

### std::queue

`std::queue`是一个先进先出（FIFO）的数据结构，允许在队尾插入元素，在队头删除元素。

```cpp
#include <iostream>
#include <queue>

int main() {
    // 创建一个queue，存储int类型的元素
    std::queue<int> numbers;
    
    // 入队
    numbers.push(10);
    numbers.push(20);
    numbers.push(30);
    numbers.push(40);
    numbers.push(50);
    
    // 获取队首和队尾元素
    std::cout << "Front element: " << numbers.front() << std::endl;
    std::cout << "Back element: " << numbers.back() << std::endl;
    
    // 出队
    numbers.pop();
    std::cout << "After pop, front element: " << numbers.front() << std::endl;
    
    // 获取队列的大小
    std::cout << "Queue size: " << numbers.size() << std::endl;
    
    // 检查队列是否为空
    if (numbers.empty()) {
        std::cout << "Queue is empty" << std::endl;
    } else {
        std::cout << "Queue is not empty" << std::endl;
    }
    
    return 0;
}
```

### std::priority_queue

`std::priority_queue`是一个优先队列，其中的元素按照一定的优先级排列。默认情况下，最大的元素位于队首。

```cpp
#include <iostream>
#include <queue>

int main() {
    // 创建一个priority_queue，存储int类型的元素
    std::priority_queue<int> numbers;
    
    // 入队
    numbers.push(30);
    numbers.push(10);
    numbers.push(50);
    numbers.push(20);
    numbers.push(40);
    
    // 获取队首元素（最大值）
    std::cout << "Top element: " << numbers.top() << std::endl;
    
    // 出队
    numbers.pop();
    std::cout << "After pop, top element: " << numbers.top() << std::endl;
    
    // 获取队列的大小
    std::cout << "Queue size: " << numbers.size() << std::endl;
    
    // 弹出所有元素（按优先级顺序）
    std::cout << "Popping all elements: ";
    while (!numbers.empty()) {
        std::cout << numbers.top() << " ";
        numbers.pop();
    }
    std::cout << std::endl;
    
    // 创建一个最小堆优先队列
    std::priority_queue<int, std::vector<int>, std::greater<int>> min_heap;
    min_heap.push(30);
    min_heap.push(10);
    min_heap.push(50);
    min_heap.push(20);
    min_heap.push(40);
    
    // 弹出所有元素（按从小到大顺序）
    std::cout << "Popping min heap elements: ";
    while (!min_heap.empty()) {
        std::cout << min_heap.top() << " ";
        min_heap.pop();
    }
    std::cout << std::endl;
    
    return 0;
}
```

## 容器的选择

在实际应用中，我们需要根据具体的需求选择合适的容器：

- 如果需要快速的随机访问，选择`std::vector`或`std::deque`
- 如果需要频繁地在任意位置插入和删除元素，选择`std::list`
- 如果需要固定大小的数组，选择`std::array`
- 如果需要按键查找、插入和删除元素，选择`std::map`或`std::unordered_map`
- 如果需要存储唯一的元素并快速查找，选择`std::set`或`std::unordered_set`
- 如果需要后进先出的数据结构，选择`std::stack`
- 如果需要先进先出的数据结构，选择`std::queue`
- 如果需要优先队列，选择`std::priority_queue`

## 练习时间

让我们来做一些练习，巩固一下这节课所学的知识：

1. 使用`std::vector`存储一组整数，然后对其进行排序并计算平均值
2. 使用`std::map`存储学生的姓名和成绩，然后按成绩从高到低排序输出
3. 使用`std::stack`实现一个简单的括号匹配检查器
4. 使用`std::queue`模拟一个打印队列
5. 使用`std::unordered_map`统计一段文本中每个单词出现的次数
6. 创建一个自定义的类，然后将其对象存储在各种容器中

## 小结

在这节课中，我们学习了C++标准库中的容器：

- 序列容器（`std::vector`、`std::list`、`std::deque`、`std::array`）
- 关联容器（`std::map`、`std::set`）
- 无序关联容器（`std::unordered_map`、`std::unordered_set`）
- 容器适配器（`std::stack`、`std::queue`、`std::priority_queue`）

C++标准库中的容器是预先实现好的、高效的数据结构，可以帮助我们快速开发程序，而无需自己实现这些复杂的数据结构。在下一节课中，我们将学习C++标准库中的算法！
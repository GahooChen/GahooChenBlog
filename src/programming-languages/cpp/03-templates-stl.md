# 模板与STL：C++的泛型编程

泛型编程是C++的另一个强大特性，它允许我们编写与数据类型无关的代码。本章将介绍C++的模板机制和标准模板库（STL），这些工具可以大大提高我们的编程效率和代码质量。

## 模板：泛型编程的基础

模板是C++实现泛型编程的核心机制，它允许我们定义可以处理不同数据类型的函数和类。

### 函数模板

函数模板允许我们定义一个通用的函数，可以处理不同类型的参数。

```cpp
#include <iostream>

// 函数模板定义：找出两个数中的最大值
template <typename T>  // 或者使用 template <class T>
T max(T a, T b) {
    return a > b ? a : b;
}

int main() {
    // 自动推导类型
    std::cout << "整数最大值：" << max(10, 20) << std::endl;           // T是int
    std::cout << "浮点数最大值：" << max(3.14, 2.71) << std::endl;       // T是double
    std::cout << "字符最大值：" << max('a', 'z') << std::endl;          // T是char
    
    // 显式指定类型
    std::cout << "显式指定为int：" << max<int>(10, 20) << std::endl;
    std::cout << "显式指定为double：" << max<double>(10, 20.5) << std::endl;
    
    return 0;
}
```

### 类模板

类模板允许我们定义一个通用的类，可以处理不同类型的数据。

```cpp
#include <iostream>

// 类模板定义：简单的栈实现
template <typename T>
class Stack {
private:
    T* elements;
    int size;
    int capacity;
    
public:
    // 构造函数
    Stack(int cap = 10) : capacity(cap), size(0) {
        elements = new T[capacity];
    }
    
    // 析构函数
    ~Stack() {
        delete[] elements;
    }
    
    // 入栈操作
    void push(const T& item) {
        if (size >= capacity) {
            std::cout << "栈溢出！" << std::endl;
            return;
        }
        elements[size++] = item;
    }
    
    // 出栈操作
    T pop() {
        if (size <= 0) {
            std::cout << "栈为空！" << std::endl;
            return T();  // 返回默认构造的T类型值
        }
        return elements[--size];
    }
    
    // 获取栈顶元素
    T top() const {
        if (size <= 0) {
            std::cout << "栈为空！" << std::endl;
            return T();
        }
        return elements[size - 1];
    }
    
    // 判断栈是否为空
    bool isEmpty() const {
        return size == 0;
    }
};

int main() {
    // 创建一个存储整数的栈
    Stack<int> intStack;
    intStack.push(10);
    intStack.push(20);
    std::cout << "栈顶元素：" << intStack.top() << std::endl;  // 输出：20
    std::cout << "弹出元素：" << intStack.pop() << std::endl;  // 输出：20
    
    // 创建一个存储字符串的栈
    Stack<std::string> stringStack;
    stringStack.push("Hello");
    stringStack.push("C++");
    std::cout << "栈顶元素：" << stringStack.top() << std::endl;  // 输出：C++
    
    return 0;
}
```

### 1.3 模板特化

有时候，我们可能需要为特定的数据类型提供自定义的模板实现，这就是模板特化。

```cpp
#include <iostream>
#include <string>

// 主模板
template <typename T>
class MyClass {
public:
    void print() {
        std::cout << "通用模板" << std::endl;
    }
};

// 对int类型的特化
template <>
class MyClass<int> {
public:
    void print() {
        std::cout << "int类型特化" << std::endl;
    }
};

// 对std::string类型的特化
template <>
class MyClass<std::string> {
public:
    void print() {
        std::cout << "string类型特化" << std::endl;
    }
};

int main() {
    MyClass<double> d;  // 使用通用模板
    d.print();          // 输出：通用模板
    
    MyClass<int> i;     // 使用int特化版本
    i.print();          // 输出：int类型特化
    
    MyClass<std::string> s;  // 使用string特化版本
    s.print();          // 输出：string类型特化
    
    return 0;
}
```

## 2. 标准模板库（STL）：C++的利器

标准模板库（STL）是C++标准库的重要组成部分，它提供了一系列的容器、迭代器、算法和函数对象，可以帮助我们更高效地编写代码。

### 2.1 STL的组成部分

STL主要由以下几部分组成：
- **容器（Containers）**：用于存储数据的对象，如vector、list、map等
- **迭代器（Iterators）**：用于遍历容器中的元素，类似于指针
- **算法（Algorithms）**：用于操作容器中元素的函数，如sort、find等
- **函数对象（Functors）**：具有函数行为的对象
- **适配器（Adapters）**：用于修改其他组件接口的组件
- **分配器（Allocators）**：用于处理内存分配的组件

### 2.2 容器（Containers）

STL提供了多种类型的容器，每种容器都有其特定的用途和性能特点。

#### 2.2.1 序列容器（Sequence Containers）

序列容器按照元素的插入顺序存储元素。

##### 2.2.1.1 vector：动态数组

```cpp
#include <iostream>
#include <vector>

int main() {
    // 创建一个vector
    std::vector<int> numbers;
    
    // 添加元素
    numbers.push_back(10);
    numbers.push_back(20);
    numbers.push_back(30);
    
    // 使用索引访问元素
    std::cout << "第二个元素：" << numbers[1] << std::endl;  // 输出：20
    
    // 使用at()方法访问元素（会进行边界检查）
    std::cout << "第三个元素：" << numbers.at(2) << std::endl;  // 输出：30
    
    // 获取vector的大小
    std::cout << "元素数量：" << numbers.size() << std::endl;  // 输出：3
    
    // 遍历vector
    std::cout << "所有元素：";
    for (int i = 0; i < numbers.size(); i++) {
        std::cout << numbers[i] << " ";
    }
    std::cout << std::endl;
    
    // 使用范围for循环遍历（C++11及以上）
    std::cout << "所有元素：";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

##### 2.2.1.2 list：双向链表

```cpp
#include <iostream>
#include <list>

int main() {
    // 创建一个list
    std::list<int> numbers;
    
    // 添加元素
    numbers.push_back(10);
    numbers.push_front(5);
    numbers.push_back(20);
    
    // 遍历list（不能使用索引访问）
    std::cout << "所有元素：";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;  // 输出：5 10 20
    
    // 插入元素
    auto it = numbers.begin();
    ++it;  // 移动到第二个元素位置
    numbers.insert(it, 7);  // 在5和10之间插入7
    
    // 删除元素
    numbers.remove(10);  // 删除所有值为10的元素
    
    // 再次遍历
    std::cout << "修改后元素：";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;  // 输出：5 7 20
    
    return 0;
}
```

##### 2.2.1.3 deque：双端队列

```cpp
#include <iostream>
#include <deque>

int main() {
    // 创建一个deque
    std::deque<int> numbers;
    
    // 在两端添加元素
    numbers.push_back(10);
    numbers.push_front(5);
    numbers.push_back(20);
    
    // 使用索引访问元素
    std::cout << "第二个元素：" << numbers[1] << std::endl;  // 输出：10
    
    // 遍历deque
    std::cout << "所有元素：";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;  // 输出：5 10 20
    
    // 删除两端元素
    numbers.pop_front();  // 删除第一个元素
    numbers.pop_back();   // 删除最后一个元素
    
    std::cout << "删除后元素：";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;  // 输出：10
    
    return 0;
}
```

#### 2.2.2 关联容器（Associative Containers）

关联容器中的元素按键（key）排序并存储。

##### 2.2.2.1 map：键值对映射（按键排序）

```cpp
#include <iostream>
#include <map>
#include <string>

int main() {
    // 创建一个map，键为string类型，值为int类型
    std::map<std::string, int> scores;
    
    // 添加键值对
    scores["张三"] = 90;
    scores["李四"] = 85;
    scores["王五"] = 95;
    
    // 使用insert方法添加键值对
    scores.insert({"赵六", 88});
    
    // 查找元素
    auto it = scores.find("李四");
    if (it != scores.end()) {
        std::cout << "李四的分数：" << it->second << std::endl;  // 输出：85
    }
    
    // 遍历map
    std::cout << "所有成绩：" << std::endl;
    for (const auto& pair : scores) {
        std::cout << pair.first << ": " << pair.second << std::endl;
    }
    // 输出（按键排序）：
    // 李四: 85
    // 王五: 95
    // 张三: 90
    // 赵六: 88
    
    // 删除元素
    scores.erase("王五");
    
    return 0;
}
```

##### 2.2.2.2 unordered_map：键值对映射（哈希表实现）

```cpp
#include <iostream>
#include <unordered_map>
#include <string>

int main() {
    // 创建一个unordered_map
    std::unordered_map<std::string, int> scores;
    
    // 添加键值对
    scores["张三"] = 90;
    scores["李四"] = 85;
    scores["王五"] = 95;
    
    // 查找元素（平均时间复杂度O(1)）
    auto it = scores.find("李四");
    if (it != scores.end()) {
        std::cout << "李四的分数：" << it->second << std::endl;  // 输出：85
    }
    
    // 遍历unordered_map（顺序不确定）
    std::cout << "所有成绩：" << std::endl;
    for (const auto& pair : scores) {
        std::cout << pair.first << ": " << pair.second << std::endl;
    }
    
    return 0;
}
```

#### 2.2.3 容器适配器（Container Adapters）

容器适配器是对现有容器的封装，提供了特定的接口。

##### 2.2.3.1 stack：栈

```cpp
#include <iostream>
#include <stack>

int main() {
    // 创建一个stack
    std::stack<int> s;
    
    // 入栈
    s.push(10);
    s.push(20);
    s.push(30);
    
    // 获取栈顶元素
    std::cout << "栈顶元素：" << s.top() << std::endl;  // 输出：30
    
    // 获取栈的大小
    std::cout << "栈大小：" << s.size() << std::endl;  // 输出：3
    
    // 出栈
    s.pop();
    std::cout << "出栈后栈顶元素：" << s.top() << std::endl;  // 输出：20
    
    // 检查栈是否为空
    std::cout << "栈是否为空：" << (s.empty() ? "是" : "否") << std::endl;  // 输出：否
    
    return 0;
}
```

##### 2.2.3.2 queue：队列

```cpp
#include <iostream>
#include <queue>

int main() {
    // 创建一个queue
    std::queue<int> q;
    
    // 入队
    q.push(10);
    q.push(20);
    q.push(30);
    
    // 获取队首元素
    std::cout << "队首元素：" << q.front() << std::endl;  // 输出：10
    
    // 获取队尾元素
    std::cout << "队尾元素：" << q.back() << std::endl;  // 输出：30
    
    // 获取队列的大小
    std::cout << "队列大小：" << q.size() << std::endl;  // 输出：3
    
    // 出队
    q.pop();
    std::cout << "出队后队首元素：" << q.front() << std::endl;  // 输出：20
    
    return 0;
}
```

### 2.3 迭代器（Iterators）

迭代器是用于遍历STL容器的对象，它的行为类似于指针。不同的容器提供了不同类型的迭代器。

```cpp
#include <iostream>
#include <vector>
#include <list>

int main() {
    // 使用迭代器遍历vector
    std::vector<int> vec = {10, 20, 30, 40, 50};
    std::cout << "vector中的元素：";
    for (std::vector<int>::iterator it = vec.begin(); it != vec.end(); ++it) {
        std::cout << *it << " ";  // 使用*运算符访问元素
    }
    std::cout << std::endl;
    
    // 使用const迭代器（不能修改元素）
    std::cout << "vector中的元素（const迭代器）：";
    for (std::vector<int>::const_iterator cit = vec.cbegin(); cit != vec.cend(); ++cit) {
        std::cout << *cit << " ";
    }
    std::cout << std::endl;
    
    // 使用反向迭代器
    std::cout << "vector中的元素（反向）：";
    for (std::vector<int>::reverse_iterator rit = vec.rbegin(); rit != vec.rend(); ++rit) {
        std::cout << *rit << " ";
    }
    std::cout << std::endl;
    
    // 遍历list
    std::list<int> lst = {1, 2, 3, 4, 5};
    std::cout << "list中的元素：";
    for (std::list<int>::iterator it = lst.begin(); it != lst.end(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### 2.4 算法（Algorithms）

STL提供了大量的算法，可以用于各种常见的操作，如查找、排序、转换等。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>

int main() {
    std::vector<int> numbers = {5, 2, 8, 1, 9, 3, 7, 4, 6};
    
    // 排序（默认升序）
    std::sort(numbers.begin(), numbers.end());
    
    std::cout << "排序后：";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;  // 输出：1 2 3 4 5 6 7 8 9
    
    // 降序排序
    std::sort(numbers.begin(), numbers.end(), std::greater<int>());
    
    std::cout << "降序排序后：";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;  // 输出：9 8 7 6 5 4 3 2 1
    
    // 查找元素
    auto it = std::find(numbers.begin(), numbers.end(), 5);
    if (it != numbers.end()) {
        std::cout << "找到元素5，位置：" << std::distance(numbers.begin(), it) << std::endl;
    }
    
    // 计算元素出现次数
    int count = std::count(numbers.begin(), numbers.end(), 3);
    std::cout << "元素3出现的次数：" << count << std::endl;
    
    // 应用函数到每个元素
    std::cout << "每个元素的平方：";
    for (int num : numbers) {
        std::cout << num * num << " ";
    }
    std::cout << std::endl;
    
    // 检查所有元素是否满足条件
    bool allPositive = std::all_of(numbers.begin(), numbers.end(), 
                                  [](int n) { return n > 0; });
    std::cout << "所有元素都是正数：" << (allPositive ? "是" : "否") << std::endl;
    
    return 0;
}
```

## 3. 练习与实践

### 3.1 基础练习

1. 使用函数模板实现一个通用的交换函数，可以交换不同类型的两个变量。
2. 使用vector存储一组整数，然后使用STL算法对其进行排序和查找操作。
3. 使用map存储学生的姓名和成绩，然后遍历并输出所有学生的成绩。

### 3.2 进阶挑战

1. 实现一个简单的模板类，用于存储和管理不同类型的元素。
2. 使用STL容器和算法实现一个简单的单词频率统计程序，可以读取一段文本，统计每个单词出现的次数，并按频率排序输出。

## 4. 小结

本章我们学习了C++的模板和标准模板库（STL），这是C++提供的强大特性：

- 函数模板和类模板的定义和使用
- 模板特化的概念和实现
- STL的基本组成部分（容器、迭代器、算法等）
- 常用容器的使用方法（vector、list、map、unordered_map等）
- STL算法的应用

掌握模板和STL可以大大提高我们的编程效率，让我们能够编写更加通用、高效和可维护的代码。下一章，我们将学习C++的异常处理机制，这是C++提供的另一个重要特性。
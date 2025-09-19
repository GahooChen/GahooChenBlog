# 模板编程：泛型编程的基础

在前面的课程中，我们学习了C++的运算符重载特性。在这节课中，我们将探讨C++的模板编程，这是实现泛型编程的基础。

## 模板的基本概念

模板是C++的一种特性，它允许我们定义通用的函数或类，这些函数或类可以处理不同类型的数据。通过模板，我们可以编写与类型无关的代码，提高代码的重用性和灵活性。

C++模板主要分为两类：
- 函数模板
- 类模板

## 函数模板

函数模板允许我们定义一个通用的函数，可以处理不同类型的参数。函数模板的定义使用关键字`template`和模板参数列表。

### 函数模板的基本语法

函数模板的基本语法如下：

```cpp
template <typename T>
返回类型 函数名(参数列表) {
    // 函数体
}
```

其中，`T`是模板参数，可以是任意有效的C++类型。`typename`关键字也可以替换为`class`，它们在函数模板中是等价的。

下面是一个简单的函数模板示例，用于找出两个数中的较大值：

```cpp
#include <iostream>

// 函数模板：找出两个数中的较大值
template <typename T>
T max(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    // 使用函数模板处理int类型
    int i1 = 10, i2 = 20;
    std::cout << "max(" << i1 << ", " << i2 << ") = " << max(i1, i2) << std::endl;
    
    // 使用函数模板处理double类型
    double d1 = 3.14, d2 = 2.71;
    std::cout << "max(" << d1 << ", " << d2 << ") = " << max(d1, d2) << std::endl;
    
    // 使用函数模板处理char类型
    char c1 = 'A', c2 = 'B';
    std::cout << "max(" << c1 << ", " << c2 << ") = " << max(c1, c2) << std::endl;
    
    return 0;
}
```

### 多个模板参数

函数模板可以有多个模板参数：

```cpp
#include <iostream>
#include <string>

// 函数模板：比较两个不同类型的值
template <typename T1, typename T2>
bool are_equal(T1 a, T2 b) {
    return (a == b);
}

int main() {
    // 比较int和double
    std::cout << "are_equal(5, 5.0): " << std::boolalpha << are_equal(5, 5.0) << std::endl;
    
    // 比较char和int
    std::cout << "are_equal('A', 65): " << std::boolalpha << are_equal('A', 65) << std::endl;
    
    // 比较double和float
    std::cout << "are_equal(3.14, 3.14f): " << std::boolalpha << are_equal(3.14, 3.14f) << std::endl;
    
    return 0;
}
```

### 显式指定模板参数

在调用函数模板时，我们可以显式指定模板参数类型：

```cpp
#include <iostream>
#include <string>

// 函数模板：打印值
template <typename T>
void print(T value) {
    std::cout << "Value: " << value << std::endl;
}

int main() {
    // 隐式指定模板参数类型
    print(10);
    print(3.14);
    print("Hello, C++!");
    
    // 显式指定模板参数类型
    print<int>(20);
    print<double>(4.5);
    print<std::string>("Explicit type");
    
    return 0;
}
```

### 函数模板的重载

函数模板可以像普通函数一样被重载：

```cpp
#include <iostream>
#include <string>

// 函数模板：打印一个值
template <typename T>
void print(T value) {
    std::cout << "Single value: " << value << std::endl;
}

// 函数模板重载：打印两个值
template <typename T1, typename T2>
void print(T1 value1, T2 value2) {
    std::cout << "Two values: " << value1 << ", " << value2 << std::endl;
}

int main() {
    print(10);                  // 调用第一个函数模板
    print(3.14, "Hello");       // 调用第二个函数模板
    print("World", 5.6);        // 调用第二个函数模板
    
    return 0;
}
```

## 类模板

类模板允许我们定义一个通用的类，可以处理不同类型的数据。类模板的定义也使用关键字`template`和模板参数列表。

### 类模板的基本语法

类模板的基本语法如下：

```cpp
template <typename T>
class 类名 {
    // 类的成员
};
```

下面是一个简单的类模板示例，用于实现一个通用的栈：

```cpp
#include <iostream>
#include <string>

// 类模板：通用栈
template <typename T>
class Stack {
private:
    T* elements;
    int size;
    int top;
    
public:
    Stack(int s) : size(s), top(-1) {
        elements = new T[size];
    }
    
    ~Stack() {
        delete[] elements;
    }
    
    void push(T element) {
        if (top < size - 1) {
            elements[++top] = element;
        } else {
            std::cout << "Stack overflow!" << std::endl;
        }
    }
    
    T pop() {
        if (top >= 0) {
            return elements[top--];
        } else {
            std::cout << "Stack underflow!" << std::endl;
            return T();  // 返回默认构造的T类型值
        }
    }
    
    bool is_empty() const {
        return top == -1;
    }
    
    bool is_full() const {
        return top == size - 1;
    }
};

int main() {
    // 创建一个int类型的栈
    Stack<int> int_stack(5);
    
    // 压入元素
    std::cout << "Pushing elements to int stack..." << std::endl;
    for (int i = 1; i <= 5; i++) {
        int_stack.push(i * 10);
        std::cout << "Pushed: " << i * 10 << std::endl;
    }
    
    // 尝试压入更多元素（栈溢出）
    int_stack.push(60);
    
    // 弹出元素
    std::cout << "\nPopping elements from int stack..." << std::endl;
    while (!int_stack.is_empty()) {
        std::cout << "Popped: " << int_stack.pop() << std::endl;
    }
    
    // 尝试弹出更多元素（栈下溢）
    int_stack.pop();
    
    // 创建一个double类型的栈
    Stack<double> double_stack(3);
    double_stack.push(3.14);
    double_stack.push(2.71);
    double_stack.push(1.41);
    
    std::cout << "\nPopping elements from double stack..." << std::endl;
    while (!double_stack.is_empty()) {
        std::cout << "Popped: " << double_stack.pop() << std::endl;
    }
    
    return 0;
}
```

### 类模板的成员函数

类模板的成员函数可以在类模板定义内部实现，也可以在外部实现。如果在外部实现，需要使用模板参数列表：

```cpp
#include <iostream>
#include <string>

template <typename T>
class Box {
private:
    T value;
    
public:
    // 构造函数在类模板定义内部实现
    Box(T v) : value(v) {}
    
    // 成员函数在类模板定义内部实现
    void set_value(T v) {
        value = v;
    }
    
    // 成员函数声明，在类模板定义外部实现
    T get_value() const;
};

// 成员函数在类模板定义外部实现
template <typename T>
T Box<T>::get_value() const {
    return value;
}

int main() {
    Box<int> int_box(10);
    std::cout << "int_box value: " << int_box.get_value() << std::endl;
    
    Box<std::string> string_box("Hello, C++!");
    std::cout << "string_box value: " << string_box.get_value() << std::endl;
    
    string_box.set_value("Updated value");
    std::cout << "Updated string_box value: " << string_box.get_value() << std::endl;
    
    return 0;
}
```

## 模板特化

模板特化是指为特定的模板参数类型提供专门的实现。模板特化可以分为全特化和偏特化。

### 函数模板的全特化

函数模板的全特化是指为所有模板参数提供具体的类型：

```cpp
#include <iostream>
#include <string>

// 函数模板
template <typename T>
void print(T value) {
    std::cout << "General template: " << value << std::endl;
}

// 函数模板的全特化（针对char*类型）
template <>
void print<char*>(char* value) {
    std::cout << "Specialized template for char*: " << value << std::endl;
}

// 函数模板的全特化（针对int类型）
template <>
void print<int>(int value) {
    std::cout << "Specialized template for int: " << value << std::endl;
}

int main() {
    int i = 10;
    double d = 3.14;
    char* str = "Hello, C++!";
    std::string cpp_str = "C++ string";
    
    print(i);          // 调用int特化版本
    print(d);          // 调用通用模板
    print(str);        // 调用char*特化版本
    print(cpp_str);    // 调用通用模板
    
    return 0;
}
```

### 类模板的全特化

类模板的全特化是指为所有模板参数提供具体的类型：

```cpp
#include <iostream>
#include <string>

// 类模板
template <typename T>
class Container {
private:
    T value;
    
public:
    Container(T v) : value(v) {}
    
    void print() const {
        std::cout << "General Container: " << value << std::endl;
    }
};

// 类模板的全特化（针对std::string类型）
template <>
class Container<std::string> {
private:
    std::string value;
    
public:
    Container(std::string v) : value(v) {}
    
    void print() const {
        std::cout << "Specialized Container for string: " << value << std::endl;
    }
};

int main() {
    Container<int> int_container(10);
    int_container.print();
    
    Container<double> double_container(3.14);
    double_container.print();
    
    Container<std::string> string_container("Hello, C++!");
    string_container.print();
    
    return 0;
}
```

## 模板参数

模板参数不仅可以是类型参数，还可以是非类型参数（如整数、枚举、指针、引用等）。

```cpp
#include <iostream>
#include <string>

// 类模板：具有非类型参数的数组
template <typename T, int Size>
class Array {
private:
    T elements[Size];
    
public:
    void set(int index, T value) {
        if (index >= 0 && index < Size) {
            elements[index] = value;
        }
    }
    
    T get(int index) const {
        if (index >= 0 && index < Size) {
            return elements[index];
        }
        return T();  // 返回默认构造的T类型值
    }
    
    int get_size() const {
        return Size;
    }
};

int main() {
    // 创建一个大小为5的int数组
    Array<int, 5> int_array;
    
    // 设置数组元素
    for (int i = 0; i < int_array.get_size(); i++) {
        int_array.set(i, i * 10);
    }
    
    // 获取并打印数组元素
    std::cout << "Int array elements: " << std::endl;
    for (int i = 0; i < int_array.get_size(); i++) {
        std::cout << "Element " << i << ": " << int_array.get(i) << std::endl;
    }
    
    // 创建一个大小为3的double数组
    Array<double, 3> double_array;
    double_array.set(0, 3.14);
    double_array.set(1, 2.71);
    double_array.set(2, 1.41);
    
    // 获取并打印数组元素
    std::cout << "\nDouble array elements: " << std::endl;
    for (int i = 0; i < double_array.get_size(); i++) {
        std::cout << "Element " << i << ": " << double_array.get(i) << std::endl;
    }
    
    return 0;
}
```

## 练习时间

让我们来做一些练习，巩固一下这节课所学的知识：

1. 编写一个函数模板`swap`，用于交换两个变量的值
2. 编写一个函数模板`sort`，用于对数组进行排序
3. 编写一个类模板`Pair`，表示一对值，可以是相同或不同类型
4. 编写一个类模板`Queue`，实现一个通用的队列数据结构
5. 为`Queue`类模板提供针对特定类型的特化版本
6. 编写一个类模板`Vector`，实现一个简单的动态数组

## 小结

在这节课中，我们学习了C++的模板编程特性：

- 函数模板的基本概念和用法
- 类模板的基本概念和用法
- 模板特化（全特化）
- 模板参数（类型参数和非类型参数）

模板是C++泛型编程的基础，它允许我们编写与类型无关的代码，提高代码的重用性和灵活性。通过模板，我们可以创建通用的数据结构和算法，可以处理各种不同类型的数据。在下一节课中，我们将学习C++标准库中的容器和算法！
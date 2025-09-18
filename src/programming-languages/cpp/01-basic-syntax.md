# C++基础语法：从C到C++的平滑过渡

欢迎来到C++的世界！如果你已经学习过C语言，那么你会发现C++既有熟悉的地方，也有很多强大的新特性。本章将重点介绍C++与C语言的区别以及C++在基础语法上的扩展，帮助你实现从C到C++的平滑过渡。

## 第一个C++程序

让我们从一个简单的C++程序开始：

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, C++!" << std::endl;
    return 0;
}
```

这个程序与C语言的Hello World程序有什么不同？

- 使用了`#include <iostream>`而不是`#include <stdio.h>`
- 使用`std::cout`和`<<`运算符进行输出，而不是`printf`函数
- 使用`std::endl`来换行并刷新输出缓冲区

## 命名空间（Namespace）

C++引入了命名空间的概念，用来解决命名冲突问题。标准库中的所有内容都被放置在`std`命名空间中。

```cpp
#include <iostream>

// 使用using namespace可以避免每次都写std::
using namespace std;

int main() {
    cout << "Hello, C++!" << endl;
    return 0;
}
```

你也可以只引入命名空间中的特定部分：

```cpp
#include <iostream>

// 只引入std命名空间中的cout和endl
using std::cout;
using std::endl;

int main() {
    cout << "Hello, C++!" << endl;
    return 0;
}
```

## 3. C++的数据类型

C++包含了C语言的所有基本数据类型，同时还添加了一些新的数据类型。

### 3.1 基本数据类型（与C相同）

```cpp
int a = 10;             // 整数
float b = 3.14f;        // 单精度浮点数
double c = 3.14159;     // 双精度浮点数
char d = 'A';           // 字符
bool e = true;          // 布尔值（在C99中也有，但C++98就已经支持）
```

### 3.2 C++的扩展类型

```cpp
// 字符串类型
#include <string>
std::string str = "Hello, C++!";

// 引用类型（类似于常量指针，但更安全、更易用）
int x = 10;
int& ref_x = x;  // ref_x是x的引用
ref_x = 20;      // 这会改变x的值

// void*指针的安全转换
void* ptr = &x;
int* int_ptr = static_cast<int*>(ptr);  // C++风格的类型转换
```

## 4. 输入输出

C++提供了更强大的输入输出系统，通过`iostream`库实现。

```cpp
#include <iostream>
#include <string>

int main() {
    int num;
    std::string name;
    
    std::cout << "请输入一个数字：";
    std::cin >> num;
    
    std::cout << "请输入您的名字：";
    std::cin >> name;
    
    std::cout << "您好，" << name << "！您输入的数字是：" << num << std::endl;
    
    return 0;
}
```

`cout`和`cin`支持连续的输入输出操作，这比C语言的`printf`和`scanf`更加灵活和直观。

## 5. 函数的改进

C++在函数方面也做了很多改进和扩展。

### 5.1 函数重载（Function Overloading）

C++允许定义多个同名函数，只要它们的参数类型或参数数量不同。这是C语言所不支持的。

```cpp
#include <iostream>

// 计算两个整数的和
int add(int a, int b) {
    return a + b;
}

// 计算两个浮点数的和
double add(double a, double b) {
    return a + b;
}

// 计算三个整数的和
int add(int a, int b, int c) {
    return a + b + c;
}

int main() {
    std::cout << add(1, 2) << std::endl;         // 调用第一个add函数
    std::cout << add(1.5, 2.5) << std::endl;     // 调用第二个add函数
    std::cout << add(1, 2, 3) << std::endl;      // 调用第三个add函数
    return 0;
}
```

### 5.2 带默认参数的函数

C++允许为函数参数设置默认值。

```cpp
#include <iostream>

// 设置b的默认值为10
int add(int a, int b = 10) {
    return a + b;
}

int main() {
    std::cout << add(5) << std::endl;     // 相当于add(5, 10)，输出15
    std::cout << add(5, 20) << std::endl; // 输出25
    return 0;
}
```

### 5.3 内联函数（Inline Functions）

内联函数可以减少函数调用的开销，对于一些简单的函数特别有用。

```cpp
#include <iostream>

// 内联函数定义
inline int max(int a, int b) {
    return a > b ? a : b;
}

int main() {
    std::cout << "最大值：" << max(10, 20) << std::endl;
    return 0;
}
```

## 6. 常量（Constants）

C++提供了更灵活的常量定义方式。

### 6.1 const修饰符

```cpp
const int MAX = 100;  // 常量定义
```

这与C语言类似，但C++中的const有更严格的类型检查。

### 6.2 常量表达式（constexpr，C++11引入）

```cpp
constexpr int MAX = 100;  // 在编译时计算的常量
constexpr int getValue() {
    return 42;
}
```

`constexpr`比`const`更严格，它要求表达式在编译时就能计算出结果。

## 7. C++风格的类型转换

C++提供了四种类型转换运算符，比C语言的类型转换更加安全和明确。

```cpp
// static_cast：用于基本类型之间的转换
int i = 10;
double d = static_cast<double>(i);

// dynamic_cast：主要用于多态类之间的转换（后面章节会详细介绍）

// const_cast：用于移除const修饰符
const int j = 20;
int* pj = const_cast<int*>(&j);

// reinterpret_cast：用于不相关类型之间的转换（使用需谨慎）
int k = 65;
char* pc = reinterpret_cast<char*>(&k);
```

## 8. auto类型推导（C++11引入）

C++11引入了`auto`关键字，可以让编译器自动推导变量的类型。

```cpp
auto x = 10;          // x的类型是int
auto y = 3.14;        // y的类型是double
auto z = "Hello";     // z的类型是const char*

// 特别适合用于复杂类型
std::vector<int> vec;
for (auto it = vec.begin(); it != vec.end(); ++it) {
    // it的类型是std::vector<int>::iterator
}
```

## 9. nullptr（C++11引入）

C++11引入了`nullptr`关键字，用来表示空指针，它比C语言的`NULL`更安全。

```cpp
int* p = nullptr;  // 正确的空指针初始化方式
// int* p = NULL;  // C风格的空指针初始化，在C++中不推荐使用
```

## 10. 练习与实践

### 10.1 基础练习

1. 编写一个C++程序，使用cout输出你的名字和年龄。
2. 实现一个函数重载的例子，包括至少三个同名但参数不同的函数。
3. 使用auto类型推导定义几个不同类型的变量。

### 10.2 进阶挑战

编写一个简单的计算器程序，能够进行加、减、乘、除运算。要求使用函数重载来处理不同类型的操作数（整数和浮点数）。

## 11. 小结

C++在C语言的基础上做了很多扩展和改进，本章我们学习了：

- 命名空间的概念和使用
- C++的输入输出系统
- 函数重载和默认参数
- const和constexpr常量
- C++风格的类型转换
- auto类型推导和nullptr

这些特性使得C++比C语言更加灵活、安全和强大。下一章，我们将学习C++的核心特性——面向对象编程。
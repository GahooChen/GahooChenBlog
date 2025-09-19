# C++数据类型增强：更丰富的数据表达

在上一节课中，我们学习了C++的基本结构和编译方式。在这节课中，我们将深入了解C++在数据类型方面的增强特性，看看C++是如何扩展和改进C语言的数据类型系统的。

## C++中的基本数据类型

C++保留了C语言的所有基本数据类型：

- 整型：`int`、`short`、`long`、`long long`
- 浮点型：`float`、`double`、`long double`
- 字符型：`char`
- 布尔型：C语言中的`_Bool`（在C99标准中引入）

## C++的数据类型增强

### 1. 布尔类型（bool）

C++引入了标准的布尔类型`bool`，它有两个值：`true`和`false`。这比C语言中的`_Bool`更加直观和易用。

```cpp
#include <iostream>

int main() {
    bool is_true = true;
    bool is_false = false;
    
    std::cout << "true = " << is_true << std::endl;  // 输出：true = 1
    std::cout << "false = " << is_false << std::endl;  // 输出：false = 0
    
    return 0;
}
```

### 2. const关键字的增强

虽然C语言也有`const`关键字，但C++对它进行了增强和扩展：

- 在C++中，`const`变量可以用作数组的大小，而在C语言中不能
- C++中的`const`可以用于修饰成员函数（后面的课程会详细介绍）
- C++引入了`const_cast`运算符来移除常量性

```cpp
#include <iostream>

int main() {
    const int MAX_SIZE = 10;  // 常量定义
    int arr[MAX_SIZE];  // 在C++中是合法的，但在C语言中可能不被支持
    
    return 0;
}
```

### 3. 引用（Reference）

引用是C++中一个非常重要的新概念，它是一个已存在变量的别名。引用一旦初始化，就不能再指向其他变量。

```cpp
#include <iostream>

int main() {
    int a = 10;
    int& ref_a = a;  // ref_a是a的引用
    
    std::cout << "a = " << a << std::endl;       // 输出：a = 10
    std::cout << "ref_a = " << ref_a << std::endl;  // 输出：ref_a = 10
    
    ref_a = 20;  // 修改引用，实际上是修改了原始变量
    std::cout << "After modification, a = " << a << std::endl;  // 输出：After modification, a = 20
    
    return 0;
}
```

### 4. 枚举类（Enum Class）

C++11引入了枚举类（也称为强类型枚举），它比传统的C风格枚举更加安全和灵活。

```cpp
#include <iostream>

// C风格枚举
enum Color {
    RED, GREEN, BLUE
};

// C++11枚举类
enum class Direction {
    UP, DOWN, LEFT, RIGHT
};

int main() {
    Color color = RED;
    Direction dir = Direction::UP;  // 必须使用作用域解析运算符
    
    // 下面的代码在C++中是不允许的，因为类型不匹配
    // dir = RED;  // 错误！
    
    std::cout << "color = " << color << std::endl;  // 输出：color = 0
    std::cout << "dir = " << static_cast<int>(dir) << std::endl;  // 需要显式转换为int
    
    return 0;
}
```

### 5. 类型转换运算符

C++提供了比C语言更安全的类型转换运算符：

- `static_cast`：用于基本的类型转换
- `dynamic_cast`：用于多态类型之间的转换
- `const_cast`：用于移除常量性
- `reinterpret_cast`：用于底层的类型重新解释

```cpp
#include <iostream>

int main() {
    double pi = 3.14159;
    int approx_pi = static_cast<int>(pi);  // 安全的类型转换
    
    std::cout << "pi = " << pi << std::endl;          // 输出：pi = 3.14159
    std::cout << "approx_pi = " << approx_pi << std::endl;  // 输出：approx_pi = 3
    
    return 0;
}
```

### 6. 类型推导（auto关键字）

C++11引入了`auto`关键字，它可以让编译器自动推导变量的类型，使代码更加简洁。

```cpp
#include <iostream>

int main() {
    auto a = 10;  // 编译器推导出a的类型是int
    auto b = 3.14;  // 编译器推导出b的类型是double
    auto c = "Hello";  // 编译器推导出c的类型是const char*
    
    std::cout << "a = " << a << std::endl;
    std::cout << "b = " << b << std::endl;
    std::cout << "c = " << c << std::endl;
    
    return 0;
}
```

## C++中的常量定义

在C++中，我们有多种方式来定义常量：

### 1. 使用const关键字

```cpp
const int MAX_COUNT = 100;
```

### 2. 使用#define预处理指令

这是从C语言继承的方式：

```cpp
#define MAX_COUNT 100
```

### 3. 使用enum枚举

```cpp
enum { MAX_COUNT = 100 };
```

### 4. 使用constexpr关键字（C++11）

`constexpr`关键字用于声明可以在编译时计算的常量表达式：

```cpp
constexpr int MAX_COUNT = 100;
constexpr int FACTORIAL_5 = 5 * 4 * 3 * 2 * 1;  // 编译时计算
```

## 练习时间

让我们来做一些练习，巩固一下这节课所学的知识：

1. 声明一个布尔变量，并尝试给它赋值为true和false
2. 使用引用修改一个变量的值
3. 定义一个枚举类表示一周的七天，并尝试使用它
4. 尝试使用auto关键字声明不同类型的变量
5. 比较const和constexpr的区别

## 小结

在这节课中，我们学习了C++在数据类型方面的增强特性：

- 标准布尔类型bool
- const关键字的增强
- 引用（Reference）的概念和使用
- 枚举类（Enum Class）的特性
- 更安全的类型转换运算符
- auto关键字的类型推导
- C++中的常量定义方式

这些特性使C++的数据类型系统比C语言更加丰富、安全和灵活。在下一节课中，我们将学习C++特有的输入输出系统！
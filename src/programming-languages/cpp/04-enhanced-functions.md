# 函数的增强：C++中的高级函数特性

在上一节课中，我们学习了C++特有的输入输出系统。在这节课中，我们将深入了解C++在函数方面的增强特性，看看C++是如何扩展和改进C语言的函数功能的。

## C++中函数的基本概念

C++保留了C语言的函数基本概念和语法，但增加了许多新的特性和功能。让我们先来回顾一下C语言中函数的基本结构：

```c
// C语言中的函数定义
return_type function_name(parameter_list) {
    // 函数体
    return return_value;
}
```

## C++中的函数增强

### 1. 函数重载（Function Overloading）

函数重载是C++中的一个重要特性，它允许你定义多个具有相同名称但参数列表不同的函数。编译器会根据实参的类型和数量来选择合适的函数。

```cpp
#include <iostream>

// 函数重载示例
int add(int a, int b) {
    return a + b;
}

double add(double a, double b) {
    return a + b;
}

int add(int a, int b, int c) {
    return a + b + c;
}

int main() {
    std::cout << "10 + 20 = " << add(10, 20) << std::endl;          // 调用第一个add函数
    std::cout << "3.14 + 2.71 = " << add(3.14, 2.71) << std::endl;  // 调用第二个add函数
    std::cout << "1 + 2 + 3 = " << add(1, 2, 3) << std::endl;       // 调用第三个add函数
    
    return 0;
}
```

### 2. 默认参数（Default Arguments）

C++允许你为函数参数指定默认值，当调用函数时如果没有提供该参数的值，就会使用默认值。

```cpp
#include <iostream>

// 带有默认参数的函数
void print_info(std::string name, int age = 18, std::string city = "Beijing") {
    std::cout << "Name: " << name << std::endl;
    std::cout << "Age: " << age << std::endl;
    std::cout << "City: " << city << std::endl;
    std::cout << "--------------------" << std::endl;
}

int main() {
    // 不使用默认参数
    print_info("Tom", 20, "Shanghai");
    
    // 使用一个默认参数
    print_info("Jerry", 22);
    
    // 使用所有默认参数
    print_info("Mike");
    
    return 0;
}
```

需要注意的是，默认参数必须从右向左连续设置，不能跳过中间的参数。

### 3. 内联函数（Inline Functions）

内联函数是一种特殊的函数，编译器会尝试将其内联展开，而不是通过函数调用的方式执行。这可以提高程序的执行效率，特别是对于一些简短的、频繁调用的函数。

```cpp
#include <iostream>

// 内联函数定义
inline int max(int a, int b) {
    return (a > b) ? a : b;
}

int main() {
    int x = 10, y = 20;
    int maximum = max(x, y);  // 编译器可能会将这行代码展开为：int maximum = (x > y) ? x : y;
    
    std::cout << "Maximum value is: " << maximum << std::endl;
    
    return 0;
}
```

### 4. 函数模板（Function Templates）

函数模板允许你编写适用于多种数据类型的通用函数。这是C++泛型编程的基础。

```cpp
#include <iostream>

// 函数模板定义
template <typename T>
T add(T a, T b) {
    return a + b;
}

int main() {
    // 使用int类型的add函数
    std::cout << "10 + 20 = " << add<int>(10, 20) << std::endl;
    
    // 使用double类型的add函数
    std::cout << "3.14 + 2.71 = " << add<double>(3.14, 2.71) << std::endl;
    
    // 编译器自动推导类型
    std::cout << "'a' + 'b' = " << add('a', 'b') << std::endl;
    
    return 0;
}
```

### 5. 引用参数（Reference Parameters）

C++允许你使用引用作为函数参数，这比使用指针更加直观和安全。

```cpp
#include <iostream>

// 使用引用参数的函数
void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 10, y = 20;
    
    std::cout << "Before swap: x = " << x << ", y = " << y << std::endl;
    swap(x, y);  // 传递变量的引用
    std::cout << "After swap: x = " << x << ", y = " << y << std::endl;
    
    return 0;
}
```

### 6. 函数指针（Function Pointers）

虽然C语言也支持函数指针，但C++对其进行了增强，特别是与引用和模板结合使用时。

```cpp
#include <iostream>

// 函数定义
int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }
int multiply(int a, int b) { return a * b; }
int divide(int a, int b) { return (b != 0) ? (a / b) : 0; }

int main() {
    // 定义函数指针
    int (*operation)(int, int);
    
    // 使用加法函数
    operation = add;
    std::cout << "10 + 5 = " << operation(10, 5) << std::endl;
    
    // 使用减法函数
    operation = subtract;
    std::cout << "10 - 5 = " << operation(10, 5) << std::endl;
    
    // 使用乘法函数
    operation = multiply;
    std::cout << "10 * 5 = " << operation(10, 5) << std::endl;
    
    // 使用除法函数
    operation = divide;
    std::cout << "10 / 5 = " << operation(10, 5) << std::endl;
    
    return 0;
}
```

## C++函数与C函数的互操作性

C++是C语言的超集，因此C++程序可以调用C函数，反之亦然。但需要注意一些互操作性问题：

```cpp
// C++代码调用C函数
#ifdef __cplusplus
extern "C" {
#endif

void c_function();  // 声明C函数

#ifdef __cplusplus
}
#endif

int main() {
    c_function();  // 调用C函数
    return 0;
}
```

## 练习时间

让我们来做一些练习，巩固一下这节课所学的知识：

1. 编写一个重载函数`calculate`，它可以接收两个整数或两个浮点数，并返回它们的和、差、积、商
2. 编写一个带有默认参数的函数，用于打印个人信息
3. 编写一个内联函数，用于计算两个数的最小值
4. 编写一个函数模板，用于交换两个变量的值
5. 编写一个使用函数指针的简单计算器程序

## 小结

在这节课中，我们学习了C++在函数方面的增强特性：

- 函数重载：允许定义多个名称相同但参数列表不同的函数
- 默认参数：可以为函数参数指定默认值
- 内联函数：可以提高程序的执行效率
- 函数模板：支持泛型编程
- 引用参数：比指针更加直观和安全
- 函数指针：支持函数作为参数传递
- C++与C函数的互操作性

这些特性使C++的函数系统比C语言更加灵活、强大和易于使用。在下一节课中，我们将开始学习C++的核心特性——面向对象编程！
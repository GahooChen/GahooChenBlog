# C++的输入输出：与程序对话的桥梁

在上一节课中，我们学习了C++的数据类型增强特性。在这节课中，我们将深入了解C++特有的输入输出系统，看看C++是如何让程序与用户进行交互的。

## C++的I/O流

C++使用流（stream）的概念来处理输入输出。流是一种抽象，它代表了数据的流动。C++的I/O系统包含在`iostream`库中，主要提供了以下对象：

- `std::cout`：标准输出流，用于将数据输出到屏幕
- `std::cin`：标准输入流，用于从键盘读取数据
- `std::cerr`：标准错误流，用于输出错误信息
- `std::clog`：标准日志流，用于输出日志信息

## 使用std::cout进行输出

`std::cout`是C++中最常用的输出工具，它与流插入运算符`<<`一起使用。

```cpp
#include <iostream>

int main() {
    // 输出基本数据类型
    int age = 10;
    double height = 1.45;
    char grade = 'A';
    bool is_student = true;
    
    std::cout << "Hello, C++!" << std::endl;
    std::cout << "Age: " << age << std::endl;
    std::cout << "Height: " << height << " meters" << std::endl;
    std::cout << "Grade: " << grade << std::endl;
    std::cout << "Is student: " << (is_student ? "Yes" : "No") << std::endl;
    
    // 连续输出多个值
    std::cout << "Name: " << "Tom" << ", Age: " << age << ", Class: " << "5th" << std::endl;
    
    return 0;
}
```

## 使用std::cin进行输入

`std::cin`是C++中最常用的输入工具，它与流提取运算符`>>`一起使用。

```cpp
#include <iostream>
#include <string>

int main() {
    int age;
    double height;
    std::string name;
    
    std::cout << "Please enter your name: ";
    std::cin >> name;
    
    std::cout << "Please enter your age: ";
    std::cin >> age;
    
    std::cout << "Please enter your height (in meters): ";
    std::cin >> height;
    
    std::cout << "\nYour information:" << std::endl;
    std::cout << "Name: " << name << std::endl;
    std::cout << "Age: " << age << std::endl;
    std::cout << "Height: " << height << " meters" << std::endl;
    
    return 0;
}
```

## C++ I/O的格式化

C++提供了丰富的格式化选项，可以控制输出的格式。

### 1. 输出宽度和填充

```cpp
#include <iostream>
#include <iomanip>  // 用于setw等格式化函数

int main() {
    std::cout << "Default: " << 42 << std::endl;
    std::cout << "Width 10: " << std::setw(10) << 42 << std::endl;
    std::cout << "Width 10 with leading zeros: " << std::setw(10) << std::setfill('0') << 42 << std::endl;
    
    // 恢复默认设置
    std::cout << std::setfill(' ') << std::endl;
    
    return 0;
}
```

### 2. 浮点数精度

```cpp
#include <iostream>
#include <iomanip>

int main() {
    double pi = 3.141592653589793;
    
    std::cout << "Default precision: " << pi << std::endl;
    std::cout << "Precision 3: " << std::setprecision(3) << pi << std::endl;
    std::cout << "Precision 10: " << std::setprecision(10) << pi << std::endl;
    
    // 固定小数点表示法
    std::cout << "Fixed with precision 5: " << std::fixed << std::setprecision(5) << pi << std::endl;
    
    // 科学记数法
    std::cout << "Scientific with precision 5: " << std::scientific << std::setprecision(5) << pi << std::endl;
    
    return 0;
}
```

### 3. 进制转换

```cpp
#include <iostream>

int main() {
    int number = 42;
    
    std::cout << "Decimal: " << number << std::endl;  // 十进制
    std::cout << "Octal: " << std::oct << number << std::endl;  // 八进制
    std::cout << "Hexadecimal: " << std::hex << number << std::endl;  // 十六进制
    
    // 显示前缀
    std::cout << "Hex with prefix: " << std::showbase << std::hex << number << std::endl;
    
    // 大写十六进制
    std::cout << "Hex with uppercase: " << std::uppercase << std::hex << number << std::endl;
    
    // 恢复默认设置
    std::cout << std::dec << std::noshowbase << std::nouppercase << std::endl;
    
    return 0;
}
```

## C++与C语言I/O的比较

C++的I/O系统与C语言的`printf`和`scanf`相比，有以下优势：

### 1. 类型安全

C++的I/O系统是类型安全的，编译器会检查数据类型是否匹配。而在C语言中，使用`printf`和`scanf`时，需要手动指定格式说明符，如果格式说明符与实际数据类型不匹配，可能会导致错误。

```cpp
// C++（类型安全）
int num = 42;
std::cout << num;  // 编译器知道num是int类型

// C语言（需要手动指定格式说明符）
int num = 42;
printf("%d", num);  // 必须使用%d来表示整数
```

### 2. 可扩展性

C++的I/O系统可以扩展，你可以为自定义类型重载`<<`和`>>`运算符。而C语言的`printf`和`scanf`不能直接处理自定义类型。

### 3. 使用简便

C++的I/O系统使用起来更加简便，不需要记住各种格式说明符。

### 4. 错误处理

C++的I/O系统有更好的错误处理机制。

## 混合使用C和C++的I/O

在C++程序中，你也可以混合使用C语言的`printf`和`scanf`，但需要注意一些问题：

```cpp
#include <iostream>
#include <cstdio>  // 用于C风格I/O

int main() {
    int age;
    
    // C++风格输出和C风格输入
    std::cout << "Please enter your age: ";
    scanf("%d", &age);
    
    // C风格输出和C++风格输入
    printf("Please enter another number: ");
    std::cin >> age;
    
    return 0;
}
```

需要注意的是，混合使用两种I/O系统可能会导致缓冲区问题，因为它们使用不同的缓冲区。

## 练习时间

让我们来做一些练习，巩固一下这节课所学的知识：

1. 编写一个程序，要求用户输入姓名、年龄和身高，然后以格式化的方式输出这些信息
2. 尝试使用不同的格式化选项，如设置宽度、精度、进制等
3. 编写一个程序，读取两个整数，计算它们的和、差、积、商，并输出结果
4. 比较C++的`cout`/`cin`和C语言的`printf`/`scanf`的使用方式

## 小结

在这节课中，我们学习了C++特有的输入输出系统：

- C++的I/O流概念
- 使用`std::cout`进行输出
- 使用`std::cin`进行输入
- C++ I/O的格式化选项
- C++与C语言I/O的比较
- 混合使用C和C++的I/O

C++的I/O系统比C语言的`printf`和`scanf`更加灵活、安全和易于扩展。在下一节课中，我们将学习C++中函数的增强特性！
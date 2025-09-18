# C++异常处理

异常处理是C++提供的一种处理程序运行时错误的机制，它允许程序在遇到错误时跳转到专门的错误处理代码。与传统的错误代码返回机制相比，异常处理可以更清晰地分离正常代码和错误处理代码，使程序结构更加清晰。

## 异常处理的基本语法

异常处理主要由三个关键字组成：`try`、`catch`和`throw`。

```cpp
#include <iostream>
#include <string>

// 除法函数，如果除数为0则抛出异常
double divide(double a, double b) {
    if (b == 0) {
        throw std::string("除数不能为零！");  // 抛出异常
    }
    return a / b;
}

int main() {
    double x, y;
    std::cout << "请输入两个数：";
    std::cin >> x >> y;
    
    try {  // 尝试执行可能抛出异常的代码
        double result = divide(x, y);
        std::cout << "结果：" << result << std::endl;
    } catch (const std::string& error) {  // 捕获并处理异常
        std::cerr << "错误：" << error << std::endl;
    } catch (...) {  // 捕获所有其他类型的异常
        std::cerr << "发生了未知错误！" << std::endl;
    }
    
    std::cout << "程序继续执行..." << std::endl;
    return 0;
}
```

在上面的例子中：
- `try`块包含可能抛出异常的代码
- 当`divide`函数检测到除数为0时，使用`throw`关键字抛出一个异常
- `catch`块捕获并处理异常
- 最后的`catch (...)`是一个通用的异常处理器，可以捕获任何类型的异常
- 如果没有异常抛出，程序会跳过`catch`块继续执行

## C++标准异常

C++标准库提供了一系列的异常类，它们都继承自`std::exception`基类。这些异常类可以用于表示各种常见的错误情况。

| 异常类 | 描述 |
|-------|------|
| `std::exception` | 所有标准异常的基类 |
| `std::bad_alloc` | 内存分配失败时抛出 |
| `std::bad_cast` | 类型转换失败时抛出 |
| `std::bad_typeid` | 使用`typeid`运算符获取不存在的类型信息时抛出 |
| `std::bad_function_call` | 调用不可调用的函数对象时抛出 |
| `std::range_error` | 范围错误，如数值计算溢出 |
| `std::overflow_error` | 算术溢出错误 |
| `std::underflow_error` | 算术下溢错误 |
| `std::logic_error` | 逻辑错误，如参数无效 |
| `std::domain_error` | 定义域错误 |
| `std::invalid_argument` | 无效参数错误 |
| `std::length_error` | 长度错误，如尝试创建过长的容器 |
| `std::out_of_range` | 越界访问错误 |

下面是一个使用标准异常的例子：

```cpp
#include <iostream>
#include <vector>
#include <stdexcept>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    
    try {
        // 尝试访问越界的元素
        std::cout << "numbers[10] = " << numbers.at(10) << std::endl;
    } catch (const std::out_of_range& e) {
        // 捕获并处理out_of_range异常
        std::cerr << "越界错误：" << e.what() << std::endl;
    } catch (const std::exception& e) {
        // 捕获其他标准异常
        std::cerr << "标准异常：" << e.what() << std::endl;
    } catch (...) {
        // 捕获所有其他异常
        std::cerr << "未知错误！" << std::endl;
    }
    
    return 0;
}
```

## 3. 自定义异常类

我们可以定义自己的异常类，通常继承自`std::exception`或其子类。自定义异常类应该提供一个`what()`方法，用于返回异常的描述信息。

```cpp
#include <iostream>
#include <string>
#include <stdexcept>

// 自定义异常类，继承自std::runtime_error
class DivideByZeroException : public std::runtime_error {
public:
    // 构造函数，调用父类构造函数
    DivideByZeroException() : std::runtime_error("除数不能为零！") {
    }
};

// 自定义范围异常类
class OutOfRangeException : public std::out_of_range {
public:
    OutOfRangeException(const std::string& message) : std::out_of_range(message) {
    }
};

// 除法函数
double divide(double a, double b) {
    if (b == 0) {
        throw DivideByZeroException();  // 抛出自定义异常
    }
    return a / b;
}

// 访问数组元素的函数
double accessArray(const double arr[], int size, int index) {
    if (index < 0 || index >= size) {
        throw OutOfRangeException("数组索引越界！");
    }
    return arr[index];
}

int main() {
    try {
        // 测试除零异常
        // double result = divide(10.0, 0.0);
        
        // 测试数组越界异常
        double numbers[] = {1.1, 2.2, 3.3, 4.4, 5.5};
        double value = accessArray(numbers, 5, 10);  // 索引越界
        std::cout << "值：" << value << std::endl;
    } catch (const DivideByZeroException& e) {
        std::cerr << "除零错误：" << e.what() << std::endl;
    } catch (const OutOfRangeException& e) {
        std::cerr << "范围错误：" << e.what() << std::endl;
    } catch (const std::exception& e) {
        std::cerr << "标准异常：" << e.what() << std::endl;
    }
    
    return 0;
}
```

## 4. 异常处理的最佳实践

使用异常处理时，应遵循以下最佳实践：

### 4.1 只在异常情况下使用异常

异常应该用于处理真正异常的情况，而不是用于正常的程序流程控制。例如，文件不存在、网络连接失败等是异常情况，但用户输入错误不是异常情况，应该使用条件语句处理。

### 4.2 抛出适当类型的异常

抛出的异常类型应该尽可能具体，以便调用者可以根据异常类型采取不同的处理方式。

```cpp
// 不好的做法：抛出过于通用的异常
try {
    // ...
    if (errorCondition1) throw std::exception("错误");
    if (errorCondition2) throw std::exception("另一个错误");
} catch (const std::exception& e) {
    // 无法区分不同类型的错误
}

// 好的做法：抛出具体的异常类型
try {
    // ...
    if (errorCondition1) throw FileNotFoundException("文件未找到");
    if (errorCondition2) throw PermissionDeniedException("权限被拒绝");
} catch (const FileNotFoundException& e) {
    // 处理文件未找到的情况
} catch (const PermissionDeniedException& e) {
    // 处理权限被拒绝的情况
}
```

### 4.3 捕获异常时注意顺序

捕获异常时，应该按照从最具体到最通用的顺序排列`catch`块，否则具体的异常将永远不会被捕获。

```cpp
// 不好的做法：通用异常先于具体异常
try {
    // ...
} catch (const std::exception& e) {
    // 这个catch块会捕获所有标准异常，下面的具体catch块永远不会执行
} catch (const std::runtime_error& e) {
    // 永远不会执行
}

// 好的做法：具体异常先于通用异常
try {
    // ...
} catch (const std::runtime_error& e) {
    // 处理runtime_error异常
} catch (const std::exception& e) {
    // 处理其他标准异常
}
```

### 4.4 在析构函数中不抛出异常

析构函数中抛出异常可能导致程序崩溃，因为析构函数通常在异常处理过程中被调用。如果析构函数抛出异常，可能会导致两个异常同时存在，这在C++中是不允许的。

```cpp
class Resource {
public:
    ~Resource() {
        // 不好的做法：在析构函数中抛出异常
        // throw std::runtime_error("析构函数中的异常");
        
        // 好的做法：捕获并处理所有异常
        try {
            // 清理资源的代码
        } catch (...) {
            // 记录错误但不重新抛出
        }
    }
};
```

### 4.5 使用RAII管理资源

RAII（Resource Acquisition Is Initialization）是一种C++编程技术，它使用对象的生命周期来管理资源。在RAII模式中，资源在对象构造时获取，在对象析构时释放。这种方式可以确保即使发生异常，资源也能被正确释放。

```cpp
#include <iostream>
#include <memory>
#include <stdexcept>

void processFile(const std::string& filename) {
    // 使用智能指针（RAII）管理文件资源
    std::unique_ptr<FILE, decltype(&fclose)> file(fopen(filename.c_str(), "r"), &fclose);
    
    if (!file) {
        throw std::runtime_error("无法打开文件：" + filename);
    }
    
    // 文件处理代码...
    // 即使发生异常，file的析构函数也会调用fclose关闭文件
}

int main() {
    try {
        processFile("nonexistent.txt");
    } catch (const std::exception& e) {
        std::cerr << "错误：" << e.what() << std::endl;
    }
    
    return 0;
}
```

## 5. 练习与实践

### 5.1 基础练习

1. 实现一个简单的计算器，支持加、减、乘、除四种运算，并使用异常处理处理除零错误和无效输入。

```cpp
#include <iostream>
#include <string>
#include <stdexcept>

// 自定义异常类
class DivisionByZeroException : public std::runtime_error {
public:
    DivisionByZeroException() : std::runtime_error("除零错误！") {}
};

class InvalidInputException : public std::runtime_error {
public:
    InvalidInputException(const std::string& message) : std::runtime_error(message) {}
};

// 计算器类
class Calculator {
public:
    double calculate(double a, double b, char op) {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': 
                if (b == 0) {
                    throw DivisionByZeroException();
                }
                return a / b;
            default:
                throw InvalidInputException("无效的运算符：" + std::string(1, op));
        }
    }
};

int main() {
    Calculator calc;
    double a, b;
    char op;
    
    try {
        std::cout << "请输入表达式（格式：操作数1 运算符 操作数2）：";
        std::cin >> a >> op >> b;
        
        double result = calc.calculate(a, b, op);
        std::cout << "结果：" << a << " " << op << " " << b << " = " << result << std::endl;
    } catch (const DivisionByZeroException& e) {
        std::cerr << "除零错误：" << e.what() << std::endl;
    } catch (const InvalidInputException& e) {
        std::cerr << "输入错误：" << e.what() << std::endl;
    } catch (const std::exception& e) {
        std::cerr << "错误：" << e.what() << std::endl;
    }
    
    return 0;
}
```

2. 实现一个简单的数组类，使用异常处理处理越界访问。

### 5.2 进阶挑战

1. 实现一个自定义的异常层次结构，用于处理不同类型的文件操作错误（如文件不存在、权限被拒绝、磁盘空间不足等）。

2. 实现一个简单的银行账户管理系统，使用异常处理处理各种错误情况（如余额不足、无效的账户号码等）。

## 6. 小结

异常处理是C++提供的一种强大的错误处理机制，它可以帮助我们编写更加健壮和可维护的代码。本章我们学习了：

- 异常处理的基本语法（try、catch、throw）
- C++标准异常类的使用
- 如何定义和使用自定义异常类
- 异常处理的最佳实践
- RAII技术在异常处理中的应用

合理地使用异常处理可以使我们的程序更加健壮，错误处理更加清晰，但也应该避免过度使用异常或将其用于正常的程序流程控制。
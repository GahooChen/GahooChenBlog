# C++异常处理：优雅地应对错误

在前面的课程中，我们学习了C++标准库中的算法。在这节课中，我们将探讨C++的异常处理机制，这是C++提供的一种处理运行时错误的结构化方式，可以使我们的程序更加健壮和可靠。

## 异常处理概述

在C语言中，我们通常使用错误码来表示函数执行的结果，然后在调用函数后检查这些错误码。这种方式有一些缺点：

1. 错误处理代码与正常逻辑代码混合在一起，使代码变得复杂和难以阅读
2. 容易忘记检查错误码
3. 无法在深层次嵌套的函数调用中方便地传递错误信息

C++的异常处理机制提供了一种更加结构化和灵活的方式来处理错误。异常处理主要包含三个关键字：`try`、`catch`和`throw`。

## 异常的抛出和捕获

### 抛出异常

当我们检测到错误时，可以使用`throw`关键字抛出一个异常。异常可以是任何类型的对象，通常我们会使用标准库中定义的异常类型或者自定义的异常类型。

```cpp
#include <iostream>
#include <string>

int divide(int a, int b) {
    if (b == 0) {
        throw std::string("Division by zero");  // 抛出一个字符串类型的异常
    }
    return a / b;
}

int main() {
    try {
        int result = divide(10, 0);
        std::cout << "Result: " << result << std::endl;
    } catch (std::string& error) {
        std::cout << "Caught an exception: " << error << std::endl;
    }
    
    std::cout << "Program continues after exception" << std::endl;
    return 0;
}
```

在上面的例子中，当除数为0时，我们抛出一个字符串类型的异常。`throw`语句会立即终止当前函数的执行，并将控制权转移到最近的能够捕获该类型异常的`catch`块。

### 捕获异常

要捕获异常，我们需要使用`try`块来包围可能抛出异常的代码，然后使用一个或多个`catch`块来处理可能抛出的异常。

```cpp
#include <iostream>
#include <string>

int main() {
    try {
        // 可能抛出异常的代码
        int age;
        std::cout << "Enter your age: ";
        std::cin >> age;
        
        if (age < 0) {
            throw std::string("Age cannot be negative");
        } else if (age > 150) {
            throw std::string("Age is too large");
        }
        
        std::cout << "You are " << age << " years old" << std::endl;
    } catch (std::string& error) {
        // 处理异常的代码
        std::cout << "Error: " << error << std::endl;
    }
    
    return 0;
}
```

在上面的例子中，我们使用一个`try`块包围了可能抛出异常的代码，然后使用一个`catch`块来捕获并处理字符串类型的异常。

## 多个catch块

我们可以使用多个`catch`块来处理不同类型的异常。当抛出异常时，会按顺序检查每个`catch`块的参数类型，找到第一个能够匹配异常类型的`catch`块来处理异常。

```cpp
#include <iostream>
#include <string>

void process_data(int data) {
    if (data < 0) {
        throw -1;  // 抛出一个整数类型的异常
    } else if (data > 100) {
        throw std::string("Data is too large");  // 抛出一个字符串类型的异常
    } else if (data % 2 == 0) {
        throw 3.14;  // 抛出一个浮点数类型的异常
    }
    std::cout << "Processing data: " << data << std::endl;
}

int main() {
    try {
        process_data(42);  // 这会抛出一个浮点数类型的异常
    } catch (int error_code) {
        std::cout << "Caught an integer exception: " << error_code << std::endl;
    } catch (std::string& error_message) {
        std::cout << "Caught a string exception: " << error_message << std::endl;
    } catch (double value) {
        std::cout << "Caught a double exception: " << value << std::endl;
    } catch (...) {
        // 捕获任何其他类型的异常
        std::cout << "Caught an unknown exception" << std::endl;
    }
    
    return 0;
}
```

在上面的例子中，我们定义了三个不同类型的`catch`块，分别用于处理整数、字符串和浮点数类型的异常。最后，我们使用一个`catch (...)`块来捕获任何其他类型的异常。注意，`catch (...)`块必须放在所有`catch`块的最后。

## 标准异常

C++标准库定义了一系列的异常类，它们都继承自`std::exception`基类。这些异常类定义在`<stdexcept>`、`<exception>`、`<new>`和`<typeinfo>`等头文件中。

### 标准异常层次结构

C++标准异常的层次结构如下：

- `std::exception`：所有标准异常的基类
  - `std::bad_alloc`：在内存分配失败时抛出
  - `std::bad_cast`：在执行dynamic_cast失败时抛出
  - `std::bad_typeid`：在使用typeid操作符时抛出
  - `std::logic_error`：表示程序逻辑错误
    - `std::domain_error`：表示参数的值不在预期的范围内
    - `std::invalid_argument`：表示参数无效
    - `std::length_error`：表示尝试创建一个超出最大允许大小的对象
    - `std::out_of_range`：表示尝试访问超出有效范围的元素
  - `std::runtime_error`：表示运行时错误
    - `std::overflow_error`：表示算术溢出错误
    - `std::range_error`：表示计算结果不在有效范围内
    - `std::underflow_error`：表示算术下溢错误

### 使用标准异常

下面是一个使用标准异常的例子：

```cpp
#include <iostream>
#include <stdexcept>
#include <vector>

int main() {
    try {
        std::vector<int> numbers(5);
        
        // 尝试访问超出vector范围的元素
        std::cout << "Accessing element at index 10: " << numbers.at(10) << std::endl;
    } catch (const std::out_of_range& e) {
        std::cout << "Caught an out_of_range exception: " << e.what() << std::endl;
    } catch (const std::exception& e) {
        // 捕获任何其他标准异常
        std::cout << "Caught a standard exception: " << e.what() << std::endl;
    } catch (...) {
        // 捕获任何非标准异常
        std::cout << "Caught an unknown exception" << std::endl;
    }
    
    return 0;
}
```

在上面的例子中，我们使用`std::vector::at()`方法来访问vector中的元素，当索引超出范围时，该方法会抛出一个`std::out_of_range`类型的异常。我们使用一个`catch`块来捕获并处理这种类型的异常，然后使用另一个`catch`块来捕获任何其他类型的标准异常。

注意，我们在`catch`块的参数中使用了`const`引用，这是一种良好的实践，因为它可以避免不必要的对象复制，同时也可以防止我们意外地修改异常对象。

## 自定义异常

除了使用标准异常外，我们还可以定义自己的异常类。通常，我们会从`std::exception`基类或其派生类继承来自定义异常类。

```cpp
#include <iostream>
#include <stdexcept>
#include <string>

// 自定义异常类，继承自std::runtime_error
class InsufficientFundsException : public std::runtime_error {
public:
    // 构造函数，调用基类的构造函数
    InsufficientFundsException(double amount) 
        : std::runtime_error("Insufficient funds"), m_amount(amount) {}
    
    // 获取缺少的金额
    double getAmount() const { return m_amount; }
    
private:
    double m_amount;  // 缺少的金额
};

// 简单的银行账户类
class BankAccount {
public:
    BankAccount(double initial_balance = 0.0) : m_balance(initial_balance) {}
    
    // 存款
    void deposit(double amount) {
        if (amount < 0) {
            throw std::invalid_argument("Deposit amount cannot be negative");
        }
        m_balance += amount;
    }
    
    // 取款
    void withdraw(double amount) {
        if (amount < 0) {
            throw std::invalid_argument("Withdrawal amount cannot be negative");
        }
        if (amount > m_balance) {
            throw InsufficientFundsException(amount - m_balance);
        }
        m_balance -= amount;
    }
    
    // 获取余额
    double getBalance() const { return m_balance; }
    
private:
    double m_balance;  // 账户余额
};

int main() {
    try {
        BankAccount account(1000.0);
        std::cout << "Initial balance: $" << account.getBalance() << std::endl;
        
        account.deposit(500.0);
        std::cout << "After deposit: $" << account.getBalance() << std::endl;
        
        account.withdraw(2000.0);  // 这会抛出一个InsufficientFundsException异常
        std::cout << "After withdrawal: $" << account.getBalance() << std::endl;
    } catch (const InsufficientFundsException& e) {
        std::cout << "Error: " << e.what() << std::endl;
        std::cout << "You are short by $" << e.getAmount() << std::endl;
    } catch (const std::invalid_argument& e) {
        std::cout << "Invalid argument: " << e.what() << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Standard exception: " << e.what() << std::endl;
    } catch (...) {
        std::cout << "Unknown exception" << std::endl;
    }
    
    return 0;
}
```

在上面的例子中，我们定义了一个名为`InsufficientFundsException`的自定义异常类，它继承自`std::runtime_error`。我们还定义了一个`BankAccount`类，它在取款金额大于账户余额时会抛出一个`InsufficientFundsException`异常。

## 异常规范

在C++11之前，我们可以使用异常规范来指定一个函数可能抛出的异常类型。异常规范使用`throw`关键字和一个类型列表来表示。

```cpp
// 这个函数可能抛出int或std::string类型的异常
void might_throw() throw(int, std::string);

// 这个函数不会抛出任何异常
void will_not_throw() throw();
```

然而，C++11引入了一种新的方式来指定函数是否抛出异常，使用`noexcept`说明符。

```cpp
// 这个函数可能抛出任何类型的异常（默认）
void might_throw();

// 这个函数不会抛出任何异常
void will_not_throw() noexcept;

// 这个函数是否抛出异常取决于表达式的值
void conditional_noexcept() noexcept(condition);
```

`noexcept`说明符比旧的异常规范更加高效，因为编译器可以基于它进行一些优化。此外，`noexcept`还可以用作运算符，用于检查一个表达式是否声明为不抛出异常。

```cpp
#include <iostream>
#include <vector>

void f() { throw 42; }
void g() noexcept { /* 不抛出异常 */ }

int main() {
    std::cout << "f() noexcept? " << noexcept(f()) << std::endl;
    std::cout << "g() noexcept? " << noexcept(g()) << std::endl;
    std::cout << "std::vector<int>().empty() noexcept? " << noexcept(std::vector<int>().empty()) << std::endl;
    
    return 0;
}
```

## 异常处理的最佳实践

使用异常处理时，我们应该遵循一些最佳实践：

1. **只在特殊情况下使用异常**：异常应该用于处理异常情况，而不是用于正常的程序流程控制
2. **使用适当的异常类型**：使用标准异常类型或者从标准异常类继承来自定义异常类型
3. **在`catch`块的参数中使用`const`引用**：这可以避免不必要的对象复制
4. **按照从最具体到最一般的顺序排列`catch`块**：这样可以确保每个异常都被正确的`catch`块捕获
5. **提供有用的错误信息**：在异常对象中包含足够的信息，以便于调试和错误处理
6. **释放资源**：在抛出异常前，确保所有已分配的资源都被正确释放（或者使用RAII机制，我们将在下一节课中学习）
7. **不要在析构函数中抛出异常**：这可能导致程序终止
8. **使用`noexcept`说明符**：对于不会抛出异常的函数，使用`noexcept`说明符可以帮助编译器进行优化

## 练习时间

让我们来做一些练习，巩固一下这节课所学的知识：

1. 实现一个简单的计算器类，处理除零错误和无效输入异常
2. 定义一个自定义异常类，用于表示文件操作错误
3. 编写一个函数，读取文件内容并在出现错误时抛出异常
4. 使用标准异常和自定义异常来改进之前实现的银行账户类
5. 实现一个模板函数，在参数不满足某些条件时抛出异常
6. 编写一个程序，使用异常处理来处理各种可能的错误情况

## 小结

在这节课中，我们学习了C++的异常处理机制，包括：

- 异常的抛出和捕获（使用`throw`、`try`和`catch`关键字）
- 多个`catch`块的使用
- 标准异常类及其层次结构
- 自定义异常类的定义和使用
- 异常规范（旧的`throw`规范和新的`noexcept`说明符）
- 异常处理的最佳实践

C++的异常处理机制提供了一种结构化和灵活的方式来处理运行时错误，可以使我们的程序更加健壮和可靠。在下一节课中，我们将学习C++的RAII机制，这是一种与异常处理密切相关的资源管理技术！
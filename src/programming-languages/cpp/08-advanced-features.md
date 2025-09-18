# C++高级特性

在掌握了C++的基础语法、面向对象编程以及模板和STL之后，本章我们将探讨C++的一些高级特性。这些特性可以帮助我们编写更加健壮、高效和现代的C++代码。

## 异常处理

异常处理是C++提供的一种处理程序运行时错误的机制，它允许程序在遇到错误时跳转到专门的错误处理代码。

### 异常处理的基本语法

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

### 自定义异常类

我们可以定义自己的异常类，通常继承自`std::exception`。

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

## 2. 智能指针

智能指针是C++11引入的一种管理动态内存的工具，它可以自动管理内存的分配和释放，避免内存泄漏。C++标准库提供了三种智能指针：`std::unique_ptr`、`std::shared_ptr`和`std::weak_ptr`。

### 2.1 std::unique_ptr

`std::unique_ptr`是一种独占所有权的智能指针，同一时间只能有一个`unique_ptr`指向一个对象。

```cpp
#include <iostream>
#include <memory>

class Resource {
public:
    Resource() { std::cout << "Resource创建" << std::endl; }
    ~Resource() { std::cout << "Resource销毁" << std::endl; }
    void use() { std::cout << "Resource被使用" << std::endl; }
};

int main() {
    // 创建一个unique_ptr，管理一个Resource对象
    std::unique_ptr<Resource> res1(new Resource());
    
    // 使用make_unique函数创建unique_ptr（C++14及以上）
    auto res2 = std::make_unique<Resource>();
    
    // 访问对象的成员函数
    res1->use();
    
    // unique_ptr不支持复制，但支持移动
    // std::unique_ptr<Resource> res3 = res1;  // 编译错误
    std::unique_ptr<Resource> res3 = std::move(res1);  // 移动语义，res1现在为空
    
    if (res1 == nullptr) {
        std::cout << "res1现在为空" << std::endl;
    }
    
    // 当unique_ptr离开作用域时，会自动调用析构函数释放资源
    return 0;
}
```

### 2.2 std::shared_ptr

`std::shared_ptr`是一种共享所有权的智能指针，多个`shared_ptr`可以指向同一个对象，当最后一个`shared_ptr`离开作用域时，对象才会被销毁。

```cpp
#include <iostream>
#include <memory>

class Resource {
public:
    Resource() { std::cout << "Resource创建" << std::endl; }
    ~Resource() { std::cout << "Resource销毁" << std::endl; }
    void use() { std::cout << "Resource被使用" << std::endl; }
};

int main() {
    // 创建一个shared_ptr
    std::shared_ptr<Resource> res1(new Resource());
    
    // 使用make_shared函数创建shared_ptr（更高效）
    auto res2 = std::make_shared<Resource>();
    
    // 复制shared_ptr，引用计数增加
    std::shared_ptr<Resource> res3 = res1;
    
    // 检查引用计数
    std::cout << "res1的引用计数：" << res1.use_count() << std::endl;  // 输出：2
    std::cout << "res3的引用计数：" << res3.use_count() << std::endl;  // 输出：2
    
    // 当shared_ptr离开作用域时，如果引用计数为0，才会释放资源
    return 0;
}
```

### 2.3 std::weak_ptr

`std::weak_ptr`是一种不增加引用计数的智能指针，它指向由`shared_ptr`管理的对象，主要用于解决`shared_ptr`可能导致的循环引用问题。

```cpp
#include <iostream>
#include <memory>

class B;  // 前向声明

class A {
public:
    std::weak_ptr<B> b_ptr;  // 使用weak_ptr避免循环引用
    
    A() { std::cout << "A创建" << std::endl; }
    ~A() { std::cout << "A销毁" << std::endl; }
};

class B {
public:
    std::shared_ptr<A> a_ptr;  // 使用shared_ptr
    
    B() { std::cout << "B创建" << std::endl; }
    ~B() { std::cout << "B销毁" << std::endl; }
};

int main() {
    {
        auto a = std::make_shared<A>();
        auto b = std::make_shared<B>();
        
        // 建立相互引用
        a->b_ptr = b;  // weak_ptr不增加引用计数
        b->a_ptr = a;  // shared_ptr增加引用计数
        
        // 检查引用计数
        std::cout << "a的引用计数：" << a.use_count() << std::endl;  // 输出：2
        std::cout << "b的引用计数：" << b.use_count() << std::endl;  // 输出：1
        
        // 从weak_ptr获取shared_ptr
        if (auto temp = a->b_ptr.lock()) {
            std::cout << "成功获取到B对象" << std::endl;
        }
    }
    
    // 离开作用域后，a和b都会被正确销毁
    std::cout << "离开作用域" << std::endl;
    
    return 0;
}
```

## 3. 右值引用与移动语义

C++11引入了右值引用（Rvalue Reference）和移动语义（Move Semantics），它们可以提高程序的性能，特别是在处理大型对象时。

### 3.1 左值和右值

- **左值（Lvalue）**：表达式结束后依然存在的持久对象
- **右值（Rvalue）**：表达式结束后就不再存在的临时对象

右值引用使用`&&`表示。

```cpp
#include <iostream>

// 函数接受左值引用
void processValue(int& value) {
    std::cout << "处理左值：" << value << std::endl;
}

// 函数接受右值引用
void processValue(int&& value) {
    std::cout << "处理右值：" << value << std::endl;
}

int main() {
    int a = 10;  // a是左值
    processValue(a);  // 调用左值引用版本
    processValue(20);  // 调用右值引用版本，20是右值
    processValue(a + 5);  // 调用右值引用版本，a+5的结果是右值
    
    // 使用std::move将左值转换为右值引用
    processValue(std::move(a));  // 调用右值引用版本
    
    return 0;
}
```

### 3.2 移动构造函数和移动赋值运算符

移动构造函数和移动赋值运算符允许我们将资源从一个对象转移到另一个对象，而不是复制资源，这在处理大型对象时可以提高性能。

```cpp
#include <iostream>
#include <string>

class MyString {
private:
    char* data;
    size_t size;
    
public:
    // 构造函数
    MyString(const char* str = "") {
        size = std::strlen(str);
        data = new char[size + 1];
        std::memcpy(data, str, size + 1);
        std::cout << "构造函数：" << data << std::endl;
    }
    
    // 拷贝构造函数
    MyString(const MyString& other) {
        size = other.size;
        data = new char[size + 1];
        std::memcpy(data, other.data, size + 1);
        std::cout << "拷贝构造函数：" << data << std::endl;
    }
    
    // 移动构造函数
    MyString(MyString&& other) noexcept : data(nullptr), size(0) {
        // 窃取资源
        data = other.data;
        size = other.size;
        
        // 将源对象置于有效但不确定的状态
        other.data = nullptr;
        other.size = 0;
        
        std::cout << "移动构造函数：" << data << std::endl;
    }
    
    // 拷贝赋值运算符
    MyString& operator=(const MyString& other) {
        if (this != &other) {
            // 释放当前资源
            delete[] data;
            
            // 分配新资源并复制
            size = other.size;
            data = new char[size + 1];
            std::memcpy(data, other.data, size + 1);
            
            std::cout << "拷贝赋值运算符：" << data << std::endl;
        }
        return *this;
    }
    
    // 移动赋值运算符
    MyString& operator=(MyString&& other) noexcept {
        if (this != &other) {
            // 释放当前资源
            delete[] data;
            
            // 窃取资源
            data = other.data;
            size = other.size;
            
            // 将源对象置于有效但不确定的状态
            other.data = nullptr;
            other.size = 0;
            
            std::cout << "移动赋值运算符：" << data << std::endl;
        }
        return *this;
    }
    
    // 析构函数
    ~MyString() {
        delete[] data;
        std::cout << "析构函数" << std::endl;
    }
    
    // 获取字符串内容
    const char* c_str() const {
        return data;
    }
};

int main() {
    MyString s1("Hello");  // 调用构造函数
    
    MyString s2 = s1;  // 调用拷贝构造函数
    
    MyString s3 = std::move(s1);  // 调用移动构造函数，s1现在为空
    
    MyString s4;
    s4 = s2;  // 调用拷贝赋值运算符
    
    MyString s5;
    s5 = std::move(s4);  // 调用移动赋值运算符，s4现在为空
    
    std::cout << "s2: " << s2.c_str() << std::endl;
    std::cout << "s3: " << s3.c_str() << std::endl;
    std::cout << "s5: " << s5.c_str() << std::endl;
    
    return 0;
}
```

## 4. Lambda表达式

Lambda表达式（也称为闭包）是C++11引入的一种匿名函数对象，它允许我们在代码中直接定义函数，而不需要单独声明函数。

### 4.1 Lambda表达式的基本语法

Lambda表达式的基本语法如下：
```cpp
[capture](parameters) -> return_type { body }
```

其中：
- `capture`：捕获列表，指定如何访问外部变量
- `parameters`：参数列表，与普通函数的参数列表类似
- `return_type`：返回类型，可以省略，让编译器自动推导
- `body`：函数体

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    // 基本的lambda表达式
    auto add = [](int a, int b) -> int { return a + b; };
    std::cout << "10 + 20 = " << add(10, 20) << std::endl;
    
    // 编译器可以自动推导返回类型
    auto multiply = [](int a, int b) { return a * b; };
    std::cout << "10 * 20 = " << multiply(10, 20) << std::endl;
    
    // 捕获外部变量
    int x = 100;
    auto printX = []() { std::cout << "x = " << x << std::endl; };  // 错误：无法访问x
    
    // 值捕获
    auto printXValue = [x]() { std::cout << "值捕获 x = " << x << std::endl; };
    
    // 引用捕获
    auto printXRef = [&x]() { std::cout << "引用捕获 x = " << x << std::endl; };
    
    // 修改x
    x = 200;
    
    printXValue();  // 输出：值捕获 x = 100（捕获的是x的副本）
    printXRef();    // 输出：引用捕获 x = 200（捕获的是x的引用）
    
    // 捕获所有外部变量（值捕获）
    auto captureAllValue = [=]() {
        std::cout << "捕获所有外部变量（值） x = " << x << std::endl;
    };
    
    // 捕获所有外部变量（引用捕获）
    auto captureAllRef = [&]() {
        std::cout << "捕获所有外部变量（引用） x = " << x << std::endl;
        // 可以修改x
        x = 300;
    };
    
    captureAllValue();  // 输出：捕获所有外部变量（值） x = 200
    captureAllRef();    // 输出：捕获所有外部变量（引用） x = 200，然后x变为300
    
    std::cout << "最终x = " << x << std::endl;  // 输出：最终x = 300
    
    return 0;
}
```

### 4.2 Lambda表达式在STL中的应用

Lambda表达式在STL算法中特别有用，可以作为谓词（predicate）或函数对象使用。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

int main() {
    std::vector<int> numbers = {5, 2, 8, 1, 9, 3, 7, 4, 6};
    
    // 使用lambda表达式排序
    std::sort(numbers.begin(), numbers.end(), 
              [](int a, int b) { return a > b; });  // 降序排序
    
    std::cout << "降序排序后：";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;  // 输出：9 8 7 6 5 4 3 2 1
    
    // 使用lambda表达式查找
    auto it = std::find_if(numbers.begin(), numbers.end(),
                         [](int n) { return n % 2 == 0; });  // 查找偶数
    
    if (it != numbers.end()) {
        std::cout << "第一个偶数：" << *it << std::endl;  // 输出：8
    }
    
    // 使用lambda表达式计数
    int count = std::count_if(numbers.begin(), numbers.end(),
                            [](int n) { return n > 5; });  // 计数大于5的元素
    
    std::cout << "大于5的元素个数：" << count << std::endl;  // 输出：4
    
    // 使用lambda表达式转换
    std::vector<int> squares(numbers.size());
    std::transform(numbers.begin(), numbers.end(), squares.begin(),
                  [](int n) { return n * n; });  // 计算每个元素的平方
    
    std::cout << "每个元素的平方：";
    for (int square : squares) {
        std::cout << square << " ";
    }
    std::cout << std::endl;
    
    // 使用lambda表达式求和
    int sum = std::accumulate(numbers.begin(), numbers.end(), 0,
                            [](int total, int n) { return total + n; });
    
    std::cout << "元素总和：" << sum << std::endl;  // 输出：45
    
    return 0;
}
```

## 5. 练习与实践

### 5.1 基础练习

1. 实现一个使用异常处理的简单计算器，可以处理除零错误。
2. 使用智能指针管理动态分配的内存，避免内存泄漏。
3. 编写一个支持移动语义的类，并测试其性能优势。
4. 使用lambda表达式对一个整数数组进行排序、查找和转换操作。

### 5.2 进阶挑战

1. 实现一个自定义的异常层次结构，用于处理不同类型的错误。
2. 使用智能指针和移动语义实现一个高效的容器类。
3. 结合lambda表达式和STL算法实现一个复杂的数据处理任务。

## 6. 小结

本章我们学习了C++的一些高级特性：

- 异常处理机制，包括try-catch块和自定义异常类
- 智能指针，包括unique_ptr、shared_ptr和weak_ptr
- 右值引用和移动语义，用于提高程序性能
- Lambda表达式，用于定义匿名函数对象

掌握这些高级特性可以帮助我们编写更加健壮、高效和现代的C++代码。在实际开发中，我们应该根据具体需求合理地使用这些特性，以提高代码质量和性能。
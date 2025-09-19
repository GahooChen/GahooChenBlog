# C++现代特性：C++11/14/17/20新功能

上一节课我们学习了C++的智能指针，这是C++自动内存管理的重要工具。在这最后一节课中，我们将探讨C++11及以后版本引入的现代特性，这些特性使C++编程变得更加高效、安全和便捷。

## C++标准版本概述

在开始介绍现代C++特性之前，让我们先了解一下C++标准的发展历程：

- **C++98/C++03**：第一个C++标准版本
- **C++11**：重大更新，引入了大量现代特性，也被称为"C++0x"
- **C++14**：对C++11的增量更新，完善和扩展了C++11的特性
- **C++17**：进一步的改进和新特性
- **C++20**：引入了许多重大特性，如概念、范围库等
- **C++23**：最新的标准版本（正在制定中）

在这节课中，我们将重点介绍C++11/14/17/20中引入的一些最具代表性的现代特性。

## C++11特性

C++11是C++标准的一个重大更新，引入了许多现代特性。以下是一些最重要的特性：

### 1. auto类型推导

`auto`关键字允许编译器根据初始化表达式自动推导变量的类型，使代码更简洁、更易于维护：

```cpp
#include <iostream>
#include <vector>
#include <string>

int main() {
    // 简单类型推导
    auto i = 42;  // i的类型是int
    auto d = 3.14;  // d的类型是double
    auto s = "Hello, World!";  // s的类型是const char*
    
    // 复杂类型推导
    std::vector<std::string> vec = {"apple", "banana", "cherry"};
    auto it = vec.begin();  // it的类型是std::vector<std::string>::iterator
    
    // 函数返回类型推导（C++14及以上）
    auto add(int a, int b) {
        return a + b;  // 返回类型是int
    }
    
    std::cout << "add(10, 20) = " << add(10, 20) << std::endl;
    
    return 0;
}
```

### 2. 范围for循环

范围for循环（range-based for loop）提供了一种简洁的方式来遍历容器中的所有元素：

```cpp
#include <iostream>
#include <vector>
#include <string>

int main() {
    // 遍历数组
    int arr[] = {1, 2, 3, 4, 5};
    for (auto element : arr) {
        std::cout << element << " ";
    }
    std::cout << std::endl;
    
    // 遍历向量
    std::vector<std::string> vec = {"apple", "banana", "cherry"};
    for (auto& element : vec) {  // 使用引用避免拷贝
        std::cout << element << " ";
    }
    std::cout << std::endl;
    
    // 使用const引用遍历
    for (const auto& element : vec) {
        std::cout << element << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### 3. Lambda表达式

Lambda表达式允许我们在代码中定义匿名函数，这对于编写简短的回调函数或函数对象非常有用：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {5, 2, 8, 1, 9};
    
    // 使用lambda表达式排序
    std::sort(numbers.begin(), numbers.end(), [](int a, int b) {
        return a < b;  // 升序排序
    });
    
    // 打印排序后的结果
    for (auto number : numbers) {
        std::cout << number << " ";
    }
    std::cout << std::endl;
    
    // Lambda表达式可以捕获外部变量
    int multiplier = 2;
    std::vector<int> doubled_numbers;
    
    // 值捕获
    std::transform(numbers.begin(), numbers.end(), std::back_inserter(doubled_numbers),
        [multiplier](int n) {
            return n * multiplier;
        });
    
    // 引用捕获
    std::vector<int> tripled_numbers;
    std::transform(numbers.begin(), numbers.end(), std::back_inserter(tripled_numbers),
        [&multiplier](int n) {
            return n * multiplier;
        });
    
    // 打印结果
    std::cout << "Doubled numbers: ";
    for (auto number : doubled_numbers) {
        std::cout << number << " ";
    }
    std::cout << std::endl;
    
    std::cout << "Tripled numbers: ";
    for (auto number : tripled_numbers) {
        std::cout << number << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### 4. nullptr关键字

`nullptr`是一个新的关键字，表示空指针常量，它可以避免`NULL`宏带来的歧义：

```cpp
#include <iostream>

void f(int n) {
    std::cout << "f(int): " << n << std::endl;
}

void f(int* p) {
    std::cout << "f(int*): " << (p ? "not null" : "null") << std::endl;
}

int main() {
    // 使用NULL会导致歧义
    // f(NULL);  // 编译错误：对重载函数的调用不明确
    
    // 使用nullptr不会有歧义
    f(nullptr);  // 调用f(int*)
    
    // 比较指针
    int* p = nullptr;
    if (p == nullptr) {
        std::cout << "p is null" << std::endl;
    }
    
    return 0;
}
```

### 5. 右值引用和移动语义

C++11引入了右值引用（`&&`）和移动语义，这可以显著提高程序的性能，特别是在处理大型对象时：

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <utility>  // for std::move

class MyClass {
public:
    MyClass() : m_data(nullptr) {
        std::cout << "Default constructor called" << std::endl;
    }
    
    MyClass(const char* data) {
        std::cout << "Constructor called" << std::endl;
        if (data) {
            m_size = std::strlen(data);
            m_data = new char[m_size + 1];
            std::memcpy(m_data, data, m_size + 1);
        } else {
            m_data = nullptr;
            m_size = 0;
        }
    }
    
    // 拷贝构造函数
    MyClass(const MyClass& other) {
        std::cout << "Copy constructor called" << std::endl;
        m_size = other.m_size;
        if (other.m_data) {
            m_data = new char[m_size + 1];
            std::memcpy(m_data, other.m_data, m_size + 1);
        } else {
            m_data = nullptr;
        }
    }
    
    // 移动构造函数
    MyClass(MyClass&& other) noexcept : m_data(other.m_data), m_size(other.m_size) {
        std::cout << "Move constructor called" << std::endl;
        other.m_data = nullptr;
        other.m_size = 0;
    }
    
    ~MyClass() {
        std::cout << "Destructor called" << std::endl;
        delete[] m_data;
    }
    
    // 获取数据
    const char* getData() const {
        return m_data ? m_data : "";
    }
    
private:
    char* m_data;
    size_t m_size;
};

int main() {
    // 创建对象
    MyClass obj1("Hello, World!");
    
    // 使用移动构造函数
    MyClass obj2 = std::move(obj1);
    
    std::cout << "obj1 data: " << obj1.getData() << std::endl;  // obj1现在是空的
    std::cout << "obj2 data: " << obj2.getData() << std::endl;
    
    return 0;
}
```

### 6. 智能指针

C++11引入了三种智能指针：`std::unique_ptr`、`std::shared_ptr`和`std::weak_ptr`，用于自动管理内存：

```cpp
#include <iostream>
#include <memory>

class MyClass {
public:
    void doSomething() {
        std::cout << "MyClass is doing something" << std::endl;
    }
};

int main() {
    // unique_ptr：独占所有权
    std::unique_ptr<MyClass> unique_ptr = std::make_unique<MyClass>();
    unique_ptr->doSomething();
    
    // shared_ptr：共享所有权
    std::shared_ptr<MyClass> shared_ptr1 = std::make_shared<MyClass>();
    std::shared_ptr<MyClass> shared_ptr2 = shared_ptr1;  // 引用计数增加
    shared_ptr1->doSomething();
    shared_ptr2->doSomething();
    
    // weak_ptr：不增加引用计数的智能指针
    std::weak_ptr<MyClass> weak_ptr = shared_ptr1;
    if (auto locked_ptr = weak_ptr.lock()) {
        locked_ptr->doSomething();
    }
    
    return 0;
}
```

### 7. 类型别名声明（using）

C++11引入了使用`using`关键字创建类型别名的新方式，这比使用`typedef`更清晰，特别是在处理模板类型时：

```cpp
#include <iostream>
#include <vector>

// 使用typedef创建类型别名
typedef std::vector<int> IntVector;

// 使用using创建类型别名（C++11）
using IntVector2 = std::vector<int>;

// 使用using创建模板别名（typedef无法直接做到）
template<typename T>
using Vector = std::vector<T>;

int main() {
    // 使用typedef创建的类型别名
    IntVector vec1 = {1, 2, 3, 4, 5};
    
    // 使用using创建的类型别名
    IntVector2 vec2 = {6, 7, 8, 9, 10};
    
    // 使用模板别名
    Vector<double> vec3 = {1.1, 2.2, 3.3};
    Vector<std::string> vec4 = {"apple", "banana", "cherry"};
    
    // 打印结果
    std::cout << "vec1 size: " << vec1.size() << std::endl;
    std::cout << "vec2 size: " << vec2.size() << std::endl;
    std::cout << "vec3 size: " << vec3.size() << std::endl;
    std::cout << "vec4 size: " << vec4.size() << std::endl;
    
    return 0;
}
```

### 8. 右值引用参数和完美转发

C++11引入了右值引用参数和完美转发，这使得函数模板可以保持参数的值类别（左值或右值）：

```cpp
#include <iostream>
#include <utility>

// 接受左值引用的函数
void process(int& value) {
    std::cout << "Processing lvalue: " << value << std::endl;
}

// 接受右值引用的函数
void process(int&& value) {
    std::cout << "Processing rvalue: " << value << std::endl;
}

// 函数模板，使用完美转发
 template<typename T>
void wrapper(T&& value) {
    process(std::forward<T>(value));  // 完美转发
}

int main() {
    int a = 10;
    wrapper(a);  // 传递左值，调用process(int&)
    wrapper(20);  // 传递右值，调用process(int&&)
    wrapper(std::move(a));  // 传递右值，调用process(int&&)
    
    return 0;
}
```

## C++14特性

C++14是对C++11的增量更新，完善和扩展了C++11的特性。以下是一些重要的C++14特性：

### 1. 泛型lambda表达式

C++14允许lambda表达式使用`auto`作为参数类型，使lambda表达式更加灵活：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    // 泛型lambda表达式（C++14）
    auto add = [](auto a, auto b) {
        return a + b;
    };
    
    std::cout << "add(10, 20) = " << add(10, 20) << std::endl;  // 整数相加
    std::cout << "add(3.14, 2.71) = " << add(3.14, 2.71) << std::endl;  // 浮点数相加
    std::cout << "add(std::string("Hello, "), std::string("World!")) = " << add(std::string("Hello, "), std::string("World!")) << std::endl;  // 字符串相加
    
    // 使用泛型lambda表达式排序不同类型的容器
    std::vector<int> int_vec = {5, 2, 8, 1, 9};
    std::vector<double> double_vec = {5.5, 2.2, 8.8, 1.1, 9.9};
    
    auto sort_func = [](auto& container) {
        std::sort(container.begin(), container.end());
    };
    
    sort_func(int_vec);
    sort_func(double_vec);
    
    // 打印排序后的结果
    std::cout << "Sorted int vector: ";
    for (auto value : int_vec) {
        std::cout << value << " ";
    }
    std::cout << std::endl;
    
    std::cout << "Sorted double vector: ";
    for (auto value : double_vec) {
        std::cout << value << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### 2. 函数返回类型推导

C++14允许函数使用`auto`作为返回类型，编译器会根据return语句自动推导实际的返回类型：

```cpp
#include <iostream>
#include <vector>
#include <string>

// 函数返回类型推导（C++14）
auto add(int a, int b) {
    return a + b;  // 返回类型是int
}

auto getString() {
    return std::string("Hello, World!");  // 返回类型是std::string
}

// 更复杂的例子
auto createVector() {
    std::vector<int> vec = {1, 2, 3, 4, 5};
    return vec;  // 返回类型是std::vector<int>
}

int main() {
    std::cout << "add(10, 20) = " << add(10, 20) << std::endl;
    std::cout << "getString() = " << getString() << std::endl;
    
    auto vec = createVector();
    std::cout << "Vector size: " << vec.size() << std::endl;
    std::cout << "Vector elements: ";
    for (auto element : vec) {
        std::cout << element << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### 3. std::make_unique

C++14引入了`std::make_unique`函数，这是创建`std::unique_ptr`的推荐方式：

```cpp
#include <iostream>
#include <memory>

class MyClass {
public:
    MyClass(int value) : m_value(value) {
        std::cout << "MyClass constructor called with value " << m_value << std::endl;
    }
    
    ~MyClass() {
        std::cout << "MyClass destructor called with value " << m_value << std::endl;
    }
    
    int getValue() const {
        return m_value;
    }
    
private:
    int m_value;
};

int main() {
    // C++14引入的std::make_unique
    std::unique_ptr<MyClass> ptr1 = std::make_unique<MyClass>(42);
    std::cout << "ptr1 value: " << ptr1->getValue() << std::endl;
    
    // 不推荐的方式（C++11也支持）
    std::unique_ptr<MyClass> ptr2(new MyClass(100));
    std::cout << "ptr2 value: " << ptr2->getValue() << std::endl;
    
    return 0;
}
```

### 4. 二进制字面量和数字分隔符

C++14允许使用二进制字面量和数字分隔符，使数字更易读：

```cpp
#include <iostream>

int main() {
    // 二进制字面量（C++14）
    int binary = 0b101010;  // 二进制的42
    std::cout << "binary (0b101010) = " << binary << std::endl;
    
    // 数字分隔符（C++14）
    long long large_number = 1'000'000'000;  // 10亿
    std::cout << "large_number (1'000'000'000) = " << large_number << std::endl;
    
    // 结合使用
    int hex_with_separators = 0xDEAD'BEEF;  // 十六进制数，使用分隔符
    std::cout << "hex_with_separators (0xDEAD'BEEF) = " << hex_with_separators << std::endl;
    
    return 0;
}
```

## C++17特性

C++17进一步改进和扩展了C++的功能。以下是一些重要的C++17特性：

### 1. 结构化绑定

结构化绑定允许我们将复合对象（如元组、结构体、数组等）的成员直接绑定到局部变量：

```cpp
#include <iostream>
#include <tuple>
#include <string>
#include <array>

struct Person {
    std::string name;
    int age;
    double salary;
};

int main() {
    // 解构元组
    auto tuple = std::make_tuple("Alice", 30, 50000.0);
    auto [name, age, salary] = tuple;  // 结构化绑定
    std::cout << "Name: " << name << ", Age: " << age << ", Salary: " << salary << std::endl;
    
    // 解构结构体
    Person person = {"Bob", 25, 45000.0};
    auto [p_name, p_age, p_salary] = person;  // 结构化绑定
    std::cout << "Name: " << p_name << ", Age: " << p_age << ", Salary: " << p_salary << std::endl;
    
    // 解构数组
    std::array<int, 3> arr = {1, 2, 3};
    auto [a, b, c] = arr;  // 结构化绑定
    std::cout << "a: " << a << ", b: " << b << ", c: " << c << std::endl;
    
    // 修改结构化绑定的变量会修改原始对象
    auto& [ref_name, ref_age, ref_salary] = person;  // 使用引用
    ref_salary = 60000.0;  // 修改person的salary
    std::cout << "Updated salary: " << person.salary << std::endl;
    
    return 0;
}
```

### 2. if/switch初始化语句

C++17允许在`if`和`switch`语句中直接初始化变量，这可以使代码更简洁、更安全：

```cpp
#include <iostream>
#include <vector>
#include <optional>

// 可能返回空的函数
std::optional<int> findValue(const std::vector<int>& vec, int target) {
    for (int value : vec) {
        if (value == target) {
            return value;
        }
    }
    return std::nullopt;  // 返回空
}

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    
    // if语句中的初始化（C++17）
    if (auto result = findValue(numbers, 3); result.has_value()) {
        std::cout << "Found value: " << result.value() << std::endl;
    } else {
        std::cout << "Value not found" << std::endl;
    }
    
    // switch语句中的初始化（C++17）
    switch (int random_number = rand() % 3; random_number) {
        case 0:
            std::cout << "Zero" << std::endl;
            break;
        case 1:
            std::cout << "One" << std::endl;
            break;
        case 2:
            std::cout << "Two" << std::endl;
            break;
        default:
            std::cout << "Other" << std::endl;
            break;
    }
    
    return 0;
}
```

### 3. std::optional

`std::optional`是一个模板类，表示可能存在或不存在的值：

```cpp
#include <iostream>
#include <optional>
#include <string>

// 可能返回空的函数
std::optional<int> divide(int a, int b) {
    if (b == 0) {
        return std::nullopt;  // 返回空
    }
    return a / b;  // 返回结果
}

// 可能返回空的函数，使用std::optional<std::string>
std::optional<std::string> findNameById(int id) {
    if (id == 1) {
        return "Alice";
    } else if (id == 2) {
        return "Bob";
    } else {
        return std::nullopt;  // 返回空
    }
}

int main() {
    // 使用divide函数
    auto result1 = divide(10, 2);
    if (result1.has_value()) {
        std::cout << "10 / 2 = " << result1.value() << std::endl;
    } else {
        std::cout << "Division by zero" << std::endl;
    }
    
    auto result2 = divide(10, 0);
    if (result2.has_value()) {
        std::cout << "10 / 0 = " << result2.value() << std::endl;
    } else {
        std::cout << "Division by zero" << std::endl;
    }
    
    // 使用findNameById函数
    auto name1 = findNameById(1);
    std::cout << "Name for ID 1: " << (name1.has_value() ? name1.value() : "Not found") << std::endl;
    
    auto name2 = findNameById(3);
    std::cout << "Name for ID 3: " << (name2.has_value() ? name2.value() : "Not found") << std::endl;
    
    // 使用value_or获取值，如果不存在则使用默认值
    std::cout << "Name for ID 1 (with default): " << name1.value_or("Unknown") << std::endl;
    std::cout << "Name for ID 3 (with default): " << name2.value_or("Unknown") << std::endl;
    
    return 0;
}
```

### 4. std::variant

`std::variant`是一个类型安全的联合体，可以存储不同类型的值，但在任何时候只能存储其中一种类型的值：

```cpp
#include <iostream>
#include <variant>
#include <string>

int main() {
    // 创建std::variant对象
    std::variant<int, double, std::string> var;
    
    // 设置为int类型
    var = 42;
    std::cout << "var is int: " << std::get<int>(var) << std::endl;
    
    // 设置为double类型
    var = 3.14;
    std::cout << "var is double: " << std::get<double>(var) << std::endl;
    
    // 设置为std::string类型
    var = "Hello, World!";
    std::cout << "var is string: " << std::get<std::string>(var) << std::endl;
    
    // 使用std::visit访问variant的值
    auto printValue = [](const auto& value) {
        std::cout << "Visited value: " << value << std::endl;
    };
    
    std::visit(printValue, var);
    
    // 尝试获取错误的类型会抛出异常
    try {
        std::get<int>(var);  // var现在存储的是std::string类型
    } catch (const std::bad_variant_access& e) {
        std::cout << "Exception: " << e.what() << std::endl;
    }
    
    // 使用std::holds_alternative检查variant中存储的类型
    if (std::holds_alternative<int>(var)) {
        std::cout << "var holds an int" << std::endl;
    } else if (std::holds_alternative<double>(var)) {
        std::cout << "var holds a double" << std::endl;
    } else if (std::holds_alternative<std::string>(var)) {
        std::cout << "var holds a string" << std::endl;
    }
    
    return 0;
}
```

### 5. std::any

`std::any`是一个可以存储任何类型值的容器，但需要运行时类型信息（RTTI）来安全地访问其内容：

```cpp
#include <iostream>
#include <any>
#include <string>

int main() {
    // 创建std::any对象
    std::any any_value;
    
    // 存储int类型
    any_value = 42;
    std::cout << "any_value is int: " << std::any_cast<int>(any_value) << std::endl;
    
    // 存储double类型
    any_value = 3.14;
    std::cout << "any_value is double: " << std::any_cast<double>(any_value) << std::endl;
    
    // 存储std::string类型
    any_value = std::string("Hello, World!");
    std::cout << "any_value is string: " << std::any_cast<std::string>(any_value) << std::endl;
    
    // 检查any_value是否有值
    if (any_value.has_value()) {
        std::cout << "any_value has value" << std::endl;
    }
    
    // 获取类型信息
    std::cout << "Type name: " << any_value.type().name() << std::endl;
    
    // 尝试转换为错误的类型会抛出异常
    try {
        std::any_cast<int>(any_value);  // any_value现在存储的是std::string类型
    } catch (const std::bad_any_cast& e) {
        std::cout << "Exception: " << e.what() << std::endl;
    }
    
    // 重置any_value
    any_value.reset();
    if (!any_value.has_value()) {
        std::cout << "any_value has no value after reset" << std::endl;
    }
    
    return 0;
}
```

### 6. 折叠表达式

C++17引入了折叠表达式，简化了可变参数模板的使用：

```cpp
#include <iostream>

// 使用递归方式实现可变参数求和（C++11/C++14）
template<typename T>
T sum(T value) {
    return value;
}

template<typename T, typename... Args>
T sum(T first, Args... rest) {
    return first + sum(rest...);
}

// 使用折叠表达式实现可变参数求和（C++17）
template<typename... Args>
auto sum_fold(Args... args) {
    return (args + ...);  // 二元左折叠：((arg1 + arg2) + arg3) + ...
}

// 使用折叠表达式实现可变参数相乘
 template<typename... Args>
auto product_fold(Args... args) {
    return (args * ...);  // 二元左折叠：((arg1 * arg2) * arg3) * ...
}

// 使用折叠表达式和逗号运算符
 template<typename... Args>
void print_args(Args... args) {
    (std::cout << ... << args) << std::endl;  // 打印所有参数
}

// 使用折叠表达式和lambda表达式
 template<typename... Args>
void print_args_with_separator(Args... args) {
    auto print_with_space = [first = true](const auto& arg) mutable {
        if (!first) {
            std::cout << " ";
        }
        first = false;
        std::cout << arg;
    };
    
    (print_with_space(args), ...);  // 对每个参数调用lambda表达式
    std::cout << std::endl;
}

int main() {
    // 测试sum函数
    std::cout << "sum(1, 2, 3, 4, 5) = " << sum(1, 2, 3, 4, 5) << std::endl;
    
    // 测试sum_fold函数
    std::cout << "sum_fold(1, 2, 3, 4, 5) = " << sum_fold(1, 2, 3, 4, 5) << std::endl;
    
    // 测试product_fold函数
    std::cout << "product_fold(1, 2, 3, 4, 5) = " << product_fold(1, 2, 3, 4, 5) << std::endl;
    
    // 测试print_args函数
    print_args("Hello, ", "World!", " ", "This ", "is ", "C++17!");
    
    // 测试print_args_with_separator函数
    print_args_with_separator(1, 2, 3, "Hello", 3.14, true);
    
    return 0;
}
```

## C++20特性

C++20是C++标准的最新主要版本，引入了许多重大特性。以下是一些重要的C++20特性：

### 1. 概念（Concepts）

概念是C++20引入的一个重大特性，它允许我们定义模板参数必须满足的约束条件，使模板错误消息更清晰，代码更易读：

```cpp
#include <iostream>
#include <concepts>
#include <string>

// 定义一个概念：可打印类型
 template<typename T>
concept Printable = requires(T t) {
    { std::cout << t } -> std::same_as<decltype(std::cout)&>;
};

// 使用概念约束模板参数
 template<Printable T>
void print(T value) {
    std::cout << value << std::endl;
}

// 定义一个更复杂的概念：数值类型
 template<typename T>
concept Numeric = std::integral<T> || std::floating_point<T>;

// 使用多个概念约束模板参数
 template<Numeric T>
T add(T a, T b) {
    return a + b;
}

// 定义一个概念：具有size()方法的类型
 template<typename T>
concept HasSize = requires(T t) {
    { t.size() } -> std::convertible_to<std::size_t>;
};

// 使用concepts和if constexpr
 template<typename T>
void process(T value) {
    if constexpr (HasSize<T>) {
        std::cout << "Has size: " << value.size() << std::endl;
    } else if constexpr (Printable<T>) {
        std::cout << "Printable value: " << value << std::endl;
    } else {
        std::cout << "Unsupported type" << std::endl;
    }
}

int main() {
    // 测试print函数
    print(42);  // int是可打印的
    print(3.14);  // double是可打印的
    print("Hello, World!");  // const char*是可打印的
    print(std::string("Hello, C++20!"));  // std::string是可打印的
    
    // 测试add函数
    std::cout << "add(10, 20) = " << add(10, 20) << std::endl;
    std::cout << "add(3.14, 2.71) = " << add(3.14, 2.71) << std::endl;
    
    // 测试process函数
    std::string s = "Hello";
    process(s);  // std::string具有size()方法
    
    int i = 42;
    process(i);  // int是可打印的，但没有size()方法
    
    return 0;
}
```

### 2. 范围库（Ranges）

C++20引入了范围库，这是对标准库算法的重大改进，使代码更简洁、更易读：

```cpp
#include <iostream>
#include <vector>
#include <ranges>
#include <algorithm>
#include <string>

int main() {
    std::vector<int> numbers = {5, 2, 8, 1, 9, 3, 7, 4, 6};
    
    // 使用范围库过滤、转换和排序
    auto result = numbers
        | std::views::filter([](int n) { return n % 2 == 0; })  // 过滤偶数
        | std::views::transform([](int n) { return n * 2; })  // 乘以2
        | std::views::drop(1)  // 跳过第一个元素
        | std::ranges::to<std::vector>();  // 转换为vector
    
    // 打印结果
    std::cout << "Transformed numbers: ";
    for (int n : result) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // 使用范围库排序
    std::ranges::sort(numbers);
    std::cout << "Sorted numbers: ";
    for (int n : numbers) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // 使用范围库查找
    auto it = std::ranges::find(numbers, 5);
    if (it != numbers.end()) {
        std::cout << "Found 5 at position: " << std::distance(numbers.begin(), it) << std::endl;
    }
    
    // 字符串范围
    std::string text = "Hello, C++20!";
    auto chars = text | std::views::filter([](char c) { return std::isalpha(c); });
    std::cout << "Alphabetic characters: ";
    for (char c : chars) {
        std::cout << c;
    }
    std::cout << std::endl;
    
    return 0;
}
```

### 3. 协程（Coroutines）

协程是C++20引入的另一个重大特性，它允许函数在某个点挂起并在稍后恢复执行，这对于异步编程非常有用：

```cpp
#include <iostream>
#include <coroutine>
#include <future>
#include <thread>

// 简单的任务类型
struct Task {
    struct promise_type {
        std::promise<int> result_promise;
        
        Task get_return_object() {
            return Task{std::coroutine_handle<promise_type>::from_promise(*this)};
        }
        
        std::suspend_never initial_suspend() { return {}; }
        std::suspend_never final_suspend() noexcept { return {}; }
        
        void unhandled_exception() {
            std::terminate();
        }
        
        void return_value(int value) {
            result_promise.set_value(value);
        }
    };
    
    std::coroutine_handle<promise_type> handle;
    
    Task(std::coroutine_handle<promise_type> h) : handle(h) {}
    
    ~Task() {
        if (handle) {
            handle.destroy();
        }
    }
    
    // 禁止拷贝
    Task(const Task&) = delete;
    Task& operator=(const Task&) = delete;
    
    // 允许移动
    Task(Task&& other) noexcept : handle(other.handle) {
        other.handle = nullptr;
    }
    
    Task& operator=(Task&& other) noexcept {
        if (this != &other) {
            if (handle) {
                handle.destroy();
            }
            handle = other.handle;
            other.handle = nullptr;
        }
        return *this;
    }
    
    // 获取结果
    int get() {
        return handle.promise().result_promise.get_future().get();
    }
};

// 协程函数
Task async_task() {
    std::cout << "Task started" << std::endl;
    
    // 模拟异步操作
    co_await std::suspend_always{};  // 挂起协程
    
    std::cout << "Task resumed" << std::endl;
    
    // 返回结果
    co_return 42;
}

int main() {
    // 创建协程任务
    Task task = async_task();
    
    std::cout << "Main thread doing other work..." << std::endl;
    
    // 模拟一些工作
    std::this_thread::sleep_for(std::chrono::seconds(1));
    
    // 恢复协程执行
    std::cout << "Resuming task..." << std::endl;
    task.handle.resume();
    
    // 获取结果
    int result = task.get();
    std::cout << "Task result: " << result << std::endl;
    
    return 0;
}
```

### 4. 模块（Modules）

C++20引入了模块系统，这是对传统头文件系统的重大改进，解决了头文件重复包含、宏冲突等问题：

```cpp
// 定义一个模块（math.cppm）
export module math;

export int add(int a, int b) {
    return a + b;
}

export int subtract(int a, int b) {
    return a - b;
}

export int multiply(int a, int b) {
    return a * b;
}

export double divide(int a, int b) {
    if (b == 0) {
        throw std::runtime_error("Division by zero");
    }
    return static_cast<double>(a) / b;
}

// 使用模块（main.cpp）
import math;
#include <iostream>

int main() {
    std::cout << "10 + 5 = " << add(10, 5) << std::endl;
    std::cout << "10 - 5 = " << subtract(10, 5) << std::endl;
    std::cout << "10 * 5 = " << multiply(10, 5) << std::endl;
    std::cout << "10 / 5 = " << divide(10, 5) << std::endl;
    
    return 0;
}
```

### 5. 三路比较运算符（Spaceship Operator）

C++20引入了三路比较运算符（`<=>`，也称为飞船运算符），简化了比较操作的实现：

```cpp
#include <iostream>
#include <compare>
#include <string>

class Person {
public:
    Person(std::string name, int age) : m_name(std::move(name)), m_age(age) {}
    
    // 定义三路比较运算符（C++20）
    auto operator<=>(const Person& other) const = default;  // 使用默认实现
    
    // 或者自定义实现
    /*
    auto operator<=>(const Person& other) const {
        if (auto cmp = m_name <=> other.m_name; cmp != 0) {
            return cmp;
        }
        return m_age <=> other.m_age;
    }
    */
    
    // 为了打印而定义
    friend std::ostream& operator<<(std::ostream& os, const Person& person) {
        return os << "{name: " << person.m_name << ", age: " << person.m_age << "}";
    }
    
private:
    std::string m_name;
    int m_age;
};

int main() {
    Person alice("Alice", 30);
    Person bob("Bob", 25);
    Person alice2("Alice", 35);
    
    // 使用三路比较运算符
    auto cmp1 = alice <=> bob;
    if (cmp1 < 0) {
        std::cout << alice << " < " << bob << std::endl;
    } else if (cmp1 > 0) {
        std::cout << alice << " > " << bob << std::endl;
    } else {
        std::cout << alice << " == " << bob << std::endl;
    }
    
    auto cmp2 = alice <=> alice2;
    if (cmp2 < 0) {
        std::cout << alice << " < " << alice2 << std::endl;
    } else if (cmp2 > 0) {
        std::cout << alice << " > " << alice2 << std::endl;
    } else {
        std::cout << alice << " == " << alice2 << std::endl;
    }
    
    // 使用派生的比较运算符
    if (alice < bob) {
        std::cout << alice << " is less than " << bob << std::endl;
    }
    
    if (alice == alice) {
        std::cout << alice << " is equal to " << alice << std::endl;
    }
    
    return 0;
}
```

## 现代C++的最佳实践

使用现代C++特性时，应遵循以下最佳实践：

1. **使用auto进行类型推导**：当类型明显或不重要时，使用`auto`可以使代码更简洁、更易读
2. **优先使用智能指针**：使用智能指针可以避免内存管理问题，提高程序的安全性和可靠性
3. **使用范围for循环**：范围for循环使遍历容器的代码更简洁、更不易出错
4. **使用lambda表达式**：lambda表达式使编写简短的回调函数或函数对象更加方便
5. **避免使用过时的特性**：如`std::auto_ptr`、裸指针等
6. **使用`nullptr`而不是`NULL`或`0`**：`nullptr`更清晰、更安全
7. **使用移动语义优化性能**：对于大型对象，使用移动语义可以避免不必要的拷贝操作
8. **遵循RAII原则**：使用RAII（Resource Acquisition Is Initialization）管理资源
9. **使用标准库算法**：标准库算法通常比手动实现的循环更高效、更可靠
10. **使用现代C++特性简化代码**：如结构化绑定、if/switch初始化语句等

## 练习时间

让我们来做一些练习，巩固一下这节课所学的知识：

1. 使用auto和范围for循环重写一个遍历容器的代码
2. 使用lambda表达式和标准库算法实现一些常见的操作
3. 使用智能指针管理动态分配的资源
4. 实现一个支持移动语义的类
5. 使用C++17的结构化绑定和解构一个复合对象
6. 使用C++17的std::optional、std::variant和std::any处理不同类型的值
7. 使用C++20的概念约束模板参数
8. 使用C++20的范围库简化代码

## C++学习路径总结

通过这20节课的学习，我们已经掌握了C++的主要特性和用法。以下是C++学习路径的总结：

1. **C++基础与C的区别**：了解C++与C语言的主要区别，包括新的头文件、输入输出方式、命名空间等
2. **数据类型增强**：学习C++特有的数据类型，如布尔类型、引用、枚举类等
3. **输入输出系统**：掌握C++的I/O流库，包括`std::cout`、`std::cin`等
4. **函数增强**：学习C++的函数重载、默认参数、内联函数、函数模板等特性
5. **面向对象编程**：掌握类和对象、构造函数和析构函数、继承和多态等面向对象编程的核心概念
6. **运算符重载**：学习如何重载运算符，使自定义类型的行为更像内置类型
7. **泛型编程**：掌握模板编程，包括函数模板和类模板
8. **标准库**：学习C++标准库，包括容器、算法、迭代器等
9. **异常处理**：掌握C++的异常处理机制
10. **高级特性**：学习移动语义、智能指针、多线程编程等高级特性
11. **现代C++**：了解C++11/14/17/20引入的现代特性

## 小结

在这最后一节课中，我们学习了C++11及以后版本引入的现代特性，包括：

- **C++11特性**：auto类型推导、范围for循环、lambda表达式、nullptr、右值引用和移动语义、智能指针、类型别名声明等
- **C++14特性**：泛型lambda表达式、函数返回类型推导、std::make_unique、二进制字面量和数字分隔符等
- **C++17特性**：结构化绑定、if/switch初始化语句、std::optional、std::variant、std::any、折叠表达式等
- **C++20特性**：概念、范围库、协程、模块、三路比较运算符等
- **现代C++的最佳实践**
- **C++学习路径总结**

现代C++特性使C++编程变得更加高效、安全和便捷。通过学习和应用这些特性，我们可以编写出更简洁、更易读、更高效、更可靠的C++程序。

恭喜你完成了这20节C++课程的学习！希望这些课程能够帮助你掌握C++的核心概念和用法，为你的编程之旅打下坚实的基础。编程是一个持续学习的过程，希望你能够继续深入学习C++，并将其应用到实际项目中。祝你编程愉快！
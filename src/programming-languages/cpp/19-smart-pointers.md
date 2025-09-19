# C++智能指针：自动内存管理

上一节课我们学习了C++的移动语义和右值引用，这些特性可以显著提高程序的性能。在这节课中，我们将探讨C++11引入的智能指针，这是C++自动内存管理的重要工具，也是RAII（Resource Acquisition Is Initialization）机制的具体实现。

## 内存管理问题

在C++中，手动管理内存是一个常见的挑战。如果不小心，很容易导致以下问题：

1. **内存泄漏**：忘记释放不再使用的内存
2. **悬挂指针**：指针指向已经释放的内存
3. **重复释放**：同一块内存被释放多次
4. **内存分配失败**：没有检查内存分配是否成功

这些问题可能导致程序崩溃、数据损坏或安全漏洞。智能指针可以帮助我们避免这些问题，实现自动内存管理。

## 智能指针概述

C++11引入了三种主要的智能指针：

1. **`std::unique_ptr`**：独占所有权的智能指针，同一时间只能有一个`unique_ptr`指向一个对象
2. **`std::shared_ptr`**：共享所有权的智能指针，多个`shared_ptr`可以指向同一个对象，使用引用计数来管理对象的生命周期
3. **`std::weak_ptr`**：不增加引用计数的智能指针，通常用于解决`shared_ptr`的循环引用问题

这些智能指针都定义在`<memory>`头文件中。

## std::unique_ptr

`std::unique_ptr`是一个独占所有权的智能指针，它确保同一时间只能有一个`unique_ptr`指向一个对象。当`unique_ptr`被销毁时，它所指向的对象也会被销毁。

### 创建std::unique_ptr

可以使用`std::make_unique`（C++14及以上）或直接使用构造函数来创建`unique_ptr`：

```cpp
#include <iostream>
#include <memory>

class MyClass {
public:
    MyClass() {
        std::cout << "MyClass constructor called" << std::endl;
    }
    
    ~MyClass() {
        std::cout << "MyClass destructor called" << std::endl;
    }
    
    void doSomething() {
        std::cout << "MyClass is doing something" << std::endl;
    }
};

int main() {
    // C++14及以上版本：使用std::make_unique
    std::unique_ptr<MyClass> ptr1 = std::make_unique<MyClass>();
    
    // 或者使用构造函数（不推荐，因为可能会导致异常安全问题）
    std::unique_ptr<MyClass> ptr2(new MyClass());
    
    return 0;  // ptr1和ptr2在这里被销毁，它们指向的对象也会被销毁
}
```

### 访问对象

可以使用`->`或`*`运算符来访问`unique_ptr`指向的对象：

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
    std::unique_ptr<MyClass> ptr = std::make_unique<MyClass>();
    
    // 使用->访问成员函数
    ptr->doSomething();
    
    // 使用*访问对象本身
    (*ptr).doSomething();
    
    return 0;
}
```

### 所有权转移

`unique_ptr`的所有权可以通过移动语义转移，但不能复制：

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
    std::unique_ptr<MyClass> ptr1 = std::make_unique<MyClass>(42);
    std::cout << "ptr1 value: " << ptr1->getValue() << std::endl;
    
    // 错误：不能复制unique_ptr
    // std::unique_ptr<MyClass> ptr2 = ptr1;  // 编译错误
    
    // 正确：可以通过移动语义转移所有权
    std::unique_ptr<MyClass> ptr2 = std::move(ptr1);
    std::cout << "ptr2 value: " << ptr2->getValue() << std::endl;
    
    // ptr1现在不再拥有对象，变成了nullptr
    if (ptr1 == nullptr) {
        std::cout << "ptr1 is now nullptr" << std::endl;
    }
    
    return 0;  // 只有ptr2指向的对象会在这里被销毁
}
```

### 释放所有权

可以使用`release()`方法来释放`unique_ptr`对对象的所有权，但不会销毁对象：

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
    std::unique_ptr<MyClass> ptr = std::make_unique<MyClass>();
    
    // 释放所有权，但不销毁对象
    MyClass* raw_ptr = ptr.release();
    
    // ptr现在是nullptr
    if (ptr == nullptr) {
        std::cout << "ptr is now nullptr" << std::endl;
    }
    
    // 使用原始指针访问对象
    raw_ptr->doSomething();
    
    // 手动销毁对象
    delete raw_ptr;
    
    return 0;
}
```

### 重置智能指针

可以使用`reset()`方法来重置`unique_ptr`，释放它当前指向的对象，并可选地让它指向一个新的对象：

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
    
private:
    int m_value;
};

int main() {
    std::unique_ptr<MyClass> ptr = std::make_unique<MyClass>(42);
    
    // 重置ptr，释放它当前指向的对象
    ptr.reset();
    
    // ptr现在是nullptr
    if (ptr == nullptr) {
        std::cout << "ptr is now nullptr" << std::endl;
    }
    
    // 重置ptr，让它指向一个新的对象
    ptr.reset(new MyClass(100));
    
    return 0;
}
```

## std::shared_ptr

`std::shared_ptr`是一个共享所有权的智能指针，多个`shared_ptr`可以指向同一个对象。`shared_ptr`使用引用计数来管理对象的生命周期，当最后一个指向对象的`shared_ptr`被销毁时，对象才会被销毁。

### 创建std::shared_ptr

可以使用`std::make_shared`或直接使用构造函数来创建`shared_ptr`：

```cpp
#include <iostream>
#include <memory>

class MyClass {
public:
    MyClass() {
        std::cout << "MyClass constructor called" << std::endl;
    }
    
    ~MyClass() {
        std::cout << "MyClass destructor called" << std::endl;
    }
};

int main() {
    // 推荐：使用std::make_shared
    std::shared_ptr<MyClass> ptr1 = std::make_shared<MyClass>();
    
    // 也可以使用构造函数
    std::shared_ptr<MyClass> ptr2(new MyClass());
    
    return 0;  // 当所有指向对象的shared_ptr都被销毁时，对象才会被销毁
}
```

### 引用计数

可以使用`use_count()`方法来获取当前有多少个`shared_ptr`指向同一个对象：

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
    std::shared_ptr<MyClass> ptr1 = std::make_shared<MyClass>();
    std::cout << "ptr1 use count: " << ptr1.use_count() << std::endl;  // 输出: 1
    
    // 创建另一个shared_ptr，指向同一个对象
    std::shared_ptr<MyClass> ptr2 = ptr1;
    std::cout << "After creating ptr2, use count: " << ptr1.use_count() << std::endl;  // 输出: 2
    
    // 使用ptr2访问对象
    ptr2->doSomething();
    
    // ptr2离开作用域，引用计数减1
    {
        std::shared_ptr<MyClass> ptr3 = ptr1;
        std::cout << "Inside inner scope, use count: " << ptr1.use_count() << std::endl;  // 输出: 3
    }
    
    std::cout << "After inner scope, use count: " << ptr1.use_count() << std::endl;  // 输出: 2
    
    return 0;  // ptr1和ptr2离开作用域，引用计数减到0，对象被销毁
}
```

### 重置和释放

`shared_ptr`也支持`reset()`和`release()`方法，但它们的行为与`unique_ptr`有所不同：

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
    
private:
    int m_value;
};

int main() {
    std::shared_ptr<MyClass> ptr1 = std::make_shared<MyClass>(42);
    std::shared_ptr<MyClass> ptr2 = ptr1;
    
    std::cout << "Initial use count: " << ptr1.use_count() << std::endl;  // 输出: 2
    
    // 重置ptr1，它不再指向原来的对象，但对象不会被销毁，因为ptr2还指向它
    ptr1.reset(new MyClass(100));
    std::cout << "After ptr1.reset(), ptr1 use count: " << ptr1.use_count() << std::endl;  // 输出: 1
    std::cout << "After ptr1.reset(), ptr2 use count: " << ptr2.use_count() << std::endl;  // 输出: 1
    
    // shared_ptr没有release()方法可以释放所有权并返回原始指针
    // 可以使用get()方法获取原始指针，但不推荐这样做，因为可能导致悬挂指针
    MyClass* raw_ptr = ptr1.get();
    raw_ptr->~MyClass();  // 危险：手动销毁对象，但shared_ptr还不知道
    
    return 0;
}
```

## std::weak_ptr

`std::weak_ptr`是一种不增加引用计数的智能指针，它通常用于解决`shared_ptr`的循环引用问题。`weak_ptr`不能直接访问对象，必须先转换为`shared_ptr`。

### 创建std::weak_ptr

`weak_ptr`通常通过`shared_ptr`来创建：

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
    std::shared_ptr<MyClass> shared_ptr = std::make_shared<MyClass>();
    
    // 通过shared_ptr创建weak_ptr
    std::weak_ptr<MyClass> weak_ptr = shared_ptr;
    
    // weak_ptr不增加引用计数
    std::cout << "shared_ptr use count: " << shared_ptr.use_count() << std::endl;  // 输出: 1
    
    return 0;
}
```

### 访问对象

要访问`weak_ptr`指向的对象，需要先使用`lock()`方法将其转换为`shared_ptr`：

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
    std::shared_ptr<MyClass> shared_ptr = std::make_shared<MyClass>();
    std::weak_ptr<MyClass> weak_ptr = shared_ptr;
    
    // 使用lock()方法获取shared_ptr
    if (std::shared_ptr<MyClass> locked_ptr = weak_ptr.lock()) {
        // 如果对象还存在，可以使用locked_ptr访问它
        locked_ptr->doSomething();
        std::cout << "Locked pointer use count: " << locked_ptr.use_count() << std::endl;  // 输出: 2
    } else {
        // 对象已经被销毁
        std::cout << "Object no longer exists" << std::endl;
    }
    
    // 也可以使用expired()方法检查对象是否存在
    if (!weak_ptr.expired()) {
        std::cout << "Object still exists" << std::endl;
    }
    
    // 释放shared_ptr，对象被销毁
    shared_ptr.reset();
    
    // 现在对象已经不存在了
    if (weak_ptr.expired()) {
        std::cout << "Object no longer exists" << std::endl;
    }
    
    // 尝试访问已销毁的对象
    if (std::shared_ptr<MyClass> locked_ptr = weak_ptr.lock()) {
        // 这部分代码不会执行，因为对象已经不存在了
        locked_ptr->doSomething();
    } else {
        std::cout << "Cannot lock weak_ptr, object no longer exists" << std::endl;
    }
    
    return 0;
}
```

### 解决循环引用问题

循环引用是使用`shared_ptr`时的一个常见问题，它会导致内存泄漏。`weak_ptr`可以用来解决这个问题：

```cpp
#include <iostream>
#include <memory>
#include <string>

class Person {
public:
    Person(const std::string& name) : m_name(name) {
        std::cout << "Person " << m_name << " created" << std::endl;
    }
    
    ~Person() {
        std::cout << "Person " << m_name << " destroyed" << std::endl;
    }
    
    void setFriend(std::shared_ptr<Person> friend_person) {
        m_friend = friend_person;
    }
    
    void setFriendWeak(std::weak_ptr<Person> friend_person) {
        m_friend_weak = friend_person;
    }
    
    void doSomethingWithFriend() {
        if (auto friend_ptr = m_friend_weak.lock()) {
            std::cout << m_name << " is doing something with " << friend_ptr->m_name << std::endl;
        } else {
            std::cout << m_name << "'s friend no longer exists" << std::endl;
        }
    }
    
private:
    std::string m_name;
    std::shared_ptr<Person> m_friend;  // 这会导致循环引用
    std::weak_ptr<Person> m_friend_weak;  // 这不会导致循环引用
};

void demonstrateMemoryLeak() {
    std::cout << "\nDemonstrating memory leak with shared_ptr circular reference:\n";
    std::shared_ptr<Person> alice = std::make_shared<Person>("Alice");
    std::shared_ptr<Person> bob = std::make_shared<Person>("Bob");
    
    // 循环引用：alice持有bob，bob持有alice
    alice->setFriend(bob);
    bob->setFriend(alice);
    
    std::cout << "alice use count: " << alice.use_count() << std::endl;  // 输出: 2
    std::cout << "bob use count: " << bob.use_count() << std::endl;  // 输出: 2
    
    // 函数结束时，alice和bob离开作用域，但由于循环引用，它们的引用计数不会降到0，对象不会被销毁
    // 这导致了内存泄漏
}

void solveCircularReference() {
    std::cout << "\nSolving circular reference with weak_ptr:\n";
    std::shared_ptr<Person> alice = std::make_shared<Person>("Alice");
    std::shared_ptr<Person> bob = std::make_shared<Person>("Bob");
    
    // 使用weak_ptr打破循环引用
    alice->setFriendWeak(bob);
    bob->setFriendWeak(alice);
    
    std::cout << "alice use count: " << alice.use_count() << std::endl;  // 输出: 1
    std::cout << "bob use count: " << bob.use_count() << std::endl;  // 输出: 1
    
    // 测试弱引用是否正常工作
    alice->doSomethingWithFriend();
    
    // 函数结束时，alice和bob离开作用域，它们的引用计数降到0，对象被销毁
}

int main() {
    demonstrateMemoryLeak();
    solveCircularReference();
    
    return 0;
}
```

## 智能指针的最佳实践

使用智能指针时，应遵循以下最佳实践：

### 1. 优先使用`std::make_unique`和`std::make_shared`

使用`std::make_unique`和`std::make_shared`而不是直接使用构造函数创建智能指针，因为它们更安全、更高效：

```cpp
// 推荐
std::unique_ptr<MyClass> ptr1 = std::make_unique<MyClass>();
std::shared_ptr<MyClass> ptr2 = std::make_shared<MyClass>();

// 不推荐
std::unique_ptr<MyClass> ptr3(new MyClass());
std::shared_ptr<MyClass> ptr4(new MyClass());
```

### 2. 选择合适的智能指针类型

- 当需要独占所有权时，使用`std::unique_ptr`
- 当需要共享所有权时，使用`std::shared_ptr`
- 当需要解决`std::shared_ptr`的循环引用问题时，使用`std::weak_ptr`

### 3. 避免原始指针和智能指针混用

混用原始指针和智能指针可能导致悬挂指针或重复释放等问题：

```cpp
// 避免这样做
MyClass* raw_ptr = new MyClass();
std::shared_ptr<MyClass> smart_ptr(raw_ptr);
delete raw_ptr;  // 危险：重复释放

// 或者这样做
std::shared_ptr<MyClass> smart_ptr = std::make_shared<MyClass>();
MyClass* raw_ptr = smart_ptr.get();
smart_ptr.reset();  // 危险：raw_ptr现在是悬挂指针
```

### 4. 避免`std::shared_ptr`的循环引用

循环引用会导致内存泄漏，应使用`std::weak_ptr`来避免：

```cpp
// 避免循环引用
class Node {
public:
    std::shared_ptr<Node> next;  // 这可能导致循环引用
    std::weak_ptr<Node> prev;  // 使用weak_ptr避免循环引用
};
```

### 5. 不要使用`std::auto_ptr`

`std::auto_ptr`是C++98中引入的智能指针，但它有很多问题，C++11已经将其弃用，C++17已经将其移除。应使用`std::unique_ptr`代替：

```cpp
// 避免使用
// std::auto_ptr<MyClass> ptr(new MyClass());

// 推荐使用
std::unique_ptr<MyClass> ptr = std::make_unique<MyClass>();
```

### 6. 智能指针与异常安全

智能指针可以提高程序的异常安全性，因为即使在发生异常的情况下，它们也能确保资源被正确释放：

```cpp
void functionThatMightThrow() {
    // 如果在new MyClass()之后、赋值给智能指针之前抛出异常，
    // 会导致内存泄漏
    std::unique_ptr<MyClass> ptr(new MyClass());
    
    // 如果在这里抛出异常，ptr会被销毁，它指向的对象也会被销毁，不会内存泄漏
    
    // ... 其他可能抛出异常的代码 ...
}

void saferFunction() {
    // 使用std::make_unique更安全
    std::unique_ptr<MyClass> ptr = std::make_unique<MyClass>();
    
    // ... 其他可能抛出异常的代码 ...
}
```

## 自定义删除器

有时，我们可能需要自定义智能指针如何删除对象。例如，当我们使用智能指针管理不是通过`new`分配的资源时：

```cpp
#include <iostream>
#include <memory>
#include <cstdio>

// 自定义删除器：关闭文件
struct FileDeleter {
    void operator()(FILE* file) const {
        if (file) {
            std::cout << "Closing file" << std::endl;
            fclose(file);
        }
    }
};

int main() {
    // 打开文件
    FILE* file = fopen("example.txt", "w");
    if (file) {
        fprintf(file, "Hello, World!\n");
        
        // 使用自定义删除器创建shared_ptr管理文件
        std::shared_ptr<FILE> file_ptr(file, FileDeleter());
        
        // 当file_ptr离开作用域时，FileDeleter会被调用来关闭文件
        
        // 或者使用lambda表达式作为删除器
        std::shared_ptr<FILE> file_ptr2(fopen("example2.txt", "w"), 
            [](FILE* f) {
                if (f) {
                    std::cout << "Closing file with lambda deleter" << std::endl;
                    fclose(f);
                }
            }
        );
        
        if (file_ptr2) {
            fprintf(file_ptr2.get(), "Hello from lambda deleter!\n");
        }
    }
    
    return 0;
}
```

## 智能指针的性能考虑

虽然智能指针可以帮助我们避免内存管理问题，但它们也有一些性能开销：

1. **引用计数开销**：`std::shared_ptr`需要维护引用计数，这会带来一些性能开销
2. **内存开销**：智能指针本身需要一些额外的内存（特别是`std::shared_ptr`，它需要存储引用计数）
3. **虚函数调用开销**：`std::shared_ptr`的删除器可能需要通过虚函数调用

在性能关键的代码中，可能需要权衡使用智能指针的便利性和性能开销。但在大多数情况下，智能指针的性能开销是可以接受的，而且它们带来的安全性和便利性远远超过了这些开销。

## 练习时间

让我们来做一些练习，巩固一下这节课所学的知识：

1. 使用`std::unique_ptr`管理动态分配的对象
2. 使用`std::shared_ptr`共享对象的所有权
3. 使用`std::weak_ptr`解决循环引用问题
4. 实现一个自定义删除器
5. 比较使用原始指针和智能指针的代码安全性
6. 分析并修复一个包含内存管理问题的程序

## 小结

在这节课中，我们学习了C++的智能指针，包括：

- C++中常见的内存管理问题（内存泄漏、悬挂指针、重复释放等）
- 三种主要的智能指针：`std::unique_ptr`、`std::shared_ptr`和`std::weak_ptr`
- 每种智能指针的特点、用法和适用场景
- 如何创建、使用、重置和释放智能指针
- 智能指针的最佳实践
- 自定义删除器的实现和使用
- 智能指针的性能考虑

智能指针是C++自动内存管理的重要工具，它们可以帮助我们避免内存管理问题，提高程序的安全性和可靠性。通过理解和应用智能指针，我们可以编写出更健壮、更易维护的C++程序。在下一节课中，我们将学习C++的现代特性，这是C++11及以后版本引入的一系列新特性！
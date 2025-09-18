# C++智能指针

智能指针是C++11引入的一种管理动态内存的工具，它可以自动管理内存的分配和释放，避免内存泄漏。智能指针实际上是一个类模板，它封装了原始指针，并提供了自动内存管理功能。

在C++中，内存管理是一个常见的问题。如果我们忘记释放动态分配的内存，就会导致内存泄漏；如果我们释放了已经释放的内存，就会导致未定义行为。智能指针可以帮助我们解决这些问题。

## 智能指针的类型

C++标准库提供了三种智能指针：`std::unique_ptr`、`std::shared_ptr`和`std::weak_ptr`。它们都定义在`<memory>`头文件中。

### std::unique_ptr

`std::unique_ptr`是一种独占所有权的智能指针，同一时间只能有一个`unique_ptr`指向一个对象。当`unique_ptr`离开作用域时，它所指向的对象会被自动删除。

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

`std::unique_ptr`的主要特点：
- 独占所有权，不能复制，只能移动
- 当`unique_ptr`被销毁时，它所管理的对象也会被销毁
- 使用`std::make_unique`（C++14）创建`unique_ptr`更加安全和高效

### 1.2 std::shared_ptr

`std::shared_ptr`是一种共享所有权的智能指针，多个`shared_ptr`可以指向同一个对象，当最后一个`shared_ptr`离开作用域时，对象才会被销毁。`shared_ptr`通过引用计数（reference counting）来跟踪有多少个指针指向同一个对象。

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

`std::shared_ptr`的主要特点：
- 共享所有权，可以被复制多次
- 使用引用计数跟踪对象的引用数量
- 当引用计数为0时，对象会被自动销毁
- 使用`std::make_shared`创建`shared_ptr`更加安全和高效

### 1.3 std::weak_ptr

`std::weak_ptr`是一种不增加引用计数的智能指针，它指向由`shared_ptr`管理的对象，但不会增加对象的引用计数。`weak_ptr`主要用于解决`shared_ptr`可能导致的循环引用问题。

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

`std::weak_ptr`的主要特点：
- 不增加引用计数，不会影响对象的生命周期
- 不能直接访问对象，必须先转换为`shared_ptr`
- 使用`lock()`方法获取一个指向对象的`shared_ptr`
- 主要用于解决循环引用问题

## 2. 避免内存泄漏

智能指针可以帮助我们避免内存泄漏，但前提是我们正确使用它们。下面是一些常见的导致内存泄漏的情况及如何避免它们。

### 2.1 循环引用问题

循环引用是指两个或多个对象相互持有对方的`shared_ptr`，导致它们的引用计数永远不会降为0，从而导致内存泄漏。

```cpp
#include <iostream>
#include <memory>

class B;  // 前向声明

class A {
public:
    std::shared_ptr<B> b_ptr;  // 循环引用
    
    A() { std::cout << "A创建" << std::endl; }
    ~A() { std::cout << "A销毁" << std::endl; }
};

class B {
public:
    std::shared_ptr<A> a_ptr;  // 循环引用
    
    B() { std::cout << "B创建" << std::endl; }
    ~B() { std::cout << "B销毁" << std::endl; }
};

int main() {
    {
        auto a = std::make_shared<A>();
        auto b = std::make_shared<B>();
        
        // 建立相互引用
        a->b_ptr = b;
        b->a_ptr = a;
        
        // 引用计数都为2
        std::cout << "a的引用计数：" << a.use_count() << std::endl;
        std::cout << "b的引用计数：" << b.use_count() << std::endl;
    }
    
    // 离开作用域后，a和b的引用计数都减为1，而不是0
    // 因此，它们的析构函数不会被调用，导致内存泄漏
    std::cout << "离开作用域，但对象没有被销毁" << std::endl;
    
    return 0;
}
```

解决循环引用问题的方法是使用`weak_ptr`：

```cpp
#include <iostream>
#include <memory>

class B;  // 前向声明

class A {
public:
    std::weak_ptr<B> b_ptr;  // 使用weak_ptr
    
    A() { std::cout << "A创建" << std::endl; }
    ~A() { std::cout << "A销毁" << std::endl; }
};

class B {
public:
    std::shared_ptr<A> a_ptr;
    
    B() { std::cout << "B创建" << std::endl; }
    ~B() { std::cout << "B销毁" << std::endl; }
};

int main() {
    {
        auto a = std::make_shared<A>();
        auto b = std::make_shared<B>();
        
        a->b_ptr = b;  // weak_ptr不会增加引用计数
        b->a_ptr = a;
        
        std::cout << "a的引用计数：" << a.use_count() << std::endl;  // 输出：2
        std::cout << "b的引用计数：" << b.use_count() << std::endl;  // 输出：1
    }
    
    // 离开作用域后，对象会被正确销毁
    std::cout << "离开作用域，对象被销毁" << std::endl;
    
    return 0;
}
```

### 2.2 不要混合使用原始指针和智能指针

混合使用原始指针和智能指针可能导致重复释放同一块内存或内存泄漏。

```cpp
#include <iostream>
#include <memory>

class Resource {
public:
    Resource() { std::cout << "Resource创建" << std::endl; }
    ~Resource() { std::cout << "Resource销毁" << std::endl; }
};

int main() {
    // 不好的做法：混合使用原始指针和智能指针
    Resource* raw = new Resource();
    std::shared_ptr<Resource> smart(raw);  // smart现在管理raw指向的内存
    
    // 错误：手动删除了smart正在管理的内存
    // delete raw;  // 这会导致重复释放，程序崩溃
    
    // 正确的做法：要么完全使用原始指针，要么完全使用智能指针
    // 方式1：完全使用原始指针
    Resource* ptr1 = new Resource();
    // ... 使用ptr1
    delete ptr1;  // 手动释放
    
    // 方式2：完全使用智能指针
    auto ptr2 = std::make_shared<Resource>();
    // ... 使用ptr2
    // 不需要手动释放，智能指针会自动处理
    
    return 0;
}
```

### 2.3 避免悬空指针

悬空指针（dangling pointer）是指指向已经释放的内存的指针。智能指针可以帮助我们避免悬空指针问题。

```cpp
#include <iostream>
#include <memory>

int main() {
    // 不好的做法：使用原始指针可能导致悬空指针
    int* raw_ptr = new int(42);
    delete raw_ptr;  // 释放内存
    // raw_ptr现在是悬空指针
    // std::cout << *raw_ptr << std::endl;  // 未定义行为
    
    // 正确的做法：使用智能指针
    std::shared_ptr<int> smart_ptr = std::make_shared<int>(42);
    
    // 即使其他地方释放了内存，智能指针也会安全地处理
    auto another_ptr = smart_ptr;
    smart_ptr.reset();  // 释放smart_ptr对内存的所有权
    
    // another_ptr仍然有效，因为它还持有对内存的引用
    std::cout << "值：" << *another_ptr << std::endl;  // 输出：42
    
    return 0;
}
```

## 3. 智能指针的最佳实践

### 3.1 优先使用`std::make_unique`和`std::make_shared`

使用`std::make_unique`（C++14）和`std::make_shared`创建智能指针更加安全和高效：
- 它们可以避免内存泄漏（特别是在异常发生时）
- 它们通常比直接使用`new`更高效（`make_shared`可以减少内存分配次数）

```cpp
// 不好的做法：直接使用new
std::shared_ptr<Resource> ptr1(new Resource());

// 好的做法：使用make_shared
auto ptr2 = std::make_shared<Resource>();

// C++14及以上：使用make_unique
auto ptr3 = std::make_unique<Resource>();
```

### 3.2 优先使用`std::unique_ptr`

如果不需要共享所有权，应该优先使用`std::unique_ptr`而不是`std::shared_ptr`：
- `unique_ptr`比`shared_ptr`更轻量级（不需要引用计数）
- `unique_ptr`明确表达了独占所有权的意图

```cpp
// 不好的做法：不必要地使用shared_ptr
std::shared_ptr<Resource> ptr1 = std::make_shared<Resource>();

// 好的做法：使用unique_ptr表示独占所有权
auto ptr2 = std::make_unique<Resource>();
```

### 3.3 只有在需要共享所有权时才使用`std::shared_ptr`

`std::shared_ptr`应该只在确实需要共享对象所有权时使用：

```cpp
#include <iostream>
#include <memory>
#include <vector>

class Resource {
public:
    Resource(int id) : id_(id) {
        std::cout << "Resource " << id_ << " 创建" << std::endl;
    }
    
    ~Resource() {
        std::cout << "Resource " << id_ << " 销毁" << std::endl;
    }
    
    int getId() const { return id_; }
    
private:
    int id_;
};

int main() {
    // 共享所有权的情况：多个对象需要访问同一份资源
    std::vector<std::shared_ptr<Resource>> resources;
    
    // 创建一个共享资源
    auto shared_resource = std::make_shared<Resource>(42);
    
    // 将共享资源添加到多个容器中
    resources.push_back(shared_resource);
    
    // 即使original_resource离开作用域，资源仍然存在
    // 因为resources容器中还有对它的引用
    
    return 0;
}
```

### 3.4 使用`std::weak_ptr`解决循环引用问题

如前所述，`std::weak_ptr`可以用于解决`std::shared_ptr`的循环引用问题：

```cpp
#include <iostream>
#include <memory>

class Node {
public:
    std::string value;
    std::vector<std::weak_ptr<Node>> children;  // 使用weak_ptr避免循环引用
    
    Node(const std::string& val) : value(val) {
        std::cout << "Node " << value << " 创建" << std::endl;
    }
    
    ~Node() {
        std::cout << "Node " << value << " 销毁" << std::endl;
    }
    
    void addChild(std::shared_ptr<Node> child) {
        children.push_back(child);
    }
    
    void printChildren() {
        std::cout << "Node " << value << " 的子节点：" << std::endl;
        for (const auto& weak_child : children) {
            if (auto child = weak_child.lock()) {  // 检查对象是否仍然存在
                std::cout << "- " << child->value << std::endl;
            } else {
                std::cout << "- 已销毁的节点" << std::endl;
            }
        }
    }
};

int main() {
    auto root = std::make_shared<Node>("root");
    auto child1 = std::make_shared<Node>("child1");
    auto child2 = std::make_shared<Node>("child2");
    
    // 建立树结构
    root->addChild(child1);
    root->addChild(child2);
    
    // 打印子节点
    root->printChildren();
    
    // 即使离开作用域，所有节点都会被正确销毁
    return 0;
}
```

## 4. 练习与实践

### 4.1 基础练习

1. 实现一个简单的`Person`类，使用`std::unique_ptr`管理`Person`对象。

```cpp
#include <iostream>
#include <memory>
#include <string>

class Person {
public:
    Person(const std::string& name, int age) : name_(name), age_(age) {
        std::cout << "Person " << name_ << " 创建" << std::endl;
    }
    
    ~Person() {
        std::cout << "Person " << name_ << " 销毁" << std::endl;
    }
    
    void introduce() const {
        std::cout << "你好，我是" << name_ << "，今年" << age_ << "岁。" << std::endl;
    }
    
private:
    std::string name_;
    int age_;
};

int main() {
    // 使用unique_ptr管理Person对象
    auto person1 = std::make_unique<Person>("张三", 25);
    person1->introduce();
    
    // 测试移动语义
    auto person2 = std::move(person1);
    person2->introduce();
    
    if (person1 == nullptr) {
        std::cout << "person1现在为空" << std::endl;
    }
    
    return 0;
}
```

2. 实现一个简单的图书管理系统，使用`std::shared_ptr`管理图书对象。

### 4.2 进阶挑战

1. 实现一个简单的树结构，使用`std::shared_ptr`和`std::weak_ptr`管理节点，避免循环引用问题。

2. 使用智能指针重构一个存在内存泄漏问题的程序。

## 5. 小结

智能指针是C++中管理动态内存的强大工具，它们可以帮助我们避免内存泄漏和其他内存相关的错误。本章我们学习了：

- 三种智能指针的基本概念和用法：`std::unique_ptr`、`std::shared_ptr`和`std::weak_ptr`
- 如何使用智能指针避免内存泄漏
- 智能指针的最佳实践
- 如何解决循环引用问题

在现代C++编程中，我们应该尽可能使用智能指针而不是原始指针来管理动态内存，这样可以使我们的程序更加健壮和可维护。
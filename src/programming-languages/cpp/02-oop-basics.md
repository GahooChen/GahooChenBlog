# 面向对象编程基础：C++的核心特性

面向对象编程（OOP）是C++的核心特性之一，它与C语言的过程式编程有着本质的区别。本章将介绍C++的面向对象编程基础，包括类和对象、封装、继承和多态等概念，帮助你理解和掌握C++的这一核心特性。

## 类和对象：面向对象编程的基本单位

### 什么是类和对象？

- **类（Class）**：是一种用户自定义的数据类型，它定义了对象的属性（数据）和行为（方法）
- **对象（Object）**：是类的实例，是具体存在的实体

如果你学习过C语言的结构体（struct），那么类可以看作是结构体的增强版，它不仅包含数据，还包含操作这些数据的函数。

### 类的定义

让我们定义一个简单的`Person`类：

```cpp
#include <string>

// Person类的定义
class Person {
private:  // 私有成员，只能在类内部访问
    std::string name;  // 属性：姓名
    int age;           // 属性：年龄
    
public:   // 公共成员，可以在类外部访问
    // 构造函数：用于创建对象时初始化
    Person() {  // 默认构造函数
        name = "Unknown";
        age = 0;
    }
    
    Person(std::string n, int a) {  // 带参数的构造函数
        name = n;
        age = a;
    }
    
    // 成员函数：操作类的属性
    void setName(std::string n) {
        name = n;
    }
    
    void setAge(int a) {
        if (a >= 0) {  // 数据验证
            age = a;
        }
    }
    
    std::string getName() {
        return name;
    }
    
    int getAge() {
        return age;
    }
    
    void introduce() {
        std::cout << "大家好，我叫" << name << "，今年" << age << "岁。" << std::endl;
    }
    
    // 析构函数：对象销毁时自动调用
    ~Person() {
        // 清理资源的代码
    }
};
```

### 1.3 对象的创建和使用

现在让我们创建并使用`Person`类的对象：

```cpp
#include <iostream>
#include <string>

// 假设上面的Person类定义在这里

int main() {
    // 使用默认构造函数创建对象
    Person person1;
    person1.introduce();  // 输出：大家好，我叫Unknown，今年0岁。
    
    // 使用带参数的构造函数创建对象
    Person person2("张三", 25);
    person2.introduce();  // 输出：大家好，我叫张三，今年25岁。
    
    // 使用成员函数修改对象的属性
    person1.setName("李四");
    person1.setAge(30);
    person1.introduce();  // 输出：大家好，我叫李四，今年30岁。
    
    // 使用成员函数获取对象的属性
    std::cout << "person2的名字是：" << person2.getName() << std::endl;
    std::cout << "person2的年龄是：" << person2.getAge() << std::endl;
    
    return 0;
}
```

## 2. 封装：保护数据和实现细节

封装是面向对象编程的第一个重要特性，它指的是将数据和操作数据的函数封装在一个类中，并控制对数据的访问权限。

### 2.1 访问控制符

C++提供了三种访问控制符：

- **private**：私有成员，只能在类内部访问
- **protected**：保护成员，可以在类内部和派生类中访问
- **public**：公共成员，可以在任何地方访问

```cpp
class MyClass {
private:
    // 私有成员，只有类内部可以访问
    int privateVar;
    void privateMethod() {}
    
protected:
    // 保护成员，类内部和派生类可以访问
    int protectedVar;
    void protectedMethod() {}
    
public:
    // 公共成员，任何地方都可以访问
    int publicVar;
    void publicMethod() {}
};
```

### 2.2 封装的好处

1. **数据隐藏**：保护类的内部实现细节
2. **提高安全性**：防止外部代码随意修改类的内部数据
3. **提高代码的可维护性**：可以在不影响外部代码的情况下修改类的内部实现

## 3. 继承：代码复用的利器

继承是面向对象编程的第二个重要特性，它允许我们创建一个新类，并从已有的类继承属性和方法。

### 3.1 继承的基本语法

```cpp
// 基类（父类）
class Animal {
protected:
    std::string name;
    
public:
    Animal(std::string n) : name(n) {}
    
    void eat() {
        std::cout << name << "正在吃东西。" << std::endl;
    }
    
    virtual void makeSound() {  // 虚函数，用于多态
        std::cout << name << "发出声音。" << std::endl;
    }
};

// 派生类（子类），继承自Animal
class Dog : public Animal {
public:
    // 调用基类的构造函数来初始化基类的成员
    Dog(std::string n) : Animal(n) {}
    
    // 重写基类的方法
    void makeSound() override {
        std::cout << name << "汪汪叫。" << std::endl;
    }
    
    // 派生类特有的方法
    void fetch() {
        std::cout << name << "正在捡球。" << std::endl;
    }
};

// 另一个派生类
class Cat : public Animal {
public:
    Cat(std::string n) : Animal(n) {}
    
    void makeSound() override {
        std::cout << name << "喵喵叫。" << std::endl;
    }
    
    void climb() {
        std::cout << name << "正在爬树。" << std::endl;
    }
};
```

### 3.2 继承的类型

C++支持三种继承方式：

- **public继承**：基类的public成员在派生类中仍是public，protected成员仍是protected，private成员不可访问
- **protected继承**：基类的public和protected成员在派生类中都是protected，private成员不可访问
- **private继承**：基类的public和protected成员在派生类中都是private，private成员不可访问

在实际开发中，public继承是最常用的。

### 3.3 继承的使用

```cpp
#include <iostream>
#include <string>

// 假设上面的Animal、Dog和Cat类定义在这里

int main() {
    // 创建基类对象
    Animal animal("动物");
    animal.eat();         // 输出：动物正在吃东西。
    animal.makeSound();   // 输出：动物发出声音。
    
    // 创建派生类对象
    Dog dog("小狗");
    dog.eat();            // 输出：小狗正在吃东西。（继承自Animal）
    dog.makeSound();      // 输出：小狗汪汪叫。（重写了Animal的方法）
    dog.fetch();          // 输出：小狗正在捡球。（Dog特有的方法）
    
    Cat cat("小猫");
    cat.eat();            // 输出：小猫正在吃东西。（继承自Animal）
    cat.makeSound();      // 输出：小猫喵喵叫。（重写了Animal的方法）
    cat.climb();          // 输出：小猫正在爬树。（Cat特有的方法）
    
    return 0;
}
```

## 4. 多态：同一个接口，不同的实现

多态是面向对象编程的第三个重要特性，它允许使用基类的指针或引用来指向派生类的对象，并根据对象的实际类型来调用相应的方法。

### 4.1 虚函数和重写

要实现多态，需要在基类中使用虚函数（virtual function），并在派生类中重写（override）这些虚函数。

```cpp
#include <iostream>
#include <string>

// 假设上面的Animal、Dog和Cat类定义在这里

int main() {
    // 创建基类指针
    Animal* animals[3];
    
    // 基类指针指向不同的派生类对象
    animals[0] = new Animal("动物");
    animals[1] = new Dog("小狗");
    animals[2] = new Cat("小猫");
    
    // 通过基类指针调用虚函数，会根据对象的实际类型调用相应的方法
    for (int i = 0; i < 3; i++) {
        animals[i]->makeSound();  // 多态的体现
    }
    
    // 释放内存
    for (int i = 0; i < 3; i++) {
        delete animals[i];
    }
    
    return 0;
}
```

输出结果：
```
动物发出声音。
小狗汪汪叫。
小猫喵喵叫。
```

### 4.2 纯虚函数和抽象类

如果一个类包含至少一个纯虚函数，那么这个类就是抽象类，不能直接实例化。

```cpp
// 抽象类
class Shape {
public:
    // 纯虚函数（没有实现）
    virtual double calculateArea() const = 0;
    
    // 虚析构函数
    virtual ~Shape() {}
};

// 派生类必须实现纯虚函数
class Circle : public Shape {
private:
    double radius;
    
public:
    Circle(double r) : radius(r) {}
    
    double calculateArea() const override {
        return 3.14159 * radius * radius;
    }
};

class Rectangle : public Shape {
private:
    double width;
    double height;
    
public:
    Rectangle(double w, double h) : width(w), height(h) {}
    
    double calculateArea() const override {
        return width * height;
    }
};
```

## 5. 构造函数和析构函数的进阶

### 5.1 构造函数的初始化列表

构造函数的初始化列表可以更高效地初始化成员变量：

```cpp
class Person {
private:
    std::string name;
    int age;
    
public:
    // 使用初始化列表
    Person(std::string n, int a) : name(n), age(a) {}
};
```

### 5.2 拷贝构造函数和赋值运算符

C++提供了默认的拷贝构造函数和赋值运算符，但在某些情况下，我们需要自己实现它们（例如，当类包含动态分配的内存时）。

```cpp
class MyString {
private:
    char* data;
    
public:
    // 构造函数
    MyString(const char* str = nullptr) {
        if (str) {
            data = new char[strlen(str) + 1];
            strcpy(data, str);
        } else {
            data = new char[1];
            *data = '\0';
        }
    }
    
    // 拷贝构造函数
    MyString(const MyString& other) {
        data = new char[strlen(other.data) + 1];
        strcpy(data, other.data);
    }
    
    // 赋值运算符
    MyString& operator=(const MyString& other) {
        if (this != &other) {  // 自赋值检查
            delete[] data;
            data = new char[strlen(other.data) + 1];
            strcpy(data, other.data);
        }
        return *this;
    }
    
    // 析构函数
    ~MyString() {
        delete[] data;
    }
};
```

## 6. 练习与实践

### 6.1 基础练习

1. 定义一个`Student`类，包含姓名、学号和成绩等属性，以及相应的设置和获取方法。
2. 创建一个`Shape`基类和`Circle`、`Rectangle`派生类，实现多态。

### 6.2 进阶挑战

设计一个简单的银行账户系统，包含以下类：
- `Account`：基类，包含账户余额和基本的存取款方法
- `SavingsAccount`：储蓄账户，继承自Account，有利息计算功能
- `CheckingAccount`：支票账户，继承自Account，有透支功能

## 7. 小结

面向对象编程是C++的核心特性，本章我们学习了：

- 类和对象的基本概念
- 封装的原理和实现
- 继承的语法和使用
- 多态的实现机制（虚函数、重写、纯虚函数）
- 构造函数和析构函数的进阶用法

掌握面向对象编程可以帮助你编写更加模块化、可维护和可扩展的代码。下一章，我们将学习C++的模板和标准模板库（STL），这是C++提供的另一个强大特性。
# 类与对象基础：C++面向对象编程的起点

在上一节课中，我们学习了C++在函数方面的增强特性。在这节课中，我们将开始学习C++最重要的特性——面向对象编程（OOP），特别是类和对象的基本概念和使用方法。

## 什么是面向对象编程？

面向对象编程（Object-Oriented Programming，简称OOP）是一种编程范式，它使用"对象"来设计应用程序和计算机程序。面向对象编程的主要特点包括：

- **封装**：将数据和方法封装在一个单元（类）中
- **继承**：允许创建新类，继承现有类的属性和方法
- **多态**：允许不同的对象对同一消息作出不同的响应
- **抽象**：关注对象的本质特征，忽略非本质细节

## 类与对象的概念

在C++中，类（Class）是一种用户自定义的数据类型，它定义了对象的属性（数据）和行为（方法）。对象（Object）是类的一个实例。

可以把类想象成一个"蓝图"或"模板"，而对象则是根据这个蓝图创建出来的具体实例。例如，我们可以定义一个"汽车"类，然后根据这个类创建出不同的汽车对象。

## 定义类

在C++中，我们使用`class`关键字来定义一个类。类的定义通常包含两个部分：

1. **成员变量**：表示对象的属性或状态
2. **成员函数**：表示对象的行为或操作

下面是一个简单的`Person`类的定义：

```cpp
#include <iostream>
#include <string>

// 定义Person类
class Person {
private:
    // 成员变量（属性）
    std::string name;
    int age;
    std::string address;
    
public:
    // 成员函数（行为）
    void set_name(std::string n) {
        name = n;
    }
    
    void set_age(int a) {
        age = a;
    }
    
    void set_address(std::string addr) {
        address = addr;
    }
    
    void display_info() {
        std::cout << "Name: " << name << std::endl;
        std::cout << "Age: " << age << std::endl;
        std::cout << "Address: " << address << std::endl;
    }
};
```

## 创建和使用对象

定义了类之后，我们就可以创建该类的对象，并通过对象来访问类的成员。

```cpp
int main() {
    // 创建Person类的对象
    Person person1;
    Person person2;
    
    // 使用成员函数设置对象的属性
    person1.set_name("Tom");
    person1.set_age(20);
    person1.set_address("Beijing");
    
    person2.set_name("Jerry");
    person2.set_age(22);
    person2.set_address("Shanghai");
    
    // 使用成员函数显示对象的信息
    std::cout << "Person 1 Information:" << std::endl;
    person1.display_info();
    
    std::cout << "\nPerson 2 Information:" << std::endl;
    person2.display_info();
    
    return 0;
}
```

## 访问控制

在C++中，类的成员可以有不同的访问权限，通过`public`、`private`和`protected`关键字来控制：

- **public**：公有的成员可以在任何地方被访问
- **private**：私有的成员只能在类的内部被访问
- **protected**：受保护的成员可以在类的内部和派生类中被访问

```cpp
class MyClass {
public:
    // 公有成员，可以在任何地方访问
    int public_var;
    void public_method() {}
    
private:
    // 私有成员，只能在类内部访问
    int private_var;
    void private_method() {}
    
protected:
    // 受保护成员，可以在类内部和派生类中访问
    int protected_var;
    void protected_method() {}
};
```

## 类的定义和实现分离

在实际开发中，我们通常将类的定义（声明）放在头文件（.h或.hpp）中，而将类的成员函数的实现放在源文件（.cpp）中。

### 头文件：Person.h

```cpp
#ifndef PERSON_H
#define PERSON_H

#include <string>

class Person {
private:
    std::string name;
    int age;
    std::string address;
    
public:
    void set_name(std::string n);
    void set_age(int a);
    void set_address(std::string addr);
    void display_info();
};

#endif // PERSON_H
```

### 源文件：Person.cpp

```cpp
#include "Person.h"
#include <iostream>

void Person::set_name(std::string n) {
    name = n;
}

void Person::set_age(int a) {
    age = a;
}

void Person::set_address(std::string addr) {
    address = addr;
}

void Person::display_info() {
    std::cout << "Name: " << name << std::endl;
    std::cout << "Age: " << age << std::endl;
    std::cout << "Address: " << address << std::endl;
}
```

### 主文件：main.cpp

```cpp
#include "Person.h"

int main() {
    Person person;
    person.set_name("Mike");
    person.set_age(25);
    person.set_address("Guangzhou");
    person.display_info();
    
    return 0;
}
```

## 构造函数和析构函数

类的特殊成员函数，将在下一节课中详细介绍。

## C++的结构体

C++中的结构体（struct）与类非常相似，唯一的区别是默认的访问权限不同：

- 在类中，默认的访问权限是`private`
- 在结构体中，默认的访问权限是`public`

```cpp
// 类的默认访问权限是private
class MyClass {
    int x;  // private by default
public:
    int y;  // public
};

// 结构体的默认访问权限是public
struct MyStruct {
    int x;  // public by default
private:
    int y;  // private
};
```

## 练习时间

让我们来做一些练习，巩固一下这节课所学的知识：

1. 定义一个`Car`类，包含品牌、型号、颜色等属性，以及启动、停止、加速等方法
2. 创建多个`Car`对象，并使用它们的方法
3. 尝试将类的定义和实现分离到不同的文件中
4. 比较C++中的`class`和`struct`的区别

## 小结

在这节课中，我们学习了C++面向对象编程的基础概念：

- 面向对象编程的基本概念
- 类与对象的定义和使用
- 访问控制（public、private、protected）
- 类的定义和实现分离
- C++中类与结构体的区别

类和对象是C++面向对象编程的基础，掌握它们对于学习更高级的面向对象特性（如继承、多态等）至关重要。在下一节课中，我们将学习类的构造函数和析构函数，这是类的两个特殊成员函数！
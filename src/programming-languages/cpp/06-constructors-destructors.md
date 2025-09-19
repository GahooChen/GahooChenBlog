# 构造函数与析构函数：对象的生命周期管理

在上一节课中，我们学习了C++类和对象的基本概念。在这节课中，我们将深入了解类的两个特殊成员函数：构造函数和析构函数，它们负责对象的创建和销毁过程。

## 构造函数

构造函数是一种特殊的成员函数，当创建类的对象时，它会自动被调用。构造函数的主要作用是初始化对象的成员变量。

### 构造函数的特点

- 构造函数的名称与类名相同
- 构造函数没有返回类型
- 构造函数可以被重载
- 创建对象时自动调用

### 默认构造函数

如果一个类没有定义任何构造函数，编译器会自动生成一个默认构造函数。默认构造函数没有参数，不做任何操作。

```cpp
#include <iostream>
#include <string>

class Person {
private:
    std::string name;
    int age;
    
public:
    // 默认构造函数
    Person() {
        name = "Unknown";
        age = 0;
        std::cout << "Default constructor called" << std::endl;
    }
    
    void display_info() {
        std::cout << "Name: " << name << std::endl;
        std::cout << "Age: " << age << std::endl;
    }
};

int main() {
    Person person;  // 调用默认构造函数
    person.display_info();
    
    return 0;
}
```

### 带参数的构造函数

我们可以定义带参数的构造函数，以便在创建对象时直接初始化对象的成员变量。

```cpp
#include <iostream>
#include <string>

class Person {
private:
    std::string name;
    int age;
    
public:
    // 默认构造函数
    Person() {
        name = "Unknown";
        age = 0;
        std::cout << "Default constructor called" << std::endl;
    }
    
    // 带参数的构造函数
    Person(std::string n, int a) {
        name = n;
        age = a;
        std::cout << "Parameterized constructor called" << std::endl;
    }
    
    void display_info() {
        std::cout << "Name: " << name << std::endl;
        std::cout << "Age: " << age << std::endl;
    }
};

int main() {
    Person person1;  // 调用默认构造函数
    Person person2("Tom", 20);  // 调用带参数的构造函数
    
    std::cout << "\nPerson 1 Information:" << std::endl;
    person1.display_info();
    
    std::cout << "\nPerson 2 Information:" << std::endl;
    person2.display_info();
    
    return 0;
}
```

### 构造函数的初始化列表

C++提供了一种更高效的方式来初始化成员变量，称为初始化列表。

```cpp
#include <iostream>
#include <string>

class Person {
private:
    std::string name;
    int age;
    
public:
    // 使用初始化列表的构造函数
    Person(std::string n, int a) : name(n), age(a) {
        std::cout << "Constructor with initialization list called" << std::endl;
    }
    
    void display_info() {
        std::cout << "Name: " << name << std::endl;
        std::cout << "Age: " << age << std::endl;
    }
};

int main() {
    Person person("Jerry", 22);  // 调用带初始化列表的构造函数
    person.display_info();
    
    return 0;
}
```

初始化列表比在构造函数体内赋值更高效，特别是对于复杂类型的成员变量。

## 析构函数

析构函数是另一种特殊的成员函数，当对象被销毁时，它会自动被调用。析构函数的主要作用是清理对象占用的资源。

### 析构函数的特点

- 析构函数的名称是在类名前加上波浪号（~）
- 析构函数没有返回类型，也没有参数
- 析构函数不能被重载
- 对象销毁时自动调用

```cpp
#include <iostream>
#include <string>

class Person {
private:
    std::string name;
    int age;
    char* hobbies;
    
public:
    // 构造函数
    Person(std::string n, int a, const char* h) : name(n), age(a) {
        // 分配内存
        hobbies = new char[strlen(h) + 1];
        strcpy(hobbies, h);
        std::cout << "Constructor called for " << name << std::endl;
    }
    
    // 析构函数
    ~Person() {
        // 释放内存
        delete[] hobbies;
        std::cout << "Destructor called for " << name << std::endl;
    }
    
    void display_info() {
        std::cout << "Name: " << name << std::endl;
        std::cout << "Age: " << age << std::endl;
        std::cout << "Hobbies: " << hobbies << std::endl;
    }
};

int main() {
    {
        Person person("Mike", 25, "Reading, Swimming, Coding");
        person.display_info();
    }  // 这里person对象被销毁，析构函数被调用
    
    std::cout << "Person object has been destroyed" << std::endl;
    
    return 0;
}
```

## 拷贝构造函数

拷贝构造函数是一种特殊的构造函数，用于创建一个新对象，使其成为现有对象的副本。

### 拷贝构造函数的特点

- 拷贝构造函数的名称与类名相同
- 拷贝构造函数只有一个参数，是对同类对象的引用
- 如果没有定义拷贝构造函数，编译器会自动生成一个默认的拷贝构造函数

```cpp
#include <iostream>
#include <string>

class Person {
private:
    std::string name;
    int age;
    
public:
    // 带参数的构造函数
    Person(std::string n, int a) : name(n), age(a) {
        std::cout << "Parameterized constructor called" << std::endl;
    }
    
    // 拷贝构造函数
    Person(const Person& other) : name(other.name), age(other.age) {
        std::cout << "Copy constructor called" << std::endl;
    }
    
    void display_info() {
        std::cout << "Name: " << name << std::endl;
        std::cout << "Age: " << age << std::endl;
    }
};

int main() {
    Person person1("Tom", 20);  // 调用带参数的构造函数
    Person person2 = person1;   // 调用拷贝构造函数
    Person person3(person1);    // 调用拷贝构造函数
    
    std::cout << "\nPerson 1 Information:" << std::endl;
    person1.display_info();
    
    std::cout << "\nPerson 2 Information:" << std::endl;
    person2.display_info();
    
    std::cout << "\nPerson 3 Information:" << std::endl;
    person3.display_info();
    
    return 0;
}
```

## 深拷贝与浅拷贝

当类的成员变量包含指针时，需要特别注意拷贝构造函数的实现。默认的拷贝构造函数只进行浅拷贝，即只复制指针的值，而不复制指针指向的内容。如果需要复制指针指向的内容，就需要自己实现深拷贝。

```cpp
#include <iostream>
#include <cstring>

class String {
private:
    char* data;
    
public:
    // 构造函数
    String(const char* str) {
        if (str) {
            data = new char[strlen(str) + 1];
            strcpy(data, str);
        } else {
            data = new char[1];
            *data = '\0';
        }
        std::cout << "Constructor called" << std::endl;
    }
    
    // 拷贝构造函数（深拷贝）
    String(const String& other) {
        data = new char[strlen(other.data) + 1];
        strcpy(data, other.data);
        std::cout << "Copy constructor called (deep copy)" << std::endl;
    }
    
    // 析构函数
    ~String() {
        delete[] data;
        std::cout << "Destructor called" << std::endl;
    }
    
    const char* get_data() const {
        return data;
    }
};

int main() {
    String str1("Hello, C++!");
    String str2 = str1;  // 调用拷贝构造函数进行深拷贝
    
    std::cout << "str1: " << str1.get_data() << std::endl;
    std::cout << "str2: " << str2.get_data() << std::endl;
    
    return 0;
}
```

## 练习时间

让我们来做一些练习，巩固一下这节课所学的知识：

1. 定义一个`Student`类，包含姓名、学号、成绩等属性，实现默认构造函数、带参数的构造函数和拷贝构造函数
2. 在构造函数中使用初始化列表来初始化成员变量
3. 编写一个包含动态内存分配的类，实现深拷贝的拷贝构造函数和析构函数
4. 观察对象的创建和销毁过程，了解构造函数和析构函数的调用顺序

## 小结

在这节课中，我们学习了C++类的构造函数和析构函数：

- 构造函数的概念、特点和分类
- 默认构造函数、带参数的构造函数和拷贝构造函数
- 构造函数的初始化列表
- 析构函数的概念和作用
- 深拷贝与浅拷贝的区别

构造函数和析构函数是C++类的重要组成部分，它们负责对象的创建和销毁过程，特别是对于管理动态内存的类来说尤为重要。在下一节课中，我们将学习C++面向对象编程的另一个重要特性——继承与多态！
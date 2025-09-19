# 继承与多态：面向对象编程的精髓

在前面的课程中，我们学习了C++类的基本概念、构造函数和析构函数。在这节课中，我们将探讨C++面向对象编程的两个核心概念：继承与多态。

## 继承

继承是一种创建新类的方式，新类可以继承现有类的属性和方法，同时可以添加自己的属性和方法。通过继承，我们可以实现代码的重用和扩展。

### 继承的基本语法

在C++中，继承的基本语法如下：

```cpp
class DerivedClass : access-specifier BaseClass {
    // 派生类的成员
};
```

其中，`access-specifier`可以是`public`、`protected`或`private`，用于控制基类成员在派生类中的访问权限。

```cpp
#include <iostream>
#include <string>

// 基类
class Shape {
protected:
    std::string color;
    
public:
    Shape(std::string c) : color(c) {
        std::cout << "Shape constructor called" << std::endl;
    }
    
    void set_color(std::string c) {
        color = c;
    }
    
    std::string get_color() const {
        return color;
    }
};

// 派生类
class Circle : public Shape {
private:
    double radius;
    
public:
    Circle(std::string c, double r) : Shape(c), radius(r) {
        std::cout << "Circle constructor called" << std::endl;
    }
    
    double calculate_area() const {
        return 3.14159 * radius * radius;
    }
};

int main() {
    Circle circle("Red", 5.0);
    std::cout << "Circle color: " << circle.get_color() << std::endl;
    std::cout << "Circle area: " << circle.calculate_area() << std::endl;
    
    circle.set_color("Blue");
    std::cout << "Updated circle color: " << circle.get_color() << std::endl;
    
    return 0;
}
```

### 访问控制与继承

C++中，基类的成员在派生类中的访问权限由继承方式（`public`、`protected`或`private`）和基类中成员的访问权限共同决定。

| 基类中的访问权限 | public继承 | protected继承 | private继承 |
|----------------|------------|---------------|-------------|
| public         | public     | protected     | private     |
| protected      | protected  | protected     | private     |
| private        | 不可访问    | 不可访问      | 不可访问     |

```cpp
#include <iostream>
#include <string>

class Base {
public:
    int public_var;
    
protected:
    int protected_var;
    
private:
    int private_var;
    
public:
    Base() : public_var(1), protected_var(2), private_var(3) {}
    
    void access_all() {
        std::cout << "public_var: " << public_var << std::endl;
        std::cout << "protected_var: " << protected_var << std::endl;
        std::cout << "private_var: " << private_var << std::endl;
    }
};

class PublicDerived : public Base {
public:
    void access_base_members() {
        std::cout << "public_var: " << public_var << std::endl;        // 可访问
        std::cout << "protected_var: " << protected_var << std::endl;  // 可访问
        // std::cout << "private_var: " << private_var << std::endl;  // 不可访问
    }
};

class ProtectedDerived : protected Base {
public:
    void access_base_members() {
        std::cout << "public_var: " << public_var << std::endl;        // 可访问（现在是protected）
        std::cout << "protected_var: " << protected_var << std::endl;  // 可访问（现在是protected）
        // std::cout << "private_var: " << private_var << std::endl;  // 不可访问
    }
};

class PrivateDerived : private Base {
public:
    void access_base_members() {
        std::cout << "public_var: " << public_var << std::endl;        // 可访问（现在是private）
        std::cout << "protected_var: " << protected_var << std::endl;  // 可访问（现在是private）
        // std::cout << "private_var: " << private_var << std::endl;  // 不可访问
    }
};

int main() {
    PublicDerived pd;
    pd.public_var = 10;  // 可访问
    // pd.protected_var = 20;  // 不可访问
    pd.access_base_members();
    
    ProtectedDerived prd;
    // prd.public_var = 10;  // 不可访问
    prd.access_base_members();
    
    PrivateDerived privd;
    // privd.public_var = 10;  // 不可访问
    privd.access_base_members();
    
    return 0;
}
```

### 多继承

C++允许一个类从多个基类继承，这称为多继承。

```cpp
#include <iostream>
#include <string>

class Person {
protected:
    std::string name;
    int age;
    
public:
    Person(std::string n, int a) : name(n), age(a) {}
    
    void display_person_info() {
        std::cout << "Name: " << name << std::endl;
        std::cout << "Age: " << age << std::endl;
    }
};

class Employee {
protected:
    std::string company;
    double salary;
    
public:
    Employee(std::string c, double s) : company(c), salary(s) {}
    
    void display_employee_info() {
        std::cout << "Company: " << company << std::endl;
        std::cout << "Salary: " << salary << std::endl;
    }
};

// 多继承：Manager同时继承Person和Employee
class Manager : public Person, public Employee {
private:
    std::string department;
    
public:
    Manager(std::string n, int a, std::string c, double s, std::string d) 
        : Person(n, a), Employee(c, s), department(d) {}
    
    void display_manager_info() {
        display_person_info();
        display_employee_info();
        std::cout << "Department: " << department << std::endl;
    }
};

int main() {
    Manager manager("John Doe", 35, "TechCorp", 120000.0, "Engineering");
    manager.display_manager_info();
    
    return 0;
}
```

## 多态

多态是指相同的函数调用可以根据对象的类型产生不同的行为。在C++中，多态主要通过虚函数来实现。

### 虚函数

虚函数是在基类中声明的，允许派生类重新定义的成员函数。

```cpp
#include <iostream>
#include <string>

class Shape {
protected:
    std::string color;
    
public:
    Shape(std::string c) : color(c) {}
    
    // 虚函数
    virtual void draw() const {
        std::cout << "Drawing a shape with color " << color << std::endl;
    }
    
    // 虚析构函数
    virtual ~Shape() {
        std::cout << "Shape destructor called" << std::endl;
    }
};

class Circle : public Shape {
private:
    double radius;
    
public:
    Circle(std::string c, double r) : Shape(c), radius(r) {}
    
    // 重写虚函数
    void draw() const override {
        std::cout << "Drawing a circle with color " << color << " and radius " << radius << std::endl;
    }
    
    ~Circle() {
        std::cout << "Circle destructor called" << std::endl;
    }
};

class Rectangle : public Shape {
private:
    double width;
    double height;
    
public:
    Rectangle(std::string c, double w, double h) : Shape(c), width(w), height(h) {}
    
    // 重写虚函数
    void draw() const override {
        std::cout << "Drawing a rectangle with color " << color 
                  << ", width " << width << " and height " << height << std::endl;
    }
    
    ~Rectangle() {
        std::cout << "Rectangle destructor called" << std::endl;
    }
};

int main() {
    // 使用基类指针指向派生类对象
    Shape* shape1 = new Circle("Red", 5.0);
    Shape* shape2 = new Rectangle("Blue", 10.0, 5.0);
    
    // 多态调用：根据对象的实际类型调用相应的方法
    shape1->draw();  // 调用Circle的draw方法
    shape2->draw();  // 调用Rectangle的draw方法
    
    // 释放内存
    delete shape1;
    delete shape2;
    
    return 0;
}
```

### 纯虚函数和抽象类

纯虚函数是没有实现的虚函数，用`= 0`标记。包含纯虚函数的类称为抽象类，不能直接实例化。

```cpp
#include <iostream>
#include <string>

// 抽象类
class Shape {
protected:
    std::string color;
    
public:
    Shape(std::string c) : color(c) {}
    
    // 纯虚函数
    virtual void draw() const = 0;
    
    // 虚析构函数
    virtual ~Shape() {}
};

class Circle : public Shape {
private:
    double radius;
    
public:
    Circle(std::string c, double r) : Shape(c), radius(r) {}
    
    // 实现纯虚函数
    void draw() const override {
        std::cout << "Drawing a circle with color " << color << " and radius " << radius << std::endl;
    }
};

class Rectangle : public Shape {
private:
    double width;
    double height;
    
public:
    Rectangle(std::string c, double w, double h) : Shape(c), width(w), height(h) {}
    
    // 实现纯虚函数
    void draw() const override {
        std::cout << "Drawing a rectangle with color " << color 
                  << ", width " << width << " and height " << height << std::endl;
    }
};

int main() {
    // Shape shape("Red");  // 错误：不能实例化抽象类
    
    Shape* shape1 = new Circle("Red", 5.0);
    Shape* shape2 = new Rectangle("Blue", 10.0, 5.0);
    
    shape1->draw();
    shape2->draw();
    
    delete shape1;
    delete shape2;
    
    return 0;
}
```

### 虚函数表

C++实现多态的机制是通过虚函数表（vtable）和虚函数指针（vptr）。每个包含虚函数的类都有一个虚函数表，其中存储了该类所有虚函数的地址。每个对象内部包含一个指向虚函数表的指针（vptr）。

## 练习时间

让我们来做一些练习，巩固一下这节课所学的知识：

1. 创建一个基类`Animal`，包含虚函数`make_sound()`和`eat()`
2. 创建几个派生类，如`Dog`、`Cat`、`Bird`等，重写基类的虚函数
3. 使用基类指针指向不同的派生类对象，体验多态
4. 创建一个抽象类`Vehicle`，包含纯虚函数`start()`和`stop()`
5. 实现`Vehicle`的几个具体子类，如`Car`、`Motorcycle`、`Bicycle`等
6. 尝试创建一个多层次的继承体系，例如：`Person` -> `Employee` -> `Manager`

## 小结

在这节课中，我们学习了C++面向对象编程的两个核心概念：继承与多态：

- 继承的基本概念和语法
- 不同的继承方式（public、protected、private）及其对成员访问权限的影响
- 多继承的概念和应用
- 多态的实现机制（虚函数）
- 纯虚函数和抽象类的概念和应用
- 虚函数表的工作原理

继承与多态是C++面向对象编程的精髓，它们使得代码更加灵活、可扩展和可维护。在下一节课中，我们将学习C++的运算符重载和类型转换！
# 运算符重载：让对象支持运算符操作

在之前的课程中，我们学习了C++的继承与多态特性。在这节课中，我们将探讨C++的另一个强大特性——运算符重载，它允许我们为自定义类型定义标准运算符的行为。

## 运算符重载的基本概念

运算符重载是C++的一项特性，它允许我们为自定义类型（如类）重新定义或重载大多数C++运算符。通过运算符重载，我们可以使对象像基本类型一样使用运算符进行操作。

### 运算符重载的语法

运算符重载的语法如下：

```cpp
返回类型 operator运算符(参数列表) {
    // 运算符实现
}
```

例如，我们可以为一个`Complex`类重载加法运算符：

```cpp
#include <iostream>

class Complex {
private:
    double real;
    double imag;
    
public:
    Complex(double r = 0.0, double i = 0.0) : real(r), imag(i) {}
    
    // 重载加法运算符
    Complex operator+(const Complex& other) const {
        return Complex(real + other.real, imag + other.imag);
    }
    
    void display() const {
        std::cout << real << " + " << imag << "i" << std::endl;
    }
};

int main() {
    Complex c1(3.0, 4.0);
    Complex c2(1.0, 2.0);
    Complex c3 = c1 + c2;  // 调用重载的加法运算符
    
    std::cout << "c1: ";
    c1.display();
    
    std::cout << "c2: ";
    c2.display();
    
    std::cout << "c3 (c1 + c2): ";
    c3.display();
    
    return 0;
}
```

## 运算符重载的不同形式

运算符重载可以以成员函数的形式实现，也可以以非成员函数（友元函数）的形式实现。

### 作为成员函数的运算符重载

当运算符重载为类的成员函数时，左操作数是调用该运算符的对象，右操作数是运算符的参数。

```cpp
#include <iostream>
#include <string>

class Vector {
private:
    double x, y, z;
    
public:
    Vector(double x = 0.0, double y = 0.0, double z = 0.0) : x(x), y(y), z(z) {}
    
    // 重载加法运算符（成员函数）
    Vector operator+(const Vector& other) const {
        return Vector(x + other.x, y + other.y, z + other.z);
    }
    
    // 重载减法运算符（成员函数）
    Vector operator-(const Vector& other) const {
        return Vector(x - other.x, y - other.y, z - other.z);
    }
    
    // 重载乘法运算符（标量乘法）
    Vector operator*(double scalar) const {
        return Vector(x * scalar, y * scalar, z * scalar);
    }
    
    void display() const {
        std::cout << "(" << x << ", " << y << ", " << z << ")" << std::endl;
    }
};

int main() {
    Vector v1(1.0, 2.0, 3.0);
    Vector v2(4.0, 5.0, 6.0);
    
    Vector v3 = v1 + v2;  // 调用重载的加法运算符
    Vector v4 = v1 - v2;  // 调用重载的减法运算符
    Vector v5 = v1 * 2.0;  // 调用重载的乘法运算符
    
    std::cout << "v1: ";
    v1.display();
    
    std::cout << "v2: ";
    v2.display();
    
    std::cout << "v3 (v1 + v2): ";
    v3.display();
    
    std::cout << "v4 (v1 - v2): ";
    v4.display();
    
    std::cout << "v5 (v1 * 2): ";
    v5.display();
    
    return 0;
}
```

### 作为友元函数的运算符重载

当运算符重载为友元函数时，它可以访问类的私有成员，并且两个操作数都作为参数传递给函数。

```cpp
#include <iostream>
#include <string>

class Vector {
private:
    double x, y, z;
    
public:
    Vector(double x = 0.0, double y = 0.0, double z = 0.0) : x(x), y(y), z(z) {}
    
    // 重载加法运算符（友元函数）
    friend Vector operator+(const Vector& v1, const Vector& v2) {
        return Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    }
    
    // 重载减法运算符（友元函数）
    friend Vector operator-(const Vector& v1, const Vector& v2) {
        return Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    }
    
    // 重载乘法运算符（友元函数，标量乘法）
    friend Vector operator*(const Vector& v, double scalar) {
        return Vector(v.x * scalar, v.y * scalar, v.z * scalar);
    }
    
    // 重载乘法运算符（友元函数，标量乘法，支持标量在前）
    friend Vector operator*(double scalar, const Vector& v) {
        return Vector(v.x * scalar, v.y * scalar, v.z * scalar);
    }
    
    void display() const {
        std::cout << "(" << x << ", " << y << ", " << z << ")" << std::endl;
    }
};

int main() {
    Vector v1(1.0, 2.0, 3.0);
    Vector v2(4.0, 5.0, 6.0);
    
    Vector v3 = v1 + v2;  // 调用重载的加法运算符
    Vector v4 = v1 - v2;  // 调用重载的减法运算符
    Vector v5 = v1 * 2.0;  // 调用重载的乘法运算符
    Vector v6 = 2.0 * v1;  // 调用重载的乘法运算符（标量在前）
    
    std::cout << "v1: ";
    v1.display();
    
    std::cout << "v2: ";
    v2.display();
    
    std::cout << "v3 (v1 + v2): ";
    v3.display();
    
    std::cout << "v4 (v1 - v2): ";
    v4.display();
    
    std::cout << "v5 (v1 * 2): ";
    v5.display();
    
    std::cout << "v6 (2 * v1): ";
    v6.display();
    
    return 0;
}
```

## 常用运算符的重载

### 关系运算符的重载

我们可以重载关系运算符（如`==`、`!=`、`<`、`>`、`<=`、`>=`），以便比较自定义类型的对象。

```cpp
#include <iostream>
#include <string>

class Student {
private:
    std::string name;
    int score;
    
public:
    Student(std::string n, int s) : name(n), score(s) {}
    
    // 重载相等运算符
    bool operator==(const Student& other) const {
        return score == other.score;
    }
    
    // 重载不等运算符
    bool operator!=(const Student& other) const {
        return !(*this == other);
    }
    
    // 重载小于运算符
    bool operator<(const Student& other) const {
        return score < other.score;
    }
    
    // 重载大于运算符
    bool operator>(const Student& other) const {
        return score > other.score;
    }
    
    // 重载小于等于运算符
    bool operator<=(const Student& other) const {
        return score <= other.score;
    }
    
    // 重载大于等于运算符
    bool operator>=(const Student& other) const {
        return score >= other.score;
    }
    
    void display() const {
        std::cout << "Name: " << name << ", Score: " << score << std::endl;
    }
};

int main() {
    Student s1("Alice", 85);
    Student s2("Bob", 92);
    Student s3("Charlie", 85);
    
    std::cout << "s1 == s2: " << (s1 == s2) << std::endl;
    std::cout << "s1 == s3: " << (s1 == s3) << std::endl;
    std::cout << "s1 != s2: " << (s1 != s2) << std::endl;
    std::cout << "s1 < s2: " << (s1 < s2) << std::endl;
    std::cout << "s1 > s2: " << (s1 > s2) << std::endl;
    std::cout << "s1 <= s3: " << (s1 <= s3) << std::endl;
    std::cout << "s2 >= s3: " << (s2 >= s3) << std::endl;
    
    return 0;
}
```

### 输入输出运算符的重载

我们可以重载输入输出运算符（`<<`和`>>`），以便直接使用`cout`和`cin`与自定义类型的对象交互。

```cpp
#include <iostream>
#include <string>

class Complex {
private:
    double real;
    double imag;
    
public:
    Complex(double r = 0.0, double i = 0.0) : real(r), imag(i) {}
    
    // 重载输出运算符
    friend std::ostream& operator<<(std::ostream& os, const Complex& c) {
        os << c.real << " + " << c.imag << "i";
        return os;
    }
    
    // 重载输入运算符
    friend std::istream& operator>>(std::istream& is, Complex& c) {
        std::cout << "Enter real part: ";
        is >> c.real;
        std::cout << "Enter imaginary part: ";
        is >> c.imag;
        return is;
    }
    
    // 重载加法运算符
    Complex operator+(const Complex& other) const {
        return Complex(real + other.real, imag + other.imag);
    }
};

int main() {
    Complex c1, c2;
    
    std::cout << "Enter first complex number: " << std::endl;
    std::cin >> c1;
    
    std::cout << "\nEnter second complex number: " << std::endl;
    std::cin >> c2;
    
    Complex c3 = c1 + c2;
    
    std::cout << "\nc1: " << c1 << std::endl;
    std::cout << "c2: " << c2 << std::endl;
    std::cout << "c3 (c1 + c2): " << c3 << std::endl;
    
    return 0;
}
```

### 下标运算符的重载

我们可以重载下标运算符（`[]`），使对象可以像数组一样使用下标访问元素。

```cpp
#include <iostream>
#include <string>

class Array {
private:
    int* data;
    int size;
    
public:
    Array(int s) : size(s) {
        data = new int[size];
    }
    
    // 重载下标运算符（用于读取）
    int operator[](int index) const {
        if (index < 0 || index >= size) {
            std::cerr << "Index out of range" << std::endl;
            return 0;  // 实际应用中应该抛出异常
        }
        return data[index];
    }
    
    // 重载下标运算符（用于写入）
    int& operator[](int index) {
        if (index < 0 || index >= size) {
            std::cerr << "Index out of range" << std::endl;
            // 实际应用中应该抛出异常
        }
        return data[index];
    }
    
    int get_size() const {
        return size;
    }
    
    ~Array() {
        delete[] data;
    }
};

int main() {
    Array arr(5);
    
    // 使用重载的下标运算符赋值
    for (int i = 0; i < arr.get_size(); i++) {
        arr[i] = i * 10;
    }
    
    // 使用重载的下标运算符取值
    for (int i = 0; i < arr.get_size(); i++) {
        std::cout << "arr[" << i << "] = " << arr[i] << std::endl;
    }
    
    return 0;
}
```

### 自增自减运算符的重载

自增运算符（`++`）和自减运算符（`--`）有前缀和后缀两种形式，需要以不同的方式重载。

```cpp
#include <iostream>

class Counter {
private:
    int count;
    
public:
    Counter(int c = 0) : count(c) {}
    
    // 前缀自增运算符重载
    Counter& operator++() {
        count++;
        return *this;
    }
    
    // 后缀自增运算符重载（参数int是一个哑元，用于区分前缀和后缀）
    Counter operator++(int) {
        Counter temp = *this;
        count++;
        return temp;
    }
    
    // 前缀自减运算符重载
    Counter& operator--() {
        count--;
        return *this;
    }
    
    // 后缀自减运算符重载
    Counter operator--(int) {
        Counter temp = *this;
        count--;
        return temp;
    }
    
    int get_count() const {
        return count;
    }
};

int main() {
    Counter c(5);
    
    std::cout << "Initial count: " << c.get_count() << std::endl;
    
    // 测试前缀自增
    ++c;
    std::cout << "After prefix increment: " << c.get_count() << std::endl;
    
    // 测试后缀自增
    Counter c1 = c++;  // c1获取的是c自增前的值
    std::cout << "After postfix increment: " << c.get_count() << std::endl;
    std::cout << "c1 count: " << c1.get_count() << std::endl;
    
    // 测试前缀自减
    --c;
    std::cout << "After prefix decrement: " << c.get_count() << std::endl;
    
    // 测试后缀自减
    Counter c2 = c--;  // c2获取的是c自减前的值
    std::cout << "After postfix decrement: " << c.get_count() << std::endl;
    std::cout << "c2 count: " << c2.get_count() << std::endl;
    
    return 0;
}
```

## 不能重载的运算符

并不是所有的C++运算符都可以被重载，以下运算符不能被重载：

- `.`（成员访问运算符）
- `.*`（成员指针访问运算符）
- `::`（作用域解析运算符）
- `? :`（条件运算符）
- `sizeof`（大小运算符）
- `typeid`（类型信息运算符）
- `const_cast`, `dynamic_cast`, `reinterpret_cast`, `static_cast`（类型转换运算符）

## 练习时间

让我们来做一些练习，巩固一下这节课所学的知识：

1. 创建一个`Rational`类表示有理数，重载加法、减法、乘法、除法运算符
2. 为`Rational`类重载输入输出运算符，以便直接使用`cout`和`cin`与对象交互
3. 为`Rational`类重载关系运算符，实现有理数的比较
4. 创建一个`String`类，重载下标运算符`[]`以便访问字符串中的字符
5. 为`String`类重载赋值运算符`=`和连接运算符`+`
6. 创建一个`Matrix`类表示矩阵，重载加法、减法、乘法运算符

## 小结

在这节课中，我们学习了C++的运算符重载特性：

- 运算符重载的基本概念和语法
- 作为成员函数和友元函数的运算符重载
- 常用运算符的重载（算术运算符、关系运算符、输入输出运算符、下标运算符、自增自减运算符等）
- 不能重载的运算符

运算符重载是C++的一项强大特性，它使得自定义类型可以像内置类型一样使用运算符进行操作，从而使代码更加简洁、直观和易于理解。在下一节课中，我们将学习C++的模板编程！
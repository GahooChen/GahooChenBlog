# C++ Lambda表达式

Lambda表达式是C++11引入的一个强大特性，它允许我们在代码中定义匿名函数对象，而不需要显式定义一个函数或函数对象类。Lambda表达式特别适合用于简短的、一次性使用的函数，尤其是在与STL算法一起使用时。

## Lambda表达式的基本语法

Lambda表达式的基本语法如下：

```cpp
[capture list](parameters) -> return_type { function body }
```

其中：
- `capture list`（捕获列表）：指定Lambda表达式可以访问的外部变量及其访问方式
- `parameters`（参数列表）：与普通函数的参数列表类似
- `return_type`（返回类型）：可选，如果省略，编译器会根据return语句自动推导返回类型
- `function body`（函数体）：Lambda表达式的具体实现

### 最简单的Lambda表达式

下面是一个最简单的Lambda表达式示例：

```cpp
#include <iostream>

int main() {
    // 最简单的Lambda表达式：没有参数，没有返回值
    []() {
        std::cout << "Hello, Lambda!" << std::endl;
    }();  // 立即调用Lambda表达式
    
    return 0;
}
```

这个Lambda表达式没有捕获任何外部变量，没有参数，没有返回值，并且在定义后立即被调用。

### 带参数的Lambda表达式

Lambda表达式可以像普通函数一样接受参数：

```cpp
#include <iostream>

int main() {
    // 带参数的Lambda表达式
    auto add = [](int a, int b) {
        return a + b;
    };
    
    int result = add(5, 3);  // 调用Lambda表达式
    std::cout << "5 + 3 = " << result << std::endl;  // 输出：5 + 3 = 8
    
    return 0;
}
```

在这个例子中，我们定义了一个计算两个整数和的Lambda表达式，并将其赋值给变量`add`，然后通过`add(5, 3)`调用它。

### 1.3 显式指定返回类型

如果Lambda表达式的函数体比较复杂，或者有多个return语句，我们可以显式指定返回类型：

```cpp
#include <iostream>

int main() {
    // 显式指定返回类型的Lambda表达式
    auto divide = [](double a, double b) -> double {
        if (b == 0) {
            return 0;
        }
        return a / b;
    };
    
    std::cout << "10.0 / 2.0 = " << divide(10.0, 2.0) << std::endl;  // 输出：10.0 / 2.0 = 5
    std::cout << "10.0 / 0.0 = " << divide(10.0, 0.0) << std::endl;  // 输出：10.0 / 0.0 = 0
    
    return 0;
}
```

这里我们使用了`-> double`来显式指定返回类型为`double`。

## 2. 捕获列表

Lambda表达式的一个重要特性是能够访问其定义所在作用域中的变量，这通过捕获列表实现。捕获列表位于Lambda表达式的开头，用于指定要捕获哪些外部变量以及如何捕获它们（值捕获或引用捕获）。

### 2.1 值捕获

值捕获创建变量的副本，Lambda表达式内部使用的是这个副本，不会影响原始变量：

```cpp
#include <iostream>

int main() {
    int x = 10;
    int y = 20;
    
    // 值捕获x和y
    auto sum = [x, y]() {
        // x = 5;  // 编译错误，值捕获的变量是只读的
        return x + y;
    };
    
    std::cout << "sum = " << sum() << std::endl;  // 输出：sum = 30
    
    // 修改原始变量不影响Lambda表达式中的值
    x = 5;
    y = 15;
    std::cout << "修改后，sum = " << sum() << std::endl;  // 仍然输出：sum = 30
    
    return 0;
}
```

需要注意的是，值捕获的变量在Lambda表达式内部是只读的，不能被修改。如果想要修改值捕获的变量，可以使用`mutable`关键字。

### 2.2 引用捕获

引用捕获使用变量的引用，Lambda表达式内部对变量的修改会影响原始变量：

```cpp
#include <iostream>

int main() {
    int x = 10;
    int y = 20;
    
    // 引用捕获x和y
    auto modify = [&x, &y]() {
        x = 5;
        y = 15;
    };
    
    modify();  // 调用Lambda表达式，修改x和y的值
    
    std::cout << "x = " << x << std::endl;  // 输出：x = 5
    std::cout << "y = " << y << std::endl;  // 输出：y = 15
    
    return 0;
}
```

引用捕获需要特别小心，确保在Lambda表达式执行时，被引用的变量仍然有效，否则会导致悬空引用。

### 2.3 隐式捕获

除了显式列出要捕获的变量外，我们还可以使用隐式捕获，让编译器自动决定捕获哪些变量：

```cpp
#include <iostream>

int main() {
    int x = 10;
    int y = 20;
    
    // 隐式值捕获所有使用的变量
    auto sum = [=]() {
        return x + y;
    };
    
    // 隐式引用捕获所有使用的变量
    auto modify = [&]() {
        x = 5;
        y = 15;
    };
    
    std::cout << "sum = " << sum() << std::endl;  // 输出：sum = 30
    modify();
    std::cout << "修改后，x = " << x << ", y = " << y << std::endl;  // 输出：修改后，x = 5, y = 15
    
    return 0;
}
```

- `[=]`：隐式值捕获所有在Lambda表达式中使用的外部变量
- `[&]`：隐式引用捕获所有在Lambda表达式中使用的外部变量

### 2.4 混合捕获

我们还可以混合使用显式捕获和隐式捕获：

```cpp
#include <iostream>

int main() {
    int x = 10;
    int y = 20;
    int z = 30;
    
    // 隐式值捕获所有变量，但z使用引用捕获
    auto mixed = [=, &z]() {
        z = x + y;  // 可以修改z，因为它是引用捕获的
        return z;
    };
    
    std::cout << "mixed = " << mixed() << std::endl;  // 输出：mixed = 30
    std::cout << "z = " << z << std::endl;  // 输出：z = 30
    
    // 隐式引用捕获所有变量，但x使用值捕获
    auto another_mixed = [&, x]() {
        // x = 5;  // 编译错误，x是值捕获的，不能修改
        y = 25;
        z = 35;
    };
    
    another_mixed();
    std::cout << "x = " << x << ", y = " << y << ", z = " << z << std::endl;  // 输出：x = 10, y = 25, z = 35
    
    return 0;
}
```

需要注意的是，当混合使用显式捕获和隐式捕获时，显式捕获的变量必须使用与隐式捕获不同的捕获方式。例如，如果使用`[=, &z]`，那么`z`必须使用引用捕获，而其他变量使用值捕获；如果使用`[&, x]`，那么`x`必须使用值捕获，而其他变量使用引用捕获。

### 2.5 初始化捕获（C++14）

C++14引入了初始化捕获，允许我们在捕获列表中定义和初始化新变量：

```cpp
#include <iostream>
#include <memory>

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
    // 使用初始化捕获将unique_ptr移动到Lambda表达式中
    auto ptr = std::make_unique<Resource>(42);
    
    auto lambda = [ptr = std::move(ptr)]() {
        std::cout << "访问Resource，ID：" << ptr->getId() << std::endl;
    };
    
    lambda();  // 调用Lambda表达式
    
    // ptr现在为空
    if (!ptr) {
        std::cout << "ptr现在为空" << std::endl;
    }
    
    return 0;
}
```

初始化捕获特别适合用于捕获不能复制但可以移动的对象，如`std::unique_ptr`。

## 3. Lambda表达式与STL算法

Lambda表达式与STL算法配合使用可以极大地简化代码，使代码更加清晰和易于理解。下面我们来看一些常见的示例。

### 3.1 与std::for_each一起使用

`std::for_each`算法用于对容器中的每个元素执行一个操作，与Lambda表达式配合使用非常方便：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    
    // 使用Lambda表达式遍历vector并打印每个元素
    std::for_each(numbers.begin(), numbers.end(), [](int n) {
        std::cout << n << " ";
    });
    std::cout << std::endl;  // 输出：1 2 3 4 5
    
    // 使用Lambda表达式修改每个元素（使其加倍）
    std::for_each(numbers.begin(), numbers.end(), [](int& n) {
        n *= 2;
    });
    
    // 再次遍历并打印修改后的元素
    std::for_each(numbers.begin(), numbers.end(), [](int n) {
        std::cout << n << " ";
    });
    std::cout << std::endl;  // 输出：2 4 6 8 10
    
    return 0;
}
```

### 3.2 与std::find_if一起使用

`std::find_if`算法用于在容器中查找满足特定条件的元素，Lambda表达式可以方便地定义这个条件：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    
    // 查找第一个大于5的元素
    auto it = std::find_if(numbers.begin(), numbers.end(), [](int n) {
        return n > 5;
    });
    
    if (it != numbers.end()) {
        std::cout << "第一个大于5的元素是：" << *it << std::endl;  // 输出：第一个大于5的元素是：6
    }
    
    // 查找第一个偶数
    it = std::find_if(numbers.begin(), numbers.end(), [](int n) {
        return n % 2 == 0;
    });
    
    if (it != numbers.end()) {
        std::cout << "第一个偶数是：" << *it << std::endl;  // 输出：第一个偶数是：2
    }
    
    return 0;
}
```

### 3.3 与std::sort一起使用

`std::sort`算法用于对容器中的元素进行排序，Lambda表达式可以自定义排序规则：

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

struct Person {
    std::string name;
    int age;
};

int main() {
    std::vector<int> numbers = {5, 2, 9, 1, 5, 6};
    
    // 默认排序（升序）
    std::sort(numbers.begin(), numbers.end());
    
    // 打印排序后的结果
    std::cout << "升序排序：";
    for (int n : numbers) {
        std::cout << n << " ";
    }
    std::cout << std::endl;  // 输出：升序排序：1 2 5 5 6 9
    
    // 使用Lambda表达式进行降序排序
    std::sort(numbers.begin(), numbers.end(), [](int a, int b) {
        return a > b;
    });
    
    // 打印排序后的结果
    std::cout << "降序排序：";
    for (int n : numbers) {
        std::cout << n << " ";
    }
    std::cout << std::endl;  // 输出：降序排序：9 6 5 5 2 1
    
    // 对自定义类型进行排序
    std::vector<Person> people = {
        {"张三", 25},
        {"李四", 30},
        {"王五", 20}
    };
    
    // 按年龄排序
    std::sort(people.begin(), people.end(), [](const Person& a, const Person& b) {
        return a.age < b.age;
    });
    
    // 打印排序后的结果
    std::cout << "按年龄排序：" << std::endl;
    for (const auto& person : people) {
        std::cout << "姓名：" << person.name << "，年龄：" << person.age << std::endl;
    }
    
    return 0;
}
```

### 3.4 与std::transform一起使用

`std::transform`算法用于将一个容器中的元素转换为另一个容器中的元素，Lambda表达式可以定义转换规则：

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    std::vector<int> squares(numbers.size());
    
    // 计算每个元素的平方
    std::transform(numbers.begin(), numbers.end(), squares.begin(), [](int n) {
        return n * n;
    });
    
    // 打印结果
    std::cout << "原始数组：";
    for (int n : numbers) {
        std::cout << n << " ";
    }
    std::cout << std::endl;  // 输出：原始数组：1 2 3 4 5
    
    std::cout << "平方数组：";
    for (int n : squares) {
        std::cout << n << " ";
    }
    std::cout << std::endl;  // 输出：平方数组：1 4 9 16 25
    
    // 使用两个输入范围
    std::vector<int> a = {1, 2, 3};
    std::vector<int> b = {4, 5, 6};
    std::vector<int> sum(a.size());
    
    // 计算两个数组对应元素的和
    std::transform(a.begin(), a.end(), b.begin(), sum.begin(), [](int x, int y) {
        return x + y;
    });
    
    // 打印结果
    std::cout << "和数组：";
    for (int n : sum) {
        std::cout << n << " ";
    }
    std::cout << std::endl;  // 输出：和数组：5 7 9
    
    return 0;
}
```

## 4. Lambda表达式的高级用法

### 4.1 作为函数参数

Lambda表达式可以作为参数传递给函数，这使得函数可以接受自定义的行为：

```cpp
#include <iostream>
#include <vector>

// 接受一个Lambda表达式作为参数的函数
void processNumbers(const std::vector<int>& numbers, auto operation) {
    for (int n : numbers) {
        std::cout << operation(n) << " ";
    }
    std::cout << std::endl;
}

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    
    // 传递计算平方的Lambda表达式
    std::cout << "平方：";
    processNumbers(numbers, [](int n) { return n * n; });
    
    // 传递计算立方的Lambda表达式
    std::cout << "立方：";
    processNumbers(numbers, [](int n) { return n * n * n; });
    
    // 传递判断是否为偶数的Lambda表达式
    std::cout << "是否为偶数（1表示是，0表示否）：";
    processNumbers(numbers, [](int n) { return n % 2 == 0 ? 1 : 0; });
    
    return 0;
}
```

### 4.2 作为函数返回值

Lambda表达式也可以作为函数的返回值，这使得函数可以返回自定义的行为：

```cpp
#include <iostream>

// 返回一个Lambda表达式的函数
auto makeMultiplier(int factor) {
    // 捕获factor并返回一个将输入乘以factor的Lambda表达式
    return [factor](int n) {
        return n * factor;
    };
}

int main() {
    // 创建一个将输入乘以2的函数
    auto doubler = makeMultiplier(2);
    std::cout << "5 * 2 = " << doubler(5) << std::endl;  // 输出：5 * 2 = 10
    
    // 创建一个将输入乘以3的函数
    auto tripler = makeMultiplier(3);
    std::cout << "5 * 3 = " << tripler(5) << std::endl;  // 输出：5 * 3 = 15
    
    // 创建一个将输入乘以10的函数
    auto tenTimes = makeMultiplier(10);
    std::cout << "5 * 10 = " << tenTimes(5) << std::endl;  // 输出：5 * 10 = 50
    
    return 0;
}
```

需要注意的是，当Lambda表达式作为返回值时，我们需要特别注意捕获的变量的生命周期，确保在Lambda表达式被调用时，捕获的变量仍然有效。

### 4.3 递归Lambda表达式

Lambda表达式可以递归调用自己，但需要一些特殊处理，因为Lambda表达式在定义时还不知道自己的名字：

```cpp
#include <iostream>
#include <functional>

int main() {
    // 使用std::function来存储递归Lambda表达式
    std::function<int(int)> fibonacci = [&fibonacci](int n) {
        if (n <= 1) {
            return n;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    };
    
    // 计算斐波那契数列的前10个数
    std::cout << "斐波那契数列前10个数：";
    for (int i = 0; i < 10; ++i) {
        std::cout << fibonacci(i) << " ";
    }
    std::cout << std::endl;  // 输出：斐波那契数列前10个数：0 1 1 2 3 5 8 13 21 34
    
    return 0;
}
```

在这个例子中，我们使用`std::function`来存储Lambda表达式，这样Lambda表达式就可以通过引用捕获来访问自己。

### 4.4 泛型Lambda表达式（C++14）

C++14引入了泛型Lambda表达式，允许我们使用`auto`作为参数类型，使Lambda表达式更加灵活：

```cpp
#include <iostream>
#include <string>

int main() {
    // 泛型Lambda表达式，参数类型为auto
    auto print = [](auto value) {
        std::cout << value << std::endl;
    };
    
    // 可以接受不同类型的参数
    print(42);           // 输出：42
    print(3.14);         // 输出：3.14
    print("Hello");       // 输出：Hello
    print(std::string("World"));  // 输出：World
    
    // 泛型Lambda表达式计算两个数的和
    auto add = [](auto a, auto b) {
        return a + b;
    };
    
    std::cout << "1 + 2 = " << add(1, 2) << std::endl;               // 输出：1 + 2 = 3
    std::cout << "1.5 + 2.5 = " << add(1.5, 2.5) << std::endl;       // 输出：1.5 + 2.5 = 4
    std::cout << "Hello + World = " << add("Hello ", "World") << std::endl;  // 输出：Hello + World = Hello World
    
    return 0;
}
```

泛型Lambda表达式特别适合用于编写通用算法和工具函数。

## 5. 练习与实践

### 5.1 基础练习

1. 编写一个Lambda表达式，计算两个整数的最大值。

```cpp
#include <iostream>

int main() {
    // 计算两个整数的最大值的Lambda表达式
    auto max = [](int a, int b) {
        return (a > b) ? a : b;
    };
    
    std::cout << "max(5, 10) = " << max(5, 10) << std::endl;  // 输出：max(5, 10) = 10
    std::cout << "max(15, 8) = " << max(15, 8) << std::endl;  // 输出：max(15, 8) = 15
    
    return 0;
}
```

2. 使用Lambda表达式和`std::sort`对一个字符串数组进行排序。

### 5.2 进阶挑战

1. 实现一个简单的函数式编程库，包括map、filter、reduce等操作，使用Lambda表达式作为参数。

2. 使用递归Lambda表达式实现快速排序算法。

## 6. 小结

Lambda表达式是C++中一个强大而灵活的特性，它允许我们在代码中定义匿名函数对象，使代码更加简洁和清晰。本章我们学习了：

- Lambda表达式的基本语法和用法
- 捕获列表的不同形式和用途
- Lambda表达式与STL算法的配合使用
- Lambda表达式的一些高级用法

在现代C++编程中，Lambda表达式已经成为一种非常常见的编程范式，特别是在与STL算法一起使用时，可以极大地简化代码，提高代码的可读性和可维护性。
# C++ STL算法库：强大的泛型算法工具

上一节课我们学习了C++的命名空间机制，这是一种用于组织代码的有效工具。在这节课中，我们将探讨C++ STL（Standard Template Library）中的算法库，这是一套强大的泛型算法工具，可以大大提高我们的编程效率。

## STL算法库概述

STL算法库是C++标准库中的一个重要组成部分，它提供了大量的泛型算法，可以用于各种容器和数据结构。这些算法大多定义在`<algorithm>`头文件中，有些数值算法定义在`<numeric>`头文件中。

STL算法库的主要特点包括：

1. **泛型性**：这些算法是泛型的，可以用于各种类型的数据和容器
2. **高效性**：这些算法通常是经过精心优化的，性能很高
3. **可扩展性**：我们可以通过函数对象、lambda表达式等来自定义算法的行为
4. **基于迭代器**：这些算法主要通过迭代器来操作数据，而不是直接操作容器

## 算法分类

STL算法库中的算法可以分为以下几类：

1. **非修改性序列操作**：不修改容器中的元素，如查找、计数等
2. **修改性序列操作**：修改容器中的元素，如复制、填充、转换等
3. **排序和相关操作**：对容器中的元素进行排序和相关操作，如排序、二分查找、合并等
4. **数值算法**：进行数值计算，如累加、内积等

## 非修改性序列操作

非修改性序列操作是指不修改容器中元素的算法。这类算法主要用于查找、计数、比较等操作。

### find和find_if

`find`算法用于在序列中查找指定值的元素，`find_if`算法用于在序列中查找满足指定条件的元素。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    
    // 使用find查找值为5的元素
    auto it = std::find(numbers.begin(), numbers.end(), 5);
    if (it != numbers.end()) {
        std::cout << "Found value: " << *it << " at position: " << it - numbers.begin() << std::endl;
    } else {
        std::cout << "Value not found" << std::endl;
    }
    
    // 使用find_if查找第一个大于6的元素
    auto it_if = std::find_if(numbers.begin(), numbers.end(), [](int n) { return n > 6; });
    if (it_if != numbers.end()) {
        std::cout << "Found first value greater than 6: " << *it_if << " at position: " << it_if - numbers.begin() << std::endl;
    } else {
        std::cout << "No value greater than 6 found" << std::endl;
    }
    
    return 0;
}
```

### count和count_if

`count`算法用于计算序列中指定值的元素个数，`count_if`算法用于计算序列中满足指定条件的元素个数。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {1, 2, 3, 2, 5, 2, 7, 8, 2, 10};
    
    // 使用count计算值为2的元素个数
    int count = std::count(numbers.begin(), numbers.end(), 2);
    std::cout << "Number of 2's: " << count << std::endl;
    
    // 使用count_if计算偶数的个数
    int even_count = std::count_if(numbers.begin(), numbers.end(), [](int n) { return n % 2 == 0; });
    std::cout << "Number of even numbers: " << even_count << std::endl;
    
    return 0;
}
```

### all_of、any_of和none_of

`all_of`算法检查序列中是否所有元素都满足指定条件，`any_of`算法检查序列中是否至少有一个元素满足指定条件，`none_of`算法检查序列中是否没有元素满足指定条件。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers1 = {2, 4, 6, 8, 10};
    std::vector<int> numbers2 = {1, 2, 3, 4, 5};
    
    // 检查所有元素是否都是偶数
    bool all_even = std::all_of(numbers1.begin(), numbers1.end(), [](int n) { return n % 2 == 0; });
    std::cout << "All elements in numbers1 are even: " << (all_even ? "true" : "false") << std::endl;
    
    // 检查是否有任何元素是偶数
    bool any_even = std::any_of(numbers2.begin(), numbers2.end(), [](int n) { return n % 2 == 0; });
    std::cout << "Any element in numbers2 is even: " << (any_even ? "true" : "false") << std::endl;
    
    // 检查是否没有元素是负数
    bool none_negative = std::none_of(numbers1.begin(), numbers1.end(), [](int n) { return n < 0; });
    std::cout << "No element in numbers1 is negative: " << (none_negative ? "true" : "false") << std::endl;
    
    return 0;
}
```

## 修改性序列操作

修改性序列操作是指修改容器中元素的算法。这类算法主要用于复制、填充、转换等操作。

### copy和copy_if

`copy`算法用于将一个序列中的元素复制到另一个序列中，`copy_if`算法用于将一个序列中满足指定条件的元素复制到另一个序列中。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> source = {1, 2, 3, 4, 5};
    std::vector<int> destination1(source.size());
    std::vector<int> destination2;
    
    // 使用copy复制所有元素
    std::copy(source.begin(), source.end(), destination1.begin());
    
    std::cout << "destination1: ";
    for (int n : destination1) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // 使用copy_if复制偶数元素，并使用back_inserter自动扩展目标容器
    std::copy_if(source.begin(), source.end(), std::back_inserter(destination2), [](int n) { return n % 2 == 0; });
    
    std::cout << "destination2: ";
    for (int n : destination2) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### fill和fill_n

`fill`算法用于用指定值填充整个序列，`fill_n`算法用于用指定值填充序列中的前n个元素。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers(10);
    
    // 使用fill填充整个序列
    std::fill(numbers.begin(), numbers.end(), 42);
    
    std::cout << "After fill: ";
    for (int n : numbers) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // 使用fill_n填充前5个元素
    std::fill_n(numbers.begin(), 5, 100);
    
    std::cout << "After fill_n: ";
    for (int n : numbers) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### transform

`transform`算法用于对序列中的每个元素应用一个函数，并将结果存储在另一个序列中。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> source = {1, 2, 3, 4, 5};
    std::vector<int> destination(source.size());
    
    // 使用transform将每个元素加倍
    std::transform(source.begin(), source.end(), destination.begin(), [](int n) { return n * 2; });
    
    std::cout << "Original: ";
    for (int n : source) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    std::cout << "Transformed: ";
    for (int n : destination) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

## 排序和相关操作

排序和相关操作是指对容器中的元素进行排序和相关操作的算法。这类算法主要用于排序、二分查找、合并等操作。

### sort和stable_sort

`sort`算法用于对序列进行排序，`stable_sort`算法用于对序列进行稳定排序（保持相等元素的相对顺序）。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <string>

int main() {
    std::vector<int> numbers = {5, 2, 9, 1, 5, 6};
    
    // 使用sort排序
    std::sort(numbers.begin(), numbers.end());
    
    std::cout << "After sort: ";
    for (int n : numbers) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // 自定义排序规则（降序）
    std::sort(numbers.begin(), numbers.end(), [](int a, int b) { return a > b; });
    
    std::cout << "After custom sort (descending): ";
    for (int n : numbers) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // 对于自定义类型，我们也可以使用sort
    struct Person {
        std::string name;
        int age;
    };
    
    std::vector<Person> people = { {"Alice", 25}, {"Bob", 20}, {"Charlie", 30} };
    
    // 按照年龄排序
    std::sort(people.begin(), people.end(), [](const Person& a, const Person& b) { return a.age < b.age; });
    
    std::cout << "After sorting people by age: " << std::endl;
    for (const auto& person : people) {
        std::cout << "Name: " << person.name << ", Age: " << person.age << std::endl;
    }
    
    return 0;
}
```

### binary_search

`binary_search`算法用于在已排序的序列中进行二分查找，检查指定值是否存在。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    
    // 检查值为5的元素是否存在
    bool found = std::binary_search(numbers.begin(), numbers.end(), 5);
    std::cout << "Is 5 in the vector? " << (found ? "Yes" : "No") << std::endl;
    
    // 检查值为11的元素是否存在
    found = std::binary_search(numbers.begin(), numbers.end(), 11);
    std::cout << "Is 11 in the vector? " << (found ? "Yes" : "No") << std::endl;
    
    // 对于自定义类型，我们也可以使用binary_search，但需要提供比较函数
    struct Person {
        std::string name;
        int age;
    };
    
    std::vector<Person> people = { {"Alice", 25}, {"Bob", 20}, {"Charlie", 30} };
    
    // 首先按照年龄排序
    std::sort(people.begin(), people.end(), [](const Person& a, const Person& b) { return a.age < b.age; });
    
    // 定义我们要查找的人
    Person target = {"", 25};  // 我们只关心年龄
    
    // 使用binary_search查找年龄为25的人
    found = std::binary_search(people.begin(), people.end(), target, 
                              [](const Person& a, const Person& b) { return a.age < b.age; });
    
    std::cout << "Is there a person with age 25? " << (found ? "Yes" : "No") << std::endl;
    
    return 0;
}
```

### lower_bound、upper_bound和equal_range

`lower_bound`算法用于在已排序的序列中查找第一个不小于指定值的元素的位置，`upper_bound`算法用于在已排序的序列中查找第一个大于指定值的元素的位置，`equal_range`算法用于在已排序的序列中查找等于指定值的所有元素的范围。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5, 5, 5, 6, 7, 8, 9, 10};
    
    // 使用lower_bound查找第一个不小于5的元素
    auto lower = std::lower_bound(numbers.begin(), numbers.end(), 5);
    std::cout << "First element >= 5: " << *lower << " at position: " << lower - numbers.begin() << std::endl;
    
    // 使用upper_bound查找第一个大于5的元素
    auto upper = std::upper_bound(numbers.begin(), numbers.end(), 5);
    std::cout << "First element > 5: " << *upper << " at position: " << upper - numbers.begin() << std::endl;
    
    // 使用equal_range查找等于5的所有元素的范围
    auto range = std::equal_range(numbers.begin(), numbers.end(), 5);
    std::cout << "Elements equal to 5: " << std::endl;
    for (auto it = range.first; it != range.second; ++it) {
        std::cout << *it << " at position: " << it - numbers.begin() << std::endl;
    }
    
    return 0;
}
```

## 数值算法

数值算法是指进行数值计算的算法。这类算法主要定义在`<numeric>`头文件中，包括累加、内积等操作。

### accumulate

`accumulate`算法用于计算序列中所有元素的累加和。

```cpp
#include <iostream>
#include <vector>
#include <numeric>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    
    // 计算所有元素的累加和
    int sum = std::accumulate(numbers.begin(), numbers.end(), 0);
    std::cout << "Sum of all elements: " << sum << std::endl;
    
    // 计算所有元素的乘积（使用自定义的二元操作）
    int product = std::accumulate(numbers.begin(), numbers.end(), 1, [](int a, int b) { return a * b; });
    std::cout << "Product of all elements: " << product << std::endl;
    
    // 对于自定义类型，我们也可以使用accumulate
    std::vector<std::string> words = {"Hello", " ", "World", "!"};
    std::string message = std::accumulate(words.begin(), words.end(), std::string(""));
    std::cout << "Message: " << message << std::endl;
    
    return 0;
}
```

### inner_product

`inner_product`算法用于计算两个序列的内积（对应元素相乘，然后求和）。

```cpp
#include <iostream>
#include <vector>
#include <numeric>

int main() {
    std::vector<int> v1 = {1, 2, 3, 4, 5};
    std::vector<int> v2 = {10, 20, 30, 40, 50};
    
    // 计算两个序列的内积
    int result = std::inner_product(v1.begin(), v1.end(), v2.begin(), 0);
    std::cout << "Inner product: " << result << std::endl;  // 输出: 550 (1*10 + 2*20 + 3*30 + 4*40 + 5*50)
    
    // 使用自定义的二元操作
    result = std::inner_product(v1.begin(), v1.end(), v2.begin(), 0, 
                              [](int a, int b) { return a + b; },  // 累加操作
                              [](int a, int b) { return a * b * 2; });  // 对应元素相乘，然后乘以2
    std::cout << "Custom inner product: " << result << std::endl;  // 输出: 1100
    
    return 0;
}
```

## 函数对象和lambda表达式

STL算法库经常使用函数对象（Function Objects，也称为仿函数）或lambda表达式来自定义算法的行为。函数对象是一个重载了函数调用运算符`()`的类的实例，而lambda表达式是C++11引入的一种定义匿名函数对象的便捷方式。

### 函数对象

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

// 定义一个函数对象，用于比较两个数的大小
struct GreaterThan {
    int threshold;
    
    explicit GreaterThan(int t) : threshold(t) {}
    
    bool operator()(int n) const {
        return n > threshold;
    }
};

int main() {
    std::vector<int> numbers = {1, 10, 5, 20, 3, 15};
    
    // 使用函数对象
    GreaterThan greater_than_10(10);
    auto it = std::find_if(numbers.begin(), numbers.end(), greater_than_10);
    
    if (it != numbers.end()) {
        std::cout << "First number greater than 10: " << *it << std::endl;
    }
    
    return 0;
}
```

### lambda表达式

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {1, 10, 5, 20, 3, 15};
    
    // 使用lambda表达式
    int threshold = 10;
    auto it = std::find_if(numbers.begin(), numbers.end(), [threshold](int n) { return n > threshold; });
    
    if (it != numbers.end()) {
        std::cout << "First number greater than " << threshold << ": " << *it << std::endl;
    }
    
    return 0;
}
```

## STL算法库的最佳实践

使用STL算法库时，我们应该遵循一些最佳实践：

1. **优先使用STL算法，而不是手动实现**：STL算法通常是经过精心优化的，性能很高
2. **使用合适的迭代器类型**：不同的算法对迭代器类型有不同的要求，选择合适的迭代器类型可以提高性能
3. **使用lambda表达式简化代码**：C++11引入的lambda表达式可以使代码更加简洁易读
4. **注意算法的时间复杂度**：不同的算法有不同的时间复杂度，选择合适的算法可以提高程序的性能
5. **了解算法的副作用**：有些算法可能会修改容器的大小或结构，使用时需要注意

## 练习时间

让我们来做一些练习，巩固一下这节课所学的知识：

1. 使用`std::sort`对一个包含整数的vector进行排序，并自定义排序规则
2. 使用`std::find_if`查找vector中第一个大于100的元素
3. 使用`std::transform`将vector中的每个元素转换为其平方
4. 使用`std::accumulate`计算vector中所有元素的平均值
5. 使用`std::binary_search`在已排序的vector中查找指定元素
6. 实现一个自定义的函数对象，并在STL算法中使用它

## 小结

在这节课中，我们学习了C++ STL算法库，包括：

- STL算法库的概述和特点（泛型性、高效性、可扩展性、基于迭代器）
- 算法的分类（非修改性序列操作、修改性序列操作、排序和相关操作、数值算法）
- 各种常用算法的使用方法（find、count、copy、fill、transform、sort、binary_search、accumulate、inner_product等）
- 函数对象和lambda表达式的使用
- STL算法库的最佳实践

STL算法库是C++标准库中一个非常强大的工具，它提供了大量的泛型算法，可以大大提高我们的编程效率和代码质量。在下一节课中，我们将学习C++的内存模型和内存管理，这是理解C++程序性能和行为的关键！
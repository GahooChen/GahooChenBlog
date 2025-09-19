# C++标准库算法：强大的通用函数集合

上一节课我们学习了C++标准库中的容器，这节课我们将探讨C++标准库中的算法。这些算法是一组通用函数，可以用于操作各种容器中的元素，使我们能够以简洁、高效的方式实现常见的数据处理任务。

## 算法概览

C++标准库算法主要定义在`<algorithm>`头文件中，这些算法可以分为以下几类：

1. 非修改性序列操作（Non-modifying sequence operations）
2. 修改性序列操作（Modifying sequence operations）
3. 排序和相关操作（Sorting and related operations）
4. 数值算法（Numerical algorithms）

这些算法大多数是模板函数，可以用于各种类型的容器和元素。

## 非修改性序列操作

非修改性序列操作不会修改它们所操作的元素的顺序或值。

### 查找算法

#### std::find
查找范围内等于给定值的第一个元素。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {10, 20, 30, 40, 50};
    
    // 查找值为30的元素
    auto it = std::find(numbers.begin(), numbers.end(), 30);
    
    if (it != numbers.end()) {
        std::cout << "Found value: " << *it << " at position: " << it - numbers.begin() << std::endl;
    } else {
        std::cout << "Value not found" << std::endl;
    }
    
    return 0;
}
```

#### std::find_if
查找范围内满足给定谓词的第一个元素。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {10, 20, 30, 40, 50};
    
    // 查找第一个大于30的元素
    auto it = std::find_if(numbers.begin(), numbers.end(), [](int num) { return num > 30; });
    
    if (it != numbers.end()) {
        std::cout << "First value greater than 30: " << *it << " at position: " << it - numbers.begin() << std::endl;
    } else {
        std::cout << "No value greater than 30 found" << std::endl;
    }
    
    return 0;
}
```

#### std::count 和 std::count_if
统计范围内等于给定值或满足给定谓词的元素数量。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {10, 20, 30, 20, 50};
    
    // 统计值为20的元素数量
    int count = std::count(numbers.begin(), numbers.end(), 20);
    std::cout << "Count of 20: " << count << std::endl;
    
    // 统计大于20的元素数量
    int count_greater_than_20 = std::count_if(numbers.begin(), numbers.end(), [](int num) { return num > 20; });
    std::cout << "Count of numbers greater than 20: " << count_greater_than_20 << std::endl;
    
    return 0;
}
```

### 比较算法

#### std::equal
检查两个范围的元素是否相等。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> vec1 = {10, 20, 30, 40, 50};
    std::vector<int> vec2 = {10, 20, 30, 40, 50};
    std::vector<int> vec3 = {10, 20, 30, 45, 55};
    
    // 检查vec1和vec2是否相等
    bool is_equal1 = std::equal(vec1.begin(), vec1.end(), vec2.begin());
    std::cout << "vec1 and vec2 are " << (is_equal1 ? "equal" : "not equal") << std::endl;
    
    // 检查vec1和vec3是否相等
    bool is_equal2 = std::equal(vec1.begin(), vec1.end(), vec3.begin());
    std::cout << "vec1 and vec3 are " << (is_equal2 ? "equal" : "not equal") << std::endl;
    
    return 0;
}
```

#### std::mismatch
查找两个范围中第一个不匹配的位置。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> vec1 = {10, 20, 30, 40, 50};
    std::vector<int> vec2 = {10, 20, 35, 45, 55};
    
    // 查找第一个不匹配的位置
    auto result = std::mismatch(vec1.begin(), vec1.end(), vec2.begin());
    
    if (result.first != vec1.end()) {
        std::cout << "Mismatch at position: " << result.first - vec1.begin() << std::endl;
        std::cout << "vec1 value: " << *result.first << std::endl;
        std::cout << "vec2 value: " << *result.second << std::endl;
    } else {
        std::cout << "All elements match" << std::endl;
    }
    
    return 0;
}
```

### 遍历算法

#### std::for_each
对范围内的每个元素应用给定的函数。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {10, 20, 30, 40, 50};
    
    // 打印每个元素
    std::for_each(numbers.begin(), numbers.end(), [](int num) {
        std::cout << num << " ";
    });
    std::cout << std::endl;
    
    // 对每个元素乘以2并打印
    std::for_each(numbers.begin(), numbers.end(), [](int& num) {
        num *= 2;
        std::cout << num << " ";
    });
    std::cout << std::endl;
    
    return 0;
}
```

## 修改性序列操作

修改性序列操作会修改它们所操作的元素的顺序或值。

### 复制算法

#### std::copy 和 std::copy_if
复制范围内的元素到目标范围。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> source = {10, 20, 30, 40, 50};
    std::vector<int> destination(5);
    
    // 复制所有元素
    std::copy(source.begin(), source.end(), destination.begin());
    
    std::cout << "Destination after copy: ";
    for (int num : destination) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // 复制大于20的元素
    std::vector<int> filtered(3);
    auto end = std::copy_if(source.begin(), source.end(), filtered.begin(), [](int num) { return num > 20; });
    
    std::cout << "Filtered after copy_if: ";
    for (auto it = filtered.begin(); it != end; ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

#### std::transform
对范围内的每个元素应用给定的函数，并将结果存储在目标范围。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> source = {10, 20, 30, 40, 50};
    std::vector<int> destination(source.size());
    
    // 对每个元素应用平方函数
    std::transform(source.begin(), source.end(), destination.begin(), [](int num) { return num * num; });
    
    std::cout << "Source: ";
    for (int num : source) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    std::cout << "Destination (squared): ";
    for (int num : destination) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### 填充算法

#### std::fill 和 std::fill_n
用给定的值填充范围。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers(5);
    
    // 填充所有元素为42
    std::fill(numbers.begin(), numbers.end(), 42);
    
    std::cout << "After fill: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // 从第二个元素开始填充3个元素为99
    std::fill_n(numbers.begin() + 1, 3, 99);
    
    std::cout << "After fill_n: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### 移除算法

#### std::remove 和 std::remove_if
移除范围内等于给定值或满足给定谓词的元素。注意，这些算法并不会真正删除元素，而是将保留的元素移到容器的前面，返回新的逻辑结尾。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {10, 20, 30, 20, 40, 20, 50};
    
    std::cout << "Before remove: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // 移除值为20的元素
    auto new_end = std::remove(numbers.begin(), numbers.end(), 20);
    
    std::cout << "After remove (logical): ";
    for (auto it = numbers.begin(); it != new_end; ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;
    
    std::cout << "After remove (actual): ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // 真正删除元素
    numbers.erase(new_end, numbers.end());
    
    std::cout << "After erase: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### 置换算法

#### std::swap 和 std::swap_ranges
交换两个元素或两个范围的元素。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    // 交换单个元素
    int a = 10, b = 20;
    std::cout << "Before swap: a = " << a << ", b = " << b << std::endl;
    std::swap(a, b);
    std::cout << "After swap: a = " << a << ", b = " << b << std::endl;
    
    // 交换范围
    std::vector<int> vec1 = {1, 2, 3, 4, 5};
    std::vector<int> vec2 = {10, 20, 30, 40, 50};
    
    std::cout << "Before swap_ranges: " << std::endl;
    std::cout << "vec1: ";
    for (int num : vec1) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    std::cout << "vec2: ";
    for (int num : vec2) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // 交换前三个元素
    std::swap_ranges(vec1.begin(), vec1.begin() + 3, vec2.begin());
    
    std::cout << "After swap_ranges: " << std::endl;
    std::cout << "vec1: ";
    for (int num : vec1) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    std::cout << "vec2: ";
    for (int num : vec2) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

## 排序和相关操作

排序和相关操作主要用于对元素进行排序、查找已排序的元素等。

### 排序算法

#### std::sort
对范围进行排序，默认使用升序。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {30, 10, 50, 20, 40};
    
    std::cout << "Before sort: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // 使用默认的升序排序
    std::sort(numbers.begin(), numbers.end());
    
    std::cout << "After ascending sort: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // 使用降序排序
    std::sort(numbers.begin(), numbers.end(), std::greater<int>());
    
    std::cout << "After descending sort: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

#### std::partial_sort
对范围的前n个元素进行排序。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {30, 10, 50, 20, 40, 60, 15};
    
    std::cout << "Before partial_sort: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // 排序前4个元素
    std::partial_sort(numbers.begin(), numbers.begin() + 4, numbers.end());
    
    std::cout << "After partial_sort: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### 查找算法（针对已排序范围）

#### std::binary_search
在已排序的范围中检查元素是否存在。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {10, 20, 30, 40, 50};
    
    // 检查30是否存在
    bool found = std::binary_search(numbers.begin(), numbers.end(), 30);
    std::cout << "30 is " << (found ? "found" : "not found") << std::endl;
    
    // 检查35是否存在
    found = std::binary_search(numbers.begin(), numbers.end(), 35);
    std::cout << "35 is " << (found ? "found" : "not found") << std::endl;
    
    return 0;
}
```

#### std::lower_bound 和 std::upper_bound
在已排序的范围中查找给定值的第一个位置或最后一个位置。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {10, 20, 20, 30, 40, 50};
    
    // 查找第一个大于或等于20的位置
    auto lower = std::lower_bound(numbers.begin(), numbers.end(), 20);
    std::cout << "lower_bound for 20: position = " << lower - numbers.begin() << ", value = " << *lower << std::endl;
    
    // 查找第一个大于20的位置
    auto upper = std::upper_bound(numbers.begin(), numbers.end(), 20);
    std::cout << "upper_bound for 20: position = " << upper - numbers.begin() << ", value = " << *upper << std::endl;
    
    return 0;
}
```

### 集合操作

#### std::set_union、std::set_intersection、std::set_difference
对两个已排序的范围执行集合操作。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> set1 = {10, 20, 30, 40, 50};
    std::vector<int> set2 = {30, 40, 50, 60, 70};
    
    std::vector<int> result(10);
    
    // 计算并集
    auto end_union = std::set_union(set1.begin(), set1.end(), set2.begin(), set2.end(), result.begin());
    
    std::cout << "Union: ";
    for (auto it = result.begin(); it != end_union; ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;
    
    // 计算交集
    auto end_intersection = std::set_intersection(set1.begin(), set1.end(), set2.begin(), set2.end(), result.begin());
    
    std::cout << "Intersection: ";
    for (auto it = result.begin(); it != end_intersection; ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;
    
    // 计算差集（set1 - set2）
    auto end_difference = std::set_difference(set1.begin(), set1.end(), set2.begin(), set2.end(), result.begin());
    
    std::cout << "Difference (set1 - set2): ";
    for (auto it = result.begin(); it != end_difference; ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

## 数值算法

数值算法主要定义在`<numeric>`头文件中，用于执行数值计算。

### std::accumulate
计算范围中元素的总和，可以指定初始值和二元操作。

```cpp
#include <iostream>
#include <vector>
#include <numeric>

int main() {
    std::vector<int> numbers = {10, 20, 30, 40, 50};
    
    // 计算总和（默认为加法）
    int sum = std::accumulate(numbers.begin(), numbers.end(), 0);
    std::cout << "Sum: " << sum << std::endl;
    
    // 计算总和，指定初始值为100
    int sum_with_initial = std::accumulate(numbers.begin(), numbers.end(), 100);
    std::cout << "Sum with initial value 100: " << sum_with_initial << std::endl;
    
    // 计算乘积（使用乘法作为二元操作）
    int product = std::accumulate(numbers.begin(), numbers.end(), 1, [](int a, int b) { return a * b; });
    std::cout << "Product: " << product << std::endl;
    
    return 0;
}
```

### std::inner_product
计算两个范围中元素的内积。

```cpp
#include <iostream>
#include <vector>
#include <numeric>

int main() {
    std::vector<int> vec1 = {1, 2, 3, 4, 5};
    std::vector<int> vec2 = {10, 20, 30, 40, 50};
    
    // 计算内积：1*10 + 2*20 + 3*30 + 4*40 + 5*50
    int inner_product = std::inner_product(vec1.begin(), vec1.end(), vec2.begin(), 0);
    std::cout << "Inner product: " << inner_product << std::endl;
    
    // 计算自定义的内积
    int custom_inner_product = std::inner_product(vec1.begin(), vec1.end(), vec2.begin(), 100, 
                                                 [](int a, int b) { return a + b; },  // 二元操作1：结果的合并方式
                                                 [](int a, int b) { return a * b; }); // 二元操作2：元素的组合方式
    std::cout << "Custom inner product: " << custom_inner_product << std::endl;
    
    return 0;
}
```

### std::partial_sum 和 std::adjacent_difference
计算范围中元素的部分和或相邻元素的差值。

```cpp
#include <iostream>
#include <vector>
#include <numeric>

int main() {
    std::vector<int> numbers = {10, 20, 30, 40, 50};
    std::vector<int> result(5);
    
    // 计算部分和
    std::partial_sum(numbers.begin(), numbers.end(), result.begin());
    
    std::cout << "Original: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    std::cout << "Partial sums: ";
    for (int num : result) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // 计算相邻元素的差值
    std::adjacent_difference(numbers.begin(), numbers.end(), result.begin());
    
    std::cout << "Adjacent differences: ";
    for (int num : result) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

## 练习时间

让我们来做一些练习，巩固一下这节课所学的知识：

1. 使用`std::sort`和`std::unique`对一个容器进行排序并删除重复元素
2. 使用`std::transform`将一个字符串中的所有字符转换为大写
3. 使用`std::find_if`查找一个容器中第一个大于给定值的元素
4. 使用`std::accumulate`计算一个容器中元素的平均值
5. 使用`std::for_each`和一个lambda表达式，对容器中的每个元素执行某种操作
6. 实现一个函数，使用标准库算法来统计文本中每个单词出现的次数

## 小结

在这节课中，我们学习了C++标准库中的算法，包括：

- 非修改性序列操作（查找、计数、比较、遍历等）
- 修改性序列操作（复制、转换、填充、移除、置换等）
- 排序和相关操作（排序、二分查找、集合操作等）
- 数值算法（累加、内积、部分和等）

C++标准库中的算法是一组强大的通用函数，可以用于各种容器和数据类型，使我们能够以简洁、高效的方式实现常见的数据处理任务。在下一节课中，我们将学习C++的异常处理机制！
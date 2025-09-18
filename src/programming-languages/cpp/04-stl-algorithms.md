# C++ STL算法详解

STL（Standard Template Library，标准模板库）提供了丰富的算法集合，可以用于各种常见的数据结构操作。这些算法大多定义在`<algorithm>`头文件中，它们是泛型的，可以用于各种容器类型。本章将详细介绍STL中常用的算法及其使用方法。

## 非修改性序列操作

非修改性序列操作是指那些不改变容器中元素数量和值的算法。

### 遍历元素

#### for_each

`for_each`算法对容器中的每个元素应用一个函数：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

void print(int n) {
    std::cout << n << " ";
}

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    
    // 使用函数
    std::for_each(numbers.begin(), numbers.end(), print);
    std::cout << std::endl;  // 输出：1 2 3 4 5
    
    // 使用Lambda表达式
    std::for_each(numbers.begin(), numbers.end(), [](int n) {
        std::cout << n * 2 << " ";
    });
    std::cout << std::endl;  // 输出：2 4 6 8 10
    
    return 0;
}
```

### 查找元素

#### find

`find`算法在容器中查找等于给定值的第一个元素：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    
    // 查找值为3的元素
    auto it = std::find(numbers.begin(), numbers.end(), 3);
    
    if (it != numbers.end()) {
        std::cout << "找到元素：" << *it << std::endl;  // 输出：找到元素：3
    } else {
        std::cout << "未找到元素" << std::endl;
    }
    
    return 0;
}
```

#### 1.2.2 find_if

`find_if`算法在容器中查找满足指定条件的第一个元素：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    
    // 查找第一个大于3的元素
    auto it = std::find_if(numbers.begin(), numbers.end(), [](int n) {
        return n > 3;
    });
    
    if (it != numbers.end()) {
        std::cout << "第一个大于3的元素是：" << *it << std::endl;  // 输出：第一个大于3的元素是：4
    }
    
    return 0;
}
```

#### 1.2.3 find_if_not

`find_if_not`算法在容器中查找不满足指定条件的第一个元素：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {1, 3, 5, 2, 7};
    
    // 查找第一个不是奇数的元素
    auto it = std::find_if_not(numbers.begin(), numbers.end(), [](int n) {
        return n % 2 != 0;
    });
    
    if (it != numbers.end()) {
        std::cout << "第一个不是奇数的元素是：" << *it << std::endl;  // 输出：第一个不是奇数的元素是：2
    }
    
    return 0;
}
```

#### 1.2.4 find_first_of

`find_first_of`算法在第一个序列中查找第二个序列中任何一个元素的第一次出现：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers1 = {1, 2, 3, 4, 5};
    std::vector<int> numbers2 = {3, 5, 7};
    
    // 在numbers1中查找numbers2中的任何一个元素
    auto it = std::find_first_of(numbers1.begin(), numbers1.end(), numbers2.begin(), numbers2.end());
    
    if (it != numbers1.end()) {
        std::cout << "找到的第一个共同元素是：" << *it << std::endl;  // 输出：找到的第一个共同元素是：3
    }
    
    return 0;
}
```

### 1.3 计数元素

#### 1.3.1 count

`count`算法统计容器中等于给定值的元素个数：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {1, 2, 3, 2, 5, 2};
    
    // 统计值为2的元素个数
    int count = std::count(numbers.begin(), numbers.end(), 2);
    
    std::cout << "值为2的元素个数：" << count << std::endl;  // 输出：值为2的元素个数：3
    
    return 0;
}
```

#### 1.3.2 count_if

`count_if`算法统计容器中满足指定条件的元素个数：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5, 6};
    
    // 统计偶数的个数
    int count = std::count_if(numbers.begin(), numbers.end(), [](int n) {
        return n % 2 == 0;
    });
    
    std::cout << "偶数的个数：" << count << std::endl;  // 输出：偶数的个数：3
    
    return 0;
}
```

### 1.4 比较序列

#### 1.4.1 equal

`equal`算法比较两个序列是否相等：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <string>

int main() {
    std::vector<int> numbers1 = {1, 2, 3, 4, 5};
    std::vector<int> numbers2 = {1, 2, 3, 4, 5};
    std::vector<int> numbers3 = {1, 2, 3, 4, 6};
    
    // 比较numbers1和numbers2
    bool isEqual1 = std::equal(numbers1.begin(), numbers1.end(), numbers2.begin());
    std::cout << "numbers1和numbers2是否相等：" << (isEqual1 ? "是" : "否") << std::endl;  // 输出：是
    
    // 比较numbers1和numbers3
    bool isEqual2 = std::equal(numbers1.begin(), numbers1.end(), numbers3.begin());
    std::cout << "numbers1和numbers3是否相等：" << (isEqual2 ? "是" : "否") << std::endl;  // 输出：否
    
    // 使用自定义比较函数
    std::string str1 = "hello";
    std::string str2 = "HELLO";
    bool isEqual3 = std::equal(str1.begin(), str1.end(), str2.begin(), [](char a, char b) {
        return std::tolower(a) == std::tolower(b);
    });
    std::cout << "str1和str2（忽略大小写）是否相等：" << (isEqual3 ? "是" : "否") << std::endl;  // 输出：是
    
    return 0;
}
```

## 2. 修改性序列操作

修改性序列操作是指那些可以改变容器中元素数量或值的算法。

### 2.1 复制元素

#### 2.1.1 copy

`copy`算法将一个序列中的元素复制到另一个序列中：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> source = {1, 2, 3, 4, 5};
    std::vector<int> destination(source.size());
    
    // 复制source到destination
    std::copy(source.begin(), source.end(), destination.begin());
    
    // 打印destination
    std::cout << "destination: ";
    for (int n : destination) {
        std::cout << n << " ";
    }
    std::cout << std::endl;  // 输出：destination: 1 2 3 4 5
    
    return 0;
}
```

#### 2.1.2 copy_if

`copy_if`算法将满足指定条件的元素复制到另一个序列中：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> source = {1, 2, 3, 4, 5, 6};
    std::vector<int> destination;
    destination.reserve(source.size());  // 预分配空间
    
    // 复制所有偶数到destination
    std::copy_if(source.begin(), source.end(), std::back_inserter(destination), [](int n) {
        return n % 2 == 0;
    });
    
    // 打印destination
    std::cout << "destination: ";
    for (int n : destination) {
        std::cout << n << " ";
    }
    std::cout << std::endl;  // 输出：destination: 2 4 6
    
    return 0;
}
```

#### 2.1.3 copy_n

`copy_n`算法从源序列复制指定数量的元素到目标序列：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> source = {1, 2, 3, 4, 5};
    std::vector<int> destination(3);
    
    // 从source复制3个元素到destination
    std::copy_n(source.begin(), 3, destination.begin());
    
    // 打印destination
    std::cout << "destination: ";
    for (int n : destination) {
        std::cout << n << " ";
    }
    std::cout << std::endl;  // 输出：destination: 1 2 3
    
    return 0;
}
```

### 2.2 转换元素

#### 2.2.1 transform

`transform`算法将一个函数应用于序列中的每个元素，并将结果存储在另一个序列中：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int square(int n) {
    return n * n;
}

int main() {
    std::vector<int> source = {1, 2, 3, 4, 5};
    std::vector<int> destination(source.size());
    
    // 使用函数
    std::transform(source.begin(), source.end(), destination.begin(), square);
    
    // 打印结果
    std::cout << "原序列：";
    for (int n : source) {
        std::cout << n << " ";
    }
    std::cout << std::endl;  // 输出：原序列：1 2 3 4 5
    
    std::cout << "平方序列：";
    for (int n : destination) {
        std::cout << n << " ";
    }
    std::cout << std::endl;  // 输出：平方序列：1 4 9 16 25
    
    // 使用Lambda表达式将两个序列的元素相加
    std::vector<int> a = {1, 2, 3};
    std::vector<int> b = {4, 5, 6};
    std::vector<int> sum(a.size());
    
    std::transform(a.begin(), a.end(), b.begin(), sum.begin(), [](int x, int y) {
        return x + y;
    });
    
    std::cout << "和序列：";
    for (int n : sum) {
        std::cout << n << " ";
    }
    std::cout << std::endl;  // 输出：和序列：5 7 9
    
    return 0;
}
```

### 2.3 替换元素

#### 2.3.1 replace

`replace`算法将序列中等于给定值的所有元素替换为另一个值：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {1, 2, 3, 2, 5, 2};
    
    // 将所有值为2的元素替换为20
    std::replace(numbers.begin(), numbers.end(), 2, 20);
    
    // 打印结果
    std::cout << "替换后的序列：";
    for (int n : numbers) {
        std::cout << n << " ";
    }
    std::cout << std::endl;  // 输出：替换后的序列：1 20 3 20 5 20
    
    return 0;
}
```

#### 2.3.2 replace_if

`replace_if`算法将序列中满足指定条件的所有元素替换为另一个值：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5, 6};
    
    // 将所有偶数替换为0
    std::replace_if(numbers.begin(), numbers.end(), [](int n) {
        return n % 2 == 0;
    }, 0);
    
    // 打印结果
    std::cout << "替换后的序列：";
    for (int n : numbers) {
        std::cout << n << " ";
    }
    std::cout << std::endl;  // 输出：替换后的序列：1 0 3 0 5 0
    
    return 0;
}
```

### 2.4 填充元素

#### 2.4.1 fill

`fill`算法将序列中的每个元素设置为给定值：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers(5);  // 大小为5的vector，初始值为0
    
    // 将所有元素设置为10
    std::fill(numbers.begin(), numbers.end(), 10);
    
    // 打印结果
    std::cout << "填充后的序列：";
    for (int n : numbers) {
        std::cout << n << " ";
    }
    std::cout << std::endl;  // 输出：填充后的序列：10 10 10 10 10
    
    return 0;
}
```

#### 2.4.2 fill_n

`fill_n`算法从指定位置开始，将n个元素设置为给定值：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers(10);  // 大小为10的vector，初始值为0
    
    // 从begin()+2位置开始，填充3个元素为5
    std::fill_n(numbers.begin() + 2, 3, 5);
    
    // 打印结果
    std::cout << "填充后的序列：";
    for (int n : numbers) {
        std::cout << n << " ";
    }
    std::cout << std::endl;  // 输出：填充后的序列：0 0 5 5 5 0 0 0 0 0
    
    return 0;
}
```

## 3. 排序和相关操作

排序和相关操作是STL中最常用的算法之一，它们可以对序列进行排序、合并、查找等操作。

### 3.1 排序

#### 3.1.1 sort

`sort`算法对序列进行排序，默认是升序排序：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {5, 2, 9, 1, 5, 6};
    
    // 默认升序排序
    std::sort(numbers.begin(), numbers.end());
    
    // 打印结果
    std::cout << "升序排序：";
    for (int n : numbers) {
        std::cout << n << " ";
    }
    std::cout << std::endl;  // 输出：升序排序：1 2 5 5 6 9
    
    // 自定义降序排序
    std::sort(numbers.begin(), numbers.end(), [](int a, int b) {
        return a > b;
    });
    
    // 打印结果
    std::cout << "降序排序：";
    for (int n : numbers) {
        std::cout << n << " ";
    }
    std::cout << std::endl;  // 输出：降序排序：9 6 5 5 2 1
    
    return 0;
}
```

#### 3.1.2 stable_sort

`stable_sort`算法对序列进行稳定排序，即相等元素的相对顺序保持不变：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <string>

struct Person {
    std::string name;
    int age;
};

int main() {
    std::vector<Person> people = {
        {"张三", 25},
        {"李四", 30},
        {"王五", 25},
        {"赵六", 35}
    };
    
    // 先按年龄升序排序
    std::stable_sort(people.begin(), people.end(), [](const Person& a, const Person& b) {
        return a.age < b.age;
    });
    
    // 打印结果
    std::cout << "按年龄排序后：" << std::endl;
    for (const auto& person : people) {
        std::cout << "姓名：" << person.name << "，年龄：" << person.age << std::endl;
    }
    
    // 按年龄排序后，年龄相同的人的相对顺序保持不变
    return 0;
}
```

### 3.2 查找

#### 3.2.1 binary_search

`binary_search`算法在已排序的序列中查找给定值，使用二分查找算法：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    
    // 必须先排序
    std::sort(numbers.begin(), numbers.end());
    
    // 查找值为7的元素
    bool found = std::binary_search(numbers.begin(), numbers.end(), 7);
    
    std::cout << "7是否存在：" << (found ? "是" : "否") << std::endl;  // 输出：是
    
    // 查找值为11的元素
    found = std::binary_search(numbers.begin(), numbers.end(), 11);
    
    std::cout << "11是否存在：" << (found ? "是" : "否") << std::endl;  // 输出：否
    
    return 0;
}
```

#### 3.2.2 lower_bound

`lower_bound`算法在已排序的序列中查找第一个不小于给定值的元素的位置：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    
    // 查找第一个不小于6的元素
    auto it = std::lower_bound(numbers.begin(), numbers.end(), 6);
    
    if (it != numbers.end()) {
        std::cout << "第一个不小于6的元素是：" << *it << std::endl;  // 输出：第一个不小于6的元素是：6
        std::cout << "索引位置：" << std::distance(numbers.begin(), it) << std::endl;  // 输出：索引位置：5
    }
    
    return 0;
}
```

#### 3.2.3 upper_bound

`upper_bound`算法在已排序的序列中查找第一个大于给定值的元素的位置：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    
    // 查找第一个大于6的元素
    auto it = std::upper_bound(numbers.begin(), numbers.end(), 6);
    
    if (it != numbers.end()) {
        std::cout << "第一个大于6的元素是：" << *it << std::endl;  // 输出：第一个大于6的元素是：7
        std::cout << "索引位置：" << std::distance(numbers.begin(), it) << std::endl;  // 输出：索引位置：6
    }
    
    return 0;
}
```

### 3.3 合并

#### 3.3.1 merge

`merge`算法合并两个已排序的序列，结果也是一个排序的序列：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers1 = {1, 3, 5, 7, 9};
    std::vector<int> numbers2 = {2, 4, 6, 8, 10};
    std::vector<int> merged(numbers1.size() + numbers2.size());
    
    // 合并两个已排序的序列
    std::merge(numbers1.begin(), numbers1.end(), numbers2.begin(), numbers2.end(), merged.begin());
    
    // 打印结果
    std::cout << "合并后的序列：";
    for (int n : merged) {
        std::cout << n << " ";
    }
    std::cout << std::endl;  // 输出：合并后的序列：1 2 3 4 5 6 7 8 9 10
    
    return 0;
}
```

## 4. 数值算法

数值算法是用于数值计算的算法，定义在`<numeric>`头文件中。

### 4.1 计算总和

#### 4.1.1 accumulate

`accumulate`算法计算序列中元素的总和：

```cpp
#include <iostream>
#include <vector>
#include <numeric>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    
    // 计算总和，初始值为0
    int sum = std::accumulate(numbers.begin(), numbers.end(), 0);
    
    std::cout << "总和：" << sum << std::endl;  // 输出：总和：15
    
    // 使用自定义操作（计算乘积）
    int product = std::accumulate(numbers.begin(), numbers.end(), 1, [](int a, int b) {
        return a * b;
    });
    
    std::cout << "乘积：" << product << std::endl;  // 输出：乘积：120
    
    return 0;
}
```

### 4.2 计算相邻元素的差值

#### 4.2.1 adjacent_difference

`adjacent_difference`算法计算序列中相邻元素的差值：

```cpp
#include <iostream>
#include <vector>
#include <numeric>

int main() {
    std::vector<int> numbers = {10, 5, 3, 8, 2};
    std::vector<int> differences(numbers.size());
    
    // 计算相邻元素的差值
    std::adjacent_difference(numbers.begin(), numbers.end(), differences.begin());
    
    // 打印结果
    std::cout << "原始序列：";
    for (int n : numbers) {
        std::cout << n << " ";
    }
    std::cout << std::endl;  // 输出：原始序列：10 5 3 8 2
    
    std::cout << "相邻差值：";
    for (int n : differences) {
        std::cout << n << " ";
    }
    std::cout << std::endl;  // 输出：相邻差值：10 -5 -2 5 -6
    
    // 第一个元素保持不变，第二个元素是numbers[1]-numbers[0]，依此类推
    
    return 0;
}
```

### 4.3 计算内积

#### 4.3.1 inner_product

`inner_product`算法计算两个序列的内积（点积）：

```cpp
#include <iostream>
#include <vector>
#include <numeric>

int main() {
    std::vector<int> a = {1, 2, 3};
    std::vector<int> b = {4, 5, 6};
    
    // 计算内积，初始值为0
    int result = std::inner_product(a.begin(), a.end(), b.begin(), 0);
    
    std::cout << "内积：" << result << std::endl;  // 输出：内积：32（1*4 + 2*5 + 3*6 = 4+10+18=32）
    
    // 使用自定义操作（计算外积之和）
    result = std::inner_product(a.begin(), a.end(), b.begin(), 0, 
                               [](int sum, int product) { return sum + product; },  // 总和操作
                               [](int x, int y) { return x * y * 2; });  // 乘积操作
    
    std::cout << "自定义内积：" << result << std::endl;  // 输出：自定义内积：64（(1*4*2)+(2*5*2)+(3*6*2) = 8+20+36=64）
    
    return 0;
}
```

### 4.4 生成序列

#### 4.4.1 iota

`iota`算法生成一个递增的序列：

```cpp
#include <iostream>
#include <vector>
#include <numeric>

int main() {
    std::vector<int> numbers(10);
    
    // 生成从1开始的递增序列
    std::iota(numbers.begin(), numbers.end(), 1);
    
    // 打印结果
    std::cout << "生成的序列：";
    for (int n : numbers) {
        std::cout << n << " ";
    }
    std::cout << std::endl;  // 输出：生成的序列：1 2 3 4 5 6 7 8 9 10
    
    // 生成从100开始，步长为1的序列
    std::iota(numbers.begin(), numbers.end(), 100);
    
    // 打印结果
    std::cout << "生成的序列：";
    for (int n : numbers) {
        std::cout << n << " ";
    }
    std::cout << std::endl;  // 输出：生成的序列：100 101 102 103 104 105 106 107 108 109
    
    return 0;
}
```

## 5. 练习与实践

### 5.1 基础练习

1. 使用STL算法实现一个简单的统计程序，统计一个文本文件中每个单词出现的次数。

2. 实现一个函数，接受一个整数vector和一个目标值，使用STL算法找出vector中是否存在两个数，它们的和等于目标值。

### 5.2 进阶挑战

1. 使用STL算法实现一个简单的排序算法可视化工具，展示不同排序算法的工作原理。

2. 实现一个函数，接受一个字符串vector，使用STL算法对其进行排序，并去除重复的字符串。

## 6. 小结

STL算法是C++标准库中非常强大的工具，它们可以大大简化我们的编程工作，提高代码的可读性和可维护性。本章我们学习了：

- 非修改性序列操作，如遍历、查找和计数元素
- 修改性序列操作，如复制、转换和替换元素
- 排序和相关操作，如排序、查找和合并序列
- 数值算法，如计算总和、差值和内积

在实际编程中，我们应该尽量使用STL算法而不是自己实现类似的功能，这样可以使我们的代码更加简洁、高效和可靠。
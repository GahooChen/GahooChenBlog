# 函数：代码的模块化与复用

函数是组织好的、可重复使用的、用来实现特定功能的代码块。在Python中，函数是一等公民，可以像其他数据类型一样被传递、赋值和返回。本节课，我们将学习Python函数的定义、调用、参数类型、作用域等内容。

## 函数的定义与调用

### 函数的定义

在Python中，我们使用 `def` 关键字来定义函数。函数定义的基本语法如下：

```python
def function_name(parameters):
    """函数文档字符串（可选）"""
    # 函数体
    # 执行代码
    return expression  # 返回值（可选）
```

- `def` 是定义函数的关键字
- `function_name` 是函数的名称，需要遵循变量命名规则
- `parameters` 是函数的参数列表，可以包含零个或多个参数
- 冒号 `:` 表示函数体的开始
- 函数体需要缩进（通常是4个空格）
- 文档字符串（docstring）是对函数功能的描述，可以使用 `"""` 或 `'''` 包裹
- `return` 语句用于返回函数的结果，可选

下面是一个简单的函数示例：

```python
def greet():
    """向用户问好"""
    print("Hello, World!")

# 调用函数
greet()  # 输出: Hello, World!
```

### 函数的调用

要调用函数，只需要使用函数名后跟一对括号即可。如果函数需要参数，需要在括号内提供相应的参数值。

```python
def greet(name):
    """向指定的人问好"""
    print(f"Hello, {name}!")

# 调用带参数的函数
greet("张三")  # 输出: Hello, 张三!

def add(a, b):
    """计算两个数的和"""
    return a + b

# 调用有返回值的函数
result = add(3, 5)
print("3 + 5 =", result)  # 输出: 3 + 5 = 8
```

## 函数的参数类型

Python中的函数参数有多种类型，包括位置参数、默认参数、关键字参数、可变参数等。

### 位置参数

位置参数是最基本的参数类型，调用函数时，实参的位置必须与形参的位置一一对应。

```python
def describe_person(name, age):
    """描述一个人的姓名和年龄"""
    print(f"姓名: {name}, 年龄: {age}岁")

# 调用函数，实参的位置必须与形参的位置一致
describe_person("张三", 15)  # 输出: 姓名: 张三, 年龄: 15岁
describe_person(15, "张三")  # 输出: 姓名: 15, 年龄: 张三岁（这显然是错误的）
```

### 默认参数

默认参数允许我们在定义函数时为参数指定默认值。调用函数时，如果不提供该参数的值，将使用默认值。

```python
def describe_person(name, age=18):
    """描述一个人的姓名和年龄，默认年龄为18岁"""
    print(f"姓名: {name}, 年龄: {age}岁")

# 调用函数时，可以不提供默认参数的值
describe_person("张三")  # 输出: 姓名: 张三, 年龄: 18岁

# 也可以提供默认参数的值，覆盖默认值
describe_person("李四", 20)  # 输出: 姓名: 李四, 年龄: 20岁
```

> 注意：默认参数应该是不可变对象，如数字、字符串、元组等。不要使用可变对象（如列表、字典）作为默认参数，因为这可能会导致意外的行为。

### 关键字参数

关键字参数允许我们在调用函数时通过参数名指定实参的值，这样可以不必严格按照形参的顺序传递参数。

```python
def describe_person(name, age, city):
    """描述一个人的姓名、年龄和所在城市"""
    print(f"姓名: {name}, 年龄: {age}岁, 城市: {city}")

# 使用关键字参数调用函数
describe_person(name="张三", age=15, city="北京")  # 输出: 姓名: 张三, 年龄: 15岁, 城市: 北京

# 关键字参数的顺序可以与形参的顺序不同
describe_person(city="上海", name="李四", age=20)  # 输出: 姓名: 李四, 年龄: 20岁, 城市: 上海

# 混合使用位置参数和关键字参数，但位置参数必须放在关键字参数之前
describe_person("王五", city="广州", age=25)  # 输出: 姓名: 王五, 年龄: 25岁, 城市: 广州
```

### 可变参数（*args）

可变参数允许我们在调用函数时传入任意数量的位置参数。在函数定义中，我们使用 `*args` 来表示可变参数。

```python
def sum_numbers(*args):
    """计算任意数量数字的和"""
    total = 0
    for num in args:
        total += num
    return total

# 调用函数时，可以传入任意数量的位置参数
print("sum_numbers(1, 2, 3) =", sum_numbers(1, 2, 3))  # 输出: sum_numbers(1, 2, 3) = 6
print("sum_numbers(1, 2, 3, 4, 5) =", sum_numbers(1, 2, 3, 4, 5))  # 输出: sum_numbers(1, 2, 3, 4, 5) = 15
print("sum_numbers() =", sum_numbers())  # 输出: sum_numbers() = 0（没有传入参数）

# 可以将列表或元组解包后传入可变参数
numbers = [1, 2, 3, 4, 5]
print("sum_numbers(*numbers) =", sum_numbers(*numbers))  # 输出: sum_numbers(*numbers) = 15
```

### 关键字可变参数（**kwargs）

关键字可变参数允许我们在调用函数时传入任意数量的关键字参数。在函数定义中，我们使用 `**kwargs` 来表示关键字可变参数。

```python
def print_info(**kwargs):
    """打印任意数量的关键字参数信息"""
    for key, value in kwargs.items():
        print(f"{key}: {value}")

# 调用函数时，可以传入任意数量的关键字参数
print_info(name="张三", age=15, city="北京")
# 输出:
# name: 张三
# age: 15
# city: 北京

print_info(animal="cat", color="black")
# 输出:
# animal: cat
# color: black

print_info()  # 没有输出（没有传入参数）

# 可以将字典解包后传入关键字可变参数
person = {"name": "李四", "age": 20, "city": "上海"}
print_info(**person)
# 输出:
# name: 李四
# age: 20
# city: 上海
```

### 参数组合使用

在Python中，我们可以在一个函数中组合使用不同类型的参数，但需要遵循一定的顺序：位置参数、可变参数、默认参数、关键字可变参数。

```python
def mixed_params(a, b, *args, c=30, **kwargs):
    """混合使用不同类型的参数"""
    print(f"a = {a}")
    print(f"b = {b}")
    print(f"args = {args}")
    print(f"c = {c}")
    print(f"kwargs = {kwargs}")

# 调用函数
mixed_params(10, 20, 30, 40, 50, c=60, d=70, e=80)
# 输出:
# a = 10
# b = 20
# args = (30, 40, 50)
# c = 60
# kwargs = {'d': 70, 'e': 80}
```

## 函数的返回值

函数可以返回一个值、多个值，甚至不返回任何值（默认返回 `None`）。

### 返回单个值

```python
def square(x):
    """计算一个数的平方"""
    return x * x

result = square(5)
print("5的平方是:", result)  # 输出: 5的平方是: 25
```

### 返回多个值

在Python中，函数可以通过返回一个元组来返回多个值。在调用函数时，我们可以使用多个变量来接收这些返回值。

```python
def calculate(a, b):
    """计算两个数的和、差、积、商"""
    sum_result = a + b
    diff_result = a - b
    product_result = a * b
    quotient_result = a / b  # 注意：这里可能会抛出ZeroDivisionError异常
    return sum_result, diff_result, product_result, quotient_result

# 使用多个变量接收返回值
sum_val, diff_val, product_val, quotient_val = calculate(10, 5)
print(f"和: {sum_val}")       # 输出: 和: 15
print(f"差: {diff_val}")       # 输出: 差: 5
print(f"积: {product_val}")     # 输出: 积: 50
print(f"商: {quotient_val}")    # 输出: 商: 2.0

# 也可以使用一个变量接收返回值（得到一个元组）
results = calculate(10, 5)
print("所有结果:", results)  # 输出: 所有结果: (15, 5, 50, 2.0)
```

### 返回值的解包

当函数返回多个值时，我们可以使用解包操作来获取这些值。

```python
def get_person_info():
    """获取一个人的信息"""
    name = "张三"
    age = 15
    city = "北京"
    return name, age, city

# 常规的解包
name, age, city = get_person_info()
print(f"姓名: {name}, 年龄: {age}岁, 城市: {city}")  # 输出: 姓名: 张三, 年龄: 15岁, 城市: 北京

# 使用 *_ 忽略某些返回值
name, *_ = get_person_info()
print(f"只关心姓名: {name}")  # 输出: 只关心姓名: 张三

# 使用 * 收集多个返回值
first, *rest = get_person_info()
print(f"第一个返回值: {first}")  # 输出: 第一个返回值: 张三
print(f"其余返回值: {rest}")     # 输出: 其余返回值: [15, '北京']
```

## 函数的作用域

作用域是变量可访问的范围。在Python中，作用域主要分为以下几种：

### 局部作用域（Local）

在函数内部定义的变量具有局部作用域，只能在函数内部访问。

```python
def my_function():
    """测试局部变量"""
    local_var = "我是局部变量"
    print("在函数内部访问:", local_var)

my_function()  # 输出: 在函数内部访问: 我是局部变量
# print(local_var)  # 报错: NameError: name 'local_var' is not defined
```

### 嵌套作用域（Enclosing）

在嵌套函数中，内部函数可以访问外部函数中定义的变量。

```python
def outer_function():
    """测试外部函数"""
    outer_var = "我是外部变量"
    
    def inner_function():
        """测试内部函数"""
        print("在内部函数中访问外部变量:", outer_var)  # 可以访问外部函数的变量
    
    inner_function()

outer_function()  # 输出: 在内部函数中访问外部变量: 我是外部变量
# inner_function()  # 报错: NameError: name 'inner_function' is not defined
```

### 全局作用域（Global）

在模块级别定义的变量具有全局作用域，可以在模块的任何地方访问。

```python
# 全局变量
global_var = "我是全局变量"

def my_function():
    """测试全局变量"""
    print("在函数内部访问全局变量:", global_var)  # 可以访问全局变量

my_function()  # 输出: 在函数内部访问全局变量: 我是全局变量
print("在函数外部访问全局变量:", global_var)  # 输出: 在函数外部访问全局变量: 我是全局变量
```

### 内置作用域（Built-in）

Python内置的函数和变量具有内置作用域，可以在任何地方直接使用。

```python
# 直接使用内置函数和变量
print(len([1, 2, 3]))  # 输出: 3（使用内置函数len）
print(max(1, 2, 3))  # 输出: 3（使用内置函数max）
print(min(1, 2, 3))  # 输出: 1（使用内置函数min）
print(abs(-10))  # 输出: 10（使用内置函数abs）
print(bool(0))  # 输出: False（使用内置函数bool）
```

### global 和 nonlocal 关键字

如果我们想在函数内部修改全局变量，需要使用 `global` 关键字声明该变量。

```python
# 全局变量
global_var = "原始值"

def modify_global():
    """修改全局变量"""
    global global_var  # 声明使用全局变量
    global_var = "修改后的值"
    print("在函数内部修改后的全局变量:", global_var)

print("修改前的全局变量:", global_var)  # 输出: 修改前的全局变量: 原始值
modify_global()  # 输出: 在函数内部修改后的全局变量: 修改后的值
print("函数执行后的全局变量:", global_var)  # 输出: 函数执行后的全局变量: 修改后的值
```

如果我们想在嵌套函数内部修改外部函数的变量，需要使用 `nonlocal` 关键字声明该变量。

```python
def outer_function():
    """测试外部函数"""
    outer_var = "原始值"
    
    def inner_function():
        """修改外部函数的变量"""
        nonlocal outer_var  # 声明使用外部函数的变量
        outer_var = "修改后的值"
        print("在内部函数修改后的外部变量:", outer_var)
    
    print("修改前的外部变量:", outer_var)  # 输出: 修改前的外部变量: 原始值
    inner_function()  # 输出: 在内部函数修改后的外部变量: 修改后的值
    print("内部函数执行后的外部变量:", outer_var)  # 输出: 内部函数执行后的外部变量: 修改后的值

outer_function()
```

## 匿名函数（lambda 表达式）

Python提供了一种简洁的方式来定义匿名函数（即没有名字的函数），称为lambda表达式。lambda表达式的语法如下：

```python
lambda parameters: expression
```

lambda表达式可以接受任意数量的参数，但只能有一个表达式。lambda表达式的返回值是该表达式的结果。

```python
# 定义一个计算平方的lambda函数
square = lambda x: x * x
print("5的平方是:", square(5))  # 输出: 5的平方是: 25

# 定义一个计算两个数之和的lambda函数
sum = lambda a, b: a + b
print("3 + 5 =", sum(3, 5))  # 输出: 3 + 5 = 8

# 定义一个检查数字是否为偶数的lambda函数
is_even = lambda x: x % 2 == 0
print("4是否为偶数?", is_even(4))  # 输出: 4是否为偶数? True
print("5是否为偶数?", is_even(5))  # 输出: 5是否为偶数? False
```

lambda表达式通常与 `map()`、`filter()`、`sorted()` 等函数一起使用，以简化代码。

```python
# 使用lambda表达式与map()函数
numbers = [1, 2, 3, 4, 5]
squared_numbers = list(map(lambda x: x * x, numbers))
print("原列表:", numbers)  # 输出: 原列表: [1, 2, 3, 4, 5]
print("平方后的列表:", squared_numbers)  # 输出: 平方后的列表: [1, 4, 9, 16, 25]

# 使用lambda表达式与filter()函数
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
print("原列表:", numbers)  # 输出: 原列表: [1, 2, 3, 4, 5]
print("偶数列表:", even_numbers)  # 输出: 偶数列表: [2, 4]

# 使用lambda表达式与sorted()函数
people = [("张三", 15), ("李四", 20), ("王五", 18)]
# 按年龄排序
sorted_people = sorted(people, key=lambda person: person[1])
print("原列表:", people)  # 输出: 原列表: [('张三', 15), ('李四', 20), ('王五', 18)]
print("按年龄排序后的列表:", sorted_people)  # 输出: 按年龄排序后的列表: [('张三', 15), ('王五', 18), ('李四', 20)]
```

## 函数式编程工具

Python提供了一些函数式编程的工具，如 `map()`、`filter()`、`reduce()` 等，这些函数通常与lambda表达式一起使用。

### map() 函数

`map()` 函数接收一个函数和一个或多个可迭代对象作为参数，将函数应用于可迭代对象的每个元素，并返回一个包含结果的迭代器。

```python
# 示例1：将列表中的每个元素乘以2
def double(x):
    return x * 2

numbers = [1, 2, 3, 4, 5]
doubled_numbers = list(map(double, numbers))
print("原列表:", numbers)  # 输出: 原列表: [1, 2, 3, 4, 5]
print("乘以2后的列表:", doubled_numbers)  # 输出: 乘以2后的列表: [2, 4, 6, 8, 10]

# 使用lambda表达式简化
numbers = [1, 2, 3, 4, 5]
doubled_numbers = list(map(lambda x: x * 2, numbers))
print("乘以2后的列表:", doubled_numbers)  # 输出: 乘以2后的列表: [2, 4, 6, 8, 10]

# 示例2：将两个列表的对应元素相加
a = [1, 2, 3]
b = [4, 5, 6]
result = list(map(lambda x, y: x + y, a, b))
print("相加后的列表:", result)  # 输出: 相加后的列表: [5, 7, 9]
```

### filter() 函数

`filter()` 函数接收一个函数和一个可迭代对象作为参数，返回一个包含所有使函数返回 `True` 的元素的迭代器。

```python
# 示例1：过滤出列表中的偶数
def is_even(x):
    return x % 2 == 0

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_numbers = list(filter(is_even, numbers))
print("原列表:", numbers)  # 输出: 原列表: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print("偶数列表:", even_numbers)  # 输出: 偶数列表: [2, 4, 6, 8, 10]

# 使用lambda表达式简化
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
print("偶数列表:", even_numbers)  # 输出: 偶数列表: [2, 4, 6, 8, 10]

# 示例2：过滤出列表中长度大于3的字符串
words = ["hi", "hello", "hey", "welcome", "bye"]
long_words = list(filter(lambda word: len(word) > 3, words))
print("原列表:", words)  # 输出: 原列表: ['hi', 'hello', 'hey', 'welcome', 'bye']
print("长度大于3的单词:", long_words)  # 输出: 长度大于3的单词: ['hello', 'welcome']
```

### reduce() 函数

`reduce()` 函数接收一个函数和一个可迭代对象作为参数，将函数应用于可迭代对象的元素，从左到右累积计算结果。需要注意的是，`reduce()` 函数在Python 3中被移到了 `functools` 模块中，需要先导入才能使用。

```python
from functools import reduce

# 示例1：计算列表中所有元素的和
def add(a, b):
    return a + b

numbers = [1, 2, 3, 4, 5]
sum_result = reduce(add, numbers)
print("列表元素的和:", sum_result)  # 输出: 列表元素的和: 15

# 使用lambda表达式简化
numbers = [1, 2, 3, 4, 5]
sum_result = reduce(lambda a, b: a + b, numbers)
print("列表元素的和:", sum_result)  # 输出: 列表元素的和: 15

# 示例2：计算列表中所有元素的积
numbers = [1, 2, 3, 4, 5]
product_result = reduce(lambda a, b: a * b, numbers)
print("列表元素的积:", product_result)  # 输出: 列表元素的积: 120

# 示例3：指定初始值
numbers = [1, 2, 3, 4, 5]
sum_with_initial = reduce(lambda a, b: a + b, numbers, 10)  # 初始值为10
print("列表元素的和（加初始值10）:", sum_with_initial)  # 输出: 列表元素的和（加初始值10）: 25
```

## 编程小贴士

1. **函数命名**：函数名应该清晰地表达函数的功能，使用小写字母和下划线组合（snake_case）。

2. **函数文档字符串**：为函数添加文档字符串，说明函数的功能、参数和返回值，这有助于提高代码的可读性和可维护性。

3. **函数的单一职责**：一个函数应该只负责完成一个任务，这样可以使函数更易于理解、测试和维护。

4. **默认参数的使用**：对于一些常用的参数，可以提供默认值，这样可以简化函数的调用。但要注意，默认参数应该是不可变对象。

5. **避免过多的参数**：一个函数的参数不宜过多，一般不超过5个。如果参数过多，说明函数可能承担了过多的职责，或者可以考虑将一些参数组合成一个数据结构（如字典）。

6. **使用关键字参数提高可读性**：对于一些意义不明确的参数，使用关键字参数可以提高代码的可读性。

7. **合理使用lambda表达式**：lambda表达式适合定义简单的、单行的函数，但对于复杂的函数，应该使用 `def` 关键字定义。

8. **注意作用域**：理解变量的作用域规则，避免在函数内部意外修改全局变量。如果需要修改全局变量，使用 `global` 关键字声明。

## 动手练习

1. 编写一个函数，计算斐波那契数列的第n项。斐波那契数列的定义是：F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2)（n≥2）。

2. 编写一个函数，判断一个数是否为素数。

3. 编写一个函数，将列表中的元素去重，并保持原有的顺序。

4. 编写一个函数，计算列表中所有元素的平均值。

5. 编写一个函数，统计一个文本中每个单词出现的次数。

## 挑战任务

### 任务1：编写一个简单的计算器

编写一个程序，实现以下功能：

1. 提供加、减、乘、除四种基本运算
2. 支持连续计算
3. 支持清除当前计算结果
4. 支持退出程序

```python
def add(a, b):
    """计算两个数的和"""
    return a + b

def subtract(a, b):
    """计算两个数的差"""
    return a - b

def multiply(a, b):
    """计算两个数的积"""
    return a * b

def divide(a, b):
    """计算两个数的商"""
    if b == 0:
        raise ValueError("除数不能为零！")
    return a / b

def calculator():
    """简单计算器"""
    result = 0
    operations = {
        '+': add,
        '-': subtract,
        '*': multiply,
        '/': divide
    }
    
    print("欢迎使用简单计算器！")
    print("可用操作：+", "-", "*", "/", "c（清除）", "q（退出）")
    
    while True:
        # 显示当前结果
        print(f"\n当前结果: {result}")
        
        # 获取用户输入的操作符
        op = input("请输入操作符: ").strip()
        
        # 处理特殊操作
        if op.lower() == 'q':
            print("感谢使用计算器，再见！")
            break
        elif op.lower() == 'c':
            result = 0
            print("已清除结果！")
            continue
        
        # 检查操作符是否有效
        if op not in operations:
            print("无效的操作符，请重新输入！")
            continue
        
        # 获取用户输入的数字
        try:
            num = float(input("请输入数字: "))
        except ValueError:
            print("无效的数字，请重新输入！")
            continue
        
        # 执行计算
        try:
            result = operations[op](result, num)
        except ValueError as e:
            print(f"错误: {e}")

# 运行计算器
if __name__ == "__main__":
    calculator()
```

### 任务2：编写一个简单的排序算法库

编写一个程序，实现以下几种常见的排序算法：

1. 冒泡排序（Bubble Sort）
2. 选择排序（Selection Sort）
3. 插入排序（Insertion Sort）
4. 快速排序（Quick Sort）

并提供一个统一的接口，让用户可以选择使用哪种排序算法。

```python
def bubble_sort(arr):
    """冒泡排序
    时间复杂度：O(n^2)
    空间复杂度：O(1)
    稳定性：稳定
    """
    # 创建数组的副本，避免修改原数组
    arr_copy = arr.copy()
    n = len(arr_copy)
    
    # 外循环：遍历所有元素
    for i in range(n):
        # 标记本轮是否发生了交换
        swapped = False
        
        # 内循环：比较相邻元素并交换
        # 注意：每轮结束后，最大的元素会"冒泡"到末尾
        # 因此，每轮的比较范围可以逐渐缩小
        for j in range(0, n - i - 1):
            if arr_copy[j] > arr_copy[j + 1]:
                # 交换元素
                arr_copy[j], arr_copy[j + 1] = arr_copy[j + 1], arr_copy[j]
                swapped = True
        
        # 如果本轮没有发生交换，说明数组已经有序，提前结束
        if not swapped:
            break
    
    return arr_copy

def selection_sort(arr):
    """选择排序
    时间复杂度：O(n^2)
    空间复杂度：O(1)
    稳定性：不稳定
    """
    # 创建数组的副本，避免修改原数组
    arr_copy = arr.copy()
    n = len(arr_copy)
    
    # 外循环：遍历所有元素
    for i in range(n):
        # 假设当前位置的元素是最小值
        min_idx = i
        
        # 内循环：在未排序部分查找最小值
        for j in range(i + 1, n):
            if arr_copy[j] < arr_copy[min_idx]:
                min_idx = j
        
        # 将找到的最小值与当前位置的元素交换
        arr_copy[i], arr_copy[min_idx] = arr_copy[min_idx], arr_copy[i]
    
    return arr_copy

def insertion_sort(arr):
    """插入排序
    时间复杂度：O(n^2)
    空间复杂度：O(1)
    稳定性：稳定
    """
    # 创建数组的副本，避免修改原数组
    arr_copy = arr.copy()
    n = len(arr_copy)
    
    # 外循环：从第二个元素开始遍历
    for i in range(1, n):
        # 保存当前元素，准备插入
        key = arr_copy[i]
        
        # 内循环：在已排序部分查找插入位置
        j = i - 1
        while j >= 0 and key < arr_copy[j]:
            # 将大于key的元素向后移动
            arr_copy[j + 1] = arr_copy[j]
            j -= 1
        
        # 插入元素
        arr_copy[j + 1] = key
    
    return arr_copy

def quick_sort(arr):
    """快速排序
    时间复杂度：平均O(nlogn)，最坏O(n^2)
    空间复杂度：平均O(logn)，最坏O(n)
    稳定性：不稳定
    """
    # 创建数组的副本，避免修改原数组
    arr_copy = arr.copy()
    
    # 定义递归辅助函数
    def _quick_sort(lst, low, high):
        if low < high:
            # 找到分区点
            pivot_idx = partition(lst, low, high)
            
            # 递归排序分区点左侧和右侧的子数组
            _quick_sort(lst, low, pivot_idx - 1)
            _quick_sort(lst, pivot_idx + 1, high)
    
    # 定义分区函数
    def partition(lst, low, high):
        # 选择最右边的元素作为基准
        pivot = lst[high]
        
        # i指向小于基准的元素应该放置的位置
        i = low - 1
        
        # 遍历子数组
        for j in range(low, high):
            # 如果当前元素小于或等于基准，将其交换到前面
            if lst[j] <= pivot:
                i += 1
                lst[i], lst[j] = lst[j], lst[i]
        
        # 将基准元素放到正确的位置
        lst[i + 1], lst[high] = lst[high], lst[i + 1]
        
        # 返回基准元素的索引
        return i + 1
    
    # 调用递归辅助函数
    _quick_sort(arr_copy, 0, len(arr_copy) - 1)
    
    return arr_copy

def sort_array(arr, algorithm="quick"):
    """统一的排序接口
    参数:
        arr: 待排序的数组
        algorithm: 排序算法，可选值：bubble, selection, insertion, quick
    返回:
        排序后的数组
    """
    # 映射算法名称到对应的函数
    algorithms = {
        "bubble": bubble_sort,
        "selection": selection_sort,
        "insertion": insertion_sort,
        "quick": quick_sort
    }
    
    # 检查算法名称是否有效
    if algorithm.lower() not in algorithms:
        raise ValueError(f"不支持的排序算法: {algorithm}")
    
    # 调用对应的排序函数
    return algorithms[algorithm.lower()](arr)

# 测试排序算法
if __name__ == "__main__":
    import random
    
    # 生成随机测试数组
    test_array = [random.randint(1, 100) for _ in range(10)]
    print(f"原始数组: {test_array}")
    
    # 测试不同的排序算法
    sorted_array_bubble = sort_array(test_array, "bubble")
    print(f"冒泡排序结果: {sorted_array_bubble}")
    
    sorted_array_selection = sort_array(test_array, "selection")
    print(f"选择排序结果: {sorted_array_selection}")
    
    sorted_array_insertion = sort_array(test_array, "insertion")
    print(f"插入排序结果: {sorted_array_insertion}")
    
    sorted_array_quick = sort_array(test_array, "quick")
    print(f"快速排序结果: {sorted_array_quick}")
    
    # 验证排序结果是否正确
    expected = sorted(test_array)
    print(f"Python内置排序结果: {expected}")
    print(f"所有排序结果是否一致: {sorted_array_bubble == sorted_array_selection == sorted_array_insertion == sorted_array_quick == expected}")
    
    # 提供交互式排序功能
    while True:
        try:
            user_input = input("\n请输入要排序的数字列表（用空格分隔，输入'q'退出）: ")
            if user_input.lower() == 'q':
                break
            
            # 将用户输入的字符串转换为数字列表
            user_array = [float(num) for num in user_input.split()]
            
            # 让用户选择排序算法
            print("可选的排序算法：bubble（冒泡排序）, selection（选择排序）, insertion（插入排序）, quick（快速排序）")
            user_algorithm = input("请选择排序算法（默认quick）: ").strip()
            
            # 如果用户没有输入，使用默认算法
            if not user_algorithm:
                user_algorithm = "quick"
            
            # 执行排序
            sorted_array = sort_array(user_array, user_algorithm)
            print(f"排序结果: {sorted_array}")
        except Exception as e:
            print(f"错误: {e}")
    
    print("感谢使用排序算法库！")
```

通过本节课的学习，我们已经掌握了Python函数的定义、调用、参数类型、作用域等内容，以及函数式编程的一些工具。函数是Python编程中非常重要的概念，合理使用函数可以使我们的代码更加模块化、可重用和易于维护。在接下来的课程中，我们将学习更多Python的高级特性和应用。
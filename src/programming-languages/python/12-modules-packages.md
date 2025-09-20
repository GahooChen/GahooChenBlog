# 模块与包：代码的组织与重用

在Python中，模块是一个包含Python定义和语句的文件，其文件名就是模块名加上`.py`后缀。包是一个包含多个模块的目录，用于组织相关的模块。本节课，我们将学习Python中模块和包的概念、导入和使用方法，以及如何创建自己的模块和包。

## 模块的基本概念

模块是Python程序组织结构的一个重要层次。每个Python文件都是一个模块，模块名就是文件名（不包括扩展名`.py`）。使用模块可以：

1. 组织相关的代码，使代码更加清晰和易于维护
2. 实现代码的重用
3. 避免命名冲突

### 导入模块

在Python中，我们可以使用`import`语句来导入模块。导入模块后，我们可以使用模块中定义的函数、类和变量。

```python
# 导入整个模块
import math

# 使用模块中的函数
print("圆周率π的值:", math.pi)  # 输出: 圆周率π的值: 3.141592653589793
print("2的平方根:", math.sqrt(2))  # 输出: 2的平方根: 1.4142135623730951
print("正弦值sin(π/2):", math.sin(math.pi / 2))  # 输出: 正弦值sin(π/2): 1.0

# 导入模块并指定别名
import math as m

# 使用别名访问模块中的函数
print("圆周率π的值:", m.pi)  # 输出: 圆周率π的值: 3.141592653589793
print("2的平方根:", m.sqrt(2))  # 输出: 2的平方根: 1.4142135623730951

# 从模块中导入特定的函数、类或变量
from math import pi, sqrt, sin

# 直接使用导入的函数、类或变量，不需要前缀
print("圆周率π的值:", pi)  # 输出: 圆周率π的值: 3.141592653589793
print("2的平方根:", sqrt(2))  # 输出: 2的平方根: 1.4142135623730951
print("正弦值sin(π/2):", sin(pi / 2))  # 输出: 正弦值sin(π/2): 1.0

# 从模块中导入所有内容（不推荐，因为可能导致命名冲突）
from math import *

# 直接使用导入的函数、类或变量
print("圆周率π的值:", pi)  # 输出: 圆周率π的值: 3.141592653589793
print("2的平方根:", sqrt(2))  # 输出: 2的平方根: 1.4142135623730951
```

### 模块的搜索路径

当我们导入一个模块时，Python会按照以下顺序搜索模块：

1. 当前目录
2. PYTHONPATH环境变量中列出的目录
3. Python标准库目录
4. 任何.pth文件中列出的目录

我们可以通过`sys.path`查看当前Python的搜索路径：

```python
import sys

# 查看Python的模块搜索路径
print("Python的模块搜索路径:")
for path in sys.path:
    print(path)
```

如果我们想临时添加一个目录到搜索路径中，可以使用`sys.path.append()`方法：

```python
import sys

# 添加一个目录到模块搜索路径
sys.path.append("/path/to/your/module")

# 现在可以导入该目录下的模块了
import your_module
```

### 模块的`__name__`属性

每个模块都有一个`__name__`属性，它的值取决于模块是如何被执行的：

- 如果模块是被直接执行的，`__name__`的值为`"__main__"`
- 如果模块是被导入的，`__name__`的值为模块名

我们可以使用这个属性来判断模块是被直接执行还是被导入的，这在编写测试代码或演示代码时非常有用：

```python
# 在模块中添加测试代码
if __name__ == "__main__":
    # 只有当模块被直接执行时，这段代码才会运行
    print("模块被直接执行了！")
    # 这里可以添加测试代码
```

## 创建自己的模块

创建自己的模块非常简单，只需要创建一个包含Python代码的`.py`文件即可。下面是一个简单的例子：

### 创建模块文件

首先，创建一个名为`my_module.py`的文件，内容如下：

```python
# my_module.py

"""这是一个简单的模块，用于演示模块的创建和使用"""

# 定义变量
PI = 3.141592653589793
E = 2.718281828459045

# 定义函数
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

# 定义类
class Calculator:
    """简单计算器类"""
    
    def __init__(self):
        """初始化计算器"""
        self.result = 0
    
    def add(self, num):
        """加法运算"""
        self.result += num
        return self.result
    
    def subtract(self, num):
        """减法运算"""
        self.result -= num
        return self.result
    
    def multiply(self, num):
        """乘法运算"""
        self.result *= num
        return self.result
    
    def divide(self, num):
        """除法运算"""
        if num == 0:
            raise ValueError("除数不能为零！")
        self.result /= num
        return self.result
    
    def clear(self):
        """清除结果"""
        self.result = 0
        return self.result

# 模块测试代码
if __name__ == "__main__":
    print("测试my_module模块...")
    print(f"PI = {PI}")
    print(f"E = {E}")
    print(f"2 + 3 = {add(2, 3)}")
    print(f"5 - 2 = {subtract(5, 2)}")
    print(f"3 * 4 = {multiply(3, 4)}")
    print(f"8 / 2 = {divide(8, 2)}")
    
    calc = Calculator()
    calc.add(10)
    calc.multiply(2)
    print(f"计算器结果: {calc.result}")
```

### 使用自己的模块

创建完模块后，我们可以在其他Python文件中导入并使用这个模块：

```python
# 使用自定义模块
def use_my_module():
    # 导入整个模块
    import my_module
    
    # 使用模块中的变量
    print(f"PI = {my_module.PI}")  # 输出: PI = 3.141592653589793
    print(f"E = {my_module.E}")  # 输出: E = 2.718281828459045
    
    # 使用模块中的函数
    print(f"2 + 3 = {my_module.add(2, 3)}")  # 输出: 2 + 3 = 5
    print(f"5 - 2 = {my_module.subtract(5, 2)}")  # 输出: 5 - 2 = 3
    print(f"3 * 4 = {my_module.multiply(3, 4)}")  # 输出: 3 * 4 = 12
    print(f"8 / 2 = {my_module.divide(8, 2)}")  # 输出: 8 / 2 = 4.0
    
    # 使用模块中的类
    calc = my_module.Calculator()
    calc.add(10)
    calc.multiply(2)
    print(f"计算器结果: {calc.result}")  # 输出: 计算器结果: 20.0
    
    # 导入模块并指定别名
    import my_module as mm
    
    # 使用别名访问模块中的内容
    print(f"PI = {mm.PI}")  # 输出: PI = 3.141592653589793
    print(f"3 + 4 = {mm.add(3, 4)}")  # 输出: 3 + 4 = 7
    
    # 从模块中导入特定的内容
    from my_module import PI, add, Calculator
    
    # 直接使用导入的内容
    print(f"PI = {PI}")  # 输出: PI = 3.141592653589793
    print(f"5 + 6 = {add(5, 6)}")  # 输出: 5 + 6 = 11
    
    calc2 = Calculator()
    calc2.add(5)
    calc2.add(5)
    print(f"计算器结果: {calc2.result}")  # 输出: 计算器结果: 10.0

# 执行测试
if __name__ == "__main__":
    use_my_module()
```

## 包的基本概念

包是一个包含多个模块的目录，用于组织相关的模块。包目录必须包含一个名为`__init__.py`的文件（在Python 3.3+中，这个文件不是必需的，但为了保持兼容性，建议仍然创建这个文件）。使用包可以：

1. 更好地组织大型项目的代码
2. 避免模块名称冲突
3. 提供命名空间

### 创建包

创建包的步骤如下：

1. 创建一个目录，作为包的名称
2. 在该目录下创建一个`__init__.py`文件
3. 在该目录下创建其他模块文件

下面是一个简单的包的结构示例：

```
my_package/
    __init__.py
    module1.py
    module2.py
    subpackage/
        __init__.py
        module3.py
        module4.py
```

#### 1. 创建`__init__.py`文件

`__init__.py`文件可以是空的，也可以包含一些初始化代码。在这个文件中，我们可以定义包级别的变量、函数和类，也可以导入子模块以方便使用。

```python
# my_package/__init__.py

"""这是my_package包的初始化文件"""

# 定义包级别的变量
VERSION = "1.0.0"
AUTHOR = "Gahoo Chen"

# 从子模块中导入常用的函数和类
from .module1 import function1, Class1
from .module2 import function2, Class2

# 定义__all__变量，用于控制from module import *时导入的内容
__all__ = ["VERSION", "AUTHOR", "function1", "Class1", "function2", "Class2"]
```

#### 2. 创建模块文件

在包目录下创建模块文件，例如`module1.py`和`module2.py`：

```python
# my_package/module1.py

"""这是module1模块"""

def function1():
    """module1中的函数1"""
    return "This is function1 in module1"

class Class1:
    """module1中的类1"""
    
    def __init__(self):
        """初始化Class1"""
        self.name = "Class1"
    
    def get_name(self):
        """获取类名"""
        return self.name
```

```python
# my_package/module2.py

"""这是module2模块"""

def function2():
    """module2中的函数2"""
    return "This is function2 in module2"

class Class2:
    """module2中的类2"""
    
    def __init__(self):
        """初始化Class2"""
        self.name = "Class2"
    
    def get_name(self):
        """获取类名"""
        return self.name
```

#### 3. 创建子包

在包目录下创建子包目录，并在子包目录中创建`__init__.py`文件和模块文件：

```python
# my_package/subpackage/__init__.py

"""这是subpackage子包的初始化文件"""

# 从子模块中导入常用的函数和类
from .module3 import function3, Class3
from .module4 import function4, Class4

# 定义__all__变量
__all__ = ["function3", "Class3", "function4", "Class4"]
```

```python
# my_package/subpackage/module3.py

"""这是module3模块"""

def function3():
    """module3中的函数3"""
    return "This is function3 in module3"

class Class3:
    """module3中的类3"""
    
    def __init__(self):
        """初始化Class3"""
        self.name = "Class3"
    
    def get_name(self):
        """获取类名"""
        return self.name
```

```python
# my_package/subpackage/module4.py

"""这是module4模块"""

def function4():
    """module4中的函数4"""
    return "This is function4 in module4"

class Class4:
    """module4中的类4"""
    
    def __init__(self):
        """初始化Class4"""
        self.name = "Class4"
    
    def get_name(self):
        """获取类名"""
        return self.name
```

### 导入包和包中的模块

导入包和包中的模块的方法有多种：

```python
# 导入整个包
import my_package

# 使用包中的变量
print(f"包版本: {my_package.VERSION}")  # 输出: 包版本: 1.0.0
print(f"包作者: {my_package.AUTHOR}")  # 输出: 包作者: Gahoo Chen

# 使用包中导入的函数和类
print(my_package.function1())  # 输出: This is function1 in module1
obj1 = my_package.Class1()
print(obj1.get_name())  # 输出: Class1

# 导入包并指定别名
import my_package as mp

# 使用别名访问包中的内容
print(f"包版本: {mp.VERSION}")  # 输出: 包版本: 1.0.0
print(mp.function2())  # 输出: This is function2 in module2

# 导入包中的特定模块
import my_package.module1

# 使用模块中的函数和类
print(my_package.module1.function1())  # 输出: This is function1 in module1
obj2 = my_package.module1.Class1()
print(obj2.get_name())  # 输出: Class1

# 导入包中的模块并指定别名
import my_package.module2 as mm2

# 使用别名访问模块中的内容
print(mm2.function2())  # 输出: This is function2 in module2
obj3 = mm2.Class2()
print(obj3.get_name())  # 输出: Class2

# 从包中导入特定的模块
from my_package import module1, module2

# 使用模块中的函数和类
print(module1.function1())  # 输出: This is function1 in module1
print(module2.function2())  # 输出: This is function2 in module2

# 从包中的模块导入特定的函数和类
from my_package.module1 import function1, Class1
from my_package.module2 import function2 as f2, Class2 as C2

# 直接使用导入的函数和类
print(function1())  # 输出: This is function1 in module1
obj4 = Class1()
print(obj4.get_name())  # 输出: Class1
print(f2())  # 输出: This is function2 in module2
obj5 = C2()
print(obj5.get_name())  # 输出: Class2

# 导入子包
import my_package.subpackage

# 使用子包中的内容
print(my_package.subpackage.function3())  # 输出: This is function3 in module3
obj6 = my_package.subpackage.Class3()
print(obj6.get_name())  # 输出: Class3

# 从子包中导入模块
from my_package.subpackage import module3, module4

# 使用模块中的内容
print(module3.function3())  # 输出: This is function3 in module3
print(module4.function4())  # 输出: This is function4 in module4

# 从子包的模块中导入特定的内容
from my_package.subpackage.module3 import function3
from my_package.subpackage.module4 import Class4

# 直接使用导入的内容
print(function3())  # 输出: This is function3 in module3
obj7 = Class4()
print(obj7.get_name())  # 输出: Class4
```

## Python标准库简介

Python标准库是Python自带的一组模块和包，提供了许多常用的功能。下面是一些常用的标准库模块：

### 1. os模块

`os`模块提供了与操作系统交互的功能，如文件操作、目录操作、环境变量等。

```python
import os

# 获取当前工作目录
current_dir = os.getcwd()
print(f"当前工作目录: {current_dir}")

# 列出目录中的文件和子目录
files = os.listdir(current_dir)
print(f"当前目录中的文件和子目录: {files}")

# 创建目录
new_dir = os.path.join(current_dir, "new_dir")
if not os.path.exists(new_dir):
    os.makedirs(new_dir)
    print(f"已创建目录: {new_dir}")

# 删除目录（只能删除空目录）
if os.path.exists(new_dir):
    os.rmdir(new_dir)
    print(f"已删除目录: {new_dir}")

# 判断是否为文件
a_file = __file__  # 当前文件
print(f"{a_file}是否为文件: {os.path.isfile(a_file)}")

# 判断是否为目录
a_dir = os.path.dirname(a_file)
print(f"{a_dir}是否为目录: {os.path.isdir(a_dir)}")

# 获取文件大小
if os.path.isfile(a_file):
    file_size = os.path.getsize(a_file)
    print(f"{a_file}的大小: {file_size} 字节")

# 获取环境变量
python_path = os.environ.get("PYTHONPATH")
print(f"PYTHONPATH环境变量: {python_path}")
```

### 2. sys模块

`sys`模块提供了与Python解释器交互的功能，如命令行参数、解释器版本、模块搜索路径等。

```python
import sys

# 获取命令行参数
args = sys.argv
print(f"命令行参数: {args}")

# 获取Python解释器版本
print(f"Python版本: {sys.version}")

# 获取模块搜索路径
print(f"模块搜索路径: {sys.path}")

# 获取当前平台
print(f"当前平台: {sys.platform}")

# 退出程序
sys.exit(0)  # 0表示正常退出，非0表示异常退出
```

### 3. datetime模块

`datetime`模块提供了处理日期和时间的功能。

```python
import datetime

# 获取当前日期和时间
now = datetime.datetime.now()
print(f"当前日期和时间: {now}")

# 获取当前日期
today = datetime.date.today()
print(f"当前日期: {today}")

# 创建指定的日期和时间
specific_datetime = datetime.datetime(2023, 1, 1, 12, 0, 0)
print(f"指定的日期和时间: {specific_datetime}")

# 格式化日期和时间
formatted_datetime = now.strftime("%Y-%m-%d %H:%M:%S")
print(f"格式化后的日期和时间: {formatted_datetime}")

# 解析字符串为日期和时间
datetime_str = "2023-01-01 12:00:00"
parsed_datetime = datetime.datetime.strptime(datetime_str, "%Y-%m-%d %H:%M:%S")
print(f"解析后的日期和时间: {parsed_datetime}")

# 日期和时间的运算
tomorrow = today + datetime.timedelta(days=1)
print(f"明天的日期: {tomorrow}")
yesterday = today - datetime.timedelta(days=1)
print(f"昨天的日期: {yesterday}")

# 计算两个日期之间的天数差
date1 = datetime.date(2023, 1, 1)
date2 = datetime.date(2023, 12, 31)
days_diff = (date2 - date1).days
print(f"{date1}和{date2}之间的天数差: {days_diff}")
```

### 4. random模块

`random`模块提供了生成随机数的功能。

```python
import random

# 生成[0, 1)之间的随机浮点数
random_float = random.random()
print(f"随机浮点数: {random_float}")

# 生成[1, 10]之间的随机整数
random_int = random.randint(1, 10)
print(f"随机整数: {random_int}")

# 从序列中随机选择一个元素
items = [1, 2, 3, 4, 5]
random_item = random.choice(items)
print(f"随机选择的元素: {random_item}")

# 从序列中随机选择多个不重复的元素
random_items = random.sample(items, 3)
print(f"随机选择的3个不重复元素: {random_items}")

# 打乱序列的顺序（原地操作）
items_copy = items.copy()
random.shuffle(items_copy)
print(f"打乱顺序后的序列: {items_copy}")

# 生成[start, end)之间的随机浮点数
random_uniform = random.uniform(1.0, 10.0)
print(f"[1.0, 10.0)之间的随机浮点数: {random_uniform}")
```

### 5. collections模块

`collections`模块提供了一些扩展的数据类型，如有序字典、命名元组、计数器等。

```python
import collections

# Counter：用于计数
words = ["apple", "banana", "apple", "orange", "banana", "apple"]
word_counts = collections.Counter(words)
print(f"单词计数: {word_counts}")  # 输出: 单词计数: Counter({'apple': 3, 'banana': 2, 'orange': 1})

# 获取出现次数最多的前n个元素
most_common = word_counts.most_common(2)
print(f"出现次数最多的2个元素: {most_common}")  # 输出: 出现次数最多的2个元素: [('apple', 3), ('banana', 2)]

# defaultdict：带有默认值的字典
from collections import defaultdict

# 创建一个默认值为0的字典
counts = defaultdict(int)
for word in words:
    counts[word] += 1
print(f"使用defaultdict的单词计数: {dict(counts)}")  # 输出: 使用defaultdict的单词计数: {'apple': 3, 'banana': 2, 'orange': 1}

# 创建一个默认值为列表的字典
from collections import defaultdict

groups = defaultdict(list)
people = [("张三", "A组"), ("李四", "B组"), ("王五", "A组"), ("赵六", "B组")]
for name, group in people:
    groups[group].append(name)
print(f"按组分组的人员: {dict(groups)}")  # 输出: 按组分组的人员: {'A组': ['张三', '王五'], 'B组': ['李四', '赵六']}

# namedtuple：命名元组
from collections import namedtuple

# 定义一个命名元组类型
Person = namedtuple("Person", ["name", "age", "city"])

# 创建命名元组实例
p1 = Person("张三", 15, "北京")
p2 = Person(name="李四", age=20, city="上海")

# 访问命名元组的字段
print(f"p1的姓名: {p1.name}")  # 输出: p1的姓名: 张三
print(f"p1的年龄: {p1.age}")  # 输出: p1的年龄: 15
print(f"p1的城市: {p1.city}")  # 输出: p1的城市: 北京
print(f"p2: {p2}")  # 输出: p2: Person(name='李四', age=20, city='上海')

# OrderedDict：有序字典（在Python 3.7+中，普通字典也保持插入顺序）
from collections import OrderedDict

# 创建一个有序字典
ordered_dict = OrderedDict()
ordered_dict["a"] = 1
ordered_dict["b"] = 2
ordered_dict["c"] = 3

# 遍历有序字典
print("遍历有序字典:")
for key, value in ordered_dict.items():
    print(f"{key}: {value}")
```

## 编程小贴士

1. **模块的命名**：模块名应该简短、有描述性，使用小写字母和下划线组合（snake_case），避免使用Python的保留字和内置函数名。

2. **包的结构**：合理组织包的结构，将相关的模块放在同一个包中，使用子包来组织更复杂的层次结构。

3. **`__init__.py`文件**：在包目录下创建`__init__.py`文件，即使它是空的。这个文件可以用于初始化包、定义包级别的变量和函数、导入子模块等。

4. **`__all__`变量**：在`__init__.py`文件和模块文件中定义`__all__`变量，用于控制`from module import *`时导入的内容，这可以避免导入不必要的内容和命名冲突。

5. **相对导入**：在包内部使用相对导入（如`from . import module`或`from .. import module`）来导入同一包中的其他模块，这样可以使包更加独立。

6. **避免循环导入**：尽量避免循环导入（两个模块相互导入对方），这可能会导致程序出现错误。如果无法避免，可以尝试将导入语句移到函数内部，或者重构代码。

7. **使用标准库**：Python的标准库提供了许多有用的功能，在编写代码时，优先考虑使用标准库中的模块，而不是自己重新实现类似的功能。

8. **模块的文档字符串**：为模块添加文档字符串，说明模块的功能、作者、版本等信息，这有助于提高代码的可读性和可维护性。

## 动手练习

1. 创建一个名为`my_math`的模块，包含以下功能：计算圆的面积和周长、计算三角形的面积、计算矩形的面积和周长。

2. 创建一个名为`my_utils`的包，包含以下模块：
   - `string_utils.py`：包含字符串处理的工具函数，如反转字符串、判断是否为回文等
   - `file_utils.py`：包含文件操作的工具函数，如读取文件、写入文件等
   - `list_utils.py`：包含列表处理的工具函数，如去重、排序等

3. 编写一个程序，使用你创建的`my_math`模块和`my_utils`包来解决一些实际问题。

4. 查阅Python标准库文档，了解`json`、`csv`、`logging`等模块的用法，并编写一些示例代码。

5. 编写一个程序，使用`os`和`sys`模块来实现一些文件和目录操作的功能，如批量重命名文件、查找文件等。

## 挑战任务

### 任务1：创建一个简单的数学库

创建一个名为`simple_math`的包，提供一些常用的数学函数和类。包的结构如下：

```
simple_math/
    __init__.py
    basic_operations.py  # 基本运算
    advanced_operations.py  # 高级运算
    geometry.py  # 几何计算
    statistics.py  # 统计计算
```

每个模块的具体要求：

1. `basic_operations.py`：包含加减乘除等基本运算函数
2. `advanced_operations.py`：包含幂运算、平方根、阶乘等高级运算函数
3. `geometry.py`：包含计算各种几何图形的面积和周长的函数和类
4. `statistics.py`：包含计算平均值、中位数、方差等统计量的函数

在`__init__.py`文件中导入这些模块中的常用函数和类，以便用户可以直接从包中导入它们。

```python
# simple_math/__init__.py

"""simple_math包：一个简单的数学库"""

__version__ = "1.0.0"
__author__ = "Gahoo Chen"

# 从各个模块中导入常用的函数和类
from .basic_operations import add, subtract, multiply, divide
from .advanced_operations import power, square_root, factorial, fibonacci
from .geometry import calculate_circle_area, calculate_circle_circumference
from .geometry import calculate_rectangle_area, calculate_rectangle_perimeter
from .geometry import calculate_triangle_area
from .geometry import Circle, Rectangle, Triangle
from .statistics import calculate_mean, calculate_median, calculate_variance, calculate_standard_deviation

# 定义__all__变量，控制from simple_math import *时导入的内容
__all__ = [
    # 基本运算
    "add", "subtract", "multiply", "divide",
    # 高级运算
    "power", "square_root", "factorial", "fibonacci",
    # 几何计算
    "calculate_circle_area", "calculate_circle_circumference",
    "calculate_rectangle_area", "calculate_rectangle_perimeter",
    "calculate_triangle_area",
    "Circle", "Rectangle", "Triangle",
    # 统计计算
    "calculate_mean", "calculate_median", "calculate_variance", "calculate_standard_deviation"
]
```

```python
# simple_math/basic_operations.py

"""basic_operations模块：提供基本的数学运算功能"""

def add(a, b):
    """计算两个数的和
    参数:
        a: 第一个数
        b: 第二个数
    返回:
        两个数的和
    """
    return a + b

def subtract(a, b):
    """计算两个数的差
    参数:
        a: 被减数
        b: 减数
    返回:
        两个数的差
    """
    return a - b

def multiply(a, b):
    """计算两个数的积
    参数:
        a: 第一个数
        b: 第二个数
    返回:
        两个数的积
    """
    return a * b

def divide(a, b):
    """计算两个数的商
    参数:
        a: 被除数
        b: 除数
    返回:
        两个数的商
    异常:
        ValueError: 当除数为0时抛出
    """
    if b == 0:
        raise ValueError("除数不能为零！")
    return a / b
```

```python
# simple_math/advanced_operations.py

"""advanced_operations模块：提供高级的数学运算功能"""
import math

def power(base, exponent):
    """计算幂运算
    参数:
        base: 底数
        exponent: 指数
    返回:
        base的exponent次幂
    """
    return base ** exponent

def square_root(n):
    """计算平方根
    参数:
        n: 要计算平方根的数
    返回:
        n的平方根
    异常:
        ValueError: 当n为负数时抛出
    """
    if n < 0:
        raise ValueError("不能计算负数的平方根！")
    return math.sqrt(n)

def factorial(n):
    """计算阶乘
    参数:
        n: 要计算阶乘的整数
    返回:
        n的阶乘
    异常:
        ValueError: 当n为负数或非整数时抛出
    """
    if not isinstance(n, int):
        raise ValueError("阶乘只能计算整数！")
    if n < 0:
        raise ValueError("不能计算负数的阶乘！")
    if n == 0 or n == 1:
        return 1
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

def fibonacci(n):
    """计算斐波那契数列的第n项
    斐波那契数列定义：F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2)（n≥2）
    参数:
        n: 项数（从0开始）
    返回:
        斐波那契数列的第n项
    异常:
        ValueError: 当n为负数或非整数时抛出
    """
    if not isinstance(n, int):
        raise ValueError("斐波那契数列的项数必须是整数！")
    if n < 0:
        raise ValueError("斐波那契数列的项数不能为负数！")
    if n == 0:
        return 0
    if n == 1:
        return 1
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b
```

```python
# simple_math/geometry.py

"""geometry模块：提供几何计算功能"""
import math

def calculate_circle_area(radius):
    """计算圆的面积
    参数:
        radius: 圆的半径
    返回:
        圆的面积
    异常:
        ValueError: 当半径为负数时抛出
    """
    if radius < 0:
        raise ValueError("圆的半径不能为负数！")
    return math.pi * radius ** 2

def calculate_circle_circumference(radius):
    """计算圆的周长
    参数:
        radius: 圆的半径
    返回:
        圆的周长
    异常:
        ValueError: 当半径为负数时抛出
    """
    if radius < 0:
        raise ValueError("圆的半径不能为负数！")
    return 2 * math.pi * radius

def calculate_rectangle_area(length, width):
    """计算矩形的面积
    参数:
        length: 矩形的长
        width: 矩形的宽
    返回:
        矩形的面积
    异常:
        ValueError: 当长或宽为负数时抛出
    """
    if length < 0 or width < 0:
        raise ValueError("矩形的长和宽不能为负数！")
    return length * width

def calculate_rectangle_perimeter(length, width):
    """计算矩形的周长
    参数:
        length: 矩形的长
        width: 矩形的宽
    返回:
        矩形的周长
    异常:
        ValueError: 当长或宽为负数时抛出
    """
    if length < 0 or width < 0:
        raise ValueError("矩形的长和宽不能为负数！")
    return 2 * (length + width)

def calculate_triangle_area(a, b, c):
    """使用海伦公式计算三角形的面积
    参数:
        a: 三角形的第一条边长
        b: 三角形的第二条边长
        c: 三角形的第三条边长
    返回:
        三角形的面积
    异常:
        ValueError: 当任意边长为负数或无法构成三角形时抛出
    """
    # 检查边长是否为正数
    if a <= 0 or b <= 0 or c <= 0:
        raise ValueError("三角形的边长必须为正数！")
    # 检查是否能构成三角形（任意两边之和大于第三边）
    if a + b <= c or a + c <= b or b + c <= a:
        raise ValueError("给定的边长无法构成三角形！")
    # 使用海伦公式计算面积
    s = (a + b + c) / 2  # 半周长
    area = math.sqrt(s * (s - a) * (s - b) * (s - c))
    return area

class Circle:
    """圆类"""
    
    def __init__(self, radius):
        """初始化圆
        参数:
            radius: 圆的半径
        异常:
            ValueError: 当半径为负数时抛出
        """
        if radius < 0:
            raise ValueError("圆的半径不能为负数！")
        self.radius = radius
    
    def area(self):
        """计算圆的面积"""
        return math.pi * self.radius ** 2
    
    def circumference(self):
        """计算圆的周长"""
        return 2 * math.pi * self.radius
    
    def __str__(self):
        """返回圆的字符串表示"""
        return f"Circle(radius={self.radius})"

class Rectangle:
    """矩形类"""
    
    def __init__(self, length, width):
        """初始化矩形
        参数:
            length: 矩形的长
            width: 矩形的宽
        异常:
            ValueError: 当长或宽为负数时抛出
        """
        if length < 0 or width < 0:
            raise ValueError("矩形的长和宽不能为负数！")
        self.length = length
        self.width = width
    
    def area(self):
        """计算矩形的面积"""
        return self.length * self.width
    
    def perimeter(self):
        """计算矩形的周长"""
        return 2 * (self.length + self.width)
    
    def is_square(self):
        """判断矩形是否为正方形"""
        return self.length == self.width
    
    def __str__(self):
        """返回矩形的字符串表示"""
        return f"Rectangle(length={self.length}, width={self.width})"

class Triangle:
    """三角形类"""
    
    def __init__(self, a, b, c):
        """初始化三角形
        参数:
            a: 三角形的第一条边长
            b: 三角形的第二条边长
            c: 三角形的第三条边长
        异常:
            ValueError: 当任意边长为负数或无法构成三角形时抛出
        """
        # 检查边长是否为正数
        if a <= 0 or b <= 0 or c <= 0:
            raise ValueError("三角形的边长必须为正数！")
        # 检查是否能构成三角形（任意两边之和大于第三边）
        if a + b <= c or a + c <= b or b + c <= a:
            raise ValueError("给定的边长无法构成三角形！")
        self.a = a
        self.b = b
        self.c = c
    
    def area(self):
        """使用海伦公式计算三角形的面积"""
        s = (self.a + self.b + self.c) / 2  # 半周长
        area = math.sqrt(s * (s - self.a) * (s - self.b) * (s - self.c))
        return area
    
    def perimeter(self):
        """计算三角形的周长"""
        return self.a + self.b + self.c
    
    def is_equilateral(self):
        """判断三角形是否为等边三角形"""
        return self.a == self.b == self.c
    
    def is_isosceles(self):
        """判断三角形是否为等腰三角形"""
        return self.a == self.b or self.a == self.c or self.b == self.c
    
    def is_right_angled(self):
        """判断三角形是否为直角三角形（使用勾股定理）"""
        # 确保a <= b <= c
        a, b, c = sorted([self.a, self.b, self.c])
        # 勾股定理：a² + b² = c²（考虑浮点误差）
        return math.isclose(a ** 2 + b ** 2, c ** 2)
    
    def __str__(self):
        """返回三角形的字符串表示"""
        return f"Triangle(a={self.a}, b={self.b}, c={self.c})"
```

```python
# simple_math/statistics.py

"""statistics模块：提供统计计算功能"""
import math

def calculate_mean(data):
    """计算平均值
    参数:
        data: 包含数值的列表或元组
    返回:
        平均值
    异常:
        ValueError: 当数据为空时抛出
    """
    if not data:
        raise ValueError("数据不能为空！")
    return sum(data) / len(data)

def calculate_median(data):
    """计算中位数
    参数:
        data: 包含数值的列表或元组
    返回:
        中位数
    异常:
        ValueError: 当数据为空时抛出
    """
    if not data:
        raise ValueError("数据不能为空！")
    # 复制数据并排序
    sorted_data = sorted(data)
    n = len(sorted_data)
    # 如果数据个数为奇数，中位数为中间的数
    if n % 2 == 1:
        return sorted_data[n // 2]
    # 如果数据个数为偶数，中位数为中间两个数的平均值
    else:
        return (sorted_data[n // 2 - 1] + sorted_data[n // 2]) / 2

def calculate_variance(data, sample=True):
    """计算方差
    参数:
        data: 包含数值的列表或元组
        sample: 是否为样本方差（默认为True）
                如果为True，使用n-1作为除数；如果为False，使用n作为除数
    返回:
        方差
    异常:
        ValueError: 当数据为空或样本数据只有一个元素时抛出
    """
    if not data:
        raise ValueError("数据不能为空！")
    if sample and len(data) == 1:
        raise ValueError("样本数据至少需要两个元素！")
    
    # 计算平均值
    mean = calculate_mean(data)
    
    # 计算每个数据点与平均值的差的平方和
    squared_diffs = [(x - mean) ** 2 for x in data]
    
    # 计算方差
    if sample:
        return sum(squared_diffs) / (len(data) - 1)
    else:
        return sum(squared_diffs) / len(data)

def calculate_standard_deviation(data, sample=True):
    """计算标准差
    参数:
        data: 包含数值的列表或元组
        sample: 是否为样本标准差（默认为True）
    返回:
        标准差
    异常:
        ValueError: 当数据为空或样本数据只有一个元素时抛出
    """
    # 标准差是方差的平方根
    return math.sqrt(calculate_variance(data, sample))
```

创建完这个数学库后，编写一个测试程序来演示它的使用：

```python
# test_simple_math.py

"""测试simple_math包的功能"""

# 导入simple_math包
import simple_math

# 测试基本运算
print("===== 测试基本运算 =====")
print(f"2 + 3 = {simple_math.add(2, 3)}")
print(f"5 - 2 = {simple_math.subtract(5, 2)}")
print(f"3 * 4 = {simple_math.multiply(3, 4)}")
print(f"8 / 2 = {simple_math.divide(8, 2)}")

# 测试高级运算
print("\n===== 测试高级运算 =====")
print(f"2^3 = {simple_math.power(2, 3)}")
print(f"√16 = {simple_math.square_root(16)}")
print(f"5! = {simple_math.factorial(5)}")
print(f"斐波那契数列第10项 = {simple_math.fibonacci(10)}")

# 测试几何计算（函数）
print("\n===== 测试几何计算（函数）=====")
print(f"半径为5的圆的面积 = {simple_math.calculate_circle_area(5)}")
print(f"半径为5的圆的周长 = {simple_math.calculate_circle_circumference(5)}")
print(f"长为4，宽为6的矩形的面积 = {simple_math.calculate_rectangle_area(4, 6)}")
print(f"长为4，宽为6的矩形的周长 = {simple_math.calculate_rectangle_perimeter(4, 6)}")
print(f"边长为3，4，5的三角形的面积 = {simple_math.calculate_triangle_area(3, 4, 5)}")

# 测试几何计算（类）
print("\n===== 测试几何计算（类）=====")
circle = simple_math.Circle(5)
print(f"圆: {circle}")
print(f"面积: {circle.area()}")
print(f"周长: {circle.circumference()}")

rectangle = simple_math.Rectangle(4, 6)
print(f"矩形: {rectangle}")
print(f"面积: {rectangle.area()}")
print(f"周长: {rectangle.perimeter()}")
print(f"是否为正方形: {rectangle.is_square()}")

square = simple_math.Rectangle(5, 5)
print(f"正方形: {square}")
print(f"是否为正方形: {square.is_square()}")

triangle = simple_math.Triangle(3, 4, 5)
print(f"三角形: {triangle}")
print(f"面积: {triangle.area()}")
print(f"周长: {triangle.perimeter()}")
print(f"是否为等边三角形: {triangle.is_equilateral()}")
print(f"是否为等腰三角形: {triangle.is_isosceles()}")
print(f"是否为直角三角形: {triangle.is_right_angled()}")

# 测试统计计算
print("\n===== 测试统计计算 =====")
data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print(f"数据: {data}")
print(f"平均值: {simple_math.calculate_mean(data)}")
print(f"中位数: {simple_math.calculate_median(data)}")
print(f"样本方差: {simple_math.calculate_variance(data)}")
print(f"样本标准差: {simple_math.calculate_standard_deviation(data)}")
print(f"总体方差: {simple_math.calculate_variance(data, sample=False)}")
print(f"总体标准差: {simple_math.calculate_standard_deviation(data, sample=False)}")

# 测试包的版本和作者信息
print("\n===== 测试包信息 =====")
print(f"包版本: {simple_math.__version__}")
print(f"包作者: {simple_math.__author__}")
```

### 任务2：创建一个简单的实用工具包

创建一个名为`my_tools`的包，提供一些实用的工具函数和类。包的结构如下：

```
my_tools/
    __init__.py
    string_tools.py  # 字符串处理工具
    file_tools.py  # 文件处理工具
    time_tools.py  # 时间处理工具
    validation_tools.py  # 验证工具
```

每个模块的具体要求：

1. `string_tools.py`：包含字符串格式化、大小写转换、去除空白字符等字符串处理功能
2. `file_tools.py`：包含文件读写、复制、移动、删除等文件操作功能
3. `time_tools.py`：包含时间格式化、时间差计算等时间处理功能
4. `validation_tools.py`：包含邮箱验证、手机号验证、身份证号验证等数据验证功能

在`__init__.py`文件中导入这些模块中的常用函数和类，以便用户可以直接从包中导入它们。

通过本节课的学习，我们已经掌握了Python中模块和包的概念、导入和使用方法，以及如何创建自己的模块和包。合理使用模块和包可以使我们的代码更加清晰、易于维护和重用。Python的标准库提供了许多有用的模块和功能，在编写代码时，我们应该优先考虑使用这些标准库模块。在接下来的课程中，我们将学习更多Python的高级特性和应用。
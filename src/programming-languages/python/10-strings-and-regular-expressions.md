# 字符串与正则表达式：文本处理的利器

字符串是编程中最常用的数据类型之一，用于表示文本信息。在Python中，字符串是不可变的字符序列。本节课，我们将深入学习Python中的字符串操作，以及如何使用正则表达式进行更复杂的文本处理。

## 字符串的基本操作

### 字符串的创建

在Python中，我们可以使用单引号、双引号或三引号来创建字符串：

```python
# 使用单引号创建字符串
s1 = 'Hello, World!'
print(s1)

# 使用双引号创建字符串
s2 = "Hello, World!"
print(s2)

# 使用三引号创建多行字符串
s3 = '''Hello,
World!'''
print(s3)

# 也可以使用三个双引号
s4 = """Hello,
World!"""
print(s4)
```

### 字符串的访问和切片

我们可以像访问列表元素一样，使用索引来访问字符串中的字符：

```python
s = "Hello, World!"

# 访问单个字符
print("第一个字符:", s[0])    # 输出: H
print("第二个字符:", s[1])    # 输出: e

# 使用负索引
print("最后一个字符:", s[-1])  # 输出: !
print("倒数第二个字符:", s[-2])  # 输出: d

# 字符串切片
sliced_str1 = s[0:5]  # 从索引0开始到索引5（不包括5）
print("切片[0:5]:", sliced_str1)  # 输出: Hello

# 省略起始索引，表示从开始位置开始
sliced_str2 = s[:5]
print("切片[:5]:", sliced_str2)  # 输出: Hello

# 省略结束索引，表示到结束位置结束
sliced_str3 = s[7:]
print("切片[7:]:", sliced_str3)  # 输出: World!

# 同时省略起始和结束索引，表示复制整个字符串
sliced_str4 = s[:]
print("切片[:]:", sliced_str4)  # 输出: Hello, World!

# 使用步长
sliced_str5 = s[::2]  # 步长为2
print("切片[::2]:", sliced_str5)  # 输出: Hlo ol!

# 使用负步长（从右到左）
sliced_str6 = s[::-1]  # 反转字符串
print("切片[::-1]:", sliced_str6)  # 输出: !dlroW ,olleH
```

### 字符串的连接和重复

```python
# 字符串连接
s1 = "Hello,"
s2 = " World!"
s3 = s1 + s2
print("连接后的字符串:", s3)  # 输出: Hello, World!

# 字符串重复
s4 = "Ha! " * 3
print("重复后的字符串:", s4)  # 输出: Ha! Ha! Ha! 

# 字符串与数字的连接（需要先转换数字为字符串）
num = 42
s5 = "The answer is: " + str(num)
print(s5)  # 输出: The answer is: 42
```

### 字符串的长度

要获取字符串的长度，我们可以使用 `len()` 函数：

```python
s = "Hello, World!"
print("字符串的长度:", len(s))  # 输出: 13

empty_string = ""
print("空字符串的长度:", len(empty_string))  # 输出: 0
```

### 检查字符是否在字符串中

要检查某个字符或子字符串是否在字符串中，我们可以使用 `in` 运算符：

```python
s = "Hello, World!"

# 检查字符是否在字符串中
print("'H'在字符串中吗?", 'H' in s)  # 输出: True
print("'h'在字符串中吗?", 'h' in s)  # 输出: False（区分大小写）

# 检查子字符串是否在字符串中
print("'World'在字符串中吗?", 'World' in s)  # 输出: True
print("'Python'在字符串中吗?", 'Python' in s)  # 输出: False
```

## 字符串的常用方法

Python提供了许多有用的字符串方法，下面是一些最常用的方法：

### 大小写转换

```python
s = "Hello, World!"

# 转换为大写
print("大写:", s.upper())  # 输出: HELLO, WORLD!

# 转换为小写
print("小写:", s.lower())  # 输出: hello, world!

# 转换为标题格式（每个单词的首字母大写）
print("标题格式:", s.title())  # 输出: Hello, World!

# 转换为首字母大写，其余小写
print("首字母大写:", s.capitalize())  # 输出: Hello, world!

# 交换大小写
print("交换大小写:", s.swapcase())  # 输出: hELLO, wORLD!
```

### 查找和替换

```python
s = "Hello, World! Hello, Python!"

# 查找子字符串第一次出现的位置
print("'Hello'第一次出现的位置:", s.find("Hello"))  # 输出: 0

# 查找子字符串最后一次出现的位置
print("'Hello'最后一次出现的位置:", s.rfind("Hello"))  # 输出: 13

# 如果找不到子字符串，find()返回-1
print("'Java'在字符串中的位置:", s.find("Java"))  # 输出: -1

# 使用index()方法查找子字符串，找不到会引发异常
print("'Hello'第一次出现的位置:", s.index("Hello"))  # 输出: 0
# s.index("Java")  # ValueError: substring not found

# 替换子字符串
print("替换后的字符串:", s.replace("Hello", "Hi"))  # 输出: Hi, World! Hi, Python!

# 指定替换次数
print("替换1次后的字符串:", s.replace("Hello", "Hi", 1))  # 输出: Hi, World! Hello, Python!
```

### 分割和连接

```python
s = "apple,banana,orange,grape"

# 分割字符串
fruits = s.split(",")
print("分割后的列表:", fruits)  # 输出: ['apple', 'banana', 'orange', 'grape']

# 如果不提供分隔符，split()默认以空白字符（空格、制表符、换行符等）分割
s2 = "Hello   World!\tPython\n"
print("默认分割:", s2.split())  # 输出: ['Hello', 'World!', 'Python']

# 指定分割次数
print("分割1次:", s.split(",", 1))  # 输出: ['apple', 'banana,orange,grape']

# 连接字符串列表
joined_str = "-".join(fruits)
print("连接后的字符串:", joined_str)  # 输出: apple-banana-orange-grape

# 以换行符连接
lines = ["Line 1", "Line 2", "Line 3"]
text = "\n".join(lines)
print("多行文本:\n", text)
```

### 去除空白字符

```python
s = "   Hello, World!   \t\n"

# 去除字符串两端的空白字符
print("去除两端空白后:", s.strip())  # 输出: Hello, World!

# 去除字符串左端的空白字符
print("去除左端空白后:", s.lstrip())  # 输出: Hello, World!   	

# 去除字符串右端的空白字符
print("去除右端空白后:", s.rstrip())  # 输出:    Hello, World!

# 去除指定的字符
# 注意：strip()会去除字符串两端所有包含在参数字符串中的字符
# 而不是只去除完全匹配的子字符串
s2 = "###Hello, World!###"
print("去除#后:", s2.strip("#"))  # 输出: Hello, World!

# 同样适用于lstrip()和rstrip()
s3 = "---===Hello, World!===+++"
print("去除左端的-和=后:", s3.lstrip("-="))  # 输出: Hello, World!===+++
print("去除右端的+和=后:", s3.rstrip("+="))  # 输出: ---===Hello, World!
```

### 判断字符串的开头和结尾

```python
s = "https://www.example.com"

# 判断字符串是否以指定前缀开头
print("以'https://'开头吗?", s.startswith("https://"))  # 输出: True
print("以'http://'开头吗?", s.startswith("http://"))  # 输出: False

# 可以指定开始和结束位置进行判断
print("从索引8开始，以'www'开头吗?", s.startswith("www", 8))  # 输出: True

# 判断字符串是否以指定后缀结尾
print("以'.com'结尾吗?", s.endswith(".com"))  # 输出: True
print("以'.org'结尾吗?", s.endswith(".org"))  # 输出: False

# 同样可以指定开始和结束位置
print("到索引16为止，以'.example'结尾吗?", s.endswith(".example", 0, 16))  # 输出: True

# 可以同时检查多个前缀或后缀
print("以'http://'或'https://'开头吗?", s.startswith(("http://", "https://")))  # 输出: True
print("以'.com'或'.org'结尾吗?", s.endswith((".com", ".org")))  # 输出: True
```

### 判断字符串的类型

```python
# 判断字符串是否只包含字母和数字
s1 = "Hello123"
print("只包含字母和数字吗?", s1.isalnum())  # 输出: True

s2 = "Hello 123"
print("只包含字母和数字吗?", s2.isalnum())  # 输出: False（包含空格）

# 判断字符串是否只包含字母
s3 = "Hello"
print("只包含字母吗?", s3.isalpha())  # 输出: True

# 判断字符串是否只包含数字
s4 = "12345"
print("只包含数字吗?", s4.isdigit())  # 输出: True

# 判断字符串是否只包含空白字符
s5 = "   \t\n  "
print("只包含空白字符吗?", s5.isspace())  # 输出: True

# 判断字符串是否为标题格式（每个单词的首字母大写）
s6 = "Hello World"
print("是标题格式吗?", s6.istitle())  # 输出: True

s7 = "Hello world"
print("是标题格式吗?", s7.istitle())  # 输出: False

# 判断字符串是否全为大写
s8 = "HELLO"
print("全为大写吗?", s8.isupper())  # 输出: True

# 判断字符串是否全为小写
s9 = "hello"
print("全为小写吗?", s9.islower())  # 输出: True

# 判断字符串是否可以作为标识符（变量名）
s10 = "_variable123"
print("可以作为标识符吗?", s10.isidentifier())  # 输出: True

s11 = "123variable"
print("可以作为标识符吗?", s11.isidentifier())  # 输出: False（不能以数字开头）
```

## 字符串的格式化

字符串格式化是将变量或表达式的值插入到字符串中的过程。Python提供了多种字符串格式化的方法。

### 使用format()方法

```python
# 基本的字符串格式化
name = "张三"
age = 15
print("我的名字是{}，今年{}岁。".format(name, age))  # 输出: 我的名字是张三，今年15岁。

# 使用位置参数
print("{0}喜欢{1}，{2}也喜欢{1}。".format("张三", "Python", "李四"))  # 输出: 张三喜欢Python，李四也喜欢Python。

# 使用关键字参数
print("{name}的年龄是{age}岁。".format(name="张三", age=15))  # 输出: 张三的年龄是15岁。

# 混合使用位置参数和关键字参数
print("{0}的年龄是{age}岁，身高是{1}cm。".format("张三", 170, age=15))  # 输出: 张三的年龄是15岁，身高是170cm。

# 格式化数字
pi = 3.1415926
print("π的值约为{:.2f}".format(pi))  # 输出: π的值约为3.14（保留2位小数）

# 格式化整数
num = 42
print("{:d}".format(num))  # 输出: 42

# 格式化十六进制和八进制
print("十进制: {:d}, 十六进制: {:x}, 八进制: {:o}".format(num, num, num))  # 输出: 十进制: 42, 十六进制: 2a, 八进制: 52

# 格式化宽度和对齐
print("|{:<10}|{:^10}|{:>10}|".format("左对齐", "居中", "右对齐"))  # 输出: |左对齐      |   居中    |      右对齐|

# 填充
print("{:*>10}".format(42))  # 输出: ********42
print("{:0>10}".format(42))  # 输出: 0000000042
```

### 使用f-string（Python 3.6+）

f-string是Python 3.6引入的一种更简洁、更易读的字符串格式化方法：

```python
name = "张三"
age = 15
height = 170.0

# 基本的f-string
print(f"我的名字是{name}，今年{age}岁。")  # 输出: 我的名字是张三，今年15岁。

# 在f-string中使用表达式
print(f"明年我将{age + 1}岁。")  # 输出: 明年我将16岁。

# 格式化数字
pi = 3.1415926
print(f"π的值约为{pi:.2f}")  # 输出: π的值约为3.14

# 格式化宽度和对齐
print(f"|{name:<10}|{age:^10}|{height:>10}|")  # 输出: |张三        |    15     |     170.0|

# 填充
num = 42
print(f"{num:*>10}")  # 输出: ********42
print(f"{num:0>10}")  # 输出: 0000000042

# 在f-string中调用函数
def greet(name):
    return f"你好，{name}!"

print(f"{greet("张三")}")  # 输出: 你好，张三!
```

## 正则表达式简介

正则表达式（Regular Expression）是一种用于匹配字符串中字符组合的模式。它是一种强大的文本处理工具，可以用于字符串的搜索、替换、分割等操作。在Python中，我们可以使用内置的 `re` 模块来处理正则表达式。

### 正则表达式的基本语法

下面是一些正则表达式的基本语法：

| 字符 | 描述 |
|------|------|
| `.` | 匹配除换行符外的任意单个字符 |
| `^` | 匹配字符串的开头 |
| `$` | 匹配字符串的结尾 |
| `*` | 匹配前面的字符零次或多次 |
| `+` | 匹配前面的字符一次或多次 |
| `?` | 匹配前面的字符零次或一次 |
| `{n}` | 匹配前面的字符恰好n次 |
| `{n,}` | 匹配前面的字符至少n次 |
| `{n,m}` | 匹配前面的字符至少n次，最多m次 |
| `[]` | 匹配方括号内的任意一个字符 |
| `()` | 分组，将括号内的内容作为一个整体 |
| `|` | 或运算符，匹配左边或右边的表达式 |
| `\d` | 匹配任意数字，等价于 `[0-9]` |
| `\D` | 匹配任意非数字，等价于 `[^0-9]` |
| `\w` | 匹配任意字母、数字或下划线，等价于 `[a-zA-Z0-9_]` |
| `\W` | 匹配任意非字母、数字或下划线，等价于 `[^a-zA-Z0-9_]` |
| `\s` | 匹配任意空白字符（空格、制表符、换行符等） |
| `\S` | 匹配任意非空白字符 |
| `\b` | 匹配单词边界 |
| `\B` | 匹配非单词边界 |
| `\` | 转义字符，用于匹配特殊字符本身 |

### Python中的re模块

Python的 `re` 模块提供了一系列函数来处理正则表达式。下面是一些常用的函数：

#### 1. re.match()

`re.match()` 函数尝试从字符串的开头匹配一个模式。如果匹配成功，返回一个匹配对象；否则返回 `None`。

```python
import re

# 匹配字符串开头的数字
pattern = r"\d+"  # 匹配一个或多个数字
result = re.match(pattern, "123abc")
if result:
    print("匹配成功！")
    print("匹配的内容:", result.group())  # 输出: 123
else:
    print("匹配失败！")

# 不匹配的情况
result = re.match(pattern, "abc123")
if result:
    print("匹配成功！")
else:
    print("匹配失败！")  # 输出: 匹配失败！因为match()只从字符串开头匹配
```

#### 2. re.search()

`re.search()` 函数在整个字符串中搜索一个模式。如果匹配成功，返回一个匹配对象；否则返回 `None`。

```python
import re

# 在字符串中搜索数字
pattern = r"\d+"
result = re.search(pattern, "abc123def")
if result:
    print("匹配成功！")
    print("匹配的内容:", result.group())  # 输出: 123
    print("匹配的起始位置:", result.start())  # 输出: 3
    print("匹配的结束位置:", result.end())  # 输出: 6
    print("匹配的位置范围:", result.span())  # 输出: (3, 6)
else:
    print("匹配失败！")
```

#### 3. re.findall()

`re.findall()` 函数在整个字符串中搜索一个模式，返回所有匹配的内容组成的列表。

```python
import re

# 查找字符串中所有的数字
pattern = r"\d+"
result = re.findall(pattern, "abc123def456ghi789")
print("所有匹配的数字:", result)  # 输出: ['123', '456', '789']

# 查找字符串中所有的单词
pattern = r"\w+"
result = re.findall(pattern, "Hello, World! I love Python.")
print("所有匹配的单词:", result)  # 输出: ['Hello', 'World', 'I', 'love', 'Python']
```

#### 4. re.sub()

`re.sub()` 函数用于替换字符串中匹配的子串。

```python
import re

# 将字符串中的数字替换为'NUMBER'
pattern = r"\d+"
result = re.sub(pattern, "NUMBER", "abc123def456ghi789")
print("替换后的字符串:", result)  # 输出: abcNUMBERdefNUMBERghiNUMBER

# 指定替换次数
result = re.sub(pattern, "NUMBER", "abc123def456ghi789", 2)
print("替换2次后的字符串:", result)  # 输出: abcNUMBERdefNUMBERghi789
```

#### 5. re.split()

`re.split()` 函数用于根据匹配的模式分割字符串。

```python
import re

# 根据空白字符分割字符串
pattern = r"\s+"
result = re.split(pattern, "Hello   World!\tPython\n")
print("分割后的列表:", result)  # 输出: ['Hello', 'World!', 'Python', '']

# 根据数字分割字符串
pattern = r"\d+"
result = re.split(pattern, "abc123def456ghi789")
print("分割后的列表:", result)  # 输出: ['abc', 'def', 'ghi', '']

# 指定分割次数
result = re.split(pattern, "abc123def456ghi789", 2)
print("分割2次后的列表:", result)  # 输出: ['abc', 'def', 'ghi789']
```

#### 6. re.compile()

`re.compile()` 函数用于编译正则表达式模式，返回一个正则表达式对象。这样可以提高在多次使用同一模式时的效率。

```python
import re

# 编译正则表达式模式
pattern = re.compile(r"\d+")

# 使用编译后的模式进行匹配
result = pattern.match("123abc")
if result:
    print("匹配成功！")
    print("匹配的内容:", result.group())  # 输出: 123

# 使用编译后的模式进行搜索
result = pattern.search("abc123def")
if result:
    print("搜索成功！")
    print("搜索的内容:", result.group())  # 输出: 123

# 使用编译后的模式进行查找所有匹配
result = pattern.findall("abc123def456ghi789")
print("所有匹配的数字:", result)  # 输出: ['123', '456', '789']
```

### 正则表达式的应用示例

下面是一些正则表达式的实际应用示例：

#### 1. 验证邮箱地址

```python
import re

def is_valid_email(email):
    # 简单的邮箱正则表达式
    pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    return re.match(pattern, email) is not None

# 测试邮箱地址
emails = ["user@example.com", "test.email+tag@example.co.uk", "invalid-email", "@example.com", "user@"]
for email in emails:
    print(f"{email}: {'有效' if is_valid_email(email) else '无效'}")
```

#### 2. 验证手机号码

```python
import re

def is_valid_phone(phone):
    # 中国大陆手机号码的正则表达式（简单版本）
    pattern = r"^1[3-9]\d{9}$"
    return re.match(pattern, phone) is not None

# 测试手机号码
phones = ["13812345678", "15987654321", "12345678901", "1381234567", "138123456789"]
for phone in phones:
    print(f"{phone}: {'有效' if is_valid_phone(phone) else '无效'}")
```

#### 3. 提取URL中的域名

```python
import re

def extract_domain(url):
    # 提取URL中的域名
    pattern = r"https?://([a-zA-Z0-9.-]+)"
    match = re.search(pattern, url)
    if match:
        return match.group(1)
    return None

# 测试URL\urls = ["https://www.example.com", "http://subdomain.example.org/path", "ftp://files.example.net"]
for url in urls:
    domain = extract_domain(url)
    print(f"{url}: {'域名: ' + domain if domain else '无法提取域名'}")
```

## 编程小贴士

1. **字符串是不可变的**：在Python中，字符串是不可变的，这意味着你不能直接修改字符串中的字符。任何字符串操作都会返回一个新的字符串。

2. **使用f-string进行字符串格式化**：f-string是Python 3.6引入的一种更简洁、更易读的字符串格式化方法，推荐使用。

3. **注意转义字符**：在字符串中，反斜杠 `\` 是转义字符，用于表示一些特殊字符，如换行符 `\n`、制表符 `\t` 等。如果你需要在字符串中包含反斜杠本身，需要使用双反斜杠 `\\`。

4. **原始字符串**：在字符串前面加上 `r` 可以创建原始字符串，原始字符串中的反斜杠不会被解释为转义字符。这在处理正则表达式时特别有用。

5. **正则表达式的性能**：对于简单的字符串操作，使用Python内置的字符串方法通常比使用正则表达式更高效。只有在处理复杂的文本模式时，才需要使用正则表达式。

6. **编译正则表达式**：如果你需要多次使用同一个正则表达式，使用 `re.compile()` 函数编译它可以提高性能。

7. **贪婪匹配和非贪婪匹配**：正则表达式默认是贪婪的，会尽可能多地匹配字符。在量词后面加上 `?` 可以实现非贪婪匹配，如 `*?`、`+?`、`??`、`{n,m}?` 等。

8. **使用括号进行分组**：在正则表达式中使用括号可以将匹配的内容分组，方便后续提取。

## 动手练习

1. 编写一个程序，统计一个字符串中每个字符出现的次数，并按出现次数从高到低排序。

2. 编写一个函数，将驼峰命名法（如camelCase）转换为下划线命名法（如camel_case）。

3. 编写一个函数，检查一个字符串是否是回文（从左到右读和从右到左读是一样的）。

4. 使用正则表达式提取一段文本中的所有电子邮件地址。

5. 编写一个程序，将一段文本中的敏感词替换为星号。

## 挑战任务

### 任务1：编写一个简单的文本过滤器

编写一个程序，实现以下功能：

1. 读取用户输入的一段文本
2. 过滤掉文本中的敏感词（如脏话、广告等），将其替换为星号
3. 统计文本中敏感词的数量
4. 输出过滤后的文本和统计结果

```python
import re

def filter_sensitive_words(text, sensitive_words):
    # 将敏感词列表转换为正则表达式模式
    # 使用re.escape()转义特殊字符
    pattern = r"|" .join([re.escape(word) for word in sensitive_words])
    
    # 使用re.findall()找出所有匹配的敏感词
    matches = re.findall(pattern, text)
    
    # 使用re.sub()替换敏感词为星号
    filtered_text = re.sub(pattern, lambda m: '*' * len(m.group()), text)
    
    return filtered_text, len(matches)

# 主程序
if __name__ == "__main__":
    # 定义敏感词列表
    sensitive_words = ["脏话1", "脏话2", "广告", "垃圾邮件"]
    
    print("欢迎使用文本过滤器！")
    print("当前的敏感词列表：", ", ".join(sensitive_words))
    
    # 获取用户输入的文本
    text = input("请输入要过滤的文本：\n")
    
    # 过滤文本
    filtered_text, count = filter_sensitive_words(text, sensitive_words)
    
    # 输出结果
    print("\n===== 过滤结果 =====")
    print(f"过滤后的文本：\n{filtered_text}")
    print(f"共过滤掉 {count} 个敏感词")
    
    # 询问用户是否要添加新的敏感词
    while True:
        add_word = input("是否要添加新的敏感词？(y/n)：")
        if add_word.lower() == "y":
            new_word = input("请输入新的敏感词：")
            if new_word and new_word not in sensitive_words:
                sensitive_words.append(new_word)
                print(f"已添加敏感词：{new_word}")
                # 重新过滤文本
                filtered_text, count = filter_sensitive_words(text, sensitive_words)
                print(f"过滤后的文本：\n{filtered_text}")
                print(f"共过滤掉 {count} 个敏感词")
            else:
                print("无效的敏感词！")
        else:
            break
    
    print("感谢使用文本过滤器！")
```

### 任务2：编写一个简单的网页爬虫（提取链接）

编写一个程序，实现以下功能：

1. 读取用户输入的HTML文本或从文件中读取HTML内容
2. 使用正则表达式提取HTML中的所有链接（即 `<a>` 标签的 `href` 属性值）
3. 过滤掉重复的链接
4. 输出提取的链接列表

```python
import re

def extract_links(html):
    # 提取HTML中的所有链接的正则表达式
    # 注意：这是一个简化的正则表达式，实际的HTML解析应该使用专门的HTML解析库
    pattern = r'<a\s+[^>]*href=["\']([^"\']+)["\'][^>]*>'
    
    # 使用re.findall()找出所有匹配的链接
    links = re.findall(pattern, html, re.IGNORECASE)  # re.IGNORECASE表示忽略大小写
    
    # 过滤掉重复的链接
    unique_links = list(set(links))
    
    return unique_links

# 主程序
if __name__ == "__main__":
    print("欢迎使用网页链接提取器！")
    
    # 询问用户是输入HTML文本还是从文件中读取
    choice = input("请选择输入方式：(1. 直接输入HTML 2. 从文件中读取)：")
    
    if choice == "1":
        print("请输入HTML文本（输入'EOF'结束）：")
        lines = []
        while True:
            line = input()
            if line.strip().upper() == "EOF":
                break
            lines.append(line)
        html = "\n".join(lines)
    elif choice == "2":
        file_path = input("请输入HTML文件的路径：")
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                html = f.read()
        except Exception as e:
            print(f"读取文件失败：{e}")
            exit()
    else:
        print("无效的选择！")
        exit()
    
    # 提取链接
    links = extract_links(html)
    
    # 输出结果
    print(f"\n共提取到 {len(links)} 个链接：")
    for i, link in enumerate(links, 1):
        print(f"{i}. {link}")
    
    # 询问用户是否要保存链接到文件
    save_choice = input("是否要将链接保存到文件？(y/n)：")
    if save_choice.lower() == "y":
        output_file = input("请输入保存文件的路径：")
        try:
            with open(output_file, "w", encoding="utf-8") as f:
                for link in links:
                    f.write(link + "\n")
            print(f"链接已成功保存到 {output_file}")
        except Exception as e:
            print(f"保存文件失败：{e}")
    
    print("感谢使用网页链接提取器！")
```

通过本节课的学习，我们已经掌握了Python中的字符串操作和正则表达式的使用。这些技能在文本处理、数据清洗、信息提取等方面非常有用。在接下来的课程中，我们将学习更多Python的高级特性和应用。
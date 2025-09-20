# 循环语句：Python的重复魔法

小朋友们，你们有没有做过需要重复很多次的事情？比如跳绳、做数学题或者读课文。在Python中，我们也可以让程序重复执行某些操作，这就是通过循环语句实现的！

## 为什么需要循环？

循环可以帮助我们避免编写重复的代码。比如，如果我们想输出1到10的数字，如果没有循环，我们需要写10个`print()`语句：

```python
print(1)
print(2)
print(3)
print(4)
print(5)
print(6)
print(7)
print(8)
print(9)
print(10)
```

而有了循环，我们只需要几行代码就可以完成同样的任务！

## Python中的循环语句

Python中有两种主要的循环语句：`for`循环和`while`循环。让我们逐一了解它们。

### 1. for循环

`for`循环用于遍历一个序列（如列表、元组、字符串等）中的每个元素。

```python
for 变量 in 序列:
    # 执行的代码块
```

例子：遍历一个列表

```python
fruits = ["苹果", "香蕉", "橙子", "葡萄"]
for fruit in fruits:
    print(fruit)

# 输出：
# 苹果
# 香蕉
# 橙子
# 葡萄
```

例子：使用`range()`函数

`range()`函数可以生成一个数字序列，常用于`for`循环中：

```python
# 输出1到10的数字
for i in range(1, 11):
    print(i)

# 输出：1 2 3 4 5 6 7 8 9 10

# 输出0到9的数字（默认从0开始）
for i in range(10):
    print(i)

# 输出：0 1 2 3 4 5 6 7 8 9

# 输出1到10，步长为2
for i in range(1, 11, 2):
    print(i)

# 输出：1 3 5 7 9
```

例子：遍历字符串

```python
word = "Python"
for letter in word:
    print(letter)

# 输出：
# P
# y
# t
# h
# o
# n
```

### 2. while循环

`while`循环会一直执行代码块，直到条件不再满足为止。

```python
while 条件:
    # 执行的代码块
```

例子：输出1到10的数字

```python
count = 1
while count <= 10:
    print(count)
    count += 1  # 不要忘记更新计数器，否则会导致无限循环

# 输出：1 2 3 4 5 6 7 8 9 10
```

例子：猜数字游戏

```python
import random

secret_number = random.randint(1, 100)
guess = 0
attempts = 0

print("欢迎来到猜数字游戏！我想了一个1到100之间的数字。")

while guess != secret_number:
    guess = int(input("请输入你的猜测："))
    attempts += 1
    
    if guess < secret_number:
        print("太小了，再试试！")
    elif guess > secret_number:
        print("太大了，再试试！")
    else:
        print(f"恭喜你，猜对了！你用了{attempts}次尝试。")
```

## 循环中的控制语句

有时候，我们需要在循环中控制程序的流程。Python提供了两种常用的控制语句：`break`和`continue`。

### break语句

`break`语句用于立即退出循环，不再执行循环中剩余的代码。

```python
# 找到第一个大于10的数字
numbers = [5, 8, 12, 3, 7, 15]
for number in numbers:
    if number > 10:
        print(f"找到大于10的数字：{number}")
        break

# 输出：找到大于10的数字：12
```

### continue语句

`continue`语句用于跳过当前循环中的剩余代码，直接进入下一次循环。

```python
# 输出1到10之间的奇数
for i in range(1, 11):
    if i % 2 == 0:
        continue  # 跳过偶数
    print(i)

# 输出：1 3 5 7 9
```

## 嵌套循环

我们还可以在一个循环中嵌套另一个循环，这被称为嵌套循环。

例子：打印乘法表

```python
# 打印1到9的乘法表
for i in range(1, 10):
    for j in range(1, i + 1):
        print(f"{i}×{j}={i*j}", end="\t")  # \t表示制表符
    print()  # 换行

# 输出：
# 1×1=1	
# 2×1=2	2×2=4	
# 3×1=3	3×2=6	3×3=9	
# ...以此类推
```

## else子句在循环中的应用

在Python中，循环也可以有`else`子句，这是Python的一个独特特性。`else`子句会在循环正常结束时执行（即没有被`break`语句中断）。

```python
# 使用for-else
for i in range(1, 6):
    print(i)
else:
    print("循环正常结束了！")

# 输出：
# 1
# 2
# 3
# 4
# 5
# 循环正常结束了！

# 使用while-else
count = 1
while count <= 5:
    print(count)
    count += 1
else:
    print("循环正常结束了！")

# 输出：
# 1
# 2
# 3
# 4
# 5
# 循环正常结束了！

# 如果循环被break中断，else子句不会执行
for i in range(1, 11):
    print(i)
    if i == 5:
        break
else:
    print("这个不会被输出！")

# 输出：1 2 3 4 5
```

## 编程小贴士

- 使用`for`循环当你知道循环次数或者要遍历一个序列时
- 使用`while`循环当你不知道具体的循环次数，但有一个结束条件时
- 一定要确保循环有结束的条件，否则会导致无限循环
- 在循环中适当使用`break`和`continue`可以使程序更加高效
- 嵌套循环的缩进要正确，否则会导致逻辑错误

## 动手试一试

1. 使用`for`循环输出1到100之间的所有偶数

2. 使用`while`循环计算1到100的和

3. 编写一个程序，让用户输入一个正整数，然后使用循环计算这个数的阶乘（n! = n × (n-1) × ... × 2 × 1）

4. 编写一个程序，打印一个由星号组成的三角形，如下所示：
```
*
**
***
****
*****
```

```python
# 请在这里编写你的代码
```

## 挑战任务

编写一个简单的打字练习程序。程序应该：

1. 提供一个示例文本
2. 让用户输入这个文本
3. 计算用户的打字速度（每分钟打多少个字）
4. 统计用户打错了多少个字

提示：你可以使用`time`模块来计算时间。

好了，现在你已经学会了如何在Python中使用循环语句！循环是编程中非常强大的工具，它可以帮助我们高效地处理重复的任务。在接下来的课程中，我们将通过一些实际练习来巩固我们所学的知识。
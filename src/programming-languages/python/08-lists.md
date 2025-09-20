# 列表（Lists）：Python中的数据集合

在之前的学习中，我们学习了如何使用变量存储单个数据。但是，在实际编程中，我们经常需要处理一组相关的数据。这时候，我们就需要使用Python中的**列表（List）** 这种数据结构。

## 什么是列表？

列表是Python中最常用的数据类型之一，它是一个有序的、可变的数据集合。列表可以包含不同类型的元素，比如整数、浮点数、字符串等，甚至可以包含其他列表。

在Python中，列表用方括号 `[]` 来表示，元素之间用逗号 `,` 分隔。

## 创建列表

让我们来看看如何创建一个列表：

```python
# 创建一个空列表
todo_list = []
print("空列表:", todo_list)

# 创建一个包含数字的列表
numbers = [1, 2, 3, 4, 5]
print("数字列表:", numbers)

# 创建一个包含字符串的列表
fruits = ["苹果", "香蕉", "橙子", "葡萄"]
print("水果列表:", fruits)

# 创建一个包含不同类型元素的列表
mixed_list = [1, "hello", 3.14, True]
print("混合列表:", mixed_list)

# 创建一个包含列表的列表（嵌套列表）
nested_list = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
print("嵌套列表:", nested_list)
```

## 访问列表元素

要访问列表中的元素，我们需要使用**索引（Index）**。在Python中，列表的索引从0开始，也就是说，第一个元素的索引是0，第二个元素的索引是1，以此类推。

我们还可以使用**负索引**，这意味着从列表的末尾开始计数。最后一个元素的索引是-1，倒数第二个元素的索引是-2，依此类推。

```python
fruits = ["苹果", "香蕉", "橙子", "葡萄"]

# 使用正索引访问元素
print("第一个水果:", fruits[0])    # 输出: 苹果
print("第二个水果:", fruits[1])    # 输出: 香蕉

# 使用负索引访问元素
print("最后一个水果:", fruits[-1])  # 输出: 葡萄
print("倒数第二个水果:", fruits[-2])  # 输出: 橙子

# 访问嵌套列表中的元素
nested_list = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
print("第二行第三个元素:", nested_list[1][2])  # 输出: 6
```

## 列表切片

除了访问单个元素外，我们还可以使用**切片（Slice）** 操作来访问列表中的一个子列表。切片操作使用冒号 `:` 来表示。

```python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# 获取索引1到索引4之间的元素（不包括索引4）
print("索引1到3的元素:", numbers[1:4])  # 输出: [1, 2, 3]

# 获取从开始到索引4之间的元素（不包括索引4）
print("从开始到索引3的元素:", numbers[:4])  # 输出: [0, 1, 2, 3]

# 获取从索引5到末尾的元素
print("从索引5到末尾的元素:", numbers[5:])  # 输出: [5, 6, 7, 8, 9]

# 获取所有元素（创建列表的副本）
print("所有元素:", numbers[:])  # 输出: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# 使用步长
print("步长为2的元素:", numbers[::2])  # 输出: [0, 2, 4, 6, 8]
print("逆序列表:", numbers[::-1])  # 输出: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
```

## 修改列表

列表是**可变的**，这意味着我们可以修改、添加或删除列表中的元素。

### 修改元素

```python
fruits = ["苹果", "香蕉", "橙子", "葡萄"]
print("修改前:", fruits)

# 修改元素
fruits[1] = "草莓"
print("修改后:", fruits)  # 输出: ['苹果', '草莓', '橙子', '葡萄']

# 修改多个元素
numbers = [0, 1, 2, 3, 4, 5]
numbers[1:4] = [10, 20, 30]
print("修改多个元素后:", numbers)  # 输出: [0, 10, 20, 30, 4, 5]
```

### 添加元素

```python
fruits = ["苹果", "香蕉", "橙子"]
print("添加前:", fruits)

# 在列表末尾添加一个元素
fruits.append("葡萄")
print("添加一个元素后:", fruits)  # 输出: ['苹果', '香蕉', '橙子', '葡萄']

# 在列表末尾添加多个元素
fruits.extend(["草莓", "猕猴桃"])
print("添加多个元素后:", fruits)  # 输出: ['苹果', '香蕉', '橙子', '葡萄', '草莓', '猕猴桃']

# 在指定位置插入一个元素
fruits.insert(1, "西瓜")
print("插入元素后:", fruits)  # 输出: ['苹果', '西瓜', '香蕉', '橙子', '葡萄', '草莓', '猕猴桃']
```

### 删除元素

```python
fruits = ["苹果", "西瓜", "香蕉", "橙子", "葡萄", "草莓", "猕猴桃"]
print("删除前:", fruits)

# 删除指定值的元素
fruits.remove("西瓜")
print("删除'西瓜'后:", fruits)  # 输出: ['苹果', '香蕉', '橙子', '葡萄', '草莓', '猕猴桃']

# 删除指定索引的元素
removed_fruit = fruits.pop(2)  # pop()方法返回被删除的元素
print("删除索引2的元素后:", fruits)  # 输出: ['苹果', '香蕉', '葡萄', '草莓', '猕猴桃']
print("被删除的元素:", removed_fruit)  # 输出: 橙子

# 如果不指定索引，pop()方法默认删除最后一个元素
last_fruit = fruits.pop()
print("删除最后一个元素后:", fruits)  # 输出: ['苹果', '香蕉', '葡萄', '草莓']
print("被删除的最后一个元素:", last_fruit)  # 输出: 猕猴桃

# 使用del语句删除元素
numbers = [0, 1, 2, 3, 4, 5]
del numbers[1]
print("使用del删除索引1的元素后:", numbers)  # 输出: [0, 2, 3, 4, 5]

# 清空列表
temp_list = [1, 2, 3, 4, 5]
temp_list.clear()
print("清空后的列表:", temp_list)  # 输出: []
```

## 列表的常用方法

Python为列表提供了许多有用的方法，下面是一些常用的方法：

| 方法 | 描述 |
|------|------|
| `append()` | 在列表末尾添加一个元素 |
| `extend()` | 在列表末尾添加多个元素 |
| `insert()` | 在指定位置插入一个元素 |
| `remove()` | 删除第一个匹配指定值的元素 |
| `pop()` | 删除并返回指定索引的元素，如果不指定索引则删除最后一个元素 |
| `clear()` | 清空列表中的所有元素 |
| `index()` | 返回第一个匹配指定值的元素的索引 |
| `count()` | 返回列表中指定值出现的次数 |
| `sort()` | 对列表进行排序 |
| `reverse()` | 反转列表中的元素顺序 |
| `copy()` | 创建并返回列表的一个副本 |

让我们来看一些例子：

```python
numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5]

# index() - 查找元素的索引
print("数字5第一次出现的索引:", numbers.index(5))  # 输出: 4

# count() - 统计元素出现的次数
print("数字1出现的次数:", numbers.count(1))  # 输出: 2
print("数字5出现的次数:", numbers.count(5))  # 输出: 2

# sort() - 排序
numbers.sort()
print("排序后的列表:", numbers)  # 输出: [1, 1, 2, 3, 4, 5, 5, 6, 9]

# 降序排序
numbers.sort(reverse=True)
print("降序排序后的列表:", numbers)  # 输出: [9, 6, 5, 5, 4, 3, 2, 1, 1]

# reverse() - 反转
numbers.reverse()
print("反转后的列表:", numbers)  # 输出: [1, 1, 2, 3, 4, 5, 5, 6, 9]

# copy() - 复制列表
numbers_copy = numbers.copy()
print("列表的副本:", numbers_copy)  # 输出: [1, 1, 2, 3, 4, 5, 5, 6, 9]
```

## 列表的长度

要获取列表的长度（即列表中元素的个数），我们可以使用 `len()` 函数：

```python
fruits = ["苹果", "香蕉", "橙子", "葡萄"]
print("水果列表的长度:", len(fruits))  # 输出: 4

empty_list = []
print("空列表的长度:", len(empty_list))  # 输出: 0
```

## 检查元素是否在列表中

要检查某个元素是否在列表中，我们可以使用 `in` 运算符：

```python
fruits = ["苹果", "香蕉", "橙子", "葡萄"]

# 检查元素是否在列表中
print("苹果在水果列表中吗?", "苹果" in fruits)  # 输出: True
print("西瓜在水果列表中吗?", "西瓜" in fruits)  # 输出: False

# 检查元素是否不在列表中
print("西瓜不在水果列表中吗?", "西瓜" not in fruits)  # 输出: True
```

## 列表的遍历

我们可以使用 `for` 循环来遍历列表中的所有元素：

```python
fruits = ["苹果", "香蕉", "橙子", "葡萄"]

# 遍历列表中的每个元素
print("水果列表中的元素:")
for fruit in fruits:
    print(fruit)

# 获取元素的索引和值
print("\n水果列表中的元素及其索引:")
for index, fruit in enumerate(fruits):
    print(f"索引 {index}: {fruit}")

# 使用range()和len()遍历列表
print("\n使用range()和len()遍历列表:")
for i in range(len(fruits)):
    print(f"索引 {i}: {fruits[i]}")
```

## 列表推导式

列表推导式是Python中一种简洁、优雅的创建列表的方式。它允许我们使用一行代码生成一个新的列表，通常基于已有的列表或其他可迭代对象。

```python
# 生成一个包含1到10的平方的列表
squares = [x**2 for x in range(1, 11)]
print("1到10的平方:", squares)  # 输出: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# 生成一个包含1到10中的偶数的列表
evens = [x for x in range(1, 11) if x % 2 == 0]
print("1到10中的偶数:", evens)  # 输出: [2, 4, 6, 8, 10]

# 生成一个包含1到10中的奇数的平方的列表
odd_squares = [x**2 for x in range(1, 11) if x % 2 != 0]
print("1到10中的奇数的平方:", odd_squares)  # 输出: [1, 9, 25, 49, 81]

# 将列表中的所有字符串转换为大写
fruits = ["apple", "banana", "orange", "grape"]
uppercase_fruits = [fruit.upper() for fruit in fruits]
print("大写水果列表:", uppercase_fruits)  # 输出: ['APPLE', 'BANANA', 'ORANGE', 'GRAPE']

# 处理嵌套列表
nested_list = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened_list = [item for sublist in nested_list for item in sublist]
print("扁平化后的列表:", flattened_list)  # 输出: [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## 编程小贴士

1. **列表索引从0开始**：在Python中，列表的索引从0开始，而不是从1开始，这一点和C、C++是一样的。

2. **负索引的使用**：负索引是Python的一个很方便的特性，可以让我们轻松地访问列表末尾的元素。

3. **列表是可变的**：与字符串不同，列表是可变的，这意味着我们可以直接修改列表中的元素。

4. **切片操作**：切片操作是获取列表子集的强大工具，掌握它可以让我们的代码更加简洁高效。

5. **列表推导式**：列表推导式是Python的一个优雅特性，使用它可以简化代码，提高可读性。

6. **列表方法的使用**：Python提供了许多有用的列表方法，熟悉这些方法可以让我们的编程更加高效。

7. **避免修改正在遍历的列表**：在遍历列表时，最好不要修改列表的长度（添加或删除元素），否则可能会导致意外的结果。

## 动手练习

1. 创建一个包含你最喜欢的5种食物的列表，然后使用print语句将它们打印出来。

2. 编写一个程序，创建一个数字列表，然后计算列表中所有数字的和与平均值。

3. 创建一个包含10个随机整数的列表，然后对其进行排序并打印出来。

4. 编写一个程序，删除列表中的重复元素。

5. 使用列表推导式创建一个包含1到100中所有能被3整除的数字的列表。

## 挑战任务

### 任务1：编写一个简单的待办事项列表管理程序

编写一个程序，实现以下功能：

1. 添加待办事项
2. 查看所有待办事项
3. 删除待办事项
4. 标记待办事项为已完成
5. 退出程序

```python
# 待办事项列表管理程序
todo_list = []

while True:
    print("\n===== 待办事项列表管理 ======")
    print("1. 添加待办事项")
    print("2. 查看所有待办事项")
    print("3. 删除待办事项")
    print("4. 标记待办事项为已完成")
    print("5. 退出程序")
    
    choice = input("请选择操作（1-5）：")
    
    if choice == "1":
        # 添加待办事项
        task = input("请输入待办事项：")
        todo_list.append({"task": task, "completed": False})
        print(f"已成功添加待办事项：{task}")
    elif choice == "2":
        # 查看所有待办事项
        if not todo_list:
            print("暂无待办事项！")
        else:
            print("\n待办事项列表：")
            for i, item in enumerate(todo_list, 1):
                status = "✓" if item["completed"] else "✗"
                print(f"{i}. [{status}] {item['task']}")
    elif choice == "3":
        # 删除待办事项
        if not todo_list:
            print("暂无待办事项可删除！")
        else:
            try:
                index = int(input("请输入要删除的待办事项编号：")) - 1
                if 0 <= index < len(todo_list):
                    removed_task = todo_list.pop(index)['task']
                    print(f"已成功删除待办事项：{removed_task}")
                else:
                    print("无效的待办事项编号！")
            except ValueError:
                print("请输入有效的数字！")
    elif choice == "4":
        # 标记待办事项为已完成
        if not todo_list:
            print("暂无待办事项可标记！")
        else:
            try:
                index = int(input("请输入要标记为已完成的待办事项编号：")) - 1
                if 0 <= index < len(todo_list):
                    todo_list[index]["completed"] = True
                    print(f"已成功标记待办事项为已完成：{todo_list[index]['task']}")
                else:
                    print("无效的待办事项编号！")
            except ValueError:
                print("请输入有效的数字！")
    elif choice == "5":
        # 退出程序
        print("感谢使用待办事项列表管理程序，再见！")
        break
    else:
        print("无效的选择，请重新输入！")
```

### 任务2：编写一个简单的学生成绩统计程序

编写一个程序，实现以下功能：

1. 输入多名学生的成绩
2. 计算平均分
3. 找出最高分和最低分
4. 统计各个等级的学生人数（优秀：90-100，良好：80-89，中等：70-79，及格：60-69，不及格：0-59）
5. 显示统计结果

```python
# 学生成绩统计程序

# 初始化成绩列表
scores = []

# 输入学生成绩
while True:
    try:
        score = input("请输入学生成绩（输入'q'结束）：")
        if score.lower() == 'q':
            break
        score = float(score)
        if 0 <= score <= 100:
            scores.append(score)
        else:
            print("成绩必须在0-100之间，请重新输入！")
    except ValueError:
        print("请输入有效的成绩！")

# 统计结果
if not scores:
    print("没有输入成绩，程序退出！")
else:
    # 计算平均分
    average = sum(scores) / len(scores)
    
    # 找出最高分和最低分
    highest = max(scores)
    lowest = min(scores)
    
    # 统计各个等级的学生人数
    excellent = 0  # 90-100
    good = 0       # 80-89
    medium = 0     # 70-79
    pass_score = 0 # 60-69
    fail = 0       # 0-59
    
    for score in scores:
        if score >= 90:
            excellent += 1
        elif score >= 80:
            good += 1
        elif score >= 70:
            medium += 1
        elif score >= 60:
            pass_score += 1
        else:
            fail += 1
    
    # 显示统计结果
    print("\n===== 成绩统计结果 =====")
    print(f"学生人数：{len(scores)}")
    print(f"平均分：{average:.2f}")
    print(f"最高分：{highest}")
    print(f"最低分：{lowest}")
    print(f"优秀（90-100）：{excellent}人")
    print(f"良好（80-89）：{good}人")
    print(f"中等（70-79）：{medium}人")
    print(f"及格（60-69）：{pass_score}人")
    print(f"不及格（0-59）：{fail}人")
```

通过这些练习和挑战任务，你应该已经掌握了Python列表的基本操作和使用方法。在接下来的课程中，我们将学习Python中的其他数据类型和数据结构。
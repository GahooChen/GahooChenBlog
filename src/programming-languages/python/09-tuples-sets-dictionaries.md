# 元组、集合和字典：更多Python数据结构

在前面的课程中，我们学习了Python中的列表（List）这种数据结构。今天，我们将学习Python中的另外三种重要的数据结构：**元组（Tuple）**、**集合（Set）** 和 **字典（Dictionary）**。这些数据结构各有特点，可以帮助我们解决不同的问题。

## 元组（Tuple）

### 什么是元组？

元组是一个有序的、不可变的数据集合。它与列表非常相似，但是元组一旦创建就不能被修改。在Python中，元组用圆括号 `()` 来表示，元素之间用逗号 `,` 分隔。

### 创建元组

```python
# 创建一个空元组
empty_tuple = ()
print("空元组:", empty_tuple)

# 创建一个包含元素的元组
tuple1 = (1, 2, 3, 4, 5)
print("数字元组:", tuple1)

# 创建一个包含不同类型元素的元组
tuple2 = (1, "hello", 3.14, True)
print("混合元组:", tuple2)

# 只有一个元素的元组需要在元素后面加逗号
# 否则Python会将其视为普通的括号表达式
single_element_tuple = (42,)
print("单元素元组:", single_element_tuple)
print("类型:", type(single_element_tuple))  # 输出: <class 'tuple'>

not_a_tuple = (42)  # 这不是一个元组，而是一个整数
print("不是元组:", not_a_tuple)
print("类型:", type(not_a_tuple))  # 输出: <class 'int'>

# 可以不使用括号创建元组
tuple_without_parentheses = 1, 2, 3, 4, 5
print("没有括号的元组:", tuple_without_parentheses)

# 从列表创建元组
list_to_tuple = tuple([1, 2, 3, 4, 5])
print("从列表创建的元组:", list_to_tuple)

# 从字符串创建元组
string_to_tuple = tuple("hello")
print("从字符串创建的元组:", string_to_tuple)
```

### 访问元组元素

由于元组是有序的，我们可以像访问列表元素一样，使用索引来访问元组中的元素：

```python
fruits = ("苹果", "香蕉", "橙子", "葡萄")

# 使用正索引访问元素
print("第一个水果:", fruits[0])    # 输出: 苹果
print("第二个水果:", fruits[1])    # 输出: 香蕉

# 使用负索引访问元素
print("最后一个水果:", fruits[-1])  # 输出: 葡萄
print("倒数第二个水果:", fruits[-2])  # 输出: 橙子

# 元组切片
tuple_slice = fruits[1:3]
print("元组切片:", tuple_slice)  # 输出: ('香蕉', '橙子')
```

### 元组的不可变性

元组的一个重要特点是**不可变性**，这意味着一旦元组被创建，我们就不能修改、添加或删除元组中的元素：

```python
fruits = ("苹果", "香蕉", "橙子", "葡萄")

# 尝试修改元组元素（这会引发错误）
# fruits[1] = "草莓"  # TypeError: 'tuple' object does not support item assignment

# 但是，如果元组中包含可变对象（如列表），我们可以修改这个可变对象
mixed_tuple = (1, 2, [3, 4, 5])
mixed_tuple[2][0] = 30  # 这是允许的
print("修改后的混合元组:", mixed_tuple)  # 输出: (1, 2, [30, 4, 5])
```

### 元组的常用操作

虽然元组是不可变的，但我们仍然可以对元组进行一些操作：

```python
# 连接元组
tuple1 = (1, 2, 3)
tuple2 = (4, 5, 6)
combined_tuple = tuple1 + tuple2
print("连接后的元组:", combined_tuple)  # 输出: (1, 2, 3, 4, 5, 6)

# 重复元组
tuple3 = ("苹果", "香蕉")
repeated_tuple = tuple3 * 3
print("重复后的元组:", repeated_tuple)  # 输出: ('苹果', '香蕉', '苹果', '香蕉', '苹果', '香蕉')

# 计算元组长度
print("元组长度:", len(combined_tuple))  # 输出: 6

# 检查元素是否在元组中
print("3在元组中吗?", 3 in tuple1)  # 输出: True
print("10在元组中吗?", 10 in tuple1)  # 输出: False

# 遍历元组
print("遍历元组中的元素:")
for fruit in ("苹果", "香蕉", "橙子", "葡萄"):
    print(fruit)

# 元组的方法
numbers = (1, 2, 3, 4, 5, 3, 3)
print("元素3出现的次数:", numbers.count(3))  # 输出: 3
print("元素4第一次出现的索引:", numbers.index(4))  # 输出: 3
```

### 为什么使用元组？

既然元组是不可变的，不如列表灵活，那为什么还要使用元组呢？元组有以下几个优点：

1. **不可变性**：元组的不可变性使得数据更加安全，不会被意外修改。
2. **性能**：元组的处理速度比列表快。
3. **可以作为字典的键**：由于元组是不可变的，所以可以作为字典的键，而列表不能。
4. **可以作为集合的元素**：同样，元组可以作为集合的元素，而列表不能。
5. **函数的多返回值**：Python函数可以返回一个元组，这使得函数可以同时返回多个值。

## 集合（Set）

### 什么是集合？

集合是一个无序的、不重复的数据集合。在Python中，集合用花括号 `{}` 来表示，元素之间用逗号 `,` 分隔。集合中的元素必须是不可变的（如数字、字符串、元组等）。

### 创建集合

```python
# 创建一个空集合
empty_set = set()
print("空集合:", empty_set)
print("类型:", type(empty_set))  # 输出: <class 'set'>

# 注意：{} 创建的是一个空字典，而不是空集合
empty_dict = {}
print("空字典:", empty_dict)
print("类型:", type(empty_dict))  # 输出: <class 'dict'>

# 创建一个包含元素的集合
fruits = {"苹果", "香蕉", "橙子", "葡萄"}
print("水果集合:", fruits)

# 集合会自动去除重复元素
numbers = {1, 2, 3, 4, 5, 3, 2, 1}
print("去重后的集合:", numbers)  # 输出: {1, 2, 3, 4, 5}

# 从列表创建集合
list_to_set = set([1, 2, 3, 4, 5, 3, 2, 1])
print("从列表创建的集合:", list_to_set)  # 输出: {1, 2, 3, 4, 5}

# 从字符串创建集合
string_to_set = set("hello")
print("从字符串创建的集合:", string_to_set)  # 输出可能是: {'h', 'e', 'l', 'o'}（顺序不确定）

# 从元组创建集合
tuple_to_set = set((1, 2, 3, 4, 5))
print("从元组创建的集合:", tuple_to_set)  # 输出: {1, 2, 3, 4, 5}
```

### 集合的基本操作

```python
# 添加元素
fruits = {"苹果", "香蕉", "橙子"}
fruits.add("葡萄")
print("添加元素后的集合:", fruits)

# 添加多个元素
fruits.update(["草莓", "猕猴桃", "苹果"])  # "苹果"已经在集合中，所以不会重复添加
print("添加多个元素后的集合:", fruits)

# 删除元素
fruits.remove("香蕉")
print("删除元素后的集合:", fruits)

# 如果元素不存在，remove()会引发错误
# fruits.remove("西瓜")  # KeyError: '西瓜'

# 如果元素不存在，discard()不会引发错误
fruits.discard("西瓜")  # 不会引发错误
print("使用discard()后的集合:", fruits)

# 随机删除一个元素并返回它
random_fruit = fruits.pop()
print("随机删除的元素:", random_fruit)
print("删除后的集合:", fruits)

# 清空集合
fruits.clear()
print("清空后的集合:", fruits)  # 输出: set()

# 计算集合的大小
numbers = {1, 2, 3, 4, 5}
print("集合的大小:", len(numbers))  # 输出: 5

# 检查元素是否在集合中
print("3在集合中吗?", 3 in numbers)  # 输出: True
print("10在集合中吗?", 10 in numbers)  # 输出: False

# 遍历集合
print("遍历集合中的元素:")
for number in numbers:
    print(number)  # 注意：输出顺序可能与定义顺序不同
```

### 集合的数学运算

集合支持一些数学中的集合运算，如并集、交集、差集等：

```python
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}

# 并集：包含两个集合中的所有元素
union_set = set1 | set2
print("并集:", union_set)  # 输出: {1, 2, 3, 4, 5, 6, 7, 8}
# 也可以使用union()方法
union_set2 = set1.union(set2)
print("并集（使用union()方法）:", union_set2)  # 输出: {1, 2, 3, 4, 5, 6, 7, 8}

# 交集：包含两个集合共有的元素
intersection_set = set1 & set2
print("交集:", intersection_set)  # 输出: {4, 5}
# 也可以使用intersection()方法
intersection_set2 = set1.intersection(set2)
print("交集（使用intersection()方法）:", intersection_set2)  # 输出: {4, 5}

# 差集：包含在第一个集合中但不在第二个集合中的元素
difference_set = set1 - set2
print("差集:", difference_set)  # 输出: {1, 2, 3}
# 也可以使用difference()方法
difference_set2 = set1.difference(set2)
print("差集（使用difference()方法）:", difference_set2)  # 输出: {1, 2, 3}

# 对称差集：包含在任一集合中但不在两个集合共有的元素
symmetric_difference_set = set1 ^ set2
print("对称差集:", symmetric_difference_set)  # 输出: {1, 2, 3, 6, 7, 8}
# 也可以使用symmetric_difference()方法
symmetric_difference_set2 = set1.symmetric_difference(set2)
print("对称差集（使用symmetric_difference()方法）:", symmetric_difference_set2)  # 输出: {1, 2, 3, 6, 7, 8}
```

### 集合的子集和超集

```python
set1 = {1, 2, 3}
set2 = {1, 2, 3, 4, 5}
set3 = {6, 7, 8}

# 检查set1是否是set2的子集
print("set1是set2的子集吗?", set1.issubset(set2))  # 输出: True
# 也可以使用 <= 运算符
print("set1 <= set2吗?", set1 <= set2)  # 输出: True

# 检查set1是否是set2的真子集（set1是set2的子集，但set1不等于set2）
print("set1是set2的真子集吗?", set1.issubset(set2) and set1 != set2)  # 输出: True
# 也可以使用 < 运算符
print("set1 < set2吗?", set1 < set2)  # 输出: True

# 检查set2是否是set1的超集
print("set2是set1的超集吗?", set2.issuperset(set1))  # 输出: True
# 也可以使用 >= 运算符
print("set2 >= set1吗?", set2 >= set1)  # 输出: True

# 检查set2是否是set1的真超集（set2是set1的超集，但set2不等于set1）
print("set2是set1的真超集吗?", set2.issuperset(set1) and set2 != set1)  # 输出: True
# 也可以使用 > 运算符
print("set2 > set1吗?", set2 > set1)  # 输出: True

# 检查两个集合是否不相交（没有共同元素）
print("set1和set3不相交吗?", set1.isdisjoint(set3))  # 输出: True
```

### 为什么使用集合？

集合在以下情况下特别有用：

1. **去重**：集合会自动去除重复元素，这是集合最常用的功能之一。
2. **快速查找**：集合中的元素可以快速查找，比列表查找要快得多。
3. **集合运算**：集合支持数学中的集合运算，如并集、交集、差集等。
4. **判断元素是否存在**：使用 `in` 运算符可以快速判断元素是否在集合中。

## 字典（Dictionary）

### 什么是字典？

字典是Python中另一种非常重要的数据结构，它是一个无序的、可变的键值对（key-value pair）集合。在Python中，字典用花括号 `{}` 来表示，键值对之间用逗号 `,` 分隔，键和值之间用冒号 `:` 分隔。

字典中的键（key）必须是不可变的（如数字、字符串、元组等），并且每个键在字典中必须是唯一的。值（value）可以是任意类型的数据，包括列表、集合、字典等。

### 创建字典

```python
# 创建一个空字典
empty_dict = {}
print("空字典:", empty_dict)
# 也可以使用dict()函数创建空字典
empty_dict2 = dict()
print("空字典（使用dict()）:", empty_dict2)

# 创建一个包含键值对的字典
student = {"name": "张三", "age": 15, "gender": "男", "grade": "初三"}
print("学生字典:", student)

# 使用dict()函数创建字典
student2 = dict(name="李四", age=16, gender="女", grade="高一")
print("学生字典（使用dict()）:", student2)

# 从键值对列表创建字典
key_value_pairs = [("name", "王五"), ("age", 14), ("gender", "男"), ("grade", "初二")]
student3 = dict(key_value_pairs)
print("学生字典（从键值对列表创建）:", student3)

# 从两个列表创建字典
keys = ["name", "age", "gender", "grade"]
values = ["赵六", 17, "女", "高二"]
student4 = dict(zip(keys, values))
print("学生字典（从两个列表创建）:", student4)
```

### 访问字典元素

要访问字典中的值，我们需要使用键作为索引：

```python
student = {"name": "张三", "age": 15, "gender": "男", "grade": "初三"}

# 使用键访问值
print("学生姓名:", student["name"])  # 输出: 张三
print("学生年龄:", student["age"])   # 输出: 15

# 如果键不存在，会引发KeyError
# print(student["score"])  # KeyError: 'score'

# 使用get()方法访问值，如果键不存在，返回默认值
print("学生成绩:", student.get("score", 0))  # 输出: 0（因为score键不存在，所以返回默认值0）

# 如果不提供默认值，get()方法在键不存在时返回None
print("学生地址:", student.get("address"))  # 输出: None
```

### 修改字典

字典是可变的，这意味着我们可以修改、添加或删除字典中的键值对：

```python
student = {"name": "张三", "age": 15, "gender": "男", "grade": "初三"}
print("修改前的字典:", student)

# 修改现有键的值
student["age"] = 16
print("修改年龄后的字典:", student)

# 添加新的键值对
student["score"] = 95
student["address"] = "北京市"
print("添加新键值对后的字典:", student)

# 使用update()方法添加或修改多个键值对
student.update({"score": 98, "phone": "13812345678"})
print("使用update()后的字典:", student)

# 删除键值对
# 使用del语句
del student["address"]
print("删除address后的字典:", student)

# 使用pop()方法删除键值对并返回对应的值
phone = student.pop("phone")
print("删除的phone值:", phone)
print("删除phone后的字典:", student)

# 使用popitem()方法随机删除一个键值对并返回它（Python 3.7+中是最后插入的键值对）
item = student.popitem()
print("删除的键值对:", item)
print("删除后的字典:", student)

# 清空字典
student.clear()
print("清空后的字典:", student)  # 输出: {}
```

### 字典的常用操作和方法

```python
student = {"name": "张三", "age": 15, "gender": "男", "grade": "初三"}

# 获取所有键
keys = student.keys()
print("所有键:", keys)  # 输出可能是: dict_keys(['name', 'age', 'gender', 'grade'])
# 转换为列表
print("所有键（列表形式）:", list(keys))  # 输出: ['name', 'age', 'gender', 'grade']

# 获取所有值
values = student.values()
print("所有值:", values)  # 输出可能是: dict_values(['张三', 15, '男', '初三'])
# 转换为列表
print("所有值（列表形式）:", list(values))  # 输出: ['张三', 15, '男', '初三']

# 获取所有键值对
items = student.items()
print("所有键值对:", items)  # 输出可能是: dict_items([('name', '张三'), ('age', 15), ('gender', '男'), ('grade', '初三')])
# 转换为列表
print("所有键值对（列表形式）:", list(items))  # 输出: [('name', '张三'), ('age', 15), ('gender', '男'), ('grade', '初三')]

# 检查键是否在字典中
print("'name'在字典中吗?", "name" in student)  # 输出: True
print("'score'在字典中吗?", "score" in student)  # 输出: False

# 计算字典的大小
print("字典的大小:", len(student))  # 输出: 4

# 遍历字典
print("\n遍历字典中的键:")
for key in student:
    print(key)

print("\n遍历字典中的键值对:")
for key, value in student.items():
    print(f"{key}: {value}")

# 创建字典的副本
student_copy = student.copy()
print("字典的副本:", student_copy)

# 使用fromkeys()方法创建字典
keys = ["name", "age", "gender"]
default_value = "unknown"
new_dict = dict.fromkeys(keys, default_value)
print("使用fromkeys()创建的字典:", new_dict)  # 输出: {'name': 'unknown', 'age': 'unknown', 'gender': 'unknown'}
```

### 为什么使用字典？

字典在以下情况下特别有用：

1. **键值对映射**：字典提供了一种非常方便的方式来存储键值对映射关系。
2. **快速查找**：通过键可以快速查找对应的值，比列表查找要快得多。
3. **灵活的数据组织**：字典可以存储各种类型的数据，包括嵌套的数据结构。
4. **代表实体**：字典非常适合用来代表现实世界中的实体，如学生、用户等。

## 编程小贴士

1. **选择合适的数据结构**：根据具体问题，选择最适合的数据结构。
   - 如果需要一个有序的、可变的集合，可以使用列表。
   - 如果需要一个有序的、不可变的集合，可以使用元组。
   - 如果需要一个无序的、不重复的集合，可以使用集合。
   - 如果需要键值对映射关系，可以使用字典。

2. **元组的不可变性**：元组的不可变性使得它非常适合存储不应被修改的数据，如日期、时间、坐标等。

3. **集合的去重功能**：集合的自动去重功能在处理包含重复元素的数据时非常有用。

4. **字典的键必须是不可变的**：字典的键必须是不可变的，这意味着不能使用列表、集合或字典作为字典的键，但可以使用数字、字符串、元组等。

5. **字典的遍历**：遍历字典时，默认遍历的是字典的键。如果需要遍历键值对，可以使用 `items()` 方法。

6. **避免修改正在遍历的集合或字典**：在遍历集合或字典时，最好不要修改它们的大小（添加或删除元素），否则可能会导致意外的结果。

## 动手练习

1. 创建一个元组，包含你最喜欢的5种颜色，然后使用循环遍历并打印出来。

2. 编写一个程序，创建两个集合，然后计算它们的并集、交集和差集。

3. 创建一个字典，存储你家庭成员的信息（姓名、年龄、关系），然后遍历并打印出来。

4. 编写一个程序，统计一个字符串中每个字符出现的次数，使用字典来存储统计结果。

5. 使用字典创建一个简单的通讯录程序，可以添加、删除和查找联系人。

## 挑战任务

### 任务1：编写一个单词频率统计程序

编写一个程序，读取一段文本，统计其中每个单词出现的频率，然后按频率从高到低排序并打印出来。

```python
# 单词频率统计程序

# 获取用户输入的文本
text = input("请输入一段文本：")

# 将文本转换为小写，并分割成单词
words = text.lower().split()

# 创建一个字典来存储单词频率
word_freq = {}

# 统计每个单词出现的频率
for word in words:
    # 去除单词前后的标点符号
    clean_word = "".join(char for char in word if char.isalnum())
    if clean_word:
        if clean_word in word_freq:
            word_freq[clean_word] += 1
        else:
            word_freq[clean_word] = 1

# 按频率从高到低排序
# items()方法返回键值对的列表，key参数指定排序的依据，reverse=True表示降序排序
sorted_word_freq = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)

# 打印统计结果
print("\n单词频率统计结果（按频率从高到低排序）：")
for word, freq in sorted_word_freq:
    print(f"{word}: {freq}")
```

### 任务2：编写一个简单的学生管理系统

编写一个程序，使用字典和列表来管理学生信息，实现以下功能：

1. 添加学生信息（学号、姓名、年龄、成绩等）
2. 显示所有学生信息
3. 根据学号查找学生信息
4. 根据学号修改学生信息
5. 根据学号删除学生信息
6. 按成绩排序并显示
7. 退出程序

```python
# 简单的学生管理系统

# 初始化学生列表（每个学生是一个字典）
students = []

while True:
    print("\n===== 学生管理系统 =====")
    print("1. 添加学生信息")
    print("2. 显示所有学生信息")
    print("3. 根据学号查找学生信息")
    print("4. 根据学号修改学生信息")
    print("5. 根据学号删除学生信息")
    print("6. 按成绩排序并显示")
    print("7. 退出程序")
    
    choice = input("请选择操作（1-7）：")
    
    if choice == "1":
        # 添加学生信息
        student_id = input("请输入学号：")
        
        # 检查学号是否已存在
        for student in students:
            if student["id"] == student_id:
                print("错误：学号已存在！")
                break
        else:
            # 学号不存在，可以添加
            name = input("请输入姓名：")
            try:
                age = int(input("请输入年龄："))
                score = float(input("请输入成绩："))
            except ValueError:
                print("错误：年龄和成绩必须是数字！")
                continue
            
            # 创建学生字典
            student = {"id": student_id, "name": name, "age": age, "score": score}
            students.append(student)
            print(f"已成功添加学生信息：{name}")
    elif choice == "2":
        # 显示所有学生信息
        if not students:
            print("暂无学生信息！")
        else:
            print("\n所有学生信息：")
            print("学号\t姓名\t年龄\t成绩")
            print("-------------------------")
            for student in students:
                print(f"{student['id']}\t{student['name']}\t{student['age']}\t{student['score']}")
    elif choice == "3":
        # 根据学号查找学生信息
        if not students:
            print("暂无学生信息！")
        else:
            student_id = input("请输入要查找的学号：")
            found = False
            for student in students:
                if student["id"] == student_id:
                    print("\n查找到的学生信息：")
                    print(f"学号：{student['id']}")
                    print(f"姓名：{student['name']}")
                    print(f"年龄：{student['age']}")
                    print(f"成绩：{student['score']}")
                    found = True
                    break
            if not found:
                print(f"未找到学号为{student_id}的学生！")
    elif choice == "4":
        # 根据学号修改学生信息
        if not students:
            print("暂无学生信息！")
        else:
            student_id = input("请输入要修改的学生学号：")
            found = False
            for student in students:
                if student["id"] == student_id:
                    print("\n当前学生信息：")
                    print(f"学号：{student['id']}")
                    print(f"姓名：{student['name']}")
                    print(f"年龄：{student['age']}")
                    print(f"成绩：{student['score']}")
                    
                    # 获取新的学生信息
                    name = input("请输入新的姓名（直接回车保留原值）：")
                    if name:  # 如果用户输入了新的姓名
                        student["name"] = name
                    
                    age_input = input("请输入新的年龄（直接回车保留原值）：")
                    if age_input:  # 如果用户输入了新的年龄
                        try:
                            student["age"] = int(age_input)
                        except ValueError:
                            print("错误：年龄必须是数字！")
                            continue
                    
                    score_input = input("请输入新的成绩（直接回车保留原值）：")
                    if score_input:  # 如果用户输入了新的成绩
                        try:
                            student["score"] = float(score_input)
                        except ValueError:
                            print("错误：成绩必须是数字！")
                            continue
                    
                    print(f"已成功修改学号为{student_id}的学生信息！")
                    found = True
                    break
            if not found:
                print(f"未找到学号为{student_id}的学生！")
    elif choice == "5":
        # 根据学号删除学生信息
        if not students:
            print("暂无学生信息！")
        else:
            student_id = input("请输入要删除的学生学号：")
            found = False
            for i, student in enumerate(students):
                if student["id"] == student_id:
                    students.pop(i)
                    print(f"已成功删除学号为{student_id}的学生信息！")
                    found = True
                    break
            if not found:
                print(f"未找到学号为{student_id}的学生！")
    elif choice == "6":
        # 按成绩排序并显示
        if not students:
            print("暂无学生信息！")
        else:
            sort_choice = input("请选择排序方式（1. 升序 / 2. 降序）：")
            if sort_choice == "1":
                sorted_students = sorted(students, key=lambda x: x["score"])
            elif sort_choice == "2":
                sorted_students = sorted(students, key=lambda x: x["score"], reverse=True)
            else:
                print("无效的选择，默认使用降序排序。")
                sorted_students = sorted(students, key=lambda x: x["score"], reverse=True)
            
            print("\n按成绩排序后的学生信息：")
            print("学号\t姓名\t年龄\t成绩")
            print("-------------------------")
            for student in sorted_students:
                print(f"{student['id']}\t{student['name']}\t{student['age']}\t{student['score']}")
    elif choice == "7":
        # 退出程序
        print("感谢使用学生管理系统，再见！")
        break
    else:
        print("无效的选择，请重新输入！")
```

通过本节课的学习，我们已经掌握了Python中的元组、集合和字典这三种重要的数据结构。在接下来的课程中，我们将学习更多Python的高级特性和应用。
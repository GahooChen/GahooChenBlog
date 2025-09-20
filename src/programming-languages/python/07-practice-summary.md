# 实战小练习与总结：巩固Python基础

小朋友们，我们已经学了Python的很多基础知识，包括变量、数据类型、运算符、输入输出、条件语句和循环语句。现在是时候通过一些有趣的练习来巩固这些知识了！

## 知识回顾

让我们先快速回顾一下我们学过的内容：

1. **变量与数据类型**：Python中的基本数据类型包括整数（int）、浮点数（float）、字符串（str）和布尔值（bool）。

2. **运算符**：包括算术运算符（+、-、*、/等）、赋值运算符（=、+=、-=等）、比较运算符（==、!=、>、<等）和逻辑运算符（and、or、not）。

3. **输入与输出**：使用`print()`函数输出信息，使用`input()`函数获取用户输入。

4. **条件语句**：使用`if`、`if-else`和`if-elif-else`语句让程序根据条件做出不同的决定。

5. **循环语句**：使用`for`循环和`while`循环让程序重复执行某些操作。

## 实战练习

现在，让我们通过一些有趣的练习来巩固这些知识吧！

### 练习1：简单计算器升级版

编写一个简单的计算器程序，支持加减乘除四种运算。程序应该：

1. 显示一个菜单，让用户选择要进行的运算
2. 获取用户输入的两个数字
3. 根据用户的选择进行相应的计算
4. 显示计算结果
5. 询问用户是否继续使用计算器

```python
# 简单计算器升级版

while True:
    # 显示菜单
    print("\n===== 简单计算器 =====")
    print("1. 加法")
    print("2. 减法")
    print("3. 乘法")
    print("4. 除法")
    print("0. 退出")
    
    # 获取用户选择
    choice = input("请选择您要进行的运算（0-4）：")
    
    # 检查是否退出
    if choice == "0":
        print("感谢使用计算器，再见！")
        break
    
    # 获取用户输入的两个数字
    try:
        num1 = float(input("请输入第一个数字："))
        num2 = float(input("请输入第二个数字："))
    except ValueError:
        print("错误：请输入有效的数字！")
        continue
    
    # 根据选择进行计算
    if choice == "1":
        result = num1 + num2
        print(f"{num1} + {num2} = {result}")
    elif choice == "2":
        result = num1 - num2
        print(f"{num1} - {num2} = {result}")
    elif choice == "3":
        result = num1 * num2
        print(f"{num1} * {num2} = {result}")
    elif choice == "4":
        if num2 == 0:
            print("错误：除数不能为0！")
        else:
            result = num1 / num2
            print(f"{num1} / {num2} = {result}")
    else:
        print("错误：无效的选择！")
    
    # 询问是否继续
    continue_choice = input("是否继续使用计算器？（y/n）：")
    if continue_choice.lower() != "y":
        print("感谢使用计算器，再见！")
        break
```

### 练习2：猜数字游戏改进版

改进之前的猜数字游戏，增加以下功能：

1. 限制用户的尝试次数（例如10次）
2. 在游戏结束时显示正确的数字
3. 允许用户选择游戏难度（不同难度有不同的数字范围和尝试次数）

```python
# 猜数字游戏改进版
import random

print("欢迎来到猜数字游戏！")

while True:
    # 选择难度
    print("\n请选择游戏难度：")
    print("1. 简单（1-50，10次尝试）")
    print("2. 中等（1-100，7次尝试）")
    print("3. 困难（1-200，5次尝试）")
    print("0. 退出游戏")
    
    difficulty = input("请输入您的选择（0-3）：")
    
    if difficulty == "0":
        print("感谢游玩，再见！")
        break
    elif difficulty == "1":
        min_num, max_num, max_attempts = 1, 50, 10
    elif difficulty == "2":
        min_num, max_num, max_attempts = 1, 100, 7
    elif difficulty == "3":
        min_num, max_num, max_attempts = 1, 200, 5
    else:
        print("无效的选择，默认使用简单难度。")
        min_num, max_num, max_attempts = 1, 50, 10
    
    # 生成随机数
    secret_number = random.randint(min_num, max_num)
    attempts = 0
    
    print(f"\n我已经想好了一个{min_num}到{max_num}之间的数字。")
    print(f"你有{max_attempts}次尝试机会。")
    
    # 开始猜数字
    while attempts < max_attempts:
        attempts += 1
        try:
            guess = int(input(f"第{attempts}次尝试，请输入你的猜测："))
        except ValueError:
            print("错误：请输入有效的数字！")
            continue
        
        if guess < secret_number:
            print("太小了，再试试！")
        elif guess > secret_number:
            print("太大了，再试试！")
        else:
            print(f"恭喜你，猜对了！这个数字就是{secret_number}。")
            print(f"你用了{attempts}次尝试。")
            break
    
    if guess != secret_number:
        print(f"很遗憾，你没有在{max_attempts}次尝试内猜对。")
        print(f"正确的数字是{secret_number}。")
    
    # 询问是否再玩一次
    play_again = input("是否再玩一次？（y/n）：")
    if play_again.lower() != "y":
        print("感谢游玩，再见！")
        break
```

### 练习3：温度转换工具

编写一个程序，帮助用户在摄氏度和华氏度之间进行转换。程序应该：

1. 让用户选择转换的方向（摄氏度转华氏度或华氏度转摄氏度）
2. 获取用户输入的温度值
3. 根据选择进行相应的转换
4. 显示转换后的温度值
5. 询问用户是否继续使用转换工具

转换公式：
- 华氏度 = 摄氏度 × 1.8 + 32
- 摄氏度 = (华氏度 - 32) ÷ 1.8

```python
# 温度转换工具

while True:
    # 显示菜单
    print("\n===== 温度转换工具 =====")
    print("1. 摄氏度转华氏度")
    print("2. 华氏度转摄氏度")
    print("0. 退出")
    
    # 获取用户选择
    choice = input("请选择转换方向（0-2）：")
    
    # 检查是否退出
    if choice == "0":
        print("感谢使用温度转换工具，再见！")
        break
    
    # 获取用户输入的温度值
    try:
        temperature = float(input("请输入温度值："))
    except ValueError:
        print("错误：请输入有效的数字！")
        continue
    
    # 根据选择进行转换
    if choice == "1":
        # 摄氏度转华氏度
        result = temperature * 1.8 + 32
        print(f"{temperature}°C = {result}°F")
    elif choice == "2":
        # 华氏度转摄氏度
        result = (temperature - 32) / 1.8
        print(f"{temperature}°F = {result}°C")
    else:
        print("错误：无效的选择！")
    
    # 询问是否继续
    continue_choice = input("是否继续使用转换工具？（y/n）：")
    if continue_choice.lower() != "y":
        print("感谢使用温度转换工具，再见！")
        break
```

### 练习4：简单的学生成绩管理系统

编写一个简单的学生成绩管理系统，实现以下功能：

1. 添加学生的成绩
2. 查看所有学生的成绩
3. 计算学生的平均成绩
4. 找出最高分和最低分
5. 按成绩排序

```python
# 简单的学生成绩管理系统

students = []

while True:
    # 显示菜单
    print("\n===== 学生成绩管理系统 =====")
    print("1. 添加学生成绩")
    print("2. 查看所有学生成绩")
    print("3. 计算平均成绩")
    print("4. 查看最高分和最低分")
    print("5. 按成绩排序")
    print("0. 退出系统")
    
    # 获取用户选择
    choice = input("请选择操作（0-5）：")
    
    # 检查是否退出
    if choice == "0":
        print("感谢使用学生成绩管理系统，再见！")
        break
    
    # 根据选择执行相应的操作
    if choice == "1":
        # 添加学生成绩
        name = input("请输入学生姓名：")
        try:
            score = float(input("请输入学生成绩："))
            students.append((name, score))
            print(f"已成功添加{name}的成绩！")
        except ValueError:
            print("错误：请输入有效的成绩！")
    elif choice == "2":
        # 查看所有学生成绩
        if not students:
            print("暂无学生成绩数据！")
        else:
            print("\n所有学生成绩：")
            for i, (name, score) in enumerate(students, 1):
                print(f"{i}. {name}: {score}")
    elif choice == "3":
        # 计算平均成绩
        if not students:
            print("暂无学生成绩数据！")
        else:
            total_score = sum(score for _, score in students)
            average_score = total_score / len(students)
            print(f"学生的平均成绩是：{average_score}")
    elif choice == "4":
        # 查看最高分和最低分
        if not students:
            print("暂无学生成绩数据！")
        else:
            max_score = max(students, key=lambda x: x[1])
            min_score = min(students, key=lambda x: x[1])
            print(f"最高分：{max_score[0]} - {max_score[1]}")
            print(f"最低分：{min_score[0]} - {min_score[1]}")
    elif choice == "5":
        # 按成绩排序
        if not students:
            print("暂无学生成绩数据！")
        else:
            sort_choice = input("请选择排序方式（1. 升序 / 2. 降序）：")
            if sort_choice == "1":
                sorted_students = sorted(students, key=lambda x: x[1])
            elif sort_choice == "2":
                sorted_students = sorted(students, key=lambda x: x[1], reverse=True)
            else:
                print("无效的选择，默认使用升序排序。")
                sorted_students = sorted(students, key=lambda x: x[1])
            
            print("\n按成绩排序后的学生列表：")
            for i, (name, score) in enumerate(sorted_students, 1):
                print(f"{i}. {name}: {score}")
    else:
        print("错误：无效的选择！")
```

## 挑战任务

### 任务1：简单的文字冒险游戏

编写一个简单的文字冒险游戏，包含以下元素：

1. 多个场景和选择
2. 根据用户的选择进入不同的剧情分支
3. 有胜利和失败的结局

```python
# 简单的文字冒险游戏

print("欢迎来到文字冒险游戏！")
print("你是一位勇敢的冒险者，现在你来到了一个神秘的森林入口...")

# 场景1：森林入口
print("\n场景1：森林入口")
print("你站在一片黑暗森林的入口处，森林里传来奇怪的声音。")
print("1. 勇敢地进入森林")
print("2. 先在附近探索一下")
print("3. 转身离开，寻找其他路径")

choice1 = input("请做出你的选择（1-3）：")

if choice1 == "1":
    # 场景2：森林深处
    print("\n场景2：森林深处")
    print("你走进了森林深处，四周越来越暗。突然，你看到前面有一点亮光。")
    print("1. 朝亮光走去")
    print("2. 小心地绕开亮光，继续前进")
    
    choice2 = input("请做出你的选择（1-2）：")
    
    if choice2 == "1":
        # 场景3：神秘小屋
        print("\n场景3：神秘小屋")
        print("亮光来自一座小木屋，窗户里透出温暖的光芒。")
        print("1. 敲门进入")
        print("2. 透过窗户往里看")
        print("3. 悄悄离开")
        
        choice3 = input("请做出你的选择（1-3）：")
        
        if choice3 == "1":
            print("\n结局：")
            print("一位慈祥的老妇人打开了门，她邀请你进屋，并给了你一些食物和水。")
            print("她告诉你如何走出森林，并送给你一个指南针。在她的帮助下，你成功地完成了冒险！")
            print("恭喜你，获得了胜利！")
        elif choice3 == "2":
            print("\n结局：")
            print("你看到老妇人正在准备魔法药水，她发现了你并把你当成了小偷！")
            print("她生气地施展了一个咒语，把你变成了一只青蛙。你再也没能恢复人形...")
            print("游戏结束，你失败了。")
        else:
            print("\n结局：")
            print("你悄悄离开了小木屋，但是在森林里迷路了。")
            print("你在森林里转了三天三夜，终于找到了出路，但也耗尽了所有的力气...")
            print("游戏结束，你勉强成功了。")
    else:
        print("\n结局：")
        print("你绕开了亮光，继续在黑暗中前进。")
        print("突然，你掉进了一个陷阱！你试图爬出来，但是陷阱太深了...")
        print("游戏结束，你失败了。")
elif choice1 == "2":
    print("\n场景2：附近探索")
    print("你在森林入口附近探索，发现了一条小路。")
    print("小路的尽头似乎有什么东西在闪闪发光。")
    print("1. 走小路去看看闪闪发光的是什么")
    print("2. 还是直接进入森林")
    
    choice2 = input("请做出你的选择（1-2）：")
    
    if choice2 == "1":
        print("\n结局：")
        print("你走到了小路的尽头，发现了一堆金币！")
        print("但是，这些金币被下了诅咒。当你拿起金币时，你被诅咒变成了一座雕像...")
        print("游戏结束，你失败了。")
    else:
        print("\n结局：")
        print("你决定直接进入森林，但是很快就迷路了。")
        print("在森林里转悠了很久，你终于找到了正确的方向，成功走出了森林。")
        print("恭喜你，获得了胜利！")
else:
    print("\n结局：")
    print("你转身离开了森林，选择了一条安全的道路。")
    print("虽然没有经历刺激的冒险，但你平安地到达了目的地。")
    print("游戏结束，你选择了和平的方式。")

print("\n感谢游玩文字冒险游戏！")
```

### 任务2：简易的井字棋游戏

编写一个简易的井字棋游戏，实现以下功能：

1. 显示游戏棋盘
2. 玩家和电脑轮流下棋
3. 判断胜负条件
4. 询问是否重新开始游戏

```python
# 简易的井字棋游戏
import random

def display_board(board):
    """显示游戏棋盘"""
    print("\n   |   |")
    print(f" {board[0]} | {board[1]} | {board[2]}")
    print("   |   |")
    print("-----------")
    print("   |   |")
    print(f" {board[3]} | {board[4]} | {board[5]}")
    print("   |   |")
    print("-----------")
    print("   |   |")
    print(f" {board[6]} | {board[7]} | {board[8]}")
    print("   |   |\n")

def check_win(board, mark):
    """检查是否获胜"""
    return ((board[0] == mark and board[1] == mark and board[2] == mark) or  # 行1
            (board[3] == mark and board[4] == mark and board[5] == mark) or  # 行2
            (board[6] == mark and board[7] == mark and board[8] == mark) or  # 行3
            (board[0] == mark and board[3] == mark and board[6] == mark) or  # 列1
            (board[1] == mark and board[4] == mark and board[7] == mark) or  # 列2
            (board[2] == mark and board[5] == mark and board[8] == mark) or  # 列3
            (board[0] == mark and board[4] == mark and board[8] == mark) or  # 对角线1
            (board[2] == mark and board[4] == mark and board[6] == mark))    # 对角线2

def is_board_full(board):
    """检查棋盘是否已满"""
    return " " not in board

def player_move(board):
    """玩家移动"""
    while True:
        try:
            move = int(input("请输入你要下棋的位置（1-9）：")) - 1
            if 0 <= move <= 8 and board[move] == " ":
                return move
            else:
                print("无效的位置，请重新输入！")
        except ValueError:
            print("请输入有效的数字！")

def computer_move(board):
    """电脑移动"""
    # 尝试获胜
    for i in range(9):
        temp_board = board.copy()
        if temp_board[i] == " ":
            temp_board[i] = "O"
            if check_win(temp_board, "O"):
                return i
    
    # 阻止玩家获胜
    for i in range(9):
        temp_board = board.copy()
        if temp_board[i] == " ":
            temp_board[i] = "X"
            if check_win(temp_board, "X"):
                return i
    
    # 尝试占据中心
    if board[4] == " ":
        return 4
    
    # 尝试占据角落
    corners = [0, 2, 6, 8]
    random.shuffle(corners)
    for corner in corners:
        if board[corner] == " ":
            return corner
    
    # 占据边缘
    edges = [1, 3, 5, 7]
    random.shuffle(edges)
    for edge in edges:
        if board[edge] == " ":
            return edge

def play_game():
    """玩一局游戏"""
    board = [" " for _ in range(9)]
    print("欢迎来到井字棋游戏！")
    print("玩家使用 'X'，电脑使用 'O'。")
    print("位置编号如下：")
    print("1 | 2 | 3")
    print("---------\n4 | 5 | 6")
    print("---------\n7 | 8 | 9")
    
    # 随机决定谁先手
    if random.choice([True, False]):
        print("\n电脑先手！")
        current_player = "computer"
    else:
        print("\n玩家先手！")
        current_player = "player"
    
    while True:
        display_board(board)
        
        if current_player == "player":
            # 玩家回合
            move = player_move(board)
            board[move] = "X"
            
            # 检查玩家是否获胜
            if check_win(board, "X"):
                display_board(board)
                print("恭喜你，获胜了！")
                break
            
            # 检查是否平局
            if is_board_full(board):
                display_board(board)
                print("游戏结束，平局！")
                break
            
            # 切换到电脑回合
            current_player = "computer"
        else:
            # 电脑回合
            print("电脑正在思考...")
            move = computer_move(board)
            board[move] = "O"
            
            # 检查电脑是否获胜
            if check_win(board, "O"):
                display_board(board)
                print("很遗憾，电脑获胜了！")
                break
            
            # 检查是否平局
            if is_board_full(board):
                display_board(board)
                print("游戏结束，平局！")
                break
            
            # 切换到玩家回合
            current_player = "player"

# 主程序
while True:
    play_game()
    play_again = input("是否再玩一局？（y/n）：")
    if play_again.lower() != "y":
        print("感谢游玩井字棋游戏，再见！")
        break
```

## 学习建议

1. **多动手实践**：编程是一门实践性很强的技能，只有通过不断地练习才能真正掌握。

2. **从简单到复杂**：先从简单的小程序开始，逐步挑战更复杂的任务。

3. **阅读和理解错误信息**：当程序出错时，不要害怕，仔细阅读错误信息，它会告诉你问题出在哪里。

4. **学会调试**：如果程序没有按照预期运行，学会使用print语句或调试工具来找出问题所在。

5. **参考优秀代码**：阅读其他人编写的优秀代码，可以学习到很多编程技巧和思想。

6. **不要害怕犯错**：编程的过程就是不断试错和学习的过程，每一次错误都是一次成长的机会。

7. **坚持练习**：编程技能需要持续的练习和积累，每天花一点时间编程，你会发现自己进步很快！

好了，这就是我们Python基础知识的总结和实战练习！希望这些练习能够帮助你巩固所学的知识，并且让你感受到编程的乐趣。在接下来的课程中，我们将学习更多Python的高级特性和应用。
# 异常处理：优雅地应对错误

在编程过程中，错误是不可避免的。Python提供了强大的异常处理机制，使我们能够优雅地处理程序运行过程中出现的各种错误，而不是让程序直接崩溃。本节课，我们将学习Python中的异常处理机制，包括异常的基本概念、异常处理语句、自定义异常等内容。

## 异常的基本概念

异常是程序运行过程中出现的错误事件。当Python无法正常执行程序时，就会抛出一个异常。如果不处理这个异常，程序就会终止并显示错误信息。

### 常见的异常类型

Python内置了许多异常类型，用于表示不同类型的错误。下面是一些常见的异常类型：

| 异常类型 | 描述 |
|---------|------|
| `SyntaxError` | 语法错误，代码不符合Python语法规范 |
| `NameError` | 尝试访问一个未定义的变量或函数 |
| `TypeError` | 操作或函数应用于不适当类型的对象 |
| `ValueError` | 操作或函数接收到了正确类型但值不适当的参数 |
| `ZeroDivisionError` | 除数为零 |
| `IndexError` | 索引超出序列的范围 |
| `KeyError` | 尝试访问字典中不存在的键 |
| `FileNotFoundError` | 尝试打开一个不存在的文件 |
| `IOError` | 输入/输出操作失败 |
| `ImportError` | 导入模块失败 |
| `AttributeError` | 尝试访问对象不存在的属性或方法 |

### 异常的抛出

当程序运行出现错误时，Python会自动抛出异常。我们也可以使用`raise`语句手动抛出异常：

```python
# 手动抛出异常
def divide(a, b):
    if b == 0:
        raise ZeroDivisionError("除数不能为零！")
    return a / b

# 调用函数，可能会抛出异常
try:
    result = divide(10, 0)
except ZeroDivisionError as e:
    print(f"捕获到异常: {e}")
```

## 异常处理语句

Python提供了`try-except`语句来捕获和处理异常。基本语法如下：

```python
try:
    # 可能会抛出异常的代码块
    pass
except [异常类型 [as 变量名]]:
    # 处理异常的代码块
    pass
[else:
    # 如果没有异常发生，执行的代码块
    pass]
[finally:
    # 无论是否发生异常，都会执行的代码块
    pass]
```

### 基本的try-except语句

最简单的`try-except`语句用于捕获和处理特定类型的异常：

```python
# 基本的try-except语句
def basic_exception_handling():
    try:
        # 尝试执行可能会抛出异常的代码
        num1 = int(input("请输入第一个数字: "))
        num2 = int(input("请输入第二个数字: "))
        result = num1 / num2
        print(f"结果: {result}")
    except ZeroDivisionError:
        # 处理除数为零的异常
        print("错误：除数不能为零！")
    except ValueError:
        # 处理输入值不是数字的异常
        print("错误：请输入有效的数字！")

# 调用函数
if __name__ == "__main__":
    basic_exception_handling()
```

### 捕获多个异常

我们可以在一个`try-except`语句中捕获多个不同类型的异常。有两种方式：

1. 使用多个`except`子句，每个子句处理一种类型的异常
2. 在一个`except`子句中使用元组指定多个异常类型

```python
# 捕获多个异常
def multiple_exceptions_handling():
    try:
        # 尝试执行可能会抛出异常的代码
        num1 = int(input("请输入第一个数字: "))
        num2 = int(input("请输入第二个数字: "))
        result = num1 / num2
        print(f"结果: {result}")
        
        # 尝试访问列表中不存在的元素
        my_list = [1, 2, 3]
        index = int(input("请输入要访问的索引: "))
        print(f"列表中索引为{index}的元素是: {my_list[index]}")
    except ZeroDivisionError:
        # 处理除数为零的异常
        print("错误：除数不能为零！")
    except ValueError:
        # 处理输入值不是数字的异常
        print("错误：请输入有效的数字！")
    except IndexError:
        # 处理索引超出范围的异常
        print("错误：索引超出范围！")

# 使用元组捕获多个异常
def tuple_exceptions_handling():
    try:
        # 尝试执行可能会抛出异常的代码
        num1 = int(input("请输入第一个数字: "))
        num2 = int(input("请输入第二个数字: "))
        result = num1 / num2
        print(f"结果: {result}")
    except (ZeroDivisionError, ValueError) as e:
        # 使用元组捕获多个异常，并获取异常信息
        print(f"捕获到异常: {e}")

# 捕获所有异常
def catch_all_exceptions():
    try:
        # 尝试执行可能会抛出异常的代码
        num1 = int(input("请输入第一个数字: "))
        num2 = int(input("请输入第二个数字: "))
        result = num1 / num2
        print(f"结果: {result}")
    except Exception as e:
        # 捕获所有继承自Exception的异常
        print(f"捕获到异常: {e}")
        # 获取异常的类型
        print(f"异常类型: {type(e).__name__}")

# 调用函数
if __name__ == "__main__":
    print("测试基本的多个异常处理:")
    multiple_exceptions_handling()
    
    print("\n测试使用元组捕获多个异常:")
    tuple_exceptions_handling()
    
    print("\n测试捕获所有异常:")
    catch_all_exceptions()
```

### else子句

`try-except`语句还可以包含一个`else`子句，用于指定如果没有异常发生时要执行的代码块：

```python
# 使用else子句
def try_except_else():
    try:
        # 尝试执行可能会抛出异常的代码
        num1 = int(input("请输入第一个数字: "))
        num2 = int(input("请输入第二个数字: "))
        result = num1 / num2
    except ZeroDivisionError:
        # 处理除数为零的异常
        print("错误：除数不能为零！")
    except ValueError:
        # 处理输入值不是数字的异常
        print("错误：请输入有效的数字！")
    else:
        # 如果没有异常发生，执行这里的代码
        print(f"计算成功！结果: {result}")

# 调用函数
if __name__ == "__main__":
    try_except_else()
```

### finally子句

`try-except`语句还可以包含一个`finally`子句，用于指定无论是否发生异常都要执行的代码块。`finally`子句通常用于释放资源，如关闭文件、网络连接等：

```python
# 使用finally子句
def try_except_finally():
    file = None
    try:
        # 尝试打开文件并读取内容
        file = open("example.txt", "r")
        content = file.read()
        print(f"文件内容: {content}")
    except FileNotFoundError:
        # 处理文件不存在的异常
        print("错误：文件不存在！")
    except IOError:
        # 处理IO错误
        print("错误：读取文件时发生IO错误！")
    finally:
        # 无论是否发生异常，都要执行这里的代码
        # 关闭文件
        if file is not None:
            file.close()
            print("文件已关闭")

# 使用with语句（更优雅的方式）
def with_statement_example():
    try:
        # 使用with语句自动管理资源（文件会在with块结束后自动关闭）
        with open("example.txt", "r") as file:
            content = file.read()
            print(f"文件内容: {content}")
    except FileNotFoundError:
        print("错误：文件不存在！")
    except IOError:
        print("错误：读取文件时发生IO错误！")

# 调用函数
if __name__ == "__main__":
    print("测试finally子句:")
    try_except_finally()
    
    print("\n测试with语句:")
    with_statement_example()
```

## 自定义异常

在Python中，我们可以通过继承内置的`Exception`类来创建自定义异常。自定义异常通常用于表示程序特有的错误情况。

### 创建自定义异常

创建自定义异常的基本语法如下：

```python
class CustomExceptionName(Exception):
    """自定义异常的描述"""
    pass
```

下面是一个简单的自定义异常示例：

```python
# 创建自定义异常
class NegativeNumberError(Exception):
    """当输入负数时抛出的异常"""
    pass

class InsufficientFundsError(Exception):
    """当账户余额不足时抛出的异常"""
    def __init__(self, balance, amount):
        # 调用父类的__init__方法
        super().__init__(f"账户余额不足！当前余额: {balance}, 尝试取出: {amount}")
        self.balance = balance
        self.amount = amount

# 使用自定义异常
def process_positive_number(num):
    """处理正数，如果输入负数则抛出异常"""
    if num < 0:
        raise NegativeNumberError(f"输入了负数: {num}")
    return num * 2

class BankAccount:
    """银行账户类"""
    
    def __init__(self, balance=0):
        """初始化银行账户"""
        self.balance = balance
    
    def deposit(self, amount):
        """存款"""
        if amount <= 0:
            raise ValueError("存款金额必须大于零！")
        self.balance += amount
        return self.balance
    
    def withdraw(self, amount):
        """取款"""
        if amount <= 0:
            raise ValueError("取款金额必须大于零！")
        if amount > self.balance:
            # 抛出自定义异常
            raise InsufficientFundsError(self.balance, amount)
        self.balance -= amount
        return self.balance
    
    def get_balance(self):
        """获取余额"""
        return self.balance

# 测试自定义异常
def test_custom_exceptions():
    print("测试NegativeNumberError异常:")
    try:
        result = process_positive_number(-5)
        print(f"结果: {result}")
    except NegativeNumberError as e:
        print(f"捕获到自定义异常: {e}")
    
    print("\n测试InsufficientFundsError异常:")
    account = BankAccount(1000)
    print(f"初始余额: {account.get_balance()}")
    
    try:
        # 存款
        account.deposit(500)
        print(f"存款后余额: {account.get_balance()}")
        
        # 尝试取出过多的钱
        account.withdraw(2000)
        print(f"取款后余额: {account.get_balance()}")
    except InsufficientFundsError as e:
        print(f"捕获到自定义异常: {e}")
        print(f"当前余额: {e.balance}")
        print(f"尝试取出的金额: {e.amount}")
    except ValueError as e:
        print(f"捕获到值错误: {e}")

# 调用函数
if __name__ == "__main__":
    test_custom_exceptions()
```

### 异常的层次结构

在创建自定义异常时，我们可以定义一个异常的层次结构，以便更好地组织和区分不同类型的异常：

```python
# 定义异常的层次结构
class BaseError(Exception):
    """所有自定义异常的基类"""
    pass

class InputError(BaseError):
    """输入相关的异常基类"""
    pass

class ValidationError(InputError):
    """验证相关的异常"""
    pass

class FormatError(InputError):
    """格式相关的异常"""
    pass

class ProcessingError(BaseError):
    """处理相关的异常基类"""
    pass

class CalculationError(ProcessingError):
    """计算相关的异常"""
    pass

class NetworkError(BaseError):
    """网络相关的异常基类"""
    pass

class ConnectionError(NetworkError):
    """连接相关的异常"""
    pass

class TimeoutError(NetworkError):
    """超时相关的异常"""
    pass

# 使用异常层次结构
def validate_age(age):
    """验证年龄"""
    if not isinstance(age, int):
        raise ValidationError(f"年龄必须是整数，而不是{type(age).__name__}")
    if age < 0:
        raise ValidationError(f"年龄不能为负数: {age}")
    if age > 150:
        raise ValidationError(f"年龄过大: {age}")
    return True

def parse_date(date_str):
    """解析日期字符串"""
    if not isinstance(date_str, str):
        raise FormatError(f"日期必须是字符串，而不是{type(date_str).__name__}")
    # 简单的日期格式验证（YYYY-MM-DD）
    import re
    if not re.match(r"^\d{4}-\d{2}-\d{2}$", date_str):
        raise FormatError(f"日期格式不正确，请使用YYYY-MM-DD格式: {date_str}")
    # 这里可以添加更多的验证逻辑
    return date_str

# 测试异常层次结构
def test_exception_hierarchy():
    print("测试验证年龄:")
    try:
        validate_age(-10)
    except InputError as e:
        print(f"捕获到输入错误: {e}")
    except BaseError as e:
        print(f"捕获到基础错误: {e}")
    except Exception as e:
        print(f"捕获到异常: {e}")
    
    print("\n测试解析日期:")
    try:
        parse_date("2023/01/01")
    except FormatError as e:
        print(f"捕获到格式错误: {e}")
    except InputError as e:
        print(f"捕获到输入错误: {e}")
    except Exception as e:
        print(f"捕获到异常: {e}")

# 调用函数
if __name__ == "__main__":
    test_exception_hierarchy()
```

## 异常链

在Python 3中，我们可以使用`raise ... from ...`语句来创建异常链，表示一个异常是由另一个异常引起的：

```python
# 创建异常链
def read_config_file(file_path):
    """读取配置文件"""
    try:
        with open(file_path, "r") as file:
            # 这里假设配置文件是JSON格式的
            import json
            config = json.load(file)
            return config
    except FileNotFoundError as e:
        # 抛出新的异常，并保留原始异常的信息
        raise RuntimeError(f"无法读取配置文件: {file_path}") from e
    except json.JSONDecodeError as e:
        # 抛出新的异常，并保留原始异常的信息
        raise ValueError(f"配置文件格式不正确: {file_path}") from e

# 测试异常链
def test_exception_chaining():
    try:
        config = read_config_file("non_existent_config.json")
        print(f"配置: {config}")
    except Exception as e:
        print(f"捕获到异常: {e}")
        # 检查是否有原始异常
        if e.__cause__ is not None:
            print(f"原始异常: {e.__cause__}")
            print(f"原始异常类型: {type(e.__cause__).__name__}")

# 抑制异常链
# 如果不想显示异常链，可以使用`raise ... from None`
def suppress_exception_chaining():
    try:
        with open("non_existent_file.txt", "r") as file:
            content = file.read()
    except FileNotFoundError:
        # 抛出新的异常，并抑制异常链
        raise RuntimeError("无法读取文件") from None

# 测试抑制异常链
def test_suppress_exception_chaining():
    try:
        suppress_exception_chaining()
    except Exception as e:
        print(f"捕获到异常: {e}")
        # 检查是否有原始异常
        if e.__cause__ is None:
            print("异常链已被抑制")

# 调用函数
if __name__ == "__main__":
    print("测试异常链:")
    test_exception_chaining()
    
    print("\n测试抑制异常链:")
    test_suppress_exception_chaining()
```

## 断言

断言是一种调试辅助工具，用于在开发阶段检查代码中的条件是否为真。如果条件为假，会抛出`AssertionError`异常。断言的语法如下：

```python
assert 条件, 错误消息
```

下面是一个断言的示例：

```python
# 使用断言
def calculate_discount(price, discount_rate):
    """计算折扣后的价格"""
    # 使用断言检查参数的有效性
    assert isinstance(price, (int, float)), f"价格必须是数字，而不是{type(price).__name__}"
    assert price >= 0, f"价格不能为负数: {price}"
    assert isinstance(discount_rate, (int, float)), f"折扣率必须是数字，而不是{type(discount_rate).__name__}"
    assert 0 <= discount_rate <= 1, f"折扣率必须在0到1之间: {discount_rate}"
    
    # 计算折扣后的价格
    discounted_price = price * (1 - discount_rate)
    return discounted_price

# 测试断言
def test_assertions():
    try:
        # 正常情况
        price1 = calculate_discount(100, 0.2)
        print(f"折扣后的价格: {price1}")
        
        # 测试断言错误
        price2 = calculate_discount(-100, 0.2)  # 价格为负数，会触发断言错误
        print(f"折扣后的价格: {price2}")
    except AssertionError as e:
        print(f"捕获到断言错误: {e}")

# 注意：在生产环境中，可以通过-O选项（优化模式）运行Python来禁用断言
# python -O script.py

# 调用函数
if __name__ == "__main__":
    test_assertions()
```

## 异常处理的最佳实践

在编写Python代码时，应该遵循以下异常处理的最佳实践：

### 1. 只捕获必要的异常

不要使用裸露的`except:`语句捕获所有异常，这会隐藏程序中的真正问题。应该只捕获那些你知道如何处理的特定类型的异常：

```python
# 不好的做法
# try:
#     # 可能会抛出异常的代码
# except:
#     # 处理所有异常

# 好的做法
try:
    # 可能会抛出异常的代码
    file = open("example.txt", "r")
    content = file.read()
    file.close()
except FileNotFoundError:
    # 只处理文件不存在的异常
    print("错误：文件不存在！")
except IOError:
    # 只处理IO错误
    print("错误：读取文件时发生IO错误！")
```

### 2. 使用具体的异常类型

尽量使用具体的异常类型，而不是使用通用的`Exception`类：

```python
# 不好的做法
# try:
#     # 可能会抛出异常的代码
# except Exception as e:
#     # 处理所有异常

# 好的做法
try:
    # 可能会抛出异常的代码
    num = int(input("请输入一个数字: "))
    result = 10 / num
    print(f"结果: {result}")
except ValueError:
    # 处理输入值不是数字的异常
    print("错误：请输入有效的数字！")
except ZeroDivisionError:
    # 处理除数为零的异常
    print("错误：除数不能为零！")
```

### 3. 提供有用的错误消息

在捕获异常时，应该提供清晰、具体的错误消息，以便用户或开发人员了解发生了什么问题：

```python
# 不好的做法
# try:
#     # 可能会抛出异常的代码
# except ValueError:
#     print("错误！")

# 好的做法
try:
    # 可能会抛出异常的代码
    age = int(input("请输入您的年龄: "))
    if age < 0:
        raise ValueError("年龄不能为负数")
    if age > 150:
        raise ValueError("年龄过大，不符合实际")
    print(f"您的年龄是: {age}")
except ValueError as e:
    # 提供有用的错误消息
    print(f"输入错误: {e}")
```

### 4. 使用finally子句或with语句释放资源

当代码涉及到文件、网络连接等资源时，应该使用`finally`子句或`with`语句确保资源被正确释放：

```python
# 使用finally子句
file = None
try:
    file = open("example.txt", "r")
    content = file.read()
    print(f"文件内容: {content}")
except FileNotFoundError:
    print("错误：文件不存在！")
finally:
    if file is not None:
        file.close()
        print("文件已关闭")

# 使用with语句（更优雅的方式）
try:
    with open("example.txt", "r") as file:
        content = file.read()
        print(f"文件内容: {content}")
except FileNotFoundError:
    print("错误：文件不存在！")
# 文件会在with块结束后自动关闭
```

### 5. 不要忽略异常

除非你有充分的理由，否则不要捕获异常后不做任何处理：

```python
# 不好的做法
# try:
#     # 可能会抛出异常的代码
# except:
#     pass  # 忽略异常，不做任何处理

# 好的做法
try:
    # 可能会抛出异常的代码
    file = open("example.txt", "r")
    content = file.read()
    file.close()
except FileNotFoundError:
    # 记录错误信息
    print("警告：无法找到文件example.txt，将使用默认配置")
    # 提供替代方案或使用默认值
    config = get_default_config()
```

### 6. 合理使用自定义异常

当标准异常不足以描述程序中的特定错误情况时，可以创建自定义异常：

```python
# 定义自定义异常
class DatabaseError(Exception):
    """数据库相关的异常基类"""
    pass

class ConnectionError(DatabaseError):
    """数据库连接异常"""
    pass

class QueryError(DatabaseError):
    """数据库查询异常"""
    pass

# 使用自定义异常
def execute_query(query):
    """执行数据库查询"""
    try:
        # 尝试连接数据库
        # ...
        # 执行查询
        # ...
    except ConnectionError as e:
        print(f"数据库连接错误: {e}")
        # 尝试重新连接或记录日志
    except QueryError as e:
        print(f"数据库查询错误: {e}")
        # 处理查询错误
    except DatabaseError as e:
        print(f"数据库错误: {e}")
        # 处理其他数据库错误
```

### 7. 避免在循环中使用try-except

尽量避免在循环中使用`try-except`语句，因为异常处理的开销比较大。如果可能的话，应该在循环外进行异常处理，或者先进行条件检查：

```python
# 不好的做法
# for i in range(1000):
#     try:
#         # 可能会抛出异常的代码
#     except Exception as e:
#         # 处理异常

# 好的做法（如果可能的话，先进行条件检查）
for i in range(1000):
    # 先进行条件检查，避免异常
    if condition:
        # 执行操作
    else:
        # 处理不满足条件的情况

# 或者在循环外进行异常处理（如果异常是致命的）
try:
    for i in range(1000):
        # 可能会抛出异常的代码
        pass
except Exception as e:
    # 处理异常
```

### 8. 记录异常信息

在处理异常时，应该记录异常的详细信息，以便于调试和排查问题：

```python
import logging

# 配置日志
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# 记录异常信息
def log_exception_example():
    try:
        # 可能会抛出异常的代码
        result = 10 / 0
    except ZeroDivisionError as e:
        # 记录异常信息
        logging.error(f"发生除零错误: {e}")
        # 或者记录完整的异常栈
        logging.exception("发生除零错误")

# 调用函数
if __name__ == "__main__":
    log_exception_example()
```

## 编程小贴士

1. **异常是Python的编程风格**：在Python中，"请求原谅比请求许可更容易"（EAFP, Easier to Ask Forgiveness than Permission）是一种常见的编程风格。这意味着我们通常会先尝试执行操作，如果出现异常再进行处理，而不是在执行操作前进行大量的条件检查。

2. **理解异常的继承关系**：Python的异常是有继承关系的。例如，`ZeroDivisionError`继承自`ArithmeticError`，而`ArithmeticError`又继承自`Exception`。了解异常的继承关系可以帮助我们更好地组织和处理异常。

3. **使用`as`关键字获取异常对象**：在`except`子句中，可以使用`as`关键字获取异常对象，从而获取更多的异常信息。

4. **区分异常和错误**：虽然我们通常将异常和错误视为同义词，但在Python中，异常（Exception）是一个特定的类，而错误（Error）通常指的是更严重的问题。一般来说，我们应该处理异常，但让错误传播（例如，`SyntaxError`、`MemoryError`等）。

5. **不要过度使用异常**：虽然异常处理是Python编程的重要部分，但也不要过度使用异常。对于可以通过简单的条件检查避免的错误，应该使用条件检查而不是异常处理。

6. **使用`traceback`模块获取详细的异常信息**：`traceback`模块提供了获取和处理异常栈跟踪信息的功能，可以帮助我们更好地理解和调试异常。

7. **在单元测试中测试异常**：在编写单元测试时，应该测试代码是否正确地抛出和处理了异常。Python的`unittest`模块提供了`assertRaises`方法来测试异常。

8. **注意异常的性能影响**：异常处理会有一定的性能开销，因此在性能敏感的代码中，应该谨慎使用异常处理。

## 动手练习

1. 编写一个函数，接受一个整数列表作为参数，返回列表中所有元素的平均值。如果列表为空或包含非数字元素，抛出适当的异常并处理。

2. 编写一个函数，从文件中读取数据并解析为JSON格式。处理可能出现的各种异常，如文件不存在、文件格式不正确等。

3. 创建一个自定义异常类`InvalidEmailError`，用于表示无效的电子邮件地址。编写一个函数`validate_email`，检查电子邮件地址的格式是否正确，如果不正确，抛出`InvalidEmailError`异常。

4. 编写一个程序，模拟一个简单的银行账户系统，包括存款、取款和查询余额功能。使用异常处理来处理各种错误情况，如余额不足、输入无效等。

5. 编写一个函数，接受一个字符串作为参数，返回该字符串的反转。使用`try-except`语句来处理可能出现的异常。

## 挑战任务

### 任务1：实现一个健壮的文件处理程序

编写一个程序，实现以下功能：

1. 从指定的文件中读取数据
2. 处理数据（例如，统计单词频率、计算数值的总和和平均值等）
3. 将处理结果写入到另一个文件中

要求：

- 使用异常处理来处理可能出现的各种错误，如文件不存在、权限不足、文件格式不正确等
- 提供清晰的错误消息
- 确保资源被正确释放（使用`finally`子句或`with`语句）
- 记录异常信息到日志文件中

下面是一个示例实现：

```python
import os
import logging
from collections import Counter

# 配置日志
def setup_logger():
    """配置日志记录器"""
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(levelname)s - %(message)s",
        filename="file_processor.log",
        filemode="a"
    )
    # 同时输出到控制台
    console = logging.StreamHandler()
    console.setLevel(logging.INFO)
    formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
    console.setFormatter(formatter)
    logging.getLogger("").addHandler(console)

# 定义自定义异常
class FileProcessingError(Exception):
    """文件处理过程中的异常基类"""
    pass

class InputFileError(FileProcessingError):
    """输入文件相关的异常"""
    pass

class OutputFileError(FileProcessingError):
    """输出文件相关的异常"""
    pass

class DataFormatError(FileProcessingError):
    """数据格式相关的异常"""
    pass

# 文件处理函数
def process_file(input_file_path, output_file_path):
    """处理文件数据"""
    logging.info(f"开始处理文件: {input_file_path}")
    
    # 检查输入文件是否存在
    if not os.path.exists(input_file_path):
        logging.error(f"输入文件不存在: {input_file_path}")
        raise InputFileError(f"输入文件不存在: {input_file_path}")
    
    # 检查输入文件是否为文件
    if not os.path.isfile(input_file_path):
        logging.error(f"输入路径不是文件: {input_file_path}")
        raise InputFileError(f"输入路径不是文件: {input_file_path}")
    
    # 检查输出文件的目录是否存在，如果不存在则创建
    output_dir = os.path.dirname(output_file_path)
    if output_dir and not os.path.exists(output_dir):
        try:
            os.makedirs(output_dir)
            logging.info(f"创建输出目录: {output_dir}")
        except OSError as e:
            logging.error(f"无法创建输出目录: {e}")
            raise OutputFileError(f"无法创建输出目录: {e}")
    
    try:
        # 读取输入文件
        with open(input_file_path, "r", encoding="utf-8") as input_file:
            content = input_file.read()
        logging.info(f"成功读取输入文件，文件大小: {len(content)} 字节")
        
        # 处理数据
        processed_data = process_data(content)
        logging.info("成功处理数据")
        
        # 写入输出文件
        with open(output_file_path, "w", encoding="utf-8") as output_file:
            output_file.write(processed_data)
        logging.info(f"成功写入输出文件: {output_file_path}")
        
    except UnicodeDecodeError as e:
        logging.error(f"无法解码输入文件: {e}")
        raise InputFileError(f"无法解码输入文件: {e}")
    except IOError as e:
        logging.error(f"文件IO错误: {e}")
        # 判断是输入文件还是输出文件的错误
        if "r" in str(e):
            raise InputFileError(f"读取输入文件时出错: {e}")
        else:
            raise OutputFileError(f"写入输出文件时出错: {e}")
    except DataFormatError as e:
        logging.error(f"数据格式错误: {e}")
        raise
    except Exception as e:
        logging.error(f"处理文件时发生未知错误: {e}")
        raise FileProcessingError(f"处理文件时发生未知错误: {e}")
    
    logging.info("文件处理完成")
    return output_file_path

def process_data(content):
    """处理文件内容"""
    # 检查内容是否为空
    if not content.strip():
        raise DataFormatError("文件内容为空")
    
    # 统计单词频率
    words = content.lower().split()
    word_counts = Counter(words)
    
    # 准备输出结果
    result = ["文件处理结果:", ""]
    result.append(f"总字符数: {len(content)}")
    result.append(f"总单词数: {len(words)}")
    result.append(f"不同单词数: {len(word_counts)}")
    result.append("")
    result.append("出现频率最高的10个单词:")
    
    # 添加频率最高的10个单词
    for word, count in word_counts.most_common(10):
        result.append(f"{word}: {count}")
    
    # 添加所有单词及其频率
    result.append("")
    result.append("所有单词及其频率:")
    for word, count in sorted(word_counts.items()):
        result.append(f"{word}: {count}")
    
    return "\n".join(result)

# 主函数
def main():
    """主函数"""
    setup_logger()
    
    input_file = "sample.txt"
    output_file = "processed_result.txt"
    
    try:
        # 处理文件
        result_file = process_file(input_file, output_file)
        print(f"文件处理成功！结果保存在: {result_file}")
    except FileProcessingError as e:
        print(f"文件处理失败: {e}")
    except Exception as e:
        print(f"发生未知错误: {e}")

# 运行主函数
if __name__ == "__main__":
    main()
```

在这个示例中，我们实现了一个健壮的文件处理程序，它可以：

1. 从指定的输入文件中读取数据
2. 统计文件中的字符数、单词数、不同单词数以及每个单词的出现频率
3. 将处理结果写入到指定的输出文件中

程序使用了异常处理来处理各种可能出现的错误，如输入文件不存在、无法创建输出目录、文件IO错误等。同时，程序还使用了日志记录来记录异常信息和程序的运行状态。

### 任务2：创建一个异常处理装饰器

装饰器是Python中的一种高级特性，它可以修改函数或类的行为。在这个任务中，你需要创建一个异常处理装饰器，用于捕获和处理函数执行过程中出现的异常。

要求：

1. 创建一个名为`handle_exceptions`的装饰器，它可以接受一个或多个异常类型作为参数
2. 装饰器应该捕获被装饰函数执行过程中出现的指定类型的异常
3. 在捕获到异常时，装饰器应该记录异常信息，并返回一个默认值或执行一个回退操作
4. 装饰器应该保持被装饰函数的原始签名和文档字符串

下面是一个示例实现：

```python
import functools
import logging
import time

# 配置日志
def setup_logger():
    """配置日志记录器"""
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(levelname)s - %(message)s"
    )

# 定义异常处理装饰器
def handle_exceptions(*exceptions, default_value=None, fallback_func=None, retry=False, max_retries=3, retry_delay=1):
    """异常处理装饰器
    参数:
        *exceptions: 要捕获的异常类型，可以是多个
        default_value: 捕获到异常时返回的默认值
        fallback_func: 捕获到异常时执行的回退函数
        retry: 是否在捕获到异常时重试
        max_retries: 最大重试次数
        retry_delay: 重试间隔（秒）
    返回:
        装饰后的函数
    """
    def decorator(func):
        @functools.wraps(func)  # 保留原始函数的签名和文档字符串
        def wrapper(*args, **kwargs):
            retries = 0
            while True:
                try:
                    # 尝试执行原始函数
                    return func(*args, **kwargs)
                except Exception as e:
                    # 检查捕获的异常是否是指定的异常类型
                    if exceptions and not isinstance(e, exceptions):
                        # 如果不是指定的异常类型，则重新抛出
                        raise
                    
                    # 记录异常信息
                    logging.error(f"函数 {func.__name__} 执行出错: {e}")
                    
                    # 检查是否需要重试
                    if retry and retries < max_retries:
                        retries += 1
                        logging.info(f"重试函数 {func.__name__}，第 {retries} 次重试")
                        time.sleep(retry_delay)  # 等待一段时间后重试
                        continue
                    
                    # 执行回退函数
                    if fallback_func:
                        logging.info(f"执行回退函数")
                        return fallback_func(*args, **kwargs)
                    
                    # 返回默认值
                    logging.info(f"返回默认值: {default_value}")
                    return default_value
        return wrapper
    return decorator

# 测试装饰器
@handle_exceptions(ZeroDivisionError, ValueError, default_value=0)
def divide(a, b):
    """计算两个数的商"""
    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        raise ValueError("参数必须是数字")
    return a / b

@handle_exceptions(FileNotFoundError, IOError, retry=True, max_retries=3, retry_delay=2)
def read_file(file_path):
    """读取文件内容"""
    with open(file_path, "r") as file:
        return file.read()

@handle_exceptions(Exception, fallback_func=lambda *args, **kwargs: "Fallback result")
def process_data(data):
    """处理数据"""
    if not data:
        raise ValueError("数据不能为空")
    # 模拟处理数据
    return f"Processed: {data}"

# 主函数
def main():
    """测试异常处理装饰器"""
    setup_logger()
    
    # 测试divide函数
    print("测试divide函数:")
    print(f"10 / 2 = {divide(10, 2)}")  # 正常情况
    print(f"10 / 0 = {divide(10, 0)}")  # 除零错误，返回默认值0
    print(f"10 / 'a' = {divide(10, 'a')}")  # 类型错误，返回默认值0
    
    # 测试read_file函数
    print("\n测试read_file函数:")
    try:
        content = read_file("non_existent_file.txt")
        print(f"文件内容: {content}")
    except Exception as e:
        print(f"读取文件失败: {e}")
    
    # 测试process_data函数
    print("\n测试process_data函数:")
    print(f"process_data('test') = {process_data('test')}")  # 正常情况
    print(f"process_data('') = {process_data('')}")  # 数据为空，执行回退函数

# 运行主函数
if __name__ == "__main__":
    main()
```

在这个示例中，我们创建了一个功能强大的异常处理装饰器`handle_exceptions`，它可以：

1. 捕获指定类型的异常
2. 在捕获到异常时记录异常信息
3. 返回默认值或执行回退函数
4. 支持在捕获到异常时自动重试
5. 保留被装饰函数的原始签名和文档字符串

通过使用这个装饰器，我们可以很方便地为函数添加异常处理功能，使代码更加简洁和健壮。

通过本节课的学习，我们已经掌握了Python中的异常处理机制，包括异常的基本概念、异常处理语句、自定义异常等内容。合理使用异常处理可以使我们的程序更加健壮，能够优雅地处理各种错误情况。在接下来的课程中，我们将学习Python中的文件操作、日期和时间处理等内容。
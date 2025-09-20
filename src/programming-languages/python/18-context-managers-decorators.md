# 上下文管理器与装饰器

在Python中，上下文管理器和装饰器是两个强大的特性，它们可以帮助我们编写更加简洁、优雅和可维护的代码。在本节课中，我们将学习上下文管理器和装饰器的基本概念、使用方法和应用场景。

## 18.1 上下文管理器

上下文管理器（Context Manager）是一种可以在特定的上下文中执行代码的对象，它主要用于资源管理，如文件操作、网络连接等。上下文管理器最常见的使用方式是与`with`语句一起使用，它可以确保在代码块执行完毕后，无论代码块是否抛出异常，都会正确地释放资源。

### 18.1.1 with语句

`with`语句是Python中用于简化资源管理的语法糖，它可以确保在代码块执行完毕后，无论代码块是否抛出异常，都会正确地释放资源。`with`语句的基本语法如下：

```python
with context_manager as variable:
    # 代码块
```

其中，`context_manager`是一个上下文管理器对象，`variable`是可选的，它是上下文管理器的`__enter__()`方法的返回值。

下面是一个简单的例子，展示了`with`语句的使用：

```python
# 使用with语句打开文件
with open('example.txt', 'r', encoding='utf-8') as file:
    content = file.read()
    print(content)
# 在这里，文件已经自动关闭，不需要手动调用file.close()

# 不使用with语句打开文件
file = open('example.txt', 'r', encoding='utf-8')
try:
    content = file.read()
    print(content)
finally:
    file.close()  # 需要手动调用file.close()
```

在上面的例子中，我们使用`with`语句打开文件，并在代码块中读取文件的内容。当代码块执行完毕后，无论代码块是否抛出异常，Python都会自动调用文件对象的`close()`方法，正确地释放文件资源。而在不使用`with`语句的情况下，我们需要使用`try-finally`语句来确保文件资源被正确释放。

### 18.1.2 上下文管理器协议

在Python中，上下文管理器协议（Context Manager Protocol）定义了上下文管理器应该具有的接口。具体来说，一个对象要成为上下文管理器，必须实现两个特殊方法：

- `__enter__()`：在进入`with`语句的代码块之前调用，返回值将被赋值给`as`关键字后面的变量。
- `__exit__(exc_type, exc_val, exc_tb)`：在退出`with`语句的代码块时调用，可以处理异常或执行清理操作。
  - `exc_type`：异常类型，如果没有异常则为`None`。
  - `exc_val`：异常值，如果没有异常则为`None`。
  - `exc_tb`：异常的追踪信息，如果没有异常则为`None`。
  - 如果`__exit__()`方法返回`True`，则异常不会被传播；如果返回`False`或没有返回值，则异常会被传播。

下面是一个简单的例子，展示了如何创建一个自定义的上下文管理器：

```python
class FileContextManager:
    """文件上下文管理器"""
    
    def __init__(self, file_path, mode='r', encoding='utf-8'):
        """初始化FileContextManager对象
        参数:
            file_path: 文件路径
            mode: 打开模式，默认为'r'
            encoding: 编码方式，默认为'utf-8'
        """
        self.file_path = file_path
        self.mode = mode
        self.encoding = encoding
        self.file = None
    
    def __enter__(self):
        """进入上下文管理器"""
        self.file = open(self.file_path, self.mode, encoding=self.encoding)
        return self.file
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """退出上下文管理器"""
        if self.file:
            self.file.close()
        # 如果有异常，打印异常信息但不传播异常
        if exc_type:
            print(f"发生异常: {exc_type}, {exc_val}")
            return True
        return False

# 使用自定义上下文管理器
with FileContextManager('example.txt', 'r') as file:
    content = file.read()
    print(content)
    # 故意引发异常
    # 1 / 0
# 在这里，文件已经自动关闭，异常也被捕获处理
```

在上面的例子中，我们创建了一个`FileContextManager`类，它实现了`__enter__()`和`__exit__()`方法，因此是一个上下文管理器。`__enter__()`方法打开文件并返回文件对象，`__exit__()`方法关闭文件并处理异常。

### 18.1.3 contextlib模块

Python的`contextlib`模块提供了一些实用的工具，用于创建和使用上下文管理器。其中，最常用的是`contextmanager`装饰器，它可以将一个生成器函数转换为上下文管理器。

`contextmanager`装饰器的使用方法如下：

1. 定义一个生成器函数，使用`yield`语句将函数体分为两部分：`yield`语句之前的代码在进入上下文管理器时执行，相当于`__enter__()`方法；`yield`语句之后的代码在退出上下文管理器时执行，相当于`__exit__()`方法。
2. 使用`contextmanager`装饰器装饰这个生成器函数。
3. 调用这个装饰后的函数，得到一个上下文管理器对象。

下面是一个简单的例子，展示了`contextmanager`装饰器的使用：

```python
from contextlib import contextmanager

@contextmanager
def file_context_manager(file_path, mode='r', encoding='utf-8'):
    """文件上下文管理器生成器函数
    参数:
        file_path: 文件路径
        mode: 打开模式，默认为'r'
        encoding: 编码方式，默认为'utf-8'
    """
    # __enter__()方法的代码
    file = open(file_path, mode, encoding=encoding)
    try:
        yield file  # 返回值将被赋值给as关键字后面的变量
    finally:
        # __exit__()方法的代码
        file.close()

# 使用contextmanager装饰器创建的上下文管理器
with file_context_manager('example.txt', 'r') as file:
    content = file.read()
    print(content)
# 在这里，文件已经自动关闭
```

在上面的例子中，我们使用`contextmanager`装饰器将`file_context_manager()`生成器函数转换为上下文管理器。生成器函数中的`yield`语句将函数体分为两部分：`yield`语句之前的代码在进入上下文管理器时执行，相当于`__enter__()`方法；`yield`语句之后的代码在退出上下文管理器时执行，相当于`__exit__()`方法。

`contextlib`模块还提供了一些其他的实用工具，如`closing`、`suppress`、`redirect_stdout`等，它们可以帮助我们更加方便地创建和使用上下文管理器。

### 18.1.4 上下文管理器的应用场景

上下文管理器在Python中有很多应用场景，下面是一些常见的例子：

#### 1. 文件操作

文件操作是上下文管理器最常见的应用场景之一，它可以确保在文件操作完成后，无论操作是否成功，都会正确地关闭文件。

```python
# 使用with语句打开文件
with open('example.txt', 'r', encoding='utf-8') as file:
    content = file.read()
    print(content)
# 在这里，文件已经自动关闭
```

#### 2. 数据库连接

数据库连接也是上下文管理器的常见应用场景之一，它可以确保在数据库操作完成后，无论操作是否成功，都会正确地关闭数据库连接。

```python
import sqlite3

# 使用with语句管理数据库连接
with sqlite3.connect('example.db') as conn:
    cursor = conn.cursor()
    # 执行SQL语句
    cursor.execute('SELECT * FROM users')
    # 获取结果
    results = cursor.fetchall()
    for row in results:
        print(row)
# 在这里，数据库连接已经自动关闭
```

#### 3. 线程锁

线程锁也是上下文管理器的常见应用场景之一，它可以确保在临界区代码执行完成后，无论代码是否抛出异常，都会正确地释放线程锁。

```python
import threading

# 创建线程锁
lock = threading.Lock()

# 使用with语句管理线程锁
with lock:
    # 临界区代码
    pass
# 在这里，线程锁已经自动释放
```

#### 4. 自定义资源管理

上下文管理器还可以用于自定义的资源管理场景，如网络连接、进程管理等。通过使用上下文管理器，我们可以确保在资源使用完成后，无论使用是否成功，都会正确地释放资源。

```python
from contextlib import contextmanager
import socket

@contextmanager
def network_connection(host, port):
    """网络连接上下文管理器
    参数:
        host: 主机地址
        port: 端口号
    """
    # 创建网络连接
    conn = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        # 连接到服务器
        conn.connect((host, port))
        # 返回连接对象
        yield conn
    finally:
        # 关闭网络连接
        conn.close()

# 使用自定义网络连接上下文管理器
# with network_connection('localhost', 8080) as conn:
#     # 使用连接对象进行通信
#     conn.send(b'Hello, Server!')
#     data = conn.recv(1024)
#     print(f'收到数据: {data.decode()}')
# 在这里，网络连接已经自动关闭
```

上下文管理器是Python中一个强大的特性，它可以帮助我们编写更加简洁、优雅和可维护的代码，特别是在资源管理场景中。在实际的开发中，我们应该充分利用上下文管理器的优势，确保资源的正确管理和释放。

## 18.2 装饰器

装饰器（Decorator）是一种特殊的函数，它可以用来修改其他函数的行为。装饰器的主要目的是在不改变原函数代码的情况下，为函数添加额外的功能。装饰器在Python中被广泛应用于日志记录、性能分析、权限验证等场景。

### 18.2.1 装饰器的基本概念

装饰器的基本概念很简单：它是一个函数，接受一个函数作为参数，并返回一个新的函数，这个新的函数通常会在原函数的基础上添加一些额外的功能。

在Python中，装饰器通常使用`@decorator_name`语法来应用，这种语法被称为装饰器语法糖。下面是一个简单的例子，展示了装饰器的基本概念和使用：

```python
def log_decorator(func):
    """日志装饰器
    参数:
        func: 要装饰的函数
    返回:
        装饰后的函数
    """
    def wrapper(*args, **kwargs):
        """包装函数
        参数:
            *args: 位置参数
            **kwargs: 关键字参数
        返回:
            原函数的返回值
        """
        print(f"调用函数: {func.__name__}")
        print(f"参数: {args}, {kwargs}")
        # 调用原函数
        result = func(*args, **kwargs)
        print(f"函数 {func.__name__} 返回: {result}")
        return result
    return wrapper

# 使用装饰器语法糖应用装饰器
@log_decorator
def add(a, b):
    """计算两个数的和
    参数:
        a: 第一个数
        b: 第二个数
    返回:
        两个数的和
    """
    return a + b

# 调用装饰后的函数
result = add(1, 2)
print(f"最终结果: {result}")
# 输出：
# 调用函数: add
# 参数: (1, 2), {}
# 函数 add 返回: 3
# 最终结果: 3

# 不使用装饰器语法糖，直接调用装饰器函数
def multiply(a, b):
    """计算两个数的积
    参数:
        a: 第一个数
        b: 第二个数
    返回:
        两个数的积
    """
    return a * b

# 应用装饰器
decorated_multiply = log_decorator(multiply)
# 调用装饰后的函数
result = decorated_multiply(3, 4)
print(f"最终结果: {result}")
# 输出：
# 调用函数: multiply
# 参数: (3, 4), {}
# 函数 multiply 返回: 12
# 最终结果: 12
```

在上面的例子中，我们定义了一个`log_decorator()`装饰器函数，它接受一个函数作为参数，并返回一个新的函数`wrapper()`。`wrapper()`函数在调用原函数之前和之后添加了日志记录的功能，从而在不改变原函数代码的情况下，为原函数添加了额外的功能。

我们可以使用装饰器语法糖`@log_decorator`来应用装饰器，也可以直接调用装饰器函数并传入要装饰的函数。这两种方式的效果是相同的，但装饰器语法糖更加简洁和直观。

### 18.2.2 保留原函数的元数据

当我们使用装饰器装饰一个函数时，原函数的元数据（如名称、文档字符串、参数列表等）会丢失，因为装饰器返回的是一个新的函数。为了保留原函数的元数据，我们可以使用`functools.wraps`装饰器。

`functools.wraps`装饰器是一个特殊的装饰器，它可以将原函数的元数据复制到包装函数中。下面是一个简单的例子，展示了`functools.wraps`装饰器的使用：

```python
import functools

def log_decorator(func):
    """日志装饰器
    参数:
        func: 要装饰的函数
    返回:
        装饰后的函数
    """
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        """包装函数
        参数:
            *args: 位置参数
            **kwargs: 关键字参数
        返回:
            原函数的返回值
        """
        print(f"调用函数: {func.__name__}")
        print(f"参数: {args}, {kwargs}")
        # 调用原函数
        result = func(*args, **kwargs)
        print(f"函数 {func.__name__} 返回: {result}")
        return result
    return wrapper

# 使用装饰器语法糖应用装饰器
@log_decorator
def add(a, b):
    """计算两个数的和
    参数:
        a: 第一个数
        b: 第二个数
    返回:
        两个数的和
    """
    return a + b

# 查看装饰后函数的元数据
print(f"函数名称: {add.__name__}")  # 输出：add
print(f"函数文档: {add.__doc__}")  # 输出：计算两个数的和...
```

在上面的例子中，我们使用`functools.wraps(func)`装饰器装饰了`wrapper()`函数，从而保留了原函数`add()`的元数据。如果不使用`functools.wraps`装饰器，`add.__name__`将返回`'wrapper'`，`add.__doc__`将返回`wrapper()`函数的文档字符串。

### 18.2.3 带参数的装饰器

有时候，我们需要让装饰器接受参数，以便根据不同的参数值来定制装饰器的行为。带参数的装饰器实际上是一个函数，它接受参数并返回一个装饰器函数。

下面是一个简单的例子，展示了带参数的装饰器的使用：

```python
import functools
import time

def retry_decorator(max_retries=3, delay=1):
    """重试装饰器
    参数:
        max_retries: 最大重试次数，默认为3
        delay: 重试间隔（秒），默认为1
    返回:
        装饰器函数
    """
    def decorator(func):
        """装饰器
        参数:
            func: 要装饰的函数
        返回:
            装饰后的函数
        """
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            """包装函数
            参数:
                *args: 位置参数
                **kwargs: 关键字参数
            返回:
                原函数的返回值
            """
            retries = 0
            while retries < max_retries:
                try:
                    # 调用原函数
                    return func(*args, **kwargs)
                except Exception as e:
                    retries += 1
                    if retries >= max_retries:
                        raise
                    print(f"函数 {func.__name__} 执行失败: {e}，{delay}秒后重试（{retries}/{max_retries}）")
                    time.sleep(delay)
        return wrapper
    return decorator

# 使用带参数的装饰器
@retry_decorator(max_retries=5, delay=2)
def unstable_operation():
    """不稳定的操作，可能会失败"""
    import random
    if random.random() < 0.7:
        raise ValueError("随机失败")
    return "操作成功"

# 调用装饰后的函数
# try:
#     result = unstable_operation()
#     print(f"结果: {result}")
# except ValueError as e:
#     print(f"最终失败: {e}")
```

在上面的例子中，我们定义了一个`retry_decorator()`函数，它接受两个参数`max_retries`和`delay`，并返回一个装饰器函数`decorator()`。`decorator()`函数接受一个函数作为参数，并返回一个包装函数`wrapper()`，`wrapper()`函数实现了重试逻辑。

我们可以使用`@retry_decorator(max_retries=5, delay=2)`语法来应用带参数的装饰器，这样就可以根据不同的参数值来定制装饰器的行为。

### 18.2.4 类装饰器

除了函数装饰器之外，Python还支持类装饰器，即使用类作为装饰器。类装饰器的工作原理是：当我们使用一个类来装饰一个函数时，Python会创建这个类的一个实例，并将被装饰的函数作为参数传递给类的构造函数。然后，当我们调用被装饰的函数时，Python会调用这个类实例的`__call__()`方法。

下面是一个简单的例子，展示了类装饰器的使用：

```python
import functools
import time

class TimerDecorator:
    """计时器装饰器类"""
    
    def __init__(self, func):
        """初始化TimerDecorator对象
        参数:
            func: 要装饰的函数
        """
        functools.update_wrapper(self, func)
        self.func = func
    
    def __call__(self, *args, **kwargs):
        """调用装饰后的函数
        参数:
            *args: 位置参数
            **kwargs: 关键字参数
        返回:
            原函数的返回值
        """
        start_time = time.time()
        # 调用原函数
        result = self.func(*args, **kwargs)
        end_time = time.time()
        print(f"函数 {self.func.__name__} 执行时间: {end_time - start_time:.4f}秒")
        return result

# 使用类装饰器
@TimerDecorator
def fibonacci(n):
    """计算斐波那契数列的第n项
    参数:
        n: 项数
    返回:
        斐波那契数列的第n项
    """
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# 调用装饰后的函数
result = fibonacci(10)
print(f"结果: {result}")
# 输出类似：
# 函数 fibonacci 执行时间: 0.0000秒
# 函数 fibonacci 执行时间: 0.0000秒
# ...
# 函数 fibonacci 执行时间: 0.0030秒
# 结果: 55
```

在上面的例子中，我们定义了一个`TimerDecorator`类，它实现了`__init__()`和`__call__()`方法。`__init__()`方法接受一个函数作为参数，并使用`functools.update_wrapper()`函数来保留原函数的元数据。`__call__()`方法实现了计时功能，它在调用原函数之前记录开始时间，在调用原函数之后记录结束时间，并计算执行时间。

我们可以使用`@TimerDecorator`语法来应用类装饰器，这样就可以为函数添加计时功能。

### 18.2.5 装饰器链

Python支持使用多个装饰器来装饰同一个函数，这种用法被称为装饰器链。当使用多个装饰器时，装饰器的应用顺序是从下到上的，即靠近函数定义的装饰器先应用，远离函数定义的装饰器后应用。

下面是一个简单的例子，展示了装饰器链的使用：

```python
import functools
import time

def log_decorator(func):
    """日志装饰器
    参数:
        func: 要装饰的函数
    返回:
        装饰后的函数
    """
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        """包装函数
        参数:
            *args: 位置参数
            **kwargs: 关键字参数
        返回:
            原函数的返回值
        """
        print(f"调用函数: {func.__name__}")
        print(f"参数: {args}, {kwargs}")
        # 调用原函数
        result = func(*args, **kwargs)
        print(f"函数 {func.__name__} 返回: {result}")
        return result
    return wrapper

def timer_decorator(func):
    """计时器装饰器
    参数:
        func: 要装饰的函数
    返回:
        装饰后的函数
    """
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        """包装函数
        参数:
            *args: 位置参数
            **kwargs: 关键字参数
        返回:
            原函数的返回值
        """
        start_time = time.time()
        # 调用原函数
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"函数 {func.__name__} 执行时间: {end_time - start_time:.4f}秒")
        return result
    return wrapper

# 使用装饰器链
@log_decorator
@timer_decorator
def add(a, b):
    """计算两个数的和
    参数:
        a: 第一个数
        b: 第二个数
    返回:
        两个数的和
    """
    # 模拟耗时操作
    time.sleep(0.1)
    return a + b

# 调用装饰后的函数
result = add(1, 2)
print(f"最终结果: {result}")
# 输出类似：
# 调用函数: wrapper
# 参数: (1, 2), {}
# 函数 add 执行时间: 0.1005秒
# 函数 wrapper 返回: 3
# 最终结果: 3
```

在上面的例子中，我们使用了两个装饰器`log_decorator`和`timer_decorator`来装饰同一个函数`add()`。装饰器的应用顺序是从下到上的，即先应用`timer_decorator`，然后再应用`log_decorator`。因此，当我们调用`add(1, 2)`时，实际上是调用了`log_decorator(timer_decorator(add))(1, 2)`。

### 18.2.6 装饰器的应用场景

装饰器在Python中有很多应用场景，下面是一些常见的例子：

#### 1. 日志记录

装饰器可以用来记录函数的调用信息，如函数名称、参数、返回值等，这对于调试和监控程序非常有用。

```python
import functools
import logging

# 配置日志
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def log_decorator(func):
    """日志装饰器
    参数:
        func: 要装饰的函数
    返回:
        装饰后的函数
    """
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        """包装函数
        参数:
            *args: 位置参数
            **kwargs: 关键字参数
        返回:
            原函数的返回值
        """
        logging.info(f"调用函数: {func.__name__}")
        logging.info(f"参数: {args}, {kwargs}")
        # 调用原函数
        result = func(*args, **kwargs)
        logging.info(f"函数 {func.__name__} 返回: {result}")
        return result
    return wrapper

@log_decorator
def add(a, b):
    """计算两个数的和
    参数:
        a: 第一个数
        b: 第二个数
    返回:
        两个数的和
    """
    return a + b

# 调用装饰后的函数
result = add(1, 2)
print(f"最终结果: {result}")
```

#### 2. 性能分析

装饰器可以用来分析函数的性能，如执行时间、调用次数等，这对于优化程序非常有用。

```python
import functools
import time

def performance_decorator(func):
    """性能分析装饰器
    参数:
        func: 要装饰的函数
    返回:
        装饰后的函数
    """
    # 记录调用次数
    func.calls = 0
    # 记录总执行时间
    func.total_time = 0
    
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        """包装函数
        参数:
            *args: 位置参数
            **kwargs: 关键字参数
        返回:
            原函数的返回值
        """
        # 增加调用次数
        func.calls += 1
        # 记录开始时间
        start_time = time.time()
        # 调用原函数
        result = func(*args, **kwargs)
        # 记录结束时间
        end_time = time.time()
        # 累加执行时间
        func.total_time += end_time - start_time
        # 打印性能信息
        print(f"函数 {func.__name__} 第{func.calls}次调用，执行时间: {end_time - start_time:.4f}秒，总执行时间: {func.total_time:.4f}秒")
        return result
    return wrapper

@performance_decorator
def fibonacci(n):
    """计算斐波那契数列的第n项
    参数:
        n: 项数
    返回:
        斐波那契数列的第n项
    """
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# 调用装饰后的函数
result = fibonacci(10)
print(f"结果: {result}")
```

#### 3. 权限验证

装饰器可以用来验证用户的权限，这在Web应用中非常常见。

```python
import functools

def permission_required(permission):
    """权限验证装饰器
    参数:
        permission: 所需的权限
    返回:
        装饰器函数
    """
    def decorator(func):
        """装饰器
        参数:
            func: 要装饰的函数
        返回:
            装饰后的函数
        """
        @functools.wraps(func)
        def wrapper(user, *args, **kwargs):
            """包装函数
            参数:
                user: 用户对象
                *args: 其他位置参数
                **kwargs: 其他关键字参数
            返回:
                原函数的返回值
            """
            # 检查用户是否有足够的权限
            if hasattr(user, 'permissions') and permission in user.permissions:
                # 有足够的权限，调用原函数
                return func(user, *args, **kwargs)
            else:
                # 没有足够的权限，抛出异常
                raise PermissionError(f"用户 {user.username} 没有 {permission} 权限")
        return wrapper
    return decorator

# 模拟用户类
class User:
    """用户类"""
    
    def __init__(self, username, permissions=None):
        """初始化用户对象
        参数:
            username: 用户名
            permissions: 权限列表
        """
        self.username = username
        self.permissions = permissions or []

# 使用权限验证装饰器
@permission_required('admin')
def admin_operation(user):
    """管理员操作
    参数:
        user: 用户对象
    返回:
        操作结果
    """
    return f"{user.username} 执行了管理员操作"

# 创建用户
admin_user = User('admin', ['admin'])
normal_user = User('user')

# 测试权限验证
try:
    result = admin_operation(admin_user)
    print(result)  # 输出：admin 执行了管理员操作
    result = admin_operation(normal_user)
    print(result)  # 不会执行到这里
except PermissionError as e:
    print(f"权限错误: {e}")  # 输出：权限错误: 用户 user 没有 admin 权限
```

#### 4. 缓存

装饰器可以用来缓存函数的结果，避免重复计算，这对于计算密集型的函数非常有用。

```python
import functools

def cache_decorator(func):
    """缓存装饰器
    参数:
        func: 要装饰的函数
    返回:
        装饰后的函数
    """
    # 创建缓存字典
    cache = {}
    
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        """包装函数
        参数:
            *args: 位置参数
            **kwargs: 关键字参数
        返回:
            原函数的返回值
        """
        # 创建缓存键（注意：kwargs的顺序可能会影响结果，这里简单处理）
        key = (args, frozenset(kwargs.items()))
        # 检查缓存中是否有结果
        if key not in cache:
            # 缓存中没有结果，调用原函数并缓存结果
            cache[key] = func(*args, **kwargs)
        # 返回缓存的结果
        return cache[key]
    # 添加清除缓存的方法
    wrapper.clear_cache = lambda: cache.clear()
    return wrapper

@cache_decorator
def fibonacci(n):
    """计算斐波那契数列的第n项
    参数:
        n: 项数
    返回:
        斐波那契数列的第n项
    """
    print(f"计算 fibonacci({n})")
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# 调用装饰后的函数（第一次调用，会计算所有项）
print("第一次调用:")
result = fibonacci(10)
print(f"结果: {result}")

# 调用装饰后的函数（第二次调用，会使用缓存的结果）
print("\n第二次调用:")
result = fibonacci(10)
print(f"结果: {result}")

# 清除缓存
fibonacci.clear_cache()

# 调用装饰后的函数（清除缓存后调用，会重新计算所有项）
print("\n清除缓存后调用:")
result = fibonacci(10)
print(f"结果: {result}")
```

装饰器是Python中一个强大的特性，它可以帮助我们编写更加简洁、优雅和可维护的代码，特别是在需要为函数添加额外功能时。在实际的开发中，我们应该充分利用装饰器的优势，提高代码的质量和可读性。

## 18.3 编程小贴士

1. **使用`with`语句管理资源**：在处理文件、网络连接、数据库连接等资源时，优先使用`with`语句，而不是手动调用`close()`方法，这样可以确保资源被正确释放。

2. **使用`contextlib.contextmanager`创建上下文管理器**：对于简单的上下文管理器，优先使用`contextlib.contextmanager`装饰器，而不是创建一个新的类，这样可以使代码更加简洁。

3. **使用`functools.wraps`保留原函数的元数据**：在编写装饰器时，总是使用`functools.wraps`装饰器来保留原函数的元数据，如名称、文档字符串等。

4. **避免过度使用装饰器**：装饰器虽然强大，但也会增加代码的复杂度。在使用装饰器时，应该权衡其带来的好处和增加的复杂度，避免过度使用。

5. **使用类装饰器处理复杂的装饰逻辑**：对于复杂的装饰逻辑，特别是需要维护状态的情况，优先使用类装饰器，而不是函数装饰器，这样可以使代码更加清晰和易于维护。

6. **注意装饰器的应用顺序**：当使用多个装饰器时，装饰器的应用顺序是从下到上的，即靠近函数定义的装饰器先应用，远离函数定义的装饰器后应用。

## 18.4 动手练习

### 练习1：创建一个自定义的上下文管理器类

创建一个自定义的上下文管理器类，用于管理临时文件的创建和删除。

要求：

1. 实现`__enter__()`和`__exit__()`方法。
2. 在`__enter__()`方法中创建临时文件，并返回文件对象。
3. 在`__exit__()`方法中关闭并删除临时文件。
4. 提供一个示例，展示如何使用这个上下文管理器。

### 练习2：使用装饰器实现函数执行计时

创建一个装饰器，用于记录函数的执行时间。

要求：

1. 装饰器应该接受一个函数作为参数，并返回一个新的函数。
2. 新的函数应该在调用原函数之前记录开始时间，在调用原函数之后记录结束时间，并计算执行时间。
3. 使用`functools.wraps`装饰器保留原函数的元数据。
4. 提供一个示例，展示如何使用这个装饰器。

## 18.5 挑战任务

### 任务1：实现一个事务管理上下文管理器

实现一个事务管理上下文管理器，用于管理数据库事务的开始、提交和回滚。

要求：

1. 支持事务的开始、提交和回滚操作。
2. 如果代码块执行成功，自动提交事务；如果代码块抛出异常，自动回滚事务。
3. 支持嵌套事务（可选）。
4. 提供一个示例，展示如何使用这个上下文管理器管理数据库事务。

### 任务2：实现一个API限流装饰器

实现一个API限流装饰器，用于限制API的调用频率。

要求：

1. 支持配置最大调用频率（如每分钟最多调用100次）。
2. 如果API的调用频率超过限制，应该返回错误信息或抛出异常。
3. 支持不同的限流策略（如令牌桶、漏桶等，可选）。
4. 提供一个示例，展示如何使用这个装饰器限制API的调用频率。

通过本节课的学习，我们已经掌握了Python中上下文管理器和装饰器的基本概念、使用方法和应用场景。这些概念是Python中高级编程的基础，它们可以帮助我们编写更加简洁、优雅和可维护的代码。在实际的开发中，我们应该充分利用这些概念的优势，特别是在资源管理、函数增强等场景中。
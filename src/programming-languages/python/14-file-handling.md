# 文件操作：读写外部数据

在编程过程中，我们经常需要与外部文件进行交互，例如读取配置文件、处理数据文件、保存程序输出等。Python提供了丰富的文件操作功能，使我们能够方便地进行文件的读写和管理。本节课，我们将学习Python中的文件操作，包括文件的打开、读取、写入、关闭等基本操作，以及一些高级的文件处理技术。

## 文件操作的基本概念

在Python中，文件操作主要通过内置的`open()`函数来实现。`open()`函数用于打开一个文件，并返回一个文件对象，我们可以通过这个文件对象来进行各种文件操作。

### 文件的打开模式

`open()`函数接受两个主要参数：文件路径和打开模式。打开模式指定了我们要对文件进行的操作类型，如读取、写入、追加等。下面是一些常用的文件打开模式：

| 模式 | 描述 |
|------|------|
| `'r'` | 只读模式（默认），文件必须存在 |
| `'w'` | 只写模式，如果文件存在则覆盖，不存在则创建 |
| `'a'` | 追加模式，如果文件存在则在末尾追加内容，不存在则创建 |
| `'x'` | 独占创建模式，如果文件已存在则失败 |
| `'b'` | 二进制模式，与其他模式组合使用，如`'rb'`、`'wb'`等 |
| `'t'` | 文本模式（默认），与其他模式组合使用，如`'rt'`、`'wt'`等 |
| `'+'` | 读写模式，与其他模式组合使用，如`'r+'`、`'w+'`等 |

### 文件对象的基本方法

文件对象提供了许多方法来进行文件操作，下面是一些常用的方法：

| 方法 | 描述 |
|------|------|
| `read(size=-1)` | 读取文件内容，`size`指定读取的字节数，默认读取全部内容 |
| `readline(size=-1)` | 读取一行内容，`size`指定读取的字节数，默认读取整行 |
| `readlines(hint=-1)` | 读取所有行，返回一个列表，`hint`指定读取的总字节数 |
| `write(string)` | 写入内容，返回写入的字符数 |
| `writelines(lines)` | 写入多行内容，接受一个字符串列表 |
| `tell()` | 返回当前文件指针的位置 |
| `seek(offset, whence=0)` | 移动文件指针到指定位置 |
| `flush()` | 将缓冲区的内容写入文件 |
| `close()` | 关闭文件 |

## 文件的基本操作

### 文件的打开与关闭

在Python中，我们可以使用`open()`函数来打开一个文件，并使用`close()`方法来关闭一个文件：

```python
# 打开文件
file = open("example.txt", "r")

# 进行文件操作
content = file.read()
print(content)

# 关闭文件
file.close()
```

需要注意的是，在操作完成后，我们应该始终关闭文件，以释放系统资源。如果忘记关闭文件，可能会导致资源泄漏或其他问题。

### 使用with语句自动关闭文件

为了避免忘记关闭文件，我们可以使用`with`语句来自动管理文件资源。`with`语句会在代码块执行完毕后自动关闭文件，无论代码块是正常执行完毕还是抛出异常：

```python
# 使用with语句自动关闭文件
with open("example.txt", "r") as file:
    content = file.read()
    print(content)
# 文件会在with块结束后自动关闭
```

`with`语句是Python中推荐的文件操作方式，它更加简洁、安全，可以有效避免资源泄漏问题。

### 文件的读取

Python提供了多种读取文件的方法，下面我们将详细介绍这些方法：

#### 读取全部内容

我们可以使用`read()`方法来读取文件的全部内容：

```python
# 读取全部内容
def read_entire_file(file_path):
    """读取文件的全部内容"""
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()
            return content
    except FileNotFoundError:
        print(f"错误：文件 '{file_path}' 不存在！")
        return None
    except IOError as e:
        print(f"错误：读取文件时发生IO错误: {e}")
        return None

# 测试函数
if __name__ == "__main__":
    # 假设当前目录下有一个名为example.txt的文件
    content = read_entire_file("example.txt")
    if content:
        print("文件内容:")
        print(content)
```

#### 逐行读取

对于较大的文件，一次性读取全部内容可能会占用较多内存。在这种情况下，我们可以使用`readline()`方法或直接迭代文件对象来逐行读取文件内容：

```python
# 逐行读取文件
def read_file_line_by_line(file_path):
    """逐行读取文件内容"""
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            # 使用readline()方法逐行读取
            print("使用readline()方法逐行读取:")
            line = file.readline()
            while line:
                print(line.strip())  # strip()方法用于去除换行符和空格
                line = file.readline()
        
        print("\n直接迭代文件对象逐行读取:")
        with open(file_path, "r", encoding="utf-8") as file:
            # 直接迭代文件对象
            for line in file:
                print(line.strip())
    except FileNotFoundError:
        print(f"错误：文件 '{file_path}' 不存在！")
    except IOError as e:
        print(f"错误：读取文件时发生IO错误: {e}")

# 测试函数
if __name__ == "__main__":
    read_file_line_by_line("example.txt")
```

#### 读取所有行到列表

我们可以使用`readlines()`方法来读取文件的所有行，并将它们存储在一个列表中：

```python
# 读取所有行到列表
def read_file_into_list(file_path):
    """读取文件的所有行到列表"""
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            lines = file.readlines()
            # 去除每一行的换行符和空格
            lines = [line.strip() for line in lines]
            return lines
    except FileNotFoundError:
        print(f"错误：文件 '{file_path}' 不存在！")
        return None
    except IOError as e:
        print(f"错误：读取文件时发生IO错误: {e}")
        return None

# 测试函数
if __name__ == "__main__":
    lines = read_file_into_list("example.txt")
    if lines:
        print("文件内容（列表形式）:")
        print(lines)
        print(f"文件共有 {len(lines)} 行")
        
        # 处理列表中的每一行
        print("\n处理每一行:")
        for i, line in enumerate(lines, 1):
            print(f"第{i}行: {line}")
```

### 文件的写入

我们可以使用`write()`方法或`writelines()`方法来向文件中写入内容：

#### 基本写入操作

```python
# 基本的文件写入操作
def write_to_file(file_path, content):
    """向文件中写入内容"""
    try:
        # 使用'w'模式打开文件，如果文件存在则覆盖，不存在则创建
        with open(file_path, "w", encoding="utf-8") as file:
            # 使用write()方法写入内容
            file.write(content)
        print(f"内容已成功写入文件 '{file_path}'")
    except IOError as e:
        print(f"错误：写入文件时发生IO错误: {e}")

# 测试函数
if __name__ == "__main__":
    # 要写入的内容
    content = "这是一个测试文件。\n这是第二行。\n这是第三行。"
    
    # 调用函数写入内容
    write_to_file("output.txt", content)
```

#### 追加内容

如果我们不想覆盖文件的现有内容，而是在文件末尾追加新的内容，可以使用`'a'`模式：

```python
# 向文件中追加内容
def append_to_file(file_path, content):
    """向文件末尾追加内容"""
    try:
        # 使用'a'模式打开文件，如果文件存在则追加内容，不存在则创建
        with open(file_path, "a", encoding="utf-8") as file:
            file.write(content)
        print(f"内容已成功追加到文件 '{file_path}'")
    except IOError as e:
        print(f"错误：追加内容时发生IO错误: {e}")

# 测试函数
if __name__ == "__main__":
    # 要追加的内容
    additional_content = "\n这是追加的第一行。\n这是追加的第二行。"
    
    # 调用函数追加内容
    append_to_file("output.txt", additional_content)
```

#### 写入多行

我们可以使用`writelines()`方法来写入多行内容：

```python
# 写入多行内容
def write_multiple_lines(file_path, lines):
    """向文件中写入多行内容"""
    try:
        with open(file_path, "w", encoding="utf-8") as file:
            # 如果行末没有换行符，可以添加换行符
            # 方法1：在每一行后面添加换行符
            file.write("\n".join(lines) + "\n")
            
            # 方法2：使用writelines方法（需要自行添加换行符）
            # file.writelines([line + "\n" for line in lines])
        print(f"多行内容已成功写入文件 '{file_path}'")
    except IOError as e:
        print(f"错误：写入文件时发生IO错误: {e}")

# 测试函数
if __name__ == "__main__":
    # 要写入的多行内容
    lines = [
        "第一行内容",
        "第二行内容",
        "第三行内容",
        "第四行内容"
    ]
    
    # 调用函数写入多行内容
    write_multiple_lines("multiple_lines.txt", lines)
```

### 文件指针操作

文件指针是文件中的一个位置标记，它指示了下一次读写操作将从哪个位置开始。我们可以使用`tell()`方法来获取当前文件指针的位置，使用`seek()`方法来移动文件指针：

```python
# 文件指针操作
def file_pointer_operations(file_path):
    """文件指针操作示例"""
    try:
        # 首先写入一些内容到文件
        with open(file_path, "w", encoding="utf-8") as file:
            file.write("Hello, World!\nThis is a test file.\nPython is amazing!")
        print(f"内容已成功写入文件 '{file_path}'")
        
        # 读取文件并演示文件指针操作
        with open(file_path, "r+", encoding="utf-8") as file:
            # 获取当前文件指针位置（初始为0）
            position = file.tell()
            print(f"初始文件指针位置: {position}")
            
            # 读取前5个字符
            content = file.read(5)
            print(f"读取的内容: {content}")
            
            # 获取当前文件指针位置
            position = file.tell()
            print(f"读取5个字符后的文件指针位置: {position}")
            
            # 移动文件指针到文件开头
            file.seek(0)
            position = file.tell()
            print(f"移动到文件开头后的文件指针位置: {position}")
            
            # 读取一行内容
            line = file.readline()
            print(f"读取的行: {line.strip()}")
            
            # 获取当前文件指针位置
            position = file.tell()
            print(f"读取一行后的文件指针位置: {position}")
            
            # 移动文件指针到文件末尾
            file.seek(0, 2)  # 0表示偏移量，2表示相对于文件末尾
            position = file.tell()
            print(f"移动到文件末尾后的文件指针位置: {position}")
            
            # 从文件末尾向前移动10个字符
            file.seek(-10, 2)  # -10表示向前移动10个字符，2表示相对于文件末尾
            position = file.tell()
            print(f"从文件末尾向前移动10个字符后的文件指针位置: {position}")
            
            # 读取从当前位置到文件末尾的内容
            content = file.read()
            print(f"读取的内容: {content}")
            
            # 在文件末尾追加内容
            file.seek(0, 2)  # 确保文件指针在文件末尾
            file.write("\nThis is additional content.")
            print("已在文件末尾追加内容")
    except IOError as e:
        print(f"错误：文件操作时发生IO错误: {e}")

# 测试函数
if __name__ == "__main__":
    file_pointer_operations("file_pointer.txt")
```

`seek()`方法的完整语法是`seek(offset, whence)`，其中：
- `offset`表示偏移量，即要移动的字节数
- `whence`表示参照位置，0表示相对于文件开头（默认值），1表示相对于当前位置，2表示相对于文件末尾

## 二进制文件操作

除了文本文件外，Python还支持对二进制文件进行操作，如图片、音频、视频等。操作二进制文件时，我们需要使用`'b'`模式：

```python
# 二进制文件操作
def binary_file_operations(source_path, target_path):
    """二进制文件操作示例"""
    try:
        # 读取二进制文件
        with open(source_path, "rb") as source_file:
            binary_data = source_file.read()
            print(f"成功读取二进制文件 '{source_path}'，文件大小: {len(binary_data)} 字节")
        
        # 写入二进制文件
        with open(target_path, "wb") as target_file:
            target_file.write(binary_data)
            print(f"成功写入二进制文件 '{target_path}'")
            print(f"文件大小: {len(binary_data)} 字节")
    except FileNotFoundError:
        print(f"错误：源文件 '{source_path}' 不存在！")
    except IOError as e:
        print(f"错误：二进制文件操作时发生IO错误: {e}")

# 测试函数
if __name__ == "__main__":
    # 假设当前目录下有一个名为image.jpg的图片文件
    binary_file_operations("image.jpg", "copy_image.jpg")
```

## 文件和目录管理

Python的`os`模块提供了许多用于文件和目录管理的函数。下面我们将介绍一些常用的函数：

### 查看当前目录

我们可以使用`os.getcwd()`函数来获取当前工作目录：

```python
import os

# 获取当前工作目录
def get_current_directory():
    """获取当前工作目录"""
    current_dir = os.getcwd()
    print(f"当前工作目录: {current_dir}")
    return current_dir

# 测试函数
if __name__ == "__main__":
    get_current_directory()
```

### 改变当前目录

我们可以使用`os.chdir()`函数来改变当前工作目录：

```python
import os

# 改变当前工作目录
def change_directory(path):
    """改变当前工作目录"""
    try:
        os.chdir(path)
        print(f"成功切换到目录 '{path}'")
        print(f"当前工作目录: {os.getcwd()}")
    except FileNotFoundError:
        print(f"错误：目录 '{path}' 不存在！")
    except PermissionError:
        print(f"错误：没有权限访问目录 '{path}'！")
    except OSError as e:
        print(f"错误：切换目录时发生错误: {e}")

# 测试函数
if __name__ == "__main__":
    # 切换到上一级目录
    change_directory("..")
    
    # 切换回原来的目录
    # 假设原来的目录是Python课程文件所在的目录
    # change_directory("path/to/original/directory")
```

### 创建目录

我们可以使用`os.mkdir()`函数来创建单个目录，使用`os.makedirs()`函数来创建多级目录：

```python
import os

# 创建目录
def create_directories():
    """创建目录示例"""
    try:
        # 创建单个目录
        os.mkdir("new_dir")
        print("成功创建目录 'new_dir'")
        
        # 创建多级目录
        os.makedirs("parent_dir/child_dir/grandchild_dir", exist_ok=True)  # exist_ok=True表示如果目录已存在也不会报错
        print("成功创建多级目录 'parent_dir/child_dir/grandchild_dir'")
    except FileExistsError:
        print("错误：目录已存在！")
    except PermissionError:
        print("错误：没有权限创建目录！")
    except OSError as e:
        print(f"错误：创建目录时发生错误: {e}")

# 测试函数
if __name__ == "__main__":
    create_directories()
```

### 列出目录内容

我们可以使用`os.listdir()`函数来列出目录中的文件和子目录：

```python
import os

# 列出目录内容
def list_directory_contents(path="."):
    """列出目录中的文件和子目录"""
    try:
        # 获取目录内容
        contents = os.listdir(path)
        print(f"目录 '{path}' 中的内容:")
        
        # 遍历目录内容
        for item in contents:
            # 构建完整路径
            item_path = os.path.join(path, item)
            # 判断是文件还是目录
            if os.path.isfile(item_path):
                print(f"文件: {item}")
            elif os.path.isdir(item_path):
                print(f"目录: {item}")
    except FileNotFoundError:
        print(f"错误：目录 '{path}' 不存在！")
    except PermissionError:
        print(f"错误：没有权限访问目录 '{path}'！")
    except OSError as e:
        print(f"错误：列出目录内容时发生错误: {e}")

# 测试函数
if __name__ == "__main__":
    list_directory_contents()  # 列出当前目录内容
    # list_directory_contents("some_directory")  # 列出指定目录内容
```

### 重命名和删除文件/目录

我们可以使用`os.rename()`函数来重命名文件或目录，使用`os.remove()`函数来删除文件，使用`os.rmdir()`函数来删除空目录，使用`os.rmdirs()`函数来删除多级空目录：

```python
import os
import shutil

# 重命名和删除文件/目录
def rename_and_delete():
    """重命名和删除文件/目录示例"""
    try:
        # 创建测试文件和目录
        with open("old_file.txt", "w") as f:
            f.write("This is a test file.")
        print("成功创建测试文件 'old_file.txt'")
        
        os.mkdir("old_dir")
        print("成功创建测试目录 'old_dir'")
        
        # 重命名文件
        os.rename("old_file.txt", "new_file.txt")
        print("成功将文件 'old_file.txt' 重命名为 'new_file.txt'")
        
        # 重命名目录
        os.rename("old_dir", "new_dir")
        print("成功将目录 'old_dir' 重命名为 'new_dir'")
        
        # 删除文件
        os.remove("new_file.txt")
        print("成功删除文件 'new_file.txt'")
        
        # 删除空目录
        os.rmdir("new_dir")
        print("成功删除空目录 'new_dir'")
        
        # 创建多级目录并删除
        os.makedirs("dir_to_delete/subdir1/subdir2")
        print("成功创建多级目录 'dir_to_delete/subdir1/subdir2'")
        
        # 删除多级空目录
        os.removedirs("dir_to_delete/subdir1/subdir2")
        print("成功删除多级空目录 'dir_to_delete/subdir1/subdir2'")
        
        # 注意：如果目录不为空，需要使用shutil.rmtree()函数来删除
        # 创建一个非空目录
        os.makedirs("non_empty_dir")
        with open("non_empty_dir/file.txt", "w") as f:
            f.write("This is a file in non_empty_dir.")
        print("成功创建非空目录 'non_empty_dir' 和其中的文件")
        
        # 删除非空目录
        shutil.rmtree("non_empty_dir")
        print("成功删除非空目录 'non_empty_dir'")
    except FileNotFoundError:
        print("错误：文件或目录不存在！")
    except PermissionError:
        print("错误：没有权限进行操作！")
    except OSError as e:
        print(f"错误：操作时发生错误: {e}")

# 测试函数
if __name__ == "__main__":
    rename_and_delete()
```

### 检查文件和目录是否存在

我们可以使用`os.path.exists()`函数来检查文件或目录是否存在：

```python
import os

# 检查文件和目录是否存在
def check_file_and_directory_existence():
    """检查文件和目录是否存在"""
    # 检查文件是否存在
    file_path = "example.txt"
    if os.path.exists(file_path):
        print(f"文件 '{file_path}' 存在")
        if os.path.isfile(file_path):
            print(f"'{file_path}' 是一个文件")
            # 获取文件大小
            file_size = os.path.getsize(file_path)
            print(f"文件大小: {file_size} 字节")
            # 获取文件的绝对路径
            absolute_path = os.path.abspath(file_path)
            print(f"文件的绝对路径: {absolute_path}")
            # 获取文件的最后修改时间
            import time
            modification_time = os.path.getmtime(file_path)
            print(f"文件的最后修改时间: {time.ctime(modification_time)}")
    else:
        print(f"文件 '{file_path}' 不存在")
    
    # 检查目录是否存在
    dir_path = "some_directory"
    if os.path.exists(dir_path):
        print(f"目录 '{dir_path}' 存在")
        if os.path.isdir(dir_path):
            print(f"'{dir_path}' 是一个目录")
            # 获取目录的绝对路径
            absolute_path = os.path.abspath(dir_path)
            print(f"目录的绝对路径: {absolute_path}")
    else:
        print(f"目录 '{dir_path}' 不存在")

# 测试函数
if __name__ == "__main__":
    check_file_and_directory_existence()
```

### 文件路径操作

Python的`os.path`模块提供了许多用于处理文件路径的函数：

```python
import os

# 文件路径操作
def file_path_operations():
    """文件路径操作示例"""
    # 拼接路径
    path1 = "directory"
    path2 = "subdirectory"
    path3 = "file.txt"
    full_path = os.path.join(path1, path2, path3)
    print(f"拼接后的路径: {full_path}")
    
    # 分离目录和文件名
    dir_name, file_name = os.path.split(full_path)
    print(f"目录名: {dir_name}")
    print(f"文件名: {file_name}")
    
    # 分离文件名和扩展名
    base_name, extension = os.path.splitext(file_name)
    print(f"基础文件名: {base_name}")
    print(f"扩展名: {extension}")
    
    # 获取目录名
    dir_path = os.path.dirname(full_path)
    print(f"目录路径: {dir_path}")
    
    # 获取文件名
    file_name = os.path.basename(full_path)
    print(f"文件名: {file_name}")
    
    # 获取绝对路径
    absolute_path = os.path.abspath(full_path)
    print(f"绝对路径: {absolute_path}")
    
    # 获取规范化的路径
    normalized_path = os.path.normpath("directory/../directory/subdirectory/./file.txt")
    print(f"规范化的路径: {normalized_path}")
    
    # 检查路径是否是绝对路径
    is_absolute = os.path.isabs(full_path)
    print(f"'{full_path}' 是绝对路径: {is_absolute}")
    
    # 计算两个路径之间的相对路径
    try:
        # 假设当前工作目录包含'directory'目录
        relative_path = os.path.relpath(full_path)
        print(f"相对路径: {relative_path}")
    except ValueError as e:
        print(f"计算相对路径时发生错误: {e}")

# 测试函数
if __name__ == "__main__":
    file_path_operations()
```

## 高级文件操作

### 文件复制和移动

Python的`shutil`模块提供了用于文件复制和移动的函数：

```python
import shutil
import os

# 文件复制和移动
def copy_and_move_files():
    """文件复制和移动示例"""
    try:
        # 首先创建一个测试文件
        with open("source.txt", "w") as f:
            f.write("This is a test file for copying and moving.")
        print("成功创建测试文件 'source.txt'")
        
        # 复制文件
        shutil.copy("source.txt", "copy.txt")
        print("成功将文件 'source.txt' 复制为 'copy.txt'")
        
        # 复制文件及其元数据
        shutil.copy2("source.txt", "copy_with_metadata.txt")
        print("成功将文件 'source.txt' 及其元数据复制为 'copy_with_metadata.txt'")
        
        # 创建目标目录
        os.makedirs("destination_dir", exist_ok=True)
        print("成功创建目标目录 'destination_dir'")
        
        # 复制文件到目录
        shutil.copy("source.txt", "destination_dir/")
        print("成功将文件 'source.txt' 复制到目录 'destination_dir'")
        
        # 移动文件
        shutil.move("source.txt", "moved.txt")
        print("成功将文件 'source.txt' 移动并重命名为 'moved.txt'")
        
        # 移动文件到目录
        shutil.move("moved.txt", "destination_dir/")
        print("成功将文件 'moved.txt' 移动到目录 'destination_dir'")
        
        # 复制目录
        shutil.copytree("destination_dir", "copied_dir")
        print("成功复制目录 'destination_dir' 到 'copied_dir'")
        
        # 移动目录
        shutil.move("copied_dir", "moved_dir")
        print("成功移动目录 'copied_dir' 到 'moved_dir'")
        
        # 删除目录（包括其中的所有文件和子目录）
        shutil.rmtree("destination_dir")
        shutil.rmtree("moved_dir")
        print("成功删除目录 'destination_dir' 和 'moved_dir'")
        
        # 删除剩余的文件
        os.remove("copy.txt")
        os.remove("copy_with_metadata.txt")
        print("成功删除剩余的文件")
    except FileNotFoundError:
        print("错误：文件或目录不存在！")
    except PermissionError:
        print("错误：没有权限进行操作！")
    except shutil.Error as e:
        print(f"错误：shutil操作时发生错误: {e}")
    except OSError as e:
        print(f"错误：操作系统错误: {e}")

# 测试函数
if __name__ == "__main__":
    copy_and_move_files()
```

### 读取大文件

对于特别大的文件，一次性读取全部内容可能会导致内存不足。在这种情况下，我们可以分块读取文件：

```python
# 分块读取大文件
def read_large_file(file_path, block_size=4096):
    """分块读取大文件
    参数:
        file_path: 文件路径
        block_size: 每块的大小（字节），默认4096字节（4KB）
    返回:
        生成器，每次产生一块数据
    """
    try:
        with open(file_path, "rb") as file:
            while True:
                # 读取一块数据
                block = file.read(block_size)
                if not block:
                    # 如果读取到文件末尾，退出循环
                    break
                yield block
    except FileNotFoundError:
        print(f"错误：文件 '{file_path}' 不存在！")
        yield from []  # 返回空生成器
    except IOError as e:
        print(f"错误：读取文件时发生IO错误: {e}")
        yield from []  # 返回空生成器

# 使用分块读取处理大文件
def process_large_file(file_path):
    """处理大文件示例"""
    # 统计文件的总大小
    try:
        file_size = os.path.getsize(file_path)
        print(f"文件大小: {file_size} 字节")
        
        # 分块读取并处理文件
        processed_bytes = 0
        for block in read_large_file(file_path):
            # 这里是处理逻辑，例如统计特定内容的出现次数
            # 为了演示，我们只打印处理的进度
            processed_bytes += len(block)
            progress = (processed_bytes / file_size) * 100
            print(f"处理进度: {progress:.2f}%")
            
            # 实际应用中，这里可以进行各种处理，例如：
            # 1. 搜索特定的字节序列
            # 2. 解析文件格式
            # 3. 转换文件编码
            # 4. 等等
        
        print("文件处理完成！")
    except FileNotFoundError:
        print(f"错误：文件 '{file_path}' 不存在！")
    except OSError as e:
        print(f"错误：获取文件大小时发生错误: {e}")

# 测试函数
if __name__ == "__main__":
    # 假设当前目录下有一个名为large_file.dat的大文件
    # process_large_file("large_file.dat")
    
    # 为了演示，我们可以创建一个小文件来测试
    with open("test_large_file.txt", "w") as f:
        for i in range(10000):
            f.write(f"这是第{i+1}行测试数据。\n")
    print("成功创建测试文件 'test_large_file.txt'")
    
    # 处理测试文件
    process_large_file("test_large_file.txt")
    
    # 删除测试文件
    os.remove("test_large_file.txt")
    print("成功删除测试文件")
```

### CSV文件处理

CSV（逗号分隔值）是一种常见的文件格式，用于存储表格数据。Python的`csv`模块提供了用于读写CSV文件的功能：

```python
import csv
import os

# CSV文件处理
def csv_file_operations():
    """CSV文件操作示例"""
    # 定义CSV文件的路径
    csv_file_path = "example.csv"
    
    try:
        # 写入CSV文件
        with open(csv_file_path, "w", newline="", encoding="utf-8") as csvfile:
            # 创建CSV写入器
            writer = csv.writer(csvfile)
            
            # 写入表头
            writer.writerow(["姓名", "年龄", "城市", "职业"])
            
            # 写入数据行
            writer.writerow(["张三", 28, "北京", "工程师"])
            writer.writerow(["李四", 32, "上海", "设计师"])
            writer.writerow(["王五", 45, "广州", "经理"])
            writer.writerow(["赵六", 36, "深圳", "产品经理"])
        print(f"成功写入CSV文件 '{csv_file_path}'")
        
        # 读取CSV文件
        print("\n读取CSV文件内容:")
        with open(csv_file_path, "r", encoding="utf-8") as csvfile:
            # 创建CSV读取器
            reader = csv.reader(csvfile)
            
            # 读取并打印每一行
            for row in reader:
                print(row)
        
        # 使用字典方式读写CSV文件
        print("\n使用字典方式读写CSV文件:")
        
        # 定义字段名
        fieldnames = ["姓名", "年龄", "城市", "职业"]
        
        # 写入CSV文件（字典方式）
        with open(csv_file_path, "w", newline="", encoding="utf-8") as csvfile:
            # 创建DictWriter对象
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            
            # 写入表头
            writer.writeheader()
            
            # 写入数据行
            writer.writerow({"姓名": "张三", "年龄": 28, "城市": "北京", "职业": "工程师"})
            writer.writerow({"姓名": "李四", "年龄": 32, "城市": "上海", "职业": "设计师"})
            writer.writerow({"姓名": "王五", "年龄": 45, "城市": "广州", "职业": "经理"})
            writer.writerow({"姓名": "赵六", "年龄": 36, "城市": "深圳", "职业": "产品经理"})
        print(f"成功使用字典方式写入CSV文件 '{csv_file_path}'")
        
        # 读取CSV文件（字典方式）
        print("\n使用字典方式读取CSV文件内容:")
        with open(csv_file_path, "r", encoding="utf-8") as csvfile:
            # 创建DictReader对象
            reader = csv.DictReader(csvfile)
            
            # 读取并打印每一行
            for row in reader:
                print(f"姓名: {row['姓名']}, 年龄: {row['年龄']}, 城市: {row['城市']}, 职业: {row['职业']}")
    except IOError as e:
        print(f"错误：CSV文件操作时发生IO错误: {e}")
    except csv.Error as e:
        print(f"错误：CSV文件格式错误: {e}")
    finally:
        # 清理测试文件
        if os.path.exists(csv_file_path):
            os.remove(csv_file_path)
            print(f"成功删除测试文件 '{csv_file_path}'")

# 测试函数
if __name__ == "__main__":
    csv_file_operations()
```

### JSON文件处理

JSON（JavaScript Object Notation）是一种轻量级的数据交换格式，广泛用于Web应用程序中。Python的`json`模块提供了用于读写JSON文件的功能：

```python
import json
import os

# JSON文件处理
def json_file_operations():
    """JSON文件操作示例"""
    # 定义JSON文件的路径
    json_file_path = "example.json"
    
    try:
        # 定义要写入JSON文件的数据
        data = {
            "name": "张三",
            "age": 28,
            "city": "北京",
            "is_student": False,
            "hobbies": ["读书", "编程", "旅行"],
            "education": {
                "bachelor": "北京大学",
                "major": "计算机科学",
                "year": 2015
            },
            "skills": [
                {"name": "Python", "level": "精通"},
                {"name": "Java", "level": "熟练"},
                {"name": "JavaScript", "level": "熟悉"}
            ]
        }
        
        # 写入JSON文件
        with open(json_file_path, "w", encoding="utf-8") as jsonfile:
            # 使用json.dump()函数将Python对象转换为JSON字符串并写入文件
            # indent参数指定缩进空格数，使输出的JSON格式更易读
            json.dump(data, jsonfile, ensure_ascii=False, indent=4)
        print(f"成功写入JSON文件 '{json_file_path}'")
        
        # 读取JSON文件
        print("\n读取JSON文件内容:")
        with open(json_file_path, "r", encoding="utf-8") as jsonfile:
            # 使用json.load()函数从文件中读取JSON字符串并转换为Python对象
            loaded_data = json.load(jsonfile)
            
            # 打印读取的数据
            print("原始数据类型:", type(loaded_data))
            print("姓名:", loaded_data["name"])
            print("年龄:", loaded_data["age"])
            print("爱好:", ", ".join(loaded_data["hobbies"]))
            print("教育背景:", loaded_data["education"]["bachelor"], loaded_data["education"]["major"])
            print("技能:")
            for skill in loaded_data["skills"]:
                print(f"  - {skill['name']}: {skill['level']}")
        
        # 使用json.dumps()和json.loads()进行JSON字符串和Python对象之间的转换
        print("\nJSON字符串和Python对象之间的转换:")
        
        # 将Python对象转换为JSON字符串
        json_string = json.dumps(data, ensure_ascii=False, indent=4)
        print("Python对象转换为JSON字符串:")
        print(json_string)
        print("类型:", type(json_string))
        
        # 将JSON字符串转换为Python对象
        python_object = json.loads(json_string)
        print("\nJSON字符串转换为Python对象:")
        print("类型:", type(python_object))
        print("姓名:", python_object["name"])
    except IOError as e:
        print(f"错误：JSON文件操作时发生IO错误: {e}")
    except json.JSONDecodeError as e:
        print(f"错误：JSON文件格式错误: {e}")
    finally:
        # 清理测试文件
        if os.path.exists(json_file_path):
            os.remove(json_file_path)
            print(f"成功删除测试文件 '{json_file_path}'")

# 测试函数
if __name__ == "__main__":
    json_file_operations()
```

## 文件编码

在处理文本文件时，编码是一个重要的概念。编码决定了如何将字符转换为字节。Python默认使用UTF-8编码，但在处理不同编码的文件时，我们需要明确指定编码方式：

```python
# 文件编码示例
def file_encoding_example():
    """文件编码示例"""
    # 定义文件路径
    utf8_file = "utf8_file.txt"
    gbk_file = "gbk_file.txt"
    
    try:
        # 写入UTF-8编码的文件
        with open(utf8_file, "w", encoding="utf-8") as file:
            file.write("这是一个UTF-8编码的文件。\nPython是一门很棒的编程语言！")
        print(f"成功写入UTF-8编码的文件 '{utf8_file}'")
        
        # 读取UTF-8编码的文件
        with open(utf8_file, "r", encoding="utf-8") as file:
            content = file.read()
            print(f"\n读取UTF-8编码的文件内容:")
            print(content)
        
        # 写入GBK编码的文件
        with open(gbk_file, "w", encoding="gbk") as file:
            file.write("这是一个GBK编码的文件。\nPython支持多种编码方式！")
        print(f"成功写入GBK编码的文件 '{gbk_file}'")
        
        # 读取GBK编码的文件
        with open(gbk_file, "r", encoding="gbk") as file:
            content = file.read()
            print(f"\n读取GBK编码的文件内容:")
            print(content)
        
        # 演示编码错误
        print("\n演示编码错误（使用错误的编码读取文件）:")
        try:
            with open(gbk_file, "r", encoding="utf-8") as file:
                content = file.read()
                print(content)
        except UnicodeDecodeError as e:
            print(f"捕获到Unicode解码错误: {e}")
        
        # 处理未知编码的文件
        print("\n处理未知编码的文件:")
        # 我们可以尝试不同的编码，或者使用chardet库来检测文件编码
        # 注意：chardet库不是Python标准库，需要安装: pip install chardet
        try:
            import chardet
            
            # 读取文件的前几个字节来检测编码
            with open(gbk_file, "rb") as file:
                raw_data = file.read(1000)  # 读取前1000个字节
                result = chardet.detect(raw_data)
                encoding = result["encoding"]
                confidence = result["confidence"]
                print(f"检测到的编码: {encoding} (置信度: {confidence:.2f})")
                
                # 使用检测到的编码读取文件
                file.seek(0)  # 回到文件开头
                content = file.read().decode(encoding)
                print(f"使用检测到的编码读取文件内容:")
                print(content)
        except ImportError:
            print("错误：chardet库未安装，请使用 'pip install chardet' 命令安装")
    except IOError as e:
        print(f"错误：文件操作时发生IO错误: {e}")
    except UnicodeDecodeError as e:
        print(f"错误：Unicode解码错误: {e}")
    except UnicodeEncodeError as e:
        print(f"错误：Unicode编码错误: {e}")
    finally:
        # 清理测试文件
        for file_path in [utf8_file, gbk_file]:
            if os.path.exists(file_path):
                os.remove(file_path)
                print(f"成功删除测试文件 '{file_path}'")

# 测试函数
if __name__ == "__main__":
    file_encoding_example()
```

## 编程小贴士

1. **始终关闭文件**：在操作完文件后，应该始终关闭文件，以释放系统资源。最好使用`with`语句，它会自动关闭文件。

2. **指定文件编码**：在处理文本文件时，应该明确指定文件编码，以避免出现编码错误。通常推荐使用UTF-8编码。

3. **处理文件操作异常**：在进行文件操作时，应该捕获并处理可能出现的异常，如`FileNotFoundError`、`PermissionError`、`IOError`等。

4. **使用`os.path`处理路径**：使用`os.path`模块中的函数来处理文件路径，而不是手动拼接路径字符串，这样可以确保代码在不同操作系统上的兼容性。

5. **使用`shutil`模块进行高级操作**：对于文件复制、移动、目录复制等高级操作，可以使用`shutil`模块，它提供了更便捷的函数。

6. **分块处理大文件**：对于特别大的文件，应该分块读取和处理，以避免占用过多内存。

7. **使用上下文管理器**：使用Python的上下文管理器（`with`语句）来管理文件资源，它可以确保资源被正确释放，无论代码是否抛出异常。

8. **注意文件权限**：在进行文件操作时，要注意文件的权限问题，确保程序有足够的权限来读取或写入文件。

9. **使用标准库处理特定格式的文件**：对于CSV、JSON等特定格式的文件，可以使用Python的标准库（如`csv`、`json`模块）来处理，这些库提供了专门的函数来简化操作。

10. **备份重要文件**：在对重要文件进行修改或删除操作之前，最好先进行备份，以防止意外情况导致数据丢失。

## 动手练习

1. 编写一个函数，统计文本文件中的行数、单词数和字符数。

2. 编写一个程序，将一个文本文件的内容复制到另一个文件中，保持原文件的格式。

3. 编写一个程序，读取一个CSV文件，计算其中数值列的总和、平均值等统计信息，并将结果保存到另一个CSV文件中。

4. 编写一个程序，读取一个JSON文件，修改其中的某些数据，然后将修改后的数据写回到原文件中。

5. 编写一个程序，遍历指定目录及其子目录中的所有文件，找出所有扩展名为`.txt`的文件，并统计它们的总大小。

## 挑战任务

### 任务1：实现一个简单的文件管理器

编写一个程序，实现一个简单的文件管理器，具有以下功能：

1. 显示当前目录下的文件和子目录
2. 创建新目录
3. 创建新文件
4. 复制文件
5. 移动文件
6. 删除文件和目录
7. 查找文件（根据文件名或内容）
8. 批量重命名文件

要求：

- 提供命令行界面，用户可以通过输入命令来执行不同的操作
- 实现错误处理，确保程序在遇到错误时能够优雅地退出或给出提示
- 确保文件操作的安全性，例如在删除文件前要求用户确认
- 支持递归操作，例如递归复制或删除目录

下面是一个简单的实现示例：

```python
import os
import shutil
import glob
import re

class SimpleFileManager:
    """简单的文件管理器类"""
    
    def __init__(self):
        """初始化文件管理器"""
        self.current_directory = os.getcwd()
        print(f"欢迎使用简单文件管理器！")
        print(f"当前工作目录: {self.current_directory}")
    
    def display_help(self):
        """显示帮助信息"""
        print("\n可用命令:")
        print("ls             - 列出当前目录下的文件和子目录")
        print("cd <目录路径>  - 切换到指定目录")
        print("mkdir <目录名> - 创建新目录")
        print("touch <文件名> - 创建新文件")
        print("cp <源文件> <目标文件> - 复制文件")
        print("mv <源文件> <目标文件> - 移动文件")
        print("rm <文件/目录> - 删除文件或目录")
        print("find <文件名>  - 查找文件")
        print("search <内容>  - 在文件中搜索内容")
        print("rename <模式> <替换> - 批量重命名文件")
        print("help           - 显示帮助信息")
        print("exit           - 退出文件管理器")
    
    def list_directory(self):
        """列出当前目录下的文件和子目录"""
        try:
            contents = os.listdir(self.current_directory)
            print(f"\n目录 '{self.current_directory}' 中的内容:")
            
            # 先显示目录，再显示文件
            directories = []
            files = []
            
            for item in contents:
                item_path = os.path.join(self.current_directory, item)
                if os.path.isdir(item_path):
                    directories.append(item)
                else:
                    files.append(item)
            
            # 显示目录
            if directories:
                print("\n目录:")
                for dir_name in sorted(directories):
                    print(f"  [DIR] {dir_name}")
            
            # 显示文件
            if files:
                print("\n文件:")
                for file_name in sorted(files):
                    file_path = os.path.join(self.current_directory, file_name)
                    file_size = os.path.getsize(file_path)
                    print(f"  {file_name} ({file_size} 字节)")
            
            if not directories and not files:
                print("  目录为空")
        except PermissionError:
            print("错误：没有权限访问当前目录！")
        except OSError as e:
            print(f"错误：列出目录内容时发生错误: {e}")
    
    def change_directory(self, path):
        """切换到指定目录"""
        try:
            # 处理相对路径
            if not os.path.isabs(path):
                path = os.path.join(self.current_directory, path)
            
            # 规范化路径
            path = os.path.normpath(path)
            
            # 切换目录
            os.chdir(path)
            self.current_directory = os.getcwd()
            print(f"成功切换到目录 '{self.current_directory}'")
        except FileNotFoundError:
            print(f"错误：目录 '{path}' 不存在！")
        except PermissionError:
            print(f"错误：没有权限访问目录 '{path}'！")
        except OSError as e:
            print(f"错误：切换目录时发生错误: {e}")
    
    def create_directory(self, dir_name):
        """创建新目录"""
        try:
            # 构建完整的目录路径
            dir_path = os.path.join(self.current_directory, dir_name)
            
            # 创建目录
            os.makedirs(dir_path, exist_ok=True)
            print(f"成功创建目录 '{dir_path}'")
        except PermissionError:
            print(f"错误：没有权限创建目录 '{dir_name}'！")
        except OSError as e:
            print(f"错误：创建目录时发生错误: {e}")
    
    def create_file(self, file_name):
        """创建新文件"""
        try:
            # 构建完整的文件路径
            file_path = os.path.join(self.current_directory, file_name)
            
            # 检查文件是否已存在
            if os.path.exists(file_path):
                response = input(f"文件 '{file_name}' 已存在，是否覆盖？(y/n): ")
                if response.lower() != 'y':
                    print("操作已取消")
                    return
            
            # 创建文件
            with open(file_path, "w") as f:
                pass  # 创建空文件
            print(f"成功创建文件 '{file_path}'")
        except PermissionError:
            print(f"错误：没有权限创建文件 '{file_name}'！")
        except OSError as e:
            print(f"错误：创建文件时发生错误: {e}")
    
    def copy_file(self, source, destination):
        """复制文件"""
        try:
            # 构建完整的路径
            source_path = os.path.join(self.current_directory, source)
            destination_path = os.path.join(self.current_directory, destination)
            
            # 检查源文件是否存在
            if not os.path.exists(source_path):
                print(f"错误：源文件 '{source}' 不存在！")
                return
            
            # 检查源文件是否是文件
            if not os.path.isfile(source_path):
                print(f"错误：'{source}' 不是一个文件！")
                return
            
            # 检查目标是否是目录
            if os.path.isdir(destination_path):
                # 如果目标是目录，则使用源文件的文件名
                destination_path = os.path.join(destination_path, os.path.basename(source_path))
            
            # 检查目标文件是否已存在
            if os.path.exists(destination_path):
                response = input(f"文件 '{destination}' 已存在，是否覆盖？(y/n): ")
                if response.lower() != 'y':
                    print("操作已取消")
                    return
            
            # 复制文件
            shutil.copy2(source_path, destination_path)  # copy2会保留文件的元数据
            print(f"成功将文件 '{source}' 复制到 '{destination}'")
        except PermissionError:
            print("错误：没有权限进行复制操作！")
        except shutil.Error as e:
            print(f"错误：复制文件时发生错误: {e}")
        except OSError as e:
            print(f"错误：复制文件时发生操作系统错误: {e}")
    
    def move_file(self, source, destination):
        """移动文件"""
        try:
            # 构建完整的路径
            source_path = os.path.join(self.current_directory, source)
            destination_path = os.path.join(self.current_directory, destination)
            
            # 检查源文件是否存在
            if not os.path.exists(source_path):
                print(f"错误：源文件 '{source}' 不存在！")
                return
            
            # 检查源文件是否是文件
            if not os.path.isfile(source_path):
                print(f"错误：'{source}' 不是一个文件！")
                return
            
            # 检查目标是否是目录
            if os.path.isdir(destination_path):
                # 如果目标是目录，则使用源文件的文件名
                destination_path = os.path.join(destination_path, os.path.basename(source_path))
            
            # 检查目标文件是否已存在
            if os.path.exists(destination_path):
                response = input(f"文件 '{destination}' 已存在，是否覆盖？(y/n): ")
                if response.lower() != 'y':
                    print("操作已取消")
                    return
            
            # 移动文件
            shutil.move(source_path, destination_path)
            print(f"成功将文件 '{source}' 移动到 '{destination}'")
        except PermissionError:
            print("错误：没有权限进行移动操作！")
        except shutil.Error as e:
            print(f"错误：移动文件时发生错误: {e}")
        except OSError as e:
            print(f"错误：移动文件时发生操作系统错误: {e}")
    
    def delete_file_or_directory(self, path):
        """删除文件或目录"""
        try:
            # 构建完整的路径
            full_path = os.path.join(self.current_directory, path)
            
            # 检查路径是否存在
            if not os.path.exists(full_path):
                print(f"错误：'{path}' 不存在！")
                return
            
            # 确认删除操作
            if os.path.isdir(full_path):
                response = input(f"确定要删除目录 '{path}' 及其所有内容吗？(y/n): ")
            else:
                response = input(f"确定要删除文件 '{path}' 吗？(y/n): ")
            
            if response.lower() != 'y':
                print("操作已取消")
                return
            
            # 删除文件或目录
            if os.path.isfile(full_path):
                os.remove(full_path)
                print(f"成功删除文件 '{path}'")
            else:
                shutil.rmtree(full_path)
                print(f"成功删除目录 '{path}' 及其所有内容")
        except PermissionError:
            print("错误：没有权限进行删除操作！")
        except OSError as e:
            print(f"错误：删除时发生操作系统错误: {e}")
    
    def find_file(self, file_name):
        """查找文件"""
        try:
            print(f"\n查找文件 '{file_name}' 的结果:")
            found = False
            
            # 遍历当前目录及其子目录
            for root, dirs, files in os.walk(self.current_directory):
                if file_name in files:
                    file_path = os.path.join(root, file_name)
                    print(f"找到: {file_path}")
                    found = True
            
            if not found:
                print(f"未找到文件 '{file_name}'")
        except PermissionError:
            print("警告：没有权限访问某些目录，搜索可能不完整")
        except OSError as e:
            print(f"错误：搜索文件时发生错误: {e}")
    
    def search_content(self, search_string):
        """在文件中搜索内容"""
        try:
            print(f"\n搜索内容 '{search_string}' 的结果:")
            found = False
            
            # 遍历当前目录及其子目录中的所有文本文件
            for root, dirs, files in os.walk(self.current_directory):
                for file in files:
                    # 只处理文本文件（这里简化处理，实际应用中可能需要更复杂的判断）
                    if file.endswith((".txt", ".py", ".md", ".csv", ".json")):
                        file_path = os.path.join(root, file)
                        try:
                            with open(file_path, "r", encoding="utf-8") as f:
                                line_number = 0
                                for line in f:
                                    line_number += 1
                                    if search_string in line:
                                        print(f"在文件 '{file_path}' 的第{line_number}行找到: {line.strip()}")
                                        found = True
                        except UnicodeDecodeError:
                            # 如果文件不是UTF-8编码，跳过
                            continue
                        except PermissionError:
                            # 如果没有权限读取文件，跳过
                            continue
            
            if not found:
                print(f"未找到包含内容 '{search_string}' 的文件")
        except OSError as e:
            print(f"错误：搜索内容时发生错误: {e}")
    
    def batch_rename(self, pattern, replacement):
        """批量重命名文件"""
        try:
            # 编译正则表达式模式
            regex = re.compile(pattern)
            
            # 获取当前目录下的所有文件
            files = [f for f in os.listdir(self.current_directory) if os.path.isfile(os.path.join(self.current_directory, f))]
            
            # 找出匹配的文件
            matched_files = [f for f in files if regex.search(f)]
            
            if not matched_files:
                print(f"未找到匹配模式 '{pattern}' 的文件")
                return
            
            # 显示匹配的文件
            print(f"\n找到 {len(matched_files)} 个匹配的文件:")
            for file in matched_files:
                new_name = regex.sub(replacement, file)
                print(f"  {file} -> {new_name}")
            
            # 确认重命名操作
            response = input("确定要执行这些重命名操作吗？(y/n): ")
            if response.lower() != 'y':
                print("操作已取消")
                return
            
            # 执行重命名操作
            renamed_count = 0
            for file in matched_files:
                try:
                    new_name = regex.sub(replacement, file)
                    old_path = os.path.join(self.current_directory, file)
                    new_path = os.path.join(self.current_directory, new_name)
                    
                    # 检查新文件名是否已存在
                    if os.path.exists(new_path):
                        print(f"跳过 '{file}': 新文件名 '{new_name}' 已存在")
                        continue
                    
                    os.rename(old_path, new_path)
                    renamed_count += 1
                except OSError as e:
                    print(f"重命名 '{file}' 时发生错误: {e}")
            
            print(f"成功重命名 {renamed_count} 个文件")
        except re.error as e:
            print(f"错误：正则表达式模式 '{pattern}' 无效: {e}")
        except OSError as e:
            print(f"错误：批量重命名时发生错误: {e}")
    
    def run(self):
        """运行文件管理器"""
        # 显示帮助信息
        self.display_help()
        
        # 主循环
        while True:
            try:
                # 获取用户输入的命令
                command = input(f"\n{self.current_directory} > ").strip()
                
                # 处理退出命令
                if command.lower() in ['exit', 'quit', 'q']:
                    print("谢谢使用，再见！")
                    break
                
                # 分割命令和参数
                parts = command.split()
                if not parts:
                    continue
                
                cmd = parts[0].lower()
                args = parts[1:]
                
                # 处理各种命令
                if cmd == 'help':
                    self.display_help()
                elif cmd == 'ls':
                    self.list_directory()
                elif cmd == 'cd' and args:
                    self.change_directory(args[0])
                elif cmd == 'mkdir' and args:
                    self.create_directory(args[0])
                elif cmd == 'touch' and args:
                    self.create_file(args[0])
                elif cmd == 'cp' and len(args) >= 2:
                    self.copy_file(args[0], args[1])
                elif cmd == 'mv' and len(args) >= 2:
                    self.move_file(args[0], args[1])
                elif cmd == 'rm' and args:
                    self.delete_file_or_directory(args[0])
                elif cmd == 'find' and args:
                    self.find_file(args[0])
                elif cmd == 'search' and args:
                    self.search_content(' '.join(args))
                elif cmd == 'rename' and len(args) >= 2:
                    self.batch_rename(args[0], args[1])
                else:
                    print(f"未知命令: {cmd}")
                    print("输入 'help' 查看可用命令")
            except KeyboardInterrupt:
                print("\n操作已取消")
            except Exception as e:
                print(f"发生未知错误: {e}")

# 运行文件管理器
if __name__ == "__main__":
    file_manager = SimpleFileManager()
    file_manager.run()
```

在这个示例中，我们实现了一个简单的文件管理器，它提供了以下功能：

1. 列出当前目录下的文件和子目录（`ls`命令）
2. 切换到指定目录（`cd`命令）
3. 创建新目录（`mkdir`命令）
4. 创建新文件（`touch`命令）
5. 复制文件（`cp`命令）
6. 移动文件（`mv`命令）
7. 删除文件或目录（`rm`命令）
8. 查找文件（`find`命令）
9. 在文件中搜索内容（`search`命令）
10. 批量重命名文件（`rename`命令）

程序使用面向对象的方式实现，每个功能都被封装在一个方法中，使代码结构清晰、易于维护和扩展。同时，程序还实现了错误处理，确保在遇到错误时能够优雅地退出或给出提示。

将继续学习Python中的面向对象编程，这是Python编程中的一个重要概念。

### 任务2：实现一个简单的日志系统

编写一个程序，实现一个简单的日志系统，具有以下功能：

1. 将日志信息写入到文件中
2. 支持不同级别的日志（如INFO、WARNING、ERROR等）
3. 支持不同的日志格式（如包含时间戳、日志级别、日志内容等）
4. 支持日志文件的轮转（如按大小轮转、按日期轮转等）
5. 支持同时将日志输出到控制台和文件

要求：

- 提供简洁的API，让用户可以方便地记录日志
- 实现灵活的配置选项，让用户可以根据需要自定义日志行为
- 确保日志系统的性能和可靠性
- 支持Unicode字符，以适应国际化需求

下面是一个简单的实现示例：

```python
import os
import sys
import time
import traceback
from datetime import datetime

class Logger:
    """简单的日志系统类"""
    
    # 定义日志级别
    DEBUG = 1
    INFO = 2
    WARNING = 3
    ERROR = 4
    CRITICAL = 5
    
    # 日志级别映射到字符串
    LEVEL_STR = {
        DEBUG: "DEBUG",
        INFO: "INFO",
        WARNING: "WARNING",
        ERROR: "ERROR",
        CRITICAL: "CRITICAL"
    }
    
    def __init__(self,
                 log_file="app.log",
                 level=INFO,
                 log_format="%(asctime)s - %(levelname)s - %(message)s",
                 date_format="%Y-%m-%d %H:%M:%S",
                 max_size=10*1024*1024,  # 10MB
                 backup_count=5,
                 console_output=True):
        """初始化日志系统
        参数:
            log_file: 日志文件路径
            level: 日志级别
            log_format: 日志格式
            date_format: 日期格式
            max_size: 日志文件的最大大小（字节），超过这个大小将进行轮转
            backup_count: 保留的备份文件数量
            console_output: 是否同时输出到控制台
        """
        self.log_file = log_file
        self.level = level
        self.log_format = log_format
        self.date_format = date_format
        self.max_size = max_size
        self.backup_count = backup_count
        self.console_output = console_output
        
        # 确保日志文件所在的目录存在
        log_dir = os.path.dirname(log_file)
        if log_dir and not os.path.exists(log_dir):
            try:
                os.makedirs(log_dir)
            except OSError as e:
                sys.stderr.write(f"无法创建日志目录 '{log_dir}': {e}\n")
    
    def _format_message(self, level, message):
        """格式化日志消息"""
        now = datetime.now().strftime(self.date_format)
        levelname = self.LEVEL_STR.get(level, "UNKNOWN")
        
        # 替换日志格式中的占位符
        formatted_message = self.log_format
        formatted_message = formatted_message.replace("%(asctime)s", now)
        formatted_message = formatted_message.replace("%(levelname)s", levelname)
        formatted_message = formatted_message.replace("%(message)s", str(message))
        
        return formatted_message
    
    def _check_rotate(self):
        """检查并执行日志文件轮转"""
        try:
            # 检查日志文件是否存在且超过最大大小
            if os.path.exists(self.log_file) and os.path.getsize(self.log_file) >= self.max_size:
                # 执行日志轮转
                self._rotate_logs()
        except OSError as e:
            sys.stderr.write(f"检查日志文件大小时发生错误: {e}\n")
    
    def _rotate_logs(self):
        """执行日志文件轮转"""
        try:
            # 删除最旧的备份文件（如果备份数量已达到上限）
            if self.backup_count > 0:
                for i in range(self.backup_count - 1, 0, -1):
                    sfn = f"{self.log_file}.{i}"
                    dfn = f"{self.log_file}.{i + 1}"
                    if os.path.exists(sfn):
                        if os.path.exists(dfn):
                            os.remove(dfn)
                        os.rename(sfn, dfn)
                
                # 将当前日志文件重命名为备份文件
                dfn = f"{self.log_file}.1"
                if os.path.exists(dfn):
                    os.remove(dfn)
                if os.path.exists(self.log_file):
                    os.rename(self.log_file, dfn)
        except OSError as e:
            sys.stderr.write(f"执行日志轮转时发生错误: {e}\n")
    
    def _write_log(self, level, message):
        """写入日志消息"""
        # 检查日志级别
        if level < self.level:
            return
        
        # 格式化日志消息
        formatted_message = self._format_message(level, message)
        
        # 检查是否需要轮转日志文件
        self._check_rotate()
        
        # 写入日志文件
        try:
            with open(self.log_file, "a", encoding="utf-8") as f:
                f.write(formatted_message + "\n")
        except IOError as e:
            sys.stderr.write(f"写入日志文件时发生错误: {e}\n")
        
        # 输出到控制台
        if self.console_output:
            # 根据日志级别选择不同的输出流和颜色
            if level >= self.ERROR:
                # 错误信息输出到stderr
                sys.stderr.write(formatted_message + "\n")
            else:
                # 其他信息输出到stdout
                sys.stdout.write(formatted_message + "\n")
    
    def debug(self, message):
        """记录DEBUG级别的日志"""
        self._write_log(self.DEBUG, message)
    
    def info(self, message):
        """记录INFO级别的日志"""
        self._write_log(self.INFO, message)
    
    def warning(self, message):
        """记录WARNING级别的日志"""
        self._write_log(self.WARNING, message)
    
    def error(self, message):
        """记录ERROR级别的日志"""
        self._write_log(self.ERROR, message)
    
    def critical(self, message):
        """记录CRITICAL级别的日志"""
        self._write_log(self.CRITICAL, message)
    
    def exception(self, message):
        """记录异常信息"""
        # 获取当前异常的堆栈信息
        exc_info = traceback.format_exc()
        self._write_log(self.ERROR, f"{message}\n{exc_info}")

# 使用示例
if __name__ == "__main__":
    # 创建日志记录器
    logger = Logger(
        log_file="logs/app.log",
        level=Logger.DEBUG,
        log_format="%(asctime)s [%(levelname)s] %(message)s",
        max_size=1024*1024,  # 1MB
        backup_count=3
    )
    
    # 记录不同级别的日志
    logger.debug("这是一条调试信息")
    logger.info("这是一条普通信息")
    logger.warning("这是一条警告信息")
    logger.error("这是一条错误信息")
    logger.critical("这是一条严重错误信息")
    
    # 记录异常信息
    try:
        result = 1 / 0
    except Exception:
        logger.exception("发生了一个异常")
    
    # 测试Unicode支持
    logger.info("这是一条包含Unicode字符的信息：你好，世界！")
    
    print(f"\n日志已记录到文件 '{logger.log_file}'")
```

在这个示例中，我们实现了一个简单的日志系统，它具有以下功能：

1. 支持不同级别的日志（DEBUG、INFO、WARNING、ERROR、CRITICAL）
2. 支持自定义日志格式和日期格式
3. 支持日志文件的轮转（按大小轮转）
4. 支持同时将日志输出到控制台和文件
5. 支持Unicode字符
6. 提供了方便的异常信息记录功能

程序使用面向对象的方式实现，每个功能都被封装在一个方法中，使代码结构清晰、易于维护和扩展。同时，程序还实现了错误处理，确保在遇到错误时能够优雅地退出或给出提示。

通过这个任务，我们不仅巩固了文件操作的知识，还学习了如何设计和实现一个简单但功能完整的日志系统，这在实际的软件开发中是非常有用的。

通过本节课的学习，我们已经掌握了Python中的文件操作，包括文件的打开、读取、写入、关闭等基本操作，以及一些高级的文件处理技术，如CSV文件处理、JSON文件处理、文件复制和移动等。在接下来的课程中，我们将继续学习Python中的面向对象编程，这是Python编程中的一个重要概念。
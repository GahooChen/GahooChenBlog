# 文件操作：让程序记住你的数据

小朋友们，你们有没有写过日记或者画过画？当你写完日记或者画完画后，你会把它们保存起来，这样以后还可以再看。在C语言中，我们也可以让程序把数据保存到文件中，或者从文件中读取数据。这一节我们就来学习文件操作！

## 文件是什么？

文件是存储在计算机存储设备（如硬盘、U盘等）上的一组相关数据的集合。我们平时使用的文档、图片、音乐、视频等都是文件。

在C语言中，文件可以分为两种类型：

1. **文本文件**：存储的是字符，可以用记事本等文本编辑器打开查看（就像你写的日记）
2. **二进制文件**：存储的是二进制数据，需要特定的程序才能打开查看（就像你画的画或者拍的照片）

## 文件操作的基本步骤

在C语言中，操作文件通常需要以下几个步骤：

1. **打开文件**：就像你打开笔记本准备写日记一样
2. **读写文件**：就像你在笔记本上写东西或者看之前写的东西一样
3. **关闭文件**：就像你写完日记后把笔记本合上一样

## 文件指针

在C语言中，我们使用文件指针来标识和操作文件。文件指针是一个指向`FILE`类型的指针，`FILE`是C语言标准库中定义的一个结构体类型。

```c
FILE *filePointer; // 定义一个文件指针
```

## 打开文件

在C语言中，我们使用`fopen()`函数来打开文件。这个函数需要两个参数：文件名和打开模式。

```c
filePointer = fopen("example.txt", "r"); // 以只读模式打开example.txt文件
```

常用的文件打开模式有：

| 模式 | 含义 | 就像 |
|-----|-----|-----|
| r | 只读模式打开文件 | 只能看别人写的日记，不能修改 |
| w | 只写模式打开文件，如果文件不存在则创建，如果文件存在则清空 | 拿一个新笔记本开始写，之前写的内容会被擦掉 |
| a | 追加模式打开文件，如果文件不存在则创建 | 在已有的日记后面继续写，不会擦掉之前的内容 |
| r+ | 读写模式打开文件 | 可以看也可以修改别人写的日记 |
| w+ | 读写模式打开文件，如果文件不存在则创建，如果文件存在则清空 | 拿一个可以写也可以擦的笔记本开始写 |
| a+ | 读写模式打开文件，如果文件不存在则创建 | 可以看之前的日记，也可以在后面继续写 |

> **注意**：在使用`fopen()`函数打开文件后，一定要检查文件是否成功打开。如果文件打开失败，`fopen()`函数会返回`NULL`。

```c
filePointer = fopen("example.txt", "r");
if (filePointer == NULL) {
    printf("文件打开失败！\n");
    return 1;
}
```

## 关闭文件

在C语言中，我们使用`fclose()`函数来关闭文件。关闭文件是一个好习惯，可以释放系统资源，避免数据丢失。

```c
fclose(filePointer); // 关闭文件
```

## 文件的读写操作

### 字符读写

我们可以使用`fgetc()`和`fputc()`函数来读写单个字符：

```c
#include <stdio.h>

int main() {
    FILE *filePointer;
    char ch;
    
    // 以只写模式打开文件
    filePointer = fopen("example.txt", "w");
    if (filePointer == NULL) {
        printf("文件打开失败！\n");
        return 1;
    }
    
    // 向文件中写入单个字符
    fputc('H', filePointer);
    fputc('e', filePointer);
    fputc('l', filePointer);
    fputc('l', filePointer);
    fputc('o', filePointer);
    
    // 关闭文件
    fclose(filePointer);
    
    // 以只读模式打开文件
    filePointer = fopen("example.txt", "r");
    if (filePointer == NULL) {
        printf("文件打开失败！\n");
        return 1;
    }
    
    // 从文件中读取单个字符并显示
    printf("文件内容：");
    while ((ch = fgetc(filePointer)) != EOF) {
        printf("%c", ch);
    }
    printf("\n");
    
    // 关闭文件
    fclose(filePointer);
    
    return 0;
}
```

> **说明**：`EOF`是一个宏，表示"文件结束符"（End Of File）。当`fgetc()`函数读到文件末尾时，会返回`EOF`。

### 字符串读写

我们可以使用`fgets()`和`fputs()`函数来读写字符串：

```c
#include <stdio.h>

int main() {
    FILE *filePointer;
    char str[100];
    
    // 以只写模式打开文件
    filePointer = fopen("example.txt", "w");
    if (filePointer == NULL) {
        printf("文件打开失败！\n");
        return 1;
    }
    
    // 向文件中写入字符串
    fputs("Hello, World!\n", filePointer);
    fputs("这是一个文件操作的例子。\n", filePointer);
    
    // 关闭文件
    fclose(filePointer);
    
    // 以只读模式打开文件
    filePointer = fopen("example.txt", "r");
    if (filePointer == NULL) {
        printf("文件打开失败！\n");
        return 1;
    }
    
    // 从文件中读取字符串并显示
    printf("文件内容：\n");
    while (fgets(str, sizeof(str), filePointer) != NULL) {
        printf("%s", str);
    }
    
    // 关闭文件
    fclose(filePointer);
    
    return 0;
}
```

### 格式化读写

我们可以使用`fscanf()`和`fprintf()`函数来进行格式化的读写操作，它们的用法和`scanf()`、`printf()`很相似，只是多了一个文件指针参数：

```c
#include <stdio.h>

int main() {
    FILE *filePointer;
    char name[20];
    int age;
    float score;
    
    // 以只写模式打开文件
    filePointer = fopen("student.txt", "w");
    if (filePointer == NULL) {
        printf("文件打开失败！\n");
        return 1;
    }
    
    // 向文件中写入格式化数据
    fprintf(filePointer, "%s %d %.1f\n", "小明", 10, 92.5);
    fprintf(filePointer, "%s %d %.1f\n", "小红", 9, 88.5);
    
    // 关闭文件
    fclose(filePointer);
    
    // 以只读模式打开文件
    filePointer = fopen("student.txt", "r");
    if (filePointer == NULL) {
        printf("文件打开失败！\n");
        return 1;
    }
    
    // 从文件中读取格式化数据并显示
    printf("学生信息：\n");
    while (fscanf(filePointer, "%s %d %f", name, &age, &score) != EOF) {
        printf("姓名：%s，年龄：%d岁，成绩：%.1f分\n", name, age, score);
    }
    
    // 关闭文件
    fclose(filePointer);
    
    return 0;
}
```

## 二进制文件的读写

我们可以使用`fread()`和`fwrite()`函数来读写二进制文件：

```c
#include <stdio.h>

struct Student {
    char name[20];
    int age;
    float score;
};

int main() {
    FILE *filePointer;
    struct Student students[2] = {"小明", 10, 92.5, "小红", 9, 88.5};
    struct Student readStudents[2];
    
    // 以二进制只写模式打开文件
    filePointer = fopen("students.dat", "wb");
    if (filePointer == NULL) {
        printf("文件打开失败！\n");
        return 1;
    }
    
    // 向文件中写入二进制数据
    fwrite(students, sizeof(struct Student), 2, filePointer);
    
    // 关闭文件
    fclose(filePointer);
    
    // 以二进制只读模式打开文件
    filePointer = fopen("students.dat", "rb");
    if (filePointer == NULL) {
        printf("文件打开失败！\n");
        return 1;
    }
    
    // 从文件中读取二进制数据
    fread(readStudents, sizeof(struct Student), 2, filePointer);
    
    // 显示读取的数据
    printf("学生信息：\n");
    for (int i = 0; i < 2; i = i + 1) {
        printf("姓名：%s，年龄：%d岁，成绩：%.1f分\n", 
               readStudents[i].name, readStudents[i].age, readStudents[i].score);
    }
    
    // 关闭文件
    fclose(filePointer);
    
    return 0;
}
```

## 文件操作的注意事项

在进行文件操作时，需要注意以下几点：

1. **检查文件是否成功打开**：在使用`fopen()`函数打开文件后，一定要检查文件是否成功打开
2. **及时关闭文件**：在使用完文件后，一定要及时关闭文件，释放系统资源
3. **处理文件操作错误**：在进行文件读写操作时，要注意处理可能出现的错误
4. **注意文件路径**：在打开文件时，要注意提供正确的文件路径
5. **避免文件覆盖**：在使用"w"模式打开文件时，要注意会覆盖原有的文件内容

## 实战小练习

让我们来做一个练习，实现一个简单的成绩管理系统，可以将学生成绩保存到文件中，也可以从文件中读取学生成绩：

```c
#include <stdio.h>
#include <string.h>

struct Student {
    char name[20];
    int score;
};

int main() {
    FILE *filePointer;
    struct Student students[5];
    int count, i, choice;
    
    printf("请选择操作：\n");
    printf("1. 输入学生成绩并保存到文件\n");
    printf("2. 从文件中读取学生成绩\n");
    scanf("%d", &choice);
    
    if (choice == 1) {
        // 输入学生成绩
        printf("请输入学生人数（最多5人）：");
        scanf("%d", &count);
        
        if (count > 5) {
            count = 5;
            printf("最多只能输入5个学生的成绩！\n");
        }
        
        for (i = 0; i < count; i = i + 1) {
            printf("请输入第 %d 个学生的姓名：", i + 1);
            scanf("%s", students[i].name);
            printf("请输入第 %d 个学生的成绩：", i + 1);
            scanf("%d", &students[i].score);
        }
        
        // 保存到文件
        filePointer = fopen("scores.txt", "w");
        if (filePointer == NULL) {
            printf("文件打开失败！\n");
            return 1;
        }
        
        fprintf(filePointer, "%d\n", count);
        for (i = 0; i < count; i = i + 1) {
            fprintf(filePointer, "%s %d\n", students[i].name, students[i].score);
        }
        
        fclose(filePointer);
        printf("成绩已保存到文件！\n");
    } else if (choice == 2) {
        // 从文件中读取成绩
        filePointer = fopen("scores.txt", "r");
        if (filePointer == NULL) {
            printf("文件打开失败！可能文件不存在。\n");
            return 1;
        }
        
        fscanf(filePointer, "%d", &count);
        printf("学生人数：%d\n", count);
        printf("学生成绩列表：\n");
        
        for (i = 0; i < count; i = i + 1) {
            fscanf(filePointer, "%s %d", students[i].name, &students[i].score);
            printf("姓名：%s，成绩：%d分\n", students[i].name, students[i].score);
        }
        
        fclose(filePointer);
    } else {
        printf("无效的选择！\n");
    }
    
    return 0;
}
```

## 小结

通过这一节的学习，我们已经了解了文件操作的基本概念和用法：

- 文件是存储在计算机存储设备上的一组相关数据的集合
- 在C语言中，我们使用文件指针来标识和操作文件
- 文件操作通常包括打开文件、读写文件和关闭文件三个步骤
- 我们可以使用不同的函数来进行字符读写、字符串读写和格式化读写
- 我们也可以读写二进制文件
- 在进行文件操作时，需要注意一些事项，如检查文件是否成功打开、及时关闭文件等

文件操作是C语言中非常重要的一部分，它可以让我们的程序能够持久化地存储数据，而不仅仅是在程序运行时使用数据。下一节我们将学习排序算法，它可以帮助我们更好地组织和管理数据！
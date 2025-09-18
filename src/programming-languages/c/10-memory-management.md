# 10. 内存管理：按需使用仓库空间

小朋友们，上一节课我们学习了指针的基础知识，知道了指针是指向内存地址的标签。这一节课，我们要学习如何在程序运行时动态地管理内存空间，就像我们可以根据需要随时调整储物柜的大小一样！

## 为什么需要动态内存分配？

在之前的学习中，我们使用的变量和数组都是在程序编译时就确定了大小的。但有时候，我们在编写程序时并不知道需要使用多少内存。比如，当我们要编写一个成绩管理系统时，我们可能不知道会有多少学生的成绩需要存储。

这时候，动态内存分配就派上用场了！它让我们可以在程序运行时根据实际需要申请和释放内存空间。

## 动态内存分配的函数

在C语言中，我们使用以下几个函数来进行动态内存分配：

- `malloc()`：申请一块指定大小的内存空间
- `calloc()`：申请一块指定大小的内存空间，并将其初始化为0
- `realloc()`：调整已经分配的内存空间的大小
- `free()`：释放之前分配的内存空间

要使用这些函数，我们需要包含`stdlib.h`头文件。

## 动态内存分配的例子

让我们来看一个使用动态内存分配的例子：

```c
#include <stdio.h>
#include <stdlib.h> // 需要包含这个头文件才能使用malloc和free

int main() {
    int *numbers;
    int count, i;
    
    printf("你想存储多少个数字？");
    scanf("%d", &count);
    
    // 动态分配内存，用来存储count个整数
    numbers = (int *)malloc(count * sizeof(int));
    
    // 检查内存是否分配成功
    if (numbers == NULL) {
        printf("内存分配失败！\n");
        return 1;
    }
    
    // 输入数字
    for (i = 0; i < count; i = i + 1) {
        printf("请输入第 %d 个数字：", i + 1);
        scanf("%d", &numbers[i]);
    }
    
    // 输出数字
    printf("你输入的数字是：\n");
    for (i = 0; i < count; i = i + 1) {
        printf("%d ", numbers[i]);
    }
    printf("\n");
    
    // 释放内存
    free(numbers);
    numbers = NULL; // 释放后将指针设为NULL，避免悬空指针
    
    return 0;
}
```

在这个例子中：
- 我们使用`malloc()`函数申请了一块可以存储`count`个整数的内存空间
- 我们检查了内存是否分配成功（如果`malloc()`返回NULL，说明内存分配失败）
- 使用完内存后，我们使用`free()`函数释放了这块内存空间
- 释放内存后，我们将指针设为NULL，避免悬空指针

## 不同的内存分配函数

让我们来看看`malloc()`、`calloc()`和`realloc()`的区别：

### malloc()

`malloc()`函数的原型是：

```c
void *malloc(size_t size);
```

它接受一个参数，表示要分配的内存字节数，返回一个指向分配的内存空间的指针。如果内存分配失败，返回NULL。

### calloc()

`calloc()`函数的原型是：

```c
void *calloc(size_t num, size_t size);
```

它接受两个参数，第一个参数是元素的个数，第二个参数是每个元素的字节数，返回一个指向分配的内存空间的指针。与`malloc()`不同的是，`calloc()`会将分配的内存空间初始化为0。

### realloc()

`realloc()`函数的原型是：

```c
void *realloc(void *ptr, size_t size);
```

它接受两个参数，第一个参数是之前通过`malloc()`、`calloc()`或`realloc()`分配的内存空间的指针，第二个参数是新的内存空间的字节数，返回一个指向调整后的内存空间的指针。

## 内存泄漏

内存泄漏是指程序中动态分配的内存空间在使用完毕后没有被释放，导致这些内存空间无法被其他程序使用。内存泄漏会导致程序占用的内存越来越多，最终可能导致程序崩溃。

为了避免内存泄漏，我们应该养成以下好习惯：

1. **及时释放不再使用的内存**：当我们不再需要一块动态分配的内存空间时，应该使用`free()`函数释放它
2. **释放内存后将指针设为NULL**：这样可以避免悬空指针
3. **检查内存分配是否成功**：在使用动态分配的内存之前，应该检查内存分配是否成功

## 实战小练习

让我们来做一个练习，使用动态内存分配来实现一个简单的成绩管理系统：

```c
#include <stdio.h>
#include <stdlib.h>

// 函数定义：计算平均分
float calculateAverage(int *scores, int count) {
    int sum = 0;
    float average;
    
    for (int i = 0; i < count; i = i + 1) {
        sum = sum + scores[i];
    }
    
    average = (float)sum / count;
    return average;
}

int main() {
    int *scores;
    int count;
    
    printf("请输入学生人数：");
    scanf("%d", &count);
    
    // 动态分配内存
    scores = (int *)malloc(count * sizeof(int));
    
    if (scores == NULL) {
        printf("内存分配失败！\n");
        return 1;
    }
    
    // 输入成绩
    for (int i = 0; i < count; i = i + 1) {
        printf("请输入第 %d 个学生的成绩：", i + 1);
        scanf("%d", &scores[i]);
    }
    
    // 计算平均分
    float avg = calculateAverage(scores, count);
    printf("平均分是：%.2f\n", avg);
    
    // 释放内存
    free(scores);
    scores = NULL;
    
    return 0;
}
```

## 小结

通过这一节的学习，我们已经了解了内存管理的基本概念和用法：

- 动态内存分配让我们可以在程序运行时根据需要申请和释放内存
- C语言提供了`malloc()`、`calloc()`、`realloc()`和`free()`等函数来进行动态内存分配
- 内存泄漏是一个常见的问题，我们应该养成及时释放不再使用的内存的好习惯

内存管理是C语言中非常重要的概念，也是编写高效程序的关键。掌握了这些概念，你就可以编写出更灵活、更高效的程序了！下一节我们将学习结构体与共用体，它们可以帮助我们组织更复杂的数据。
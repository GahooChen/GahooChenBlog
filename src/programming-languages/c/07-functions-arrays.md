# 07. 函数与数组：让程序更有条理

小朋友们，你们有没有玩过搭积木？函数就像是已经拼好的积木块，可以反复使用；而数组就像是一排相同大小的盒子，可以整齐地存放很多东西。这一节我们来学习如何使用函数和数组让我们的程序变得更加有条理！

## 函数：可以重复使用的代码块

你们有没有发现，有时候我们在程序中会多次用到相同的代码？这时候就可以把这些代码封装成一个函数，就像把常用的积木块提前拼好一样。

### 函数的定义与调用

让我们来看一个计算长方形面积的函数：

```c
#include <stdio.h>

// 函数定义：计算长方形的面积
int calculateArea(int length, int width) {
    int area = length * width;
    return area; // 返回计算结果
}

int main() {
    int roomLength = 5;
    int roomWidth = 4;
    int classroomLength = 10;
    int classroomWidth = 8;
    
    // 调用函数计算房间面积
    int roomArea = calculateArea(roomLength, roomWidth);
    printf("房间的面积是：%d平方米\n", roomArea);
    
    // 再次调用函数计算教室面积
    int classroomArea = calculateArea(classroomLength, classroomWidth);
    printf("教室的面积是：%d平方米\n", classroomArea);
    
    return 0;
}
```

在这个例子中：
- `calculateArea` 是函数的名字
- `int length, int width` 是函数的参数（就像我们给函数的"原料"）
- `int` 是函数的返回类型（就像函数给我们的"成品"类型）
- `return area;` 是函数返回的结果

### 为什么要使用函数？

1. **代码重用**：我们可以在程序的多个地方使用同一个函数，而不需要重复编写相同的代码
2. **代码组织**：函数可以让我们的程序结构更清晰，就像把玩具分类放进不同的盒子里
3. **方便维护**：如果我们需要修改某个功能，只需要修改对应的函数，而不需要修改整个程序

## 数组：整齐排列的盒子

想象一下，你有一排相同大小的盒子，每个盒子里可以放一个东西，这就是数组！

### 数组的定义与使用

让我们来看一个存储5个学生考试成绩的数组：

```c
#include <stdio.h>

int main() {
    // 定义一个可以存储5个整数的数组
    int scores[5] = {85, 92, 78, 90, 88};
    
    // 访问数组中的元素（注意：数组的索引从0开始）
    printf("第一个学生的成绩：%d\n", scores[0]);
    printf("第二个学生的成绩：%d\n", scores[1]);
    printf("第三个学生的成绩：%d\n", scores[2]);
    printf("第四个学生的成绩：%d\n", scores[3]);
    printf("第五个学生的成绩：%d\n", scores[4]);
    
    // 修改数组中的元素
    scores[2] = 82; // 把第三个学生的成绩从78改为82
    printf("修改后第三个学生的成绩：%d\n", scores[2]);
    
    return 0;
}
```

### 数组的特点

1. **相同类型**：数组中的所有元素必须是相同类型的
2. **固定大小**：数组一旦定义，大小就不能改变
3. **连续存储**：数组中的元素在内存中是连续存储的
4. **索引访问**：我们可以通过索引来访问数组中的元素，索引从0开始

## 函数与数组的结合使用

函数和数组可以很好地结合在一起使用，让我们的程序更加灵活和强大。

### 用函数处理数组

让我们来看一个计算数组中所有元素平均值的函数：

```c
#include <stdio.h>

// 函数定义：计算数组中所有元素的平均值
float calculateAverage(int numbers[], int size) {
    int sum = 0;
    
    // 遍历数组，计算总和
    for (int i = 0; i < size; i = i + 1) {
        sum = sum + numbers[i];
    }
    
    // 计算平均值
    float average = (float)sum / size;
    return average;
}

int main() {
    int scores[5] = {85, 92, 78, 90, 88};
    int arraySize = 5;
    
    // 调用函数计算平均值
    float avgScore = calculateAverage(scores, arraySize);
    printf("平均分是：%.2f\n", avgScore);
    
    return 0;
}
```

## 多维数组：数组的数组

除了一维数组，我们还可以有二维数组、三维数组，甚至更多维的数组。二维数组就像一个表格，有行和列。

```c
#include <stdio.h>

int main() {
    // 定义一个3行4列的二维数组，存储3个班级各4个学生的成绩
    int classScores[3][4] = {
        {85, 92, 78, 90},
        {88, 95, 82, 87},
        {91, 79, 86, 93}
    };
    
    // 访问二维数组中的元素
    printf("第一个班级第三个学生的成绩：%d\n", classScores[0][2]);
    printf("第二个班级第一个学生的成绩：%d\n", classScores[1][0]);
    printf("第三个班级第四个学生的成绩：%d\n", classScores[2][3]);
    
    return 0;
}
```

## 实战小练习

让我们来做一个练习，写一个程序来找出数组中的最大值：

```c
#include <stdio.h>

// 函数定义：找出数组中的最大值
int findMaximum(int numbers[], int size) {
    int max = numbers[0]; // 假设第一个元素是最大值
    
    // 遍历数组，寻找最大值
    for (int i = 1; i < size; i = i + 1) {
        if (numbers[i] > max) {
            max = numbers[i]; // 如果找到更大的数，就更新最大值
        }
    }
    
    return max;
}

int main() {
    int numbers[6] = {15, 28, 9, 42, 37, 18};
    int arraySize = 6;
    
    int maximum = findMaximum(numbers, arraySize);
    printf("数组中的最大值是：%d\n", maximum);
    
    return 0;
}
```

## 小结

通过这一节的学习，我们已经了解了函数和数组的基本概念和用法：

- 函数是可以重复使用的代码块，可以让我们的程序结构更清晰
- 数组是整齐排列的相同类型的变量，可以方便地存储和访问多个数据
- 函数和数组可以结合使用，让我们的程序更加灵活和强大
- 除了一维数组，还有二维数组等多维数组

下一节我们将学习指针与内存管理，这是C语言中非常重要的概念，也是C语言的一大特点！
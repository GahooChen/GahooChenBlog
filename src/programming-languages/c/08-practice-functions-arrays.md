# 08. 函数与数组练习：巩固你的编程技能

小朋友们，上一节课我们学习了函数与数组的基础知识，现在让我们通过一些有趣的练习来巩固这些知识吧！这些练习就像是游戏中的关卡，完成它们可以帮助你更好地掌握编程技能！

## 练习一：计算数组的和与平均值

让我们来编写一个程序，计算一个数组中所有元素的和与平均值。我们可以定义一个函数来计算和，再定义另一个函数来计算平均值。

```c
#include <stdio.h>

// 计算数组中所有元素的和
int calculateSum(int numbers[], int size) {
    int sum = 0;
    for (int i = 0; i < size; i++) {
        sum += numbers[i];
    }
    return sum;
}

// 计算数组中所有元素的平均值
float calculateAverage(int numbers[], int size) {
    int sum = calculateSum(numbers, size);
    return (float)sum / size;
}

int main() {
    int scores[5] = {85, 92, 78, 90, 88};
    int size = 5;
    
    int sum = calculateSum(scores, size);
    float average = calculateAverage(scores, size);
    
    printf("数组元素的和：%d\n", sum);
    printf("数组元素的平均值：%.2f\n", average);
    
    return 0;
}
```

## 练习二：找出数组中的最大值和最小值

现在，让我们编写一个程序，找出一个数组中的最大值和最小值。我们可以定义一个函数来找出最大值，再定义另一个函数来找出最小值。

```c
#include <stdio.h>

// 找出数组中的最大值
int findMax(int numbers[], int size) {
    int max = numbers[0];
    for (int i = 1; i < size; i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }
    return max;
}

// 找出数组中的最小值
int findMin(int numbers[], int size) {
    int min = numbers[0];
    for (int i = 1; i < size; i++) {
        if (numbers[i] < min) {
            min = numbers[i];
        }
    }
    return min;
}

int main() {
    int scores[5] = {85, 92, 78, 90, 88};
    int size = 5;
    
    int max = findMax(scores, size);
    int min = findMin(scores, size);
    
    printf("数组中的最大值：%d\n", max);
    printf("数组中的最小值：%d\n", min);
    
    return 0;
}
```

## 练习三：反转数组

让我们来编写一个程序，将一个数组中的元素顺序反转。例如，如果数组是{1, 2, 3, 4, 5}，反转后变成{5, 4, 3, 2, 1}。

```c
#include <stdio.h>

// 反转数组
void reverseArray(int numbers[], int size) {
    int temp;
    for (int i = 0; i < size / 2; i++) {
        // 交换元素
        temp = numbers[i];
        numbers[i] = numbers[size - 1 - i];
        numbers[size - 1 - i] = temp;
    }
}

// 打印数组
void printArray(int numbers[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\n");
}

int main() {
    int numbers[5] = {1, 2, 3, 4, 5};
    int size = 5;
    
    printf("反转前的数组：");
    printArray(numbers, size);
    
    reverseArray(numbers, size);
    
    printf("反转后的数组：");
    printArray(numbers, size);
    
    return 0;
}
```

## 练习四：统计数组中某个元素出现的次数

让我们来编写一个程序，统计一个数组中某个特定元素出现的次数。例如，我们可以统计数组中数字5出现了多少次。

```c
#include <stdio.h>

// 统计数组中某个元素出现的次数
int countOccurrences(int numbers[], int size, int target) {
    int count = 0;
    for (int i = 0; i < size; i++) {
        if (numbers[i] == target) {
            count++;
        }
    }
    return count;
}

int main() {
    int numbers[10] = {5, 2, 5, 7, 8, 5, 3, 5, 9, 1};
    int size = 10;
    int target = 5;
    
    int occurrences = countOccurrences(numbers, size, target);
    
    printf("数字 %d 在数组中出现了 %d 次\n", target, occurrences);
    
    return 0;
}
```

## 练习五：合并两个有序数组

最后，让我们来编写一个稍微复杂一点的程序，将两个已经排序好的数组合并成一个新的有序数组。

```c
#include <stdio.h>

// 合并两个有序数组
void mergeArrays(int arr1[], int size1, int arr2[], int size2, int result[]) {
    int i = 0, j = 0, k = 0;
    
    // 比较两个数组的元素，将较小的元素放入结果数组
    while (i < size1 && j < size2) {
        if (arr1[i] < arr2[j]) {
            result[k++] = arr1[i++];
        } else {
            result[k++] = arr2[j++];
        }
    }
    
    // 将arr1中剩余的元素放入结果数组
    while (i < size1) {
        result[k++] = arr1[i++];
    }
    
    // 将arr2中剩余的元素放入结果数组
    while (j < size2) {
        result[k++] = arr2[j++];
    }
}

// 打印数组
void printArray(int numbers[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\n");
}

int main() {
    int arr1[5] = {1, 3, 5, 7, 9};
    int arr2[5] = {2, 4, 6, 8, 10};
    int size1 = 5, size2 = 5;
    int result[10];
    
    printf("第一个有序数组：");
    printArray(arr1, size1);
    
    printf("第二个有序数组：");
    printArray(arr2, size2);
    
    mergeArrays(arr1, size1, arr2, size2, result);
    
    printf("合并后的有序数组：");
    printArray(result, size1 + size2);
    
    return 0;
}
```

## 挑战题：二维数组转置

如果你觉得上面的练习对你来说太简单了，那么让我们来挑战一个稍微难一点的问题：二维数组转置。二维数组转置就是将二维数组的行和列交换位置。

```c
#include <stdio.h>

// 打印二维数组
void print2DArray(int arr[][3], int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            printf("%d ", arr[i][j]);
        }
        printf("\n");
    }
}

// 二维数组转置
void transposeArray(int arr[][3], int transposed[][2], int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            transposed[j][i] = arr[i][j];
        }
    }
}

int main() {
    int arr[2][3] = {{1, 2, 3}, {4, 5, 6}};
    int transposed[3][2];
    
    printf("原始二维数组：\n");
    print2DArray(arr, 2, 3);
    
    transposeArray(arr, transposed, 2, 3);
    
    printf("转置后的二维数组：\n");
    print2DArray(transposed, 3, 2);
    
    return 0;
}
```

## 小结

通过这些练习，我们巩固了函数与数组的基础知识：

- 我们学会了如何定义和调用函数来处理数组
- 我们学会了如何在函数中传递数组参数
- 我们通过实际的例子练习了数组的常见操作

函数和数组是C语言中非常重要的概念，掌握了这些概念，你就可以编写出更复杂、更有用的程序了！继续加油，下一节课我们将学习指针基础知识，这是C语言中非常强大但也有点难度的概念。
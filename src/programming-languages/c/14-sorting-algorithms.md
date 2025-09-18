# 14. 排序算法：让计算机帮你整理东西

小朋友们，你们有没有整理过自己的玩具柜？把积木按颜色分类，把拼图按大小排列，或者把绘本按顺序放在书架上。在计算机中，我们也经常需要整理数据，比如按成绩高低排列学生名单，按价格排序商品列表等。这时候，排序算法就派上用场了！

## 什么是排序算法？

排序算法就是一种让计算机按照一定的顺序（如从小到大、从大到小、按字母顺序等）排列数据的方法。就像你整理玩具的方法有很多种一样，计算机排序的方法也有很多种，每种方法都有自己的特点和适用场景。

## 常见的排序算法

### 冒泡排序：像气泡一样往上冒

冒泡排序是一种简单的排序算法，它的工作原理就像气泡在水中往上冒一样：比较相邻的两个元素，如果它们的顺序错误就交换它们，直到没有再需要交换的元素为止。

想象一下，你有一排大小不同的气球，你想让它们按照从小到大的顺序排列。冒泡排序的方法就是：从左到右，依次比较相邻的两个气球，如果左边的气球比右边的大，就交换它们的位置。这样一轮下来，最大的气球就会"冒泡"到最右边。然后再重复这个过程，直到所有的气球都按照从小到大的顺序排列好。

```c
#include <stdio.h>

// 函数定义：冒泡排序
void bubbleSort(int arr[], int n) {
    int i, j, temp;
    // 外循环：控制排序的轮数
    for (i = 0; i < n - 1; i = i + 1) {
        // 内循环：比较相邻的元素并交换
        for (j = 0; j < n - i - 1; j = j + 1) {
            // 如果左边的元素大于右边的元素，就交换它们
            if (arr[j] > arr[j + 1]) {
                // 交换两个元素
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

// 函数定义：打印数组
void printArray(int arr[], int size) {
    int i;
    for (i = 0; i < size; i = i + 1) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("排序前的数组：\n");
    printArray(arr, n);
    
    // 调用冒泡排序函数
    bubbleSort(arr, n);
    
    printf("冒泡排序后的数组：\n");
    printArray(arr, n);
    
    return 0;
}
```

### 选择排序：每次选出最小的

选择排序的工作原理是：每次从待排序的数据中选出最小（或最大）的一个元素，存放到已排序序列的末尾，直到全部待排序的数据元素排完。

想象一下，你有一堆散乱的卡片，每张卡片上写着一个数字。选择排序的方法就是：每次从剩下的卡片中找出数字最小的那张，把它放在已排好序的卡片的后面。这样重复下去，直到所有的卡片都排好序。

```c
#include <stdio.h>

// 函数定义：选择排序
void selectionSort(int arr[], int n) {
    int i, j, minIndex, temp;
    // 外循环：控制排序的轮数
    for (i = 0; i < n - 1; i = i + 1) {
        // 假设当前位置的元素是最小的
        minIndex = i;
        // 内循环：在剩下的元素中寻找最小的元素
        for (j = i + 1; j < n; j = j + 1) {
            // 如果找到比当前最小元素还小的元素，就更新最小元素的索引
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        // 交换当前位置的元素和找到的最小元素
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
}

// 函数定义：打印数组
void printArray(int arr[], int size) {
    int i;
    for (i = 0; i < size; i = i + 1) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("排序前的数组：\n");
    printArray(arr, n);
    
    // 调用选择排序函数
    selectionSort(arr, n);
    
    printf("选择排序后的数组：\n");
    printArray(arr, n);
    
    return 0;
}
```

### 插入排序：像整理扑克牌一样

插入排序的工作原理是：将数据分为已排序部分和未排序部分，然后从未排序部分中取出元素，插入到已排序部分的适当位置，直到所有元素都插入完毕。

想象一下，你在整理扑克牌，你会把已经整理好的牌放在左手，然后从右手的牌堆中一张一张地拿牌，插入到左手牌的适当位置。插入排序的工作原理就是这样的。

```c
#include <stdio.h>

// 函数定义：插入排序
void insertionSort(int arr[], int n) {
    int i, j, key;
    // 外循环：控制未排序部分的元素
    for (i = 1; i < n; i = i + 1) {
        // 取出当前要插入的元素
        key = arr[i];
        // 在已排序的部分寻找合适的插入位置
        j = i - 1;
        while (j >= 0 && arr[j] > key) {
            // 将大于key的元素往后移一位
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        // 插入元素到合适的位置
        arr[j + 1] = key;
    }
}

// 函数定义：打印数组
void printArray(int arr[], int size) {
    int i;
    for (i = 0; i < size; i = i + 1) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("排序前的数组：\n");
    printArray(arr, n);
    
    // 调用插入排序函数
    insertionSort(arr, n);
    
    printf("插入排序后的数组：\n");
    printArray(arr, n);
    
    return 0;
}
```

### 快速排序：分而治之

快速排序是一种高效的排序算法，它的工作原理是：选择一个"基准"元素，将数组分为两部分，小于基准的元素放在左边，大于基准的元素放在右边，然后递归地对这两部分进行快速排序。

想象一下，你有一堆书，你想按照书名的字母顺序排序。快速排序的方法就是：选一本书作为基准，把所有书名在它之前的书放在它左边，把所有书名单词在它之后的书放在它右边，然后分别对左边和右边的书堆重复这个过程。

```c
#include <stdio.h>

// 函数定义：交换两个元素
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// 函数定义：分区操作，返回基准元素的位置
int partition(int arr[], int low, int high) {
    int pivot = arr[high]; // 选择最右边的元素作为基准
    int i = (low - 1);     // i表示小于基准元素的最后一个位置
    
    for (int j = low; j <= high - 1; j = j + 1) {
        // 如果当前元素小于或等于基准元素，就交换它和i+1位置的元素
        if (arr[j] <= pivot) {
            i = i + 1;
            swap(&arr[i], &arr[j]);
        }
    }
    // 交换基准元素和i+1位置的元素
    swap(&arr[i + 1], &arr[high]);
    return (i + 1); // 返回基准元素的位置
}

// 函数定义：快速排序
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        // 获取基准元素的位置
        int pi = partition(arr, low, high);
        
        // 递归地对基准元素左边的子数组进行排序
        quickSort(arr, low, pi - 1);
        // 递归地对基准元素右边的子数组进行排序
        quickSort(arr, pi + 1, high);
    }
}

// 函数定义：打印数组
void printArray(int arr[], int size) {
    int i;
    for (i = 0; i < size; i = i + 1) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("排序前的数组：\n");
    printArray(arr, n);
    
    // 调用快速排序函数
    quickSort(arr, 0, n - 1);
    
    printf("快速排序后的数组：\n");
    printArray(arr, n);
    
    return 0;
}
```

## 各种排序算法的比较

不同的排序算法有不同的特点，我们可以从以下几个方面来比较它们：

1. **时间复杂度**：指排序算法执行所需要的时间
2. **空间复杂度**：指排序算法执行所需要的额外空间
3. **稳定性**：指排序后，相同值的元素的相对顺序是否保持不变

| 排序算法 | 平均时间复杂度 | 最好情况 | 最坏情况 | 空间复杂度 | 稳定性 | 就像什么 |
|---------|--------------|---------|---------|-----------|--------|---------|
| 冒泡排序 | O(n²) | O(n) | O(n²) | O(1) | 稳定 | 气泡往上冒 |
| 选择排序 | O(n²) | O(n²) | O(n²) | O(1) | 不稳定 | 每次选最小的 |
| 插入排序 | O(n²) | O(n) | O(n²) | O(1) | 稳定 | 整理扑克牌 |
| 快速排序 | O(nlogn) | O(nlogn) | O(n²) | O(logn) | 不稳定 | 分而治之 |

## 实战小练习

让我们来做一个练习，使用排序算法来对学生的成绩进行排序：

```c
#include <stdio.h>
#include <string.h>

// 定义一个Student结构体
struct Student {
    char name[20];
    int score;
};

// 函数定义：交换两个学生信息
void swapStudent(struct Student* a, struct Student* b) {
    struct Student temp = *a;
    *a = *b;
    *b = temp;
}

// 函数定义：使用冒泡排序对学生成绩进行排序
void bubbleSortStudents(struct Student students[], int n) {
    int i, j;
    for (i = 0; i < n - 1; i = i + 1) {
        for (j = 0; j < n - i - 1; j = j + 1) {
            // 如果前面学生的成绩比后面学生的成绩低，就交换他们的位置（按成绩从高到低排序）
            if (students[j].score < students[j + 1].score) {
                swapStudent(&students[j], &students[j + 1]);
            }
        }
    }
}

// 函数定义：打印学生信息
void printStudents(struct Student students[], int n) {
    int i;
    printf("学生成绩排名：\n");
    printf("名次\t姓名\t成绩\n");
    for (i = 0; i < n; i = i + 1) {
        printf("%d\t%s\t%d\n", i + 1, students[i].name, students[i].score);
    }
}

int main() {
    // 定义并初始化学生数组
    struct Student students[] = {
        {"小明", 85},
        {"小红", 92},
        {"小刚", 78},
        {"小丽", 90},
        {"小华", 88}
    };
    int n = sizeof(students) / sizeof(students[0]);
    
    // 打印排序前的学生信息
    printf("排序前的学生信息：\n");
    printf("姓名\t成绩\n");
    for (int i = 0; i < n; i = i + 1) {
        printf("%s\t%d\n", students[i].name, students[i].score);
    }
    printf("\n");
    
    // 使用冒泡排序对学生成绩进行排序
    bubbleSortStudents(students, n);
    
    // 打印排序后的学生信息
    printStudents(students, n);
    
    return 0;
}
```

## 小结

通过这一节的学习，我们已经了解了几种常见的排序算法：

- 冒泡排序：像气泡一样，每次让最大的元素"冒泡"到最后面
- 选择排序：每次从未排序的部分选出最小的元素，放到已排序部分的末尾
- 插入排序：像整理扑克牌一样，将元素插入到已排序部分的适当位置
- 快速排序：采用分而治之的策略，通过基准元素将数组分为两部分，然后递归地排序

每种排序算法都有自己的特点和适用场景。在实际应用中，我们需要根据数据的特点和需求来选择合适的排序算法。

排序算法是计算机科学中的基础算法，掌握了这些算法，你就可以更好地理解计算机是如何处理和组织数据的。下一节我们将学习查找算法，它可以帮助我们快速找到我们需要的数据！
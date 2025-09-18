# 15. 查找算法：让计算机帮你找东西

小朋友们，你们有没有在玩具堆里找过自己最喜欢的那个玩具？或者在书架上找过一本特定的书？在计算机中，我们也经常需要从大量的数据中找出我们需要的那部分数据。这时候，查找算法就派上用场了！

## 什么是查找算法？

查找算法就是一种让计算机从大量的数据中找到特定数据的方法。就像你找东西的方法有很多种一样，计算机查找的方法也有很多种，每种方法都有自己的特点和适用场景。

## 常见的查找算法

### 线性查找：一个一个找

线性查找，也叫顺序查找，是最简单的查找算法。它的工作原理是：从数据的一端开始，一个一个地检查每个元素，直到找到目标元素或者检查完所有元素。

想象一下，你有一盒彩色铅笔，你想找到红色的那支。线性查找的方法就是：从铅笔盒的一端开始，一支一支地看，直到找到红色的铅笔或者把所有的铅笔都看完。

```c
#include <stdio.h>

// 函数定义：线性查找
int linearSearch(int arr[], int n, int target) {
    int i;
    // 从数组的第一个元素开始，一个一个地查找
    for (i = 0; i < n; i = i + 1) {
        // 如果找到目标元素，就返回它的索引
        if (arr[i] == target) {
            return i;
        }
    }
    // 如果没有找到目标元素，就返回-1
    return -1;
}

int main() {
    int arr[] = {10, 25, 15, 7, 30, 22};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 15;
    
    // 调用线性查找函数
    int result = linearSearch(arr, n, target);
    
    // 根据查找结果输出信息
    if (result == -1) {
        printf("没有找到元素 %d\n", target);
    } else {
        printf("元素 %d 在数组中的索引是 %d\n", target, result);
    }
    
    return 0;
}
```

### 二分查找：折半查找

二分查找，也叫折半查找，是一种更高效的查找算法。不过，它要求待查找的数据必须是已排序的。它的工作原理是：每次将查找范围缩小到原来的一半，直到找到目标元素或者确定目标元素不存在。

想象一下，你有一本按字母顺序排列的字典，你想找到"apple"这个单词。二分查找的方法就是：先翻到字典的中间，看看中间的单词是在"apple"之前还是之后，然后只在可能包含"apple"的那一半字典中继续查找，重复这个过程，直到找到"apple"或者确定字典中没有这个单词。

```c
#include <stdio.h>

// 函数定义：二分查找（要求数组已排序）
int binarySearch(int arr[], int left, int right, int target) {
    // 当左边界小于等于右边界时，继续查找
    while (left <= right) {
        // 计算中间元素的索引
        int mid = left + (right - left) / 2;
        
        // 如果中间元素就是目标元素，就返回它的索引
        if (arr[mid] == target) {
            return mid;
        }
        // 如果目标元素大于中间元素，就在右半部分继续查找
        else if (arr[mid] < target) {
            left = mid + 1;
        }
        // 如果目标元素小于中间元素，就在左半部分继续查找
        else {
            right = mid - 1;
        }
    }
    // 如果没有找到目标元素，就返回-1
    return -1;
}

int main() {
    // 注意：二分查找要求数组是已排序的
    int arr[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 23;
    
    // 调用二分查找函数
    int result = binarySearch(arr, 0, n - 1, target);
    
    // 根据查找结果输出信息
    if (result == -1) {
        printf("没有找到元素 %d\n", target);
    } else {
        printf("元素 %d 在数组中的索引是 %d\n", target, result);
    }
    
    return 0;
}
```

### 插值查找：聪明地猜测位置

插值查找是二分查找的改进版，它根据目标值与数组边界值的比较，动态地确定下一次查找的位置，而不是简单地取中间位置。对于均匀分布的数据，插值查找通常比二分查找更快。

想象一下，你有一本电话簿，你想找到"张三"的电话号码。如果电话簿是按姓氏笔画排序的，你可能不会直接翻到中间，而是根据"张"这个姓氏的笔画，大致猜测它可能在电话簿的哪个位置。这就是插值查找的基本思想。

```c
#include <stdio.h>

// 函数定义：插值查找（要求数组已排序，且数据分布比较均匀）
int interpolationSearch(int arr[], int n, int target) {
    int low = 0;
    int high = n - 1;
    
    // 当low <= high，且target在arr[low]和arr[high]之间时，继续查找
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        // 如果数组中只有一个元素，或者所有元素都相等
        if (low == high) {
            if (arr[low] == target) {
                return low;
            }
            return -1;
        }
        
        // 计算插值位置
        int pos = low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low]);
        
        // 如果找到目标元素，就返回它的索引
        if (arr[pos] == target) {
            return pos;
        }
        // 如果目标元素大于pos位置的元素，就在右半部分继续查找
        else if (arr[pos] < target) {
            low = pos + 1;
        }
        // 如果目标元素小于pos位置的元素，就在左半部分继续查找
        else {
            high = pos - 1;
        }
    }
    // 如果没有找到目标元素，就返回-1
    return -1;
}

int main() {
    // 注意：插值查找要求数组是已排序的，且数据分布比较均匀
    int arr[] = {10, 20, 30, 40, 50, 60, 70, 80, 90, 100};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 70;
    
    // 调用插值查找函数
    int result = interpolationSearch(arr, n, target);
    
    // 根据查找结果输出信息
    if (result == -1) {
        printf("没有找到元素 %d\n", target);
    } else {
        printf("元素 %d 在数组中的索引是 %d\n", target, result);
    }
    
    return 0;
}
```

### 哈希查找：通过哈希表快速查找

哈希查找是一种非常高效的查找算法，它使用哈希表来存储数据。哈希表是一种特殊的数据结构，它通过哈希函数将键映射到值，从而实现快速的查找。

想象一下，你有一个特别的抽屉，每个抽屉都有一个标签。当你想放东西时，你根据东西的特点决定把它放在哪个抽屉里；当你想找东西时，你也根据同样的特点直接去对应的抽屉里找。这就是哈希查找的基本思想。

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 定义哈希表的大小
#define SIZE 10

// 定义哈希表的结构
struct HashNode {
    char* key;
    char* value;
    struct HashNode* next;
};

// 定义哈希表
struct HashTable {
    struct HashNode* table[SIZE];
};

// 函数定义：创建一个新的哈希节点
struct HashNode* createHashNode(char* key, char* value) {
    struct HashNode* newNode = (struct HashNode*)malloc(sizeof(struct HashNode));
    newNode->key = strdup(key);
    newNode->value = strdup(value);
    newNode->next = NULL;
    return newNode;
}

// 函数定义：创建一个新的哈希表
struct HashTable* createHashTable() {
    struct HashTable* hashTable = (struct HashTable*)malloc(sizeof(struct HashTable));
    for (int i = 0; i < SIZE; i = i + 1) {
        hashTable->table[i] = NULL;
    }
    return hashTable;
}

// 函数定义：哈希函数，将键映射到表中的位置
int hashFunction(char* key) {
    int hash = 0;
    for (int i = 0; key[i] != '\0'; i = i + 1) {
        hash = hash + key[i];
    }
    return hash % SIZE;
}

// 函数定义：向哈希表中插入键值对
void insert(struct HashTable* hashTable, char* key, char* value) {
    // 计算键在哈希表中的位置
    int index = hashFunction(key);
    
    // 创建一个新的哈希节点
    struct HashNode* newNode = createHashNode(key, value);
    
    // 如果该位置为空，直接插入
    if (hashTable->table[index] == NULL) {
        hashTable->table[index] = newNode;
    } else {
        // 如果该位置不为空，将新节点插入到链表的头部
        newNode->next = hashTable->table[index];
        hashTable->table[index] = newNode;
    }
}

// 函数定义：在哈希表中查找键对应的值
char* search(struct HashTable* hashTable, char* key) {
    // 计算键在哈希表中的位置
    int index = hashFunction(key);
    
    // 在该位置的链表中查找键
    struct HashNode* current = hashTable->table[index];
    while (current != NULL) {
        if (strcmp(current->key, key) == 0) {
            return current->value;
        }
        current = current->next;
    }
    
    // 如果没有找到键，返回NULL
    return NULL;
}

// 函数定义：释放哈希表的内存
void freeHashTable(struct HashTable* hashTable) {
    for (int i = 0; i < SIZE; i = i + 1) {
        struct HashNode* current = hashTable->table[i];
        while (current != NULL) {
            struct HashNode* temp = current;
            current = current->next;
            free(temp->key);
            free(temp->value);
            free(temp);
        }
    }
    free(hashTable);
}

int main() {
    // 创建一个新的哈希表
    struct HashTable* hashTable = createHashTable();
    
    // 向哈希表中插入一些键值对（姓名和对应的电话号码）
    insert(hashTable, "张三", "13800138001");
    insert(hashTable, "李四", "13800138002");
    insert(hashTable, "王五", "13800138003");
    insert(hashTable, "赵六", "13800138004");
    insert(hashTable, "孙七", "13800138005");
    
    // 查找电话号码
    char* phone = search(hashTable, "王五");
    if (phone != NULL) {
        printf("王五的电话号码是：%s\n", phone);
    } else {
        printf("没有找到王五的电话号码\n");
    }
    
    // 查找一个不存在的人的电话号码
    phone = search(hashTable, "周八");
    if (phone != NULL) {
        printf("周八的电话号码是：%s\n", phone);
    } else {
        printf("没有找到周八的电话号码\n");
    }
    
    // 释放哈希表的内存
    freeHashTable(hashTable);
    
    return 0;
}
```

## 各种查找算法的比较

不同的查找算法有不同的特点，我们可以从以下几个方面来比较它们：

1. **时间复杂度**：指查找算法执行所需要的时间
2. **空间复杂度**：指查找算法执行所需要的额外空间
3. **适用场景**：指哪种情况下适合使用该算法

| 查找算法 | 平均时间复杂度 | 最坏时间复杂度 | 空间复杂度 | 适用场景 | 就像什么 |
|---------|--------------|--------------|-----------|---------|---------|
| 线性查找 | O(n) | O(n) | O(1) | 数据量小，无序数据 | 一个一个找玩具 |
| 二分查找 | O(logn) | O(logn) | O(1) | 已排序的数据 | 按字母顺序查字典 |
| 插值查找 | O(loglogn) | O(n) | O(1) | 已排序且均匀分布的数据 | 猜电话号码簿中名字的位置 |
| 哈希查找 | O(1) | O(n) | O(n) | 需要频繁查找，且有足够的内存 | 有标签的抽屉 |

## 实战小练习

让我们来做一个练习，使用查找算法来查找学生的成绩：

```c
#include <stdio.h>
#include <string.h>

// 定义一个Student结构体
struct Student {
    char name[20];
    int score;
};

// 函数定义：线性查找学生成绩
int linearSearchStudent(struct Student students[], int n, char* name) {
    int i;
    for (i = 0; i < n; i = i + 1) {
        if (strcmp(students[i].name, name) == 0) {
            return i;
        }
    }
    return -1;
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
    
    // 要查找的学生姓名
    char targetName[20] = "小丽";
    
    // 使用线性查找查找学生成绩
    int result = linearSearchStudent(students, n, targetName);
    
    // 根据查找结果输出信息
    if (result == -1) {
        printf("没有找到学生 %s\n", targetName);
    } else {
        printf("学生 %s 的成绩是 %d\n", targetName, students[result].score);
    }
    
    return 0;
}
```

## 小结

通过这一节的学习，我们已经了解了几种常见的查找算法：

- 线性查找：最简单的查找算法，一个一个地检查每个元素
- 二分查找：更高效的查找算法，要求数据已排序，每次将查找范围缩小到原来的一半
- 插值查找：二分查找的改进版，根据目标值与数组边界值的比较，动态地确定下一次查找的位置
- 哈希查找：通过哈希表实现快速查找，平均时间复杂度可以达到O(1)

每种查找算法都有自己的特点和适用场景。在实际应用中，我们需要根据数据的特点和需求来选择合适的查找算法。

查找算法是计算机科学中的基础算法，掌握了这些算法，你就可以更好地理解计算机是如何快速找到我们需要的数据的。现在，你已经学习了C语言中的大部分基础知识和一些常用的算法，接下来就可以尝试用C语言来解决一些实际的问题了！
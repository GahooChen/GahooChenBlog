# 12. 结构体与共用体：整理你的数据

小朋友们，你们有没有整理过自己的书包？把课本放在一起，笔记本放在一起，铅笔、橡皮等文具放在铅笔盒里。在C语言中，我们也可以用结构体和共用体来整理不同类型的数据，让我们的程序更加有条理！

## 结构体：把不同类型的数据打包在一起

结构体就像是一个"数据打包盒"，可以把不同类型的数据放在一起。比如，我们可以用一个结构体来表示一个学生的信息，包括姓名、年龄、身高、成绩等。

### 结构体的定义与使用

让我们来看一个表示学生信息的结构体例子：

```c
#include <stdio.h>
#include <string.h>

// 定义一个名为Student的结构体
struct Student {
    char name[20]; // 姓名
    int age;       // 年龄
    float height;  // 身高
    float score;   // 成绩
};

int main() {
    // 创建一个Student类型的变量
    struct Student stu1;
    
    // 给结构体成员赋值
    strcpy(stu1.name, "小明"); // 注意：字符串需要使用strcpy函数赋值
    stu1.age = 10;
    stu1.height = 145.5;
    stu1.score = 92.5;
    
    // 访问结构体成员
    printf("姓名：%s\n", stu1.name);
    printf("年龄：%d岁\n", stu1.age);
    printf("身高：%.1f厘米\n", stu1.height);
    printf("成绩：%.1f分\n", stu1.score);
    
    // 也可以在定义结构体变量的同时进行初始化
    struct Student stu2 = {"小红", 9, 142.0, 88.5};
    
    printf("\n另一个学生的信息：\n");
    printf("姓名：%s\n", stu2.name);
    printf("年龄：%d岁\n", stu2.age);
    printf("身高：%.1f厘米\n", stu2.height);
    printf("成绩：%.1f分\n", stu2.score);
    
    return 0;
}
```

### 结构体数组：多个相同类型的结构体

有时候，我们需要处理多个相同类型的结构体，这时候就可以使用结构体数组。比如，我们可以用一个结构体数组来存储一个班级所有学生的信息。

```c
#include <stdio.h>
#include <string.h>

struct Student {
    char name[20];
    int age;
    float score;
};

int main() {
    // 定义一个包含3个学生的结构体数组
    struct Student class[3];
    
    // 给第一个学生赋值
    strcpy(class[0].name, "小明");
    class[0].age = 10;
    class[0].score = 92.5;
    
    // 给第二个学生赋值
    strcpy(class[1].name, "小红");
    class[1].age = 9;
    class[1].score = 88.5;
    
    // 给第三个学生赋值
    strcpy(class[2].name, "小刚");
    class[2].age = 10;
    class[2].score = 95.0;
    
    // 遍历结构体数组，输出所有学生的信息
    for (int i = 0; i < 3; i = i + 1) {
        printf("学生 %d 的信息：\n", i + 1);
        printf("姓名：%s\n", class[i].name);
        printf("年龄：%d岁\n", class[i].age);
        printf("成绩：%.1f分\n\n", class[i].score);
    }
    
    return 0;
}
```

### 结构体指针：指向结构体的指针

我们也可以使用指针来访问结构体，这样可以让程序运行得更快，尤其是在处理大型结构体时。

```c
#include <stdio.h>
#include <string.h>

struct Student {
    char name[20];
    int age;
    float score;
};

int main() {
    struct Student stu = {"小明", 10, 92.5};
    struct Student *pStu = &stu; // 定义一个指向Student类型的指针
    
    // 通过指针访问结构体成员（有两种方式）
    printf("姓名：%s\n", (*pStu).name); // 方法1：先解引用指针，再访问成员
    printf("姓名：%s\n", pStu->name);    // 方法2：使用->运算符（更常用）
    
    printf("年龄：%d岁\n", pStu->age);
    printf("成绩：%.1f分\n", pStu->score);
    
    return 0;
}
```

## 共用体：节省空间的特殊结构体

共用体是一种特殊的数据类型，它和结构体很像，但是有一个重要的区别：共用体的所有成员共享同一块内存空间！这就像是一个多功能文具盒，可以用来装铅笔，也可以用来装橡皮，但同一时间只能装一种东西。

### 共用体的定义与使用

让我们来看一个共用体的例子：

```c
#include <stdio.h>

// 定义一个名为Data的共用体
union Data {
    int i;
    float f;
    char c;
};

int main() {
    union Data data;
    
    // 使用共用体存储整数
    data.i = 100;
    printf("整数：%d\n", data.i);
    
    // 注意：当我们存储浮点数时，之前存储的整数会被覆盖
    data.f = 3.14;
    printf("浮点数：%.2f\n", data.f);
    
    // 当我们存储字符时，之前存储的浮点数会被覆盖
    data.c = 'A';
    printf("字符：%c\n", data.c);
    
    // 查看共用体占用的内存大小
    printf("共用体占用的内存大小：%d字节\n", sizeof(union Data));
    
    return 0;
}
```

### 共用体的用途

共用体通常用于以下几种情况：

1. **节省内存空间**：当我们知道在同一时间只会使用其中一个成员时，可以使用共用体来节省内存
2. **类型转换**：共用体可以用来进行不同数据类型之间的转换
3. **处理不同类型的数据**：当我们需要处理可能是不同类型的数据时，可以使用共用体

## 枚举：给数字起名字

除了结构体和共用体，C语言中还有一种叫做枚举的自定义数据类型。枚举可以让我们给一组相关的数字起一个有意义的名字，使程序更加易读。

```c
#include <stdio.h>

// 定义一个名为Weekday的枚举类型
enum Weekday {
    MONDAY,    // 默认值为0
    TUESDAY,   // 默认值为1
    WEDNESDAY, // 默认值为2
    THURSDAY,  // 默认值为3
    FRIDAY,    // 默认值为4
    SATURDAY,  // 默认值为5
    SUNDAY     // 默认值为6
};

int main() {
    enum Weekday today = WEDNESDAY;
    
    printf("今天是星期%d\n", today); // 输出：今天是星期2
    
    // 我们也可以手动指定枚举常量的值
    enum Season {
        SPRING = 1,
        SUMMER = 2,
        AUTUMN = 3,
        WINTER = 4
    };
    
    enum Season now = AUTUMN;
    printf("现在是第%d个季节\n", now); // 输出：现在是第3个季节
    
    return 0;
}
```

## 实战小练习

让我们来做一个练习，使用结构体和指针来实现一个简单的图书管理系统：

```c
#include <stdio.h>
#include <string.h>

// 定义一个Book结构体
struct Book {
    char title[50];  // 书名
    char author[30]; // 作者
    float price;     // 价格
    int pages;       // 页数
};

// 函数定义：显示图书信息
void displayBook(struct Book *book) {
    printf("书名：%s\n", book->title);
    printf("作者：%s\n", book->author);
    printf("价格：%.2f元\n", book->price);
    printf("页数：%d页\n\n", book->pages);
}

int main() {
    // 创建3本图书
    struct Book books[3];
    
    // 给第一本书赋值
    strcpy(books[0].title, "小王子");
    strcpy(books[0].author, "安托万·德·圣埃克苏佩里");
    books[0].price = 25.0;
    books[0].pages = 120;
    
    // 给第二本书赋值
    strcpy(books[1].title, "哈利波特与魔法石");
    strcpy(books[1].author, "J.K.罗琳");
    books[1].price = 49.0;
    books[1].pages = 320;
    
    // 给第三本书赋值
    strcpy(books[2].title, "西游记");
    strcpy(books[2].author, "吴承恩");
    books[2].price = 38.0;
    books[2].pages = 640;
    
    // 显示所有图书的信息
    printf("图书信息列表：\n\n");
    for (int i = 0; i < 3; i = i + 1) {
        printf("第%d本书：\n", i + 1);
        displayBook(&books[i]);
    }
    
    return 0;
}
```

## typedef：给数据类型起别名

除了结构体、共用体和枚举，C语言还有一个很有用的关键字叫做`typedef`。它可以给已经存在的数据类型起一个新的名字，就像是给你的好朋友起昵称一样。

### typedef的基本用法

让我们来看一个简单的例子：

```c
#include <stdio.h>

// 给int类型起一个新名字叫Integer
typedef int Integer;

// 给float类型起一个新名字叫Decimal
typedef float Decimal;

int main() {
    // 现在我们可以用Integer代替int，用Decimal代替float
    Integer age = 10;
    Decimal height = 145.5;
    
    printf("年龄：%d岁\n", age);
    printf("身高：%.1f厘米\n", height);
    
    return 0;
}
```

### typedef与结构体

`typedef`最常用的地方就是和结构体一起使用，可以简化结构体的声明：

```c
#include <stdio.h>
#include <string.h>

// 使用typedef给结构体起别名
typedef struct {
    char name[20];
    int age;
    float score;
} Student; // Student现在是这个结构体类型的别名

int main() {
    // 现在我们可以直接用Student而不是struct Student来定义变量
    Student stu1;
    
    strcpy(stu1.name, "小明");
    stu1.age = 10;
    stu1.score = 92.5;
    
    printf("姓名：%s\n", stu1.name);
    printf("年龄：%d岁\n", stu1.age);
    printf("成绩：%.1f分\n", stu1.score);
    
    return 0;
}
```

使用`typedef`可以让我们的代码更加简洁易读，特别是在处理复杂的数据类型时。

## 小结

通过这一节的学习，我们已经了解了结构体、共用体、枚举和typedef的基本概念和用法：

- 结构体可以把不同类型的数据打包在一起，就像整理书包一样
- 结构体数组可以存储多个相同类型的结构体
- 结构体指针可以让我们更高效地访问结构体
- 共用体的所有成员共享同一块内存空间，可以用来节省内存
- 枚举可以给一组相关的数字起一个有意义的名字，使程序更加易读

结构体、共用体和枚举都是C语言中非常有用的自定义数据类型，它们可以帮助我们更好地组织和管理数据。下一节我们将学习文件操作，它可以让我们的程序能够读写文件，保存我们的创作成果！
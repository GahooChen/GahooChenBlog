# C++多线程编程：并发与同步技术

上一节课我们学习了C++的内存模型和内存管理机制，这是理解C++程序性能和行为的关键。在这节课中，我们将探讨C++的多线程编程，这是现代C++程序开发中的一个重要主题。

## 多线程编程概述

多线程编程是指在一个程序中同时执行多个线程，每个线程可以独立运行不同的代码。多线程编程的主要目的是提高程序的性能和响应性，特别是在多核处理器上，可以充分利用硬件资源。

在C++11之前，C++标准库中没有提供多线程编程的支持，程序员需要使用平台特定的API（如Windows的Win32 API或POSIX的pthread库）来进行多线程编程。C++11引入了标准的多线程库，使多线程编程变得更加简单和可移植。

## C++11多线程库

C++11引入的多线程库主要包含以下组件：

1. **`std::thread`**：线程类，用于创建和管理线程
2. **`std::mutex`**、**`std::recursive_mutex`**、**`std::timed_mutex`**、**`std::recursive_timed_mutex`**：互斥量，用于保护共享数据
3. **`std::lock_guard`**、**`std::unique_lock`**：锁包装器，用于自动管理互斥量的锁定和解锁
4. **`std::condition_variable`**、**`std::condition_variable_any`**：条件变量，用于线程间的通信
5. **`std::atomic`**：原子类型，用于无锁编程
6. **`std::future`**、**`std::promise`**、**`std::packaged_task`**：用于异步任务和获取异步结果
7. **`std::call_once`**、**`std::once_flag`**：用于确保某个函数只被调用一次

这些组件都定义在`<thread>`、`<mutex>`、`<condition_variable>`、`<atomic>`和`<future>`等头文件中。

## 线程的创建和管理

### 创建线程

在C++11中，我们可以使用`std::thread`类来创建线程。`std::thread`的构造函数接受一个可调用对象（函数、函数对象、lambda表达式等）作为参数，该对象将在线程中执行。

```cpp
#include <iostream>
#include <thread>

// 普通函数
void function1() {
    std::cout << "Hello from function1!" << std::endl;
}

// 函数对象
class FunctionObject {
public:
    void operator()() {
        std::cout << "Hello from FunctionObject!" << std::endl;
    }
};

int main() {
    // 使用普通函数创建线程
    std::thread t1(function1);
    
    // 使用函数对象创建线程
    FunctionObject fo;
    std::thread t2(fo);
    
    // 使用lambda表达式创建线程
    std::thread t3([]() {
        std::cout << "Hello from lambda expression!" << std::endl;
    });
    
    // 等待线程完成
    t1.join();
    t2.join();
    t3.join();
    
    std::cout << "All threads completed!" << std::endl;
    
    return 0;
}
```

### 传递参数给线程函数

我们可以向`std::thread`的构造函数传递额外的参数，这些参数将被传递给线程函数。

```cpp
#include <iostream>
#include <thread>
#include <string>

void print_message(const std::string& message, int count) {
    for (int i = 0; i < count; ++i) {
        std::cout << message << " (" << i + 1 << "/" << count << ")" << std::endl;
    }
}

int main() {
    // 传递参数给线程函数
    std::thread t(print_message, "Hello, World!", 5);
    
    // 等待线程完成
    t.join();
    
    return 0;
}
```

需要注意的是，`std::thread`的构造函数会复制或移动参数，而不是引用。如果我们想要传递引用，需要使用`std::ref`或`std::cref`。

```cpp
#include <iostream>
#include <thread>
#include <string>

void modify_string(std::string& str) {
    str += " (modified by thread)";
}

int main() {
    std::string message = "Hello, World!";
    
    // 使用std::ref传递引用
    std::thread t(modify_string, std::ref(message));
    
    // 等待线程完成
    t.join();
    
    std::cout << message << std::endl;  // 输出: Hello, World! (modified by thread)
    
    return 0;
}
```

### 线程的join和detach

`std::thread`提供了两个重要的成员函数：`join()`和`detach()`。

- `join()`：阻塞当前线程，直到被调用的线程完成执行
- `detach()`：将线程与`std::thread`对象分离，线程继续独立执行，`std::thread`对象不再拥有线程

如果一个`std::thread`对象在销毁时既没有被`join`也没有被`detach`，程序会终止。

```cpp
#include <iostream>
#include <thread>
#include <chrono>

void function() {
    for (int i = 0; i < 5; ++i) {
        std::cout << "Thread function executing..." << std::endl;
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }
}

int main() {
    std::thread t(function);
    
    // 检查线程是否可joinable
    if (t.joinable()) {
        // 使用join等待线程完成
        // t.join();
        
        // 或者使用detach让线程独立执行
        t.detach();
    }
    
    // 如果使用detach，主线程需要等待一段时间，否则可能主线程结束时，子线程还没有执行完
    if (t.joinable() == false) {
        std::cout << "Thread detached, main thread waiting..." << std::endl;
        std::this_thread::sleep_for(std::chrono::seconds(6));
    }
    
    std::cout << "Main thread exiting..." << std::endl;
    
    return 0;
}
```

## 线程同步

当多个线程访问共享数据时，如果不进行同步，可能会导致数据竞争和未定义行为。C++提供了多种同步原语来解决这个问题。

### 互斥量（Mutex）

互斥量是最基本的同步原语，它用于保护共享数据，确保同一时间只有一个线程可以访问共享数据。

```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <vector>

std::mutex g_mutex;  // 全局互斥量
int g_counter = 0;   // 全局共享数据

void increment_counter(int iterations) {
    for (int i = 0; i < iterations; ++i) {
        // 锁定互斥量
        g_mutex.lock();
        
        // 临界区：访问共享数据
        ++g_counter;
        
        // 解锁互斥量
        g_mutex.unlock();
    }
}

int main() {
    std::vector<std::thread> threads;
    
    // 创建多个线程，每个线程都增加计数器
    for (int i = 0; i < 10; ++i) {
        threads.push_back(std::thread(increment_counter, 1000));
    }
    
    // 等待所有线程完成
    for (auto& t : threads) {
        t.join();
    }
    
    std::cout << "Final counter value: " << g_counter << std::endl;  // 应该输出: 10000
    
    return 0;
}
```

直接使用`lock()`和`unlock()`可能会导致问题，例如如果在临界区抛出异常，互斥量可能永远不会被解锁。为了解决这个问题，C++提供了锁包装器。

### 锁包装器

C++提供了两种主要的锁包装器：`std::lock_guard`和`std::unique_lock`。

#### std::lock_guard

`std::lock_guard`是一个简单的锁包装器，它在构造时锁定互斥量，在析构时解锁互斥量。`std::lock_guard`确保即使在抛出异常的情况下，互斥量也能被正确解锁。

```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <vector>

std::mutex g_mutex;  // 全局互斥量
int g_counter = 0;   // 全局共享数据

void increment_counter(int iterations) {
    for (int i = 0; i < iterations; ++i) {
        // 创建lock_guard，自动锁定互斥量
        std::lock_guard<std::mutex> lock(g_mutex);
        
        // 临界区：访问共享数据
        ++g_counter;
        
        // lock_guard析构时自动解锁互斥量
    }
}

int main() {
    std::vector<std::thread> threads;
    
    // 创建多个线程，每个线程都增加计数器
    for (int i = 0; i < 10; ++i) {
        threads.push_back(std::thread(increment_counter, 1000));
    }
    
    // 等待所有线程完成
    for (auto& t : threads) {
        t.join();
    }
    
    std::cout << "Final counter value: " << g_counter << std::endl;  // 应该输出: 10000
    
    return 0;
}
```

#### std::unique_lock

`std::unique_lock`是一个更灵活的锁包装器，它提供了更多的功能，如延迟锁定、尝试锁定、手动锁定和解锁等。

```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <vector>

std::mutex g_mutex;  // 全局互斥量
int g_counter = 0;   // 全局共享数据

void increment_counter(int iterations) {
    for (int i = 0; i < iterations; ++i) {
        // 创建unique_lock，延迟锁定
        std::unique_lock<std::mutex> lock(g_mutex, std::defer_lock);
        
        // 手动锁定
        lock.lock();
        
        // 临界区：访问共享数据
        ++g_counter;
        
        // 可以手动解锁，也可以让unique_lock在析构时自动解锁
        lock.unlock();
        
        // 在两次锁定之间可以执行其他操作
    }
}

int main() {
    std::vector<std::thread> threads;
    
    // 创建多个线程，每个线程都增加计数器
    for (int i = 0; i < 10; ++i) {
        threads.push_back(std::thread(increment_counter, 1000));
    }
    
    // 等待所有线程完成
    for (auto& t : threads) {
        t.join();
    }
    
    std::cout << "Final counter value: " << g_counter << std::endl;  // 应该输出: 10000
    
    return 0;
}
```

### 条件变量

条件变量用于线程间的通信，它允许一个线程等待某个条件成立，而另一个线程在条件成立时通知等待的线程。

```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <queue>

std::mutex g_mutex;
std::condition_variable g_cv;
std::queue<int> g_queue;
bool g_done = false;

// 生产者线程函数
void producer() {
    for (int i = 0; i < 10; ++i) {
        // 模拟生产过程
        std::this_thread::sleep_for(std::chrono::milliseconds(500));
        
        {   
            std::lock_guard<std::mutex> lock(g_mutex);
            g_queue.push(i);
            std::cout << "Producer: produced " << i << std::endl;
        }
        
        // 通知消费者线程有新的数据可用
        g_cv.notify_one();
    }
    
    // 通知消费者线程生产已完成
    {   
        std::lock_guard<std::mutex> lock(g_mutex);
        g_done = true;
    }
    g_cv.notify_one();
}

// 消费者线程函数
void consumer() {
    while (true) {
        std::unique_lock<std::mutex> lock(g_mutex);
        
        // 等待直到队列非空或生产完成
        g_cv.wait(lock, []{ return !g_queue.empty() || g_done; });
        
        // 处理队列中的数据
        while (!g_queue.empty()) {
            int value = g_queue.front();
            g_queue.pop();
            std::cout << "Consumer: consumed " << value << std::endl;
        }
        
        // 如果生产已完成且队列为空，退出循环
        if (g_done && g_queue.empty()) {
            break;
        }
    }
}

int main() {
    std::thread producer_thread(producer);
    std::thread consumer_thread(consumer);
    
    producer_thread.join();
    consumer_thread.join();
    
    std::cout << "All done!" << std::endl;
    
    return 0;
}
```

## 原子操作

原子操作是指不可被中断的操作，在多线程环境中，原子操作可以确保操作的完整性，避免数据竞争。C++11引入了`std::atomic`模板类，用于实现原子操作。

```cpp
#include <iostream>
#include <thread>
#include <atomic>
#include <vector>

std::atomic<int> g_counter(0);  // 原子变量

void increment_counter(int iterations) {
    for (int i = 0; i < iterations; ++i) {
        // 原子操作：递增计数器
        ++g_counter;
        
        // 或者使用fetch_add
        // g_counter.fetch_add(1);
    }
}

int main() {
    std::vector<std::thread> threads;
    
    // 创建多个线程，每个线程都增加计数器
    for (int i = 0; i < 10; ++i) {
        threads.push_back(std::thread(increment_counter, 1000));
    }
    
    // 等待所有线程完成
    for (auto& t : threads) {
        t.join();
    }
    
    std::cout << "Final counter value: " << g_counter << std::endl;  // 应该输出: 10000
    
    return 0;
}
```

## 异步编程

C++11引入了`std::future`、`std::promise`和`std::packaged_task`等组件，用于异步编程。这些组件使我们可以在一个线程中启动任务，然后在另一个线程中获取任务的结果。

### std::future和std::promise

`std::promise`用于存储一个值，而`std::future`用于获取这个值。`std::promise`和`std::future`通常配合使用，用于线程间的数据传输。

```cpp
#include <iostream>
#include <thread>
#include <future>

void calculate_sum(std::promise<int> promise, int a, int b) {
    // 模拟耗时计算
    std::this_thread::sleep_for(std::chrono::seconds(2));
    
    // 计算结果并设置到promise中
    int result = a + b;
    promise.set_value(result);
}

int main() {
    // 创建promise和future
    std::promise<int> sum_promise;
    std::future<int> sum_future = sum_promise.get_future();
    
    // 启动线程执行计算
    std::thread t(calculate_sum, std::move(sum_promise), 10, 20);
    
    // 在主线程中做其他事情
    std::cout << "Main thread continues to do other work..." << std::endl;
    
    // 获取计算结果（如果结果还没准备好，会阻塞直到结果准备好）
    int result = sum_future.get();
    std::cout << "Result: " << result << std::endl;  // 应该输出: 30
    
    // 等待线程完成
    t.join();
    
    return 0;
}
```

### std::async

`std::async`是一个更高级的异步编程工具，它可以自动创建线程并返回一个`std::future`对象，我们可以通过这个对象获取异步操作的结果。

```cpp
#include <iostream>
#include <future>

int calculate_sum(int a, int b) {
    // 模拟耗时计算
    std::this_thread::sleep_for(std::chrono::seconds(2));
    
    return a + b;
}

int main() {
    // 使用std::async启动异步操作
    std::future<int> future_result = std::async(calculate_sum, 10, 20);
    
    // 在主线程中做其他事情
    std::cout << "Main thread continues to do other work..." << std::endl;
    
    // 获取计算结果
    int result = future_result.get();
    std::cout << "Result: " << result << std::endl;  // 应该输出: 30
    
    return 0;
}
```

`std::async`有一个启动策略参数，可以控制是否创建新线程：

- `std::launch::async`：立即创建新线程执行任务
- `std::launch::deferred`：延迟执行任务，直到调用`get()`或`wait()`时才在当前线程中执行
- `std::launch::async | std::launch::deferred`：由实现决定是创建新线程还是延迟执行（默认策略）

```cpp
// 指定启动策略
std::future<int> future_result = std::async(std::launch::async, calculate_sum, 10, 20);
```

## 线程安全

线程安全是指一个函数或数据结构可以被多个线程同时访问而不会产生数据竞争或未定义行为。为了确保线程安全，我们需要使用适当的同步机制。

### 线程安全的单例模式

单例模式是一种常见的设计模式，它确保一个类只有一个实例，并提供一个全局访问点。在多线程环境中，实现线程安全的单例模式需要特别注意。

```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <vector>

class Singleton {
public:
    // 获取单例实例的静态方法
    static Singleton& getInstance() {
        // C++11及以上版本保证静态局部变量的初始化是线程安全的
        static Singleton instance;
        return instance;
    }
    
    // 禁止拷贝构造函数
    Singleton(const Singleton&) = delete;
    
    // 禁止拷贝赋值运算符
    Singleton& operator=(const Singleton&) = delete;
    
    // 一些公共方法
    void doSomething() {
        std::cout << "Singleton is doing something..." << std::endl;
    }
    
private:
    // 私有构造函数
    Singleton() {
        std::cout << "Singleton instance created" << std::endl;
    }
    
    // 私有析构函数
    ~Singleton() {
        std::cout << "Singleton instance destroyed" << std::endl;
    }
};

void use_singleton() {
    // 获取单例实例并使用
    Singleton& instance = Singleton::getInstance();
    instance.doSomething();
}

int main() {
    std::vector<std::thread> threads;
    
    // 创建多个线程，每个线程都使用单例
    for (int i = 0; i < 5; ++i) {
        threads.push_back(std::thread(use_singleton));
    }
    
    // 等待所有线程完成
    for (auto& t : threads) {
        t.join();
    }
    
    return 0;
}
```

### 线程安全的数据结构

在C++标准库中，大多数数据结构（如`std::vector`、`std::map`、`std::string`等）都不是线程安全的。如果多个线程需要同时访问这些数据结构，我们需要使用同步机制来确保线程安全。

```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <vector>
#include <algorithm>

class ThreadSafeVector {
public:
    // 添加元素
    void push_back(int value) {
        std::lock_guard<std::mutex> lock(m_mutex);
        m_vector.push_back(value);
    }
    
    // 获取元素个数
    size_t size() const {
        std::lock_guard<std::mutex> lock(m_mutex);
        return m_vector.size();
    }
    
    // 检查元素是否存在
    bool contains(int value) const {
        std::lock_guard<std::mutex> lock(m_mutex);
        return std::find(m_vector.begin(), m_vector.end(), value) != m_vector.end();
    }
    
    // 打印所有元素
    void print() const {
        std::lock_guard<std::mutex> lock(m_mutex);
        std::cout << "Vector contents: ";
        for (int value : m_vector) {
            std::cout << value << " ";
        }
        std::cout << std::endl;
    }
    
private:
    std::vector<int> m_vector;
    mutable std::mutex m_mutex;  // mutable关键字允许在const方法中修改
};

void add_elements(ThreadSafeVector& vector, int start, int count) {
    for (int i = 0; i < count; ++i) {
        vector.push_back(start + i);
        std::this_thread::sleep_for(std::chrono::milliseconds(10));
    }
}

int main() {
    ThreadSafeVector vector;
    
    // 创建两个线程，分别向vector中添加元素
    std::thread t1(add_elements, std::ref(vector), 1, 10);
    std::thread t2(add_elements, std::ref(vector), 100, 10);
    
    // 等待线程完成
    t1.join();
    t2.join();
    
    // 打印vector的内容
    vector.print();
    std::cout << "Vector size: " << vector.size() << std::endl;
    std::cout << "Vector contains 5: " << (vector.contains(5) ? "yes" : "no") << std::endl;
    
    return 0;
}
```

## 多线程编程最佳实践

多线程编程是一个复杂的主题，容易出现各种问题。以下是一些多线程编程的最佳实践：

1. **尽量减少共享数据**：共享数据是多线程问题的主要来源，应尽量减少共享数据的使用
2. **使用不可变对象**：不可变对象天然是线程安全的，不需要同步
3. **使用局部变量**：局部变量存储在栈中，每个线程有自己的栈，因此局部变量是线程安全的
4. **使用线程安全的数据结构**：在C++17中，标准库提供了一些线程安全的数据结构，如`std::shared_mutex`等
5. **使用RAII管理锁**：使用`std::lock_guard`或`std::unique_lock`来自动管理锁的获取和释放
6. **避免死锁**：死锁是指两个或多个线程互相等待对方持有的资源，导致所有线程都无法继续执行。避免死锁的方法包括：
   - 按固定顺序获取锁
   - 避免在持有锁的情况下调用未知函数
   - 使用`std::lock`同时获取多个锁
7. **使用`std::atomic`进行简单的原子操作**：对于简单的计数、标志等操作，使用`std::atomic`比使用互斥量更高效
8. **使用高级同步原语**：`std::condition_variable`、`std::future`等高级同步原语可以使代码更简洁、更易维护
9. **避免过度同步**：过度同步会导致性能下降，应只同步必要的代码区域
10. **使用工具检测数据竞争**：如Valgrind的Helgrind工具、ThreadSanitizer等

## 练习时间

让我们来做一些练习，巩固一下这节课所学的知识：

1. 编写一个程序，创建多个线程并等待它们完成
2. 使用互斥量和锁包装器保护共享数据
3. 使用条件变量实现生产者-消费者模式
4. 使用`std::atomic`实现线程安全的计数器
5. 使用`std::future`和`std::promise`实现线程间的数据传输
6. 使用`std::async`启动异步任务
7. 实现一个线程安全的队列
8. 分析并修复一个包含多线程问题的程序

## 小结

在这节课中，我们学习了C++的多线程编程，包括：

- C++11多线程库的主要组件（`std::thread`、互斥量、锁包装器、条件变量、原子类型、`std::future`等）
- 线程的创建和管理（创建线程、传递参数、`join`和`detach`）
- 线程同步机制（互斥量、锁包装器、条件变量、原子操作）
- 异步编程（`std::future`、`std::promise`、`std::async`）
- 线程安全的实现方法
- 多线程编程的最佳实践

多线程编程是现代C++程序开发中的一个重要主题，它可以充分利用多核处理器的性能，提高程序的响应性和吞吐量。但是，多线程编程也带来了一些挑战，如数据竞争、死锁等问题。通过遵循多线程编程的最佳实践，我们可以编写高效、可靠的多线程程序。在下一节课中，我们将学习C++的移动语义和右值引用，这是C++11引入的重要特性，可以提高程序的性能！
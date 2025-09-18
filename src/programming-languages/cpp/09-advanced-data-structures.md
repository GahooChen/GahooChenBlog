# C++高级数据结构

在C++中，除了基本的数据结构（如数组、链表、栈、队列等），还有一些更复杂的高级数据结构，这些数据结构在解决特定问题时非常有用。本章将介绍几种常见的高级数据结构，包括树、图、哈希表等，并通过C++代码实现它们的基本功能。

## 树

树是一种非线性数据结构，它由节点组成，节点之间通过边连接。树的特点是没有环路，并且有一个根节点，所有其他节点都是根节点的后代。

### 二叉树

二叉树是一种特殊的树，每个节点最多有两个子节点，分别称为左子节点和右子节点。

```cpp
#include <iostream>
#include <memory>

// 二叉树节点类
template <typename T>
class TreeNode {
public:
    T data;
    std::shared_ptr<TreeNode<T>> left;
    std::shared_ptr<TreeNode<T>> right;
    
    // 构造函数
    TreeNode(const T& value) : data(value), left(nullptr), right(nullptr) {}
};

// 二叉树类
template <typename T>
class BinaryTree {
private:
    std::shared_ptr<TreeNode<T>> root;
    
    // 递归插入节点
    std::shared_ptr<TreeNode<T>> insertRecursive(std::shared_ptr<TreeNode<T>> node, const T& value) {
        if (!node) {
            return std::make_shared<TreeNode<T>>(value);
        }
        
        if (value < node->data) {
            node->left = insertRecursive(node->left, value);
        } else if (value > node->data) {
            node->right = insertRecursive(node->right, value);
        }
        
        return node;
    }
    
    // 递归中序遍历
    void inorderTraversalRecursive(std::shared_ptr<TreeNode<T>> node) const {
        if (node) {
            inorderTraversalRecursive(node->left);
            std::cout << node->data << " ";
            inorderTraversalRecursive(node->right);
        }
    }
    
    // 递归查找节点
    bool searchRecursive(std::shared_ptr<TreeNode<T>> node, const T& value) const {
        if (!node) {
            return false;
        }
        
        if (node->data == value) {
            return true;
        }
        
        if (value < node->data) {
            return searchRecursive(node->left, value);
        } else {
            return searchRecursive(node->right, value);
        }
    }
    
    // 查找最小值节点（用于删除操作）
    std::shared_ptr<TreeNode<T>> findMinNode(std::shared_ptr<TreeNode<T>> node) const {
        std::shared_ptr<TreeNode<T>> current = node;
        while (current && current->left) {
            current = current->left;
        }
        return current;
    }
    
    // 递归删除节点
    std::shared_ptr<TreeNode<T>> deleteRecursive(std::shared_ptr<TreeNode<T>> node, const T& value) {
        if (!node) {
            return nullptr;
        }
        
        if (value < node->data) {
            node->left = deleteRecursive(node->left, value);
        } else if (value > node->data) {
            node->right = deleteRecursive(node->right, value);
        } else {
            // 节点有0个或1个子节点
            if (!node->left) {
                return node->right;
            } else if (!node->right) {
                return node->left;
            }
            
            // 节点有2个子节点，找到右子树中的最小值节点
            std::shared_ptr<TreeNode<T>> minNode = findMinNode(node->right);
            
            // 用最小值替换当前节点的值
            node->data = minNode->data;
            
            // 删除最小值节点
            node->right = deleteRecursive(node->right, minNode->data);
        }
        
        return node;
    }
    
public:
    // 构造函数
    BinaryTree() : root(nullptr) {}
    
    // 插入节点
    void insert(const T& value) {
        root = insertRecursive(root, value);
    }
    
    // 中序遍历（左-根-右）
    void inorderTraversal() const {
        inorderTraversalRecursive(root);
        std::cout << std::endl;
    }
    
    // 查找节点
    bool search(const T& value) const {
        return searchRecursive(root, value);
    }
    
    // 删除节点
    void remove(const T& value) {
        root = deleteRecursive(root, value);
    }
};

int main() {
    BinaryTree<int> tree;
    
    // 插入元素
    tree.insert(50);
    tree.insert(30);
    tree.insert(20);
    tree.insert(40);
    tree.insert(70);
    tree.insert(60);
    tree.insert(80);
    
    // 中序遍历（应该输出排序后的结果）
    std::cout << "中序遍历：";
    tree.inorderTraversal();  // 输出：20 30 40 50 60 70 80
    
    // 查找元素
    std::cout << "查找30：" << (tree.search(30) ? "存在" : "不存在") << std::endl;  // 输出：存在
    std::cout << "查找90：" << (tree.search(90) ? "存在" : "不存在") << std::endl;  // 输出：不存在
    
    // 删除元素
    std::cout << "删除30后，中序遍历：";
    tree.remove(30);
    tree.inorderTraversal();  // 输出：20 40 50 60 70 80
    
    return 0;
}
```

### 1.2 二叉搜索树

二叉搜索树是一种特殊的二叉树，它满足以下性质：
- 左子树中的所有节点的值都小于根节点的值
- 右子树中的所有节点的值都大于根节点的值
- 左子树和右子树也都是二叉搜索树

上面的代码实现的就是一个二叉搜索树，它支持插入、删除、查找和遍历操作。二叉搜索树的查找、插入和删除操作的平均时间复杂度都是O(log n)。

### 1.3 AVL树

AVL树是一种自平衡的二叉搜索树，它通过旋转操作来保持树的平衡，从而保证查找、插入和删除操作的时间复杂度始终为O(log n)。

```cpp
#include <iostream>
#include <memory>
#include <algorithm>

// AVL树节点类
template <typename T>
class AVLNode {
public:
    T data;
    std::shared_ptr<AVLNode<T>> left;
    std::shared_ptr<AVLNode<T>> right;
    int height;
    
    // 构造函数
    AVLNode(const T& value) : data(value), left(nullptr), right(nullptr), height(1) {}
};

// AVL树类
template <typename T>
class AVLTree {
private:
    std::shared_ptr<AVLNode<T>> root;
    
    // 获取节点的高度
    int getHeight(std::shared_ptr<AVLNode<T>> node) const {
        if (!node) {
            return 0;
        }
        return node->height;
    }
    
    // 获取平衡因子（左子树高度减去右子树高度）
    int getBalanceFactor(std::shared_ptr<AVLNode<T>> node) const {
        if (!node) {
            return 0;
        }
        return getHeight(node->left) - getHeight(node->right);
    }
    
    // 更新节点的高度
    void updateHeight(std::shared_ptr<AVLNode<T>> node) {
        if (node) {
            node->height = 1 + std::max(getHeight(node->left), getHeight(node->right));
        }
    }
    
    // 右旋操作
    std::shared_ptr<AVLNode<T>> rightRotate(std::shared_ptr<AVLNode<T>> y) {
        std::shared_ptr<AVLNode<T>> x = y->left;
        std::shared_ptr<AVLNode<T>> T2 = x->right;
        
        // 执行旋转
        x->right = y;
        y->left = T2;
        
        // 更新高度
        updateHeight(y);
        updateHeight(x);
        
        return x;
    }
    
    // 左旋操作
    std::shared_ptr<AVLNode<T>> leftRotate(std::shared_ptr<AVLNode<T>> x) {
        std::shared_ptr<AVLNode<T>> y = x->right;
        std::shared_ptr<AVLNode<T>> T2 = y->left;
        
        // 执行旋转
        y->left = x;
        x->right = T2;
        
        // 更新高度
        updateHeight(x);
        updateHeight(y);
        
        return y;
    }
    
    // 递归插入节点
    std::shared_ptr<AVLNode<T>> insertRecursive(std::shared_ptr<AVLNode<T>> node, const T& value) {
        // 1. 执行标准BST插入
        if (!node) {
            return std::make_shared<AVLNode<T>>(value);
        }
        
        if (value < node->data) {
            node->left = insertRecursive(node->left, value);
        } else if (value > node->data) {
            node->right = insertRecursive(node->right, value);
        } else {
            // 不允许重复值
            return node;
        }
        
        // 2. 更新当前节点的高度
        updateHeight(node);
        
        // 3. 获取平衡因子，检查是否需要旋转
        int balance = getBalanceFactor(node);
        
        // 4. 如果节点不平衡，则有4种情况
        
        // 左左情况：右旋
        if (balance > 1 && value < node->left->data) {
            return rightRotate(node);
        }
        
        // 右右情况：左旋
        if (balance < -1 && value > node->right->data) {
            return leftRotate(node);
        }
        
        // 左右情况：先左旋后右旋
        if (balance > 1 && value > node->left->data) {
            node->left = leftRotate(node->left);
            return rightRotate(node);
        }
        
        // 右左情况：先右旋后左旋
        if (balance < -1 && value < node->right->data) {
            node->right = rightRotate(node->right);
            return leftRotate(node);
        }
        
        // 返回未改变的节点指针
        return node;
    }
    
    // 递归中序遍历
    void inorderTraversalRecursive(std::shared_ptr<AVLNode<T>> node) const {
        if (node) {
            inorderTraversalRecursive(node->left);
            std::cout << node->data << " ";
            inorderTraversalRecursive(node->right);
        }
    }
    
public:
    // 构造函数
    AVLTree() : root(nullptr) {}
    
    // 插入节点
    void insert(const T& value) {
        root = insertRecursive(root, value);
    }
    
    // 中序遍历
    void inorderTraversal() const {
        inorderTraversalRecursive(root);
        std::cout << std::endl;
    }
};

int main() {
    AVLTree<int> tree;
    
    // 插入元素
    tree.insert(10);
    tree.insert(20);
    tree.insert(30);  // 这里会触发右旋操作，保持树的平衡
    tree.insert(40);
    tree.insert(50);
    tree.insert(25);  // 这里会触发左旋操作，保持树的平衡
    
    // 中序遍历
    std::cout << "中序遍历：";
    tree.inorderTraversal();  // 输出：10 20 25 30 40 50
    
    return 0;
}
```

## 2. 图

图是一种比树更通用的数据结构，它由节点（顶点）和边组成，边可以连接任意两个节点。图可以是有向的或无向的，可以有权重或无权重。

### 2.1 图的表示方法

图的表示方法主要有两种：邻接矩阵和邻接表。

#### 2.1.1 邻接矩阵

邻接矩阵使用一个二维数组来表示图，数组的行和列都代表图的顶点，如果顶点i和顶点j之间有边，则数组中对应的元素为1（或边的权重），否则为0。

```cpp
#include <iostream>
#include <vector>

// 图类（使用邻接矩阵表示）
class Graph {
private:
    int numVertices;
    std::vector<std::vector<int>> adjMatrix;
    
public:
    // 构造函数
    Graph(int n) : numVertices(n), adjMatrix(n, std::vector<int>(n, 0)) {}
    
    // 添加边（无向图）
    void addEdge(int src, int dest, int weight = 1) {
        // 检查顶点是否有效
        if (src >= 0 && src < numVertices && dest >= 0 && dest < numVertices) {
            adjMatrix[src][dest] = weight;
            adjMatrix[dest][src] = weight;  // 无向图，所以两个方向都要设置
        }
    }
    
    // 移除边（无向图）
    void removeEdge(int src, int dest) {
        // 检查顶点是否有效
        if (src >= 0 && src < numVertices && dest >= 0 && dest < numVertices) {
            adjMatrix[src][dest] = 0;
            adjMatrix[dest][src] = 0;  // 无向图，所以两个方向都要设置
        }
    }
    
    // 打印图
    void printGraph() const {
        std::cout << "邻接矩阵表示：" << std::endl;
        std::cout << "  ";
        for (int i = 0; i < numVertices; ++i) {
            std::cout << i << " ";
        }
        std::cout << std::endl;
        
        for (int i = 0; i < numVertices; ++i) {
            std::cout << i << " ";
            for (int j = 0; j < numVertices; ++j) {
                std::cout << adjMatrix[i][j] << " ";
            }
            std::cout << std::endl;
        }
    }
    
    // 检查两个顶点之间是否有边
    bool hasEdge(int src, int dest) const {
        if (src >= 0 && src < numVertices && dest >= 0 && dest < numVertices) {
            return adjMatrix[src][dest] != 0;
        }
        return false;
    }
};

int main() {
    // 创建一个有5个顶点的图
    Graph g(5);
    
    // 添加边
    g.addEdge(0, 1);
    g.addEdge(0, 4);
    g.addEdge(1, 2);
    g.addEdge(1, 3);
    g.addEdge(1, 4);
    g.addEdge(2, 3);
    g.addEdge(3, 4);
    
    // 打印图
    g.printGraph();
    
    // 检查边是否存在
    std::cout << "顶点0和顶点1之间有边：" << (g.hasEdge(0, 1) ? "是" : "否") << std::endl;
    std::cout << "顶点0和顶点2之间有边：" << (g.hasEdge(0, 2) ? "是" : "否") << std::endl;
    
    // 移除边
    g.removeEdge(0, 1);
    std::cout << "移除顶点0和顶点1之间的边后：" << std::endl;
    std::cout << "顶点0和顶点1之间有边：" << (g.hasEdge(0, 1) ? "是" : "否") << std::endl;
    
    return 0;
}
```

#### 2.1.2 邻接表

邻接表使用一个数组或向量，其中每个元素是一个列表（或向量），表示与该顶点相邻的所有顶点。

```cpp
#include <iostream>
#include <vector>
#include <list>

// 图类（使用邻接表表示）
class Graph {
private:
    int numVertices;
    std::vector<std::list<int>> adjList;
    
public:
    // 构造函数
    Graph(int n) : numVertices(n), adjList(n) {}
    
    // 添加边（无向图）
    void addEdge(int src, int dest) {
        // 检查顶点是否有效
        if (src >= 0 && src < numVertices && dest >= 0 && dest < numVertices) {
            adjList[src].push_back(dest);
            adjList[dest].push_back(src);  // 无向图，所以两个方向都要添加
        }
    }
    
    // 移除边（无向图）
    void removeEdge(int src, int dest) {
        // 检查顶点是否有效
        if (src >= 0 && src < numVertices && dest >= 0 && dest < numVertices) {
            adjList[src].remove(dest);
            adjList[dest].remove(src);  // 无向图，所以两个方向都要移除
        }
    }
    
    // 打印图
    void printGraph() const {
        std::cout << "邻接表表示：" << std::endl;
        for (int i = 0; i < numVertices; ++i) {
            std::cout << "顶点" << i << " -> ";
            for (int neighbor : adjList[i]) {
                std::cout << neighbor << " -> ";
            }
            std::cout << "nullptr" << std::endl;
        }
    }
    
    // 检查两个顶点之间是否有边
    bool hasEdge(int src, int dest) const {
        if (src >= 0 && src < numVertices && dest >= 0 && dest < numVertices) {
            for (int neighbor : adjList[src]) {
                if (neighbor == dest) {
                    return true;
                }
            }
        }
        return false;
    }
    
    // BFS遍历
    void BFS(int start) const {
        std::vector<bool> visited(numVertices, false);
        std::list<int> queue;
        
        // 标记起始顶点为已访问，并加入队列
        visited[start] = true;
        queue.push_back(start);
        
        while (!queue.empty()) {
            // 出队一个顶点
            int vertex = queue.front();
            std::cout << vertex << " ";
            queue.pop_front();
            
            // 将所有未访问的邻接顶点入队
            for (int neighbor : adjList[vertex]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push_back(neighbor);
                }
            }
        }
        std::cout << std::endl;
    }
    
    // DFS遍历（递归实现）
    void DFS(int start) const {
        std::vector<bool> visited(numVertices, false);
        DFSUtil(start, visited);
        std::cout << std::endl;
    }
    
private:
    // DFS辅助函数
    void DFSUtil(int vertex, std::vector<bool>& visited) const {
        // 标记当前顶点为已访问
        visited[vertex] = true;
        std::cout << vertex << " ";
        
        // 递归访问所有未访问的邻接顶点
        for (int neighbor : adjList[vertex]) {
            if (!visited[neighbor]) {
                DFSUtil(neighbor, visited);
            }
        }
    }
};

int main() {
    // 创建一个有5个顶点的图
    Graph g(5);
    
    // 添加边
    g.addEdge(0, 1);
    g.addEdge(0, 4);
    g.addEdge(1, 2);
    g.addEdge(1, 3);
    g.addEdge(1, 4);
    g.addEdge(2, 3);
    g.addEdge(3, 4);
    
    // 打印图
    g.printGraph();
    
    // 检查边是否存在
    std::cout << "顶点0和顶点1之间有边：" << (g.hasEdge(0, 1) ? "是" : "否") << std::endl;
    std::cout << "顶点0和顶点2之间有边：" << (g.hasEdge(0, 2) ? "是" : "否") << std::endl;
    
    // BFS遍历
    std::cout << "从顶点0开始的BFS遍历：";
    g.BFS(0);
    
    // DFS遍历
    std::cout << "从顶点0开始的DFS遍历：";
    g.DFS(0);
    
    return 0;
}
```

### 2.2 图的遍历算法

图的遍历是指从图中的某个顶点出发，按照某种方法访问图中的所有顶点，且每个顶点仅被访问一次。常见的图遍历算法有两种：广度优先搜索（BFS）和深度优先搜索（DFS）。

上面的代码已经实现了这两种遍历算法，下面我们来看一下它们的具体实现和应用。

#### 2.2.1 广度优先搜索（BFS）

BFS从起始顶点出发，首先访问起始顶点的所有相邻顶点，然后再访问这些相邻顶点的相邻顶点，依此类推，直到访问完所有顶点。BFS使用队列来实现。

#### 2.2.2 深度优先搜索（DFS）

DFS从起始顶点出发，沿着一条路径尽可能深地访问顶点，直到无法继续前进时，才回溯到上一个顶点，寻找其他路径。DFS可以使用递归或栈来实现。

## 3. 哈希表

哈希表是一种用于存储键值对的数据结构，它通过哈希函数将键映射到表中的一个位置，从而实现快速的查找、插入和删除操作。

### 3.1 哈希表的基本实现

下面是一个简单的哈希表实现，使用链地址法处理哈希冲突：

```cpp
#include <iostream>
#include <vector>
#include <list>
#include <string>
#include <utility>

// 哈希表类
template <typename K, typename V>
class HashTable {
private:
    // 定义桶的类型
    using Bucket = std::list<std::pair<K, V>>;
    std::vector<Bucket> buckets;
    size_t size;
    
    // 哈希函数
    size_t hash(const K& key) const {
        // 使用std::hash来计算哈希值
        return std::hash<K>{}(key) % buckets.size();
    }
    
public:
    // 构造函数
    HashTable(size_t bucketCount = 101) : buckets(bucketCount), size(0) {}
    
    // 插入或更新键值对
    void insert(const K& key, const V& value) {
        // 计算键的哈希值
        size_t index = hash(key);
        
        // 检查键是否已经存在
        for (auto& pair : buckets[index]) {
            if (pair.first == key) {
                // 键已存在，更新值
                pair.second = value;
                return;
            }
        }
        
        // 键不存在，插入新的键值对
        buckets[index].push_back({key, value});
        size++;
        
        // 检查是否需要扩容（负载因子超过0.75）
        if (size > buckets.size() * 0.75) {
            rehash();
        }
    }
    
    // 获取键对应的值
    V* get(const K& key) {
        // 计算键的哈希值
        size_t index = hash(key);
        
        // 查找键
        for (auto& pair : buckets[index]) {
            if (pair.first == key) {
                return &pair.second;
            }
        }
        
        // 键不存在
        return nullptr;
    }
    
    // 删除键值对
    bool remove(const K& key) {
        // 计算键的哈希值
        size_t index = hash(key);
        
        // 查找并删除键
        for (auto it = buckets[index].begin(); it != buckets[index].end(); ++it) {
            if (it->first == key) {
                buckets[index].erase(it);
                size--;
                return true;
            }
        }
        
        // 键不存在
        return false;
    }
    
    // 检查键是否存在
    bool contains(const K& key) const {
        // 计算键的哈希值
        size_t index = hash(key);
        
        // 查找键
        for (const auto& pair : buckets[index]) {
            if (pair.first == key) {
                return true;
            }
        }
        
        // 键不存在
        return false;
    }
    
    // 获取哈希表的大小
    size_t getSize() const {
        return size;
    }
    
private:
    // 重新哈希（扩容）
    void rehash() {
        // 保存旧的桶
        std::vector<Bucket> oldBuckets = std::move(buckets);
        
        // 创建新的桶，大小为原来的两倍
        buckets.resize(oldBuckets.size() * 2);
        size = 0;
        
        // 重新插入所有键值对
        for (const auto& bucket : oldBuckets) {
            for (const auto& pair : bucket) {
                insert(pair.first, pair.second);
            }
        }
    }
};

int main() {
    HashTable<std::string, int> scores;
    
    // 插入键值对
    scores.insert("张三", 90);
    scores.insert("李四", 85);
    scores.insert("王五", 95);
    scores.insert("赵六", 88);
    
    // 获取并打印值
    if (int* score = scores.get("张三")) {
        std::cout << "张三的分数：" << *score << std::endl;  // 输出：张三的分数：90
    }
    
    // 检查键是否存在
    std::cout << "是否包含李四：" << (scores.contains("李四") ? "是" : "否") << std::endl;  // 输出：是
    std::cout << "是否包含钱七：" << (scores.contains("钱七") ? "是" : "否") << std::endl;  // 输出：否
    
    // 更新值
    scores.insert("张三", 92);
    if (int* score = scores.get("张三")) {
        std::cout << "张三的新分数：" << *score << std::endl;  // 输出：张三的新分数：92
    }
    
    // 删除键值对
    scores.remove("王五");
    std::cout << "删除王五后，是否包含王五：" << (scores.contains("王五") ? "是" : "否") << std::endl;  // 输出：否
    
    // 获取哈希表的大小
    std::cout << "哈希表的大小：" << scores.getSize() << std::endl;  // 输出：3
    
    return 0;
}
```

### 3.2 哈希冲突解决方法

哈希冲突是指两个不同的键通过哈希函数计算得到相同的哈希值。常见的哈希冲突解决方法有：

1. **链地址法**：将哈希值相同的键值对存储在同一个链表中。
2. **开放地址法**：当发生冲突时，寻找表中的其他位置来存储键值对，包括线性探测、二次探测和双重哈希等。
3. **再哈希法**：当发生冲突时，使用另一个哈希函数计算新的哈希值。
4. **建立公共溢出区**：将冲突的键值对存储在一个公共的溢出区中。

上面的代码使用的是链地址法来解决哈希冲突。

## 4. 堆

堆是一种特殊的完全二叉树，它满足堆属性：对于最大堆，每个节点的值都大于或等于其子节点的值；对于最小堆，每个节点的值都小于或等于其子节点的值。堆通常用于实现优先队列。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

// 最大堆类
template <typename T>
class MaxHeap {
private:
    std::vector<T> heap;
    
    // 获取父节点索引
    size_t parent(size_t index) const {
        return (index - 1) / 2;
    }
    
    // 获取左子节点索引
    size_t leftChild(size_t index) const {
        return 2 * index + 1;
    }
    
    // 获取右子节点索引
    size_t rightChild(size_t index) const {
        return 2 * index + 2;
    }
    
    // 上浮操作（将节点向上移动到正确的位置）
    void siftUp(size_t index) {
        // 当节点不是根节点且其值大于父节点的值时，交换它们
        while (index > 0 && heap[index] > heap[parent(index)]) {
            std::swap(heap[index], heap[parent(index)]);
            index = parent(index);
        }
    }
    
    // 下沉操作（将节点向下移动到正确的位置）
    void siftDown(size_t index) {
        size_t maxIndex = index;
        
        // 比较左子节点
        size_t left = leftChild(index);
        if (left < heap.size() && heap[left] > heap[maxIndex]) {
            maxIndex = left;
        }
        
        // 比较右子节点
        size_t right = rightChild(index);
        if (right < heap.size() && heap[right] > heap[maxIndex]) {
            maxIndex = right;
        }
        
        // 如果当前节点不是最大值，则交换并继续下沉
        if (index != maxIndex) {
            std::swap(heap[index], heap[maxIndex]);
            siftDown(maxIndex);
        }
    }
    
public:
    // 构造函数
    MaxHeap() {}
    
    // 从现有数组构造堆
    MaxHeap(const std::vector<T>& array) : heap(array) {
        // 从最后一个非叶子节点开始，逐个执行下沉操作
        for (int i = heap.size() / 2 - 1; i >= 0; --i) {
            siftDown(i);
        }
    }
    
    // 插入元素
    void insert(const T& value) {
        // 将元素添加到堆的末尾
        heap.push_back(value);
        
        // 执行上浮操作，将元素移动到正确的位置
        siftUp(heap.size() - 1);
    }
    
    // 获取堆顶元素（最大值）
    T getMax() const {
        if (heap.empty()) {
            throw std::out_of_range("Heap is empty");
        }
        return heap[0];
    }
    
    // 移除并返回堆顶元素
    T extractMax() {
        if (heap.empty()) {
            throw std::out_of_range("Heap is empty");
        }
        
        // 保存堆顶元素
        T max = heap[0];
        
        // 将最后一个元素移到堆顶
        heap[0] = heap.back();
        heap.pop_back();
        
        // 如果堆不为空，执行下沉操作
        if (!heap.empty()) {
            siftDown(0);
        }
        
        return max;
    }
    
    // 获取堆的大小
    size_t getSize() const {
        return heap.size();
    }
    
    // 检查堆是否为空
    bool isEmpty() const {
        return heap.empty();
    }
};

int main() {
    MaxHeap<int> heap;
    
    // 插入元素
    heap.insert(10);
    heap.insert(20);
    heap.insert(5);
    heap.insert(30);
    heap.insert(15);
    
    // 输出堆顶元素
    std::cout << "堆顶元素：" << heap.getMax() << std::endl;  // 输出：30
    
    // 移除堆顶元素
    std::cout << "移除的堆顶元素：" << heap.extractMax() << std::endl;  // 输出：30
    std::cout << "新的堆顶元素：" << heap.getMax() << std::endl;  // 输出：20
    
    // 遍历堆（通过不断提取堆顶元素）
    std::cout << "堆中的元素（从大到小）：";
    while (!heap.isEmpty()) {
        std::cout << heap.extractMax() << " ";
    }
    std::cout << std::endl;  // 输出：20 15 10 5
    
    // 从现有数组创建堆
    std::vector<int> array = {4, 10, 3, 5, 1};
    MaxHeap<int> heapFromArray(array);
    
    std::cout << "从数组创建的堆中的元素（从大到小）：";
    while (!heapFromArray.isEmpty()) {
        std::cout << heapFromArray.extractMax() << " ";
    }
    std::cout << std::endl;  // 输出：10 5 4 3 1
    
    return 0;
}
```

## 5. 并查集

并查集（Union-Find）是一种用于管理元素所属集合的数据结构，它支持两种主要操作：合并两个集合和查找元素所属的集合。并查集常用于解决图的连通性问题、最小生成树算法等。

```cpp
#include <iostream>
#include <vector>

// 并查集类
class UnionFind {
private:
    std::vector<int> parent;  // 存储每个元素的父节点
    std::vector<int> rank;    // 存储每个集合的秩（用于按秩合并）
    
public:
    // 构造函数
    UnionFind(int n) {
        parent.resize(n);
        rank.resize(n, 0);
        
        // 初始化，每个元素的父节点是自己
        for (int i = 0; i < n; ++i) {
            parent[i] = i;
        }
    }
    
    // 查找元素所属的集合（带路径压缩）
    int find(int x) {
        if (parent[x] != x) {
            // 路径压缩：将x的父节点直接设为根节点
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }
    
    // 合并两个集合（按秩合并）
    void unite(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        
        // 如果x和y已经在同一个集合中，不需要合并
        if (rootX == rootY) {
            return;
        }
        
        // 按秩合并：将秩较小的树连接到秩较大的树下
        if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        } else if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
        } else {
            // 秩相等时，任选一个作为根，并增加其秩
            parent[rootY] = rootX;
            rank[rootX]++;
        }
    }
    
    // 检查两个元素是否在同一个集合中
    bool isConnected(int x, int y) {
        return find(x) == find(y);
    }
};

int main() {
    // 创建一个有10个元素的并查集
    UnionFind uf(10);
    
    // 合并一些集合
    uf.unite(0, 1);
    uf.unite(2, 3);
    uf.unite(4, 5);
    uf.unite(6, 7);
    uf.unite(8, 9);
    uf.unite(0, 2);
    uf.unite(4, 6);
    uf.unite(0, 4);
    
    // 检查元素是否在同一个集合中
    std::cout << "0和9是否在同一个集合中：" << (uf.isConnected(0, 9) ? "是" : "否") << std::endl;  // 输出：否
    std::cout << "0和7是否在同一个集合中：" << (uf.isConnected(0, 7) ? "是" : "否") << std::endl;  // 输出：是
    
    // 合并更多的集合
    uf.unite(0, 8);
    
    // 再次检查
    std::cout << "0和9是否在同一个集合中：" << (uf.isConnected(0, 9) ? "是" : "否") << std::endl;  // 输出：是
    
    return 0;
}
```

## 6. 练习与实践

### 6.1 基础练习

1. 实现一个平衡二叉搜索树（如AVL树或红黑树），支持插入、删除和查找操作。

2. 使用图的邻接表表示，实现Dijkstra算法，用于求解单源最短路径问题。

### 6.2 进阶挑战

1. 实现一个LRU（最近最少使用）缓存，使用哈希表和双向链表的组合来实现O(1)时间复杂度的查找、插入和删除操作。

2. 实现一个跳表（Skip List），这是一种可以用来快速查找的数据结构，类似于平衡树，但实现更简单。

## 7. 小结

高级数据结构是解决复杂问题的重要工具，本章我们学习了几种常见的高级数据结构：

- 树：包括二叉树、二叉搜索树和AVL树
- 图：包括邻接矩阵和邻接表两种表示方法，以及BFS和DFS两种遍历算法
- 哈希表：使用链地址法解决哈希冲突
- 堆：最大堆的实现和应用
- 并查集：用于管理元素所属集合的数据结构

这些数据结构在计算机科学的各个领域都有广泛的应用，掌握它们对于提高编程能力和解决复杂问题非常重要。在实际编程中，我们也可以使用C++标准库中提供的相关数据结构，如`std::map`、`std::set`、`std::priority_queue`等，它们通常已经过优化，性能更好。
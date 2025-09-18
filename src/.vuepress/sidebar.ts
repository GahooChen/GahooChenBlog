import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "文章",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    "intro",
    {
      text: "开发问题记录与分享",
      icon: "bug",
      prefix: "problems/",
      children: "structure",
    },
    {
      text: "编程语言基础与算法学习",
      icon: "code",
      prefix: "programming-languages/",
      children: [
          "",
          {          text: "C语言",
            icon: "c",
            prefix: "c/",
            children: [
              "",
              "01-first-program",
              "02-variables-data-types",
              "03-operators",
              "04-control-statements",
              "05-loops",
              "06-practice-summary",
              "07-functions-arrays",
              "08-practice-functions-arrays",
              "09-pointers-basics",
              "10-memory-management",
              "11-algorithm-basics",
              "12-structs-unions",
              "13-file-io",
              "14-sorting-algorithms",
              "15-searching-algorithms",
            ],
          },
        {
          text: "C++",
          icon: "cpp",
          prefix: "cpp/",
          children: "structure",
        },
        {
          text: "C#",
          icon: "csharp",
          prefix: "csharp/",
          children: "structure",
        },
        {
          text: "Java",
          icon: "java",
          prefix: "java/",
          children: "structure",
        },
        {
          text: "Python",
          icon: "python",
          prefix: "python/",
          children: "structure",
        },
      ],
    },
    // 注释掉外部链接
    // {
    //   text: "幻灯片",
    //   icon: "person-chalkboard",
    //   link: "https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html",
    // },
  ],
});

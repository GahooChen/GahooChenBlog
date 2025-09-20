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
        {
          
          text: "C语言",
          prefix: "c/",
          children: [""],
        },
        {
          text: "C++",
          prefix: "cpp/",
          children: [""],
        },
        {
          text: "C#",
          prefix: "csharp/",
          children: [""],
        },
        {
          text: "Java",
          prefix: "java/",
          children: [""],
        },
        {
          text: "Python",
          prefix: "python/",
          children: [""],
        },
      ],
    },
  ],
});

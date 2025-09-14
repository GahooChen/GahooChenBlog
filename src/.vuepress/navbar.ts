import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  { text: "个人简介", icon: "user", link: "/intro.md" },
  { text: "开发问题记录与分享", icon: "bug", link: "/problems/" },
  { text: "编程语言基础与算法学习", icon: "code", link: "/programming-languages/" },
]);

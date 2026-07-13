---
title: "Hugo 快速入门指南 - 从零搭建个人博客"
date: 2026-06-02
draft: false
description: "从零开始学习 Hugo 静态网站生成器，快速搭建你的个人博客"
tags: ["Hugo", "教程", "静态网站"]
---

## 什么是 Hugo？

Hugo 是一个用 Go 语言编写的**超快速静态网站生成器**。它的特点是：

- 🚀 **极速构建** - 毫秒级的页面生成速度
- 📦 **单二进制文件** - 无需复杂依赖
- 🎨 **丰富主题** - 数百个精美主题可选
- 🔧 **灵活配置** - 强大的自定义能力

## 安装 Hugo

### Linux (Ubuntu/Debian)

```bash
sudo apt-get install hugo
```

### macOS (Homebrew)

```bash
brew install hugo
```

### Windows

从 [GitHub Releases](https://github.com/gohugoio/hugo/releases) 下载最新版本。

## 创建新网站

```bash
# 创建新站点
hugo new site my-blog

# 进入目录
cd my-blog

# 初始化 Git
git init
```

## 添加主题

```bash
# 添加 PaperMod 主题
git submodule add --depth=1 https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod

# 在 hugo.toml 中配置主题
echo 'theme = "PaperMod"' >> hugo.toml
```

## 创建文章

```bash
# 创建新文章
hugo new posts/my-first-post.md
```

编辑 `content/posts/my-first-post.md`：

```markdown
---
title: "我的第一篇文章"
date: 2026-06-02
draft: false
tags: ["Hugo", "博客"]
---

这是文章内容...
```

## 本地预览

```bash
# 启动本地服务器
hugo server -D

# 访问 http://localhost:1313
```

## 构建生产版本

```bash
# 生成静态文件
hugo

# 输出到 public/ 目录
```

## 常用配置

在 `hugo.toml` 中：

```toml
baseURL = "https://yourdomain.com/"
languageCode = "zh-cn"
title = "我的博客"
theme = "PaperMod"

[params]
  description = "博客描述"
  author = "作者名"
  ShowReadingTime = true
  ShowToc = true
```

## 部署选项

1. **GitHub Pages** - 免费，适合个人博客
2. **Vercel** - 自动部署，全球 CDN
3. **Netlify** - 简单易用，功能强大
4. **Cloudflare Pages** - 高性能，免费额度大

### 使用 GitHub Actions 部署到 GitHub Pages

本站使用 GitHub Actions 自动部署到 GitHub Pages，以下是 `.github/workflows/deploy.yml` 的核心配置：

```yaml
name: Deploy Hugo site to Pages

on:
  push:
    branches: ["main"]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: 'latest'
          extended: true
      - run: hugo --minify
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

每次推送代码到 `main` 分支，GitHub Actions 会自动构建并部署最新内容。

### 自定义域名配置

如果你需要使用自定义域名，需要注意以下几点：

1. 在域名 DNS 设置中添加 A 记录，指向 GitHub Pages 的 IP 地址
2. 在仓库 Settings → Pages 中填写自定义域名
3. 勾选 "Enforce HTTPS"
4. 在 `static/` 目录创建 `CNAME` 文件（仅作为备份记录）

> **注意**：在使用 GitHub Actions 部署模式下，`static/CNAME` 文件会被忽略。自定义域名必须在 GitHub Pages 设置页面中配置。

## 总结

Hugo 是一个强大而简单的工具，非常适合构建个人博客和文档网站。它的速度优势和灵活性使其成为开发者的理想选择。

如果你刚刚开始使用 Hugo 搭建博客，可以参考[我的开篇介绍](/posts/welcome/)了解这个网站的构建过程。更多关于我的信息，请查看[关于页面](/about/)。

下一篇我将分享 [2026 年前端开发技术趋势](/posts/frontend-trends-2026/)，探讨前端领域的最新发展。

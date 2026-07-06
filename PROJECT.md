# yjyblog.xyz — 个人博客项目

## 📋 项目概览

| 项目 | 内容 |
|------|------|
| **域名** | yjyblog.xyz |
| **框架** | Hugo (静态站点生成器) |
| **主题** | 自定义 PaperMod 风格 (layouts/ 目录自定义) |
| **仓库** | rollstone6/rollstone6.github.io |
| **部署** | GitHub Pages + GitHub Actions |
| **本地路径** | `/root/workspace/my-website/` |

---

## 🚩 当前状态

```
网站搭建 ✅ → 代码推送 ✅ → Pages 模式切换 ✅ → DNS 配置 ✅
                                                      ↓
                                            GitHub Actions 构建 ✅
                                                      ↓
                                            yjyblog.xyz → 200 ✅
```

### ✅ 已完成

- [x] Hugo 网站搭建完成（自定义 PaperMod 风格，32 个页面）
- [x] 内容：首页（Profile Mode）、3 篇博客、关于页、归档页、搜索页、简历页
- [x] GitHub 仓库创建：`rollstone6/rollstone6.github.io`
- [x] 代码已推送到 GitHub main 分支
- [x] GitHub Actions 部署工作流 (`.github/workflows/deploy.yml`)
- [x] GitHub Pages 已切换为 workflow（GitHub Actions）模式
- [x] DNS 配置（A 记录 + TXT 记录指向 GitHub Pages）
- [x] `static/CNAME` 文件已创建
- [x] 简历页面搭建（2026-06-15）

### ❌ 已知问题

1. **头像图片未设置** — `profileMode.imageUrl` 为空

2. **社交链接** — Twitter/X 链接还是占位符

## 📖 GitHub Pages 官方文档参考对照

参考：https://docs.github.com/en/pages/quickstart

### Quickstart 步骤对照

| 步骤 | 官方要求 | 当前状态 | 说明 |
|------|---------|---------|------|
| 创建仓库 `<user>.github.io` | ✅ 已完成 | — |
| 设置 Pages 源 | "GitHub Actions is now the recommended approach" | ✅ 已设为 workflow 模式 | 正确 |
| README.md | 建议添加 | ❌ 没有 | 非必需，但建议加 |
| _config.yml | Jekyll 项目需要 | ❌ 不适用 | 我们是 Hugo，不需要 |

### 自定义域名关键发现

参考：https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

| 发现 | 说明 |
|------|------|
| ⚠️ **CNAME 文件在 GitHub Actions 模式下被忽略** | 官方明确说："If you are publishing from a custom GitHub Actions workflow, no CNAME file is created, and **any existing CNAME file is ignored and is not required**." → 我们的 `static/CNAME` 根本没用！ |
| ⚠️ **正确做法：在 Pages 设置中添加自定义域名** | 需要在 GitHub 仓库 Settings → Pages → "Custom domain" 输入 yjyblog.xyz 并 Save。这可以通过 API 设置 `cname` 字段 |
| ⚠️ **配置顺序** | 官方建议：先在 GitHub Pages 设置中添加域名 → 再配置 DNS。我们是反过来的（先配了 DNS），但只要现在补上 GitHub 端设置就没问题 |
| ✅ **DNS A 记录正确** | 4 个 A 记录指向 `185.199.108.153` / `.109` / `.110` / `.111`，与官方一致 |
| ✅ **www CNAME 正确** | `www.yjyblog.xyz → rollstone6.github.io` |
| ❌ **未启用 HTTPS** | 域名添加后需要勾选 "Enforce HTTPS"，可能需要等 15-30 分钟 |
| ❌ **未验证域名所有权** | 建议在 GitHub Settings → Pages 验证域名，防止域名劫持 |

### 关键修正

**不要依赖 `static/CNAME` 文件** — 在 GitHub Actions workflow 模式下，这个文件被忽略。必须通过 GitHub Pages API 或网页界面设置自定义域名。

---

## 🗺️ 迭代计划

### Phase 1 — 修复部署（当前优先级最高）

#### 1.1 修复 Hugo 构建（阻止 Actions 失败）
- [x] 安装 Hugo 主题（PaperMod 或保持自定义）
- [x] 修复 `hugo.toml` 中 theme 配置
- [x] 更新 `deploy.yml`（如需 submodule）
- [x] 本地构建验证

#### 1.2 触发部署并验证
- [x] 推送代码触发 GitHub Actions 部署
- [x] 验证 rollstone6.github.io 可访问

#### 1.3 配置自定义域名（通过 API，不依赖 CNAME 文件）
- [x] 通过 GitHub API 设置 Pages 的 cname 为 yjyblog.xyz
- [x] 启用 Enforce HTTPS
- [x] 验证 yjyblog.xyz 可访问
- [x] 可选：在 GitHub 验证域名所有权

#### 1.4 修复简历代码块显示问题
- [x] 去除 Markdown 中 HTML 缩进，避免被 Hugo 解析为代码块
- [x] 验证简历页面正常渲染

### Phase 2 — 内容完善
- [x] 简历页面搭建（2026-06-15）
- [x] 内容分析优化（2026-06-16）
- [x] 移动端全面适配（2026-06-20）
- [x] 定时内容优化（2026-07-06）：修复搜索页 404、更新过期指标、补全 frontmatter、增加交叉链接
- [ ] 设置头像图片
- [ ] 更新 Twitter/X 社交链接
- [ ] 完善关于页信息
- [ ] 添加更多博客文章

### Phase 3 — 功能增强
- [ ] 添加评论系统
- [ ] 添加访问统计
- [ ] SEO 优化
- [ ] 性能优化

---

## 🏗️ 项目结构

```
my-website/
├── content/                  # 网站内容（Markdown）
│   ├── about/index.md        # 关于页面
│   ├── archives/index.md     # 归档页面
│   ├── resume/index.md       # 简历页面
│   └── posts/                # 博客文章
│       ├── welcome.md
│       ├── hugo-quickstart.md
│       └── frontend-trends-2026.md
├── layouts/                  # 自定义模板（替代主题）
│   ├── _default/
│   │   ├── archives.html
│   │   ├── baseof.html
│   │   ├── index.json
│   │   ├── list.html
│   │   ├── resume.html
│   │   └── single.html
│   ├── index.html
│   ├── partials/
│   │   ├── footer.html
│   │   ├── header.html
│   │   └── head.html
│   └── shortcodes/
│       ├── box.html
│       └── img.html
├── static/                   # 静态资源
│   ├── CNAME                 # ⚠️ 在 Actions 模式下被忽略，仅作记录
│   ├── css/style.css
│   └── js/main.js
├── hugo.toml                 # Hugo 配置文件
├── .github/workflows/
│   └── deploy.yml            # GitHub Actions 部署工作流
└── PROJECT.md                # 本文件（项目文档）
```

---

## 🔧 工作流程

每次处理本项目时：

1. **阅读 PROJECT.md** — 了解当前状态和待办事项
2. **检查最新状态** — 运行 `hugo` 本地构建验证，检查 GitHub Actions 状态
3. **制定计划** — 明确本次要处理的 Phase/任务
4. **逐步执行** — 每完成一步验证一步
5. **更新文档** — 完成后更新 PROJECT.md 中的状态

### 常用命令

```bash
# 本地构建
cd /root/workspace/my-website && hugo

# 本地预览
cd /root/workspace/my-website && hugo server -D

# 查看 Git 状态
cd /root/workspace/my-website && git status

# 推送部署
cd /root/workspace/my-website && git add . && git commit -m "msg" && git push
```

---

## 🔗 相关链接

- 网站域名：https://yjyblog.xyz
- GitHub Pages：https://rollstone6.github.io
- GitHub 仓库：https://github.com/rollstone6/rollstone6.github.io
- GitHub Actions：https://github.com/rollstone6/rollstone6.github.io/actions
- DNS 服务商：阿里云（ns: dns9.hichina.com / dns10.hichina.com）
- GitHub Pages 官方文档：https://docs.github.com/en/pages/quickstart
- 自定义域名文档：https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

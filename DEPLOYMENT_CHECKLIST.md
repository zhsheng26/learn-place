# LearnPlace 部署验证清单

在正式部署前,请使用此清单逐项验证,确保项目达到生产就绪状态。

---

## ✅ 构建验证

### 基础构建

- [ ] `npm run build` 执行成功,无错误
- [ ] 构建产物位于 `docs/.vitepress/dist/`
- [ ] 构建产物大小合理 (< 20MB)
- [ ] `sitemap.xml` 已生成并包含所有页面
- [ ] `robots.txt` 已生成且配置正确

### 文件完整性

```bash
# 运行此命令检查关键文件
ls docs/.vitepress/dist/index.html && echo "✅ index.html"
ls docs/.vitepress/dist/sitemap.xml && echo "✅ sitemap.xml"
ls docs/.vitepress/dist/robots.txt && echo "✅ robots.txt"
ls docs/.vitepress/dist/assets/ && echo "✅ assets directory"
```

---

## ✅ 功能验证

### 页面可访问性

启动预览服务器并检查所有页面:

```bash
npm run preview
# 访问 http://localhost:4173/learn-place/
```

- [ ] 首页 (`/`) 正常加载
- [ ] 学习路线 (`/guide/roadmap`) 可访问
- [ ] LLM基础章节可访问
- [ ] Prompt工程章节可访问
- [ ] Spring AI章节可访问
- [ ] RAG章节可访问
- [ ] Agent章节可访问
- [ ] 部署运维章节可访问
- [ ] 资源汇总页面(4个)可访问
- [ ] 项目概览页面可访问
- [ ] 5个实战项目页面可访问
- [ ] 面试题库页面可访问
- [ ] 工具页面(Quiz/Progress/Calculator)可访问

### 导航功能

- [ ] 顶部导航栏所有链接可点击
- [ ] 左侧边栏展开/收起正常
- [ ] 面包屑导航显示正确
- [ ] 上一页/下一页按钮工作正常
- [ ] 页面内目录(Table of Contents)链接有效

### 交互组件

- [ ] QuizWidget答题功能正常
  - [ ] 选择题可点击
  - [ ] 提交后显示正确答案
  - [ ] 解析内容显示完整
  - [ ] 错题本功能正常
  
- [ ] Mermaid图表渲染正确
  - [ ] 流程图显示正常
  - [ ] 时序图显示正常
  - [ ] 无JavaScript错误
  
- [ ] ECharts雷达图显示正常
  - [ ] 数据点正确
  - [ ] 图例可交互
  - [ ] 响应式缩放正常

- [ ] 代码高亮正常
  - [ ] Java代码高亮正确
  - [ ] Markdown代码块显示正常
  - [ ] 行号显示正确

### 搜索功能

- [ ] 搜索框可输入
- [ ] 搜索结果实时显示
- [ ] 点击结果可跳转到对应页面
- [ ] 中文搜索支持良好

---

## ✅ 内容质量验证

### 链接检查

- [ ] 所有内部链接无404错误
- [ ] 外部链接有效性抽查(至少10个)
- [ ] GitHub仓库链接可访问
- [ ] 官方文档链接指向最新版本
- [ ] 视频教程链接可播放

### 图片检查

- [ ] Logo图标显示正常
- [ ] Mermaid图表无破损
- [ ] 所有图片有alt属性
- [ ] 图片加载速度快(< 2秒)

### 代码示例

- [ ] 所有代码块语法正确
- [ ] Java代码可编译(至少主要示例)
- [ ] 配置文件格式正确(YAML/JSON)
- [ ] 命令行示例可直接复制运行

### 文本质量

- [ ] 无拼写错误
- [ ] 无语法错误
- [ ] 专业术语使用准确
- [ ] 中英文混排格式正确

---

## ✅ SEO优化验证

### Meta标签

- [ ] 每个页面有唯一的 `<title>`
- [ ] 每个页面有 `<meta name="description">`
- [ ] Open Graph标签配置正确
  - [ ] `og:title`
  - [ ] `og:description`
  - [ ] `og:url`
  - [ ] `og:image` (如有)
- [ ] Twitter Card标签配置正确

### Sitemap

- [ ] `sitemap.xml` 格式正确(XML验证通过)
- [ ] 包含所有重要页面(47+页面)
- [ ] URL格式正确(含base路径)
- [ ] changefreq和priority设置合理

### Robots.txt

- [ ] 允许搜索引擎抓取
- [ ] Sitemap位置声明正确
- [ ] 无不合理的Disallow规则

---

## ✅ 性能验证

### Lighthouse测试

使用Chrome DevTools Lighthouse进行测试:

```
目标评分:
- Performance:    > 90 ✅ / ❌
- Accessibility:  > 90 ✅ / ❌
- Best Practices: > 90 ✅ / ❌
- SEO:            > 90 ✅ / ❌
```

**如果评分不达标,检查以下项目**:

#### Performance优化
- [ ] 启用Gzip压缩(托管平台通常默认启用)
- [ ] 图片已优化(WebP格式,适当尺寸)
- [ ] JavaScript包体积合理(< 500KB初始加载)
- [ ] CSS未阻塞渲染
- [ ] 使用浏览器缓存(Cache-Control头)

#### Accessibility优化
- [ ] 所有图片有alt属性
- [ ] 颜色对比度符合WCAG AA标准
- [ ] 键盘导航可用
- [ ] ARIA标签正确使用
- [ ] 表单元素有label

#### Best Practices
- [ ] 使用HTTPS
- [ ] 无console.error/warn
- [ ] 无废弃API使用
- [ ] CSP头配置(可选)

#### SEO
- [ ] 文档结构语义化(h1-h6正确使用)
- [ ] 内部链接使用相对路径
- [ ] 移动端友好
- [ ] 页面加载速度快

### 加载速度测试

```bash
# 使用WebPageTest或GTmetrix在线工具
# 目标: First Contentful Paint < 2s
#       Time to Interactive < 5s
```

- [ ] 首屏加载时间 < 2秒
- [ ] 完全加载时间 < 5秒
- [ ] 滚动流畅,无卡顿

---

## ✅ 移动端适配验证

使用Chrome DevTools设备模拟测试:

### 设备列表

- [ ] iPhone 12 Pro (390x844)
- [ ] iPhone SE (375x667)
- [ ] Pixel 5 (393x851)
- [ ] iPad Air (820x1180)
- [ ] Samsung Galaxy S20 (360x800)

### 检查项目

- [ ] 布局无错位或溢出
- [ ] 文字大小可读(不小于14px)
- [ ] 按钮可点击(触摸区域> 44x44px)
- [ ] 侧边栏可展开/收起
- [ ] 表格横向滚动正常
- [ ] 代码块可横向滚动
- [ ] 图片自适应屏幕宽度

---

## ✅ 浏览器兼容性验证

在以下浏览器中测试核心功能:

- [ ] Chrome 最新版
- [ ] Firefox 最新版
- [ ] Safari 最新版(macOS/iOS)
- [ ] Edge 最新版

**核心功能测试**:
- [ ] 页面正常加载
- [ ] 导航功能正常
- [ ] 搜索功能正常
- [ ] Quiz组件正常
- [ ] Mermaid图表渲染
- [ ] 代码高亮正常

---

## ✅ Git配置验证

### .gitignore

- [ ] `node_modules/` 已忽略
- [ ] `dist/` 和 `docs/.vitepress/dist/` 已忽略
- [ ] `.DS_Store` 已忽略
- [ ] `*.log` 已忽略
- [ ] `.env` 文件已忽略

### LICENSE

- [ ] LICENSE文件存在
- [ ] 采用MIT协议
- [ ] 版权年份和所有者正确

### README

- [ ] README.md内容完整
- [ ]  badges显示正常
- [ ] 快速开始步骤清晰
- [ ] 项目结构说明准确
- [ ] 贡献指南明确

---

## ✅ GitHub Actions配置验证

### Workflow文件

- [ ] `.github/workflows/deploy.yml` 存在
- [ ] 触发条件配置正确(push到main)
- [ ] Node版本设置为18+
- [ ] 构建命令正确(`npm run build`)
- [ ] 发布目录正确(`docs/.vitepress/dist`)

### Secrets配置

- [ ] `GITHUB_TOKEN` 自动提供(无需手动配置)
- [ ] 如需自定义域名,添加相应secrets

### 测试部署

```bash
# 推送测试提交
git add .
git commit -m "Test deployment"
git push

# 访问Actions页面查看部署状态
# https://github.com/YOUR_USERNAME/learn-place/actions
```

- [ ] Actions执行成功(绿色对勾)
- [ ] 无错误或警告
- [ ] 部署时间 < 5分钟

---

## ✅ 部署后验证

### 在线访问测试

部署完成后,访问 `https://YOUR_USERNAME.github.io/learn-place/`:

- [ ] 网站可访问(无404/500错误)
- [ ] HTTPS证书有效
- [ ] 所有页面加载正常
- [ ] 静态资源(CSS/JS/图片)加载成功
- [ ] 控制台无JavaScript错误

### 搜索引擎提交

- [ ] Google Search Console提交sitemap
- [ ] Bing Webmaster Tools提交sitemap
- [ ] 等待索引(通常1-7天)

### 监控设置 (可选)

- [ ] Google Analytics集成(如需流量统计)
- [ ] Uptime监控(如UptimeRobot)
- [ ] 错误追踪(如Sentry,可选)

---

## 📋 最终检查清单

在宣布部署成功前,确认以下所有项:

### 核心功能
- [ ] ✅ 构建无错误
- [ ] ✅ 所有页面可访问
- [ ] ✅ 导航功能正常
- [ ] ✅ 搜索功能正常
- [ ] ✅ Quiz组件正常
- [ ] ✅ Mermaid图表渲染
- [ ] ✅ 移动端适配良好

### 内容质量
- [ ] ✅ 无死链(内部+外部)
- [ ] ✅ 无拼写/语法错误
- [ ] ✅ 代码示例可运行
- [ ] ✅ 图片显示正常

### SEO与性能
- [ ] ✅ Lighthouse评分全部>90
- [ ] ✅ Sitemap.xml有效
- [ ] ✅ Robots.txt配置正确
- [ ] ✅ Meta标签完整

### 部署配置
- [ ] ✅ GitHub Actions自动部署成功
- [ ] ✅ HTTPS证书有效
- [ ] ✅ 自定义域名(如配置)生效
- [ ] ✅ CDN缓存策略合理

---

## 🎉 部署成功!

如果以上所有检查项都通过,恭喜你的LearnPlace项目已成功部署!

### 下一步行动

1. **分享推广**
   - 在社交媒体分享链接
   - 提交到Hacker News/Product Hunt
   - 在技术社区(掘金/V2EX)发帖介绍

2. **收集反馈**
   - 开启GitHub Discussions
   - 鼓励用户提交Issues
   - 定期更新和优化内容

3. **持续维护**
   - 每月检查外部链接有效性
   - 每季度更新技术内容
   - 跟进VitePress/Spring AI新版本

4. **数据分析**
   - 监控Google Analytics流量
   - 分析热门页面和用户行为
   - 根据数据优化内容结构

---

## 📞 需要帮助?

如果在部署过程中遇到问题:

- 📖 [VitePress部署文档](https://vitepress.dev/guide/deploy)
- 💬 [GitHub Discussions](https://github.com/your-org/learn-place/discussions)
- 🐛 [提交Issue](https://github.com/your-org/learn-place/issues)

---

<div align="center">

**祝部署顺利!如有问题欢迎反馈 🚀**

[⬆ 回到README](../README.md) | [📖 部署指南](DEPLOY.md)

</div>

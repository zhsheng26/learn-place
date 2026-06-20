# LearnPlace 部署指南

本文档提供LearnPlace项目的完整部署步骤,支持GitHub Pages自动部署和手动部署到任意静态托管服务。

---

## 🚀 快速部署 (推荐: GitHub Pages)

### 前置要求

- GitHub账号
- Git已安装并配置
- Node.js 18+ (仅用于本地测试)

### 部署步骤

#### 第1步: 创建GitHub仓库

1. 访问 [https://github.com/new](https://github.com/new)
2. 仓库名称: `learn-place`
3. 可见性: **Public** (GitHub Pages免费托管需要公开仓库)
4. 点击 **Create repository**

#### 第2步: 推送代码到GitHub

```bash
# 初始化Git仓库(如果尚未初始化)
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit: LearnPlace learning platform"

# 关联远程仓库(替换为你的用户名)
git remote add origin https://github.com/YOUR_USERNAME/learn-place.git

# 推送到main分支
git branch -M main
git push -u origin main
```

#### 第3步: 配置GitHub Pages

1. 访问仓库设置: `https://github.com/YOUR_USERNAME/learn-place/settings/pages`
2. 在 **Source** 部分选择:
   - Branch: `main`
   - Folder: `/docs/.vitepress/dist`
3. 点击 **Save**

> ⚠️ **注意**: 由于我们使用GitHub Actions自动部署,这一步可以跳过,Actions会自动配置。

#### 第4步: 等待自动部署

GitHub Actions会自动执行以下操作:
1. 检测到push到main分支
2. 运行 `npm install` 安装依赖
3. 运行 `npm run build` 构建站点
4. 部署到GitHub Pages

通常等待 **2-5分钟** 即可完成部署。

#### 第5步: 访问网站

部署完成后,访问:
```
https://YOUR_USERNAME.github.io/learn-place/
```

🎉 **恭喜!你的学习平台已成功上线!**

---

## 🔧 自定义域名配置 (可选)

如果你想使用自己的域名(如 `learn.yourdomain.com`):

### 第1步: DNS配置

在你的域名DNS服务商处添加CNAME记录:

```
类型: CNAME
名称: learn (或 @)
值: YOUR_USERNAME.github.io
TTL: 3600
```

### 第2步: 配置CNAME文件

在项目根目录创建 `docs/public/CNAME` 文件:

```bash
echo "learn.yourdomain.com" > docs/public/CNAME
```

### 第3步: 更新配置文件

修改 `docs/.vitepress/config.ts`:

```typescript
export default defineConfig({
  base: '/', // 如果使用根域名
  // 或者
  base: '/learn-place/', // 如果使用子路径
  
  head: [
    // 更新SEO链接
    ['meta', { property: 'og:url', content: 'https://learn.yourdomain.com/' }],
  ],
})
```

### 第4步: 重新部署

```bash
git add docs/public/CNAME docs/.vitepress/config.ts
git commit -m "Add custom domain configuration"
git push
```

等待几分钟后,访问你的自定义域名即可。

---

## 📦 手动部署到其他平台

如果你不想使用GitHub Pages,可以部署到任意静态托管服务。

### 方案1: Vercel (推荐)

Vercel提供免费静态托管,支持自动HTTPS和CDN加速。

#### 步骤:

1. 访问 [https://vercel.com](https://vercel.com) 并登录
2. 点击 **New Project**
3. 导入GitHub仓库 `learn-place`
4. 配置构建设置:
   - Framework Preset: `Other`
   - Build Command: `npm run build`
   - Output Directory: `docs/.vitepress/dist`
   - Install Command: `npm install`
5. 点击 **Deploy**

部署完成后,Vercel会提供一个 `.vercel.app` 域名,也可绑定自定义域名。

### 方案2: Netlify

Netlify同样提供免费静态托管和CDN。

#### 步骤:

1. 访问 [https://netlify.com](https://netlify.com) 并登录
2. 点击 **Add new site** → **Import from Git**
3. 选择GitHub仓库 `learn-place`
4. 配置构建设置:
   - Build command: `npm run build`
   - Publish directory: `docs/.vitepress/dist`
5. 点击 **Deploy site**

### 方案3: Cloudflare Pages

Cloudflare Pages提供免费的边缘网络部署。

#### 步骤:

1. 访问 [https://pages.cloudflare.com](https://pages.cloudflare.com)
2. 点击 **Create a project**
3. 连接GitHub账户并选择仓库
4. 配置构建设置:
   - Framework preset: `None`
   - Build command: `npm run build`
   - Build output directory: `docs/.vitepress/dist`
5. 点击 **Save and Deploy**

### 方案4: 传统Web服务器 (Nginx/Apache)

如果你有VPS或虚拟主机,可以手动部署。

#### Nginx配置示例:

```nginx
server {
    listen 80;
    server_name learn.yourdomain.com;
    
    root /var/www/learn-place;
    index index.html;
    
    # 启用Gzip压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # SPA路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### 部署步骤:

```bash
# 1. 本地构建
npm run build

# 2. 上传到服务器
scp -r docs/.vitepress/dist/* user@your-server:/var/www/learn-place/

# 3. 重启Nginx
sudo systemctl restart nginx
```

---

## 🔄 CI/CD自动化部署

项目已包含GitHub Actions配置,位于 `.github/workflows/deploy.yml`。

### 工作流程

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  
  workflow_dispatch: # 允许手动触发

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build site
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs/.vitepress/dist
          force_orphan: true
```

### 特性

- ✅ **自动触发**: push到main分支时自动部署
- ✅ **手动触发**: 可在Actions页面手动运行
- ✅ **缓存优化**: npm依赖缓存,加速构建
- ✅ **原子部署**: 使用force_orphan确保干净的部署历史

---

## 🧪 部署前验证清单

在部署前,请确保完成以下检查:

### 构建验证

```bash
# 1. 清理旧构建
rm -rf docs/.vitepress/dist

# 2. 重新构建
npm run build

# 3. 检查构建产物
ls -lh docs/.vitepress/dist/

# 4. 验证sitemap.xml存在
test -f docs/.vitepress/dist/sitemap.xml && echo "✅ Sitemap OK" || echo "❌ Sitemap missing"

# 5. 验证robots.txt存在
test -f docs/.vitepress/dist/robots.txt && echo "✅ Robots.txt OK" || echo "❌ Robots.txt missing"
```

### 功能验证

```bash
# 启动预览服务器
npm run preview

# 在浏览器中访问 http://localhost:4173/learn-place/
# 检查以下项目:

# ✅ 首页正常加载
# ✅ 导航栏链接可点击
# ✅ 侧边栏展开/收起正常
# ✅ Mermaid图表渲染正确
# ✅ QuizWidget答题功能正常
# ✅ 外部链接无404错误
# ✅ 移动端布局正常(Chrome DevTools设备模拟)
```

### SEO验证

```bash
# 检查sitemap.xml格式
xmllint --noout docs/.vitepress/dist/sitemap.xml

# 检查robots.txt内容
cat docs/.vitepress/dist/robots.txt

# 验证meta标签
grep -o '<meta[^>]*>' docs/.vitepress/dist/index.html | head -10
```

### 性能验证

使用Lighthouse进行性能测试:

```bash
# 方法1: Chrome DevTools
# 1. 打开Chrome浏览器
# 2. 按F12打开DevTools
# 3. 切换到Lighthouse面板
# 4. 选择Categories: Performance, Accessibility, Best Practices, SEO
# 5. 点击"Analyze page load"

# 方法2: CLI工具
npm install -g lighthouse
lighthouse http://localhost:4173/learn-place/ --view
```

**目标评分**:
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

---

## 🐛 常见问题排查

### Q1: GitHub Pages显示404错误

**原因**: 构建产物路径配置错误

**解决方案**:
```bash
# 检查base配置
grep "base:" docs/.vitepress/config.ts

# 应该是:
base: '/learn-place/'  # 如果仓库名是learn-place

# 修改后重新部署
git add docs/.vitepress/config.ts
git commit -m "Fix base path configuration"
git push
```

### Q2: 样式丢失或JS不加载

**原因**: 资源路径错误

**解决方案**:
1. 打开浏览器DevTools Console
2. 查看是否有404错误
3. 检查资源路径是否正确(应包含 `/learn-place/` 前缀)
4. 确认 `base` 配置正确

### Q3: GitHub Actions部署失败

**常见错误及解决**:

```
Error: Process completed with exit code 1
```

**排查步骤**:
```bash
# 1. 查看Actions日志
# 访问: https://github.com/YOUR_USERNAME/learn-place/actions

# 2. 本地复现构建
npm ci  # 使用ci而非install,更严格
npm run build

# 3. 检查Node版本
node --version  # 应为18+

# 4. 清除缓存重试
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Q4: 自定义域名不生效

**排查步骤**:

```bash
# 1. 检查DNS传播
nslookup learn.yourdomain.com

# 2. 验证CNAME文件
cat docs/public/CNAME

# 3. 检查GitHub Pages配置
# 访问: https://github.com/YOUR_USERNAME/learn-place/settings/pages
# 确认Custom domain已设置

# 4. 等待DNS传播(最多48小时)
```

### Q5: Lighthouse评分低

**优化建议**:

- **Performance低**: 
  - 启用Gzip压缩(大多数托管平台默认启用)
  - 优化图片大小(使用WebP格式)
  - 减少JavaScript包体积

- **Accessibility低**:
  - 为所有图片添加alt属性
  - 确保颜色对比度符合WCAG标准
  - 添加ARIA标签

- **SEO低**:
  - 确保每个页面有唯一的title和description
  - 添加sitemap.xml和robots.txt
  - 使用语义化HTML标签

---

## 📊 部署监控

### Google Search Console

提交站点到Google搜索:

1. 访问 [https://search.google.com/search-console](https://search.google.com/search-console)
2. 添加资源(域名或URL前缀)
3. 验证所有权(DNS记录或HTML文件)
4. 提交sitemap: `https://YOUR_USERNAME.github.io/learn-place/sitemap.xml`
5. 监控索引状态和搜索表现

### Bing Webmaster Tools

同样提交到Bing搜索:

1. 访问 [https://www.bing.com/webmasters](https://www.bing.com/webmasters)
2. 添加站点并验证
3. 提交sitemap

### 流量分析 (可选)

集成Google Analytics:

在 `docs/.vitepress/config.ts` 中添加:

```typescript
head: [
  // Google Analytics
  ['script', { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX' }],
  ['script', {}, `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `],
]
```

---

## 🎯 部署后维护

### 定期更新

```bash
# 1. 拉取最新代码
git pull origin main

# 2. 更新依赖
npm update

# 3. 本地测试
npm run build
npm run preview

# 4. 提交并推送
git add .
git commit -m "Update dependencies and content"
git push

# 5. GitHub Actions自动部署
```

### 备份策略

```bash
# 定期备份构建产物
tar -czf learn-place-backup-$(date +%Y%m%d).tar.gz docs/.vitepress/dist/

# 或使用Git标签
git tag v1.0.0
git push origin v1.0.0
```

### 安全更新

- 定期运行 `npm audit` 检查安全漏洞
- 及时更新VitePress和依赖版本
- 监控GitHub Security Alerts

---

## 📞 获取帮助

部署过程中遇到问题?

- 📖 [VitePress官方文档](https://vitepress.dev/guide/deploy)
- 💬 [GitHub Discussions](https://github.com/your-org/learn-place/discussions)
- 🐛 [提交Issue](https://github.com/your-org/learn-place/issues)

---

<div align="center">

**祝部署顺利! 🚀**

[⬆ 回到README](../README.md)

</div>

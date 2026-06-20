# LearnPlace 完整技术方案

## 📋 方案概述

本文档为Java后端开发者学习AI/Agent的纯静态网站提供完整的技术实施方案,基于VitePress + Vue 3 + TypeScript技术栈。

---

## 1️⃣ 项目目录结构

```
learn-place/
├── docs/                          # VitePress文档根目录
│   ├── .vitepress/               # VitePress配置目录
│   │   ├── config.ts             # ✅ 主配置文件(导航、侧边栏、SEO等)
│   │   ├── theme/                # 自定义主题
│   │   │   ├── index.ts          # ✅ 主题入口文件
│   │   │   ├── Layout.vue        # ✅ 自定义布局组件
│   │   │   └── components/       # 自定义Vue组件
│   │   │       ├── RoadmapGraph.vue    # ✅ 学习路线图(Mermaid)
│   │   │       ├── QuizWidget.vue      # ✅ 交互式答题组件
│   │   │       └── ProgressPanel.vue   # ✅ 进度追踪面板(ECharts)
│   │   └── public/               # 静态资源(logo、图片等)
│   ├── data/                     # JSON数据文件
│   │   ├── roadmap.json          # ✅ 学习路线数据(6个阶段)
│   │   ├── questions.json        # ✅ 题库数据(5个分类)
│   │   └── projects.json         # ✅ 练手项目数据(5个项目)
│   ├── guide/                    # 学习指南
│   │   ├── roadmap.md            # ✅ 学习路线总览页
│   │   ├── llm-basics/           # LLM基础
│   │   │   └── what-is-llm.md    # ✅ 示例学习节点
│   │   ├── prompt-eng/           # Prompt工程(待补充)
│   │   ├── spring-ai/            # Spring AI框架(待补充)
│   │   ├── rag/                  # RAG全链路(待补充)
│   │   ├── agent/                # Agent开发(待补充)
│   │   └── deployment/           # 部署运维(待补充)
│   ├── resources/                # 学习资料
│   │   └── articles.md           # ✅ 文章汇总页
│   ├── projects/                 # 练手项目
│   │   └── overview.md           # ✅ 项目总览页
│   ├── interview/                # 面试题库
│   │   └── overview.md           # ✅ 使用说明
│   ├── tools/                    # 工具页面
│   │   ├── quiz.md               # ✅ 交互式答题页
│   │   ├── progress.md           # ✅ 进度追踪页
│   │   └── calculator.md         # ✅ Token计算器
│   └── index.md                  # ✅ 首页
├── .github/
│   └── workflows/
│       └── deploy.yml            # ✅ GitHub Actions CI/CD
├── package.json                  # ✅ 项目依赖配置
├── tsconfig.json                 # ✅ TypeScript配置
├── tsconfig.node.json            # ✅ Node环境TS配置
├── .gitignore                    # ✅ Git忽略文件
└── README.md                     # ✅ 项目说明文档
```

**统计**:
- ✅ 已创建: 24个核心文件
- 📝 待补充: 约30个学习节点Markdown文件
- 🎨 待添加: logo.svg、favicon.ico等静态资源

---

## 2️⃣ VitePress核心配置

### 配置文件: `docs/.vitepress/config.ts`

**关键配置项**:

```typescript
export default defineConfig({
  // 站点基本信息
  title: 'LearnPlace',
  description: 'Java后端开发者转型AI/Agent应用开发的系统化学习平台',
  base: '/learn-place/',  // GitHub Pages基础路径
  
  // SEO优化
  head: [
    ['meta', { name: 'keywords', content: 'Java,AI,Agent,LLM,...' }],
    ['meta', { property: 'og:title', content: '...' }],
  ],
  
  // Markdown增强
  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' },
    lineNumbers: true,
    // Mermaid支持
    config: (md) => { /* ... */ }
  },
  
  // 导航栏
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '学习指南', link: '/guide/roadmap' },
      // ...
    ],
    
    // 侧边栏(按模块组织)
    sidebar: {
      '/guide/': [ /* 学习指南菜单 */ ],
      '/resources/': [ /* 学习资料菜单 */ ],
      '/projects/': [ /* 练手项目菜单 */ ],
      '/interview/': [ /* 面试题库菜单 */ ],
      '/tools/': [ /* 工具页面菜单 */ ],
    },
    
    // 其他配置
    search: { provider: 'local' },
    editLink: { pattern: '...' },
    lastUpdated: { /* ... */ },
  },
  
  // PWA支持(可选)
  pwa: { /* ... */ },
  
  // Vite别名
  vite: {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'docs'),
        '@components': resolve(__dirname, 'docs/.vitepress/theme/components'),
      }
    }
  }
})
```

---

## 3️⃣ 数据结构设计(JSON Schema)

### 3.1 学习路线数据 (`docs/data/roadmap.json`)

```json
{
  "phases": [
    {
      "id": "phase-1",
      "title": "LLM基础认知",
      "duration": "2周",
      "difficulty": "L1",
      "prerequisites": ["Java基础", "HTTP协议"],
      "description": "理解大语言模型的基本概念...",
      "nodes": [
        {
          "id": "node-1-1",
          "title": "什么是大语言模型",
          "type": "article",
          "url": "/guide/llm-basics/what-is-llm",
          "estimatedMinutes": 30,
          "tags": ["理论基础"],
          "resources": [
            {
              "type": "doc",
              "title": "Attention Is All You Need论文",
              "url": "https://arxiv.org/abs/1706.03762"
            }
          ]
        }
      ]
    }
  ]
}
```

**字段说明**:
- `phases`: 学习阶段数组(共6个)
- `nodes`: 每个阶段的学习节点
- `type`: 节点类型(article/video/code/practice)
- `resources`: 关联的外部资源

### 3.2 题目数据 (`docs/data/questions.json`)

```json
{
  "categories": [
    {
      "id": "llm-theory",
      "name": "LLM理论基础",
      "description": "大语言模型的基础概念...",
      "questions": [
        {
          "id": "q-001",
          "type": "single_choice",  // single_choice | multiple_choice
          "difficulty": "easy",      // easy | medium | hard
          "question": "Transformer架构中,Self-Attention的主要作用是?",
          "options": [
            { "key": "A", "text": "提取局部特征" },
            { "key": "B", "text": "捕捉序列中长距离依赖关系" }
          ],
          "correctAnswer": "B",      // 单选: string, 多选: string[]
          "explanation": "Self-Attention通过计算...",
          "knowledgePoints": ["Transformer", "Attention机制"],
          "references": ["https://arxiv.org/abs/1706.03762"]
        }
      ]
    }
  ]
}
```

**当前数据**:
- 5个分类: llm-theory, prompt-eng, rag, agent, frameworks
- 8道示例题目(涵盖各难度级别)

### 3.3 项目数据 (`docs/data/projects.json`)

```json
{
  "projects": [
    {
      "id": "proj-1",
      "title": "智能问答机器人",
      "level": "L1",
      "duration": "1周",
      "techStack": ["Spring Boot 3", "Spring AI", "OpenAI API"],
      "description": "基于Spring AI实现简单的QA机器人...",
      "requirements": [
        "用户输入问题,机器人返回答案",
        "支持多轮对话,保持上下文"
      ],
      "architecture": "```mermaid\ngraph LR\n...",
      "implementationSteps": [
        "创建Spring Boot项目...",
        "配置OpenAI API Key..."
      ],
      "codeExamples": [
        {
          "title": "ChatController示例",
          "language": "java",
          "code": "@RestController\n..."
        }
      ],
      "testingCriteria": [
        "单轮对话正常响应",
        "多轮对话能记住上下文"
      ],
      "commonIssues": [
        "API Key配置错误导致401",
        "Token超限需要设置maxTokens"
      ]
    }
  ]
}
```

**5个项目**:
1. L1: 智能问答机器人(1周)
2. L2: RAG知识库系统(2周)
3. L2: 代码生成Agent(2周)
4. L3: 多Agent协作系统(3周)
5. L3: 智能客服系统(3周)

### 3.4 用户进度数据(localStorage)

```typescript
interface UserProgress {
  userId: string;                    // 使用时间戳生成
  completedNodes: string[];          // 已完成的学习节点ID
  quizResults: Array<{
    questionId: string;
    userAnswer: string | string[];
    isCorrect: boolean;
    timestamp: number;
  }>;
  projectSubmissions: Array<{
    projectId: string;
    githubUrl: string;
    submittedAt: number;
  }>;
  checkinRecords: number[];          // 打卡日期时间戳数组
  lastVisit: number;
}
```

**存储位置**: `localStorage.getItem('userProgress')`

---

## 4️⃣ 核心Vue组件实现

### 4.1 学习路线图 (`RoadmapGraph.vue`)

**功能**:
- ✅ 使用Mermaid.js渲染学习路线图
- ✅ 根据用户进度高亮已完成节点
- ✅ 点击节点跳转到对应页面
- ✅ 响应式设计

**核心技术**:
```vue
<script setup lang="ts">
import mermaid from 'mermaid'

// 初始化Mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
})

// 生成Mermaid代码
function generateMermaidCode(): string {
  let code = 'graph LR\n'
  code += '    classDef completed fill:#10b981...\n'
  // ...动态生成节点和连接
  return code
}

// 渲染图表
async function renderDiagram() {
  const { svg } = await mermaid.render('roadmap-diagram', code)
  containerRef.value.innerHTML = svg
}
</script>
```

**样式特点**:
- 三种状态颜色: 已完成(绿色)、进行中(蓝色)、未开始(灰色)
- 图例说明
- 移动端适配

### 4.2 交互式答题 (`QuizWidget.vue`)

**功能**:
- ✅ 从JSON加载题目
- ✅ 单选/多选交互界面
- ✅ 即时反馈(答对/答错)
- ✅ 显示解析和知识点
- ✅ 记录答题结果到localStorage
- ✅ 错题本功能
- ✅ 进度条和正确率统计

**核心逻辑**:
```vue
<script setup lang="ts">
const selectedAnswers = ref<string[]>([])
const showExplanation = ref(false)
const quizResults = ref<QuizResult[]>([])

// 选择答案
function selectAnswer(key: string) {
  if (currentQuestion.value?.type === 'single_choice') {
    selectedAnswers.value = [key]
  } else {
    // 多选题切换
    const index = selectedAnswers.value.indexOf(key)
    if (index > -1) {
      selectedAnswers.value.splice(index, 1)
    } else {
      selectedAnswers.value.push(key)
    }
  }
}

// 提交答案
function submitAnswer() {
  showExplanation.value = true
  const result = {
    questionId: currentQuestion.value.id,
    isCorrect: isCorrect.value,
    timestamp: Date.now(),
  }
  quizResults.value.push(result)
  
  // 保存到localStorage
  saveQuizResults()
  
  // 答错加入错题本
  if (!isCorrect.value) {
    wrongQuestions.value.add(currentQuestion.value.id)
  }
}
</script>
```

**UI特性**:
- 难度徽章(简单/中等/困难)
- 选项选中/正确/错误状态
- 渐变色进度条
- 平滑动画效果

### 4.3 进度追踪面板 (`ProgressPanel.vue`)

**功能**:
- ✅ 展示学习进度百分比
- ✅ 连续打卡天数统计
- ✅ 技能雷达图(ECharts)
- ✅ 最近学习活动
- ✅ 打卡按钮

**ECharts雷达图**:
```vue
<script setup lang="ts">
import * as echarts from 'echarts'

function initChart() {
  chartInstance = echarts.init(chartRef.value)
  const option: echarts.EChartsOption = {
    radar: {
      indicator: skillData.value.map(item => ({
        name: item.name,
        max: 100,
      })),
    },
    series: [{
      type: 'radar',
      data: [{
        value: skillData.value.map(item => item.value),
        areaStyle: { color: 'rgba(59, 130, 246, 0.3)' },
      }]
    }]
  }
  chartInstance.setOption(option)
}
</script>
```

**统计卡片**:
- 📚 总体进度(完成百分比)
- 🔥 连续打卡天数
- ✓ 答题正确率
- 🚀 完成项目数

---

## 5️⃣ GitHub Actions CI/CD配置

### 工作流文件: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:  # 允许手动触发

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      
      - uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/deploy-pages@v4
```

**部署流程**:
1. 推送到main分支触发
2. 安装Node.js 20和依赖
3. 执行`npm run build`构建
4. 上传构建产物到GitHub Pages
5. 自动部署并生成访问URL

**启用步骤**:
1. 仓库Settings → Pages → Source选择"GitHub Actions"
2. 推送代码到main分支
3. 查看Actions标签页的执行状态

---

## 6️⃣ 性能优化策略

### 6.1 已实现的优化

✅ **代码分割**: VitePress自动按路由分割  
✅ **图片懒加载**: 原生`loading="lazy"`  
✅ **Service Worker**: PWA缓存(可选配置)  
✅ **预加载**: 关键资源优先加载  
✅ **压缩**: Gzip/Brotli(GitHub Pages自动)  

### 6.2 Markdown优化

```markdown
<!-- 图片懒加载 -->
![Alt](./image.png)

<!-- 代码块语法高亮 -->
```java
@RestController
public class ChatController { }
```

<!-- Mermaid图表按需渲染 -->
```mermaid
graph LR
    A --> B
```
```

### 6.3 Vue组件优化

- **懒加载**: 大型组件使用`defineAsyncComponent`
- **虚拟滚动**: 长列表使用`vue-virtual-scroller`(待实现)
- **防抖节流**: 搜索框、滚动事件

### 6.4 缓存策略

**localStorage**:
- 用户进度数据
- 答题历史记录
- 错题本

**浏览器缓存**:
- 静态资源(CSS/JS): 1年
- HTML文件: 协商缓存
- JSON数据: 1天

---

## 7️⃣ 扩展性设计

### 7.1 为后续动态化预留接口

**当前**: 纯静态,数据存储在JSON文件和localStorage  
**未来**: 可无缝升级为前后端分离架构

**预留接口**:
```typescript
// 当前: 从JSON文件读取
import questionsData from '../data/questions.json'

// 未来: 从API获取
const { data: questionsData } = useQuery('/api/questions')
```

**升级路径**:
1. 添加后端服务(Spring Boot)
2. 数据库存储(PostgreSQL)
3. 用户认证(JWT)
4. API替换JSON文件读取
5. 保持前端组件不变

### 7.2 模块化设计

**组件独立**:
- RoadmapGraph: 只依赖Mermaid
- QuizWidget: 只依赖题目数据
- ProgressPanel: 只依赖localStorage

**易于替换**:
- 更换图表库(Mermaid → D3.js)
- 更换UI组件库(Ant Design Vue)
- 更换状态管理(Pinia)

---

## 8️⃣ 部署说明

### 8.1 GitHub Pages(推荐)

**优势**:
- ✅ 免费
- ✅ 自动HTTPS
- ✅ CI/CD集成
- ✅ 自定义域名

**步骤**:
1. 启用GitHub Pages(Settings → Pages)
2. 推送代码到main分支
3. 等待Actions完成部署
4. 访问 `https://your-org.github.io/learn-place/`

### 8.2 Vercel

**优势**:
- ✅ 更快的CDN
- ✅ 自动预览部署
- ✅ 分析工具

**步骤**:
1. 导入GitHub仓库
2. 配置构建命令: `npm run build`
3. 输出目录: `docs/.vitepress/dist`
4. 点击Deploy

### 8.3 Netlify

类似Vercel,配置相同。

### 8.4 自定义域名

**GitHub Pages**:
1. Settings → Pages → Custom domain
2. 创建 `docs/.vitepress/public/CNAME` 文件
3. DNS添加CNAME记录

**Vercel/Netlify**: 平台内直接配置

---

## 9️⃣ 内容补充计划

### 待完成的Markdown文件(~30个)

**学习指南**:
- [ ] `/guide/llm-basics/transformer.md`
- [ ] `/guide/llm-basics/token-embedding.md`
- [ ] `/guide/prompt-eng/principles.md`
- [ ] `/guide/prompt-eng/techniques.md`
- [ ] `/guide/prompt-eng/optimization.md`
- [ ] `/guide/spring-ai/quickstart.md`
- [ ] `/guide/spring-ai/chat-client.md`
- [ ] `/guide/spring-ai/function-calling.md`
- [ ] `/guide/rag/architecture.md`
- [ ] `/guide/rag/vector-db.md`
- [ ] `/guide/rag/chunking.md`
- [ ] `/guide/rag/retrieval.md`
- [ ] `/guide/agent/design-patterns.md`
- [ ] `/guide/agent/react.md`
- [ ] `/guide/agent/multi-agent.md`
- [ ] `/guide/deployment/model-deploy.md`
- [ ] `/guide/deployment/performance.md`
- [ ] `/guide/deployment/monitoring.md`

**练手项目详情**:
- [ ] `/projects/project-1-qa-bot.md`
- [ ] `/projects/project-2-rag-kb.md`
- [ ] `/projects/project-3-code-agent.md`
- [ ] `/projects/project-4-multi-agent.md`
- [ ] `/projects/project-5-customer-service.md`

**面试题库**:
- [ ] `/interview/llm-theory/basics.md`
- [ ] `/interview/llm-theory/advanced.md`
- [ ] `/interview/prompt-eng/principles.md`
- [ ] `/interview/prompt-eng/cases.md`
- [ ] `/interview/rag/core.md`
- [ ] `/interview/rag/optimization.md`
- [ ] `/interview/agent/patterns.md`
- [ ] `/interview/agent/system-design.md`
- [ ] `/interview/frameworks/spring-ai.md`
- [ ] `/interview/frameworks/langchain4j.md`
- [ ] `/interview/system-design/high-concurrency.md`
- [ ] `/interview/system-design/fault-tolerance.md`

**其他资源**:
- [ ] `/resources/videos.md`
- [ ] `/resources/docs.md`
- [ ] `/resources/projects.md`

---

## 🔟 技术栈总结

| 类别 | 技术 | 版本 | 用途 |
|------|------|------|------|
| **框架** | VitePress | 1.5+ | 静态站点生成 |
| **UI** | Vue 3 | 3.4+ | 组件化开发 |
| **语言** | TypeScript | 5.3+ | 类型安全 |
| **图表** | Mermaid | 10.6+ | 流程图渲染 |
| **可视化** | ECharts | 5.4+ | 雷达图 |
| **部署** | GitHub Pages | - | 免费托管 |
| **CI/CD** | GitHub Actions | - | 自动部署 |

---

## 📊 项目统计

**已完成**:
- ✅ 24个核心文件
- ✅ 3个Vue组件(RoadmapGraph/QuizWidget/ProgressPanel)
- ✅ 3个JSON数据文件(roadmap/questions/projects)
- ✅ 1个GitHub Actions工作流
- ✅ 完整的配置和文档

**待完成**:
- 📝 ~30个Markdown内容文件
- 🎨 静态资源(logo、favicon、PWA图标)
- 🧪 测试用例
- 🌐 多语言支持(i18n)

**预估工作量**:
- 内容编写: 40-60小时
- UI美化: 8-12小时
- 测试优化: 4-8小时
- **总计**: 约60-80小时

---

## 🎯 下一步行动

1. **立即开始**: 
   ```bash
   npm install
   npm run dev
   ```

2. **补充内容**: 按优先级编写Markdown文件
   - 优先: LLM基础、Prompt工程、Spring AI
   - 其次: RAG、Agent、部署
   - 最后: 面试题库、项目详情

3. **收集反馈**: 
   - 邀请目标用户试用
   - 收集改进建议
   - 迭代优化

4. **正式发布**:
   - 完善README
   - 添加演示截图
   - 发布到GitHub

---

## 💡 关键技术亮点

1. **纯静态架构**: 零运维成本,适合个人/小团队
2. **JSON数据驱动**: 内容与代码分离,易于维护
3. **Vue组件复用**: 三个核心组件可在不同页面复用
4. **localStorage持久化**: 无需后端即可追踪用户进度
5. **Mermaid集成**: Markdown中直接写流程图
6. **PWA支持**: 可离线访问,提升用户体验
7. **TypeScript类型安全**: 减少运行时错误
8. **响应式设计**: 完美适配移动端

---

**文档版本**: v1.0  
**更新日期**: 2026-06-20  
**维护者**: LearnPlace Team

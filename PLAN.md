# Java后端开发者AI/Agent学习平台 - 静态网站实施方案

## 项目概述

### 背景与目标
构建一个面向Java后端开发者的**纯静态学习网站**,帮助用户系统掌握大模型应用开发技能,顺利通过AI/Agent相关岗位的笔试与面试。

**目标用户**: Java后端开发者,希望转型AI应用开发,准备相关笔试面试  
**核心价值**: 系统化学习路径 + 实战项目训练 + 能力评估体系 + 纯静态零运维

**第一期交付**: 纯静态网站(VitePress + Vue 3),部署到GitHub Pages,无后端依赖,为后续动态化预留接口。

---

## 技术栈选型

### 前端技术栈(第一期 - 纯静态)
- **框架**: VitePress 1.x + Vue 3.4 + TypeScript
- **UI组件库**: Ant Design Vue(可选) + 自定义Vue组件
- **可视化**: Mermaid.js(流程图) + ECharts(雷达图)
- **状态管理**: localStorage(用户进度、答题记录)
- **部署平台**: GitHub Pages
- **代码规范**: ESLint + Prettier

**选择理由**: 
- VitePress专为文档优化,SEO友好,零配置启动
- 纯静态架构,零运维成本,免费托管
- Markdown编写内容,易于维护和扩展
- Vue组件实现交互功能(答题、进度追踪)
- JSON数据驱动,内容与代码分离,预留动态化接口

---

### 后端技术栈(第二期 - 动态化预留)
- **框架**: Spring Boot 3.3.6 + Java 17
- **数据库**: PostgreSQL 16
- **ORM**: MyBatis-Plus 3.5.7
- **缓存**: Redis 7.x + Spring Cache
- **API风格**: RESTful
- **认证方案**: JWT + Spring Security 6
- **架构模式**: 模块化单体(Spring Modulith)

**选择理由**:
- Spring Boot 3.x长期支持至2028年,性能优越
- PostgreSQL功能全面,扩展性强
- MyBatis-Plus SQL可控,国内生态好
- JWT无状态认证,高性能,微服务友好
- 模块化单体架构,部署简单,调试方便

---

## 内容体系设计

### 学习路线(6大阶段)

基于深度调研,设计了从Java后端到AI Agent开发的完整进阶路径:

#### 阶段1: LLM基础认知 (2周)
- **核心知识点**: Transformer架构、Token概念、主流LLM对比、API调用基础
- **前置技能**: 
  - Java基础(集合框架、多线程、IO流)
  - HTTP协议(GET/POST请求、JSON数据格式)
- **前置技能扩展学习**:
  - 📚 **Java复习**: [Java核心技术卷I](https://book.douban.com/subject/34891576/) 第1-10章
  - 📚 **HTTP入门**: [MDN HTTP概述](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Overview)
  - 🎥 **视频教程**: [B站-尚硅谷Java基础教程](https://www.bilibili.com/video/BV1Kb411W75N) (播放量200万+,3小时精选)
  - ✅ **自测清单**: 
    - [ ] 能解释HashMap和ConcurrentHashMap的区别
    - [ ] 能用HttpClient发送POST请求并解析JSON响应
    - [ ] 理解RESTful API设计原则
- **里程碑**: 能解释Transformer原理,成功调用OpenAI API

#### 阶段2: Prompt Engineering (1-2周)
- **核心知识点**: Prompt设计原则、Few-shot Learning、Chain-of-Thought、Prompt注入防御
- **前置技能**: 
  - 阶段1完成(LLM基础认知)
  - 基础逻辑思维(算法复杂度分析)
- **前置技能扩展学习**:
  - 📚 **逻辑训练**: [LeetCode简单题](https://leetcode.cn/problemset/all/?difficulty=EASY) 刷20道
  - 📚 **Prompt基础**: [OpenAI Prompt Engineering指南](https://platform.openai.com/docs/guides/prompt-engineering)
  - 🎥 **视频教程**: [吴恩达-Prompt Engineering课程](https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/) (免费,1.5小时)
  - ✅ **自测清单**: 
    - [ ] 能区分Zero-shot和Few-shot的应用场景
    - [ ] 能写出清晰的System Prompt
    - [ ] 理解Temperature参数对输出的影响
- **里程碑**: 掌握5种以上Prompt技巧,实现Few-shot分类准确率90%+

#### 阶段3: Java生态LLM框架 (2-3周)
- **核心知识点**: Spring AI框架、LangChain4j、向量数据库集成、Embedding模型
- **前置技能**: 
  - Spring Boot 3.x(依赖注入、自动配置、RESTful API)
  - Maven/Gradle依赖管理
  - RESTful API开发经验
- **前置技能扩展学习**:
  - 📚 **Spring Boot复习**: [Spring Boot官方指南](https://spring.io/guides/gs/spring-boot/) Getting Started系列
  - 📚 **Maven进阶**: [Maven实战](https://book.douban.com/subject/25866350/) 第1-5章
  - 🎥 **视频教程**: [B站-雷丰阳Spring Boot 3教程](https://www.bilibili.com/video/BV1L84y1F7Nh) (播放量80万+,5小时核心内容)
  - ✅ **自测清单**: 
    - [ ] 能创建Spring Boot项目并配置application.yml
    - [ ] 理解@Controller vs @RestController区别
    - [ ] 能用Maven管理多模块项目依赖
    - [ ] 熟悉JUnit 5单元测试编写
- **里程碑**: 使用Spring AI完成第一个LLM对话应用

#### 阶段4: RAG全链路开发 (2-3周)
- **核心知识点**: RAG架构原理、文档切分策略、向量检索、引用溯源、RAG评估指标
- **前置技能**: 
  - 阶段3完成(Java生态LLM框架)
  - 向量数据库基础(向量相似度、索引类型)
  - Embedding模型理解(文本向量化原理)
- **前置技能扩展学习**:
  - 📚 **向量基础**: [Understanding Word Vectors](https://www.youtube.com/watch?v=ERibwqs9p38) (Stanford CS224n, 1小时)
  - 📚 **数据库入门**: [Milvus官方教程](https://milvus.io/docs/quickstart.md) Quick Start章节
  - 🎥 **视频教程**: [B站-向量数据库原理与Milvus实战](https://www.bilibili.com/video/BV1Xh4y1t7Gz) (播放量15万+,2小时)
  - ✅ **自测清单**: 
    - [ ] 能解释余弦相似度和欧氏距离的区别
    - [ ] 理解HNSW索引的工作原理
    - [ ] 能用Python/Java调用Embedding API生成向量
    - [ ] 知道什么是向量维度(768/1536维的含义)
- **里程碑**: 构建PDF文档知识库问答系统,检索准确率80%+

#### 阶段5: Agent架构与开发 (3-4周)
- **核心知识点**: ReAct模式、Tool Use、多Agent协作、工作流编排
- **前置技能**: 
  - 阶段4完成(RAG全链路开发)
  - 设计模式理解(策略模式、观察者模式、责任链模式)
  - 并发编程基础(ThreadPoolExecutor、CompletableFuture)
- **前置技能扩展学习**:
  - 📚 **设计模式**: [Head First设计模式](https://book.douban.com/subject/2243615/) 重点阅读Strategy、Observer、Chain of Responsibility
  - 📚 **并发编程**: [Java并发编程实战](https://book.douban.com/subject/26897823/) 第1-8章
  - 🎥 **视频教程**: [B站-马士兵设计模式精讲](https://www.bilibili.com/video/BV1KC4y1x7Fo) (播放量120万+,选看Strategy/Observer章节,共3小时)
  - ✅ **自测清单**: 
    - [ ] 能手写单例模式(双重检查锁定)
    - [ ] 理解ThreadPoolExecutor的7个参数
    - [ ] 能用CompletableFuture实现异步任务编排
    - [ ] 知道Reactor模式和Observer模式的区别
- **里程碑**: 实现ReAct天气查询Agent,构建三Agent协作系统

#### 阶段6: 生产部署与运维 (1-2周)
- **核心知识点**: vLLM推理引擎、语义缓存、Prometheus监控、成本控制
- **前置技能**: 
  - Docker/Kubernetes基础(镜像构建、容器编排)
  - Linux运维经验(常用命令、日志查看、进程管理)
  - 监控系统使用(Prometheus/Grafana基本概念)
- **前置技能扩展学习**:
  - 📚 **Docker入门**: [Docker官方教程](https://docs.docker.com/get-started/) Get Started章节
  - 📚 **Linux基础**: [鸟哥的Linux私房菜](http://linux.vbird.org/) 基础篇前10章
  - 🎥 **视频教程**: [B站-狂神说Docker教程](https://www.bilibili.com/video/BV1mW411i7MD) (播放量300万+,4小时精华版)
  - 🎥 **视频教程**: [B站-Prometheus+Grafana监控实战](https://www.bilibili.com/video/BV1vx4y1r7Rz) (播放量25万+,3小时)
  - ✅ **自测清单**: 
    - [ ] 能编写Dockerfile构建Spring Boot应用镜像
    - [ ] 理解docker-compose.yml的基本结构
    - [ ] 能用kubectl部署应用到K8s集群
    - [ ] 会用top、grep、tail等Linux命令排查问题
    - [ ] 知道Prometheus的Exporter和Grafana的Dashboard是什么
- **里程碑**: 部署Ollama本地模型,实现语义缓存降低成本50%+

**预计总时长**: 11-16周(约3-4个月)

---

### 练手项目(5个由浅入深)

#### 项目1: 智能问答机器人(L1入门)
- **需求**: 基于Spring AI + OpenAI API实现简单的QA机器人
- **技术栈**: Spring Boot 3 + Spring AI + OpenAI
- **实现要点**: API调用、异常处理、流式响应、多轮对话记忆
- **验收标准**: 单轮对话响应<3秒,流式首字延迟<1秒

#### 项目2: 企业知识库RAG系统(L2进阶)
- **需求**: 构建基于PDF/Word文档的企业知识库问答系统
- **技术栈**: Spring AI + LangChain4j + Milvus/Pinecone + PDF解析
- **实现要点**: 文档加载、文本切分、向量化、检索增强生成、引用溯源
- **验收标准**: PDF解析准确率>95%,检索Recall@5 > 80%

#### 项目3: 智能代码助手Agent(L2进阶)
- **需求**: 开发能理解代码上下文并提供建议的Agent
- **技术栈**: Spring AI + Code LLM + JGit + Tree-sitter
- **实现要点**: 代码解析、Tool Use、Git集成、代码审查
- **验收标准**: 代码审查建议准确率>80%,工具调用成功率>90%

#### 项目4: 多Agent协作工作流(L3挑战)
- **需求**: Researcher-Agent + Writer-Agent + Reviewer-Agent协作完成报告生成
- **技术栈**: Spring AI + LangGraph + RabbitMQ + PostgreSQL
- **实现要点**: Agent通信、任务分解、人工介入节点、错误恢复
- **验收标准**: 报告事实准确率>85%,工作流完成率>90%

#### 项目5: 智能客服系统(综合实战)
- **需求**: 结合RAG + Agent + 意图识别的完整客服系统
- **技术栈**: Spring AI + RAG + Intent Classification + WebSocket + Redis
- **实现要点**: 意图识别、情感分析、多轮对话管理、人工转接
- **验收标准**: 意图识别准确率>85%,平均响应时间<3秒

---

### 题库设计(6大分类)

整理高频笔试/面试题,按类别分类:

1. **LLM理论基础**(10-15题): Transformer架构、Attention机制、Tokenization方法
2. **Prompt Engineering**(10-15题): Prompt设计原则、Few-shot vs Zero-shot、CoT应用场景
3. **RAG架构**(15-20题): RAG工作流程、向量数据库选型、文本切分策略、检索优化
4. **Agent开发**(15-20题): Agent核心组件、ReAct模式、Tool Use、多Agent协作
5. **框架使用**(10-15题): Spring AI核心API、LangChain4j使用方法、向量数据库操作
6. **场景设计题**(5-10题): 设计智能文档审核系统、代码自动生成Agent、客服系统架构

每题包含: 题目描述、题型、难度等级、正确答案、详细解析、评分标准、相关知识点链接

---

### 学习资料汇总

#### 官方文档
- Spring AI官方文档: https://docs.spring.io/spring-ai/reference/
- LangChain4j官方文档: https://docs.langchain4j.dev/
- OpenAI API文档: https://platform.openai.com/docs
- Milvus官方文档: https://milvus.io/docs/

#### 优质博客(至少10篇)
1. **[Spring AI入门指南](https://spring.io/blog/2024/07/15/spring-ai-1-0-0-m1-available-now)** - Spring官方博客,2026年最新版
2. **[LangChain4j开发Java Agent智能体](https://blog.langchain.dev/langchain4j-java-agents/)** - LangChain官方博客
3. **[Java AI开发实战:Spring AI完全指南](https://www.infoq.cn/article/spring-ai-complete-guide)** - InfoQ技术深度文章
4. **[RAG技术深度解析](https://www.pinecone.io/learn/retrieval-augmented-generation/)** - Pinecone官方技术博客
5. **[高级RAG技术](https://codelabs.developers.google.cn/codelabs/production-ready-ai-with-gc/8-advanced-rag-methods/advanced-rag-methods)** - Google Codelab实战教程
6. **[Agent设计模式:6大模式从原理到选型](https://lilianweng.github.io/posts/2023-06-23-agent/)** - Lilian Weng(OpenAI研究员)技术博客
7. **[Prompt Engineering核心技巧](https://platform.openai.com/docs/guides/prompt-engineering)** - OpenAI官方指南
8. **[向量数据库对比:Milvus/Qdrant/Chroma](https://milvus.io/blog/vector-database-comparison-2024)** - Milvus官方技术对比
9. **[LLM成本控制终极指南](https://www.anthropic.com/news/contextual-retrieval)** - Anthropic官方博客
10. **[AI Agent面试通关秘籍](https://github.com/dair-ai/AI-Interview-Guide)** - GitHub开源面试指南(1.5K+ stars)

#### 视频教程
- B站: 2026最新Java+AI大模型智能应用开发教程(20小时+)
- B站: LangChain4j开发Java Agent智能体视频教程(15小时+)
- YouTube: Build AI Agents with LangChain4j(8小时)
- Coursera: Generative AI: Prompt Engineering Basics(IBM官方课程)

#### 开源项目推荐
- **Spring AI** (9K+ stars) - 企业级AI应用快速集成,官方维护
- **LangChain4j** (12.4K+ stars) - 复杂Agent和RAG系统,社区活跃
- **Spring AI Alibaba** (10.1K+ stars) - 阿里云百炼集成方案,国内生态完善
- **langchain4j-examples** (1.2K+ stars) - LangChain4j官方示例代码集合
- **spring-ai-demo** (800+ stars) - Spring AI RAG知识库问答机器人实战

---

## 网站架构设计

### 项目目录结构

```
learn-place/
├── docs/                    # VitePress文档根目录
│   ├── .vitepress/         # VitePress配置
│   │   ├── config.ts       # 主配置文件(导航、侧边栏、SEO)
│   │   ├── theme/          # 自定义主题
│   │   │   ├── index.ts
│   │   │   ├── Layout.vue
│   │   │   └── components/ # 自定义组件
│   │   │       ├── RoadmapGraph.vue    # 学习路线图
│   │   │       ├── QuizWidget.vue      # 交互式答题
│   │   │       └── ProgressPanel.vue   # 进度追踪面板
│   │   └── public/         # 静态资源
│   ├── data/               # JSON数据文件
│   │   ├── roadmap.json    # 学习路线数据
│   │   ├── questions.json  # 题库数据
│   │   └── projects.json   # 项目数据
│   ├── guide/              # 学习指南
│   │   ├── roadmap.md      # 学习路线总览
│   │   ├── llm-basics/     # LLM基础(3-5个Markdown文件)
│   │   ├── prompt-eng/     # Prompt工程(3-5个Markdown文件)
│   │   ├── spring-ai/      # Spring AI框架(4-6个Markdown文件)
│   │   ├── rag/            # RAG全链路(4-6个Markdown文件)
│   │   ├── agent/          # Agent开发(5-7个Markdown文件)
│   │   └── deployment/     # 部署运维(2-3个Markdown文件)
│   ├── resources/          # 学习资料
│   │   ├── articles.md     # 文章汇总
│   │   ├── videos.md       # 视频教程
│   │   ├── docs.md         # 官方文档
│   │   └── projects.md     # 开源项目
│   ├── projects/           # 练手项目
│   │   ├── overview.md     # 项目总览
│   │   ├── project-1-qa-bot.md        # 智能问答机器人
│   │   ├── project-2-rag-kb.md        # 企业知识库RAG系统
│   │   ├── project-3-code-agent.md    # 智能代码助手Agent
│   │   ├── project-4-multi-agent.md   # 多Agent协作工作流
│   │   └── project-5-customer-service.md  # 智能客服系统
│   ├── interview/          # 题库与面试
│   │   ├── overview.md     # 使用说明
│   │   ├── llm-theory/     # LLM理论(10-15题)
│   │   ├── prompt-eng/     # Prompt工程(10-15题)
│   │   ├── rag/            # RAG架构(15-20题)
│   │   ├── agent/          # Agent开发(15-20题)
│   │   ├── frameworks/     # 框架使用(10-15题)
│   │   └── system-design/  # 系统设计(5-10题)
│   ├── tools/              # 工具页面(Vue组件)
│   │   ├── quiz.md         # 交互式答题页
│   │   ├── progress.md     # 进度追踪页
│   │   └── calculator.md   # Token计算器
│   └── index.md            # 首页
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions CI/CD
├── package.json
├── tsconfig.json
├── README.md               # 项目说明
└── QUICKSTART.md           # 快速启动指南
```

### 核心Vue组件设计

#### 1. RoadmapGraph.vue - 学习路线图
- **功能**: 使用Mermaid.js渲染学习路线图,支持点击节点跳转,根据用户进度高亮已完成节点
- **技术实现**:
  ```vue
  <template>
    <div class="roadmap-container">
      <div ref="mermaidRef" class="mermaid">
        {{ mermaidCode }}
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import mermaid from 'mermaid'
  import roadmapData from '../../data/roadmap.json'
  
  // 从localStorage读取用户进度
  const completedNodes = JSON.parse(localStorage.getItem('completedNodes') || '[]')
  
  // 生成Mermaid代码,高亮已完成节点
  const generateMermaidCode = () => {
    let code = 'graph TD\n'
    roadmapData.phases.forEach(phase => {
      phase.nodes.forEach(node => {
        const isCompleted = completedNodes.includes(node.id)
        const style = isCompleted ? ':::completed' : ''
        code += `  ${node.id}[${node.title}]${style}\n`
      })
    })
    return code
  }
  
  onMounted(() => {
    mermaid.initialize({ startOnLoad: true })
    mermaid.run()
  })
  </script>
  ```

#### 2. QuizWidget.vue - 交互式答题
- **功能**: 从JSON加载题目,单选/多选交互,即时反馈,显示解析,记录答题结果到localStorage,错题本功能
- **技术实现**:
  ```vue
  <template>
    <div class="quiz-widget">
      <div v-if="!quizStarted" class="start-screen">
        <h2>{{ category.name }}</h2>
        <button @click="startQuiz">开始答题</button>
      </div>
      
      <div v-else-if="!quizFinished" class="question-screen">
        <div class="question-header">
          <span class="question-number">第 {{ currentIndex + 1 }}/{{ questions.length }} 题</span>
          <span class="difficulty">难度: {{ currentQuestion.difficulty }}</span>
        </div>
        
        <div class="question-content">
          <p>{{ currentQuestion.question }}</p>
          
          <div v-for="option in currentQuestion.options" :key="option.key" 
               class="option" 
               :class="{ selected: selectedAnswer === option.key }"
               @click="selectAnswer(option.key)">
            {{ option.key }}. {{ option.text }}
          </div>
        </div>
        
        <button @click="submitAnswer" :disabled="!selectedAnswer">提交答案</button>
      </div>
      
      <div v-else class="result-screen">
        <h3>答题完成!</h3>
        <p>正确率: {{ correctCount }}/{{ questions.length }}</p>
        <button @click="reviewWrongAnswers">查看错题</button>
        <button @click="restartQuiz">重新答题</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import questionsData from '../../data/questions.json'
  
  interface QuizResult {
    questionId: string
    userAnswer: string
    isCorrect: boolean
    timestamp: number
  }
  
  const props = defineProps<{
    categoryId: string
  }>()
  
  const category = computed(() => 
    questionsData.categories.find(c => c.id === props.categoryId)
  )
  const questions = computed(() => category.value?.questions || [])
  
  const quizStarted = ref(false)
  const quizFinished = ref(false)
  const currentIndex = ref(0)
  const selectedAnswer = ref('')
  const correctCount = ref(0)
  const quizResults = ref<QuizResult[]>([])
  
  const currentQuestion = computed(() => questions.value[currentIndex.value])
  
  const startQuiz = () => {
    quizStarted.value = true
    quizResults.value = []
  }
  
  const selectAnswer = (key: string) => {
    selectedAnswer.value = key
  }
  
  const submitAnswer = () => {
    const isCorrect = selectedAnswer.value === currentQuestion.value.correctAnswer
    if (isCorrect) correctCount.value++
    
    // 记录答题结果
    quizResults.value.push({
      questionId: currentQuestion.value.id,
      userAnswer: selectedAnswer.value,
      isCorrect,
      timestamp: Date.now()
    })
    
    // 保存到localStorage
    saveToLocalStorage()
    
    // 下一题或结束
    if (currentIndex.value < questions.value.length - 1) {
      currentIndex.value++
      selectedAnswer.value = ''
    } else {
      quizFinished.value = true
    }
  }
  
  const saveToLocalStorage = () => {
    const existing = JSON.parse(localStorage.getItem('quizResults') || '[]')
    localStorage.setItem('quizResults', JSON.stringify([...existing, ...quizResults.value]))
  }
  
  const reviewWrongAnswers = () => {
    // 显示错题和解析
  }
  
  const restartQuiz = () => {
    currentIndex.value = 0
    selectedAnswer.value = ''
    correctCount.value = 0
    quizFinished.value = false
    quizResults.value = []
  }
  </script>
  ```

#### 3. ProgressPanel.vue - 进度追踪面板
- **功能**: 展示学习进度百分比,连续打卡天数统计,技能雷达图(ECharts),最近学习活动
- **技术实现**:
  ```vue
  <template>
    <div class="progress-panel">
      <div class="stats-grid">
        <div class="stat-card">
          <h3>学习进度</h3>
          <div class="progress-bar">
            <div :style="{ width: progressPercentage + '%' }"></div>
          </div>
          <p>{{ progressPercentage }}%</p>
        </div>
        
        <div class="stat-card">
          <h3>连续打卡</h3>
          <p class="streak-number">{{ currentStreak }} 天</p>
        </div>
        
        <div class="stat-card">
          <h3>累计打卡</h3>
          <p class="total-number">{{ totalCheckins }} 天</p>
        </div>
      </div>
      
      <div class="radar-chart" ref="chartRef"></div>
      
      <div class="recent-activities">
        <h3>最近学习活动</h3>
        <ul>
          <li v-for="activity in recentActivities" :key="activity.timestamp">
            {{ activity.description }} - {{ formatDate(activity.timestamp) }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref, computed } from 'vue'
  import * as echarts from 'echarts'
  import roadmapData from '../../data/roadmap.json'
  
  const chartRef = ref<HTMLDivElement>()
  
  // 从localStorage读取用户数据
  const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}')
  const completedNodes = userProgress.completedNodes || []
  const checkinRecords = userProgress.checkinRecords || []
  
  // 计算学习进度
  const totalNodes = roadmapData.phases.reduce((sum, phase) => sum + phase.nodes.length, 0)
  const progressPercentage = computed(() => 
    Math.round((completedNodes.length / totalNodes) * 100)
  )
  
  // 计算连续打卡天数
  const currentStreak = computed(() => {
    // 实现连续打卡计算逻辑
    return calculateStreak(checkinRecords)
  })
  
  const totalCheckins = computed(() => checkinRecords.length)
  
  // 初始化ECharts雷达图
  onMounted(() => {
    if (!chartRef.value) return
    
    const chart = echarts.init(chartRef.value)
    const option = {
      radar: {
        indicator: [
          { name: 'LLM基础', max: 100 },
          { name: 'Prompt工程', max: 100 },
          { name: 'Spring AI', max: 100 },
          { name: 'RAG', max: 100 },
          { name: 'Agent', max: 100 },
          { name: '部署运维', max: 100 }
        ]
      },
      series: [{
        type: 'radar',
        data: [{
          value: calculateSkillScores(), // 根据答题情况计算各维度得分
          name: '技能掌握度'
        }]
      }]
    }
    chart.setOption(option)
  })
  
  const calculateStreak = (records: number[]) => {
    // 实现连续打卡计算
    return 0 // 简化示例
  }
  
  const calculateSkillScores = () => {
    // 根据答题正确率计算各技能维度得分
    return [80, 70, 60, 50, 40, 30] // 示例数据
  }
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-CN')
  }
  
  const recentActivities = computed(() => {
    // 从localStorage获取最近活动
    return []
  })
  </script>
  ```

### 数据结构设计(JSON Schema)

为后续动态化预留,设计以下数据结构:

#### 1. 学习路线数据 (`docs/data/roadmap.json`)
```json
{
  "phases": [
    {
      "id": "phase-1",
      "title": "LLM基础认知",
      "duration": "2周",
      "difficulty": "L1",
      "prerequisites": ["Java基础", "HTTP协议"],
      "nodes": [
        {
          "id": "node-1-1",
          "title": "什么是大语言模型",
          "type": "article",
          "url": "/guide/llm-basics/what-is-llm",
          "estimatedMinutes": 30,
          "tags": ["理论基础"],
          "resources": [
            {"type": "doc", "title": "Transformer论文", "url": "https://arxiv.org/abs/1706.03762"},
            {"type": "video", "title": "李宏毅机器学习", "url": "https://www.bilibili.com/video/BV1J94y1f7Wu"}
          ]
        }
      ]
    }
  ]
}
```

#### 2. 题目数据 (`docs/data/questions.json`)
```json
{
  "categories": [
    {
      "id": "llm-theory",
      "name": "LLM理论基础",
      "questions": [
        {
          "id": "q-001",
          "type": "single_choice",
          "difficulty": "easy",
          "question": "Transformer架构中,Self-Attention的主要作用是?",
          "options": [
            {"key": "A", "text": "提取局部特征"},
            {"key": "B", "text": "捕捉序列中长距离依赖关系"},
            {"key": "C", "text": "加速模型训练"},
            {"key": "D", "text": "减少模型参数量"}
          ],
          "correctAnswer": "B",
          "explanation": "Self-Attention通过计算序列中所有位置的注意力权重,能够捕捉长距离依赖关系...",
          "knowledgePoints": ["Transformer", "Attention机制"],
          "references": ["https://arxiv.org/abs/1706.03762"]
        }
      ]
    }
  ]
}
```

#### 3. 项目数据 (`docs/data/projects.json`)
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
      "requirements": ["支持单轮对话", "支持流式响应", "异常处理"],
      "architecture": "```mermaid\ngraph LR\nUser --> Controller --> ChatClient --> OpenAI API\n```",
      "implementationSteps": ["配置ChatClient", "实现对话接口", "添加异常处理"],
      "testingCriteria": ["单轮对话响应<3秒", "流式首字延迟<1秒"],
      "commonIssues": ["OpenAI API访问受限→使用代理或切换国内模型"]
    }
  ]
}
```

#### 4. 用户进度数据(localStorage schema)
```typescript
interface UserProgress {
  userId: string; // 使用时间戳生成
  completedNodes: string[]; // 已完成的学习节点ID
  quizResults: {
    questionId: string;
    userAnswer: string;
    isCorrect: boolean;
    timestamp: number;
  }[];
  projectSubmissions: {
    projectId: string;
    githubUrl: string;
    submittedAt: number;
  }[];
  checkinRecords: number[]; // 打卡日期时间戳数组
  lastVisit: number;
}
```

---

## 实施步骤
---

## 实施步骤

### Phase 1: 项目初始化与基础架构(1-2天)

**目标**: 完成VitePress项目初始化,配置核心功能

**任务清单**:
- [ ] 使用npm create vitepress初始化项目
- [ ] 配置TypeScript(tsconfig.json)
- [ ] 安装依赖(Vue、Mermaid、ECharts)
- [ ] 创建目录结构(docs/guide、docs/resources等)
- [ ] 配置`.vitepress/config.ts`(导航、侧边栏、SEO)
- [ ] 创建自定义主题(Layout.vue)
- [ ] 编写首页(index.md)
- [ ] 配置GitHub Actions CI/CD(.github/workflows/deploy.yml)

**验收标准**:
- ✓ 本地运行`npm run dev`能正常启动
- ✓ 访问http://localhost:5173能看到精美首页
- ✓ GitHub Pages自动部署成功

---

### Phase 2: 核心Vue组件开发(3-4天)

**目标**: 实现RoadmapGraph、QuizWidget、ProgressPanel三大核心组件

**任务清单**:
- [ ] 开发RoadmapGraph.vue(Mermaid集成、节点高亮、点击跳转)
- [ ] 开发QuizWidget.vue(题目加载、单选/多选交互、即时反馈、localStorage存储)
- [ ] 开发ProgressPanel.vue(ECharts雷达图、打卡统计、进度计算)
- [ ] 创建工具页面(tools/quiz.md、tools/progress.md、tools/calculator.md)
- [ ] 编写JSON数据文件(roadmap.json、questions.json、projects.json)
- [ ] 组件测试(确保无编译错误、功能正常)

**验收标准**:
- ✓ RoadmapGraph能正确渲染学习路线图
- ✓ QuizWidget能完整答题流程(开始→答题→提交→查看结果)
- ✓ ProgressPanel能展示进度、打卡、雷达图
- ✓ 所有组件TypeScript类型检查通过

---

### Phase 3: 内容填充 - 学习指南(5-7天)

**目标**: 完成6大阶段的学习指南Markdown文件

**任务清单**:
- [ ] 编写guide/roadmap.md(学习路线总览,嵌入RoadmapGraph组件)
- [ ] 编写LLM基础系列(llm-basics/*.md,3-5个文件)
  - what-is-llm.md
  - transformer-architecture.md
  - token-and-context.md
  - llm-api-calling.md
- [ ] 编写Prompt工程系列(prompt-eng/*.md,3-5个文件)
  - prompt-design-principles.md
  - few-shot-learning.md
  - chain-of-thought.md
  - prompt-security.md
- [ ] 编写Spring AI系列(spring-ai/*.md,4-6个文件)
  - spring-ai-introduction.md
  - chatclient-api.md
  - function-calling.md
  - vector-store-integration.md
- [ ] 编写RAG系列(rag/*.md,4-6个文件)
- [ ] 编写Agent系列(agent/*.md,5-7个文件)
- [ ] 编写部署运维系列(deployment/*.md,2-3个文件)

**每个Markdown文件结构**:
```markdown
---
title: 什么是大语言模型
description: 介绍LLM的基本概念和核心原理
category: llm-basics
difficulty: L1
estimatedTime: 30分钟
tags:
  - 理论基础
  - Transformer
---

# 什么是大语言模型

## 核心概念
...

## 代码示例
```java
// Spring AI调用示例
```

## 相关资源
- [Transformer论文](https://arxiv.org/abs/1706.03762)
- [李宏毅机器学习视频](https://www.bilibili.com/video/BV1J94y1f7Wu)

## 练习题
<ClientOnly>
  <QuizWidget category-id="llm-theory" />
</ClientOnly>
```

**验收标准**:
- ✓ 至少完成15个学习指南Markdown文件
- ✓ 每个文件包含:理论讲解、代码示例、相关资源链接
- ✓ 关键章节嵌入QuizWidget组件
- ✓ Markdown语法正确,无 broken links

---

### Phase 4: 内容填充 - 练手项目与题库(4-5天)

**目标**: 完成5个练手项目详情和题库页面

**任务清单**:
- [ ] 编写projects/overview.md(项目总览,嵌入项目列表)
- [ ] 编写5个项目详情页:
  - project-1-qa-bot.md(智能问答机器人)
  - project-2-rag-kb.md(企业知识库RAG系统)
  - project-3-code-agent.md(智能代码助手Agent)
  - project-4-multi-agent.md(多Agent协作工作流)
  - project-5-customer-service.md(智能客服系统)
- [ ] 每个项目包含:需求描述、技术架构图(Mermaid)、实现步骤、代码示例、验收标准、常见难点
- [ ] 编写interview/overview.md(题库使用说明)
- [ ] 创建6个分类的题库页面(llm-theory、prompt-eng、rag、agent、frameworks、system-design)
- [ ] 每个分类至少10道题目,嵌入QuizWidget组件

**验收标准**:
- ✓ 5个项目详情页完整,包含架构图和代码示例
- ✓ 题库至少60道题目(每类10道)
- ✓ QuizWidget能正确加载并答题
- ✓ 项目难度分级清晰(L1/L2/L3)

---

### Phase 5: 内容填充 - 学习资料汇总(2-3天)

**目标**: 整理高质量学习资料资源

**任务清单**:
- [ ] 编写resources/articles.md(优质博客文章汇总,至少10篇)
- [ ] 编写resources/videos.md(视频教程汇总,B站/YouTube/Coursera)
- [ ] 编写resources/docs.md(官方文档链接,Spring AI/LangChain4j/OpenAI等)
- [ ] 编写resources/projects.md(开源项目推荐,至少5个)
- [ ] 为每个资源添加:简介、适用阶段、难度评级、链接

**验收标准**:
- ✓ 至少整理30+个高质量学习资源
- ✓ 资源分类清晰,便于检索
- ✓ 所有链接有效,无404

---

### Phase 6: 优化与测试(2-3天)

**目标**: 性能优化、响应式适配、全面测试

**任务清单**:
- [ ] 图片懒加载优化
- [ ] 代码分割(按路由懒加载Vue组件)
- [ ] Service Worker缓存配置(PWA支持)
- [ ] 移动端响应式适配(测试iPhone/Android)
- [ ] SEO优化(meta标签、Open Graph)
- [ ]  accessibility检查(WCAG 2.1 AA标准)
- [ ] 跨浏览器测试(Chrome/Firefox/Safari/Edge)
- [ ] 性能测试(Lighthouse评分>90)
- [ ] 修复所有broken links
- [ ] 拼写检查和语法校对

**验收标准**:
- ✓ Lighthouse性能评分>90
- ✓ 移动端显示正常,无布局错乱
- ✓ 所有交互功能正常工作(答题、进度追踪)
- ✓ 无console error
- ✓ GitHub Pages部署成功,可公开访问

---

## 部署方案

### GitHub Pages部署流程

#### 1. 创建GitHub仓库
```bash
# 创建新仓库
gh repo create learn-place --public --description "Java后端开发者AI/Agent学习平台"

# 克隆到本地
git clone https://github.com/yourusername/learn-place.git
cd learn-place
```

#### 2. 配置GitHub Actions
创建`.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build with VitePress
        run: npm run build
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist
          
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### 3. 配置自定义域名(可选)
- 在仓库Settings → Pages → Custom domain中设置域名
- 在DNS服务商添加CNAME记录指向`yourusername.github.io`
- 在项目根目录创建`docs/public/CNAME`文件,内容为你的域名

#### 4. 推送到GitHub
```bash
git add .
git commit -m "Initial commit: Learn Place static website"
git push origin main
```

GitHub Actions会自动构建并部署,几分钟后即可访问:`https://yourusername.github.io/learn-place/`

---

## 后续扩展建议

### 第二期: 动态化升级(可选)

当静态网站验证了内容价值后,可考虑升级为动态版本:

#### 1. 后端技术选型
- **框架**: Spring Boot 3.3 + Java 17
- **数据库**: PostgreSQL 16(用户数据、学习进度)
- **缓存**: Redis 7.x(热点数据、会话管理)
- **认证**: JWT + Spring Security 6
- **API风格**: RESTful

#### 2. 新增功能
- 用户注册/登录系统
- 学习进度云端同步
- 个性化推荐(基于用户画像)
- 社区互动(评论、点赞、分享)
- 打卡排行榜
- 成就徽章系统
- 在线编程沙箱(代码执行环境)

#### 3. 迁移策略
- 保持现有Markdown内容不变
- 将localStorage数据迁移到PostgreSQL
- Vue组件改为调用后端API
- 前端改为React + Ant Design(可选)
- 前后端分离部署(前端Vercel,后端云服务器)

#### 4. 成本估算
- 云服务器: ¥100-300/月(2核4G)
- 数据库: ¥50-100/月(PostgreSQL托管)
- Redis: ¥30-50/月
- 域名+SSL: ¥50/年
- **总计**: ¥200-500/月

---

## 风险评估与应对

### 技术风险
1. **VitePress插件兼容性**
   - 风险: 某些Vue组件可能与VitePress不兼容
   - 应对: 使用`<ClientOnly>`包裹客户端组件,充分测试

2. **localStorage容量限制**
   - 风险: 浏览器localStorage通常限制5MB
   - 应对: 定期清理过期数据,压缩存储格式

3. **Mermaid图表渲染性能**
   - 风险: 大型流程图可能渲染缓慢
   - 应对: 按需加载,分页展示,使用Web Worker

### 内容风险
1. **技术更新速度快**
   - 风险: AI领域变化快,内容可能过时
   - 应对: 建立季度review机制,及时更新过时内容

2. **版权问题**
   - 风险: 引用外部资源可能涉及版权
   - 应对: 优先引用官方文档和开源资源,标注出处

### 运营风险
1. **用户参与度低**
   - 风险: 纯静态网站缺乏互动,用户粘性差
   - 应对: 添加评论区(Discus/Giscus),建立微信群/Discord社区

2. **内容质量参差不齐**
   - 风险: UGC内容质量难以保证
   - 应对: MVP阶段全部内容由团队审核,后期引入专家审稿

---

## 成功指标(KPI)

### 短期目标(上线3个月)
- 访问量: UV > 1000/月
- 用户停留时间: 平均 > 5分钟
- 内容完成率: 至少完成60%规划内容
- GitHub Stars: > 100

### 中期目标(上线6个月)
- 访问量: UV > 5000/月
- 用户留存率: 周留存 > 30%
- 社区规模: 微信群/Discord > 500人
- GitHub Stars: > 500

### 长期目标(上线1年)
- 访问量: UV > 20000/月
- 用户转化率: 5%用户完成至少1个练手项目
- 品牌影响力: 成为Java转型AI的首选学习平台
- 商业化探索: 企业内训、付费课程、招聘对接

---

## 附录:参考资料

### 技术文档
- [VitePress官方文档](https://vitepress.dev/)
- [Vue 3官方文档](https://cn.vuejs.org/)
- [Mermaid官方文档](https://mermaid.js.org/)
- [ECharts官方文档](https://echarts.apache.org/)
- [GitHub Pages文档](https://docs.github.com/en/pages)

### 学习资源
- [Java转型AI开发路线图](https://roadmap.sh/ai-engineer)
- [Spring AI官方文档](https://docs.spring.io/spring-ai/reference/)
- [LangChain4j官方文档](https://docs.langchain4j.dev/)
- [OpenAI API文档](https://platform.openai.com/docs)

### 开源项目参考
- [freeCodeCamp](https://www.freecodecamp.org/) - 免费编程学习平台
- [The Odin Project](https://www.theodinproject.com/) - 全栈开发学习路径
- [Roadmap.sh](https://roadmap.sh/) - 开发者学习路线图


---
title: 学习路线总览
description: Java后端开发者转型AI/Agent的完整学习路径,包含6大阶段、前置技能扩展学习和实战项目
category: guide
difficulty: L1-L3
estimatedTime: 12-16周
tags:
  - 学习路线
  - 职业规划
  - AI转型
prerequisites:
  - Java基础
  - Spring Boot
  - HTTP协议
relatedResources:
  - type: doc
    title: Spring AI官方文档
    url: https://docs.spring.io/spring-ai/reference/
  - type: video
    title: B站-Java+AI大模型智能应用开发教程
    url: https://www.bilibili.com/video/BV1Xh4y1t7Gz
---

<script setup>
import RoadmapGraph from '../.vitepress/theme/components/RoadmapGraph.vue'
import roadmapData from '../data/roadmap.json'
</script>

# 学习路线总览

本学习路线专为Java后端开发者设计,从LLM基础到Agent开发,共分为6个阶段,预计学习周期12周。

## 🗺️ 交互式路线图

<RoadmapGraph :phases="roadmapData.phases" />

## 📋 学习阶段详解

### Phase 1: LLM基础认知 (2周)

**难度**: ⭐ L1  
**前置知识**: Java基础、HTTP协议

#### 📚 前置技能扩展学习

在开始本阶段前,请确保掌握以下基础知识:

**Java复习**:
- 📖 [Java核心技术卷I](https://book.douban.com/subject/34891576/) 第1-10章 - 重点复习集合框架、多线程、IO流
- ✅ **自测清单**:
  - [ ] 能解释HashMap和ConcurrentHashMap的区别
  - [ ] 理解线程池ThreadPoolExecutor的7个参数
  - [ ] 能用Stream API处理集合数据

**HTTP协议入门**:
- 📖 [MDN HTTP概述](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Overview) - GET/POST请求、状态码、Header
- 🎥 [B站-尚硅谷Java基础教程](https://www.bilibili.com/video/BV1Kb411W75N) - 播放量200万+,3小时精选网络编程章节
- ✅ **自测清单**:
  - [ ] 能用HttpClient发送POST请求并解析JSON响应
  - [ ] 理解RESTful API设计原则
  - [ ] 知道常见HTTP状态码含义(200/404/500等)

#### 核心内容
- 什么是大语言模型(GPT系列、Llama、Claude发展历程)
- Transformer架构详解(Attention机制直观理解)
- Token与Embedding概念(Tokenization、向量表示)
- 主流LLM对比(OpenAI GPT-4、Anthropic Claude、Meta Llama、阿里通义千问)

#### 学习目标
- ✅ 能够解释LLM的工作原理和发展历程
- ✅ 理解Attention机制的核心思想(不用深入数学公式)
- ✅ 掌握Token和Embedding的概念及其在实际应用中的意义
- ✅ 能成功调用OpenAI API完成第一个对话请求

#### 里程碑项目
完成[智能问答机器人](/projects/project-1-qa-bot) - 基于Spring AI + OpenAI API实现简单的QA机器人

---

### Phase 2: Prompt工程 (1周)

**难度**: ⭐ L1  
**前置知识**: LLM基础认知

#### 📚 前置技能扩展学习

**逻辑思维训练**:
- 📖 [LeetCode简单题](https://leetcode.cn/problemset/all/?difficulty=EASY) - 刷20道,培养问题分解能力
- 📖 [OpenAI Prompt Engineering指南](https://platform.openai.com/docs/guides/prompt-engineering) - 官方最佳实践
- 🎥 [吴恩达-Prompt Engineering课程](https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/) - 免费,1.5小时,强烈推荐
- ✅ **自测清单**:
  - [ ] 能区分Zero-shot和Few-shot的应用场景
  - [ ] 能写出清晰的System Prompt,指定角色和输出格式
  - [ ] 理解Temperature参数对输出的影响(创造性vs确定性)

#### 核心内容
- Prompt设计六大原则(清晰指令、分隔符、思维链、示例驱动等)
- Few-shot Learning技巧(示例选择、数量控制、格式一致性)
- Chain-of-Thought (CoT)推理方法("Let's think step by step"的力量)
- Prompt注入攻击与防御(安全边界、输入过滤)

#### 学习目标
- ✅ 能够编写高质量的Prompt,提升LLM输出准确率30%+
- ✅ 熟练使用Few-shot技巧解决分类、提取等任务
- ✅ 掌握CoT推理方法,让模型解决复杂逻辑问题
- ✅ 了解Prompt安全风险,能够设计安全的Prompt模板

#### 里程碑项目
优化Phase 1的问答机器人,添加System Prompt和Few-shot示例,提升回答质量

---

### Phase 3: Spring AI框架 (2周)

**难度**: ⭐⭐ L2  
**前置知识**: Spring Boot基础、Prompt工程

#### 📚 前置技能扩展学习

**Spring Boot复习**:
- 📖 [Spring Boot官方指南](https://spring.io/guides/gs/spring-boot/) - Getting Started系列,快速回顾核心概念
- 📖 [Maven实战](https://book.douban.com/subject/25866350/) 第1-5章 - 依赖管理、多模块项目
- 🎥 [B站-雷丰阳Spring Boot 3教程](https://www.bilibili.com/video/BV1L84y1F7Nh) - 播放量80万+,5小时核心内容,选看自动配置、RESTful API章节
- ✅ **自测清单**:
  - [ ] 能创建Spring Boot项目并配置application.yml
  - [ ] 理解@Controller vs @RestController区别
  - [ ] 能用Maven管理多模块项目依赖
  - [ ] 熟悉JUnit 5单元测试编写

#### 核心内容
- Spring AI设计理念(统一API抽象、Provider可移植性)
- ChatClient核心API(prompt/call/stream/entity结构化输出)
- Function Calling机制(@Tool注解式工具定义、多工具并行调用)
- 向量数据库集成(Milvus/Pinecone/Qdrant/Chroma选型对比)
- RetrievalAugmentationAdvisor配置(RAG工作流编排)

#### 学习目标
- ✅ 能够使用Spring AI调用多种LLM提供商(OpenAI/Claude/Ollama)
- ✅ 理解ChatClient的设计模式(Fluent API、Builder模式)
- ✅ 实现Function Calling扩展能力,让Agent调用外部工具
- ✅ 完成第一个RAG应用,实现PDF文档知识库问答

#### 里程碑项目
完成[企业知识库RAG系统](/projects/project-2-rag-kb) - 构建基于PDF文档的企业知识库问答系统,检索准确率80%+

---

### Phase 4: RAG全链路 (3周)

**难度**: ⭐⭐ L2  
**前置知识**: Spring AI框架、向量数据库基础

#### 📚 前置技能扩展学习

**向量数据库基础**:
- 📖 [Understanding Word Vectors](https://www.youtube.com/watch?v=ERibwqs9p38) - Stanford CS224n, 1小时,直观理解向量空间
- 📖 [Milvus官方教程](https://milvus.io/docs/quickstart.md) - Quick Start章节,动手实践
- 🎥 [B站-向量数据库原理与Milvus实战](https://www.bilibili.com/video/BV1Xh4y1t7Gz) - 播放量15万+,2小时,重点看索引类型和相似度搜索
- ✅ **自测清单**:
  - [ ] 能解释余弦相似度和欧氏距离的区别及应用场景
  - [ ] 理解HNSW索引的工作原理(近似最近邻搜索)
  - [ ] 能用Java调用Embedding API生成向量(768/1536维)
  - [ ] 知道向量维度对存储和检索性能的影响

#### 核心内容
- RAG架构原理(Retrieval-Augmented Generation工作流程)
- 向量数据库选型(Milvus高性能、PgVector PostgreSQL集成、Qdrant轻量级、Chroma易用性)
- 文本分块策略(固定长度、语义边界、重叠分块、层次化分块)
- 检索优化技巧(Hybrid Search混合检索、Rerank重排序、Query Expansion查询扩展)
- 引用溯源实现(返回原文片段和页码,提升可信度)

#### 学习目标
- ✅ 理解RAG的核心价值(解决幻觉问题、提供实时信息、引用溯源)
- ✅ 能够搭建完整的RAG系统(文档加载→切分→向量化→存储→检索→生成)
- ✅ 掌握检索优化技巧,将Recall@5从60%提升到80%+
- ✅ 实现混合检索(Vector + Keyword),兼顾语义匹配和精确匹配

#### 里程碑项目
完善[企业知识库RAG系统](/projects/project-2-rag-kb),添加Hybrid Search和引用溯源功能

---

### Phase 5: Agent开发 (3周)

**难度**: ⭐⭐⭐ L3  
**前置知识**: RAG全链路、设计模式

#### 📚 前置技能扩展学习

**设计模式与并发编程**:
- 📖 [Head First设计模式](https://book.douban.com/subject/2243615/) - 重点阅读Strategy(策略)、Observer(观察者)、Chain of Responsibility(责任链)
- 📖 [Java并发编程实战](https://book.douban.com/subject/26897823/) 第1-8章 - ThreadPoolExecutor、CompletableFuture异步编排
- 🎥 [B站-马士兵设计模式精讲](https://www.bilibili.com/video/BV1KC4y1x7Fo) - 播放量120万+,选看Strategy/Observer章节,共3小时
- ✅ **自测清单**:
  - [ ] 能手写单例模式(双重检查锁定DCL)
  - [ ] 理解ThreadPoolExecutor的7个参数(corePoolSize、maximumPoolSize等)
  - [ ] 能用CompletableFuture实现异步任务编排(thenApply、thenCompose)
  - [ ] 知道Reactor模式和Observer模式的区别及应用场景

#### 核心内容
- Agent设计模式(ReAct、Plan-and-Execute、Reflection自我反思)
- ReAct框架(Reasoning + Acting交替循环,Thought-Action-Observation)
- Tool Use工具使用(Function Calling扩展、自定义工具注册)
- 多Agent协作(Sequential顺序执行、Parallel并行执行、Hierarchical层级式、Debate辩论式)
- 工作流编排(Spring AI Alibaba Agent Framework、LangGraph)

#### 学习目标
- ✅ 理解Agent的核心架构(LLM大脑 + 记忆 + 规划 + 工具使用)
- ✅ 能够实现ReAct模式的Agent,解决需要多步推理的复杂任务
- ✅ 设计多Agent协作系统,实现Researcher-Writer-Reviewer三人协作
- ✅ 掌握人工介入节点(Human-in-the-loop),处理敏感操作

#### 里程碑项目
完成[多Agent协作工作流](/projects/project-4-multi-agent) - Researcher-Agent + Writer-Agent + Reviewer-Agent协作完成报告生成

---

### Phase 6: 部署运维 (1周)

**难度**: ⭐⭐ L2  
**前置知识**: Agent开发、Docker基础

#### 📚 前置技能扩展学习

**容器化与监控**:
- 📖 [Docker官方教程](https://docs.docker.com/get-started/) - Get Started章节,镜像构建、容器运行
- 📖 [鸟哥的Linux私房菜](http://linux.vbird.org/) - 基础篇前10章,top、grep、tail等常用命令
- 🎥 [B站-狂神说Docker教程](https://www.bilibili.com/video/BV1mW411i7MD) - 播放量300万+,4小时精华版,Dockerfile编写、docker-compose编排
- 🎥 [B站-Prometheus+Grafana监控实战](https://www.bilibili.com/video/BV1vx4y1r7Rz) - 播放量25万+,3小时,Exporter配置、Dashboard创建
- ✅ **自测清单**:
  - [ ] 能编写Dockerfile构建Spring Boot应用镜像(multi-stage build优化)
  - [ ] 理解docker-compose.yml的基本结构(services、networks、volumes)
  - [ ] 会用kubectl部署应用到K8s集群(Deployment、Service、Ingress)
  - [ ] 会用top、grep、tail等Linux命令排查CPU/内存/日志问题
  - [ ] 知道Prometheus的Exporter是什么,Grafana的Dashboard如何配置

#### 核心内容
- 模型部署方案(云端API低成本、Ollama本地部署隐私保护、vLLM高性能推理引擎)
- 性能优化(语义缓存Semantic Cache、批处理Batching、异步流式响应、连接池)
- 监控与日志(Prometheus指标采集、Grafana可视化、ELK日志聚合、分布式追踪)
- 成本控制策略(Token用量监控、模型路由智能切换、缓存命中率优化、配额管理)

#### 学习目标
- ✅ 能够部署AI应用到生产环境(Docker/K8s)
- ✅ 掌握性能优化技巧,将P99延迟降低50%+
- ✅ 实现完善的监控体系(响应时间、Token消耗、错误率、缓存命中率)
- ✅ 通过语义缓存和模型路由,将API成本降低50%+

#### 里程碑项目
为之前的RAG系统或Agent系统添加监控和缓存,部署到云服务器或K8s集群

---

## 🎯 学习建议

### 1. 循序渐进
不要跳过基础阶段直接学习高级内容。每个阶段都是后续学习的基础。

### 2. 理论+实践
每个学习节点都要:
- 📖 阅读理论文章
- 💻 运行代码示例
- ✍️ 完成练习题
- 🛠️ 做练手项目

### 3. 持续打卡
保持学习的连续性比单次学习时长更重要。建议每天至少学习30分钟。

### 4. 社区交流
遇到问题时:
- 在GitHub Issues提问
- 参与讨论区交流
- 分享学习心得

### 5. 定期复习
每周回顾本周学习内容,每月做一次综合测试。

---

## 📊 能力评估

完成每个阶段后,通过以下方式检验学习效果:

1. **理论知识** - 完成对应分类的题库练习,正确率≥80%
2. **代码实践** - 独立完成练手项目
3. **技能雷达图** - 查看[进度追踪](/tools/progress)页面

---

## 🔗 相关资源

- [学习资料汇总](/resources/articles) - 文章、视频、文档
- [练手项目](/projects/overview) - 5个实战项目
- [面试题库](/interview/overview) - 准备技术面试
- [实用工具](/tools/quiz) - 答题、进度追踪、Token计算器

---

> 💡 **下一步**: 开始 [Phase 1: LLM基础认知](/guide/llm-basics/what-is-llm) 的学习!

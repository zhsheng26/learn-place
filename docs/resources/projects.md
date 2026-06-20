---
title: 开源项目推荐
description: 值得学习的AI/Agent开源项目,精选GitHub高Star项目
---

# 开源项目推荐

> 本文档收录了AI/Agent开发领域的高质量开源项目,所有项目均满足以下条件:
> - ⭐ GitHub Stars > 1000
> - 🔄 最近6个月内有活跃更新
> - 📖 完善的文档和示例
> - 💻 可直接运行或作为学习参考

## 🌱 Spring AI生态项目

### Spring AI (官方项目)
- **GitHub**: [spring-projects/spring-ai](https://github.com/spring-projects/spring-ai)
- **⭐ Stars**: 9.2K+ | **🍴 Forks**: 1.5K+ | **🔄 最近更新**: 2026-06
- **📝 简介**: Spring官方AI应用开发框架,企业级标准
- **💡 核心特性**:
  - 统一的LLM API抽象层,支持OpenAI、Azure、Anthropic等
  - 内置Vector Store集成(Milvus、Pinecone、Chroma等)
  - Function Calling自动化工具注册
  - Spring Boot自动配置,零样板代码
- **🎯 适合人群**: Java/Spring开发者,需要快速集成AI功能
- **📚 学习价值**: ⭐⭐⭐⭐⭐ 官方最佳实践参考

### Spring AI Alibaba (阿里云生态)
- **GitHub**: [alibaba/spring-ai-alibaba](https://github.com/alibaba/spring-ai-alibaba)
- **⭐ Stars**: 10.1K+ | **🍴 Forks**: 2.3K+ | **🔄 最近更新**: 2026-06
- **📝 简介**: 阿里云百炼大模型平台集成方案
- **💡 核心特性**:
  - 深度集成通义千问(Qwen)系列模型
  - 针对国内网络优化,访问速度快
  - 中文文档完善,社区活跃
  - 提供RAG、Agent完整解决方案
- **🎯 适合人群**: 使用阿里云服务的国内开发者
- **📚 学习价值**: ⭐⭐⭐⭐ 国内生态最佳实践

### Spring AI Examples (官方示例)
- **GitHub**: [spring-projects/spring-ai-examples](https://github.com/spring-projects/spring-ai-examples)
- **⭐ Stars**: 3.5K+ | **🍴 Forks**: 800+ | **🔄 最近更新**: 2026-06
- **📝 简介**: Spring AI官方提供的完整示例集合
- **💡 包含项目**:
  - Chatbot聊天机器人
  - RAG知识库问答系统
  - Function Calling工具调用
  - Vector Store向量检索
  - Agent智能体编排
- **🎯 适合人群**: 初学者,需要快速上手示例
- **📚 学习价值**: ⭐⭐⭐⭐⭐ 可直接运行的完整代码

---

## 🔗 LangChain4j生态项目

### LangChain4j (核心框架)
- **GitHub**: [langchain4j/langchain4j](https://github.com/langchain4j/langchain4j)
- **⭐ Stars**: 12.4K+ | **🍴 Forks**: 2.1K+ | **🔄 最近更新**: 2026-06
- **📝 简介**: Java版LangChain,功能最丰富的AI应用开发框架
- **💡 核心特性**:
  - 支持50+ LLM提供商(OpenAI、Claude、Ollama等)
  - 完整的RAG管道实现
  - 多Agent协作框架
  - 内存管理和对话历史追踪
  - 流式响应支持
- **🎯 适合人群**: 需要复杂AI功能的Java开发者
- **📚 学习价值**: ⭐⭐⭐⭐⭐ 生产级框架源码学习

### LangChain4j Examples (官方示例)
- **GitHub**: [langchain4j/langchain4j-examples](https://github.com/langchain4j/langchain4j-examples)
- **⭐ Stars**: 1.2K+ | **🍴 Forks**: 400+ | **🔄 最近更新**: 2026-06
- **📝 简介**: LangChain4j官方示例代码,覆盖各种场景
- **💡 包含示例**:
  - 基础聊天对话
  - RAG文档问答
  - Function Calling计算器
  - 多Agent协作
  - 流式输出
  - 图像生成
- **🎯 适合人群**: 学习LangChain4j API用法
- **📚 学习价值**: ⭐⭐⭐⭐ 每个示例都是独立可运行项目

### LangChain4j Spring Boot Starter
- **GitHub**: [langchain4j/langchain4j-spring](https://github.com/langchain4j/langchain4j-spring)
- **⭐ Stars**: 800+ | **🍴 Forks**: 200+ | **🔄 最近更新**: 2026-05
- **📝 简介**: LangChain4j的Spring Boot自动配置模块
- **💡 核心特性**:
  - Spring Boot自动配置
  - YAML配置文件支持
  - Bean管理简化
  - 与Spring AI兼容层
- **🎯 适合人群**: Spring Boot + LangChain4j组合使用者
- **📚 学习价值**: ⭐⭐⭐ Spring集成最佳实践

---

## 🤖 Agent框架项目

### AutoGen (微软多Agent框架)
- **GitHub**: [microsoft/autogen](https://github.com/microsoft/autogen)
- **⭐ Stars**: 35K+ | **🍴 Forks**: 5.2K+ | **🔄 最近更新**: 2026-06
- **📝 简介**: Microsoft开源的多Agent协作框架
- **💡 核心特性**:
  - 可 conversable Agent设计
  - 自动代码执行和错误修复
  - 多Agent对话编排
  - 人类-in-the-loop交互
  - 支持Python和.NET
- **🎯 适合人群**: 研究多Agent系统设计
- **📚 学习价值**: ⭐⭐⭐⭐⭐ 微软研究院出品,学术+工业级质量

### LangGraph (Agent编排引擎)
- **GitHub**: [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph)
- **⭐ Stars**: 12K+ | **🍴 Forks**: 1.8K+ | **🔄 最近更新**: 2026-06
- **📝 简介**: LangChain官方的Agent状态机编排框架
- **💡 核心特性**:
  - 基于图的Agent工作流定义
  - 持久化状态管理
  - 循环和分支逻辑支持
  - 可视化工具
  - Python和JavaScript版本
- **🎯 适合人群**: 需要复杂Agent工作流的开发者
- **📚 学习价值**: ⭐⭐⭐⭐⭐ LangChain官方维护,生产级质量

### CrewAI (多Agent协作平台)
- **GitHub**: [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI)
- **⭐ Stars**: 18K+ | **🍴 Forks**: 2.5K+ | **🔄 最近更新**: 2026-06
- **📝 简介**: 角色扮演的多Agent协作框架
- **💡 核心特性**:
  - 基于角色的Agent定义
  - 任务分配和 delegation
  - 顺序和并行执行模式
  - 内置工具集
- **🎯 适合人群**: 构建角色扮演型Agent系统
- **📚 学习价值**: ⭐⭐⭐⭐ 新兴框架,设计理念先进

---

## 🗄️ 向量数据库项目

### Milvus (分布式向量数据库)
- **GitHub**: [milvus-io/milvus](https://github.com/milvus-io/milvus)
- **⭐ Stars**: 28K+ | **🍴 Forks**: 3.8K+ | **🔄 最近更新**: 2026-06
- **📝 简介**: 云原生分布式向量数据库,支持十亿级向量
- **💡 核心特性**:
  - 水平扩展,支持PB级数据
  - 多种索引类型(HNSW、IVF、DiskANN)
  - 混合搜索(向量+标量)
  - Kubernetes原生部署
  - Python/Java/Go等多语言SDK
- **🎯 适合人群**: 大规模向量检索场景
- **📚 学习价值**: ⭐⭐⭐⭐⭐ 企业级向量数据库标杆

### Chroma (轻量级向量数据库)
- **GitHub**: [chroma-core/chroma](https://github.com/chroma-core/chroma)
- **⭐ Stars**: 15K+ | **🍴 Forks**: 1.2K+ | **🔄 最近更新**: 2026-06
- **📝 简介**: 开源嵌入式数据库,适合开发和测试
- **💡 核心特性**:
  - 零配置,开箱即用
  - 本地文件存储或云端部署
  - 元数据过滤
  - Python/JavaScript SDK
  - 与LangChain/LlamaIndex无缝集成
- **🎯 适合人群**: 快速原型开发和小型项目
- **📚 学习价值**: ⭐⭐⭐⭐ 简单易用,学习成本低

### Qdrant (高性能向量搜索引擎)
- **GitHub**: [qdrant/qdrant](https://github.com/qdrant/qdrant)
- **⭐ Stars**: 20K+ | **🍴 Forks**: 1.5K+ | **🔄 最近更新**: 2026-06
- **📝 简介**: Rust编写的高性能向量数据库
- **💡 核心特性**:
  - 微秒级查询延迟
  - 过滤和payload支持
  - Docker和Kubernetes部署
  - REST和gRPC API
  - 内置Web UI
- **🎯 适合人群**: 对性能要求高的生产环境
- **📚 学习价值**: ⭐⭐⭐⭐ Rust编写,性能优化典范

### Weaviate (模块化向量数据库)
- **GitHub**: [weaviate/weaviate](https://github.com/weaviate/weaviate)
- **⭐ Stars**: 10K+ | **🍴 Forks**: 800+ | **🔄 最近更新**: 2026-06
- **📝 简介**: 模块化向量搜索引擎,内置ML模块
- **💡 核心特性**:
  - 内置文本、图像、音频嵌入模块
  - GraphQL API
  - 混合搜索(向量+BM25)
  - 多租户支持
  - Kubernetes Operator
- **🎯 适合人群**: 需要内置ML能力的场景
- **📚 学习价值**: ⭐⭐⭐⭐ 模块化架构设计优秀

---

## 🚀 模型部署工具

### Ollama (本地LLM运行工具)
- **GitHub**: [ollama/ollama](https://github.com/ollama/ollama)
- **⭐ Stars**: 80K+ | **🍴 Forks**: 8.5K+ | **🔄 最近更新**: 2026-06
- **📝 简介**: 在本地运行开源LLM的最简单方式
- **💡 核心特性**:
  - 一行命令下载和运行模型
  - 支持Llama 3、Mistral、Qwen等100+模型
  - REST API接口
  - Modelfile自定义模型配置
  - macOS/Linux/Windows全平台支持
- **🎯 适合人群**: 本地开发和测试LLM应用
- **📚 学习价值**: ⭐⭐⭐⭐⭐ 极简设计,用户体验典范

### vLLM (高性能推理引擎)
- **GitHub**: [vllm-project/vllm](https://github.com/vllm-project/vllm)
- **⭐ Stars**: 25K+ | **🍴 Forks**: 3.2K+ | **🔄 最近更新**: 2026-06
- **📝 简介**: UC Berkeley开源的高吞吐量LLM推理引擎
- **💡 核心特性**:
  - PagedAttention内存管理技术
  - 连续批量推理
  - 量化支持(INT8/FP8)
  - 分布式推理
  - 吞吐量比HuggingFace Transformers高24倍
- **🎯 适合人群**: 生产环境高并发推理
- **📚 学习价值**: ⭐⭐⭐⭐⭐ 学术界SOTA成果工程化典范

### Text Generation Inference (TGI)
- **GitHub**: [huggingface/text-generation-inference](https://github.com/huggingface/text-generation-inference)
- **⭐ Stars**: 7K+ | **🍴 Forks**: 800+ | **🔄 最近更新**: 2026-06
- **📝 简介**: Hugging Face官方文本生成推理服务
- **💡 核心特性**:
  - Rust编写,高性能
  - Tensor Parallelism分布式推理
  - Token streaming流式输出
  - Prometheus监控指标
  - Docker一键部署
- **🎯 适合人群**: Hugging Face模型部署
- **📚 学习价值**: ⭐⭐⭐⭐ Hugging Face官方最佳实践

---

## 💼 完整实战项目

### Spring AI RAG知识库
- **GitHub**: [spring-ai-examples/modular-rag](https://github.com/spring-projects/spring-ai-examples/tree/main/modular-rag)
- **⭐ Stars**: 500+ (子项目) | **🔄 最近更新**: 2026-06
- **📝 简介**: 基于Spring AI的模块化RAG系统
- **💡 核心特性**:
  - 文档上传和解析(PDF/Word/TXT)
  - 向量索引构建
  - 相似度检索和重排序
  - 流式回答
  - 对话历史管理
- **🎯 适合人群**: 学习RAG系统完整实现
- **📚 学习价值**: ⭐⭐⭐⭐⭐ 官方示例,代码质量高

### LangChain4j Chatbot
- **GitHub**: [langchain4j/langchain4j-examples/spring-boot-example](https://github.com/langchain4j/langchain4j-examples/tree/main/spring-boot-example)
- **⭐ Stars**: 300+ (子项目) | **🔄 最近更新**: 2026-06
- **📝 简介**: LangChain4j + Spring Boot聊天机器人
- **💡 核心特性**:
  - 多LLM提供商切换
  - 记忆管理
  - Function Calling
  - Web界面
- **🎯 适合人群**: LangChain4j入门实战
- **📚 学习价值**: ⭐⭐⭐⭐ 完整的全栈项目

### AI Customer Service System
- **GitHub**: [langchain4j/langchain4j-examples/customer-support-agent](https://github.com/langchain4j/langchain4j-examples/tree/main/customer-support-agent-example)
- **⭐ Stars**: 200+ (子项目) | **🔄 最近更新**: 2026-05
- **📝 简介**: 智能客服系统,多Agent协作
- **💡 核心特性**:
  - 订单查询Agent
  - 退款处理Agent
  - 技术支持Agent
  - 路由Agent协调
  - 人工接管机制
- **🎯 适合人群**: 学习多Agent系统设计
- **📚 学习价值**: ⭐⭐⭐⭐⭐ 真实业务场景模拟

### Full-Stack AI Application Template
- **GitHub**: [fullstack-ai-app/template](https://github.com/xxx/fullstack-ai-template) (示例链接)
- **⭐ Stars**: 2K+ | **🔄 最近更新**: 2026-06
- **📝 简介**: 全栈AI应用脚手架
- **💡 技术栈**:
  - 前端: React + TypeScript
  - 后端: Spring Boot + Spring AI
  - 数据库: PostgreSQL + pgvector
  - 缓存: Redis
  - 部署: Docker + Kubernetes
- **🎯 适合人群**: 快速启动新项目
- **📚 学习价值**: ⭐⭐⭐⭐ 现代化技术栈整合

---

## 📊 评估与监控工具

### LangSmith (LLM应用调试平台)
- **GitHub**: [langchain-ai/langsmith-sdk](https://github.com/langchain-ai/langsmith-sdk)
- **⭐ Stars**: 1.5K+ | **🔄 最近更新**: 2026-06
- **📝 简介**: LangChain官方的LLM应用观测平台
- **💡 核心特性**:
  - 请求追踪和日志
  - Prompt版本管理
  - A/B测试
  - 数据集和评估
  - 团队协作
- **🎯 适合人群**: 生产环境LLM应用监控
- **📚 学习价值**: ⭐⭐⭐⭐ 观测性最佳实践

### RAGAS (RAG评估框架)
- **GitHub**: [explodinggradients/ragas](https://github.com/explodinggradients/ragas)
- **⭐ Stars**: 5K+ | **🍴 Forks**: 600+ | **🔄 最近更新**: 2026-06
- **📝 简介**: 专门用于评估RAG系统的框架
- **💡 核心特性**:
  - 忠实度(Faithfulness)评估
  - 答案相关性(Answer Relevance)
  - 上下文召回率(Context Recall)
  - 自动化测试套件
  - CI/CD集成
- **🎯 适合人群**: RAG系统质量保障
- **📚 学习价值**: ⭐⭐⭐⭐⭐ RAG评估标准制定者

### Arize Phoenix (LLM可观测性)
- **GitHub**: [Arize-ai/phoenix](https://github.com/Arize-ai/phoenix)
- **⭐ Stars**: 4K+ | **🍴 Forks**: 400+ | **🔄 最近更新**: 2026-06
- **📝 简介**: 开源LLM可观测性和评估平台
- **💡 核心特性**:
  - 轨迹可视化
  - 性能监控
  - 漂移检测
  - 根因分析
  - Jupyter Notebook集成
- **🎯 适合人群**: LLM应用性能调优
- **📚 学习价值**: ⭐⭐⭐⭐ 可视化分析工具

---

## 🎓 学习与面试资源

### AI Interview Guide
- **GitHub**: [dair-ai/AI-Interview-Guide](https://github.com/dair-ai/AI-Interview-Guide)
- **⭐ Stars**: 1.5K+ | **🍴 Forks**: 300+ | **🔄 最近更新**: 2026-05
- **📝 简介**: AI工程师面试指南
- **💡 包含内容**:
  - LLM理论基础面试题
  - Prompt工程实战题
  - RAG系统设计题
  - Agent架构设计题
  - 参考答案和解析
- **🎯 适合人群**: 准备AI岗位面试
- **📚 学习价值**: ⭐⭐⭐⭐ 面试题库参考

### Awesome LLM Projects
- **GitHub**: [Hannibal046/Awesome-LLM](https://github.com/Hannibal046/Awesome-LLM)
- **⭐ Stars**: 20K+ | **🍴 Forks**: 2.5K+ | **🔄 最近更新**: 2026-06
- **📝 简介**: LLM相关优质资源汇总
- **💡 包含内容**:
  - 论文列表
  - 开源项目
  - 数据集
  - 教程和课程
  - 工具和框架
- **🎯 适合人群**: 全面了解LLM生态
- **📚 学习价值**: ⭐⭐⭐⭐⭐ 资源导航必备

### Prompt Engineering Guide
- **GitHub**: [dair-ai/Prompt-Engineering-Guide](https://github.com/dair-ai/Prompt-Engineering-Guide)
- **⭐ Stars**: 25K+ | **🍴 Forks**: 3.2K+ | **🔄 最近更新**: 2026-06
- **📝 简介**: Prompt工程系统化学习指南
- **💡 包含内容**:
  - 基础概念和术语
  - 技巧和策略
  - 应用场景
  - 工具和库
  - 最新研究进展
- **🎯 适合人群**: 深入学习Prompt工程
- **📚 学习价值**: ⭐⭐⭐⭐⭐ Prompt工程圣经

---

## 🔍 项目筛选标准

我们严格筛选每个推荐项目,确保质量:

| 标准 | 要求 | 说明 |
|------|------|------|
| Stars数量 | > 1000 | 社区认可度指标 |
| 最近更新 | < 6个月 | 项目活跃度 |
| 文档完善度 | README + Wiki | 学习友好度 |
| 代码质量 | 有测试 + CI/CD | 工程化水平 |
| 许可证 | MIT/Apache 2.0 | 商业友好 |
| Issue响应 | < 1周 | 维护者活跃度 |

---

## 💡 项目学习建议

### 初学者路线
```
Week 1-2: Spring AI Examples - 运行官方示例
Week 3-4: LangChain4j Examples - 理解API用法
Week 5-6: 修改示例代码,添加自己的功能
Week 7-8: 基于模板创建自己的项目
```

### 进阶者路线
```
Week 1-2: 阅读Spring AI源码,理解架构设计
Week 3-4: 研究Milvus/Qdrant向量数据库原理
Week 5-6: 分析AutoGen多Agent协作机制
Week 7-8: 参与开源项目,提交PR
```

### 专家路线
```
Week 1-2: 深入研究vLLM PagedAttention技术
Week 3-4: 复现经典论文算法
Week 5-6: 优化现有项目性能瓶颈
Week 7-8: 发布自己的开源项目
```

---

## 📈 项目贡献指南

想为这些项目做贡献?

1. **阅读CONTRIBUTING.md**: 了解项目贡献规范
2. **从Good First Issue开始**: 寻找标记为`good first issue`的任务
3. **Fork并克隆仓库**: `git clone https://github.com/your-username/project.git`
4. **创建分支**: `git checkout -b feature/your-feature`
5. **提交代码**: 遵循项目代码规范
6. **提交PR**: 清晰描述改动内容和动机
7. **回应Review**: 积极回应维护者的反馈

---

> **最后更新**: 2026年6月 | **项目总数**: 25+ | **总Stars**: 300K+ ⭐
> 
> 💡 **提示**: 发现新的优质项目? 欢迎提交PR贡献你的收藏!
> 
> ⚠️ **注意**: 项目Stars数和更新时间会动态变化,请以GitHub实时数据为准

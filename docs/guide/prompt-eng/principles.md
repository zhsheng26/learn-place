---
title: Prompt设计原则
description: 学习Prompt Engineering的核心设计原则
category: prompt-eng
difficulty: L1
estimatedTime: 45分钟
tags:
  - Prompt工程
  - 设计原则
---

# Prompt设计原则

## 核心概念

Prompt Engineering是与大语言模型交互的关键技能。良好的Prompt设计能够显著提升模型的输出质量。

## 基本原则

### 1. 清晰明确
- 使用简洁的语言表达需求
- 避免歧义和模糊的表述
- 提供足够的上下文信息

### 2. 结构化
- 使用分隔符区分不同部分
- 采用模板化的Prompt结构
- 明确输入和输出的格式

### 3. 迭代优化
- 从简单Prompt开始
- 根据输出结果逐步调整
- 记录有效的Prompt模式

## 代码示例

```java
// Spring AI中的Prompt示例
String prompt = """
    你是一个Java代码审查专家。
    
    请审查以下代码并提供改进建议:
    
    ```java
    {code}
    ```
    
    请从以下几个方面进行审查:
    1. 代码规范性
    2. 性能优化
    3. 安全性
    4. 可维护性
    """;
```

## 相关资源

- [OpenAI Prompt Engineering指南](https://platform.openai.com/docs/guides/prompt-engineering)
- [Prompt设计最佳实践](https://docs.langchain4j.dev/tutorials/prompt-templates)

## 练习题

<ClientOnly>
  <QuizWidget category-id="prompt-eng" />
</ClientOnly>

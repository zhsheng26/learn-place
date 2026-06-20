---
title: Spring AI快速入门
description: 快速上手Spring AI框架,构建第一个AI应用
category: spring-ai
difficulty: L1
estimatedTime: 60分钟
tags:
  - Spring AI
  - 快速入门
---

# Spring AI快速入门

## 什么是Spring AI?

Spring AI是Spring生态系统中的AI应用开发框架,为Java开发者提供了统一的API来集成各种大语言模型。

## 核心特性

- **统一API**: 支持OpenAI、Azure OpenAI、Ollama等多种模型提供商
- **Spring Boot集成**: 自动配置,开箱即用
- **向量存储**: 内置多种向量数据库支持
- **Function Calling**: 轻松实现工具调用

## 快速开始

### 1. 添加依赖

```xml
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-starter-model-openai</artifactId>
    <version>1.0.0-M1</version>
</dependency>
```

### 2. 配置API密钥

```yaml
spring:
  ai:
    openai:
      api-key: ${OPENAI_API_KEY}
```

### 3. 创建Chat Client

```java
@Service
public class ChatService {
    
    private final ChatClient chatClient;
    
    public ChatService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }
    
    public String chat(String message) {
        return chatClient.prompt()
            .user(message)
            .call()
            .content();
    }
}
```

## 相关资源

- [Spring AI官方文档](https://docs.spring.io/spring-ai/reference/)
- [Spring AI示例项目](https://github.com/spring-projects/spring-ai-examples)

## 练习题

<ClientOnly>
  <QuizWidget category-id="frameworks" />
</ClientOnly>

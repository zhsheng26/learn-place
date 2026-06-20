---
title: ChatClient核心API详解
description: 掌握ChatClient的prompt/call/stream/entity结构化输出、Prompt模板引擎、消息历史管理,以及完整CRUD实战示例
category: spring-ai
difficulty: L2
estimatedTime: 45分钟
tags:
  - ChatClient
  - API使用
  - 结构化输出
prerequisites:
  - Spring AI快速入门
relatedResources:
  - type: doc
    title: ChatClient官方文档
    url: https://docs.spring.io/spring-ai/reference/api/chat-client.html
---

# ChatClient核心API详解

## 核心概念

**ChatClient**是Spring AI的核心接口,提供与LLM交互的统一API。它采用Fluent API设计链式调用,支持同步/流式响应、结构化输出等高级特性。

### API概览

```java
ChatClient chatClient = chatClientBuilder.build();

// 1. 简单对话
String response = chatClient.prompt()
    .user("你好")
    .call()
    .content();

// 2. 带System Prompt
String response = chatClient.prompt()
    .system("你是Java专家")
    .user("解释Spring Boot")
    .call()
    .content();

// 3. 流式响应
Flux<String> stream = chatClient.prompt()
    .user("写一首诗")
    .stream()
    .content();

// 4. 结构化输出
MyEntity entity = chatClient.prompt()
    .user("提取用户信息")
    .call()
    .entity(MyEntity.class);
```

## Spring AI实战

### 1. Prompt构建

#### 基础用法

```java
@Service
public class BasicChatService {
    
    private final ChatClient chatClient;
    
    public String simpleChat(String userMessage) {
        return chatClient.prompt()
            .user(userMessage)
            .call()
            .content();
    }
}
```

#### System Prompt + User Message

```java
public String roleBasedChat(String userMessage) {
    return chatClient.prompt()
        .system("""
            你是一位资深Java架构师。
            - 用专业但易懂的语言回答
            - 提供代码示例
            - 指出最佳实践
            """)
        .user(userMessage)
        .call()
        .content();
}
```

#### 多轮对话(消息历史)

```java
@Service
public class MultiTurnChatService {
    
    // 使用ThreadLocal存储会话历史
    private static final ThreadLocal<List<Message>> chatHistory = 
        ThreadLocal.withInitial(ArrayList::new);
    
    public String chat(String userMessage) {
        // 添加用户消息到历史
        chatHistory.get().add(new UserMessage(userMessage));
        
        // 构建包含历史的Prompt
        String response = chatClient.prompt()
            .messages(chatHistory.get())  // 传入所有历史消息
            .call()
            .content();
        
        // 添加AI响应到历史
        chatHistory.get().add(new AssistantMessage(response));
        
        // 限制历史长度(避免超出Context Window)
        if (chatHistory.get().size() > 20) {
            chatHistory.get().subList(0, 10).clear();
        }
        
        return response;
    }
    
    public void clearHistory() {
        chatHistory.get().clear();
    }
}
```

#### Prompt模板

```java
@Service
public class TemplateChatService {
    
    public String generateEmail(String recipient, String subject, String body) {
        // 使用PromptTemplate
        PromptTemplate template = new PromptTemplate("""
            请帮我写一封正式的商务邮件。
            
            收件人: {recipient}
            主题: {subject}
            正文要点: {body}
            
            要求:
            - 语气正式礼貌
            - 结构清晰(称呼、正文、结尾)
            - 控制在200字以内
            """);
        
        Map<String, Object> variables = Map.of(
            "recipient", recipient,
            "subject", subject,
            "body", body
        );
        
        Prompt prompt = template.create(variables);
        
        return chatClient.prompt(prompt)
            .call()
            .content();
    }
}

// 使用
String email = templateChatService.generateEmail(
    "zhangsan@company.com",
    "项目进度汇报",
    "本周完成了80%,预计下周三完成"
);
```

### 2. 同步调用 vs 流式响应

#### 同步调用(等待完整响应)

```java
public String synchronousChat(String userMessage) {
    // 阻塞等待完整响应
    String response = chatClient.prompt()
        .user(userMessage)
        .call()
        .content();
    
    // 一次性返回
    return response;
}
```

**适用场景**: 
- 短文本生成(< 500 Token)
- 需要完整结果后处理
- 简单问答

#### 流式响应(实时推送)

```java
@Service
public class StreamingChatService {
    
    public Flux<String> streamChat(String userMessage) {
        return chatClient.prompt()
            .user(userMessage)
            .stream()
            .content();  // 返回Flux<String>,每个元素是一个Token或词组
    }
}

// Controller中使用
@RestController
public class ChatController {
    
    @GetMapping(value = "/chat/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<String>> streamChat(@RequestParam String message) {
        return streamingChatService.streamChat(message)
            .map(chunk -> ServerSentEvent.<String>builder()
                .data(chunk)
                .build());
    }
}
```

**前端消费**:

```javascript
// Vue组件
const responseText = ref('');

async function streamChat(message) {
  const response = await fetch(`/chat/stream?message=${encodeURIComponent(message)}`);
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    const chunk = decoder.decode(value);
    responseText.value += chunk;  // 实时追加显示
  }
}
```

**适用场景**:
- 长文本生成(> 1000 Token)
- 提升用户体验(首字延迟< 1秒)
- 实时展示思考过程

### 3. 结构化输出(Entity映射)

Spring AI可以将LLM输出直接映射为Java对象:

```java
// 定义实体类
public record UserInfo(
    String name,
    int age,
    String email,
    List<String> hobbies
) {}

@Service
public class StructuredOutputService {
    
    public UserInfo extractUserInfo(String text) {
        String prompt = """
            从以下文本中提取用户信息:
            
            %s
            
            请以JSON格式输出,包含:name, age, email, hobbies字段。
            """.formatted(text);
        
        // 自动解析JSON并映射为UserInfo对象
        return chatClient.prompt()
            .user(prompt)
            .call()
            .entity(UserInfo.class);
    }
}

// 测试
String input = "我叫张三,今年25岁,邮箱是zhangsan@example.com,喜欢篮球、音乐和旅行。";

UserInfo user = structuredOutputService.extractUserInfo(input);
// user.name() → "张三"
// user.age() → 25
// user.email() → "zhangsan@example.com"
// user.hobbies() → ["篮球", "音乐", "旅行"]
```

**复杂对象**:

```java
public record ProductAnalysis(
    String productName,
    double price,
    List<String> advantages,
    List<String> disadvantages,
    double rating,  // 1-5分
    String summary
) {}

public ProductAnalysis analyzeProduct(String review) {
    return chatClient.prompt()
        .user("""
            分析以下产品评论:
            
            %s
            
            提取:产品名称、价格、优点列表、缺点列表、评分(1-5)、总结。
            """.formatted(review))
        .call()
        .entity(ProductAnalysis.class);
}
```

### 4. 选项配置

#### Temperature控制创造性

```java
public String creativeWriting(String topic) {
    return chatClient.prompt()
        .user("写一篇关于%s的短文".formatted(topic))
        .options(OpenAiChatOptions.builder()
            .temperature(0.9)  // 高温度,更有创意
            .build())
        .call()
        .content();
}

public String factualAnswer(String question) {
    return chatClient.prompt()
        .user(question)
        .options(OpenAiChatOptions.builder()
            .temperature(0.2)  // 低温度,更准确
            .build())
        .call()
        .content();
}
```

#### Max Tokens限制输出长度

```java
public String conciseSummary(String article) {
    return chatClient.prompt()
        .user("总结以下文章:\n\n%s".formatted(article))
        .options(OpenAiChatOptions.builder()
            .maxTokens(200)  // 最多200 Token
            .build())
        .call()
        .content();
}
```

#### Top-p采样

```java
.options(OpenAiChatOptions.builder()
    .topP(0.95)  // 从累积概率95%的Token中采样
    .build())
```

### 5. 完整CRUD示例

构建一个智能客服系统:

```java
@RestController
@RequestMapping("/api/customer-service")
public class CustomerServiceController {
    
    private final ChatClient chatClient;
    private final ConversationRepository conversationRepo;
    
    // Create: 创建新对话
    @PostMapping("/conversations")
    public Conversation createConversation(@RequestBody CreateConversationRequest request) {
        Conversation conversation = new Conversation();
        conversation.setUserId(request.userId());
        conversation.setCreatedAt(LocalDateTime.now());
        
        conversation = conversationRepo.save(conversation);
        
        log.info("创建新对话: id={}", conversation.getId());
        
        return conversation;
    }
    
    // Read: 获取对话历史
    @GetMapping("/conversations/{id}")
    public Conversation getConversation(@PathVariable Long id) {
        return conversationRepo.findById(id)
            .orElseThrow(() -> new NotFoundException("对话不存在"));
    }
    
    // Update: 发送消息并获取回复
    @PostMapping("/conversations/{id}/messages")
    public ChatResponse sendMessage(
            @PathVariable Long id,
            @RequestBody SendMessageRequest request) {
        
        // 1. 保存用户消息
        Message userMessage = new Message();
        userMessage.setConversationId(id);
        userMessage.setRole("user");
        userMessage.setContent(request.content());
        userMessage.setTimestamp(LocalDateTime.now());
        
        // 2. 获取对话历史
        List<Message> history = conversationRepo.findMessagesByConversationId(id);
        
        // 3. 构建Prompt
        List<org.springframework.ai.chat.messages.Message> aiMessages = 
            history.stream()
                .map(msg -> msg.getRole().equals("user") 
                    ? new UserMessage(msg.getContent())
                    : new AssistantMessage(msg.getContent()))
                .collect(Collectors.toList());
        
        aiMessages.add(new UserMessage(request.content()));
        
        // 4. 调用LLM
        String systemPrompt = """
            你是电商客服助手小优。
            - 热情友好,耐心细致
            - 专业准确,不随意承诺
            - 每次回答控制在150字以内
            """;
        
        String response = chatClient.prompt()
            .system(systemPrompt)
            .messages(aiMessages)
            .call()
            .content();
        
        // 5. 保存AI回复
        Message assistantMessage = new Message();
        assistantMessage.setConversationId(id);
        assistantMessage.setRole("assistant");
        assistantMessage.setContent(response);
        assistantMessage.setTimestamp(LocalDateTime.now());
        
        conversationRepo.saveAll(List.of(userMessage, assistantMessage));
        
        return new ChatResponse(response, assistantMessage.getId());
    }
    
    // Delete: 删除对话
    @DeleteMapping("/conversations/{id}")
    public void deleteConversation(@PathVariable Long id) {
        conversationRepo.deleteById(id);
        log.info("删除对话: id={}", id);
    }
}

// 数据类
public record CreateConversationRequest(String userId) {}
public record SendMessageRequest(String content) {}
public record ChatResponse(String content, Long messageId) {}
```

## LangChain4j对比

LangChain4j的等价实现:

```java
// LangChain4j
ChatLanguageModel model = OpenAiChatModel.builder()
    .apiKey(apiKey)
    .build();

String response = model.generate("你好");

// Spring AI
ChatClient chatClient = chatClientBuilder.build();
String response = chatClient.prompt()
    .user("你好")
    .call()
    .content();
```

**对比**:
- Spring AI: 更符合Spring风格,@Bean注入,自动配置
- LangChain4j: 更灵活,支持更多高级功能

## 相关资源

### 📚 官方文档
- [ChatClient API Reference](https://docs.spring.io/spring-ai/reference/api/chat-client.html)
- [ChatClient Examples](https://github.com/spring-projects/spring-ai-examples)

## 练习题

<ClientOnly>
  <QuizWidget category-id="frameworks" />
</ClientOnly>

---

> 💡 **下一步**: 学习 [Function Calling机制](/guide/spring-ai/function-calling),让Agent能够调用外部工具!

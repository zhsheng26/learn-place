---
title: Function Calling机制
description: 掌握Function Calling原理、@Tool注解式工具定义、函数式注册、多工具并行调用,以及天气查询Agent实战
category: spring-ai
difficulty: L2
estimatedTime: 50分钟
tags:
  - Function Calling
  - Tool Use
  - Agent
prerequisites:
  - ChatClient核心API详解
relatedResources:
  - type: doc
    title: Spring AI Function Calling文档
    url: https://docs.spring.io/spring-ai/reference/api/function-calling.html
---

# Function Calling机制

## 核心概念

**Function Calling**(函数调用)允许LLM识别何时需要调用外部函数(如查询天气、搜索数据库、调用API),并生成符合规范的函数调用参数。这使得Agent能够突破纯文本生成的限制,与外部系统交互。

### 工作原理

```mermaid
graph TB
    User[用户问题<br/>"北京天气怎么样?"] --> LLM[LLM分析]
    
    LLM --> Decision{需要调用<br/>外部函数?}
    
    Decision -->|是| GenerateCall[生成函数调用<br/>getWeather city='北京']
    Decision -->|否| DirectAnswer[直接回答]
    
    GenerateCall --> App[应用程序执行函数]
    App --> API[调用天气API]
    API --> Result[返回结果<br/>"晴,25°C"]
    
    Result --> LLM2[LLM整合结果]
    LLM2 --> FinalAnswer[最终回答<br/>"北京今天晴天,气温25°C"]
    
    style GenerateCall fill:#fff4e1
    style API fill:#e8f5e9
```

**关键步骤**:
1. **注册函数**: 告诉LLM有哪些可用工具
2. **LLM决策**: 模型判断是否需要调用工具
3. **生成调用**: 模型输出函数名和参数(JSON格式)
4. **执行函数**: 应用程序实际调用函数
5. **返回结果**: 将结果反馈给LLM
6. **生成回答**: LLM整合信息,生成自然语言回复

## Spring AI实战

### 1. @Tool注解式工具定义(Spring AI 1.0+推荐方式)

```java
package com.learnplace.tools;

import org.springframework.ai.chat.model.function.FunctionCallback;
import org.springframework.stereotype.Service;

@Service
public class WeatherService {
    
    /**
     * 定义Tool方法
     */
    @Tool(description = "查询指定城市的当前天气")
    public String getWeather(
        @ToolParam(description = "城市名称,如'北京'、'上海'") String city
    ) {
        // 实际调用天气API
        log.info("查询天气: {}", city);
        
        // 模拟返回(实际应该调用第三方API)
        return switch (city) {
            case "北京" -> "晴天,气温25°C,空气质量良";
            case "上海" -> "多云,气温28°C,有小雨";
            case "广州" -> "雷阵雨,气温32°C,湿度80%";
            default -> "抱歉,暂不支持该城市";
        };
    }
    
    @Tool(description = "查询未来7天天气预报")
    public String getWeatherForecast(
        @ToolParam(description = "城市名称") String city,
        @ToolParam(description = "天数,1-7") int days
    ) {
        log.info("查询天气预报: {}, {}天", city, days);
        
        // 模拟返回
        return """
            %s未来%d天预报:
            第1天: 晴,25°C
            第2天: 多云,26°C
            第3天: 小雨,23°C
            ...
            """.formatted(city, days);
    }
}
```

**配置Function Callback**:

```java
@Configuration
public functionCallingConfig {
    
    @Bean
    public List<FunctionCallback> functionCallbacks(WeatherService weatherService) {
        // Spring AI自动扫描@Tool注解的方法
        return List.of(
            FunctionCallback.builder()
                .function("getWeather", weatherService::getWeather)
                .description("查询指定城市的当前天气")
                .inputType(WeatherRequest.class)
                .build(),
            
            FunctionCallback.builder()
                .function("getWeatherForecast", weatherService::getWeatherForecast)
                .description("查询未来7天天气预报")
                .inputType(WeatherForecastRequest.class)
                .build()
        );
    }
}

// 请求类
public record WeatherRequest(String city) {}
public record WeatherForecastRequest(String city, int days) {}
```

**使用Function Calling**:

```java
@Service
public class WeatherAgent {
    
    private final ChatClient chatClient;
    
    public WeatherAgent(ChatClient.Builder builder, 
                       List<FunctionCallback> callbacks) {
        this.chatClient = builder.build();
        
        // 注册所有Tool
        callbacks.forEach(callback -> 
            chatClient.prompt().functions(callback.getName())
        );
    }
    
    public String askWeather(String userQuestion) {
        return chatClient.prompt()
            .user(userQuestion)
            .functions("getWeather", "getWeatherForecast")  // 启用Tools
            .call()
            .content();
    }
}

// 测试
String answer = weatherAgent.askWeather("北京天气怎么样?");
// 输出: "北京今天晴天,气温25°C,空气质量良好,适合户外活动。"

String forecast = weatherAgent.askWeather("北京未来3天天气如何?");
// 输出: "北京未来3天预报:第1天晴25°C,第2天多云26°C,第3天小雨23°C..."
```

### 2. 函数式注册(更灵活的方式)

```java
@Configuration
public class FunctionalToolConfig {
    
    @Bean
    public FunctionCallback searchCallback() {
        return FunctionCallback.builder()
            .function("searchInternet", (query) -> {
                // 调用搜索引擎API
                return webSearchService.search(query);
            })
            .description("在互联网上搜索信息")
            .inputSchema("""
                {
                  "type": "object",
                  "properties": {
                    "query": {
                      "type": "string",
                      "description": "搜索关键词"
                    }
                  },
                  "required": ["query"]
                }
                """)
            .build();
    }
    
    @Bean
    public FunctionCallback calculatorCallback() {
        return FunctionCallback.builder()
            .function("calculate", (expression) -> {
                // 安全计算数学表达式
                return mathEngine.evaluate(expression.toString());
            })
            .description("执行数学计算")
            .inputSchema("""
                {
                  "type": "object",
                  "properties": {
                    "expression": {
                      "type": "string",
                      "description": "数学表达式,如'2+3*4'"
                    }
                  },
                  "required": ["expression"]
                }
                """)
            .build();
    }
}
```

### 3. 多工具并行调用

```java
@Service
public class MultiToolAgent {
    
    private final ChatClient chatClient;
    
    /**
     * 复杂任务: 可能需要调用多个Tool
     */
    public String planTrip(String request) {
        String prompt = """
            用户请求: %s
            
            你可以使用以下工具:
            - getWeather: 查询天气
            - searchInternet: 搜索景点信息
            - calculate: 计算费用
            
            请根据需要使用工具,最后给出完整的旅行建议。
            """.formatted(request);
        
        return chatClient.prompt()
            .user(prompt)
            .functions("getWeather", "searchInternet", "calculate")
            .call()
            .content();
    }
}

// 测试
String plan = multiToolAgent.planTrip("我想周末去杭州玩,预算1000元,帮我规划一下");

// LLM可能执行:
// 1. 调用getWeather("杭州") → 获取天气
// 2. 调用searchInternet("杭州周末景点推荐") → 获取景点
// 3. 调用calculate("高铁票200 + 酒店300 + 餐饮200 + 门票100") → 计算总费用
// 4. 综合所有信息,生成旅行计划
```

### 4. 完整的天气查询Agent

```java
@RestController
@RequestMapping("/api/weather-agent")
public class WeatherAgentController {
    
    private final ChatClient chatClient;
    private final WeatherService weatherService;
    
    public WeatherAgentController(ChatClient.Builder builder,
                                  WeatherService weatherService) {
        this.chatClient = builder.build();
        this.weatherService = weatherService;
    }
    
    @PostMapping("/ask")
    public ResponseEntity<AgentResponse> ask(@RequestBody AgentRequest request) {
        long startTime = System.currentTimeMillis();
        
        // 1. 构建Prompt
        String systemPrompt = """
            你是智能天气助手。
            
            可用工具:
            - getWeather(city): 查询当前天气
            - getWeatherForecast(city, days): 查询天气预报
            
            回答要求:
            - 语气友好,提供实用建议
            - 如果用户没指定城市,询问清楚
            - 给出穿衣、出行建议
            """;
        
        // 2. 调用LLM(启用Function Calling)
        String response = chatClient.prompt()
            .system(systemPrompt)
            .user(request.question())
            .functions("getWeather", "getWeatherForecast")
            .call()
            .content();
        
        long duration = System.currentTimeMillis() - startTime;
        
        // 3. 返回响应
        return ResponseEntity.ok(new AgentResponse(
            response,
            duration,
            List.of("getWeather", "getWeatherForecast")
        ));
    }
    
    public record AgentRequest(String question) {}
    public record AgentResponse(
        String answer,
        long durationMs,
        List<String> toolsUsed
    ) {}
}
```

**测试用例**:

```bash
curl -X POST http://localhost:8080/api/weather-agent/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "北京明天适合穿什么衣服?"}'
```

**预期流程**:
1. LLM识别需要查询天气预报
2. 调用`getWeatherForecast("北京", 1)`
3. 获取结果: "明天晴,20-28°C"
4. LLM生成建议: "明天北京晴天,气温20-28°C,建议穿T恤+薄外套..."

## LangChain4j实现对比

```java
// LangChain4j
interface WeatherAssistant {
    @SystemMessage("你是天气助手")
    @UserMessage("{{question}}")
    String ask(@V("question") String question);
    
    @Tool("查询天气")
    String getWeather(String city);
}

WeatherAssistant assistant = AiServices.builder(WeatherAssistant.class)
    .chatLanguageModel(model)
    .tools(new WeatherService())
    .build();

String answer = assistant.ask("北京天气怎么样?");
```

**对比**:
- Spring AI: 更符合Spring风格,依赖注入
- LangChain4j: 更简洁的注解方式

## 常见误区

### ❌ 误区1: Tool越多越好
**真相**: 过多的Tool会增加LLM的决策难度,降低准确率。

**建议**: 
- 每次注册5-10个最相关的Tool
- 按场景动态选择Tool集合

### ❌ 误区2: 忽略Tool描述
**真相**: Tool的description直接影响LLM的选择准确性。

```java
// ❌ 差的描述
@Tool(description = "查询天气")

// ✅ 好的描述
@Tool(description = "查询指定城市的当前天气状况,包括温度、湿度、风向等")
```

### ❌ 误区3: 不处理Tool调用失败
**真相**: 外部API可能失败,必须有容错机制。

```java
@Tool(description = "查询天气")
public String getWeather(String city) {
    try {
        return weatherApi.call(city);
    } catch (Exception e) {
        log.error("天气查询失败", e);
        return "抱歉,暂时无法获取天气信息,请稍后重试";
    }
}
```

## 相关资源

### 📚 官方文档
- [Spring AI Function Calling](https://docs.spring.io/spring-ai/reference/api/function-calling.html)
- [OpenAI Function Calling Guide](https://platform.openai.com/docs/guides/function-calling)

## 练习题

<ClientOnly>
  <QuizWidget category-id="frameworks" />
</ClientOnly>

---

> 💡 **下一步**: 学习 [向量数据库集成](/guide/spring-ai/vector-store-integration),为RAG系统打下基础!

---
title: 模型部署方案
description: 了解不同的LLM部署方案和最佳实践
category: deployment
difficulty: L3
estimatedTime: 60分钟
tags:
  - 部署
  - 运维
  - 性能优化
---

# 模型部署方案

## 部署方式对比

### 1. 云端API服务
**优势**:
- 无需管理基础设施
- 自动扩缩容
- 持续更新模型版本

**劣势**:
- 成本较高
- 数据隐私问题
- 网络延迟

**适用场景**: 快速原型开发、小规模应用

### 2. 本地部署(Ollama/vLLM)
**优势**:
- 数据完全可控
- 无网络延迟
- 成本可控

**劣势**:
- 需要GPU资源
- 运维复杂度高
- 模型更新需手动

**适用场景**: 企业级应用、敏感数据处理

### 3. 混合部署
结合云端和本地部署的优势,关键数据本地处理,通用任务云端处理。

## Ollama部署示例

```bash
# 安装Ollama
curl -fsSL https://ollama.com/install.sh | sh

# 拉取模型
ollama pull llama2:7b

# 启动服务
ollama serve

# API调用
curl http://localhost:11434/api/generate -d '{
  "model": "llama2:7b",
  "prompt": "Hello!",
  "stream": false
}'
```

## vLLM高性能部署

```bash
# 安装vLLM
pip install vllm

# 启动服务
python -m vllm.entrypoints.api_server \
    --model meta-llama/Llama-2-7b-chat-hf \
    --tensor-parallel-size 2 \
    --max-num-batched-tokens 8192
```

## Docker部署

```dockerfile
FROM nvidia/cuda:12.1-base

RUN pip install ollama

EXPOSE 11434

CMD ["ollama", "serve"]
```

## 监控与日志

### Prometheus监控
```yaml
metrics:
  - request_latency
  - tokens_per_second
  - error_rate
  - gpu_utilization
```

### 日志收集
```java
@Slf4j
@Component
public class ModelMonitor {
    
    @EventListener
    public void onModelRequest(ModelRequestEvent event) {
        log.info("Model request: model={}, tokens={}, latency={}ms",
            event.getModel(),
            event.getTokenCount(),
            event.getLatency());
    }
}
```

## 成本控制策略

1. **缓存机制**: 对常见问题使用语义缓存
2. **模型路由**: 简单任务使用小模型,复杂任务使用大模型
3. **批量处理**: 合并多个请求,提高吞吐量
4. **限流降级**: 高峰期限制请求频率

## 相关资源

- [Ollama官方文档](https://ollama.com/docs)
- [vLLM高性能推理](https://docs.vllm.ai/)
- [LLM成本控制指南](https://www.anthropic.com/news/contextual-retrieval)

## 练习题

<ClientOnly>
  <QuizWidget category-id="deployment" />
</ClientOnly>

---
title: 向量数据库集成
description: 掌握向量数据库选型、Embedding模型配置、向量存储和检索、相似度阈值控制,以及语义搜索Spring AI实战代码
category: spring-ai
difficulty: L2
estimatedTime: 45分钟
tags:
  - Vector Store
  - Embedding
  - 语义搜索
prerequisites:
  - Function Calling机制
relatedResources:
  - type: doc
    title: Spring AI Vector Store文档
    url: https://docs.spring.io/spring-ai/reference/api/vectordbs.html
  - type: doc
    title: Milvus官方文档
    url: https://milvus.io/docs/overview.md
---

# 向量数据库集成

## 核心概念

**向量数据库(Vector Database)**是专门用于存储和检索向量数据的数据库,支持高效的相似度搜索。在RAG系统中,它存储文本片段的embedding向量,实现语义级别的检索。

### 为什么需要向量数据库?

```mermaid
graph LR
    A[传统关键词搜索] -->|局限| B[只能匹配字面相同]
    B --> C["苹果" ≠ "iPhone"]
    
    D[向量语义搜索] -->|优势| E[理解语义相似性]
    E --> F["苹果" ≈ "iPhone" ✓]
    
    style C fill:#ffebee
    style F fill:#c8e6c9
```

**对比**:
- **关键词搜索**: "手机" → 只返回包含"手机"的文档
- **向量搜索**: "手机" → 返回"智能手机"、"iPhone"、"安卓设备"等语义相关的文档

### 主流向量数据库对比

| 数据库 | 类型 | 特点 | 适用场景 | Spring AI支持 |
|--------|------|------|----------|--------------|
| **Milvus** | 开源分布式 | 高性能、可扩展 | 大规模生产环境 | ✅ |
| **PgVector** | PostgreSQL扩展 | 与关系型数据库集成 | 已有PostgreSQL项目 | ✅ |
| **Qdrant** | 开源Rust编写 | 轻量级、易用 | 中小规模应用 | ✅ |
| **Chroma** | 开源Python | 开发者友好 | 快速原型开发 | ✅ |
| **Pinecone** | 托管云服务 | 零运维、自动扩展 | 不想自建基础设施 | ✅ |
| **Redis Vector** | Redis模块 | 低延迟、缓存一体化 | 实时推荐系统 | ✅ |

**选型建议**:
- ✅ **已有PostgreSQL** → PgVector(零额外运维)
- ✅ **大规模生产** → Milvus(高性能、分布式)
- ✅ **快速原型** → Chroma或Qdrant(简单易用)
- ✅ **不想运维** → Pinecone(托管服务)

## Spring AI实战

### 1. Embedding模型配置

Embedding模型将文本转换为向量:

```xml
<!-- pom.xml -->
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-starter-model-openai</artifactId>
    <version>1.0.0-M4</version>
</dependency>
```

```yaml
# application.yml
spring:
  ai:
    openai:
      api-key: ${OPENAI_API_KEY}
      embedding:
        options:
          model: text-embedding-3-small  # 性价比高
          # model: text-embedding-3-large  # 效果更好,成本更高
```

```java
@Configuration
public class EmbeddingConfig {
    
    @Bean
    public EmbeddingModel embeddingModel(OpenAiApi openAiApi) {
        return new OpenAiEmbeddingModel(openAiApi);
    }
}
```

**使用Embedding**:

```java
@Service
public class EmbeddingService {
    
    private final EmbeddingModel embeddingModel;
    
    public float[] embed(String text) {
        // 生成向量(维度: 1536 for text-embedding-3-small)
        return embeddingModel.embed(text);
    }
    
    public double similarity(String text1, String text2) {
        float[] vec1 = embed(text1);
        float[] vec2 = embed(text2);
        
        // 计算余弦相似度
        return cosineSimilarity(vec1, vec2);
    }
    
    private double cosineSimilarity(float[] vec1, float[] vec2) {
        double dotProduct = 0.0;
        double norm1 = 0.0;
        double norm2 = 0.0;
        
        for (int i = 0; i < vec1.length; i++) {
            dotProduct += vec1[i] * vec2[i];
            norm1 += vec1[i] * vec1[i];
            norm2 += vec2[i] * vec2[i];
        }
        
        return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
    }
}

// 测试
double sim = embeddingService.similarity("我喜欢编程", "我热爱写代码");
System.out.println(sim);  // 输出: 0.85 (高度相似)

double sim2 = embeddingService.similarity("我喜欢编程", "今天天气很好");
System.out.println(sim2);  // 输出: 0.12 (不相关)
```

### 2. 向量数据库集成(Milvus示例)

#### 添加依赖

```xml
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-starter-vector-store-milvus</artifactId>
    <version>1.0.0-M4</version>
</dependency>
```

#### 配置Milvus

```yaml
spring:
  ai:
    milvus:
      client:
        host: localhost
        port: 19530
      database: default
      collection: documents
```

#### 启动Milvus(Docker)

```bash
docker run -d \
  --name milvus \
  -p 19530:19530 \
  -p 9091:9091 \
  milvusdb/milvus:latest \
  milvus run standalone
```

#### 使用VectorStore

```java
@Configuration
public class VectorStoreConfig {
    
    @Bean
    public VectorStore vectorStore(MilvusVectorStoreConfig config,
                                   EmbeddingModel embeddingModel) {
        return new MilvusVectorStore(config, embeddingModel);
    }
}

@Service
public class DocumentService {
    
    private final VectorStore vectorStore;
    
    public DocumentService(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }
    
    /**
     * 添加文档到向量库
     */
    public void addDocument(String text, Map<String, Object> metadata) {
        Document document = new Document(
            text,           // 文本内容
            metadata,       // 元数据(如source、page等)
            null            // 向量由EmbeddingModel自动生成
        );
        
        vectorStore.add(List.of(document));
        
        log.info("文档已添加: {}", text.substring(0, 50) + "...");
    }
    
    /**
     * 批量添加文档
     */
    public void addDocuments(List<String> texts) {
        List<Document> documents = texts.stream()
            .map(text -> new Document(text, Map.of()))
            .toList();
        
        vectorStore.add(documents);
        
        log.info("批量添加了{}个文档", documents.size());
    }
    
    /**
     * 语义搜索
     */
    public List<Document> search(String query, int topK) {
        SearchRequest request = SearchRequest.builder()
            .query(query)
            .topK(topK)
            .similarityThreshold(0.7)  // 相似度阈值
            .build();
        
        return vectorStore.similaritySearch(request);
    }
    
    /**
     * 删除文档
     */
    public void deleteDocument(String documentId) {
        vectorStore.delete(List.of(documentId));
    }
}
```

### 3. 相似度阈值控制

```java
@Service
public class SmartSearchService {
    
    private final VectorStore vectorStore;
    
    /**
     * 根据查询类型调整相似度阈值
     */
    public List<Document> adaptiveSearch(String query, SearchType type) {
        double threshold = switch (type) {
            case EXACT_MATCH -> 0.9;      // 精确匹配
            case SEMANTIC_SEARCH -> 0.7;  // 语义搜索
            case BROAD_SEARCH -> 0.5;     // 广泛搜索
        };
        
        SearchRequest request = SearchRequest.builder()
            .query(query)
            .topK(10)
            .similarityThreshold(threshold)
            .build();
        
        List<Document> results = vectorStore.similaritySearch(request);
        
        log.info("搜索类型: {}, 阈值: {}, 结果数: {}", 
            type, threshold, results.size());
        
        return results;
    }
    
    public enum SearchType {
        EXACT_MATCH,      // 精确匹配(高阈值)
        SEMANTIC_SEARCH,  // 语义搜索(中阈值)
        BROAD_SEARCH      // 广泛搜索(低阈值)
    }
}
```

### 4. 完整的语义搜索引擎

```java
@RestController
@RequestMapping("/api/search")
public class SemanticSearchController {
    
    private final DocumentService documentService;
    private final SmartSearchService searchService;
    
    /**
     * 索引文档
     */
    @PostMapping("/index")
    public ResponseEntity<?> indexDocument(@RequestBody IndexRequest request) {
        try {
            documentService.addDocument(
                request.content(),
                Map.of(
                    "source", request.source(),
                    "timestamp", System.currentTimeMillis()
                )
            );
            
            return ResponseEntity.ok(Map.of("status", "indexed"));
            
        } catch (Exception e) {
            log.error("索引失败", e);
            return ResponseEntity.status(500)
                .body(Map.of("error", "索引失败"));
        }
    }
    
    /**
     * 语义搜索
     */
    @GetMapping("/search")
    public ResponseEntity<List<SearchResult>> search(
            @RequestParam String query,
            @RequestParam(defaultValue = "5") int topK,
            @RequestParam(defaultValue = "SEMANTIC_SEARCH") SearchType type) {
        
        List<Document> documents = searchService.adaptiveSearch(query, type);
        
        List<SearchResult> results = documents.stream()
            .map(doc -> new SearchResult(
                doc.getText(),
                doc.getMetadata(),
                calculateRelevanceScore(doc)
            ))
            .toList();
        
        return ResponseEntity.ok(results);
    }
    
    private double calculateRelevanceScore(Document doc) {
        // 简化实现: 实际应该从搜索结果中获取
        return 0.85;
    }
    
    public record IndexRequest(String content, String source) {}
    public record SearchResult(
        String content,
        Map<String, Object> metadata,
        double relevanceScore
    ) {}
}
```

**测试**:

```bash
# 1. 索引文档
curl -X POST http://localhost:8080/api/search/index \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Spring AI是Spring官方推出的AI应用开发框架",
    "source": "official-docs"
  }'

# 2. 语义搜索
curl "http://localhost:8080/api/search/search?query=Java+AI框架&type=SEMANTIC_SEARCH"

# 返回: 即使查询中没有"Spring AI",也能找到相关文档
```

## PgVector集成(PostgreSQL用户推荐)

如果你已经使用PostgreSQL,PgVector是最佳选择:

```xml
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-starter-vector-store-pgvector</artifactId>
    <version>1.0.0-M4</version>
</dependency>
```

```yaml
spring:
  ai:
    pgvector:
      datasource:
        url: jdbc:postgresql://localhost:5432/mydb
        username: postgres
        password: secret
      dimensions: 1536  # 与Embedding模型维度一致
      index-type: HNSW  # 索引类型
```

**优势**:
- ✅ 无需额外部署(复用PostgreSQL)
- ✅ ACID事务支持
- ✅ 与业务数据统一管理
- ✅ 成熟的备份恢复机制

## 常见误区

### ❌ 误区1: 忽略Embedding模型选择
**真相**: 不同Embedding模型效果差异巨大。

**推荐**:
- 英文: OpenAI text-embedding-3-small(性价比)
- 中文: BGE-M3、M3E(阿里开源)
- 多语言: text-embedding-3-large

### ❌ 误区2: 不设置相似度阈值
**真相**: 默认阈值可能返回不相关结果。

**建议**:
- 问答系统: 0.7-0.8
- 推荐系统: 0.5-0.6
- 严格匹配: 0.9+

### ❌ 误区3: 向量维度不匹配
**真相**: Embedding模型输出的维度必须与向量数据库配置一致。

```
text-embedding-3-small: 1536维
text-embedding-3-large: 3072维
BGE-M3: 1024维
```

## 相关资源

### 📚 官方文档
- [Spring AI Vector Stores](https://docs.spring.io/spring-ai/reference/api/vectordbs.html)
- [Milvus Documentation](https://milvus.io/docs/overview.md)
- [PgVector GitHub](https://github.com/pgvector/pgvector)

## 练习题

<ClientOnly>
  <QuizWidget category-id="frameworks" />
</ClientOnly>

---

> 💡 **下一步**: 学习 [RAG Advisor编排](/guide/spring-ai/rag-advisor),构建完整的RAG知识库问答系统!

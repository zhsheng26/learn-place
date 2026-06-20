---
title: LLM理论基础面试题库
description: 12道精选LLM理论题目,涵盖Transformer、Attention、Tokenization等核心概念
category: interview
difficulty: mixed
tags:
  - LLM理论
  - Transformer
  - 面试题
---

# LLM理论基础面试题库

本分类包含12道LLM理论基础题目,难度分布:初级4题、中级5题、高级3题。

---

## 题目1: Transformer架构的核心组件 ⭐

**题型**: 简答题  
**难度**: ⭐⭐  
**知识点**: Transformer架构

### 问题
请简述Transformer架构的6大核心组件及其作用。

### 参考答案
Transformer架构包含以下6大核心组件:

1. **Input Embedding(输入嵌入)**
   - 将token转换为固定维度的向量表示
   - 通常维度为512或768

2. **Positional Encoding(位置编码)**
   - 为序列中每个位置添加位置信息
   - 因为Self-Attention本身不具备顺序感知能力
   - 使用正弦/余弦函数生成

3. **Multi-Head Self-Attention(多头自注意力)**
   - 核心组件,捕捉序列中长距离依赖关系
   - 多头机制允许模型从不同子空间学习
   - 计算公式: Attention(Q,K,V) = softmax(QK^T/√d_k)V

4. **Add & Norm(残差连接+层归一化)**
   - 残差连接缓解梯度消失问题
   - LayerNorm稳定训练过程

5. **Feed-Forward Network(前馈神经网络)**
   - 两层全连接网络,中间使用ReLU激活
   - 对每个位置独立处理

6. **Output Linear + Softmax(输出层)**
   - 将隐藏状态映射到词表大小
   - Softmax生成概率分布

### 评分标准
- 列出6个组件得6分
- 每个组件作用描述准确得1分(共6分)
- 提到Self-Attention公式得2分
- **总分**: 14分,≥10分为合格

### 相关链接
- [Transformer论文](https://arxiv.org/abs/1706.03762)
- [Transformer架构详解](/guide/llm-basics/transformer-architecture)

---

## 题目2: Self-Attention vs Multi-Head Attention ⭐⭐

**题型**: 简答题  
**难度**: ⭐⭐⭐  
**知识点**: Attention机制

### 问题
Self-Attention和Multi-Head Attention有什么区别?为什么需要多头机制?

### 参考答案
**Self-Attention**:
- 单个注意力头,计算一次Q、K、V矩阵
- 输出维度与输入相同

**Multi-Head Attention**:
- 将Q、K、V分成h个头(heads),并行计算
- 每个头学习不同的表示子空间
- 最后拼接所有头的输出,通过线性变换得到最终输出

**为什么需要多头**:
1. **多视角学习**: 不同头可以关注不同方面的信息(如语法、语义、位置关系)
2. **增强表达能力**: 相当于集成多个注意力机制
3. **稳定性**: 多头平均可以降低方差,提升泛化能力

**数学表达**:
```
MultiHead(Q,K,V) = Concat(head_1, ..., head_h)W^O
where head_i = Attention(QW_i^Q, KW_i^K, VW_i^V)
```

### 评分标准
- 准确区分两者得3分
- 解释多头优势得3分
- 给出数学公式得2分
- **总分**: 8分,≥6分为合格

### 相关链接
- [Attention机制详解](/guide/llm-basics/transformer-architecture#attention机制)

---

## 题目3: Tokenization方法对比 ⭐

**题型**: 多选题  
**难度**: ⭐⭐  
**知识点**: Tokenization

### 问题
以下哪些是常见的Tokenization方法?(多选)

A. Word-level tokenization(按词切分)  
B. Character-level tokenization(按字符切分)  
C. Subword tokenization(BPE/WordPiece)(子词切分)  
D. Sentence-level tokenization(按句子切分)  

**正确答案**: A、B、C

### 解析
**A. Word-level**: 
- 优点: 直观,词汇量少
- 缺点: 词表巨大,无法处理未登录词(OOV)

**B. Character-level**:
- 优点: 词表小,无OOV问题
- 缺点: 序列过长,计算成本高

**C. Subword tokenization**(主流方法):
- BPE(Byte Pair Encoding): GPT系列使用
- WordPiece: BERT使用
- Unigram LM: XLM-R使用
- 平衡了词表大小和序列长度

**D. Sentence-level**: 不是标准的tokenization方法

### 评分标准
- 全选对得5分
- 漏选得3分
- 错选得0分

---

## 题目4: Temperature参数的作用 ⭐

**题型**: 单选题  
**难度**: ⭐  
**知识点**: LLM解码策略

### 问题
Temperature参数在LLM生成中的作用是什么?

A. 控制生成文本的长度  
B. 控制输出的随机性和创造性  
C. 控制模型的推理速度  
D. 控制上下文窗口大小  

**正确答案**: B

### 解析
**Temperature(温度)**:
- **低温度(0.1-0.3)**: 输出更确定性,适合事实性问题
- **中温度(0.5-0.7)**: 平衡准确性和创造性
- **高温度(0.8-1.0)**: 输出更多样化,适合创意写作

**工作原理**:
在softmax之前,将logits除以temperature:
```
P(x) = exp(logit(x) / T) / Σexp(logit(x_i) / T)
```
- T→0: 趋近于argmax,总是选择概率最高的token
- T→∞: 趋近于均匀分布,完全随机

### 评分标准
- 答对得5分

### 相关链接
- [解码策略详解](/guide/llm-basics/llm-api-calling#解码策略)

---

## 题目5: Context Window的限制与优化 ⭐⭐

**题型**: 简答题  
**难度**: ⭐⭐⭐  
**知识点**: Token和上下文

### 问题
什么是Context Window?GPT-4的上下文窗口是多少?如何优化长文本处理?

### 参考答案
**Context Window(上下文窗口)**:
- LLM一次能处理的最大token数量
- 包括输入(prompt)和输出(completion)

**GPT-4上下文窗口**:
- GPT-4: 8K tokens(约6000单词)
- GPT-4-32K: 32K tokens
- GPT-4-Turbo: 128K tokens

**长文本优化策略**:
1. **截断(Truncation)**: 保留最近N个token,丢弃早期内容
2. **滑动窗口(Sliding Window)**: 分段处理,保持重叠
3. **摘要压缩**: 定期总结对话历史,替换原始文本
4. **分层检索**: 只检索相关片段,而非全部上下文
5. **扩展上下文模型**: 使用支持更长上下文的模型(Claude 200K、Gemini 1M)

### 评分标准
- 定义准确得2分
- GPT-4窗口正确得2分
- 提出3种以上优化策略得4分
- **总分**: 8分,≥6分为合格

---

## 题目6: Transformer为何优于RNN ⭐⭐

**题型**: 简答题  
**难度**: ⭐⭐⭐  
**知识点**: Transformer架构

### 问题
相比RNN/LSTM,Transformer有哪些优势?

### 参考答案
**Transformer的优势**:

1. **并行计算**
   - RNN: 必须串行处理,第t步依赖第t-1步
   - Transformer: 所有位置可同时计算,充分利用GPU

2. **长距离依赖**
   - RNN: 梯度随距离衰减,难以捕捉长距离依赖
   - Transformer: Self-Attention直接连接任意两个位置,O(1)路径长度

3. **训练效率**
   - RNN: 训练慢,难以扩展到大数据集
   - Transformer: 训练快,可扩展到十亿级参数

4. **建模能力**
   - RNN: 隐状态容量有限
   - Transformer: 多头Attention从多角度建模

**劣势**:
- Transformer需要O(n²)内存存储注意力矩阵
- RNN在流式处理场景仍有优势

### 评分标准
- 列出3个以上优势得6分
- 提到劣势得2分
- **总分**: 8分,≥6分为合格

---

## 题目7: Positional Encoding的原理 ⭐⭐

**题型**: 简答题  
**难度**: ⭐⭐⭐  
**知识点**: Transformer架构

### 问题
为什么Transformer需要Positional Encoding?它是如何工作的?

### 参考答案
**为什么需要**:
- Self-Attention是排列不变的(permutation invariant)
- 即"我爱中国"和"中国爱我"会得到相同的Attention矩阵
- 需要显式注入位置信息

**工作原理**:
使用正弦和余弦函数生成位置编码:

```
PE(pos, 2i) = sin(pos / 10000^(2i/d))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d))
```

其中:
- pos: 位置索引
- i: 维度索引
- d: 嵌入维度

**优势**:
1. 可以外推到未见过的序列长度
2. 相对位置关系可以通过线性变换表示
3. 无需学习,计算成本低

**替代方案**:
- 可学习的位置编码(Learned Positional Embedding)
- RoPE(Rotary Positional Embedding): LLaMA使用
- ALiBi(Attention with Linear Biases)

### 评分标准
- 解释原因得3分
- 给出公式得3分
- 提到替代方案得2分
- **总分**: 8分,≥6分为合格

---

## 题目8: Top-k vs Top-p采样 ⭐

**题型**: 单选题  
**难度**: ⭐⭐  
**知识点**: 解码策略

### 问题
Top-k采样和Top-p(Nucleus)采样的区别是什么?

A. Top-k固定选择k个token,Top-p动态选择累积概率达到p的token集合  
B. Top-k用于训练,Top-p用于推理  
C. Top-k速度更快,Top-p质量更高  
D. 两者没有区别  

**正确答案**: A

### 解析
**Top-k采样**:
- 从概率最高的k个token中采样
- k是超参数,通常设为50

**Top-p采样**:
- 从累积概率达到p的最小token集合中采样
- p通常为0.9或0.95
- 动态调整候选集大小

**对比**:
- Top-k: 固定大小,可能在低置信度时仍选择k个
- Top-p: 自适应,高置信度时候选集小,低置信度时候选集大
- **最佳实践**: 同时使用(Top-k=50, Top-p=0.95)

### 评分标准
- 答对得5分

---

## 题目9: Fine-tuning vs Prompt Engineering ⭐⭐

**题型**: 简答题  
**难度**: ⭐⭐⭐  
**知识点**: LLM应用方式

### 问题
Fine-tuning(微调)和Prompt Engineering(提示工程)各有什么优缺点?何时选择哪种方式?

### 参考答案
**Prompt Engineering**:
- **优点**:
  - 无需训练,成本低
  - 快速迭代,灵活调整
  - 适用于通用任务
- **缺点**:
  - 受限于预训练知识
  - Prompt过长增加成本
  - 难以掌握领域专有知识

**Fine-tuning**:
- **优点**:
  - 适配特定领域/任务
  - 减少Prompt长度
  - 性能通常更好
- **缺点**:
  - 需要标注数据
  - 训练成本高
  - 可能灾难性遗忘

**选择建议**:
- **优先Prompt Engineering**: 通用任务、快速验证、资源有限
- **选择Fine-tuning**: 领域专用、性能要求高、有充足数据

**趋势**: PEFT(Parameter-Efficient Fine-Tuning)如LoRA结合两者优势

### 评分标准
- 优缺点分析全面得4分
- 选择建议合理得3分
- 提到PEFT/LoRA得2分
- **总分**: 9分,≥7分为合格

---

## 题目10: Embedding向量的维度意义 ⭐

**题型**: 单选题  
**难度**: ⭐⭐  
**知识点**: Embedding

### 问题
text-embedding-ada-002生成的向量维度是1536,这个数字代表什么?

A. 最大支持的token数量  
B. 向量空间的维度,表示语义信息的丰富程度  
C. 模型的最大层数  
D. 训练数据的规模  

**正确答案**: B

### 解析
**向量维度**:
- 1536维表示每个文本被映射到1536维的向量空间
- 维度越高,理论上能表达的语义信息越丰富
- 但也会增加存储和计算成本

**常见Embedding模型维度**:
- text-embedding-ada-002: 1536维
- text-embedding-3-small: 1536维(可降至512)
- text-embedding-3-large: 3072维(可降至1024/256)
- BERT-base: 768维

**维度选择**:
- 高精度场景: 使用高维度
- 资源受限: 可使用降维技术(PCA)降至256-512维,损失较小

### 评分标准
- 答对得5分

---

## 题目11: KV Cache的作用 ⭐⭐⭐

**题型**: 简答题  
**难度**: ⭐⭐⭐⭐  
**知识点**: LLM推理优化

### 问题
什么是KV Cache?它如何加速LLM推理?

### 参考答案
**KV Cache(Key-Value Cache)**:
- 在自回归生成过程中,缓存已计算过的Key和Value矩阵
- 避免重复计算,显著提升推理速度

**工作原理**:
1. **Prefill阶段**: 处理prompt,计算所有token的K、V并缓存
2. **Decoding阶段**: 每生成一个新token:
   - 只需计算新token的Q、K、V
   - 与缓存的K、V做Attention
   - 将新K、V加入缓存

**性能提升**:
- 无KV Cache: 每步O(n²),n为当前序列长度
- 有KV Cache: 每步O(n),线性复杂度
- 实际加速: 2-5倍(取决于序列长度)

**内存代价**:
- KV Cache占用大量显存
- GPT-3(175B参数): 每token约占用几MB
- 优化技术: PagedAttention(vLLM)、Quantized KV Cache

### 评分标准
- 定义准确得3分
- 解释工作原理得3分
- 提到性能提升和内存代价得3分
- **总分**: 9分,≥7分为合格

### 相关链接
- [vLLM推理引擎](/guide/deployment/model-deploy#vllm)

---

## 题目12: Hallucination(幻觉)的成因与缓解 ⭐⭐⭐

**题型**: 简答题  
**难度**: ⭐⭐⭐⭐⭐  
**知识点**: LLM局限性

### 问题
什么是LLM的Hallucination(幻觉)现象?产生的原因是什么?有哪些缓解策略?

### 参考答案
**Hallucination定义**:
- LLM生成看似合理但事实上错误或虚构的内容
- 例如: 编造不存在的论文引用、错误的历史事实

**产生原因**:
1. **训练数据噪声**: 互联网数据包含错误信息
2. **概率生成**: LLM基于概率预测下一个token,不保证事实性
3. **过度泛化**: 从有限样本学习到错误模式
4. **缺乏 grounding**: 没有实时访问真实世界的能力

**缓解策略**:
1. **RAG(检索增强生成)**: 基于检索到的事实生成答案
2. **引用溯源**: 要求模型标注信息来源
3. **自我验证**: 让模型检查自己生成的内容
4. **人类反馈强化学习(RLHF)**: 通过人类偏好训练
5. **降低Temperature**: 减少随机性
6. **Fact-checking工具**: 调用外部事实验证API

**评估指标**:
- Faithfulness(忠实度): 答案是否基于给定上下文
- Factuality(事实性): 答案是否符合客观事实

### 评分标准
- 定义准确得2分
- 列出3个以上原因得3分
- 提出4个以上缓解策略得4分
- 提到评估指标得2分
- **总分**: 11分,≥8分为合格

### 相关链接
- [RAG架构详解](/guide/rag/architecture)
- [Prompt安全](/guide/prompt-eng/prompt-security)

---

## 📊 答题统计

| 难度 | 题目数量 | 占比 |
|------|---------|------|
| ⭐ 初级 | 4题 | 33% |
| ⭐⭐ 中级 | 5题 | 42% |
| ⭐⭐⭐ 高级 | 3题 | 25% |

**建议学习路径**:
1. 先完成[LLM基础认知](/guide/roadmap#阶段1-llm基础认知)章节
2. 再尝试回答本套题目
3. 错题回顾相关知识点链接
4. 目标正确率: ≥80%

---

> 💡 **提示**: 完成本题库后,可以继续挑战[Prompt工程题库](/interview/prompt-eng/principles)!

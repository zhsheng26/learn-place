---
title: Token计算器
description: 计算文本的Token数量,估算API调用成本
---

<script setup lang="ts">
import { ref, computed } from 'vue'

const inputText = ref('')
const selectedModel = ref('gpt-3.5-turbo')

// 模型价格(每1K tokens)
const modelPricing: Record<string, { input: number; output: number }> = {
  'gpt-3.5-turbo': { input: 0.0005, output: 0.0015 },
  'gpt-4': { input: 0.03, output: 0.06 },
  'gpt-4-turbo': { input: 0.01, output: 0.03 },
  'claude-3-opus': { input: 0.015, output: 0.075 },
  'claude-3-sonnet': { input: 0.003, output: 0.015 },
}

// 估算Token数量(简化算法:1个英文单词≈1.3 tokens,1个中文字符≈1.5 tokens)
const estimatedTokens = computed(() => {
  if (!inputText.value) return 0
  
  const text = inputText.value
  const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length
  const englishWords = text.split(/\s+/).filter(w => w.length > 0).length
  
  // 粗略估算
  return Math.round(chineseChars * 1.5 + englishWords * 1.3)
})

// 计算成本
const cost = computed(() => {
  const pricing = modelPricing[selectedModel.value]
  if (!pricing) return { input: 0, output: 0 }
  
  const tokens = estimatedTokens.value / 1000 // 转换为K tokens
  return {
    input: (tokens * pricing.input).toFixed(6),
    output: (tokens * pricing.output).toFixed(6),
  }
})

// 字符统计
const charStats = computed(() => {
  const text = inputText.value
  return {
    total: text.length,
    chinese: (text.match(/[\u4e00-\u9fa5]/g) || []).length,
    english: (text.match(/[a-zA-Z]/g) || []).length,
    digits: (text.match(/[0-9]/g) || []).length,
    spaces: (text.match(/\s/g) || []).length,
  }
})

// 清空输入
function clearInput() {
  inputText.value = ''
}

// 示例文本
function loadExample() {
  inputText.value = `请帮我写一个Java方法,实现以下功能:
1. 接收一个字符串列表
2. 过滤出长度大于5的字符串
3. 转换为大写
4. 按字母顺序排序
5. 返回结果列表

要求:
- 使用Stream API
- 添加适当的注释
- 考虑空指针情况`
}
</script>

# Token计算器

快速估算文本的Token数量和API调用成本。

## 🧮 在线计算

<div style="margin: 24px 0;">
  <div style="margin-bottom: 16px;">
    <label style="display: block; margin-bottom: 8px; font-weight: 500;">选择模型:</label>
    <select 
      v-model="selectedModel" 
      style="padding: 8px 12px; border: 1px solid var(--vp-c-divider); border-radius: 6px; width: 100%; max-width: 300px;"
    >
      <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
      <option value="gpt-4">GPT-4</option>
      <option value="gpt-4-turbo">GPT-4 Turbo</option>
      <option value="claude-3-opus">Claude 3 Opus</option>
      <option value="claude-3-sonnet">Claude 3 Sonnet</option>
    </select>
  </div>
  
  <div style="margin-bottom: 16px;">
    <label style="display: block; margin-bottom: 8px; font-weight: 500;">输入文本:</label>
    <textarea 
      v-model="inputText"
      rows="10"
      placeholder="在此粘贴需要计算的文本..."
      style="width: 100%; padding: 12px; border: 1px solid var(--vp-c-divider); border-radius: 6px; font-family: monospace; resize: vertical;"
    ></textarea>
  </div>
  
  <div style="display: flex; gap: 12px; margin-bottom: 24px;">
    <button 
      @click="loadExample"
      style="padding: 8px 16px; background: var(--vp-c-brand); color: white; border: none; border-radius: 6px; cursor: pointer;"
    >
      加载示例
    </button>
    <button 
      @click="clearInput"
      style="padding: 8px 16px; background: var(--vp-c-divider); color: var(--vp-c-text-1); border: none; border-radius: 6px; cursor: pointer;"
    >
      清空
    </button>
  </div>
  
  <!-- 结果显示 -->
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
    <div style="padding: 16px; background: var(--vp-c-bg-soft); border-radius: 8px;">
      <div style="font-size: 14px; color: var(--vp-c-text-2); margin-bottom: 8px;">估算Token数</div>
      <div style="font-size: 32px; font-weight: bold; color: var(--vp-c-brand);">{{ estimatedTokens }}</div>
    </div>
    
    <div style="padding: 16px; background: var(--vp-c-bg-soft); border-radius: 8px;">
      <div style="font-size: 14px; color: var(--vp-c-text-2); margin-bottom: 8px;">输入成本 (USD)</div>
      <div style="font-size: 32px; font-weight: bold; color: #10b981;">${{ cost.input }}</div>
    </div>
    
    <div style="padding: 16px; background: var(--vp-c-bg-soft); border-radius: 8px;">
      <div style="font-size: 14px; color: var(--vp-c-text-2); margin-bottom: 8px;">输出成本 (USD)</div>
      <div style="font-size: 32px; font-weight: bold; color: #f59e0b;">${{ cost.output }}</div>
    </div>
  </div>
  
  <!-- 字符统计 -->
  <div style="margin-top: 24px; padding: 16px; background: var(--vp-c-bg-soft); border-radius: 8px;">
    <h4 style="margin: 0 0 12px 0;">字符统计</h4>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px;">
      <div>
        <div style="font-size: 12px; color: var(--vp-c-text-2);">总字符数</div>
        <div style="font-size: 20px; font-weight: bold;">{{ charStats.total }}</div>
      </div>
      <div>
        <div style="font-size: 12px; color: var(--vp-c-text-2);">中文字符</div>
        <div style="font-size: 20px; font-weight: bold;">{{ charStats.chinese }}</div>
      </div>
      <div>
        <div style="font-size: 12px; color: var(--vp-c-text-2);">英文字母</div>
        <div style="font-size: 20px; font-weight: bold;">{{ charStats.english }}</div>
      </div>
      <div>
        <div style="font-size: 12px; color: var(--vp-c-text-2);">数字</div>
        <div style="font-size: 20px; font-weight: bold;">{{ charStats.digits }}</div>
      </div>
      <div>
        <div style="font-size: 12px; color: var(--vp-c-text-2);">空格/换行</div>
        <div style="font-size: 20px; font-weight: bold;">{{ charStats.spaces }}</div>
      </div>
    </div>
  </div>
</div>

## 💡 Token知识

### 什么是Token?

Token是LLM处理文本的基本单位。一个Token可以是:
- 一个完整的单词 (如 "hello")
- 单词的一部分 (如 "ing" in "running")
- 一个标点符号
- 一个中文字符通常对应1-2个Token

### Token计算方法

不同模型使用不同的Tokenizer:
- **GPT系列**: 使用Byte Pair Encoding (BPE)
- **Claude**: 使用类似的子词分词算法
- **开源模型**: 通常使用SentencePiece

**经验法则**:
- 英文: 1个单词 ≈ 1.3 tokens
- 中文: 1个字符 ≈ 1.5 tokens
- 代码: 视语言而定,通常比自然语言更消耗Token

### 常见模型的Token限制

| 模型 | 最大Context | 适用场景 |
|------|------------|----------|
| GPT-3.5 Turbo | 16K | 日常对话、简单任务 |
| GPT-4 | 8K / 32K | 复杂推理、长文档分析 |
| GPT-4 Turbo | 128K | 超长文档、批量处理 |
| Claude 3 Opus | 200K | 极长上下文场景 |

### 优化Token使用技巧

1. **精简Prompt**: 去除冗余信息,保留核心内容
2. **分批处理**: 大文档拆分为小块分别处理
3. **缓存结果**: 避免重复调用相同或相似的Prompt
4. **使用流式输出**: 实时显示结果,提升用户体验
5. **选择合适的模型**: 简单任务用GPT-3.5,复杂任务用GPT-4

---

<div class="tip custom-block" style="padding: 16px; background: #dbeafe; border-left: 4px solid #3b82f6; margin-top: 24px;">

⚠️ **注意**: 此计算器使用简化算法估算Token数量,实际结果可能因模型和Tokenizer而异。建议以API返回的实际Token数为准。

</div>

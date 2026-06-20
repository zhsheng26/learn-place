<script setup lang="ts">
import { ref, computed } from 'vue'

const inputText = ref('')
const selectedModel = ref('gpt-3.5-turbo')

// 不同模型的token计算方式(简化版)
const modelConfigs = {
  'gpt-3.5-turbo': { name: 'GPT-3.5 Turbo', charsPerToken: 4 },
  'gpt-4': { name: 'GPT-4', charsPerToken: 4 },
  'gpt-4-turbo': { name: 'GPT-4 Turbo', charsPerToken: 4 },
  'claude-2': { name: 'Claude 2', charsPerToken: 4 },
  'llama-2': { name: 'Llama 2', charsPerToken: 4 }
}

// 估算token数量
const estimatedTokens = computed(() => {
  if (!inputText.value) return 0
  const config = modelConfigs[selectedModel.value as keyof typeof modelConfigs]
  return Math.ceil(inputText.value.length / config.charsPerToken)
})

// 估算成本(每1K tokens的价格,单位:美元)
const pricing = {
  'gpt-3.5-turbo': { input: 0.0015, output: 0.002 },
  'gpt-4': { input: 0.03, output: 0.06 },
  'gpt-4-turbo': { input: 0.01, output: 0.03 },
  'claude-2': { input: 0.008, output: 0.024 },
  'llama-2': { input: 0, output: 0 } // 开源模型
}

const estimatedCost = computed(() => {
  const tokens = estimatedTokens.value
  const price = pricing[selectedModel.value as keyof typeof pricing]
  return ((tokens / 1000) * price.input).toFixed(4)
})

// 常用文本模板
const templates = [
  {
    name: '系统提示词',
    text: 'You are a helpful AI assistant specialized in Java development and AI applications. Please provide clear, concise, and accurate answers.'
  },
  {
    name: 'RAG Prompt',
    text: 'Based on the following context, answer the question accurately. If the answer is not in the context, say "I don\'t know".

Context: {context}

Question: {question}

Answer:'
  },
  {
    name: '代码生成',
    text: 'Generate a Spring Boot REST controller with the following requirements:\n- Endpoint: GET /api/users\n- Returns a list of users\n- Includes proper error handling\n- Uses Spring Data JPA\n\nProvide complete code with imports.'
  }
]

const useTemplate = (text: string) => {
  inputText.value = text
}

// 复制文本
const copyToClipboard = () => {
  navigator.clipboard.writeText(inputText.value)
  alert('已复制到剪贴板!')
}

// 清空文本
const clearText = () => {
  inputText.value = ''
}
</script>

<template>
  <div class="calculator-page">
    <h1>Token 计算器</h1>
    <p class="description">
      估算你的 prompt 或文本的 token 数量和相关成本。
      支持多种主流大语言模型。
    </p>
    
    <!-- 模型选择 -->
    <div class="model-selector">
      <label for="model">选择模型:</label>
      <select id="model" v-model="selectedModel">
        <option v-for="(config, key) in modelConfigs" :key="key" :value="key">
          {{ config.name }}
        </option>
      </select>
    </div>
    
    <!-- 输入区域 -->
    <div class="input-section">
      <div class="input-header">
        <label for="text-input">输入文本:</label>
        <div class="input-actions">
          <button class="btn btn-small" @click="copyToClipboard">📋 复制</button>
          <button class="btn btn-small btn-danger" @click="clearText">🗑️ 清空</button>
        </div>
      </div>
      <textarea
        id="text-input"
        v-model="inputText"
        placeholder="在此输入要计算的文本..."
        rows="10"
      ></textarea>
      
      <!-- 字符数和字数统计 -->
      <div class="text-stats">
        <span>字符数: {{ inputText.length }}</span>
        <span>单词数: {{ inputText.split(/\s+/).filter(w => w).length }}</span>
        <span>行数: {{ inputText.split('\n').length }}</span>
      </div>
    </div>
    
    <!-- 结果展示 -->
    <div class="result-section">
      <div class="result-card">
        <div class="result-label">估算 Token 数</div>
        <div class="result-value">{{ estimatedTokens.toLocaleString() }}</div>
      </div>
      
      <div class="result-card">
        <div class="result-label">估算成本 (Input)</div>
        <div class="result-value">${{ estimatedCost }}</div>
      </div>
    </div>
    
    <!-- 常用模板 -->
    <div class="templates-section">
      <h3>📝 常用 Prompt 模板</h3>
      <div class="template-list">
        <button
          v-for="template in templates"
          :key="template.name"
          class="template-btn"
          @click="useTemplate(template.text)"
        >
          {{ template.name }}
        </button>
      </div>
    </div>
    
    <!-- 提示信息 -->
    <div class="tips-box">
      <h4>💡 提示</h4>
      <ul>
        <li>Token 计算为估算值,实际可能略有差异</li>
        <li>英文通常 1 token ≈ 4 字符,中文 1 token ≈ 1-2 汉字</li>
        <li>使用更简洁的 prompt 可以降低成本</li>
        <li>考虑使用缓存策略避免重复计算</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.calculator-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 24px;
}

h1 {
  font-size: 32px;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.description {
  font-size: 16px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 32px;
}

.model-selector {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.model-selector label {
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.model-selector select {
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  cursor: pointer;
}

.input-section {
  margin-bottom: 24px;
}

.input-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.input-header label {
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.input-actions {
  display: flex;
  gap: 8px;
}

textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  resize: vertical;
}

textarea:focus {
  outline: none;
  border-color: #2196F3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.text-stats {
  display: flex;
  gap: 16px;
  margin-top: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.result-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.result-card {
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  text-align: center;
  color: white;
}

.result-label {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 8px;
}

.result-value {
  font-size: 32px;
  font-weight: bold;
}

.templates-section {
  margin-bottom: 32px;
}

.templates-section h3 {
  font-size: 18px;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
}

.template-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.template-btn {
  padding: 8px 16px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.template-btn:hover {
  border-color: #2196F3;
  background: #E3F2FD;
  color: #1565C0;
}

.tips-box {
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border-left: 4px solid #FF9800;
}

.tips-box h4 {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.tips-box ul {
  margin: 0;
  padding-left: 20px;
  line-height: 2;
  color: var(--vp-c-text-2);
}

.tips-box li {
  margin-bottom: 8px;
}

.btn {
  padding: 6px 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.btn:hover {
  background: var(--vp-c-bg-soft);
}

.btn-small {
  padding: 4px 10px;
  font-size: 12px;
}

.btn-danger:hover {
  background: #FFEBEE;
  border-color: #F44336;
  color: #C62828;
}

@media (max-width: 768px) {
  .calculator-page {
    padding: 24px 16px;
  }
  
  h1 {
    font-size: 24px;
  }
  
  .result-section {
    grid-template-columns: 1fr;
  }
  
  .input-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>

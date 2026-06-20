<script setup lang="ts">
import { ref, onMounted } from 'vue'
import QuizWidget from '../.vitepress/theme/components/QuizWidget.vue'
import questionsData from '../../data/questions.json'

const selectedCategory = ref('')
const currentQuestions = ref<any[]>([])

const categories = questionsData.categories.map(cat => ({
  id: cat.id,
  name: cat.name,
  description: cat.description,
  questionCount: cat.questions.length
}))

const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId
  const category = questionsData.categories.find(c => c.id === categoryId)
  if (category) {
    currentQuestions.value = category.questions
  }
}

onMounted(() => {
  // 默认选择第一个分类
  if (categories.length > 0) {
    selectCategory(categories[0].id)
  }
})
</script>

<template>
  <div class="quiz-page">
    <h1>交互式答题</h1>
    <p class="description">
      通过 interactive 答题测试你对 AI/Agent 知识的掌握程度。
      支持错题本功能,帮助你针对性复习薄弱环节。
    </p>
    
    <!-- 分类选择 -->
    <div class="category-selector">
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="category-btn"
        :class="{ active: selectedCategory === cat.id }"
        @click="selectCategory(cat.id)"
      >
        <div class="category-name">{{ cat.name }}</div>
        <div class="category-count">{{ cat.questionCount }} 题</div>
      </button>
    </div>
    
    <!-- 答题组件 -->
    <QuizWidget
      v-if="currentQuestions.length > 0"
      :questions="currentQuestions"
      :category-id="selectedCategory"
      :category-name="categories.find(c => c.id === selectedCategory)?.name"
    />
  </div>
</template>

<style scoped>
.quiz-page {
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

.category-selector {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 32px;
}

.category-btn {
  padding: 16px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.category-btn:hover {
  border-color: #2196F3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.2);
}

.category-btn.active {
  border-color: #2196F3;
  background: #E3F2FD;
}

.category-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.category-count {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .quiz-page {
    padding: 24px 16px;
  }
  
  h1 {
    font-size: 24px;
  }
  
  .category-selector {
    grid-template-columns: 1fr;
  }
}
</style>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

/**
 * 选项接口
 */
interface Option {
  key: string
  text: string
}

/**
 * 题目接口
 */
interface Question {
  id: string
  type: 'single_choice' | 'multiple_choice'
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  options: Option[]
  correctAnswer: string | string[]
  explanation: string
  knowledgePoints: string[]
  references: string[]
}

/**
 * 答题结果接口
 */
interface QuizResult {
  questionId: string
  userAnswer: string | string[]
  isCorrect: boolean
  timestamp: number
}

/**
 * 组件属性接口
 */
interface Props {
  questions: Question[]
  categoryId?: string
  categoryName?: string
}

const props = defineProps<Props>()

// 状态管理
const currentQuestionIndex = ref(0)
const selectedAnswers = ref<string[]>([])
const showResult = ref(false)
const isCorrect = ref(false)
const quizHistory = ref<QuizResult[]>([])
const wrongQuestions = ref<Question[]>([])
const showWrongBook = ref(false)

/**
 * 获取当前题目(支持错题本模式)
 */
const currentQuestion = computed(() => {
  if (showWrongBook.value && wrongQuestions.value.length > 0) {
    return wrongQuestions.value[currentQuestionIndex.value] || wrongQuestions.value[0]
  }
  return props.questions?.[currentQuestionIndex.value] || props.questions?.[0] || {
    id: '',
    type: 'single_choice',
    difficulty: 'easy',
    question: '',
    options: [],
    correctAnswer: '',
    explanation: '',
    knowledgePoints: [],
    references: []
  }
})

/**
 * 总题数
 */
const totalQuestions = computed(() => {
  if (showWrongBook.value) {
    return wrongQuestions.value?.length || 0
  }
  return props.questions?.length || 0
})

/**
 * 进度百分比
 */
const progress = computed(() => {
  const total = totalQuestions.value
  if (total === 0) return 0
  return Math.round(((currentQuestionIndex.value + 1) / total) * 100)
})

/**
 * 获取难度标签颜色类名
 */
const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case 'easy': return 'success'
    case 'medium': return 'warning'
    case 'hard': return 'danger'
    default: return 'info'
  }
}

/**
 * 选择答案
 * 单选题直接替换,多选题切换选中状态
 */
const selectAnswer = (key: string): void => {
  if (showResult.value) return
  
  if (currentQuestion.value.type === 'single_choice') {
    selectedAnswers.value = [key]
  } else {
    const index = selectedAnswers.value.indexOf(key)
    if (index > -1) {
      selectedAnswers.value.splice(index, 1)
    } else {
      selectedAnswers.value.push(key)
    }
  }
}

/**
 * 检查答案是否正确
 */
const checkAnswer = (): void => {
  if (selectedAnswers.value.length === 0) return
  
  const correct = currentQuestion.value.correctAnswer
  let correct_flag = false
  
  if (Array.isArray(correct)) {
    // 多选题:需要完全匹配
    correct_flag = selectedAnswers.value.length === correct.length &&
      selectedAnswers.value.every(ans => correct.includes(ans))
  } else {
    // 单选题
    correct_flag = selectedAnswers.value[0] === correct
  }
  
  isCorrect.value = correct_flag
  showResult.value = true
  
  // 记录答题历史
  const result: QuizResult = {
    questionId: currentQuestion.value.id,
    userAnswer: [...selectedAnswers.value],
    isCorrect: correct_flag,
    timestamp: Date.now()
  }
  quizHistory.value.push(result)
  
  // 如果答错,加入错题本(避免重复)
  if (!correct_flag && !wrongQuestions.value.find(q => q.id === currentQuestion.value.id)) {
    wrongQuestions.value.push(currentQuestion.value)
  }
  
  // 保存到localStorage
  saveProgress()
}

/**
 * 下一题或显示最终结果
 */
const nextQuestion = (): void => {
  if (currentQuestionIndex.value < totalQuestions.value - 1) {
    currentQuestionIndex.value++
    selectedAnswers.value = []
    showResult.value = false
  } else {
    // 测验完成,显示正确率
    const accuracy = getAccuracy()
    alert(`测验完成! 正确率: ${accuracy}%`)
  }
}

/**
 * 上一题
 */
const prevQuestion = (): void => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
    selectedAnswers.value = []
    showResult.value = false
  }
}

/**
 * 重新开始测验
 */
const restart = (): void => {
  currentQuestionIndex.value = 0
  selectedAnswers.value = []
  showResult.value = false
  showWrongBook.value = false
}

/**
 * 获取正确率
 */
const getAccuracy = (): number => {
  if (quizHistory.value.length === 0) return 0
  const correct = quizHistory.value.filter(r => r.isCorrect).length
  return Math.round((correct / quizHistory.value.length) * 100)
}

/**
 * 保存进度到localStorage
 * 包含错误处理,避免JSON序列化失败
 */
const saveProgress = (): void => {
  try {
    const progress = {
      quizHistory: quizHistory.value,
      wrongQuestions: wrongQuestions.value.map(q => q.id),
      lastUpdate: Date.now()
    }
    localStorage.setItem('quiz-progress', JSON.stringify(progress))
  } catch (error) {
    console.error('Failed to save quiz progress:', error)
  }
}

/**
 * 从localStorage加载进度
 * 包含错误处理,避免JSON解析失败导致崩溃
 */
const loadProgress = (): void => {
  try {
    const saved = localStorage.getItem('quiz-progress')
    if (saved) {
      const progress = JSON.parse(saved)
      quizHistory.value = progress.quizHistory || []
      // 可以根据wrongQuestions IDs重新构建错题本
    }
  } catch (error) {
    console.error('Failed to load quiz progress:', error)
    // 解析失败时重置为初始状态
    quizHistory.value = []
  }
}

/**
 * 切换错题本模式
 */
const toggleWrongBook = (): void => {
  showWrongBook.value = !showWrongBook.value
  currentQuestionIndex.value = 0
  selectedAnswers.value = []
  showResult.value = false
}

/**
 * 组件挂载时加载保存的进度
 */
onMounted(() => {
  loadProgress()
})
</script>

<template>
  <div class="quiz-widget">
    <!-- 头部信息 -->
    <div class="quiz-header">
      <h3>{{ showWrongBook ? '错题本' : (categoryName || '交互式答题') }}</h3>
      <div class="quiz-stats">
        <span class="progress-text">{{ currentQuestionIndex + 1 }} / {{ totalQuestions }}</span>
        <span class="accuracy" v-if="quizHistory.length > 0">
          正确率: {{ getAccuracy() }}%
        </span>
      </div>
    </div>
    
    <!-- 进度条 -->
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progress + '%' }"></div>
    </div>
    
    <!-- 模式切换按钮 -->
    <div class="mode-switcher">
      <button 
        class="mode-btn" 
        :class="{ active: !showWrongBook }"
        @click="toggleWrongBook"
      >
        全部题目
      </button>
      <button 
        class="mode-btn" 
        :class="{ active: showWrongBook }"
        @click="toggleWrongBook"
        :disabled="wrongQuestions.length === 0"
      >
        错题本 ({{ wrongQuestions.length }})
      </button>
    </div>
    
    <!-- 空状态 -->
    <div v-if="totalQuestions === 0" class="empty-state">
      <p>暂无题目</p>
    </div>
    
    <!-- 题目内容 -->
    <div v-else class="question-container">
      <!-- 题目标题 -->
      <div class="question-title">
        <span class="question-number">Q{{ currentQuestionIndex + 1 }}.</span>
        <span class="question-text">{{ currentQuestion.question }}</span>
      </div>
      
      <!-- 难度和类型标签 -->
      <div class="question-meta">
        <span class="tag" :class="getDifficultyColor(currentQuestion.difficulty)">
          {{ currentQuestion.difficulty === 'easy' ? '简单' : 
             currentQuestion.difficulty === 'medium' ? '中等' : '困难' }}
        </span>
        <span class="tag type">
          {{ currentQuestion.type === 'single_choice' ? '单选题' : '多选题' }}
        </span>
      </div>
      
      <!-- 选项列表 -->
      <div class="options-list">
        <div
          v-for="option in currentQuestion.options"
          :key="option.key"
          class="option-item"
          :class="{
            selected: selectedAnswers.includes(option.key),
            correct: showResult && (
              Array.isArray(currentQuestion.correctAnswer) 
                ? currentQuestion.correctAnswer.includes(option.key)
                : currentQuestion.correctAnswer === option.key
            ),
            wrong: showResult && selectedAnswers.includes(option.key) && !isCorrect
          }"
          @click="selectAnswer(option.key)"
        >
          <span class="option-key">{{ option.key }}.</span>
          <span class="option-text">{{ option.text }}</span>
          <span v-if="showResult" class="option-icon">
            {{ 
              Array.isArray(currentQuestion.correctAnswer) 
                ? currentQuestion.correctAnswer.includes(option.key) ? '✓' : 
                  selectedAnswers.includes(option.key) ? '✗' : ''
                : currentQuestion.correctAnswer === option.key ? '✓' : 
                  selectedAnswers.includes(option.key) ? '✗' : ''
            }}
          </span>
        </div>
      </div>
      
      <!-- 结果反馈 -->
      <div v-if="showResult" class="result-feedback">
        <div class="result-status" :class="{ correct: isCorrect, wrong: !isCorrect }">
          {{ isCorrect ? '✓ 回答正确!' : '✗ 回答错误' }}
        </div>
        
        <div class="explanation">
          <h4>解析:</h4>
          <p>{{ currentQuestion.explanation }}</p>
        </div>
        
        <div v-if="currentQuestion.knowledgePoints.length > 0" class="knowledge-points">
          <h4>知识点:</h4>
          <div class="tags">
            <span v-for="kp in currentQuestion.knowledgePoints" :key="kp" class="kp-tag">
              {{ kp }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="action-buttons">
        <button 
          class="btn btn-secondary" 
          @click="prevQuestion"
          :disabled="currentQuestionIndex === 0"
        >
          上一题
        </button>
        
        <button 
          v-if="!showResult"
          class="btn btn-primary" 
          @click="checkAnswer"
          :disabled="selectedAnswers.length === 0"
        >
          提交答案
        </button>
        
        <button 
          v-else
          class="btn btn-primary" 
          @click="nextQuestion"
        >
          {{ currentQuestionIndex === totalQuestions - 1 ? '查看结果' : '下一题' }}
        </button>
        
        <button 
          class="btn btn-secondary" 
          @click="restart"
        >
          重新开始
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quiz-widget {
  max-width: 800px;
  margin: 20px auto;
  padding: 24px;
  background: var(--vp-c-bg);
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.quiz-header h3 {
  margin: 0;
  font-size: 20px;
  color: var(--vp-c-text-1);
}

.quiz-stats {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.accuracy {
  color: #4CAF50;
  font-weight: 600;
}

.progress-bar {
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 16px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #2196F3, #21CBF3);
  transition: width 0.3s ease;
}

.mode-switcher {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.mode-btn {
  flex: 1;
  padding: 8px 16px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.mode-btn:hover:not(:disabled) {
  background: var(--vp-c-bg-soft);
}

.mode-btn.active {
  background: #2196F3;
  color: white;
  border-color: #2196F3;
}

.mode-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: var(--vp-c-text-2);
}

.question-container {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.question-title {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 16px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.question-number {
  font-weight: 600;
  color: #2196F3;
}

.question-meta {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.tag {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.tag.success {
  background: #E8F5E9;
  color: #2E7D32;
}

.tag.warning {
  background: #FFF3E0;
  color: #EF6C00;
}

.tag.danger {
  background: #FFEBEE;
  color: #C62828;
}

.tag.type {
  background: #E3F2FD;
  color: #1565C0;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.option-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.option-item:hover:not(.correct):not(.wrong) {
  border-color: #2196F3;
  background: #E3F2FD;
}

.option-item.selected {
  border-color: #2196F3;
  background: #E3F2FD;
}

.option-item.correct {
  border-color: #4CAF50;
  background: #E8F5E9;
}

.option-item.wrong {
  border-color: #F44336;
  background: #FFEBEE;
}

.option-key {
  font-weight: 600;
  color: #2196F3;
  min-width: 20px;
}

.option-text {
  flex: 1;
  color: var(--vp-c-text-1);
}

.option-icon {
  font-weight: bold;
  font-size: 18px;
}

.correct .option-icon {
  color: #4CAF50;
}

.wrong .option-icon {
  color: #F44336;
}

.result-feedback {
  margin-top: 20px;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 8px;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.result-status {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
}

.result-status.correct {
  color: #4CAF50;
}

.result-status.wrong {
  color: #F44336;
}

.explanation h4,
.knowledge-points h4 {
  margin: 12px 0 8px 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.explanation p {
  margin: 0;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.kp-tag {
  padding: 4px 10px;
  background: #E3F2FD;
  color: #1565C0;
  border-radius: 12px;
  font-size: 12px;
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  justify-content: center;
}

.btn {
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: #2196F3;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #1976D2;
}

.btn-secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--vp-c-bg-mute);
}

@media (max-width: 768px) {
  .quiz-widget {
    padding: 16px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style>

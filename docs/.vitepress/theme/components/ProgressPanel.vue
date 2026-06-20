<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

/**
 * 用户进度数据接口
 */
interface UserProgress {
  userId: string
  completedNodes: string[]
  quizResults: Array<{
    questionId: string
    userAnswer: string | string[]
    isCorrect: boolean
    timestamp: number
  }>
  projectSubmissions: Array<{
    projectId: string
    githubUrl: string
    submittedAt: number
  }>
  checkinRecords: number[]
  lastVisit: number
}

/**
 * 组件属性接口
 */
interface Props {
  totalNodes?: number
  totalQuestions?: number
  totalProjects?: number
}

const props = withDefaults(defineProps<Props>(), {
  totalNodes: 20,
  totalQuestions: 50,
  totalProjects: 5
})

const progressData = ref<UserProgress | null>(null)
const chartRef = ref<HTMLElement | null>(null)
let chartInstance: echarts.ECharts | null = null

/**
 * 计算学习进度百分比
 */
const learningProgress = computed(() => {
  if (!progressData.value) return 0
  const completed = progressData.value.completedNodes.length
  return Math.min(100, Math.round((completed / props.totalNodes) * 100))
})

/**
 * 计算答题正确率
 */
const quizAccuracy = computed(() => {
  if (!progressData.value || progressData.value.quizResults.length === 0) return 0
  const correct = progressData.value.quizResults.filter(r => r.isCorrect).length
  return Math.round((correct / progressData.value.quizResults.length) * 100)
})

/**
 * 计算连续打卡天数
 * 从今天开始往前推算连续的天数
 */
const consecutiveDays = computed(() => {
  if (!progressData.value || progressData.value.checkinRecords.length === 0) return 0
  
  // 按时间降序排序
  const records = [...progressData.value.checkinRecords].sort((a, b) => b - a)
  let days = 0
  const oneDay = 24 * 60 * 60 * 1000
  
  // 获取今天的零点时间戳
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayTimestamp = today.getTime()
  
  // 检查第一条条记录是否是今天或昨天
  const firstRecord = new Date(records[0])
  firstRecord.setHours(0, 0, 0, 0)
  const firstRecordTimestamp = firstRecord.getTime()
  
  // 如果第一条记录不是今天或昨天,则连续天数为0
  if (todayTimestamp - firstRecordTimestamp > oneDay) {
    return 0
  }
  
  // 从第一条记录开始计算连续天数
  days = 1
  let currentDate = firstRecordTimestamp
  
  for (let i = 1; i < records.length; i++) {
    const recordDate = new Date(records[i])
    recordDate.setHours(0, 0, 0, 0)
    const recordTimestamp = recordDate.getTime()
    
    const diff = currentDate - recordTimestamp
    if (diff === oneDay) {
      // 连续的一天
      days++
      currentDate = recordTimestamp
    } else if (diff === 0) {
      // 同一天,跳过
      continue
    } else {
      // 不连续,中断
      break
    }
  }
  
  return days
})

/**
 * 已完成项目数
 */
const completedProjects = computed(() => {
  return progressData.value?.projectSubmissions.length || 0
})

/**
 * 技能雷达图数据
 * 根据完成的学习节点计算各维度技能水平
 */
const skillRadarData = computed(() => {
  if (!progressData.value) {
    return [0, 0, 0, 0, 0, 0]
  }
  
  const skills = {
    llmTheory: calculateSkillLevel(['node-1-1', 'node-1-2', 'node-1-3']),
    promptEng: calculateSkillLevel(['node-2-1', 'node-2-2', 'node-2-3']),
    springAI: calculateSkillLevel(['node-3-1', 'node-3-2', 'node-3-3']),
    rag: calculateSkillLevel(['node-4-1', 'node-4-2', 'node-4-3', 'node-4-4']),
    agent: calculateSkillLevel(['node-5-1', 'node-5-2', 'node-5-3']),
    deployment: calculateSkillLevel(['node-6-1', 'node-6-2', 'node-6-3'])
  }
  
  return [
    skills.llmTheory,
    skills.promptEng,
    skills.springAI,
    skills.rag,
    skills.agent,
    skills.deployment
  ]
})

/**
 * 计算单个技能等级(0-100)
 */
const calculateSkillLevel = (nodeIds: string[]): number => {
  if (!progressData.value) return 0
  const completed = nodeIds.filter(id => progressData.value!.completedNodes.includes(id)).length
  return Math.round((completed / nodeIds.length) * 100)
}

/**
 * 最近学习活动列表
 */
const recentActivities = computed(() => {
  if (!progressData.value) return []
  
  const activities: Array<{ type: string; description: string; time: number }> = []
  
  // 添加最近的答题记录
  if (progressData.value.quizResults.length > 0) {
    const lastQuiz = progressData.value.quizResults[progressData.value.quizResults.length - 1]
    activities.push({
      type: 'quiz',
      description: lastQuiz.isCorrect ? '答对一道题' : '答错一道题',
      time: lastQuiz.timestamp
    })
  }
  
  // 添加最近的项目提交
  if (progressData.value.projectSubmissions.length > 0) {
    const lastProject = progressData.value.projectSubmissions[progressData.value.projectSubmissions.length - 1]
    activities.push({
      type: 'project',
      description: '完成一个练手项目',
      time: lastProject.submittedAt
    })
  }
  
  // 按时间排序并取最近5条
  return activities
    .sort((a, b) => b.time - a.time)
    .slice(0, 5)
})

/**
 * 格式化时间为相对时间
 */
const formatTime = (timestamp: number): string => {
  const now = Date.now()
  const diff = now - timestamp
  
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  return `${days}天前`
}

/**
 * 初始化ECharts雷达图
 * 在onMounted生命周期中执行
 */
const initRadarChart = (): void => {
  if (!chartRef.value) return
  
  // 销毁旧实例(如果存在)
  if (chartInstance) {
    chartInstance.dispose()
  }
  
  // 创建新实例
  chartInstance = echarts.init(chartRef.value)
  
  const option = {
    title: {
      text: '技能掌握度',
      left: 'center',
      textStyle: {
        fontSize: 16,
        color: 'var(--vp-c-text-1)'
      }
    },
    tooltip: {},
    radar: {
      indicator: [
        { name: 'LLM理论', max: 100 },
        { name: 'Prompt工程', max: 100 },
        { name: 'Spring AI', max: 100 },
        { name: 'RAG', max: 100 },
        { name: 'Agent', max: 100 },
        { name: '部署运维', max: 100 }
      ],
      radius: '65%',
      center: ['50%', '55%']
    },
    series: [{
      name: '技能掌握度',
      type: 'radar',
      data: [{
        value: skillRadarData.value,
        name: '当前水平',
        areaStyle: {
          color: 'rgba(33, 150, 243, 0.3)'
        },
        lineStyle: {
          color: '#2196F3',
          width: 2
        },
        itemStyle: {
          color: '#2196F3'
        }
      }]
    }]
  }
  
  chartInstance.setOption(option)
}

/**
 * 更新图表数据
 */
const updateChart = (): void => {
  if (chartInstance) {
    chartInstance.setOption({
      series: [{
        data: [{
          value: skillRadarData.value,
          name: '当前水平'
        }]
      }]
    })
  }
}

/**
 * 加载用户进度
 * 包含错误处理,避免JSON解析失败
 */
const loadProgress = (): void => {
  try {
    const saved = localStorage.getItem('user-progress')
    if (saved) {
      progressData.value = JSON.parse(saved)
    } else {
      // 创建默认进度数据
      progressData.value = {
        userId: Date.now().toString(),
        completedNodes: [],
        quizResults: [],
        projectSubmissions: [],
        checkinRecords: [],
        lastVisit: Date.now()
      }
      saveProgress()
    }
  } catch (error) {
    console.error('Failed to load user progress:', error)
    // 解析失败时重置为初始状态
    progressData.value = {
      userId: Date.now().toString(),
      completedNodes: [],
      quizResults: [],
      projectSubmissions: [],
      checkinRecords: [],
      lastVisit: Date.now()
    }
  }
}

/**
 * 保存用户进度到localStorage
 * 包含错误处理
 */
const saveProgress = (): void => {
  try {
    if (progressData.value) {
      localStorage.setItem('user-progress', JSON.stringify(progressData.value))
    }
  } catch (error) {
    console.error('Failed to save user progress:', error)
  }
}

/**
 * 今日打卡功能
 * 检查今天是否已打卡,避免重复打卡
 */
const checkinToday = (): void => {
  if (!progressData.value) return
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayTimestamp = today.getTime()
  
  // 检查今天是否已打卡
  const alreadyCheckedIn = progressData.value.checkinRecords.some(
    timestamp => {
      const date = new Date(timestamp)
      date.setHours(0, 0, 0, 0)
      return date.getTime() === todayTimestamp
    }
  )
  
  if (!alreadyCheckedIn) {
    progressData.value.checkinRecords.push(Date.now())
    saveProgress()
    // 重新计算连续天数
    alert(`打卡成功! 连续打卡 ${consecutiveDays.value} 天`)
  } else {
    alert('今天已经打过卡了!')
  }
}

/**
 * 组件挂载时初始化
 */
onMounted(() => {
  loadProgress()
  initRadarChart()
  
  // 监听窗口大小变化,自适应调整图表
  window.addEventListener('resize', () => {
    chartInstance?.resize()
  })
})

/**
 * 监听数据变化更新图表
 */
watch(skillRadarData, () => {
  updateChart()
}, { deep: true })
</script>

<template>
  <div class="progress-panel">
    <!-- 头部 -->
    <div class="panel-header">
      <h3>学习进度追踪</h3>
      <button class="checkin-btn" @click="checkinToday">
        📅 今日打卡
      </button>
    </div>
    
    <!-- 统计卡片 -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">{{ learningProgress }}%</div>
        <div class="stat-label">学习进度</div>
        <div class="stat-detail">{{ progressData?.completedNodes.length || 0 }} / {{ totalNodes }} 节点</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-value">{{ quizAccuracy }}%</div>
        <div class="stat-label">答题正确率</div>
        <div class="stat-detail">{{ progressData?.quizResults.length || 0 }} 道题</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-value">{{ consecutiveDays }}</div>
        <div class="stat-label">连续打卡天数</div>
        <div class="stat-detail">坚持就是胜利!</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-value">{{ completedProjects }}</div>
        <div class="stat-label">完成项目</div>
        <div class="stat-detail">{{ completedProjects }} / {{ totalProjects }} 项目</div>
      </div>
    </div>
    
    <!-- 技能雷达图 -->
    <div class="chart-container">
      <div ref="chartRef" class="radar-chart"></div>
    </div>
    
    <!-- 最近活动 -->
    <div class="recent-activities" v-if="recentActivities.length > 0">
      <h4>最近学习活动</h4>
      <div class="activity-list">
        <div v-for="(activity, index) in recentActivities" :key="index" class="activity-item">
          <span class="activity-icon">
            {{ activity.type === 'quiz' ? '📝' : '💻' }}
          </span>
          <span class="activity-desc">{{ activity.description }}</span>
          <span class="activity-time">{{ formatTime(activity.time) }}</span>
        </div>
      </div>
    </div>
    
    <div v-else class="empty-state">
      <p>开始你的学习之旅吧! 🚀</p>
    </div>
  </div>
</template>

<style scoped>
.progress-panel {
  max-width: 900px;
  margin: 20px auto;
  padding: 24px;
  background: var(--vp-c-bg);
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.panel-header h3 {
  margin: 0;
  font-size: 20px;
  color: var(--vp-c-text-1);
}

.checkin-btn {
  padding: 8px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: transform 0.2s;
}

.checkin-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 8px;
  text-align: center;
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
  color: #2196F3;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}

.stat-detail {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.chart-container {
  margin: 24px 0;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.radar-chart {
  width: 100%;
  height: 400px;
}

.recent-activities {
  margin-top: 24px;
}

.recent-activities h4 {
  margin: 0 0 16px 0;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  transition: background 0.2s;
}

.activity-item:hover {
  background: var(--vp-c-bg-mute);
}

.activity-icon {
  font-size: 20px;
}

.activity-desc {
  flex: 1;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.activity-time {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: var(--vp-c-text-2);
  font-size: 16px;
}

@media (max-width: 768px) {
  .progress-panel {
    padding: 16px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .radar-chart {
    height: 300px;
  }
  
  .panel-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
}
</style>

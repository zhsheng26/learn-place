# LearnPlace 快速验证脚本

在浏览器控制台中执行以下脚本,快速验证核心组件功能。

## 🚀 一键清除测试数据

```javascript
// 清除所有localStorage数据,从头开始测试
localStorage.clear()
console.log('✅ 已清除所有测试数据')
location.reload()
```

---

## ✅ RoadmapGraph 组件验证

### 1. 检查路线图渲染
```javascript
// 访问 /guide/roadmap 页面后执行
const roadmapContainer = document.querySelector('.roadmap-container')
if (roadmapContainer) {
  console.log('✅ RoadmapGraph组件已加载')
  
  // 检查Mermaid SVG是否渲染
  const svg = roadmapContainer.querySelector('svg')
  if (svg) {
    console.log('✅ Mermaid图表渲染成功')
    console.log('📊 图表尺寸:', svg.getAttribute('width'), 'x', svg.getAttribute('height'))
  } else {
    console.error('❌ Mermaid图表未渲染')
  }
} else {
  console.error('❌ RoadmapGraph组件未找到')
}
```

### 2. 模拟已完成节点
```javascript
// 设置一些节点为已完成状态
localStorage.setItem('user-progress', JSON.stringify({
  userId: 'test-user',
  completedNodes: ['node-1-1', 'node-1-2', 'node-2-1'],
  quizResults: [],
  projectSubmissions: [],
  checkinRecords: [],
  lastVisit: Date.now()
}))
console.log('✅ 已设置3个完成节点')
console.log('🔄 请刷新页面查看高亮效果')
location.reload()
```

### 3. 检查节点点击跳转
```javascript
// 查找所有可点击的节点
const nodes = document.querySelectorAll('.mermaid-diagram .node')
console.log(`📍 找到 ${nodes.length} 个节点`)

nodes.forEach((node, index) => {
  const hasClickHandler = node.style.cursor === 'pointer'
  console.log(`节点 ${index + 1}:`, hasClickHandler ? '✅ 可点击' : '❌ 不可点击')
})
```

---

## ✅ QuizWidget 组件验证

### 1. 检查题目加载
```javascript
// 访问 /tools/quiz 页面后执行
const quizWidget = document.querySelector('.quiz-widget')
if (quizWidget) {
  console.log('✅ QuizWidget组件已加载')
  
  // 检查题目内容
  const questionText = document.querySelector('.question-text')
  if (questionText) {
    console.log('📝 当前题目:', questionText.textContent)
  }
  
  // 检查选项数量
  const options = document.querySelectorAll('.option-item')
  console.log(`📋 选项数量: ${options.length}`)
} else {
  console.error('❌ QuizWidget组件未找到')
}
```

### 2. 模拟答题并检查结果
```javascript
// 自动选择第一个选项并提交
const firstOption = document.querySelector('.option-item')
if (firstOption) {
  firstOption.click()
  console.log('✅ 已选择第一个选项')
  
  // 点击提交按钮
  setTimeout(() => {
    const submitBtn = document.querySelector('.btn-primary')
    if (submitBtn && !submitBtn.disabled) {
      submitBtn.click()
      console.log('✅ 已提交答案')
      
      // 检查结果反馈
      setTimeout(() => {
        const resultStatus = document.querySelector('.result-status')
        if (resultStatus) {
          console.log('📊 答题结果:', resultStatus.textContent)
        }
        
        const explanation = document.querySelector('.explanation p')
        if (explanation) {
          console.log('💡 解析:', explanation.textContent.substring(0, 50) + '...')
        }
      }, 500)
    }
  }, 300)
}
```

### 3. 检查localStorage持久化
```javascript
// 答题后检查数据是否保存
const quizProgress = localStorage.getItem('quiz-progress')
if (quizProgress) {
  const progress = JSON.parse(quizProgress)
  console.log('✅ 答题进度已保存')
  console.log('📊 答题历史:', progress.quizHistory.length, '条')
  console.log('📈 正确率:', 
    progress.quizHistory.filter(r => r.isCorrect).length / progress.quizHistory.length * 100, 
    '%'
  )
} else {
  console.error('❌ 答题进度未保存')
}
```

### 4. 测试错题本功能
```javascript
// 故意答错几道题后执行
const quizProgress = JSON.parse(localStorage.getItem('quiz-progress'))
if (quizProgress && quizProgress.wrongQuestions) {
  console.log('📕 错题本中的题目数:', quizProgress.wrongQuestions.length)
  
  // 切换到错题本模式
  const wrongBookBtn = document.querySelectorAll('.mode-btn')[1]
  if (wrongBookBtn && !wrongBookBtn.disabled) {
    wrongBookBtn.click()
    console.log('✅ 已切换到错题本模式')
  }
} else {
  console.log('⚠️ 暂无错题,请先故意答错几道题')
}
```

---

## ✅ ProgressPanel 组件验证

### 1. 检查统计卡片
```javascript
// 访问 /tools/progress 页面后执行
const progressPanel = document.querySelector('.progress-panel')
if (progressPanel) {
  console.log('✅ ProgressPanel组件已加载')
  
  // 检查统计卡片
  const statCards = document.querySelectorAll('.stat-card')
  console.log(`📊 统计卡片数量: ${statCards.length}`)
  
  statCards.forEach((card, index) => {
    const value = card.querySelector('.stat-value')?.textContent
    const label = card.querySelector('.stat-label')?.textContent
    console.log(`卡片 ${index + 1}: ${label} = ${value}`)
  })
} else {
  console.error('❌ ProgressPanel组件未找到')
}
```

### 2. 检查ECharts雷达图
```javascript
// 检查雷达图是否渲染
const radarChart = document.querySelector('.radar-chart')
if (radarChart) {
  const canvas = radarChart.querySelector('canvas')
  if (canvas) {
    console.log('✅ ECharts雷达图渲染成功')
    console.log('📏 图表尺寸:', canvas.width, 'x', canvas.height)
  } else {
    console.error('❌ ECharts画布未找到')
  }
} else {
  console.error('❌ 雷达图容器未找到')
}
```

### 3. 测试打卡功能
```javascript
// 点击打卡按钮
const checkinBtn = document.querySelector('.checkin-btn')
if (checkinBtn) {
  // 监听alert弹窗
  const originalAlert = window.alert
  let alertMessage = ''
  window.alert = (msg) => { alertMessage = msg }
  
  checkinBtn.click()
  console.log('✅ 已点击打卡按钮')
  console.log('💬 提示信息:', alertMessage)
  
  // 恢复alert
  window.alert = originalAlert
  
  // 检查localStorage
  const userProgress = JSON.parse(localStorage.getItem('user-progress'))
  console.log('📅 打卡记录数:', userProgress.checkinRecords.length)
} else {
  console.error('❌ 打卡按钮未找到')
}
```

### 4. 模拟连续打卡
```javascript
// 模拟连续7天打卡
const now = Date.now()
const oneDay = 24 * 60 * 60 * 1000
const checkinRecords = []

for (let i = 6; i >= 0; i--) {
  checkinRecords.push(now - i * oneDay)
}

localStorage.setItem('user-progress', JSON.stringify({
  userId: 'test-user',
  completedNodes: [],
  quizResults: [],
  projectSubmissions: [],
  checkinRecords: checkinRecords,
  lastVisit: now
}))

console.log('✅ 已模拟连续7天打卡')
console.log('🔄 请刷新页面查看连续打卡天数')
location.reload()
```

### 5. 检查最近活动
```javascript
// 先在QuizWidget中答几道题,然后执行
const userProgress = JSON.parse(localStorage.getItem('user-progress'))
if (userProgress && userProgress.quizResults.length > 0) {
  console.log('📝 答题记录数:', userProgress.quizResults.length)
  
  const recentActivities = document.querySelectorAll('.activity-item')
  console.log(`📋 最近活动数: ${recentActivities.length}`)
  
  recentActivities.forEach((activity, index) => {
    const desc = activity.querySelector('.activity-desc')?.textContent
    const time = activity.querySelector('.activity-time')?.textContent
    console.log(`活动 ${index + 1}: ${desc} (${time})`)
  })
} else {
  console.log('⚠️ 暂无活动记录,请先答题或完成项目')
}
```

---

## ✅ Calculator 组件验证

### 1. 检查Token计算
```javascript
// 访问 /tools/calculator 页面后执行
const calculatorPage = document.querySelector('.calculator-page')
if (calculatorPage) {
  console.log('✅ Calculator页面已加载')
  
  // 输入测试文本
  const textarea = document.querySelector('#text-input')
  if (textarea) {
    textarea.value = 'Hello, this is a test message for token calculation.'
    textarea.dispatchEvent(new Event('input'))
    
    setTimeout(() => {
      const tokenCount = document.querySelector('.result-value')
      if (tokenCount) {
        console.log('🔢 Token估算:', tokenCount.textContent)
      }
    }, 300)
  }
} else {
  console.error('❌ Calculator页面未找到')
}
```

### 2. 测试模板功能
```javascript
// 点击第一个模板按钮
const templateBtns = document.querySelectorAll('.template-btn')
if (templateBtns.length > 0) {
  templateBtns[0].click()
  console.log('✅ 已使用第一个模板')
  
  const textarea = document.querySelector('#text-input')
  if (textarea) {
    console.log('📝 模板内容长度:', textarea.value.length, '字符')
  }
}
```

---

## 🔍 综合验证脚本

### 一键验证所有组件
```javascript
console.log('🚀 开始综合验证...\n')

// 1. 检查localStorage
console.log('📦 LocalStorage检查:')
const keys = Object.keys(localStorage)
keys.forEach(key => {
  console.log(`  - ${key}: ${localStorage.getItem(key).length} 字节`)
})
console.log('')

// 2. 检查当前页面组件
console.log('🧩 当前页面组件检查:')
const components = {
  'RoadmapGraph': '.roadmap-container',
  'QuizWidget': '.quiz-widget',
  'ProgressPanel': '.progress-panel',
  'Calculator': '.calculator-page'
}

Object.entries(components).forEach(([name, selector]) => {
  const element = document.querySelector(selector)
  console.log(`  ${name}: ${element ? '✅ 已加载' : '❌ 未找到'}`)
})
console.log('')

// 3. 性能检查
console.log('⚡ 性能检查:')
const performanceData = performance.getEntriesByType('navigation')[0]
if (performanceData) {
  console.log(`  - 页面加载时间: ${performanceData.loadEventEnd - performanceData.fetchStart}ms`)
  console.log(`  - DOM解析时间: ${performanceData.domComplete}ms`)
}
console.log('')

console.log('✅ 综合验证完成!')
```

---

## 🐛 常见问题诊断

### 问题1: 组件未加载
```javascript
// 检查Vue是否正确初始化
console.log('Vue实例:', window.__VUE__)
console.log('当前路由:', window.location.pathname)

// 检查是否有JavaScript错误
console.log('控制台错误数:', window.errors?.length || 0)
```

### 问题2: localStorage数据异常
```javascript
// 检查localStorage内容
Object.keys(localStorage).forEach(key => {
  try {
    const value = JSON.parse(localStorage.getItem(key))
    console.log(`${key}:`, value)
  } catch (e) {
    console.log(`${key}:`, localStorage.getItem(key))
  }
})
```

### 问题3: 图表不显示
```javascript
// 检查Mermaid
console.log('Mermaid版本:', mermaid.version)

// 检查ECharts
console.log('ECharts版本:', echarts.version)

// 检查DOM元素
console.log('Mermaid容器:', document.querySelector('.mermaid-diagram'))
console.log('ECharts容器:', document.querySelector('.radar-chart'))
```

---

## 📊 验证清单

执行完以上脚本后,确认以下项目:

- [ ] RoadmapGraph组件正确渲染
- [ ] QuizWidget可以正常答题
- [ ] ProgressPanel统计数据准确
- [ ] Calculator Token计算正常
- [ ] localStorage数据持久化
- [ ] 响应式布局正常
- [ ] 无JavaScript错误

**全部通过即可交付!** ✅

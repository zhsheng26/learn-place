---
title: 进度追踪
description: 可视化展示学习进度、打卡统计和技能雷达图
---

<script setup>
import ProgressPanel from '../.vitepress/theme/components/ProgressPanel.vue'
</script>

# 进度追踪

实时追踪你的学习进度,可视化成长轨迹。

## 📊 学习面板

<ProgressPanel />

## 💾 数据存储说明

### localStorage数据结构

```typescript
interface UserProgress {
  userId: string              // 用户ID(时间戳生成)
  completedNodes: string[]    // 已完成的学习节点ID
  quizResults: Array<{        // 答题记录
    questionId: string
    userAnswer: string | string[]
    isCorrect: boolean
    timestamp: number
  }>
  projectSubmissions: Array<{ // 项目提交记录
    projectId: string
    githubUrl: string
    submittedAt: number
  }>
  checkinRecords: number[]    // 打卡日期时间戳数组
  lastVisit: number           // 最后访问时间
}
```

### 查看我的数据

打开浏览器控制台(F12),输入:

```javascript
// 查看完整进度数据
JSON.parse(localStorage.getItem('userProgress'))

// 查看错题本
JSON.parse(localStorage.getItem('wrongQuestions'))

// 查看答题历史
JSON.parse(localStorage.getItem('quizResults'))
```

### 清除数据

```javascript
// 清除所有进度数据
localStorage.removeItem('userProgress')

// 仅清除错题本
localStorage.removeItem('wrongQuestions')

// 仅清除答题历史
localStorage.removeItem('quizResults')
```

---

## 🎯 功能说明

### 1. 总体进度

显示你完成的学习节点占总节点数的百分比。

**计算方式**: `completedNodes.length / totalNodes * 100%`

### 2. 连续打卡

统计你连续打卡的天数,激励持续学习。

**规则**:
- 每天只能打卡一次
- 间隔超过24小时则连续天数重置
- 使用补卡券可以保持连续性(待实现)

### 3. 答题正确率

基于你的历史答题记录计算总体正确率。

**公式**: `正确题目数 / 总答题数 * 100%`

### 4. 技能雷达图

展示你在6个核心技能维度的掌握程度:
- Java基础
- Python
- LLM API
- Prompt工程
- RAG
- Agent开发

**注意**: 当前版本使用示例数据,后续会根据实际学习情况动态计算。

### 5. 最近活动

显示你最近的学习行为:
- 答题记录
- 项目提交
- 节点完成

---

## 🔄 数据同步(未来规划)

当前版本数据存储在本地浏览器中,未来计划支持:

- [ ] GitHub账号登录
- [ ] 云端同步学习进度
- [ ] 多设备数据同步
- [ ] 数据导出功能

---

<div class="tip custom-block" style="padding: 16px; background: #dbeafe; border-left: 4px solid #3b82f6; margin-top: 24px;">

💡 **提示**: 建议定期手动备份重要数据,避免浏览器清理导致丢失。

</div>

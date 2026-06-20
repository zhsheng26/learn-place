---
title: 交互式答题
description: 在线练习AI相关知识点,即时反馈答案解析
---

<script setup>
import { ref, onMounted } from 'vue'
import QuizWidget from '../.vitepress/theme/components/QuizWidget.vue'
import questionsData from '../data/questions.json'

const data = ref(questionsData)
</script>

# 交互式答题

通过在线答题检验学习成果,即时查看解析,自动记录错题。

## 📝 开始答题

<QuizWidget :data="data" />

## 💡 使用说明

### 答题流程

1. **选择分类**: 点击顶部分类按钮选择题目类型
2. **阅读题目**: 仔细阅读题干和选项
3. **选择答案**: 
   - 单选题: 点击一个选项
   - 多选题: 点击多个选项
4. **提交答案**: 点击"提交答案"按钮
5. **查看解析**: 系统显示正确答案和详细解析
6. **继续下一题**: 点击"下一题"继续练习

### 功能特性

✅ **即时反馈**: 提交后立即显示对错  
✅ **详细解析**: 每题都有知识点讲解和参考链接  
✅ **进度追踪**: 实时显示答题进度和正确率  
✅ **错题本**: 自动记录答错的题目,方便复习  
✅ **分类练习**: 按知识点分类,针对性强化  

### 答题技巧

- 🎯 **先思考再选择**: 不要急于点击,先独立思考
- 📖 **重视解析**: 即使答对也要看解析,可能有新的收获
- 🔄 **定期复习**:  revisit错题本,巩固薄弱环节
- 📊 **关注正确率**: 如果某分类正确率低,需要重新学习相关知识

---

## 📊 我的答题统计

访问 [进度追踪](/tools/progress) 查看:
- 总答题数量
- 总体正确率
- 各分类掌握程度
- 最近答题记录

---

## 🔖 错题本

答错的题目会自动保存到浏览器的localStorage中。

**查看错题**: 
- 方法1: 在答题组件中答错后自动加入
- 方法2: 打开浏览器控制台,输入 `JSON.parse(localStorage.getItem('wrongQuestions'))`

**清除错题**: 
```javascript
localStorage.removeItem('wrongQuestions')
```

---

<div class="tip custom-block" style="padding: 16px; background: #dbeafe; border-left: 4px solid #3b82f6; margin-top: 24px;">

💡 **提示**: 答题数据存储在本地浏览器中,清除浏览器缓存会导致数据丢失。建议定期备份重要进度。

</div>

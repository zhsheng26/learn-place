<script setup lang="ts">
import ProgressPanel from '../.vitepress/theme/components/ProgressPanel.vue'
</script>

<template>
  <div class="progress-page">
    <h1>学习进度追踪</h1>
    <p class="description">
      追踪你的学习进度,保持学习动力。每日打卡,持续进步!
    </p>
    
    <ProgressPanel
      :total-nodes="20"
      :total-questions="50"
      :total-projects="5"
    />
    
    <!-- 学习建议 -->
    <div class="tips-section">
      <h3>💡 学习建议</h3>
      <ul>
        <li>每天至少完成一个学习节点,保持学习连续性</li>
        <li>定期做练习题,检验学习效果</li>
        <li>完成练手项目,将理论知识转化为实践能力</li>
        <li>坚持每日打卡,培养学习习惯</li>
        <li>加入学习社区,与其他学习者交流心得</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.progress-page {
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

.tips-section {
  margin-top: 32px;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border-left: 4px solid #2196F3;
}

.tips-section h3 {
  margin: 0 0 16px 0;
  font-size: 18px;
  color: var(--vp-c-text-1);
}

.tips-section ul {
  margin: 0;
  padding-left: 20px;
  line-height: 2;
  color: var(--vp-c-text-2);
}

.tips-section li {
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .progress-page {
    padding: 24px 16px;
  }
  
  h1 {
    font-size: 24px;
  }
}
</style>

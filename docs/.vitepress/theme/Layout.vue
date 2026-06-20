<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { onMounted } from 'vue'

const { Layout } = DefaultTheme

// 初始化Mermaid
onMounted(async () => {
  // Mermaid已在RoadmapGraph组件中初始化
})
</script>

<template>
  <Layout />
</template>

<style>
/* 自定义全局样式 */
:root {
  --vp-c-brand-1: #2196F3;
  --vp-c-brand-2: #1976D2;
  --vp-c-brand-3: #1565C0;
  --vp-c-brand-soft: rgba(33, 150, 243, 0.1);
}

/* Mermaid图表样式 */
.mermaid {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  padding: 20px;
  background-color: var(--vp-code-block-bg);
  border-radius: 8px;
  overflow-x: auto;
}

/* 代码块优化 */
.vp-doc pre {
  border: 1px solid var(--vp-c-divider);
}

/* 表格样式优化 */
.vp-doc table {
  display: table;
  width: 100%;
}

/* 自定义提示框样式 */
.custom-block.tip {
  border-color: var(--vp-c-brand-1);
}

/* 动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

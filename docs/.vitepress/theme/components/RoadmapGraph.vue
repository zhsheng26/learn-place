<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import mermaid from 'mermaid'

/**
 * 路线图节点接口
 */
interface RoadmapNode {
  id: string
  title: string
  type: string
  url: string
  estimatedMinutes: number
  tags: string[]
}

/**
 * 路线图阶段接口
 */
interface RoadmapPhase {
  id: string
  title: string
  duration: string
  difficulty: string
  nodes: RoadmapNode[]
}

/**
 * 组件属性接口
 */
interface Props {
  phases: RoadmapPhase[]
  completedNodes?: string[]
}

const props = defineProps<Props>()
const mermaidRef = ref<HTMLElement | null>(null)
const isLoading = ref(true)
const renderError = ref<string | null>(null)

/**
 * 生成Mermaid图表定义
 * 根据已完成节点添加不同样式类
 */
const generateMermaidDiagram = (): string => {
  let diagram = 'graph TD\n'
  
  // 定义样式类
  diagram += '    classDef completed fill:#52c41a,stroke:#52c41a,color:#fff,stroke-width:2px\n'
  diagram += '    classDef inProgress fill:#faad14,stroke:#faad14,color:#fff,stroke-width:2px\n'
  diagram += '    classDef pending fill:#fff,stroke:#d9d9d9,color:#333,stroke-width:2px\n'
  diagram += '    classDef phase fill:#1890ff,stroke:#1890ff,color:#fff,stroke-width:3px\n\n'

  const completedNodes = props.completedNodes || []

  // 添加阶段节点和内部学习节点
  props.phases.forEach((phase, index) => {
    const phaseId = phase.id.replace(/-/g, '_')
    const statusClass = isPhaseCompleted(phase) ? 'completed' : 'pending'
    
    // 阶段节点
    diagram += `    ${phaseId}["${phase.title}\\n(${phase.duration})"]:::${statusClass}\n`
    diagram += `    class ${phaseId} phase\n`
    
    // 阶段间的连接
    if (index > 0) {
      const prevPhaseId = props.phases[index - 1].id.replace(/-/g, '_')
      diagram += `    ${prevPhaseId} --> ${phaseId}\n`
    }
    
    diagram += '\n'

    // 添加阶段内的学习节点
    phase.nodes.forEach((node, nodeIndex) => {
      const nodeId = node.id.replace(/-/g, '_')
      let statusClass = 'pending'
      
      // 判断节点状态
      if (completedNodes.includes(node.id)) {
        statusClass = 'completed'
      } else if (isNodeInProgress(node, completedNodes)) {
        statusClass = 'inProgress'
      }
      
      // 添加标签信息
      const tagStr = node.tags.length > 0 ? `\\n[${node.tags[0]}]` : ''
      diagram += `    ${nodeId}["${node.title}${tagStr}"]:::${statusClass}\n`
      diagram += `    ${phaseId} --> ${nodeId}\n`
      
      // 节点间的顺序连接
      if (nodeIndex > 0) {
        const prevNodeId = phase.nodes[nodeIndex - 1].id.replace(/-/g, '_')
        diagram += `    ${prevNodeId} --> ${nodeId}\n`
      }
      
      diagram += '\n'
    })
  })

  return diagram
}

/**
 * 判断阶段是否完成(所有节点都已完成)
 */
const isPhaseCompleted = (phase: RoadmapPhase): boolean => {
  const completedNodes = props.completedNodes || []
  return phase.nodes.length > 0 && phase.nodes.every(node => completedNodes.includes(node.id))
}

/**
 * 判断节点是否进行中(简化逻辑:第一个未完成的节点视为进行中)
 */
const isNodeInProgress = (node: RoadmapNode, completedNodes: string[]): boolean => {
  // 查找该节点在阶段中的位置
  for (const phase of props.phases) {
    const nodeIndex = phase.nodes.findIndex(n => n.id === node.id)
    if (nodeIndex !== -1) {
      // 如果前一个节点已完成但当前节点未完成,则视为进行中
      if (nodeIndex > 0) {
        const prevNode = phase.nodes[nodeIndex - 1]
        return completedNodes.includes(prevNode.id) && !completedNodes.includes(node.id)
      }
      // 如果是阶段的第一个节点,检查上一个阶段的最后一个节点
      const phaseIndex = props.phases.findIndex(p => p.id === phase.id)
      if (phaseIndex > 0) {
        const prevPhase = props.phases[phaseIndex - 1]
        const lastNodeOfPrevPhase = prevPhase.nodes[prevPhase.nodes.length - 1]
        return completedNodes.includes(lastNodeOfPrevPhase.id) && !completedNodes.includes(node.id)
      }
      break
    }
  }
  return false
}

/**
 * 渲染Mermaid图表
 * 包含完整的错误处理和加载状态管理
 */
const renderDiagram = async (): Promise<void> => {
  if (!mermaidRef.value) return
  
  isLoading.value = true
  renderError.value = null
  
  try {
    // 初始化Mermaid配置
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis'
      },
      themeVariables: {
        fontSize: '14px'
      }
    })

    // 生成图表定义
    const diagramDefinition = generateMermaidDiagram()
    
    // 渲染图表
    const { svg } = await mermaid.render('roadmap-diagram', diagramDefinition)
    mermaidRef.value.innerHTML = svg
    
    // 添加点击事件处理器
    addClickHandlers()
  } catch (error) {
    console.error('Failed to render mermaid diagram:', error)
    renderError.value = error instanceof Error ? error.message : '图表渲染失败'
    mermaidRef.value.innerHTML = `<p style="color: red; text-align: center; padding: 20px;">${renderError.value}</p>`
  } finally {
    isLoading.value = false
  }
}

/**
 * 为节点添加点击跳转处理
 * 支持阶段节点和学习节点的点击跳转
 */
const addClickHandlers = (): void => {
  if (!mermaidRef.value) return
  
  const nodes = mermaidRef.value.querySelectorAll('.node')
  nodes.forEach(node => {
    // 提取节点ID(去除Mermaid自动添加的前缀)
    const nodeId = node.id?.replace(/^flowchart-/, '')?.replace(/_/g, '-')
    if (!nodeId) return
    
    // 查找对应的阶段或节点
    const phase = props.phases.find(p => p.id === nodeId)
    if (phase) {
      // 阶段节点点击 - 跳转到路线图对应章节
      node.style.cursor = 'pointer'
      node.addEventListener('click', () => {
        window.location.href = `/guide/roadmap#${phase.id}`
      })
    } else {
      // 查找具体学习节点
      for (const p of props.phases) {
        const n = p.nodes.find(n => n.id === nodeId)
        if (n) {
          node.style.cursor = 'pointer'
          node.addEventListener('click', () => {
            window.location.href = n.url
          })
          break
        }
      }
    }
  })
}

// 监听数据变化重新渲染
watch(() => [props.phases, props.completedNodes], () => {
  renderDiagram()
}, { deep: true })

/**
 * 组件挂载时初始化图表
 */
onMounted(() => {
  renderDiagram()
})
</script>

<template>
  <div class="roadmap-container">
    <!-- 加载状态 -->
    <div v-if="isLoading" class="loading">
      <div class="spinner"></div>
      <p>加载路线图中...</p>
    </div>
    
    <!-- Mermaid图表容器 -->
    <div v-else ref="mermaidRef" class="mermaid-diagram"></div>
    
    <!-- 图例说明 -->
    <div class="legend">
      <div class="legend-item">
        <span class="legend-color completed"></span>
        <span>已完成</span>
      </div>
      <div class="legend-item">
        <span class="legend-color in-progress"></span>
        <span>进行中</span>
      </div>
      <div class="legend-item">
        <span class="legend-color pending"></span>
        <span>未开始</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.roadmap-container {
  width: 100%;
  padding: 20px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.mermaid-diagram {
  width: 100%;
  overflow-x: auto;
}

.mermaid-diagram :deep(svg) {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

.mermaid-diagram :deep(.node) {
  transition: all 0.3s ease;
}

.mermaid-diagram :deep(.node:hover) {
  filter: brightness(1.1);
  transform: scale(1.02);
}

.legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 3px;
}

.legend-color.completed {
  background: #4CAF50;
}

.legend-color.in-progress {
  background: #FF9800;
}

.legend-color.pending {
  background: #9E9E9E;
}

@media (max-width: 768px) {
  .roadmap-container {
    padding: 10px;
  }
  
  .legend {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>

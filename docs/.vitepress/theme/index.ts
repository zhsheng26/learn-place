import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import Layout from './Layout.vue'
import RoadmapGraph from './components/RoadmapGraph.vue'
import QuizWidget from './components/QuizWidget.vue'
import ProgressPanel from './components/ProgressPanel.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(Layout)
  },
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('RoadmapGraph', RoadmapGraph)
    app.component('QuizWidget', QuizWidget)
    app.component('ProgressPanel', ProgressPanel)
  },
}

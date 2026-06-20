import { defineConfig } from 'vitepress'
import { resolve } from 'path'

export default defineConfig({
  // 站点基本信息
  title: 'LearnPlace',
  description: 'Java后端开发者转型AI/Agent应用开发的系统化学习平台',
  base: '/learn-place/', // GitHub Pages部署时的基础路径
  
  // 忽略死链检查(部分页面尚未创建)
  ignoreDeadLinks: true,
  
  // SEO优化
  head: [
    // 基础Meta标签
    ['meta', { name: 'keywords', content: 'Java,AI,Agent,LLM,Spring AI,RAG,Prompt Engineering,大语言模型,机器学习,深度学习' }],
    ['meta', { name: 'author', content: 'LearnPlace Team' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    
    // Open Graph协议
    ['meta', { property: 'og:title', content: 'LearnPlace - Java开发者AI转型学习平台' }],
    ['meta', { property: 'og:description', content: '系统化学习路线、实战项目训练、能力评估体系,助力Java后端开发者快速掌握AI/Agent开发技能' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://zhsheng26.github.io/learn-place/' }],
    ['meta', { property: 'og:image', content: 'https://zhsheng26.github.io/learn-place/og-image.png' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    
    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'LearnPlace - Java开发者AI转型学习平台' }],
    ['meta', { name: 'twitter:description', content: '系统化学习路线、实战项目训练、能力评估体系' }],
    
    // Favicon
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    
    // 主题色
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ],

  // Markdown增强配置
  markdown: {
    // 代码高亮主题
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    // 支持Mermaid图表
    config: (md) => {
      const originalFence = md.renderer.rules.fence!
      md.renderer.rules.fence = (...args) => {
        const [tokens, idx] = args
        const token = tokens[idx]
        if (token.info === 'mermaid') {
          return `<div class="mermaid">${token.content}</div>`
        }
        return originalFence(...args)
      }
    },
    // 行号显示
    lineNumbers: true,
  },

  // 导航栏配置
  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: '首页', link: '/' },
      { text: '学习指南', link: '/guide/roadmap' },
      { text: '学习资料', link: '/resources/articles' },
      { text: '练手项目', link: '/projects/overview' },
      { text: '面试题库', link: '/interview/overview' },
      { text: '工具', link: '/tools/quiz' },
    ],

    // 侧边栏配置 - 按模块组织
    sidebar: {
      '/guide/': [
        {
          text: '学习路线总览',
          items: [
            { text: '路线图', link: '/guide/roadmap' },
          ],
        },
        {
          text: 'LLM基础认知',
          items: [
            { text: '什么是大语言模型', link: '/guide/llm-basics/what-is-llm' },
            { text: 'Transformer架构详解', link: '/guide/llm-basics/transformer' },
            { text: 'Token与Embedding', link: '/guide/llm-basics/token-embedding' },
          ],
        },
        {
          text: 'Prompt工程',
          items: [
            { text: 'Prompt设计原则', link: '/guide/prompt-eng/principles' },
            { text: '常用技巧(CoT/Few-shot)', link: '/guide/prompt-eng/techniques' },
            { text: 'Prompt优化实践', link: '/guide/prompt-eng/optimization' },
          ],
        },
        {
          text: 'Spring AI框架',
          items: [
            { text: 'Spring AI快速入门', link: '/guide/spring-ai/quickstart' },
            { text: 'ChatClient使用', link: '/guide/spring-ai/chat-client' },
            { text: 'Function Calling', link: '/guide/spring-ai/function-calling' },
          ],
        },
        {
          text: 'RAG全链路',
          items: [
            { text: 'RAG架构原理', link: '/guide/rag/architecture' },
            { text: '向量数据库选型', link: '/guide/rag/vector-db' },
            { text: '文本分块策略', link: '/guide/rag/chunking' },
            { text: '检索优化技巧', link: '/guide/rag/retrieval' },
          ],
        },
        {
          text: 'Agent开发',
          items: [
            { text: 'Agent设计模式', link: '/guide/agent/design-patterns' },
            { text: 'ReAct框架', link: '/guide/agent/react' },
            { text: '多Agent协作', link: '/guide/agent/multi-agent' },
          ],
        },
        {
          text: '部署运维',
          items: [
            { text: '模型部署方案', link: '/guide/deployment/model-deploy' },
            { text: '性能优化', link: '/guide/deployment/performance' },
            { text: '监控与日志', link: '/guide/deployment/monitoring' },
          ],
        },
      ],
      '/resources/': [
        {
          text: '学习资料',
          items: [
            { text: '文章汇总', link: '/resources/articles' },
            { text: '视频教程', link: '/resources/videos' },
            { text: '官方文档', link: '/resources/docs' },
            { text: '开源项目', link: '/resources/projects' },
          ],
        },
      ],
      '/projects/': [
        {
          text: '练手项目',
          items: [
            { text: '项目总览', link: '/projects/overview' },
            { text: 'L1: 智能问答机器人', link: '/projects/project-1-qa-bot' },
            { text: 'L2: RAG知识库', link: '/projects/project-2-rag-kb' },
            { text: 'L2: 代码生成Agent', link: '/projects/project-3-code-agent' },
            { text: 'L3: 多Agent协作系统', link: '/projects/project-4-multi-agent' },
            { text: 'L3: 智能客服系统', link: '/projects/project-5-customer-service' },
          ],
        },
      ],
      '/interview/': [
        {
          text: '使用说明',
          items: [
            { text: '如何使用题库', link: '/interview/overview' },
          ],
        },
        {
          text: 'LLM理论基础',
          items: [
            { text: '基础概念', link: '/interview/llm-theory/basics' },
            { text: '进阶问题', link: '/interview/llm-theory/advanced' },
          ],
        },
        {
          text: 'Prompt工程',
          items: [
            { text: '设计原则', link: '/interview/prompt-eng/principles' },
            { text: '实战案例', link: '/interview/prompt-eng/cases' },
          ],
        },
        {
          text: 'RAG架构',
          items: [
            { text: '核心原理', link: '/interview/rag/core' },
            { text: '优化策略', link: '/interview/rag/optimization' },
          ],
        },
        {
          text: 'Agent开发',
          items: [
            { text: '设计模式', link: '/interview/agent/patterns' },
            { text: '系统设计', link: '/interview/agent/system-design' },
          ],
        },
        {
          text: '框架使用',
          items: [
            { text: 'Spring AI', link: '/interview/frameworks/spring-ai' },
            { text: 'LangChain4J', link: '/interview/frameworks/langchain4j' },
          ],
        },
        {
          text: '系统设计',
          items: [
            { text: '高并发场景', link: '/interview/system-design/high-concurrency' },
            { text: '容错与降级', link: '/interview/system-design/fault-tolerance' },
          ],
        },
      ],
      '/tools/': [
        {
          text: '实用工具',
          items: [
            { text: '交互式答题', link: '/tools/quiz' },
            { text: '进度追踪', link: '/tools/progress' },
            { text: 'Token计算器', link: '/tools/calculator' },
          ],
        },
      ],
    },

    // 主题配置
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zhsheng26/learn-place' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 LearnPlace Team',
    },

    // 搜索功能
    search: {
      provider: 'local',
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/zhsheng26/learn-place/edit/main/docs/:path',
      text: '在GitHub上编辑此页面',
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: { dateStyle: 'short', timeStyle: 'medium' },
    },

    // 上一页/下一页
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      level: [2, 3],
      label: '页面目录',
    },
  },

  // PWA支持(可选)
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'LearnPlace',
      short_name: 'LearnPlace',
      description: 'Java后端开发者转型AI/Agent应用开发的系统化学习平台',
      theme_color: '#ffffff',
      icons: [
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  },

  // Vite构建优化配置
  vite: {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'docs'),
        '@components': resolve(__dirname, 'docs/.vitepress/theme/components'),
        '@data': resolve(__dirname, 'docs/data'),
      },
    },
    build: {
      // Chunk大小警告阈值(kb)
      chunkSizeWarningLimit: 2000,
      // CSS代码分割
      cssCodeSplit: true,
      // 启用sourcemap(生产环境可关闭)
      sourcemap: false,
      // 压缩选项
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // 移除console.log
          drop_debugger: true, // 移除debugger
        },
      },
    },
    // 优化依赖预构建
    optimizeDeps: {
      include: ['mermaid', 'echarts'],
    },
    // Gzip压缩
    plugins: [
      // 注意: VitePress已内置gzip支持,无需额外插件
    ],
  },
})

import { SitemapStream, streamToPromise } from 'sitemap'
import { createWriteStream } from 'fs'
import { Readable } from 'stream'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

// ESM模块中获取__dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 站点URL配置
const SITE_URL = 'https://your-org.github.io/learn-place/'

// 需要收录的页面路径
const pages = [
  // 首页
  { url: '/', changefreq: 'daily', priority: 1.0 },
  
  // 学习指南
  { url: '/guide/roadmap', changefreq: 'weekly', priority: 0.9 },
  { url: '/guide/llm-basics/what-is-llm', changefreq: 'monthly', priority: 0.8 },
  { url: '/guide/llm-basics/transformer', changefreq: 'monthly', priority: 0.8 },
  { url: '/guide/llm-basics/token-embedding', changefreq: 'monthly', priority: 0.8 },
  { url: '/guide/prompt-eng/principles', changefreq: 'monthly', priority: 0.8 },
  { url: '/guide/prompt-eng/techniques', changefreq: 'monthly', priority: 0.8 },
  { url: '/guide/prompt-eng/optimization', changefreq: 'monthly', priority: 0.8 },
  { url: '/guide/spring-ai/quickstart', changefreq: 'monthly', priority: 0.8 },
  { url: '/guide/spring-ai/chat-client', changefreq: 'monthly', priority: 0.8 },
  { url: '/guide/spring-ai/function-calling', changefreq: 'monthly', priority: 0.8 },
  { url: '/guide/rag/architecture', changefreq: 'monthly', priority: 0.8 },
  { url: '/guide/rag/vector-db', changefreq: 'monthly', priority: 0.8 },
  { url: '/guide/rag/chunking', changefreq: 'monthly', priority: 0.8 },
  { url: '/guide/rag/retrieval', changefreq: 'monthly', priority: 0.8 },
  { url: '/guide/agent/design-patterns', changefreq: 'monthly', priority: 0.8 },
  { url: '/guide/agent/react', changefreq: 'monthly', priority: 0.8 },
  { url: '/guide/agent/multi-agent', changefreq: 'monthly', priority: 0.8 },
  { url: '/guide/deployment/model-deploy', changefreq: 'monthly', priority: 0.8 },
  { url: '/guide/deployment/performance', changefreq: 'monthly', priority: 0.8 },
  { url: '/guide/deployment/monitoring', changefreq: 'monthly', priority: 0.8 },
  
  // 学习资料
  { url: '/resources/articles', changefreq: 'weekly', priority: 0.7 },
  { url: '/resources/videos', changefreq: 'weekly', priority: 0.7 },
  { url: '/resources/docs', changefreq: 'weekly', priority: 0.7 },
  { url: '/resources/projects', changefreq: 'weekly', priority: 0.7 },
  
  // 练手项目
  { url: '/projects/overview', changefreq: 'weekly', priority: 0.8 },
  { url: '/projects/project-1-qa-bot', changefreq: 'monthly', priority: 0.7 },
  { url: '/projects/project-2-rag-kb', changefreq: 'monthly', priority: 0.7 },
  { url: '/projects/project-3-code-agent', changefreq: 'monthly', priority: 0.7 },
  { url: '/projects/project-4-multi-agent', changefreq: 'monthly', priority: 0.7 },
  { url: '/projects/project-5-customer-service', changefreq: 'monthly', priority: 0.7 },
  
  // 面试题库
  { url: '/interview/overview', changefreq: 'weekly', priority: 0.8 },
  { url: '/interview/llm-theory/basics', changefreq: 'monthly', priority: 0.7 },
  { url: '/interview/llm-theory/advanced', changefreq: 'monthly', priority: 0.7 },
  { url: '/interview/prompt-eng/principles', changefreq: 'monthly', priority: 0.7 },
  { url: '/interview/prompt-eng/cases', changefreq: 'monthly', priority: 0.7 },
  { url: '/interview/rag/core', changefreq: 'monthly', priority: 0.7 },
  { url: '/interview/rag/optimization', changefreq: 'monthly', priority: 0.7 },
  { url: '/interview/agent/patterns', changefreq: 'monthly', priority: 0.7 },
  { url: '/interview/agent/system-design', changefreq: 'monthly', priority: 0.7 },
  { url: '/interview/frameworks/spring-ai', changefreq: 'monthly', priority: 0.7 },
  { url: '/interview/frameworks/langchain4j', changefreq: 'monthly', priority: 0.7 },
  { url: '/interview/system-design/high-concurrency', changefreq: 'monthly', priority: 0.7 },
  { url: '/interview/system-design/fault-tolerance', changefreq: 'monthly', priority: 0.7 },
  
  // 工具
  { url: '/tools/quiz', changefreq: 'monthly', priority: 0.6 },
  { url: '/tools/progress', changefreq: 'monthly', priority: 0.6 },
  { url: '/tools/calculator', changefreq: 'monthly', priority: 0.6 },
]

async function generateSitemap() {
  const sitemapStream = new SitemapStream({ 
    hostname: SITE_URL,
    xmlns: {
      news: 'http://www.google.com/schemas/sitemap-news/0.9',
      xhtml: 'http://www.w3.org/1999/xhtml',
      image: 'http://www.google.com/schemas/sitemap-image/1.1',
      video: 'http://www.google.com/schemas/sitemap-video/1.1',
    }
  })
  
  const links = pages.map(page => ({
    url: page.url,
    changefreq: page.changefreq,
    priority: page.priority,
  }))
  
  const stream = Readable.from(links).pipe(sitemapStream)
  
  // 写入sitemap.xml文件(VitePress输出目录)
  const distPath = resolve(__dirname, 'docs/.vitepress/dist')
  const writeStream = createWriteStream(resolve(distPath, 'sitemap.xml'))
  stream.pipe(writeStream)
  
  const data = await streamToPromise(stream)
  console.log('✅ Sitemap generated successfully!')
  console.log(`📄 Total pages: ${pages.length}`)
  console.log(`📍 Output: docs/dist/sitemap.xml`)
}

generateSitemap().catch(console.error)

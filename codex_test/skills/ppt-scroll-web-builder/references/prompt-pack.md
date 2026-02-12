# PPT Scroll Web Prompt Pack

## Master Prompt Template

```text
You are a senior front-end engineer. Build a vertically scrollable PPT-style web app.

Requirements:
- Multiple slides rendered as independent sections.
- Each slide keeps a strict 16:9 canvas.
- Slides are viewed by scrolling from top to bottom.
- Slide gaps are configurable.

Engineering constraints:
- Use Vite + React + TypeScript.
- Use Tailwind CSS for styling.
- Use Framer Motion for animation.
- Use ECharts + echarts-for-react for chart slides.
- Keep responsive behavior for desktop and mobile.
- Keep layout/content controlled by exactly 3 inputs: `lang`, `style`, `script`.
- Apply PPT best-practice rules before coding and anti-rule audit after coding.

Config model:
- `lang`: output language code.
- `style`: one of `tech-dark | minimal-light | gradient-warm | corporate | retro-terminal | glassmorphism`, or natural-language custom style description.
- `script`: selectable Markdown file path for content source (never hardcode `./script.md`).
- Style presets are modular files (`styles/presets/*.ts`), one style per file, auto-loaded by registry.

Rendering rules:
- Parse Markdown at `script` into slide data.
- Do not hardcode visible copy outside parsed script.
- Resolve style tokens from preset or natural-language custom style.
- Support optional scroll snap and entrance animation.
- Respect reduced-motion.
- Keep fixed padding and content utilization targets based on the quality rulebook.

Deliver:
- Runnable React app code.
- At least 6 sample slides with mixed types.
- A short “where to edit” note for `lang`, `style`, `script`.
- A short anti-rule pass/fail QA summary.
```

## Parameterized User Prompt Template

```text
请基于以下配置生成“纵向滚动的 PPT 风格 React 网页”：

[技术栈]
- 构建: Vite
- 框架: React + TypeScript
- 样式: Tailwind CSS
- 动画: Framer Motion
- 图表: ECharts + echarts-for-react

[Core Controls]
- lang: {zh-CN | en-US | ja-JP | ...}
- style: {tech-dark | minimal-light | gradient-warm | corporate | retro-terminal | glassmorphism | 自然语言自定义风格}
- script: {可选 Markdown 文件路径，例如 ./storyboard.md | ./voiceover.md | ./slides/q1.md}

[布局要求]
- 每个 slide 画布固定 16:9
- slides 从上到下排列，支持间距
- 页面纵向滚动浏览

[脚本解析]
- 只从传入的 `script` 路径读取 Markdown 内容，不允许写死文件名
- `##` 作为 slide 分割
- `---` 作为强制分页
- 列表和段落作为 slide 正文

[动效]
- 使用 Framer Motion
- 遵循 reduced-motion：true

[内容脚本]
- 只允许来自 `script` 的内容进入页面
- 不要硬编码正文

[工程要求]
- 输出可运行的 Vite React TS 项目结构
- style 既支持 preset，也支持自然语言自定义
- 每个 preset style 必须是独立文件，支持增删文件即生效
- 图表使用 ECharts React 组件并跟随主题色
- 输出可直接运行
- 开始制作前先按 PPT 规则工作，完成后按反规则逐项检查
```

## Custom Style Example (Swiss Minimal)

```text
lang: zh-CN
style: 极简、米白色底、专业设计风格，建议采用 Swiss Style。背景 #F5F5F0，主文字 #333333，正向 #4CAF50，负向 #E57373，中性 #546E7A，卡片白底和轻阴影，圆角 12-16px，扁平化图表无网格线。
script: ./storyboard.md
```

# PPT-Style Webpage Control Prompts

## 1) Master Control Prompt (System / Developer Prompt)

Use this prompt when asking an AI coding agent to generate a webpage that behaves like a vertically scrollable PPT.

```text
You are a senior front-end engineer. Build a single-page website that behaves like a PPT deck while scrolling vertically.

Goal:
- The page contains multiple slide sections.
- Each slide is visually a 16:9 canvas.
- User scrolls from top to bottom to view slides in order.
- There can be configurable gaps between slides.

Technical constraints:
- Use plain HTML + CSS + JavaScript (no heavy framework unless explicitly requested).
- Keep code modular, readable, and production-friendly.
- Ensure responsive behavior on desktop and mobile.
- Keep smooth performance for at least 30 slides.

Core layout rules:
- A root container holds all slides in vertical order.
- Each slide must preserve aspect ratio 16:9.
- Prefer CSS `aspect-ratio: 16 / 9`; provide fallback if needed.
- Center each slide horizontally.
- Support configurable slide width strategy:
  1) fixed max width (e.g., 1280px), or
  2) viewport-relative width (e.g., min(92vw, 1280px)).
- Support configurable vertical gap between slides (e.g., 24px~120px).
- Outer page padding should be configurable.

Slide behavior:
- Natural vertical scrolling for the whole page.
- Optional “snap mode” via CSS scroll-snap (on/off by config).
- Optional entrance animation for slide content when slide enters viewport.
- Respect reduced-motion preference.

Content model:
- Slides are generated from a structured data source (JSON array).
- Each slide object should support:
  - id
  - type (cover, agenda, content, two-column, quote, image, chart, ending)
  - title
  - subtitle
  - body (string or bullet list)
  - media (optional image/video URL)
  - notes (optional)
- Rendering logic should map `type` to different layout presets.

Config-driven generation:
- Expose one top-level config object `PPT_CONFIG` and one data object `PPT_SCRIPT`.
- `PPT_CONFIG` must include:
  - language (e.g., "zh-CN", "en-US", "ja-JP")
  - themeName
  - palette (bg, surface, text, accent, muted)
  - typography (titleFont, bodyFont, codeFont)
  - spacing (pagePadding, slideGap, innerPadding)
  - motion (enabled, duration, easing)
  - behavior (snap, showProgress, showSlideNumber)
  - canvas (maxWidth, ratio=16/9, radius, shadow)
- `PPT_SCRIPT` contains metadata + slides array:
  - meta: title, author, date, audience, objective
  - slides: [...]

Language control:
- All visible text must come from `PPT_SCRIPT` and respect `PPT_CONFIG.language`.
- Do not hardcode UI copy in mixed languages.
- Provide i18n-ready labels for built-in UI (progress, slide number, footer).

Style control:
- Theme must be fully controlled by CSS variables generated from `PPT_CONFIG`.
- Include at least 3 built-in themes:
  1) Minimal Light
  2) Editorial Warm
  3) Tech Grid
- Theme switch should only require changing config, not rewriting HTML.

Script control:
- The presentation content is controlled by `PPT_SCRIPT`.
- The renderer must support:
  - bullet list auto-layout
  - long-text overflow handling
  - optional per-slide background override
  - optional speaker note hook (not visible by default)

Deliverables:
- Provide complete runnable code in one of these formats:
  1) single `index.html`, or
  2) `index.html` + `styles.css` + `app.js`.
- Include brief usage instructions:
  - where to edit language
  - where to edit style/theme
  - where to edit slides script
- Include sample data with at least 6 slides of different types.

Quality bar:
- Clean semantic HTML and accessible structure.
- Contrast ratio should be readable.
- No layout jump while loading.
- Avoid unnecessary dependencies.
- If any requirement is ambiguous, choose the most maintainable approach and document it in comments.
```

---

## 2) Parameterized User Prompt Template

Use this as your “control layer”. Replace placeholders and send to AI.

```text
请基于以下配置生成一个“纵向滚动的 PPT 风格网页”：

[项目目标]
- 产物类型：{single_html | html_css_js}
- 使用场景：{演讲展示 | 产品介绍 | 教学课件 | 项目汇报}
- 目标受众：{受众描述}

[布局与交互]
- 每页画布比例：16:9（必须）
- 幻灯片数量：{N}
- 幻灯片间距：{例如 48px}
- 页面内边距：{例如 32px}
- 滚动方式：{natural_scroll | scroll_snap}
- 是否显示进度条：{true|false}
- 是否显示页码：{true|false}

[语言控制]
- 输出语言：{zh-CN | en-US | ja-JP | ...}
- 文案语气：{专业 | 轻松 | 学术 | 营销}
- 术语风格：{通俗 | 专业}

[视觉风格]
- 主题名：{Minimal Light | Editorial Warm | Tech Grid | 自定义}
- 主色：{#hex}
- 强调色：{#hex}
- 背景风格：{纯色 | 渐变 | 网格 | 插画风}
- 圆角：{例如 16px}
- 阴影强度：{none | soft | medium | strong}
- 字体：标题 {font-family}，正文字体 {font-family}

[动效]
- 启用动效：{true|false}
- 入场动画：{fade | slide-up | scale-in}
- 动画时长：{例如 500ms}
- 是否遵循 reduced-motion：true（必须）

[内容脚本]
- 演示标题：{标题}
- 作者：{作者}
- 日期：{YYYY-MM-DD}
- 目标：{一句话目标}
- 幻灯片脚本（JSON 或结构化列表）：
{在这里粘贴 slides 数据，至少包含 title/body/type}

[工程要求]
- 输出可直接运行
- 使用语义化 HTML + 可维护 CSS + 清晰 JS
- 使用 `PPT_CONFIG` + `PPT_SCRIPT` 双配置结构
- 所有文案从脚本读取，不要写死在模板里
- 给出“我应该改哪几处”的简短说明
```

---

## 3) Example Filled Prompt (Chinese Tech Talk)

```text
请基于以下配置生成一个“纵向滚动的 PPT 风格网页”：

[项目目标]
- 产物类型：html_css_js
- 使用场景：项目汇报
- 目标受众：前端团队与产品经理

[布局与交互]
- 每页画布比例：16:9（必须）
- 幻灯片数量：8
- 幻灯片间距：56px
- 页面内边距：36px
- 滚动方式：scroll_snap
- 是否显示进度条：true
- 是否显示页码：true

[语言控制]
- 输出语言：zh-CN
- 文案语气：专业
- 术语风格：专业

[视觉风格]
- 主题名：Tech Grid
- 主色：#0f172a
- 强调色：#06b6d4
- 背景风格：网格
- 圆角：18px
- 阴影强度：medium
- 字体：标题 "Noto Sans SC"，正文 "Source Han Sans SC"

[动效]
- 启用动效：true
- 入场动画：slide-up
- 动画时长：520ms
- 是否遵循 reduced-motion：true（必须）

[内容脚本]
- 演示标题：2026 前端架构升级路线
- 作者：技术平台组
- 日期：2026-02-12
- 目标：在 20 分钟内统一架构升级路径与里程碑
- 幻灯片脚本（JSON）：
{
  "meta": {
    "title": "2026 前端架构升级路线",
    "author": "技术平台组",
    "date": "2026-02-12",
    "audience": "前端团队与产品经理",
    "objective": "统一架构升级路径与里程碑"
  },
  "slides": [
    { "id": "s1", "type": "cover", "title": "2026 前端架构升级路线", "subtitle": "从分散到统一" },
    { "id": "s2", "type": "agenda", "title": "目录", "body": ["现状问题", "目标架构", "迁移计划", "风险与资源"] },
    { "id": "s3", "type": "content", "title": "现状问题", "body": ["构建链路分裂", "组件标准不统一", "性能指标缺乏闭环"] },
    { "id": "s4", "type": "two-column", "title": "目标架构", "body": ["左侧：平台能力", "右侧：业务接入模型"] },
    { "id": "s5", "type": "quote", "title": "核心原则", "body": "先标准化，再平台化，最后规模化。" },
    { "id": "s6", "type": "chart", "title": "迁移节奏", "body": ["Q1 试点", "Q2 扩展", "Q3 全量", "Q4 优化"] },
    { "id": "s7", "type": "content", "title": "风险与对策", "body": ["兼容性风险", "学习成本风险", "交付节奏风险"] },
    { "id": "s8", "type": "ending", "title": "谢谢", "subtitle": "Q&A" }
  ]
}

[工程要求]
- 输出可直接运行
- 使用语义化 HTML + 可维护 CSS + 清晰 JS
- 使用 `PPT_CONFIG` + `PPT_SCRIPT` 双配置结构
- 所有文案从脚本读取，不要写死在模板里
- 给出“我应该改哪几处”的简短说明
```


# PPT Scroll Web Prompt Pack

## Master Prompt Template

```text
You are a senior front-end engineer. Build a vertically scrollable PPT-style webpage.

Requirements:
- Multiple slides rendered as independent sections.
- Each slide keeps a strict 16:9 canvas.
- Slides are viewed by scrolling from top to bottom.
- Slide gaps are configurable.

Engineering constraints:
- Use HTML + CSS + JavaScript.
- Keep responsive behavior for desktop and mobile.
- Keep layout/content separated with `PPT_CONFIG` and `PPT_SCRIPT`.

Config model:
- `PPT_CONFIG`: language, theme, palette, typography, spacing, behavior, motion, canvas.
- `PPT_SCRIPT`: meta + slides.

Rendering rules:
- Map slide `type` to layout presets.
- Do not hardcode visible copy outside `PPT_SCRIPT`.
- Support optional scroll snap and optional entrance animation.
- Respect reduced-motion.

Deliver:
- Runnable code (single HTML or split files).
- At least 6 sample slides with mixed types.
- A short “where to edit” note for language/theme/script.
```

## Parameterized User Prompt Template

```text
请基于以下配置生成“纵向滚动的 PPT 风格网页”：

[布局]
- 画布比例：16:9
- 幻灯片数量：{N}
- 幻灯片间距：{slide_gap}
- 页面内边距：{page_padding}
- 滚动方式：{natural_scroll | scroll_snap}

[语言]
- 输出语言：{language}
- 语气：{tone}

[视觉]
- 主题：{theme_name}
- 主色：{primary_color}
- 强调色：{accent_color}
- 字体：标题 {title_font}，正文 {body_font}

[动效]
- 启用动效：{true|false}
- 动画类型：{fade|slide-up|scale-in}
- 时长：{duration_ms}
- 遵循 reduced-motion：true

[内容脚本]
- 演示标题：{title}
- 作者：{author}
- 日期：{yyyy-mm-dd}
- 幻灯片脚本：{JSON}

[工程要求]
- 使用 `PPT_CONFIG` + `PPT_SCRIPT`
- 所有文案从脚本读取
- 输出可直接运行
```

## Example Variables

```json
{
  "language": "zh-CN",
  "theme_name": "Tech Grid",
  "slide_gap": "56px",
  "page_padding": "36px",
  "title": "2026 前端架构升级路线",
  "author": "技术平台组",
  "date": "2026-02-12"
}
```

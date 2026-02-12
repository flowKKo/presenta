# PPT-Style Webpage Control Prompts (3-Dim Model)

## 1) Master Control Prompt (System / Developer Prompt)

Use this prompt when asking an AI coding agent to generate a vertically scrollable PPT-style webpage with exactly 3 core controls: `lang`, `style`, `script`.

```text
You are a senior front-end engineer. Build a vertically scrollable PPT-style webpage.

You must treat the following as the only required control dimensions:
1) lang: output language code (e.g., zh-CN, en-US, ja-JP)
2) style: one of six preset style IDs OR a natural-language custom style description
3) script: selectable path to a Markdown content script file (not a fixed filename)

Hard requirements:
- Each slide is a 16:9 canvas.
- Multiple slides are stacked vertically with configurable gap.
- User reads slides by scrolling top -> bottom.
- Responsive on desktop and mobile.

Style presets (must support all):
- tech-dark
- minimal-light
- gradient-warm
- corporate
- retro-terminal
- glassmorphism

Style behavior:
- If `style` matches a preset ID, apply that preset token set.
- If `style` is natural-language text, infer a custom token set and document assumptions in comments.
- Do not fail silently on unknown style strings.

Script behavior:
- Read content from the Markdown file at `script`.
- Treat `script` as runtime input. Never hardcode `./script.md`.
- Allow both relative and absolute paths.
- Accept file extensions: `.md` and `.markdown`.
- If file cannot be read, return a clear error and stop.
- Parse markdown headings into slide structure.
- Suggested mapping:
  - `#` => deck title/meta
  - `##` => new slide title
  - lists/paragraphs under each `##` => slide body
  - `---` => force slide break

Implementation constraints:
- Use plain HTML + CSS + JavaScript unless user asks otherwise.
- Preserve 16:9 via `aspect-ratio: 16 / 9` (fallback if needed).
- Keep visible content sourced from parsed script, not hardcoded.
- Respect `prefers-reduced-motion`.

Output contract:
- Expose one input object:
  `const CONTROL = { lang, style, script };`
- Expose parsed output data:
  `const PPT_SCRIPT = { meta, slides };`
- Deliver runnable code (`index.html` or split files).
- Include short notes:
  - where to change `lang`
  - where to change `style`
  - where to change `script` path
```

---

## 2) Parameterized User Prompt Template

Use this as your control layer and only fill these 3 dimensions plus optional rendering preferences.

```text
请生成“纵向滚动的 PPT 风格网页”，并严格使用以下 3 个配置维度：

[Core Controls]
- lang: {zh-CN | en-US | ja-JP | ...}
- style: {tech-dark | minimal-light | gradient-warm | corporate | retro-terminal | glassmorphism | 自然语言自定义风格}
- script: {可选 Markdown 文件路径，例如 ./storyboard.md | ./voiceover.md | ./slides/q1.md}

[Required Layout]
- 每个 slide 画布固定为 16:9
- slide 从上到下排列，支持 slide 间距
- 页面纵向滚动浏览全部 slides

[Script Parsing Rules]
- 只从传入的 `script` 路径读取内容，不允许写死文件名
- `##` 作为新 slide 标题
- 段落和列表作为当前 slide 内容
- `---` 作为强制分页符

[Engineering Requirements]
- 输出可直接运行
- 所有展示文案来自 `script` 文件解析结果
- 若 `script` 文件不可读，明确报错
- 给出“我应该改哪三处（lang/style/script）”的说明
```

---

## 3) Example Filled Prompt

```text
请生成“纵向滚动的 PPT 风格网页”，并严格使用以下 3 个配置维度：

[Core Controls]
- lang: zh-CN
- style: glassmorphism
- script: ./storyboard.md

[Required Layout]
- 每个 slide 画布固定为 16:9
- slide 从上到下排列，间距 56px
- 页面纵向滚动浏览全部 slides

[Script Parsing Rules]
- 从 `./storyboard.md` 读取内容
- `##` 作为新 slide 标题
- 段落和列表作为当前 slide 内容
- `---` 作为强制分页符

[Engineering Requirements]
- 输出 `index.html + styles.css + app.js`
- 所有展示文案来自脚本解析结果
- 如果传入的脚本路径不存在，返回清晰报错信息
- 最后告诉我修改 `lang/style/script` 的位置
```

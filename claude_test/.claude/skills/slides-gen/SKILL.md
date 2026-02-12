---
name: slides-gen
description: "Generate slides.md from a script/voiceover file and source document. Maps narrative sections to typed slide outlines with real data, chart specs, and animation directives. Usage: /slides-gen --script voiceover.md --source full.md [--density rich]"
argument-hint: "--script <file> --source <file> [--output <file>] [--density compact|rich] [--lang zh]"
---

# Slides Script Generator

Generate a structured `slides.md` file from a narrative script (voiceover/script) and a detailed source document. The output is a slide-by-slide outline — including slide types, real data, chart specifications, layout treatments, and animation directives — that can be fed into the `/web-ppt` skill to produce the final presentation.

## Argument Parsing

Parse `$ARGUMENTS` for these flags:

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `--script` | Yes | — | Path to the voiceover/script markdown file (narrative source) |
| `--source` | Yes | — | Path to the full reference document with detailed data |
| `--output` | No | `slides.md` | Output path for the generated slide outline |
| `--density` | No | `rich` | Content density: `compact` (简洁) or `rich` (充实). See Content Density section |
| `--lang` | No | `zh` | Language for slide content |

Positional shorthand: `/slides-gen voiceover.md full.md` → script=voiceover.md, source=full.md

---

## Content Density Modes

The `--density` flag controls how much information goes into each slide, and how many slides are generated per script section.

### `compact` — 简洁模式

Target audience: live presentation with speaker narration. Slides are visual aids, not documents.

| Aspect | compact |
|--------|---------|
| Slides per section | 1 (rarely 2) |
| Total slides | 15-20 |
| Body text | 0-1 sentence, or omitted entirely |
| Data points per slide | Minimum from density table |
| Cards/items | 2-3 per slide |
| Chart bars | 2-4 |
| Comparison columns | 2 |
| 正文 field | Often omitted — title + data speaks for itself |
| 结论 field | Short phrase (≤10 characters), or omitted |
| Player card features | 3 max |
| List items | 3 max |

**compact 原则：** 每张幻灯片只保留"不看幻灯片就无法理解"的信息。口播能说清楚的文字不要出现在幻灯片上。留白 > 堆信息。

### `rich` — 充实模式

Target audience: self-reading deck (no speaker), or data-heavy presentation where audience needs to study details.

| Aspect | rich |
|--------|------|
| Slides per section | 1-3 (split complex topics) |
| Total slides | 20-28 |
| Body text | 1-2 sentences with specific insight |
| Data points per slide | Maximum from density table |
| Cards/items | 3-6 per slide |
| Chart bars | 4-8 |
| Comparison columns | 2-3 |
| 正文 field | Required on every non-title slide |
| 结论 field | Full sentence with data reference |
| Player card features | 4-5 + comparison chart |
| List items | 4-5 with descriptions |

**rich 原则：** 每张幻灯片是一个自包含的信息单元。即使没有口播，读者也能完全理解内容。数据越详细越好，但一张幻灯片仍然只传达一个核心信息。

### Content Density Table (per slide type)

| Slide Type | compact min-max | rich min-max |
|------------|----------------|-------------|
| data-comparison | 2 metrics | 2-4 metrics |
| bar-chart | 2-4 rows | 4-8 rows |
| comparison | 2 cols × 2-3 rows | 2-3 cols × 3-5 rows |
| grid | 4 items (title only) | 4-6 items (title + description) |
| player-card | score + 2-3 features | score + 4-5 features + chart |
| list | 3 items (short) | 3-5 items (with descriptions) |
| diagram | 3 steps | 3-5 steps + side notes |
| card-grid | 2-3 cards | 3-4 cards + conclusion |

---

## Input Files

### Script File (--script)

The script file is a narrative document — either a voiceover script or a production script. It contains:
- The full spoken narration organized by topic/section
- The logical flow of the presentation
- Key arguments and transitions between topics

The script defines **WHAT to say and in what order**. It is the authoritative source for:
- Presentation structure and section boundaries
- Which topics are included or excluded
- The narrative arc (intro → body → conclusion)

### Source Document (--source)

The source document is a detailed reference article or report. It contains:
- Exact numbers, scores, percentages, rankings
- Detailed comparisons and analysis
- Methodology descriptions
- Quotes and findings

The source provides **THE DATA** that populates slide fields. Without it, slides would have empty metrics.

---

## Generation Workflow (6 Phases)

### Phase 1: Script Analysis — 拆解口播稿

Read the `--script` file completely. Produce a **section inventory**:

For each section (separated by `---` or heading breaks), extract:

1. **Section ID** — sequential number (S1, S2, S3...)
2. **Topic** — what this section is about (1 phrase)
3. **Key data points** — every number, score, percentage mentioned in the narration
4. **Entities** — products, models, companies named
5. **Argument** — what claim the narrator is making
6. **Transition type** — how the narrator moves to this section: opening / continuation / pivot / conclusion

Output this as an internal working note (not written to file).

Example section inventory:
```
S1: Opening — Terminal-Bench 2.0 benchmark
  Data: 101 agents, Opus 4.6 lowest 58, highest 69.9, delta ~12
  Entities: Terminal-Bench 2.0, Claude Opus 4.6
  Argument: Same model, vastly different scores → scaffold matters
  Transition: opening

S2: Scaffold definition
  Data: (none, conceptual)
  Entities: (none)
  Argument: Scaffold = engineering layer wrapping the model
  Transition: continuation (explains the "why" from S1)

S3: Terminus 2 baseline + gain data
  Data: GPT-5.3 Terminus2=64.7 → Simple Codex=75.1 (+10.4), Opus4.6 Terminus2=62.9 → Droid=69.9 (+7.0)
  Entities: Terminus 2, GPT-5.3, Simple Codex, Opus 4.6, Droid
  Argument: 5-10pp gains move ranking from mid to top-3
  Transition: pivot (from concept to data proof)
```

### Phase 2: Source Document Indexing — 索引源文档数据

Read the `--source` file completely. Build a **data catalog**:

| Category | What to Extract | Example |
|----------|----------------|---------|
| Scores / Rankings | Tool + model + score | Simple Codex + GPT-5.3 = 75.1 |
| Deltas / Gains | Before → after, delta | Terminus 2 62.9 → Droid 69.9, +7.0 |
| Feature comparisons | Tool × feature matrix | Claude Code: 24 tools, Droid: minimal tools |
| Token / cost data | Token counts, cost ratios | Codex CLI 72K, Claude Code 235K, 3.3x ratio |
| Architecture details | Layers, components, flows | Droid: 3-layer prompt (tool desc / sys prompt / sys notice) |
| Quotes / claims | Notable statements | "花在工具优化上的时间多于prompt优化" |
| Caveats / controversies | Limitations, counterpoints | Droid benchmark strong but code quality disputed |

Flag any data in the script that does NOT appear in the source document — these may need to be omitted or noted.

### Phase 3: Slide Planning — 规划幻灯片结构

This is the most critical phase. Map each script section to one or more slides. Produce a **slide plan table**:

```
| Slide # | Script Section | Type | Core Message | Key Data | Chart? | Animation |
|---------|---------------|------|-------------|----------|--------|-----------|
| 1 | S1 | title | 模型只是一半 | — | — | appear |
| 2 | S1 | placeholder+metric | TB 2.0 benchmark | 101 agents | — | countUp |
| 3 | S1 | data-comparison | 同模型分差 12 分 | 58.0 vs 69.9 | — | countUp |
| 4 | S2 | key-point+list | 脚手架定义 | 4 维度 | — | revealGroup |
| 5 | S3 | placeholder | Terminus 2 基线 | — | — | appear |
| 6 | S3 | bar-chart | 脚手架增益 5-10pp | 4 data rows | 双色堆叠条形图 | growBar |
| ... | ... | ... | ... | ... | ... | ... |
```

**Planning rules:**

1. **Section → Slide mapping depends on density:**
   - `compact`: 1 slide per section by default. Only split if section has 2+ genuinely distinct points.
   - `rich`: Split freely. A section with comparison + data + conclusion can become 2-3 slides.

2. **Chart/visualization decision happens HERE**, not during writing. For each slide with quantitative data, decide now:
   - Does this need a chart? What type?
   - Or are big numbers + labels sufficient?
   - See "Chart Specification Guide" below.

3. **Animation decision happens HERE**. For each slide, assign:
   - Which elements get fragment animations?
   - What animation types (countUp, growBar, etc.)?
   - See "Animation Specification Guide" below.

4. **Narrative rhythm check:**
   - Alternate slide types. Never 3+ of the same type consecutively.
   - Insert `key-point` dividers between major topic groups.
   - Start with `title`, end with `key-point`.

5. **Slide count check:**
   - `compact`: 15-20 slides for a 10-12 minute talk
   - `rich`: 20-28 slides for a 10-12 minute talk
   - If over budget, merge. If under, consider splitting data-heavy sections.

### Phase 4: Data Population — 填充数据

For each slide in the plan, populate ALL fields:

1. **标题** — States the TAKEAWAY, not the topic.
   - BAD: "脚手架数据" / "Token 对比" / "关键发现"
   - GOOD: "脚手架增益 5-10 分" / "Codex CLI Token 效率领先 3.3 倍" / "同模型分差 12 分"

2. **正文** — 1-2 sentences with specific insight (required in `rich`, optional in `compact`).
   - BAD: "以下是相关对比数据" / "这里展示了排名"
   - GOOD: "5-10 个百分点的增益，足以把排名从中游拉到前三"

3. **Data fields** — Extract EXACT numbers from source. Never round. Never invent.

4. **图表** — Full chart specification (see Chart Specification Guide).

5. **动画** — Fragment animation directives (see Animation Specification Guide).

6. **布局** — Layout treatment hint (see Layout Treatment Guide).

7. **结论** — Data-driven takeaway (required in `rich`, optional in `compact`).

### Phase 5: Consistency Review — 一致性检查

Before writing the file, run these checks:

1. **Coverage:** Every script section has ≥1 slide. No orphan topics.
2. **No fabrication:** Every number traces to the source document.
3. **Rhythm:** Slide types alternate. No 3+ consecutive same-type.
4. **Density:** Each slide meets the min data points for its type and density mode.
5. **Charts:** Every slide with ≥3 quantitative data points has a chart spec.
6. **Animations:** Every data slide has animation directives. Every big number has `countUp`. Every bar has `growBar`.
7. **Titles:** No generic titles. Every title states a takeaway.

### Phase 6: Write Output — 写入文件

Write the complete `slides.md` to `--output` path. Include:
- A header comment with metadata (density mode, slide count, source files)
- The slide plan table as an HTML comment at the top
- All slides with full field specifications

---

## Chart Specification Guide

Every slide with quantitative data MUST include a `图表` field that specifies exactly what visualization to render. The `/web-ppt` skill needs this to choose between CSS bars, ECharts, big numbers, etc.

### Chart Types

| Chart Type | Keyword | When to Use | slides.md Notation |
|------------|---------|------------|-------------------|
| Big number + micro bar | `大数字` | 2-4 standalone metrics (DataComparison) | `图表: 大数字 + 微型进度条` |
| Horizontal bar chart | `横向条形图` | Ranking 3-8 items by score | `图表: 横向条形图` |
| Stacked dual-color bar | `堆叠双色条形图` | Before/after or baseline+gain | `图表: 堆叠双色条形图（灰色=基线, 绿色=增益）` |
| Area/size comparison | `面积对比` | Disproportionate values (e.g., 72K vs 2M) | `图表: 面积对比（圆形）` |
| Ranked list with bars | `排名列表` | Head-to-head with score + bar per item | `图表: 排名列表 + 横向条` |
| Side-by-side bar groups | `分组条形图` | Multi-dimension comparison (ECharts) | `图表: 分组条形图（ECharts）` |
| None (text only) | `无` | Conceptual slides, definitions | (omit 图表 field) |

### Chart Decision Tree

```
Does the slide have quantitative data?
  No → omit 图表 field
  Yes ↓

How many data points?
  2-4 standalone metrics → 大数字 + 微型进度条
  2-4 items with before/after → 堆叠双色条形图
  3-8 items ranked by one dimension → 横向条形图
  3-8 items ranked with identity (name+score) → 排名列表 + 横向条
  8+ data points or multi-series → 分组条形图（ECharts）
  2 values with huge ratio (>5x) → 面积对比
```

### Chart Specification Format

The `图表` field uses a structured notation:

```markdown
- 图表:
  - 类型: 横向条形图
  - 数据:
    | 标签 | 值 | 颜色提示 |
    |------|-----|---------|
    | Simple Codex | 75.1 | 正向色（最高分） |
    | Droid (Opus 4.6) | 69.9 | 中性色 |
    | Junie CLI (Flash) | 64.3 | 中性色 |
    | Claude Code | 58.0 | 负向色（低于基线） |
  - 基准线: 62.9（Terminus 2 基线，虚线标注）
  - 排序: 降序
  - 标签位置: 左侧
  - 值位置: 条形末端右侧
```

For stacked bars:
```markdown
- 图表:
  - 类型: 堆叠双色条形图
  - 数据:
    | 模型 | 基线 | 增益 | 总分 |
    |------|------|------|------|
    | GPT-5.3 | 64.7 | +10.4 | 75.1 |
    | Opus 4.6 | 62.9 | +7.0 | 69.9 |
  - 基线颜色: 中性色（灰）
  - 增益颜色: 正向色（绿）
```

For big numbers:
```markdown
- 图表:
  - 类型: 大数字 + 微型进度条
  - 数据:
    - 最低分: 58.0（负向色，进度条 58/100）
    - 最高分: 69.9（正向色，进度条 70/100）
  - 进度条最大值: 100
```

---

## Animation Specification Guide

Every slide MUST include a `动画` field that tells `/web-ppt` how to reveal content progressively. This maps directly to the fragment animation system (BP-16 in web-ppt).

### Animation Types

| Type | Keyword | Visual Effect | Use For |
|------|---------|-------------|---------|
| Fade in + slide up | `appear` | opacity 0→1, y 16→0 | Default for text, cards, diagrams |
| Number count up | `countUp` | Counts from 0 to target | Big metric numbers (58.0, 75.1, etc.) |
| Bar growth | `growBar` | Width grows from 0% to target | Horizontal bars, progress bars |
| Spotlight highlight | `highlight` | Others dim to 30%, target brightens | Walking through items one by one |
| Group reveal | `revealGroup` | Group appears together with stagger | Card groups, list items |

### Animation Assignment Rules

| Slide Type | Fragment 0 (immediate) | Fragment 1+ (click to reveal) |
|------------|----------------------|------------------------------|
| title | All content | — (no fragments) |
| key-point | All content | — (no fragments) |
| data-comparison | Title + body | Each metric: `countUp` per number, one fragment per metric |
| bar-chart | Title + body | All bars grow together: `growBar` |
| comparison | Title + body | Each column: `revealGroup`, one fragment per column |
| grid | Title | All items: `revealGroup` |
| player-card | Left panel (rank + name + score `countUp`) | Right panel: `revealGroup` for features, `growBar` for chart |
| diagram | Title + body | Each step: `appear`, one fragment per step |
| list | Title | Each item: `appear`, one fragment per item |
| placeholder | Title + placeholder box | Side metrics: `countUp` |
| card-grid | Title | All cards: `revealGroup` |

### Animation Specification Format

The `动画` field in slides.md:

```markdown
- 动画:
  - fragments: 3
  - 步骤:
    - F0: 标题 + 正文（appear）
    - F1: 最低分 58.0（countUp）+ 微型进度条（growBar）
    - F2: 最高分 69.9（countUp）+ 微型进度条（growBar）+ 结论文字（appear）
```

For bar charts:
```markdown
- 动画:
  - fragments: 2
  - 步骤:
    - F0: 标题 + 正文（appear）
    - F1: 所有条形同时生长（growBar）+ 基准线出现 + 值标签（appear）
```

For comparison slides:
```markdown
- 动画:
  - fragments: 3
  - 步骤:
    - F0: 标题 + 正文（appear）
    - F1: 左列「运行时搜索」（revealGroup）
    - F2: 右列「语义索引」（revealGroup）
```

### Key Animation Rules

- **Every big number MUST have `countUp`** — static numbers waste the most powerful attention-grabbing moment.
- **Every bar/progress indicator MUST have `growBar`** — bars growing from zero dramatically demonstrates relative differences.
- **Title + body are ALWAYS in F0** — never show an empty slide.
- **Max 6 fragments per slide** — too many clicks breaks flow.
- **`compact` mode prefers fewer fragments** (1-2 per slide). `rich` mode can use 2-4.

---

## Layout Treatment Guide

Every non-title, non-key-point slide SHOULD include a `布局` field that hints at the visual treatment. This guides `/web-ppt` in choosing between cards, tables, accent borders, etc. (ref BP-12).

### Available Treatments

| Treatment | Keyword | When to Use |
|-----------|---------|------------|
| White cards | `卡片` | Grouped items with title + detail (max 50% of slides) |
| Table rows | `表格` | Side-by-side comparison with multiple dimensions |
| Accent border | `边框高亮` | Feature list without card weight |
| Borderless grid | `无边框网格` | Category overview, light visual weight |
| Timeline | `时间线` | Ordered steps, process flow |
| Inline highlights | `行内高亮` | 2-3 short key-value pairs, no container needed |
| Big number panel | `大数字面板` | 2-4 hero metrics dominating the slide |

### Treatment Decision

```
Is it a ranked list or score comparison?
  → 表格 or 横向条形图 (let chart dominate, minimal layout)

Is it a multi-dimension feature comparison?
  → 表格 (rows = dimensions, columns = subjects)

Is it a category overview (4-6 items)?
  → 无边框网格 (lightweight, no cards)

Is it a process or ordered steps?
  → 时间线

Is it 2-3 key-value metrics?
  → 行内高亮 or 大数字面板

Is it grouped items with substantial detail per item?
  → 卡片 (but track: max 50% of content slides should use cards)
```

---

## Output Format: slides.md

### Document Structure

```markdown
<!-- Density: rich | Slides: 23 | Script: voiceover.md | Source: full.md -->
<!-- Slide Plan:
| # | Section | Type | Core Message | Chart | Animation |
|---|---------|------|-------------|-------|-----------|
| 1 | S1 | title | 模型只是一半 | — | appear |
| 2 | S1 | placeholder+metric | TB 2.0 benchmark | 大数字 | countUp |
| ... | ... | ... | ... | ... | ... |
-->

# [Presentation Title]

---

## Slide 1: 标题页
- type: title
- 标题: ...
- 副标题: ...
- 标注: ...
- 动画: appear（整体淡入）

---

## Slide 2: ...
- type: data-comparison
- 标题: ...
- 正文: ...
- 数据: ...
- 图表: ...
- 动画: ...
- 布局: ...
- 结论: ...

---
...
```

### Available Slide Types

| Type | When to Use | Required Fields |
|------|------------|----------------|
| `title` | Opening slide | 标题, 副标题, 标注 |
| `data-comparison` | 2-4 metrics with exact numbers | 标题, 数据, 图表, 动画, 结论 |
| `key-point` | Section divider, one big takeaway | 标题, 副标题 |
| `comparison` | Side-by-side feature comparison | 标题, 列数据, 布局, 动画 |
| `grid` | 4-6 item overview | 标题, 网格, 布局, 动画 |
| `bar-chart` | Score/performance ranking | 标题, 图表, 动画 |
| `player-card` | Individual item deep-dive | 标题, 分数, 特性, 图表(optional), 动画 |
| `diagram` | Process flow / architecture | 标题, 图示, 动画 |
| `list` | Ordered recommendations / steps | 标题, 列表, 动画 |
| `placeholder` | Screenshot/image placeholder | 标题, 占位图 |
| `card-grid` | 2-4 labeled cards | 标题, 卡片, 布局, 动画, 结论 |

### Field Reference

```markdown
## Slide N: [Section · Topic]
- type: [slide-type]
- 标题: [Takeaway, not topic]
- 副标题: [Secondary heading]
- 正文: [1-2 sentence insight, NOT generic filler]
- 标注: [Date, source, footnote]

## Data fields
- 数据:
  - [label]: [exact value]（[正向色/负向色/中性色]）
- 结论: [Data-driven takeaway sentence]
- 关键数字: [One standout metric]
- 图表数据:
  | Column1 | Column2 | ... |
  |---------|---------|-----|
  | data    | data    | ... |

## Chart specification
- 图表:
  - 类型: [横向条形图/大数字+微型进度条/堆叠双色条形图/面积对比/排名列表/分组条形图]
  - 数据: [table or list]
  - 排序: [升序/降序]
  - 基准线: [value + description, optional]
  - 颜色: [semantic color assignment]

## Animation specification
- 动画:
  - fragments: [number]
  - 步骤:
    - F0: [what's immediately visible]（[appear/countUp/growBar]）
    - F1: [first click reveal]（[animation type]）
    - F2: ...

## Layout treatment
- 布局: [卡片/表格/边框高亮/无边框网格/时间线/行内高亮/大数字面板]

## Structure fields (type-specific)
- 占位图: [Description of what goes here]
- 卡片:
  - [Item 1]
  - [Item 2]
- 左列/右列/中列:
  - 名称: [Column name]
  - 代表: [Representative example]
  - 要点: [Key differentiator]
  - 细节: [Supporting detail]
  - 结果: [Outcome/evidence]
- 网格 (NxM):
  1. [Label] — [Description]
- 图示 ([description]):
  1. [Step] — [Explanation]
- 列表:
  1. [Item with description]
- 特性:
  - [Feature]: [Detail]
- 对比图表:
  | Col1 | Col2 |
  |------|------|
  | data | data |
- 侧注: [Marginal note]
- 解释: [Why this matters]
- 争议: [Counterpoint]
- 差值: [Delta + color]
- 增益: [Gain metric]
- 警告: [Caveat callout]
```

---

## Slide Type Selection Guide

```
Is this an opening or section divider?
  → title (opening) or key-point (divider)

Does the section present 2-4 standalone metrics?
  → data-comparison（图表: 大数字 + 微型进度条）

Does the section compare 2-3 alternatives side by side?
  → comparison（布局: 表格 or 卡片）

Does the section rank or score multiple items?
  → bar-chart（图表: 横向条形图 or 堆叠双色条形图）

Does the section deep-dive one specific item?
  → player-card（图表: 排名列表 + 横向条, optional）

Does the section list 4-6 categories or dimensions?
  → grid（布局: 无边框网格）

Does the section describe a process or architecture?
  → diagram（动画: 逐步 appear）

Does the section give ordered recommendations?
  → list（动画: 逐条 appear）

Does the section reference a screenshot or demo?
  → placeholder

Does the section list 2-4 grouped items with a conclusion?
  → card-grid（布局: 卡片）
```

---

## Slide Mapping Principles

### One Core Message Per Slide

Each slide delivers exactly ONE takeaway. If a script section makes two distinct points, split into two slides.

### Narrative Rhythm

Alternate slide types to maintain visual variety:

```
Title → Data → Data → KeyPoint → Comparison → Chart → KeyPoint → PlayerCard → ...
```

Rules:
- Never have 3+ consecutive slides of the same type
- Insert `key-point` slides between major sections as dividers
- Start with `title`, end with `key-point` (closing message)

### Data Extraction Priority

When populating slide data from the source document:

1. **Exact numbers first** — scores, percentages, counts
2. **Rankings and comparisons** — who is #1, what's the delta
3. **Specific names** — product names, model names, paper names
4. **Supporting evidence** — benchmark methodology, conditions

---

## Complete Example: compact vs rich

Given this script section:

> 看一下数据。GPT-5.3 配合 Terminus 2 得到 64.7 分，加上 Simple Codex 脚手架变成 75.1 分，多了 10.4 分。Opus 4.6 配合 Terminus 2 得到 62.9 分，加上 Droid 脚手架变成 69.9 分，多了 7 分。
> 5 到 10 个百分点的脚手架增益，足以把排名从中游拉到前三。

### compact output:

```markdown
## Slide 6: 脚手架增益 5-10 分
- type: bar-chart
- 标题: 脚手架增益 5-10 分
- 图表:
  - 类型: 堆叠双色条形图
  - 数据:
    | 模型 | 基线 (Terminus 2) | 增益 | 总分 |
    |------|------------------|------|------|
    | GPT-5.3 | 64.7 | +10.4 | 75.1 (Simple Codex) |
    | Opus 4.6 | 62.9 | +7.0 | 69.9 (Droid) |
  - 基线颜色: 中性色
  - 增益颜色: 正向色
- 动画:
  - fragments: 2
  - 步骤:
    - F0: 标题（appear）
    - F1: 双色条形图生长（growBar）+ 增益数字（countUp）
```

### rich output:

```markdown
## Slide 6: 脚手架增益数据
- type: bar-chart
- 标题: 5-10 分增益，从中游到前三
- 正文: 同一个模型搭配不同脚手架，分数差距可达 10 个百分点以上
- 图表:
  - 类型: 堆叠双色条形图
  - 数据:
    | 模型 | 基线 (Terminus 2) | 增益 | 总分 | 最佳脚手架 |
    |------|------------------|------|------|-----------|
    | GPT-5.3 | 64.7 | +10.4 | 75.1 | Simple Codex |
    | Opus 4.6 | 62.9 | +7.0 | 69.9 | Droid |
  - 基线颜色: 中性色（灰）
  - 增益颜色: 正向色（绿）
  - 基准线: 62.9（Terminus 2 + Opus 4.6 基线，虚线）
  - 排序: 按总分降序
  - 标签位置: 左侧（模型名）
  - 值位置: 条形末端（总分 + 增益标注）
- 动画:
  - fragments: 3
  - 步骤:
    - F0: 标题 + 正文（appear）
    - F1: 基线部分条形生长（growBar）+ 基准线出现
    - F2: 增益部分条形生长（growBar）+ 增益数字（countUp）+ 结论（appear）
- 结论: 脚手架工程可以带来 5-10 分的增益，足以改变排名位置
```

---

## Anti-Patterns (NEVER DO)

- **Never generate a slide with only a title.** Every slide must have substantive data.
- **Never use generic titles** like "数据对比" or "关键发现". Titles state the specific takeaway.
- **Never use placeholder values** like "XX%", "N/A", "待填".
- **Never invent numbers.** Every metric must trace back to the source document.
- **Never skip a topic from the script.** If the script mentions it, there must be a slide.
- **Never add topics not in the script.** The script is the authoritative content selector.
- **Never omit the `图表` field on a slide with ≥3 quantitative data points.**
- **Never omit the `动画` field on any non-title, non-key-point slide.**
- **Never use `countUp` on text or `appear` on a big number.** Match animation type to content type.
- **Never assign identical animation (all `appear`) to every slide.** Use the animation type table.
- **Never put detailed spoken narration into the slide body.** Slides capture DATA; narration is in the script.

---

## Quality Checklist

Before writing the output file, verify:

- [ ] Density mode is stated in the header comment
- [ ] Slide plan table is included as HTML comment
- [ ] Every script section has corresponding slide(s)
- [ ] No script topic missing; no extra topic added
- [ ] Every slide has a specific, non-generic takeaway title
- [ ] Every data field contains exact values from the source document
- [ ] Slide types alternate — no 3+ consecutive same type
- [ ] First slide = `title`, last slide = `key-point`
- [ ] `key-point` dividers separate major topic groups
- [ ] Slide count within density range (compact: 15-20, rich: 20-28)
- [ ] **Every slide with quantitative data has a `图表` field with type + data**
- [ ] **Every non-title/key-point slide has a `动画` field with fragments + steps**
- [ ] **Every big number specifies `countUp` animation**
- [ ] **Every bar/progress element specifies `growBar` animation**
- [ ] **`布局` field present on comparison, grid, and card-grid slides**
- [ ] **Max 50% of content slides use `卡片` layout** (track card count)
- [ ] Color hints (正向色/负向色/中性色) used for all data with sentiment
- [ ] All text in specified `--lang`

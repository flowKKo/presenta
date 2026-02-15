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
| `--density` | No | `rich` | Content density: `compact` (minimal) or `rich` (comprehensive). See Content Density section |
| `--lang` | No | `zh` | Language for slide content |

Positional shorthand: `/slides-gen voiceover.md full.md` → script=voiceover.md, source=full.md

---

## Content Density Modes

The `--density` flag controls how much information goes into each slide, and how many slides are generated per script section.

### `compact` — Minimal Mode

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
| `body` field | Often omitted — title + data speaks for itself |
| `conclusion` field | Short phrase (≤10 characters), or omitted |
| Player card features | 3 max |
| List items | 3 max |

**Compact principle:** Each slide retains only information that cannot be understood without looking at the slide. Text that the speaker can explain verbally should NOT appear on the slide. White space > information overload.

### `rich` — Comprehensive Mode

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
| `body` field | Required on every non-title slide |
| `conclusion` field | Full sentence with data reference |
| Player card features | 4-5 + comparison chart |
| List items | 4-5 with descriptions |

**Rich principle:** Each slide is a self-contained information unit. Even without narration, the reader can fully understand the content. More detail is better, but each slide still conveys only ONE core message.

### Content Density Table (per slide type)

| Slide Type | compact min-max | rich min-max | compact visual elements | rich visual elements |
|------------|----------------|-------------|------------------------|---------------------|
| data-comparison | 2 metrics | 2-4 metrics | 1 (big number panel) | 1-2 (big numbers + image/diagram) |
| bar-chart | 2-4 rows | 4-8 rows | 1 (bar chart) | 1-2 (bar chart + metric cards/image) |
| comparison | 2 cols × 2-3 rows | 2-3 cols × 3-5 rows | 1 (comparison table) | 1-2 (comparison + image) |
| grid | 4 items (title only) | 4-6 items (title + description) | 1 (grid) | 1-2 (grid + image) |
| player-card | score + 2-3 features | score + 4-5 features + chart | 1 | 2 (features + chart/image) |
| list | 3 items (short) | 3-5 items (with descriptions) | 1 (list) | 1-2 (list + image/diagram) |
| diagram | 3 steps | 3-5 steps + side notes | 1 (diagram) | 1-2 (diagram + image) |
| card-grid | 2-3 cards | 3-4 cards + conclusion | 1 (card group) | 1-2 (cards + chart/image) |
| **block-slide** | 2 elements | 2-4 elements | 2 (chart/diagram + image) | 2-4 (multiple charts + images + text blocks) |

### Multi-Element Requirements for Information-Rich Sections

**When a script section meets ANY of the following conditions, the corresponding slide MUST use multi-element composition (i.e., `block-slide` type or single type with companion element descriptions):**

1. **Contains 2+ independent data sets** (e.g., both ranking data AND trend data)
2. **Has both quantitative data AND qualitative explanation** (e.g., data + root cause analysis text)
3. **Involves product/UI screenshots + related data** (e.g., product screenshot + performance metrics)
4. **Covers multi-dimensional comparison** (e.g., feature comparison + performance data + cost data)
5. **Section length exceeds 10% of the overall script** (long section = high information density = needs more visual elements)

**Minimum standards for multi-element composition:**
- `compact` mode: information-rich sections need at least 2 visual elements
- `rich` mode: information-rich sections need at least 2 visual elements, preferably 3

---

## Visual Mandate — Every Slide Must Have Visual Elements

**Core rule: Unless it is a pure text quote (key-point) or title page (title), every slide MUST contain at least one visual element. Information-rich slides SHOULD contain 2 or more visual elements.**

Visual elements include:
- **Data charts** — horizontal bar charts, big numbers + micro progress bars, stacked dual-color bars, area comparisons, etc.
- **Structural diagrams** — flowcharts, architecture diagrams, hierarchy diagrams, comparison matrices
- **Image placeholders** — screenshots, product interfaces, illustrations (currently rendered as dashed boxes with detailed descriptions)
- **Text blocks** — title + body, bullet lists, quote blocks

### Visual Element Assignment Decision Tree

```
Does this slide have quantitative data?
  Yes → MUST have a data chart (chart field)
  No ↓

Does this slide describe architecture/process/comparison relationships?
  Yes → MUST have a structural diagram (diagram field)
  No ↓

Does this slide reference a screenshotable interface/product?
  Yes → MUST have an image placeholder (placeholder-image field)
  No ↓

Is this slide a pure concept/quote/title?
  Yes → May have no visual element (only title and key-point types)
  No → MUST design a supporting visual element (concept diagram, icon grid, relationship graph, etc.)
```

**Exceptions (slide types allowed without visual elements):**
- `title` — title page, pure text is sufficient
- `key-point` — quote/transition page, large centered text is sufficient

**All other slide types MUST have at least one of: `chart`, `diagram`, or `placeholder-image`.**

### Visual Density Tiers

Different information densities require different numbers of visual elements:

| Information Density | Visual Element Count | Example |
|--------------------|---------------------|---------|
| Light (single concept or metric) | 1 | One big number panel |
| Medium (multi-dimensional data or comparison) | 2 | One chart + one image placeholder |
| Rich (complex analysis or multi-angle argument) | 2-3 | One chart + one diagram + one text block |
| Dashboard-style (comprehensive overview) | 3-4 | Two charts + one metric grid + one image |

**Visual density decision rules:**
- Does this section have **2+ sets** of data from different angles? → At least 2 visual elements
- Does this section involve both **quantitative data + qualitative description**? → Chart + text/diagram
- Does this section reference **external screenshots/interfaces** AND have its own data? → Placeholder-image + chart
- Can a single chart fully express ALL information in this section? → If not, MUST add more visual elements

---

## Multi-Element Slide Composition

**Core concept: A slide is not limited to a single element. Information-rich sections should combine titles, charts, images, text blocks, and other elements on one page to form a visually complete information unit.**

### When to Use Multi-Element Composition

| Scenario | Traditional approach (single element) | Multi-element composition |
|----------|--------------------------------------|--------------------------|
| Introduce product features + show interface | Two slides: one list + one screenshot | One slide: feature list on left + screenshot placeholder on right |
| Show data trend + interpret conclusion | Two slides: one line chart + one conclusion | One slide: line chart on top + conclusion text block below |
| Compare two data sets | One dual-color bar chart | One slide: bar chart on left + key metric big numbers on right |
| Architecture overview + core module details | Two slides | One slide: central architecture diagram + surrounding module cards |
| Market data + product screenshot | Two slides | One slide: pie/bar chart on left + product screenshot placeholder on right |

### Element Combination Patterns

The following are common multi-element combinations. slides.md MUST clearly specify which pattern to use:

**Two-element combinations (most common):**

| Combination | Layout Suggestion | Use Case |
|-------------|------------------|----------|
| Chart + image placeholder | Side by side (6:4) or top-bottom (6:4) | Data + product/scene display |
| Chart + text block | Chart left, text right (7:3) or chart top, text bottom | Data + deep analysis |
| Chart + metric cards | Chart on left + 2-3 metric cards on right | Trend + key numbers |
| Diagram + image placeholder | Side by side (5:5) | Process/architecture + real photo/screenshot |
| Two charts | Side by side (5:5) or top-bottom | Two related but different-dimension data sets |

**Three-element combinations (for rich content):**

| Combination | Layout Suggestion | Use Case |
|-------------|------------------|----------|
| Title block + chart + image | Title at top + chart bottom-left + image bottom-right | Compound info page with heading |
| Chart + metric cards + image | Large chart on left + metrics top-right + image bottom-right | Data dashboard |
| Two charts + text block | Two charts side by side on top + conclusion text below | Multi-angle data comparison + summary |
| Diagram + chart + image | Three columns equal or golden ratio | Process + data + real scene |

**Four-element combinations (dashboard/overview pages):**

| Combination | Layout Suggestion | Use Case |
|-------------|------------------|----------|
| Two charts + image + text block | 2×2 grid | Comprehensive overview dashboard |
| Metric cards + chart + diagram + image | Metrics at top + chart/diagram in middle + image at bottom | Full analysis page |

### Layout Pattern Labels

In slides.md, multi-element slides MUST include a `layout-pattern` field specifying spatial arrangement:

| Pattern | Keyword | Description |
|---------|---------|-------------|
| Top-bottom split | `top-bottom` | Primary element on top (60%), secondary below (35%) |
| Side by side | `side-by-side` | Primary element on left (55-60%), secondary on right (35-40%) |
| Golden ratio | `golden-ratio` | Large element occupies 62%, sidebar 32% (split into two sections) |
| Three columns | `three-columns` | Three elements each at 30%, with 3% gaps |
| 2×2 dashboard | `dashboard` | Four elements in equal 2×2 grid |
| Header + body | `header-body` | Narrow strip at top (title/metrics, 18%), main body below (75%) |
| L-shape layout | `L-shape` | Large element at top-left 60%, two small elements on right and bottom |

### Minimum Element Size Constraints

Every visual element has minimum size requirements — below these sizes content becomes unreadable:

| Element Type | Min Width | Min Height | Notes |
|-------------|-----------|------------|-------|
| Chart (bar/line/pie) | 40% | 40% | Charts need enough space for labels and data |
| Big number metric | 25% | 20% | Number + label + micro progress bar |
| Image placeholder | 25% | 25% | Images smaller than this look like broken thumbnails |
| Text block | 25% | 15% | Must fit at least title + 1-2 lines of body |
| Diagram (flow/architecture) | 35% | 30% | Nodes and connections need space |
| Metric card group | 30% | 20% | At least 2 cards |

### Multi-Element Notation Format in slides.md

```markdown
## Slide 8: Scaffold Impact on Model Performance
- type: block-slide
- title: 5-10 Point Gains, From Mid-Pack to Top Three
- element-count: 3
- layout-pattern: golden-ratio
- elements:
  - Element 1 (primary chart, left 62%):
    - type: stacked dual-color bar chart
    - data: [per Phase 4 chart spec]
    - appearance: [...]
    - animation-spec: [...]
  - Element 2 (metric cards, top-right 32%×45%):
    - type: big numbers + micro progress bar
    - data: max gain +10.4, min gain +7.0
    - appearance: [...]
  - Element 3 (scene image, bottom-right 32%×47%):
    - type: placeholder-image
    - title: "Score distribution of scaffold tools in Terminal-Bench leaderboard"
    - expected-content: [...]
- animation:
  - fragments: 3
  - steps:
    - F0: title (appear)
    - F1: bar chart growth (growBar) + big number count (countUp)
    - F2: scene image fade in (appear)
```

---

## Visual Description Standard

**Every visual element (chart, diagram, placeholder-image) MUST include two detailed descriptions:**

### (a) Appearance — What It Looks Like

Must be specific enough that a frontend developer can render it without seeing the raw data:

| Visual Type | Appearance Description Must Include |
|-------------|-------------------------------------|
| Horizontal bar chart | Number of bars, each bar's label, value, color, length ratio, whether there's a baseline, label and value positions |
| Big number | Exact numeric value, font size tier, color (positive/negative/neutral), micro progress bar width ratio and color below |
| Stacked dual-color bar | Baseline segment color and width, gain segment color and width, total width, annotation position |
| Area comparison | Relative size ratio of circles/squares, colors, label positions, value annotations |
| Flowchart/architecture | Node count, text per node, connection method (arrows/lines), layout direction (horizontal/vertical), layer relationships |
| Comparison matrix/table | Row count, column count, header content, cell content, highlight rules, separator styles |
| Image placeholder | Placeholder box aspect ratio (e.g., 16:9, 4:3, 1:1), text description inside box, dashed border style, background color, description of expected real content |

### (b) Animation Spec — How It Moves

Must be specific enough that a frontend developer can write the animation code directly:

| Animation Type | Animation Spec Must Include |
|---------------|---------------------------|
| countUp | Start value (usually 0), target value, duration, easing function, whether to use thousand separators |
| growBar | Start width (0%), target width (percentage), duration, easing function, whether there's a spring effect |
| appear | Initial state (opacity:0, y:16px), final state, duration, whether there's stagger delay |
| highlight | Target opacity for other elements (0.3), highlight element opacity (1.0), transition time |
| revealGroup | Number of elements in group, stagger interval, entrance method per element |
| Placeholder entrance | How dashed box appears (fade in/slide from edge), timing of internal label text appearance |

### Description Format Examples

```markdown
- chart:
  - type: horizontal bar chart
  - appearance: >
      4 horizontal bars arranged top to bottom. Each bar has a label on the left (w-32, right-aligned,
      text-base, textSecondary color), a colored bar in the middle (h-8, rounded-r-lg on right end),
      and a value on the right (text-lg, font-semibold).
      Bar 1: "Simple Codex" → green bar (width 100%) → "75.1"
      Bar 2: "Droid" → blue-grey bar (width 93%) → "69.9"
      Bar 3: "Junie CLI" → blue-grey bar (width 86%) → "64.3"
      Bar 4: "Claude Code" → red bar (width 77%) → "58.0"
      A vertical dashed line (border-dashed) at the 62.9 position, labeled "Terminus 2 baseline".
      Gap between bars: gap-3. Entire group vertically centered in content area.
  - data: [same as table above]
  - animation-spec: >
      On F1 trigger: all 4 bars grow from width 0% to target width simultaneously,
      duration 0.8s, easing [0.16, 1, 0.3, 1] (fast start, slow end, slight spring).
      During bar growth, right-side values countUp from 0 to target values in sync.
      Baseline dashed line fades in (opacity 0→1, 0.3s) when bars grow past the 62.9 position.
      0.05s stagger delay between bars, triggering top to bottom.
```

```markdown
- placeholder-image:
  - appearance: >
      Dashed rectangle with 16:9 aspect ratio, occupying 60% width of the slide content area.
      Border: 2px dashed, color rgba(0,0,0,0.15), border-radius 12px.
      Background: rgba(0,0,0,0.02), slightly grey to differentiate from slide background.
      Centered text inside: "Terminal-Bench 2.0 Leaderboard Screenshot",
      font-size text-lg, color rgba(0,0,0,0.25), font-style italic.
      Small icon hint in top-right corner (16x16 image icon, rgba(0,0,0,0.2)).
  - expected-content: Terminal-Bench 2.0 official website leaderboard page screenshot,
    showing the complete top 10 agent ranking table,
    with highlight boxes on the Claude Opus 4.6 entries (58.0 and 69.9)
  - animation-spec: >
      F0 immediate display: dashed box fades in from opacity 0 → 1, while sliding up from y:12px to y:0,
      duration 0.5s, easing ease-out. Text inside fades in with 0.2s delay after box appears.
```

```markdown
- diagram:
  - type: 3-layer stacked architecture
  - appearance: >
      3 rectangles stacked vertically, from top to bottom:
      Layer 1 (top): light blue-grey background (accentNeutral/10), title "Tool Description",
        subtitle "Define capability specs", height ~60px, full width, border-radius 8px.
      Layer 2 (middle): slightly darker blue-grey background (accentNeutral/15), title "System Prompt",
        subtitle "Set high-level goals", same height and style.
      Layer 3 (bottom): darkest blue-grey background (accentNeutral/25) + 3px green border on left for highlight,
        title "System Notice", subtitle "Inject critical directives at end", bold treatment for emphasis.
      gap-2 spacing between layers.
      Vertical arrow on the right (SVG, pointing top to bottom), labeled "Recency Bias →",
      font-size text-sm, italic, textCaption color.
      Overall width ~max-w-[70%], left-aligned.
  - animation-spec: >
      On F1 trigger: 3 layers appear top-to-bottom sequentially (appear), 0.15s interval between each.
      Each layer entrance: opacity 0→1 + y:12→0, duration 0.4s.
      After layer 3 appears, left green border grows from height 0 downward to full height (growBar style, 0.3s).
      Right arrow fades in 0.2s after all layers appear (opacity 0→1, 0.3s),
      arrow fade-in accompanied by scaleY:0.5 → scaleY:1 stretch effect.
```

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

### Phase 1: Script Analysis — Parse the Script

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

### Phase 2: Source Document Indexing — Index Source Data

Read the `--source` file completely. Build a **data catalog**:

| Category | What to Extract | Example |
|----------|----------------|---------|
| Scores / Rankings | Tool + model + score | Simple Codex + GPT-5.3 = 75.1 |
| Deltas / Gains | Before → after, delta | Terminus 2 62.9 → Droid 69.9, +7.0 |
| Feature comparisons | Tool × feature matrix | Claude Code: 24 tools, Droid: minimal tools |
| Token / cost data | Token counts, cost ratios | Codex CLI 72K, Claude Code 235K, 3.3x ratio |
| Architecture details | Layers, components, flows | Droid: 3-layer prompt (tool desc / sys prompt / sys notice) |
| Quotes / claims | Notable statements | "More time spent on tool optimization than prompt optimization" |
| Caveats / controversies | Limitations, counterpoints | Droid benchmark strong but code quality disputed |

Flag any data in the script that does NOT appear in the source document — these may need to be omitted or noted.

### Phase 3: Slide Planning — Plan Slide Structure

This is the most critical phase. Map each script section to one or more slides. Produce a **slide plan table**:

```
| Slide # | Script Section | Type | Core Message | Key Data | Element Count | Layout Pattern | Animation |
|---------|---------------|------|-------------|----------|---------------|---------------|-----------|
| 1 | S1 | title | The model is only half | — | 1 | — | appear |
| 2 | S1 | block-slide | TB 2.0 benchmark | 101 agents | 2 | side-by-side | countUp+appear |
| 3 | S1 | block-slide | Same model, 12-point gap | 58.0 vs 69.9 | 3 | golden-ratio | countUp+growBar |
| 4 | S2 | key-point | Scaffold definition | — | 1 | — | appear |
| 5 | S3 | block-slide | Terminus 2 baseline+gains | 4 rows+screenshot | 2 | side-by-side | growBar+appear |
| ... | ... | ... | ... | ... | ... | ... | ... |
```

**Planning rules:**

1. **Section → Slide mapping depends on density:**
   - `compact`: 1 slide per section by default. Only split if section has 2+ genuinely distinct points.
   - `rich`: Split freely. A section with comparison + data + conclusion can become 2-3 slides.

2. **Visual mandate check (CRITICAL):**
   - For each slide, confirm it has at least one visual element (chart / diagram / placeholder image).
   - Only `title` and `key-point` types are exempt.
   - If a slide has no quantitative data AND no screenshot reference AND no architecture/flow to diagram, ask: "Can I add a conceptual diagram, icon grid, or relationship graph?" If yes, add it. If truly impossible, convert to `key-point`.

3. **Multi-element composition check (CRITICAL):**
   - For each slide, ask: "Can this slide fully convey its information with just one element?"
   - If the section is information-rich (multiple data sets, screenshots combined with data, multi-dimensional comparison), **MUST use `block-slide` type**, combining 2-4 visual elements.
   - In `rich` mode, **at least 40% of content slides** should use multi-element composition (`block-slide`).
   - In `compact` mode, **at least 20% of content slides** should use multi-element composition.
   - A single chart often cannot fully express analytical insight — pairing it with key metrics, images, or explanatory text blocks dramatically improves expressiveness.

4. **Layout pattern assignment:**
   - Every multi-element slide MUST specify a layout pattern (top-bottom / side-by-side / golden-ratio / three-columns / dashboard / header-body / L-shape).
   - Adjacent multi-element slides should NOT use the same layout pattern.
   - A deck should use at least 3 different layout patterns.

5. **Chart/visualization decision happens HERE**, not during writing. For each slide with quantitative data, decide now:
   - Does this need a chart? What type?
   - Or are big numbers + labels sufficient?
   - **Does it need a second chart to show another dimension of data?**
   - See "Chart Specification Guide" below.

6. **Image placeholder decision happens HERE**. For slides referencing products, interfaces, or demos:
   - What screenshot/image would best support the content?
   - What exact content should the placeholder describe?
   - **Even if the slide doesn't directly reference a product/interface, consider: would a meaningful companion image enhance visual richness?**
   - See "Image & Placeholder Specification Guide" below.

7. **Animation decision happens HERE**. For each slide, assign:
   - Which elements get fragment animations?
   - What animation types (countUp, growBar, etc.)?
   - **Multi-element slides should use layered reveal: primary elements first, then supporting elements.**
   - See "Animation Specification Guide" below.

8. **Narrative rhythm check:**
   - Alternate slide types. Never 3+ of the same type consecutively.
   - Insert `key-point` dividers between major topic groups.
   - Start with `title`, end with `key-point`.
   - **Multi-element block-slides and single-element slides should alternate — avoid using block-slide for every slide.**

9. **Slide count check:**
   - `compact`: 15-20 slides for a 10-12 minute talk
   - `rich`: 20-28 slides for a 10-12 minute talk
   - If over budget, merge. If under, consider splitting data-heavy sections.
   - **Multi-element composition can pack more information into fewer slides — prefer multi-element layouts over spreading content across many pages.**

### Phase 4: Data Population — Populate Data

For each slide in the plan, populate ALL fields:

1. **title** — States the TAKEAWAY, not the topic.
   - BAD: "Scaffold Data" / "Token Comparison" / "Key Findings"
   - GOOD: "Scaffold Gain: 5-10 Points" / "Codex CLI Token Efficiency Leads 3.3x" / "Same Model, 12-Point Gap"

2. **body** — 1-2 sentences with specific insight (required in `rich`, optional in `compact`).
   - BAD: "Below is the comparison data" / "This shows the ranking"
   - GOOD: "A 5-10 percentage point gain is enough to move from mid-pack to top 3"

3. **Data fields** — Extract EXACT numbers from source. Never round. Never invent.

4. **chart / diagram / placeholder-image** — MUST include for every non-title/key-point slide. Include:
   - `appearance`: Detailed enough for a developer to implement without seeing the original data (see Visual Description Standard).
   - `animation-spec`: Exact animation behavior — timing, easing, stagger, trigger conditions (see Visual Description Standard).

5. **animation** — Fragment animation directives for the full slide (see Animation Specification Guide).

6. **layout** — Layout treatment hint (see Layout Treatment Guide).

7. **conclusion** — Data-driven takeaway (required in `rich`, optional in `compact`).

### Phase 5: Consistency Review — Consistency Check

Before writing the file, run these checks:

1. **Coverage:** Every script section has ≥1 slide. No orphan topics.
2. **No fabrication:** Every number traces to the source document.
3. **Rhythm:** Slide types alternate. No 3+ consecutive same-type.
4. **Density:** Each slide meets the min data points for its type and density mode.
5. **Visual mandate:** Every non-title/key-point slide has at least one visual element (chart / diagram / placeholder-image).
6. **Multi-element composition:** In `rich` mode, ≥40% of content slides are multi-element. In `compact`, ≥20%.
7. **Visual descriptions:** Every visual element has both `appearance` and `animation-spec`, detailed enough for implementation.
8. **Charts:** Every slide with ≥3 quantitative data points has a chart spec.
9. **Animations:** Every data slide has animation directives. Every big number has `countUp`. Every bar has `growBar`.
10. **Titles:** No generic titles. Every title states a takeaway.
11. **Layout patterns:** Multi-element slides have layout-pattern specified. At least 3 different patterns used across the deck.

### Phase 6: Write Output — Write File

Write the complete `slides.md` to `--output` path. Include:
- A header comment with metadata (density mode, slide count, source files)
- The slide plan table as an HTML comment at the top
- All slides with full field specifications

---

## Chart Specification Guide

Every slide with quantitative data MUST include a `chart` field that specifies exactly what visualization to render. The `/web-ppt` skill needs this to choose between CSS bars, ECharts, big numbers, etc.

### Chart Types

| Chart Type | Keyword | When to Use | slides.md Notation |
|------------|---------|------------|-------------------|
| Big number + micro bar | `big-number` | 2-4 standalone metrics (DataComparison) | `chart: big-number + micro-progress-bar` |
| Horizontal bar chart | `horizontal-bar` | Ranking 3-8 items by score | `chart: horizontal-bar` |
| Stacked dual-color bar | `stacked-dual-bar` | Before/after or baseline+gain | `chart: stacked-dual-bar (grey=baseline, green=gain)` |
| Area/size comparison | `area-comparison` | Disproportionate values (e.g., 72K vs 2M) | `chart: area-comparison (circles)` |
| Ranked list with bars | `ranked-list` | Head-to-head with score + bar per item | `chart: ranked-list + horizontal-bar` |
| Side-by-side bar groups | `grouped-bar` | Multi-dimension comparison (ECharts) | `chart: grouped-bar (ECharts)` |
| None (text only) | `none` | Conceptual slides, definitions | (omit chart field) |

### Chart Decision Tree

```
Does the slide have quantitative data?
  No → omit chart field
  Yes ↓

How many data points?
  2-4 standalone metrics → big-number + micro-progress-bar
  2-4 items with before/after → stacked-dual-bar
  3-8 items ranked by one dimension → horizontal-bar
  3-8 items ranked with identity (name+score) → ranked-list + horizontal-bar
  8+ data points or multi-series → grouped-bar (ECharts)
  2 values with huge ratio (>5x) → area-comparison
```

### Chart Specification Format

The `chart` field uses a structured notation. **Every chart MUST include `appearance` and `animation-spec`.**

```markdown
- chart:
  - type: horizontal-bar
  - data:
    | Label | Value | Color Hint |
    |-------|-------|------------|
    | Simple Codex | 75.1 | positive (highest score) |
    | Droid (Opus 4.6) | 69.9 | neutral |
    | Junie CLI (Flash) | 64.3 | neutral |
    | Claude Code | 58.0 | negative (below baseline) |
  - baseline: 62.9 (Terminus 2 baseline, dashed line annotation)
  - sort-order: descending
  - appearance: >
      4 horizontal bars arranged top to bottom, gap-3 spacing.
      Each bar structure: left label (w-32, text-right, text-base) | colored bar (h-8, rounded-r-lg) | right value (text-lg, font-semibold).
      Bar widths proportional: Simple Codex=100%, Droid=93%, Junie=86%, Claude Code=77%.
      Colors: bar 1 accentPositive (green), bars 2-3 accentNeutral (blue-grey), bar 4 accentNegative (red).
      Vertical dashed line at 62.9 position (1px dashed, rgba(0,0,0,0.2)), annotated "Terminus 2 baseline" (text-xs, textCaption).
  - animation-spec: >
      F1 trigger: all 4 bars grow from width:0 to target width simultaneously, duration 0.8s, ease [0.16,1,0.3,1].
      0.05s stagger between bars (top to bottom). Right-side values countUp in sync (0→target, 0.8s).
      Baseline dashed line fades in (opacity 0→1, 0.3s) when bars grow past 62.9 position.
```

For stacked bars:
```markdown
- chart:
  - type: stacked-dual-bar
  - data:
    | Model | Baseline | Gain | Total |
    |-------|----------|------|-------|
    | GPT-5.3 | 64.7 | +10.4 | 75.1 |
    | Opus 4.6 | 62.9 | +7.0 | 69.9 |
  - appearance: >
      2 horizontal stacked bars, gap-4 spacing. Each bar has two segments joined:
      Left segment (baseline): grey (barTrack color), width proportional (64.7/75.1=86%, 62.9/75.1=84%).
      Right segment (gain): green (accentPositive), width proportional to gain (10.4/75.1=14%, 7.0/75.1=9%).
      Left label: model name (w-28, text-right). Right annotation: total score + "(+gain)" text.
      No gap between segments, visually continuous. Bar height h-10, rounded only at far right end (rounded-r-lg).
  - animation-spec: >
      F1: grey baseline segments grow from width:0 to target width (0.6s, ease-out).
      F2: green gain segments continue growing from baseline end (0.5s, ease-out),
      with right-side gain numbers countUp simultaneously (0→+10.4, 0.5s). 0.1s stagger between bars.
```

For big numbers:
```markdown
- chart:
  - type: big-number + micro-progress-bar
  - data:
    - lowest-score: 58.0 (negative color, progress bar 58/100)
    - highest-score: 69.9 (positive color, progress bar 70/100)
  - progress-bar-max: 100
  - appearance: >
      2 metric blocks arranged horizontally, gap-8, centered. Each metric block:
      Top: big number text-7xl font-extrabold (58.0 in accentNegative red, 69.9 in accentPositive green).
      Below: micro progress bar h-2 rounded-full (w-48 full width), color matches number.
      Below progress bar: label text text-base textCaption ("Lowest Score" / "Highest Score").
  - animation-spec: >
      F1: left number countUp 0→58.0 (0.8s, ease-out), progress bar growBar 0%→58% simultaneously (0.8s).
      F2: right number countUp 0→69.9 (0.8s), progress bar growBar 0%→70% simultaneously (0.8s).
```

---

## Image & Placeholder Specification Guide

When a slide references a product interface, website, demo, or any visual that cannot be rendered as a CSS chart, use a **placeholder image** (`placeholder-image`). Placeholders are temporary — they define what the real image should be, so it can be replaced later.

### Placeholder Specification Format

**Every placeholder MUST include `appearance`, `expected-content`, and `animation-spec`.**

```markdown
- placeholder-image:
  - title: "Terminal-Bench 2.0 Leaderboard Screenshot"
  - appearance: >
      Dashed rectangle, 16:9 aspect ratio, 60% width of slide content area, horizontally centered.
      Border: 2px dashed rgba(0,0,0,0.15), border-radius rounded-xl (12px).
      Background: rgba(0,0,0,0.02).
      Title text centered vertically and horizontally: "Terminal-Bench 2.0 Leaderboard Screenshot",
      font-size text-lg, color rgba(0,0,0,0.25), italic.
      Small text annotation in bottom-left: "[Screenshot Placeholder]", text-sm, rgba(0,0,0,0.15).
  - expected-content: >
      Terminal-Bench 2.0 official website (tbench.ai) leaderboard page screenshot.
      Must show the complete top 10 agent ranking table,
      including agent name, model, and score columns.
      Highlight boxes needed on Claude Opus 4.6 entries:
      #3 Droid (69.9) and #22 Claude Code (58.0).
  - animation-spec: >
      F0 immediate display: dashed box opacity 0→1 + y:12→0 fade-in slide-up,
      duration 0.5s, ease-out.
      Title text inside fades in with 0.2s delay after box appears.
```

### Placeholder Types

| Scenario | Placeholder Aspect Ratio | Position |
|----------|------------------------|----------|
| Website/leaderboard screenshot | 16:9 | Centered, 60% width |
| Product interface screenshot | 16:10 or 4:3 | Centered, 50-60% width |
| Code editor screenshot | 16:9 | Centered or left-aligned (metric cards on right) |
| Mobile screenshot | 9:16 | Centered, max-height 70% |
| Logo / icon | 1:1 | Small size, paired with text |
| Paper/document reference | 4:3 | Centered or right-aligned |

### When to Use Placeholders vs Charts

```
Can this data be rendered directly with CSS/SVG?
  Yes (bar chart, numbers, progress bar, flowchart) → Use chart/diagram, not placeholder
  No (real screenshot, product interface, photo) → Use placeholder-image

Is this a known external interface/website?
  Yes → placeholder-image, with detailed expected-content describing screenshot content and annotation requirements
  No → Try to use CSS diagram instead
```

---

## Animation Specification Guide

Every slide MUST include an `animation` field that tells `/web-ppt` how to reveal content progressively. This maps directly to the fragment animation system (BP-16 in web-ppt).

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
| **block-slide** | Title + primary element | Secondary elements revealed in sequence: each element = 1 fragment |

### Animation Specification Format

The `animation` field in slides.md:

```markdown
- animation:
  - fragments: 3
  - steps:
    - F0: title + body (appear)
    - F1: lowest score 58.0 (countUp) + micro progress bar (growBar)
    - F2: highest score 69.9 (countUp) + micro progress bar (growBar) + conclusion text (appear)
```

For bar charts:
```markdown
- animation:
  - fragments: 2
  - steps:
    - F0: title + body (appear)
    - F1: all bars grow simultaneously (growBar) + baseline appears + value labels (appear)
```

For comparison slides:
```markdown
- animation:
  - fragments: 3
  - steps:
    - F0: title + body (appear)
    - F1: left column "Runtime Search" (revealGroup)
    - F2: right column "Semantic Index" (revealGroup)
```

For multi-element block-slides:
```markdown
- animation:
  - fragments: 3
  - steps:
    - F0: title (appear) + primary chart baseline (growBar)
    - F1: chart gain segments grow (growBar) + metric cards countUp
    - F2: image placeholder fades in (appear) + conclusion text (appear)
```

### Key Animation Rules

- **Every big number MUST have `countUp`** — static numbers waste the most powerful attention-grabbing moment.
- **Every bar/progress indicator MUST have `growBar`** — bars growing from zero dramatically demonstrates relative differences.
- **Title + body are ALWAYS in F0** — never show an empty slide.
- **Max 6 fragments per slide** — too many clicks breaks flow.
- **`compact` mode prefers fewer fragments** (1-2 per slide). `rich` mode can use 2-4.
- **Multi-element slides reveal elements in priority order** — primary data element first, supporting elements (images, text blocks) last.

---

## Layout Treatment Guide

Every non-title, non-key-point slide SHOULD include a `layout` field that hints at the visual treatment. This guides `/web-ppt` in choosing between cards, tables, accent borders, etc. (ref BP-12).

### Available Treatments

| Treatment | Keyword | When to Use |
|-----------|---------|------------|
| White cards | `cards` | Grouped items with title + detail (max 50% of slides) |
| Table rows | `table` | Side-by-side comparison with multiple dimensions |
| Accent border | `accent-border` | Feature list without card weight |
| Borderless grid | `borderless-grid` | Category overview, light visual weight |
| Timeline | `timeline` | Ordered steps, process flow |
| Inline highlights | `inline-highlights` | 2-3 short key-value pairs, no container needed |
| Big number panel | `big-number-panel` | 2-4 hero metrics dominating the slide |

### Treatment Decision

```
Is it a ranked list or score comparison?
  → table or horizontal-bar (let chart dominate, minimal layout)

Is it a multi-dimension feature comparison?
  → table (rows = dimensions, columns = subjects)

Is it a category overview (4-6 items)?
  → borderless-grid (lightweight, no cards)

Is it a process or ordered steps?
  → timeline

Is it 2-3 key-value metrics?
  → inline-highlights or big-number-panel

Is it grouped items with substantial detail per item?
  → cards (but track: max 50% of content slides should use cards)
```

---

## Output Format: slides.md

### Document Structure

```markdown
<!-- Density: rich | Slides: 23 | Script: voiceover.md | Source: full.md -->
<!-- Slide Plan:
| # | Section | Type | Core Message | Element Count | Layout Pattern | Animation |
|---|---------|------|-------------|---------------|---------------|-----------|
| 1 | S1 | title | The model is only half | 1 | — | appear |
| 2 | S1 | block-slide | TB 2.0 benchmark | 2 | side-by-side | countUp+appear |
| ... | ... | ... | ... | ... | ... | ... |
-->

# [Presentation Title]

---

## Slide 1: Title Page
- type: title
- title: ...
- subtitle: ...
- badge: ...
- animation: appear (full fade-in)

---

## Slide 2: ...
- type: data-comparison
- title: ...
- body: ...
- data: ...
- chart: ...
- animation: ...
- layout: ...
- conclusion: ...

---

## Slide 5: [Topic Name]
- type: block-slide
- title: ...
- element-count: 3
- layout-pattern: golden-ratio
- elements:
  - Element 1 (primary, left 62%):
    - type: horizontal-bar
    - data: ...
    - appearance: ...
    - animation-spec: ...
  - Element 2 (secondary, top-right 32%×45%):
    - type: big-number + micro-progress-bar
    - data: ...
    - appearance: ...
  - Element 3 (tertiary, bottom-right 32%×47%):
    - type: placeholder-image
    - title: "..."
    - expected-content: ...
- animation:
  - fragments: 3
  - steps:
    - F0: title (appear)
    - F1: bar chart (growBar) + big numbers (countUp)
    - F2: image (appear)

---
...
```

### Available Slide Types

| Type | When to Use | Required Fields | Max Elements |
|------|------------|----------------|-------------|
| `title` | Opening slide | title, subtitle, badge | 1 |
| `data-comparison` | 2-4 metrics with exact numbers | title, data, chart, animation, conclusion | 1 |
| `key-point` | Section divider, one big takeaway | title, subtitle | 1 |
| `comparison` | Side-by-side feature comparison | title, column-data, layout, animation | 1 |
| `grid` | 4-6 item overview | title, grid, layout, animation | 1 |
| `bar-chart` | Score/performance ranking | title, chart, animation | 1 |
| `player-card` | Individual item deep-dive | title, score, features, chart(optional), animation | 1 |
| `diagram` | Process flow / architecture | title, diagram, animation | 1 |
| `list` | Ordered recommendations / steps | title, list, animation | 1 |
| `placeholder` | Screenshot/image placeholder | title, placeholder-image | 1 |
| `card-grid` | 2-4 labeled cards | title, cards, layout, animation, conclusion | 1 |
| **`block-slide`** | **Multi-element composite layout** | **title, element-count, layout-pattern, elements, animation** | **2-4** |

> **`block-slide` is the most important type in slides.md.** When a slide needs to combine chart + image, chart + metric cards, diagram + text block, or any multi-element composition, you MUST use `block-slide`. It maps to the `/web-ppt` free-layout canvas (`ContentBlock[]`), where each element is independently positioned and rendered.

### Field Reference

```markdown
## Slide N: [Section · Topic]
- type: [slide-type]
- title: [Takeaway, not topic]
- subtitle: [Secondary heading]
- body: [1-2 sentence insight, NOT generic filler]
- badge: [Date, source, footnote]

## Data fields
- data:
  - [label]: [exact value] ([positive/negative/neutral])
- conclusion: [Data-driven takeaway sentence]
- key-number: [One standout metric]
- chart-data:
  | Column1 | Column2 | ... |
  |---------|---------|-----|
  | data    | data    | ... |

## Chart specification (MUST include appearance + animation-spec)
- chart:
  - type: [horizontal-bar/big-number+micro-bar/stacked-dual-bar/area-comparison/ranked-list/grouped-bar]
  - data: [table or list]
  - sort-order: [ascending/descending]
  - baseline: [value + description, optional]
  - appearance: [detailed description of every visual element's position, size, color, proportion]
  - animation-spec: [detailed description of trigger timing, duration, easing, stagger, start→end states]

## Image placeholder (MUST include appearance + expected-content + animation-spec)
- placeholder-image:
  - title: [title text displayed inside placeholder box]
  - appearance: [dashed box dimensions, border style, background, label text, position]
  - expected-content: [detailed description of real image that will replace the placeholder, annotation requirements]
  - animation-spec: [placeholder box entrance animation]

## Diagram (MUST include appearance + animation-spec)
- diagram:
  - type: [flowchart/architecture/hierarchy/comparison-matrix]
  - appearance: [node count, text, connection method, layout direction, colors]
  - animation-spec: [step-by-step reveal order, stagger interval, per-element entrance method]

## Animation specification
- animation:
  - fragments: [number]
  - steps:
    - F0: [what's immediately visible] ([appear/countUp/growBar])
    - F1: [first click reveal] ([animation type])
    - F2: ...

## Layout treatment
- layout: [cards/table/accent-border/borderless-grid/timeline/inline-highlights/big-number-panel]

## Multi-element composition (block-slide only)
- element-count: [2-4]
- layout-pattern: [top-bottom/side-by-side/golden-ratio/three-columns/dashboard/header-body/L-shape]
- elements:
  - Element 1 ([role], [position description]):
    - type: [chart type / diagram type / placeholder-image / text-block]
    - [element-specific fields...]

## Structure fields (type-specific)
- cards:
  - [Item 1]
  - [Item 2]
- left-col/right-col/center-col:
  - name: [Column name]
  - representative: [Representative example]
  - key-point: [Key differentiator]
  - detail: [Supporting detail]
  - result: [Outcome/evidence]
- grid (NxM):
  1. [Label] — [Description]
- diagram ([description]):
  1. [Step] — [Explanation]
- list:
  1. [Item with description]
- features:
  - [Feature]: [Detail]
- comparison-chart:
  | Col1 | Col2 |
  |------|------|
  | data | data |
- side-note: [Marginal note]
- explanation: [Why this matters]
- controversy: [Counterpoint]
- delta: [Delta + color]
- gain: [Gain metric]
- caveat: [Caveat callout]
```

---

## Slide Type Selection Guide

```
Is this an opening or section divider?
  → title (opening) or key-point (divider)

Does the section present 2-4 standalone metrics?
  → data-comparison (chart: big-number + micro-progress-bar)

Does the section compare 2-3 alternatives side by side?
  → comparison (layout: table or cards)

Does the section rank or score multiple items?
  → bar-chart (chart: horizontal-bar or stacked-dual-bar)

Does the section deep-dive one specific item?
  → player-card (chart: ranked-list + horizontal-bar, optional)

Does the section list 4-6 categories or dimensions?
  → grid (layout: borderless-grid)

Does the section describe a process or architecture?
  → diagram (animation: step-by-step appear)

Does the section give ordered recommendations?
  → list (animation: item-by-item appear)

Does the section reference a screenshot or demo?
  → placeholder

Does the section list 2-4 grouped items with a conclusion?
  → card-grid (layout: cards)

Does the section have MULTIPLE data angles, charts+images, or high information density?
  → block-slide (element-count: 2-4, layout-pattern: [pick from 7 patterns])
```

---

## Slide Mapping Principles

### One Core Message Per Slide

Each slide delivers exactly ONE takeaway. If a script section makes two distinct points, split into two slides.

### Multi-Element ≠ Multi-Message

A multi-element `block-slide` still conveys ONE core message. The multiple elements support the SAME takeaway from different angles (e.g., a chart shows the data, a metric card highlights the key number, an image provides context — all reinforcing the same message).

### Narrative Rhythm

Alternate slide types to maintain visual variety:

```
Title → BlockSlide → Data → KeyPoint → BlockSlide → Chart → KeyPoint → BlockSlide → ...
```

Rules:
- Never have 3+ consecutive slides of the same type
- Insert `key-point` slides between major sections as dividers
- Start with `title`, end with `key-point` (closing message)
- Alternate between multi-element (`block-slide`) and single-element slides for visual rhythm

### Data Extraction Priority

When populating slide data from the source document:

1. **Exact numbers first** — scores, percentages, counts
2. **Rankings and comparisons** — who is #1, what's the delta
3. **Specific names** — product names, model names, paper names
4. **Supporting evidence** — benchmark methodology, conditions

### Information-to-Element Mapping

When designing a slide, map information types to element types:

| Information Type | Best Element | Notes |
|-----------------|-------------|-------|
| Numeric rankings/scores | Chart (bar/ranked-list) | Always pair with key metric card for the standout number |
| Before/after comparisons | Chart (stacked-dual-bar) | Consider pairing with image showing the "after" state |
| Product/interface references | Placeholder-image | Must be paired with at least one data element |
| Process/workflow descriptions | Diagram | Consider pairing with image of the system described |
| Multi-dimensional assessments | Chart (radar/grouped-bar) | Pair with text block for interpretation |
| Market/proportion data | Chart (pie/bar) | Pair with key takeaway text block or metric card |
| Conceptual explanations | Text block + diagram | Use diagram to visualize the concept |

---

## Complete Example: compact vs rich

Given this script section:

> Let's look at the data. GPT-5.3 with Terminus 2 scores 64.7, add Simple Codex scaffold and it becomes 75.1, a gain of 10.4 points. Opus 4.6 with Terminus 2 scores 62.9, add Droid scaffold and it becomes 69.9, a gain of 7 points.
> A 5-10 percentage point scaffold gain is enough to move ranking from mid-pack to top 3.

### compact output:

```markdown
## Slide 6: Scaffold Gain 5-10 Points
- type: block-slide
- title: Scaffold Gain 5-10 Points
- element-count: 2
- layout-pattern: side-by-side
- elements:
  - Element 1 (chart, left 60%):
    - type: stacked-dual-bar
    - data:
      | Model | Baseline (Terminus 2) | Gain | Total |
      |-------|----------------------|------|-------|
      | GPT-5.3 | 64.7 | +10.4 | 75.1 (Simple Codex) |
      | Opus 4.6 | 62.9 | +7.0 | 69.9 (Droid) |
    - appearance: >
        2 horizontal stacked bars, vertical layout, gap-4.
        Left side of each: model name (w-24, text-right, text-base).
        Each bar has two joined segments: grey baseline + green gain, total height h-10, rounded-r-lg on right end.
        GPT-5.3 bar: grey segment 86% (64.7/75.1), green segment 14% (10.4/75.1), total width 100%.
        Opus 4.6 bar: grey segment 90% (62.9/69.9), green segment 10% (7.0/69.9), total width 93% (69.9/75.1).
        Right annotation: total score + green small text "(+gain)".
    - animation-spec: >
        F1: grey + green segments grow sequentially (grey 0.5s, then green 0.4s),
        ease [0.16,1,0.3,1]. Right-side gain numbers countUp in sync. 0.1s stagger between bars.
  - Element 2 (image, right 36%):
    - type: placeholder-image
    - title: "Scaffold tools comparison dashboard"
    - expected-content: Visual comparison of scaffold tool architectures and their performance impact
- animation:
  - fragments: 2
  - steps:
    - F0: title (appear) + image placeholder (appear)
    - F1: dual-color bar chart growth (growBar) + gain numbers (countUp)
```

### rich output:

```markdown
## Slide 6: Scaffold Gain Data
- type: block-slide
- title: 5-10 Point Gain, From Mid-Pack to Top Three
- body: Same model with different scaffolds can show 10+ percentage point score differences
- element-count: 3
- layout-pattern: golden-ratio
- elements:
  - Element 1 (primary chart, left 62%):
    - type: stacked-dual-bar
    - data:
      | Model | Baseline (Terminus 2) | Gain | Total | Best Scaffold |
      |-------|----------------------|------|-------|---------------|
      | GPT-5.3 | 64.7 | +10.4 | 75.1 | Simple Codex |
      | Opus 4.6 | 62.9 | +7.0 | 69.9 | Droid |
    - baseline: 62.9 (Terminus 2 + Opus 4.6 baseline, dashed line)
    - sort-order: descending by total
    - appearance: >
        2 horizontal stacked bars, vertical layout, gap-5, centered-left (max-w-[85%]).
        Each bar structure: left label area (w-28) showing "model name + scaffold name", text-right, text-base.
        Bar area has two gapless joined segments:
        - Grey segment (barTrack color #F0F0EA): represents baseline score, width proportional to baseline/max.
        - Green segment (accentPositive #4CAF50): represents gain score, follows grey segment, width proportional to gain/max.
        Bar total height h-10, rounded only at far right end (rounded-r-lg).
        Right annotation area: total score (text-xl, font-bold) + green small text "(+10.4)" (text-sm, accentPositive).
        GPT-5.3 row: grey 86% + green 14% = 100% (longest bar).
        Opus 4.6 row: grey 84% + green 9% = 93%.
        Vertical dashed line at x-position corresponding to 62.9 (1px dashed, rgba(0,0,0,0.15)),
        top of dashed line annotated "Baseline 62.9" (text-xs, textCaption, italic).
    - animation-spec: >
        F1: 2 grey baseline segments grow from width:0 to target width, duration 0.6s, ease [0.16,1,0.3,1].
        0.1s stagger between bars. Baseline dashed line fades in when grey passes 62.9 position (opacity 0→1, 0.3s).
        F2: green gain segments continue growing from grey end, duration 0.5s, ease [0.16,1,0.3,1].
        Right-side gain numbers countUp simultaneously (0→+10.4 / 0→+7.0, 0.5s, ease-out).
        Conclusion text appears at bottom (opacity 0→1 + y:8→0, 0.4s).
  - Element 2 (metric cards, top-right 32%×45%):
    - type: big-number + micro-progress-bar
    - data:
      - max-gain: +10.4 (positive color)
      - min-gain: +7.0 (neutral color)
    - appearance: >
        2 metric blocks stacked vertically, gap-4. Each block:
        Large number text-5xl font-bold, micro progress bar h-2 below,
        label text-sm textCaption below bar.
  - Element 3 (context image, bottom-right 32%×47%):
    - type: placeholder-image
    - title: "Terminal-Bench leaderboard showing scaffold-enhanced rankings"
    - expected-content: >
        Leaderboard screenshot highlighting how scaffolded entries (Droid, Simple Codex)
        rank significantly higher than their base model entries.
- animation:
  - fragments: 3
  - steps:
    - F0: title + body (appear)
    - F1: baseline bar segments grow (growBar) + baseline line appears + metric card numbers (countUp)
    - F2: gain bar segments grow (growBar) + gain numbers (countUp) + image (appear) + conclusion (appear)
- conclusion: Scaffold engineering can deliver 5-10 point gains, enough to change ranking positions
```

---

## Anti-Patterns (NEVER DO)

### Content
- **Never generate a slide with only a title.** Every slide must have substantive data.
- **Never use generic titles** like "Data Comparison" or "Key Findings". Titles state the specific takeaway.
- **Never use placeholder values** like "XX%", "N/A", "TBD".
- **Never invent numbers.** Every metric must trace back to the source document.
- **Never skip a topic from the script.** If the script mentions it, there must be a slide.
- **Never add topics not in the script.** The script is the authoritative content selector.
- **Never put detailed spoken narration into the slide body.** Slides capture DATA; narration is in the script.

### Visual Mandate
- **Never produce a non-title/key-point slide without a visual element.** Every content slide needs chart, diagram, or placeholder-image.
- **Never write a `chart` field without `appearance`.** "horizontal-bar" alone is useless — describe every bar, label, color, size.
- **Never write a `chart` or `placeholder-image` field without `animation-spec`.** Every visual element must specify how it animates.
- **Never write a vague `appearance`** like "a bar chart showing score comparison". Must include: element count, specific values, colors, sizes, positions.
- **Never write a vague `animation-spec`** like "bar chart animation display". Must include: trigger fragment, duration, easing, stagger timing, specific start→end states.
- **Never write a `placeholder-image` without `expected-content`** describing exactly what real image should replace it.

### Multi-Element Composition
- **Never use `block-slide` with only 1 element.** Use a standalone slide type instead.
- **Never have every content slide be a block-slide.** Alternate with single-element types for visual rhythm.
- **Never use the same layout-pattern for 3+ consecutive block-slides.** Vary the patterns.
- **Never create an information-rich slide (multi-data, multi-angle) as a single-element type.** Use `block-slide` to give it proper visual density.
- **Never leave a block-slide with >35% empty space.** Add an image placeholder or text block to fill gaps.

### Animation
- **Never omit the `animation` field on any non-title, non-key-point slide.**
- **Never use `countUp` on text or `appear` on a big number.** Match animation type to content type.
- **Never assign identical animation (all `appear`) to every slide.** Use the animation type table.

---

## Quality Checklist

Before writing the output file, verify:

### Structure
- [ ] Density mode is stated in the header comment
- [ ] Slide plan table is included as HTML comment
- [ ] Every script section has corresponding slide(s)
- [ ] No script topic missing; no extra topic added
- [ ] Slide types alternate — no 3+ consecutive same type
- [ ] First slide = `title`, last slide = `key-point`
- [ ] `key-point` dividers separate major topic groups
- [ ] Slide count within density range (compact: 15-20, rich: 20-28)

### Content
- [ ] Every slide has a specific, non-generic takeaway title
- [ ] Every data field contains exact values from the source document
- [ ] Color hints (positive/negative/neutral) used for all data with sentiment
- [ ] All text in specified `--lang`

### Visual Mandate
- [ ] **Every non-title/key-point slide has at least one visual element** (chart / diagram / placeholder-image)
- [ ] **Every `chart` has `appearance`**: element count, specific values, colors, sizes, positions, proportions
- [ ] **Every `chart` has `animation-spec`**: trigger fragment, duration, easing, stagger, start→end states
- [ ] **Every `placeholder-image` has `appearance`**: dimensions, border style, background, label text, positioning
- [ ] **Every `placeholder-image` has `expected-content`**: detailed description of the real image that should replace it
- [ ] **Every `placeholder-image` has `animation-spec`**: entrance animation timing and style
- [ ] **Every `diagram` has `appearance`**: node count, labels, connections, layout direction, colors
- [ ] **Every `diagram` has `animation-spec`**: reveal sequence, stagger timing, per-element effects

### Multi-Element Composition
- [ ] **In `rich` mode, ≥40% of content slides are multi-element (`block-slide`)**
- [ ] **In `compact` mode, ≥20% of content slides are multi-element (`block-slide`)**
- [ ] **Every `block-slide` has `element-count` (2-4) and `layout-pattern` specified**
- [ ] **At least 3 different layout patterns used across the deck**
- [ ] **No 3+ consecutive block-slides with the same layout pattern**
- [ ] **Information-rich sections use multi-element composition (not split across multiple single-element slides)**
- [ ] **Every block-slide has ≤35% empty space** — add image blocks to fill gaps
- [ ] **Multi-element animation uses layered reveal** — primary element first, supporting elements in subsequent fragments

### Charts & Animation
- [ ] Every slide with quantitative data has a `chart` field with type + data
- [ ] Every non-title/key-point slide has an `animation` field with fragments + steps
- [ ] Every big number specifies `countUp` animation
- [ ] Every bar/progress element specifies `growBar` animation
- [ ] `layout` field present on comparison, grid, and card-grid slides
- [ ] Max 50% of content slides use `cards` layout (track card count)

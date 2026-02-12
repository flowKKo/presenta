# Web PPT Generator — CLAUDE.md

## Project Overview

This project generates **web-based PPT presentations**: single HTML files that render slides vertically, scrollable from top to bottom. Each slide maintains a **16:9 aspect ratio** and is visually separated with gaps. The output is a self-contained HTML file with inline CSS and JS — no build tools, no frameworks, no external dependencies.

---

## Architecture

### Output Format
- **Single HTML file** (e.g., `output.html`)
- All CSS inline in `<style>`, all JS inline in `<script>`
- Zero external dependencies — open the file in any browser and it works
- Responsive: slides scale to fit viewport width, maintaining 16:9 ratio

### Slide Container Structure
```html
<div class="slide-deck">
  <div class="slide" id="slide-1"> ... </div>
  <div class="slide" id="slide-2"> ... </div>
  ...
</div>
```

### Core CSS Rules
```css
.slide-deck {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;            /* spacing between slides */
  padding: 40px 0;
  background: #1a1a2e;  /* dark background behind slides (configurable) */
}
.slide {
  width: min(90vw, 1600px);
  aspect-ratio: 16 / 9;
  overflow: hidden;
  position: relative;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}
```

---

## Configuration (User Provides These)

When generating a presentation, the user must specify 3 things:

### 1. Language (`lang`)
The output language for all text content on slides.
- `zh` — Chinese (Simplified)
- `en` — English
- `ja` — Japanese
- Or any other language code

### 2. Style (`style`)
The visual design system. Choose ONE:

| Style ID | Description | Background | Accent | Font |
|----------|-------------|------------|--------|------|
| `tech-dark` | Dark tech style, dark blue/purple background, neon accent colors, monospace headings | `#0a0a1a` → `#1a1a3e` | `#00d4ff` / `#ff6b6b` | Inter + JetBrains Mono |
| `minimal-light` | Clean white/light gray, thin lines, large whitespace, black text | `#ffffff` | `#2563eb` | Inter |
| `gradient-warm` | Warm gradient backgrounds (orange/pink/purple), white text, rounded shapes | warm gradients | `#f59e0b` | Poppins |
| `corporate` | Professional blue-gray, structured grid layout, subtle shadows | `#f0f4f8` | `#1e40af` | Source Sans Pro |
| `retro-terminal` | Green-on-black terminal aesthetic, scanline overlay, courier font | `#0c0c0c` | `#00ff41` | Courier New |
| `glassmorphism` | Frosted glass cards on gradient background, blur effects | gradient mesh | `rgba(255,255,255,0.2)` | SF Pro / Inter |

User may also describe a custom style in natural language. In that case, infer colors, fonts, and layout from the description.

### 3. Script (`script`)
The content source. This is a Markdown file (e.g., `script.md`, `zh.md`) containing the presentation content structured as sections and subsections. The script defines:
- How many slides to generate (1 section = 1 or more slides)
- The text content for each slide
- Data/charts/tables to visualize

---

## Slide Generation Rules

### Content Mapping
1. Read the script file thoroughly
2. Map each **major section** to one or more slides
3. Each slide should carry **ONE core message** — do not overload
4. Maximum **3 visible information blocks** per slide (e.g., a title + a chart + a caption)

### Typography Hierarchy
| Element | Size Range | Weight |
|---------|-----------|--------|
| Slide title (H1) | 48-72px | 700-800 |
| Key numbers / metrics | 80-140px | 800-900 |
| Section subtitle (H2) | 36-48px | 600 |
| Body text | 24-32px | 400 |
| Caption / source | 16-20px | 300-400 |
| Minimum readable text | 18px | — |

Never go below 18px for any visible text.

### Data Visualization (Pure CSS/SVG)
Since we use no external libraries, all charts are built with:
- **Bar charts**: CSS flexbox + percentage widths + colored divs
- **Comparison cards**: side-by-side flexbox containers
- **Tables**: styled HTML `<table>` elements
- **Number counters**: large styled `<span>` elements
- **Flow diagrams**: flexbox with arrow elements (CSS `::after` pseudo-elements)
- **SVG icons**: inline SVG for simple iconography

Do NOT use Canvas, Chart.js, D3, or any external chart library.

### Layout Patterns Per Slide Type

**Title Slide**
- Centered large title, subtitle below, optional background graphic

**Data Comparison Slide**
- Two or three columns, each with a metric card (number + label)
- Optional bar chart below

**Quote / Key Point Slide**
- Large centered text, minimal decoration
- Background color or gradient for emphasis

**List / Breakdown Slide**
- Left: section header; Right: 3-6 items in a grid or list
- Each item: icon/number + short text

**Image Placeholder Slide**
- Use a styled `<div>` with dashed border and label text like "Screenshot: Terminal-Bench Leaderboard" as placeholder
- CSS class: `.placeholder-box { border: 2px dashed rgba(255,255,255,0.3); display: flex; align-items: center; justify-content: center; }`

**Chart Slide**
- Full-width bar chart or comparison visualization
- Legend labels below or beside

### Animation (Optional, CSS Only)
- Use CSS `@keyframes` for subtle entrance animations
- Trigger via Intersection Observer in `<script>` — animate when slide scrolls into view
- Allowed: `fadeIn`, `slideUp`, stagger delays for list items
- Forbidden: excessive motion, flashing, auto-playing loops

### Responsive Behavior
```css
/* Mobile: slides take full width */
@media (max-width: 768px) {
  .slide { width: 95vw; }
  .slide h1 { font-size: 32px; }
  .slide .big-number { font-size: 64px; }
}
```

---

## Generation Workflow

When the user says something like: "Generate a PPT, lang=zh, style=tech-dark, script=script.md"

Follow these steps:

1. **Read the script file** — understand the full content structure
2. **Plan slides** — determine the number of slides and what goes on each one (write this plan as a comment in the HTML)
3. **Generate HTML** — produce the complete single-file HTML
4. **Self-review** — check:
   - Every slide has 16:9 aspect ratio
   - No text below 18px
   - No more than 3 info blocks per slide
   - All text is in the specified language
   - The style is consistently applied
   - Bar chart widths/percentages are mathematically correct
   - Placeholder boxes are used where screenshots would go

---

## File Structure

```
claude_test/
├── CLAUDE.md          ← this file (generation rules)
├── script.md          ← content script (Chinese video script version)
├── storyboard.md      ← detailed shot-by-shot storyboard
├── voiceover.md       ← voiceover text
├── zh.md              ← full article (Chinese)
└── output.html        ← generated presentation (output)
```

---

## Example Usage

User: `Generate the presentation. lang=zh, style=tech-dark, script=script.md`

Claude should:
1. Read `script.md`
2. Map content to ~20-25 slides following the storyboard structure in `storyboard.md`
3. Output a single `output.html` using `tech-dark` style with Chinese text
4. All data visualizations (bar charts, comparison tables, number highlights) rendered as pure CSS

User: `Regenerate slide 5 with a different layout — use a full-width bar chart instead of side-by-side cards`

Claude should:
1. Read the current `output.html`
2. Locate slide 5
3. Rewrite only that slide's HTML/CSS
4. Output the updated file

---

## Quality Checklist

Before delivering, verify:
- [ ] Every `.slide` has `aspect-ratio: 16/9`
- [ ] Page background color extends behind slide gaps
- [ ] Slides are centered horizontally
- [ ] Gap between slides is consistent (40px default)
- [ ] Font sizes follow the typography hierarchy
- [ ] Key numbers are 80px+ and visually prominent
- [ ] Bar chart values are proportional and labeled
- [ ] No horizontal overflow on any slide
- [ ] Works in Chrome, Firefox, Safari (standard CSS only)
- [ ] File size is reasonable (< 500KB for 25 slides)
- [ ] Scroll behavior is smooth (`scroll-behavior: smooth` on html)
- [ ] Print-friendly: slides break at page boundaries if printed

---

## Constraints

- **No npm, no build step** — output is a single `.html` file
- **No CDN links** — everything is inline (fonts can use Google Fonts `@import` as the only exception)
- **No JavaScript frameworks** — vanilla JS only, and only for scroll-triggered animations
- **No images** — use CSS gradients, SVG, and placeholder boxes instead
- **Semantic HTML** — use proper heading hierarchy within each slide

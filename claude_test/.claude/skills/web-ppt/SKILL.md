---
name: web-ppt
description: "Generate web-based PPT presentations as single HTML files. Renders 16:9 slides vertically with scroll. Usage: /web-ppt --lang zh --style tech-dark --script script.md [--output output.html] [--slides 5,8,12] [--storyboard storyboard.md]"
argument-hint: "--lang <language> --style <style> --script <file> [--output <file>] [--slides <n,n,...>] [--storyboard <file>]"
---

# Web PPT Generator

Generate web-based slide presentations as self-contained HTML files. Slides are 16:9 aspect ratio, rendered vertically with scroll navigation.

## Argument Parsing

Parse `$ARGUMENTS` for these flags:

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `--lang` | Yes | — | Output language: `zh`, `en`, `ja`, etc. |
| `--style` | Yes | — | Built-in style ID, custom style file name (from `styles/`), or free-text description |
| `--script` | Yes | — | Path to the content Markdown file |
| `--output` | No | `output.html` | Output HTML file path |
| `--slides` | No | all | Comma-separated slide numbers to regenerate (e.g., `5,8,12`) |
| `--storyboard` | No | — | Path to optional storyboard file for detailed shot-by-shot guidance |

If the user provides arguments without flags (e.g., `/web-ppt zh tech-dark script.md`), interpret them positionally as `lang`, `style`, `script`.

---

## Built-in Styles

| Style ID | Description | Background | Accent | Font |
|----------|-------------|------------|--------|------|
| `tech-dark` | Dark tech, dark blue/purple bg, neon accents, monospace headings | `#0a0a1a` → `#1a1a3e` | `#00d4ff` / `#ff6b6b` | Inter + JetBrains Mono |
| `minimal-light` | Clean white/light gray, thin lines, large whitespace | `#ffffff` | `#2563eb` | Inter |
| `gradient-warm` | Warm gradient bg (orange/pink/purple), white text, rounded | warm gradients | `#f59e0b` | Poppins |
| `corporate` | Professional blue-gray, structured grid, subtle shadows | `#f0f4f8` | `#1e40af` | Source Sans Pro |
| `retro-terminal` | Green-on-black terminal, scanline overlay, courier | `#0c0c0c` | `#00ff41` | Courier New |
| `glassmorphism` | Frosted glass cards on gradient bg, blur effects | gradient mesh | `rgba(255,255,255,0.2)` | SF Pro / Inter |

### Style Resolution Order

When resolving `--style`, follow this priority:

1. **Built-in style ID** — if the value matches a row in the table above, use that built-in style.
2. **Custom style file** — check if a file exists at `.claude/skills/web-ppt/styles/{value}.md` (relative to the project root where this skill is installed). If found, read the file and apply all specifications (colors, typography, card style, chart style, layout rules, animations) from it. The style file is the **single source of truth** — its values override the defaults in this SKILL.md.
3. **Free-text description** — if neither built-in nor file match, treat the value as a natural language style description and infer colors, fonts, and layout from it.

### Custom Style File Format

Custom style files live in `.claude/skills/web-ppt/styles/` (relative to the project root) as `.md` files. Each file defines:

- **Color Palette** — CSS custom property tokens (`--bg-page`, `--bg-slide`, `--text-primary`, accent colors, etc.)
- **Typography** — font family, sizes, weights per element type
- **Card Style** — background, border, border-radius, shadow
- **Slide Style** — background, border-radius, shadow
- **Chart / Data Visualization** — bar style, colors, grid lines, label positions
- **Layout Principles** — whitespace rules, alignment, decoration guidelines
- **Placeholder Box** — border, background, color for screenshot placeholders
- **Animations** — entrance animation specifics (easing, duration, stagger)

Available custom styles:

| File | Style Name | Description |
|------|-----------|-------------|
| `swiss.md` | Swiss Style | 极简米白底、深炭灰文字、扁平化图表、慷慨留白、无衬线字体 |

To create a new custom style, add a `.md` file to the `styles/` directory following the same structure as `swiss.md`.

---

## Generation Workflow

### Full Generation (no `--slides` flag)

1. **Read the script file** at `--script` path. If `--storyboard` is provided, also read it for shot-by-shot layout guidance.
2. **Plan slides**: Map each major section in the script to one or more slides. Each slide carries ONE core message, max 3 info blocks. Write the slide plan as an HTML comment at the top of the output.
3. **Generate the complete HTML file**: A single self-contained `.html` with inline `<style>` and `<script>`.
4. **Write the file** to `--output` path.
5. **Report** the number of slides generated and the output file path.

### Partial Regeneration (`--slides` flag provided)

1. **Read the existing output HTML file**.
2. **Read the script file** for content reference.
3. **Locate the specified slides** by their `id="slide-N"` attributes.
4. **Rewrite only those slides** — preserve everything else unchanged.
5. **Write the updated file** back to the same output path.
6. **Report** which slides were updated.

---

## HTML Architecture

### Document Structure
```html
<!DOCTYPE html>
<html lang="[--lang value]">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Presentation Title from Script]</title>
  <style>/* all CSS here */</style>
</head>
<body>
  <!-- Slide Plan: [plan comment] -->
  <div class="slide-deck">
    <div class="slide" id="slide-1"> ... </div>
    <div class="slide" id="slide-2"> ... </div>
    ...
  </div>
  <script>/* Intersection Observer for animations */</script>
</body>
</html>
```

### Core CSS (Always Applied)
```css
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }

.slide-deck {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 40px 0;
  min-height: 100vh;
}

.slide {
  width: min(90vw, 1600px);
  aspect-ratio: 16 / 9;
  overflow: hidden;
  position: relative;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  padding: 60px 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (max-width: 768px) {
  .slide {
    width: 95vw;
    padding: 30px 24px;
  }
}
```

The `body` and `.slide-deck` background color are determined by the chosen style. Each `.slide` background is also style-dependent.

---

## Slide Design Rules

### Typography Hierarchy
| Element | Size | Weight |
|---------|------|--------|
| Slide title (H1) | 48-72px | 700-800 |
| Key numbers / metrics | 80-140px | 800-900 |
| Section subtitle (H2) | 36-48px | 600 |
| Body text | 24-32px | 400 |
| Caption / source | 16-20px | 300-400 |

**Minimum text size: 18px.** Never go below this.

### Content Density
- **Max 3 visible information blocks** per slide (e.g., title + chart + caption)
- **ONE core message** per slide — do not overload
- Leave generous padding and whitespace

### Data Visualization (Pure CSS/SVG Only)
No external charting libraries. Build everything with:
- **Bar charts**: flexbox + percentage widths + colored divs with labels
- **Comparison cards**: side-by-side containers with metric + label
- **Tables**: styled `<table>` with proper cell padding
- **Big numbers**: large `<span>` with font-size 80-140px
- **Flow diagrams**: flexbox with CSS arrow pseudo-elements
- **Placeholder boxes**: dashed border div for screenshots/images (exact styling from the active style file)

### Slide Layout Patterns

**Title Slide** — Centered title + subtitle, optional background graphic
**Data Comparison** — 2-3 column metric cards, optional bar chart
**Key Point** — Large centered text, accent background
**List / Breakdown** — Section header left, grid/list items right
**Chart** — Full-width bar chart or comparison vis with legends
**Placeholder** — Dashed box with label for screenshots

### Animations (CSS + Intersection Observer)
- Define `@keyframes fadeInUp` and apply `.slide.visible` class
- Intersection Observer in `<script>` adds `.visible` when slide enters viewport
- Allowed: fadeIn, slideUp, stagger delays
- Forbidden: flashing, auto-loops, excessive motion

```js
// Standard animation script
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });
document.querySelectorAll('.slide').forEach(s => observer.observe(s));
```

---

## Quality Checklist (Verify Before Delivering)

- [ ] Every `.slide` has `aspect-ratio: 16/9`
- [ ] Page background extends behind slide gaps
- [ ] Slides centered horizontally
- [ ] Consistent 40px gap between slides
- [ ] Font sizes follow hierarchy, nothing below 18px
- [ ] Key numbers are 80px+ and visually prominent
- [ ] Bar chart widths are proportional and mathematically correct
- [ ] No horizontal overflow on any slide
- [ ] All text is in the specified `--lang`
- [ ] Style is consistently applied across all slides
- [ ] File is self-contained (no broken external refs)
- [ ] File size < 500KB for 25 slides
- [ ] Responsive: works on mobile (768px breakpoint)

---

## Constraints

- **No npm, no build step** — output is a single `.html` file
- **No CDN links** — everything inline (Google Fonts `@import` is the only exception)
- **No JS frameworks** — vanilla JS only, for scroll animations
- **No images** — CSS gradients, inline SVG, placeholder boxes
- **Semantic HTML** — proper heading hierarchy within each slide
- **No Canvas, Chart.js, D3** — pure CSS/SVG visualizations only

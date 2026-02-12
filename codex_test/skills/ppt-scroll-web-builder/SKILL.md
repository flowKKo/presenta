---
name: ppt-scroll-web-builder
description: Build or update vertically scrollable PPT-like web pages with 16:9 slide canvases, configurable spacing/snap behavior, and config-driven content using language/theme/script inputs. Use when users ask for PPT-style front-end pages, detailed control prompts for slide generation, or AGENTS.md templates for controlling presentation output.
---

# PPT Scroll Web Builder

## Overview

Create or update a webpage that behaves like a vertically scrollable PPT deck.
Drive content and style via structured config so language, visual theme, and script can be changed without rewriting layout code.

## Workflow

1. Capture required constraints.
- Enforce `16:9` slide canvas for every slide.
- Confirm vertical flow, slide gap, and whether scroll snapping is enabled.
- Confirm expected deliverable: `index.html` only or `index.html + styles.css + app.js`.

2. Define a config-first model.
- Create `PPT_CONFIG` for language, typography, palette, spacing, motion, and behavior.
- Create `PPT_SCRIPT` for metadata and slide list.
- Keep all visible text sourced from `PPT_SCRIPT`.

3. Build output in one of two modes.
- Prompt mode: produce a detailed control prompt pack for another coding agent.
- Implementation mode: produce runnable front-end files driven by `PPT_CONFIG` and `PPT_SCRIPT`.

4. Validate delivery quality.
- Keep slides centered and ratio-safe across desktop/mobile.
- Respect reduced-motion settings when animations are enabled.
- Ensure at least basic accessibility: semantic sections, readable contrast, predictable heading structure.

## Prompt Mode

When the user asks for “控制 prompt / prompt 模板 / AGENTS.md prompt”, do the following:

1. Load `references/prompt-pack.md`.
2. Fill placeholders with user requirements.
3. Output three layers when possible:
- master prompt (system/developer style)
- parameterized user template
- one filled example
4. If asked to write files, update `AGENTS.md` directly.

## Implementation Mode

When the user asks for actual webpage code, follow these rules:

1. Render slides from `PPT_SCRIPT.slides` instead of hardcoding content.
2. Use CSS variables derived from `PPT_CONFIG` for theme control.
3. Support optional features via config switches:
- scroll snap
- progress indicator
- slide number
- motion on/off
4. Keep ratio with `aspect-ratio: 16 / 9` and add a fallback only if needed.

## Data Contract

Use this baseline structure.

```js
const PPT_CONFIG = {
  language: "zh-CN",
  themeName: "Tech Grid",
  palette: { bg: "#0b1020", surface: "#111831", text: "#e8ecf8", accent: "#3dd6d0", muted: "#8ea0c9" },
  typography: { titleFont: "Noto Sans SC", bodyFont: "Source Han Sans SC", codeFont: "JetBrains Mono" },
  spacing: { pagePadding: "32px", slideGap: "56px", innerPadding: "40px" },
  motion: { enabled: true, duration: 520, easing: "cubic-bezier(.2,.8,.2,1)" },
  behavior: { snap: true, showProgress: true, showSlideNumber: true },
  canvas: { maxWidth: 1280, ratio: "16/9", radius: "18px", shadow: "medium" }
};

const PPT_SCRIPT = {
  meta: { title: "", author: "", date: "", audience: "", objective: "" },
  slides: [
    { id: "s1", type: "cover", title: "", subtitle: "", body: [] }
  ]
};
```

## Output Checklist

Before finalizing, verify:
- `16:9` ratio is preserved for all slides.
- Slide spacing is configurable.
- Language/theme/script are clearly editable in one location.
- Output includes brief instructions on where to edit config and content.

## Resources

- `references/prompt-pack.md`: reusable control-prompt templates for this skill.

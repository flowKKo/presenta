---
name: ppt-scroll-web-builder
description: Build or update vertically scrollable 16:9 PPT-like web apps with Vite + React + TypeScript + Tailwind CSS + Framer Motion + ECharts. Use when users request config-driven decks controlled by lang/style/script, including six preset styles and natural-language custom style descriptions from Markdown scripts.
---

# PPT Scroll Web Builder

## Overview

Build a vertically scrollable PPT-like web app where each slide is a 16:9 canvas.
Keep control surface minimal: `lang`, `style`, and `script`.
Always run quality gates:
- Pre-build: apply rules from `references/ppt-quality-rulebook.md`.
- Post-build: run anti-rules from `references/ppt-quality-rulebook.md`.

## Architecture Contract

Use this stack unless the user explicitly overrides it:
- Build: Vite
- Framework: React + TypeScript
- Styling: Tailwind CSS
- Motion: Framer Motion
- Charts: ECharts + `echarts-for-react`

Avoid fallback to plain HTML-only templates when this skill is triggered under this architecture.

## Required Inputs

Always model these inputs first:
1. `lang`: output language code, such as `zh-CN`, `en-US`, `ja-JP`
2. `style`: preset ID or natural-language style text
3. `script`: selectable path to a Markdown file used as source content

Treat them as the only mandatory controls.
Do not hardcode the script filename (for example `./script.md`).

## Style System

Support these preset style IDs:
- `tech-dark`
- `minimal-light`
- `gradient-warm`
- `corporate`
- `retro-terminal`
- `glassmorphism`

If `style` is not one of the preset IDs, treat it as natural-language custom style and resolve tokens from text.

Use file-based modular style loading:
- Core resolver entry: `references/styles/index.ts`
- Type contract: `references/styles/types.ts`
- One preset per file in: `references/styles/presets/*.ts`
- Natural-language custom style template: `references/styles/custom/swiss-minimal.ts`
- Backward compatible export entry: `references/style-presets.ts`

To add a new preset style:
1. Create one file under `references/styles/presets/` that exports a default `StylePreset`.
2. Keep `id` unique and lowercase-hyphen format.
3. No central array update is required because resolver auto-loads preset files.

To remove a preset style:
1. Delete the corresponding file in `references/styles/presets/`.
2. Verify no user prompt still references that `id`.

## Script Parsing

Read `script` as Markdown and convert to slides:
- `#` for deck title/meta
- `##` for slide title boundaries
- paragraphs and list items for slide body
- `---` for explicit slide break

Allow both relative and absolute paths and validate extension (`.md` or `.markdown`).
Return a clear error when the file path is missing or unreadable.

## Workflow

1. Load quality rules before implementation.
- Read `references/ppt-quality-rulebook.md`.
- Select applicable rules and translate them to implementation constraints for this task.
- Explicitly decide fixed padding, utilization target, and typography hierarchy before coding.

2. Confirm input controls.
- Validate `lang`, `style`, `script`.
- Confirm any optional preferences (slide gap, snap, progress UI).

3. Generate control prompt or implementation.
- Prompt mode: load `references/prompt-pack.md`, fill placeholders, write into `AGENTS.md` if requested.
- Implementation mode: generate Vite React TS app structure and wire parsing + style resolver.

4. Implement style resolution.
- Import resolver from `references/styles/index.ts` (or compatibility entry `references/style-presets.ts`).
- Apply tokens as CSS variables or Tailwind-compatible runtime variables.
- Keep charts aligned with style tokens, including positive/negative/neutral colors.

5. Implement animation and chart behavior.
- Use Framer Motion for entry and section transitions.
- Respect `prefers-reduced-motion`.
- Use ECharts with minimal grid lines for minimalist themes.

6. Verify output quality with rule coverage.
- Keep every slide in 16:9.
- Keep spacing and layout responsive.
- Keep all visible copy sourced from parsed script content.
- Document where to change `lang`, `style`, and `script`.

7. Run anti-rule audit before final delivery.
- Use anti-rules in `references/ppt-quality-rulebook.md`.
- Report pass/fail for each anti-rule item.
- If any item fails, revise and re-check before shipping.

## Swiss-Style Guidance

When user style text implies Swiss minimal professional design, apply:
- Background `#F5F5F0`
- Primary text `#333333`
- Positive accent `#4CAF50`
- Negative accent `#E57373`
- Neutral tech accent `#546E7A`
- Card `#FFFFFF` with subtle shadow (`0 10px 20px rgba(0,0,0,0.05)`)
- Radius range `12px` to `16px`
- Sans-serif typography with bold headlines and regular body text
- Flat charts with no heavy grid lines

Use Framer Motion layout transitions to emulate morph-like continuity between slides when appropriate.

## Resources

- `references/prompt-pack.md`: reusable prompt templates for this stack and control model.
- `references/ppt-quality-rulebook.md`: PPT best practices mapped to frontend rules and anti-rule QA checks.
- `references/styles/index.ts`: modular style loader and runtime resolver.
- `references/styles/presets/*.ts`: one style per file for add/remove growth.
- `references/styles/custom/swiss-minimal.ts`: Swiss-style mapping for natural-language style requests.
- `references/style-presets.ts`: compatibility re-export for legacy imports.

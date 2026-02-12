# PPT Quality Rulebook (Rules + Anti-Rules)

Use this file as a mandatory quality gate:
- Before implementation: apply the Rules section.
- After implementation: run the Anti-Rules checklist.

## Usage Workflow

1. Load this file before writing page code.
2. Pick applicable rules and convert them into implementation decisions.
3. Build slides with those decisions.
4. Run the anti-rules checklist after build.
5. Fix failures before final delivery.

## Rules (Pre-Build)

### R01 One Slide, One Message
- Principle: each slide should communicate one core point.
- Frontend mapping: use a `SlideModel` with `title`, `keyMessage`, `supportingPoints`.
- Implementation: cap bullet count and avoid mixed narrative goals on one slide.
- Acceptance: no slide contains more than 1 key message and 3-5 supporting bullets.

### R02 Content Utilization Ratio
- Principle: content should not overfill or underfill the 16:9 canvas.
- Frontend mapping: define a safe content container inside each slide.
- Implementation: set safe area width/height and auto-wrap long text.
- Acceptance: visual occupancy target is 40%-75% of slide content area.

### R03 Fixed Padding and Spacing Scale
- Principle: spacing must be deterministic and consistent.
- Frontend mapping: expose padding and spacing tokens (`--slide-pad-x`, `--slide-pad-y`, `--space-*`).
- Implementation: use one spacing scale (e.g., 4/8px system) and avoid ad-hoc values.
- Acceptance: slide inner padding is fixed by tokens, not arbitrary per component.

### R04 Unified Visual Tokens
- Principle: keep style coherent across the deck.
- Frontend mapping: all colors, radius, shadow, and typography come from style tokens.
- Implementation: route all UI surfaces through tokenized CSS variables or Tailwind theme extension.
- Acceptance: no hardcoded inline colors/radius/shadows in slide components.

### R05 Typography Hierarchy
- Principle: hierarchy must be obvious at a glance.
- Frontend mapping: define title/subtitle/body/caption token set.
- Implementation: limit font families to 1-2, keep title bold and body regular.
- Acceptance: headings, body, and metadata are visually distinguishable and consistent.

### R06 Grid and Alignment Discipline
- Principle: alignment creates professional polish.
- Frontend mapping: use a consistent layout grid (`single`, `two-column`, `media+text`).
- Implementation: snap blocks to shared columns and baseline rhythm.
- Acceptance: no accidental misalignment between title, text blocks, and chart edges.

### R07 Readability and Contrast
- Principle: content must remain readable in presentation conditions.
- Frontend mapping: use contrast-aware text/background pairs in style tokens.
- Implementation: enforce minimum text sizes and contrast checks.
- Acceptance: body text is readable on projector-like conditions; avoid low-contrast pairs.

### R08 Chart Minimalism
- Principle: charts should show insight, not decoration.
- Frontend mapping: configure ECharts theme from style tokens.
- Implementation: avoid 3D effects, reduce grid noise, highlight key series only.
- Acceptance: each chart emphasizes one takeaway and remains readable within 5 seconds.

### R09 Motion With Intent
- Principle: animation should support narrative transitions, not distract.
- Frontend mapping: use Framer Motion presets for entry and transitions.
- Implementation: keep duration range constrained and enable reduced-motion fallback.
- Acceptance: motion is subtle, consistent, and disabled when reduced-motion is requested.

### R10 Whitespace and Breathing Room
- Principle: clean decks rely on negative space.
- Frontend mapping: reserve empty regions in slide layouts.
- Implementation: avoid filling every area with content; prefer fewer elements with clear grouping.
- Acceptance: each slide has intentional blank space around primary content.

### R11 Icon and Visual Asset Consistency
- Principle: mixed visual languages break trust.
- Frontend mapping: choose one icon family and one illustration style per deck.
- Implementation: normalize stroke width, color usage, and size scale.
- Acceptance: icons and decorative visuals look like one system.

### R12 Language and Terminology Consistency
- Principle: wording style must stay coherent.
- Frontend mapping: centralize UI labels and text language mode (`lang`).
- Implementation: avoid mixed-language UI unless explicitly requested.
- Acceptance: terminology and tone remain consistent across all slides.

## Anti-Rules (Post-Build Checks)

### A01 Overloaded Slide
- Smell: dense paragraphs, too many bullets, cramped layout.
- Check: if slide feels unreadable in 5-8 seconds, fail.

### A02 Padding Drift
- Smell: different slides use random inner spacing.
- Check: if spacing tokens are bypassed, fail.

### A03 Token Bypass
- Smell: hardcoded colors, fonts, radius, shadow in component markup.
- Check: if style is not sourced from tokens, fail.

### A04 Style Fragmentation
- Smell: multiple conflicting visual personalities in one deck.
- Check: if style cannot be summarized in one sentence, fail.

### A05 Typography Chaos
- Smell: too many font sizes/families or weak hierarchy.
- Check: if title/body/meta are hard to distinguish, fail.

### A06 Chart Noise
- Smell: excessive axes, labels, legend clutter, heavy grids.
- Check: if key insight is not obvious within 5 seconds, fail.

### A07 Motion Overuse
- Smell: animation on nearly every element or inconsistent easing.
- Check: if motion competes with content, fail.

### A08 Ratio/Responsive Break
- Smell: slide ratio breaks, clipping, or unstable layouts on mobile/desktop.
- Check: if 16:9 or safe area is broken at common breakpoints, fail.

### A09 Script Decoupling
- Smell: visible content not traceable to `script` input.
- Check: if text is hardcoded outside parsed script source, fail.

### A10 Language Drift
- Smell: mixed language labels when not requested.
- Check: if output language does not match `lang`, fail.

### A11 Inaccessible Contrast
- Smell: low contrast text on styled backgrounds.
- Check: if major text blocks are hard to read, fail.

### A12 No Final Audit
- Smell: deck shipped without anti-rule review.
- Check: if no documented anti-rule pass/fail summary is provided, fail.

## Delivery Checklist Template

Use this checklist in the final QA summary:

- [ ] A01 Overloaded Slide
- [ ] A02 Padding Drift
- [ ] A03 Token Bypass
- [ ] A04 Style Fragmentation
- [ ] A05 Typography Chaos
- [ ] A06 Chart Noise
- [ ] A07 Motion Overuse
- [ ] A08 Ratio/Responsive Break
- [ ] A09 Script Decoupling
- [ ] A10 Language Drift
- [ ] A11 Inaccessible Contrast
- [ ] A12 No Final Audit

If any item fails, iterate before final delivery.

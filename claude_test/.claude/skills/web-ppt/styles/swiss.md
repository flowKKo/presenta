# Swiss Style (瑞士国际主义设计风格)

极简、米白色底、专业设计风格。

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-page` | `#EEEEE8` | 页面背景（slide 间的底色） |
| `--bg-slide` | `#F5F5F0` | Slide 背景（米白色） |
| `--bg-card` | `#FFFFFF` | 卡片/信息块背景 |
| `--text-primary` | `#333333` | 主文字（深炭灰，替代纯黑） |
| `--text-secondary` | `#757575` | 副文字/说明文字 |
| `--text-caption` | `#9E9E9E` | 标注/来源文字 |
| `--accent-positive` | `#4CAF50` | 正向/增益数据（Matte Green） |
| `--accent-negative` | `#E57373` | 负向/警告数据（Muted Red） |
| `--accent-neutral` | `#546E7A` | 科技/中性强调（Blue Grey） |
| `--border` | `rgba(0,0,0,0.06)` | 卡片边框/分隔线 |

## Typography

| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Slide title (H1) | Inter / HarmonyOS Sans | 52-64px | 700 | `--text-primary` |
| Key numbers | Inter | 90-120px | 800 | `--text-primary` or accent |
| Subtitle (H2) | Inter | 32-40px | 600 | `--text-primary` |
| Body | Inter | 24-28px | 400 | `--text-primary` |
| Caption / Source | Inter | 16-18px | 400 | `--text-caption` |

Font stack: `'Inter', 'HarmonyOS Sans', 'Source Han Sans', -apple-system, 'Helvetica Neue', sans-serif`

**Rules:**
- Never use serif fonts (no 宋体, no Times New Roman)
- Title uses Medium/Bold weight only
- Body uses Regular weight
- Line height: 1.5 for body, 1.2 for titles

## Card Style

```css
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 32px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.04);
}
```

## Slide Style

```css
.slide {
  background: var(--bg-slide);
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.06);
}
```

No heavy shadows. Shadows should be barely visible — just enough to lift the slide off the page background.

## Chart / Data Visualization

- **Flat design**: no gradients on bars, no 3D effects
- **No grid lines**: remove all grid lines from charts, only keep data bars and labels
- **Bar chart colors**: use `--accent-positive` for positive, `--accent-negative` for negative, `--accent-neutral` for neutral
- **Bar border-radius**: 6px top corners
- **Bar chart background track**: `#F0F0EA` (subtle track behind bars)
- **Label position**: values above/inside bars, category labels below

## Layout Principles

- **Generous whitespace** — the essence of Swiss style on off-white background. Do NOT fill every slide to capacity.
- **Grid alignment** — all elements align to an implicit grid
- **Asymmetric balance** — title left-aligned, content can be offset right
- **Minimal decoration** — no unnecessary borders, icons, or ornaments
- **Dividers**: use thin 1px lines in `rgba(0,0,0,0.08)` sparingly

## Placeholder Box

```css
.placeholder-box {
  border: 1.5px dashed rgba(0,0,0,0.15);
  border-radius: 12px;
  background: rgba(0,0,0,0.02);
  color: var(--text-caption);
}
```

## Animations

- Subtle `fadeIn` + slight `translateY(20px)` entrance
- Duration: 0.6s with `cubic-bezier(0.16, 1, 0.3, 1)` easing
- Stagger: 100ms between elements within a slide
- No bouncing, no scaling, no color transitions

## Icons

- Line-style icons only (Remix Icon / Phosphor Icons aesthetic)
- Stroke width: 1.5-2px
- Color: `--text-primary` (#333333)
- Implemented as inline SVG

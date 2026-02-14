# Web PPT Playground

基于 Web 技术的演示文稿编辑器与播放器。支持 16:9 幻灯片的所见即所得编辑、7 种图表引擎、11 种 slide 类型、自由布局 Block 模型，以及全屏演示模式。

## 特性

- **11 种 Slide 类型** — 标题页、关键点、图表 (柱/饼/折线/雷达)、网格卡片、序列流程、对比、漏斗/金字塔、同心环、辐射图、韦恩图、自由布局 Block
- **7 个图表引擎** — GridItem / Sequence / Compare / Funnel / Concentric / HubSpoke / Venn，每个引擎支持多种 variant 皮肤
- **Block 自由布局** — 在一张 slide 上放置多个可拖拽、可缩放的内容块，每个块可以是任意图表类型
- **WYSIWYG 编辑** — 右侧属性面板、行内文本编辑、拖拽排序、Undo/Redo、叠加层 (文字/矩形/线段)
- **全屏演示** — 支持 Spotlight 逐块揭示动画
- **Deck 管理** — 创建、导入 (JSON)、导出、删除演示文稿；基于文件的持久化存储
- **AI 生成** — 通过 Claude Code 的 `/web-ppt` Skill 从文稿自动生成幻灯片

## 技术栈

| 层 | 技术 |
|---|------|
| 构建 | Vite 7 + TypeScript |
| UI | React 19 |
| 样式 | Tailwind CSS 4 |
| 动画 | Framer Motion |
| 图表 | ECharts 6 + echarts-for-react |

## 快速开始

```bash
npm install
npm run dev
```

打开 `http://localhost:5173/`，进入 Deck 选择页。点击卡片进入某个演示文稿，或创建新的。

## URL 路由

| URL | 页面 |
|-----|------|
| `localhost:5173/` | Deck 选择器 (创建 / 导入 / 删除) |
| `localhost:5173/#deck-id` | 查看 / 编辑指定 Deck |

## 项目结构

```
src/
├── App.tsx                     # 根路由，Deck CRUD，hash 导航
├── main.tsx                    # React 入口
├── index.css                   # Tailwind 指令 + 滚动条样式
├── charts/                     # ECharts 封装 (Bar/Pie/Line/Radar)
├── components/
│   ├── SlideDeck.tsx           # Deck 容器、导航、工具栏
│   ├── Sidebar.tsx             # 左侧缩略图面板 (可拖拽排序、右键菜单)
│   ├── Slide.tsx               # 16:9 Slide 容器 + 入场动画
│   ├── SlideContent.tsx        # 类型路由 → 各 Slide 组件
│   ├── DeckSelector.tsx        # 首页 Deck 选择器
│   ├── FullscreenOverlay.tsx   # 全屏演示 + Spotlight
│   ├── slides/                 # Title / KeyPoint / Chart Slide
│   ├── engines/                # 7 个图表引擎 + shared (EngineTitle, ConnectorArrow)
│   ├── blocks/                 # Block 模型 (BlockRenderer, BlockSlideRenderer, BlockWrapper)
│   └── editor/                 # 编辑器 (EditorProvider, PropertyPanel, LayoutPicker, ...)
├── data/
│   ├── types.ts                # 全部类型定义 (SlideData union, BlockData, ContentBlock)
│   ├── editor-types.ts         # 编辑器状态类型
│   ├── deck-io.ts              # JSON 导入 / 导出
│   ├── block-adapter.ts        # 旧 Slide → Block 转换
│   ├── type-converter.ts       # Slide 类型转换 + 默认值工厂
│   └── decks/                  # Deck 数据 (内置 + 用户生成)
├── hooks/                      # useFullscreen, useSpotlight, ...
└── theme/
    └── swiss.ts                # Swiss Style 主题 (颜色、动画、ECharts 主题)

vite-plugin-deck-api.ts         # Vite 开发服务器插件：文件级 Deck 持久化 API
vite.config.ts                  # Vite 配置
```

## 操作指南

### 导航
- **鼠标滚轮** / **方向键** / **PageUp/PageDown** — 切换 slide
- **左侧缩略图** — 点击跳转，拖拽排序，右键菜单 (复制 / 删除 / 插入)

### 编辑
- **点击 slide 内容** — 选中，右侧弹出属性面板
- **双击文本** — 行内编辑
- **属性面板** — 修改类型、variant、数据字段、间距等
- **工具栏** — 文本/矩形/线段叠加层、Undo/Redo
- **Ctrl+Z / Ctrl+Shift+Z** — 撤销 / 重做
- **Delete** — 删除选中元素

### 全屏演示
- 点击工具栏全屏按钮进入演示模式
- 支持 Spotlight 模式：逐个揭示 block 内容

## AI Skill 生成

通过 Claude Code 的 `/web-ppt` Skill 可以从口播稿自动生成完整演示文稿：

```
/web-ppt --lang zh --style swiss --script slides.md --deck my-deck
```

## License

Private project.

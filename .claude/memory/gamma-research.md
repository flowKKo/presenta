# Gamma.app 调研 & 实施路线图

## Gamma 完整资产清单

### Smart Layouts（27 种）

**Columns（3）**：2 columns, 3 columns, 4 columns

**Boxes（12）**：
- Solid boxes / Solid boxes with icons / Outline boxes
- Side line boxes / Side line text / Top line text
- Top circle boxes / Joined boxes / Joined boxes with icons
- Leaf boxes / Labeled boxes / Alternating boxes

**Bullets（5）**：Large bullets, Small bullets, Arrow bullets, Process steps, Solid box small bullets

**Sequence（6）**：Timeline, Minimal timeline, Minimal timeline with boxes, Arrows, Pills, Slanted labels

**Images（2）**：Images with text, Icons with text

---

### Smart Diagrams（39 种）

| 名称 | 视觉形态 | 数据结构 |
|---|---|---|
| Semi circle road | 半圆弧路径+节点 | 有序序列 |
| Target | 靶心同心圆 | 层级环 |
| Minimal road | 简约路径+里程碑 | 有序序列 |
| Linear venn | 线性交集圆 | 集合关系 |
| Linear venn filled | 线性填充交集 | 集合关系 |
| Diamonds | 菱形网格 | 等权多项 |
| Minimal funnel | 简约漏斗 | 漏斗递减 |
| Connected circles | 连线圆圈 | 等权多项 |
| Concentric circles | 同心圆 | 层级环 |
| Funnel 3d | 3D 漏斗 | 漏斗递减 |
| Road | 道路+里程碑 | 有序序列 |
| Isometric building | 等轴建筑 | 等权多项(装饰) |
| Isometric globe | 等轴地球 | 等权多项(装饰) |
| Isometric dashed squares | 等轴虚线方块 | 等权多项(装饰) |
| Gears | 齿轮互锁 | 等权多项 |
| Pillar | 柱子/支柱 | 等权多项 |
| Orbit | 轨道环绕 | 中心辐射 |
| Venn diagram | 经典韦恩图 | 集合关系 |
| Chain | 链式节点 | 有序序列 |
| Bullseye | 靶心分层 | 层级环 |
| Ribbon arrows | 丝带箭头流 | 有序序列 |
| Ideas | 想法脑图 | 中心辐射 |
| Inputs | 输入汇聚 | 对比矩阵 |
| Quadrant | 四象限矩阵 | 对比矩阵 |
| Swoosh | 弧形流动 | 有序序列 |
| Versus | 左右对决 | 对比矩阵 |
| Infinity | ∞ 形循环 | 对比矩阵 |
| Square arrows | 方块箭头流 | 有序序列 |
| Puzzle | 拼图互锁 | 等权多项(隐喻) |
| Bubbles | 气泡群 | 等权多项 |
| Nested diamond | 嵌套菱形 | 层级环 |
| Packed circles | 填充圆群 | 等权多项 |
| Arrow bars | 箭头条状 | 有序序列 |
| Pinwheel | 风车旋转 | 中心辐射 |
| Iceberg | 冰山隐喻 | 对比矩阵(隐喻) |
| Slope | 倾斜递进 | 有序序列 |
| Hot air balloons | 热气球漂浮 | 等权多项(隐喻) |
| Solar system | 太阳系环绕 | 中心辐射 |
| Signs | 路牌指示 | 等权多项 |

### Image Diagrams（9 种）
Circle hero, Note collage, Impact, Oval, Arch, Leaf, Image arc, Accent circle, Semi circle

### Charts（6 种）
Column, Bar, Line, Pie, Donut, Ring

---

## 核心洞察：7 种数据结构模式

| 模式 | 包含的 Diagram | 数量 |
|---|---|---|
| **有序序列** (ordered nodes) | Semi circle road, Minimal road, Road, Chain, Ribbon arrows, Swoosh, Square arrows, Arrow bars, Slope, Arrows, Pills, Slanted labels | 12 |
| **层级环** (concentric layers) | Target, Bullseye, Concentric circles, Nested diamond | 4 |
| **漏斗/递减** (funnel) | Minimal funnel, Funnel 3d | 2 |
| **中心辐射** (hub-spoke) | Orbit, Solar system, Ideas, Pinwheel | 4 |
| **集合关系** (sets) | Venn, Linear venn, Linear venn filled | 3 |
| **等权多项** (N items) | Diamonds, Pillar, Puzzle, Gears, Hot air balloons, Signs, Bubbles, Packed circles, Isometric* | 11 |
| **对比/矩阵** (comparison) | Versus, Quadrant, Infinity, Inputs, Iceberg | 5 |

**39 个 diagram → 7 个引擎 + 多种视觉皮肤**

---

## 实施路线图

### Phase 1（P0，~1周）— 覆盖 ~70% 场景

| 引擎 | 覆盖 | 首批皮肤 | 技术路径 |
|---|---|---|---|
| **SequenceEngine** | 12 diagram | Timeline, Chain, Arrows | Flex 横排 + SVG 连线，`variant` 切换箭头/路径/胶囊样式 |
| **GridItemEngine** | 11 diagram + 12 box layout | Solid boxes, Outline boxes, Pillar | CSS Grid + 卡片变体(实心/描边/侧线/顶线)，`cardStyle` 切换 |
| **FunnelPyramidEngine** | Funnel + Pyramid + Slope | Minimal funnel, Slope | CSS clip-path 梯形堆叠，`direction` 控制正/倒 |
| **CompareEngine** | Versus, Quadrant, Iceberg | Versus, Quadrant | 左右分栏 / SVG 十字轴，`mode` 切换 |
| **Chart 扩展** | Pie/Donut, Line/Area | — | ECharts `type: 'pie'` / `type: 'line'` |

### Phase 2（P1，~1周）— 差异化

| 引擎 | 覆盖 | 首批皮肤 | 技术路径 |
|---|---|---|---|
| **ConcentricEngine** | Target, Bullseye, Concentric circles, Nested diamond | Bullseye, Target | SVG 同心圆/环 + 标签定位 |
| **HubSpokeEngine** | Orbit, Solar system, Ideas, Pinwheel | Orbit, Solar system | SVG 中心节点 + 椭圆轨道 + 卫星定位 |
| **VennEngine** | Venn, Linear venn, Linear venn filled | Venn diagram | SVG 圆 + mix-blend-mode + 交集区文字 |

### Phase 3（P2，按需）— 装饰性

| 引擎 | 覆盖 | 说明 |
|---|---|---|
| **IsometricEngine** | Isometric building/globe/dashed squares | CSS transform 或预制 SVG |
| **MetaphorEngine** | Iceberg, Hot air balloons, Puzzle, Gears, Infinity | 独立 SVG 绘制 |
| **ImageDiagramEngine** | 9 种 image diagram | CSS clip-path + object-fit |

---

## 架构设计原则

- **引擎 + 皮肤分离**：`SlideData` 中用 `engine` + `variant` 字段驱动
- 39 种视觉效果只需 ~7 个引擎组件
- 每个引擎接收统一的数据结构，皮肤层只控制视觉表现
- Layout 和 Diagram 共享相同的引擎（如 GridItemEngine 同时服务 Box layouts 和 N-item diagrams）

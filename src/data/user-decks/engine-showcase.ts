import type { DeckMeta } from '../types'

export const engineShowcase: DeckMeta = {
  id: 'engine-showcase',
  title: '全引擎演示 · Engine Showcase',
  description: '17 种幻灯片类型 · 13 大图解引擎 · 20 种图表 · 全部变体展示',
  date: '2026-02',
  slides: [
    // ═══════════════════════════════════════════════════
    // OPENING
    // ═══════════════════════════════════════════════════
    {
      type: 'title',
      title: 'Engine Showcase',
      subtitle: '17 种幻灯片 · 13 大引擎 · 20 种图表 · 全变体演示',
      badge: 'v2.0',
      titleSize: 88,
      bodySize: 28,
    },
    {
      type: 'key-point',
      title: '数据驱动，类型丰富',
      body: '本演示文稿涵盖全部 17 种幻灯片类型、20 种 ECharts 图表、以及 13 大图解引擎的所有视觉变体',
      titleSize: 64,
      bodySize: 24,
    },

    // ═══════════════════════════════════════════════════
    // SECTION: CHARTS (20 types)
    // ═══════════════════════════════════════════════════
    {
      type: 'title',
      title: '数据可视化',
      subtitle: '20 种 ECharts 图表类型',
      titleSize: 72,
      bodySize: 28,
    },

    // --- bar ---
    {
      type: 'chart',
      chartType: 'bar',
      title: '季度营收同比增长 23%',
      body: '各产品线均实现正增长，企业版贡献最大',
      titleSize: 40,
      bodySize: 20,
      bars: [
        { category: 'Q1', values: [{ name: '企业版', value: 280 }, { name: '个人版', value: 120 }] },
        { category: 'Q2', values: [{ name: '企业版', value: 340 }, { name: '个人版', value: 155 }] },
        { category: 'Q3', values: [{ name: '企业版', value: 410 }, { name: '个人版', value: 180 }] },
        { category: 'Q4', values: [{ name: '企业版', value: 520 }, { name: '个人版', value: 210 }] },
      ],
      highlight: '¥1,550M',
    },

    // --- horizontal-bar ---
    {
      type: 'chart',
      chartType: 'horizontal-bar',
      title: '技术栈采用率 Top 6',
      body: 'React 生态占据绝对优势',
      titleSize: 40,
      bodySize: 20,
      bars: [
        { category: 'React', values: [{ name: '采用率', value: 92 }] },
        { category: 'TypeScript', values: [{ name: '采用率', value: 87 }] },
        { category: 'Tailwind', values: [{ name: '采用率', value: 78 }] },
        { category: 'Vite', values: [{ name: '采用率', value: 72 }] },
        { category: 'ECharts', values: [{ name: '采用率', value: 65 }] },
        { category: 'Framer', values: [{ name: '采用率', value: 58 }] },
      ],
    },

    // --- stacked-bar ---
    {
      type: 'chart',
      chartType: 'stacked-bar',
      title: '各区域用户构成分析',
      body: '北美和欧洲市场占比超 60%',
      titleSize: 40,
      bodySize: 20,
      bars: [
        { category: '北美', values: [{ name: '企业', value: 45 }, { name: '团队', value: 30 }, { name: '个人', value: 25 }] },
        { category: '欧洲', values: [{ name: '企业', value: 38 }, { name: '团队', value: 35 }, { name: '个人', value: 27 }] },
        { category: '亚太', values: [{ name: '企业', value: 28 }, { name: '团队', value: 22 }, { name: '个人', value: 50 }] },
        { category: '其他', values: [{ name: '企业', value: 15 }, { name: '团队', value: 20 }, { name: '个人', value: 35 }] },
      ],
    },

    // --- pie ---
    {
      type: 'chart',
      chartType: 'pie',
      title: '收入来源占比分布',
      body: '订阅收入占主导地位',
      titleSize: 40,
      bodySize: 20,
      slices: [
        { name: '订阅', value: 55 },
        { name: '企业授权', value: 25 },
        { name: '咨询服务', value: 12 },
        { name: '培训', value: 8 },
      ],
    },

    // --- donut ---
    {
      type: 'chart',
      chartType: 'donut',
      title: '设备访问占比',
      body: '移动端流量占比持续攀升',
      titleSize: 40,
      bodySize: 20,
      slices: [
        { name: '桌面端', value: 42 },
        { name: '移动端', value: 38 },
        { name: '平板', value: 15 },
        { name: '其他', value: 5 },
      ],
      innerRadius: 45,
    },

    // --- rose ---
    {
      type: 'chart',
      chartType: 'rose',
      title: '各模块代码量分布',
      body: '引擎模块占比最大',
      titleSize: 40,
      bodySize: 20,
      slices: [
        { name: '引擎', value: 3200 },
        { name: '编辑器', value: 2800 },
        { name: '图表', value: 2100 },
        { name: '区块', value: 1500 },
        { name: '数据层', value: 1200 },
        { name: '主题', value: 600 },
      ],
    },

    // --- line ---
    {
      type: 'chart',
      chartType: 'line',
      title: '月活用户突破 50 万',
      body: '增长趋势稳健，Q4 环比增速 18%',
      titleSize: 40,
      bodySize: 20,
      highlight: '52.3 万',
      categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      lineSeries: [
        { name: 'MAU', data: [28, 30, 32, 35, 37, 39, 41, 43, 45, 48, 50, 52.3] },
      ],
    },

    // --- area ---
    {
      type: 'chart',
      chartType: 'area',
      title: 'API 日均调用量增长 3.5 倍',
      body: '从年初 12 万次增长至 42 万次',
      titleSize: 40,
      bodySize: 20,
      categories: ['1月', '3月', '5月', '7月', '9月', '11月'],
      lineSeries: [
        { name: '调用量(万)', data: [12, 16, 22, 28, 35, 42], area: true },
      ],
    },

    // --- radar ---
    {
      type: 'chart',
      chartType: 'radar',
      title: '产品能力雷达对比',
      body: '在可视化和易用性维度领先',
      titleSize: 40,
      bodySize: 20,
      indicators: [
        { name: '可视化', max: 100 },
        { name: '易用性', max: 100 },
        { name: '性能', max: 100 },
        { name: '扩展性', max: 100 },
        { name: '安全性', max: 100 },
        { name: '生态', max: 100 },
      ],
      radarSeries: [
        { name: '我方', values: [95, 90, 82, 78, 85, 70] },
        { name: '竞品A', values: [70, 65, 88, 82, 80, 85] },
      ],
    },

    // --- proportion ---
    {
      type: 'chart',
      chartType: 'proportion',
      title: '核心指标达成率均超 75%',
      body: '用户满意度和系统可用性表现突出',
      titleSize: 40,
      bodySize: 20,
      proportionItems: [
        { name: '用户满意度', value: 94, max: 100 },
        { name: '系统可用性', value: 99.7, max: 100 },
        { name: '功能覆盖率', value: 87, max: 100 },
        { name: '测试覆盖率', value: 78, max: 100 },
        { name: '文档完成率', value: 65, max: 100 },
      ],
    },

    // --- waterfall ---
    {
      type: 'chart',
      chartType: 'waterfall',
      title: '利润从 120 万增长至 280 万',
      body: '新增收入和成本优化共同驱动',
      titleSize: 40,
      bodySize: 20,
      waterfallItems: [
        { name: '期初利润', value: 120, type: 'total' },
        { name: '新增订阅', value: 95, type: 'increase' },
        { name: '企业合同', value: 60, type: 'increase' },
        { name: '成本优化', value: 35, type: 'increase' },
        { name: '人力成本', value: -20, type: 'decrease' },
        { name: '运营支出', value: -10, type: 'decrease' },
        { name: '期末利润', value: 280, type: 'total' },
      ],
    },

    // --- combo ---
    {
      type: 'chart',
      chartType: 'combo',
      title: '营收与利润率双升',
      body: '营收增长伴随利润率优化',
      titleSize: 40,
      bodySize: 20,
      categories: ['Q1', 'Q2', 'Q3', 'Q4'],
      comboSeries: [
        { name: '营收(万)', data: [400, 495, 590, 730], seriesType: 'bar' },
        { name: '利润率(%)', data: [18, 22, 25, 28], seriesType: 'line', yAxisIndex: 1 },
      ],
    },

    // --- scatter ---
    {
      type: 'chart',
      chartType: 'scatter',
      title: '功能复杂度与用户满意度关联',
      body: '适度复杂度下满意度最高',
      titleSize: 40,
      bodySize: 20,
      scatterXAxis: '复杂度',
      scatterYAxis: '满意度',
      scatterSeries: [
        { name: '核心功能', data: [[20, 92, 50], [35, 88, 40], [50, 95, 60], [65, 82, 35], [80, 70, 25]] },
        { name: '扩展功能', data: [[30, 78, 30], [45, 85, 45], [60, 75, 35], [75, 68, 20], [90, 55, 15]] },
      ],
    },

    // --- gauge ---
    {
      type: 'chart',
      chartType: 'gauge',
      title: '系统健康指数 92 分',
      body: '综合监控评估结果',
      titleSize: 40,
      bodySize: 20,
      gaugeData: { value: 92, max: 100, name: '健康指数' },
    },

    // --- treemap ---
    {
      type: 'chart',
      chartType: 'treemap',
      title: '代码库模块分布',
      body: '按文件数量和行数分组',
      titleSize: 40,
      bodySize: 20,
      treemapData: [
        { name: '引擎', value: 3200, children: [
          { name: 'GridItem', value: 520 }, { name: 'Sequence', value: 380 }, { name: 'Compare', value: 340 },
          { name: 'Cycle', value: 310 }, { name: 'Funnel', value: 280 }, { name: 'Others', value: 1370 },
        ]},
        { name: '编辑器', value: 2800, children: [
          { name: 'Provider', value: 800 }, { name: 'Property', value: 600 }, { name: 'SlideData', value: 500 },
          { name: 'Toolbar', value: 400 }, { name: 'Others', value: 500 },
        ]},
        { name: '图表', value: 2100 },
        { name: '区块系统', value: 1500 },
      ],
    },

    // --- sankey ---
    {
      type: 'chart',
      chartType: 'sankey',
      title: '用户行为流转路径',
      body: '从访问到付费的完整链路',
      titleSize: 40,
      bodySize: 20,
      sankeyNodes: [
        { name: '首页访问' }, { name: '功能浏览' }, { name: '注册' },
        { name: '试用' }, { name: '付费' }, { name: '流失' },
      ],
      sankeyLinks: [
        { source: '首页访问', target: '功能浏览', value: 800 },
        { source: '首页访问', target: '流失', value: 200 },
        { source: '功能浏览', target: '注册', value: 500 },
        { source: '功能浏览', target: '流失', value: 300 },
        { source: '注册', target: '试用', value: 350 },
        { source: '注册', target: '流失', value: 150 },
        { source: '试用', target: '付费', value: 200 },
        { source: '试用', target: '流失', value: 150 },
      ],
    },

    // --- heatmap ---
    {
      type: 'chart',
      chartType: 'heatmap',
      title: '一周各时段活跃度热力图',
      body: '工作日上午和下午为峰值时段',
      titleSize: 40,
      bodySize: 20,
      categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      heatmapYCategories: ['上午', '下午', '晚间', '深夜'],
      heatmapData: [
        [0,0,85],[1,0,90],[2,0,88],[3,0,92],[4,0,87],[5,0,40],[6,0,35],
        [0,1,92],[1,1,95],[2,1,90],[3,1,88],[4,1,80],[5,1,45],[6,1,38],
        [0,2,60],[1,2,65],[2,2,62],[3,2,58],[4,2,70],[5,2,72],[6,2,68],
        [0,3,20],[1,3,18],[2,3,22],[3,3,15],[4,3,25],[5,3,30],[6,3,28],
      ],
    },

    // --- sunburst ---
    {
      type: 'chart',
      chartType: 'sunburst',
      title: '组织架构与人员分布',
      body: '技术部门占比最大',
      titleSize: 40,
      bodySize: 20,
      sunburstData: [
        { name: '技术部', children: [
          { name: '前端', value: 12 }, { name: '后端', value: 15 }, { name: '数据', value: 8 }, { name: 'DevOps', value: 5 },
        ]},
        { name: '产品部', children: [
          { name: '产品', value: 6 }, { name: '设计', value: 8 },
        ]},
        { name: '运营部', children: [
          { name: '市场', value: 5 }, { name: '客服', value: 4 }, { name: '增长', value: 3 },
        ]},
        { name: '管理层', value: 4 },
      ],
    },

    // --- boxplot ---
    {
      type: 'chart',
      chartType: 'boxplot',
      title: '各模块响应时间分布',
      body: 'P50 均在 100ms 以内',
      titleSize: 40,
      bodySize: 20,
      boxplotItems: [
        { name: 'API 网关', values: [12, 25, 45, 78, 120] },
        { name: '业务逻辑', values: [18, 35, 55, 90, 150] },
        { name: '数据查询', values: [25, 45, 68, 110, 200] },
        { name: '缓存层', values: [2, 5, 8, 15, 30] },
        { name: '渲染引擎', values: [8, 15, 28, 50, 85] },
      ],
    },

    // --- gantt ---
    {
      type: 'chart',
      chartType: 'gantt',
      title: '项目里程碑与交付时间线',
      body: '5 个核心模块并行开发',
      titleSize: 40,
      bodySize: 20,
      categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
      ganttTasks: [
        { name: '需求分析', start: 0, end: 1, category: '规划' },
        { name: '架构设计', start: 0.5, end: 2, category: '规划' },
        { name: '引擎开发', start: 2, end: 5, category: '开发' },
        { name: '图表集成', start: 2.5, end: 4.5, category: '开发' },
        { name: '编辑器开发', start: 3, end: 6, category: '开发' },
        { name: '测试优化', start: 5, end: 7, category: '测试' },
        { name: '上线部署', start: 7, end: 8, category: '发布' },
      ],
    },

    // ═══════════════════════════════════════════════════
    // SECTION: GRID ITEM (12 variants)
    // ═══════════════════════════════════════════════════
    {
      type: 'title',
      title: '卡片网格引擎',
      subtitle: '12 种视觉变体 · GridItemEngine',
      titleSize: 72,
      bodySize: 28,
    },

    // solid
    {
      type: 'grid-item',
      title: 'grid-item · solid 变体',
      items: [
        { title: '月活用户', value: '52.3万', valueColor: 'positive' },
        { title: '日均调用', value: '42万次', valueColor: 'positive' },
        { title: '平均延迟', value: '45ms', valueColor: 'neutral' },
        { title: '可用性', value: '99.7%', valueColor: 'positive' },
      ],
      variant: 'solid',
      columns: 4,
      titleSize: 40,
      bodySize: 20,
    },

    // outline
    {
      type: 'grid-item',
      title: 'grid-item · outline 变体',
      items: [
        { title: '类型安全', description: 'TypeScript 全量覆盖' },
        { title: '响应式', description: '自适应 16:9 比例' },
        { title: '动画系统', description: 'Framer Motion 入场' },
        { title: '主题化', description: 'Swiss Design 令牌' },
        { title: '可编辑', description: '双击 inline 编辑' },
        { title: '自动存储', description: '2s 防抖持久化' },
      ],
      variant: 'outline',
      columns: 3,
      titleSize: 40,
      bodySize: 20,
    },

    // sideline
    {
      type: 'grid-item',
      title: 'grid-item · sideline 变体',
      items: [
        { title: '前端框架', description: 'React 18 + Vite 5' },
        { title: '样式方案', description: 'Tailwind CSS v3' },
        { title: '图表库', description: 'ECharts 5 + 20 类型' },
        { title: '动画库', description: 'Framer Motion v11' },
      ],
      variant: 'sideline',
      columns: 2,
      titleSize: 40,
      bodySize: 20,
    },

    // topline
    {
      type: 'grid-item',
      title: 'grid-item · topline 变体',
      items: [
        { title: '引擎数量', value: '13', description: '图解渲染引擎' },
        { title: '图表类型', value: '20', description: 'ECharts 子类型' },
        { title: '幻灯片类型', value: '17', description: '判别联合类型' },
        { title: '区块类型', value: '16', description: '画布定位模型' },
      ],
      variant: 'topline',
      columns: 4,
      titleSize: 40,
      bodySize: 20,
    },

    // top-circle
    {
      type: 'grid-item',
      title: 'grid-item · top-circle 变体',
      items: [
        { title: '分析需求', description: '理解数据结构和目标' },
        { title: '选择类型', description: '匹配最佳可视化方案' },
        { title: '生成数据', description: '构造类型安全的对象' },
        { title: '渲染展示', description: '引擎自动处理布局' },
      ],
      variant: 'top-circle',
      columns: 4,
      titleSize: 40,
      bodySize: 20,
    },

    // joined
    {
      type: 'grid-item',
      title: 'grid-item · joined 变体',
      items: [
        { title: '数据层', description: '类型定义与转换' },
        { title: '引擎层', description: '13 个渲染引擎' },
        { title: '编辑层', description: '属性面板与工具栏' },
        { title: '展示层', description: '幻灯片导航与全屏' },
      ],
      variant: 'joined',
      columns: 4,
      titleSize: 40,
      bodySize: 20,
    },

    // leaf
    {
      type: 'grid-item',
      title: 'grid-item · leaf 变体',
      items: [
        { title: '简洁设计', description: 'Swiss 国际主义风格' },
        { title: '有机形态', description: '柔和的圆角造型' },
        { title: '自然配色', description: '渐变调色板生成' },
      ],
      variant: 'leaf',
      columns: 3,
      titleSize: 40,
      bodySize: 20,
    },

    // labeled
    {
      type: 'grid-item',
      title: 'grid-item · labeled 变体',
      items: [
        { title: '核心引擎', value: 'P0', description: 'GridItem, Sequence, Compare' },
        { title: '图表引擎', value: 'P0', description: '20 种 ECharts 图表' },
        { title: '高级引擎', value: 'P1', description: 'Cycle, Table, Roadmap' },
        { title: '特殊引擎', value: 'P2', description: 'SWOT, Mindmap, Stack' },
      ],
      variant: 'labeled',
      columns: 2,
      titleSize: 40,
      bodySize: 20,
    },

    // alternating
    {
      type: 'grid-item',
      title: 'grid-item · alternating 变体',
      items: [
        { title: '编辑模式', description: '双击文字进入编辑' },
        { title: '选择工具', description: '点击选中内容区域' },
        { title: '撤销重做', description: 'Ctrl+Z 50 步历史' },
        { title: '自动保存', description: '2 秒防抖写入文件' },
        { title: '全屏演示', description: '聚光灯逐块揭示' },
        { title: '导入导出', description: 'JSON 格式无损转换' },
      ],
      variant: 'alternating',
      columns: 3,
      titleSize: 40,
      bodySize: 20,
    },

    // pillar
    {
      type: 'grid-item',
      title: 'grid-item · pillar 变体',
      items: [
        { title: '基础版', value: '免费', description: '5 个 Deck' },
        { title: '专业版', value: '¥99/月', description: '无限 Deck + 导出' },
        { title: '企业版', value: '¥499/月', description: '团队协作 + API' },
      ],
      variant: 'pillar',
      columns: 3,
      titleSize: 40,
      bodySize: 20,
    },

    // diamonds
    {
      type: 'grid-item',
      title: 'grid-item · diamonds 变体',
      items: [
        { title: '需求分析', description: '明确可视化目标' },
        { title: '数据准备', description: '清洗和结构化数据' },
        { title: '原型设计', description: '选择图表和布局' },
        { title: '交付上线', description: '生成并部署演示' },
      ],
      variant: 'diamonds',
      columns: 4,
      titleSize: 40,
      bodySize: 20,
    },

    // signs
    {
      type: 'grid-item',
      title: 'grid-item · signs 变体',
      items: [
        { title: '第一阶段', value: '已完成', description: '核心引擎开发', valueColor: 'positive' },
        { title: '第二阶段', value: '进行中', description: '图表类型扩展', valueColor: 'neutral' },
        { title: '第三阶段', value: '计划中', description: '协作功能开发', valueColor: 'negative' },
      ],
      variant: 'signs',
      columns: 3,
      titleSize: 40,
      bodySize: 20,
    },

    // ═══════════════════════════════════════════════════
    // SECTION: SEQUENCE (7 variants)
    // ═══════════════════════════════════════════════════
    {
      type: 'title',
      title: '流程序列引擎',
      subtitle: '7 种视觉变体 · SequenceEngine',
      titleSize: 72,
      bodySize: 28,
    },

    { type: 'sequence', title: 'sequence · timeline 变体', steps: [{ label: '需求收集' }, { label: '方案设计' }, { label: '开发实现' }, { label: '测试验证' }, { label: '发布上线' }], variant: 'timeline', titleSize: 40, bodySize: 20 },
    { type: 'sequence', title: 'sequence · chain 变体', steps: [{ label: '数据采集', description: '多源接入' }, { label: '数据清洗', description: '去重校验' }, { label: '特征工程', description: '降维聚合' }, { label: '模型训练', description: '迭代优化' }], variant: 'chain', titleSize: 40, bodySize: 20 },
    { type: 'sequence', title: 'sequence · arrows 变体', steps: [{ label: '输入' }, { label: '处理' }, { label: '输出' }, { label: '反馈' }], variant: 'arrows', titleSize: 40, bodySize: 20 },
    { type: 'sequence', title: 'sequence · pills 变体', steps: [{ label: '草稿' }, { label: '审核' }, { label: '修改' }, { label: '发布' }, { label: '归档' }], variant: 'pills', titleSize: 40, bodySize: 20 },
    { type: 'sequence', title: 'sequence · ribbon-arrows 变体', steps: [{ label: '曝光', description: '10 万次' }, { label: '点击', description: '1.2 万次' }, { label: '注册', description: '3,500' }, { label: '付费', description: '820' }], variant: 'ribbon-arrows', titleSize: 40, bodySize: 20 },
    { type: 'sequence', title: 'sequence · numbered 变体', steps: [{ label: '安装依赖', description: 'npm install' }, { label: '启动开发', description: 'npm run dev' }, { label: '创建幻灯片', description: '选择类型' }, { label: '编辑内容', description: '双击编辑' }, { label: '导出分享', description: 'JSON 导出' }], variant: 'numbered', titleSize: 40, bodySize: 20 },
    { type: 'sequence', title: 'sequence · zigzag 变体', steps: [{ label: '调研', description: '市场分析' }, { label: '规划', description: '路线制定' }, { label: '执行', description: '迭代开发' }, { label: '复盘', description: '数据回顾' }], variant: 'zigzag', titleSize: 40, bodySize: 20 },

    // ═══════════════════════════════════════════════════
    // SECTION: COMPARE (3 modes)
    // ═══════════════════════════════════════════════════
    {
      type: 'key-point',
      title: '对比分析引擎',
      body: '3 种模式：对比列、象限图、冰山模型',
      titleSize: 56,
      bodySize: 24,
    },

    // versus
    {
      type: 'compare',
      title: 'compare · versus 模式',
      mode: 'versus',
      sides: [
        { name: '方案 A', items: [{ label: '开发周期', value: '3 个月' }, { label: '成本', value: '¥50 万' }, { label: '性能', value: '高' }, { label: '维护难度', value: '中' }] },
        { name: '方案 B', items: [{ label: '开发周期', value: '5 个月' }, { label: '成本', value: '¥30 万' }, { label: '性能', value: '中' }, { label: '维护难度', value: '低' }] },
      ],
      titleSize: 40,
      bodySize: 20,
    },

    // quadrant
    {
      type: 'compare',
      title: 'compare · quadrant 模式',
      mode: 'quadrant',
      xAxis: '市场吸引力→',
      yAxis: '竞争力↑',
      quadrantItems: [
        { label: '产品A', x: 80, y: 85 },
        { label: '产品B', x: 65, y: 45 },
        { label: '产品C', x: 30, y: 70 },
        { label: '产品D', x: 20, y: 25 },
        { label: '产品E', x: 55, y: 60 },
      ],
      titleSize: 40,
      bodySize: 20,
    },

    // iceberg
    {
      type: 'compare',
      title: 'compare · iceberg 模式',
      mode: 'iceberg',
      visible: [
        { label: '用户界面', description: '优雅的演示效果' },
        { label: '图表展示', description: '20 种可视化类型' },
        { label: '编辑交互', description: '所见即所得编辑' },
      ],
      hidden: [
        { label: '类型系统', description: '17 种判别联合类型' },
        { label: '引擎架构', description: '13 个独立渲染引擎' },
        { label: '状态管理', description: '50 步撤销历史' },
        { label: '持久化层', description: 'Vite 插件文件 API' },
        { label: '区块模型', description: '百分比定位画布' },
      ],
      titleSize: 40,
      bodySize: 20,
    },

    // ═══════════════════════════════════════════════════
    // SECTION: FUNNEL (3 variants)
    // ═══════════════════════════════════════════════════
    {
      type: 'title',
      title: '漏斗引擎',
      subtitle: '3 种变体 · FunnelPyramidEngine',
      titleSize: 72,
      bodySize: 28,
    },

    { type: 'funnel', title: 'funnel · funnel 变体', layers: [{ label: '网站访问', value: 10000 }, { label: '注册用户', value: 3500 }, { label: '活跃用户', value: 1800 }, { label: '付费用户', value: 820 }], variant: 'funnel', titleSize: 40, bodySize: 20 },
    { type: 'funnel', title: 'funnel · pyramid 变体', layers: [{ label: '战略层', description: '使命与愿景' }, { label: '战术层', description: '季度目标' }, { label: '执行层', description: '日常任务' }, { label: '数据层', description: '度量与反馈' }], variant: 'pyramid', titleSize: 40, bodySize: 20 },
    { type: 'funnel', title: 'funnel · slope 变体', layers: [{ label: '曝光', value: 50000 }, { label: '点击', value: 12000 }, { label: '转化', value: 3500 }, { label: '留存', value: 1200 }], variant: 'slope', titleSize: 40, bodySize: 20 },

    // ═══════════════════════════════════════════════════
    // SECTION: CONCENTRIC (3 variants)
    // ═══════════════════════════════════════════════════
    { type: 'concentric', title: 'concentric · circles 变体', rings: [{ label: '核心', description: '引擎系统' }, { label: '中层', description: '编辑器' }, { label: '外层', description: 'UI 壳' }, { label: '生态', description: '插件与主题' }], variant: 'circles', titleSize: 40, bodySize: 20 },
    { type: 'concentric', title: 'concentric · diamond 变体', rings: [{ label: '数据' }, { label: '逻辑' }, { label: '视图' }, { label: '交互' }], variant: 'diamond', titleSize: 40, bodySize: 20 },
    { type: 'concentric', title: 'concentric · target 变体', rings: [{ label: '核心目标', description: '用户价值' }, { label: '关键结果', description: 'OKR 指标' }, { label: '执行计划', description: '里程碑' }], variant: 'target', titleSize: 40, bodySize: 20 },

    // ═══════════════════════════════════════════════════
    // SECTION: HUB-SPOKE (3 variants)
    // ═══════════════════════════════════════════════════
    { type: 'hub-spoke', title: 'hub-spoke · orbit 变体', center: { label: '平台' }, spokes: [{ label: '引擎' }, { label: '图表' }, { label: '编辑器' }, { label: '区块' }, { label: '主题' }, { label: '导航' }], variant: 'orbit', titleSize: 40, bodySize: 20 },
    { type: 'hub-spoke', title: 'hub-spoke · solar 变体', center: { label: '用户' }, spokes: [{ label: '创建' }, { label: '编辑' }, { label: '预览' }, { label: '分享' }, { label: '导出' }], variant: 'solar', titleSize: 40, bodySize: 20 },
    { type: 'hub-spoke', title: 'hub-spoke · pinwheel 变体', center: { label: 'AI' }, spokes: [{ label: '生成' }, { label: '优化' }, { label: '分析' }, { label: '推荐' }], variant: 'pinwheel', titleSize: 40, bodySize: 20 },

    // ═══════════════════════════════════════════════════
    // SECTION: VENN (3 variants)
    // ═══════════════════════════════════════════════════
    { type: 'venn', title: 'venn · classic 变体', sets: [{ label: '设计', description: '美观易用' }, { label: '工程', description: '稳定高效' }, { label: '数据', description: '真实准确' }], intersectionLabel: '优秀演示', variant: 'classic', titleSize: 40, bodySize: 20 },
    { type: 'venn', title: 'venn · linear 变体', sets: [{ label: '前端' }, { label: '后端' }, { label: '运维' }], intersectionLabel: 'DevOps', variant: 'linear', titleSize: 40, bodySize: 20 },
    { type: 'venn', title: 'venn · linear-filled 变体', sets: [{ label: '需求' }, { label: '设计' }, { label: '实现' }], intersectionLabel: '交付', variant: 'linear-filled', titleSize: 40, bodySize: 20 },

    // ═══════════════════════════════════════════════════
    // SECTION: CYCLE (3 variants)
    // ═══════════════════════════════════════════════════
    {
      type: 'title',
      title: '循环 · 表格 · 路线图',
      subtitle: 'Cycle · Table · Roadmap',
      titleSize: 72,
      bodySize: 28,
    },

    { type: 'cycle', title: 'cycle · circular 变体', steps: [{ label: '计划' }, { label: '执行' }, { label: '检查' }, { label: '改进' }], variant: 'circular', titleSize: 40, bodySize: 20 },
    { type: 'cycle', title: 'cycle · gear 变体', steps: [{ label: '设计' }, { label: '开发' }, { label: '测试' }, { label: '部署' }, { label: '监控' }], variant: 'gear', titleSize: 40, bodySize: 20 },
    { type: 'cycle', title: 'cycle · loop 变体', steps: [{ label: '输入' }, { label: '处理' }, { label: '输出' }, { label: '反馈' }], variant: 'loop', titleSize: 40, bodySize: 20 },

    // ═══════════════════════════════════════════════════
    // SECTION: TABLE (3 variants)
    // ═══════════════════════════════════════════════════
    { type: 'table', title: 'table · striped 变体', headers: ['引擎', '类型数', '变体数', '状态'], rows: [{ cells: ['GridItem', '1', '12', '✅ 完成'] }, { cells: ['Sequence', '1', '7', '✅ 完成'] }, { cells: ['Compare', '3', '—', '✅ 完成'] }, { cells: ['Chart', '20', '—', '✅ 完成'] }, { cells: ['Cycle', '1', '3', '✅ 完成'] }], variant: 'striped', titleSize: 40, bodySize: 20 },
    { type: 'table', title: 'table · bordered 变体', headers: ['指标', 'Q1', 'Q2', 'Q3', 'Q4'], rows: [{ cells: ['MAU (万)', '28', '35', '43', '52'] }, { cells: ['收入 (万)', '400', '495', '590', '730'] }, { cells: ['转化率', '6.2%', '7.1%', '7.8%', '8.2%'] }], variant: 'bordered', titleSize: 40, bodySize: 20 },
    { type: 'table', title: 'table · highlight 变体', headers: ['功能', '优先级', '进度', '负责人'], rows: [{ cells: ['引擎开发', 'P0', '100%', '工程组'], highlight: true }, { cells: ['图表扩展', 'P0', '100%', '可视化组'] }, { cells: ['编辑器', 'P1', '90%', '交互组'], highlight: true }, { cells: ['区块系统', 'P1', '85%', '架构组'] }], variant: 'highlight', titleSize: 40, bodySize: 20 },

    // ═══════════════════════════════════════════════════
    // SECTION: ROADMAP (3 variants)
    // ═══════════════════════════════════════════════════
    { type: 'roadmap', title: 'roadmap · horizontal 变体', phases: [{ label: 'Phase 1', items: [{ label: '核心引擎', status: 'done' }, { label: '基础图表', status: 'done' }] }, { label: 'Phase 2', items: [{ label: '高级引擎', status: 'done' }, { label: '图表扩展', status: 'active' }] }, { label: 'Phase 3', items: [{ label: '协作功能', status: 'pending' }, { label: 'AI 生成', status: 'pending' }] }], variant: 'horizontal', titleSize: 40, bodySize: 20 },
    { type: 'roadmap', title: 'roadmap · vertical 变体', phases: [{ label: '2025 Q3', items: [{ label: '项目启动', status: 'done' }, { label: '原型验证', status: 'done' }] }, { label: '2025 Q4', items: [{ label: '核心开发', status: 'done' }, { label: '内测上线', status: 'done' }] }, { label: '2026 Q1', items: [{ label: '功能扩展', status: 'active' }, { label: '性能优化', status: 'active' }] }, { label: '2026 Q2', items: [{ label: '公测发布', status: 'pending' }, { label: '生态建设', status: 'pending' }] }], variant: 'vertical', titleSize: 40, bodySize: 20 },
    { type: 'roadmap', title: 'roadmap · milestone 变体', phases: [{ label: 'Alpha', items: [{ label: '基础框架', status: 'done' }, { label: '7 引擎', status: 'done' }] }, { label: 'Beta', items: [{ label: '13 引擎', status: 'done' }, { label: '20 图表', status: 'done' }] }, { label: 'RC', items: [{ label: '编辑器完善', status: 'active' }] }, { label: 'GA', items: [{ label: '正式发布', status: 'pending' }] }], variant: 'milestone', titleSize: 40, bodySize: 20 },

    // ═══════════════════════════════════════════════════
    // SECTION: SWOT / MINDMAP / STACK
    // ═══════════════════════════════════════════════════
    {
      type: 'title',
      title: 'SWOT · 思维导图 · 堆叠',
      subtitle: 'SwotEngine · MindmapEngine · StackEngine',
      titleSize: 72,
      bodySize: 28,
    },

    // swot
    {
      type: 'swot',
      title: 'SWOT 分析',
      strengths: [{ label: '类型丰富', description: '17 种幻灯片类型' }, { label: '引擎驱动', description: '纯数据渲染' }, { label: '开发体验', description: 'TypeScript 全量' }],
      weaknesses: [{ label: '图片支持', description: '仅占位符模式' }, { label: '协作功能', description: '尚未实现' }],
      opportunities: [{ label: 'AI 生成', description: '自动制作演示' }, { label: '插件生态', description: '自定义引擎' }],
      threats: [{ label: '竞品追赶', description: 'Marp / Slidev' }, { label: '技术迭代', description: '框架升级成本' }],
      titleSize: 40,
      bodySize: 20,
    },

    // mindmap
    {
      type: 'mindmap',
      title: '系统架构思维导图',
      root: {
        label: 'Web PPT',
        children: [
          { label: '数据层', children: [{ label: '类型定义' }, { label: '转换器' }, { label: '持久化' }] },
          { label: '引擎层', children: [{ label: '图解引擎' }, { label: '图表引擎' }] },
          { label: '编辑层', children: [{ label: '属性面板' }, { label: '工具栏' }, { label: '内联编辑' }] },
          { label: '展示层', children: [{ label: '幻灯片' }, { label: '全屏' }, { label: '侧边栏' }] },
        ],
      },
      titleSize: 40,
      bodySize: 20,
    },

    // stack: horizontal
    { type: 'stack', title: 'stack · horizontal 变体', layers: [{ label: '展示层', description: 'React 组件 + CSS' }, { label: '引擎层', description: '13 个渲染引擎' }, { label: '数据层', description: 'TypeScript 类型' }, { label: '存储层', description: 'Vite 文件 API' }], variant: 'horizontal', titleSize: 40, bodySize: 20 },
    // stack: vertical
    { type: 'stack', title: 'stack · vertical 变体', layers: [{ label: 'UI' }, { label: '引擎' }, { label: '数据' }, { label: '存储' }], variant: 'vertical', titleSize: 40, bodySize: 20 },
    // stack: offset
    { type: 'stack', title: 'stack · offset 变体', layers: [{ label: '用户交互', description: '鼠标键盘事件' }, { label: '状态管理', description: 'useReducer + Context' }, { label: '渲染管线', description: 'React 虚拟 DOM' }, { label: '文件系统', description: 'JSON / TS 持久化' }], variant: 'offset', titleSize: 40, bodySize: 20 },

    // ═══════════════════════════════════════════════════
    // SECTION: BLOCK-SLIDE examples
    // ═══════════════════════════════════════════════════
    {
      type: 'title',
      title: '区块布局',
      subtitle: '自由画布 · BlockSlide',
      titleSize: 72,
      bodySize: 28,
    },

    // Block-slide: Pattern D — Header + two columns
    {
      type: 'block-slide',
      title: '区块布局 · 标题 + 双栏',
      blocks: [
        { id: 'b1', x: 2, y: 2, width: 96, height: 18, data: { type: 'title-body', title: '双栏布局示例', body: '左侧图解 + 右侧图片，适合内容与视觉搭配', titleSize: 36, bodySize: 18 } },
        { id: 'b2', x: 2, y: 23, width: 55, height: 74, data: { type: 'grid-item', items: [{ title: '引擎数', value: '13' }, { title: '图表数', value: '20' }, { title: '变体数', value: '50+' }, { title: '类型数', value: '17' }], variant: 'solid', columns: 2 } },
        { id: 'b3', x: 60, y: 23, width: 38, height: 74, data: { type: 'image', placeholder: '数据可视化仪表盘界面截图', alt: '仪表盘', fit: 'cover' } },
      ],
    },

    // Block-slide: Pattern F — Dashboard
    {
      type: 'block-slide',
      title: '区块布局 · 仪表盘',
      blocks: [
        { id: 'b1', x: 2, y: 2, width: 47, height: 48, data: { type: 'chart', chartType: 'donut', slices: [{ name: '引擎', value: 40 }, { name: '图表', value: 30 }, { name: '编辑器', value: 20 }, { name: '其他', value: 10 }], innerRadius: 40 } },
        { id: 'b2', x: 51, y: 2, width: 47, height: 48, data: { type: 'chart', chartType: 'line', categories: ['v1', 'v2', 'v3', 'v4', 'v5'], lineSeries: [{ name: '性能', data: [60, 68, 75, 82, 92] }] } },
        { id: 'b3', x: 2, y: 53, width: 47, height: 44, data: { type: 'sequence', steps: [{ label: '设计' }, { label: '开发' }, { label: '测试' }, { label: '发布' }], variant: 'arrows' } },
        { id: 'b4', x: 51, y: 53, width: 47, height: 44, data: { type: 'grid-item', items: [{ title: '版本', value: 'v2.0' }, { title: '引擎', value: '13个' }, { title: '图表', value: '20种' }, { title: '评分', value: '92分', valueColor: 'positive' }], variant: 'topline', columns: 2 } },
      ],
    },

    // Block-slide: Pattern G — Wide diagram + side panel
    {
      type: 'block-slide',
      title: '区块布局 · 黄金分割',
      blocks: [
        { id: 'b1', x: 2, y: 2, width: 62, height: 96, data: { type: 'hub-spoke', center: { label: '核心' }, spokes: [{ label: '渲染' }, { label: '编辑' }, { label: '导航' }, { label: '存储' }, { label: '主题' }], variant: 'orbit' } },
        { id: 'b2', x: 66, y: 2, width: 32, height: 45, data: { type: 'title-body', title: '中心辐射架构', body: '以核心引擎为中心，5 大模块环绕协作，实现高内聚低耦合的系统设计', titleSize: 32, bodySize: 16 } },
        { id: 'b3', x: 66, y: 50, width: 32, height: 47, data: { type: 'image', placeholder: '微服务架构拓扑示意图', alt: '架构图', fit: 'contain' } },
      ],
    },

    // ═══════════════════════════════════════════════════
    // CLOSING
    // ═══════════════════════════════════════════════════
    {
      type: 'key-point',
      title: 'Thank You',
      body: '17 种幻灯片 · 13 大引擎 · 20 种图表 · 50+ 视觉变体 — 全部展示完毕',
      titleSize: 72,
      bodySize: 24,
    },
  ],
}

import type { DeckMeta } from '../types'

export const aiScaffoldDeck: DeckMeta = {
  id: 'ai-scaffold',
  title: '模型只是一半',
  description: '脚手架如何优化 AI 的编程能力？（修订版）',
  date: '2026.02',
  slides: [
    // Slide 1: Title
    {
      type: 'title',
      title: '模型只是一半',
      subtitle: '脚手架如何优化 AI 的编程能力？',
      badge: 'Terminal-Bench 2.0 数据 · 截止 2026 年 2 月 9 日',
    },

    // Slide 2: Terminal-Bench overview
    {
      type: 'placeholder',
      title: 'Terminal-Bench 2.0：101 个 AI 编程 Agent 的终端任务竞技场',
      body: '覆盖 100+ 真实 GitHub CLI 任务（git 操作、脚本调试、配置修复），要求 agent 端到端完成，衡量模型与脚手架的组合效果',
      placeholderLabel: 'Terminal-Bench 2.0 排行榜截图',
      metric: { value: '101', label: 'AI 编程 Agent 参与评测' },
      cards: [
        { label: '任务类型', value: '100+ 真实 GitHub CLI 任务' },
        { label: '评测方式', value: '端到端完成，非单步评分' },
      ],
      caption: '排行榜涵盖十几种脚手架与数十个模型的交叉组合',
    },

    // Slide 3: Same model, different scores
    {
      type: 'data-comparison',
      title: '同一个 Opus 4.6，分差 11.9 个百分点',
      body: 'Claude Opus 4.6 在排行榜上出现多次，最低 58.0%（Claude Code），最高 69.9%（Droid），差距来自脚手架',
      items: [
        { label: '最低分 · Claude Code #22', value: '58.0%', color: 'negative' },
        { label: '最高分 · Droid #3', value: '69.9%', color: 'positive' },
      ],
      conclusion: '同一个模型，脚手架不同，分差接近 12 个百分点',
    },

    // Slide 4: What is scaffolding — architecture diagram
    {
      type: 'diagram',
      title: '脚手架 = 包裹在模型外面的工程层',
      body: '脚手架决定给模型看什么上下文、能调用哪些工具、怎么验证结果、怎么跨会话保持记忆，与模型共同决定 AI 编程性能',
      steps: [
        { label: '上下文管理', description: '决定给模型看什么代码' },
        { label: '工具设计', description: '定义模型能用哪些工具' },
        { label: '提示工程', description: '多层提示结构与递近偏差' },
        { label: '任务分解', description: '强制/可选/隐式规划策略' },
        { label: '记忆持久化', description: '跨会话记忆方案' },
        { label: '验证反馈', description: '多轨迹生成与测试选优' },
      ],
      sideNote: 'LLM 模型是核心，脚手架是包裹模型的工程外壳\n六个维度共同决定 agent 的最终表现',
    },

    // Slide 5: Scaffold gains — stacked bar chart
    {
      type: 'chart',
      title: '5-10 分增益，从中游到前三',
      body: '同一个模型搭配不同脚手架，分数差距可达 10 个百分点以上',
      bars: [
        { category: 'GPT-5.3', values: [
          { name: '基线 Terminus 2', value: 64.7, color: 'neutral' },
          { name: '最佳 Simple Codex', value: 75.1, color: 'positive' },
        ] },
        { category: 'Opus 4.6', values: [
          { name: '基线 Terminus 2', value: 62.9, color: 'neutral' },
          { name: '最佳 Droid', value: 69.9, color: 'positive' },
        ] },
      ],
      highlight: '+5~10pp',
    },

    // Slide 6: Key point — Six dimensions
    {
      type: 'key-point',
      title: '脚手架做了什么？',
      subtitle: '六个维度拆解脚手架的工程差异',
    },

    // Slide 7: Context management — search vs index
    {
      type: 'comparison',
      title: '上下文管理：给模型看什么决定了它能做什么',
      body: '代码库几十万行，context window 有限，三种主流路线已经分化',
      columns: [
        { name: '运行时搜索', items: [
          { label: '代表', value: 'Claude Code / Codex CLI' },
          { label: '方式', value: 'grep、find 按需搜索' },
          { label: '优势', value: '零初始化成本' },
          { label: '劣势', value: '搜索质量依赖模型查询能力，消耗更多 token' },
        ] },
        { name: '语义索引', items: [
          { label: '代表', value: 'Augment Code' },
          { label: '方式', value: '自研 embedding 模型，全代码库实时语义索引' },
          { label: '数据', value: 'SWE-bench Pro 51.80% vs Claude Code 49.75%' },
          { label: '未验证', value: '未提交 Terminal-Bench 2.0，终端任务优势尚不确定' },
        ] },
      ],
    },

    // Slide 8: Tool reliability is multiplication
    {
      type: 'data-comparison',
      title: '每一步的可靠性都在做乘法',
      body: '更少的工具意味着更短的调用链，更简单的 schema 意味着更低的单步出错率',
      items: [
        { label: '单步 80% × 10 步 → 0.8¹⁰', value: '10.7%', color: 'negative' },
        { label: '单步 90% × 8 步 → 0.9⁸', value: '43.0%', color: 'positive' },
      ],
      conclusion: '单步可靠性 +10%、步骤 −2，全程成功率从 10.7% 跃升至 43.0%',
    },

    // Slide 9: Tool design — minimal vs comprehensive
    {
      type: 'comparison',
      title: '工具越少越可靠 vs 工具越多越全面',
      body: 'Factory Droid 极简工具四个模型全进前 15；Claude Code 24 个工具覆盖完整开发流程',
      columns: [
        { name: '极简路线 · Factory Droid', items: [
          { label: '策略', value: '严格限制工具数量，简化输入 schema' },
          { label: '定制化', value: 'Claude 用 FIND_AND_REPLACE，GPT 用 unified diff' },
          { label: '超时', value: '短超时快速失败，而非长等待' },
          { label: '结果', value: '4 个模型提交，全部进入前 15 名' },
        ] },
        { name: '全面路线 · Claude Code', items: [
          { label: '规模', value: '24 个内建工具（文件读写 / regex / TodoWrite 等）' },
          { label: '设计理念', value: '防呆设计 poka-yoke，用参数设计让错误更难发生' },
          { label: '投入', value: '工具优化时间 > prompt 优化时间' },
          { label: '瓶颈', value: '终端任务中工具复杂度反成负担（-4.9pp vs 基线）' },
        ] },
      ],
    },

    // Slide 10: Prompt engineering — 3 layers
    {
      type: 'diagram',
      title: '三层提示层级，利用递近偏差',
      body: 'Factory Droid 把关键指令放在上下文窗口末端，利用模型对最新内容赋予更高优先级的特性',
      steps: [
        { label: '① 工具描述', description: '定义每个工具的能力规格' },
        { label: '② 系统提示', description: '设定高层目标与大方向' },
        { label: '③ 系统通知', description: '上下文窗口末端 · 关键指令注入' },
      ],
      sideNote: '递近偏差 (Recency Bias)：模型对最后看到的内容赋予更高优先级\nClaude Code：28 个核心提示组件 + 40+ 事件驱动系统提醒，93+ 版本持续迭代',
    },

    // Slide 11: Task decomposition — 3 strategies
    {
      type: 'comparison',
      title: '强制规划的框架排名普遍靠前',
      body: '从排行榜数据看，强制显式规划的框架排名更高，但不能把差异单独归因于规划策略',
      columns: [
        { name: '强制显式规划', items: [
          { label: '代表', value: 'Droid #3 / Junie #8' },
          { label: '方式', value: '必须先生成 plan.md 才能编码' },
          { label: '技巧', value: 'Droid 把更新后的计划放在上下文窗口末端，配合递近偏差' },
        ] },
        { name: '可选显式规划', items: [
          { label: '代表', value: 'Claude Code #22' },
          { label: '触发', value: 'TodoWrite 检测到 3+ 步骤时自动激活' },
          { label: '局限', value: '非强制，模型自行决定是否使用' },
        ] },
        { name: '隐式规划', items: [
          { label: '代表', value: 'Codex CLI #11 / Gemini CLI' },
          { label: '方式', value: '靠推理 token 或 extended thinking 自行规划' },
          { label: '问题', value: 'Gemini CLI 排在后半段' },
        ] },
      ],
    },

    // Slide 12: Memory persistence — grid
    {
      type: 'grid',
      title: '跨会话记忆：项目根目录的 Markdown 文件',
      items: [
        { number: 1, title: 'CLAUDE.md', description: 'Claude Code，四级覆盖（组织级 → 用户级 → 项目级 → 目录级）' },
        { number: 2, title: 'AGENTS.md', description: 'Codex CLI，根目录到子目录逐级加载 + 本地覆盖' },
        { number: 3, title: 'GEMINI.md', description: 'Gemini CLI，基础项目配置' },
        { number: 4, title: 'guidelines.md', description: 'Junie CLI，配合强制规划使用' },
      ],
    },

    // Slide 13: Verification feedback — multi-patch vs self-check
    {
      type: 'data-comparison',
      title: '多方案选优有效但代价极高',
      body: 'Factory Droid 每个任务最多 3 个补丁方案用测试选优；Anthropic 警告 agent 自写 unit test 验证容易误判',
      items: [
        { label: '补丁方案', value: '3', color: 'neutral' },
        { label: '平均 Token 消耗', value: '<2M', color: 'neutral' },
        { label: '最高 Token 消耗', value: '13M', color: 'negative' },
      ],
      conclusion: '多轨迹验证效果好，但 token 成本极高；自检式验证存在误判风险',
    },

    // Slide 14: Key point — players transition
    {
      type: 'key-point',
      title: '排行榜上的代表选手',
      subtitle: '了解完六个维度，看看谁把它们用得最好',
    },

    // Slide 15: Rankings overview chart
    {
      type: 'chart',
      title: 'Terminal-Bench 2.0 主要脚手架排名',
      body: '101 个条目中的代表性脚手架，Terminus 2 基线（62.9）作为参照',
      bars: [
        { category: '#1 Simple Codex · GPT-5.3', values: [
          { name: 'Simple Codex', value: 75.1, color: 'positive' },
        ] },
        { category: '#3 Droid · Opus 4.6', values: [
          { name: 'Droid', value: 69.9, color: 'neutral' },
        ] },
        { category: '#8 Junie CLI · Flash', values: [
          { name: 'Junie CLI', value: 64.3, color: 'neutral' },
        ] },
        { category: '#11 Codex CLI · GPT-5.2', values: [
          { name: 'Codex CLI', value: 62.9, color: 'neutral' },
        ] },
        { category: '#14 Warp', values: [
          { name: 'Warp', value: 61.2, color: 'neutral' },
        ] },
        { category: '#22 Claude Code · Opus 4.6', values: [
          { name: 'Claude Code', value: 58.0, color: 'negative' },
        ] },
        { category: 'Gemini CLI · Flash', values: [
          { name: 'Gemini CLI', value: 51.0, color: 'neutral' },
        ] },
      ],
      highlight: '基线 62.9',
    },

    // Slide 16: Simple Codex player card
    {
      type: 'player-card',
      rank: '#1 · 75.1%',
      name: 'Simple Codex',
      score: 75.1,
      model: 'GPT-5.3-Codex',
      highlight: '+10.4pp vs 基线 64.7%',
      features: [
        { label: '架构', value: 'OpenAI 内部 benchmark harness，架构细节未公开' },
        { label: 'Token 效率', value: '~72K tokens/任务（同任务 Claude Code 要 ~235K）' },
        { label: '关联工具', value: 'Codex CLI（开源 Rust 实现，Apache-2.0，54 个 crate）' },
        { label: '关键能力', value: 'SQ/EQ 异步模式 · V4A diff + tree-sitter · 上下文压缩' },
      ],
      comparison: [
        { name: 'Simple Codex', value: 75.1 },
        { name: 'Terminus 2', value: 64.7 },
      ],
    },

    // Slide 17: Factory Droid player card
    {
      type: 'player-card',
      rank: '#3 · 69.9%',
      name: 'Factory Droid',
      score: 69.9,
      model: 'Opus 4.6',
      highlight: '4 个模型全进前 15',
      features: [
        { label: '三层提示', value: '工具描述 / 系统提示 / 系统通知，利用递近偏差' },
        { label: '工具极简', value: '严格限制工具数量，按模型定制变体' },
        { label: '多轨迹生成', value: '每任务最多 3 补丁，测试选优' },
        { label: '泛化能力', value: 'Opus 4.6 #3 / GPT-5.2 #5 / Opus 4.5 #9' },
        { label: '争议', value: 'benchmark 过硬，实际体验有争议（代码质量、响应速度）' },
      ],
      comparison: [
        { name: 'Opus 4.6', value: 69.9 },
        { name: 'GPT-5.2', value: 64.9 },
        { name: 'Opus 4.5', value: 63.1 },
      ],
    },

    // Slide 18: Junie CLI — cheap model comeback
    {
      type: 'data-comparison',
      title: 'Junie CLI：便宜模型逆袭，同模型增益 +13.3 分',
      body: 'JetBrains 出品，用 Gemini 3 Flash（便宜模型）跑到第八名，比 Google 自家 Gemini CLI 同模型高出 13.3 分',
      items: [
        { label: 'Junie CLI · Gemini 3 Flash · #8', value: '64.3%', color: 'positive' },
        { label: 'Gemini CLI · Gemini 3 Flash', value: '51.0%', color: 'negative' },
      ],
      conclusion: '不需要最贵的模型，好的脚手架可以让便宜模型跑出接近顶尖的成绩',
    },

    // Slide 19: Claude Code player card
    {
      type: 'player-card',
      rank: '#22 · 58.0%',
      name: 'Claude Code',
      score: 58.0,
      model: 'Opus 4.6',
      highlight: '-4.9pp vs Terminus 2 基线',
      features: [
        { label: '24 个工具', value: '文件操作、regex 搜索、TodoWrite 状态追踪等' },
        { label: 'Sub-agent', value: 'Plan / Explore / 通用 / Bash 四种子 agent' },
        { label: '四级记忆', value: 'CLAUDE.md 组织级 → 用户级 → 项目级 → 目录级' },
        { label: '93+ 版本', value: '社区追踪的完整 prompt 演进历史' },
        { label: '定位', value: '设计目标是覆盖完整软件开发流程，Terminal-Bench 仅衡量终端任务' },
      ],
      comparison: [
        { name: 'Terminus 2 基线', value: 62.9 },
        { name: 'Claude Code', value: 58.0 },
      ],
    },

    // Slide 20: Gemini CLI architecture highlights
    {
      type: 'grid',
      title: 'Gemini CLI：起步较晚，架构值得关注',
      items: [
        { number: 1, title: '双包分层', description: 'CLI 负责终端交互，Core 作为独立包对外发布，第三方可直接复用' },
        { number: 2, title: '模型路由', description: '按任务复杂度在 Flash 和 Pro 之间自动切换' },
        { number: 3, title: '标准 Agent 循环', description: 'Thought → Action → Observation 循环 + GEMINI.md 上下文注入' },
      ],
    },

    // Slide 21: Token efficiency
    {
      type: 'chart',
      title: 'Token 效率：Codex CLI 比 Claude Code 省 3.3 倍',
      body: '完成同等任务，Codex CLI 约 72K tokens，Claude Code 约 235K tokens',
      bars: [
        { category: '单任务消耗 (K)', values: [
          { name: 'Codex CLI', value: 72, color: 'positive' },
          { name: 'Claude Code', value: 235, color: 'negative' },
        ] },
      ],
      highlight: '3.3×',
    },

    // Slide 22: Recommended reading
    {
      type: 'list',
      title: '深入了解脚手架工程的三步路线',
      items: [
        '理解 Benchmark → Terminal-Bench 论文 + 排行榜 — 搞清楚 benchmark 到底测了什么、没测什么',
        '拆解主流架构 → OpenAI《Unrolling the Codex Agent Loop》+ Gemini CLI Architecture — 理解 agent 循环、工具编排和模块分层',
        '学习设计原则 → Anthropic《Building effective agents》+《Effective harnesses for long-running agents》— agent 模式选择与长任务设计',
      ],
    },

    // Slide 23: Conclusion
    {
      type: 'key-point',
      title: '模型只是故事的一半',
      subtitle: '另一半在脚手架里',
    },
  ],
}

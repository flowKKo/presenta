 # 口播稿：模型只是一半，脚手架如何优化 AI 的编程能力？
 
 ---
 
Terminal-Bench2.0是一个面向终端任务的 AI Agent benchmark分。它涵盖100多个 CLI 任务，覆盖 git 、脚本调试、配置修复等操作，要求 agent能够 端到端完成，旨在测试模型与脚手架的组合效果。
 
 截止到 2026 年 2 月 9 日，排行榜上有 101 个 AI 编程 agent 的测试成绩。Claude Opus 4.6 在榜单中出现了好几次，最低 58 分，最高 69.9 分。同一个模型，差了快 12 分。
 
 为什么同一个模型会有这么大的差距？因为模型上面还包了一层东西，叫脚手架。脚手架是包裹在模型外面的工程层，决定给模型看什么上下文、能调用哪些工具、怎么验证结果、怎么跨会话保持记忆等。脚手架与模型共同决定了AI编程的性能
 
 排行榜上有一个特殊条目叫 Terminus 2。它是 Terminal-Bench 团队自己做的最小化脚手架，只有一个 bash 工具，没有提示优化与规划策略。它存在的意义就是当参照物，衡量你的脚手架比这个 baseline 强多少。
 
 看一下数据。GPT-5.3 配合 Terminus 2得到 64.7 分，加上 Simple Codex 脚手架变成 75.1 分，多了 10.4 分。Opus 4.6 配合Terminus 2 得到 62.9 分，加上 Droid 脚手架变成 69.9 分，多了 7 分。

 5 到 10 个百分点的脚手架增益，足以把排名从中游拉到前三。那这些框架到底在做什么不一样的事？
 
 ---
 
 脚手架做的事情总结下来，可以分成六个方面。
 
 第一，给模型看什么信息。
 
 一个项目的代码可能有几十万行，模型的 context window 是有限的，你不可能把代码全塞进去，那要怎么做？
 
 主流方法有三种。第一种是运行时搜索。Claude Code 和 Codex CLI 都走这条路，不做预处理，agent 执行的时候通过 grep、find 按需搜索。好处是零初始化成本，上来就能跑。坏处是搜索质量完全看模型构造查询的能力，而且搜来搜去很费 token。
 
 第二种叫语义索引，投入最大。Augment Code 自研了一个 embedding 模型，为整个代码库建立实时语义索引。这让它能从庞大的代码库里更快定位相关的内容。但 Augment Code 没有提交 Terminal-Bench 2.0，这个优势在终端任务上是否成立还不确定。
 
 第二，给模型配什么工具。
 
假设一个 agent 要完成一个任务，需要调用 10 次工具。如果每次调用的成功率是 90%，那 10 次都成功的概率是 0.9 的 10 次方，等于 35%。但如果把每次的成功率提到 95%，0.99 的 10 次方就变成了 90%。每一步的可靠性都是在做乘法，只差一个百分点，最后的结果差很远。
 
 所以 Factory Droid 的做法是工具越少越好，每个工具的接口越简单越好。它甚至给不同的模型设计了不同版本的工具，比如 Claude 用 FIND_AND_REPLACE 格式编辑代码，GPT 用 unified diff 格式，因为不同模型擅长处理的格式不一样。这个策略在 Terminal-Bench 上直接得到了验证：Droid 用四个不同模型提交，全部进入前 15 名。
 
 Claude Code 走了另一个方向，24 个内建工具，从文件读写、regex 搜索到 TodoWrite 状态追踪，能干的事很多。Anthropic 说他们花在打磨工具上的时间比写 prompt 还多，核心思路是防呆设计，通过参数设计让模型更难犯错。
 
 第三，怎么跟模型说话。
 
 Factory Droid 用了一个三层提示结构。第一层是工具描述，定义每个工具能干什么；第二层是系统提示，设定大方向；第三层是系统通知，在上下文窗口的最末端注入关键指令。放在末端是因为模型存在递近偏差，对刚刚看到的内容会赋予更高优先级。你可以理解成最后看到的印象最深。Droid 利用这个偏差，把最重要的指令放在模型最后读到的位置。
 
 Claude Code 也走分层路线，他们设计了大量核心系统提示组件与事件驱动的系统提醒来优化prompt工程。
 
 第四，怎么拆任务。
 
 你给 agent 一个复杂任务，它是直接开干，还是先想想步骤？
 
 从实践来看，强制规划是个不错的设计。例如, Junie CLI必须先生成 requirements.md 和 plan.md 才能开始写代码。Droid 也是类似思路，而且它的规划工具还有一个设计：每次更新后的计划都放在上下文窗口最末端，配合前面说的递近偏差，保证 agent 始终记得当前的方向。
 
 Claude Code 的 TodoWrite 工具是可选的，检测到 3 个以上独立步骤时自动激活。Codex CLI 和 Gemini CLI 则靠模型自己的推理 token 或 extended thinking 隐式规划。
 
 第五，怎么记住项目信息。
 
 Agent 每次启动都是全新的，不记得上次做了什么。现在主流的解决方案是在项目根目录放一个 Markdown 文件，用自然语言写上这个项目用什么框架、代码风格是什么、哪些东西不能碰。Claude Code 管这个文件叫 CLAUDE.md，Codex CLI 叫 AGENTS.md，Gemini CLI 叫 GEMINI.md，通过 git 共享给团队。差异在层级深度上：Claude Code 支持四级覆盖，从组织级一直到目录级；Codex CLI 支持从根目录到子目录逐级加载；Gemini CLI 相对简单。多数框架的记忆是无状态的，每次会话重新读取配置文件。
 
 第六，怎么检查结果。
 
 Agent 写完代码得验证写得对不对。Factory Droid 的做法是同一个任务最多生成 3 个补丁方案，跑测试看哪个过了就用哪个。效果好，但代价是 token 消耗极高，平均不到 200 万，最高一个任务能烧掉 1300 万个 token。Anthropic 在他们的 harness 博客里指出一个常见的坑：agent 自己写 unit test 来验证自己的代码，很容易自己考自己，会出现测试过了但代码其实是错的的情况。他们建议用浏览器自动化做端到端测试才可靠。
 
 ---
 
 了解完六个维度，来看看排行榜上几个有代表性的选手。
 
 第一名，Simple Codex 搭配 GPT5.3，75.1 分。排行榜上叫 Simple Codex，但 OpenAI 没有公开过这个名字对应的具体配置，也没有提交过 Codex CLI 加 GPT-5.3 的组合跑分。从已有信息推断， Simple Codex可能是 简化版本的Codex CLI。Codex CLI通过异步模式把用户界面和 agent 执行解耦，支持同时运行多个 agent；V4A diff 格式配合 tree-sitter 做 patch 解析，比纯文本 diff 更可靠；还有上下文压缩机制，支持有效无限长对话。Token 效率特别突出，完成同样的任务大概只需要 7.2 万个 token，Claude Code 要 23.5 万，差了 3.3 倍。
 
 第三名，Factory Droid 搭配 Opus 4.6，69.9 分。Factory AI 的核心产品。这个脚手架最大的特点是泛化能力：它用了四个不同的模型提交，全部进了前 15 名。其他脚手架大多只针对一个模型优化。核心架构就是前面说的，三层提示利用递近偏差、工具极简且按模型定制、多轨迹生成用测试选优，外加短超时策略快速失败。Droid的社区评价非常两极分化，它在benchmark上拥有傲人的数据，但实际使用中同样有许多用户反应生成的代码质量问题。
 
 第八名，Junie CLI 搭配 Gemini 3 Flash，64.3 分。JetBrains 做的。Flash 是一个相对便宜的模型，但 Junie 用它跑到了第八名。同一个 Flash 模型在 Google 自家的 Gemini CLI 上只拿了 51 分，差了 13.3 分。这是排行榜上同模型脚手架增益最大的案例之一。它的架构有几个特点：强制生成 requirements.md 和 plan.md 才能开始编码；利用 JetBrains IDE 原生的 AST 解析引擎，理论上比 grep 搜索更精确；它还能根据任务复杂度自动切换模型。
  
 第二十二名，Claude Code 搭配 Opus 4.6，58.0 分。这个分数比 baseline脚手架搭配opus4.6还要低。使用Claude Code的实际体验并不差 这是一件很反直觉的事情
 
 为什么会这样？答案可能是Claude Code 的设计目标是通用编码场景。它的多个工具、sub-agent 系统、CLAUDE.md 四级记忆等机制在写代码、改文件的时候很有用。但在 Terminal-Bench 测试的纯终端操作环境中，这些额外的复杂度可能帮了倒忙。
 
 最后说 Gemini CLI。Google 的开源 CLI，起步相对较晚，还在持续优化中。架构上的亮点是双包分层，CLI 负责终端交互，Core 作为独立包对外发布，第三方可以直接复用 Core 自建产品，复用门槛比较低。另一个特点是按任务复杂度在 Flash 和 Pro 之间自动路由模型。其余能力，Thought、Acti
on、Observation循环、工具系统、GEMINI.md 上下文注入等，和前面介绍的框架类似。
 
 ---
 
 除了 benchmark 分数，token 效率直接决定使用成本。在Adaline Labs的实验中, 同样完成一个任务，Codex CLI 大概花 7.2 万个 token，Claude Code 要 23.5 万，差 3.3 倍。Factory Droid 更夸张，因为它要生成多套方案再选优，平均不到 200 万，最高一个任务能到 1300 万个 token。Token效率差异直接意味着使用API费用的差异, 对于个人开发者而言, token效率绝对是越高越好.
  
 ---
 
说回 Claude Code，Terminal-Bench 的分数也不代表一切。这个 benchmark 测的是纯终端操作，而 Claude Code 的设计目标是覆盖完整的软件开发流程。过去几个月 Anthropic 一直在高频迭代，sub-agent 系统、Hooks 机制、plugin、skill，这些功能几乎都是他们率先探索出来的。可以说 Claude Code 是脚手架领域的探索者，很多设计思路对整个行业都有影响。我日常主要使用的脚手架组合有3套, claude code + opus4.6, codex + gpt5.3, 以及droid + opus4.6. 就我个人实际使用的体验来看，Codex CLI 和 Claude Code 在不同类型的代码任务上各有优势，没有哪个工具在所有场景下都碾压另一个。而Droid除了任务处理的速度比较快, 生成的代码质量我觉得也没有比其他脚手架高很多. 所以在用benchmark 进行比较的时候需要注意它衡量的是什么. 一个工具在特定 benchmark 上排名靠后，不代表它在你的日常工作里不好用。
 
 要进一步深入了解，我推荐。第一步先看 Terminal-Bench 的论文和 leaderboard，搞清楚它到底测了什么、没测什么。
 
 第二步看 OpenAI 的《Unrolling the Codex Agent Loop》和 Gemini CLI Architecture，理解主流脚手架怎么做 agent 循环、工具编排和模块分层。
 
 第三步看 Anthropic 的博客《Building effective agents》和《Effective harnesses for long-running agents》，了解 更多agent的 模式选择, 长任务设计, 以及AI编程技巧等
 
 下次选 AI 编程工具的时候，别光看它用了什么模型。模型只是故事的一半，另一半在脚手架里。

---

## 参考来源

[1] Terminal-Bench 2.0 Leaderboard — https://www.tbench.ai/leaderboard/terminal-bench/2.0
[2] How Claude Code Works (Anthropic Docs) — https://code.claude.com/docs/en/how-claude-code-works
[3] Unrolling the Codex Agent Loop (OpenAI Blog) — https://openai.com/index/unrolling-the-codex-agent-loop/
[4] A Real-Time Index for Your Codebase (Augment Code Blog) — https://www.augmentcode.com/blog/a-real-time-index-for-your-codebase-secure-personal-scalable
[5] How Droid Reached #1 on Terminal-Bench (Factory AI Blog) — https://factory.ai/news/terminal-bench
[6] Claude Code System Prompts (Piebald-AI, GitHub) — https://github.com/Piebald-AI/claude-code-system-prompts
[7] Building Effective Agents (Anthropic Blog) — https://www.anthropic.com/research/building-effective-agents
[8] The Agentic AI Era at JetBrains Is Here (JetBrains Blog) — https://blog.jetbrains.com/junie/2025/07/the-agentic-ai-era-at-jetbrains-is-here/
[9] Gemini CLI Architecture (Gemini CLI Docs) — https://geminicli.com/docs/architecture/
[10] Effective Harnesses for Long-Running Agents (Anthropic Blog) — https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
[11] Factory AI CodeDroid: Promising Concept, Premature Execution (HyperDev Review) — https://hyperdev.matsuoka.com/p/factory-ai-codedroid-promising-concept
[12] Code Droid Technical Report (Factory AI) — https://factory.ai/news/code-droid-technical-report
[13] Claude Code vs OpenAI Codex (Adaline Labs) — https://labs.adaline.ai/p/claude-code-vs-openai-codex
[14] Terminal-Bench: A Terminal-Centric Benchmark for AI Agents — https://arxiv.org/abs/2601.11868

const state = {
  lang: localStorage.getItem("Fiesta-lang") || "zh",
  posts: [],
  activeTrack: "all",
  activeMap: "comp-neuro",
  activeNode: "model-types",
};

const copy = {
  zh: {
    tagline: "一座缓慢编目的学习档案馆",
    navHome: "入口",
    navPosts: "档案",
    navMaps: "地图",
    navAdmin: "发布",
    footerText: "由 baoxiangcheng / h4ch1m1 维护。",
    introTitle: "“知道一件事的名字，和知道这件事本身，是两回事。”",
    introLead: "欢迎来到我的个人网页 Fiesta！这里主要存放我在学习计算机专业课、计算神经科学和类脑智能过程中的记录！",
    labLine: "Notes, traces, experiments, and unfinished hypotheses.",
    updateLabel: "编目方式",
    updateText: "当前先按内容形态和学习阶段组织：基础概念、专题路径、阅读札记、实验记录与开放问题；后续再用标签补充更细的主题连接。",
    quickLinks: "索引",
    allPosts: "全部档案",
    maps: "知识地图",
    publish: "网页端发布",
    github: "GitHub",
    columnsTitle: "档案室",
    columnsNote: "",
    latestTitle: "最近归档",
    latestNote: "",
    mapsTitle: "知识地图",
    mapsNote: "选择左侧专题书脊展开路线；悬停或点击地图节点，查看它在学习路径中的位置。",
    all: "全部",
    tracksTitle: "分类",
    trackAll: "全部文章",
    read: "阅读",
    back: "返回档案",
    empty: "当前分类下暂时没有文章。",
    emptyAction: "可以通过发布页面作为访客发表。",
    currentNode: "当前节点",
  },
  en: {
    tagline: "A slowly indexed archive of study",
    navHome: "Entry",
    navPosts: "Archive",
    navMaps: "Maps",
    navAdmin: "Publish",
    footerText: "Maintained by baoxiangcheng / h4ch1m1.",
    introTitle: "\"Knowing the name of something and knowing something are not the same thing.\"",
    introLead: "Fiesta keeps things still in motion: derivations in the margin, questions left after papers, traces from models, and the occasional connection that refuses to stay quiet.",
    labLine: "Notes, traces, experiments, and unfinished hypotheses.",
    updateLabel: "Indexing",
    updateText: "The archive is organized first by content form and learning stage: concepts, topic routes, reading notes, lab records, and open questions. Finer thematic tags will grow around them later.",
    quickLinks: "Index",
    allPosts: "All archive",
    maps: "Knowledge maps",
    publish: "Publish from browser",
    github: "GitHub",
    columnsTitle: "Archive Rooms",
    columnsNote: "Richard Feynman",
    latestTitle: "Recent Entries",
    latestNote: "New notes will appear here first, like index cards in an expanding cabinet.",
    mapsTitle: "Knowledge Maps",
    mapsNote: "Select a topic spine to unfold a route; hover or click nodes to inspect their place in the path.",
    all: "All",
    tracksTitle: "Tracks",
    trackAll: "All posts",
    read: "Read",
    back: "Back to archive",
    empty: "No posts here yet.",
    emptyAction: "You can publish as a visitor from the publishing page.",
    currentNode: "Current Node",
  },
};

const categories = [
  {
    id: "foundations",
    title: { zh: "基础概念", en: "Concepts" },
    summary: {
      zh: "一些我觉得很有意思的小概念！",
      en: "Concepts, definitions, derivations, and course structures: the first indexed cards of the archive.",
    },
    topics: {
      zh: ["神经科学基础", "机器学习", "计算机系统", "推导", "术语"],
      en: ["Neuroscience", "Machine learning", "Systems", "Derivations", "Terms"],
    },
  },
  {
    id: "models",
    title: { zh: "专题路径", en: "Routes" },
    summary: {
      zh: "这里会分专题讨论一些学科发展主线！",
      en: "Linked routes across models, theories, and questions: from neuron models to dynamics, predictive coding, and NeuroAI.",
    },
    topics: {
      zh: ["LIF / HH", "动力系统", "神经编码", "预测编码", "SNN"],
      en: ["LIF / HH", "Dynamics", "Neural coding", "Predictive coding", "SNN"],
    },
  },
  {
    id: "papers",
    title: { zh: "阅读札记", en: "Readings" },
    summary: {
      zh: "我引用别人，是为了更好地表达我自己。——蒙田",
      en: "Traces from papers and books: problems, methods, results, interpretations, questions, and follow-up trails.",
    },
    topics: {
      zh: ["经典论文", "综述", "近期论文", "书摘", "方法比较"],
      en: ["Classics", "Surveys", "Recent papers", "Book notes", "Methods"],
    },
  },
  {
    id: "experiments",
    title: { zh: "实验记录", en: "Lab" },
    summary: {
      zh: "模型仿真、论文复现、可视化 demo、小代码实验和课程项目。",
      en: "Simulations, reproductions, visual demos, small experiments, and course projects.",
    },
    topics: {
      zh: ["仿真", "复现", "可视化", "课程项目", "工具"],
      en: ["Simulation", "Reproduction", "Visualization", "Projects", "Tools"],
    },
  },
  {
    id: "ideas",
    title: { zh: "碎片想法", en: "Fragments" },
    summary: {
      zh: "一些小巧思和还没有完全归档的其他内容。",
      en: "Questions, small hypotheses, and cross-disciplinary associations that still keep their unfinished shape.",
    },
    topics: {
      zh: ["概念辨析", "学习反思", "研究想法", "开放问题"],
      en: ["Concepts", "Reflections", "Ideas", "Open questions"],
    },
  },
];

const tracks = [
  {
    id: "computational-neuroscience",
    title: { zh: "计算神经科学", en: "Computational Neuroscience" },
  },
  {
    id: "computer-science",
    title: { zh: "计算机专业课", en: "Computer Science Courses" },
  },
  {
    id: "neuroai",
    title: { zh: "NeuroAI", en: "NeuroAI" },
  },
  {
    id: "other",
    title: { zh: "其他 / 没有", en: "Other / None" },
  },
];

function trackById(id) {
  return tracks.find((track) => track.id === id);
}

const mapBooks = [
  {
    id: "comp-neuro",
    title: { zh: "计算神经科学", en: "Computational Neuroscience" },
    spine: { zh: "Comp Neuro", en: "Comp Neuro" },
    summary: {
      zh: "参考 Neuromatch Academy 的目录，把建模、统计学习、神经动力学、决策、强化学习和因果连成一张更大的技能树。",
      en: "A larger skill tree inspired by the Neuromatch Academy syllabus, linking modeling, statistical learning, neural dynamics, decision-making, RL, and causality.",
    },
    nodes: [
      { id: "model-types", x: 12, y: 50, title: { zh: "模型类型", en: "Model Types" }, note: { zh: "先区分描述性、机制性和规范性模型：what、how、why。", en: "Distinguish descriptive, mechanistic, and normative models: what, how, and why." } },
      { id: "modeling-practice", x: 24, y: 50, title: { zh: "建模实践", en: "Modeling Practice" }, note: { zh: "把问题、假设、数据、控制模型和解释边界放在同一张桌面上。", en: "Place questions, hypotheses, data, control models, and limits of explanation on the same table." } },
      { id: "model-fitting", x: 36, y: 50, title: { zh: "模型拟合", en: "Model Fitting" }, note: { zh: "回归、MLE、模型比较、置信区间、交叉验证和偏差-方差。", en: "Regression, MLE, model comparison, confidence intervals, cross-validation, and bias-variance." } },
      { id: "glm", x: 50, y: 50, title: { zh: "广义线性模型", en: "Generalized Linear Models" }, note: { zh: "用 GLM 做神经编码、解码和脉冲发放建模。", en: "Use GLMs for neural encoding, decoding, and spike-train modeling." } },
      { id: "dimensionality", x: 64, y: 28, title: { zh: "降维", en: "Dimensionality Reduction" }, note: { zh: "PCA、流形和低维结构，寻找群体活动的坐标。", en: "PCA, manifolds, and low-dimensional structure as coordinates for population activity." } },
      { id: "deep-learning", x: 78, y: 28, title: { zh: "深度学习", en: "Deep Learning" }, note: { zh: "用深度网络拟合复杂编码模型，并和视觉系统做比较。", en: "Fit richer encoding models with deep networks and compare them with the visual system." } },
      { id: "linear-systems", x: 64, y: 50, title: { zh: "线性系统", en: "Linear Systems" }, note: { zh: "状态空间、稳定性、响应函数和动力系统语言。", en: "State spaces, stability, response functions, and the language of dynamical systems." } },
      { id: "biological-neurons", x: 78, y: 50, title: { zh: "生物神经元模型", en: "Biological Neuron Models" }, note: { zh: "从 LIF 到 Hodgkin-Huxley，把神经元的电生理细节放回模型里。", en: "From LIF to Hodgkin-Huxley, returning electrophysiological detail to neuron models." } },
      { id: "dynamic-networks", x: 92, y: 50, title: { zh: "动态网络", en: "Dynamic Networks" }, note: { zh: "Wilson-Cowan、吸引子、振荡和群体活动的网络动力学。", en: "Wilson-Cowan, attractors, oscillations, and network dynamics of population activity." } },
      { id: "bayesian-decisions", x: 64, y: 72, title: { zh: "贝叶斯决策", en: "Bayesian Decisions" }, note: { zh: "用不确定性、先验、似然和损失函数理解感知与决策。", en: "Use uncertainty, priors, likelihoods, and loss functions to understand perception and decisions." } },
      { id: "hidden-dynamics", x: 78, y: 72, title: { zh: "隐藏动力学", en: "Hidden Dynamics" }, note: { zh: "HMM、Kalman filter 和随时间变化的潜在状态。", en: "HMMs, Kalman filters, and latent states changing over time." } },
      { id: "optimal-control", x: 92, y: 72, title: { zh: "最优控制", en: "Optimal Control" }, note: { zh: "把目标、代价、动作和动态系统放进一个控制问题。", en: "Frame goals, costs, actions, and dynamics as a control problem." } },
      { id: "reinforcement-learning", x: 92, y: 84, title: { zh: "强化学习", en: "Reinforcement Learning" }, note: { zh: "MDP、价值函数、策略、探索和模型化/无模型学习。", en: "MDPs, value functions, policies, exploration, and model-based/model-free learning." } },
      { id: "network-causality", x: 92, y: 28, title: { zh: "网络因果", en: "Network Causality" }, note: { zh: "扰动、因果图、模型拟合和从相关走向机制解释。", en: "Perturbations, causal graphs, model fitting, and the path from correlation to mechanism." } },
      { id: "project", x: 50, y: 84, title: { zh: "项目与复现", en: "Projects and Reproduction" }, note: { zh: "把技能树收束到一个可复现的模型、数据分析或小研究问题。", en: "Let the skill tree converge into a reproducible model, analysis, or small research question." } },
    ],
    edges: [
      ["model-types", "modeling-practice"], ["modeling-practice", "model-fitting"], ["model-fitting", "glm"],
      ["glm", "dimensionality"], ["dimensionality", "deep-learning"], ["deep-learning", "network-causality"],
      ["glm", "linear-systems"], ["linear-systems", "biological-neurons"], ["biological-neurons", "dynamic-networks"],
      ["glm", "bayesian-decisions"], ["bayesian-decisions", "hidden-dynamics"], ["hidden-dynamics", "optimal-control"],
      ["optimal-control", "reinforcement-learning"], ["model-fitting", "project"],
    ],
  },
  {
    id: "brain-ai",
    title: { zh: "类脑智能", en: "Brain-inspired Intelligence" },
    spine: { zh: "NeuroAI", en: "NeuroAI" },
    summary: {
      zh: "把神经科学里的表征、预测、局部学习、脉冲网络和神经形态计算，组织成一棵通向类脑智能的成长树。",
      en: "A growth tree from representation, prediction, local learning, spiking networks, and neuromorphic computing toward brain-inspired intelligence.",
    },
    nodes: [
      { id: "neural-coding", x: 12, y: 50, title: { zh: "神经编码", en: "Neural Coding" }, note: { zh: "从刺激、脉冲和群体活动里理解表征。", en: "Understand representation through stimuli, spikes, and population activity." } },
      { id: "population-representation", x: 28, y: 50, title: { zh: "群体表征", en: "Population Representation" }, note: { zh: "把单个神经元扩展到群体、流形和低维轨迹。", en: "Move from single neurons to populations, manifolds, and low-dimensional trajectories." } },
      { id: "local-learning", x: 44, y: 50, title: { zh: "局部学习", en: "Local Learning" }, note: { zh: "Hebbian learning、STDP、三因子规则和非反传学习。", en: "Hebbian learning, STDP, three-factor rules, and non-backprop updates." } },
      { id: "snn", x: 60, y: 50, title: { zh: "脉冲神经网络", en: "Spiking Neural Networks" }, note: { zh: "膜电位、脉冲、事件驱动计算和时序编码。", en: "Membrane potentials, spikes, event-driven computation, and temporal coding." } },
      { id: "neuromorphic", x: 76, y: 50, title: { zh: "神经形态计算", en: "Neuromorphic Computing" }, note: { zh: "芯片、低功耗、事件驱动硬件和部署约束。", en: "Chips, low power, event-driven hardware, and deployment constraints." } },
      { id: "predictive-coding", x: 44, y: 28, title: { zh: "预测编码", en: "Predictive Coding" }, note: { zh: "用误差、层级和生成模型理解感知。", en: "Use error signals, hierarchy, and generative models to think about perception." } },
      { id: "energy-probability", x: 60, y: 28, title: { zh: "能量与概率模型", en: "Energy and Probabilistic Models" }, note: { zh: "从能量函数、采样和不确定性看智能系统。", en: "Look at intelligent systems through energy functions, sampling, and uncertainty." } },
      { id: "active-inference", x: 76, y: 28, title: { zh: "主动推理", en: "Active Inference" }, note: { zh: "把感知、行动和不确定性放进同一个闭环。", en: "Put perception, action, and uncertainty inside one closed loop." } },
      { id: "embodied-agents", x: 92, y: 50, title: { zh: "具身智能体", en: "Embodied Agents" }, note: { zh: "把身体、环境、行动和学习耦合起来。", en: "Couple body, environment, action, and learning." } },
      { id: "neuroai-eval", x: 92, y: 28, title: { zh: "类脑评估", en: "NeuroAI Evaluation" }, note: { zh: "比较模型和脑：行为、表征、动力学和可解释性。", en: "Compare models and brains through behavior, representation, dynamics, and interpretability." } },
    ],
    edges: [
      ["neural-coding", "population-representation"], ["population-representation", "local-learning"],
      ["local-learning", "snn"], ["snn", "neuromorphic"], ["neuromorphic", "embodied-agents"],
      ["local-learning", "predictive-coding"], ["predictive-coding", "energy-probability"],
      ["energy-probability", "active-inference"], ["active-inference", "neuroai-eval"],
    ],
  },
  {
    id: "cs-lab",
    title: { zh: "CS 与实验能力", en: "CS and Lab Skills" },
    spine: { zh: "CS Lab", en: "CS Lab" },
    summary: {
      zh: "参考 CS 自学指南和 CSAPP，把工具、编程、算法、系统、网络、数据库、编译、AI/ML 与复现实验能力连起来。",
      en: "A CS DIY and CSAPP-inspired skill tree connecting tools, programming, algorithms, systems, networks, databases, compilers, AI/ML, and reproducible experiments.",
    },
    nodes: [
      { id: "tools", x: 12, y: 50, title: { zh: "工具链", en: "Toolchain" }, note: { zh: "命令行、Git、编辑器、环境管理和调试。", en: "Shell, Git, editors, environment management, and debugging." } },
      { id: "programming", x: 26, y: 50, title: { zh: "程序设计", en: "Programming" }, note: { zh: "Python、C/C++、工程结构和把想法写成程序的手感。", en: "Python, C/C++, project structure, and the craft of turning ideas into programs." } },
      { id: "dsa", x: 40, y: 50, title: { zh: "数据结构与算法", en: "Data Structures and Algorithms" }, note: { zh: "抽象数据类型、复杂度、图、动态规划和算法设计。", en: "ADTs, complexity, graphs, dynamic programming, and algorithm design." } },
      { id: "csapp", x: 54, y: 50, title: { zh: "CSAPP", en: "CSAPP" }, note: { zh: "信息表示、机器级程序、链接、内存层次、I/O、网络和并发。", en: "Representation, machine code, linking, memory hierarchy, I/O, networking, and concurrency." } },
      { id: "os", x: 68, y: 50, title: { zh: "操作系统", en: "Operating Systems" }, note: { zh: "进程、线程、内存、文件系统、同步和系统边界。", en: "Processes, threads, memory, file systems, synchronization, and system boundaries." } },
      { id: "networks", x: 82, y: 38, title: { zh: "计算机网络", en: "Computer Networks" }, note: { zh: "分层、协议、TCP/IP、Socket 和网络应用。", en: "Layering, protocols, TCP/IP, sockets, and network applications." } },
      { id: "databases", x: 82, y: 62, title: { zh: "数据库", en: "Databases" }, note: { zh: "关系模型、查询优化、事务和数据密集型系统。", en: "Relational models, query optimization, transactions, and data-intensive systems." } },
      { id: "compilers", x: 68, y: 28, title: { zh: "编译与 PL", en: "Compilers and PL" }, note: { zh: "词法语法、类型、IR、优化和程序语言的抽象层。", en: "Lexing, parsing, types, IR, optimization, and PL abstractions." } },
      { id: "ml-systems", x: 82, y: 28, title: { zh: "AI / ML 系统", en: "AI / ML Systems" }, note: { zh: "机器学习、深度学习、训练管线和系统实现。", en: "Machine learning, deep learning, training pipelines, and systems implementation." } },
      { id: "reproducible-lab", x: 94, y: 62, title: { zh: "复现实验", en: "Reproducible Lab" }, note: { zh: "记录环境、数据、代码、图表和失败原因，让实验能被重新打开。", en: "Record environments, data, code, figures, and failures so experiments can be reopened." } },
    ],
    edges: [
      ["tools", "programming"], ["programming", "dsa"], ["dsa", "csapp"], ["csapp", "os"],
      ["os", "networks"], ["os", "databases"], ["csapp", "compilers"], ["compilers", "ml-systems"],
      ["databases", "reproducible-lab"],
    ],
  },
];

const $ = (selector) => document.querySelector(selector);
const t = (key) => Object.prototype.hasOwnProperty.call(copy[state.lang], key) ? copy[state.lang][key] : key;
const text = (value) => typeof value === "string" ? value : value[state.lang] || value.zh || value.en || "";

function categoryById(id) {
  return categories.find((category) => category.id === id) || categories[0];
}

function activeBook() {
  return mapBooks.find((book) => book.id === state.activeMap) || mapBooks[0];
}

function activeNode(book = activeBook()) {
  return book.nodes.find((node) => node.id === state.activeNode) || book.nodes[0];
}

function setLanguage(lang) {
  state.lang = lang;
  localStorage.setItem("Fiesta-lang", lang);
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  $("#langToggle").textContent = lang === "zh" ? "EN" : "中";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  render();
}

function selectMap(id) {
  const book = mapBooks.find((item) => item.id === id);
  if (!book) return;
  state.activeMap = id;
  state.activeNode = book.nodes[0].id;
  renderMaps();
}

function selectNode(id) {
  state.activeNode = id;
  renderMaps();
}

function selectTrack(id) {
  state.activeTrack = id;
  renderPosts();
}

window.selectMap = selectMap;
window.selectNode = selectNode;
window.selectTrack = selectTrack;

function renderTopicList(topics) {
  return `<ul class="topic-list">${topics[state.lang].map((topic) => `<li>${topic}</li>`).join("")}</ul>`;
}

function renderCategory(category, index) {
  return `
    <article class="card archive-card archive-card-${index + 1}">
      <span class="archive-mark">${String(index + 1).padStart(2, "0")}</span>
      <h3>${text(category.title)}</h3>
      <p>${text(category.summary)}</p>
      ${renderTopicList(category.topics)}
    </article>
  `;
}

function renderPost(post) {
  const category = categoryById(post.category);
  const track = trackById(post.track);
  const tags = (post.tags || []).map((tag) => `<li>${tag}</li>`).join("");
  const summary = text(post.summary || "");
  return `
    <article class="post-card">
      <p class="meta">${track ? `${text(track.title)} / ` : ""}${text(category.title)} / ${post.date || ""}</p>
      <h3><a href="#/post/${post.slug}">${text(post.title)}</a></h3>
      ${summary ? `<p>${summary}</p>` : ""}
      <ul class="tag-list">${tags}</ul>
    </article>
  `;
}

function renderEmptyState() {
  return `
    <div class="empty-state">
      <p>${t("empty")}</p>
      <a href="admin.html">${t("emptyAction")}</a>
    </div>
  `;
}

function renderHome() {
  const latest = state.posts.slice(0, 5).map(renderPost).join("");
  $("#app").innerHTML = `
    <section class="masthead">
      <div class="construct-panel" aria-hidden="true">
        <span class="construct-circle"></span>
        <span class="construct-bar"></span>
        <span class="construct-block"></span>
        <span class="construct-line"></span>
      </div>
      <div class="masthead-copy">
        <p class="kicker">${t("labLine")}</p>
        <h1>Fiesta</h1>
        <p>${t("introLead")}</p>
      </div>
    </section>
    <section class="intro">
      <div class="quote-block">
        <h2>${t("introTitle")}</h2>
        ${t("columnsNote") ? `<p>${t("columnsNote")}</p>` : `<p>——理查德·费曼</p>`}
      </div>
      <aside class="quick-links">
        <h2>${t("quickLinks")}</h2>
        <ul>
          <li><a href="#/posts">${t("allPosts")}</a></li>
          <li><a href="#/maps">${t("maps")}</a></li>
          <li><a href="admin.html">${t("publish")}</a></li>
          <li><a href="https://github.com/h4ch1m1" target="_blank" rel="noreferrer">${t("github")}</a></li>
        </ul>
      </aside>
    </section>
    <section class="section">
      <div class="section-header">
        <h2>${t("columnsTitle")}</h2>
      </div>
      <div class="grid archive-grid">${categories.map(renderCategory).join("")}</div>
    </section>
    <section class="section">
      <div class="section-header">
        <h2>${t("latestTitle")}</h2>
        ${t("latestNote") ? `<p class="section-note">${t("latestNote")}</p>` : ""}
      </div>
      ${latest || renderEmptyState()}
    </section>
  `;
}

function renderPosts() {
  const currentTrack = state.activeTrack || "all";
  const filtered = state.posts.filter((post) => {
    const normalizedTrack = post.track || "other";
    return currentTrack === "all" || normalizedTrack === currentTrack;
  });
  const trackLinks = [{ id: "all", title: { zh: t("trackAll"), en: t("trackAll") } }, ...tracks].map((track) => {
    return `
      <button
        class="track-button ${currentTrack === track.id ? "active" : ""}"
        type="button"
        onclick="selectTrack('${track.id}')"
        aria-pressed="${currentTrack === track.id}"
      >${text(track.title)}</button>
    `;
  }).join("");
  $("#app").innerHTML = `
    <section class="posts-layout">
      <aside class="posts-track-nav" aria-label="${t("tracksTitle")}">
        <h2>${t("tracksTitle")}</h2>
        ${trackLinks}
      </aside>
      <div class="posts-main">
        <h1 class="page-title">${t("navPosts")}</h1>
        ${filtered.length ? filtered.map(renderPost).join("") : renderEmptyState()}
      </div>
    </section>
  `;
}

function renderMaps() {
  const book = activeBook();
  const node = activeNode(book);
  const nodeById = Object.fromEntries(book.nodes.map((item) => [item.id, item]));
  const edges = (book.edges || book.nodes.slice(1).map((item, index) => [book.nodes[index].id, item.id]))
    .map(([from, to]) => [nodeById[from], nodeById[to]])
    .filter(([from, to]) => from && to);
  $("#app").innerHTML = `
    <section>
      <div class="section-header">
        <h1 class="page-title">${t("mapsTitle")}</h1>
        <p class="section-note">${t("mapsNote")}</p>
      </div>
      <div class="map-library">
        <aside class="book-shelf" aria-label="${t("mapsTitle")}">
          ${mapBooks.map((item) => `
            <button
              class="book-spine ${item.id === book.id ? "active" : ""}"
              type="button"
              onclick="selectMap('${item.id}')"
              aria-pressed="${item.id === book.id}"
            >
              <span>${text(item.spine)}</span>
              <small>${text(item.title)}</small>
            </button>
          `).join("")}
        </aside>
        <div class="scroll-map">
          <div class="construct-shape shape-one"></div>
          <div class="construct-shape shape-two"></div>
          <div class="construct-shape shape-three"></div>
          <div class="map-title">
            <p class="kicker">${text(book.spine)}</p>
            <h2>${text(book.title)}</h2>
            <p>${text(book.summary)}</p>
          </div>
          <svg class="map-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            ${edges.map(([from, to]) => `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" />`).join("")}
          </svg>
          ${book.nodes.map((item, index) => `
            <button
              class="map-node ${item.id === node.id ? "active" : ""}"
              type="button"
              style="left:${item.x}%; top:${item.y}%"
              onclick="selectNode('${item.id}')"
              aria-label="${text(item.title)}"
            >
              <span class="node-dot">${index + 1}</span>
              <strong class="node-label">${text(item.title)}</strong>
            </button>
          `).join("")}
          <aside class="node-card">
            <p class="kicker">${t("currentNode")}</p>
            <h3>${text(node.title)}</h3>
            <p>${text(node.note)}</p>
          </aside>
        </div>
      </div>
    </section>
  `;
}

function markdownToHtml(markdown) {
  const inline = (line) => line
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  const html = [];
  let inList = false;
  for (const raw of markdown.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      continue;
    }
    if (line.startsWith("- ")) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${inline(line.slice(2))}</li>`);
      continue;
    }
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
    if (line.startsWith("# ")) html.push(`<h1>${inline(line.slice(2))}</h1>`);
    else if (line.startsWith("## ")) html.push(`<h2>${inline(line.slice(3))}</h2>`);
    else if (line.startsWith("### ")) html.push(`<h3>${inline(line.slice(4))}</h3>`);
    else if (line === "---") html.push("<hr>");
    else html.push(`<p>${inline(line)}</p>`);
  }
  if (inList) html.push("</ul>");
  return html.join("");
}

async function renderArticle(slug) {
  const post = state.posts.find((item) => item.slug === slug);
  if (!post) {
    renderPosts();
    return;
  }
  const category = categoryById(post.category);
  const track = trackById(post.track);
  const response = await fetch(post.path);
  const markdown = await response.text();
  $("#app").innerHTML = `
    <section class="article-shell">
      <p><a href="#/posts">${t("back")}</a></p>
      <article class="article">
        <p class="article-meta">${track ? `${text(track.title)} / ` : ""}${text(category.title)} / ${post.date || ""}</p>
        ${markdownToHtml(markdown)}
      </article>
    </section>
  `;
}

function render() {
  const cleanHash = location.hash.replace(/^#/, "").split("?")[0];
  const [route, param] = cleanHash.split("/").filter(Boolean);
  if (!route) return renderHome();
  if (route === "posts") return renderPosts();
  if (route === "maps") return renderMaps();
  if (route === "post") return renderArticle(param);
  return renderHome();
}

async function boot() {
  try {
    const response = await fetch("content/posts.json", { cache: "no-cache" });
    state.posts = await response.json();
  } catch (error) {
    state.posts = [];
    console.error(error);
  }
  $("#langToggle").addEventListener("click", () => setLanguage(state.lang === "zh" ? "en" : "zh"));
  window.addEventListener("hashchange", render);
  setLanguage(state.lang);
}

boot();

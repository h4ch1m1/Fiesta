const state = {
  lang: localStorage.getItem("Fiesta-lang") || "zh",
  posts: [],
  activeMap: "comp-neuro",
  activeNode: "neuro-basics",
};

const copy = {
  zh: {
    tagline: "一座缓慢编目的学习档案馆",
    navHome: "入口",
    navPosts: "档案",
    navMaps: "地图",
    navAdmin: "发布",
    footerText: "由 baoxiangcheng / h4ch1m1 维护。",
    introTitle: "先把纸页摊开。",
    introLead: "Fiesta 放一些还在路上的东西：课本边上的推导、读论文时留下的疑问、模型跑出来的痕迹，还有偶尔冒出来的连接。",
    labLine: "Notes, traces, experiments, and unfinished hypotheses.",
    updateLabel: "编目方式",
    updateText: "当前先按内容形态和学习阶段组织：基础概念、专题路径、阅读札记、实验记录与开放问题；后续再用标签补充更细的主题连接。",
    quickLinks: "索引",
    allPosts: "全部档案",
    maps: "知识地图",
    publish: "网页端发布",
    github: "GitHub",
    columnsTitle: "档案室",
    columnsNote: "先按它们出现的样子摆放：概念、路线、阅读、实验、碎片。等线索足够多，再让标签把暗处的关系勾出来。",
    latestTitle: "最近归档",
    latestNote: "新增文章会先进入这里，像一张仍在扩展的索引卡。",
    mapsTitle: "知识地图",
    mapsNote: "选择左侧专题书脊展开路线；悬停或点击地图节点，查看它在学习路径中的位置。",
    all: "全部",
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
    introTitle: "Lay the pages out first.",
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
    columnsNote: "The archive begins with how things arrive: concepts, routes, readings, lab records, and fragments. Tags can draw the hidden lines later.",
    latestTitle: "Recent Entries",
    latestNote: "New notes will appear here first, like index cards in an expanding cabinet.",
    mapsTitle: "Knowledge Maps",
    mapsNote: "Select a topic spine to unfold a route; hover or click nodes to inspect their place in the path.",
    all: "All",
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
      zh: "概念、定义、推导和课程中的基本结构。它们像档案馆里最早编号的一批索引卡。",
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
      zh: "把模型、理论和问题连成路线：从神经元模型到动力系统，从预测编码到类脑计算。",
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
      zh: "论文和书的阅读痕迹：问题、方法、结果、个人理解、疑问和后续线索。",
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
      zh: "还没有完全归档的小问题、小假设和跨学科联想。它们暂时保留未完成的形状。",
      en: "Questions, small hypotheses, and cross-disciplinary associations that still keep their unfinished shape.",
    },
    topics: {
      zh: ["概念辨析", "学习反思", "研究想法", "开放问题"],
      en: ["Concepts", "Reflections", "Ideas", "Open questions"],
    },
  },
];

const mapBooks = [
  {
    id: "comp-neuro",
    title: { zh: "计算神经科学", en: "Computational Neuroscience" },
    spine: { zh: "Comp Neuro", en: "Comp Neuro" },
    summary: {
      zh: "从神经科学基础进入神经元模型，再到编码、动力系统、决策和学习。",
      en: "From neuroscience basics to neuron models, coding, dynamics, decision-making, and learning.",
    },
    nodes: [
      {
        id: "neuro-basics",
        x: 13,
        y: 67,
        title: { zh: "神经科学基础", en: "Neuroscience basics" },
        note: { zh: "神经元、突触、回路与行为问题的基础语言。", en: "Neurons, synapses, circuits, and the basic language of behavior." },
      },
      {
        id: "lif-hh",
        x: 27,
        y: 42,
        title: { zh: "LIF / HH 模型", en: "LIF / HH models" },
        note: { zh: "从简化放电模型到生物物理细节。", en: "From simplified spiking models to biophysical detail." },
      },
      {
        id: "plasticity",
        x: 45,
        y: 58,
        title: { zh: "突触与可塑性", en: "Synapses and plasticity" },
        note: { zh: "学习规则、STDP 与局部更新机制。", en: "Learning rules, STDP, and local update mechanisms." },
      },
      {
        id: "coding",
        x: 58,
        y: 32,
        title: { zh: "神经编码", en: "Neural coding" },
        note: { zh: "刺激、表征、噪声与群体编码。", en: "Stimuli, representations, noise, and population coding." },
      },
      {
        id: "dynamics",
        x: 75,
        y: 48,
        title: { zh: "群体动力学", en: "Population dynamics" },
        note: { zh: "状态空间、吸引子、振荡与网络活动。", en: "State spaces, attractors, oscillations, and network activity." },
      },
      {
        id: "decision-rl",
        x: 86,
        y: 23,
        title: { zh: "决策与强化学习", en: "Decision and RL" },
        note: { zh: "价值、策略、探索以及与脑机制的连接。", en: "Value, policy, exploration, and links to brain mechanisms." },
      },
    ],
  },
  {
    id: "brain-ai",
    title: { zh: "类脑智能", en: "Brain-inspired AI" },
    spine: { zh: "NeuroAI", en: "NeuroAI" },
    summary: {
      zh: "连接 SNN、局部学习、预测编码、主动推理和神经形态计算。",
      en: "Connect SNNs, local learning, predictive coding, active inference, and neuromorphic computing.",
    },
    nodes: [
      {
        id: "snn",
        x: 15,
        y: 62,
        title: { zh: "SNN 基础", en: "SNN basics" },
        note: { zh: "脉冲、膜电位、事件驱动计算。", en: "Spikes, membrane potentials, and event-driven computation." },
      },
      {
        id: "local-learning",
        x: 31,
        y: 39,
        title: { zh: "局部学习", en: "Local learning" },
        note: { zh: "STDP、三因子规则和非反传学习。", en: "STDP, three-factor rules, and non-backprop learning." },
      },
      {
        id: "predictive-coding",
        x: 50,
        y: 51,
        title: { zh: "预测编码", en: "Predictive coding" },
        note: { zh: "误差信号、层级模型和生成式解释。", en: "Error signals, hierarchical models, and generative explanations." },
      },
      {
        id: "active-inference",
        x: 68,
        y: 29,
        title: { zh: "主动推理", en: "Active inference" },
        note: { zh: "感知、行动和自由能原则。", en: "Perception, action, and the free energy principle." },
      },
      {
        id: "neuromorphic",
        x: 84,
        y: 55,
        title: { zh: "神经形态计算", en: "Neuromorphic computing" },
        note: { zh: "芯片、低功耗和事件驱动硬件。", en: "Chips, low power, and event-driven hardware." },
      },
    ],
  },
  {
    id: "cs-lab",
    title: { zh: "CS 与实验能力", en: "CS and Lab Skills" },
    spine: { zh: "CS Lab", en: "CS Lab" },
    summary: {
      zh: "把计算机基础课和建模实验能力接起来，让理论落到代码和可视化上。",
      en: "Link CS foundations with modeling and experimentation so theory can become code and visualization.",
    },
    nodes: [
      {
        id: "dsa",
        x: 12,
        y: 43,
        title: { zh: "数据结构与算法", en: "Data structures and algorithms" },
        note: { zh: "复杂度、抽象结构和问题分解。", en: "Complexity, abstract structures, and problem decomposition." },
      },
      {
        id: "os",
        x: 29,
        y: 65,
        title: { zh: "操作系统", en: "Operating systems" },
        note: { zh: "进程、内存、并发与系统边界。", en: "Processes, memory, concurrency, and system boundaries." },
      },
      {
        id: "networks",
        x: 46,
        y: 37,
        title: { zh: "计算机网络", en: "Computer networks" },
        note: { zh: "协议、分层和分布式通信。", en: "Protocols, layering, and distributed communication." },
      },
      {
        id: "ml",
        x: 62,
        y: 58,
        title: { zh: "机器学习", en: "Machine learning" },
        note: { zh: "统计学习、优化、泛化和表征。", en: "Statistical learning, optimization, generalization, and representation." },
      },
      {
        id: "simulation",
        x: 79,
        y: 32,
        title: { zh: "数值仿真", en: "Numerical simulation" },
        note: { zh: "把模型变成可运行、可检验的实验。", en: "Turn models into runnable and testable experiments." },
      },
      {
        id: "reproduction",
        x: 90,
        y: 68,
        title: { zh: "论文复现", en: "Paper reproduction" },
        note: { zh: "复现实验、定位差异、写清楚失败和改进。", en: "Reproduce experiments, locate gaps, and document failures and improvements." },
      },
    ],
  },
];

const $ = (selector) => document.querySelector(selector);
const t = (key) => copy[state.lang][key] || key;
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

window.selectMap = selectMap;
window.selectNode = selectNode;

function renderTopicList(topics) {
  return `<ul class="topic-list">${topics[state.lang].map((topic) => `<li>${topic}</li>`).join("")}</ul>`;
}

function renderCategory(category, index) {
  return `
    <article class="card archive-card archive-card-${index + 1}">
      <span class="archive-mark">${String(index + 1).padStart(2, "0")}</span>
      <h3><a href="#/posts?category=${category.id}">${text(category.title)}</a></h3>
      <p>${text(category.summary)}</p>
      ${renderTopicList(category.topics)}
    </article>
  `;
}

function renderPost(post) {
  const category = categoryById(post.category);
  const tags = (post.tags || []).map((tag) => `<li>${tag}</li>`).join("");
  return `
    <article class="post-card">
      <p class="meta">${text(category.title)} / ${post.date || ""}</p>
      <h3><a href="#/post/${post.slug}">${text(post.title)}</a></h3>
      <p>${text(post.summary)}</p>
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
      <div>
        <h2>${t("introTitle")}</h2>
        <p>${t("columnsNote")}</p>
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
        <p class="section-note">${t("latestNote")}</p>
      </div>
      ${latest || renderEmptyState()}
    </section>
  `;
}

function renderPosts() {
  const query = location.hash.includes("?") ? location.hash.slice(location.hash.indexOf("?") + 1) : "";
  const current = new URLSearchParams(query).get("category") || "all";
  const filtered = current === "all" ? state.posts : state.posts.filter((post) => post.category === current);
  const filters = [{ id: "all", title: { zh: t("all"), en: t("all") } }, ...categories].map((category) => {
    const href = category.id === "all" ? "#/posts" : `#/posts?category=${category.id}`;
    return `<a class="filter-button ${current === category.id ? "active" : ""}" href="${href}">${text(category.title)}</a>`;
  }).join("");
  $("#app").innerHTML = `
    <section>
      <h1 class="page-title">${t("navPosts")}</h1>
      <div class="filters">${filters}</div>
      ${filtered.length ? filtered.map(renderPost).join("") : renderEmptyState()}
    </section>
  `;
}

function renderMaps() {
  const book = activeBook();
  const node = activeNode(book);
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
            <polyline points="${book.nodes.map((item) => `${item.x},${item.y}`).join(" ")}" />
          </svg>
          ${book.nodes.map((item, index) => `
            <button
              class="map-node ${item.id === node.id ? "active" : ""}"
              type="button"
              style="left:${item.x}%; top:${item.y}%"
              onclick="selectNode('${item.id}')"
              aria-label="${text(item.title)}"
            >
              <span>${index + 1}</span>
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
  const response = await fetch(post.path);
  const markdown = await response.text();
  $("#app").innerHTML = `
    <section class="article-shell">
      <p><a href="#/posts">${t("back")}</a></p>
      <article class="article">
        <p class="article-meta">${text(category.title)} / ${post.date || ""}</p>
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

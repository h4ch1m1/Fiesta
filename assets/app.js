const state = {
  lang: localStorage.getItem("Fiesta-lang") || "zh",
  posts: [],
};

const copy = {
  zh: {
    tagline: "计算神经科学、类脑智能与计算机学习笔记",
    navHome: "首页",
    navPosts: "文章",
    navMaps: "知识地图",
    navAdmin: "发布",
    footerText: "由 h4ch1m1 维护。",
    introTitle: "一个慢慢整理出来的学习笔记库。",
    introLead: "这里放计算神经科学、类脑智能、计算机专业课、论文阅读、实验复现和一些尚未完全成形的小思考。",
    labLine: "Notes, papers, experiments, and unfinished questions.",
    updateLabel: "最近更新",
    updateText: "站点结构已经搭好，接下来会逐步补充课程笔记、论文阅读和复现实验。",
    quickLinks: "快速入口",
    allPosts: "全部文章",
    maps: "知识地图",
    publish: "网页端发布",
    github: "GitHub",
    columnsTitle: "栏目",
    columnsNote: "先按内容形态和学习阶段组织，后续用标签补充更细的主题。",
    latestTitle: "最近文章",
    latestNote: "内容多起来之后，这里会成为主要的阅读入口。",
    mapsTitle: "知识地图",
    mapsNote: "这些路线只是起点，会随着课程、论文和实验继续调整。",
    all: "全部",
    read: "阅读",
    back: "返回文章",
    empty: "这里还没有文章。",
  },
  en: {
    tagline: "Notes on computational neuroscience, brain-inspired intelligence, and CS",
    navHome: "Home",
    navPosts: "Posts",
    navMaps: "Maps",
    navAdmin: "Publish",
    footerText: "Maintained by h4ch1m1.",
    introTitle: "A slow-growing notebook for learning.",
    introLead: "Notes on computational neuroscience, brain-inspired AI, CS courses, paper reading, experiments, and early-stage ideas.",
    labLine: "Notes, papers, experiments, and unfinished questions.",
    updateLabel: "Recent Update",
    updateText: "The site structure is in place; course notes, paper readings, and reproductions will be added gradually.",
    quickLinks: "Quick Links",
    allPosts: "All posts",
    maps: "Knowledge maps",
    publish: "Publish from browser",
    github: "GitHub",
    columnsTitle: "Columns",
    columnsNote: "The first layer follows content type and learning stage; tags can carry finer topics later.",
    latestTitle: "Recent Posts",
    latestNote: "As the archive grows, this will become the main reading entry.",
    mapsTitle: "Knowledge Maps",
    mapsNote: "These routes are starting points and will change with courses, papers, and experiments.",
    all: "All",
    read: "Read",
    back: "Back to posts",
    empty: "No posts here yet.",
  },
};

const categories = [
  {
    id: "foundations",
    title: { zh: "Foundations｜基础", en: "Foundations" },
    summary: {
      zh: "计算机专业课、神经科学基础和机器学习基础。",
      en: "CS courses, neuroscience basics, and machine learning foundations.",
    },
    topics: {
      zh: ["数据结构", "操作系统", "计算机网络", "神经科学基础", "机器学习"],
      en: ["Data structures", "Operating systems", "Networks", "Neuroscience", "Machine learning"],
    },
  },
  {
    id: "models",
    title: { zh: "Models｜模型与理论", en: "Models" },
    summary: {
      zh: "神经元模型、网络动力学、神经编码、强化学习、预测编码、SNN 与类脑模型。",
      en: "Neuron models, dynamics, neural coding, RL, predictive coding, SNNs, and brain-inspired models.",
    },
    topics: {
      zh: ["LIF / HH", "网络动力学", "神经编码", "RL", "SNN"],
      en: ["LIF / HH", "Dynamics", "Neural coding", "RL", "SNN"],
    },
  },
  {
    id: "papers",
    title: { zh: "Papers｜论文阅读", en: "Papers" },
    summary: {
      zh: "论文的问题、方法、结果、个人理解、疑问和后续线索。",
      en: "Problems, methods, results, interpretations, questions, and follow-up trails.",
    },
    topics: {
      zh: ["经典论文", "综述", "近期论文", "方法比较"],
      en: ["Classics", "Surveys", "Recent papers", "Methods"],
    },
  },
  {
    id: "experiments",
    title: { zh: "Experiments｜实验与复现", en: "Experiments" },
    summary: {
      zh: "模型仿真、论文复现、可视化 demo、小代码实验和课程项目。",
      en: "Simulations, reproductions, visual demos, small experiments, and course projects.",
    },
    topics: {
      zh: ["仿真", "复现", "可视化", "课程项目"],
      en: ["Simulation", "Reproduction", "Visualization", "Projects"],
    },
  },
  {
    id: "ideas",
    title: { zh: "Ideas｜小思考", en: "Ideas" },
    summary: {
      zh: "概念辨析、学习反思、研究想法、跨学科联想和开放问题。",
      en: "Concept notes, reflections, research ideas, cross-disciplinary links, and open questions.",
    },
    topics: {
      zh: ["概念", "反思", "想法", "问题"],
      en: ["Concepts", "Reflections", "Ideas", "Questions"],
    },
  },
];

const maps = [
  {
    title: { zh: "计算神经科学路线", en: "Computational Neuroscience Route" },
    summary: {
      zh: "从神经科学基础进入神经元模型，再到编码、动力系统、决策和学习。",
      en: "From neuroscience basics to neuron models, coding, dynamics, decision-making, and learning.",
    },
    route: {
      zh: ["神经科学基础", "LIF / HH 模型", "突触与可塑性", "神经编码", "群体动力学", "决策与强化学习"],
      en: ["Neuroscience basics", "LIF / HH models", "Synapses and plasticity", "Neural coding", "Population dynamics", "Decision and RL"],
    },
  },
  {
    title: { zh: "类脑智能路线", en: "Brain-inspired AI Route" },
    summary: {
      zh: "连接 SNN、局部学习、预测编码、主动推理和神经形态计算。",
      en: "Connect SNNs, local learning, predictive coding, active inference, and neuromorphic computing.",
    },
    route: {
      zh: ["SNN 基础", "STDP 与局部学习", "预测编码", "主动推理", "神经形态计算", "脑启发 AI 系统"],
      en: ["SNN basics", "STDP and local learning", "Predictive coding", "Active inference", "Neuromorphic computing", "Brain-inspired AI systems"],
    },
  },
  {
    title: { zh: "CS 与实验能力路线", en: "CS and Lab Skills Route" },
    summary: {
      zh: "把计算机基础课和建模实验能力接起来，让理论落到代码和可视化上。",
      en: "Link CS foundations with modeling and experimentation so theory can become code and visualization.",
    },
    route: {
      zh: ["数据结构与算法", "操作系统", "计算机网络", "机器学习", "数值仿真", "论文复现"],
      en: ["Data structures and algorithms", "Operating systems", "Computer networks", "Machine learning", "Numerical simulation", "Paper reproduction"],
    },
  },
];

const $ = (selector) => document.querySelector(selector);
const t = (key) => copy[state.lang][key] || key;
const text = (value) => typeof value === "string" ? value : value[state.lang] || value.zh || value.en || "";

function categoryById(id) {
  return categories.find((category) => category.id === id) || categories[0];
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

function renderTopicList(topics) {
  return `<ul class="topic-list">${topics[state.lang].map((topic) => `<li>${topic}</li>`).join("")}</ul>`;
}

function renderCategory(category) {
  return `
    <article class="card">
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
      <p class="meta">${text(category.title)} · ${post.date || ""}</p>
      <h3><a href="#/post/${post.slug}">${text(post.title)}</a></h3>
      <p>${text(post.summary)}</p>
      <ul class="tag-list">${tags}</ul>
    </article>
  `;
}

function renderHome() {
  const latest = state.posts.slice(0, 5).map(renderPost).join("");
  $("#app").innerHTML = `
    <section class="masthead">
      <p class="kicker">${t("labLine")}</p>
      <h1>Fiesta</h1>
      <p>${t("introLead")}</p>
    </section>
    <section class="notice">
      <strong>${t("updateLabel")}</strong>
      <span>${t("updateText")}</span>
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
      <div class="grid">${categories.map(renderCategory).join("")}</div>
    </section>
    <section class="section">
      <div class="section-header">
        <h2>${t("latestTitle")}</h2>
        <p class="section-note">${t("latestNote")}</p>
      </div>
      ${latest || `<p>${t("empty")}</p>`}
    </section>
  `;
}

function renderPosts() {
  const current = new URLSearchParams(location.hash.split("?")[1] || "").get("category") || "all";
  const filtered = current === "all" ? state.posts : state.posts.filter((post) => post.category === current);
  const filters = [{ id: "all", title: { zh: t("all"), en: t("all") } }, ...categories].map((category) => {
    const href = category.id === "all" ? "#/posts" : `#/posts?category=${category.id}`;
    return `<a class="filter-button ${current === category.id ? "active" : ""}" href="${href}">${text(category.title)}</a>`;
  }).join("");
  $("#app").innerHTML = `
    <section>
      <h1 class="page-title">${t("navPosts")}</h1>
      <div class="filters">${filters}</div>
      ${filtered.length ? filtered.map(renderPost).join("") : `<p>${t("empty")}</p>`}
    </section>
  `;
}

function renderMaps() {
  $("#app").innerHTML = `
    <section>
      <div class="section-header">
        <h1 class="page-title">${t("mapsTitle")}</h1>
        <p class="section-note">${t("mapsNote")}</p>
      </div>
      <div class="grid">
        ${maps.map((map) => `
          <article class="map-card">
            <h3>${text(map.title)}</h3>
            <p>${text(map.summary)}</p>
            <ol class="map-route">
              ${map.route[state.lang].map((item) => `<li>${item}</li>`).join("")}
            </ol>
          </article>
        `).join("")}
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
        <p class="article-meta">${text(category.title)} · ${post.date || ""}</p>
        ${markdownToHtml(markdown)}
      </article>
    </section>
  `;
}

function render() {
  const [route, param] = location.hash.replace(/^#/, "").split("/").filter(Boolean);
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

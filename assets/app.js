const state = {
  lang: localStorage.getItem("Fiesta-lang") || "zh",
  posts: [],
};

const copy = {
  zh: {
    tagline: "计算神经科学与类脑智能学习笔记",
    navHome: "首页",
    navMaps: "知识地图",
    navPosts: "文章",
    navAdmin: "发布",
    footerText: "由 h4ch1m1 维护，记录学习路径、论文阅读与小实验。",
    heroEyebrow: "Computational neuroscience · Brain-inspired intelligence · CS",
    heroTitle: "把学习大脑与智能的过程，写成可以生长的知识网络。",
    heroLead: "这里整理计算神经科学、类脑智能、计算机专业课、论文阅读、实验复现和小思考。它既是笔记库，也是研究兴趣慢慢成形的地方。",
    browsePosts: "浏览文章",
    viewMaps: "查看知识地图",
    columnsTitle: "栏目",
    columnsLead: "主栏目结合内容形态和学习阶段，适合长期积累，也方便未来扩展。",
    latestTitle: "最新文章",
    latestLead: "从欢迎页开始，后续可以直接在网页端发布 Markdown 笔记。",
    mapsTitle: "知识地图",
    mapsLead: "三条初始路线已经搭好，可以随着课程、论文和实验继续增补。",
    all: "全部",
    read: "阅读",
    noPosts: "还没有这个栏目的文章。",
    back: "返回文章",
  },
  en: {
    tagline: "Notes on computational neuroscience and brain-inspired intelligence",
    navHome: "Home",
    navMaps: "Maps",
    navPosts: "Posts",
    navAdmin: "Publish",
    footerText: "Maintained by h4ch1m1 for learning paths, paper notes, and experiments.",
    heroEyebrow: "Computational neuroscience · Brain-inspired intelligence · CS",
    heroTitle: "A growing knowledge network for studying brains, computation, and intelligence.",
    heroLead: "Notes on computational neuroscience, brain-inspired AI, CS courses, papers, experiments, and small research thoughts.",
    browsePosts: "Browse posts",
    viewMaps: "View maps",
    columnsTitle: "Columns",
    columnsLead: "The structure combines content type with learning stage, so the site can stay tidy while it grows.",
    latestTitle: "Latest Posts",
    latestLead: "Start from the welcome page, then publish Markdown notes directly from the browser.",
    mapsTitle: "Knowledge Maps",
    mapsLead: "Three starter maps are ready and can keep expanding with courses, papers, and experiments.",
    all: "All",
    read: "Read",
    noPosts: "No posts in this column yet.",
    back: "Back to posts",
  },
};

const categories = [
  {
    id: "foundations",
    color: "var(--blue)",
    title: { zh: "Foundations｜基础", en: "Foundations" },
    summary: {
      zh: "保留计算机专业课、神经科学基础和机器学习基础，去掉数学基础与编程工具。",
      en: "CS courses, neuroscience basics, and machine learning foundations, without separate math or tooling columns.",
    },
    topics: {
      zh: ["数据结构", "操作系统", "计算机网络", "神经科学基础", "机器学习基础"],
      en: ["Data structures", "Operating systems", "Networks", "Neuroscience", "Machine learning"],
    },
  },
  {
    id: "models",
    color: "var(--accent)",
    title: { zh: "Models｜模型与理论", en: "Models" },
    summary: {
      zh: "神经元模型、网络动力学、神经编码、强化学习、预测编码、SNN 与类脑模型。",
      en: "Neuron models, dynamics, neural coding, reinforcement learning, predictive coding, SNNs, and brain-inspired models.",
    },
    topics: {
      zh: ["LIF / HH", "群体动力学", "神经编码", "RL", "SNN"],
      en: ["LIF / HH", "Population dynamics", "Neural coding", "RL", "SNN"],
    },
  },
  {
    id: "papers",
    color: "var(--gold)",
    title: { zh: "Papers｜论文阅读", en: "Papers" },
    summary: {
      zh: "记录论文的问题、方法、结果、个人理解、疑问和可以继续追的线索。",
      en: "Paper notes organized by problem, method, result, interpretation, open questions, and follow-up trails.",
    },
    topics: {
      zh: ["经典论文", "综述", "近期论文", "方法比较"],
      en: ["Classics", "Surveys", "Recent papers", "Method comparisons"],
    },
  },
  {
    id: "experiments",
    color: "var(--rose)",
    title: { zh: "Experiments｜实验与复现", en: "Experiments" },
    summary: {
      zh: "放模型仿真、论文复现、可视化 demo、小型代码实验和课程项目。",
      en: "Model simulations, paper reproductions, visual demos, small coding experiments, and course projects.",
    },
    topics: {
      zh: ["仿真", "复现", "可视化", "课程项目"],
      en: ["Simulation", "Reproduction", "Visualization", "Course projects"],
    },
  },
  {
    id: "ideas",
    color: "var(--accent-strong)",
    title: { zh: "Ideas｜小思考", en: "Ideas" },
    summary: {
      zh: "概念辨析、学习反思、研究想法、跨学科联想和尚未成形的问题。",
      en: "Concept notes, learning reflections, research ideas, cross-disciplinary links, and early questions.",
    },
    topics: {
      zh: ["概念辨析", "学习反思", "研究想法", "开放问题"],
      en: ["Concepts", "Reflections", "Research ideas", "Open questions"],
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
      zh: "从神经启发机制出发，连接 SNN、预测编码、主动推理和神经形态计算。",
      en: "Connect neural mechanisms with SNNs, predictive coding, active inference, and neuromorphic computing.",
    },
    route: {
      zh: ["SNN 基础", "STDP 与局部学习", "预测编码", "主动推理", "神经形态芯片", "脑启发 AI 系统"],
      en: ["SNN basics", "STDP and local learning", "Predictive coding", "Active inference", "Neuromorphic chips", "Brain-inspired AI systems"],
    },
  },
  {
    title: { zh: "CS 与实验能力路线", en: "CS and Lab Skills Route" },
    summary: {
      zh: "把计算机基础课和建模实验能力接起来，让理论可以落到代码和可视化上。",
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

function categoryById(id) {
  return categories.find((category) => category.id === id) || categories[0];
}

function renderCategoryCard(category) {
  const topics = category.topics[state.lang].map((topic) => `<li>${topic}</li>`).join("");
  return `
    <article class="category-card" style="border-top: 4px solid ${category.color}">
      <div>
        <h3>${text(category.title)}</h3>
        <p>${text(category.summary)}</p>
      </div>
      <ul class="topic-list">${topics}</ul>
    </article>
  `;
}

function renderPostCard(post) {
  const category = categoryById(post.category);
  const tags = (post.tags || []).map((tag) => `<li>${tag}</li>`).join("");
  return `
    <article class="post-card">
      <span class="post-meta">${text(category.title)} · ${post.date || ""}</span>
      <h3>${text(post.title)}</h3>
      <p>${text(post.summary)}</p>
      <ul class="tag-list">${tags}</ul>
      <p><a class="secondary-link" href="#/post/${post.slug}">${t("read")}</a></p>
    </article>
  `;
}

function renderHome() {
  const latest = state.posts.slice(0, 3).map(renderPostCard).join("");
  $("#app").innerHTML = `
    <section class="hero">
      <div>
        <p class="eyebrow">${t("heroEyebrow")}</p>
        <h1>${t("heroTitle")}</h1>
        <p class="lede">${t("heroLead")}</p>
        <div class="hero-actions">
          <a class="primary-link" href="#/posts">${t("browsePosts")}</a>
          <a class="secondary-link" href="#/maps">${t("viewMaps")}</a>
        </div>
      </div>
      <aside class="hero-aside">
        <ul class="signal-list">
          ${categories.slice(0, 5).map((category, index) => `
            <li>
              <span class="signal-index">0${index + 1}</span>
              <span><strong>${text(category.title)}</strong><br>${text(category.summary)}</span>
            </li>
          `).join("")}
        </ul>
      </aside>
    </section>
    <section class="section">
      <div class="section-heading">
        <h2>${t("columnsTitle")}</h2>
        <p>${t("columnsLead")}</p>
      </div>
      <div class="category-grid">${categories.map(renderCategoryCard).join("")}</div>
    </section>
    <section class="section">
      <div class="section-heading">
        <h2>${t("latestTitle")}</h2>
        <p>${t("latestLead")}</p>
      </div>
      <div class="post-grid">${latest}</div>
    </section>
  `;
}

function renderPosts() {
  const current = new URLSearchParams(location.hash.split("?")[1] || "").get("category") || "all";
  const filtered = current === "all" ? state.posts : state.posts.filter((post) => post.category === current);
  const buttons = [{ id: "all", title: { zh: t("all"), en: t("all") } }, ...categories].map((category) => {
    const href = category.id === "all" ? "#/posts" : `#/posts?category=${category.id}`;
    return `<a class="filter-button ${current === category.id ? "active" : ""}" href="${href}">${text(category.title)}</a>`;
  }).join("");
  $("#app").innerHTML = `
    <section class="section">
      <div class="section-heading">
        <h1>${t("navPosts")}</h1>
        <p>${t("latestLead")}</p>
      </div>
      <div class="filters">${buttons}</div>
      <div class="post-grid">${filtered.length ? filtered.map(renderPostCard).join("") : `<p>${t("noPosts")}</p>`}</div>
    </section>
  `;
}

function renderMaps() {
  $("#app").innerHTML = `
    <section class="section">
      <div class="section-heading">
        <h1>${t("mapsTitle")}</h1>
        <p>${t("mapsLead")}</p>
      </div>
      <div class="map-grid">
        ${maps.map((map) => `
          <article class="map-card">
            <h3>${text(map.title)}</h3>
            <p>${text(map.summary)}</p>
            <ol class="map-route">
              ${map.route[state.lang].map((item, index) => `
                <li><span class="signal-index">${index + 1}</span><span>${item}</span></li>
              `).join("")}
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
  const lines = markdown.split(/\r?\n/);
  const html = [];
  let inList = false;
  for (const raw of lines) {
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
  $("#app").innerHTML = `<section class="article-shell"><p>${t("read")}...</p></section>`;
  const response = await fetch(post.path);
  const markdown = await response.text();
  const category = categoryById(post.category);
  $("#app").innerHTML = `
    <section class="article-shell">
      <p><a href="#/posts">${t("back")}</a></p>
      <article class="article">
        <span class="post-meta">${text(category.title)} · ${post.date || ""}</span>
        ${markdownToHtml(markdown)}
      </article>
    </section>
  `;
}

function render() {
  const [route, param] = location.hash.replace(/^#/, "").split("/").filter(Boolean);
  if (!route) return renderHome();
  if (route === "maps") return renderMaps();
  if (route === "posts") return renderPosts();
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

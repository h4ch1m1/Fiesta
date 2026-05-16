const form = document.querySelector("#publishForm");
const log = document.querySelector("#publishLog");
const draftKey = "Fiesta-admin-draft";

function writeLog(message) {
  log.textContent += `${message}\n`;
  log.scrollTop = log.scrollHeight;
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getValues() {
  const data = new FormData(form);
  return Object.fromEntries(data.entries());
}

function fillForm(values) {
  Object.entries(values).forEach(([key, value]) => {
    if (form.elements[key]) form.elements[key].value = value;
  });
}

async function githubFetch(url, token, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Accept": "application/vnd.github+json",
      "Authorization": `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.headers || {}),
    },
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`${response.status} ${response.statusText}: ${detail}`);
  }
  return response.json();
}

function encodeBase64Utf8(content) {
  return btoa(unescape(encodeURIComponent(content)));
}

async function readFile(owner, repo, path, branch, token) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}?ref=${encodeURIComponent(branch)}`;
  return githubFetch(url, token);
}

async function putFile(owner, repo, path, branch, token, content, message, sha) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}`;
  return githubFetch(url, token, {
    method: "PUT",
    body: JSON.stringify({
      branch,
      message,
      content: encodeBase64Utf8(content),
      ...(sha ? { sha } : {}),
    }),
  });
}

function buildPost(values) {
  const now = new Date();
  const slug = slugify(values.slug || values.titleEn || values.titleZh);
  const date = now.toISOString().slice(0, 10);
  return {
    slug,
    category: values.category,
    date,
    title: {
      zh: values.titleZh,
      en: values.titleEn || values.titleZh,
    },
    summary: {
      zh: values.summary,
      en: values.summary,
    },
    tags: values.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
    path: `posts/${slug}.md`,
  };
}

async function publish(values) {
  const owner = values.owner.trim();
  const repo = values.repo.trim();
  const branch = values.branch.trim();
  const token = values.token.trim();
  const post = buildPost(values);

  localStorage.setItem("Fiesta-admin-settings", JSON.stringify({ owner, repo, branch }));
  localStorage.setItem("Fiesta-admin-token", token);

  writeLog(`Preparing ${post.path}`);
  let indexFile;
  try {
    indexFile = await readFile(owner, repo, "content/posts.json", branch, token);
  } catch (error) {
    writeLog("No existing content/posts.json found. A new index will be created.");
  }

  const existingPosts = indexFile
    ? JSON.parse(decodeURIComponent(escape(atob(indexFile.content.replace(/\s/g, "")))))
    : [];
  const nextPosts = [post, ...existingPosts.filter((item) => item.slug !== post.slug)];
  const indexJson = `${JSON.stringify(nextPosts, null, 2)}\n`;

  writeLog("Writing Markdown article...");
  let markdownFile;
  try {
    markdownFile = await readFile(owner, repo, post.path, branch, token);
  } catch {
    markdownFile = null;
  }
  await putFile(owner, repo, post.path, branch, token, values.body, `Publish ${post.slug}`, markdownFile?.sha);

  writeLog("Updating post index...");
  await putFile(owner, repo, "content/posts.json", branch, token, indexJson, `Update post index for ${post.slug}`, indexFile?.sha);

  writeLog("Done. GitHub Pages will refresh after GitHub finishes deployment.");
}

form.addEventListener("input", (event) => {
  if (event.target.name === "titleEn" && !form.elements.slug.value) {
    form.elements.slug.value = slugify(event.target.value);
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  log.textContent = "";
  try {
    await publish(getValues());
  } catch (error) {
    writeLog(`Error: ${error.message}`);
  }
});

document.querySelector("#saveDraft").addEventListener("click", () => {
  localStorage.setItem(draftKey, JSON.stringify(getValues()));
  writeLog("Draft saved locally.");
});

document.querySelector("#clearDraft").addEventListener("click", () => {
  form.reset();
  log.textContent = "";
  localStorage.removeItem(draftKey);
});

const settings = JSON.parse(localStorage.getItem("Fiesta-admin-settings") || "{}");
const draft = JSON.parse(localStorage.getItem(draftKey) || "{}");
fillForm({ owner: "h4ch1m1", repo: "Fiesta", branch: "main", ...settings, ...draft });
const token = localStorage.getItem("Fiesta-admin-token");
if (token) form.elements.token.value = token;

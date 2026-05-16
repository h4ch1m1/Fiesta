# Fiesta

Fiesta is h4ch1m1's bilingual GitHub Pages notebook for computational neuroscience, brain-inspired intelligence, computer science foundations, paper reading, experiments, and research ideas.

Site URL after deployment:

`https://h4ch1m1.github.io/Fiesta/`

## Columns

- `Foundations`: CS courses, neuroscience basics, and machine learning foundations.
- `Models`: neuron models, network dynamics, neural coding, reinforcement learning, predictive coding, SNNs, and brain-inspired models.
- `Papers`: paper notes, classic readings, surveys, recent work, and method comparisons.
- `Experiments`: simulations, reproductions, visualization demos, coding experiments, and course projects.
- `Ideas`: concept notes, learning reflections, research ideas, interdisciplinary links, and open questions.
- `Maps`: starter learning maps for computational neuroscience, brain-inspired AI, and CS-to-lab skills.

## Features

- Static GitHub Pages site with no build step.
- Chinese and English language switch.
- Markdown-based article storage.
- Browser publishing console powered by the GitHub Contents API.
- Knowledge maps included from the first version.
- SEO metadata, sitemap, robots file, and web manifest.

## Recommended GitHub Repository Metadata

Repository:

`h4ch1m1/Fiesta`

Description:

`Bilingual notes on computational neuroscience, brain-inspired intelligence, CS foundations, papers, experiments, and research ideas.`

Website:

`https://h4ch1m1.github.io/Fiesta/`

Topics:

`computational-neuroscience`, `brain-inspired-ai`, `machine-learning`, `spiking-neural-networks`, `computer-science`, `github-pages`, `notes`, `fiesta`

## Deploy

1. Create the repository `h4ch1m1/Fiesta` on GitHub.
2. Push this folder to the `main` branch.
3. In GitHub repository settings, enable Pages:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
4. Open `https://h4ch1m1.github.io/Fiesta/`.

## Browser Publishing

Open `admin.html`, enter a GitHub fine-grained token with Contents read/write permission for this repository, and publish.

The publishing console creates a Markdown file under `posts/` and updates `content/posts.json`.

The token is stored only in local storage in the current browser.

## Local Preview

From this directory:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then open:

`http://127.0.0.1:4173/`

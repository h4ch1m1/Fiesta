# Fiesta

Fiesta is a bilingual, slowly indexed study archive for notes, derivations, reading traces, experiments, and unfinished hypotheses from computational neuroscience, brain-inspired intelligence, and computer science.

Site URL after deployment:

`https://h4ch1m1.github.io/Fiesta/`

## Archive Rooms

- `Concepts`: concepts, definitions, derivations, and course structures.
- `Routes`: topic paths that connect models, theories, and research questions.
- `Readings`: paper and book notes, including methods, results, questions, and follow-up trails.
- `Lab`: simulations, reproductions, visual demos, small experiments, and course projects.
- `Fragments`: provisional ideas, reflections, and open questions.
- `Maps`: interactive route maps for computational neuroscience, brain-inspired AI, and CS-to-lab skills.

The archive is organized first by content form and learning stage. Finer thematic tags will be added as the material grows.

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

`A slowly indexed archive of study notes, experiments, reading traces, and unfinished hypotheses.`

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

# Neuro Notes

A static GitHub Pages site for computational neuroscience, brain-inspired intelligence, CS notes, papers, experiments, ideas, and knowledge maps.

## Deploy

Recommended project repository: `h4ch1m1/neuro-notes`

1. Create the repository on GitHub.
2. Commit everything in this folder to `main`.
3. In GitHub repository settings, enable Pages from `main` / root.
4. The site will be available at `https://h4ch1m1.github.io/neuro-notes/`.

## Browser Publishing

Open `admin.html`, enter a GitHub fine-grained token with Contents read/write permission for the repository, and publish. The page creates a Markdown file under `posts/` and updates `content/posts.json`.

The token is saved only in local storage in the current browser.

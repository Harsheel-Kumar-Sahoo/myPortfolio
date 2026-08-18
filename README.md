# Harsheel Kumar Sahoo — Portfolio

A minimal, responsive personal portfolio site. Plain HTML/CSS/JS — no build step, no dependencies to install.

## Structure

```
.
├── index.html      # page content
├── style.css       # all styling (design tokens at the top)
├── script.js       # mobile nav + hero network animation
├── assets/
│   └── profile.png # your photo goes here
└── README.md
```

## Before you publish

1. **Add your photo.** Drop a square-ish image into `assets/profile.png` (any name works, just update the `src` in `index.html`'s `<img>` tag if you rename it). It's auto-cropped into a circle by CSS, so you don't need to pre-crop it. If the file is missing, the hero shows your initials instead — nothing breaks.
2. **Email.** Already set to `harsheelkumarsahoo@gmail.com` in the Contact section — update it in `index.html` if it ever changes.
3. **Add projects as you go.** The Projects section currently only has the real "Social Distance Maintainer" card — the placeholder cards have been removed. To add a new project, copy the structure of that card in `index.html` and edit the title, description, tags and link (or just ask Claude to add it for you).

## Light / dark mode

The site ships with a light/dark toggle (sun/moon icon in the navbar, and a text toggle in the mobile menu). It defaults to **dark mode** and remembers the visitor's choice in `localStorage`. Theme colors live at the top of `style.css` under `:root[data-theme="dark"]` and `:root[data-theme="light"]`.

## Run locally

Just open `index.html` in a browser — or, for accurate relative paths, serve it locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy with GitHub Pages

1. Create a new repository on GitHub (e.g. `portfolio` or `harsheel-kumar-sahoo.github.io` for a root-level personal site).
2. Push these files to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/Harsheel-Kumar-Sahoo/<repo-name>.git
   git push -u origin main
   ```
3. In the repo on GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, choose `main` and `/ (root)`, then save.
4. Your site will be live at `https://harsheel-kumar-sahoo.github.io/<repo-name>/` within a minute or two
   (or `https://harsheel-kumar-sahoo.github.io/` if the repo is named exactly `harsheel-kumar-sahoo.github.io`).

## Notes

- Fully responsive — tested down to small mobile widths.
- Respects `prefers-reduced-motion` (the hero animation freezes to a single frame).
- No frameworks, no build tools — edit the HTML directly to update copy.

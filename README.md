# GoManzanas — Landing Page

A lightweight, single-page React + TypeScript landing site with Home, About, and Contact pages. Deployed automatically to GitHub Pages on every push to `main`.

## Live site

[https://gomanzanas-bot.github.io/booster-agent-poc/](https://gomanzanas-bot.github.io/booster-agent-poc/)

## Pages

| Route | Description |
|-------|-------------|
| `/#/` | Hero, stats bar, features grid, testimonials, and CTA |
| `/#/about` | Team and product overview |
| `/#/contact` | Contact form with a thank-you confirmation |

## Tech stack

- **React 18** — UI framework
- **TypeScript** — type safety
- **Vite** — fast build tool
- **React Router v6** (HashRouter) — client-side navigation that works on GitHub Pages

## Running locally

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Building for production

```bash
npm run build
```

Output goes to `dist/`. The GitHub Actions workflow builds and deploys this automatically when you push to `main`.

## Deployment

Hosted on GitHub Pages via the workflow in `.github/workflows/jekyll-gh-pages.yml`. Every merge to `main` triggers a fresh build and deploy — no manual steps needed.

## Project structure

```
├── index.html              # App entry point
├── vite.config.ts          # Build config (sets base path for GitHub Pages)
├── src/
│   ├── main.tsx            # Mounts the React app with HashRouter
│   ├── App.tsx             # Route definitions
│   ├── components/
│   │   └── Nav.tsx         # Sticky navigation bar
│   └── pages/
│       ├── Home.tsx        # Landing page with all sections
│       ├── About.tsx       # About page
│       └── Contact.tsx     # Contact form
└── public/
    └── 404.html            # Redirects unknown paths back to the SPA root
```

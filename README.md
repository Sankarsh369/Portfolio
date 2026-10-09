# S Sankarsha — Portfolio

Personal portfolio of **S Sankarsha**, B.Tech AI & ML student at VIT Bhopal University (graduating 2027), open to internships and entry-level roles.

**Live site:** https://sankarsh369.github.io/Portfolio/

## What's inside

- **Projects** — every project is a card; opening it shows the overview, problem, key features, an architecture diagram, a step-by-step workflow, tech stack, what I learned, run commands, and links to the source code and live demo. Each project has its own shareable URL (e.g. `#project/nucleus`).
- **Experience, Skills, Education, Certifications, Contact**
- Light and dark mode, responsive down to phone width, no build step.

## Structure

```
index.html        page layout and static sections
styles.css        all styles (design tokens at the top)
js/projects.js    project data — edit this to add or update a project
js/app.js         renders cards, filters, and the project detail view
```

### Adding a project

Add an object to `PROJECTS` in `js/projects.js` with `slug`, `title`, `tagline`, `category`, `stack`, `repo`, optional `live`, `overview`, `problem`, `features`, `architecture` (layers, top to bottom), and `workflow` (ordered steps). The card and detail view are generated automatically.

## Run locally

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

Hosted on GitHub Pages from the `main` branch root.

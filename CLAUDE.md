# CLAUDE.md

## Overview

Personal portfolio website for Lillian Hong — showcases art (illustrations, comics) and professional work (engineering). Built with React + TypeScript, styled with Tailwind v4 + vanilla CSS, deployed to GitHub Pages via `gh-pages`.

## Tech Stack

- React 19, TypeScript, react-router-dom v7
- Tailwind CSS v4, MUI (icons + components)
- Styling: design tokens in CSS custom properties (`src/index.css`), BEM-style class naming
- Fonts: Cormorant Garamond (display), Hanken Grotesk (body)
- Deploy: `npm run deploy` → gh-pages, custom domain honglillian.com

## Architecture

- **Routing**: `src/App.tsx` — flat route table, all pages get shared `Header` + `PromoBanner`
- **Pages**: `src/pages/` — each page is a self-contained route component
- **Components**: `src/components/` — reusable UI (ProjectCard, WorkCard, Header, Footer, etc.)
- **Data**: `src/data/` — plain JS arrays of objects, imported directly by page components. Art projects live in `projects.js`, work/code projects in `code_monkey.js`
- **Static assets**: `public/` — images organized under `public/project_title_cards/`, resume PDF, profile photo
- **Styles**: Global styles + component styles in `src/index.css`. Uses CSS custom properties for theming (porcelain/cobalt palette)

## Adding Content

- **New art piece**: Add an entry to `src/data/projects.js` with `{title, subtitle, image, date, desc, link?}`
- **New work item**: Add an entry to `src/data/code_monkey.js` with `{title, subtitle, image, date, desc, link?}`
- **Images**: Place in `public/project_title_cards/` under the appropriate subdirectory

## Commands

- `npm start` — dev server
- `npm run build` — production build
- `npm run deploy` — build + deploy to GitHub Pages

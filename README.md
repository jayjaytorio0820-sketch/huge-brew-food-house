# Huge Brew Food House

Premium Professional Landing Page — static HTML + CSS + JS, deploys to Vercel as-is (no build step).
Add-on: Facebook Page integration.

## Structure
- `index.html` — Hero, Menu, About (Tambayan), Facebook, Contact (Hanapin kami)
- `assets/css/style.css` — design tokens at the top (`:root`)
- `assets/js/main.js` — `CONFIG` for Facebook URL, Messenger username, phone; mobile nav; FB Page embed
- `assets/images/` — logo, menu photo, store photos
- `content/content.md` — content checklist and placeholders (not deployed, see `.vercelignore`)

## Filling placeholders
1. Edit `CONFIG` in `assets/js/main.js` (phone, Messenger username, full FB Page URL).
2. Replace every element with `data-placeholder` in `index.html` and remove the attribute.

## Local preview
Open `index.html` in a browser, or run `npx serve .`

# Kholif Prasetyo — Portfolio

Personal portfolio website for Kholif Prasetyo Aditya Hidayat, Full-Stack Engineer.

🔗 **Live:** [kholif.dev](https://kholif.dev) *(update after deploy)*

---

## Tech

Pure HTML, CSS, and vanilla JS — no framework, no build tools. Deploy anywhere.

---

## Structure

```
portfolio/
└── index.html   # entire site (single file)
```

---

## Sections

- **Home** — hero + terminal widget
- **About** — bio + stats
- **Skills** — tech stack grid
- **Experience** — PT Sigma Digital Nusantara, CV. Sindang Restu Group
- **Projects** — 6 featured projects
- **Contact** — email, LinkedIn, GitHub

---

## Deploy to Vercel

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "init portfolio"
git remote add origin https://github.com/kholifpra9/portfolio.git
git push -u origin main

# 2. Go to vercel.com → Add New Project → Import repo → Deploy
```

No config needed. Vercel detects static HTML automatically.

---

## Customize

| What | Where in index.html |
|------|-------------------|
| Profile photo | Add `<img>` tag in hero section |
| Project links | Add `href` to `.project-card` |
| CV download | Update `btn-primary` href in hero to CV file URL |
| Colors | CSS variables at `:root` (top of `<style>`) |

---

## Contact

- **Email:** kholifprasetyo@gmail.com
- **LinkedIn:** linkedin.com/in/kholifprasetyo
- **GitHub:** github.com/kholifpra9

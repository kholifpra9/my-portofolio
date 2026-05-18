# Kholif Prasetyo — Personal Portfolio

> Personal portfolio website built from scratch — showcasing work, skills, and experience as a Full-Stack Engineer.

---

## 🚀 Live Preview

Open `index.html` directly in a browser, or serve locally:

```bash
npx serve .
# or
python -m http.server 8000
```

---

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML — all sections
├── assets/
│   ├── css/
│   │   └── style.css       # All styles & animations
│   ├── js/
│   │   └── main.js         # All interactivity & effects
│   └── images/
│       └── logo.png        # Favicon / logo
```

---

## ✨ Features

| Feature | Description |
|---|---|
| **Particle Canvas** | 80 animated particles with connecting lines via Canvas API |
| **Custom Cursor** | Dot + trailing ring cursor with hover scale effects |
| **Typing Text** | Auto-cycling role titles with typewriter effect |
| **Hero Letter Split** | Per-letter hover animation on name (safe TreeWalker approach) |
| **Mouse Parallax** | Hero elements shift on mouse movement |
| **Magnetic Buttons** | CTA buttons follow cursor within proximity |
| **3D Card Tilt** | Project cards tilt with `perspective` on hover |
| **Draggable Terminal** | Terminal widget is freely draggable by its title bar |
| **Counter Animation** | Stats count up when scrolled into view |
| **Scroll Reveal** | Sections fade in with staggered delay via IntersectionObserver |
| **Active Nav** | Nav links highlight based on current scroll position |
| **Mobile Drawer** | Hamburger menu with slide-in drawer for mobile |

---

## 🎨 Design Tokens

```css
--bg:       #080c10   /* Main background */
--surface:  #0d1117   /* Card surface */
--accent:   #00ff88   /* Primary green accent */
--accent2:  #0ea5e9   /* Blue accent */
--accent3:  #a855f7   /* Purple accent */
--text:     #e6edf3   /* Body text */
--muted:    #7d8590   /* Muted / secondary text */
--mono:     'Space Mono', monospace
--sans:     'Syne', sans-serif
```

---

## 🛠️ Tech Stack

- **Vanilla HTML / CSS / JavaScript** — zero frameworks, zero dependencies
- **Canvas API** — particle system
- **IntersectionObserver** — scroll reveal & counter trigger
- **Google Fonts** — Space Mono + Syne

---

## 🐛 Known Fix Applied

**Bug:** Hero name rendered raw HTML tags as visible text (`Kholif<br> <span class="line2">Prasetyo</span>...` appeared literally on screen).

**Cause:** `heroName.innerHTML.replace(/([A-Za-z])/g, ...)` was replacing every alphabetic character — including characters inside HTML tags like `</span>` and `class="line2"` — breaking the markup.

**Fix:** Replaced the regex approach with a `TreeWalker` that only traverses text nodes, leaving all HTML tag structure untouched.

```js
// ❌ Before — breaks inner HTML tags
heroName.innerHTML = heroName.innerHTML.replace(/([A-Za-z])/g, '<span class="letter">$1</span>');

// ✅ After — only touches text nodes safely
const walker = document.createTreeWalker(heroName, NodeFilter.SHOW_TEXT, null, false);
```

---

## 📬 Contact

| | |
|---|---|
| **Email** | kholifprasetyo@gmail.com |
| **LinkedIn** | [linkedin.com/in/kholifprasetyo](https://linkedin.com/in/kholifprasetyo) |
| **GitHub** | [github.com/kholifpra9](https://github.com/kholifpra9) |
| **Location** | Cianjur, Jawa Barat — Indonesia |

---

© 2026 Kholif Prasetyo. Built from scratch.
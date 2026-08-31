# Vishal Kumawat — Portfolio Website

A premium, fully responsive personal portfolio built with pure **HTML5, CSS3, and vanilla JavaScript** — no frameworks, no backend.

## Getting it running

Just open `index.html` in any modern browser. No build step, no server required.

## Two things to add yourself

1. **Your photo** — place a file named `me.jpg` in this folder (same level as `index.html`). If you'd rather use a PNG, save it as `me.jpg` anyway, or open `js/script.js` → `initProfileImageFallback` is already wired up, so you only need to change the `src="me.jpg"` attribute on the `<img class="profile-photo">` tag in `index.html` if you want a different filename/extension. Until a photo is added, a clean "VK" initials placeholder is shown automatically — nothing looks broken.
2. **Your resume** — place a file named `resume.pdf` in this folder. The "View Resume" and "Download Resume" buttons check for it and show a friendly notice if it's missing, instead of a broken link.

## Editing content

- **Projects** — open `js/script.js` and edit the `PROJECT_DATA` array near the top of the "Projects" section. Each entry needs `title`, `description`, `technologies`, `category`, `github`, and `demo`. The grid, filters, and modal all render from this array automatically.
- **Skills** — open `skills.html` and edit the skill names / `.skill-level` text / matching `data-level` attribute (`learning`, `beginner`, `intermediate`, `familiar`).
- **Education details** (CGPA, graduation year, etc.) — these were intentionally left out since they weren't provided. Add them in `education.html` and `resume.html` whenever you have them.
- **GitHub repositories** — pulled live from the public GitHub API (`api.github.com/users/vishalkumawatsand/repos`), no token required. If the API is unreachable, a graceful fallback link to your GitHub profile is shown instead.

## File structure

```
portfolio/
├── index.html
├── about.html
├── forensic.html
├── skills.html
├── projects.html
├── education.html
├── resume.html
├── contact.html
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   └── script.js
├── me.jpg        ← add your photo here
└── resume.pdf    ← add your resume here
```

## Notes

- Dark/light theme preference is stored in `localStorage` and defaults to dark.
- The contact form has no backend; on submit it validates the fields and opens the visitor's email client via a `mailto:` link.
- The "Case File" and "Terminal" components on the home page are decorative UI elements themed around forensic investigation — they don't represent real cases.
- All content is written to accurately describe Vishal as a student who is learning, not a certified or professional forensic/cybersecurity expert.

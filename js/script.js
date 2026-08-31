/* ==================================================
   VISHAL KUMAWAT — FORENSIC SCIENCE PORTFOLIO
   Vanilla JavaScript — script.js
   ================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initMobileMenu();
  initScrollProgress();
  initBackToTop();
  initScrollReveal();
  initProfileImageFallback();
  initTypingAnimation();
  initTerminal();
  initSkillFilters();
  initProjects();
  initGitHubRepos();
  initContactForm();
  initResumeCheck();
});

/* -------------------- Theme (Dark / Light) -------------------- */
function initTheme() {
  const root = document.documentElement;
  const stored = localStorage.getItem('vk-theme');
  const initial = stored === 'light' || stored === 'dark' ? stored : 'dark';
  root.setAttribute('data-theme', initial);

  const toggles = document.querySelectorAll('.theme-toggle');
  toggles.forEach((btn) => {
    btn.setAttribute('aria-pressed', initial === 'light');
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('vk-theme', next);
      toggles.forEach((t) => t.setAttribute('aria-pressed', next === 'light'));
    });
  });
}

/* -------------------- Navbar scroll state + active link -------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* -------------------- Mobile Menu -------------------- */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;

  const closeMenu = () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* -------------------- Scroll Progress Bar -------------------- */
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;
  const update = () => {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const pct = height > 0 ? (scrollTop / height) * 100 : 0;
    bar.style.width = pct + '%';
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

/* -------------------- Back to top -------------------- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* -------------------- Scroll Reveal -------------------- */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach((el) => observer.observe(el));
}

/* -------------------- Profile Image Fallback --------------------
   If me.jpg is missing, show initials avatar instead. Easy to swap:
   just replace /me.jpg with your own photo of the same name, or
   update the `src` attribute on the <img class="profile-photo"> tag.
------------------------------------------------------------------ */
function initProfileImageFallback() {
  document.querySelectorAll('.profile-photo').forEach((img) => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
      const fallback = img.parentElement.querySelector('.profile-fallback');
      if (fallback) fallback.style.display = 'flex';
    });
  });
}

/* -------------------- Typing Animation -------------------- */
function initTypingAnimation() {
  const el = document.querySelector('.hero-typing-text');
  if (!el) return;

  const phrases = [
    'Forensic Science Student',
    'Digital Forensics Enthusiast',
    'Technology Learner',
    'Research-Oriented Student',
    'Problem Solver'
  ];

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    el.textContent = phrases[0];
    return;
  }

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const type = () => {
    const current = phrases[phraseIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, 1600);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 40 : 70);
  };

  setTimeout(type, 500);
}

/* -------------------- Forensic Terminal Animation -------------------- */
function initTerminal() {
  const body = document.querySelector('.terminal-body');
  if (!body) return;

  const lines = [
    { text: 'vishal@forensics:~$ analyze --profile', cls: 'prompt' },
    { text: '> Academic Focus: Forensic Science', cls: '' },
    { text: '> University: NFSU Jaipur', cls: '' },
    { text: '> Interests: Digital Forensics, Technology', cls: '' },
    { text: '> Status: Learning & Building', cls: '' }
  ];

  body.innerHTML = '';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    lines.forEach((line) => {
      const div = document.createElement('div');
      div.className = 'line' + (line.cls ? ' ' + line.cls : '');
      div.style.opacity = '1';
      div.textContent = line.text;
      body.appendChild(div);
    });
    return;
  }

  let i = 0;
  const printNext = () => {
    if (i >= lines.length) {
      const cursor = document.createElement('span');
      cursor.className = 'terminal-cursor';
      body.appendChild(cursor);
      return;
    }
    const line = lines[i];
    const div = document.createElement('div');
    div.className = 'line' + (line.cls ? ' ' + line.cls : '');
    div.textContent = line.text;
    body.appendChild(div);
    i++;
    setTimeout(printNext, 450);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        printNext();
        obs.disconnect();
      }
    });
  }, { threshold: 0.4 });
  observer.observe(body);
}

/* -------------------- Skills Page: Filters -------------------- */
function initSkillFilters() {
  const filterBar = document.querySelector('.skill-filters');
  if (!filterBar) return;

  const buttons = filterBar.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.skill-item');
  const groups = document.querySelectorAll('.skill-group');

  // animate skill bars on load
  document.querySelectorAll('.skill-bar-fill').forEach((bar) => {
    const level = bar.getAttribute('data-level');
    const map = { learning: '35%', beginner: '50%', intermediate: '70%', familiar: '85%' };
    requestAnimationFrame(() => {
      bar.style.width = map[level] || '50%';
    });
  });

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      items.forEach((item) => {
        const category = item.getAttribute('data-category');
        const show = filter === 'all' || category === filter;
        item.classList.toggle('hidden', !show);
      });

      groups.forEach((group) => {
        const visibleItems = group.querySelectorAll('.skill-item:not(.hidden)');
        group.style.display = visibleItems.length ? '' : 'none';
      });
    });
  });
}

/* -------------------- Projects: Data, Render, Filter, Modal --------------------
   EDIT THIS ARRAY to add/remove your own projects.
   Each entry needs: title, description, technologies[], category, github, demo
------------------------------------------------------------------------------ */
const PROJECT_DATA = [
  {
    title: 'Sample Project — Portfolio Website',
    description: 'This personal portfolio website itself, built from scratch using semantic HTML5, modern CSS3 and vanilla JavaScript, with no frameworks.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    category: 'Web Development',
    github: 'https://github.com/vishalkumawatsand',
    demo: '#'
  },
  {
    title: 'Sample Project — Evidence Log Concept',
    description: 'An editable, sample concept for a simple digital evidence-logging interface, explored as a learning exercise in structuring forensic data on the front end.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    category: 'Forensics',
    github: '#',
    demo: '#'
  },
  {
    title: 'Sample Project — Basic Network Scanner Notes',
    description: 'A placeholder entry for documenting learning exercises around networking fundamentals and basic security concepts. Replace with a real project when ready.',
    technologies: ['Python', 'Linux'],
    category: 'Cybersecurity',
    github: '#',
    demo: '#'
  },
  {
    title: 'Sample Project — Algorithms Practice',
    description: 'A placeholder entry representing ongoing practice with core programming and problem-solving exercises in C and C++.',
    technologies: ['C', 'C++'],
    category: 'Programming',
    github: '#',
    demo: '#'
  }
];

function initProjects() {
  const grid = document.querySelector('.project-grid');
  if (!grid) return;

  renderProjects(PROJECT_DATA);
  initScrollReveal();

  const filterBar = document.querySelector('.project-filters');
  const buttons = filterBar ? filterBar.querySelectorAll('.filter-btn') : [];

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      document.querySelectorAll('.project-card').forEach((card) => {
        const category = card.getAttribute('data-category');
        card.classList.toggle('hidden', !(filter === 'all' || category === filter));
      });
    });
  });

  initProjectModal();
}

function renderProjects(data) {
  const grid = document.querySelector('.project-grid');
  grid.innerHTML = '';

  data.forEach((project, index) => {
    const card = document.createElement('article');
    card.className = 'card project-card reveal';
    card.setAttribute('data-category', project.category);
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'View details for ' + project.title);
    card.dataset.index = index;

    card.innerHTML = `
      <span class="sample-tag">Sample / Editable</span>
      <div class="project-preview" aria-hidden="true">// ${escapeHtml(project.category)}</div>
      <span class="project-category">${escapeHtml(project.category)}</span>
      <h3>${escapeHtml(project.title)}</h3>
      <p>${escapeHtml(project.description)}</p>
      <div class="tech-badges">
        ${project.technologies.map((t) => `<span class="tech-badge">${escapeHtml(t)}</span>`).join('')}
      </div>
      <div class="project-links">
        <a class="btn btn-outline btn-small" href="${project.github}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">GitHub</a>
        <a class="btn btn-outline btn-small" href="${project.demo}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">Live Demo</a>
      </div>
    `;

    card.addEventListener('click', () => openProjectModal(index));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProjectModal(index);
      }
    });

    grid.appendChild(card);
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function initProjectModal() {
  const overlay = document.querySelector('.modal-overlay');
  if (!overlay) return;
  const closeBtn = overlay.querySelector('.modal-close');

  closeBtn.addEventListener('click', closeProjectModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeProjectModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeProjectModal();
  });
}

function openProjectModal(index) {
  const project = PROJECT_DATA[index];
  const overlay = document.querySelector('.modal-overlay');
  if (!project || !overlay) return;

  overlay.querySelector('.modal-category').textContent = project.category;
  overlay.querySelector('.modal-title').textContent = project.title;
  overlay.querySelector('.modal-desc').textContent = project.description;
  overlay.querySelector('.modal-tech').innerHTML = project.technologies
    .map((t) => `<span class="tech-badge">${escapeHtml(t)}</span>`).join('');
  overlay.querySelector('.modal-github').href = project.github;
  overlay.querySelector('.modal-demo').href = project.demo;

  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  overlay.querySelector('.modal-close').focus();
}

function closeProjectModal() {
  const overlay = document.querySelector('.modal-overlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
}

/* -------------------- GitHub Repositories (public API, no token) -------------------- */
async function initGitHubRepos() {
  const container = document.querySelector('.github-repos');
  if (!container) return;

  const username = 'vishalkumawatsand';
  container.innerHTML = '<p class="github-loading">Fetching latest repositories…</p>';

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
    if (!response.ok) throw new Error('GitHub API request failed with status ' + response.status);

    const repos = await response.json();
    if (!Array.isArray(repos) || repos.length === 0) throw new Error('No repositories found');

    container.innerHTML = '';
    container.className = 'github-grid';

    repos.slice(0, 6).forEach((repo) => {
      const card = document.createElement('article');
      card.className = 'card repo-card reveal';
      card.innerHTML = `
        <h3>${escapeHtml(repo.name)}</h3>
        <p>${escapeHtml(repo.description || 'No description provided.')}</p>
        <div class="repo-meta">
          <span>${escapeHtml(repo.language || '—')}</span>
          <span>★ ${repo.stargazers_count}</span>
          <span>⑂ ${repo.forks_count}</span>
        </div>
        <a class="btn btn-outline btn-small mt-24" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">View Repository</a>
      `;
      container.appendChild(card);
    });
    initScrollReveal();
  } catch (err) {
    console.warn('GitHub repos could not be loaded:', err.message);
    container.className = '';
    container.innerHTML = `
      <div class="github-fallback">
        <p>Visit my GitHub profile to explore my latest projects.</p>
        <a class="btn btn-primary" href="https://github.com/${username}" target="_blank" rel="noopener noreferrer">View GitHub</a>
      </div>
    `;
  }
}

/* -------------------- Contact Form: Validation + mailto -------------------- */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const status = form.querySelector('.form-status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const subject = form.querySelector('#subject');
    const message = form.querySelector('#message');

    let valid = true;
    valid = validateField(name, (v) => v.trim().length >= 2, 'Please enter your name (at least 2 characters).') && valid;
    valid = validateField(email, (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), 'Please enter a valid email address.') && valid;
    valid = validateField(subject, (v) => v.trim().length >= 3, 'Please enter a subject (at least 3 characters).') && valid;
    valid = validateField(message, (v) => v.trim().length >= 10, 'Please enter a message (at least 10 characters).') && valid;

    if (!valid) {
      status.className = 'form-status';
      return;
    }

    const mailBody = `Name: ${name.value.trim()}\nEmail: ${email.value.trim()}\n\n${message.value.trim()}`;
    const mailto = `mailto:vishalkumawat4493@gmail.com?subject=${encodeURIComponent(subject.value.trim())}&body=${encodeURIComponent(mailBody)}`;

    status.textContent = 'Opening your email client to send this message…';
    status.className = 'form-status show success';

    window.location.href = mailto;
  });

  function validateField(field, test, errorMsg) {
    const group = field.closest('.form-group');
    const errorEl = group.querySelector('.form-error');
    if (!test(field.value)) {
      group.classList.add('error');
      errorEl.textContent = errorMsg;
      return false;
    }
    group.classList.remove('error');
    return true;
  }

  [form.querySelector('#name'), form.querySelector('#email'), form.querySelector('#subject'), form.querySelector('#message')]
    .forEach((field) => {
      if (!field) return;
      field.addEventListener('input', () => field.closest('.form-group').classList.remove('error'));
    });
}

/* -------------------- Resume: graceful missing-file handling -------------------- */
function initResumeCheck() {
  const links = document.querySelectorAll('.resume-link');
  if (!links.length) return;

  links.forEach((link) => {
    link.addEventListener('click', async (e) => {
      try {
        const res = await fetch('resume.pdf', { method: 'HEAD' });
        if (!res.ok) throw new Error('missing');
      } catch (err) {
        e.preventDefault();
        const notice = document.querySelector('.resume-missing');
        if (notice) notice.classList.add('show');
      }
    });
  });
}

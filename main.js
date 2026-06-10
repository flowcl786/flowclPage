/* ============================================================
   main.js — nav, theme toggle, scroll-reveal, mobile menu
   ============================================================ */

// ---------- Theme ----------
const THEME_KEY = 'claire-theme';

const savedTheme = localStorage.getItem(THEME_KEY)
  || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  const btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ---------- Inject theme button into nav ----------
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');

  // Floating theme button (bottom-right)
  const themeBtn = document.createElement('button');
  themeBtn.className = 'theme-fab';
  themeBtn.id = 'theme-btn';
  themeBtn.setAttribute('aria-label', 'Toggle theme');
  themeBtn.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
  themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
  document.body.appendChild(themeBtn);

  // ---------- Mobile menu ----------
  const navLinks = document.querySelector('.nav__links');
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // ---------- Active nav link on scroll ----------
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav__links a');

  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => navObserver.observe(s));

  // ---------- Scroll-reveal ----------
  const revealTargets = document.querySelectorAll(
    '.section__title, .about__text, .fact, .skill-group, .project-card, .blog-card, .contact__link, .hero__content, .hero__visual, .about__facts, .section__sub'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => revealObserver.observe(el));

  // ---------- Nav shadow on scroll ----------
  const nav2 = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav2.style.boxShadow = '0 2px 18px rgba(0,0,0,.10)';
    } else {
      nav2.style.boxShadow = 'none';
    }
  }, { passive: true });
});

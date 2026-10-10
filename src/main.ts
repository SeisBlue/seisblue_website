import './styles.css';

// Footer copyright year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// Rehydrate obfuscated email links so spam bots scraping the static HTML
// only see "jimmy [at] seisblue.com" — real address is assembled at runtime.
document.querySelectorAll<HTMLAnchorElement>('a.email').forEach((el) => {
  const user = el.dataset.user;
  const domain = el.dataset.domain;
  if (!user || !domain) return;

  const address = `${user}@${domain}`;
  el.href = `mailto:${address}`;

  if (el.textContent && el.textContent.includes('[at]')) {
    el.textContent = address;
  }
});

// Mobile nav: hamburger toggles the link panel; close on link tap or Escape
const nav = document.querySelector<HTMLElement>('.nav');
const navToggle = document.querySelector<HTMLButtonElement>('.nav__toggle');
if (nav && navToggle) {
  const setOpen = (open: boolean) => {
    nav.classList.toggle('nav--open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  };
  navToggle.addEventListener('click', () => setOpen(!nav.classList.contains('nav--open')));
  nav.querySelectorAll('.nav__links a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
}

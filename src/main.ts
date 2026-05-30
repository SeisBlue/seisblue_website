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

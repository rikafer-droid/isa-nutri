const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');

if (menuButton && mainNav) {
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
    mainNav.classList.remove('is-open');
  };

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
    mainNav.classList.toggle('is-open', !isOpen);
  });

  mainNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

// Alinha as seções abaixo do cabeçalho fixo ao navegar por âncoras internas.
const scrollToSection = (targetId) => {
  const target = document.getElementById(targetId);
  if (!target) return false;

  const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
  const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
  return true;
};

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;

  const targetId = decodeURIComponent(link.getAttribute('href').slice(1));
  if (!scrollToSection(targetId)) return;

  event.preventDefault();
  history.pushState(null, '', `#${encodeURIComponent(targetId)}`);
});

window.addEventListener('popstate', () => {
  const targetId = decodeURIComponent(window.location.hash.slice(1));
  if (targetId) scrollToSection(targetId);
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const quickLinks = document.querySelector('.quick-links');

function closeMenu() {
  if (!menuButton || !mainNav) return;
  mainNav.classList.remove('open');
  quickLinks?.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}

if (menuButton && mainNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    quickLinks?.classList.toggle('open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  [...mainNav.querySelectorAll('a'), ...(quickLinks?.querySelectorAll('a') || [])].forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 20);
});

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

reveals.forEach((element) => observer.observe(element));

const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const quickLinks = document.querySelector('.quick-links');

if (menuButton && mainNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    if (quickLinks) quickLinks.classList.toggle('open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      if (quickLinks) quickLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}


const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const quickLinks = document.querySelector('.quick-links');

if (menuToggle && mainNav && quickLinks) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    mainNav.classList.toggle('open');
    quickLinks.classList.toggle('open');
  });

  [...mainNav.querySelectorAll('a'), ...quickLinks.querySelectorAll('a')].forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 860) {
        menuToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('open');
        quickLinks.classList.remove('open');
      }
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
revealItems.forEach(item => revealObserver.observe(item));

const carousel = document.querySelector('[data-carousel]');
if (carousel) {
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const dots = Array.from(carousel.querySelectorAll('[data-carousel-dot]'));
  const prev = carousel.querySelector('[data-carousel-prev]');
  const next = carousel.querySelector('[data-carousel-next]');
  let current = 0;
  let timer;

  const showSlide = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  };

  const start = () => {
    clearInterval(timer);
    timer = setInterval(() => showSlide(current + 1), 3800);
  };

  prev?.addEventListener('click', () => { showSlide(current - 1); start(); });
  next?.addEventListener('click', () => { showSlide(current + 1); start(); });
  dots.forEach((dot, index) => dot.addEventListener('click', () => { showSlide(index); start(); }));

  showSlide(0);
  start();
}

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


// Carrossel principal de imagens do PDV Legal
const carousel = document.querySelector('[data-carousel]');
if (carousel) {
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const dots = Array.from(carousel.querySelectorAll('[data-carousel-dot]'));
  const prev = carousel.querySelector('[data-carousel-prev]');
  const next = carousel.querySelector('[data-carousel-next]');
  let current = 0;
  let timer = null;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  function startCarousel() {
    stopCarousel();
    timer = setInterval(() => showSlide(current + 1), 4200);
  }

  function stopCarousel() {
    if (timer) clearInterval(timer);
  }

  prev?.addEventListener('click', () => {
    showSlide(current - 1);
    startCarousel();
  });

  next?.addEventListener('click', () => {
    showSlide(current + 1);
    startCarousel();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      startCarousel();
    });
  });

  carousel.addEventListener('mouseenter', stopCarousel);
  carousel.addEventListener('mouseleave', startCarousel);

  showSlide(0);
  startCarousel();
}

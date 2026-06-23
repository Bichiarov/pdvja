document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const play = document.querySelector('.play');
if (play) {
  play.addEventListener('click', () => {
    alert('Aqui pode entrar o vídeo de apresentação do PDV Legal.');
  });
}

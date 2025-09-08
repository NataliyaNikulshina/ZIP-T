const button = document.querySelector('.button-round');
const intro = document.querySelector('.intro');

window.addEventListener('scroll', () => {
  const rect = intro.getBoundingClientRect();

if (rect.bottom < window.innerHeight / 2) {
    button.classList.add('fixed');  // "приклеиваем" с анимацией
  } else {
    button.classList.remove('fixed'); // возвращаем назад
  }
});

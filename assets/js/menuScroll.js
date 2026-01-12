document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.js-header');
  const menuToggler = document.querySelector('.js-menu-toggler');
  const menuLinks = document.querySelectorAll('.js-menu-link');
  const sections = document.querySelectorAll('section');
  const hamburger = document.querySelector('.hamburger');

  // === Плавный скролл по клику ===
  menuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }

      // Закрываем мобильное меню
      if (window.innerWidth < 1025) {
        header.classList.remove('page-header--menu-opened');
        document.body.classList.remove('menu-opened');
        hamburger.classList.remove('is-active');
      }
    });
  });

  // === Переключение меню (бургер) ===
  if (menuToggler) {
    menuToggler.addEventListener('click', function () {
      header.classList.toggle('page-header--menu-opened');
      document.body.classList.toggle('menu-opened');
    });
  }

  // === Подсветка активного пункта при скролле ===
  function updateActiveLink() {
    let currentId = null;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        currentId = section.id;
      }
    });

    menuLinks.forEach(link => {
      const targetId = link.getAttribute('href').substring(1);
      link.classList.toggle('active', targetId === currentId);
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  window.addEventListener('load', updateActiveLink);
});


hamburger.addEventListener('click', function () {
  this.classList.toggle('is-active');
});

// menuLinks.forEach(link => {
//   link.addEventListener('click', () => {
//       document.querySelector('.hamburger').classList.remove('is-active');
//   });
// });
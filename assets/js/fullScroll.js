// let x = 1, y = 1; // Центр
// const grid = document.querySelector('.grid');

// // Обновление вида и активной ссылки
// function updateView() {
//   grid.style.transform = `translate(${-x * 100}vw, ${-y * 100}vh)`;
//   updateActiveLink();
// }

// // Проверка: можно ли двигаться (только центр + 4 направления)
// function isValid(nx, ny) {
//   return (nx === 1 && ny === 1) || // центр
//          (nx === 1 && (ny === 0 || ny === 2)) || // вверх и вниз
//          (ny === 1 && (nx === 0 || nx === 2));   // влево и вправо
// }

// // Обновление активной ссылки в меню
// function updateActiveLink() {
//   const screenCoordsMap = {
//     'center': { x: 1, y: 1 },
//     'top':    { x: 1, y: 0 },
//     'bottom': { x: 1, y: 2 },
//     'left':   { x: 0, y: 1 },
//     'right':  { x: 2, y: 1 }
//   };

//   let currentId = null;

//   for (const [key, value] of Object.entries(screenCoordsMap)) {
//     if (value.x === x && value.y === y) {
//       currentId = key;
//       break;
//     }
//   }

//   document.querySelectorAll('.js-menu-link').forEach(link => {
//     const targetId = link.getAttribute('href').substring(1);
//     link.classList.toggle('active', targetId === currentId);
//   });
// }

// // Стрелки клавиатуры
// document.addEventListener('keydown', (e) => {
//   let nx = x, ny = y;
//   if (e.key === 'ArrowLeft') nx--;
//   if (e.key === 'ArrowRight') nx++;
//   if (e.key === 'ArrowUp') ny--;
//   if (e.key === 'ArrowDown') ny++;

//   if (isValid(nx, ny)) {
//     x = nx;
//     y = ny;
//     updateView();
//   }
// });

// // Наведение мыши на край
// let mouseCooldown = false;
// function freezeMouseMove() {
//   mouseCooldown = true;
//   setTimeout(() => mouseCooldown = false, 1000);
// }

// document.addEventListener('mousemove', (e) => {
//   if (mouseCooldown) return;

//   const threshold = 30;
//   const w = window.innerWidth;
//   const h = window.innerHeight;

//   let nx = x, ny = y;

//   if (e.clientX < threshold) nx--;
//   else if (e.clientX > w - threshold) nx++;
//   else if (e.clientY < threshold) ny--;
//   else if (e.clientY > h - threshold) ny++;

//   if ((nx !== x || ny !== y) && isValid(nx, ny)) {
//     x = nx;
//     y = ny;
//     updateView();
//     freezeMouseMove();
//   }
// });

// // Карта координат
// const screenMap = {
//   center: { x: 1, y: 1 },
//   top:    { x: 1, y: 0 },
//   bottom: { x: 1, y: 2 },
//   left:   { x: 0, y: 1 },
//   right:  { x: 2, y: 1 }
// };

// // Переход по ссылкам меню
// document.querySelectorAll('.js-menu-link').forEach(link => {
//   link.addEventListener('click', (e) => {
//     e.preventDefault();
//     const targetId = link.getAttribute('href').substring(1);
//     const target = screenMap[targetId];
//     if (target) {
//       x = target.x;
//       y = target.y;
//       updateView();
//     }
//   });
// });

// // Мобильный свайп
// let touchStartX = 0;
// let touchStartY = 0;
// let touchEndX = 0;
// let touchEndY = 0;
// const swipeThreshold = 50;

// document.addEventListener('touchstart', (e) => {
//   touchStartX = e.changedTouches[0].clientX;
//   touchStartY = e.changedTouches[0].clientY;
// });

// document.addEventListener('touchend', (e) => {
//   touchEndX = e.changedTouches[0].clientX;
//   touchEndY = e.changedTouches[0].clientY;

//   const dx = touchEndX - touchStartX;
//   const dy = touchEndY - touchStartY;

//   let nx = x;
//   let ny = y;

//   if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > swipeThreshold) {
//     if (dx < 0) nx++; // свайп влево — вправо
//     else nx--;        // свайп вправо — влево
//   } else if (Math.abs(dy) > swipeThreshold) {
//     if (dy < 0) ny++; // свайп вверх — вниз
//     else ny--;        // свайп вниз — вверх
//   }

//   if (isValid(nx, ny)) {
//     x = nx;
//     y = ny;
//     updateView();
//   }
// });

// 

document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.js-header');
  const menuToggler = document.querySelector('.js-menu-toggler');
  const menuLinks = document.querySelectorAll('.js-menu-link');
  const sections = document.querySelectorAll('section');

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

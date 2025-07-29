// let header = document.querySelector(`.js-header`);
// let menuToggler = document.querySelector(`.js-menu-toggler`);
// let menuLinks = document.querySelectorAll(`.js-menu-link`);

// if (menuToggler) {
//   menuToggler.addEventListener(`click`, function () {
//     if (header.classList.contains(`page-header--menu-opened`)) {
//       header.classList.remove(`page-header--menu-opened`);
//       document.body.classList.remove(`menu-opened`);
//     } else {
//       header.classList.add(`page-header--menu-opened`);
//       document.body.classList.add(`menu-opened`);
//     }
//   });
// }

// for (let i = 0; i < menuLinks.length; i++) {
//   menuLinks[i].addEventListener(`click`, function () {
//     menuLinks.forEach(link => link.classList.remove('active'));
//     link.classList.add('active');
//     if (window.innerWidth < 1025) {
//       header.classList.remove(`page-header--menu-opened`);
//       document.body.classList.remove(`menu-opened`);
//     }
//   });
// }

document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.js-header');
    const menuToggler = document.querySelector('.js-menu-toggler');
    const menuLinks = document.querySelectorAll('.js-menu-link');
  
    if (menuToggler) {
      menuToggler.addEventListener('click', function () {
        header.classList.toggle('page-header--menu-opened');
        document.body.classList.toggle('menu-opened');
      });
    }
  
    menuLinks.forEach(link => {
      link.addEventListener('click', function () {
        menuLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
  
        if (window.innerWidth < 1025) {
          header.classList.remove('page-header--menu-opened');
          document.body.classList.remove('menu-opened');
        }
      });
    });
  });
  

console.log(document.querySelectorAll('.js-menu-link'));
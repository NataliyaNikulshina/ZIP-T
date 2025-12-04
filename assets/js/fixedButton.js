const button = document.querySelector('.button-round');
const intro = document.querySelector('.intro');

window.addEventListener('scroll', () => {
  const rect = intro.getBoundingClientRect();

if (rect.bottom < window.innerHeight * (2/3)) {
    button.classList.add('fixed');  // "приклеиваем" с анимацией
  } else {
    button.classList.remove('fixed'); // возвращаем назад
  }
});


// GSAP анимации элементов
gsap.registerPlugin(ScrollTrigger);

// 1. Изображения
gsap.from(".left-img", {
    opacity: 0,
    x: -100,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".intro",
        start: "top 80%",
    }
});

gsap.from(".small-img", {
    opacity: 0,
    x: 100,
    y: 50,
    duration: 1,
    delay: 0.3,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".intro",
        start: "top 80%",
    }
});

// 2. Текстовый блок
gsap.from(".text-block h1", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".text-block",
        start: "top 90%",
    }
});

gsap.from(".text-block h2", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".text-block",
        start: "top 90%",
    }
});

gsap.from(".text-block p", {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.3,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".text-block",
        start: "top 90%",
    }
});

// 4. Бренды с stagger
gsap.from(".brand-item", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".brands",
        start: "top 90%",
    }
});


function callContact(event) {
    event.preventDefault();
    const phoneDigits = "89099552121";
    // Определяем платформу
    // const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    // const isAndroid = /Android/.test(navigator.userAgent);
    // const isMobile = isIOS || isAndroid;
    // const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isMobile =
        // устройства с поддержкой Touch
        ("ontouchstart" in window) ||
        // iPadOS 13+ маскируется как Mac, но имеет более 1 touch-point
        (navigator.maxTouchPoints > 1);
    
    if (isMobile) {
        // На мобильном - звоним
        window.location.href = `tel:${phoneDigits}`;
    } else {
        // На ПК - WhatsApp
        window.open(`https://wa.me/${phoneDigits}`, "_blank");
    }
    // const phoneDigits = phone.replace(/\D/g, '');

    // // // Проверяем, мобильное ли устройство
    // // const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    // const isMobile =
    //     // устройства с поддержкой Touch
    //     ("ontouchstart" in window) ||
    //     // iPadOS 13+ маскируется как Mac, но имеет более 1 touch-point
    //     (navigator.maxTouchPoints > 1);

    // if (isMobile) {
    //     // На мобильном — открываем звонок
    //     window.location.href = `tel:${phoneDigits}`;
    // } else {
    //     // На ПК — открываем WhatsApp
    //     window.open(`https://wa.me/${phoneDigits}`, "_blank");
    // }
}

// button.addEventListener("click", callContact);


document.addEventListener("DOMContentLoaded", () => {

  // Появление кнопки
  gsap.from(button, {
    opacity: 0,
    scale: 0.3,
    duration: 0.8,
    ease: "back.out(1.6)"
  });

  // Пульсация
//   gsap.to(button, {
//     scale: 1.05,
//     duration: 1.6,
//     ease: "power1.inOut",
//     repeat: -1,
//     yoyo: true
//   });
});

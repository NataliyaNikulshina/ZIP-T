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

function callPhone() {
    window.location.href = "tel:+74959616375";
}

function callContact() {
    const phone = "+74959616375";
    const phoneDigits = phone.replace(/\D/g, '');

    // Проверяем, мобильное ли устройство
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        // На мобильном — открываем звонок
        window.location.href = `tel:${phoneDigits}`;
    } else {
        // На ПК — открываем WhatsApp
        window.open(`https://wa.me/${phoneDigits}`, "_blank");
    }
}

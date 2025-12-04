gsap.registerPlugin(ScrollTrigger);

// Появление заголовка
gsap.from(".reviews-title", {
  scrollTrigger: {
    trigger: "#left",
    start: "top 80%",
  },
  y: -50,
  opacity: 0,
  duration: 1,
  ease: "power2.out",
});

const reviewItems = gsap.utils.toArray(".review-item");

// Появление каждого отзыва при скролле
reviewItems.forEach((item, index) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: "top 90%",
      toggleActions: "play none none reverse"
    },
    y: 50,
    opacity: 0,
    scale: 0.95,
    duration: 0.8,
    delay: index * 0.2,
    ease: "power3.out"
  });

  // Живой эффект при наведении
  item.addEventListener("mouseenter", () => {
    gsap.to(item, { scale: 1.05, boxShadow: "0 12px 30px rgba(0,0,0,0.15)", duration: 0.3, ease: "power2.out" });
  });
  item.addEventListener("mouseleave", () => {
    gsap.to(item, { scale: 1, boxShadow: "0 8px 25px rgba(0,0,0,0.05)", duration: 0.3, ease: "power2.out" });
  });
});

// Горизонтальная прокрутка по кнопкам
const carousel = document.querySelector(".reviews-carousel");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
const scrollAmount = 320; // ширина одного отзыва + gap

prevBtn.addEventListener("click", () => {
  carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});

nextBtn.addEventListener("click", () => {
  carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
});


// --- Эффект “подергивания” элементов карусели на мобильных
if (carousel && reviewItems.length && window.innerWidth < 768) {
  ScrollTrigger.create({
    trigger: carousel,
    start: "top 100%",
    onEnter: () => {
      // Задержка 1 секунда перед анимацией
      setTimeout(() => {
        const firstItems = reviewItems.slice(0, 3); // первые 3 элемента
        firstItems.forEach((item, i) => {
          gsap.fromTo(
            item,
            { x: 0 },
            {
              x: -40,          // сдвиг вправо на 40px
              duration: 0.3,
              ease: "power1.out",
              yoyo: true,
              repeat: 1,      // вернется обратно
              delay: i * 0.1  // волной
            }
          );
        });
      }, 1000);
    },
    onLeaveBack: () => {
      // Если нужно, можно сбросить состояние элементов
      reviewItems.forEach(item => gsap.set(item, { x: 0 }));
    }
  });
}
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

// Появление каждого отзыва при скролле
gsap.utils.toArray(".review-item").forEach((item, index) => {
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

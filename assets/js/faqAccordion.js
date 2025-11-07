gsap.registerPlugin(ScrollTrigger);

// Плавное появление секции
gsap.from(".faq-title", {
  scrollTrigger: {
    trigger: "#top",
    start: "top 80%",
  },
  y: -50,
  opacity: 0,
  duration: 1,
  ease: "power2.out",
});

gsap.from(".faq-item", {
  scrollTrigger: {
    trigger: "#top",
    start: "top 80%",
  },
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: "power3.out",
});

// Аккордеон
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");
  let open = false;

  // Начальная скрытая высота
  gsap.set(answer, { height: 0, opacity: 0 });

  question.addEventListener("click", () => {
    // Закрываем другие
    faqItems.forEach(i => {
      if (i !== item) {
        gsap.to(i.querySelector(".faq-answer"), { height: 0, opacity: 0, duration: 0.4, ease: "power2.inOut" });
        i.classList.remove("active");
      }
    });

    // Переключаем текущее
    open = !open;
    item.classList.toggle("active", open);
    gsap.to(answer, {
      height: open ? "auto" : 0,
      opacity: open ? 1 : 0,
      duration: 0.5,
      ease: "power2.inOut"
    });
  });
});

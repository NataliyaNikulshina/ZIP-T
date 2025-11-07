window.addEventListener('load', () => {
    gsap.registerPlugin(ScrollTrigger);
  
    // --- Анимация колеса
    // Анимация колеса (фона)
gsap.fromTo(".circle-bg",
    { 
      x: -300,      // стартовая позиция (слева за пределами экрана)
      rotation: 0,  // стартовое вращение
      opacity: 0, 
      scale: 0.8 
    },
    { 
      scrollTrigger: {
        trigger: "#right",          // секция, при появлении которой срабатывает анимация
        start: "top 80%",           // когда верх секции достигает 80% высоты окна
        toggleActions: "play none none reverse", 
        once: false                 // можно анимировать при каждом показе (true — только один раз)
      },
      x: 0,                         // финальное положение
      rotation: 720,                // 2 оборота (быстрее)
      opacity: 1,
      scale: 1,
      duration: 1.8,                // скорость анимации
      ease: "power3.out"
    }
  );  
    // gsap.from(".circle-bg", {
    //   scrollTrigger: {
    //     trigger: "#right",
    //     start: "top 80%",
    //   },
    //   duration: 2,
    //   scale: 0.5,
    //   opacity: 0,
    //   rotation: 180,
    //   ease: "power2.out"
    // });
  
    // --- Анимация списка услуг
    gsap.utils.toArray(".service-item").forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 60,
        duration: 1.2,
        delay: i * 0.1,
        ease: "power3.out"
      });
    });
  
    // --- Анимация иконок отдельно
    gsap.utils.toArray(".service-item .icon").forEach((icon) => {
      gsap.from(icon, {
        scrollTrigger: {
          trigger: icon,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        scale: 0.5,
        rotation: -30,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)"
      });
    });
  
    // --- Анимация появления футера
    gsap.from("footer", {
      scrollTrigger: {
        trigger: "footer",
        start: "top 90%"
      },
      opacity: 0,
      y: 80,
      duration: 1.5,
      ease: "power2.out"
    });
  });
  
const text = "CAYENNE MULTIVAN TIGUAN TOUAREG AUDI SKODA";
        const marqueeContent = document.getElementById('marqueeContent');
        
        // Создаем несколько копий текста для плавной анимации
        for (let i = 0; i < 10; i++) {
            const span = document.createElement('span');
            span.className = 'marquee-item';
            span.textContent = text;
            marqueeContent.appendChild(span);
        }
        
        // Получаем ширину одного элемента
        const itemWidth = document.querySelector('.marquee-item').offsetWidth;
        
        // Анимация GSAP
        const tl = gsap.timeline({repeat: -1});
        
        tl.to(marqueeContent, {
            x: -itemWidth,
            duration: 15,
            ease: "none",
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % itemWidth)
            }
        });
        
        // Контроль скорости
        let speed = 1;
        


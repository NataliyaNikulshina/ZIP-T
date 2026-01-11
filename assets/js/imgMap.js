// document.addEventListener('DOMContentLoaded', function() {
//     const mapContainer = document.getElementById('imgContainer');
//     const draggableMap = document.getElementById('draggableMap');
    
//     let isDragging = false;
//     let startX, startY;
//     let scrollLeft = 0;
//     let scrollTop = 0;
    
//     // Рассчитываем границы
//     let minLeft, minTop, maxLeft, maxTop;
    
//     function calculateBounds() {
//       const containerWidth = mapContainer.clientWidth;
//       const containerHeight = mapContainer.clientHeight;
//       const mapWidth = draggableMap.offsetWidth;
//       const mapHeight = draggableMap.offsetHeight;
      
//       // Максимальные значения (начальная позиция)
//       maxLeft = 0;
//       maxTop = 0;
      
//       // Минимальные значения (край карты не должен выходить за контейнер)
//       minLeft = containerWidth - mapWidth;
//       minTop = containerHeight - mapHeight;
      
//       // Если карта меньше контейнера, центрируем её
//       if (mapWidth <= containerWidth) {
//         minLeft = maxLeft = (containerWidth - mapWidth) / 2;
//       }
      
//       if (mapHeight <= containerHeight) {
//         minTop = maxTop = (containerHeight - mapHeight) / 2;
//       }
//     }
    
//     // Пересчитываем границы при изменении размера окна
//     window.addEventListener('resize', calculateBounds);
//     calculateBounds(); // Инициализация
    
//     // Для мыши
//     mapContainer.addEventListener('mousedown', (e) => {
//       isDragging = true;
//       mapContainer.style.cursor = 'grabbing';
      
//       const rect = mapContainer.getBoundingClientRect();
//       startX = e.clientX - rect.left;
//       startY = e.clientY - rect.top;
      
//       scrollLeft = parseInt(getComputedStyle(draggableMap).left) || 0;
//       scrollTop = parseInt(getComputedStyle(draggableMap).top) || 0;
//     });
    
//     // Для касаний на мобильных
//     mapContainer.addEventListener('touchstart', (e) => {
//       isDragging = true;
//       const touch = e.touches[0];
//       const rect = mapContainer.getBoundingClientRect();
      
//       startX = touch.clientX - rect.left;
//       startY = touch.clientY - rect.top;
      
//       scrollLeft = parseInt(getComputedStyle(draggableMap).left) || 0;
//       scrollTop = parseInt(getComputedStyle(draggableMap).top) || 0;
//     });
    
//     document.addEventListener('mousemove', (e) => {
//       if (!isDragging) return;
      
//       const rect = mapContainer.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
      
//       const walkX = (x - startX) * 1.5;
//       const walkY = (y - startY) * 1.5;
      
//       // Ограничиваем движение границами
//       let newLeft = scrollLeft + walkX;
//       let newTop = scrollTop + walkY;
      
//       // Проверяем границы
//       newLeft = Math.min(maxLeft, Math.max(minLeft, newLeft));
//       newTop = Math.min(maxTop, Math.max(minTop, newTop));
      
//       draggableMap.style.left = newLeft + 'px';
//       draggableMap.style.top = newTop + 'px';
//     });
    
//     document.addEventListener('touchmove', (e) => {
//       if (!isDragging || !e.touches[0]) return;
      
//       const touch = e.touches[0];
//       const rect = mapContainer.getBoundingClientRect();
      
//       const x = touch.clientX - rect.left;
//       const y = touch.clientY - rect.top;
      
//       const walkX = (x - startX) * 1.5;
//       const walkY = (y - startY) * 1.5;
      
//       // Ограничиваем движение границами
//       let newLeft = scrollLeft + walkX;
//       let newTop = scrollTop + walkY;
      
//       // Проверяем границы
//       newLeft = Math.min(maxLeft, Math.max(minLeft, newLeft));
//       newTop = Math.min(maxTop, Math.max(minTop, newTop));
      
//       draggableMap.style.left = newLeft + 'px';
//       draggableMap.style.top = newTop + 'px';
//     });
    
//     document.addEventListener('mouseup', () => {
//       isDragging = false;
//       mapContainer.style.cursor = 'grab';
//     });
    
//     document.addEventListener('touchend', () => {
//       isDragging = false;
//     });
    
//     // Предотвращаем выделение и контекстное меню
//     mapContainer.addEventListener('contextmenu', (e) => e.preventDefault());
    
//     // CSS для предотвращения выделения
//     mapContainer.style.userSelect = 'none';
//     mapContainer.style.webkitUserSelect = 'none';
//   });

document.addEventListener('DOMContentLoaded', function() {
  const mapContainer = document.getElementById('imgContainer');
  const draggableMap = document.getElementById('draggableMap');
  
  let isDragging = false;
  let startX, startY;
  let scrollLeft = 0;
  let scrollTop = 0;
  
  // Переменные для зума
  let scale = 1;
  const minScale = 0.5;
  const maxScale = 4;
  const zoomStep = 0.2;
  
  // Рассчитываем границы
  let minLeft, minTop, maxLeft, maxTop;
  
  function calculateBounds() {
    const containerWidth = mapContainer.clientWidth;
    const containerHeight = mapContainer.clientHeight;
    const mapWidth = draggableMap.offsetWidth * scale;
    const mapHeight = draggableMap.offsetHeight * scale;
    
    // Максимальные значения (начальная позиция)
    maxLeft = 0;
    maxTop = 0;
    
    // Минимальные значения (край карты не должен выходить за контейнер)
    minLeft = containerWidth - mapWidth;
    minTop = containerHeight - mapHeight;
    
    // Если карта меньше контейнера, центрируем её
    if (mapWidth <= containerWidth) {
      minLeft = maxLeft = (containerWidth - mapWidth) / 2;
    }
    
    if (mapHeight <= containerHeight) {
      minTop = maxTop = (containerHeight - mapHeight) / 2;
    }
    
    // Обновляем границы с текущим zoom
    updateMapTransform();
  }
  
  // Обновление трансформации карты
  function updateMapTransform() {
    draggableMap.style.transform = `scale(${scale})`;
    
    // Ограничиваем позицию после изменения масштаба
    let currentLeft = parseInt(getComputedStyle(draggableMap).left) || 0;
    let currentTop = parseInt(getComputedStyle(draggableMap).top) || 0;
    
    currentLeft = Math.min(maxLeft, Math.max(minLeft, currentLeft));
    currentTop = Math.min(maxTop, Math.max(minTop, currentTop));
    
    draggableMap.style.left = currentLeft + 'px';
    draggableMap.style.top = currentTop + 'px';
    
    // Обновляем transform-origin для плавного зума
    draggableMap.style.transformOrigin = '0 0';
  }
  
  // Функция зума
  function zoom(newScale, clientX, clientY) {
    const oldScale = scale;
    scale = Math.min(maxScale, Math.max(minScale, newScale));
    
    if (oldScale === scale) return;
    
    // Рассчитываем позицию мыши относительно карты
    const rect = draggableMap.getBoundingClientRect();
    const containerRect = mapContainer.getBoundingClientRect();
    
    // Вычисляем относительные координаты
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;
    
    // Вычисляем смещение для сохранения точки под курсором
    const scaleRatio = scale / oldScale;
    
    // Текущая позиция карты
    let currentLeft = parseInt(getComputedStyle(draggableMap).left) || 0;
    let currentTop = parseInt(getComputedStyle(draggableMap).top) || 0;
    
    // Вычисляем новую позицию
    const newLeft = currentLeft - (mouseX * (scaleRatio - 1));
    const newTop = currentTop - (mouseY * (scaleRatio - 1));
    
    // Устанавливаем новую позицию
    draggableMap.style.left = newLeft + 'px';
    draggableMap.style.top = newTop + 'px';
    
    // Обновляем трансформацию и границы
    updateMapTransform();
    calculateBounds();
  }
  
  // Обработка колесика мыши
  mapContainer.addEventListener('wheel', function(e) {
    e.preventDefault();
    
    // Определяем направление зума
    const delta = e.deltaY > 0 ? -zoomStep : zoomStep;
    const newScale = scale + delta;
    
    // Выполняем зум
    zoom(newScale, e.clientX, e.clientY);
  });
  
  // Пересчитываем границы при изменении размера окна
  window.addEventListener('resize', calculateBounds);
  
  // Инициализация
  calculateBounds();
  
  // Для мыши
  mapContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    mapContainer.style.cursor = 'grabbing';
    
    const rect = mapContainer.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
    
    scrollLeft = parseInt(getComputedStyle(draggableMap).left) || 0;
    scrollTop = parseInt(getComputedStyle(draggableMap).top) || 0;
  });
  
  // Для касаний на мобильных (с поддержкой pinch zoom)
  let initialDistance = null;
  
  mapContainer.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      // Одиночное касание - перетаскивание
      isDragging = true;
      const touch = e.touches[0];
      const rect = mapContainer.getBoundingClientRect();
      
      startX = touch.clientX - rect.left;
      startY = touch.clientY - rect.top;
      
      scrollLeft = parseInt(getComputedStyle(draggableMap).left) || 0;
      scrollTop = parseInt(getComputedStyle(draggableMap).top) || 0;
    } else if (e.touches.length === 2) {
      // Два пальца - начало жеста зума
      isDragging = false;
      initialDistance = getDistance(e.touches[0], e.touches[1]);
    }
  });
  
  mapContainer.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2 && initialDistance !== null) {
      e.preventDefault();
      
      // Обработка pinch zoom
      const currentDistance = getDistance(e.touches[0], e.touches[1]);
      const scaleChange = currentDistance / initialDistance;
      const newScale = scale * scaleChange;
      
      // Вычисляем центр между двумя пальцами
      const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      
      // Выполняем зум
      zoom(newScale, centerX, centerY);
      
      initialDistance = currentDistance;
    } else if (isDragging && e.touches[0]) {
      // Обработка перетаскивания
      const touch = e.touches[0];
      const rect = mapContainer.getBoundingClientRect();
      
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      
      const walkX = (x - startX) * 1.5;
      const walkY = (y - startY) * 1.5;
      
      let newLeft = scrollLeft + walkX;
      let newTop = scrollTop + walkY;
      
      newLeft = Math.min(maxLeft, Math.max(minLeft, newLeft));
      newTop = Math.min(maxTop, Math.max(minTop, newTop));
      
      draggableMap.style.left = newLeft + 'px';
      draggableMap.style.top = newTop + 'px';
    }
  });
  
  mapContainer.addEventListener('touchend', (e) => {
    if (e.touches.length < 2) {
      initialDistance = null;
    }
    if (e.touches.length === 0) {
      isDragging = false;
    }
  });
  
  // Вспомогательная функция для вычисления расстояния между двумя точками
  function getDistance(touch1, touch2) {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  // Обработчики для мыши остаются прежними
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const rect = mapContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const walkX = (x - startX) * 1.5;
    const walkY = (y - startY) * 1.5;
    
    let newLeft = scrollLeft + walkX;
    let newTop = scrollTop + walkY;
    
    newLeft = Math.min(maxLeft, Math.max(minLeft, newLeft));
    newTop = Math.min(maxTop, Math.max(minTop, newTop));
    
    draggableMap.style.left = newLeft + 'px';
    draggableMap.style.top = newTop + 'px';
  });
  
  document.addEventListener('mouseup', () => {
    isDragging = false;
    mapContainer.style.cursor = 'grab';
  });
  
  // Кнопки для зума (опционально, можно добавить в HTML)
  function addZoomButtons() {
    const zoomInBtn = document.createElement('button');
    zoomInBtn.innerHTML = '+';
    zoomInBtn.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      width: 40px;
      height: 40px;
      font-size: 20px;
      z-index: 100;
      background: white;
      border: 1px solid #ccc;
      border-radius: 4px;
      cursor: pointer;
    `;
    
    const zoomOutBtn = document.createElement('button');
    zoomOutBtn.innerHTML = '-';
    zoomOutBtn.style.cssText = `
      position: absolute;
      top: 70px;
      right: 20px;
      width: 40px;
      height: 40px;
      font-size: 20px;
      z-index: 100;
      background: white;
      border: 1px solid #ccc;
      border-radius: 4px;
      cursor: pointer;
    `;
    
    zoomInBtn.addEventListener('click', () => {
      zoom(scale + zoomStep, 
            mapContainer.clientWidth / 2, 
            mapContainer.clientHeight / 2);
    });
    
    zoomOutBtn.addEventListener('click', () => {
      zoom(scale - zoomStep, 
            mapContainer.clientWidth / 2, 
            mapContainer.clientHeight / 2);
    });
    
    mapContainer.parentElement.style.position = 'relative';
    mapContainer.parentElement.appendChild(zoomInBtn);
    mapContainer.parentElement.appendChild(zoomOutBtn);
  }
  
  // Добавляем кнопки (если нужно)
  // addZoomButtons();
  
  // Предотвращаем выделение и контекстное меню
  mapContainer.addEventListener('contextmenu', (e) => e.preventDefault());
  
  // CSS для предотвращения выделения
  mapContainer.style.userSelect = 'none';
  mapContainer.style.webkitUserSelect = 'none';
  
  // Инициализируем курсор
  mapContainer.style.cursor = 'grab';
});
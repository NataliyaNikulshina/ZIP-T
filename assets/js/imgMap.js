document.addEventListener('DOMContentLoaded', function() {
    const mapContainer = document.getElementById('imgContainer');
    const draggableMap = document.getElementById('draggableMap');
    
    let isDragging = false;
    let startX, startY;
    let scrollLeft = 0;
    let scrollTop = 0;
    
    // Рассчитываем границы
    let minLeft, minTop, maxLeft, maxTop;
    
    function calculateBounds() {
      const containerWidth = mapContainer.clientWidth;
      const containerHeight = mapContainer.clientHeight;
      const mapWidth = draggableMap.offsetWidth;
      const mapHeight = draggableMap.offsetHeight;
      
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
    }
    
    // Пересчитываем границы при изменении размера окна
    window.addEventListener('resize', calculateBounds);
    calculateBounds(); // Инициализация
    
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
    
    // Для касаний на мобильных
    mapContainer.addEventListener('touchstart', (e) => {
      isDragging = true;
      const touch = e.touches[0];
      const rect = mapContainer.getBoundingClientRect();
      
      startX = touch.clientX - rect.left;
      startY = touch.clientY - rect.top;
      
      scrollLeft = parseInt(getComputedStyle(draggableMap).left) || 0;
      scrollTop = parseInt(getComputedStyle(draggableMap).top) || 0;
    });
    
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      
      const rect = mapContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const walkX = (x - startX) * 1.5;
      const walkY = (y - startY) * 1.5;
      
      // Ограничиваем движение границами
      let newLeft = scrollLeft + walkX;
      let newTop = scrollTop + walkY;
      
      // Проверяем границы
      newLeft = Math.min(maxLeft, Math.max(minLeft, newLeft));
      newTop = Math.min(maxTop, Math.max(minTop, newTop));
      
      draggableMap.style.left = newLeft + 'px';
      draggableMap.style.top = newTop + 'px';
    });
    
    document.addEventListener('touchmove', (e) => {
      if (!isDragging || !e.touches[0]) return;
      
      const touch = e.touches[0];
      const rect = mapContainer.getBoundingClientRect();
      
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      
      const walkX = (x - startX) * 1.5;
      const walkY = (y - startY) * 1.5;
      
      // Ограничиваем движение границами
      let newLeft = scrollLeft + walkX;
      let newTop = scrollTop + walkY;
      
      // Проверяем границы
      newLeft = Math.min(maxLeft, Math.max(minLeft, newLeft));
      newTop = Math.min(maxTop, Math.max(minTop, newTop));
      
      draggableMap.style.left = newLeft + 'px';
      draggableMap.style.top = newTop + 'px';
    });
    
    document.addEventListener('mouseup', () => {
      isDragging = false;
      mapContainer.style.cursor = 'grab';
    });
    
    document.addEventListener('touchend', () => {
      isDragging = false;
    });
    
    // Предотвращаем выделение и контекстное меню
    mapContainer.addEventListener('contextmenu', (e) => e.preventDefault());
    
    // CSS для предотвращения выделения
    mapContainer.style.userSelect = 'none';
    mapContainer.style.webkitUserSelect = 'none';
  });
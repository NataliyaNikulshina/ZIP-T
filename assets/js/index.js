let x = 1, y = 1; // Центр
const grid = document.querySelector('.grid');

function updateView() {
  grid.style.transform = `translate(${-x * 100}vw, ${-y * 100}vh)`;
}

// Проверка: можно ли двигаться (только центр + 4 направления)
function isValid(nx, ny) {
  return (nx === 1 && ny === 1) || // центр
         (nx === 1 && (ny === 0 || ny === 2)) || // вверх и вниз
         (ny === 1 && (nx === 0 || nx === 2));   // влево и вправо
}

// Стрелки
document.addEventListener('keydown', (e) => {
  let nx = x, ny = y;
  if (e.key === 'ArrowLeft') nx--;
  if (e.key === 'ArrowRight') nx++;
  if (e.key === 'ArrowUp') ny--;
  if (e.key === 'ArrowDown') ny++;

  if (isValid(nx, ny)) {
    x = nx;
    y = ny;
    updateView();
  }
});

// Наведение мыши на край
let mouseCooldown = false;
function freezeMouseMove() {
  mouseCooldown = true;
  setTimeout(() => mouseCooldown = false, 1000);
}

document.addEventListener('mousemove', (e) => {
  if (mouseCooldown) return;

  const threshold = 30;
  const w = window.innerWidth;
  const h = window.innerHeight;

  let nx = x, ny = y;

  if (e.clientX < threshold) nx--;
  else if (e.clientX > w - threshold) nx++;
  else if (e.clientY < threshold) ny--;
  else if (e.clientY > h - threshold) ny++;

  if ((nx !== x || ny !== y) && isValid(nx, ny)) {
    x = nx;
    y = ny;
    updateView();
    freezeMouseMove();
  }
});


// Карта соответствия id экрана и координат
const screenMap = {
  center: { x: 1, y: 1 },
  top:    { x: 1, y: 0 },
  bottom: { x: 1, y: 2 },
  left:   { x: 0, y: 1 },
  right:  { x: 2, y: 1 }
};

// Переход по ссылкам меню
document.querySelectorAll('.js-menu-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const target = screenMap[targetId];
    if (target) {
      x = target.x;
      y = target.y;
      updateView();
    }
  });
});

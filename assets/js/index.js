let x = 1; // колонки: 0 (лево), 1 (центр), 2 (право)
let y = 1; // строки:   0 (верх), 1 (центр), 2 (низ)

const grid = document.querySelector('.grid');

function updateView() {
  grid.style.transform = `translate(${-x * 100}vw, ${-y * 100}vh)`;
}

// Стрелки клавиатуры
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft'  && x > 0) x--;
  if (e.key === 'ArrowRight' && x < 2) x++;
  if (e.key === 'ArrowUp'    && y > 0) y--;
  if (e.key === 'ArrowDown'  && y < 2) y++;
  updateView();
});

// Наведение мышки к краям
document.addEventListener('mousemove', (e) => {
  const threshold = 30; // чувствительность краёв
  const w = window.innerWidth;
  const h = window.innerHeight;

  if (e.clientX < threshold && x > 0) {
    x--;
    updateView();
    freezeMouseMove();
  } else if (e.clientX > w - threshold && x < 2) {
    x++;
    updateView();
    freezeMouseMove();
  } else if (e.clientY < threshold && y > 0) {
    y--;
    updateView();
    freezeMouseMove();
  } else if (e.clientY > h - threshold && y < 2) {
    y++;
    updateView();
    freezeMouseMove();
  }
});

// защита от частого срабатывания при наведении
let freeze = false;
function freezeMouseMove() {
  freeze = true;
  document.removeEventListener('mousemove', onMouseMove);
  setTimeout(() => {
    freeze = false;
    document.addEventListener('mousemove', onMouseMove);
  }, 800);
}

function onMouseMove(e) {
  if (!freeze) document.dispatchEvent(new MouseEvent('mousemove', e));
}
document.addEventListener('mousemove', onMouseMove);

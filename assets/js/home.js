let x = 1; // начальная колонка
let y = 1; // начальная строка

const grid = document.querySelector('.grid');

function updateView() {
    grid.style.transform = `translate(${-x * 100}vw, ${-y * 100}vh)`;
  }

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && x > 0) x--;
    if (e.key === 'ArrowRight' && x < 1) x++;
    if (e.key === 'ArrowUp' && y > 0) y--;
    if (e.key === 'ArrowDown' && y < 1) y++;
    updateView();
  });

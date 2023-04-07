const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;
stopBtn.disabled = true;

startBtn.addEventListener('click', () => {
  //коли нажмаєм то виключаєм кнопку
  startBtn.disabled = true;
  stopBtn.disabled = false;

  timerId = setInterval(() => {
    //достукуємось до body і в інтервалі функцією міняємо йому кольори
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  //коли нажимаєм то включаєм кнопку назад
  startBtn.disabled = false;

  //виключаєм інтервал
  clearInterval(timerId);
});

//рандом кольори
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

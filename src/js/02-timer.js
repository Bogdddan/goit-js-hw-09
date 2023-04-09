import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');
const startBtn = document.querySelector('[data-start]');

let intervalId;

// При завантаженні сторінки відкрийте календар і дозвольте вибрати будь-яку дату у майбутньому
const datetimePicker = flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  }
});

function startTimer() {
  const selectedDate = datetimePicker.selectedDates[0];
  if (!selectedDate) {
    Notiflix.Notify.warning('Please select a future date');
    return;
  }
  // Зупиніть існуючий таймер, якщо він існує, щоб не виникало проблем з множинними таймерами, які працюють одночасно
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    const diffMs = selectedDate - new Date();
    if (diffMs <= 0) {
      clearInterval(intervalId);
      daysSpan.textContent = "00";
      hoursSpan.textContent = "00";
      minutesSpan.textContent = "00";
      secondsSpan.textContent = "00";
      startBtn.disabled = true;
    } else {
      const { days, hours, minutes, seconds } = convertMs(diffMs);
      daysSpan.textContent = days;
      hoursSpan.textContent = hours;
      minutesSpan.textContent = minutes;
      secondsSpan.textContent = seconds;
    }
  }, 1000);
}

startBtn.addEventListener("click", startTimer);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Calculate the number of days, hours, minutes, and seconds
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((ms % hour) / minute)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((ms % minute) / second)
    .toString()
    .padStart(2, "0");

  return { days , hours , minutes , seconds }
}

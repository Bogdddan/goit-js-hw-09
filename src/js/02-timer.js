// встановлюємо дату за замовчуванням
const countDownDate = new Date().getTime();

// відображаємо календар на сторінці
flatpickr("#calendar", {
  dateFormat: "Y-m-d",
  minDate: "today",
  onChange: function(selectedDates, dateStr) {

    // отримуємо дату, яку вибрали на календарі
    countDownDate = selectedDates[0].getTime();

    // оновлюємо таймер кожну секунду
    const x = setInterval(function() {

      // отримуємо поточну дату та час
      const now = new Date().getTime();

      // знаходимо різницю між поточним часом та датою, до якої ми відлікуємо
      const distance = countDownDate - now;

      // обраховуємо час в днях, годинах, хвилинах та секундах
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // виводимо результат в елемент з id="timer"
      document.getElementById("timer").innerHTML = days + " днів " + hours + " годин " + minutes + " хвилин " + seconds + " секунд ";

      // якщо час відліку закінчився, виводимо повідомлення
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "Час відліку закінчився!";
      }
    }, 1000);

  }
});

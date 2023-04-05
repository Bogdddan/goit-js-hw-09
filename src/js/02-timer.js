// встановлюємо дату за замовчуванням
var countDownDate = new Date().getTime();

// відображаємо календар на сторінці
flatpickr("#calendar", {
  dateFormat: "Y-m-d",
  minDate: "today",
  onChange: function(selectedDates, dateStr) {

    // отримуємо дату, яку вибрали на календарі
    countDownDate = selectedDates[0].getTime();

    // оновлюємо таймер кожну секунду
    var x = setInterval(function() {

      // отримуємо поточну дату та час
      var now = new Date().getTime();

      // знаходимо різницю між поточним часом та датою, до якої ми відлікуємо
      var distance = countDownDate - now;

      // обраховуємо час в днях, годинах, хвилинах та секундах
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

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

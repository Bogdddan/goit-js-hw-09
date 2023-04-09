import Notiflix from 'notiflix';


const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const delay = Number(event.target.elements.delay.value);
  const step = Number(event.target.elements.step.value);
  const amount = Number(event.target.elements.amount.value);

  const promises = Array.from({ length: amount }, (_, i) => {
    const position = i + 1;
    const promiseDelay = delay + i * step;
    return createPromise(position, promiseDelay);
  });

  Promise.all(promises)
    .then((results) => {
      Notiflix.Notify.info('All promises fulfilled:', results);
    })
    .catch((error) => {
      Notiflix.Notify.info('At least one promise rejected:', error);
    });
});
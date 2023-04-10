import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay, step) {
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
    const promise = createPromise(position, delay + i * step, step);
    promise
      .then((result) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${result.position} in ${result.delay}ms`);
      })
      .catch((error) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${error.position} in ${error.delay}ms`);
      });
    return promise;
  });

  Promise.all(promises)
    .then(() => {
      return promises;
    })
    .catch(() => {
      return promises;
    });
});

; (function () {

  const key = 'IMG';
  /** @type {HTMLInputElement} */
  const file = document.querySelector('#file');
  /** @type {HTMLImageElement} */
  const img = document.querySelector('#img');
  if (localStorage.getItem(key)) {
    img.src = localStorage.getItem(key);
  }
  document.body.addEventListener('dblclick', () => {
    file.click();
  });
  file.addEventListener('input', () => {
    const upload = file.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      localStorage.setItem(key, reader.result);
      img.src = reader.result;
    });
    reader.readAsDataURL(upload);
    file.value = '';
  });
  document.body.addEventListener('touchmove', event => {
    event.preventDefault();
  }, { passive: false, capture: false });

  navigator.serviceWorker.register('./sw.js');
}());
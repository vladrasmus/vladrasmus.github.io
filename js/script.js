document.addEventListener('DOMContentLoaded', function(e) {
  let itemActualHeight = document.querySelector('.gallery__item').offsetWidth;
  let allItems = document.querySelectorAll('.gallery__item');

  console.log(itemActualHeight);

  allItems.forEach(function(element) {
    element.style.height = `${itemActualHeight}px`;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const prevButtons = document.querySelectorAll('.arrow.prev');
  const nextButtons = document.querySelectorAll('.arrow.next');
  const carousels = document.querySelectorAll('.carousel');

  function moveCarousel(carousel, direction) {
      const content = carousel.querySelector('.carousel-content');
      
      if (direction === 'next') {
          // Mover el primer elemento al final
          content.appendChild(content.firstElementChild);
          content.style.transform = "translateX(0)"; // Mantiene la posición sin transición
      } else if (direction === 'prev') {
          // Mover el último elemento al inicio
          content.insertBefore(content.lastElementChild, content.firstElementChild);
          content.style.transform = "translateX(0)"; // Mantiene la posición sin transición
      }
  }

  nextButtons.forEach(button => {
      button.addEventListener('click', function () {
          const carousel = this.closest('.carousel');
          moveCarousel(carousel, 'next');
      });
  });

  prevButtons.forEach(button => {
      button.addEventListener('click', function () {
          const carousel = this.closest('.carousel');
          moveCarousel(carousel, 'prev');
      });
  });
});
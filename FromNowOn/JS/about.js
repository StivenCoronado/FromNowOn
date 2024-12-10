document.addEventListener("DOMContentLoaded", function () {
    const prevButtons = document.querySelectorAll('.arrow.prev');
    const nextButtons = document.querySelectorAll('.arrow.next');
    const carousels = document.querySelectorAll('.carousel');
  
    // Función para mover el contenido del carrusel
    function moveCarousel(carousel, direction) {
      const content = carousel.querySelector('.carousel-content');
      const width = carousel.clientWidth; // Ancho del carrusel visible
      const totalWidth = content.scrollWidth; // Ancho total del contenido del carrusel
      const currentPosition = content.getBoundingClientRect().left;
  
      // Desplazamiento rápido (más de una imagen por clic)
      let newPosition = currentPosition + (direction === 'next' ? -width : width);
  
      // Si llegamos al final o al inicio, volvemos al otro lado (loop infinito)
      if (newPosition <= -(totalWidth - width)) {
        // Inmediatamente, volve a la primera imagen (sin transición visible)
        newPosition = 0;
        // Reemplazar las imágenes (duplica el contenido a la derecha)
        setTimeout(() => {
          content.style.transition = 'none'; // Desactivar la transición para un cambio inmediato
          content.style.transform = `translateX(${newPosition}px)`; // Volver al inicio
          // Añadir la primera parte del contenido al final
          content.appendChild(content.firstElementChild);
          content.style.transition = 'transform 0.2s ease'; // Volver a habilitar la transición
        }, 0); // Cambiar inmediatamente (sin retraso)
  
      } else if (newPosition > 0) {
        // Inmediatamente, volve al final del contenido (sin transición visible)
        newPosition = -(totalWidth - width);
        // Reemplazar las imágenes (duplica el contenido a la izquierda)
        setTimeout(() => {
          content.style.transition = 'none'; // Desactivar la transición para un cambio inmediato
          content.style.transform = `translateX(${newPosition}px)`; // Volver al final
          // Añadir la última parte del contenido al inicio
          content.insertBefore(content.lastElementChild, content.firstElementChild);
          content.style.transition = 'transform 0.2s ease'; // Volver a habilitar la transición
        }, 0); // Cambiar inmediatamente (sin retraso)
      }
  
      // Aplicar la transformación de desplazamiento
      content.style.transform = `translateX(${newPosition}px)`;
    }
  
    // Añadir eventos a las flechas de "next"
    nextButtons.forEach(button => {
      button.addEventListener('click', function () {
        const carousel = this.closest('.carousel');
        moveCarousel(carousel, 'next');
      });
    });
  
    // Añadir eventos a las flechas de "prev"
    prevButtons.forEach(button => {
      button.addEventListener('click', function () {
        const carousel = this.closest('.carousel');
        moveCarousel(carousel, 'prev');
      });
    });
  });
  


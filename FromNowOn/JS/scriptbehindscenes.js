// Variables para el control de la rotación
let targetRotationX = 0;
let targetRotationY = 0;
let currentRotationX = 0;
let currentRotationY = 0;

// Rango máximo de rotación en los ejes X e Y (en radianes)
const maxRotationX = Math.PI / 4; // Máximo 45° hacia arriba/abajo
const maxRotationY = Math.PI / 4; // Máximo 45° hacia los lados

// Selección de la rotación del grupo (puedes usar el contenedor de tus imágenes o el body)
const group = document.querySelector('.banner');

// Función para detectar el movimiento del mouse
document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX / window.innerWidth - 0.5;  // Normaliza la posición X
    const mouseY = event.clientY / window.innerHeight - 0.5; // Normaliza la posición Y

    // Calcula la rotación deseada en función de la posición del mouse, limitando los valores
    targetRotationX = Math.min(Math.max(mouseY * maxRotationX, -maxRotationX), maxRotationX);
    targetRotationY = Math.min(Math.max(mouseX * maxRotationY, -maxRotationY), maxRotationY);

    // Cambiar la opacidad y el brillo de las imágenes
    const images = document.querySelectorAll('.banner .slider .item img');
    images.forEach(img => {
        img.classList.remove('highlight');  // Quitar la clase de resaltar
        const rect = img.getBoundingClientRect();
        if (event.clientX >= rect.left && event.clientX <= rect.right &&
            event.clientY >= rect.top && event.clientY <= rect.bottom) {
            img.classList.add('highlight'); // Agregar la clase para resaltar la imagen
        }
    });
});

// Función para actualizar la rotación suavemente
function updateRotation() {
    // Interpolación suave para hacer el movimiento más fluido
    currentRotationX += (targetRotationX - currentRotationX) * 0.05;
    currentRotationY += (targetRotationY - currentRotationY) * 0.05;

    // Aplica la rotación a tu grupo
    group.style.transform = `rotateX(${currentRotationX}rad) rotateY(${currentRotationY}rad)`;

    // Llama la función recursivamente para actualizar la animación
    requestAnimationFrame(updateRotation);
}

// Inicia la actualización de la rotación
updateRotation();
// Obtener las imágenes que son clickeables
const images = document.querySelectorAll('.clickable-image');

// Obtener el modal y los elementos relacionados
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');

// Añadir un event listener para cada imagen clickeable
images.forEach(image => {
    image.addEventListener('click', () => {
        // Mostrar el modal
        modal.style.display = 'flex';
        // Establecer la imagen en el modal
        modalImage.src = image.src;
    });
});

// Añadir un event listener para cerrar el modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});
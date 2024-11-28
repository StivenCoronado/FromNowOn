<<<<<<< HEAD
let nextBtn = document.querySelector('.next');
let prevBtn = document.querySelector('.prev');

let slider = document.querySelector('.slider');
let sliderList = slider.querySelector('.slider .list');
let thumbnail = document.querySelector('.slider .thumbnail');
let thumbnailItems = thumbnail.querySelectorAll('.item');
let overlay = document.querySelector('.overlay');
let fullscreenImage = document.getElementById('fullscreenImage');
let overlayDescription1 = document.getElementById('description1');
let overlayDescription2 = document.getElementById('description2');

thumbnail.appendChild(thumbnailItems[0]);

function moveSlider(direction) {
    let sliderItems = sliderList.querySelectorAll('.item');
    let thumbnailItems = document.querySelectorAll('.thumbnail .item');
    
    if (direction === 'next') {
        sliderList.appendChild(sliderItems[0]);
        thumbnail.appendChild(thumbnailItems[0]);
        slider.classList.add('next');
    } else {
        sliderList.prepend(sliderItems[sliderItems.length - 1]);
        thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
        slider.classList.add('prev');
    }

    slider.addEventListener('animationend', function() {
        if (direction === 'next') {
            slider.classList.remove('next');
        } else {
            slider.classList.remove('prev');
        }
    }, { once: true });
}

let isScrolling = false;

window.addEventListener('wheel', (event) => {
    if (!isScrolling) {
        isScrolling = true;
        if (event.deltaY > 0) {
            moveSlider('next'); 
        } else {
            moveSlider('prev'); 
        }
        setTimeout(() => {
            isScrolling = false; 
        }, 600); 
    }
});

thumbnailItems.forEach(item => {
    item.addEventListener('click', () => {
        const mediaElement = item.querySelector('img, video'); // Selecciona tanto img como video
        const mediaSrc = mediaElement.src; // Obtiene la fuente del medio

        // Cambia aquí para obtener las descripciones correctas
        const imgDescription1 = mediaElement.getAttribute('data-descripcionImagen1') || mediaElement.getAttribute('data-descripcionVideo1');
        const imgDescription2 = mediaElement.getAttribute('data-descripcionImagen2') || mediaElement.getAttribute('data-descripcionVideo2');

        // Limpia la superposición antes de agregar nuevo contenido
        fullscreenImage.src = ''; // Limpia la fuente de la imagen
        fullscreenImage.style.display = 'none'; // Oculta la imagen
        const existingVideo = overlay.querySelector('video'); // Verifica si ya hay un video en la superposición
        if (existingVideo) {
            existingVideo.remove(); // Elimina el video existente
        }

        // Verifica si es un video o una imagen
        if (mediaElement.tagName.toLowerCase() === 'video') {
            const videoOverlay = document.createElement('video');
            videoOverlay.src = mediaSrc;
            videoOverlay.controls = true;
            videoOverlay.style.maxWidth = '90%';
            videoOverlay.style.maxHeight = '90%';
            overlay.appendChild(videoOverlay);
            videoOverlay.play();
        
            // Asegúrate de que la descripción esté correctamente posicionada
            overlayDescription1.innerHTML = imgDescription1; 
            overlayDescription2.innerHTML = imgDescription2; 
            fullscreenImage.style.display = 'none'; // Oculta la imagen
        } else {
            fullscreenImage.src = mediaSrc;
            fullscreenImage.style.display = 'block';
            
            // Asegúrate de que la descripción esté correctamente posicionada
            overlayDescription1.innerHTML = imgDescription1; 
            overlayDescription2.innerHTML = imgDescription2; 
        }

        overlay.style.display = 'flex'; // Muestra la superposición
    });
});

overlay.addEventListener('click', () => {
    overlay.style.display = 'none'; 
    const existingVideo = overlay.querySelector('video'); // Verifica si hay un video
    if (existingVideo) {
        existingVideo.pause(); // Pausa el video
        existingVideo.remove(); // Elimina el video al cerrar la superposición
    }
});

document.querySelector('.close-button').addEventListener('click', () => {
    overlay.style.display = 'none'; 
    const existingVideo = overlay.querySelector('video'); // Verifica si hay un video
    if (existingVideo) {
        existingVideo.pause(); // Pausa el video
        existingVideo.remove(); // Elimina el video al cerrar la superposición
    }
});


/* 
setInterval(() => {
    moveSlider('next');
}, 4000); */

document.addEventListener("DOMContentLoaded", () => {
    const audioSrc = sessionStorage.getItem("selectedAudio");
    const isPlaying = sessionStorage.getItem("isPlaying") === "true"; 

    let audio;

    if (audioSrc) {
        audio = new Audio(audioSrc);
        audio.loop = true; 

        if (isPlaying) {
            document.body.addEventListener("click", () => {
                audio.play().catch((error) => {
                    console.warn("Error al reproducir el audio:", error);
                });
            }, { once: true });
        }
    }

    // Crear botón para mute/desmute
    const muteButton = document.createElement("button");
    muteButton.textContent = "🔊";
    muteButton.style.position = "fixed";
    muteButton.style.top = "10px";
    muteButton.style.right = "10px";
    muteButton.style.padding = "10px";
    muteButton.style.backgroundColor = "white";
    muteButton.style.color = "black";
    muteButton.style.border = "1px solid black";
    muteButton.style.borderRadius = "5px";
    muteButton.style.cursor = "pointer";
    muteButton.style.zIndex = "9999";
    document.body.appendChild(muteButton);

    muteButton.addEventListener("click", () => {
        if (audio) {
            audio.muted = !audio.muted;
            muteButton.textContent = audio.muted ? "🔇" : "🔊";
        }
    });

    // Guarda el estado del audio antes de salir
    window.addEventListener("beforeunload", () => {
        if (audio && !audio.paused) {
            sessionStorage.setItem("isPlaying", "true");
        } else {
            sessionStorage.setItem("isPlaying", "false");
        }
    });
});

// Función para aplicar animaciones al video
function animateMedia(mediaElement) {
    mediaElement.classList.add('animate'); // Agrega la clase de animación
    setTimeout(() => {
        mediaElement.classList.remove('animate'); // Elimina la clase de animación después de un tiempo
    }, 600); // Duración de la animación
}

// Modificar la lógica de clic en los thumbnails para incluir animación
thumbnailItems.forEach(item => {
    item.addEventListener('click', () => {
        const mediaElement = item.querySelector('img, video'); // Selecciona tanto img como video
        const mediaSrc = mediaElement.src; // Obtiene la fuente del medio
        const imgDescription1 = mediaElement.getAttribute('data-description');
        const imgDescription2 = mediaElement.getAttribute('data-description2');

        // Limpia la superposición antes de agregar nuevo contenido
        fullscreenImage.src = ''; // Limpia la fuente de la imagen
        fullscreenImage.style.display = 'none'; // Oculta la imagen
        const existingVideo = overlay.querySelector('video'); // Verifica si ya hay un video en la superposición
        if (existingVideo) {
            existingVideo.remove(); // Elimina el video existente
        }

        // Verifica si es un video o una imagen
        if (mediaElement.tagName.toLowerCase() === 'video') {
            const videoOverlay = document.createElement('video'); // Crea un elemento de video
 videoOverlay.src = mediaSrc; // Asigna la fuente del video
            videoOverlay.controls = true; // Agrega controles al video
            videoOverlay.style.maxWidth = '90%'; // Ajusta el tamaño del video
            videoOverlay.style.maxHeight = '90%'; // Ajusta el tamaño del video
            overlay.appendChild(videoOverlay); // Agrega el video a la superposición
            videoOverlay.play(); // Reproduce el video
            animateMedia(videoOverlay); // Aplica la animación al video
        } else {
            fullscreenImage.src = mediaSrc; // Asigna la fuente de la imagen
            fullscreenImage.style.display = 'block'; // Muestra la imagen
            animateMedia(fullscreenImage); // Aplica la animación a la imagen
        }

        overlayDescription1.innerHTML = imgDescription1;
        overlayDescription2.innerHTML = imgDescription2;
        overlay.style.display = 'flex'; // Muestra la superposición
    });
});

// Agregar estilos de animación en CSS
const style = document.createElement('style');
style.innerHTML = `
    .animate {
        animation: scaleAnimation 0.6s ease-in-out;
    }

    @keyframes scaleAnimation {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
`;
=======
let nextBtn = document.querySelector('.next');
let prevBtn = document.querySelector('.prev');

let slider = document.querySelector('.slider');
let sliderList = slider.querySelector('.slider .list');
let thumbnail = document.querySelector('.slider .thumbnail');
let thumbnailItems = thumbnail.querySelectorAll('.item');
let overlay = document.querySelector('.overlay');
let fullscreenImage = document.getElementById('fullscreenImage');
let overlayDescription1 = document.getElementById('description1');
let overlayDescription2 = document.getElementById('description2');

thumbnail.appendChild(thumbnailItems[0]);

function moveSlider(direction) {
    let sliderItems = sliderList.querySelectorAll('.item');
    let thumbnailItems = document.querySelectorAll('.thumbnail .item');
    
    if (direction === 'next') {
        sliderList.appendChild(sliderItems[0]);
        thumbnail.appendChild(thumbnailItems[0]);
        slider.classList.add('next');
    } else {
        sliderList.prepend(sliderItems[sliderItems.length - 1]);
        thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
        slider.classList.add('prev');
    }

    slider.addEventListener('animationend', function() {
        if (direction === 'next') {
            slider.classList.remove('next');
        } else {
            slider.classList.remove('prev');
        }
    }, { once: true });
}

let isScrolling = false;

window.addEventListener('wheel', (event) => {
    if (!isScrolling) {
        isScrolling = true;
        if (event.deltaY > 0) {
            moveSlider('next'); 
        } else {
            moveSlider('prev'); 
        }
        setTimeout(() => {
            isScrolling = false; 
        }, 600); 
    }
});

thumbnailItems.forEach(item => {
    item.addEventListener('click', () => {
        const mediaElement = item.querySelector('img, video'); // Selecciona tanto img como video
        const mediaSrc = mediaElement.src; // Obtiene la fuente del medio

        // Cambia aquí para obtener las descripciones correctas
        const imgDescription1 = mediaElement.getAttribute('data-descripcionImagen1') || mediaElement.getAttribute('data-descripcionVideo1');
        const imgDescription2 = mediaElement.getAttribute('data-descripcionImagen2') || mediaElement.getAttribute('data-descripcionVideo2');

        // Limpia la superposición antes de agregar nuevo contenido
        fullscreenImage.src = ''; // Limpia la fuente de la imagen
        fullscreenImage.style.display = 'none'; // Oculta la imagen
        const existingVideo = overlay.querySelector('video'); // Verifica si ya hay un video en la superposición
        if (existingVideo) {
            existingVideo.remove(); // Elimina el video existente
        }

        // Verifica si es un video o una imagen
        if (mediaElement.tagName.toLowerCase() === 'video') {
            const videoOverlay = document.createElement('video');
            videoOverlay.src = mediaSrc;
            videoOverlay.controls = true;
            videoOverlay.style.maxWidth = '90%';
            videoOverlay.style.maxHeight = '90%';
            overlay.appendChild(videoOverlay);
            videoOverlay.play();
        
            // Asegúrate de que la descripción esté correctamente posicionada
            overlayDescription1.innerHTML = imgDescription1; 
            overlayDescription2.innerHTML = imgDescription2; 
            fullscreenImage.style.display = 'none'; // Oculta la imagen
        } else {
            fullscreenImage.src = mediaSrc;
            fullscreenImage.style.display = 'block';
            
            // Asegúrate de que la descripción esté correctamente posicionada
            overlayDescription1.innerHTML = imgDescription1; 
            overlayDescription2.innerHTML = imgDescription2; 
        }

        overlay.style.display = 'flex'; // Muestra la superposición
    });
});



overlay.addEventListener('click', () => {
    overlay.style.display = 'none'; 
    const existingVideo = overlay.querySelector('video'); // Verifica si hay un video
    if (existingVideo) {
        existingVideo.pause(); // Pausa el video
        existingVideo.remove(); // Elimina el video al cerrar la superposición
    }
});

document.querySelector('.close-button').addEventListener('click', () => {
    overlay.style.display = 'none'; 
    const existingVideo = overlay.querySelector('video'); // Verifica si hay un video
    if (existingVideo) {
        existingVideo.pause(); // Pausa el video
        existingVideo.remove(); // Elimina el video al cerrar la superposición
    }
});


/* 
setInterval(() => {
    moveSlider('next');
}, 4000); */

document.addEventListener("DOMContentLoaded", () => {
    const audioSrc = sessionStorage.getItem("selectedAudio");
    const isPlaying = sessionStorage.getItem("isPlaying") === "true"; 

    let audio;

    if (audioSrc) {
        audio = new Audio(audioSrc);
        audio.loop = true; 

        if (isPlaying) {
            document.body.addEventListener("click", () => {
                audio.play().catch((error) => {
                    console.warn("Error al reproducir el audio:", error);
                });
            }, { once: true });
        }
    }

    // Crear botón para mute/desmute
    const muteButton = document.createElement("button");
    muteButton.textContent = "🔊";
    muteButton.style.position = "fixed";
    muteButton.style.top = "10px";
    muteButton.style.right = "10px";
    muteButton.style.padding = "10px";
    muteButton.style.backgroundColor = "white";
    muteButton.style.color = "black";
    muteButton.style.border = "1px solid black";
    muteButton.style.borderRadius = "5px";
    muteButton.style.cursor = "pointer";
    muteButton.style.zIndex = "9999";
    document.body.appendChild(muteButton);

    muteButton.addEventListener("click", () => {
        if (audio) {
            audio.muted = !audio.muted;
            muteButton.textContent = audio.muted ? "🔇" : "🔊";
        }
    });

    // Guarda el estado del audio antes de salir
    window.addEventListener("beforeunload", () => {
        if (audio && !audio.paused) {
            sessionStorage.setItem("isPlaying", "true");
        } else {
            sessionStorage.setItem("isPlaying", "false");
        }
    });
});

// Función para aplicar animaciones al video
function animateMedia(mediaElement) {
    mediaElement.classList.add('animate'); // Agrega la clase de animación
    setTimeout(() => {
        mediaElement.classList.remove('animate'); // Elimina la clase de animación después de un tiempo
    }, 600); // Duración de la animación
}

// Modificar la lógica de clic en los thumbnails para incluir animación
thumbnailItems.forEach(item => {
    item.addEventListener('click', () => {
        const mediaElement = item.querySelector('img, video'); // Selecciona tanto img como video
        const mediaSrc = mediaElement.src; // Obtiene la fuente del medio
        const imgDescription1 = mediaElement.getAttribute('data-description');
        const imgDescription2 = mediaElement.getAttribute('data-description2');

        // Limpia la superposición antes de agregar nuevo contenido
        fullscreenImage.src = ''; // Limpia la fuente de la imagen
        fullscreenImage.style.display = 'none'; // Oculta la imagen
        const existingVideo = overlay.querySelector('video'); // Verifica si ya hay un video en la superposición
        if (existingVideo) {
            existingVideo.remove(); // Elimina el video existente
        }

        // Verifica si es un video o una imagen
        if (mediaElement.tagName.toLowerCase() === 'video') {
            const videoOverlay = document.createElement('video'); // Crea un elemento de video
 videoOverlay.src = mediaSrc; // Asigna la fuente del video
            videoOverlay.controls = true; // Agrega controles al video
            videoOverlay.style.maxWidth = '90%'; // Ajusta el tamaño del video
            videoOverlay.style.maxHeight = '90%'; // Ajusta el tamaño del video
            overlay.appendChild(videoOverlay); // Agrega el video a la superposición
            videoOverlay.play(); // Reproduce el video
            animateMedia(videoOverlay); // Aplica la animación al video
        } else {
            fullscreenImage.src = mediaSrc; // Asigna la fuente de la imagen
            fullscreenImage.style.display = 'block'; // Muestra la imagen
            animateMedia(fullscreenImage); // Aplica la animación a la imagen
        }

        overlayDescription1.innerHTML = imgDescription1;
        overlayDescription2.innerHTML = imgDescription2;
        overlay.style.display = 'flex'; // Muestra la superposición
    });
});

// Agregar estilos de animación en CSS
const style = document.createElement('style');
style.innerHTML = `
    .animate {
        animation: scaleAnimation 0.6s ease-in-out;
    }

    @keyframes scaleAnimation {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
`;
>>>>>>> 948231d0d4374f13089972c1a10b1f57378a685a
document.head.appendChild(style);
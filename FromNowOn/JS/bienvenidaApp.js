document.addEventListener("DOMContentLoaded", () => {
    const text = "FROM NOW ON";
    const animatedText = document.getElementById("animated-text");
    let index = 0;

    function typeText() {
        if (index < text.length) {
            animatedText.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 100); // Velocidad de escritura
        }
    }

    typeText(); // Inicia la animación
});

document.addEventListener("DOMContentLoaded", () => {
    const records = document.querySelectorAll(".record"); // Selecciona todos los discos
    const rotationSpeed = 3; // Velocidad de rotación (grados por frame)
    let audioEnabled = false; // Control global para habilitar el audio

    // Toast para activar audio
    const toast = document.getElementById("audio-permission-toast");
    const acceptButton = document.getElementById("accept-audio");

    acceptButton.addEventListener("click", () => {
        audioEnabled = true; // Permite el audio
        toast.style.display = "none"; // Oculta el mensaje flotante
    });

    // Función de rotación y hover con audio
    records.forEach((record) => {
        let rotation = 0; // Ángulo inicial de rotación
        let isHovered = false; // Verifica si el mouse está sobre el disco
        const audio = new Audio(record.getAttribute("data-audio")); // Carga el archivo de audio asociado

        const rotate = () => {
            if (!isHovered) {
                rotation += rotationSpeed; // Incrementa el ángulo solo si no está en hover
                record.style.transform = `rotate(${rotation}deg)`; // Aplica la rotación
            }
            requestAnimationFrame(rotate); // Llama a la función en el próximo frame
        };

        rotate(); // Inicia la animación

        // Al pasar el mouse: Pausa la rotación, escala y reproduce el audio si está habilitado
        record.addEventListener("mouseenter", () => {
            isHovered = true;
            record.style.transform = `rotate(${rotation}deg) scale(1.4)`; // Rotación + Escala

            if (audioEnabled) {
                audio.currentTime = 0; // Reinicia el audio
                audio.play().catch((error) => {
                    console.warn("Error al intentar reproducir el audio:", error);
                });
            }
        });

        // Al salir del mouse: Reanuda la rotación y pausa el audio
        record.addEventListener("mouseleave", () => {
            isHovered = false;
            record.style.transform = `rotate(${rotation}deg)`; // Solo rotación
            if (audioEnabled) {
                audio.pause(); // Pausa el audio
                audio.currentTime = 0; // Reinicia el audio
            }
        });
    });
});







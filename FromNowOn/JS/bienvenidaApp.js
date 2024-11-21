document.addEventListener("DOMContentLoaded", () => {
    const text = "FROM NOW ON";
    const animatedText = document.getElementById("animated-text");
    let index = 0;

    function typeText() {
        if (index < text.length) {
            animatedText.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 100);
        }
    }

    typeText();
});

document.addEventListener("DOMContentLoaded", () => {
    const records = document.querySelectorAll(".record");
    const rotationSpeed = 3;
    let audioEnabled = false;

    const toast = document.getElementById("audio-permission-toast");
    const acceptButton = document.getElementById("accept-audio");

    acceptButton.addEventListener("click", () => {
        audioEnabled = true;
        toast.style.display = "none";
    });

    records.forEach((record) => {
        let rotation = 0; 
        let isHovered = false;
        const audio = new Audio(record.getAttribute("data-audio")); 

        const rotate = () => {
            if (!isHovered) {
                rotation += rotationSpeed; 
                record.style.transform = `rotate(${rotation}deg)`; 
            }
            requestAnimationFrame(rotate); 
        };

        rotate(); 

        record.addEventListener("mouseenter", () => {
            isHovered = true;
            record.style.transform = `rotate(${rotation}deg) scale(1.4)`; 

            if (audioEnabled) {
                audio.currentTime = 0;
                audio.play().catch((error) => {
                    console.warn("Error al intentar reproducir el audio:", error);
                });
            }
        });

        record.addEventListener("mouseleave", () => {
            isHovered = false;
            record.style.transform = `rotate(${rotation}deg)`;
            if (audioEnabled) {
                audio.pause(); 
                audio.currentTime = 0; 
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const records = document.querySelectorAll(".record"); // Selecciona todos los discos

    records.forEach((record) => {
        record.addEventListener("click", () => {
            const audioSrc = record.getAttribute("data-audio"); // Obtiene la ruta del audio
            window.location.href = `index.html?audio=${encodeURIComponent(audioSrc)}`; // Redirige al index con el audio como parámetro
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    // Obtén el contenedor de audio desde sessionStorage
    let audioElement = document.getElementById("global-audio");
    let selectedAudio = sessionStorage.getItem("selectedAudio");

    // Si hay audio seleccionado previamente, configúralo
    if (selectedAudio) {
        if (!audioElement) {
            // Crea el elemento de audio si no existe
            audioElement = document.createElement("audio");
            audioElement.id = "global-audio";
            audioElement.src = selectedAudio;
            audioElement.loop = true; // Música en bucle
            document.body.appendChild(audioElement);
        }
        audioElement.play().catch((error) => console.warn("Error al reproducir audio:", error));
    }

    // Evento para guardar el audio seleccionado en sessionStorage
    document.querySelectorAll(".record").forEach((record) => {
        record.addEventListener("click", () => {
            const audioSrc = record.getAttribute("data-audio");
            sessionStorage.setItem("selectedAudio", audioSrc);
            if (audioElement) {
                audioElement.src = audioSrc;
                audioElement.play();
            }
        });
    });
});

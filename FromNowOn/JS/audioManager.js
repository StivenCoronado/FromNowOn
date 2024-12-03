document.addEventListener("DOMContentLoaded", () => {
    const globalAudioSrc = sessionStorage.getItem("selectedAudio");
    const isPlaying = sessionStorage.getItem("isPlaying") === "true";
    const savedTime = parseFloat(sessionStorage.getItem("audioCurrentTime")) || 0;

    let globalAudio = document.getElementById("global-audio");

    if (globalAudioSrc && !globalAudio) {
        
        globalAudio = document.createElement("audio");
        globalAudio.id = "global-audio";
        globalAudio.src = globalAudioSrc;
        globalAudio.loop = true; 
        globalAudio.currentTime = savedTime; 
        document.body.appendChild(globalAudio);
    }

    if (globalAudio) {
        
        const enableAudio = () => {
            if (isPlaying) {
                globalAudio.play().catch((error) => {
                    console.warn("Error al intentar reproducir el audio global:", error);
                });
            }
            document.removeEventListener("click", enableAudio);
        };

        document.addEventListener("click", enableAudio);
    }

    window.addEventListener("beforeunload", () => {
        if (globalAudio) {
            sessionStorage.setItem("audioCurrentTime", globalAudio.currentTime);
        }
    });

    const muteButton = document.createElement("button");
    muteButton.id = "mute-toggle";
    muteButton.textContent = sessionStorage.getItem("isMuted") === "true" ? "Unmute" : "Mute";
    muteButton.style.position = "fixed";
    muteButton.style.top = "10px";
    muteButton.style.right = "10px";
    muteButton.style.zIndex = "1000";

    document.body.appendChild(muteButton);

    muteButton.addEventListener("click", () => {
        if (globalAudio.muted) {
            globalAudio.muted = false;
            sessionStorage.setItem("isMuted", "false");
            muteButton.textContent = "Mute";
        } else {
            globalAudio.muted = true;
            sessionStorage.setItem("isMuted", "true");
            muteButton.textContent = "Unmute";
        }
    });
});
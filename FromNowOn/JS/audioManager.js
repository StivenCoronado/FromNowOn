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
        globalAudio.muted = sessionStorage.getItem("isMuted") === "true";
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

    const currentPage = window.location.pathname.split("/").pop();
    if (currentPage !== "welcome.html") {
        
        const muteButton = document.createElement("button");
        muteButton.innerHTML = globalAudio && globalAudio.muted ? "🔇" : "🔊";
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
            if (globalAudio) {
                if (globalAudio.muted) {
                    globalAudio.muted = false;
                    sessionStorage.setItem("isMuted", "false");
                    muteButton.innerHTML = "🔊";
                } else {
                    globalAudio.muted = true;
                    sessionStorage.setItem("isMuted", "true");
                    muteButton.innerHTML = "🔇";
                }
            } else {
                console.warn("El audio global no está disponible.");
            }
        });
    }
});
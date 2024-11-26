document.addEventListener("DOMContentLoaded", () => {
    const circles = [
        { class: "circle-1", style: { top: "10%", left: "20%" } },
        { class: "circle-2", style: { top: "50%", right: "10%" } },
        { class: "circle-3", style: { bottom: "20%", left: "15%" } },
    ];

    function updateCircles() {
        const viewportWidth = window.innerWidth;

        circles.forEach((circle) => {
            const element = document.querySelector(`.${circle.class}`);
            if (!element) return;

            if (viewportWidth < 768) {
                element.style.display = "none"; 
            } else {
                element.style.display = "block"; 
                element.style.width = `${Math.min(viewportWidth * 0.23, 500)}px`;
                element.style.height = `${Math.min(viewportWidth * 0.23, 500)}px`;
            }
        });
    }

    window.addEventListener("resize", updateCircles);
    updateCircles();
});

document.addEventListener("DOMContentLoaded", () => {
    const text = [
        "F", "R", 
        "<span class='solid-o o1'>O</span>", 
        "M", " ", 
        "N", 
        "<span class='solid-o o2'>O</span>", 
        "W", " ", 
        "<span class='solid-o o3'>O</span>", 
        "N"
    ];
    const animatedText = document.getElementById("animated-text");
    let index = 0;

    function typeText() {
        if (index < text.length) {
            animatedText.innerHTML += text[index];
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
    const records = document.querySelectorAll(".record");

    records.forEach((record) => {
        record.addEventListener("click", () => {
            const audioSrc = record.getAttribute("data-audio");
            window.location.href = `index.html?audio=${encodeURIComponent(audioSrc)}`;
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const records = document.querySelectorAll(".record");

    records.forEach((record) => {
        record.addEventListener("click", () => {
            const audioSrc = record.getAttribute("data-audio");
            sessionStorage.setItem("selectedAudio", audioSrc);
            sessionStorage.setItem("isPlaying", "true");
            window.location.href = "index.html";
        });
    });
});
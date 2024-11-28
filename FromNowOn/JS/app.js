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
        const mediaElement = item.querySelector('img, video');
        const mediaSrc = mediaElement.src;
        const imgDescription1 = mediaElement.getAttribute('data-descripcionImagen1') || mediaElement.getAttribute('data-descripcionVideo1');
        const imgDescription2 = mediaElement.getAttribute('data-descripcionImagen2') || mediaElement.getAttribute('data-descripcionVideo2');

        fullscreenImage.src = '';
        fullscreenImage.style.display = 'none';
        const existingVideo = overlay.querySelector('video');
        if (existingVideo) {
            existingVideo.remove();
        }

        if (mediaElement.tagName.toLowerCase() === 'video') {
            const videoOverlay = document.createElement('video');
            videoOverlay.src = mediaSrc;
            videoOverlay.controls = true;
            videoOverlay.style.maxWidth = '90%';
            videoOverlay.style.maxHeight = '90%';
            overlay.appendChild(videoOverlay);
            videoOverlay.play();
        
            overlayDescription1.innerHTML = imgDescription1; 
            overlayDescription2.innerHTML = imgDescription2; 
            fullscreenImage.style.display = 'none';
        } else {
            fullscreenImage.src = mediaSrc;
            fullscreenImage.style.display = 'block';
            
            overlayDescription1.innerHTML = imgDescription1; 
            overlayDescription2.innerHTML = imgDescription2; 
        }

        overlay.style.display = 'flex';
    });
});

overlay.addEventListener('click', () => {
    overlay.style.display = 'none'; 
    const existingVideo = overlay.querySelector('video');
    if (existingVideo) {
        existingVideo.pause(); 
        existingVideo.remove(); 
    }
});

document.querySelector('.close-button').addEventListener('click', () => {
    overlay.style.display = 'none'; 
    const existingVideo = overlay.querySelector('video');
    if (existingVideo) {
        existingVideo.pause(); 
        existingVideo.remove(); 
    }
});

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

    window.addEventListener("beforeunload", () => {
        if (audio && !audio.paused) {
            sessionStorage.setItem("isPlaying", "true");
        } else {
            sessionStorage.setItem("isPlaying", "false");
        }
    });
});

function animateMedia(mediaElement) {
    mediaElement.classList.add('animate');
    setTimeout(() => {
        mediaElement.classList.remove('animate');
    }, 600);
}

thumbnailItems.forEach(item => {
    item.addEventListener('click', () => {
        const mediaElement = item.querySelector('img, video');
        const mediaSrc = mediaElement.src;
        const imgDescription1 = mediaElement.getAttribute('data-description');
        const imgDescription2 = mediaElement.getAttribute('data-description2');

        fullscreenImage.src = '';
        fullscreenImage.style.display = 'none';
        const existingVideo = overlay.querySelector('video');
        if (existingVideo) {
            existingVideo.remove();
        }

        if (mediaElement.tagName.toLowerCase() === 'video') {
            const videoOverlay = document.createElement('video');
            videoOverlay.src = mediaSrc;
            videoOverlay.controls = true;
            videoOverlay.style.maxWidth = '90%';
            videoOverlay.style.maxHeight = '90%';
            overlay.appendChild(videoOverlay);
            videoOverlay.play();
            animateMedia(videoOverlay);
        } else {
            fullscreenImage.src = mediaSrc;
            fullscreenImage.style.display = 'block';
            animateMedia(fullscreenImage);
        }

        overlayDescription1.innerHTML = imgDescription1;
        overlayDescription2.innerHTML = imgDescription2;
        overlay.style.display = 'flex';
    });
});

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
    }
`;
document.head.appendChild(style);

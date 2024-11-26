let nextBtn = document.querySelector('.next');
let prevBtn = document.querySelector('.prev');

let slider = document.querySelector('.slider');
let sliderList = slider.querySelector('.slider .list');
let thumbnail = document.querySelector('.slider .thumbnail');
let thumbnailItems = thumbnail.querySelectorAll('.item');
let pruebaImage = document.getElementById('pruebaImage');
let newImageSection = document.querySelector('.new-image');
let overlay = document.querySelector('.overlay');
let fullscreenImage = document.getElementById('fullscreenImage');
let overlayDescription = document.querySelector('.overlay-description');


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

setInterval(() => {
    moveSlider('next');
}, 4000);


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
        const imgSrc = item.querySelector('img').src; 
        const imgDescription1 = item.querySelector('img').getAttribute('data-description'); 
        const imgDescription2 = item.querySelector('img').getAttribute('data-description2'); 

        fullscreenImage.src = imgSrc; 
        document.getElementById('description1').innerHTML = imgDescription1; 
        document.getElementById('description2').innerHTML = imgDescription2; 
        overlay.style.display = 'flex'; 
    });
});

overlay.addEventListener('click', () => {
    overlay.style.display = 'none'; 
});


document.querySelector('.close-button').addEventListener('click', () => {
    overlay.style.display = 'none'; 
});

setInterval(() => {
    moveSlider('next');
}, 4000);

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

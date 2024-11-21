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
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');
const container = document.querySelector('.container');
const slider = document.querySelector('.slider');
const sliderLine = document.querySelector('.slider-line');
const slides = document.querySelectorAll('.slider-img');
const counter = document.querySelector('.counter');


let width;
let currentIndex = 0;


counter.textContent = `${currentIndex + 1} / ${slides.length}`;

function init() {
    console.log('resize');
    width = slider.offsetWidth;
   
    sliderLine.style.width = `${width * slides.length}px`;
slides.forEach(slide => {
    slide.style.width = `${width}px`; 
    slide.style.height = 'auto'; }); 
        updateSlider(); 
    }
        


function updateSlider() {
    sliderLine.style.transform = `translateX(-${currentIndex * width}px)`;
    counter.textContent = `${currentIndex + 1} / ${slides.length}`;

}

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
});
window.addEventListener('resize', init);
init();

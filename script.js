document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const thumbnailsContainer = document.querySelector('.thumbnails');
    
    let currentIndex = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 seconds
    
    // Create thumbnails
    slides.forEach((slide, index) => {
        const imgSrc = slide.querySelector('img').src;
        const thumbnail = document.createElement('img');
        thumbnail.src = imgSrc;
        thumbnail.classList.add('thumbnail');
        if (index === 0) thumbnail.classList.add('active');
        
        thumbnail.addEventListener('click', () => {
            goToSlide(index);
        });
        
        thumbnailsContainer.appendChild(thumbnail);
    });
    
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // Start auto-sliding
    startSlideShow();
    
    // Navigation functions
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }
    
    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active classes
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });
        
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.classList.toggle('active', index === currentIndex);
        });
        
        // Reset the auto-slide timer
        resetSlideShow();
    }
    
    // Auto-slide functionality
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, slideDuration);
    }
    
    function resetSlideShow() {
        clearInterval(slideInterval);
        startSlideShow();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide(); // Swipe left
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide(); // Swipe right
        }
    }
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        startSlideShow();
    });
});
const languages = [
    { text: "Ask", duration: 4000 },      // English - Longer
    { text: "Pucho", duration: 4000 },    // Hinglish - Longer
    { text: "पूछो", duration: 2000 },     // Hindi
    { text: "জিজ্ঞাসা করা", duration: 2000 }, // Bengali
    { text: "विचारा", duration: 2000 },   // Marathi
    { text: "கேளுங்கள்", duration: 2000 } // Tamil
];

const dynamicTextElement = document.getElementById('dynamic-text');
let currentIndex = 0;

function changeText() {
    // Fade out
    dynamicTextElement.style.opacity = '0';
    dynamicTextElement.style.transform = 'translateY(-20px)';

    setTimeout(() => {
        // Change text
        currentIndex = (currentIndex + 1) % languages.length;
        dynamicTextElement.textContent = languages[currentIndex].text;

        // Reset position for slide up animation
        dynamicTextElement.style.transition = 'none';
        dynamicTextElement.style.transform = 'translateY(20px)';

        // Force reflow
        void dynamicTextElement.offsetWidth;

        // Fade in
        dynamicTextElement.style.transition = 'all 0.5s ease-out';
        dynamicTextElement.style.opacity = '1';
        dynamicTextElement.style.transform = 'translateY(0)';

        // Schedule next change based on current language duration
        setTimeout(changeText, languages[currentIndex].duration);
    }, 500);
}

// Start the loop
setTimeout(changeText, languages[0].duration);

// Teleconsultation Animation Loop
const teleBtn = document.getElementById('tele-btn');
const teleOverlay = document.getElementById('tele-overlay');

if (teleBtn && teleOverlay) {
    const animationLoop = () => {
        // 1. Wait for initial view
        setTimeout(() => {
            // 2. Simulate Click Effect
            teleBtn.style.transform = 'scale(0.95)';

            setTimeout(() => {
                teleBtn.style.transform = 'scale(1)';

                // 3. Show Overlay (Slide/Fade in)
                teleOverlay.classList.add('active');

                // 4. Hold Overlay
                setTimeout(() => {
                    // 5. Hide Overlay
                    teleOverlay.classList.remove('active');

                    // 6. Loop
                    animationLoop();
                }, 4000); // Show tele image for 4s

            }, 200); // Click duration
        }, 3000); // Wait 3s before clicking
    };

    // Start the loop
    animationLoop();

    // Optional: Add manual interaction
    teleBtn.addEventListener('click', () => {
        teleOverlay.classList.add('active');
        setTimeout(() => {
            teleOverlay.classList.remove('active');
        }, 4000);
    });
}

// Mobile Menu Functionality
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNavMenu = document.getElementById('mobileNavMenu');

if (mobileMenuToggle && mobileNavMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mobileNavMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (mobileNavMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on a link
    mobileNavMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            mobileNavMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !mobileNavMenu.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            mobileNavMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            mobileMenuToggle.classList.remove('active');
            mobileNavMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Review Slideshow for Mobile
let reviewInterval;

function initReviewSlideshow() {
    const isMobile = window.innerWidth <= 768;
    const reviewCards = document.querySelectorAll('.review-card');
    const reviewDots = document.querySelectorAll('.review-dot');
    
    // Clear any existing interval
    if (reviewInterval) {
        clearInterval(reviewInterval);
    }
    
    if (!isMobile) {
        // Show all reviews on desktop
        reviewCards.forEach(card => {
            card.classList.remove('active');
            card.style.display = 'flex';
        });
        return;
    }
    
    let currentReview = 0;
    
    // Show first review
    reviewCards.forEach((card, index) => {
        card.classList.remove('active');
        card.style.display = 'none';
        if (index === 0) {
            card.classList.add('active');
            card.style.display = 'flex';
        }
    });
    
    // Show first dot as active
    reviewDots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === 0) {
            dot.classList.add('active');
        }
    });
    
    function showReview(index) {
        reviewCards.forEach(card => {
            card.classList.remove('active');
            card.style.display = 'none';
        });
        reviewDots.forEach(dot => dot.classList.remove('active'));
        
        reviewCards[index].classList.add('active');
        reviewCards[index].style.display = 'flex';
        reviewDots[index].classList.add('active');
        currentReview = index;
    }
    
    // Auto-advance slideshow every 4 seconds
    reviewInterval = setInterval(() => {
        currentReview = (currentReview + 1) % reviewCards.length;
        showReview(currentReview);
    }, 4000);
    
    // Dot click handlers
    reviewDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(reviewInterval);
            showReview(index);
            // Restart auto-advance
            reviewInterval = setInterval(() => {
                currentReview = (currentReview + 1) % reviewCards.length;
                showReview(currentReview);
            }, 4000);
        });
    });
    
    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    const reviewsContainer = document.querySelector('.reviews-container');
    if (reviewsContainer) {
        reviewsContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        reviewsContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                // Swipe left - next review
                clearInterval(reviewInterval);
                currentReview = (currentReview + 1) % reviewCards.length;
                showReview(currentReview);
                // Restart auto-advance
                reviewInterval = setInterval(() => {
                    currentReview = (currentReview + 1) % reviewCards.length;
                    showReview(currentReview);
                }, 4000);
            }
            if (touchEndX > touchStartX + 50) {
                // Swipe right - previous review
                clearInterval(reviewInterval);
                currentReview = (currentReview - 1 + reviewCards.length) % reviewCards.length;
                showReview(currentReview);
                // Restart auto-advance
                reviewInterval = setInterval(() => {
                    currentReview = (currentReview + 1) % reviewCards.length;
                    showReview(currentReview);
                }, 4000);
            }
        }
    }
}

// Initialize on load and resize
initReviewSlideshow();
window.addEventListener('resize', () => {
    initReviewSlideshow();
});

// Mobile-specific adjustments for neural field
function adjustNeuralFieldForMobile() {
    const isMobile = window.innerWidth <= 768;
    const neuralField = document.getElementById('neuralField');
    
    if (!neuralField) return;
    
    if (isMobile) {
        // Adjust neural field height based on screen size
        if (window.innerWidth <= 480) {
            neuralField.style.height = '500px';
        } else {
            neuralField.style.height = '600px';
        }
        
        // Reduce animation complexity on mobile for better performance
        const pulseLines = neuralField.querySelectorAll('.pulse-line');
        pulseLines.forEach(line => {
            line.style.strokeWidth = '2';
        });
    } else {
        neuralField.style.height = '800px';
    }
}

// Run on load and resize
adjustNeuralFieldForMobile();
window.addEventListener('resize', adjustNeuralFieldForMobile);

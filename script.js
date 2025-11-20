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

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

/**
 * HERO SECTION - Advanced Interactions
 */

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // PARALLAX EFFECT
    // ========================================
    const heroBackground = document.querySelector('.hero-background');
    const heroImage = document.querySelector('.hero-image');

    if (heroBackground && heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;

            if (scrolled < window.innerHeight) {
                heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px) scale(1.1)`;
            }
        });
    }

    // ========================================
    // ANIMATED COUNTER
    // ========================================
    const counters = document.querySelectorAll('[data-counter]');
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-counter'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60 FPS
            let current = 0;

            const updateCounter = () => {
                current += increment;

                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    };

    // Trigger counters when stats bar is in view
    const statsBar = document.querySelector('.hero-stats-bar');
    if (statsBar) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsBar);
    }

    // ========================================
    // TYPING EFFECT
    // ========================================
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const texts = [
            'Partner estratégico para marcas internacionales de lujo',
            'Proveedor directo con +25 años de experiencia',
            'Suministro confiable para colecciones exclusivas',
            'Volúmenes mayoristas con calidad garantizada',
            'Soluciones textiles para grandes marcas'
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentText = texts[textIndex];

            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 3000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500; // Pause before typing next
            }

            setTimeout(type, typeSpeed);
        }

        // Start typing after a delay
        setTimeout(type, 1500);
    }

    // ========================================
    // SMOOTH SCROLL TO SECTIONS
    // ========================================
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const nextSection = document.querySelector('.trust-bar');
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // ========================================
    // ENHANCED HOVER EFFECTS
    // ========================================
    const valuePropCards = document.querySelectorAll('.value-prop');
    valuePropCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ========================================
    // DYNAMIC BACKGROUND GRADIENT
    // ========================================
    const heroOverlay = document.querySelector('.hero-overlay');
    if (heroOverlay) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            const gradient = `radial-gradient(
                ellipse at ${x * 100}% ${y * 100}%,
                rgba(0, 0, 0, 0.2) 0%,
                rgba(0, 0, 0, 0.5) 50%,
                rgba(0, 0, 0, 0.7) 100%
            )`;

            heroOverlay.style.background = gradient;
        });
    }

    // ========================================
    // FADE IN ANIMATIONS ON LOAD
    // ========================================
    const animatedElements = document.querySelectorAll('[class*="animate-"]');
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });

    // ========================================
    // CTA BUTTON RIPPLE EFFECT
    // ========================================
    const ctaButtons = document.querySelectorAll('.btn-hero-primary, .btn-hero-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn-hero-primary, .btn-hero-secondary {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
/**
 * PRODUCTOS HERO - Animaciones e Interacciones
 */

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // PARALLAX EFFECT ON SCROLL
    // ========================================
    const heroPattern = document.querySelector('.hero-pattern');
    if (heroPattern) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const speed = 0.5;

            if (scrolled < window.innerHeight) {
                heroPattern.style.transform = `translate(${scrolled * speed}px, ${scrolled * speed}px)`;
            }
        });
    }

    // ========================================
    // ANIMATED NUMBERS
    // ========================================
    function animateValue(element, start, end, duration, suffix = '') {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                element.textContent = end + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    }

    // Animate features on load
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find numbers in feature cards
                const strongElements = entry.target.querySelectorAll('.feature-text strong');
                strongElements.forEach(el => {
                    const text = el.textContent;
                    if (text.includes('30-45')) {
                        el.innerHTML = '<span class="animate-number">30</span>-<span class="animate-number">45</span> días';
                        animateValue(el.querySelector('.animate-number'), 0, 30, 1000);
                        animateValue(el.querySelectorAll('.animate-number')[1], 0, 45, 1000);
                    } else if (text.includes('50')) {
                        el.innerHTML = 'Desde <span class="animate-number">50</span>kg';
                        animateValue(el.querySelector('.animate-number'), 0, 50, 1000);
                    } else if (text.includes('+22')) {
                        el.innerHTML = '+<span class="animate-number">22</span> Colores';
                        animateValue(el.querySelector('.animate-number'), 0, 22, 1000);
                    } else if (text.includes('18-29')) {
                        el.innerHTML = '<span class="animate-number">18</span>-<span class="animate-number">29</span> μm';
                        animateValue(el.querySelector('.animate-number'), 0, 18, 1000);
                        animateValue(el.querySelectorAll('.animate-number')[1], 0, 29, 1000);
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });

    // ========================================
    // SMOOTH SCROLL TO SECTIONS
    // ========================================
    document.querySelectorAll('.quick-nav-item, .hero-actions a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 100;
                    const targetPosition = target.offsetTop - offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ========================================
    // SCROLL INDICATOR CLICK
    // ========================================
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const nextSection = document.querySelector('.productos-layout');
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // ========================================
    // HOVER EFFECTS FOR QUALITY BADGES
    // ========================================
    const qualityBadges = document.querySelectorAll('.quality-badge');
    qualityBadges.forEach((badge, index) => {
        badge.style.animationDelay = `${index * 0.1}s`;

        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });

        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ========================================
    // STAGGER ANIMATIONS
    // ========================================
    const animateElements = () => {
        // Animate feature cards with stagger
        document.querySelectorAll('.feature-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';

            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
        });

        // Animate quick nav items
        document.querySelectorAll('.quick-nav-item').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';

            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 600 + (index * 100));
        });
    };

    // Run animations after a short delay
    setTimeout(animateElements, 300);

    // ========================================
    // DYNAMIC BACKGROUND GRADIENT
    // ========================================
    const heroSection = document.querySelector('.productos-hero');
    if (heroSection) {
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;

        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            mouseX = (e.clientX - rect.left) / rect.width;
            mouseY = (e.clientY - rect.top) / rect.height;
        });

        const animateGradient = () => {
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;

            const gradient = `radial-gradient(ellipse at ${currentX * 100}% ${currentY * 100}%, rgba(191, 17, 32, 0.1) 0%, transparent 50%)`;

            if (heroSection.querySelector('.hero-overlay')) {
                heroSection.querySelector('.hero-overlay').style.background = gradient;
            }

            requestAnimationFrame(animateGradient);
        };

        animateGradient();
    }

});
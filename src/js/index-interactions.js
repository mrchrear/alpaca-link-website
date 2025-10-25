// =============================================
// ALPACA LINK - INDEX INTERACTIONS
// JavaScript para mejorar la experiencia del usuario
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    // =============================================
    // 1. FAQ ACCORDION
    // =============================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Cerrar otros items abiertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle el item actual
            item.classList.toggle('active');
        });
    });

    // =============================================
    // 2. ANIMACIÓN DE NÚMEROS (Stats Counter)
    // =============================================
    const animateNumbers = () => {
        const counters = document.querySelectorAll('[data-counter]');

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-counter'));
            const duration = 2000; // 2 segundos
            const step = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            // Iniciar animación cuando sea visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(counter);
        });
    };

    animateNumbers();

    // =============================================
    // 3. SMOOTH SCROLL para enlaces internos
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // =============================================
    // 4. LAZY LOADING DE IMÁGENES mejorado
    // =============================================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // =============================================
    // 5. ANIMACIONES AL SCROLL
    // =============================================
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-fade-up, .animate-fade-down, .animate-slide-right, .animate-slide-left');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1
        });

        elements.forEach(el => observer.observe(el));
    };

    animateOnScroll();

    // =============================================
    // 6. PARALLAX EFFECT para Hero
    // =============================================
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(element => {
            const speed = element.dataset.parallaxSpeed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // =============================================
    // 7. TYPING EFFECT para Hero subtitle
    // =============================================
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        let index = 0;

        const type = () => {
            if (index < text.length) {
                typingElement.textContent += text.charAt(index);
                index++;
                setTimeout(type, 30);
            }
        };

        // Iniciar después de 500ms
        setTimeout(type, 500);
    }

    // =============================================
    // 8. HOVER EFFECTS para cards
    // =============================================
    const cards = document.querySelectorAll('.producto-card, .partner-card, .use-case-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// =============================================
// ANIMACIONES CSS ADICIONALES
// =============================================
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes fadeUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideRight {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideLeft {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes zoomIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    .animate-fade-up {
        opacity: 0;
    }

    .animate-fade-down {
        opacity: 0;
    }

    .animate-slide-right {
        opacity: 0;
    }

    .animate-slide-left {
        opacity: 0;
    }

    .animate-zoom-in {
        animation: zoomIn 0.8s ease forwards;
    }

    .animate-fade-up.animated {
        animation: fadeUp 0.6s ease forwards;
    }

    .animate-fade-down.animated {
        animation: fadeDown 0.6s ease forwards;
    }

    .animate-slide-right.animated {
        animation: slideRight 0.6s ease forwards;
    }

    .animate-slide-left.animated {
        animation: slideLeft 0.6s ease forwards;
    }

    img.fade-in {
        animation: fadeIn 0.6s ease;
    }
`;

document.head.appendChild(style);
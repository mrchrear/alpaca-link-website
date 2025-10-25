/**
 * STABILITY OVERRIDE - ALPACA LINK
 * Purpose: Ensure stable, professional behavior
 * Removes all unnecessary animations and effects
 */

(function() {
    'use strict';

    // Disable all animations on page load
    document.addEventListener('DOMContentLoaded', function() {

        // 1. Remove all animation classes
        const animationClasses = [
            'animate-fade-down', 'animate-fade-up', 'animate-zoom-in',
            'animate-slide-right', 'animate-slide-up', 'animate-slide-left',
            'typing-text', 'parallax', 'float', 'pulse', 'shake'
        ];

        animationClasses.forEach(className => {
            document.querySelectorAll('.' + className).forEach(element => {
                element.classList.remove(className);
            });
        });

        // 2. Disable parallax effects
        document.querySelectorAll('[data-parallax]').forEach(element => {
            element.removeAttribute('data-parallax');
        });

        // 3. FAQ Functionality (Professional accordion)
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', function() {
                    // Close other items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    // Toggle current item
                    item.classList.toggle('active');
                });
            }
        });

        // 4. Smooth scroll for anchor links (without animations)
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href !== '#' && href !== '#0') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const headerHeight = 80;
                        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // 5. Mobile menu (simple toggle, no fancy animations)
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mainNav = document.getElementById('mainNav');

        if (mobileMenuToggle && mainNav) {
            mobileMenuToggle.addEventListener('click', function() {
                mainNav.classList.toggle('mobile-active');
                this.classList.toggle('active');
                document.body.classList.toggle('mobile-menu-open');
            });

            // Close mobile menu when clicking a link
            mainNav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    mainNav.classList.remove('mobile-active');
                    mobileMenuToggle.classList.remove('active');
                    document.body.classList.remove('mobile-menu-open');
                });
            });
        }

        // 6. Lazy loading optimization
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            observer.unobserve(img);
                        }
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // 7. Form validation (if contact form exists)
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();

                // Basic validation
                let isValid = true;
                const requiredFields = this.querySelectorAll('[required]');

                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        field.classList.add('error');
                        isValid = false;
                    } else {
                        field.classList.remove('error');
                    }
                });

                if (isValid) {
                    // Form is valid, would normally submit here
                    console.log('Form submitted successfully');
                }
            });
        }

        // 8. Performance: Disable unnecessary event listeners
        window.removeEventListener('scroll', window.onscroll);
        window.removeEventListener('resize', window.onresize);

        // 9. Set focus styles for accessibility
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-nav');
        });

        // 10. Ensure images have proper alt text
        document.querySelectorAll('img:not([alt])').forEach(img => {
            img.setAttribute('alt', '');
        });
    });

    // Prevent animation libraries from loading
    window.AOS = undefined;
    window.anime = undefined;
    window.gsap = undefined;
    window.ScrollReveal = undefined;

    // Override any animation functions
    if (window.jQuery) {
        jQuery.fn.animate = function() { return this; };
        jQuery.fn.fadeIn = function() { this.show(); return this; };
        jQuery.fn.fadeOut = function() { this.hide(); return this; };
        jQuery.fn.slideUp = function() { this.hide(); return this; };
        jQuery.fn.slideDown = function() { this.show(); return this; };
    }

})();
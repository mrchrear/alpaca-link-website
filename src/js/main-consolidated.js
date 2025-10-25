/**
 * ALPACA LINK - CONSOLIDATED MAIN JAVASCRIPT
 * Professional B2B Website - Zero Animations
 * Version: 2.0 - Production Ready
 */

(function() {
    'use strict';

    // ========== CONFIGURATION ==========
    const config = {
        headerScrollThreshold: 100,
        scrollOffset: 80,
        formSubmitDelay: 1000,
        observerThreshold: 0.1,
        mobileBreakpoint: 768
    };

    // ========== DOM READY ==========
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        initSmoothScroll();
        initForms();
        initFAQ();
        removeAllAnimations();
        initLazyLoading();
        initAccessibility();
    });

    // ========== MOBILE MENU ==========
    function initMobileMenu() {
        const toggle = document.getElementById('mobileMenuToggle');
        const nav = document.getElementById('mainNav');

        if (!toggle || !nav) return;

        // Toggle menu
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isActive = toggle.classList.contains('active');

            toggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('mobile-menu-open');

            // Update ARIA attributes
            toggle.setAttribute('aria-expanded', !isActive);
            toggle.setAttribute('aria-label', !isActive ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
        });

        // Close on link click
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('mobile-menu-open');
            });
        });

        // Close on outside click
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !toggle.contains(e.target) && nav.classList.contains('active')) {
                toggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('mobile-menu-open');
            }
        });
    }

    // ========== SMOOTH SCROLL ==========
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                if (!href || href === '#' || href === '#0') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - config.scrollOffset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ========== FORM HANDLING ==========
    function initForms() {
        // Find all forms
        const forms = document.querySelectorAll('form');

        forms.forEach(form => {
            // Skip if form has action attribute (external handler)
            if (form.getAttribute('action') && form.getAttribute('action') !== '#') {
                return;
            }

            form.addEventListener('submit', function(e) {
                e.preventDefault();

                let isValid = true;
                const requiredFields = form.querySelectorAll('[required]');

                // Clear previous errors
                form.querySelectorAll('.error-message').forEach(msg => msg.remove());
                form.querySelectorAll('.error').forEach(field => field.classList.remove('error'));

                // Validate required fields
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                        showFieldError(field, 'Este campo es requerido');
                    }
                });

                // Validate email fields
                form.querySelectorAll('[type="email"]').forEach(field => {
                    if (field.value && !isValidEmail(field.value)) {
                        isValid = false;
                        field.classList.add('error');
                        showFieldError(field, 'Email inválido');
                    }
                });

                if (isValid) {
                    // Show success message
                    showFormSuccess(form);

                    // Track event
                    trackEvent('Form', 'Submit', form.id || 'unnamed-form');

                    // Submit form after delay
                    setTimeout(() => {
                        if (form.getAttribute('action')) {
                            form.submit();
                        } else {
                            console.log('Form data:', new FormData(form));
                            // Here you would send to your backend
                        }
                    }, config.formSubmitDelay);
                }
            });
        });
    }

    function showFieldError(field, message) {
        const error = document.createElement('span');
        error.className = 'error-message';
        error.style.cssText = 'color: #BF1120; font-size: 0.875rem; display: block; margin-top: 5px;';
        error.textContent = message;
        field.parentNode.appendChild(error);
    }

    function showFormSuccess(form) {
        // Remove any existing success message
        const existing = form.querySelector('.success-message');
        if (existing) existing.remove();

        const success = document.createElement('div');
        success.className = 'success-message';
        success.style.cssText = `
            background: #4CAF50;
            color: white;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
            text-align: center;
            font-weight: 600;
        `;
        success.textContent = 'Formulario enviado correctamente. Nos contactaremos pronto.';
        form.insertBefore(success, form.firstChild);

        // Scroll to success message
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ========== FAQ ACCORDION ==========
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            if (!question || !answer) return;

            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');

                // Close all
                faqItems.forEach(otherItem => {
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');

                    otherItem.classList.remove('active');
                    if (otherQuestion) {
                        otherQuestion.setAttribute('aria-expanded', 'false');
                    }
                    if (otherAnswer) {
                        otherAnswer.setAttribute('aria-hidden', 'true');
                    }
                });

                // Toggle current
                if (!isActive) {
                    item.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                    answer.setAttribute('aria-hidden', 'false');
                } else {
                    question.setAttribute('aria-expanded', 'false');
                    answer.setAttribute('aria-hidden', 'true');
                }
            });
        });
    }

    // ========== REMOVE ALL ANIMATIONS ==========
    function removeAllAnimations() {
        // Remove animation classes
        const animationClasses = [
            'animate-fade-down', 'animate-fade-up', 'animate-zoom-in',
            'animate-slide-right', 'animate-slide-up', 'animate-slide-left',
            'fadeInDown', 'fadeInUp', 'fadeIn', 'slideIn',
            'typing-text', 'parallax', 'float', 'pulse', 'shake'
        ];

        animationClasses.forEach(className => {
            document.querySelectorAll('.' + className).forEach(el => {
                el.classList.remove(className);
                el.style.opacity = '1';
                el.style.transform = 'none';
                el.style.visibility = 'visible';
            });
        });

        // Remove inline animation styles
        document.querySelectorAll('[style*="animation"]').forEach(el => {
            el.style.animation = 'none';
            el.style.animationDelay = '0s';
        });

        // Remove data-parallax attributes
        document.querySelectorAll('[data-parallax]').forEach(el => {
            el.removeAttribute('data-parallax');
        });

        // Set all elements to visible
        document.querySelectorAll('.producto-card, .product-card, .trust-item, .why-item').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.transition = 'none';
        });
    }

    // ========== LAZY LOADING ==========
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
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
    }

    // ========== SCROLL EVENTS ==========
    let scrollTimer;
    window.addEventListener('scroll', function() {
        if (scrollTimer) clearTimeout(scrollTimer);

        scrollTimer = setTimeout(() => {
            // Update header shadow
            const header = document.getElementById('mainHeader');
            if (header) {
                if (window.scrollY > config.headerScrollThreshold) {
                    header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                } else {
                    header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                }
            }

            // Update active nav
            updateActiveNav();
        }, 100);
    });

    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // ========== ACCESSIBILITY ==========
    function initAccessibility() {
        // Keyboard navigation indicator
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-nav');
        });

        // Ensure images have alt text
        document.querySelectorAll('img:not([alt])').forEach(img => {
            img.setAttribute('alt', '');
        });

        // Add ARIA labels where missing
        document.querySelectorAll('button:not([aria-label])').forEach(button => {
            if (!button.textContent.trim()) {
                button.setAttribute('aria-label', 'Button');
            }
        });
    }

    // ========== ANALYTICS ==========
    function trackEvent(category, action, label) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }
        console.log(`Event: ${category} - ${action} - ${label}`);
    }

    // Track CTA clicks
    document.querySelectorAll('.btn-primary, .btn-evaluation').forEach(btn => {
        btn.addEventListener('click', function() {
            trackEvent('CTA', 'Click', this.textContent.trim());
        });
    });

    // ========== PERFORMANCE OPTIMIZATIONS ==========
    // Debounce resize events
    let resizeTimer;
    window.addEventListener('resize', function() {
        if (resizeTimer) clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {
            // Handle resize if needed
            if (window.innerWidth > config.mobileBreakpoint) {
                // Reset mobile menu if open
                const toggle = document.getElementById('mobileMenuToggle');
                const nav = document.getElementById('mainNav');
                if (toggle && nav) {
                    toggle.classList.remove('active');
                    nav.classList.remove('active');
                    document.body.classList.remove('mobile-menu-open');
                }
            }
        }, 250);
    });

    // ========== INIT MESSAGE ==========
    console.log('%c🦙 Alpaca Link - B2B Platform', 'color: #BF1120; font-size: 18px; font-weight: bold;');
    console.log('%cProfessional. Stable. No animations.', 'color: #595646; font-size: 12px;');

})();
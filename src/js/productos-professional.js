/**
 * PRODUCTOS PROFESSIONAL JS - ALPACA LINK
 * Clean, stable JavaScript for product catalog
 * No animations, maximum performance
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {

        // ========== SIDEBAR NAVIGATION ==========
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebarNav = document.getElementById('sidebarNav');
        const sidebarClose = document.getElementById('sidebarClose');
        const sidebarLinks = document.querySelectorAll('.sidebar-link');

        // Mobile sidebar toggle
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', function() {
                sidebarNav.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }

        if (sidebarClose) {
            sidebarClose.addEventListener('click', function() {
                sidebarNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Sidebar link active state
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Remove active from all
                sidebarLinks.forEach(l => l.classList.remove('active'));
                // Add active to clicked
                this.classList.add('active');

                // Close mobile sidebar after click
                if (window.innerWidth <= 768) {
                    sidebarNav.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });

        // ========== SMOOTH SCROLL ==========
        const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

        smoothScrollLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                if (href && href !== '#' && href !== '#0') {
                    e.preventDefault();

                    const target = document.querySelector(href);
                    if (target) {
                        const headerHeight = 100; // Account for fixed header
                        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // ========== SCROLL SPY FOR SIDEBAR ==========
        const sections = document.querySelectorAll('.product-section, .product-detail');
        const navLinks = document.querySelectorAll('.sidebar-link');

        function updateActiveSection() {
            const scrollPosition = window.pageYOffset + 150; // Offset for header

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        // Throttle scroll events for performance
        let scrollTimer;
        window.addEventListener('scroll', function() {
            if (scrollTimer) {
                clearTimeout(scrollTimer);
            }
            scrollTimer = setTimeout(updateActiveSection, 100);
        });

        // ========== LAZY LOADING IMAGES ==========
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

            // Observe all images with data-src
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // ========== REMOVE ALL ANIMATIONS ==========
        // Remove any animation classes that might exist
        const animationClasses = [
            'animate-fade-down', 'animate-fade-up', 'animate-zoom-in',
            'animate-slide-right', 'animate-slide-up', 'animate-slide-left',
            'fadeInDown', 'fadeInUp', 'fadeIn', 'slideIn'
        ];

        animationClasses.forEach(className => {
            document.querySelectorAll('.' + className).forEach(element => {
                element.classList.remove(className);
                element.style.opacity = '1';
                element.style.transform = 'none';
            });
        });

        // ========== PRODUCT IMAGE GALLERY ==========
        const productImages = document.querySelectorAll('.product-image-col img');

        productImages.forEach(img => {
            img.addEventListener('click', function() {
                // Simple lightbox functionality without animations
                const overlay = document.createElement('div');
                overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.9);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: zoom-out;
                `;

                const imgClone = this.cloneNode();
                imgClone.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    object-fit: contain;
                `;

                overlay.appendChild(imgClone);
                document.body.appendChild(overlay);

                overlay.addEventListener('click', function() {
                    document.body.removeChild(overlay);
                });

                // ESC key to close
                document.addEventListener('keydown', function closeOnEsc(e) {
                    if (e.key === 'Escape' && document.body.contains(overlay)) {
                        document.body.removeChild(overlay);
                        document.removeEventListener('keydown', closeOnEsc);
                    }
                });
            });

            // Add cursor pointer to indicate clickability
            img.style.cursor = 'zoom-in';
        });

        // ========== MOBILE OPTIMIZATIONS ==========
        // Disable hover effects on touch devices
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
        }

        // ========== PERFORMANCE OPTIMIZATIONS ==========
        // Debounce resize events
        let resizeTimer;
        window.addEventListener('resize', function() {
            if (resizeTimer) {
                clearTimeout(resizeTimer);
            }
            resizeTimer = setTimeout(function() {
                // Handle resize events here if needed
                if (window.innerWidth > 768 && sidebarNav.classList.contains('active')) {
                    sidebarNav.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }, 250);
        });

        // ========== ACCESSIBILITY ==========
        // Add keyboard navigation support
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-nav');
        });

        // Ensure all images have alt text
        document.querySelectorAll('img:not([alt])').forEach(img => {
            img.setAttribute('alt', '');
        });

        // ========== CLEAN UP ==========
        // Remove any inline styles that might cause issues
        document.querySelectorAll('[style*="animation"]').forEach(element => {
            element.style.animation = 'none';
        });

        document.querySelectorAll('[style*="transition-delay"]').forEach(element => {
            element.style.transitionDelay = '0s';
        });

        // Set initial visibility for all content
        document.querySelectorAll('.product-section, .manufactura-card, .process-step').forEach(element => {
            element.style.opacity = '1';
            element.style.visibility = 'visible';
            element.style.transform = 'none';
        });

    });

    // ========== PREVENT ANIMATION LIBRARIES ==========
    // Block animation libraries if they try to load
    window.AOS = undefined;
    window.anime = undefined;
    window.gsap = undefined;
    window.ScrollReveal = undefined;
    window.WOW = undefined;

})();
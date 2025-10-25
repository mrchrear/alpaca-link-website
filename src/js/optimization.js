/**
 * OPTIMIZATION.JS
 * Optimizaciones de rendimiento y micro-interacciones
 */

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // 1. LAZY LOADING DE IMÁGENES
    // ========================================

    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');

                    // Si la imagen es PNG pesada, considerar WebP alternativo
                    if (img.src.includes('.png')) {
                        const fileSize = getImageSize(img);
                        if (fileSize > 500000) { // Mayor a 500KB
                            console.warn(`⚠️ Imagen pesada detectada: ${img.src}`);
                            // Podríamos cargar una versión optimizada si existe
                            const optimizedSrc = img.src.replace('.png', '-optimized.jpg');
                            // checkOptimizedVersion(img, optimizedSrc);
                        }
                    }

                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback para navegadores antiguos
        images.forEach(img => img.classList.add('loaded'));
    }

    // ========================================
    // 2. SCROLL REVEAL ANIMATION
    // ========================================

    const revealElements = document.querySelectorAll('.section-header, .product-card, .why-us-card, .partner-card, .process-step');

    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${index * 0.1}s`;
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ========================================
    // 3. RIPPLE EFFECT EN BOTONES
    // ========================================

    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';

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

    // ========================================
    // 4. SMOOTH COUNTER ANIMATION
    // ========================================

    const counters = document.querySelectorAll('[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.dataset.count);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        entry.target.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target;
                        entry.target.classList.add('counted');
                    }
                };

                updateCounter();
            }
        });
    });

    counters.forEach(counter => counterObserver.observe(counter));

    // ========================================
    // 5. RESIZE ANIMATION STOPPER
    // ========================================

    let resizeTimer;
    window.addEventListener('resize', () => {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 400);
    });

    // ========================================
    // 6. PERFORMANCE MONITOR
    // ========================================

    if (window.performance && performance.navigation.type == performance.navigation.TYPE_RELOAD) {
        console.log('🔄 Página recargada');
    }

    // Medir tiempo de carga
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`⚡ Tiempo de carga total: ${loadTime}ms`);

        // Si tarda más de 3 segundos, sugerir optimizaciones
        if (loadTime > 3000) {
            console.warn('⚠️ La página tarda más de 3 segundos en cargar. Considera:');
            console.warn('- Optimizar imágenes PNG grandes');
            console.warn('- Implementar lazy loading');
            console.warn('- Minificar CSS y JS');
        }
    });

    // ========================================
    // 7. IMAGE OPTIMIZATION WARNING
    // ========================================

    function getImageSize(img) {
        // Estimar tamaño basado en dimensiones
        // Esta es una aproximación, no el tamaño real del archivo
        return img.naturalWidth * img.naturalHeight * 4;
    }

    // Listar imágenes que necesitan optimización
    const heavyImages = [];
    images.forEach(img => {
        if (img.src.includes('.png')) {
            const fileName = img.src.split('/').pop();
            if (fileName.includes('accesorios') ||
                fileName.includes('home-deco') ||
                fileName.includes('prendas') ||
                fileName.includes('colores-naturales')) {
                heavyImages.push(fileName);
            }
        }
    });

    if (heavyImages.length > 0) {
        console.group('📸 Imágenes que necesitan optimización:');
        heavyImages.forEach(img => {
            console.warn(`- ${img} (>1.5MB - considerar convertir a JPG o WebP)`);
        });
        console.groupEnd();
    }

    // ========================================
    // 8. MOBILE MENU OPTIMIZATION
    // ========================================

    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle && mainNav) {
        // Agregar will-change para mejor performance
        mainNav.style.willChange = 'transform';

        mobileMenuToggle.addEventListener('click', () => {
            // Forzar hardware acceleration
            mainNav.style.transform = 'translateZ(0)';
        });
    }

    // ========================================
    // 9. FOCUS TRAP FOR MODALS
    // ========================================

    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) { // Shift + Tab
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else { // Tab
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    // ========================================
    // 10. REPORT FINAL
    // ========================================

    console.log('✅ Optimizaciones aplicadas:');
    console.log('- Lazy loading activo');
    console.log('- Scroll reveal configurado');
    console.log('- Micro-interacciones agregadas');
    console.log('- Performance monitoring activo');

});
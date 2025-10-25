/**
 * ALPACA LINK - JavaScript Principal
 * Funcionalidad e interactividad del sitio
 */

// ========================================
// MOBILE MENU TOGGLE
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace
        const navLinks = mainNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });

        // Cerrar menú al hacer click fuera
        document.addEventListener('click', function(event) {
            const isClickInsideNav = mainNav.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });
    }
});

// ========================================
// STICKY HEADER ON SCROLL
// ========================================
window.addEventListener('scroll', function() {
    const header = document.getElementById('mainHeader');

    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
});

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Ignorar enlaces vacíos o solo "#"
        if (href === '#' || href === '') {
            return;
        }

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();

            const headerHeight = document.getElementById('mainHeader').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// ACTIVE NAV LINK ON SCROLL
// ========================================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= (sectionTop - 200)) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// LANGUAGE SELECTOR
// ========================================
const langButtons = document.querySelectorAll('.lang-btn');

langButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remover clase active de todos los botones
        langButtons.forEach(btn => btn.classList.remove('active'));

        // Agregar clase active al botón clickeado
        this.classList.add('active');

        const selectedLang = this.getAttribute('data-lang');

        // Aquí puedes agregar lógica para cambiar el idioma
        // Por ejemplo, redirigir a una versión del sitio en otro idioma
        // o cargar traducciones dinámicamente

        console.log(`Idioma seleccionado: ${selectedLang}`);

        // TODO: Implementar cambio de idioma
        // switchLanguage(selectedLang);
    });
});

// ========================================
// INTERSECTION OBSERVER - ANIMACIONES AL SCROLL
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos que deben animarse
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.producto-card, .trust-item, .why-item');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ========================================
// FORM VALIDATION (para páginas de contacto)
// ========================================
function validateForm(formId) {
    const form = document.getElementById(formId);

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'var(--color-primary)';

                // Agregar mensaje de error si no existe
                if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                    const errorMsg = document.createElement('span');
                    errorMsg.classList.add('error-message');
                    errorMsg.style.color = 'var(--color-primary)';
                    errorMsg.style.fontSize = '0.875rem';
                    errorMsg.textContent = 'Este campo es requerido';
                    field.parentNode.insertBefore(errorMsg, field.nextSibling);
                }
            } else {
                field.style.borderColor = '';
                const errorMsg = field.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.remove();
                }
            }
        });

        // Validar email
        const emailFields = form.querySelectorAll('[type="email"]');
        emailFields.forEach(field => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (field.value && !emailRegex.test(field.value)) {
                isValid = false;
                field.style.borderColor = 'var(--color-primary)';
            }
        });

        if (isValid) {
            // Enviar el formulario
            console.log('Formulario válido, enviando...');

            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.style.cssText = 'background: #4CAF50; color: white; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;';
            successMsg.textContent = 'Formulario enviado correctamente. Nos contactaremos pronto.';
            form.insertBefore(successMsg, form.firstChild);

            // Submit form after showing message
            setTimeout(() => {
                form.submit();
            }, 1000);
        }
    });
}

// ========================================
// ANALYTICS TRACKING (Google Analytics)
// ========================================
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Track CTA clicks
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function() {
        const btnText = this.textContent.trim();
        trackEvent('CTA', 'Click', btnText);
    });
});

// Track WhatsApp clicks
const whatsappBtn = document.querySelector('.whatsapp-float');
if (whatsappBtn) {
    whatsappBtn.addEventListener('click', function() {
        trackEvent('Contact', 'WhatsApp Click', 'Floating Button');
    });
}

// ========================================
// FAQ ACCORDION (Para página de inicio)
// ========================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Cerrar todos los items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Abrir el clickeado si no estaba activo
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ========================================
// ANIMACIONES MEJORADAS AL SCROLL
// ========================================
// Animación para las cards de productos
const productCards = document.querySelectorAll('.producto-card');
productCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.6s ease';
    card.style.transitionDelay = `${index * 0.1}s`;
});

const productObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

productCards.forEach(card => {
    productObserver.observe(card);
});

// Animación para los items de why-us
const whyItems = document.querySelectorAll('.why-item');
whyItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'all 0.6s ease';
    item.style.transitionDelay = `${index * 0.2}s`;
});

const whyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.3 });

whyItems.forEach(item => {
    whyObserver.observe(item);
});

// ========================================
// LAZY LOADING IMAGES
// ========================================
if ('loading' in HTMLImageElement.prototype) {
    // Browser soporta lazy loading nativo
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback para navegadores antiguos
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log('%cAlpaca Link - B2B Premium Alpaca Fiber', 'color: #BF1120; font-size: 20px; font-weight: bold;');
console.log('%cDesarrollado por Itaca Marketing', 'color: #595646; font-size: 14px;');

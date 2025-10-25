/**
 * Fix Classes - Correcciones automáticas de clases
 * Aplica las clases correctas para el diseño profesional
 */

document.addEventListener('DOMContentLoaded', function() {

    // 1. Corregir sección de productos
    const productCards = document.querySelectorAll('.producto-card');
    productCards.forEach(card => {
        card.className = 'product-card';

        const img = card.querySelector('.producto-image');
        if (img) {
            img.className = 'product-card-image';
        }

        const content = card.querySelector('.producto-content');
        if (content) {
            content.className = 'product-card-content';
        }

        const specs = card.querySelector('.producto-specs');
        if (specs) {
            specs.className = 'product-features';
        }
    });

    // 2. Corregir sección "Por qué elegirnos"
    const whySection = document.querySelector('.why-us-section');
    if (whySection) {
        // Reorganizar estructura
        const content = whySection.querySelector('.why-us-content');
        if (content) {
            content.className = 'why-us-grid';

            const text = content.querySelector('.why-us-text');
            if (text) {
                text.className = 'why-us-content';

                // Convertir why-item a why-us-card
                const items = text.querySelectorAll('.why-item');
                items.forEach(item => {
                    item.className = 'why-us-card';

                    const h3 = item.querySelector('h3');
                    if (h3) {
                        h3.outerHTML = `<h4>${h3.textContent}</h4>`;
                    }

                    const subtitle = item.querySelector('.why-subtitle');
                    if (subtitle) {
                        subtitle.outerHTML = `<p>${subtitle.textContent}</p>`;
                    }
                });
            }

            const visual = content.querySelector('.why-us-visual');
            if (visual) {
                visual.className = 'why-us-image';

                const badge = visual.querySelector('.guinness-badge');
                if (badge) {
                    badge.className = 'achievement-badge';
                    const p = badge.querySelector('p');
                    if (p && p.querySelector('strong')) {
                        const text = p.querySelector('strong').textContent;
                        badge.innerHTML = `
                            <h5>Guinness World Records</h5>
                            <p>${text.replace(/"/g, '')}</p>
                        `;
                    }
                }
            }
        }
    }

    // 3. Corregir timeline del proceso
    const processTimeline = document.querySelector('.process-timeline');
    if (processTimeline) {
        processTimeline.className = 'process-grid';

        const steps = processTimeline.querySelectorAll('.process-step');
        steps.forEach((step, index) => {
            // Asegurar número visible
            let numberDiv = step.querySelector('.step-number');
            if (!numberDiv) {
                numberDiv = document.createElement('div');
                numberDiv.className = 'step-number';
                numberDiv.textContent = index + 1;
                step.insertBefore(numberDiv, step.firstChild);
            }

            // Crear contenedor para contenido
            const icon = step.querySelector('.step-icon');
            const h4 = step.querySelector('h4');
            const p = step.querySelector('p');

            if (!step.querySelector('.step-content')) {
                const contentDiv = document.createElement('div');
                contentDiv.className = 'step-content';

                if (h4) {
                    contentDiv.appendChild(h4);
                }
                if (p) {
                    contentDiv.appendChild(p);
                }

                // Eliminar ícono antiguo si existe
                if (icon) {
                    icon.remove();
                }

                step.appendChild(contentDiv);
            }
        });
    }

    // 4. Corregir CTA final
    const ctaSection = document.querySelector('.final-cta-section');
    if (ctaSection) {
        ctaSection.className = 'cta-section';

        const content = ctaSection.querySelector('.final-cta-content');
        if (content) {
            content.className = 'cta-content';

            const buttons = content.querySelector('.final-cta-buttons');
            if (buttons) {
                buttons.className = 'cta-buttons';
            }

            const info = content.querySelector('.final-cta-info');
            if (info) {
                info.style.marginTop = '40px';
                info.style.display = 'flex';
                info.style.justifyContent = 'center';
                info.style.gap = '30px';
            }
        }
    }

    // 5. Eliminar todas las clases de animación
    const animatedElements = document.querySelectorAll('[class*="animate-"], .typing-text, .floating, [data-parallax]');
    animatedElements.forEach(el => {
        // Remover clases de animación
        const classes = el.className.split(' ').filter(cls => !cls.includes('animate-'));
        el.className = classes.join(' ');

        // Remover atributos de animación
        el.removeAttribute('data-parallax');
        el.style.animation = 'none';
        el.style.animationDelay = '0s';
    });

    // 6. Normalizar colores fuera de paleta
    const wrongColorElements = document.querySelectorAll('[style*="#28a745"], [style*="#6c757d"], [style*="#ffc107"]');
    wrongColorElements.forEach(el => {
        el.style.cssText = el.style.cssText
            .replace(/#28a745/gi, '#A62C21')  // Verde a rojo ladrillo
            .replace(/#6c757d/gi, '#595646')  // Gris Bootstrap a gris oliva
            .replace(/#ffc107/gi, '#BF1120'); // Amarillo a rojo carmesí
    });

    console.log('✅ Clases profesionales aplicadas correctamente');
});
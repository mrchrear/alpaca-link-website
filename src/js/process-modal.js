/**
 * ALPACA LINK - Sistema de Modal Educativo y Proceso
 * Asegura que los usuarios entiendan el proceso de 2 etapas
 */

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // BANNER DE PROCESO
    // ========================================

    // Banner desactivado
    // if (!sessionStorage.getItem('banner-closed')) {
    //     showProcessBanner();
    // }

    function showProcessBanner() {
        const banner = document.createElement('div');
        banner.className = 'process-notice-banner';
        banner.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span><strong>IMPORTANTE:</strong> No podemos dar precios ni tiempos exactos sin evaluar su muestra. Trabajamos en 2 etapas: Muestra → Producción</span>
            <button class="close-banner" aria-label="Cerrar">×</button>
        `;

        document.body.insertBefore(banner, document.body.firstChild);
        document.body.classList.add('has-banner');

        // Ajustar padding del body para el banner
        document.body.style.paddingTop = '50px';

        // Cerrar banner
        banner.querySelector('.close-banner').addEventListener('click', function() {
            banner.style.animation = 'slideUp 0.3s ease reverse';
            setTimeout(() => {
                banner.remove();
                document.body.classList.remove('has-banner');
                document.body.style.paddingTop = '0';
                sessionStorage.setItem('banner-closed', 'true');
            }, 300);
        });
    }

    // ========================================
    // MODAL EDUCATIVO
    // ========================================

    // Modal educativo desactivado
    // if (!localStorage.getItem('understands-process')) {
    //     // Mostrar modal después de 3 segundos en la página
    //     // setTimeout(showEducationalModal, 3000);
    // }

    function showEducationalModal() {
        // Crear overlay
        const overlay = document.createElement('div');
        overlay.className = 'process-modal-overlay';

        // Crear modal
        const modalHTML = `
            <div class="process-modal">
                <button class="close-modal" aria-label="Cerrar">×</button>
                <h2>¿ENTIENDE NUESTRO PROCESO?</h2>
                <p style="text-align: center; color: #666; margin-bottom: 30px;">
                    En Alpaca Link trabajamos de manera personalizada.
                    Cada proyecto es único y requiere evaluación individual.
                </p>

                <div class="process-steps">
                    <div class="process-step-item">
                        <div class="process-step-number">1</div>
                        <div class="process-step-content">
                            <h4>Desarrollamos su muestra</h4>
                            <p>Basándonos en su diseño o idea (1-5 días)</p>
                        </div>
                    </div>

                    <div class="process-step-item">
                        <div class="process-step-number">2</div>
                        <div class="process-step-content">
                            <h4>Determinamos costo exacto</h4>
                            <p>Evaluamos fibra, técnica, complejidad y tiempo</p>
                        </div>
                    </div>

                    <div class="process-step-item">
                        <div class="process-step-number">3</div>
                        <div class="process-step-content">
                            <h4>Usted aprueba la muestra</h4>
                            <p>Revisión de calidad y costo unitario</p>
                        </div>
                    </div>

                    <div class="process-step-item">
                        <div class="process-step-number">4</div>
                        <div class="process-step-content">
                            <h4>Producimos su pedido</h4>
                            <p>30-60 días para jersey, variable según producto</p>
                        </div>
                    </div>
                </div>

                <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 20px 0;">
                    <p style="margin: 0; text-align: center; color: #856404;">
                        <strong>⚠️ No hay precios fijos porque cada diseño es diferente</strong>
                    </p>
                </div>

                <div class="modal-buttons">
                    <button class="btn-understand">ENTIENDO EL PROCESO</button>
                    <button class="btn-need-help">NECESITO MÁS INFORMACIÓN</button>
                </div>
            </div>
        `;

        overlay.innerHTML = modalHTML;
        document.body.appendChild(overlay);

        // Activar modal con animación
        setTimeout(() => overlay.classList.add('active'), 10);

        // Event listeners
        overlay.querySelector('.close-modal').addEventListener('click', closeModal);
        overlay.querySelector('.btn-understand').addEventListener('click', function() {
            localStorage.setItem('understands-process', 'true');
            closeModal();
        });
        overlay.querySelector('.btn-need-help').addEventListener('click', function() {
            localStorage.setItem('understands-process', 'partial');
            closeModal();
            // Redirigir a WhatsApp
            window.open('https://wa.me/51948734691?text=Hola, necesito entender mejor su proceso de trabajo', '_blank');
        });

        // Cerrar al hacer clic fuera
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeModal();
            }
        });

        function closeModal() {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 300);
        }
    }

    // ========================================
    // INTERCEPTAR CLICKS EN COTIZAR
    // ========================================

    // Cambiar todos los enlaces de "Cotizar" a "Iniciar Evaluación"
    document.querySelectorAll('a').forEach(link => {
        if (link.textContent.includes('COTIZAR') ||
            link.textContent.includes('Cotizar') ||
            link.textContent.includes('cotización')) {

            // Intercepción desactivada
            // link.addEventListener('click', function(e) {
            //     if (!localStorage.getItem('understands-process')) {
            //         e.preventDefault();
            //         showEducationalModal();
            //     }
            });
        }
    });

    // ========================================
    // TOOLTIPS PARA PRECIOS/TIEMPOS
    // ========================================

    // Agregar tooltips a elementos con información de precio o tiempo
    const priceElements = document.querySelectorAll('.producto-info span, .spec-value, td');

    priceElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes('kg') || text.includes('semana') || text.includes('día') || text.includes('usd')) {
            element.classList.add('price-tooltip');
            element.setAttribute('data-tooltip', 'Valor referencial. Su caso requiere evaluación específica.');
        }
    });

    // ========================================
    // FORMULARIO INTELIGENTE
    // ========================================

    const cotizacionForm = document.getElementById('cotizacionForm');
    if (cotizacionForm) {
        // Agregar pregunta inicial antes del formulario
        const questionDiv = document.createElement('div');
        questionDiv.className = 'initial-question';
        questionDiv.style.cssText = `
            background: linear-gradient(135deg, #e3f2fd, #bbdefb);
            padding: 30px;
            border-radius: 15px;
            margin-bottom: 30px;
            text-align: center;
        `;

        questionDiv.innerHTML = `
            <h3 style="color: #0d47a1; margin-bottom: 20px;">¿Ya tiene un diseño o muestra?</h3>
            <div style="display: flex; gap: 20px; justify-content: center;">
                <button class="btn-has-design" style="padding: 15px 30px; background: #4caf50; color: white; border: none; border-radius: 25px; cursor: pointer; font-weight: 600;">
                    SÍ, TENGO DISEÑO
                </button>
                <button class="btn-no-design" style="padding: 15px 30px; background: #ff9800; color: white; border: none; border-radius: 25px; cursor: pointer; font-weight: 600;">
                    NO, NECESITO DESARROLLARLO
                </button>
            </div>
        `;

        cotizacionForm.parentNode.insertBefore(questionDiv, cotizacionForm);
        cotizacionForm.style.display = 'none';

        // Mostrar formulario según respuesta
        questionDiv.querySelector('.btn-has-design').addEventListener('click', function() {
            cotizacionForm.style.display = 'block';
            questionDiv.style.display = 'none';
        });

        questionDiv.querySelector('.btn-no-design').addEventListener('click', function() {
            questionDiv.innerHTML = `
                <div style="background: #fff3cd; padding: 20px; border-radius: 10px;">
                    <h3 style="color: #856404;">Primero necesita desarrollar una muestra</h3>
                    <p>Le ayudaremos a crear su diseño. Este es el primer paso obligatorio para determinar costos y tiempos exactos.</p>
                    <button onclick="location.href='#muestras'" style="padding: 12px 25px; background: #ffc107; border: none; border-radius: 20px; cursor: pointer; margin-top: 15px; font-weight: 600;">
                        IR A SOLICITUD DE MUESTRAS →
                    </button>
                </div>
            `;
        });
    }

    // ========================================
    // ANIMACIONES AL SCROLL
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

    // Observar elementos de evaluación
    document.querySelectorAll('.evaluation-required, .process-infographic').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // ========================================
    // TRACKING DE COMPRENSIÓN
    // ========================================

    // Registrar cuántas veces el usuario intenta cotizar sin entender
    let attemptCount = parseInt(localStorage.getItem('quote-attempts') || '0');

    document.querySelectorAll('[href*="contacto"], [href*="cotizar"]').forEach(link => {
        link.addEventListener('click', function() {
            if (!localStorage.getItem('understands-process')) {
                attemptCount++;
                localStorage.setItem('quote-attempts', attemptCount.toString());

                // Si intenta más de 3 veces, mostrar ayuda más directa
                if (attemptCount > 3) {
                    alert('Parece que necesita ayuda. Lo contactaremos por WhatsApp para explicarle el proceso.');
                    window.open('https://wa.me/51948734691?text=Necesito ayuda para entender el proceso de cotización', '_blank');
                }
            }
        });
    });
});

// ========================================
// FUNCIÓN GLOBAL PARA MOSTRAR MODAL
// ========================================
window.showProcessEducation = function() {
    const event = new Event('show-education-modal');
    document.dispatchEvent(event);
};
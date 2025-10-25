/**
 * ALPACA LINK - JavaScript para Página de Contacto
 * Validación de formularios e interactividad
 */

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // FORM VALIDATION - COTIZACIÓN
    // ========================================
    const cotizacionForm = document.getElementById('cotizacionForm');

    if (cotizacionForm) {
        cotizacionForm.addEventListener('submit', function(e) {
            // Note: We're removing e.preventDefault() to allow form submission

            // Validar campos requeridos
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (field.type === 'checkbox') {
                    // Para checkboxes individuales
                    if (!field.checked) {
                        isValid = false;
                        showFieldError(field, 'Debe aceptar este campo');
                    } else {
                        clearFieldError(field);
                    }
                } else if (!field.value.trim()) {
                    // Para campos de texto, email, select, textarea
                    isValid = false;
                    showFieldError(field, 'Este campo es requerido');
                } else {
                    clearFieldError(field);
                }
            });

            // Validar email
            const emailField = document.getElementById('email');
            if (emailField && emailField.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    isValid = false;
                    showFieldError(emailField, 'Por favor ingrese un email válido');
                }
            }

            // Validar que al menos un producto esté seleccionado
            const productosChecked = document.querySelectorAll('input[name="producto[]"]:checked').length;
            if (productosChecked === 0) {
                isValid = false;
                alert('Por favor seleccione al menos un producto de interés');
            }

            if (!isValid) {
                e.preventDefault(); // Solo prevenir si hay errores
                showErrorMessage('Por favor complete todos los campos requeridos correctamente.');
            } else {
                // Form es válido - mostrar mensaje de éxito antes de enviar
                showSuccessMessage('¡Enviando su solicitud de cotización! Nos pondremos en contacto en 24-48 horas.');

                // Permitir que el formulario se envíe via mailto
                setTimeout(() => {
                    this.submit();
                }, 500);
            }
        });
    }

    // ========================================
    // FORM VALIDATION - MUESTRAS
    // ========================================
    const muestrasForm = document.getElementById('muestrasForm');

    if (muestrasForm) {
        muestrasForm.addEventListener('submit', function(e) {
            // Note: We're removing e.preventDefault() to allow form submission

            // Validar campos requeridos
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (field.type === 'checkbox') {
                    if (!field.checked) {
                        isValid = false;
                        showFieldError(field, 'Debe aceptar este campo');
                    } else {
                        clearFieldError(field);
                    }
                } else if (!field.value.trim()) {
                    isValid = false;
                    showFieldError(field, 'Este campo es requerido');
                } else {
                    clearFieldError(field);
                }
            });

            // Validar email
            const emailMuestrasField = document.getElementById('emailMuestras');
            if (emailMuestrasField && emailMuestrasField.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailMuestrasField.value)) {
                    isValid = false;
                    showFieldError(emailMuestrasField, 'Por favor ingrese un email válido');
                }
            }

            // Validar que al menos un tipo de muestra esté seleccionado
            const muestrasChecked = document.querySelectorAll('input[name="tipoMuestra[]"]:checked').length;
            if (muestrasChecked === 0) {
                isValid = false;
                alert('Por favor seleccione al menos un tipo de muestra');
            }

            if (!isValid) {
                e.preventDefault(); // Solo prevenir si hay errores
                showErrorMessage('Por favor complete todos los campos requeridos correctamente.');
            } else {
                // Form es válido - mostrar mensaje de éxito antes de enviar
                showSuccessMessage('¡Enviando solicitud de muestras! Confirmaremos disponibilidad y coordinaremos el envío.');

                // Permitir que el formulario se envíe via mailto
                setTimeout(() => {
                    this.submit();
                }, 500);
            }
        });
    }

    // ========================================
    // FAQ SEARCH
    // ========================================
    const faqSearch = document.getElementById('faqSearch');
    if (faqSearch) {
        faqSearch.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const faqItemElements = document.querySelectorAll('.faq-item');

            faqItemElements.forEach(item => {
                const questionText = item.querySelector('.faq-question span').textContent.toLowerCase();
                const answerText = item.querySelector('.faq-answer').textContent.toLowerCase();

                if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });

            // Si no hay resultados, mostrar mensaje
            const visibleItems = document.querySelectorAll('.faq-item:not(.hidden)');
            let noResultsMsg = document.querySelector('.no-results-message');

            if (visibleItems.length === 0 && searchTerm !== '') {
                if (!noResultsMsg) {
                    noResultsMsg = document.createElement('div');
                    noResultsMsg.className = 'no-results-message';
                    noResultsMsg.innerHTML = '<i class="fas fa-search"></i> No se encontraron resultados para tu búsqueda';
                    noResultsMsg.style.cssText = 'text-align: center; padding: 2rem; color: var(--color-gray-medium);';
                    document.querySelector('.faq-list').appendChild(noResultsMsg);
                }
            } else if (noResultsMsg) {
                noResultsMsg.remove();
            }
        });
    }

    // ========================================
    // FAQ ACCORDION
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
    // HELPER FUNCTIONS
    // ========================================

    function showFieldError(field, message) {
        // Eliminar error previo si existe
        clearFieldError(field);

        // Añadir clase de error al campo
        field.classList.add('error');

        // Crear y mostrar mensaje de error
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#BF1120';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';

        // Insertar después del campo
        if (field.parentElement) {
            field.parentElement.appendChild(errorDiv);
        }
    }

    function clearFieldError(field) {
        field.classList.remove('error');
        const errorMessage = field.parentElement?.querySelector('.field-error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    function showErrorMessage(message) {
        // Crear overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;

        // Crear mensaje
        const messageBox = document.createElement('div');
        messageBox.style.cssText = `
            background: white;
            padding: 2.5rem;
            border-radius: 8px;
            text-align: center;
            max-width: 400px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        `;

        messageBox.innerHTML = `
            <i class="fas fa-exclamation-circle" style="font-size: 3rem; color: #e74c3c; margin-bottom: 1rem;"></i>
            <h3 style="margin: 0 0 1rem 0; color: #333;">Error en el formulario</h3>
            <p style="color: #666; margin: 0 0 1.5rem 0;">${message}</p>
            <button style="background: #e74c3c; color: white; border: none; padding: 0.75rem 2rem; border-radius: 4px; cursor: pointer; font-size: 1rem;">
                Entendido
            </button>
        `;

        overlay.appendChild(messageBox);
        document.body.appendChild(overlay);

        // Cerrar al hacer clic
        overlay.addEventListener('click', function() {
            overlay.remove();
        });

        // Auto cerrar después de 5 segundos
        setTimeout(() => {
            overlay.remove();
        }, 5000);
    }

    function showSuccessMessage(message) {
        // Crear overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;

        // Crear modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            background: white;
            padding: 3rem;
            border-radius: 8px;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
        `;

        modal.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem; color: #28a745;">✓</div>
            <h3 style="color: #BF1120; margin-bottom: 1rem;">¡Mensaje Enviado!</h3>
            <p style="color: #595646; line-height: 1.6; margin-bottom: 2rem;">${message}</p>
            <button onclick="this.closest('[style*=fixed]').remove()"
                    style="background: #BF1120; color: white; border: none; padding: 0.875rem 2rem;
                           border-radius: 4px; font-weight: 600; cursor: pointer; font-size: 1rem;">
                CERRAR
            </button>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Cerrar al hacer clic fuera del modal
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }

    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = 100;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

});

/**
 * ALPACA LINK - JavaScript para Página de Productos
 * Funcionalidad específica del catálogo
 */

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // MOBILE SIDEBAR TOGGLE
    // ========================================
    const sidebarNav = document.getElementById('sidebarNav');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarClose = document.getElementById('sidebarClose');

    // Mostrar botón toggle en móvil
    if (window.innerWidth <= 968) {
        if (sidebarToggle) {
            sidebarToggle.style.display = 'block';
        }
    }

    // Abrir sidebar
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebarNav.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevenir scroll del body
        });
    }

    // Cerrar sidebar
    if (sidebarClose) {
        sidebarClose.addEventListener('click', function() {
            sidebarNav.classList.remove('active');
            document.body.style.overflow = ''; // Restaurar scroll
        });
    }

    // Cerrar sidebar al hacer click en un link (móvil)
    const sidebarLinksAll = document.querySelectorAll('.sidebar-nav a');
    sidebarLinksAll.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 968) {
                sidebarNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Ajustar al cambiar tamaño de ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 968) {
            if (sidebarToggle) {
                sidebarToggle.style.display = 'block';
            }
        } else {
            if (sidebarToggle) {
                sidebarToggle.style.display = 'none';
            }
            sidebarNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ========================================
    // SIDEBAR STICKY SCROLL SYNC
    // ========================================
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.product-section');

    // Highlight active section in sidebar
    window.addEventListener('scroll', function() {
        let currentSection = '';
        const scrollPosition = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // ========================================
    // SMOOTH SCROLL FOR SIDEBAR LINKS
    // ========================================
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.getElementById('mainHeader').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // SUB-MENU SMOOTH SCROLL
    // ========================================
    const subMenuLinks = document.querySelectorAll('.sub-menu a');

    subMenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.getElementById('mainHeader').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // LANGUAGE TOGGLE BUTTONS
    // ========================================
    const langToggleBtns = document.querySelectorAll('.lang-toggle-btn');

    langToggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            langToggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const lang = this.textContent.trim();
            console.log(`Language switched to: ${lang}`);

            // TODO: Implementar cambio de idioma
            // loadLanguageContent(lang);
        });
    });

    // ========================================
    // COLOR SWATCH TOOLTIP
    // ========================================
    const colorSwatches = document.querySelectorAll('.color-swatch');

    colorSwatches.forEach(swatch => {
        swatch.addEventListener('mouseenter', function() {
            const colorName = this.getAttribute('title');

            // Crear tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'color-tooltip';
            tooltip.textContent = colorName;
            tooltip.style.cssText = `
                position: absolute;
                background: var(--color-black);
                color: var(--color-white);
                padding: 0.5rem 1rem;
                border-radius: 4px;
                font-size: 0.875rem;
                z-index: 1000;
                pointer-events: none;
                white-space: nowrap;
            `;

            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;

            this.tooltip = tooltip;
        });

        swatch.addEventListener('mouseleave', function() {
            if (this.tooltip) {
                this.tooltip.remove();
                this.tooltip = null;
            }
        });
    });

    // ========================================
    // DOWNLOAD LINK TRACKING & PLACEHOLDER
    // ========================================
    const downloadLinks = document.querySelectorAll('.download-link, .download-item');

    downloadLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior

            const fileName = this.querySelector('.download-name, span:nth-child(2)')?.textContent ||
                            this.textContent.trim() || 'Unknown';

            // Show temporary message that PDFs are being prepared
            const messageDiv = document.createElement('div');
            messageDiv.className = 'download-message';
            messageDiv.innerHTML = `
                <i class="fas fa-info-circle"></i>
                <span>Los documentos PDF están siendo preparados. Por favor contacte a comercial@alpaca-link.com para solicitar ${fileName}.</span>
            `;
            messageDiv.style.cssText = `
                position: fixed;
                top: 100px;
                left: 50%;
                transform: translateX(-50%);
                background: var(--color-secondary);
                color: white;
                padding: 1rem 2rem;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                z-index: 10000;
                max-width: 500px;
                text-align: center;
                animation: slideDown 0.3s ease;
            `;

            // Add animation if not exists
            if (!document.querySelector('#download-message-animation')) {
                const style = document.createElement('style');
                style.id = 'download-message-animation';
                style.innerHTML = `
                    @keyframes slideDown {
                        from {
                            opacity: 0;
                            transform: translateX(-50%) translateY(-20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateX(-50%) translateY(0);
                        }
                    }
                `;
                document.head.appendChild(style);
            }

            document.body.appendChild(messageDiv);

            // Remove message after 5 seconds
            setTimeout(() => {
                messageDiv.style.animation = 'slideDown 0.3s ease reverse';
                setTimeout(() => {
                    messageDiv.remove();
                }, 300);
            }, 5000);

            // Track download attempt
            if (typeof trackEvent === 'function') {
                trackEvent('Download Attempt', 'PDF', fileName);
            }

            console.log(`Download placeholder shown for: ${fileName}`);
        });
    });

    // ========================================
    // PRODUCT CTA TRACKING
    // ========================================
    const productCTAs = document.querySelectorAll('.product-cta .btn');

    productCTAs.forEach(btn => {
        btn.addEventListener('click', function() {
            const productArticle = this.closest('.product-detail');
            const productName = productArticle.querySelector('h3')?.textContent || 'Unknown Product';
            const actionType = this.textContent.trim();

            if (typeof trackEvent === 'function') {
                trackEvent('Product CTA', actionType, productName);
            }

            console.log(`Product CTA: ${actionType} - ${productName}`);
        });
    });

    // ========================================
    // STICKY SIDEBAR (Enhanced)
    // ========================================
    const sidebar = document.querySelector('.sidebar-nav');

    if (sidebar) {
        let lastScrollTop = 0;

        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const header = document.getElementById('mainHeader');
            const headerHeight = header ? header.offsetHeight : 0;

            // Ajustar top del sidebar según scroll
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                sidebar.style.top = `${headerHeight + 20}px`;
            } else {
                // Scrolling up
                sidebar.style.top = `${headerHeight + 20}px`;
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    // ========================================
    // RESPONSIVE SIDEBAR TOGGLE (Mobile)
    // ========================================
    if (window.innerWidth <= 968) {
        const sidebarNav = document.querySelector('.sidebar-nav');

        if (sidebarNav) {
            // Crear botón toggle para mobile
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'sidebar-toggle-mobile';
            toggleBtn.innerHTML = '📋 Ver Índice';
            toggleBtn.style.cssText = `
                position: fixed;
                bottom: 80px;
                right: 20px;
                background: var(--color-primary);
                color: white;
                border: none;
                padding: 1rem 1.5rem;
                border-radius: 50px;
                font-weight: 600;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                z-index: 998;
                cursor: pointer;
            `;

            document.body.appendChild(toggleBtn);

            // Toggle sidebar visibility
            toggleBtn.addEventListener('click', function() {
                sidebarNav.classList.toggle('mobile-visible');

                if (sidebarNav.classList.contains('mobile-visible')) {
                    sidebarNav.style.cssText += `
                        position: fixed;
                        top: 80px;
                        left: 20px;
                        right: 20px;
                        z-index: 999;
                        max-height: 80vh;
                        overflow-y: auto;
                    `;
                    toggleBtn.innerHTML = '✕ Cerrar';
                } else {
                    sidebarNav.style.position = '';
                    sidebarNav.style.top = '';
                    sidebarNav.style.left = '';
                    sidebarNav.style.right = '';
                    sidebarNav.style.zIndex = '';
                    toggleBtn.innerHTML = '📋 Ver Índice';
                }
            });

            // Cerrar sidebar al hacer click en un link
            sidebarLinks.forEach(link => {
                link.addEventListener('click', function() {
                    if (sidebarNav.classList.contains('mobile-visible')) {
                        sidebarNav.classList.remove('mobile-visible');
                        sidebarNav.style.position = '';
                        toggleBtn.innerHTML = '📋 Ver Índice';
                    }
                });
            });
        }
    }

    // ========================================
    // TABLE RESPONSIVE SCROLL HINT
    // ========================================
    const tableResponsives = document.querySelectorAll('.table-responsive');

    tableResponsives.forEach(tableResponsive => {
        const table = tableResponsive.querySelector('table');

        if (table && table.scrollWidth > tableResponsive.clientWidth) {
            // Agregar indicador de scroll
            const scrollHint = document.createElement('div');
            scrollHint.className = 'scroll-hint';
            scrollHint.innerHTML = '<i class="fas fa-arrows-left-right"></i> Desliza para ver más';
            scrollHint.style.cssText = `
                text-align: center;
                padding: 0.75rem;
                background: linear-gradient(90deg, rgba(242,242,242,0.9) 0%, rgba(242,242,242,0.9) 100%);
                color: var(--color-gray-medium);
                font-size: 0.875rem;
                font-weight: 500;
                border-radius: 4px;
                margin-top: 0.5rem;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                animation: pulse 2s infinite;
            `;

            // Añadir animación CSS si no existe
            if (!document.querySelector('#scroll-hint-animation')) {
                const style = document.createElement('style');
                style.id = 'scroll-hint-animation';
                style.innerHTML = `
                    @keyframes pulse {
                        0% { opacity: 1; }
                        50% { opacity: 0.7; }
                        100% { opacity: 1; }
                    }
                `;
                document.head.appendChild(style);
            }

            tableResponsive.parentNode.insertBefore(scrollHint, tableResponsive.nextSibling);

            // Remover hint después de scroll significativo
            let scrollHandled = false;
            tableResponsive.addEventListener('scroll', function() {
                if (this.scrollLeft > 50 && !scrollHandled) {
                    scrollHint.style.transition = 'opacity 0.3s ease';
                    scrollHint.style.opacity = '0';
                    setTimeout(() => {
                        scrollHint.style.display = 'none';
                    }, 300);
                    scrollHandled = true;
                }
            });
        }
    });

    // ========================================
    // EXPAND/COLLAPSE PRODUCT DETAILS (Optional)
    // ========================================
    const productDetails = document.querySelectorAll('.product-detail');

    productDetails.forEach(detail => {
        const fullDetails = detail.querySelector('.product-details-full');

        if (fullDetails) {
            // Crear botón de toggle
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'details-toggle-btn';
            toggleBtn.innerHTML = 'Ver más detalles ▼';
            toggleBtn.style.cssText = `
                background: none;
                border: 2px solid var(--color-primary);
                color: var(--color-primary);
                padding: 0.75rem 1.5rem;
                border-radius: 4px;
                cursor: pointer;
                font-weight: 600;
                margin: 1rem 0;
                transition: all 0.3s ease;
            `;

            // Insertar botón antes de los detalles completos
            fullDetails.parentNode.insertBefore(toggleBtn, fullDetails);

            // Inicialmente ocultar detalles en mobile
            if (window.innerWidth <= 768) {
                fullDetails.style.display = 'none';
            }

            // Toggle functionality
            toggleBtn.addEventListener('click', function() {
                if (fullDetails.style.display === 'none') {
                    fullDetails.style.display = 'block';
                    this.innerHTML = 'Ver menos detalles ▲';
                    this.style.background = 'var(--color-primary)';
                    this.style.color = 'white';
                } else {
                    fullDetails.style.display = 'none';
                    this.innerHTML = 'Ver más detalles ▼';
                    this.style.background = 'none';
                    this.style.color = 'var(--color-primary)';
                }
            });
        }
    });

    // ========================================
    // PRINT PRODUCT SHEET
    // ========================================
    window.printProductSheet = function(productId) {
        const product = document.querySelector(`#${productId}`);
        if (product) {
            const printWindow = window.open('', '', 'height=800,width=1000');
            printWindow.document.write('<html><head><title>Ficha Técnica</title>');
            printWindow.document.write('<style>body{font-family:Arial;padding:20px;}</style>');
            printWindow.document.write('</head><body>');
            printWindow.document.write(product.innerHTML);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
        }
    };

});

// ========================================
// CONSOLE INFO
// ========================================
console.log('%cPágina de Productos - Alpaca Link', 'color: #BF1120; font-size: 16px; font-weight: bold;');
console.log('%cCatálogo técnico B2B cargado correctamente', 'color: #595646; font-size: 12px;');

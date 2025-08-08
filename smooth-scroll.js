/**
 * Smooth Scroll Script - Independiente y fácil de integrar
 * Aplica scroll suave de 1.5s a todos los enlaces que apuntan a sections
 */

(function() {
    'use strict';

    const SCROLL_DURATION = 1500; // 1.5 segundos fijo

    /**
     * Función de easing suave (cubic-bezier)
     */
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    /**
     * Función principal de scroll suave
     */
    function smoothScrollTo(targetElement, offset = 0) {
        const targetPosition = targetElement.offsetTop - offset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / SCROLL_DURATION, 1);
            const easedProgress = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + distance * easedProgress);
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    /**
     * Inicializar el script cuando el DOM esté listo
     */
    function init() {
        // Interceptar todos los enlaces que apuntan a sections
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a[href^="#"]');
            
            if (!link) return;

            const href = link.getAttribute('href');
            if (href === '#') return;

            const targetElement = document.querySelector(href);
            
            // Solo aplicar a sections
            if (targetElement && targetElement.tagName.toLowerCase() === 'section') {
                e.preventDefault();
                
                // Calcular offset si hay navegación fija
                let offset = 0;
                const fixedNav = document.querySelector('nav[style*="fixed"], .navbar-fixed, .fixed-nav, nav.fixed');
                if (fixedNav) {
                    offset = fixedNav.offsetHeight || 80;
                }
                
                smoothScrollTo(targetElement, offset);
            }
        });

        // Opcional: Animaciones de entrada para sections
        setupSectionAnimations();
    }

    /**
     * Configurar animaciones de entrada para sections (opcional)
     */
    function setupSectionAnimations() {
        const sections = document.querySelectorAll('section');
        
        if (sections.length === 0) return;

        // Agregar clase inicial a todas las sections excepto la primera
        sections.forEach((section, index) => {
            if (index > 0) {
                section.classList.add('scroll-hidden');
            }
        });

        // Observer para detectar cuando las sections entran en viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('scroll-hidden');
                    entry.target.classList.add('scroll-visible');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observar todas las sections
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    /**
     * Función pública para scroll programático (opcional)
     */
    window.smoothScrollToSection = function(sectionId, offset = 0) {
        const section = document.querySelector(sectionId);
        if (section && section.tagName.toLowerCase() === 'section') {
            smoothScrollTo(section, offset);
        }
    };

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
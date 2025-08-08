/**
 * Scroll to Top Component - Complemento para smooth-scroll.js
 * Maneja la visibilidad y funcionalidad del botón de scroll hacia arriba
 */

(function() {
    'use strict';

    let scrollToTopButton = null;
    let isVisible = false;
    let ticking = false;

    /**
     * Mostrar/ocultar el botón basado en la posición del scroll
     */
    function updateButtonVisibility() {
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const shouldShow = scrollPosition > windowHeight * 0.3; // Mostrar después de 30% de la altura de la ventana

        if (shouldShow && !isVisible) {
            showButton();
        } else if (!shouldShow && isVisible) {
            hideButton();
        }
    }

    /**
     * Mostrar el botón con animación
     */
    function showButton() {
        if (scrollToTopButton) {
            scrollToTopButton.style.opacity = '1';
            scrollToTopButton.style.transform = 'translateY(0) scale(1)';
            scrollToTopButton.style.pointerEvents = 'auto';
            isVisible = true;
        }
    }

    /**
     * Ocultar el botón con animación
     */
    function hideButton() {
        if (scrollToTopButton) {
            scrollToTopButton.style.opacity = '0';
            scrollToTopButton.style.transform = 'translateY(10px) scale(0.8)';
            scrollToTopButton.style.pointerEvents = 'none';
            isVisible = false;
        }
    }

    /**
     * Manejar el scroll con throttling para mejor rendimiento
     */
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateButtonVisibility();
                ticking = false;
            });
            ticking = true;
        }
    }

    /**
     * Scroll suave hacia arriba
     */
    function scrollToTop() {
        const startPosition = window.pageYOffset;
        const duration = 1500; // Misma duración que el smooth-scroll principal
        let startTime = null;

        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        }

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const easedProgress = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition * (1 - easedProgress));
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    /**
     * Inicializar el componente
     */
    function init() {
        // Buscar el botón existente
        scrollToTopButton = document.querySelector('.scroll-to-top');
        
        if (!scrollToTopButton) {
            console.warn('Scroll to top button not found. Make sure it has class "scroll-to-top" or update the selector.');
            return;
        }

        // Configurar estilos iniciales
        scrollToTopButton.style.opacity = '0';
        scrollToTopButton.style.transform = 'translateY(10px) scale(0.8)';
        scrollToTopButton.style.pointerEvents = 'none';
        scrollToTopButton.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

        // Agregar event listener para el click
        scrollToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            scrollToTop();
        });

        // Agregar event listener para el scroll
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Verificar visibilidad inicial
        updateButtonVisibility();
    }

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
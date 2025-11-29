// ===================================
// 1. NAVEGACIÓN DE CARRUSEL DE CURSOS
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.querySelector('.cards-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (cardsContainer && prevBtn && nextBtn) {
        // Cantidad de desplazamiento (ancho de tarjeta + gap)
        const scrollAmount = 365;
        
        prevBtn.addEventListener('click', function() {
            cardsContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        nextBtn.addEventListener('click', function() {
            cardsContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Actualizar estado activo de los botones según la posición del scroll
        cardsContainer.addEventListener('scroll', function() {
            const maxScroll = cardsContainer.scrollWidth - cardsContainer.clientWidth;
            
            // Desactivar botón izquierdo si está al inicio
            if (cardsContainer.scrollLeft <= 0) {
                prevBtn.classList.remove('active');
            } else {
                prevBtn.classList.add('active');
            }
            
            // Desactivar botón derecho si está al final
            if (cardsContainer.scrollLeft >= maxScroll - 1) {
                nextBtn.classList.remove('active');
            } else {
                nextBtn.classList.add('active');
            }
        });
    }
    
    // ===================================
    // 2. MENU DE USUARIO DESPLEGABLE
    // ===================================
    
    const userBtn = document.querySelector('.user-btn');
    const userDropdown = document.querySelector('.user-dropdown');

    if (userBtn && userDropdown) {
        userBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.style.display = 
                userDropdown.style.display === "block" ? "none" : "block";
        });

        // Cerrar dropdown al hacer click fuera
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.user-menu')) {
                userDropdown.style.display = "none";
            }
        });
    }
    
    // ===================================
    // 3. FORMULARIO DE NEWSLETTER
    // ===================================
    
    const newsletterForm = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('emailInput');
    
    if (newsletterForm && emailInput) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            if (email && validateEmail(email)) {
                alert('¡Gracias por suscribirte! Te enviaremos nuestras novedades a: ' + email);
                emailInput.value = '';
            } else {
                alert('Por favor ingresa un email válido');
            }
        });
    }
    
    // Función auxiliar para validar email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ===================================
    // 4. SMOOTH SCROLL PARA ANCLAS
    // ===================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const faqPreguntas = document.querySelectorAll('.faq-pregunta');

    faqPreguntas.forEach(pregunta => {
        pregunta.addEventListener('click', () => {
            const item = pregunta.closest('.faq-item');
            
            // Alterna la clase 'active' en el item clickeado
            item.classList.toggle('active');

            // (Opcional: Si quieres que solo uno esté abierto a la vez,
            // descomenta el siguiente bloque de código)
            
            // faqPreguntas.forEach(p => {
            //     const otroItem = p.closest('.faq-item');
            //     if (otroItem !== item && otroItem.classList.contains('active')) {
            //         otroItem.classList.remove('active');
            //     }
            // });
        });
    });
});
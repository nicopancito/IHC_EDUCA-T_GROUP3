document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LÓGICA DEL MENÚ DESPLEGABLE ---
    const profileBtn = document.getElementById('profileUserBtn');
    const profileDropdown = document.getElementById('profileUserDropdown');
    const arrow = profileBtn.querySelector('.arrow');

    profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle('active');
        
        // Rotar flecha
        if(profileDropdown.classList.contains('active')){
            arrow.style.transform = 'rotate(180deg)';
        } else {
            arrow.style.transform = 'rotate(0deg)';
        }
    });

    window.addEventListener('click', (e) => {
        if (!profileDropdown.contains(e.target) && !profileBtn.contains(e.target)) {
            profileDropdown.classList.remove('active');
            arrow.style.transform = 'rotate(0deg)';
        }
    });


    // --- 2. LÓGICA DE LAS TARJETAS (RECURSOS) ---
    const grid = document.getElementById('profileCoursesGrid');

    const articles = [
        {
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400", 
            tag: "Métodos",
            duration: "2 Semanas",
            title: "Técnicas de Estudio Eficaz",
            desc: "Aprende a gestionar tu tiempo y mejorar tu retención con el método Pomodoro y mapas mentales.",
            author: "Lina",
            authorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
            oldPrice: 50,
            price: 0
        },
        {
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
            tag: "Tecnología",
            duration: "1 Mes",
            title: "Herramientas Digitales para Estudiantes",
            desc: "Domina Notion, Anki y otras apps esenciales para organizar tu vida académica.",
            author: "Carlos",
            authorImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
            oldPrice: 80,
            price: 20
        },
        {
            image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400",
            tag: "Bienestar",
            duration: "3 Semanas",
            title: "Gestión del Estrés en Exámenes",
            desc: "Estrategias de mindfulness y preparación mental para rendir al máximo bajo presión.",
            author: "Ana",
            authorImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
            oldPrice: 45,
            price: 15
        },
        {
            image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400",
            tag: "Liderazgo",
            duration: "1 Mes",
            title: "Trabajo en Equipo y Liderazgo",
            desc: "Desarrolla habilidades blandas clave para tus proyectos grupales y futuro profesional.",
            author: "Lina",
            authorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
            oldPrice: 60,
            price: 30
        }
    ];

    // Limpiamos el grid antes de agregar para evitar duplicados si recargas
    grid.innerHTML = '';

    articles.forEach(item => {
        const cardHTML = `
            <div class="profile-article-card">
                <img src="${item.image}" alt="Course" class="p-card-img">
                <div class="p-card-meta">
                    <span style="display:flex; align-items:center; gap:5px">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                        ${item.tag}
                    </span>
                    <span style="display:flex; align-items:center; gap:5px">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        ${item.duration}
                    </span>
                </div>
                <h3 class="p-card-title">${item.title}</h3>
                <p class="p-card-desc">${item.desc}</p>
                
                <div class="p-card-footer">
                    <div class="p-author-info">
                        <img src="${item.authorImg}" alt="${item.author}">
                        <span>${item.author}</span>
                    </div>
                    <div class="p-price-info">
                        <span class="p-old-price">$${item.oldPrice}</span>
                        <span class="p-new-price">${item.price === 0 ? 'GRATIS' : '$' + item.price}</span>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += cardHTML;
    });
});
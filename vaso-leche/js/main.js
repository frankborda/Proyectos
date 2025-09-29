// =============================================
// CONFIGURACIÓN DEL MENÚ HAMBURGUESA 
// =============================================
function setupHamburgerMenu() {
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const navLinks = document.getElementById("nav-links");

    if (!hamburgerMenu || !navLinks) return;

    hamburgerMenu.addEventListener("click", function () {
        // Alternar clase active en el menú hamburguesa
        this.classList.toggle("active");
        
        // Alternar clase active en los enlaces de navegación
        navLinks.classList.toggle("active");
        
        // Prevenir scroll del body cuando el menú está abierto
        document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
    });

    // Cerrar menú al hacer clic en un enlace
    const navItems = navLinks.querySelectorAll("a");
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            hamburgerMenu.classList.remove("active");
            navLinks.classList.remove("active");
            document.body.style.overflow = "";
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener("click", (event) => {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnHamburger = hamburgerMenu.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains("active")) {
            hamburgerMenu.classList.remove("active");
            navLinks.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
}

// =============================================
// CONFIGURACIÓN DEL FORMULARIO DE CONTACTO
// =============================================
function setupContactForm() {
    const contactForm = document.getElementById("contactForm");
    const confirmationMessage = document.getElementById("confirmationMessage");

    if (!contactForm) return;

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const asunto = document.getElementById("asunto").value;
        const mensaje = document.getElementById("mensaje").value;

        if (!nombre || !correo || !asunto || !mensaje) {
            alert("Por favor, complete todos los campos obligatorios.");
            return;
        }

        const municipalidad = document.getElementById("municipalidad").value;
        const asuntoSelect = document.getElementById("asunto");
        const asuntoTexto = asuntoSelect.options[asuntoSelect.selectedIndex].text;

        const cuerpo = `Nombre: ${nombre}\n` +
            `Correo: ${correo}\n` +
            `Municipalidad: ${municipalidad}\n` +
            `Asunto: ${asuntoTexto}\n\n` +
            `Mensaje:\n${mensaje}`;

        const asuntoCodificado = encodeURIComponent(asuntoTexto);
        const cuerpoCodificado = encodeURIComponent(cuerpo);

        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=rs.siamsoft@gmail.com&su=${asuntoCodificado}&body=${cuerpoCodificado}`;

        if (confirmationMessage) {
            confirmationMessage.style.display = "block";
        }

        setTimeout(function () {
            window.open(gmailLink, "_blank");
            contactForm.reset();

            if (confirmationMessage) {
                setTimeout(function () {
                    confirmationMessage.style.display = "none";
                }, 5000);
            }
        }, 1000);
    });
}

// =============================================
// SCROLL SUAVE Y NAVEGACIÓN
// =============================================
function setupSmoothScroll() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Cerrar menú móvil si está abierto
                const hamburgerMenu = document.getElementById("hamburger-menu");
                const navLinks = document.getElementById("nav-links");
                
                if (hamburgerMenu && navLinks) {
                    hamburgerMenu.classList.remove("active");
                    navLinks.classList.remove("active");
                    document.body.style.overflow = "";
                }
                
                // Scroll suave
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky header
    window.addEventListener('scroll', function () {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// =============================================
// INICIALIZACIÓN AL CARGAR EL DOCUMENTO
// =============================================
document.addEventListener('DOMContentLoaded', function () {
    setupHamburgerMenu();
    setupContactForm();
    setupSmoothScroll();
    
    // Animaciones al hacer scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});

// =============================================
// ANIMACIONES AL HACER SCROLL
// =============================================
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .benefits-list li, .testimonio-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
}

// Inicializar estilos para animación
document.querySelectorAll('.feature-card, .benefits-list li, .testimonio-card').forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});
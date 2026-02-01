// ==========================================
// MENU MOBILE TOGGLE
// ==========================================

const menuToggle = document.querySelector('.menu-toggle');
const headerNav = document.querySelector('.header-nav');
const body = document.body;

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        headerNav.classList.toggle('mobile-open');
        body.classList.toggle('menu-open');
        
        // Anima os spans do hamburger
        menuToggle.classList.toggle('active');
    });
}

// Fecha o menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (headerNav.classList.contains('mobile-open')) {
            menuToggle.setAttribute('aria-expanded', 'false');
            headerNav.classList.remove('mobile-open');
            body.classList.remove('menu-open');
            menuToggle.classList.remove('active');
        }
    });
});

// ==========================================
// ACTIVE NAV LINK ON SCROLL
// ==========================================

const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ==========================================
// HEADER SCROLL EFFECT
// ==========================================

const header = document.querySelector('.site-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// FORM SUBMISSION
// ==========================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Aqui você pode adicionar a lógica de envio do formulário
        // Por exemplo, usando fetch para enviar para um servidor
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        console.log('Dados do formulário:', data);
        
        // Exemplo de feedback ao usuário
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset();
    });
}

// ==========================================
// SMOOTH SCROLL POLYFILL (para navegadores antigos)
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href === '#') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80; // Ajuste para altura do header
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// ==========================================
// INTERSECTION OBSERVER (Animações ao scroll)
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observa cards e elementos que devem animar
const animatedElements = document.querySelectorAll('.content-card, .metric-card, .feature-item, .partners-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ==========================================
// LOADING PERFORMANCE
// ==========================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
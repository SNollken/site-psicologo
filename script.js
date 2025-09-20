// Espera todo o HTML ser carregado para executar o script.
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO MENU HAMBÚRGUER ---
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');

    // 1. Abrir/Fechar o menu ao clicar no ícone
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // 2. Fechar o menu ao clicar em um dos links (melhora a experiência no mobile)
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        });
    });


    // --- LÓGICA DO DARK MODE ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    const applyTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            htmlElement.classList.add('dark-mode');
        } else {
            htmlElement.classList.remove('dark-mode');
        }
    };

    themeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark-mode');
        if (htmlElement.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    applyTheme(); // Aplica o tema correto na inicialização.


    // --- LÓGICA DO SCROLL SUAVE ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Apenas previne o padrão se o link for para a mesma página.
            if (this.pathname === window.location.pathname && this.hash) {
                e.preventDefault();
                const targetElement = document.querySelector(this.hash);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });


    // --- LÓGICA DA ANIMAÇÃO FADE-IN AO ROLAR ---
    const fadeInElements = document.querySelectorAll('.fade-in');

    // O observer só é criado se existirem elementos para observar.
    if (fadeInElements.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        fadeInElements.forEach(element => {
            observer.observe(element);
        });
    }
});
/**
 * Manicure Model - Script Principal
 * Funcionalidades: Dark Mode, Menu Mobile, Scroll Animations, 
 * Cookie Consent (LGPD), UTM Tracking e Formulário Inteligente.
 */

// Configurações Globais [Sugestão - VALIDAR]
const CONFIG = {
    whatsappNumber: '5511999998888', // Formato: 55 + DDD + Número
    whatsappDefaultMsg: 'Olá! Gostaria de agendar um horário.',
    formEmail: 'contato@manicuremodel.com.br'
};

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initScrollAnimations();
    initHeaderScroll();
    initFAQ();
    initCookieBanner();
    initUTMTracking();
    initContactForm();
});

// 1. Dark Mode com LocalStorage
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
}

// 2. Menu Mobile
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = mobileMenu.querySelectorAll('a');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    menuBtn.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);
    
    menuLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
}

// 3. Animações no Scroll (Intersection Observer)
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// 4. Header Glassmorphism no Scroll
function initHeaderScroll() {
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// 5. FAQ Accordion
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Fecha todos os outros
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Abre o clicado se não estava ativo
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// 6. Banner de Cookies LGPD
function initCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');
    
    const consent = localStorage.getItem('cookieConsent');

    if (!consent) {
        banner.style.display = 'block';
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        banner.style.display = 'none';
        trackEvent('cookie_consent_accepted');
        // Aqui você dispararia os scripts de marketing (Pixel, GA4) se estivessem bloqueados
    });

    rejectBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'rejected');
        banner.style.display = 'none';
        // Garante que apenas cookies essenciais permaneçam
    });
}

// 7. Rastreamento de UTM e Injeção no WhatsApp
function initUTMTracking() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');

    if (utmSource) {
        // Salva no LocalStorage para persistir entre páginas
        localStorage.setItem('utm_source', utmSource);
        localStorage.setItem('utm_medium', utmMedium || 'none');
        localStorage.setItem('utm_campaign', utmCampaign || 'none');
    }

    updateWhatsAppLinks();
}

function updateWhatsAppLinks() {
    const source = localStorage.getItem('utm_source') || 'Site Orgânico';
    const campaign = localStorage.getItem('utm_campaign') || 'Geral';
    
    // Mensagem personalizada com origem
    const customMsg = encodeURIComponent(`Olá! Vim pelo ${source} (Campanha: ${campaign}) e gostaria de agendar um horário.`);
    const waLink = `https://wa.me/${CONFIG.whatsappNumber}?text=${customMsg}`;

    // Atualiza todos os botões de WhatsApp
    document.querySelectorAll('#hero-whatsapp-btn, #sticky-whatsapp-btn, #floating-whatsapp-btn').forEach(btn => {
        btn.href = waLink;
        btn.addEventListener('click', () => {
            trackEvent('whatsapp_click', { source: source });
        });
    });
}

// 8. Formulário Inteligente (Fallback Mailto/WA)
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const service = formData.get('service');
        const message = formData.get('message');

        const finalMsg = encodeURIComponent(
            `*Novo Contato pelo Site*\n\n` +
            `*Nome:* ${name}\n` +
            `*Telefone:* ${phone}\n` +
            `*Serviço:* ${service}\n` +
            `*Mensagem:* ${message || 'Sem mensagem adicional'}`
        );

        const waLink = `https://wa.me/${CONFIG.whatsappNumber}?text=${finalMsg}`;
        
        // Feedback visual
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Redirecionando para WhatsApp...';
        submitBtn.disabled = true;

        // Abre WhatsApp em nova aba
        window.open(waLink, '_blank');
        trackEvent('form_submit_whatsapp');

        // Reset do formulário
        setTimeout(() => {
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            alert('Obrigada! Se o WhatsApp não abrir automaticamente, por favor, nos chame diretamente pelo botão flutuante.');
        }, 1000);
    });
}

// 9. Sistema de Rastreamento Seguro (Respeita LGPD)
function trackEvent(eventName, params = {}) {
    const consent = localStorage.getItem('cookieConsent');
    
    // Só envia para dataLayer se o usuário aceitou cookies de marketing
    if (consent === 'accepted') {
        if (typeof window.dataLayer !== 'undefined') {
            window.dataLayer.push({
                event: eventName,
                ...params
            });
        }
        console.log(`[Track] ${eventName}`, params);
    } else {
        console.log(`[Track Bloqueado] ${eventName} (Aguardando consentimento)`);
    }
}
// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MENU HAMBURGER =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Fecha o menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // ===== SCROLL SUAVE PARA LINKS DE NAVEGAÇÃO =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#ffffff';
            header.style.backdropFilter = 'none';
        }
    });
    
    // ===== SLIDER DE DEPOIMENTOS =====
    const depoimentoCards = document.querySelectorAll('.depoimento-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    function showSlide(index) {
        // Remove active de todos os cards e dots
        depoimentoCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Adiciona active ao card e dot atual
        depoimentoCards[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % depoimentoCards.length;
        showSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + depoimentoCards.length) % depoimentoCards.length;
        showSlide(prev);
    }
    
    // Event listeners para os botões
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Event listeners para os dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Auto-play do slider (opcional)
    setInterval(nextSlide, 5000); // Muda a cada 5 segundos
    
    // ===== FORMULÁRIO DE CONTATO =====
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coleta os dados do formulário
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Validação básica
        if (!data.nome || !data.email || !data.mensagem) {
            showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }
        
        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Por favor, insira um email válido.', 'error');
            return;
        }
        
        // Simula envio do formulário
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simula delay de envio
        setTimeout(() => {
            showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
    
    // ===== SISTEMA DE NOTIFICAÇÕES =====
    function showNotification(message, type = 'info') {
        // Remove notificação existente se houver
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Cria nova notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Adiciona estilos
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4a7c59' : type === 'error' ? '#d32f2f' : '#2d5a3d'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        `;
        
        // Adiciona ao DOM
        document.body.appendChild(notification);
        
        // Event listener para fechar
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Remove automaticamente após 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // ===== ANIMAÇÕES DE ENTRADA =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observa elementos para animação
    document.querySelectorAll('.servico-card, .plano-card, .stat-item').forEach(el => {
        observer.observe(el);
    });
    
    // ===== BOTÕES CTA INTERATIVOS =====
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.textContent.includes('Começar') || this.textContent.includes('Escolher')) {
                e.preventDefault();
                showNotification('Funcionalidade em desenvolvimento. Entre em contato conosco!', 'info');
                
                // Scroll para seção de contato
                const contatoSection = document.getElementById('contato');
                if (contatoSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = contatoSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== EFEITOS DE HOVER PARA STATS =====
    document.querySelectorAll('.stat-item').forEach(stat => {
        stat.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        stat.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // ===== CONTADOR ANIMADO PARA ESTATÍSTICAS =====
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + (target > 100 ? '+' : target === 95 ? '%' : '+');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (target > 100 ? '+' : target === 95 ? '%' : '+');
            }
        }
        
        updateCounter();
    }
    
    // Observa as estatísticas para animar quando visíveis
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('h4');
                const value = parseInt(statNumber.textContent);
                animateCounter(statNumber, value);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat-item').forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // ===== VALIDAÇÃO EM TEMPO REAL DO FORMULÁRIO =====
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Remove classes de erro anteriores
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Validações específicas
        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (value && !emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Email inválido';
                }
                break;
            case 'tel':
                const phoneRegex = /^[\d\s\-\(\)]+$/;
                if (value && !phoneRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Telefone inválido';
                }
                break;
        }
        
        // Campos obrigatórios
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Campo obrigatório';
        }
        
        // Mostra erro se inválido
        if (!isValid) {
            field.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = errorMessage;
            errorDiv.style.cssText = 'color: #d32f2f; font-size: 0.85rem; margin-top: 0.25rem;';
            field.parentNode.appendChild(errorDiv);
        }
        
        return isValid;
    }
    
    // ===== LOADING STATE PARA BOTÕES =====
    function setButtonLoading(button, loading = true) {
        if (loading) {
            button.classList.add('loading');
            button.disabled = true;
            button.dataset.originalText = button.textContent;
            button.textContent = 'Carregando...';
        } else {
            button.classList.remove('loading');
            button.disabled = false;
            button.textContent = button.dataset.originalText || button.textContent;
        }
    }
    
    // ===== ADICIONA ESTILOS DINÂMICOS =====
    const dynamicStyles = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-close:hover {
            opacity: 0.7;
        }
        
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
            border-color: #d32f2f;
            box-shadow: 0 0 0 2px rgba(211, 47, 47, 0.1);
        }
        
        .loading {
            opacity: 0.7;
            pointer-events: none;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = dynamicStyles;
    document.head.appendChild(styleSheet);
    
    // ===== INICIALIZAÇÃO FINAL =====
    console.log('NutriClin - Site carregado com sucesso!');
    
    // Adiciona classe para indicar que o JavaScript foi carregado
    document.body.classList.add('js-loaded');
});


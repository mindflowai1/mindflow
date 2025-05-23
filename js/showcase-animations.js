// Script para animar os cards quando entrarem na viewport
document.addEventListener('DOMContentLoaded', function() {
    // Configurações do observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Função para criar observers com diferentes animações
    function createObserver(selector, animationType) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Aplicar classes de animação
        document.querySelectorAll(selector).forEach((element, index) => {
            // Adicionar classe base de animação
            element.classList.add('animate-' + animationType);
            
            // Adicionar delay baseado no índice para animação sequencial
            if (animationType === 'fade-up') {
                element.style.transitionDelay = (index * 0.15) + 's';
            }
            
            observer.observe(element);
        });
    }
    
    // Criar observer para os cards de projeto
    createObserver('.project-card', 'fade-up');
    
    // Criar observer para os cards da seção "O que fazemos por você"
    createObserver('.step', 'fade-up');
});

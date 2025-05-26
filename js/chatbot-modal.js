// Script para controlar o modal do chatbot
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const openModalBtn = document.getElementById('open-chatbot-modal');
    const closeModalBtn = document.getElementById('close-chatbot-modal');
    const modal = document.getElementById('chatbot-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const chatIframe = document.getElementById('n8n-chat-iframe');
    
    // Função para abrir o modal e garantir que o iframe seja recarregado
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Impede o scroll da página
        
        // Recarregar o iframe para garantir uma nova sessão do chat
        if (chatIframe) {
            const currentSrc = chatIframe.src;
            chatIframe.src = currentSrc;
            
            // Adicionar classe de animação ao abrir
            chatIframe.classList.add('iframe-fade-in');
        }
        
        // Evento de analytics (opcional)
        if (window.gtag) {
            window.gtag('event', 'open_chatbot', {
                'event_category': 'engagement',
                'event_label': 'Chatbot Demo'
            });
        }
    }
    
    // Função para fechar o modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restaura o scroll da página
        
        // Remover a classe de animação ao fechar
        if (chatIframe) {
            chatIframe.classList.remove('iframe-fade-in');
        }
    }
    
    // Event listeners
    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    
    // Fechar o modal ao clicar no overlay
    modalOverlay.addEventListener('click', closeModal);
    
    // Impedir que cliques dentro do modal fechem o modal
    modal.querySelector('.modal-container').addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Fechar o modal com a tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Ajustar altura do iframe em dispositivos móveis
    function adjustIframeHeight() {
        if (chatIframe && window.innerWidth <= 768) {
            const viewportHeight = window.innerHeight;
            const modalHeaderHeight = document.querySelector('.modal-header').offsetHeight;
            const maxIframeHeight = viewportHeight * 0.7; // 70% da altura da viewport
            
            chatIframe.style.height = `${maxIframeHeight}px`;
        } else if (chatIframe) {
            chatIframe.style.height = '500px'; // Tamanho padrão para desktop
        }
    }
    
    // Ajustar altura do iframe quando o modal for aberto
    openModalBtn.addEventListener('click', adjustIframeHeight);
    
    // Ajustar altura do iframe quando a janela for redimensionada
    window.addEventListener('resize', function() {
        if (modal.classList.contains('active')) {
            adjustIframeHeight();
        }
    });
});

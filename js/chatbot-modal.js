// Script para controlar o modal do chatbot
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const openModalBtn = document.getElementById('open-chatbot-modal');
    const closeModalBtn = document.getElementById('close-chatbot-modal');
    const modal = document.getElementById('chatbot-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    // Função para abrir o modal
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Impede o scroll da página
    }
    
    // Função para fechar o modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restaura o scroll da página
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
});

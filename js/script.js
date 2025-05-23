document.addEventListener('DOMContentLoaded', () => {
    // Funcionalidade do menu hamburger para mobile
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (hamburger && mobileMenu) {
        // Garantir que o menu esteja fechado ao carregar a página
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            // Prevenir rolagem quando o menu está aberto
            document.body.classList.toggle('menu-open');
        });
        
        // Fechar o menu ao clicar em um link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Fechar o menu ao clicar fora dele
        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
    
    // Adicionar rolagem suave para os links do menu
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Se for um link para o topo da página (Home)
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // Para outros links de seções
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80, // Ajuste para compensar o menu fixo
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Adicionar efeito hover nos botões
    const buttons = document.querySelectorAll('.hero-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
    
    // Manipulação do formulário de contato
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        // Interceptar o envio do formulário para mostrar mensagem de sucesso
        contactForm.addEventListener('submit', (e) => {
            // Não previne o envio, apenas adiciona classe de loading
            contactForm.classList.add('sending');
            
            // Mostrar mensagem de sucesso após o envio (se não houver redirecionamento)
            // Isso é um fallback caso o redirecionamento para a página de agradecimento não funcione
            setTimeout(() => {
                // O formulário já foi enviado pelo Formspree neste ponto
                if (formSuccess) {
                    formSuccess.classList.add('show');
                }
            }, 2000);
        });
    }
    
    // Criar página de agradecimento para redirecionamento após envio do formulário
    // Esta página é usada como destino no parâmetro _next do Formspree
    const createThanksPage = () => {
        const thanksHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Obrigado - MindFlow</title>
    <link rel="stylesheet" href="styles-temp.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        .thanks-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 2rem;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }
        .thanks-content {
            max-width: 600px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 1rem;
            padding: 3rem;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .thanks-icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 2rem;
            background: linear-gradient(90deg, #0ea5e9, #059669);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
        }
        .thanks-title {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #0ea5e9, #059669);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .thanks-text {
            color: rgba(255, 255, 255, 0.8);
            font-size: 1.2rem;
            margin-bottom: 2rem;
        }
        .back-button {
            display: inline-block;
            background: linear-gradient(90deg, #0ea5e9, #059669);
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        .back-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
    </style>
</head>
<body>
    <div class="thanks-container">
        <div class="thanks-content">
            <div class="thanks-icon">✓</div>
            <h1 class="thanks-title">Mensagem Enviada!</h1>
            <p class="thanks-text">Obrigado pelo seu contato. Nossa equipe entrará em contato o mais breve possível para apresentar a melhor solução para sua empresa.</p>
            <a href="index.html" class="back-button">Voltar para o site</a>
        </div>
    </div>
</body>
</html>`;
        
        // Criar arquivo thanks.html na raiz do projeto
        const fs = window.require ? window.require('fs') : null;
        if (fs) {
            try {
                fs.writeFileSync('thanks.html', thanksHtml);
                console.log('Página de agradecimento criada com sucesso!');
            } catch (err) {
                console.error('Erro ao criar página de agradecimento:', err);
            }
        }
    };
    
    // Tentar criar a página de agradecimento se estivermos em ambiente Node.js
    // Isso não é executado no navegador, apenas durante o desenvolvimento
    try {
        if (typeof window !== 'undefined' && window.require) {
            createThanksPage();
        }
    } catch (e) {
        console.log('Não foi possível criar a página de agradecimento automaticamente.');
    }
    
    // Animação de fade in para os blocos da seção 'Por que escolher a MindFlow?'
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Quando o elemento se torna visível na tela
                const blocks = entry.target.querySelectorAll('.reason-block');
                blocks.forEach((block, index) => {
                    // Adiciona um atraso progressivo para criar efeito cascata
                    setTimeout(() => {
                        block.style.animationPlayState = 'running';
                    }, index * 150);
                });
                // Desconecta o observer após ativar as animações
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observa a seção 'Por que escolher a MindFlow?'
    const reasonsContainer = document.querySelector('.reasons-container');
    if (reasonsContainer) {
        observer.observe(reasonsContainer);
    }
    
    // Observa a seção 'Solução Completa para Captar e Converter Leads'
    const solutionContainer = document.querySelector('.solution-container');
    if (solutionContainer) {
        const solutionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Quando o elemento se torna visível na tela, ativa as animações
                    const solutionImage = entry.target.querySelector('.solution-image');
                    const solutionText = entry.target.querySelector('.solution-text');
                    
                    if (solutionImage) {
                        solutionImage.style.animationPlayState = 'running';
                    }
                    
                    if (solutionText) {
                        solutionText.style.animationPlayState = 'running';
                    }
                    
                    // Desconecta o observer após ativar as animações
                    solutionObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        solutionObserver.observe(solutionContainer);
    }
    
    // Observa a seção 'Nossos Planos'
    const plansContainer = document.querySelector('.plans-grid');
    if (plansContainer) {
        const plansObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Quando o elemento se torna visível na tela, ativa as animações
                    const planCards = entry.target.querySelectorAll('.plan-card');
                    
                    planCards.forEach((card, index) => {
                        // Adiciona um atraso progressivo para criar efeito cascata
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                    
                    // Desconecta o observer após ativar as animações
                    plansObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        plansObserver.observe(plansContainer);
    }
    
    // Observa a seção 'Vamos Conversar?'
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Quando o elemento se torna visível na tela, ativa as animações
                    const contactInfo = entry.target.querySelector('.contact-info');
                    const contactForm = entry.target.querySelector('.contact-form-container');
                    
                    if (contactInfo) {
                        contactInfo.style.opacity = '1';
                        contactInfo.style.transform = 'translateX(0)';
                    }
                    
                    if (contactForm) {
                        setTimeout(() => {
                            contactForm.style.opacity = '1';
                            contactForm.style.transform = 'translateX(0)';
                        }, 300);
                    }
                    
                    // Desconecta o observer após ativar as animações
                    contactObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        contactObserver.observe(contactSection);
    }
});

import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = ({ onOpenModal }) => {
  const navigate = useNavigate();
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);
  const [isPreloaderFading, setIsPreloaderFading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const videoRef = useRef(null);
  const heroRef = useRef(null);
  const timelineSteps = [
    {
      id: 'step1',
      title: 'Estratégia',
      subtitle: 'Diagnóstico',
      description: 'A gente mergulha no seu negócio: oferta, público, ticket, diferenciais. Esse é o passo que decide se sua campanha vai gerar venda ou só clique.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: 'step2',
      title: 'Landing Page Premium',
      subtitle: 'Construção',
      description: 'Página feita do zero, com copy estratégica e design de alto padrão. Cada bloco, cor e botão é decidido com base em conversão. Nada de template.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'step3',
      title: 'Tráfego Pago',
      subtitle: 'Captura',
      description: 'Campanhas no Meta Ads e Google Ads estruturadas com critério. Foco em lead qualificado, não em volume vazio — quem clica já tem perfil pra comprar.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      id: 'step4',
      title: 'Otimização Contínua',
      subtitle: 'Escala',
      description: 'Acompanhamento semanal, ajustes baseados em dados reais e refino do que está funcionando. A operação amadurece e o custo por venda cai mês a mês.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" transform="rotate(45 12 12)" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12a9 9 0 1018 0 9 9 0 00-18 0z" />
        </svg>
      )
    }
  ];

  const timelineRef = useRef(null);
  const dnaRef = useRef(null);
  const clientsRef = useRef(null);
  const faqRef = useRef(null);
  const footerRef = useRef(null);
  const portfolioRef = useRef(null);
  const carouselRef = useRef(null);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [carouselProgress, setCarouselProgress] = useState(0);

  const faqs = [
    {
      question: "Por que vocês fazem só tráfego pago e landing page?",
      answer: "Porque é onde está a maior alavancagem do marketing digital. Uma landing bem feita pode dobrar sua conversão sem aumentar um centavo de investimento. E tráfego mal estruturado queima orçamento mesmo com a melhor página do mundo. A gente faz os dois funcionarem juntos, com foco total — sem tentar resolver tudo e acabar entregando nada bem feito."
    },
    {
      question: "Preciso contratar os dois serviços ou posso pegar separado?",
      answer: "O ideal é contratar os dois — eles se potencializam. Mas atendemos cada um isoladamente também. Se você já tem uma landing que converte, fazemos só o tráfego. Se já tem campanhas rodando mas perde gente no site, fazemos só a landing premium."
    },
    {
      question: "Em quanto tempo vejo resultado?",
      answer: "A landing page premium fica pronta em 7 a 14 dias úteis. As campanhas de tráfego começam a gerar leads nas primeiras 48 horas após publicação. A operação amadurece e atinge o melhor desempenho entre 30 e 60 dias — quando temos dados suficientes pra otimizar com precisão."
    },
    {
      question: "Qual o investimento?",
      answer: "Depende do seu mercado, ticket e meta de crescimento. Trabalhamos com valor fixo de projeto + verba de mídia separada, sempre transparente. Em uma conversa de 15 minutos a gente entende seu cenário e te passa uma faixa realista. Sem compromisso."
    },
    {
      question: "Vocês atendem qualquer tipo de empresa?",
      answer: "Focamos em negócios que querem previsibilidade na aquisição de clientes: empresas de serviço, ticket médio/alto, B2B, operações locais que dependem de leads qualificados. Se você precisa de venda direta, com método e não na sorte, é com a gente."
    }
  ];

  const testimonials = [
    {
      id: 1,
      company: "Thees Engenharia",
      letter: "T",
      segment: "Engenharia Civil",
      content: "A landing nova ficou muito mais clara, e o tráfego pago trouxe orçamentos qualificados desde o primeiro mês. Hoje nossa equipe comercial fala com gente que já chegou aquecida — não perdemos mais tempo com curioso.",
      rating: 5,
    },
    {
      id: 2,
      company: "Depósito do Paulo",
      letter: "D",
      segment: "Materiais de Construção",
      content: "A página antiga não convertia. A nova é simples, direta, e o pessoal deixa contato pra valer. Combinado com os anúncios bem feitos, o volume de orçamento novo subiu bastante nas primeiras semanas.",
      rating: 5,
    },
    {
      id: 3,
      company: "Check Mkt",
      letter: "C",
      segment: "Marketing Digital",
      content: "Como agência, a gente percebe quando uma campanha foi planejada com método. Custo por lead, criativos testados, página alinhada com o anúncio. Trabalho técnico do começo ao fim.",
      rating: 5,
    }
  ];

  const portfolioProjects = [
    {
      id: 1,
      title: "CheckMkt",
      domain: "checkmktus.com",
      url: "https://www.checkmktus.com/",
      category: "PERFORMANCE MARKETING FUNNEL",
      description: "Funil de vendas avançado e tracking de conversão focado em captação acelerada de leads qualificados.",
      logoText: "C",
      logoImg: "/logos-clientes/check mkt.png",
      mockup: {
        bg: "bg-[#0b0e17]",
        accent: "text-emerald-400 border-emerald-500/20",
        headerBg: "bg-[#101524]",
        previewElement: (
          <img 
            src="/images/checkmkt-landing.png" 
            alt="CheckMkt US Landing Page" 
            className="w-full h-full object-cover object-top" 
          />
        )
      }
    },
    {
      id: 2,
      title: "Depósito do Paulo",
      domain: "depositodopaulo.com.br",
      url: "https://www.depositodopaulo.com.br/",
      category: "CATÁLOGO WHATSAPP + LEADS",
      description: "Transformação digital para loja física de materiais de construção. Landing page estruturada para captação ágil de orçamentos e conversão pelo WhatsApp.",
      logoText: "DP",
      logoImg: "/logos-clientes/Deposito do paulo.png",
      mockup: {
        bg: "bg-[#0a0705]",
        accent: "text-amber-500 border-amber-500/20",
        headerBg: "bg-[#18110b]",
        previewElement: (
          <img 
            src="/images/depositodopaulo-landing.png" 
            alt="Depósito do Paulo Landing Page" 
            className="w-full h-full object-cover object-top" 
          />
        )
      }
    },
    {
      id: 3,
      title: "MHL Integrada",
      domain: "mhlintegrada.com.br",
      url: "https://www.mhlintegrada.com.br/",
      category: "LANDING PAGE DE CONSULTORIA",
      description: "Landing page corporativa premium unindo engenharia e assessoria de riscos operacionais com visual altamente sóbrio e profissional.",
      logoText: "MHL",
      logoImg: null,
      mockup: {
        bg: "bg-[#050e18]",
        accent: "text-blue-400 border-blue-500/20",
        headerBg: "bg-[#0a1525]",
        previewElement: (
          <img 
            src="/images/mhl-landing.png" 
            alt="MHL Integrada Landing Page" 
            className="w-full h-full object-cover object-top" 
          />
        )
      }
    },
    {
      id: 4,
      title: "STI Eng",
      domain: "stieng.com.br",
      url: "https://www.stieng.com.br/",
      category: "PORTAL CORPORATIVO INDUSTRIAL",
      description: "Plataforma premium para engenharia e automação mecânica de grande porte, transmitindo robustez e profissionalismo.",
      logoText: "S",
      logoImg: "/logos-clientes/sti.png",
      mockup: {
        bg: "bg-[#0b0e17]",
        accent: "text-emerald-400 border-emerald-500/20",
        headerBg: "bg-[#101524]",
        previewElement: (
          <img 
            src="/images/sti-landing.png" 
            alt="STI Engenharia Landing Page" 
            className="w-full h-full object-cover object-top" 
          />
        )
      }
    },
    {
      id: 5,
      title: "CoreAuto",
      domain: "coreauto-six.vercel.app",
      url: "https://coreauto-six.vercel.app/",
      category: "CATÁLOGO DE PEÇAS + LEAD FUNNEL",
      description: "Landing page e catálogo inteligente focado em cotações rápidas e vendas de peças automotivas exclusivas para veículos Hyundai & Kia.",
      logoText: "CA",
      logoImg: null,
      mockup: {
        bg: "bg-[#080d15]",
        accent: "text-blue-400 border-blue-500/20",
        headerBg: "bg-[#101925]",
        previewElement: (
          <img 
            src="/images/coreauto-landing.png" 
            alt="CoreAuto Landing Page" 
            className="w-full h-full object-cover object-top" 
          />
        )
      }
    },
    {
      id: 6,
      title: "Thees Engenharia",
      domain: "theesengenharia.com.br",
      url: "https://www.theesengenharia.com.br/",
      category: "SITE INSTITUCIONAL DE ENGENHARIA",
      description: "Portal premium e de engenharia civil de alto padrão, focado em engenharia de precisão e modelagem BIM 3D com design sofisticado.",
      logoText: "T",
      logoImg: "/logos-clientes/thees.png",
      mockup: {
        bg: "bg-[#0b0e17]",
        accent: "text-amber-400 border-amber-500/20",
        headerBg: "bg-[#101524]",
        previewElement: (
          <img 
            src="/images/thees-landing.png" 
            alt="Thees Engenharia Landing Page" 
            className="w-full h-full object-cover object-top" 
          />
        )
      }
    },
    {
      id: 7,
      title: "BFS Advogados",
      domain: "bfsadvogados.com.br",
      url: "https://www.bfsadvogados.com.br/",
      category: "LANDING PAGE ADVOCACIA",
      description: "Estrutura sóbria e corporativa para escritório de advocacia empresarial. Foco em autoridade e captação de clientes B2B.",
      logoText: "BFS",
      logoImg: null,
      mockup: {
        bg: "bg-[#050715]",
        accent: "text-amber-500 border-amber-500/20",
        headerBg: "bg-[#0b0e25]",
        previewElement: (
          <img 
            src="/images/bfs-landing.png" 
            alt="BFS Advogados Landing Page" 
            className="w-full h-full object-cover object-top" 
          />
        )
      }
    }
  ];

  const handleCarouselScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const totalScroll = scrollWidth - clientWidth;
      const progress = totalScroll > 0 ? (scrollLeft / totalScroll) * 100 : 0;
      setCarouselProgress(progress);
    }
  };

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.75;
      const newScrollLeft = direction === 'next' ? scrollLeft + scrollAmount : scrollLeft - scrollAmount;
      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Scroll logic for Timeline and Parallax
  useEffect(() => {
    let ticking = false;
    const runScroll = () => {
      const scrollY = window.scrollY;

      // Hero parallax — only the hero uses inline opacity/transform because
      // it doesn't contain backdrop-filter children. Other sections rely on
      // the top fade overlay to create the "content fading near top" visual,
      // which preserves the glass texture of all cards.
      const heroOpacity = Math.max(0, 1 - scrollY / 350);
      if (heroRef.current) {
        heroRef.current.style.opacity = heroOpacity;
        heroRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
      }

      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const startTrigger = windowHeight * 0.8;
        const endTrigger = windowHeight * 0.2;

        const totalDist = rect.height;
        const currentPos = startTrigger - rect.top;
        const progress = Math.max(0, Math.min(1, currentPos / (totalDist - (startTrigger - endTrigger))));
        setTimelineProgress(progress);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(runScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Preloader and reveal logic
  useEffect(() => {
    const hidePreloader = () => {
      setIsPreloaderFading(true);
      setTimeout(() => setIsPreloaderVisible(false), 1000);
    };

    const isMobile = window.innerWidth < 768;
    const bgVideo = videoRef.current;

    if (bgVideo && !isMobile) {
      if (bgVideo.readyState >= 3) hidePreloader();
      else bgVideo.addEventListener('canplaythrough', hidePreloader, { once: true });
    } else {
      setTimeout(hidePreloader, 800);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-12');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => {
      el.classList.add('opacity-0', 'translate-y-12', 'transition-all', 'duration-[800ms]', 'ease-out');
      observer.observe(el);
    });

    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <div className="w-full relative min-h-screen">
      {/* Preloader */}
      {isPreloaderVisible && (
        <div
          className={`fixed inset-0 z-[100] bg-[#02040a] flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${isPreloaderFading ? 'opacity-0' : 'opacity-100'}`}
        >
          <img src="/logo-mindflow.png" alt="Mindflow" className="h-16 md:h-20 mb-8 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]" />
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full bg-blue-500 rounded-full w-1/2 shadow-[0_0_10px_rgba(59,130,246,0.8)]" style={{ animation: 'loading-bar 1.5s ease-in-out infinite' }}></div>
          </div>
        </div>
      )}

      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="hidden md:block fixed inset-0 w-full h-full object-cover z-0 opacity-40"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Mobile Animated Background */}
      <div className="md:hidden fixed inset-0 z-0 w-full h-full bg-black overflow-hidden pointer-events-none">
        <div className="absolute top-0 bottom-0" style={{ left: '75vw', width: '60vw', background: 'linear-gradient(160deg, #000844 0%, #000011 50%, #000000 100%)', backgroundSize: '200% 200%', zIndex: 1, animation: 'nexus-right 12s ease-in-out infinite' }}></div>
        <div className="absolute top-0 bottom-0" style={{ left: '15vw', width: '60vw', background: 'linear-gradient(160deg, #001a99 0%, #00001a 50%, #000000 100%)', backgroundSize: '200% 200%', borderRight: '1px solid rgba(255,255,255,0.05)', zIndex: 2, animation: 'nexus-mid 10s ease-in-out infinite 1s' }}></div>
        <div className="absolute top-0 bottom-0" style={{ left: '-50vw', width: '90vw', background: 'linear-gradient(150deg, #0033aa 0%, #001144 40%, #000000 80%)', backgroundSize: '200% 200%', borderRight: '1px solid rgba(255,255,255,0.15)', zIndex: 3, animation: 'nexus-left 8s ease-in-out infinite 0.5s' }}></div>
        <div className="absolute inset-0 z-10 opacity-[0.06] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      </div>

      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="animate-glow-outer absolute bottom-[-10%] left-1/2 w-[150%] md:w-[80%] h-[60%] md:h-[50%]" style={{ background: 'radial-gradient(ellipse at center, rgba(29, 78, 216, 0.25) 0%, rgba(0, 0, 0, 0) 70%)' }}></div>
        <div className="animate-glow-inner absolute bottom-[-5%] left-1/2 w-[120%] md:w-[60%] h-[40%] md:h-[30%]" style={{ background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.35) 0%, rgba(0, 0, 0, 0) 60%)' }}></div>
      </div>

      {/* Floating Glass Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl px-6 py-4 rounded-full bg-[#080b14]/25 backdrop-blur-2xl border border-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex items-center justify-between transition-all duration-500 hover:bg-[#0a0f1c]/40 hover:border-white/25">
        <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group cursor-pointer">
          <img src="/logo-mindflow.png" alt="Mindflow Logo" className="h-8 md:h-10 object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:drop-shadow-[0_0_25px_rgba(59,130,246,0.5)] group-hover:scale-105 transition-all duration-300" />
        </div>
        <div className="hidden lg:flex items-center space-x-10 text-sm font-outfit font-medium text-gray-300">
          <a href="#experience" className="hover:text-white hover:drop-shadow-[0_0_10px_white] transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-blue-400 hover:after:w-full after:transition-all after:duration-300">A Jornada</a>
          <a href="#about" className="hover:text-white hover:drop-shadow-[0_0_10px_white] transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-blue-400 hover:after:w-full after:transition-all after:duration-300"> DNA</a>
          <a href="#portfolio" className="hover:text-white hover:drop-shadow-[0_0_10px_white] transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-blue-400 hover:after:w-full after:transition-all after:duration-300">Portfólio</a>
          <a href="#clients" className="hover:text-white hover:drop-shadow-[0_0_10px_white] transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-blue-400 hover:after:w-full after:transition-all after:duration-300">Nossos Clientes</a>
          <a href="#faq" className="hover:text-white hover:drop-shadow-[0_0_10px_white] transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-blue-400 hover:after:w-full after:transition-all after:duration-300">Dúvidas</a>
        </div>
        <div className="hidden md:flex items-center">
          <button onClick={onOpenModal} className="bg-white/10 text-white border border-white/20 px-6 py-2.5 rounded-full font-outfit font-semibold hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transform hover:-translate-y-0.5 cursor-pointer">
            Falar com a Agência
          </button>
        </div>
        <button onClick={toggleMobileMenu} className="lg:hidden text-white p-2 relative z-50 cursor-pointer" aria-label="Open menu">
          <svg className={`w-6 h-6 transition-all duration-300 ${isMobileMenuOpen ? 'hidden' : 'block'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg className={`w-6 h-6 transition-all duration-300 ${isMobileMenuOpen ? 'block' : 'hidden'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>

      {/* Top fade overlay — creates the visual of content fading as it
          approaches the top of the page. Sits behind the navbar (z-40 vs
          navbar z-50) and lets backdrop-filter cards keep their glass since
          we no longer need parent-opacity fades. */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-52 pointer-events-none z-40"
        style={{
          background: 'linear-gradient(to bottom, rgba(2, 4, 10, 1) 0%, rgba(2, 4, 10, 1) 40%, rgba(2, 4, 10, 0) 100%)'
        }}
      />

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-[#020409]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'}`}>
        <a href="#experience" onClick={closeMobileMenu} className="text-3xl font-outfit font-light text-gray-200 hover:text-white transition-all duration-300 hover:tracking-wider">A Jornada</a>
        <a href="#about" onClick={closeMobileMenu} className="text-3xl font-outfit font-light text-gray-200 hover:text-white transition-all duration-300 hover:tracking-wider">Sobre</a>
        <a href="#portfolio" onClick={closeMobileMenu} className="text-3xl font-outfit font-light text-gray-200 hover:text-white transition-all duration-300 hover:tracking-wider">Portfólio</a>
        <a href="#clients" onClick={closeMobileMenu} className="text-3xl font-outfit font-light text-gray-200 hover:text-white transition-all duration-300 hover:tracking-wider">Nossos Clientes</a>
        <a href="#faq" onClick={closeMobileMenu} className="text-3xl font-outfit font-light text-gray-200 hover:text-white transition-all duration-300 hover:tracking-wider">Dúvidas</a>
        <div className="mt-6">
          <button onClick={() => { closeMobileMenu(); onOpenModal(); }} className="bg-white text-black px-8 py-3.5 rounded-full font-outfit font-semibold text-lg hover:bg-gray-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] cursor-pointer">
            Falar com a Agência
          </button>
        </div>
      </div>

      {/* Hero Content */}
      <main ref={heroRef} className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full min-h-[100dvh] pt-32 md:pt-40 pb-32 md:pb-44 transition-transform duration-100 ease-out">
        <h1 className="animate-on-scroll font-outfit text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] leading-[1.1] tracking-tight md:tracking-[-0.03em] font-light mb-6 md:mb-8 [text-shadow:0_4px_30px_rgba(0,0,0,0.8)]">
          <span className="block text-white">Tráfego que atrai.</span>
          <span className="block text-gray-200">Landing que vende.</span>
          <span className="block text-gray-400">Resultado que escala.</span>
        </h1>
        <p className="animate-on-scroll text-gray-300 text-base md:text-lg max-w-[500px] md:max-w-[600px] mx-auto leading-relaxed font-light [text-shadow:0_2px_15px_rgba(0,0,0,1)]" style={{ transitionDelay: '100ms' }}>
          Especialistas em <span className="text-white">tráfego pago</span> e <span className="text-white">landing pages premium</span>. Duas frentes, um único objetivo: levar o cliente certo até você e fazer ele comprar.
        </p>
        <button onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })} className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-all duration-300 group cursor-pointer animate-on-scroll hover:scale-110" style={{ transitionDelay: '400ms' }}>
          <span className="text-[11px] uppercase tracking-[0.25em] text-gray-300 font-outfit font-medium group-hover:text-white transition-colors">Descubra</span>
          <div className="flex flex-col items-center animate-bounce mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-6 h-6 text-blue-500/50 -mb-3 group-hover:text-blue-400 transition-colors">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-6 h-6 text-blue-500 group-hover:text-blue-400 transition-colors drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </button>
      </main>

      {/* Client logos marquee — between hero and timeline */}
      <section className="relative z-10 w-full py-10 md:py-14 border-y border-white/5 bg-[#02040a]/60 overflow-hidden">
        <div className="text-center mb-8 md:mb-10">
          <span className="text-[10px] tracking-[0.4em] uppercase text-gray-500 font-outfit font-medium">
            Marcas que confiam na MindFlow
          </span>
        </div>

        <div
          className="relative"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          }}
        >
          <div className="flex w-max items-center gap-14 md:gap-24 animate-marquee">
            {(() => {
              const logos = [
                { name: 'Thees Engenharia', cls: 'font-medium tracking-tight' },
                { name: 'STI Engenharia', cls: 'font-bold uppercase tracking-[0.15em] text-base md:text-lg' },
                { name: 'Trans Obra', cls: 'font-semibold italic tracking-tight' },
                { name: 'DVE Marketing', cls: 'font-light uppercase tracking-[0.25em] text-base md:text-lg' },
                { name: 'Check Mkt', cls: 'font-medium italic tracking-tight' },
                { name: 'Depósito do Paulo', cls: 'font-light tracking-tight' },
              ];
              return [...logos, ...logos].map((logo, i) => (
                <span
                  key={i}
                  className={`text-xl md:text-2xl font-outfit text-white/35 hover:text-white/90 transition-colors duration-300 whitespace-nowrap ${logo.cls}`}
                >
                  {logo.name}
                </span>
              ));
            })()}
          </div>
        </div>
      </section>

      <section ref={timelineRef} id="experience" className="relative z-10 w-full px-4 md:px-8 pt-32 md:pt-48 pb-16 md:pb-24 flex flex-col items-center overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none z-0"></div>

        {/* Section Header */}
        <div className="relative z-10 max-w-4xl mx-auto w-full mb-24 md:mb-32 text-center animate-on-scroll">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-6 backdrop-blur-md">
            <span className="text-[11px] tracking-[0.3em] uppercase text-gray-400 font-outfit font-medium">Nosso Método</span>
          </div>
          <h2 className="font-outfit text-4xl md:text-6xl font-light text-white mb-8 tracking-tight leading-tight">
            Do clique à <span className="font-medium text-blue-400">venda</span>, sem ruído
          </h2>
          <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Um processo enxuto, focado nos dois pilares que mais movem o ponteiro: tráfego pago bem estruturado e uma landing page que dá orgulho de mostrar.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative z-10 max-w-5xl mx-auto w-full px-4">

          {/* Central Animated Line - Responsive position */}
          <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5 overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 via-purple-500 to-transparent transition-all duration-300 ease-out"
              style={{ height: `${timelineProgress * 100}%` }}
            >
              {/* Animated Glow at the tip of the line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full blur-md animate-pulse"></div>
            </div>
          </div>

          {/* Timeline Steps */}
          <div className="space-y-32 md:space-y-64 relative">
            {timelineSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              const stepProgressThreshold = (index + 0.5) / timelineSteps.length;
              const isActive = timelineProgress >= stepProgressThreshold;

              return (
                <div key={step.id} className="relative flex items-start md:items-center justify-start md:justify-center w-full">

                  {/* Central Node - Responsive position */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-30 mt-8 md:mt-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-700 ${isActive ? 'bg-blue-600 scale-110 shadow-[0_0_30px_rgba(59,130,246,0.6)]' : 'bg-[#080b14] border border-white/20'}`}>
                      <div className={`text-white transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                        {step.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content Card - Responsive Alignment */}
                  <div className={`w-full md:w-[45%] ${isEven ? 'md:mr-auto md:pr-12 md:text-right' : 'md:ml-auto md:pl-12 md:text-left'} pl-20 md:pl-0`}>
                    <div
                      className={`group relative p-6 md:p-8 rounded-[2rem] bg-white/[0.02] border transition-all duration-1000 transform animate-on-scroll ${isActive
                        ? 'border-white/20 opacity-100 translate-y-0 scale-100 backdrop-blur-xl'
                        : 'border-white/5 opacity-40 translate-y-12 scale-95 pointer-events-none'
                        }`}
                    >
                      {/* Subtle card glow */}
                      <div className={`absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-xl opacity-0 transition-opacity duration-700 ${isActive ? 'group-hover:opacity-100' : ''}`}></div>

                      <div className="relative z-10">
                        <span className={`text-[10px] tracking-[0.4em] uppercase font-bold mb-2 block ${isActive ? 'text-blue-400' : 'text-gray-500'}`}>
                          0{index + 1} | {step.subtitle}
                        </span>
                        <h3 className="text-xl md:text-3xl font-outfit text-white mb-3 md:mb-4 font-light tracking-tight">
                          {step.title}
                        </h3>
                        <p className="text-gray-400 text-xs md:text-base leading-relaxed font-light">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Connecting Line Decoration */}
                  <div className={`hidden md:block absolute top-1/2 w-16 h-[1px] bg-gradient-to-r from-white/20 to-transparent ${isEven ? 'right-[50%] mr-6' : 'left-[50%] ml-6'} ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Final CTA in Timeline */}
        <div className="relative z-10 mt-20 md:mt-32 animate-on-scroll text-center">
          <button
            onClick={onOpenModal}
            className="group relative px-10 py-5 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
            <div className="relative flex items-center gap-3">
              <span className="text-white font-outfit font-semibold tracking-wider">INICIAR MINHA JORNADA</span>
              <svg className="w-5 h-5 text-white animate-bounce-x" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </button>
        </div>
      </section>

      {/* Liquid Glass Agency Introduction Section */}
      <section ref={dnaRef} id="about" className="relative z-10 w-full px-4 md:px-8 flex flex-col items-center justify-center overflow-hidden min-h-[100dvh]">
        {/* Background Liquid Elements - Enhanced for better glass visibility */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
          <div className="animate-liquid absolute top-[0%] left-[10%] w-[60vw] h-[60vw] bg-blue-600/20 blur-[120px] opacity-40"></div>
          <div className="animate-liquid absolute bottom-[0%] right-[10%] w-[50vw] h-[50vw] bg-purple-600/15 blur-[120px] opacity-30" style={{ animationDirection: 'reverse', animationDuration: '30s' }}></div>
          <div className="absolute top-[20%] right-[15%] w-[30vw] h-[30vw] bg-indigo-500/10 blur-[100px] rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <div className="flex flex-col items-center text-center">

            {/* Content Side */}
            <div className="animate-on-scroll">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 mb-6 backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                <span className="text-[11px] tracking-[0.3em] uppercase text-blue-300 font-outfit font-medium text-shadow-sm">Sobre a Mindflow</span>
              </div>

              <h2 className="font-outfit text-4xl md:text-6xl font-light text-white mb-5 tracking-tight leading-[1.05]">
                Dois serviços. <br />
                <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-[length:200%_auto] animate-[sheen_8s_linear_infinite]">Zero distração.</span>
              </h2>

              <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed mb-8 max-w-2xl mx-auto">
                A gente não tenta fazer tudo. Faz <span className="text-white font-medium">duas coisas, muito bem feitas</span>: tráfego pago que traz lead qualificado, e landing page premium que converte. Quem precisa de "tudo e mais um pouco" contrata 5 fornecedores. Quem precisa <span className="text-white font-medium">vender mais agora</span>, contrata a gente.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                {[
                  { title: "Foco Absoluto", desc: "Não dispersamos esforço. Tráfego e landing trabalham juntos, planejados pelo mesmo time com a mesma estratégia." },
                  { title: "Padrão Premium", desc: "Cada landing é feita do zero, cada campanha é estruturada com critério. Nada de template, nada de fórmula pronta." }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group p-5 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-blue-500/40 hover:bg-white/[0.06] transition-all duration-500 shadow-2xl hover:-translate-y-2 text-left relative overflow-hidden"
                    style={{
                      backdropFilter: 'blur(30px)',
                      WebkitBackdropFilter: 'blur(30px)',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255,255,255,0.05)'
                    }}
                  >
                    {/* Glass highlight effect */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <h4 className="text-white font-outfit font-medium text-lg mb-2 group-hover:text-blue-400 transition-colors relative z-10">{item.title}</h4>
                    <p className="text-gray-400 font-light text-sm leading-relaxed relative z-10">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section ref={portfolioRef} id="portfolio" className="relative z-10 w-full px-4 md:px-8 py-24 md:py-32 flex flex-col items-center overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none z-0"></div>

        {/* Section Header */}
        <div className="relative z-10 max-w-4xl mx-auto w-full mb-16 md:mb-20 text-center animate-on-scroll">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-6 backdrop-blur-md">
            <span className="text-[11px] tracking-[0.3em] uppercase text-gray-400 font-outfit font-medium">Nosso Portfólio</span>
          </div>
          <h2 className="font-outfit text-4xl md:text-5xl font-light text-white mb-6 tracking-tight leading-tight">
            Experiências digitais que <span className="font-medium text-blue-400">geram lucro</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Desenvolvemos landing pages premium e estruturas de alta performance projetadas especificamente para reter atenção, transmitir autoridade e converter cliques em vendas reais.
          </p>
        </div>

        {/* Carousel Outer Frame */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
          {/* Controls Header (Arrow controllers for desktop) */}
          <div className="flex justify-end gap-3 mb-6">
            <button
              onClick={() => scrollCarousel('prev')}
              className="w-12 h-12 rounded-full bg-[#080b14]/40 hover:bg-[#0c0f1d]/85 backdrop-blur-md border border-white/10 hover:border-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 transform active:scale-95 cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] animate-on-scroll"
              aria-label="Anterior"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button
              onClick={() => scrollCarousel('next')}
              className="w-12 h-12 rounded-full bg-[#080b14]/40 hover:bg-[#0c0f1d]/85 backdrop-blur-md border border-white/10 hover:border-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 transform active:scale-95 cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] animate-on-scroll"
              aria-label="Próximo"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>

          {/* Carousel Slider Container */}
          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth select-none pb-8 pt-4 no-scrollbar -mx-4 px-4 md:-mx-8 md:px-8"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {portfolioProjects.map((project) => (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[290px] sm:min-w-[360px] md:min-w-[400px] max-w-[400px] snap-start snap-always animate-on-scroll block cursor-pointer group"
              >
                <div
                  className="relative p-5 rounded-[2.5rem] bg-[#080b14]/30 backdrop-blur-3xl border border-white/10 hover:border-blue-500/30 hover:bg-[#0a0f1d]/40 transition-all duration-500 h-full flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_60px_rgba(59,130,246,0.08)] hover:-translate-y-1.5"
                  style={{
                    boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)'
                  }}
                >
                  {/* Subtle top light inside the card */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>

                  {/* Browser Mockup Header */}
                  <div className="w-full rounded-2xl overflow-hidden mb-5 aspect-[16/10] relative shadow-2xl border border-white/10 flex flex-col bg-[#0b0e17]">
                    {/* Browser Address Bar */}
                    <div className="w-full h-7 px-4 flex items-center gap-1.5 border-b border-white/5" style={{ backgroundColor: project.mockup.headerBg }}>
                      <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500/80"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
                      <div className="h-4 flex-1 max-w-[200px] mx-auto rounded-full bg-white/5 border border-white/5 flex items-center justify-center px-3 gap-1">
                        <svg className="w-1.5 h-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                        <span className="text-[7px] text-gray-400/80 truncate font-light tracking-wide">{project.domain || `${project.title.toLowerCase().replace(/\s+/g, '')}.com.br`}</span>
                      </div>
                    </div>
                    {/* Browser Viewport */}
                    <div className={`flex-1 w-full overflow-hidden relative ${project.mockup.bg} transition-all duration-750 group-hover:scale-[1.03]`}>
                      {project.mockup.previewElement}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex-grow flex flex-col justify-between pt-2">
                    <div>
                      {/* Brand Info & Tag */}
                      <div className="mb-3">
                        <span className={`text-[9px] tracking-[0.25em] uppercase font-bold px-2.5 py-1 rounded-full bg-white/[0.03] border ${project.mockup.accent}`}>
                          {project.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-outfit font-medium text-white mb-2 tracking-tight group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 font-light text-xs md:text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Carousel Progress Tracking Line */}
          <div className="w-full max-w-xs mx-auto h-[2px] bg-white/5 rounded-full overflow-hidden mt-6 relative">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-150"
              style={{ width: `${carouselProgress}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={clientsRef} id="clients" className="relative z-10 w-full px-4 md:px-8 pt-16 md:pt-24 pb-24 md:pb-32 flex flex-col items-center">
        <div className="relative z-10 max-w-7xl mx-auto w-full animate-on-scroll">
          <div className="text-center mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-6 backdrop-blur-md">
              <span className="text-[11px] tracking-[0.3em] uppercase text-gray-400 font-outfit font-medium">Resultados Reais</span>
            </div>
            <h2 className="font-outfit text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
              Negócios que entenderam <span className="font-medium text-blue-400">o jogo</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
              Tráfego sem landing boa é dinheiro jogado fora. Landing sem tráfego é página parada. Junto, vira máquina de venda. Quem entendeu isso, parou de improvisar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-[2.5rem] blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative p-8 rounded-[2.5rem] bg-[#080b14]/40 backdrop-blur-3xl border border-white/10 h-full flex flex-col transition-all duration-500 hover:translate-y-[-8px] hover:bg-[#0a0f1c]/60">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(t.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 font-light leading-relaxed mb-8 italic flex-grow">
                    "{t.content}"
                  </p>
                  <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500/25 to-purple-500/25 border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                      <span className="font-outfit font-semibold text-lg text-white">{t.letter}</span>
                    </div>
                    <div className="text-left">
                      <h4 className="text-white font-outfit font-medium text-sm">{t.company}</h4>
                      <p className="text-gray-500 text-[10px] uppercase tracking-wider">{t.segment}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} id="faq" className="relative z-10 w-full px-4 md:px-8 py-24 md:py-32 bg-[#02040a]">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-6 backdrop-blur-md">
              <span className="text-[11px] tracking-[0.3em] uppercase text-gray-400 font-outfit font-medium">Antes de Falar com a Gente</span>
            </div>
            <h2 className="font-outfit text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
              O que <span className="font-medium text-blue-400">todo mundo</span> pergunta
            </h2>
          </div>

          <div className="space-y-4 animate-on-scroll">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`group border transition-all duration-500 rounded-3xl overflow-hidden ${activeFaq === index
                  ? 'bg-white/[0.04] border-white/20'
                  : 'bg-white/[0.01] border-white/5 hover:border-white/10'
                  }`}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className={`font-outfit text-base md:text-lg transition-colors duration-300 ${activeFaq === index ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-300'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${activeFaq === index
                    ? 'border-blue-500 bg-blue-500 text-white rotate-180'
                    : 'border-white/10 text-gray-500 group-hover:border-white/20'
                    }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activeFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                  <div className="px-8 pb-8 text-gray-400 font-light leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / CTA Section */}
      <footer ref={footerRef} className="relative z-10 w-full px-4 md:px-8 py-20 mt-20 border-t border-white/5 bg-[#02040a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img src="/logo-mindflow.png" alt="Mindflow" className="h-10 mb-6 opacity-80" />
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed font-light">
              Especialistas em tráfego pago e landing pages premium. Foco no que importa: levar o cliente certo até você, e fazer ele comprar.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-xs font-outfit tracking-widest text-gray-400 uppercase">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <button onClick={onOpenModal} className="hover:text-white transition-colors">Falar com Especialista</button>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="text-gray-600 text-[10px] tracking-[0.2em] font-light uppercase">
              © 2026 MINDFLOW AI.
            </div>
            <div className="text-gray-700 text-[9px] tracking-widest font-light uppercase">
              CNPJ 00.000.000/0001-00
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

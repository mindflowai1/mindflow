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
      title: 'Tráfego Estratégico',
      subtitle: 'Atração',
      description: 'Atração de leads qualificados através de campanhas cirúrgicas em Meta Ads e Google Ads.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      id: 'step2',
      title: 'Presença Digital',
      subtitle: 'Conversão',
      description: 'Landing pages de alta conversão desenhadas com neurodesign para maximizar seus resultados.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'step3',
      title: 'Atendimento IA',
      subtitle: 'Qualificação',
      description: 'Nossa IA qualifica seus leads em tempo real, garantindo resposta imediata e agendamento automático.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )
    },
    {
      id: 'step4',
      title: 'CRM & Gestão',
      subtitle: 'Venda',
      description: 'Controle total do seu funil de vendas. Dashboard inteligente para acompanhamento de ROI e conversão.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  const timelineRef = useRef(null);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      question: "Como a Mindflow escala meu negócio?",
      answer: "Através de uma operação 360º. Nós não apenas rodamos anúncios; nós construímos a estrutura de conversão (Landing Pages), qualificamos o lead com IA em tempo real e entregamos o cliente pronto para fechar no seu CRM."
    },
    {
      question: "Eu preciso contratar ferramentas por fora?",
      answer: "Não. A Mindflow é uma solução completa. Nós fornecemos a tecnologia de IA, as automações e as ferramentas de gestão. Você só precisa focar em atender os leads qualificados que geramos."
    },
    {
      question: "Quanto tempo para ver os primeiros resultados?",
      answer: "Nossas estratégias de tráfego começam a gerar leads em até 48h após a ativação. O amadurecimento da operação e a otimização da IA geralmente atingem o pico entre 30 e 60 dias."
    },
    {
      question: "A Mindflow atende qualquer tipo de empresa?",
      answer: "Focamos em negócios que buscam escala previsível: empresas de serviços, consultorias, B2B e operações locais de alto ticket que precisam de um processo comercial profissional e automatizado."
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Rodrigo Alencar",
      role: "Diretor de Operações",
      company: "Grupo Vanguarda",
      content: "A operação da Mindflow eliminou o gap entre marketing e vendas. A IA qualificando leads no WhatsApp mudou o jogo para o nosso comercial.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=rodrigo"
    },
    {
      id: 2,
      name: "Beatriz Soares",
      role: "Fundadora",
      company: "Lumina Estética",
      content: "Design impecável e tráfego cirúrgico. Minha agenda está lotada há 4 meses seguidos. A melhor decisão que tomamos para a marca.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=beatriz"
    },
    {
      id: 3,
      name: "Henrique Mendes",
      role: "CMO",
      company: "Nexum SaaS",
      content: "A integração com o CRM e a transparência nos dados é o que nos dá segurança para investir cada vez mais. Resultados reais, sem desculpas.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=henrique"
    }
  ];

  // Scroll logic for Timeline and Parallax
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Hero parallax
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
    };

    window.addEventListener('scroll', handleScroll);
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

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-[#020409]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'}`}>
        <a href="#experience" onClick={closeMobileMenu} className="text-3xl font-outfit font-light text-gray-200 hover:text-white transition-all duration-300 hover:tracking-wider">A Jornada</a>
        <a href="#about" onClick={closeMobileMenu} className="text-3xl font-outfit font-light text-gray-200 hover:text-white transition-all duration-300 hover:tracking-wider">Sobre</a>
        <a href="#clients" onClick={closeMobileMenu} className="text-3xl font-outfit font-light text-gray-200 hover:text-white transition-all duration-300 hover:tracking-wider">Nossos Clientes</a>
        <a href="#faq" onClick={closeMobileMenu} className="text-3xl font-outfit font-light text-gray-200 hover:text-white transition-all duration-300 hover:tracking-wider">Dúvidas</a>
        <div className="mt-6">
          <button onClick={() => { closeMobileMenu(); onOpenModal(); }} className="bg-white text-black px-8 py-3.5 rounded-full font-outfit font-semibold text-lg hover:bg-gray-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] cursor-pointer">
            Falar com a Agência
          </button>
        </div>
      </div>

      {/* Hero Content */}
      <main ref={heroRef} className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full min-h-[100dvh] pt-32 md:pt-40 pb-20 transition-transform duration-100 ease-out">
        <h1 className="animate-on-scroll font-outfit text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] leading-[1.1] tracking-tight md:tracking-[-0.03em] font-light mb-6 md:mb-8 [text-shadow:0_4px_30px_rgba(0,0,0,0.8)]">
          <span className="block text-white">Tráfego que atrai.</span>
          <span className="block text-gray-200">Design que converte.</span>
          <span className="block text-gray-400">IA que vende.</span>
        </h1>
        <p className="animate-on-scroll text-gray-300 text-base md:text-lg max-w-[500px] md:max-w-[600px] mx-auto leading-relaxed font-light [text-shadow:0_2px_15px_rgba(0,0,0,1)]" style={{ transitionDelay: '100ms' }}>
          Sua agência 360º de marketing e IA. Assumimos sua operação comercial: anúncios, landing pages, automação e CRM. Você foca apenas em vender.
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

      <section ref={timelineRef} id="experience" className="relative z-10 w-full px-4 md:px-8 pt-32 md:pt-48 pb-16 md:pb-24 flex flex-col items-center overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none z-0"></div>

        {/* Section Header */}
        <div className="relative z-10 max-w-4xl mx-auto w-full mb-24 md:mb-32 text-center animate-on-scroll">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-6 backdrop-blur-md">
            <span className="text-[11px] tracking-[0.3em] uppercase text-gray-400 font-outfit font-medium">A Jornada Mindflow</span>
          </div>
          <h2 className="font-outfit text-4xl md:text-6xl font-light text-white mb-8 tracking-tight leading-tight">
            Do primeiro clique ao <span className="font-medium text-blue-400">lucro real</span>
          </h2>
          <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Uma linha do tempo estratégica desenhada para escalar sua operação sem que você precise tocar em uma única ferramenta.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative z-10 max-w-5xl mx-auto w-full px-4">

          {/* Central Animated Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5 overflow-hidden">
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
                <div key={step.id} className="relative flex items-center justify-center w-full">

                  {/* Central Node */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-30">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-700 ${isActive ? 'bg-blue-600 scale-110 shadow-[0_0_30px_rgba(59,130,246,0.6)]' : 'bg-[#080b14] border border-white/20'}`}>
                      <div className={`text-white transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                        {step.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-[45%] ${isEven ? 'md:mr-auto md:pr-12 text-center md:text-right' : 'md:ml-auto md:pl-12 text-center md:text-left'} mt-16 md:mt-0`}>
                    <div
                      className={`group relative p-8 rounded-[2rem] bg-white/[0.02] border transition-all duration-1000 transform animate-on-scroll ${isActive
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
                        <h3 className="text-2xl md:text-3xl font-outfit text-white mb-4 font-light tracking-tight">
                          {step.title}
                        </h3>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
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
      <section id="about" className="relative z-10 w-full px-4 md:px-8 pt-16 md:pt-24 pb-16 md:pb-24 flex flex-col items-center overflow-hidden animate-on-scroll">
        {/* Background Liquid Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
          <div className="animate-liquid absolute top-[10%] left-[20%] w-[40vw] h-[40vw] bg-blue-600/10 blur-[100px] opacity-40"></div>
          <div className="animate-liquid absolute bottom-[10%] right-[20%] w-[35vw] h-[35vw] bg-purple-600/10 blur-[100px] opacity-30" style={{ animationDirection: 'reverse', animationDuration: '25s' }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Content Side */}
            <div className="animate-on-scroll text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 mb-8 backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                <span className="text-[11px] tracking-[0.3em] uppercase text-blue-300 font-outfit font-medium text-shadow-sm">A Agência Mindflow</span>
              </div>

              <h2 className="font-outfit text-5xl md:text-7xl font-light text-white mb-8 tracking-tight leading-[1.05]">
                Sua Operação <br />
                <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-[length:200%_auto] animate-[sheen_8s_linear_infinite]">Turbo-IA.</span>
              </h2>

              <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl">
                Somos uma agência de inteligência artificial que promove uma <span className="text-white font-medium">solução de marketing e comercial completa</span> para o seu negócio.
                Do tráfego à conversão final, automatizamos cada etapa para sua escala ser inevitável.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                {[
                  { title: "Escalabilidade", desc: "Processos desenhados para crescer sem perder qualidade." },
                  { title: "Automação", desc: "Sua equipe focada no fechamento, nossa IA no resto." }
                ].map((item, i) => (
                  <div key={i} className="group p-8 rounded-[2rem] bg-white/[0.03] backdrop-blur-2xl border border-white/10 hover:border-blue-500/40 hover:bg-white/[0.06] transition-all duration-500 shadow-2xl hover:-translate-y-2">
                    <h4 className="text-white font-outfit font-medium text-xl mb-3 group-hover:text-blue-400 transition-colors">{item.title}</h4>
                    <p className="text-gray-400 font-light text-base leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Liquid Glass Card Side */}
            <div className="animate-on-scroll relative group" style={{ transitionDelay: '200ms' }}>
              {/* Refraction Elements */}
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDelay: '1s' }}></div>

              {/* The "Liquid Glass" Container */}
              <div 
                className="relative p-12 md:p-16 rounded-[3.5rem] border border-white/20 shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden transition-transform duration-700 hover:scale-[1.02] group"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.03) 100%)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                }}
              >
                {/* Refractive Inner Glow */}
                <div className="absolute inset-0 rounded-[3.5rem] shadow-[inset_0_0_80px_rgba(255,255,255,0.05)] pointer-events-none"></div>
                
                {/* Glossy Reflection overlay */}
                <div className="absolute top-0 left-0 w-full h-[150%] bg-gradient-to-b from-white/[0.12] via-transparent to-transparent -skew-y-12 transform -translate-y-[40%] pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mb-10 shadow-[0_20px_50px_rgba(59,130,246,0.4)] relative">
                    <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
                    <img src="/logo-mindflow.png" alt="MF" className="w-14 h-14 object-contain brightness-0 invert relative z-10" />
                  </div>

                  <h3 className="text-3xl md:text-4xl font-outfit text-white mb-6 font-light tracking-tight">
                    A Nova <span className="font-semibold text-blue-400">Era</span>
                  </h3>

                  <p className="text-gray-300 text-lg leading-relaxed mb-10 font-light max-w-sm">
                    "Unimos o poder da IA generativa com estratégias comerciais validadas para criar um motor de vendas autônomo."
                  </p>

                  <button
                    onClick={onOpenModal}
                    className="group/btn relative w-full py-5 rounded-2xl bg-white text-black font-outfit font-bold tracking-tight overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(59,130,246,0.3)] hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                    <span className="relative z-10 group-hover/btn:text-white transition-colors">QUERO EVOLUIR AGORA</span>
                  </button>

                  <div className="mt-8 flex items-center gap-2">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                    <span className="text-gray-500 text-[10px] uppercase tracking-widest font-medium">+150 OPERAÇÕES ESCALADAS</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="clients" className="relative z-10 w-full px-4 md:px-8 pt-16 md:pt-24 pb-24 md:pb-32 flex flex-col items-center animate-on-scroll">
        <div className="relative z-10 max-w-7xl mx-auto w-full animate-on-scroll">
          <div className="text-center mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-6 backdrop-blur-md">
              <span className="text-[11px] tracking-[0.3em] uppercase text-gray-400 font-outfit font-medium">Prova Social</span>
            </div>
            <h2 className="font-outfit text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
              Resultados que <span className="font-medium text-blue-400">falam por si</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
              Escalabilidade comprovada por quem vive o dia a dia da operação e já transformou seus resultados com a Mindflow.
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
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 bg-gray-800">
                      <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-white font-outfit font-medium text-sm">{t.name}</h4>
                      <p className="text-gray-500 text-[10px] uppercase tracking-wider">{t.role} • {t.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-10 w-full px-4 md:px-8 py-24 md:py-32 bg-[#02040a] animate-on-scroll">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-6 backdrop-blur-md">
              <span className="text-[11px] tracking-[0.3em] uppercase text-gray-400 font-outfit font-medium">Dúvidas Frequentes</span>
            </div>
            <h2 className="font-outfit text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
              Tire suas <span className="font-medium text-blue-400">dúvidas</span>
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
      <footer className="relative z-10 w-full px-4 md:px-8 py-20 mt-20 border-t border-white/5 bg-[#02040a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img src="/logo-mindflow.png" alt="Mindflow" className="h-10 mb-6 opacity-80" />
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed font-light">
              Escalando negócios com o poder da Inteligência Artificial e design de alto padrão. Sua operação comercial no próximo nível.
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

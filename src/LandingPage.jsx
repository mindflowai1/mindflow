import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = ({ onOpenModal }) => {
  const navigate = useNavigate();
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);
  const [isPreloaderFading, setIsPreloaderFading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const videoRef = useRef(null);
  const heroRef = useRef(null);

  // Preloader Logic
  useEffect(() => {
    const hidePreloader = () => {
      setIsPreloaderFading(true);
      setTimeout(() => {
        setIsPreloaderVisible(false);
      }, 1000);
    };

    const bgVideo = videoRef.current;
    
    // Simpler fallback since we might be on mobile where video is hidden
    const isMobile = window.innerWidth < 768;
    
    if (bgVideo && !isMobile) {
      const fallbackTimeout = setTimeout(hidePreloader, 4000);
      if (bgVideo.readyState >= 3) {
        clearTimeout(fallbackTimeout);
        hidePreloader();
      } else {
        bgVideo.addEventListener('canplaythrough', () => {
          clearTimeout(fallbackTimeout);
          hidePreloader();
        }, { once: true });
        bgVideo.addEventListener('loadeddata', () => {
          setTimeout(() => { clearTimeout(fallbackTimeout); hidePreloader(); }, 500);
        }, { once: true });
      }
    } else {
      setTimeout(hidePreloader, 800);
    }
  }, []);

  // Parallax and Scroll Animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const opacity = Math.max(0, 1 - scrollY / 350);
      if (heroRef.current) {
        heroRef.current.style.opacity = opacity;
        heroRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll reveal
  useEffect(() => {
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

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
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

      {/* Mobile Animated Background — Nexus Geometry */}
      <div className="md:hidden fixed inset-0 z-0 w-full h-full bg-black overflow-hidden pointer-events-none">
        {/* Far Right Dark Blue */}
        <div className="absolute top-0 bottom-0" style={{ left: '75vw', width: '60vw', background: 'linear-gradient(160deg, #000844 0%, #000011 50%, #000000 100%)', backgroundSize: '200% 200%', zIndex: 1, animation: 'nexus-right 12s ease-in-out infinite' }}></div>
        {/* Middle Royal Blue */}
        <div className="absolute top-0 bottom-0" style={{ left: '15vw', width: '60vw', background: 'linear-gradient(160deg, #001a99 0%, #00001a 50%, #000000 100%)', backgroundSize: '200% 200%', borderRight: '1px solid rgba(255,255,255,0.05)', zIndex: 2, animation: 'nexus-mid 10s ease-in-out infinite 1s' }}></div>
        {/* Top Left Cyan (Now Darker Blue) */}
        <div className="absolute top-0 bottom-0" style={{ left: '-50vw', width: '90vw', background: 'linear-gradient(150deg, #0033aa 0%, #001144 40%, #000000 80%)', backgroundSize: '200% 200%', borderRight: '1px solid rgba(255,255,255,0.15)', zIndex: 3, animation: 'nexus-left 8s ease-in-out infinite 0.5s' }}></div>
        
        {/* Noise Overlay for premium texture */}
        <div className="absolute inset-0 z-10 opacity-[0.06] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        
        {/* Floating particles for extra dynamism */}
        <div className="absolute rounded-full bg-cyan-400/20 blur-xl pointer-events-none" style={{ width: '150px', height: '180px', left: '10%', top: '20%', zIndex: 4, animation: 'particle-drift-1 14s linear infinite' }}></div>
        <div className="absolute rounded-full bg-cyan-400/20 blur-xl pointer-events-none" style={{ width: '250px', height: '150px', left: '60%', top: '70%', zIndex: 4, animation: 'particle-drift-2 18s linear infinite' }}></div>
        <div className="absolute rounded-full bg-cyan-400/20 blur-xl pointer-events-none" style={{ width: '120px', height: '220px', left: '80%', top: '10%', zIndex: 4, animation: 'particle-drift-3 12s linear infinite' }}></div>
      </div>

      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="animate-glow-outer absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] blur-[120px] rounded-[100%]"></div>
        <div class="animate-glow-inner absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[60%] h-[20%] blur-[80px] rounded-[100%]"></div>
        <div className="absolute top-1/2 -translate-y-1/2 -left-32 w-64 h-[60%] bg-blue-700/20 blur-[100px] rounded-full"></div>
        <div className="absolute top-1/2 -translate-y-1/2 -right-32 w-64 h-[60%] bg-blue-700/20 blur-[100px] rounded-full"></div>
      </div>

      {/* Floating Glass Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl px-6 py-4 rounded-full bg-[#080b14]/25 backdrop-blur-2xl border border-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex items-center justify-between transition-all duration-500 hover:bg-[#0a0f1c]/40 hover:border-white/25">
        
        {/* Logo (Left) */}
        <div onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex items-center gap-3 group cursor-pointer">
          <img src="/logo-mindflow.png" alt="Mindflow Logo" className="h-8 md:h-10 object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:drop-shadow-[0_0_25px_rgba(59,130,246,0.5)] group-hover:scale-105 transition-all duration-300" />
        </div>

        {/* Navigation Links (Center) */}
        <div className="hidden lg:flex items-center space-x-10 text-sm font-outfit font-medium text-gray-300">
          <button onClick={() => navigate('/services')} className="hover:text-white hover:drop-shadow-[0_0_10px_white] transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-blue-400 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">Ecossistema</button>
          <a href="#experience" className="hover:text-white hover:drop-shadow-[0_0_10px_white] transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-blue-400 hover:after:w-full after:transition-all after:duration-300">Como Funciona</a>
          <a href="#clients" className="hover:text-white hover:drop-shadow-[0_0_10px_white] transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-blue-400 hover:after:w-full after:transition-all after:duration-300">Nossos Clientes</a>
          <a href="#faq" className="hover:text-white hover:drop-shadow-[0_0_10px_white] transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-blue-400 hover:after:w-full after:transition-all after:duration-300">Dúvidas</a>
        </div>

        {/* CTA Button (Right) */}
        <div className="hidden md:flex items-center">
          <button onClick={onOpenModal} className="bg-white/10 text-white border border-white/20 px-6 py-2.5 rounded-full font-outfit font-semibold hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transform hover:-translate-y-0.5 cursor-pointer">
            Falar com a Agência
          </button>
        </div>

        {/* Mobile Menu Button */}
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
        <button onClick={() => { closeMobileMenu(); navigate('/services'); }} className="text-3xl font-outfit font-light text-gray-200 hover:text-white transition-all duration-300 hover:tracking-wider">Ecossistema</button>
        <a href="#experience" onClick={closeMobileMenu} className="text-3xl font-outfit font-light text-gray-200 hover:text-white transition-all duration-300 hover:tracking-wider">Como Funciona</a>
        <a href="#clients" onClick={closeMobileMenu} className="text-3xl font-outfit font-light text-gray-200 hover:text-white transition-all duration-300 hover:tracking-wider">Nossos Clientes</a>
        <a href="#faq" onClick={closeMobileMenu} className="text-3xl font-outfit font-light text-gray-200 hover:text-white transition-all duration-300 hover:tracking-wider">Dúvidas</a>
        <div className="mt-6">
          <button onClick={() => { closeMobileMenu(); onOpenModal(); }} className="bg-white text-black px-8 py-3.5 rounded-full font-outfit font-semibold text-lg hover:bg-gray-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] cursor-pointer">
            Falar com a Agência
          </button>
        </div>
      </div>

      {/* Hero Content */}
      <main ref={heroRef} className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full min-h-[calc(100vh-80px)] pt-28 md:pt-40 transition-transform duration-100 ease-out">
        {/* Headline */}
        <h1 className="animate-on-scroll font-outfit text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] leading-[1.1] tracking-tight md:tracking-[-0.03em] font-light mb-5 md:mb-8">
          <span className="block text-white">Tráfego que atrai.</span>
          <span className="block text-gray-200">Design que converte.</span>
          <span className="block text-gray-400">IA que vende.</span>
        </h1>

        {/* Subheading */}
        <p className="animate-on-scroll text-gray-400 text-sm md:text-base max-w-[480px] mx-auto mb-8 md:mb-10 leading-relaxed font-medium" style={{ transitionDelay: '100ms' }}>
          Sua agência 360º de marketing e IA. Assumimos sua operação comercial: anúncios, landing pages, automação e CRM. Você foca apenas em vender.
        </p>

        {/* Secondary CTA */}
        <button onClick={onOpenModal} className="animate-on-scroll group flex items-center justify-between bg-black/40 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white pl-5 pr-1.5 py-1.5 rounded-full transition-all duration-300 hover:border-white/20 select-none cursor-pointer" style={{ transitionDelay: '200ms' }}>
          <span className="text-sm font-medium mr-4">Quero uma operação completa</span>
          <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </button>
      </main>
    </div>
  );
};

export default LandingPage;

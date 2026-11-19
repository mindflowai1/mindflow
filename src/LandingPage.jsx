import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, MapPin, Star, Check, X, Zap, Clock, Repeat, Target,
  BarChart3, QrCode, ShieldCheck, MessagesSquare, CalendarCheck, FileText,
  Megaphone, Users, BookOpen, Lock, Bot, UserCheck, Sparkles, ArrowRight,
  Globe, Phone, Moon, Hourglass, TrendingUp, BadgeCheck, Kanban,
} from 'lucide-react';
import { BrandLogo, BRANDS } from './BrandLogos';

/* ──────────────────────────────────────────────────────────────
   Conteúdo
   ────────────────────────────────────────────────────────────── */

const navLinks = [
  { href: '#jornada', label: 'Como funciona' },
  { href: '#prospeccao', label: 'Prospecção' },
  { href: '#funil', label: 'IA no funil' },
  { href: '#conexao', label: 'Conexão' },
  { href: '#faq', label: 'Dúvidas' },
];

const pains = [
  { icon: Moon, text: 'O cliente mandou mensagem às 22h. Às 9h, já tinha fechado com o concorrente.' },
  { icon: Hourglass, text: '“Vou pensar.” E ninguém nunca mais falou com ele.' },
  { icon: Kanban, text: 'Seu funil está desatualizado, porque ninguém tem tempo de mover card.' },
  { icon: Megaphone, text: 'Você paga anúncio todo mês sem saber qual deles traz venda.' },
  { icon: Target, text: 'Sua agenda depende de indicação. Quando ela para, tudo para.' },
];

const timelineSteps = [
  {
    id: 'encontra',
    title: 'Encontra o cliente',
    subtitle: 'Prospecção ativa',
    description: 'Você diz quem é o seu cliente ideal e onde ele está. A Mindflow encontra as empresas, escreve uma abordagem personalizada para cada uma e inicia a conversa no WhatsApp.',
    icon: Search,
    brands: ['googleMaps'],
  },
  {
    id: 'atende',
    title: 'Atende na hora',
    subtitle: 'IA 24 horas',
    description: 'Cada mensagem respondida em segundos, de dia, de noite e no fim de semana. A IA conhece seus serviços, preços e regras, e conversa como gente, sem menu de “digite 1”.',
    icon: Zap,
    brands: ['whatsapp', 'instagram', 'facebook'],
  },
  {
    id: 'conduz',
    title: 'Conduz até a venda',
    subtitle: 'Funil no automático',
    description: 'A IA qualifica, move o cliente de etapa, marca horário e retoma quem sumiu. Seu vendedor só entra quando o cliente está pronto, já com todo o histórico.',
    icon: Repeat,
    brands: ['googleCalendar'],
  },
  {
    id: 'mostra',
    title: 'Mostra o que vende',
    subtitle: 'Do anúncio à venda',
    description: 'Saiba qual campanha e qual anúncio trouxe cada cliente, quanto cada atendente vendeu e quanto falta para a meta do mês.',
    icon: BarChart3,
    brands: ['meta', 'googleAds'],
  },
];

const integrations = ['whatsapp', 'meta', 'instagram', 'facebook', 'googleAds', 'googleCalendar', 'googleMaps'];

const prospectSteps = [
  { title: 'Diga quem você quer atender', desc: 'Segmento e cidade. Ou suba a sua própria planilha.' },
  { title: 'A Mindflow encontra as empresas', desc: 'Telefone, site, avaliações e redes, direto do Google Maps.' },
  { title: 'A IA escreve, você aprova', desc: 'Uma abordagem personalizada para cada empresa. Nada sai sem o seu ok.' },
  { title: 'Quem responde vira oportunidade', desc: 'A IA conversa, qualifica e coloca o interessado no seu funil.' },
];

const prospectCompanies = [
  { name: 'Odonto Prime', rating: '4,9', reviews: 312, site: true },
  { name: 'Clínica Sorrir Mais', rating: '4,7', reviews: 188, site: false },
  { name: 'Dental Center Savassi', rating: '4,8', reviews: 254, site: true },
  { name: 'Instituto Oral Pampulha', rating: '4,6', reviews: 97, site: false },
];

const kanbanColumns = ['Novo lead', 'Qualificado', 'Agendado', 'Fechado'];

const kanbanEvents = [
  { col: 0, who: 'ia', text: 'Ana chegou pelo anúncio “Clareamento”. A IA respondeu em 4 segundos.' },
  { col: 1, who: 'ia', text: 'A IA confirmou interesse e orçamento, e moveu Ana para Qualificado.' },
  { col: 2, who: 'ia', text: 'A IA marcou a avaliação para quinta, 14h, e avisou a recepção.' },
  { col: 3, who: 'time', text: 'Seu time assumiu com todo o histórico e fechou: R$ 2.400.' },
];

const connections = [
  {
    icon: QrCode,
    brand: 'whatsapp',
    badge: 'Comece hoje',
    title: 'Pelo QR Code',
    lead: 'Use o número que você já tem. Sem burocracia, conectado em um minuto.',
    points: [
      'Vários números numa tela só',
      'Envio em ritmo humano e só em horário comercial',
      'Aquecimento automático de números novos',
    ],
  },
  {
    icon: BadgeCheck,
    brand: 'meta',
    badge: 'Escale com segurança',
    title: 'Pela API oficial da Meta',
    lead: 'O canal oficial do WhatsApp, feito para volume e para quem não pode correr risco.',
    points: [
      'Disparos em escala sem risco de bloqueio',
      'Mensagens modelo aprovadas e sincronizadas',
      'Rastreio automático de quem vem dos anúncios',
    ],
  },
];

const comparison = [
  { label: 'Responde o cliente na hora, 24h', crm: false, bot: 'Com menu de opções', mf: 'Conversando como gente' },
  { label: 'Vai atrás de clientes novos', crm: false, bot: false, mf: true },
  { label: 'Move o funil sozinho', crm: 'Manual', bot: false, mf: true },
  { label: 'Retoma quem sumiu', crm: 'Se alguém lembrar', bot: false, mf: true },
  { label: 'Passa para o vendedor na hora certa', crm: false, bot: 'Sem contexto', mf: 'Com todo o histórico' },
  { label: 'Mostra qual anúncio vendeu', crm: false, bot: false, mf: true },
];

const features = [
  { icon: MessagesSquare, brands: ['whatsapp', 'instagram', 'facebook'], title: 'Uma caixa de entrada', desc: 'WhatsApp, Instagram e Facebook numa tela só, com toda a equipe.' },
  { icon: CalendarCheck, brands: ['googleCalendar'], title: 'Agenda', desc: 'Horários marcados pela IA e sincronizados com o Google Agenda, com aviso para o time e para o cliente.' },
  { icon: FileText, title: 'Propostas', desc: 'Do orçamento ao aceite, com modelos prontos da sua empresa.' },
  { icon: Megaphone, title: 'Campanhas', desc: 'Fale com uma lista de contatos no ritmo seguro do seu número.' },
  { icon: Users, title: 'Equipe', desc: 'Distribuição automática de atendimento e permissões por função.' },
  { icon: BookOpen, title: 'Conhecimento da IA', desc: 'Ensine seus serviços, preços e regras. Ela consulta antes de responder.' },
  { icon: TrendingUp, brands: ['meta', 'googleAds'], title: 'Desempenho e metas', desc: 'Resultado do Meta Ads e do Google Ads, vendas por atendente e progresso da meta do mês.' },
  { icon: Lock, title: 'Segurança e LGPD', desc: 'Dados protegidos, histórico de ações e pedidos de titulares.' },
];

const faqs = [
  {
    question: 'A IA vai falar besteira com meu cliente?',
    answer: 'Ela responde com base no que você ensina: seus serviços, preços, horários e regras. Quando não sabe a resposta, ou quando o cliente pede para falar com uma pessoa, ela passa a conversa para o seu time com todo o histórico. Você acompanha tudo em tempo real e pode assumir a qualquer momento.',
  },
  {
    question: 'Preciso trocar o meu número de WhatsApp?',
    answer: 'Não. Pelo QR Code você conecta o número que já usa, em um minuto. Se preferir a API oficial da Meta, a gente acompanha a migração com você. Dá para começar de um jeito e mudar depois.',
  },
  {
    question: 'Corro risco de ter o número bloqueado?',
    answer: 'A API oficial da Meta é o caminho mais seguro, porque é o canal do próprio WhatsApp. Pelo QR Code, a Mindflow envia em ritmo humano, respeita o horário comercial e aquece números novos, o que reduz muito o risco, mas nenhuma conexão não oficial elimina 100%. Para disparos e prospecção em volume, recomendamos a API oficial.',
  },
  {
    question: 'Como funciona a prospecção ativa?',
    answer: 'Você informa o segmento e a cidade (por exemplo, “clínicas odontológicas em Belo Horizonte”) ou sobe a sua própria lista. A Mindflow encontra as empresas, a IA escreve uma abordagem personalizada para cada uma e você aprova antes de qualquer envio. Quem responde vira oportunidade no seu funil. Quem já é seu cliente nunca é abordado, e a origem de cada contato fica registrada.',
  },
  {
    question: 'Serve para o meu negócio?',
    answer: 'Se você vende pelo WhatsApp, serve. O funil se adapta ao seu vocabulário: o lead pode ser cliente, paciente, aluno ou comprador, e a venda pode ser “fechado”, “agendado” ou “pago”. Clínicas, imobiliárias, escritórios, lojas, prestadores de serviço e infoprodutores já vendem assim.',
  },
  {
    question: 'Preciso entender de tecnologia para começar?',
    answer: 'Não. Você não configura nada sozinho: a gente conecta o seu WhatsApp, ensina a IA sobre o seu negócio e monta o seu funil junto com você. Depois disso, é só acompanhar.',
  },
  {
    question: 'Meus dados e os dos meus clientes ficam seguros?',
    answer: 'Sim. Os dados da sua empresa ficam isolados, todo acesso exige login com verificação em duas etapas disponível, e cada ação fica registrada num histórico que não se apaga. A Mindflow também tem ferramentas prontas para atender pedidos de exportação e exclusão de dados previstos na LGPD.',
  },
];

/* ──────────────────────────────────────────────────────────────
   Peças reutilizáveis
   ────────────────────────────────────────────────────────────── */

const SectionBadge = ({ children, live = false }) => (
  <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 backdrop-blur-md ${live ? 'border-blue-500/20 bg-blue-500/5' : 'border-white/10 bg-white/[0.03]'}`}>
    {live && <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>}
    <span className={`text-[11px] tracking-[0.3em] uppercase font-outfit font-medium ${live ? 'text-blue-300' : 'text-gray-400'}`}>{children}</span>
  </div>
);

const PrimaryButton = ({ onClick, children, className = '' }) => (
  <button
    onClick={onClick}
    className={`group relative px-8 md:px-10 py-4 md:py-5 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
    <div className="relative flex items-center gap-3">
      <span className="text-white font-outfit font-semibold tracking-wider">{children}</span>
      <ArrowRight className="w-5 h-5 text-white animate-bounce-x" />
    </div>
  </button>
);

const glassStyle = {
  backdropFilter: 'blur(30px)',
  WebkitBackdropFilter: 'blur(30px)',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255,255,255,0.05)',
};

const ComparisonCell = ({ value, highlight = false }) => {
  if (value === true) {
    return <Check className={`w-5 h-5 mx-auto ${highlight ? 'text-blue-400' : 'text-gray-400'}`} strokeWidth={2.5} />;
  }
  if (value === false) {
    return <X className="w-4 h-4 mx-auto text-gray-600" strokeWidth={2.5} />;
  }
  return (
    <span className={`block text-[10px] md:text-xs leading-snug ${highlight ? 'text-blue-300 font-medium' : 'text-gray-500'}`}>
      {highlight && <Check className="w-4 h-4 mx-auto mb-1 text-blue-400" strokeWidth={2.5} />}
      {value}
    </span>
  );
};

/* ──────────────────────────────────────────────────────────────
   Página
   ────────────────────────────────────────────────────────────── */

const LandingPage = ({ onOpenModal }) => {
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);
  const [isPreloaderFading, setIsPreloaderFading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [prospectStep, setProspectStep] = useState(0);
  const [kanbanStep, setKanbanStep] = useState(0);

  const videoRef = useRef(null);
  const heroRef = useRef(null);
  const timelineRef = useRef(null);

  // Demonstrações animadas (prospecção e funil) avançam sozinhas
  useEffect(() => {
    const p = setInterval(() => setProspectStep((s) => (s + 1) % prospectSteps.length), 3200);
    const k = setInterval(() => setKanbanStep((s) => (s + 1) % kanbanEvents.length), 2600);
    return () => { clearInterval(p); clearInterval(k); };
  }, []);

  // Parallax do hero + progresso da timeline
  useEffect(() => {
    let ticking = false;
    const runScroll = () => {
      const scrollY = window.scrollY;
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

  // Preloader e revelação ao rolar
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

  const navLinkClass = "hover:text-white hover:drop-shadow-[0_0_10px_white] transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-blue-400 hover:after:w-full after:transition-all after:duration-300";
  const currentKanban = kanbanEvents[kanbanStep];

  return (
    <div className="w-full relative min-h-screen">
      {/* Preloader */}
      {isPreloaderVisible && (
        <div className={`fixed inset-0 z-[100] bg-[#02040a] flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${isPreloaderFading ? 'opacity-0' : 'opacity-100'}`}>
          <img src="/logo-mindflow.png" alt="Mindflow" className="h-16 md:h-20 mb-8 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]" />
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full bg-blue-500 rounded-full w-1/2 shadow-[0_0_10px_rgba(59,130,246,0.8)]" style={{ animation: 'loading-bar 1.5s ease-in-out infinite' }}></div>
          </div>
        </div>
      )}

      {/* Vídeo de fundo (desktop) */}
      <video ref={videoRef} autoPlay loop muted playsInline className="hidden md:block fixed inset-0 w-full h-full object-cover z-0 opacity-40">
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Fundo animado (mobile) */}
      <div className="md:hidden fixed inset-0 z-0 w-full h-full bg-black overflow-hidden pointer-events-none">
        <div className="absolute top-0 bottom-0" style={{ left: '75vw', width: '60vw', background: 'linear-gradient(160deg, #000844 0%, #000011 50%, #000000 100%)', backgroundSize: '200% 200%', zIndex: 1, animation: 'nexus-right 12s ease-in-out infinite' }}></div>
        <div className="absolute top-0 bottom-0" style={{ left: '15vw', width: '60vw', background: 'linear-gradient(160deg, #001a99 0%, #00001a 50%, #000000 100%)', backgroundSize: '200% 200%', borderRight: '1px solid rgba(255,255,255,0.05)', zIndex: 2, animation: 'nexus-mid 10s ease-in-out infinite 1s' }}></div>
        <div className="absolute top-0 bottom-0" style={{ left: '-50vw', width: '90vw', background: 'linear-gradient(150deg, #0033aa 0%, #001144 40%, #000000 80%)', backgroundSize: '200% 200%', borderRight: '1px solid rgba(255,255,255,0.15)', zIndex: 3, animation: 'nexus-left 8s ease-in-out infinite 0.5s' }}></div>
        <div className="absolute inset-0 z-10 opacity-[0.06] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      </div>

      {/* Brilhos de fundo */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="animate-glow-outer absolute bottom-[-10%] left-1/2 w-[150%] md:w-[80%] h-[60%] md:h-[50%]" style={{ background: 'radial-gradient(ellipse at center, rgba(29, 78, 216, 0.25) 0%, rgba(0, 0, 0, 0) 70%)' }}></div>
        <div className="animate-glow-inner absolute bottom-[-5%] left-1/2 w-[120%] md:w-[60%] h-[40%] md:h-[30%]" style={{ background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.35) 0%, rgba(0, 0, 0, 0) 60%)' }}></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl px-6 py-4 rounded-full bg-[#080b14]/25 backdrop-blur-2xl border border-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex items-center justify-between transition-all duration-500 hover:bg-[#0a0f1c]/40 hover:border-white/25">
        <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group cursor-pointer">
          <img src="/logo-mindflow.png" alt="Mindflow" className="h-8 md:h-10 object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:drop-shadow-[0_0_25px_rgba(59,130,246,0.5)] group-hover:scale-105 transition-all duration-300" />
        </div>
        <div className="hidden lg:flex items-center space-x-10 text-sm font-outfit font-medium text-gray-300">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className={navLinkClass}>{l.label}</a>
          ))}
        </div>
        <div className="hidden md:flex items-center">
          <button onClick={onOpenModal} className="bg-white/10 text-white border border-white/20 px-6 py-2.5 rounded-full font-outfit font-semibold hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transform hover:-translate-y-0.5 cursor-pointer">
            Quero a Mindflow
          </button>
        </div>
        <button onClick={toggleMobileMenu} className="lg:hidden text-white p-2 relative z-50 cursor-pointer" aria-label="Abrir menu">
          <svg className={`w-6 h-6 transition-all duration-300 ${isMobileMenuOpen ? 'hidden' : 'block'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg className={`w-6 h-6 transition-all duration-300 ${isMobileMenuOpen ? 'block' : 'hidden'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>

      {/* Fade do topo (atrás da navbar) */}
      <div aria-hidden="true" className="fixed top-0 left-0 right-0 h-52 pointer-events-none z-40" style={{ background: 'linear-gradient(to bottom, rgba(2, 4, 10, 1) 0%, rgba(2, 4, 10, 1) 40%, rgba(2, 4, 10, 0) 100%)' }} />

      {/* Menu mobile */}
      <div className={`fixed inset-0 z-40 bg-[#020409]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'}`}>
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} onClick={closeMobileMenu} className="text-3xl font-outfit font-light text-gray-200 hover:text-white transition-all duration-300 hover:tracking-wider">{l.label}</a>
        ))}
        <div className="mt-6">
          <button onClick={() => { closeMobileMenu(); onOpenModal(); }} className="bg-white text-black px-8 py-3.5 rounded-full font-outfit font-semibold text-lg hover:bg-gray-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] cursor-pointer">
            Quero a Mindflow
          </button>
        </div>
      </div>

      {/* ── Hero ── */}
      <main ref={heroRef} className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full min-h-[100dvh] pt-32 md:pt-40 pb-32 md:pb-44 transition-transform duration-100 ease-out">
        <div className="animate-on-scroll">
          <SectionBadge live>Máquina de vendas com IA no WhatsApp</SectionBadge>
        </div>
        <h1 className="animate-on-scroll font-outfit text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] leading-[1.1] tracking-tight md:tracking-[-0.03em] font-light mb-6 md:mb-8 [text-shadow:0_4px_30px_rgba(0,0,0,0.8)]">
          <span className="block text-white">Encontra o cliente.</span>
          <span className="block text-gray-200">Atende na hora.</span>
          <span className="block text-gray-400">Conduz até a venda.</span>
        </h1>
        <p className="animate-on-scroll text-gray-300 text-base md:text-lg max-w-[500px] md:max-w-[640px] mx-auto leading-relaxed font-light mb-10 [text-shadow:0_2px_15px_rgba(0,0,0,1)]" style={{ transitionDelay: '100ms' }}>
          A <span className="text-white">Mindflow</span> vai atrás de clientes novos, responde cada um em segundos e leva cada negociação até o fechamento. <span className="text-white">Sozinha, 24 horas por dia.</span>
        </p>
        <div className="animate-on-scroll flex flex-col sm:flex-row items-center gap-4" style={{ transitionDelay: '200ms' }}>
          <PrimaryButton onClick={onOpenModal}>QUERO A MINDFLOW</PrimaryButton>
          <button onClick={() => document.getElementById('jornada')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 md:py-5 rounded-full border border-white/20 bg-white/[0.04] backdrop-blur-md text-white font-outfit font-medium hover:bg-white/10 hover:border-white/40 transition-all duration-300 cursor-pointer">
            Ver como funciona
          </button>
        </div>
        <div className="animate-on-scroll mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-400 font-outfit" style={{ transitionDelay: '300ms' }}>
          <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-blue-400" /> API oficial ou QR Code</span>
          <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-blue-400" /> Instagram e Facebook juntos</span>
          <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-blue-400" /> Implantação com a nossa equipe</span>
        </div>
      </main>

      {/* ── Integrações ── */}
      <section className="relative z-10 w-full px-4 md:px-8 py-10 md:py-14 border-t border-white/5 bg-[#02040a]/60">
        <div className="text-center mb-7 md:mb-9">
          <span className="text-[10px] tracking-[0.4em] uppercase text-gray-500 font-outfit font-medium">Conectada às ferramentas que você já usa</span>
        </div>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-5 md:gap-x-10">
          {integrations.map((name) => (
            <div key={name} className="flex items-center gap-2.5">
              <BrandLogo name={name} className="w-8 h-8 md:w-9 md:h-9" rounded="rounded-lg" />
              <span className="font-outfit text-sm md:text-base text-gray-300 whitespace-nowrap">{BRANDS[name].label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Dores ── */}
      <section id="dores" className="relative z-10 w-full px-4 md:px-8 py-24 md:py-32 border-y border-white/5 bg-[#02040a]/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 md:mb-20 animate-on-scroll">
            <SectionBadge>Soa familiar?</SectionBadge>
            <h2 className="font-outfit text-4xl md:text-6xl font-light text-white tracking-tight leading-tight">
              A venda não se perde no preço.<br className="hidden md:block" /> Ela se perde <span className="font-medium text-blue-400">no silêncio</span>.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pains.map(({ icon: Icon, text }, i) => (
              <div key={i} className="animate-on-scroll p-6 md:p-7 rounded-[2rem] bg-white/[0.03] border border-white/10" style={{ ...glassStyle, transitionDelay: `${i * 80}ms` }}>
                <Icon className="w-6 h-6 text-gray-500 mb-5" strokeWidth={1.75} />
                <p className="text-gray-200 font-light text-base md:text-lg leading-relaxed">{text}</p>
              </div>
            ))}
            <div className="animate-on-scroll p-6 md:p-7 rounded-[2rem] border border-blue-500/30 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex flex-col justify-between" style={{ ...glassStyle, transitionDelay: '400ms' }}>
              <Sparkles className="w-6 h-6 text-blue-300 mb-5" strokeWidth={1.75} />
              <div>
                <p className="text-white font-outfit text-xl md:text-2xl font-light leading-snug mb-4">A Mindflow resolve <span className="font-medium">as cinco</span>.</p>
                <a href="#jornada" className="inline-flex items-center gap-2 text-sm text-blue-300 hover:text-white transition-colors font-outfit font-medium">
                  Veja como <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Jornada (timeline) ── */}
      <section ref={timelineRef} id="jornada" className="relative z-10 w-full px-4 md:px-8 pt-32 md:pt-48 pb-16 md:pb-24 flex flex-col items-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-4xl mx-auto w-full mb-24 md:mb-32 text-center animate-on-scroll">
          <SectionBadge>Como funciona</SectionBadge>
          <h2 className="font-outfit text-4xl md:text-6xl font-light text-white mb-8 tracking-tight leading-tight">
            Do primeiro contato à <span className="font-medium text-blue-400">venda fechada</span>
          </h2>
          <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            A maioria das ferramentas só responde quem chega. A Mindflow cuida da venda inteira: gera a demanda, converte e mostra o resultado.
          </p>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto w-full px-4">
          <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5 overflow-hidden">
            <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 via-purple-500 to-transparent transition-all duration-300 ease-out" style={{ height: `${timelineProgress * 100}%` }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full blur-md animate-pulse"></div>
            </div>
          </div>

          <div className="space-y-32 md:space-y-64 relative">
            {timelineSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              const isActive = timelineProgress >= (index + 0.5) / timelineSteps.length;
              const Icon = step.icon;

              return (
                <div key={step.id} className="relative flex items-start md:items-center justify-start md:justify-center w-full">
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-30 mt-8 md:mt-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-700 ${isActive ? 'bg-blue-600 scale-110 shadow-[0_0_30px_rgba(59,130,246,0.6)]' : 'bg-[#080b14] border border-white/20'}`}>
                      <Icon className={`w-6 h-6 text-white transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`} strokeWidth={2} />
                    </div>
                  </div>

                  <div className={`w-full md:w-[45%] ${isEven ? 'md:mr-auto md:pr-12 md:text-right' : 'md:ml-auto md:pl-12 md:text-left'} pl-20 md:pl-0`}>
                    <div className={`group relative p-6 md:p-8 rounded-[2rem] bg-white/[0.02] border transition-all duration-1000 transform animate-on-scroll ${isActive ? 'border-white/20 opacity-100 translate-y-0 scale-100 backdrop-blur-xl' : 'border-white/5 opacity-40 translate-y-12 scale-95 pointer-events-none'}`}>
                      <div className={`absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-xl opacity-0 transition-opacity duration-700 ${isActive ? 'group-hover:opacity-100' : ''}`}></div>
                      <div className="relative z-10">
                        <span className={`text-[10px] tracking-[0.4em] uppercase font-bold mb-2 block ${isActive ? 'text-blue-400' : 'text-gray-500'}`}>
                          0{index + 1} | {step.subtitle}
                        </span>
                        <h3 className="text-xl md:text-3xl font-outfit text-white mb-3 md:mb-4 font-light tracking-tight">{step.title}</h3>
                        <p className="text-gray-400 text-xs md:text-base leading-relaxed font-light">{step.description}</p>
                        <div className={`mt-5 flex items-center gap-2.5 ${isEven ? 'md:justify-end' : ''}`}>
                          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-outfit">Com</span>
                          {step.brands.map((b) => <BrandLogo key={b} name={b} className="w-7 h-7" />)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`hidden md:block absolute top-1/2 w-16 h-[1px] bg-gradient-to-r from-white/20 to-transparent ${isEven ? 'right-[50%] mr-6' : 'left-[50%] ml-6'} ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Prospecção ativa ── */}
      <section id="prospeccao" className="relative z-10 w-full px-4 md:px-8 py-24 md:py-36 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
          <div className="animate-liquid absolute top-[10%] left-[5%] w-[50vw] h-[50vw] bg-blue-600/15 blur-[120px] opacity-40"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="animate-on-scroll">
            <SectionBadge live>Prospecção ativa</SectionBadge>
            <h2 className="font-outfit text-4xl md:text-6xl font-light text-white mb-6 tracking-tight leading-[1.05]">
              Pare de esperar cliente.<br />
              <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-[length:200%_auto] animate-[sheen_8s_linear_infinite]">A Mindflow vai buscar.</span>
            </h2>
            <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed mb-10 max-w-xl">
              Indicação acaba, anúncio encarece e ninguém do time gosta de prospectar. A Mindflow encontra as empresas que você quer atender e começa a conversa por você.
            </p>

            <div className="space-y-3">
              {prospectSteps.map((s, i) => {
                const active = prospectStep === i;
                return (
                  <button
                    key={i}
                    onClick={() => setProspectStep(i)}
                    className={`w-full text-left flex items-start gap-4 p-4 rounded-2xl border transition-all duration-500 cursor-pointer ${active ? 'border-blue-500/40 bg-blue-500/10' : 'border-white/5 bg-white/[0.02] hover:border-white/15'}`}
                  >
                    <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-outfit font-semibold transition-all duration-500 ${active ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.6)]' : 'bg-white/5 text-gray-500'}`}>{i + 1}</span>
                    <span>
                      <span className={`block font-outfit font-medium transition-colors ${active ? 'text-white' : 'text-gray-400'}`}>{s.title}</span>
                      <span className={`block text-sm font-light transition-colors ${active ? 'text-gray-300' : 'text-gray-500'}`}>{s.desc}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mock da tela de prospecção */}
          <div className="animate-on-scroll" style={{ transitionDelay: '150ms' }}>
            <div className="rounded-[2rem] border border-white/10 bg-[#080b14]/60 overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]" style={glassStyle}>
              <div className="h-10 px-5 flex items-center gap-1.5 border-b border-white/5 bg-white/[0.02]">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70"></div>
                <span className="ml-3 text-[11px] text-gray-500 font-outfit tracking-wide">Mindflow · Prospecção</span>
              </div>
              <div className="p-5 md:p-7 min-h-[380px]">
                <AnimatePresence mode="wait">
                  {prospectStep === 0 && (
                    <motion.div key="p0" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-outfit mb-3">Nova busca</p>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                          <Search className="w-4 h-4 text-blue-400 shrink-0" />
                          <span className="text-white text-sm">Clínicas odontológicas</span>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                          <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                          <span className="text-white text-sm">Belo Horizonte, MG</span>
                        </div>
                      </div>
                      <div className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-center text-white text-sm font-outfit font-semibold">Buscar empresas</div>
                      <p className="mt-5 text-xs text-gray-500 text-center">Ou suba a sua própria planilha de contatos.</p>
                      <p className="mt-6 text-[11px] text-gray-500 flex items-center justify-center gap-2">
                        Empresas reais, direto do <BrandLogo name="googleMaps" className="w-6 h-6" /> <span className="text-gray-300">Google Maps</span>
                      </p>
                    </motion.div>
                  )}

                  {prospectStep === 1 && (
                    <motion.div key="p1" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-outfit">Empresas encontradas</p>
                        <span className="text-xs text-blue-300 font-outfit flex items-center gap-1.5"><BrandLogo name="googleMaps" className="w-5 h-5" rounded="rounded" /> 48 resultados</span>
                      </div>
                      <div className="space-y-2.5">
                        {prospectCompanies.map((c, i) => (
                          <motion.div key={c.name} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }} className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5">
                            <div className="min-w-0">
                              <p className="text-white text-sm truncate">{c.name}</p>
                              <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                                <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {c.rating} · {c.reviews} avaliações
                              </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 text-gray-500">
                              <Phone className="w-3.5 h-3.5 text-emerald-400" />
                              <Globe className={`w-3.5 h-3.5 ${c.site ? 'text-emerald-400' : 'text-gray-700'}`} />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {prospectStep === 2 && (
                    <motion.div key="p2" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-outfit mb-4">Abordagem para Odonto Prime</p>
                      <div className="rounded-2xl rounded-tr-none bg-blue-600/20 border border-blue-500/20 p-4 mb-5">
                        <p className="text-gray-200 text-sm leading-relaxed">
                          Oi! Vi que a Odonto Prime tem nota 4,9 no Google, parabéns pelo trabalho. Notei que o agendamento ainda é só por telefone. A gente ajuda clínicas a marcar avaliações direto pelo WhatsApp, até fora do horário. Posso te mostrar como em 2 minutos?
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-5">
                        <Bot className="w-3.5 h-3.5 text-blue-400" /> Escrita pela IA com base no perfil da empresa
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="py-3 rounded-xl border border-white/10 text-center text-sm text-gray-300 font-outfit">Editar</div>
                        <div className="py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-center text-sm text-white font-outfit font-semibold flex items-center justify-center gap-2">
                          <Check className="w-4 h-4" /> Aprovar
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {prospectStep === 3 && (
                    <motion.div key="p3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-outfit mb-4">Conversa · Odonto Prime</p>
                      <div className="space-y-3 mb-6">
                        <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-none bg-blue-600/20 border border-blue-500/20 px-4 py-3 text-sm text-gray-200">Posso te mostrar como em 2 minutos?</div>
                        <div className="max-w-[85%] rounded-2xl rounded-tl-none bg-white/[0.06] px-4 py-3 text-sm text-gray-200">Pode sim! Hoje a gente perde muito paciente à noite.</div>
                        <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-none bg-blue-600/20 border border-blue-500/20 px-4 py-3 text-sm text-gray-200">Perfeito. Qual o melhor horário para uma conversa rápida amanhã?</div>
                      </div>
                      <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10">
                        <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-sm text-emerald-200">Lead quente movido para <span className="font-semibold">Qualificado</span></span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── IA no funil ── */}
      <section id="funil" className="relative z-10 w-full px-4 md:px-8 py-24 md:py-36 bg-[#02040a]/60 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 md:mb-20 animate-on-scroll">
            <SectionBadge live>A IA trabalha no seu funil</SectionBadge>
            <h2 className="font-outfit text-4xl md:text-6xl font-light text-white mb-6 tracking-tight leading-tight">
              Seu vendedor só entra <span className="font-medium text-blue-400">para fechar</span>.
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Não é um chatbot que responde e esquece. A IA qualifica, move o cliente de etapa, marca horário e retoma quem sumiu. O funil anda sozinho, e você vê tudo em tempo real.
            </p>
          </div>

          <div className="animate-on-scroll rounded-[2rem] border border-white/10 bg-[#080b14]/50 p-4 md:p-8" style={glassStyle}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {kanbanColumns.map((col, i) => {
                const isCurrent = currentKanban.col === i;
                return (
                  <div key={col} className={`rounded-2xl p-3 md:p-4 min-h-[150px] md:min-h-[220px] border transition-colors duration-500 ${isCurrent ? 'border-blue-500/30 bg-blue-500/[0.06]' : 'border-white/5 bg-white/[0.02]'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[10px] md:text-xs uppercase tracking-[0.15em] font-outfit font-semibold ${isCurrent ? 'text-blue-300' : 'text-gray-500'}`}>{col}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/10"></span>
                    </div>
                    <div className="space-y-2">
                      {isCurrent && (
                        <motion.div layoutId="lead-card" transition={{ type: 'spring', damping: 24, stiffness: 220 }} className={`rounded-xl p-3 border ${i === 3 ? 'border-emerald-500/40 bg-emerald-500/15' : 'border-white/15 bg-white/[0.07]'} shadow-[0_10px_30px_rgba(0,0,0,0.4)]`}>
                          <div className="flex items-center gap-2 mb-1.5">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-[10px] font-semibold text-white shrink-0">A</div>
                            <span className="text-white text-xs md:text-sm font-medium truncate">Ana Souza</span>
                          </div>
                          <p className="text-[10px] md:text-[11px] text-gray-400 truncate flex items-center gap-1">Clareamento · <BrandLogo name="meta" className="w-4 h-4" rounded="rounded" /> Meta Ads</p>
                        </motion.div>
                      )}
                      <div className="rounded-xl p-3 border border-white/5 bg-white/[0.02] opacity-50">
                        <div className="h-2 w-2/3 rounded bg-white/10 mb-2"></div>
                        <div className="h-2 w-1/2 rounded bg-white/5"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 md:mt-6 min-h-[64px] flex items-center gap-3 md:gap-4 px-4 md:px-5 py-4 rounded-2xl border border-white/10 bg-white/[0.03]">
              <AnimatePresence mode="wait">
                <motion.div key={kanbanStep} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="flex items-center gap-3 md:gap-4">
                  <span className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${currentKanban.who === 'ia' ? 'bg-blue-600/30 text-blue-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                    {currentKanban.who === 'ia' ? <Bot className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                  </span>
                  <p className="text-sm md:text-base text-gray-200 font-light">{currentKanban.text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
            {[
              { icon: Clock, title: 'Retoma quem sumiu', desc: 'Follow-up automático no momento certo, para nenhuma conversa morrer no “vou pensar”.' },
              { icon: Target, title: 'Avisa o que está esfriando', desc: 'Um radar mostra quem está sem resposta e corre risco de ser perdido.' },
              { icon: UserCheck, title: 'Chama você na hora certa', desc: 'Quando o cliente está pronto ou pede uma pessoa, seu time assume com todo o histórico.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="animate-on-scroll p-6 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-blue-500/40 transition-colors duration-500" style={{ ...glassStyle, transitionDelay: `${i * 100}ms` }}>
                <Icon className="w-6 h-6 text-blue-400 mb-4" strokeWidth={1.75} />
                <h3 className="text-white font-outfit font-medium text-lg mb-2">{title}</h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Conexão ── */}
      <section id="conexao" className="relative z-10 w-full px-4 md:px-8 py-24 md:py-36 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
          <div className="animate-liquid absolute bottom-[0%] right-[10%] w-[50vw] h-[50vw] bg-purple-600/15 blur-[120px] opacity-30" style={{ animationDirection: 'reverse', animationDuration: '30s' }}></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-14 md:mb-20 animate-on-scroll">
            <SectionBadge>Conecte do seu jeito</SectionBadge>
            <h2 className="font-outfit text-4xl md:text-6xl font-light text-white mb-6 tracking-tight leading-tight">
              Seu WhatsApp, <span className="font-medium text-blue-400">do jeito que fizer sentido</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Sem trocar de número se você não quiser, e sem medo de bloqueio quando chegar a hora de escalar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {connections.map(({ icon: Icon, brand, badge, title, lead, points }, i) => (
              <div key={title} className="animate-on-scroll group p-7 md:p-9 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden" style={{ ...glassStyle, transitionDelay: `${i * 120}ms` }}>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <BrandLogo name={brand} className="w-14 h-14" rounded="rounded-2xl" />
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 border border-white/10 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-blue-300" strokeWidth={1.75} />
                      </div>
                    </div>
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold px-3 py-1.5 rounded-full bg-white/[0.04] border border-blue-500/20 text-blue-300">{badge}</span>
                  </div>
                  <h3 className="font-outfit text-2xl md:text-3xl text-white font-light tracking-tight mb-3">{title}</h3>
                  <p className="text-gray-300 font-light leading-relaxed mb-7">{lead}</p>
                  <ul className="space-y-3">
                    {points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-sm text-gray-400 font-light">
                        <Check className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" strokeWidth={2.5} /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <p className="animate-on-scroll text-center text-gray-400 font-light mt-10">
            Comece por um e mude quando quiser.{' '}
            <span className="inline-flex items-center gap-1.5 align-middle"><BrandLogo name="instagram" className="w-6 h-6" /><BrandLogo name="facebook" className="w-6 h-6" /></span>{' '}
            <span className="text-white">Instagram e Facebook</span> caem na mesma caixa de entrada.
          </p>
        </div>
      </section>

      {/* ── Comparação ── */}
      <section id="diferenca" className="relative z-10 w-full px-4 md:px-8 py-24 md:py-32 bg-[#02040a]/60 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14 md:mb-16 animate-on-scroll">
            <SectionBadge>Não é mais um CRM</SectionBadge>
            <h2 className="font-outfit text-4xl md:text-6xl font-light text-white tracking-tight leading-[1.1]">
              CRM é onde você anota a venda.<br />
              <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-[length:200%_auto] animate-[sheen_8s_linear_infinite]">A Mindflow faz ela acontecer.</span>
            </h2>
          </div>

          <div className="animate-on-scroll rounded-[2rem] border border-white/10 bg-[#080b14]/50 overflow-hidden" style={glassStyle}>
            <div className="grid grid-cols-[1.4fr_1fr_1fr_1.1fr] md:grid-cols-[2fr_1fr_1fr_1.2fr] text-center border-b border-white/10">
              <div className="p-3 md:p-5"></div>
              <div className="p-3 md:p-5 text-[10px] md:text-xs uppercase tracking-[0.15em] text-gray-500 font-outfit font-semibold">CRM comum</div>
              <div className="p-3 md:p-5 text-[10px] md:text-xs uppercase tracking-[0.15em] text-gray-500 font-outfit font-semibold">Chatbot</div>
              <div className="p-3 md:p-5 text-[10px] md:text-xs uppercase tracking-[0.15em] text-blue-300 font-outfit font-semibold bg-blue-500/10">Mindflow</div>
            </div>
            {comparison.map((row, i) => (
              <div key={row.label} className={`grid grid-cols-[1.4fr_1fr_1fr_1.1fr] md:grid-cols-[2fr_1fr_1fr_1.2fr] items-center text-center ${i < comparison.length - 1 ? 'border-b border-white/5' : ''}`}>
                <div className="p-3 md:p-5 text-left text-xs md:text-base text-gray-200 font-light">{row.label}</div>
                <div className="p-2 md:p-5"><ComparisonCell value={row.crm} /></div>
                <div className="p-2 md:p-5"><ComparisonCell value={row.bot} /></div>
                <div className="p-2 md:p-5 bg-blue-500/10 h-full flex items-center justify-center"><ComparisonCell value={row.mf} highlight /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recursos ── */}
      <section id="recursos" className="relative z-10 w-full px-4 md:px-8 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 md:mb-20 animate-on-scroll">
            <SectionBadge>Tudo numa assinatura</SectionBadge>
            <h2 className="font-outfit text-4xl md:text-6xl font-light text-white mb-6 tracking-tight leading-tight">
              Troque cinco ferramentas <span className="font-medium text-blue-400">por uma</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Atendimento, funil, agenda, propostas e campanhas conversando entre si. Sem planilha paralela, sem cinco mensalidades.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ icon: Icon, brands, title, desc }, i) => (
              <div key={title} className="animate-on-scroll group p-6 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-blue-500/40 hover:bg-white/[0.06] hover:-translate-y-2 transition-all duration-500" style={{ ...glassStyle, transitionDelay: `${(i % 4) * 80}ms` }}>
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" strokeWidth={1.75} />
                  {brands && (
                    <span className="flex items-center gap-1.5 pl-3 border-l border-white/10">
                      {brands.map((b) => <BrandLogo key={b} name={b} className="w-7 h-7" />)}
                    </span>
                  )}
                </div>
                <h3 className="text-white font-outfit font-medium text-lg mb-2 group-hover:text-blue-300 transition-colors">{title}</h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="relative z-10 w-full px-4 md:px-8 py-24 md:py-32 bg-[#02040a]">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-16 animate-on-scroll">
            <SectionBadge>Dúvidas</SectionBadge>
            <h2 className="font-outfit text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
              O que <span className="font-medium text-blue-400">todo mundo</span> pergunta
            </h2>
          </div>

          <div className="space-y-4 animate-on-scroll">
            {faqs.map((faq, index) => (
              <div key={index} className={`group border transition-all duration-500 rounded-3xl overflow-hidden ${activeFaq === index ? 'bg-white/[0.04] border-white/20' : 'bg-white/[0.01] border-white/5 hover:border-white/10'}`}>
                <button onClick={() => setActiveFaq(activeFaq === index ? null : index)} className="w-full px-6 md:px-8 py-6 flex items-center justify-between gap-4 text-left cursor-pointer">
                  <span className={`font-outfit text-base md:text-lg transition-colors duration-300 ${activeFaq === index ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-300'}`}>{faq.question}</span>
                  <div className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${activeFaq === index ? 'border-blue-500 bg-blue-500 text-white rotate-180' : 'border-white/10 text-gray-500 group-hover:border-white/20'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activeFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 md:px-8 pb-8 text-gray-400 font-light leading-relaxed border-t border-white/5 pt-4">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="relative z-10 w-full px-4 md:px-8 py-28 md:py-40 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center animate-on-scroll">
          <h2 className="font-outfit text-4xl md:text-6xl font-light text-white mb-6 tracking-tight leading-tight">
            Cada mensagem sem resposta<br className="hidden md:block" /> é uma <span className="font-medium text-blue-400">venda para o concorrente</span>.
          </h2>
          <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed mb-10 max-w-xl mx-auto">
            Coloque a Mindflow para trabalhar e deixe seu time só com o que importa: fechar.
          </p>
          <PrimaryButton onClick={onOpenModal}>QUERO A MINDFLOW</PrimaryButton>
          <p className="mt-6 text-xs text-gray-500 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Implantação feita junto com a nossa equipe
          </p>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="relative z-10 w-full px-4 md:px-8 py-16 border-t border-white/5 bg-[#02040a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img src="/logo-mindflow.png" alt="Mindflow" className="h-10 mb-5 opacity-80" />
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed font-light">
              A máquina de vendas com IA no WhatsApp. Encontra o cliente, atende na hora e conduz até a venda.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-xs font-outfit tracking-widest text-gray-400 uppercase">
            <a href="#jornada" className="hover:text-white transition-colors">Como funciona</a>
            <a href="#faq" className="hover:text-white transition-colors">Dúvidas</a>
            <button onClick={onOpenModal} className="hover:text-white transition-colors uppercase tracking-widest cursor-pointer">Quero a Mindflow</button>
          </div>

          <div className="text-gray-600 text-[10px] tracking-[0.2em] font-light uppercase">
            © 2026 Mindflow
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

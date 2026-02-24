import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LiquidSphere3D from './LiquidSphere3D';
import { useLanguage, LanguageSwitcher, t } from './LanguageContext';

// ─── Translations ────────────────────────────────────────────
const translations = {
    nav: {
        connect: { pt: 'Conectar', en: 'Connect', es: 'Conectar' },
    },
    hero: {
        eyebrow: {
            pt: 'Integração Empresarial com IA',
            en: 'Enterprise AI Integration',
            es: 'Integración Empresarial con IA',
        },
        h1Line1: {
            pt: 'Acelere o Crescimento',
            en: 'Accelerate Growth',
            es: 'Acelere el Crecimiento',
        },
        h1Line2: {
            pt: 'Com IA Autônoma',
            en: 'With Autonomous AI',
            es: 'Con IA Autónoma',
        },
        body: {
            pt: 'Soluções inteligentes para empresas modernas. Construímos agentes de IA personalizados, automatizamos fluxos complexos e extraímos insights acionáveis para elevar suas operações.',
            en: 'Intelligent solutions for modern enterprises. We build custom AI agents, automate complex workflows, and extract actionable insights to elevate your operations.',
            es: 'Soluciones inteligentes para empresas modernas. Creamos agentes de IA personalizados, automatizamos flujos complejos y extraemos insights accionables para elevar sus operaciones.',
        },
        ctaPrimary: {
            pt: 'Explorar Serviços',
            en: 'Explore Services',
            es: 'Explorar Servicios',
        },
        ctaSecondary: {
            pt: 'Agendar Consultoria',
            en: 'Book a Consultation',
            es: 'Agendar Consultoría',
        },
    },
    footer: {
        trusted: {
            pt: 'Empresas que confiam em nós',
            en: 'Trusted by forward-thinking teams',
            es: 'Empresas que confían en nosotros',
        },
    },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
};// ─── All styles are self-contained ─────────────────────────────────────────
// This component intentionally uses ZERO Tailwind classes / external CSS.
// Reason: the global index.css (AdminDashboard.css, body overrides, etc.)
// conflicts with any Tailwind utility generated for this route.
// Using inline styles + a scoped <style> tag makes the page immune to that.
// ───────────────────────────────────────────────────────────────────────────

const styles = {
    page: {
        position: 'relative',
        minHeight: '100svh',  // uses dynamic viewport height for mobile browsers
        backgroundColor: '#000',
        color: '#fff',
        fontFamily: "'Inter', 'Space Grotesk', system-ui, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
    },
    // ── 3D portal (right side) ──
    portalWrapper: {
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        transform: 'translateX(22vw)', // Deslocando ainda mais o globo para a direita da tela
    },
    // Abstract Liquid Motion 3D Object
    liquidContainer: {
        position: 'relative',
        width: '75vw', // Mais largo horizontalmente para caber o modelo
        height: '60vw', // Altura mantida
        maxWidth: '1000px', // Novo limite máximo de largura
        maxHeight: '750px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    liquidBlobMain: {
        position: 'absolute',
        width: '85%',
        height: '85%',
        background: 'linear-gradient(135deg, #00B4E5 0%, #003A53 40%, #001119 100%)',
        boxShadow: 'inset -20px -20px 40px rgba(0,0,0,0.8), inset 10px 10px 30px rgba(0,180,229,0.5)',
        animation: 'rl-blobMorph 12s ease-in-out infinite, rl-liquidSpin 25s linear infinite',
        opacity: 0.9,
    },
    liquidBlobOverlay: {
        position: 'absolute',
        width: '90%',
        height: '90%',
        background: 'linear-gradient(45deg, rgba(0,180,229,0.4) 0%, transparent 60%)',
        boxShadow: 'inset 20px 0 50px rgba(0,180,229,0.3)',
        animation: 'rl-blobMorph2 15s ease-in-out infinite alternate, rl-liquidSpinReverse 30s linear infinite',
        mixBlendMode: 'screen',
    },
    liquidBlobCore: {
        position: 'absolute',
        width: '60%',
        height: '60%',
        background: 'radial-gradient(circle at 30% 30%, #fff 0%, #00B4E5 30%, transparent 70%)',
        filter: 'blur(15px)',
        animation: 'rl-float 5s ease-in-out infinite',
        opacity: 0.6,
    },
    liquidGlow: {
        position: 'absolute',
        width: '120%',
        height: '120%',
        background: 'radial-gradient(circle, rgba(0,180,229,0.2) 0%, transparent 65%)',
        filter: 'blur(50px)',
        zIndex: -1,
        animation: 'rl-pulse 6s ease-in-out infinite',
    },
    liquidDrop: {
        position: 'absolute',
        background: 'linear-gradient(135deg, #00B4E5 0%, #003A53 40%, #001119 100%)',
        boxShadow: 'inset -5px -5px 10px rgba(0,0,0,0.8), inset 5px 5px 10px rgba(0,180,229,0.5)',
        borderRadius: '50%',
        opacity: 0.6,
        filter: 'blur(1px)',
    },
    drop1: {
        width: '12%',
        height: '12%',
        animation: 'rl-drop1 12s ease-in-out infinite',
    },
    drop2: {
        width: '6%',
        height: '6%',
        animation: 'rl-drop2 9s ease-in-out infinite',
    },
    drop3: {
        width: '15%',
        height: '15%',
        animation: 'rl-drop3 15s ease-in-out infinite',
        animationDelay: '3s',
    },
    // ── Bottom Aurora Boreal Effect ──
    auroraWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
    },
    auroraMist1: {
        position: 'absolute',
        bottom: '-20%',
        left: '-20%',
        width: '140%',
        height: '100%',
        background: 'radial-gradient(ellipse at bottom, rgba(0,180,229,0.3) 0%, transparent 60%)',
        filter: 'blur(60px)',
        animation: 'rl-auroraHover 14s ease-in-out infinite alternate',
    },
    auroraMist2: {
        position: 'absolute',
        bottom: '-30%',
        right: '-20%',
        width: '140%',
        height: '120%',
        background: 'radial-gradient(ellipse at bottom, rgba(0,58,83,0.8) 0%, transparent 60%)',
        filter: 'blur(80px)',
        animation: 'rl-auroraHover2 18s ease-in-out infinite alternate-reverse',
        mixBlendMode: 'screen',
    },
    auroraLine: {
        position: 'absolute',
        bottom: '15%',
        left: '-10%',
        width: '120%',
        height: '4px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(0,180,229,0.5) 50%, transparent 100%)',
        filter: 'blur(4px)',
        animation: 'rl-auroraLineMotion 10s ease-in-out infinite alternate',
    },
    // ── Content shell ──
    shell: {
        position: 'relative',
        zIndex: 1,
        maxWidth: '1400px',
        width: '100%',
        margin: '0 auto',
        padding: '0 80px',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    // ── Navbar ──
    navbar: {
        paddingTop: '36px',
        paddingBottom: '36px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoGroup: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    logoImg: {
        height: '42px', // Altura inicial da nova logo da Mindflow
        width: 'auto',
    },
    connectBtn: {
        backgroundColor: '#fff',
        color: '#000',
        fontWeight: 600,
        padding: '10px 24px',
        borderRadius: '10px',
        fontSize: '14px',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 0 15px rgba(255,255,255,0.12)',
        transition: 'background 0.2s, box-shadow 0.2s',
    },
    // ── Hero ──
    hero: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '20px',
        paddingBottom: '20px',
    },
    heroInner: {
        maxWidth: '680px',
    },
    eyebrow: {
        color: '#00B4E5',
        fontWeight: 500,
        fontSize: '17px',
        letterSpacing: '0.04em',
        marginBottom: '20px',
        display: 'block',
    },
    h1: {
        fontSize: 'clamp(52px, 7vw, 84px)',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        lineHeight: 1.04,
        color: '#fff',
        margin: '0 0 28px',
    },
    h1Gradient: {
        display: 'block',
        background: 'linear-gradient(90deg, #fff 30%, #666 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
    },
    body: {
        color: 'rgba(255,255,255,0.45)',
        fontSize: '18px',
        lineHeight: 1.7,
        maxWidth: '520px',
        margin: '0 0 40px',
        fontWeight: 300,
    },
    ctaRow: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '16px',
    },
    ctaPrimary: {
        backgroundColor: '#00B4E5',
        color: '#000',
        fontWeight: 700,
        fontSize: '15px',
        padding: '16px 32px',
        borderRadius: '12px',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 0 24px rgba(0,180,229,0.35)',
        transition: 'box-shadow 0.2s, background 0.2s',
    },
    ctaSecondary: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        color: '#fff',
        fontWeight: 600,
        fontSize: '15px',
        padding: '16px 32px',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.12)',
        cursor: 'pointer',
        transition: 'background 0.2s, border 0.2s',
    },
    // ── Footer strip ──
    footer: {
        paddingTop: '24px',
        paddingBottom: '32px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    trustedLabel: {
        display: 'block',
        color: 'rgba(255,255,255,0.3)',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        marginBottom: '16px',
        textAlign: 'center',
    },
    logoRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '40px',
        opacity: 0.25,
        filter: 'grayscale(100%)',
        flexWrap: 'wrap',
    },
    logoPlaceholder: {
        fontSize: '18px',
        fontWeight: 800,
        letterSpacing: '-0.02em',
        color: '#fff',
        whiteSpace: 'nowrap',
    },
};

// Hover helpers via CSS-in-JS style tag
const scopedCSS = `
  @keyframes rl-float {
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(2deg); }
    100% { transform: translateY(0px) rotate(0deg); }
  }

  @keyframes rl-blobMorph {
    0%, 100% { border-radius: 40% 60% 70% 30% / 40% 40% 60% 50%; }
    34% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
    67% { border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; }
  }

  @keyframes rl-blobMorph2 {
    0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  }

  @keyframes rl-liquidSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes rl-liquidSpinReverse {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }

  @keyframes rl-pulse {
    0% { opacity: 0.6; transform: scale(0.9); }
    50% { opacity: 1; transform: scale(1.1); }
    100% { opacity: 0.6; transform: scale(0.9); }
  }

  @keyframes rl-drop1 {
    0%, 100% { transform: translate(0, 0) scale(0.5); opacity: 0; }
    20% { opacity: 0.7; }
    70% { transform: translate(-10vw, -15vw) scale(1.5); opacity: 0; }
  }

  @keyframes rl-drop2 {
    0%, 100% { transform: translate(0, 0) scale(0.5); opacity: 0; }
    30% { opacity: 0.5; }
    80% { transform: translate(12vw, 10vw) scale(1.2); opacity: 0; }
  }

  @keyframes rl-drop3 {
    0%, 100% { transform: translate(0, 0) scale(0.5); opacity: 0; }
    40% { opacity: 0.8; }
    90% { transform: translate(-8vw, 15vw) scale(0.8); opacity: 0; }
  }

  @keyframes rl-auroraHover {
    0% { transform: scale(1) translate(0, 0) rotate(-2deg); opacity: 0.6; }
    100% { transform: scale(1.1) translate(5vw, -30px) rotate(3deg); opacity: 1; }
  }

  @keyframes rl-auroraHover2 {
    0% { transform: scale(1) translate(0, 0) rotate(2deg); opacity: 0.5; }
    100% { transform: scale(1.2) translate(-5vw, -40px) rotate(-3deg); opacity: 0.9; }
  }

  @keyframes rl-auroraLineMotion {
    0% { transform: translateY(0px) rotate(-1deg); opacity: 0.3; }
    100% { transform: translateY(-20px) rotate(1deg); opacity: 0.7; }
  }

  .rl-connect:hover { background: #e8e8e8 !important; }
  .rl-cta-primary:hover { background: #33C6EA !important; box-shadow: 0 0 36px rgba(0,180,229,0.55) !important; }
  .rl-cta-secondary:hover { background: rgba(255,255,255,0.09) !important; border-color: rgba(255,255,255,0.22) !important; }

  @media (max-width: 900px), (max-height: 800px) {
    .rl-shell { padding: 0 40px !important; }
    .rl-navbar { padding-top: 20px !important; padding-bottom: 20px !important; }
    .rl-h1 { font-size: clamp(42px, 8vw, 64px) !important; margin-bottom: 16px !important; }
    .rl-body { font-size: 16px !important; margin-bottom: 24px !important; line-height: 1.5 !important; }
    .rl-eyebrow { margin-bottom: 12px !important; font-size: 14px !important; }
    .rl-cta-primary, .rl-cta-secondary { padding: 14px 24px !important; font-size: 15px !important; border-radius: 12px !important; }
    
    .rl-portal { 
      justify-content: center !important;
      padding-right: 0 !important;
    }
    .rl-portal > div {
      width: 100vw !important;
      height: 100vw !important;
      transform: translateY(-8vh);
    }
  }

  @media (max-width: 600px) {
    .rl-shell { padding: 0 24px !important; }
    .rl-navbar { padding-top: 16px !important; padding-bottom: 16px !important; gap: 8px; }
    .rl-navbar img { height: 32px !important; }
    .rl-connect { padding: 8px 14px !important; font-size: 12px !important; border-radius: 8px !important; }
    .rl-hero { justify-content: flex-end !important; padding-bottom: 2vh !important; padding-top: 0 !important; }
    
    .rl-portal { align-items: flex-start !important; }
    .rl-portal > div { 
      transform: translateY(12vh) scale(1.8) !important; 
      opacity: 0.6; /* Esfera visível no topo da tela */
      filter: blur(0px);
    }
    
    .rl-h1 { 
      font-size: 42px !important; 
      margin-bottom: 16px !important;
      text-shadow: 0 4px 30px rgba(0,0,0,1), 0 2px 10px rgba(0,0,0,0.8);
    }
    .rl-h1-gradient {
      background: linear-gradient(90deg, #fff 0%, #D8F5FF 100%) !important;
      -webkit-background-clip: text !important;
      background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
      filter: drop-shadow(0px 4px 15px rgba(0,0,0,0.9));
    }
    .rl-body { 
      font-size: 16px !important;
      margin-bottom: 24px !important;
      color: rgba(255,255,255,0.9) !important;
      font-weight: 400 !important;
      text-shadow: 0 4px 20px rgba(0,0,0,1), 0 2px 5px rgba(0,0,0,0.9);
    }
    
    .rl-cta-group { 
      gap: 12px !important; 
      margin-top: 15vh !important;
      flex-direction: column;
    }
    .rl-cta-primary, .rl-cta-secondary { width: 100%; text-align: center; }
    
    .rl-logo-row { gap: 16px !important; flex-wrap: wrap; margin-bottom: 0px; }
    .rl-footer { padding-top: 16px !important; padding-bottom: 24px !important; border-top: none !important; }
  }
`;

const LandingPage = ({ onOpenModal }) => {
    const navigate = useNavigate();
    const { lang } = useLanguage();

    return (
        <>
            <style>{scopedCSS}</style>
            <div style={styles.page}>

                {/* ── Bottom Aurora Boreal Effect ── */}
                <div style={styles.auroraWrapper}>
                    <div style={styles.auroraMist1} />
                    <div style={styles.auroraMist2} />
                    <div style={styles.auroraLine} />
                </div>

                {/* ── Abstract Liquid Motion Element ── */}
                <div style={styles.portalWrapper} className="rl-portal">
                    <div style={styles.liquidContainer}>
                        <Suspense fallback={<div style={styles.liquidGlow} />}>
                            <LiquidSphere3D />
                        </Suspense>
                    </div>
                </div>

                {/* ── Content shell ── */}
                <div style={styles.shell} className="rl-shell">

                    {/* Navbar */}
                    <motion.header
                        style={styles.navbar}
                        className="rl-navbar"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div style={styles.logoGroup}>
                            <img src="/images/logo mindflow.png" alt="Mindflow" style={styles.logoImg} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <LanguageSwitcher />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={styles.connectBtn}
                                className="rl-connect"
                                onClick={onOpenModal}
                            >
                                {t(translations.nav.connect, lang)}
                            </motion.button>
                        </div>
                    </motion.header>

                    {/* Hero */}
                    <main style={styles.hero} className="rl-hero">
                        <motion.div
                            style={styles.heroInner}
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.span variants={fadeUp} style={styles.eyebrow} className="rl-eyebrow">{t(translations.hero.eyebrow, lang)}</motion.span>
                            <motion.h1 variants={fadeUp} style={styles.h1} className="rl-h1">
                                {t(translations.hero.h1Line1, lang)}
                                <span style={styles.h1Gradient} className="rl-h1-gradient">{t(translations.hero.h1Line2, lang)}</span>
                            </motion.h1>
                            <motion.p variants={fadeUp} style={styles.body} className="rl-body">
                                {t(translations.hero.body, lang)}
                            </motion.p>
                            <motion.div variants={fadeUp} style={styles.ctaRow} className="rl-cta-group">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 36px rgba(0,180,229,0.55)' }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ ...styles.ctaPrimary, transition: 'none' }}
                                    className="rl-cta-primary"
                                    onClick={() => navigate('/services')}
                                >
                                    {t(translations.hero.ctaPrimary, lang)}
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.09)' }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ ...styles.ctaSecondary, transition: 'none' }}
                                    className="rl-cta-secondary"
                                    onClick={onOpenModal}
                                >
                                    {t(translations.hero.ctaSecondary, lang)}
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </main>

                    {/* Footer strip */}
                    <motion.footer
                        style={styles.footer}
                        className="rl-footer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        <span style={styles.trustedLabel}>{t(translations.footer.trusted, lang)}</span>
                        {/* Replace the placeholders below with real <img> logos */}
                        <motion.div
                            style={styles.logoRow}
                            className="rl-logo-row"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 0.25, y: 0 }}
                            transition={{ delay: 1.2, duration: 1 }}
                        >
                            <span style={styles.logoPlaceholder}>ACME CORP</span>
                            <span style={styles.logoPlaceholder}>GLOBEX</span>
                            <span style={styles.logoPlaceholder}>INNOVA</span>
                            <span style={styles.logoPlaceholder}>NEXUS</span>
                        </motion.div>
                    </motion.footer>

                </div>
            </div>
        </>
    );
};

export default LandingPage;

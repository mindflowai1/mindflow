import React, { useState } from 'react';
import { Target, Workflow, LayoutTemplate, BrainCircuit, ChevronLeft, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, LanguageSwitcher, t } from './LanguageContext';

// ─── Translations ────────────────────────────────────────────
const translations = {
    nav: {
        back: { pt: 'Início', en: 'Home', es: 'Inicio' },
        cta: { pt: 'Agendar Estratégia', en: 'Book Strategy', es: 'Agendar Estrategia' },
    },
    header: {
        eyebrow: { pt: 'Serviços', en: 'Services', es: 'Servicios' },
        h1: { pt: 'Inteligência\nsob Medida.', en: 'Tailored\nIntelligence.', es: 'Inteligencia\na Medida.' },
        desc: {
            pt: 'Engenhamos sistemas autônomos sob medida e ativos de alta conversão projetados para eliminar gargalos e acelerar sua receita.',
            en: 'We engineer bespoke autonomous systems and high-converting assets designed specifically to eliminate your bottlenecks and drive revenue.',
            es: 'Diseñamos sistemas autónomos a medida y activos de alta conversión pensados para eliminar cuellos de botella e impulsar sus ingresos.',
        },
    },
    services: [
        {
            id: 'lead-gen',
            tag: { pt: 'MOTOR DE RECEITA', en: 'REVENUE ENGINE', es: 'MOTOR DE INGRESOS' },
            title: { pt: 'Prospecção Autônoma', en: 'Autonomous Prospecting', es: 'Prospección Autónoma' },
            desc: {
                pt: 'Pare de buscar, comece a fechar. Agentes de IA que identificam, pesquisam e hiperpersonalizam abordagens para seu ICP ideal em escala.',
                en: 'Stop searching, start closing. AI agents that identify, research, and hyper-personalize outreach to your ideal ICP at scale.',
                es: 'Deje de buscar, empiece a cerrar. Agentes de IA que identifican, investigan e hiperpersonalizan el alcance hacia su ICP ideal a escala.',
            },
            icon: Target,
            color: '#00B4E5',
            accentShadow: 'rgba(0, 180, 229, 0.15)',
        },
        {
            id: 'internal',
            tag: { pt: 'CICLO DE EFICIÊNCIA', en: 'EFFICIENCY LOOP', es: 'CICLO DE EFICIENCIA' },
            title: { pt: 'Fluxos Zero-Toque', en: 'Zero-Touch Workflows', es: 'Flujos Sin Contacto' },
            desc: {
                pt: 'Conecte seus sistemas legados. Construímos pontes automatizadas que lidam com entrada de dados, roteamento e relatórios sem erro humano.',
                en: 'Connect your legacy stacks. We build automated bridges that handle data entry, routing, and reporting without human error.',
                es: 'Conecte sus sistemas heredados. Construimos puentes automatizados que gestionan datos, enrutamiento e informes sin error humano.',
            },
            icon: Workflow,
            color: '#8B5CF6',
            accentShadow: 'rgba(139, 92, 246, 0.15)',
        },
        {
            id: 'landing-pages',
            tag: { pt: 'PRESENÇA DIGITAL', en: 'DIGITAL PRESENCE', es: 'PRESENCIA DIGITAL' },
            title: { pt: 'Páginas de Alta Conversão', en: 'Conversion-First Pages', es: 'Páginas de Alta Conversión' },
            desc: {
                pt: 'Não apenas criamos sites. Engenhamos landing pages ultrarrápidas e premium, projetadas para captar e converter leads corporativos.',
                en: "We don't just build websites. We engineer ultra-fast, premium landing pages designed specifically to capture and convert enterprise leads.",
                es: 'No solo creamos sitios web. Diseñamos landing pages ultrarrápidas y premium, pensadas para captar y convertir leads empresariales.',
            },
            icon: LayoutTemplate,
            color: '#10B981',
            accentShadow: 'rgba(16, 185, 129, 0.15)',
        },
        {
            id: 'agents',
            tag: { pt: 'FORÇA DE TRABALHO IA', en: 'AGI WORKFORCE', es: 'FUERZA DE TRABAJO IA' },
            title: { pt: 'Agentes Especialistas', en: 'Specialist Agents', es: 'Agentes Especialistas' },
            desc: {
                pt: 'Além de automações rígidas. Implantamos modelos de raciocínio autônomos para executar tarefas complexas e multipassos, exclusivas do seu negócio.',
                en: 'Beyond rigid automations. We deploy autonomous reasoning models to execute complex multi-step tasks unique to your business.',
                es: 'Más allá de automatizaciones rígidas. Desplegamos modelos de razonamiento autónomo para ejecutar tareas complejas y únicas de su negocio.',
            },
            icon: BrainCircuit,
            color: '#F59E0B',
            accentShadow: 'rgba(245, 158, 11, 0.15)',
        },
    ],
};

const styles = {
    page: {
        minHeight: '100svh',
        backgroundColor: '#030303',
        color: '#fff',
        fontFamily: "'Inter', system-ui, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'auto'
    },

    // Immersive Background Aurora Container
    auroraBg: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
    },
    auroraOrb1: {
        position: 'absolute',
        top: '-20%', left: '-10%',
        width: '70vw', height: '70vw',
        background: 'radial-gradient(circle, rgba(0, 180, 229, 0.15) 0%, transparent 60%)',
        filter: 'blur(90px)',
        animation: 'rl-float-orb 20s ease-in-out infinite alternate',
        mixBlendMode: 'screen',
    },
    auroraOrb2: {
        position: 'absolute',
        bottom: '-30%', right: '-20%',
        width: '80vw', height: '80vw',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 60%)', // subtle purple/violet aura
        filter: 'blur(100px)',
        animation: 'rl-float-orb-reverse 25s ease-in-out infinite alternate',
        mixBlendMode: 'screen',
    },

    nav: {
        position: 'relative',
        zIndex: 10,
        padding: '40px 80px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: 'rgba(255,255,255,0.6)',
        background: 'none',
        border: 'none',
        fontSize: '15px',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'color 0.2s',
    },

    container: {
        position: 'relative',
        zIndex: 1,
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        padding: '20px 80px 120px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },

    headerSegment: {
        marginBottom: '80px',
        maxWidth: '900px',
    },
    eyebrow: {
        color: '#00B4E5',
        fontWeight: 600,
        fontSize: '14px',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        marginBottom: '24px',
        display: 'inline-block',
    },
    h1: {
        fontSize: 'clamp(56px, 7vw, 88px)',
        fontWeight: 800,
        letterSpacing: '-0.04em',
        lineHeight: 1.05,
        margin: '0 0 24px',
        color: '#fff',
    },
    desc: {
        fontSize: '20px',
        color: 'rgba(255,255,255,0.5)',
        fontWeight: 300,
        lineHeight: 1.6,
        maxWidth: '700px',
        margin: '0 auto',
    },

    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '32px',
        width: '100%',
        textAlign: 'left',
    },

    cardTag: {
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0.1em',
        color: 'rgba(255,255,255,0.4)',
        marginBottom: '40px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    iconBox: (color) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '64px',
        height: '64px',
        borderRadius: '16px',
        background: `linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))`,
        border: `1px solid rgba(255,255,255,0.1)`,
        color: color,
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.05)`,
    }),
    cardTitle: {
        fontSize: '32px',
        fontWeight: 700,
        letterSpacing: '-0.03em',
        color: '#fff',
        marginBottom: '16px',
    },
    cardText: {
        fontSize: '18px',
        color: 'rgba(255,255,255,0.5)',
        lineHeight: 1.6,
        margin: 0,
        fontWeight: 300,
    }
};

const scopedCSS = `
  @keyframes rl-float-orb {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(10vw, 5vh) scale(1.1); }
  }
  @keyframes rl-float-orb-reverse {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(-10vw, -8vh) scale(1.2); }
  }
  @keyframes rl-shimmer {
    0% { transform: translateX(-100%) rotate(-45deg); }
    100% { transform: translateX(300%) rotate(-45deg); }
  }
  @keyframes rl-pulse-dot {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.3); }
  }
  @keyframes rl-glow-breathe {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
  }

  .rl-back:hover { color: #fff !important; }
  
  /* Glass Card base overlay */
  .rl-bento-glass::before {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    background: radial-gradient(circle at top right, rgba(255,255,255,0.04), transparent 60%);
    pointer-events: none;
    z-index: 0;
  }
  
  .rl-glass-content {
    position: relative;
    z-index: 1;
  }

  /* Desktop only: fit everything in viewport + WOW effects */
  @media (min-width: 1025px) {
    .rl-page { height: 100svh !important; overflow: hidden !important; }
    .rl-nav { padding: 16px 80px !important; }
    .rl-container { padding: 0 80px 16px !important; flex: 1 !important; display: flex !important; flex-direction: column !important; justify-content: center !important; }
    .rl-header-segment { margin-bottom: 20px !important; }
    .rl-eyebrow { font-size: 13px !important; margin-bottom: 10px !important; }
    .rl-h1 { font-size: clamp(36px, 4vw, 56px) !important; margin-bottom: 10px !important; }
    .rl-header-desc { font-size: 15px !important; line-height: 1.4 !important; }
    .rl-grid { gap: 16px !important; flex: 1 !important; }
    .rl-bento-glass { padding: 24px 28px !important; border-radius: 18px !important; }
    .rl-card-tag { font-size: 11px !important; margin-bottom: 8px !important; }
    .rl-icon-box { width: 44px !important; height: 44px !important; border-radius: 12px !important; }
    .rl-icon-box svg { width: 24px !important; height: 24px !important; }
    .rl-card-title { font-size: 22px !important; margin-bottom: 6px !important; }
    .rl-card-desc { font-size: 14px !important; line-height: 1.4 !important; }
    .rl-chevron { display: none !important; }

    /* Colored accent top border */
    .rl-bento-glass::after {
      content: '';
      position: absolute;
      top: 0; left: 10%; right: 10%;
      height: 2px;
      border-radius: 0 0 4px 4px;
      z-index: 2;
    }
    .rl-bento-glass[data-color='#00B4E5']::after { background: linear-gradient(90deg, transparent, #00B4E5, transparent); }
    .rl-bento-glass[data-color='#8B5CF6']::after { background: linear-gradient(90deg, transparent, #8B5CF6, transparent); }
    .rl-bento-glass[data-color='#10B981']::after { background: linear-gradient(90deg, transparent, #10B981, transparent); }
    .rl-bento-glass[data-color='#F59E0B']::after { background: linear-gradient(90deg, transparent, #F59E0B, transparent); }

    /* Radial glow behind cards on hover */
    .rl-card-glow {
      position: absolute;
      top: -30%; left: -20%;
      width: 140%; height: 160%;
      border-radius: 50%;
      filter: blur(60px);
      opacity: 0;
      transition: opacity 0.5s ease;
      pointer-events: none;
      z-index: -1;
    }
    .rl-bento-glass:hover .rl-card-glow {
      opacity: 1;
      animation: rl-glow-breathe 3s ease-in-out infinite;
    }

    /* Shimmer scan line on hover */
    .rl-shimmer {
      position: absolute;
      top: 0; left: 0;
      width: 40%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
      z-index: 1;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s;
    }
    .rl-bento-glass:hover .rl-shimmer {
      opacity: 1;
      animation: rl-shimmer 2.5s ease-in-out infinite;
    }

    /* Always show description on desktop */
    .rl-desktop-desc { display: block !important; }
    .rl-accordion-desc { display: none !important; }

    /* Pulsing tag dot */
    .rl-tag-dot {
      display: inline-block;
      width: 6px; height: 6px;
      border-radius: 50%;
      margin-right: 8px;
      vertical-align: middle;
      animation: rl-pulse-dot 2s ease-in-out infinite;
    }
  }

  /* Hide desktop-only elements on tablet/mobile */
  @media (max-width: 1024px) {
    .rl-card-glow, .rl-shimmer, .rl-tag-dot { display: none !important; }
    .rl-desktop-desc { display: none !important; }
    .rl-container { padding: 20px 40px 80px !important; }
    .rl-nav { padding: 32px 40px !important; }
    .rl-grid { grid-template-columns: 1fr !important; }
    .rl-h1 { font-size: 56px !important; }
  }
  @media (max-width: 768px) {
    .rl-page { overflow: hidden !important; height: 100svh !important; }

    /* Nav: compact to fit back + lang + CTA */
    .rl-nav { padding: 12px 16px !important; gap: 8px !important; }
    .rl-nav .rl-back { font-size: 13px !important; gap: 4px !important; }
    .rl-nav .rl-back svg { width: 14px !important; height: 14px !important; }
    .rl-nav-right { gap: 6px !important; }
    .rl-nav-cta { padding: 8px 12px !important; font-size: 11px !important; border-radius: 8px !important; }

    .rl-container {
      padding: 2vh 20px 12px !important;
      height: calc(100svh - 56px) !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: flex-start !important;
      overflow: hidden !important;
    }

    /* Header: compact */
    .rl-header-segment { margin-bottom: 16px !important; width: 100%; }
    .rl-eyebrow { font-size: 11px !important; margin-bottom: 8px !important; }
    .rl-h1 { font-size: 28px !important; margin-bottom: 8px !important; line-height: 1.1 !important; }
    .rl-header-desc { font-size: 12px !important; line-height: 1.3 !important; }

    /* Grid: compact, no stretch */
    .rl-grid { gap: 8px !important; overflow-y: auto !important; }

    /* Cards: minimal */
    .rl-bento-glass { padding: 12px 16px !important; border-radius: 14px !important; }
    .rl-glass-content { display: flex !important; flex-direction: column !important; gap: 0 !important; }
    .rl-card-header { display: flex !important; align-items: center !important; gap: 12px !important; flex-direction: row-reverse !important; justify-content: space-between !important; width: 100%; }

    .rl-card-tag { margin: 0 !important; width: auto !important; }
    .rl-tag-text { display: none !important; }
    .rl-icon-box { width: 38px !important; height: 38px !important; border-radius: 10px !important; }
    .rl-icon-box svg { width: 20px !important; height: 20px !important; }
    .rl-card-title { font-size: 15px !important; margin: 0 !important; flex: 1; }

    /* Hide ALL descriptions by default on mobile */
    .rl-desktop-desc { display: none !important; }
    .rl-card-desc { font-size: 12px !important; line-height: 1.3 !important; opacity: 0.7 !important; margin-top: 6px !important; }

    /* Chevron smaller */
    .rl-chevron { min-width: 20px !important; }
    .rl-chevron svg { width: 18px !important; height: 18px !important; }
  }
`;

// services array now lives in translations object above

// Framer Motion Variants for Staggered Entrance
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 100, damping: 15, mass: 1 }
    }
};

export default function ServicesPage({ onOpenModal }) {
    const navigate = useNavigate();
    const [expandedId, setExpandedId] = useState(null);
    const { lang } = useLanguage();
    const services = translations.services;

    return (
        <>
            <style>{scopedCSS}</style>
            <div style={styles.page} className="rl-page">

                {/* Animated Ambient Backdrops */}
                <div style={styles.auroraBg}>
                    <div style={styles.auroraOrb1} />
                    <div style={styles.auroraOrb2} />
                </div>

                <nav style={styles.nav} className="rl-nav">
                    <button style={styles.backButton} className="rl-back" onClick={() => navigate('/')}>
                        <ChevronLeft size={18} />
                        {t(translations.nav.back, lang)}
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="rl-nav-right">
                        <LanguageSwitcher />
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0px 10px 25px rgba(255,255,255,0.2)" }}
                            whileTap={{ scale: 0.95 }}
                            className="rl-nav-cta"
                            style={{
                                background: '#fff', color: '#000', border: 'none',
                                padding: '12px 24px', borderRadius: '10px',
                                fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                                boxShadow: '0 4px 14px rgba(255,255,255,0.1)'
                            }}
                            onClick={onOpenModal}
                        >
                            {t(translations.nav.cta, lang)}
                        </motion.button>
                    </div>
                </nav>

                <main style={styles.container} className="rl-container">

                    {/* Header Animado */}
                    <motion.div
                        style={styles.headerSegment}
                        className="rl-header-segment"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.span
                            style={styles.eyebrow}
                            className="rl-eyebrow"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                        >
                            {t(translations.header.eyebrow, lang)}
                        </motion.span>
                        <h1 style={styles.h1} className="rl-h1">{t(translations.header.h1, lang).split('\n').map((line, i) => <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>)}</h1>
                        <p style={styles.desc} className="rl-header-desc">
                            {t(translations.header.desc, lang)}
                        </p>
                    </motion.div>

                    {/* Grid Cinético com Framer Motion */}
                    <motion.div
                        style={styles.gridContainer}
                        className="rl-grid"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {services.map((s) => {
                            const Icon = s.icon;
                            return (
                                <motion.div
                                    key={s.id}
                                    variants={itemVariants}
                                    className="rl-bento-glass"
                                    data-color={s.color}
                                    onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}
                                    layout
                                    whileHover={{
                                        scale: 1.02,
                                        y: -8,
                                        borderColor: 'rgba(255,255,255,0.15)',
                                        boxShadow: `0 30px 60px rgba(0,0,0,0.6), 0 0 50px ${s.accentShadow}, 0 0 100px ${s.accentShadow}`,
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    style={{
                                        backgroundColor: 'rgba(10, 10, 10, 0.4)',
                                        backdropFilter: 'blur(30px)',
                                        WebkitBackdropFilter: 'blur(30px)',
                                        border: '1px solid rgba(255,255,255,0.06)',
                                        borderRadius: '24px',
                                        padding: '48px',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {/* Desktop: radial glow on hover */}
                                    <div
                                        className="rl-card-glow"
                                        style={{ background: `radial-gradient(circle, ${s.accentShadow.replace('0.15', '0.12')}, transparent 70%)` }}
                                    />
                                    {/* Desktop: shimmer scan line on hover */}
                                    <div className="rl-shimmer" />

                                    <div className="rl-glass-content">
                                        <div className="rl-card-header">
                                            <div style={styles.cardTag} className="rl-card-tag">
                                                <span className="rl-tag-text">
                                                    <span className="rl-tag-dot" style={{ backgroundColor: s.color }} />
                                                    {t(s.tag, lang)}
                                                </span>
                                                <motion.div
                                                    style={styles.iconBox(s.color)}
                                                    className="rl-icon-box"
                                                    animate={{ boxShadow: [`0 8px 32px rgba(0,0,0,0.4)`, `0 12px 40px ${s.accentShadow}`, `0 8px 32px rgba(0,0,0,0.4)`] }}
                                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                                >
                                                    <motion.div
                                                        whileHover={{ rotate: 15, scale: 1.1 }}
                                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                                    >
                                                        <Icon size={32} strokeWidth={1.5} />
                                                    </motion.div>
                                                </motion.div>
                                            </div>
                                            <h3 style={styles.cardTitle} className="rl-card-title">{t(s.title, lang)}</h3>
                                            <motion.div
                                                animate={{ rotate: expandedId === s.id ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                                style={{ color: 'rgba(255,255,255,0.3)', minWidth: '24px', display: 'flex', justifyContent: 'center' }}
                                                className="rl-chevron"
                                            >
                                                <ChevronDown size={24} />
                                            </motion.div>
                                        </div>

                                        {/* Desktop: always visible description */}
                                        <p style={{ ...styles.cardText, marginTop: '8px' }} className="rl-desktop-desc rl-card-desc">{t(s.desc, lang)}</p>

                                        {/* Mobile/Tablet: accordion description */}
                                        <AnimatePresence>
                                            {expandedId === s.id && (
                                                <motion.div
                                                    className="rl-accordion-desc"
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    style={{ overflow: 'hidden' }}
                                                >
                                                    <p style={{ ...styles.cardText, marginTop: '20px' }} className="rl-card-desc">{t(s.desc, lang)}</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </main >
            </div >
        </>
    );
}

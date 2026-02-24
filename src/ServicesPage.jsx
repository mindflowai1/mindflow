import React, { useState } from 'react';
import { Target, Workflow, LayoutTemplate, BrainCircuit, ChevronLeft, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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

  .rl-back:hover { color: #fff !important; }
  
  /* Gradiente decorativo interior do Glass Card */
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

  @media (max-width: 1024px) {
    .rl-container { padding: 20px 40px 80px !important; }
    .rl-nav { padding: 32px 40px !important; }
    .rl-grid { grid-template-columns: 1fr !important; }
    .rl-h1 { font-size: 56px !important; }
  }
  @media (max-width: 768px) {
    .rl-page { overflow: hidden !important; height: 100svh !important; }
    .rl-nav { padding: 20px 24px !important; }
    
    .rl-container { padding: 5vh 24px 20px !important; height: calc(100svh - 80px); display: flex; flex-direction: column; justify-content: flex-start; }
    
    .rl-header-segment { margin-bottom: 24px !important; width: 100%; }
    .rl-h1 { font-size: 36px !important; margin-bottom: 12px !important; }
    .rl-header-desc { font-size: 14px !important; line-height: 1.4 !important; }
    .rl-eyebrow { margin-bottom: 12px !important; }
    
    .rl-grid { gap: 12px !important; }
    
    .rl-bento-glass { padding: 16px 20px !important; border-radius: 16px !important; }
    .rl-glass-content { display: flex !important; flex-direction: column !important; gap: 4px !important; }
    .rl-card-header { display: flex !important; align-items: center !important; gap: 16px !important; flex-direction: row-reverse !important; justify-content: space-between !important; width: 100%; }
    
    .rl-card-tag { margin: 0 !important; width: auto !important; }
    .rl-tag-text { display: none !important; }
    .rl-card-desc { display: block !important; font-size: 13px !important; line-height: 1.4 !important; opacity: 0.8 !important; }
    
    .rl-icon-box { width: 44px !important; height: 44px !important; border-radius: 12px !important; }
    .rl-card-title { font-size: 18px !important; margin: 0 !important; flex: 1; }
  }
`;

const services = [
    {
        id: 'lead-gen',
        tag: 'REVENUE ENGINE',
        title: 'Autonomous Prospecting',
        desc: 'Stop searching, start closing. AI agents that identify, research, and hyper-personalize outreach to your ideal ICP at scale.',
        icon: Target,
        color: '#00B4E5',
        accentShadow: 'rgba(0, 180, 229, 0.15)'
    },
    {
        id: 'internal',
        tag: 'EFFICIENCY LOOP',
        title: 'Zero-Touch Workflows',
        desc: 'Connect your legacy stacks. We build automated bridges that handle data entry, routing, and reporting without human error.',
        icon: Workflow,
        color: '#8B5CF6',
        accentShadow: 'rgba(139, 92, 246, 0.15)'
    },
    {
        id: 'landing-pages',
        tag: 'DIGITAL PRESENCE',
        title: 'Conversion-First Pages',
        desc: 'We don\'t just build websites. We engineer ultra-fast, premium landing pages designed specifically to capture and convert enterprise leads.',
        icon: LayoutTemplate,
        color: '#10B981',
        accentShadow: 'rgba(16, 185, 129, 0.15)'
    },
    {
        id: 'agents',
        tag: 'AGI WORKFORCE',
        title: 'Specialist Agents',
        desc: 'Beyond rigid automations. We deploy autonomous reasoning models to execute complex multi-step tasks unique to your business.',
        icon: BrainCircuit,
        color: '#F59E0B',
        accentShadow: 'rgba(245, 158, 11, 0.15)'
    }
];

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
                        Home
                    </button>

                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0px 10px 25px rgba(255,255,255,0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            background: '#fff', color: '#000', border: 'none',
                            padding: '12px 24px', borderRadius: '10px',
                            fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                            boxShadow: '0 4px 14px rgba(255,255,255,0.1)'
                        }}
                        onClick={onOpenModal}
                    >
                        Book Strategy
                    </motion.button>
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
                            Services
                        </motion.span>
                        <h1 style={styles.h1} className="rl-h1">Tailored Intelligence.</h1>
                        <p style={styles.desc} className="rl-header-desc">
                            We engineer bespoke autonomous systems and high-converting assets
                            designed specifically to eliminate your bottlenecks and drive revenue.
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
                                    onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}
                                    layout
                                    // Hover Effects Extreme Quality
                                    whileHover={{
                                        scale: 1.02,
                                        y: -8,
                                        borderColor: 'rgba(255,255,255,0.2)',
                                        boxShadow: `0 30px 60px rgba(0,0,0,0.6), 0 0 40px ${s.accentShadow}`,
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
                                    <div className="rl-glass-content">
                                        <div className="rl-card-header">
                                            <div style={styles.cardTag} className="rl-card-tag">
                                                <span className="rl-tag-text">{s.tag}</span>
                                                <motion.div
                                                    style={styles.iconBox(s.color)}
                                                    className="rl-icon-box"
                                                    // Subtle continuous pulse on the icon box
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
                                            <h3 style={styles.cardTitle} className="rl-card-title">{s.title}</h3>
                                            <motion.div
                                                animate={{ rotate: expandedId === s.id ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                                style={{ color: 'rgba(255,255,255,0.3)', minWidth: '24px', display: 'flex', justifyContent: 'center' }}
                                                className="rl-chevron"
                                            >
                                                <ChevronDown size={24} />
                                            </motion.div>
                                        </div>

                                        <AnimatePresence>
                                            {expandedId === s.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    style={{ overflow: 'hidden' }}
                                                >
                                                    <p style={{ ...styles.cardText, marginTop: '20px' }} className="rl-card-desc">{s.desc}</p>
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

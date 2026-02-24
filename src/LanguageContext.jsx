import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageContext = createContext();

const LANGS = [
    { code: 'pt', label: 'Português', short: 'PT', flag: '/images/flag-br.svg' },
    { code: 'en', label: 'English', short: 'EN', flag: '/images/flag-us.svg' },
    { code: 'es', label: 'Español', short: 'ES', flag: '/images/flag-es.svg' },
];

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(() => {
        try {
            return localStorage.getItem('mf-lang') || 'pt';
        } catch {
            return 'pt';
        }
    });

    useEffect(() => {
        try { localStorage.setItem('mf-lang', lang); } catch { }
    }, [lang]);

    return (
        <LanguageContext.Provider value={{ lang, setLang, LANGS }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
    return ctx;
}

// Reusable translation helper
export function t(translations, lang) {
    return translations[lang] || translations['en'];
}

// ─── Flag component (clean circular SVG flags) ───
function Flag({ code, size = 20 }) {
    const s = { borderRadius: '50%', flexShrink: 0, overflow: 'hidden', display: 'block' };
    const flags = {
        pt: (
            <svg width={size} height={size} viewBox="0 0 100 100" style={s}>
                <circle cx="50" cy="50" r="50" fill="#009B3A" />
                <polygon points="50,20 85,50 50,80 15,50" fill="#FEDF00" />
                <circle cx="50" cy="50" r="16" fill="#002776" />
                <path d="M38 48 Q50 56 62 48" fill="none" stroke="#fff" strokeWidth="2" />
            </svg>
        ),
        en: (
            <svg width={size} height={size} viewBox="0 0 100 100" style={s}>
                <circle cx="50" cy="50" r="50" fill="#B22234" />
                <rect y="15" width="100" height="8" fill="#fff" />
                <rect y="31" width="100" height="8" fill="#fff" />
                <rect y="46" width="100" height="8" fill="#fff" />
                <rect y="62" width="100" height="8" fill="#fff" />
                <rect y="77" width="100" height="8" fill="#fff" />
                <rect width="45" height="54" fill="#3C3B6E" />
            </svg>
        ),
        es: (
            <svg width={size} height={size} viewBox="0 0 100 100" style={s}>
                <circle cx="50" cy="50" r="50" fill="#AA151B" />
                <rect y="25" width="100" height="50" fill="#F1BF00" />
            </svg>
        ),
    };
    return flags[code] || null;
}

// ─── Collapsible Language Switcher Dropdown ───
export function LanguageSwitcher() {
    const { lang, setLang, LANGS } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const current = LANGS.find(l => l.code === lang) || LANGS[0];

    // Close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={ref} style={{ position: 'relative', zIndex: 100 }}>
            {/* Trigger button — shows current lang flag + short code */}
            <motion.button
                onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    padding: '8px 14px',
                    cursor: 'pointer',
                    color: '#fff',
                    fontSize: '13px',
                    fontWeight: 600,
                    fontFamily: "'Inter', system-ui, sans-serif",
                    letterSpacing: '0.03em',
                    transition: 'border-color 0.2s',
                }}
            >
                <Flag code={current.code} size={18} />
                <span>{current.short}</span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ fontSize: '10px', opacity: 0.5, lineHeight: 1 }}
                >
                    ▼
                </motion.span>
            </motion.button>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        style={{
                            position: 'absolute',
                            top: 'calc(100% + 8px)',
                            right: 0,
                            background: 'rgba(15, 15, 15, 0.95)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            padding: '6px',
                            minWidth: '170px',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 1px rgba(255,255,255,0.1)',
                        }}
                    >
                        {LANGS.map((l) => (
                            <motion.button
                                key={l.code}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLang(l.code);
                                    setIsOpen(false);
                                }}
                                whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    width: '100%',
                                    padding: '10px 12px',
                                    background: lang === l.code ? 'rgba(0, 180, 229, 0.1)' : 'transparent',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    color: lang === l.code ? '#00B4E5' : 'rgba(255,255,255,0.7)',
                                    fontSize: '13px',
                                    fontWeight: lang === l.code ? 700 : 500,
                                    fontFamily: "'Inter', system-ui, sans-serif",
                                    textAlign: 'left',
                                    transition: 'background 0.15s',
                                }}
                            >
                                <Flag code={l.code} size={20} />
                                <span style={{ flex: 1 }}>{l.label}</span>
                                {lang === l.code && (
                                    <span style={{ fontSize: '12px', opacity: 0.6 }}>✓</span>
                                )}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

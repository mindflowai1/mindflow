import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function FloatingCTA({ onClick }) {
    const [visible, setVisible] = useState(false);

    // Appears after the user scrolls past ~60% of the hero, so it doesn't
    // compete with the hero's own CTA on initial paint.
    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > window.innerHeight * 0.6);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    type="button"
                    onClick={onClick}
                    aria-label="Falar com a Agência"
                    initial={{ opacity: 0, y: 40, scale: 0.7 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 40, scale: 0.7 }}
                    transition={{ type: 'spring', damping: 18, stiffness: 260 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 group"
                >
                    {/* Soft glow halo behind the button */}
                    <span className="pointer-events-none absolute inset-0 rounded-full bg-blue-500/40 blur-2xl scale-110 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Main pill */}
                    <span className="relative flex items-center gap-3 px-5 py-4 md:px-6 md:py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-[0_12px_40px_rgba(59,130,246,0.45)] group-hover:shadow-[0_18px_56px_rgba(99,102,241,0.7)] transition-shadow duration-500 overflow-hidden">
                        {/* Subtle moving sheen */}
                        <span
                            aria-hidden="true"
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                            style={{
                                background:
                                    'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)',
                                backgroundSize: '200% 100%',
                                animation: 'sheen 2.5s linear infinite',
                            }}
                        />

                        <MessageCircle size={20} strokeWidth={2.4} className="relative shrink-0" />

                        <span className="relative hidden md:inline-block font-outfit font-semibold text-sm tracking-tight whitespace-nowrap">
                            Falar com a Agência
                        </span>
                    </span>

                    {/* "Online" indicator with ping */}
                    <span className="pointer-events-none absolute -top-0.5 -right-0.5 w-3.5 h-3.5">
                        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping" />
                        <span className="relative block w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-[#02040a] shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                    </span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}

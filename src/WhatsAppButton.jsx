import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const WHATSAPP_NUMBER = '553171072131';
const WHATSAPP_MESSAGE = 'Olá! Vi o site da MindFlow e gostaria de saber mais sobre os serviços. 🚀';

function WhatsAppIcon({ className }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );
}

export default function WhatsAppButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 1800);
        return () => clearTimeout(timer);
    }, []);

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed bottom-5 left-5 md:bottom-8 md:left-8 z-40 flex flex-col items-start gap-3"
                >
                    {/* Popup card */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.92 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.92 }}
                                transition={{ type: 'spring', damping: 22, stiffness: 320 }}
                                className="w-[272px] md:w-[300px] rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.6)] border border-white/[0.07]"
                                style={{ background: 'linear-gradient(160deg, #0f1117 0%, #131720 100%)' }}
                            >
                                {/* Header */}
                                <div className="relative flex items-center gap-3 px-4 py-4 bg-gradient-to-r from-[#075E54] to-[#128C7E]">
                                    <div className="relative shrink-0">
                                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/30">
                                            <WhatsAppIcon className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#25D366] ring-2 ring-[#075E54]" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-semibold text-sm leading-tight">MindFlow</p>
                                        <p className="text-white/70 text-[11px] mt-0.5">Normalmente responde em minutos</p>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        aria-label="Fechar"
                                        className="w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>

                                {/* Chat area */}
                                <div className="px-4 py-4 space-y-1">
                                    <p className="text-white/30 text-[10px] text-center mb-3 uppercase tracking-widest">hoje</p>

                                    {/* Message bubble */}
                                    <div className="flex items-end gap-2 max-w-[85%]">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shrink-0 mb-0.5">
                                            <WhatsAppIcon className="w-3 h-3 text-white" />
                                        </div>
                                        <div
                                            className="rounded-2xl rounded-tl-none px-4 py-3 text-sm text-white/85 leading-relaxed"
                                            style={{ background: 'rgba(255,255,255,0.06)' }}
                                        >
                                            Olá! 👋 Como podemos ajudar você hoje? Nossa equipe está pronta para atender.
                                            <span className="block text-white/30 text-[10px] text-right mt-1.5">agora ✓✓</span>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="px-4 pb-4">
                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl text-white font-semibold text-sm transition-all active:scale-[0.98]"
                                        style={{
                                            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                                            boxShadow: '0 8px 24px rgba(37,211,102,0.35)',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 32px rgba(37,211,102,0.55)'}
                                        onMouseLeave={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,211,102,0.35)'}
                                    >
                                        <WhatsAppIcon className="w-4 h-4" />
                                        Iniciar Conversa
                                    </a>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Floating button */}
                    <motion.button
                        type="button"
                        onClick={() => setIsOpen(o => !o)}
                        aria-label="Abrir chat WhatsApp"
                        initial={{ opacity: 0, scale: 0.4 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', damping: 14, stiffness: 200 }}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.94 }}
                        className="relative w-14 h-14 md:w-[60px] md:h-[60px] rounded-full flex items-center justify-center"
                        style={{
                            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                            boxShadow: '0 8px 32px rgba(37,211,102,0.5)',
                        }}
                    >
                        {/* Outer pulse ring */}
                        {!isOpen && (
                            <>
                                <span
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: 'rgba(37,211,102,0.35)',
                                        animation: 'whatsapp-ping 2.2s ease-out infinite',
                                    }}
                                />
                                <span
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: 'rgba(37,211,102,0.2)',
                                        animation: 'whatsapp-ping 2.2s ease-out infinite 0.6s',
                                    }}
                                />
                            </>
                        )}

                        {/* Icon swap */}
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.span
                                    key="close"
                                    initial={{ rotate: -80, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 80, opacity: 0 }}
                                    transition={{ duration: 0.18 }}
                                    className="relative z-10"
                                >
                                    <X size={22} className="text-white" />
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="wa"
                                    initial={{ rotate: 80, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -80, opacity: 0 }}
                                    transition={{ duration: 0.18 }}
                                    className="relative z-10"
                                >
                                    <WhatsAppIcon className="w-7 h-7 text-white" />
                                </motion.span>
                            )}
                        </AnimatePresence>

                        {/* Notification dot */}
                        {!isOpen && (
                            <span className="pointer-events-none absolute -top-0.5 -right-0.5 w-3.5 h-3.5">
                                <span className="absolute inset-0 rounded-full bg-red-500 opacity-75 animate-ping" />
                                <span className="relative block w-3.5 h-3.5 rounded-full bg-red-500 ring-2 ring-[#02040a]" />
                            </span>
                        )}
                    </motion.button>

                    <style>{`
                        @keyframes whatsapp-ping {
                            0% { transform: scale(1); opacity: 0.7; }
                            80%, 100% { transform: scale(1.8); opacity: 0; }
                        }
                    `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

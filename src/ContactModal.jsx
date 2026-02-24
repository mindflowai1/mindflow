import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ChevronDown } from 'lucide-react';

const WhatsAppIcon = ({ size }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size} height={size}
        viewBox="0 0 24 24" fill="currentColor"
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
);

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
    },
    modal: {
        width: '100%',
        maxWidth: '500px',
        backgroundColor: 'rgba(10, 10, 10, 0.8)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '40px',
        position: 'relative',
        boxShadow: '0 40px 80px rgba(0,0,0,0.8), inset 0 2px 0 rgba(255,255,255,0.05)',
        color: '#fff',
        fontFamily: "'Inter', sans-serif",
    },
    closeBtn: {
        position: 'absolute',
        top: '24px',
        right: '24px',
        background: 'none',
        border: 'none',
        color: 'rgba(255,255,255,0.5)',
        cursor: 'pointer',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        transition: 'background 0.2s, color 0.2s',
    },
    header: {
        marginBottom: '32px',
    },
    h2: {
        fontSize: '32px',
        fontWeight: 700,
        letterSpacing: '-0.03em',
        margin: '0 0 8px 0',
    },
    p: {
        fontSize: '15px',
        color: 'rgba(255,255,255,0.6)',
        margin: 0,
        lineHeight: 1.5,
    },
    formGroup: {
        marginBottom: '24px',
    },
    label: {
        display: 'block',
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0.05em',
        color: 'rgba(255,255,255,0.4)',
        marginBottom: '8px',
        textTransform: 'uppercase',
    },
    input: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '16px',
        color: '#fff',
        fontSize: '16px',
        fontFamily: "'Inter', sans-serif",
        transition: 'border-color 0.2s, background 0.2s',
        outline: 'none',
    },
    textarea: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '16px',
        color: '#fff',
        fontSize: '16px',
        fontFamily: "'Inter', sans-serif",
        minHeight: '120px',
        resize: 'vertical',
        transition: 'border-color 0.2s, background 0.2s',
        outline: 'none',
    },
    channelSelector: {
        display: 'flex',
        gap: '12px',
        marginBottom: '32px',
    },
    channelBtn: (isActive) => ({
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '14px',
        borderRadius: '12px',
        border: isActive ? '1px solid rgba(0, 180, 229, 0.5)' : '1px solid rgba(255,255,255,0.1)',
        backgroundColor: isActive ? 'rgba(0, 180, 229, 0.1)' : 'rgba(255,255,255,0.03)',
        color: isActive ? '#00B4E5' : 'rgba(255,255,255,0.6)',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s',
    }),
    submitBtn: {
        width: '100%',
        padding: '18px',
        borderRadius: '12px',
        border: 'none',
        backgroundColor: '#fff',
        color: '#000',
        fontSize: '16px',
        fontWeight: 700,
        cursor: 'pointer',
        boxShadow: '0 8px 24px rgba(255,255,255,0.15)',
        transition: 'transform 0.2s, box-shadow 0.2s',
    }
};

const internalCSS = `
  .rl-modal-input:focus {
    border-color: rgba(255,255,255,0.3) !important;
    background-color: rgba(255,255,255,0.06) !important;
  }
  .rl-close-btn:hover {
    background: rgba(255,255,255,0.1) !important;
    color: #fff !important;
  }
`;

export default function ContactModal({ isOpen, onClose }) {
    const [channel, setChannel] = useState('whatsapp'); // 'whatsapp' | 'email'

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted (Preview Only)');
        // Botão inerte por enquanto
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    style={styles.overlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={onClose}
                >
                    <style>{internalCSS}</style>

                    <motion.div
                        style={styles.modal}
                        initial={{ scale: 0.9, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, y: -20, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()} // Prevent bubbling to overlay
                    >
                        <button style={styles.closeBtn} className="rl-close-btn" onClick={onClose}>
                            <X size={20} strokeWidth={2} />
                        </button>

                        <div style={styles.header}>
                            <h2 style={styles.h2}>Ready to Scale?</h2>
                            <p style={styles.p}>Let's discuss how customized AI agents can eliminate your operational bottlenecks.</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Name / Company</label>
                                <input
                                    type="text"
                                    placeholder="Jane Doe @ Acme Corp"
                                    style={styles.input}
                                    className="rl-modal-input"
                                    required
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>{channel === 'whatsapp' ? 'WhatsApp Number' : 'Email Address'}</label>
                                <input
                                    type={channel === 'whatsapp' ? 'tel' : 'email'}
                                    placeholder={channel === 'whatsapp' ? '+55 11 99999-9999' : 'jane@acmecorp.com'}
                                    style={styles.input}
                                    className="rl-modal-input"
                                    required
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Service of Interest</label>
                                <div style={{ position: 'relative' }}>
                                    <select
                                        style={{ ...styles.input, appearance: 'none', cursor: 'pointer' }}
                                        className="rl-modal-input"
                                        required
                                        defaultValue=""
                                    >
                                        <option value="" disabled style={{ color: 'rgba(255,255,255,0.4)' }}>What do you need help with?</option>
                                        <option value="Getting More Clients" style={{ background: '#111', color: '#fff' }}>Finding more clients and leads</option>
                                        <option value="Automating Tasks" style={{ background: '#111', color: '#fff' }}>Automating repetitive daily tasks</option>
                                        <option value="New Website" style={{ background: '#111', color: '#fff' }}>Building a high-converting website</option>
                                        <option value="Custom AI Assistant" style={{ background: '#111', color: '#fff' }}>A custom AI assistant for my business</option>
                                    </select>
                                    <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'rgba(255,255,255,0.5)' }}>
                                        <ChevronDown size={18} />
                                    </div>
                                </div>
                            </div>

                            <label style={styles.label}>Preferred channel</label>
                            <div style={styles.channelSelector}>
                                <button
                                    type="button"
                                    style={styles.channelBtn(channel === 'whatsapp')}
                                    onClick={() => setChannel('whatsapp')}
                                >
                                    <WhatsAppIcon size={18} /> WhatsApp
                                </button>
                                <button
                                    type="button"
                                    style={styles.channelBtn(channel === 'email')}
                                    onClick={() => setChannel('email')}
                                >
                                    <Mail size={18} /> Email
                                </button>
                            </div>

                            <motion.button
                                type="submit"
                                style={styles.submitBtn}
                                whileHover={{ scale: 1.02, boxShadow: '0 12px 32px rgba(255,255,255,0.25)' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Scale Now
                            </motion.button>
                        </form>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

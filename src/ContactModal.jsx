import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ChevronDown, ArrowRight, ArrowLeft, Check, Loader2, AlertCircle, Search } from 'lucide-react';

const WEBHOOK_URL = 'https://n8n-n8n-start.kof6cn.easypanel.host/webhook/56ee9837-3660-4283-b891-760ead8fa191';

// Lista de países priorizando BR + LATAM + principais. code é o prefixo internacional.
const COUNTRIES = [
    { code: '+55', flag: '🇧🇷', name: 'Brasil' },
    { code: '+1', flag: '🇺🇸', name: 'Estados Unidos' },
    { code: '+351', flag: '🇵🇹', name: 'Portugal' },
    { code: '+54', flag: '🇦🇷', name: 'Argentina' },
    { code: '+52', flag: '🇲🇽', name: 'México' },
    { code: '+56', flag: '🇨🇱', name: 'Chile' },
    { code: '+57', flag: '🇨🇴', name: 'Colômbia' },
    { code: '+598', flag: '🇺🇾', name: 'Uruguai' },
    { code: '+595', flag: '🇵🇾', name: 'Paraguai' },
    { code: '+51', flag: '🇵🇪', name: 'Peru' },
    { code: '+58', flag: '🇻🇪', name: 'Venezuela' },
    { code: '+593', flag: '🇪🇨', name: 'Equador' },
    { code: '+591', flag: '🇧🇴', name: 'Bolívia' },
    { code: '+34', flag: '🇪🇸', name: 'Espanha' },
    { code: '+44', flag: '🇬🇧', name: 'Reino Unido' },
    { code: '+33', flag: '🇫🇷', name: 'França' },
    { code: '+49', flag: '🇩🇪', name: 'Alemanha' },
    { code: '+39', flag: '🇮🇹', name: 'Itália' },
    { code: '+1', flag: '🇨🇦', name: 'Canadá' },
    { code: '+61', flag: '🇦🇺', name: 'Austrália' },
    { code: '+81', flag: '🇯🇵', name: 'Japão' },
    { code: '+86', flag: '🇨🇳', name: 'China' },
    { code: '+91', flag: '🇮🇳', name: 'Índia' },
];

const WhatsAppIcon = ({ size = 18 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size} height={size}
        viewBox="0 0 24 24" fill="currentColor"
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
);

export default function ContactModal({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
    const [errorMsg, setErrorMsg] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        service: '',
        channel: 'whatsapp',
        contact: '',
    });

    // Phone-specific state — only used when channel === 'whatsapp'.
    // contact is composed as `${phoneCountry.code} ${phoneDigits}` for output.
    const [phoneCountry, setPhoneCountry] = useState(COUNTRIES[0]);
    const [phoneDigits, setPhoneDigits] = useState('');
    const [countryOpen, setCountryOpen] = useState(false);
    const [countrySearch, setCountrySearch] = useState('');
    const countryDropdownRef = useRef(null);

    // Block background scroll while open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Reset when closing
    useEffect(() => {
        if (!isOpen) {
            const t = setTimeout(() => {
                setStep(1);
                setStatus('idle');
                setErrorMsg('');
                setFormData({ name: '', company: '', service: '', channel: 'whatsapp', contact: '' });
                setPhoneCountry(COUNTRIES[0]);
                setPhoneDigits('');
                setCountryOpen(false);
                setCountrySearch('');
            }, 300);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    // Close country dropdown on outside click
    useEffect(() => {
        if (!countryOpen) return;
        const handler = (e) => {
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target)) {
                setCountryOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [countryOpen]);

    const update = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }));

    // Compose contact when phone country/digits change (whatsapp channel only).
    // Output is digits-only, concatenated: "5531999766846" (no +, no spaces, no hyphens).
    const composePhoneContact = (countryObj, digits) => {
        const countryDigits = countryObj.code.replace(/\D/g, '');
        const numberDigits = digits.replace(/\D/g, '');
        return numberDigits ? `${countryDigits}${numberDigits}` : '';
    };

    const handleCountrySelect = (country) => {
        setPhoneCountry(country);
        setCountryOpen(false);
        setCountrySearch('');
        update('contact', composePhoneContact(country, phoneDigits));
    };

    const handlePhoneDigitsChange = (e) => {
        const val = e.target.value;
        setPhoneDigits(val);
        update('contact', composePhoneContact(phoneCountry, val));
    };

    const handleChannelSwitch = (newChannel) => {
        if (formData.channel === newChannel) return;
        // Reset contact + phone digits when toggling channel
        setPhoneDigits('');
        update('contact', '');
        update('channel', newChannel);
    };

    const filteredCountries = useMemo(() => {
        const q = countrySearch.trim().toLowerCase();
        if (!q) return COUNTRIES;
        return COUNTRIES.filter(
            (c) => c.name.toLowerCase().includes(q) || c.code.includes(q)
        );
    }, [countrySearch]);

    const canAdvance = formData.name.trim() && formData.company.trim();
    const canSubmit = formData.service && formData.contact.trim() && status !== 'sending';

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!canSubmit) return;

        setStatus('sending');
        setErrorMsg('');

        try {
            const res = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    submittedAt: new Date().toISOString(),
                    source: 'mindflowdigital.com.br',
                }),
            });
            if (!res.ok) throw new Error(`Resposta ${res.status}`);
            setStatus('success');
        } catch (err) {
            console.error('Erro ao enviar formulário:', err);
            setErrorMsg('Não conseguimos enviar agora. Tenta de novo em alguns segundos.');
            setStatus('error');
        }
    };

    const inputBase = "w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white text-base placeholder:text-white/30 outline-none transition-all duration-200 focus:border-blue-400/50 focus:bg-white/[0.06]";
    const labelBase = "block text-[11px] font-semibold tracking-[0.1em] uppercase text-white/40 mb-2 font-outfit";

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6"
                    style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="relative w-full max-w-[520px] rounded-3xl border border-white/10 p-8 md:p-10 text-white font-sans"
                        style={{
                            backgroundColor: 'rgba(10, 12, 20, 0.85)',
                            backdropFilter: 'blur(40px)',
                            WebkitBackdropFilter: 'blur(40px)',
                            boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
                        }}
                        initial={{ scale: 0.92, y: 24, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, y: -16, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                            aria-label="Fechar"
                        >
                            <X size={18} strokeWidth={2} />
                        </button>

                        <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="py-6 text-center"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
                                    className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-[0_12px_32px_rgba(59,130,246,0.4)]"
                                >
                                    <Check size={32} strokeWidth={3} className="text-white" />
                                </motion.div>
                                <h2 className="font-outfit text-3xl md:text-4xl font-light tracking-tight leading-[1.1] mb-3">
                                    Recebemos sua <span className="font-medium text-blue-400">solicitação</span>
                                </h2>
                                <p className="text-sm md:text-base text-white/60 font-light leading-relaxed mb-8 max-w-sm mx-auto">
                                    Em breve entraremos em contato pelo {formData.channel === 'whatsapp' ? 'WhatsApp' : 'e-mail'} informado. Obrigado!
                                </p>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-7 py-3 rounded-xl font-outfit font-medium text-sm text-white/70 hover:text-white border border-white/15 hover:border-white/30 bg-white/[0.03] hover:bg-white/[0.06] transition-all"
                                >
                                    Fechar
                                </button>
                            </motion.div>
                        ) : (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                        {/* Progress bar — right padding leaves room for the close button */}
                        <div className="flex items-center gap-3 mb-8 pr-12">
                            <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                    initial={false}
                                    animate={{ width: step === 1 ? '50%' : '100%' }}
                                    transition={{ duration: 0.4, ease: 'easeOut' }}
                                />
                            </div>
                            <span className="text-[11px] font-outfit font-medium tracking-[0.15em] uppercase text-white/40 tabular-nums shrink-0">
                                {step}/2
                            </span>
                        </div>

                        {/* Header */}
                        <div className="mb-7">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`header-${step}`}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {step === 1 ? (
                                        <>
                                            <h2 className="font-outfit text-3xl md:text-4xl font-light tracking-tight leading-[1.1] mb-2">
                                                Vamos nos <span className="font-medium text-blue-400">conhecer</span>
                                            </h2>
                                            <p className="text-sm md:text-base text-white/50 font-light leading-relaxed">
                                                Conta um pouco sobre você e sua empresa.
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <h2 className="font-outfit text-3xl md:text-4xl font-light tracking-tight leading-[1.1] mb-2">
                                                Como podemos <span className="font-medium text-blue-400">ajudar</span>?
                                            </h2>
                                            <p className="text-sm md:text-base text-white/50 font-light leading-relaxed">
                                                Conte o que precisa e por onde prefere o contato.
                                            </p>
                                        </>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <AnimatePresence mode="wait">
                                {step === 1 ? (
                                    <motion.div
                                        key="step-1"
                                        initial={{ opacity: 0, x: 24 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -24 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <div className="mb-5">
                                            <label className={labelBase}>Nome completo</label>
                                            <input
                                                type="text"
                                                placeholder="Como podemos te chamar?"
                                                className={inputBase}
                                                value={formData.name}
                                                onChange={(e) => update('name', e.target.value)}
                                                autoFocus
                                            />
                                        </div>

                                        <div className="mb-8">
                                            <label className={labelBase}>Empresa</label>
                                            <input
                                                type="text"
                                                placeholder="Nome do seu negócio"
                                                className={inputBase}
                                                value={formData.company}
                                                onChange={(e) => update('company', e.target.value)}
                                            />
                                        </div>

                                        <div className="flex justify-end">
                                            <motion.button
                                                type="button"
                                                onClick={() => canAdvance && setStep(2)}
                                                disabled={!canAdvance}
                                                whileHover={canAdvance ? { scale: 1.02 } : {}}
                                                whileTap={canAdvance ? { scale: 0.98 } : {}}
                                                className={`flex items-center gap-2 px-7 py-3.5 rounded-xl font-outfit font-semibold text-sm tracking-wide transition-all ${
                                                    canAdvance
                                                        ? 'bg-white text-black shadow-[0_8px_24px_rgba(255,255,255,0.15)] hover:shadow-[0_12px_32px_rgba(255,255,255,0.25)]'
                                                        : 'bg-white/10 text-white/30 cursor-not-allowed'
                                                }`}
                                            >
                                                Continuar
                                                <ArrowRight size={16} strokeWidth={2.5} />
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="step-2"
                                        initial={{ opacity: 0, x: 24 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -24 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <div className="mb-5">
                                            <label className={labelBase}>Serviço de interesse</label>
                                            <div className="relative">
                                                <select
                                                    className={`${inputBase} appearance-none cursor-pointer pr-12`}
                                                    value={formData.service}
                                                    onChange={(e) => update('service', e.target.value)}
                                                >
                                                    <option value="" disabled style={{ background: '#111', color: 'rgba(255,255,255,0.4)' }}>
                                                        Selecione uma opção
                                                    </option>
                                                    <option value="completa" style={{ background: '#1e3a8a', color: '#fff', fontWeight: 700 }}>
                                                        ✨ Solução Completa (Recomendado)
                                                    </option>
                                                    <option value="leads" style={{ background: '#111', color: '#fff' }}>Atrair mais clientes e leads</option>
                                                    <option value="automacao" style={{ background: '#111', color: '#fff' }}>Automatizar tarefas repetitivas</option>
                                                    <option value="landing" style={{ background: '#111', color: '#fff' }}>Landing page de alta conversão</option>
                                                    <option value="ia" style={{ background: '#111', color: '#fff' }}>Assistente de IA customizado</option>
                                                    <option value="outro" style={{ background: '#111', color: '#fff' }}>Outro</option>
                                                </select>
                                                <ChevronDown
                                                    size={18}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-5">
                                            <label className={labelBase}>Canal preferido</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => handleChannelSwitch('whatsapp')}
                                                    className={`flex items-center justify-center gap-2 py-3.5 rounded-xl border text-sm font-outfit font-semibold transition-all ${
                                                        formData.channel === 'whatsapp'
                                                            ? 'border-blue-400/50 bg-blue-500/10 text-blue-300'
                                                            : 'border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white/80'
                                                    }`}
                                                >
                                                    <WhatsAppIcon size={16} /> WhatsApp
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleChannelSwitch('email')}
                                                    className={`flex items-center justify-center gap-2 py-3.5 rounded-xl border text-sm font-outfit font-semibold transition-all ${
                                                        formData.channel === 'email'
                                                            ? 'border-blue-400/50 bg-blue-500/10 text-blue-300'
                                                            : 'border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white/80'
                                                    }`}
                                                >
                                                    <Mail size={16} /> E-mail
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mb-8">
                                            <label className={labelBase}>
                                                {formData.channel === 'whatsapp' ? 'Seu WhatsApp' : 'Seu e-mail'}
                                            </label>

                                            {formData.channel === 'whatsapp' ? (
                                                <div className="relative" ref={countryDropdownRef}>
                                                    <div className="flex items-stretch gap-2">
                                                        {/* Country selector trigger */}
                                                        <button
                                                            type="button"
                                                            onClick={() => setCountryOpen((o) => !o)}
                                                            className={`flex items-center gap-2 px-3 rounded-xl border transition-all shrink-0 ${
                                                                countryOpen
                                                                    ? 'border-blue-400/50 bg-white/[0.06]'
                                                                    : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                                                            }`}
                                                            aria-label="Selecionar país"
                                                        >
                                                            <span className="text-xl leading-none">{phoneCountry.flag}</span>
                                                            <span className="text-sm font-medium text-white/80 tabular-nums">{phoneCountry.code}</span>
                                                            <ChevronDown
                                                                size={14}
                                                                className={`text-white/40 transition-transform ${countryOpen ? 'rotate-180' : ''}`}
                                                            />
                                                        </button>

                                                        {/* Phone digits input */}
                                                        <input
                                                            type="tel"
                                                            inputMode="tel"
                                                            placeholder="11 99999-9999"
                                                            className={`${inputBase} flex-1`}
                                                            value={phoneDigits}
                                                            onChange={handlePhoneDigitsChange}
                                                        />
                                                    </div>

                                                    {/* Country dropdown */}
                                                    <AnimatePresence>
                                                        {countryOpen && (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: -8 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -8 }}
                                                                transition={{ duration: 0.15 }}
                                                                className="absolute left-0 right-0 top-full mt-2 z-20 rounded-xl border border-white/10 overflow-hidden shadow-[0_24px_48px_rgba(0,0,0,0.5)]"
                                                                style={{
                                                                    backgroundColor: 'rgba(15, 17, 25, 0.98)',
                                                                    backdropFilter: 'blur(24px)',
                                                                    WebkitBackdropFilter: 'blur(24px)',
                                                                }}
                                                            >
                                                                {/* Search */}
                                                                <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/10">
                                                                    <Search size={14} className="text-white/40 shrink-0" />
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Buscar país..."
                                                                        className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
                                                                        value={countrySearch}
                                                                        onChange={(e) => setCountrySearch(e.target.value)}
                                                                        autoFocus
                                                                    />
                                                                </div>

                                                                {/* List */}
                                                                <div className="max-h-60 overflow-y-auto py-1">
                                                                    {filteredCountries.length === 0 ? (
                                                                        <div className="px-4 py-3 text-sm text-white/40 text-center">
                                                                            Nenhum país encontrado
                                                                        </div>
                                                                    ) : (
                                                                        filteredCountries.map((c) => {
                                                                            const isSelected =
                                                                                c.code === phoneCountry.code && c.name === phoneCountry.name;
                                                                            return (
                                                                                <button
                                                                                    key={`${c.code}-${c.name}`}
                                                                                    type="button"
                                                                                    onClick={() => handleCountrySelect(c)}
                                                                                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                                                                                        isSelected
                                                                                            ? 'bg-blue-500/10 text-blue-300'
                                                                                            : 'text-white/80 hover:bg-white/5'
                                                                                    }`}
                                                                                >
                                                                                    <span className="text-xl leading-none">{c.flag}</span>
                                                                                    <span className="flex-1 text-sm">{c.name}</span>
                                                                                    <span className="text-xs text-white/40 tabular-nums">{c.code}</span>
                                                                                </button>
                                                                            );
                                                                        })
                                                                    )}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ) : (
                                                <input
                                                    type="email"
                                                    placeholder="voce@email.com"
                                                    className={inputBase}
                                                    value={formData.contact}
                                                    onChange={(e) => update('contact', e.target.value)}
                                                />
                                            )}
                                        </div>

                                        {status === 'error' && errorMsg && (
                                            <div className="mb-4 flex items-start gap-2 px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm">
                                                <AlertCircle size={16} strokeWidth={2} className="mt-0.5 shrink-0" />
                                                <span>{errorMsg}</span>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setStep(1)}
                                                disabled={status === 'sending'}
                                                className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-outfit font-medium text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <ArrowLeft size={16} strokeWidth={2.5} />
                                                Voltar
                                            </button>

                                            <motion.button
                                                type="submit"
                                                disabled={!canSubmit}
                                                whileHover={canSubmit ? { scale: 1.02 } : {}}
                                                whileTap={canSubmit ? { scale: 0.98 } : {}}
                                                className={`flex items-center gap-2 px-7 py-3.5 rounded-xl font-outfit font-semibold text-sm tracking-wide transition-all ${
                                                    canSubmit
                                                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-[0_8px_24px_rgba(59,130,246,0.3)] hover:shadow-[0_12px_32px_rgba(59,130,246,0.4)]'
                                                        : 'bg-white/10 text-white/30 cursor-not-allowed'
                                                }`}
                                            >
                                                {status === 'sending' ? (
                                                    <>
                                                        Enviando
                                                        <Loader2 size={16} strokeWidth={2.5} className="animate-spin" />
                                                    </>
                                                ) : (
                                                    <>
                                                        Enviar
                                                        <Check size={16} strokeWidth={2.5} />
                                                    </>
                                                )}
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                        </motion.div>
                        )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

import { motion, AnimatePresence } from 'framer-motion'
import {
    Mail,
    Phone,
    MapPin,
    Github,
    Linkedin,
    Instagram,
    Send,
    ArrowRight,
    ExternalLink,
    AlertCircle,
    Copy,
    Check,
    ArrowUpRight
} from 'lucide-react'
import { useState } from 'react'
import emailjs from '@emailjs/browser'

const ContactMethodCard = ({ method, index }) => {
    const [copied, setCopied] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const handleCopy = (e) => {
        e.preventDefault()
        e.stopPropagation()
        navigator.clipboard.writeText(method.copyValue || method.value)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="contact-card-modern group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                borderColor: isHovered ? `${method.color}70` : 'rgba(255, 255, 255, 0.08)',
                boxShadow: isHovered
                    ? `0 14px 35px -8px ${method.color}35, 0 0 20px ${method.color}15`
                    : '0 4px 20px rgba(0, 0, 0, 0.25)'
            }}
        >
            <div
                className="contact-card-glow"
                style={{
                    background: `radial-gradient(circle at 20% 50%, ${method.color}15 0%, transparent 70%)`,
                    opacity: isHovered ? 1 : 0
                }}
            />

            <a
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card-main-link"
                aria-label={`${method.title}: ${method.value}`}
            >
                <div
                    className="contact-card-icon"
                    style={{
                        background: `radial-gradient(circle, ${method.color}25 0%, ${method.color}08 100%)`,
                        color: method.color,
                        borderColor: `${method.color}40`,
                        boxShadow: isHovered ? `0 0 20px ${method.color}50` : `0 0 12px ${method.color}20`,
                        transform: isHovered ? 'scale(1.08)' : 'scale(1)'
                    }}
                >
                    {method.icon}
                </div>

                <div className="contact-card-info">
                    <div className="contact-card-label-row">
                        <span className="contact-card-label" style={{ color: method.color }}>
                            {method.title}
                        </span>
                        <span className="contact-card-action-hint">
                            <span>{method.actionLabel}</span>
                            <ArrowUpRight size={13} className="contact-card-action-icon" />
                        </span>
                    </div>

                    <p className="contact-card-value">
                        {method.value}
                    </p>
                </div>
            </a>

            {method.copyable && (
                <button
                    onClick={handleCopy}
                    className="contact-card-copy-btn"
                    title={copied ? "Copied to clipboard!" : `Copy ${method.title}`}
                    aria-label={`Copy ${method.title}`}
                    style={{
                        color: copied ? '#34d399' : '#94a3b8',
                        borderColor: copied ? 'rgba(52, 211, 153, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                        background: copied ? 'rgba(52, 211, 153, 0.15)' : 'rgba(255, 255, 255, 0.05)'
                    }}
                >
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                    <span className="contact-copy-tooltip">{copied ? 'Copied!' : 'Copy'}</span>
                </button>
            )}
        </motion.div>
    )
}

const Contact = () => {
    const [formState, setFormState] = useState('idle')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [errors, setErrors] = useState({})

    const validateForm = () => {
        let newErrors = {}
        if (!formData.name.trim()) newErrors.name = 'FullName is required'

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!formData.email) {
            newErrors.email = 'Email required'
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email'
        }

        if (!formData.subject.trim()) newErrors.subject = 'Subject required'
        if (!formData.message.trim()) newErrors.message = 'Message required'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setFormState('sending')

        const apiUrl = (import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:8000/api').replace(/\/+$/, '') + '/contact'

        // 1. Submit to Laravel Backend Database
        const backendPromise = fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message
            })
        }).then(res => res.json()).catch(err => {
            console.warn('Backend API submission unreachable or failed:', err);
            return null;
        });

        // 2. Dual-dispatch to EmailJS
        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            to_name: 'Someshwar Holkar',
            subject: formData.subject,
            message: formData.message,
        };

        const emailJsPromise = emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_id',
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_id',
            templateParams,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key'
        ).catch(err => {
            console.warn('EmailJS transmission failed:', err);
            return null;
        });

        try {
            const [apiRes, emailRes] = await Promise.all([backendPromise, emailJsPromise]);

            if ((apiRes && apiRes.success) || emailRes) {
                setFormState('success')
                setFormData({ name: '', email: '', subject: '', message: '' })
                setErrors({})
            } else {
                setFormState('idle');
                setErrors({ submit: 'Transmission failed. Please check your network or try again.' });
            }
        } catch (err) {
            console.error('Submission failed:', err);
            setFormState('idle');
            setErrors({ submit: 'Transmission failed. Please check your network or try again.' });
        }
    }

    const contactMethods = [
        {
            icon: <Mail size={22} />,
            title: 'EMAIL',
            value: 'someshwarsholkar22@gmail.com',
            link: 'mailto:someshwarsholkar22@gmail.com',
            copyValue: 'someshwarsholkar22@gmail.com',
            actionLabel: 'Send Email',
            copyable: true,
            color: '#00d4ff'
        },
        {
            icon: <Phone size={22} />,
            title: 'PHONE',
            value: '+91 84828 16761',
            link: 'tel:+918482816761',
            copyValue: '+918482816761',
            actionLabel: 'Call Directly',
            copyable: true,
            color: '#7c3aed'
        },
        {
            icon: <MapPin size={22} />,
            title: 'LOCATION',
            value: 'Chhatrapati Sambhajinagar (Aurangabad), Maharashtra 431101',
            link: 'https://maps.google.com/?q=Aurangabad,Maharashtra',
            actionLabel: 'Open Maps',
            copyable: false,
            color: '#f472b6'
        }
    ]

    const socialLinks = [
        { icon: <Github size={20} />, url: 'https://github.com/holkar-somesh01', name: 'GitHub', color: '#ffffff', glow: 'rgba(255, 255, 255, 0.35)' },
        { icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/in/someshwar-holkar-819503314/', name: 'LinkedIn', color: '#0077b5', glow: 'rgba(0, 119, 181, 0.45)' },
        { icon: <Instagram size={20} />, url: 'https://www.instagram.com/patil_soma.24', name: 'Instagram', color: '#e4405f', glow: 'rgba(228, 64, 95, 0.45)' }
    ]

    return (
        <section id="contact" style={{ padding: '6rem 0', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '20%', left: '10%', width: '400px', height: '400px', background: 'var(--primary)', filter: 'blur(200px)', opacity: 0.05, borderRadius: '50%' }}></div>
            <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '400px', height: '400px', background: 'var(--secondary)', filter: 'blur(200px)', opacity: 0.05, borderRadius: '50%' }}></div>

            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        style={{
                            display: 'inline-block', padding: '0.6rem 2rem', backgroundColor: 'rgba(0, 212, 255, 0.05)',
                            border: '1px solid rgba(0, 212, 255, 0.2)', borderRadius: '100px', color: 'var(--primary)',
                            fontSize: '0.8rem', fontWeight: 800, letterSpacing: '4px', marginBottom: '2rem'
                        }}
                    >
                        CONNECT
                    </motion.span>
                    <h2 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 950, lineHeight: 1, marginBottom: '2rem', letterSpacing: '-2px' }}>
                        Let's build something <br />
                        <span style={{
                            background: 'linear-gradient(to right, #00d4ff, #7c3aed)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>extraordinary</span> together.
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.8 }}>
                        I am currently accepting select projects for long-term partnerships and high-impact missions.
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'start' }}>

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="contact-cards-list">
                            {contactMethods.map((method, index) => (
                                <ContactMethodCard
                                    key={method.title}
                                    method={method}
                                    index={index}
                                />
                            ))}
                        </div>

                        <div style={{ marginTop: '2.5rem' }}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '2px', marginBottom: '1.2rem', textTransform: 'uppercase' }}>
                                Social Profiles
                            </p>
                            <div className="contact-social-row">
                                {socialLinks.map((social, idx) => (
                                    <motion.a
                                        key={idx}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.name}
                                        whileHover={{ y: -4, scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="contact-social-btn"
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = social.color
                                            e.currentTarget.style.boxShadow = `0 8px 25px ${social.glow}`
                                            e.currentTarget.style.color = social.color
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)'
                                            e.currentTarget.style.color = '#cbd5e1'
                                        }}
                                    >
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{
                            background: 'rgba(255, 255, 255, 0.01)', borderRadius: '32px', border: '1px solid rgba(255, 255, 255, 0.05)',
                            padding: 'clamp(2rem, 5vw, 3rem)', backdropFilter: 'blur(20px)', alignSelf: 'start', position: 'relative'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                style={{
                                    display: 'inline-block', padding: '0.6rem 2rem',
                                    background: 'rgba(0, 212, 255, 0.05)', borderRadius: '30px',
                                    border: '1px solid rgba(0, 212, 255, 0.3)', color: 'var(--primary)',
                                    fontSize: '0.85rem', fontWeight: 800, letterSpacing: '4px',
                                    textTransform: 'uppercase', backdropFilter: 'blur(10px)'
                                }}
                            >
                                Get In Touch
                            </motion.div>
                        </div>
                        <AnimatePresence>
                            {formState === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    style={{ position: 'absolute', inset: 0, background: '#0a0a0f', borderRadius: '32px', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2.5rem 2rem', border: '1px solid rgba(0, 212, 255, 0.3)', backdropFilter: 'blur(20px)' }}
                                >
                                    <div style={{ width: '68px', height: '68px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(16, 185, 129, 0.2))', border: '1px solid rgba(16, 185, 129, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem', boxShadow: '0 0 25px rgba(16, 185, 129, 0.25)' }}>
                                        <Check size={34} color="#34d399" />
                                    </div>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#34d399', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                                        TRANSMISSION CONFIRMED
                                    </span>
                                    <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff' }}>Message Sent Successfully!</h3>
                                    <p style={{ color: '#94a3b8', fontSize: '0.92rem', marginTop: '0.5rem', maxWidth: '380px', lineHeight: 1.6 }}>
                                        Thank you for reaching out! A confirmation email has been dispatched to your inbox. Someshwar will get back to you within 24 hours.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setFormState('idle')}
                                        style={{ marginTop: '1.8rem', padding: '0.8rem 2.2rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#ffffff', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s ease' }}
                                    >
                                        Send Another Message
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.2rem' }} noValidate>
                            {errors.submit && (
                                <div style={{ padding: '0.9rem 1.1rem', background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', color: '#fca5a5', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                    <AlertCircle size={18} color="#f87171" style={{ flexShrink: 0 }} />
                                    <span>{errors.submit}</span>
                                </div>
                            )}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem' }}>
                                <div className="input-field">
                                    <input
                                        type="text" placeholder="Name"
                                        className={`modern-section-input ${errors.name ? 'has-error' : ''}`}
                                        value={formData.name}
                                        onChange={(e) => {
                                            setFormData({ ...formData, name: e.target.value });
                                            if (errors.name) setErrors({ ...errors, name: null });
                                        }}
                                    />
                                    {errors.name && <span className="error-msg"><AlertCircle size={12} /> {errors.name}</span>}
                                </div>
                                <div className="input-field">
                                    <input
                                        type="email" placeholder="Email"
                                        className={`modern-section-input ${errors.email ? 'has-error' : ''}`}
                                        value={formData.email}
                                        onChange={(e) => {
                                            setFormData({ ...formData, email: e.target.value });
                                            if (errors.email) setErrors({ ...errors, email: null });
                                        }}
                                    />
                                    {errors.email && <span className="error-msg"><AlertCircle size={12} /> {errors.email}</span>}
                                </div>
                            </div>

                            <div className="input-field">
                                <input
                                    type="text" placeholder="Subject"
                                    className={`modern-section-input ${errors.subject ? 'has-error' : ''}`}
                                    value={formData.subject}
                                    onChange={(e) => {
                                        setFormData({ ...formData, subject: e.target.value });
                                        if (errors.subject) setErrors({ ...errors, subject: null });
                                    }}
                                />
                                {errors.subject && <span className="error-msg"><AlertCircle size={12} /> {errors.subject}</span>}
                            </div>

                            <div className="input-field">
                                <textarea
                                    rows="4"
                                    placeholder="Message"
                                    className={`modern-section-input ${errors.message ? 'has-error' : ''}`}
                                    value={formData.message}
                                    onChange={(e) => {
                                        setFormData({ ...formData, message: e.target.value });
                                        if (errors.message) setErrors({ ...errors, message: null });
                                    }}
                                    style={{ resize: 'none' }}
                                />
                                {errors.message && <span className="error-msg"><AlertCircle size={12} /> {errors.message}</span>}
                            </div>

                            <button type="submit" disabled={formState === 'sending'} style={{ padding: '1.1rem', borderRadius: '15px', background: 'var(--gradient-primary)', border: 'none', color: '#fff', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', marginTop: '0.5rem' }}>
                                {formState === 'sending' ? 'Sending...' : <>Send Message <ArrowRight size={18} /></>}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .modern-section-input {
                    width: 100%;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 12px;
                    padding: 1.1rem;
                    color: #fff;
                    outline: none;
                    transition: all 0.3s ease;
                }
                .modern-section-input:focus {
                    border-color: var(--primary);
                    background: rgba(255, 255, 255, 0.05);
                }
                .modern-section-input.has-error {
                    border-color: #ff4d4d;
                    background: rgba(255, 77, 77, 0.02);
                }
                .error-msg {
                    color: #ff4d4d;
                    font-size: 0.75rem;
                    margin-top: 0.4rem;
                    display: flex;
                    alignItems: center;
                    gap: 0.3rem;
                    font-weight: 500;
                }
                .input-field {
                    display: flex;
                    flex-direction: column;
                }
                .contact-card-v3 {
                    gap: 1.5rem;
                }
                .contact-card-v3:hover {
                    background: rgba(255, 255, 255, 0.04) !important;
                    transform: translateX(5px);
                }
                .contact-icon-box {
                    width: 50px;
                    height: 50px;
                    min-width: 50px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                @media (max-width: 768px) {
                    .contact-card-v3 {
                        gap: 1rem;
                        padding: 1.2rem !important;
                    }
                    .contact-icon-box {
                        width: 38px;
                        height: 38px;
                        min-width: 38px;
                        border-radius: 10px;
                    }
                    .contact-icon-box svg {
                        width: 18px !important;
                        height: 18px !important;
                    }
                }
            ` }} />
        </section>
    )
}

export default Contact
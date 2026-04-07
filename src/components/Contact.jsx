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
    AlertCircle
} from 'lucide-react'
import { useState } from 'react'

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

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setFormState('sending')
        setTimeout(() => {
            setFormState('success')
            setFormData({ name: '', email: '', subject: '', message: '' })
            setErrors({})
        }, 2000)
    }

    const contactMethods = [
        {
            icon: <Mail size={24} />,
            title: 'Email',
            value: 'someshwarsholkar22@gmail.com',
            link: 'mailto:someshwarsholkar22@gmail.com',
            color: '#00d4ff'
        },
        {
            icon: <Phone size={24} />,
            title: 'Phone',
            value: '+91 84828 16761',
            link: 'tel:+8482816761',
            color: '#7c3aed'
        },
        {
            icon: <MapPin size={24} />,
            title: 'Location',
            value: 'Aurangabad, India',
            link: 'https://maps.google.com/?q=Aurangabad,Maharashtra',
            color: '#f472b6'
        }
    ]

    const socialLinks = [
        { icon: <Github size={20} />, url: 'https://github.com/holkar-somesh01', name: 'GitHub', color: '#333' },
        { icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/in/someshwar-holkar-819503314/', name: 'LinkedIn', color: '#0077b5' },
        { icon: <Instagram size={20} />, url: 'https://www.instagram.com/soma_patil.24', name: 'Instagram', color: '#e4405f' }
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

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div style={{ display: 'grid', gap: '1.2rem' }}>
                            {contactMethods.map((method, index) => (
                                <div
                                    key={index}
                                    style={{
                                        padding: '1.5rem', background: 'rgba(255, 255, 255, 0.02)',
                                        borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.05)',
                                        display: 'flex', gap: '1.5rem', transition: 'all 0.3s ease'
                                    }}
                                    className="contact-card-v3"
                                >
                                    <div style={{
                                        width: '50px', height: '50px', borderRadius: '14px',
                                        background: `${method.color}15`, color: method.color,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        {method.icon}
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '0.2rem' }}>{method.title}</h3>
                                        <p style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{method.value}</p>
                                        <a href={method.link} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: method.color, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, marginTop: '0.3rem' }}>
                                            Connect <ExternalLink size={12} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '3rem' }}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', marginBottom: '1.5rem', textTransform: 'uppercase' }}>Social Profiles</p>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {socialLinks.map((social, idx) => (
                                    <motion.a
                                        key={idx}
                                        href={social.url}
                                        whileHover={{ y: -5, scale: 1.1, backgroundColor: social.color }}
                                        style={{
                                            width: '45px', height: '45px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'all 0.3s ease'
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
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    style={{ position: 'absolute', inset: 0, background: 'var(--bg-primary)', borderRadius: '32px', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}
                                >
                                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                        <Send size={24} color="#fff" />
                                    </div>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Message Sent!</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>I'll get back to you soon.</p>
                                    <button onClick={() => setFormState('idle')} style={{ marginTop: '2rem', padding: '0.8rem 2rem', borderRadius: '50px', background: 'transparent', border: '1px solid var(--primary)', color: '#fff', cursor: 'pointer' }}>Send Another</button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.2rem' }} noValidate>
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
                .contact-card-v3:hover {
                    background: rgba(255, 255, 255, 0.04) !important;
                    transform: translateX(5px);
                }
            ` }} />
        </section>
    )
}

export default Contact
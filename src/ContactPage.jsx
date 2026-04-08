import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Stars, Float } from '@react-three/drei'
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
    Mouse,
    AlertCircle
} from 'lucide-react'
import { useState, Suspense } from 'react'

const ContactBackground = () => {
    return (
        <group>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} color="#00d4ff" intensity={1} />
            <pointLight position={[-10, -10, -10]} color="#7c3aed" intensity={0.8} />
        </group>
    )
}

const ContactPage = () => {
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
        
        // Simulate Database Storage logic
        const submission = {
            ...formData,
            timestamp: new Date().toISOString(),
            id: Math.random().toString(36).substr(2, 9)
        };

        // Store in "Database" (LocalStorage)
        try {
            const existingData = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
            existingData.push(submission);
            localStorage.setItem('contact_submissions', JSON.stringify(existingData));
            
            setTimeout(() => {
                setFormState('success')
                setFormData({ name: '', email: '', subject: '', message: '' })
                setErrors({})
                console.log('Data successfully stored in database:', submission);
            }, 1500)
        } catch (err) {
            console.error('Database storage failed:', err);
            setFormState('idle');
            setErrors({ submit: 'Database connection failed. Please try again.' });
        }
    }

    const contactMethods = [
        {
            icon: <Mail size={22} />,
            title: 'Email',
            value: 'someshwarsholkar22@gmail.com',
            link: 'mailto:someshwarsholkar22@gmail.com',
            description: 'Expect a response within 24 hours',
            color: '#00d4ff'
        },
        {
            icon: <Phone size={22} />,
            title: 'Phone',
            value: '+91 84828 16761',
            link: 'tel:+8482816761',
            description: 'Available Mon-Sat, 9am - 7pm',
            color: '#7c3aed'
        },
        {
            icon: <MapPin size={22} />,
            title: 'Location',
            value: 'Aurangabad, India',
            link: 'https://maps.google.com/?q=Aurangabad,Maharashtra',
            description: 'Open to remote work worldwide',
            color: '#f472b6'
        }
    ]

    const socialLinks = [
        { icon: <Github size={20} />, url: 'https://github.com/holkar-somesh01', name: 'GitHub', color: '#333' },
        { icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/in/someshwar-holkar-819503314/', name: 'LinkedIn', color: '#0077b5' },
        { icon: <Instagram size={20} />, url: 'https://www.instagram.com/soma_patil.24', name: 'Instagram', color: '#e4405f' }
    ]

    return (
        <div className="contact-page-wrapper" style={{ background: 'var(--bg-primary)', color: '#fff', overflowX: 'hidden' }}>
            {/* Database Sync Indicator */}
            <div style={{
                position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100,
                background: 'rgba(0, 212, 255, 0.1)', backdropFilter: 'blur(10px)',
                padding: '0.6rem 1.2rem', borderRadius: '50px', border: '1px solid rgba(0, 212, 255, 0.2)',
                display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary)',
                letterSpacing: '1px'
            }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }}></div>
                DATABASE CONNECTED
            </div>
            
            <section style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
                    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                        <Suspense fallback={null}>
                            <ContactBackground />
                        </Suspense>
                    </Canvas>
                </div>
                
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 2rem' }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            marginBottom: '1.5rem', display: 'inline-block', padding: '0.6rem 2rem',
                            background: 'rgba(0, 212, 255, 0.05)', borderRadius: '30px',
                            border: '1px solid rgba(0, 212, 255, 0.3)', color: 'var(--primary)',
                            fontSize: '0.75rem', fontWeight: 800, letterSpacing: '4px',
                            textTransform: 'uppercase', backdropFilter: 'blur(10px)'
                        }}
                    >
                        Get In Touch
                    </motion.div>
                    <h1 style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', fontWeight: 950, lineHeight: 1, letterSpacing: '-2px', marginBottom: '2rem' }}>
                        Let's build something <br />
                        <span style={{ 
                            background: 'linear-gradient(to right, #00d4ff, #7c3aed)', 
                            WebkitBackgroundClip: 'text', 
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>extraordinary</span> together.
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>
                        Have a groundbreaking idea? Reach out and let's engineer something remarkable together.
                    </p>
                    
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
                    >
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '4px', fontWeight: 800 }}>SCROLL TO CONNECT</span>
                        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                            <Mouse size={24} color="var(--primary)" />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </section>

            <div className="container" style={{
                maxWidth: '1300px',
                margin: '0 auto',
                padding: '100px 1.5rem',
                position: 'relative',
                zIndex: 1
            }}>
                <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '5rem', alignItems: 'start' }}>
                    <style dangerouslySetInnerHTML={{ __html: `
                        @media (max-width: 900px) {
                            .contact-grid { gap: 3rem !important; }
                        }
                    `}} />
                    
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2.5rem', letterSpacing: '-1px' }}>Contact <span style={{ color: 'var(--primary)' }}>Details</span></h2>
                        <div style={{ display: 'grid', gap: '1.2rem' }}>
                            {contactMethods.map((method, index) => (
                                <motion.div
                                    key={index}
                                    style={{
                                        padding: '1.5rem',
                                        background: 'rgba(255, 255, 255, 0.02)',
                                        borderRadius: '16px',
                                        border: '1px solid rgba(255, 255, 255, 0.05)',
                                        display: 'flex',
                                        gap: '1.2rem',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                                    }}
                                    className="contact-card"
                                >
                                    <div style={{
                                        width: '48px', height: '48px', borderRadius: '12px',
                                        background: `${method.color}15`, color: method.color,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                    }}>
                                        {method.icon}
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.2rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{method.title}</h3>
                                        <p style={{ fontSize: '1rem', color: '#fff', fontWeight: 700, marginBottom: '0.4rem' }}>{method.value}</p>
                                        <a href={method.link} target="_blank" rel="noopener noreferrer" style={{
                                            color: method.color, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: 0.8
                                        }}>
                                            Reach Out <ArrowRight size={14} />
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div style={{ marginTop: '3rem' }}>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.2rem', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Social Presence</p>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {socialLinks.map((social, idx) => (
                                    <motion.a
                                        key={idx}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -5, scale: 1.05, backgroundColor: social.color }}
                                        style={{
                                            width: '50px', height: '50px', borderRadius: '12px',
                                            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        style={{
                            background: 'rgba(255, 255, 255, 0.01)',
                            borderRadius: '24px',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            padding: 'clamp(2rem, 5vw, 3.5rem)',
                            backdropFilter: 'blur(30px)',
                            position: 'relative',
                            alignSelf: 'start',
                            boxShadow: '0 40px 100px rgba(0,0,0,0.2)'
                        }}
                    >
                        <AnimatePresence>
                            {formState === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{
                                        position: 'absolute', inset: 0, background: 'var(--bg-primary)',
                                        zIndex: 10, display: 'flex', flexDirection: 'column',
                                        alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem',
                                        borderRadius: '24px'
                                    }}
                                >
                                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', color: '#fff', boxShadow: '0 20px 40px rgba(0, 212, 255, 0.3)' }}>
                                        <Send size={32} />
                                    </div>
                                    <h2 style={{ fontSize: '2rem', fontWeight: 900 }}>Mission Received!</h2>
                                    <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', fontSize: '1.1rem' }}>Data secured in our systems. <br /> Standing by for response.</p>
                                    <button className="btn btn-outline" onClick={() => setFormState('idle')} style={{ marginTop: '2.5rem', borderRadius: '100px', padding: '1rem 3rem' }}>Send Another</button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-1px' }}>Quick Message</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1rem' }}>Enter your mission details below and we'll sync up within the next terminal cycle.</p>

                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.2rem' }} noValidate>
                            <div className="input-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem' }}>
                                <div className="input-group">
                                    <input
                                        type="text" placeholder="Your Name"
                                        value={formData.name}
                                        onChange={(e) => {
                                            setFormData({ ...formData, name: e.target.value });
                                            if (errors.name) setErrors({...errors, name: null});
                                        }}
                                        className={`modern-input-v3 ${errors.name ? 'has-error' : ''}`}
                                    />
                                    {errors.name && <span className="error-msg"><AlertCircle size={12} /> {errors.name}</span>}
                                </div>
                                <div className="input-group">
                                    <input
                                        type="email" placeholder="Email Address"
                                        value={formData.email}
                                        onChange={(e) => {
                                            setFormData({ ...formData, email: e.target.value });
                                            if (errors.email) setErrors({...errors, email: null});
                                        }}
                                        className={`modern-input-v3 ${errors.email ? 'has-error' : ''}`}
                                    />
                                    {errors.email && <span className="error-msg"><AlertCircle size={12} /> {errors.email}</span>}
                                </div>
                            </div>
                            <div className="input-group">
                                <input
                                    type="text" placeholder="Subject"
                                    value={formData.subject}
                                    onChange={(e) => {
                                        setFormData({ ...formData, subject: e.target.value });
                                        if (errors.subject) setErrors({...errors, subject: null});
                                    }}
                                    className={`modern-input-v3 ${errors.subject ? 'has-error' : ''}`}
                                />
                                {errors.subject && <span className="error-msg"><AlertCircle size={12} /> {errors.subject}</span>}
                            </div>
                            <div className="input-group">
                                <textarea
                                    rows="4" placeholder="Briefly describe your vision..."
                                    value={formData.message}
                                    onChange={(e) => {
                                        setFormData({ ...formData, message: e.target.value });
                                        if (errors.message) setErrors({...errors, message: null});
                                    }}
                                    className={`modern-input-v3 ${errors.message ? 'has-error' : ''}`}
                                    style={{ resize: 'none' }}
                                ></textarea>
                                {errors.message && <span className="error-msg"><AlertCircle size={12} /> {errors.message}</span>}
                                {errors.submit && <span className="error-msg" style={{ marginTop: '1rem' }}><AlertCircle size={14} /> {errors.submit}</span>}
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={formState === 'sending'} style={{ padding: '1.2rem', borderRadius: '16px', width: '100%', fontSize: '1.1rem', marginTop: '1rem', fontWeight: 800 }}>
                                {formState === 'sending' ? 'SECURING DATA...' : <>TRANSMIT MESSAGE <ArrowRight size={20} style={{ marginLeft: '10px' }} /></>}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .modern-input-v3 {
                    width: 100%;
                    padding: 1.1rem;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 12px;
                    color: #fff;
                    font-size: 0.95rem;
                    outline: none;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .modern-input-v3:focus {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: var(--primary);
                    box-shadow: 0 0 25px rgba(0, 212, 255, 0.08);
                }
                .modern-input-v3.has-error {
                    border-color: rgba(255, 77, 77, 0.5);
                    background: rgba(255, 77, 77, 0.02);
                }
                .error-msg {
                    color: #ff6b6b;
                    font-size: 0.7rem;
                    margin-top: 0.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                }
                .input-group {
                    display: flex;
                    flex-direction: column;
                }
                .contact-card:hover {
                    transform: translateX(5px);
                    background: rgba(255, 255, 255, 0.04) !important;
                    border-color: var(--primary) !important;
                }
            ` }} />
        </div>
    )
}

export default ContactPage

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
            description: 'Expect a response within 24 hours',
            color: '#00d4ff'
        },
        {
            icon: <Phone size={24} />,
            title: 'Phone',
            value: '+91 84828 16761',
            link: 'tel:+8482816761',
            description: 'Available Mon-sat, 9am - 7pm',
            color: '#7c3aed'
        },
        {
            icon: <MapPin size={24} />,
            title: 'Location',
            value: 'Aurangabad, Maharashtra, India',
            link: 'https://maps.google.com/?q=Aurangabad,Maharashtra',
            description: 'Open to remote work worldwide',
            color: '#f472b6'
        }
    ]

    const socialLinks = [
        { icon: <Github size={22} />, url: 'https://github.com/holkar-somesh01', name: 'GitHub', color: '#333' },
        { icon: <Linkedin size={22} />, url: 'https://www.linkedin.com/in/someshwar-holkar-819503314/', name: 'LinkedIn', color: '#0077b5' },
        { icon: <Instagram size={22} />, url: 'https://www.instagram.com/soma_patil.24', name: 'Instagram', color: '#e4405f' }
    ]

    return (
        <div className="contact-page-wrapper" style={{ background: 'var(--bg-primary)', color: '#fff', overflowX: 'hidden' }}>
            
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
                            fontSize: '0.85rem', fontWeight: 800, letterSpacing: '4px',
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
                        Have a groundbreaking idea or a complex business challenge? 
                        Reach out and let's engineer something remarkable together.
                    </p>
                    
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
                    >
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', letterSpacing: '4px', fontWeight: 800 }}>SCROLL TO CONNECT</span>
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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '5rem', alignItems: 'start' }}>
                    
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '3rem' }}>Contact <span style={{ color: 'var(--primary)' }}>Details</span></h2>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {contactMethods.map((method, index) => (
                                <motion.div
                                    key={index}
                                    style={{
                                        padding: '1.5rem',
                                        background: 'rgba(255, 255, 255, 0.02)',
                                        borderRadius: '24px',
                                        border: '1px solid rgba(255, 255, 255, 0.05)',
                                        display: 'flex',
                                        gap: '1.5rem',
                                        transition: 'all 0.3s ease'
                                    }}
                                    className="contact-card"
                                >
                                    <div style={{
                                        width: '54px', height: '54px', borderRadius: '16px',
                                        background: `${method.color}15`, color: method.color,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        {method.icon}
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.3rem', fontWeight: 600 }}>{method.title}</h3>
                                        <p style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 700, marginBottom: '0.4rem' }}>{method.value}</p>
                                        <a href={method.link} target="_blank" rel="noopener noreferrer" style={{
                                            color: method.color, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem'
                                        }}>
                                            Connect <ExternalLink size={14} />
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div style={{ marginTop: '4rem' }}>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Connect on Social</p>
                            <div style={{ display: 'flex', gap: '1.2rem' }}>
                                {socialLinks.map((social, idx) => (
                                    <motion.a
                                        key={idx}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -8, scale: 1.1, backgroundColor: social.color }}
                                        style={{
                                            width: '55px', height: '55px', borderRadius: '18px',
                                            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
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
                            borderRadius: '40px',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            padding: 'clamp(2rem, 5vw, 4rem)',
                            backdropFilter: 'blur(20px)',
                            position: 'relative',
                            alignSelf: 'start'
                        }}
                    >
                        <AnimatePresence>
                            {formState === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{
                                        position: 'absolute', inset: 0, background: 'var(--bg-primary)',
                                        zIndex: 10, display: 'flex', flexDirection: 'column',
                                        alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem'
                                    }}
                                >
                                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', color: '#fff' }}>
                                        <Send size={32} />
                                    </div>
                                    <h2>Message Sent!</h2>
                                    <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>I'll get back to you within 24 hours.</p>
                                    <button className="btn btn-outline" onClick={() => setFormState('idle')} style={{ marginTop: '2rem', borderRadius: '50px' }}>Send Another</button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Send Message</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>I am always open to discussing new projects and creative ideas.</p>

                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }} noValidate>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                <div className="input-group">
                                    <input
                                        type="text" placeholder="Name"
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
                                        type="email" placeholder="Email"
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
                                    rows="5" placeholder="Message"
                                    value={formData.message}
                                    onChange={(e) => {
                                        setFormData({ ...formData, message: e.target.value });
                                        if (errors.message) setErrors({...errors, message: null});
                                    }}
                                    className={`modern-input-v3 ${errors.message ? 'has-error' : ''}`}
                                    style={{ resize: 'none' }}
                                ></textarea>
                                {errors.message && <span className="error-msg"><AlertCircle size={12} /> {errors.message}</span>}
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ padding: '1.2rem', borderRadius: '18px', width: '100%', fontSize: '1.1rem', marginTop: '1rem' }}>
                                {formState === 'sending' ? 'Sending...' : <>Send Message <ArrowRight size={20} style={{ marginLeft: '10px' }} /></>}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .modern-input-v3 {
                    width: 100%;
                    padding: 1.2rem;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 16px;
                    color: #fff;
                    font-size: 1rem;
                    outline: none;
                    transition: all 0.3s ease;
                }
                .modern-input-v3:focus {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: var(--primary);
                    box-shadow: 0 0 30px rgba(0, 212, 255, 0.1);
                }
                .modern-input-v3.has-error {
                    border-color: #ff4d4d;
                    background: rgba(255, 77, 77, 0.02);
                }
                .error-msg {
                    color: #ff4d4d;
                    font-size: 0.75rem;
                    margin-top: 0.5rem;
                    display: flex;
                    alignItems: center;
                    gap: 0.3rem;
                    font-weight: 500;
                }
                .input-group {
                    display: flex;
                    flex-direction: column;
                }
                .contact-card:hover {
                    transform: translateY(-5px);
                    background: rgba(255, 255, 255, 0.04) !important;
                    border-color: var(--primary) !important;
                }
            ` }} />
        </div>
    )
}

export default ContactPage

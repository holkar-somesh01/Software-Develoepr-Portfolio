import { useParams, Link } from 'react-router-dom'
import { useEffect, useRef, Suspense, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Stars, MeshDistortMaterial, Sphere } from '@react-three/drei'
import { 
    Check, ArrowLeft, Zap, Smartphone, Globe, Database, Shield, Rocket, 
    Cpu, Briefcase, BarChart3, Users2, HelpCircle, MessageSquare, 
    ChevronDown, CreditCard, Star, Crown, PackageSearch, Wrench, Layout, 
    Search, Server, Settings, FileCode, ClipboardList
} from 'lucide-react'
import SEO from './components/SEO'

// Advanced 3D Component with deeper visual impact
const AnimatedShape = ({ color }) => (
    <Float speed={3} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[1.2, 64, 64]} scale={2.0}>
            <MeshDistortMaterial
                color={color}
                speed={1.5}
                distort={0.4}
                radius={1}
                wireframe
                opacity={0.15}
                transparent
                emissive={color}
                emissiveIntensity={0.2}
            />
        </Sphere>
    </Float>
)

const DetailScene = ({ color }) => (
    <>
        <Stars radius={100} depth={50} count={6000} factor={6} saturation={0} fade speed={2} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color={color} intensity={2} />
        <AnimatedShape color={color} />
        <OrbitControls enableZoom={false} />
    </>
)

const ServiceDetailPage = () => {
    const { id } = useParams()
    const [activeFaq, setActiveFaq] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const serviceDetails = {
        'static-website': {
            title: 'Static Website Development',
            icon: 'https://img.icons8.com/fluency/144/browser.png',
            color: '#00d4ff',
            tagline: 'High-performance, ultra-secure, and SEO-dominant.',
            description: 'Static sites are no longer simple; with modern Headless architectures, they offer sub-second load times and unmatched reliability. We leverage advanced generation frameworks to deliver websites that not only look premium but perform at enterprise levels.',
            benefits: [
                'Incredible Speed: Pre-rendered pages load instantly on any device.',
                'Security Shield: No server-side vulnerabilities or DB injections.',
                'SEO King: Faster load times mean higher positions on Google.',
                'Zero Downtime: CDN-distributed content stays up under heavy traffic.',
                'Scalable for Viral Growth: Handle 100k+ users without slowing down.',
                'Minimal Maintenance: Set it and forget it. No security patches needed.'
            ],
            process: [
                'Strategy & Research: Understanding your target audience and competitors.',
                'UX/UI Design: Crafting high-fidelity, pixel-perfect visual mockups.',
                'Frontend Engineering: Building with React/Next.js for ultimate efficiency.',
                'Content Integration: Connecting with a Headless CMS of your choice.',
                'SEO & Optimization: Maximizing Core Web Vitals for search dominance.',
                'Global Launch: Deploying on high-availability CDN infrastructures.'
            ],
            techStack: ['React/Next.js (SSG)', 'Astro', 'Three.js', 'Vite', 'Framer Motion', 'TailwindCSS'],
            deliverables: [
                'Source Code (Clean & Documented)',
                'SEO Implementation Strategy',
                'Performance Audit Report',
                'Hosting Setup & CDN Config',
                'Basic Training for CMS Updates',
                'Post-Launch Technical Review'
            ],
            requirements: [
                'Brand Assets (Logo, Colors)',
                'Initial Design Preferences',
                'Sitemap and Page Content',
                'Domain Access (if existing)'
            ],
            pricing: [
                { name: 'Basic Static', price: '4,999', icon: <PackageSearch />, features: ['5 Pages', 'Responsive Design', 'Basic SEO', '1 Month Support', 'Hosting Setup', 'Contact Form'] },
                { name: 'Business Static', price: '9,999', icon: <Star />, popular: true, features: ['Up to 15 Pages', 'Custom Animated UI', 'Advanced SEO', '1 Year Support', 'Speed Optimization', 'Blog Integration', 'PWA Support'] },
                { name: 'Elite Brand', price: '19,999+', icon: <Crown />, features: ['Unlimited Pages', 'Premium Animations', 'Headless CMS Setup', '1-year Support', 'Priority Integration', 'Advanced Analytics', 'Copywriting Support'] }
            ],
            faqs: [
                { q: 'What is a "Static" website exactly?', a: 'A static website consists of pre-built pages that are served directly to the user. It doesn\'t require database processing on each request, making it incredibly fast and safe.' },
                { q: 'Can I add a blog to a static site?', a: 'Definitely. We use Headless CMS like Sanity or Strapi, which allows you to manage content like a regular dashboard while keeping the frontend static and fast.' },
                { q: 'Is hosting expensive for static sites?', a: 'Actually, it\'s often free or extremely cheap (under ₹500/mo) because they require minimal server resources compared to traditional sites.' },
                { q: 'How long does a typical build take?', a: 'Small sites take about a week, while larger multi-page brand sites take 2–3 weeks of focused engineering.' }
            ]
        },
        'dynamic-website': {
            title: 'Dynamic Website Development',
            icon: 'https://img.icons8.com/fluency/144/cloud-database-settings.png',
            color: '#7c3aed',
            tagline: 'Custom business logic and real-time interaction.',
            description: 'Transition beyond the static. We build full-stack web applications that adapt to your users. From centralized admin dashboards to automated customer pipelines, our dynamic solutions create real business value through automation and intelligence.',
            benefits: [
                'Content Management: Real-time updates via custom admin panels.',
                'User Intelligence: Personalized experiences tailored to user behavior.',
                'Database Integrity: Secure and optimized data structures.',
                'API-First Approach: Easily connect with external tools and third-party apps.',
                'E-commerce Capabilities: Fully customizable checkout and inventory paths.',
                'High Interactivity: Everything from real-time chat to advanced filters.'
            ],
            process: [
                'System Architecture: Designing the logic flow and database relationships.',
                'Backend Foundation: Developing secure APIs, Auth, and Storage.',
                'Frontend Orchestration: Building a fast, interactive React dashboard.',
                'Feature Implementation: Coding business-specific modules (Chat, Payments).',
                'Rigorous Security Testing: Protecting against SQLi, XSS, and CSRF.',
                'Performance Hardening: Optimizing database queries for speed.'
            ],
            techStack: ['MERN Stack', 'Node.js', 'Express.js', 'PostgreSQL/MySQL', 'Redis', 'Firebase'],
            deliverables: [
                'Full Stack Source Code',
                'Advanced Admin Management Panel',
                'Automated Database Backups',
                'API Documentation (Swagger)',
                'Scalability & Security Roadmap',
                'System Maintenance Guide'
            ],
            requirements: [
                'List of Required Features',
                'Database Schema Requirements',
                'Third-party API Keys (if needed)',
                'Business Workflow Details'
            ],
            pricing: [
                { name: 'Standard Full-Stack', price: '14,999', icon: <PackageSearch />, features: ['User Auth', 'Admin Dashboard', 'Basic API', '3 Months Support', 'Standard DB', 'Responsive UI'] },
                { name: 'Corporate Dynamic', price: '24,999', icon: <Star />, popular: true, features: ['E-commerce', 'Payment Gateway', 'Real-time Chat', '1 Year Support', 'Advanced Analytics', 'Cloud Scaling', 'Inventory Sync'] },
                { name: 'Custom Enterprise', price: '44,999+', icon: <Crown />, features: ['Full ERP/CRM Integration', 'Inventory Management', 'Third-party Sync', 'Priority Support', 'Full System Audit', 'High-Load Ready', 'Dedicated Support Manager'] }
            ],
            faqs: [
                { q: 'What makes a website "Dynamic"?', a: 'Dynamic sites use a database to store and retrieve info. Every user gets a personalized experience based on their data, like Amazon, Facebook, or a custom CMS.' },
                { q: 'Is it hard to manage?', a: 'Not at all. We build a custom, user-friendly Admin Panel so you can manage your data, users, and orders without touching a single line of code.' },
                { q: 'Can you migrate my existing data?', a: 'Yes! We specialize in data migration from SQL, Excel, or other platforms into your new modern system.' },
                { q: 'How do you handle security?', a: 'We use JWT for sessions, bcrypt for passwords, and industrial-standard encryption for all data transit.' }
            ]
        },
        'mobile-app': {
            title: 'Mobile App Development',
            icon: 'https://img.icons8.com/fluency/144/smartphone.png',
            color: '#f472b6',
            tagline: 'Next-gen apps for iOS and Android platforms.',
            description: 'Bring your brand to every smartphone with cross-platform excellence. We help you ship faster and perform natively with unified codebases that feel at home on both iOS and Android. Smooth animations and intuitive UX are our top priorities.',
            benefits: [
                'One Codebase: Maintain one version for both major mobile platforms.',
                'Native Performance: 60FPS fluid animations and interactions.',
                'User Access: Direct notifications and in-app communications.',
                'Offline Resilience: Users can interact even without a network connection.',
                'Hardware Access: Full integration with camera, GPS, and sensors.',
                'Modern Standards: Compliance with App Store and Google Play guidelines.'
            ],
            process: [
                'User Journey Mapping: Planning every tap and transition.',
                'Interactive Prototyping: Testing the look and feel on real devices.',
                'Mobile-First Dev: Coding with React Native or Native bridges.',
                'API & Data Sync: Connecting to your backend infrastructure.',
                'Beta Testing: Releasing to TestFlight and Google Internal Testing.',
                'App Store Launch: Handling the submission and review process.'
            ],
            techStack: ['React Native', 'Expo', 'Flutter', 'Redux/Context API', 'Axios', 'Firebase/Supabase'],
            deliverables: [
                'Ready-to-Ship APK & IPA Files',
                'UX Audit & Mobile Strategy Document',
                'App Store Optimization (ASO) Plan',
                'Push Notification Strategy',
                'Maintenance and Update Guide'
            ],
            requirements: [
                'App Idea & Core Purpose',
                'Target Platforms (iOS/Android)',
                'Existing API access (if any)',
                'Branding Guidelines'
            ],
            pricing: [
                { name: 'Basic App', price: '14,999', icon: <PackageSearch />, features: ['Cross-platform (Both)', 'UI/UX Design', 'API Integration', '3 Months Support', 'Release Files', 'Search/Filter'] },
                { name: 'Advanced App', price: '29,999', icon: <Star />, popular: true, features: ['User Profiles', 'Push Notifications', 'Database Sync', '1 Year Support', 'Store Submission', 'Maps/GPS Integration', 'Payment Flows'] },
                { name: 'Ultimate Solution', price: '54,999+', icon: <Crown />, features: ['Advanced AI/Chat', 'Full Offline Mode', 'Custom Backend', '1 Year Support', 'Biometric Security', 'Ongoing Maintenance', 'Multilingual Support'] }
            ],
            faqs: [
                { q: 'Will my app work on both iPhone and Android?', a: 'Yes! We use cross-platform technologies like React Native that ensure 100% native functionality on both platforms simultaneously.' },
                { q: 'Who owns the code?', a: 'You do. Once the final payment is cleared, the full source code and rights are handed over to you.' },
                { q: 'How do you handle updates?', a: 'We use OTA (Over-the-Air) updates when possible, so you don\'t have to wait for app store reviews for small bug fixes or content changes.' },
                { q: 'Can you help with App Store rejection?', a: 'Absolutely. We follow all Apple and Google guidelines and provide guidance if any review issues arise during submission.' }
            ]
        }
    }

    const detail = serviceDetails[id] || serviceDetails['static-website']

    return (
        <div className="service-detail-page" style={{ backgroundColor: 'var(--bg-primary)', color: 'white', minHeight: '100vh', overflowX: 'hidden' }}>
            <SEO 
                title={detail.title} 
                description={detail.tagline}
                url={`/services/${id}`}
            />
            {/* Immersive Hero Section */}
            <section className="detail-hero" style={{ 
                height: '100vh', 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center', 
                position: 'relative',
                overflow: 'hidden',
                padding: '100px 2rem'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                    <Canvas camera={{ position: [0, 0, 8] }}>
                        <Suspense fallback={null}>
                            <DetailScene color={detail.color} />
                        </Suspense>
                    </Canvas>
                </div>
                <motion.div
                    className="detail-hero-content"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '1200px', width: '100%' }}
                >
                    <motion.div 
                        initial={{ scale: 0, rotate: -45 }} 
                        animate={{ scale: 1, rotate: 0 }} 
                        transition={{ type: 'spring', damping: 15, delay: 0.3 }}
                        style={{ 
                            background: `${detail.color}08`, 
                            padding: '1.5rem', 
                            borderRadius: '20px', 
                            display: 'inline-block', 
                            marginBottom: '3rem', 
                            border: `1px solid ${detail.color}20`,
                            backdropFilter: 'blur(10px)',
                            boxShadow: `0 0 40px ${detail.color}15`
                        }}
                    >
                        <img src={detail.icon} alt={detail.title} style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                    </motion.div>
                    <h1 style={{ 
                        fontSize: 'clamp(2.5rem, 9vw, 6rem)', 
                        fontWeight: 950, 
                        marginBottom: '2rem', 
                        lineHeight: 1.05, 
                        background: `linear-gradient(to bottom, #fff, ${detail.color})`,
                        WebkitBackgroundClip: 'text', 
                        WebkitTextFillColor: 'transparent', 
                        letterSpacing: '-3px'
                    }}>
                        {detail.title}
                    </h1>
                    <p style={{ 
                        fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', 
                        color: 'rgba(255,255,255,0.7)', 
                        maxWidth: '800px', 
                        margin: '0 auto', 
                        fontWeight: 400,
                        lineHeight: 1.6 
                    }}>
                        {detail.tagline}
                    </p>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
                >
                    <span style={{ fontSize: '0.7rem', letterSpacing: '4px', opacity: 0.5, fontWeight: 800 }}>SCROLL TO DETAILS</span>
                    <motion.div 
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <ChevronDown size={24} color={detail.color} />
                    </motion.div>
                </motion.div>
            </section>

            {/* Core Strategy Section */}
            <section style={{ padding: 'clamp(4rem, 10vw, 8rem) 1.5rem', borderTop: '1px solid var(--card-border)', background: 'linear-gradient(to bottom, transparent, rgba(124, 58, 237, 0.05))' }}>
                <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: 'clamp(3rem, 8vw, 6rem)', alignItems: 'center' }}>
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: detail.color, marginBottom: '2rem', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '4px' }}>
                            <Zap size={18} fill={detail.color}/> Execution Power
                        </div>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '2.5rem', lineHeight: 1.1, letterSpacing: '-1px' }}>Building for the <br /> <span style={{ color: detail.color }}>Next Generation</span></h2>
                        <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '3.5rem' }}>
                            {detail.description}
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem' }}>
                            <div style={{ borderLeft: `3px solid ${detail.color}`, paddingLeft: '1.5rem' }}>
                                <h4 style={{ color: '#fff', marginBottom: '0.5rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}><BarChart3 size={20} color={detail.color}/> Speed</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Score 98+ Tested</p>
                            </div>
                            <div style={{ borderLeft: `3px solid ${detail.color}`, paddingLeft: '1.5rem' }}>
                                <h4 style={{ color: '#fff', marginBottom: '0.5rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}><Shield size={20} color={detail.color}/> Security</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>FIPS Compliant</p>
                            </div>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }} 
                        whileInView={{ opacity: 1, scale: 1 }} 
                        viewport={{ once: true }}
                        className="deliverables-card"
                        style={{ background: 'rgba(255,255,255,0.015)', borderRadius: '16px', border: `1px solid ${detail.color}15`, backdropFilter: 'blur(30px)', position: 'relative' }}
                    >
                        <div className="deliverables-badge" style={{ position: 'absolute', top: '-0.8rem', background: detail.color, color: '#fff', padding: '0.4rem 1.5rem', borderRadius: '50px', fontWeight: 800, fontSize: '0.7rem', letterSpacing: '1px' }}>DELIVERABLES</div>
                        <h3 className="deliverables-title" style={{ fontSize: '1.8rem', marginBottom: '2.5rem', fontWeight: 800 }}>Success Package</h3>
                        <ul className="deliverables-list" style={{ listStyle: 'none', padding: 0 }}>
                            {detail.deliverables.map((item, i) => (
                                <li key={i} style={{ display: 'flex', gap: '1.2rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                                    <div style={{ background: `${detail.color}15`, padding: '0.5rem', borderRadius: '50%', color: detail.color, flexShrink: 0 }}><Check size={16} /></div>
                                    <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* Enhanced Pricing Packages in INR */}
            <section style={{ padding: 'clamp(5rem, 10vw, 10rem) 1.5rem', background: 'rgba(255,255,255,0.005)', borderTop: '1px solid var(--card-border)' }}>
                <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 'clamp(4rem, 8vw, 7rem)' }}>
                        <div style={{ color: detail.color, marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}><CreditCard size={32}/></div>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', marginBottom: '1.5rem', fontWeight: 900, letterSpacing: '-2px' }}>Investment <span style={{ color: detail.color }}>Packages</span></h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>Premium engineering focused on your ROI. All prices are starting values in INR.</p>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '2rem' }}>
                        {detail.pricing.map((plan, i) => (
                            <motion.div 
                                key={plan.name}
                                whileHover={{ y: -10, borderColor: detail.color }}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                style={{ 
                                    background: plan.popular ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)', 
                                    padding: 'clamp(2rem, 5vw, 4rem) 2.5rem', borderRadius: '16px', 
                                    border: plan.popular ? `2px solid ${detail.color}` : '1px solid var(--card-border)',
                                    position: 'relative', overflow: 'hidden',
                                    display: 'flex', flexDirection: 'column'
                                }}
                            >
                                {plan.popular && <div style={{ position: 'absolute', top: '1.2rem', right: '-3rem', background: detail.color, color: '#fff', padding: '0.4rem 4rem', transform: 'rotate(45deg)', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '1px' }}>BEST VALUE</div>}
                                <div style={{ color: detail.color, marginBottom: '1.8rem', background: `${detail.color}15`, width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{plan.icon}</div>
                                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.8rem', fontWeight: 800 }}>{plan.name}</h3>
                                <div style={{ marginBottom: '2.5rem' }}>
                                    <span style={{ fontSize: '3rem', fontWeight: 950, color: '#fff' }}>₹{plan.price}</span>
                                    <span style={{ color: 'rgba(255,255,255,0.4)', marginLeft: '0.8rem', fontSize: '0.9rem', fontWeight: 600 }}>Starting</span>
                                </div>
                                <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '2.5rem' }}></div>
                                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '3.5rem', flex: 1 }}>
                                    {plan.features.map((feat, index) => (
                                        <li key={index} style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', alignItems: 'flex-start' }}>
                                            <Check size={16} color={detail.color} style={{ marginTop: '2px', flexShrink: 0 }}/> {feat}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/#contact" className={`plan-cta ${plan.popular ? 'primary' : 'secondary'}`} style={{ 
                                    width: '100%', padding: '1.2rem', fontSize: '1rem', textAlign: 'center', display: 'block', borderRadius: '12px',
                                    background: plan.popular ? detail.color : 'rgba(255,255,255,0.05)',
                                    color: '#fff', textDecoration: 'none', fontWeight: 800,
                                    border: plan.popular ? 'none' : '1px solid rgba(255,255,255,0.1)'
                                }}>
                                    Launch Project
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Preparation Roadmap & Requirements */}
            <section style={{ padding: '10rem 2rem', background: 'linear-gradient(to top, var(--bg-primary), rgba(124, 58, 237, 0.03))' }}>
                <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '8rem' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: detail.color, marginBottom: '2.5rem' }}><ClipboardList size={30}/> <h2 style={{ fontSize: '2.5rem', margin: 0 }}>Built for <span style={{ color: detail.color }}>Impact</span></h2></div>
                            {detail.process.map((step, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    style={{ display: 'flex', gap: '2.5rem', marginBottom: '4rem', position: 'relative' }}
                                >
                                    {i !== detail.process.length - 1 && <div style={{ position: 'absolute', top: '45px', left: '21px', bottom: '-40px', width: '2px', background: `linear-gradient(to bottom, ${detail.color}, transparent)` }}></div>}
                                    <div style={{ 
                                        width: '45px', height: '45px', borderRadius: '12px', background: detail.color, 
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', 
                                        fontWeight: 900, flexShrink: 0, zIndex: 1, fontSize: '1.1rem'
                                    }}>
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '1.4rem', marginBottom: '0.8rem', color: '#fff', fontWeight: 700 }}>{step.split(':')[0]}</h4>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>{step.split(':')[1] || ''}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div>
                            {/* Requirements Card */}
                            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '4rem', borderRadius: '24px', border: '1px solid var(--card-border)', marginBottom: '4rem' }}>
                                <h2 style={{ fontSize: '2.2rem', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}><Settings color={detail.color} size={30}/> Prerequisites</h2>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.05rem' }}>To ensure a lightning-fast delivery, we ideally need the following from your side:</p>
                                {detail.requirements.map((req, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '1.2rem', marginBottom: '1.5rem', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: '12px' }}>
                                        <Check size={18} color={detail.color}/>
                                        <span style={{ fontSize: '1.05rem', fontWeight: 600 }}>{req}</span>
                                    </div>
                                ))}
                            </div>

                            {/* FAQ Section */}
                            <div style={{ background: 'rgba(0, 212, 255, 0.02)', padding: '4rem', borderRadius: '24px', border: `1px solid ${detail.color}11` }}>
                                <h2 style={{ fontSize: '2.2rem', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}><HelpCircle color={detail.color} size={30}/> Client <span style={{ color: detail.color }}>Faqs</span></h2>
                                {detail.faqs.map((faq, i) => (
                                    <div key={i} style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.5rem' }}>
                                        <button 
                                            onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                            style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', color: '#fff', fontSize: '1.15rem', fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                                        >
                                            {faq.q}
                                            <motion.div animate={{ rotate: activeFaq === i ? 180 : 0 }}>
                                                <ChevronDown size={20} color={detail.color}/>
                                            </motion.div>
                                        </button>
                                        <AnimatePresence>
                                            {activeFaq === i && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    style={{ overflow: 'hidden' }}
                                                >
                                                    <p style={{ marginTop: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem' }}>{faq.a}</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Strategic CTA Footer */}
            <section style={{ padding: '6rem 2rem 10rem', textAlign: 'center' }}>
               <motion.div 
                 whileHover={{ scale: 1.01 }}
                 style={{ 
                   maxWidth: '1200px', margin: '0 auto', background: `linear-gradient(135deg, ${detail.color}11, transparent)`, 
                   padding: '8rem 4rem', borderRadius: '16px', border: `1px solid ${detail.color}22`,
                   boxShadow: `0 35px 100px ${detail.color}10`, position: 'relative', overflow: 'hidden'
                 }}
               >
                 <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', background: detail.color, filter: 'blur(180px)', opacity: 0.08, borderRadius: '50%' }}></div>
                 <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '2.5rem', lineHeight: 1, fontWeight: 900 }}>Ready to build something <br /><span style={{ color: detail.color }}>Exceptional</span>?</h2>
                 <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', marginBottom: '4rem', maxWidth: '750px', margin: '0 auto 4rem', lineHeight: 1.8, fontWeight: 500 }}>
                    Stop browsing. Start building. Get a partner who scales your vision with industrial-grade precision and breathtaking design.
                 </p>
                 <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/#contact" className="btn btn-primary" style={{ padding: '1.6rem 4.5rem', fontSize: '1.2rem', borderRadius: '16px', boxShadow: `0 12px 35px ${detail.color}25` }}>
                        Start Project Now <MessageSquare size={22} style={{ marginLeft: '1rem' }} />
                    </Link>
                    <Link to="/services" className="btn btn-outline" style={{ border: `2px solid ${detail.color}`, color: detail.color, padding: '1.6rem 4.5rem', fontSize: '1.2rem', borderRadius: '16px' }}>
                        Browse Services
                    </Link>
                 </div>
               </motion.div>
            </section>
        </div>
    )
}

export default ServiceDetailPage

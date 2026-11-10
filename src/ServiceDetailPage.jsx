import { useParams, Link } from 'react-router-dom'
import { useEffect, Suspense, useState, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Check, ArrowLeft, Zap, Smartphone, Globe, Database, Shield, Rocket, 
    Cpu, BarChart3, HelpCircle, MessageSquare, 
    ChevronDown, CreditCard, Star, Crown, PackageSearch, Settings, 
    ClipboardList, Layers, Lock, ArrowUpRight, CheckCircle2, Clock
} from 'lucide-react'
import SEO from './components/SEO'

const ServiceDetailCanvas = lazy(() => import('./components/ServiceDetailCanvas'))

const ServiceDetailPage = () => {
    const { id } = useParams()
    const [activeFaq, setActiveFaq] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    const serviceDetails = {
        'static-website': {
            title: 'Static Website Development',
            icon: 'https://img.icons8.com/fluency/144/browser.png',
            color: '#00d4ff',
            tagline: 'High-performance, ultra-secure, and SEO-dominant.',
            categoryTag: 'MODERN JAMSTACK & SSG ARCHITECTURE',
            description: 'Static sites are no longer simple; with modern Headless architectures, they offer sub-second load times and unmatched reliability. We leverage advanced generation frameworks to deliver websites that not only look premium but perform at enterprise levels.',
            kpis: [
                { title: 'SPEED', value: 'Sub-Second Load (99+ PageSpeed)', icon: BarChart3 },
                { title: 'SECURITY', value: 'Zero Database Vulnerabilities', icon: Shield },
                { title: 'SEO DOMINANCE', value: '100% Core Web Vitals Pass', icon: Rocket },
                { title: 'AVAILABILITY', value: 'Global Edge CDN Delivery', icon: Globe }
            ],
            benefits: [
                { title: 'Incredible Speed', desc: 'Pre-rendered pages load instantly on any mobile or desktop device.', icon: Zap },
                { title: 'Security Shield', desc: 'No server-side database vulnerabilities, SQL injections, or breach vectors.', icon: Shield },
                { title: 'SEO Dominance', desc: 'Lightning-fast load times translate to higher rankings and lower bounce rates.', icon: Rocket },
                { title: 'Zero Downtime', desc: 'CDN-distributed content stays completely accessible under viral traffic surges.', icon: Globe },
                { title: 'Infinite Scaling', desc: 'Effortlessly serve hundreds of thousands of concurrent users with zero lag.', icon: Layers },
                { title: 'Minimal Maintenance', desc: 'Set it and forget it with automated CI/CD deployments and no server patches.', icon: Settings }
            ],
            process: [
                'Strategy & Research: Understanding your target audience and competitors.',
                'UX/UI Design: Crafting high-fidelity, pixel-perfect visual mockups.',
                'Frontend Engineering: Building with React/Next.js for ultimate efficiency.',
                'Content Integration: Connecting with a Headless CMS of your choice.',
                'SEO & Optimization: Maximizing Core Web Vitals for search dominance.',
                'Global Launch: Deploying on high-availability CDN infrastructures.'
            ],
            techStack: ['React', 'Next.js (SSG)', 'Astro', 'Three.js', 'Vite', 'Framer Motion', 'TailwindCSS'],
            deliverables: [
                'Production-Ready Clean Source Code',
                'SEO Implementation Strategy & Audit',
                'Performance Optimization Audit Report',
                'Hosting Setup & Custom CDN Routing',
                'Headless CMS Training & Documentation',
                'Post-Launch Technical Review & Support'
            ],
            requirements: [
                'Brand Assets (Logo, Colors, Fonts)',
                'Initial Design Style Preferences',
                'Sitemap and Page Content Outline',
                'Domain Access (if existing)'
            ],
            pricing: [
                { name: 'Basic Static', price: '4,999', icon: <PackageSearch size={26} />, features: ['5 Responsive Pages', 'Mobile-First Layout', 'Core Web Vitals SEO', '1 Month Technical Support', 'Hosting & CDN Setup', 'Interactive Contact Form'] },
                { name: 'Business Static', price: '9,999', icon: <Star size={26} />, popular: true, features: ['Up to 15 Custom Pages', 'Smooth Framer Motion Animations', 'Advanced Technical SEO', '1 Year Extended Support', 'Speed Optimization (98+ score)', 'Dynamic Blog Integration', 'PWA Offline Support'] },
                { name: 'Elite Brand', price: '19,999+', icon: <Crown size={26} />, features: ['Unlimited Custom Pages', 'Interactive 3D / WebGL Effects', 'Headless CMS Integration', '1-Year Priority Support', 'Dedicated Analytics Dashboard', 'Conversion Rate Optimization', 'Priority Technical Roadmapping'] }
            ],
            faqs: [
                { q: 'What is a "Static" website exactly?', a: 'A static website consists of pre-built, pre-rendered pages served instantly over edge CDNs. Because pages do not need database queries on every click, they are remarkably fast and virtually immune to hacking.' },
                { q: 'Can I add a blog to a static site?', a: 'Definitely. We connect a Headless CMS such as Sanity, Strapi, or Contentful so you can create and publish articles from an easy dashboard while keeping the site static and fast.' },
                { q: 'Is hosting expensive for static sites?', a: 'Actually, it is often free or very affordable (often ₹0 to under ₹500/month on Vercel, Netlify, or Cloudflare Pages) because of low server overhead.' },
                { q: 'How long does a typical build take?', a: 'Compact corporate landing sites typically take 5–7 days, while larger multi-page business sites take 2–3 weeks of focused engineering.' }
            ]
        },
        'dynamic-website': {
            title: 'Dynamic Website Development',
            icon: 'https://img.icons8.com/fluency/144/cloud-database-settings.png',
            color: '#7c3aed',
            tagline: 'Custom business logic, real-time data, and high-performance APIs.',
            categoryTag: 'FULL-STACK WEB & CLOUD DATABASE PLATFORMS',
            description: 'Transition beyond static web pages. We build robust, database-driven full-stack web applications tailored to your business operations. From central administrative management dashboards to real-time client portals, our dynamic web solutions create tangible value through automated workflows and secure cloud architectures.',
            kpis: [
                { title: 'LATENCY', value: 'Sub-100ms API Response Time', icon: Zap },
                { title: 'SECURITY', value: 'JWT, Bcrypt & Role-Based ACL', icon: Lock },
                { title: 'ARCHITECTURE', value: 'REST & GraphQL Microservices', icon: Database },
                { title: 'UPTIME SLA', value: '99.9% High Availability Cloud', icon: Shield }
            ],
            benefits: [
                { title: 'Custom Admin Dashboard', desc: 'Manage users, orders, content, and system configurations through a streamlined administrative portal.', icon: Settings },
                { title: 'User Auth & Role Control', desc: 'Secure JWT authentication with granular permissions for admins, managers, and customers.', icon: Lock },
                { title: 'Database Optimization', desc: 'High-throughput relational (PostgreSQL/MySQL) and document (MongoDB) database architectures.', icon: Database },
                { title: 'API-First Ecosystem', desc: 'RESTful API endpoints engineered to seamlessly integrate with payment gateways and third-party tools.', icon: Rocket },
                { title: 'E-commerce & Payments', desc: 'Integrated payment processing (Razorpay, Stripe, UPI) with automated invoice generation.', icon: CreditCard },
                { title: 'Real-time Interactions', desc: 'Live data updates, customer push notifications, and instant activity feeds.', icon: Zap }
            ],
            process: [
                'System Architecture: Designing business logic, entity relationships, and database schema.',
                'Backend Foundation: Developing secure RESTful APIs, JWT Auth, and cloud database models.',
                'Frontend Orchestration: Building a lightning-fast, reactive React/Next.js dashboard.',
                'Feature Implementation: Coding business-specific workflows (Payments, Search, Chat).',
                'Security Hardening: Implementing strict validation, CORS, rate-limiting, and SQLi protection.',
                'Cloud Deployment & CI/CD: Deploying scalable Docker/Cloud infrastructure with automated backups.'
            ],
            techStack: ['MERN Stack', 'Node.js', 'Express.js', 'React', 'MongoDB', 'PostgreSQL', 'Redis', 'Firebase'],
            deliverables: [
                'Full-Stack Production Source Code (Documented)',
                'Dedicated Administrative Control Panel',
                'Secure Role-Based Access Control System',
                'Automated Cloud Database Backup Routines',
                'Interactive API Documentation (Postman / Swagger)',
                '1-Year Technical Maintenance & Security Updates'
            ],
            requirements: [
                'Business Workflow & Feature Requirements',
                'Desired User Roles (Admin, Staff, Customer)',
                'Third-Party Service Credentials (SMS, Email, Payment)',
                'Branding Guidelines and Assets'
            ],
            pricing: [
                { name: 'Standard Full-Stack', price: '14,999', icon: <PackageSearch size={26} />, features: ['User Authentication & Sessions', 'Admin Control Dashboard', 'RESTful API Backend', 'Relational / NoSQL Database', '3 Months Dedicated Support', '100% Fully Responsive UI'] },
                { name: 'Corporate Dynamic', price: '24,999', icon: <Star size={26} />, popular: true, features: ['Complete E-Commerce / SaaS Logic', 'Integrated Payment Gateway (UPI/Stripe)', 'Real-time Notifications & Analytics', '1 Year Priority Support', 'Cloud Database Auto-Backups', 'Role-Based Access Security', 'Performance & Caching Optimization'] },
                { name: 'Custom Enterprise', price: '44,999+', icon: <Crown size={26} />, features: ['Full ERP / CRM Custom System', 'Multi-tenant Architecture Support', 'Automated Financial Reports', 'High-Load Horizontal Auto-Scaling', '1 Year VIP Dedicated Support', 'Comprehensive Security Audit', 'Custom Third-Party API Integrations'] }
            ],
            faqs: [
                { q: 'What makes a website "Dynamic"?', a: 'Dynamic websites connect to a live backend database to render personalized, interactive content. Every customer sees updated account info, real-time data, and customized catalogs—similar to SaaS platforms and modern web portals.' },
                { q: 'Is it difficult to manage without technical experience?', a: 'Not at all. We build a clean, user-friendly Admin Dashboard tailored to your workflow, enabling you to manage users, orders, and content effortlessly without coding knowledge.' },
                { q: 'Can you migrate existing customer or product data?', a: 'Yes! We specialize in data extraction, schema cleaning, and migration from legacy SQL databases, Excel spreadsheets, or third-party platforms into your modern architecture.' },
                { q: 'How is user data kept secure?', a: 'We implement industry-standard security protocols: salted Bcrypt hashing, secure HTTP-only cookies, JSON Web Tokens (JWT), CSRF protections, and encrypted database connections.' }
            ]
        },
        'mobile-app': {
            title: 'Mobile App Development',
            icon: 'https://img.icons8.com/fluency/144/smartphone.png',
            color: '#f472b6',
            tagline: 'High-performance cross-platform apps for iOS and Android.',
            categoryTag: 'CROSS-PLATFORM MOBILE ENGINEERING',
            description: 'Bring your business directly into your users’ hands. We build fast, native-feeling mobile applications for both iOS and Android using modern cross-platform frameworks. With fluid 60FPS animations, offline caching, and hardware integration, we build apps that retain users and generate conversions.',
            kpis: [
                { title: 'FRAME RATE', value: '60 FPS Native Performance', icon: Smartphone },
                { title: 'COVERAGE', value: 'Both iOS & Android Platforms', icon: Globe },
                { title: 'OFFLINE SYNC', value: 'Local Storage & Auto-Sync', icon: Database },
                { title: 'STORES', value: 'Play Store & App Store Ready', icon: Rocket }
            ],
            benefits: [
                { title: 'Unified Codebase', desc: 'Launch simultaneously on both Apple App Store and Google Play from a single clean codebase.', icon: Smartphone },
                { title: '60FPS Native Feel', desc: 'Hardware-accelerated animations and responsive gesture handling for delightful UX.', icon: Zap },
                { title: 'Push Notifications', desc: 'Drive customer retention with real-time transactional and marketing push alerts.', icon: Rocket },
                { title: 'Offline Resilience', desc: 'Local SQLite and caching allow users to browse and interact even without active data.', icon: Database },
                { title: 'Device Integrations', desc: 'Direct access to native hardware features including camera, GPS location, and biometric auth.', icon: Shield },
                { title: 'Store Guidelines Ready', desc: 'Complete adherence to strict Apple App Store and Google Play Store submission policies.', icon: CheckCircle2 }
            ],
            process: [
                'User Journey Mapping: Planning wireframes, tap targets, and interactive screen states.',
                'Interactive Prototyping: Testing physical touch ergonomics on real test devices.',
                'Mobile-First Engineering: Coding with React Native or Expo for native speed.',
                'API & Data Orchestration: Connecting backends, cloud databases, and push notifications.',
                'Device Quality Testing: Rigorous testing across varying screen sizes and OS versions.',
                'App Store & Play Store Release: Managing signing certificates, metadata, and reviews.'
            ],
            techStack: ['React Native', 'Expo', 'Redux Toolkit', 'REST APIs', 'Firebase', 'SQLite', 'Tailwind'],
            deliverables: [
                'Production Signed APK & iOS IPA Release Bundles',
                'Complete Cross-Platform Application Source Code',
                'App Store Optimization (ASO) Metadata & Graphics',
                'Push Notification Gateway Setup',
                '1-Year Maintenance & OS Compatibility Updates'
            ],
            requirements: [
                'Core App Goals and Screen Requirements',
                'Target Operating Systems (iOS, Android, or Both)',
                'Existing Backend APIs (or we can build one)',
                'App Store & Google Play Developer Accounts'
            ],
            pricing: [
                { name: 'Basic App', price: '14,999', icon: <PackageSearch size={26} />, features: ['iOS & Android Support', 'Modern Clean UI/UX Design', 'API Integration', '3 Months Bugfix Support', 'Production Release Files', 'Search and Filter Navigation'] },
                { name: 'Advanced App', price: '29,999', icon: <Star size={26} />, popular: true, features: ['User Profiles & Auth', 'Push Notification Messaging', 'Offline Database Sync', '1 Year Extended Support', 'App Store & Play Store Upload', 'Maps & GPS Geolocation', 'In-App Payment Gateway'] },
                { name: 'Ultimate Solution', price: '54,999+', icon: <Crown size={26} />, features: ['Full Custom Backend Included', 'Real-time WebSocket Chat', 'Biometric Fingerprint/Face Login', '1 Year Priority Support', 'Multi-Language Localization', 'Advanced App Analytics', 'Continuous OS Upgrades Support'] }
            ],
            faqs: [
                { q: 'Will the app work on both iPhone and Android?', a: 'Yes! We use cutting-edge cross-platform technology (React Native) ensuring 100% native execution and UI responsiveness across both operating systems.' },
                { q: 'Who owns the completed code?', a: 'You have full, unencumbered ownership of the source code, repositories, and build artifacts once project delivery is completed.' },
                { q: 'How are app updates handled?', a: 'We implement Over-The-Air (OTA) update pipelines when possible, allowing you to push small fixes and content updates instantly without waiting for store re-reviews.' },
                { q: 'Do you assist with Google Play and Apple App Store submission?', a: 'Yes! We configure production keystores, signing certificates, privacy manifests, and guide the submission through app approval.' }
            ]
        }
    }

    const detail = serviceDetails[id] || serviceDetails['dynamic-website']

    return (
        <div className="service-detail-page">
            <SEO 
                title={`${detail.title} | Someshwar Holkar`} 
                description={detail.tagline}
                keywords={`${detail.title}, ${detail.techStack.join(', ')}, Freelance Developer, Custom Application Development`}
                url={`/services/${id}`}
            />

            {/* Breadcrumb Navigation */}
            <div className="service-detail-nav">
                <Link to="/services" className="service-back-link">
                    <ArrowLeft size={16} />
                    <span>All Services</span>
                </Link>
                <div className="service-breadcrumb-tag">
                    <span>Services</span>
                    <span style={{ opacity: 0.4 }}>/</span>
                    <span style={{ color: detail.color }}>{detail.title}</span>
                </div>
            </div>

            {/* Immersive Hero Section */}
            <section className="service-detail-hero">
                {/* 3D Canvas Background */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <Suspense fallback={null}>
                        <ServiceDetailCanvas color={detail.color} />
                    </Suspense>
                </div>

                <div style={{ position: 'relative', zIndex: 10, maxWidth: '1100px', width: '100%', margin: '0 auto' }}>
                    {/* Floating Service Icon */}
                    <motion.div 
                        initial={{ scale: 0, rotate: -30 }} 
                        animate={{ scale: 1, rotate: 0 }} 
                        transition={{ type: 'spring', damping: 15, delay: 0.2 }}
                        style={{ 
                            background: `radial-gradient(circle, ${detail.color}20 0%, ${detail.color}05 100%)`, 
                            padding: '1.25rem', 
                            borderRadius: '24px', 
                            display: 'inline-flex', 
                            marginBottom: '1.75rem', 
                            border: `1px solid ${detail.color}35`,
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            boxShadow: `0 0 35px ${detail.color}25`
                        }}
                    >
                        <img 
                            src={detail.icon} 
                            alt={detail.title} 
                            style={{ width: '56px', height: '56px', objectFit: 'contain' }} 
                        />
                    </motion.div>

                    {/* Category Pill */}
                    <div>
                        <span 
                            className="service-hero-badge"
                            style={{ 
                                background: `${detail.color}15`, 
                                border: `1px solid ${detail.color}35`,
                                color: detail.color,
                                boxShadow: `0 0 20px ${detail.color}15`
                            }}
                        >
                            <Zap size={14} />
                            <span>{detail.categoryTag}</span>
                        </span>
                    </div>

                    {/* Main Title */}
                    <motion.h1 
                        className="service-hero-title"
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        {detail.title.split(' ')[0]} <span style={{
                            background: `linear-gradient(135deg, #ffffff 30%, ${detail.color} 100%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            {detail.title.split(' ').slice(1).join(' ')}
                        </span>
                    </motion.h1>

                    {/* Tagline */}
                    <motion.p 
                        className="service-hero-tagline"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        {detail.tagline}
                    </motion.p>

                    {/* Description */}
                    <motion.p 
                        className="service-hero-description"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.45 }}
                    >
                        {detail.description}
                    </motion.p>

                    {/* Tech Stack Chips in Hero */}
                    <motion.div 
                        className="service-tech-chips-row"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        {detail.techStack.map((tech) => (
                            <span key={tech} className="service-tech-chip">
                                {tech}
                            </span>
                        ))}
                    </motion.div>

                    {/* Hero Actions */}
                    <motion.div 
                        className="service-hero-actions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.55 }}
                    >
                        <a 
                            href="#pricing"
                            className="btn-portfolio-primary"
                            style={{ 
                                padding: '0.95rem 2.2rem', 
                                fontSize: '1rem',
                                borderRadius: '14px',
                                textDecoration: 'none'
                            }}
                        >
                            <span>Explore Packages</span>
                            <ArrowUpRight size={18} />
                        </a>
                        <Link 
                            to="/#contact"
                            className="btn-portfolio-secondary"
                            style={{ 
                                padding: '0.95rem 2.2rem', 
                                fontSize: '1rem',
                                borderRadius: '14px',
                                textDecoration: 'none'
                            }}
                        >
                            <MessageSquare size={18} />
                            <span>Discuss Your Project</span>
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    style={{ 
                        position: 'absolute', 
                        bottom: '2rem', 
                        left: '50%', 
                        transform: 'translateX(-50%)', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        zIndex: 10
                    }}
                >
                    <span style={{ fontSize: '0.7rem', letterSpacing: '3px', opacity: 0.6, fontWeight: 800 }}>SCROLL DOWN</span>
                    <motion.div 
                        animate={{ y: [0, 6, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <ChevronDown size={20} color={detail.color} />
                    </motion.div>
                </motion.div>
            </section>

            {/* Architecture & Deliverables Section */}
            <section style={{ 
                padding: 'clamp(4.5rem, 8vw, 7.5rem) clamp(1rem, 4vw, 2.5rem)', 
                borderTop: '1px solid rgba(255, 255, 255, 0.07)', 
                background: 'linear-gradient(180deg, rgba(124, 58, 237, 0.03) 0%, transparent 100%)',
                position: 'relative'
            }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))', gap: 'clamp(2.5rem, 6vw, 5rem)', alignItems: 'center' }}>
                    {/* Left: Execution & Architecture */}
                    <motion.div 
                        initial={{ opacity: 0, x: -40 }} 
                        whileInView={{ opacity: 1, x: 0 }} 
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: detail.color, marginBottom: '1.25rem', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '3px' }}>
                            <Zap size={16} fill={detail.color} />
                            <span>EXECUTION POWER & RELIABILITY</span>
                        </div>
                        <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', marginBottom: '1.5rem', lineHeight: 1.15, fontWeight: 900, letterSpacing: '-1.5px' }}>
                            Engineering for <br />
                            <span style={{ color: detail.color }}>Maximum Scale & Speed</span>
                        </h2>
                        <p style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)', lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            {detail.description}
                        </p>

                        {/* KPI Metric Cards Grid */}
                        <div className="detail-kpi-grid">
                            {detail.kpis.map((kpi, idx) => {
                                const Icon = kpi.icon
                                return (
                                    <div key={idx} className="detail-kpi-card">
                                        <div className="detail-kpi-header" style={{ color: detail.color }}>
                                            <Icon size={16} />
                                            <span>{kpi.title}</span>
                                        </div>
                                        <p className="detail-kpi-value">{kpi.value}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </motion.div>
                    
                    {/* Right: Deliverables Success Package Card */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }} 
                        whileInView={{ opacity: 1, scale: 1 }} 
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="deliverables-card"
                        style={{ border: `1px solid ${detail.color}35`, boxShadow: `0 15px 45px ${detail.color}15` }}
                    >
                        <div 
                            className="deliverables-badge" 
                            style={{ 
                                background: detail.color,
                                boxShadow: `0 0 20px ${detail.color}50`
                            }}
                        >
                            DELIVERABLES
                        </div>
                        <h3 className="deliverables-title">
                            What You Get in the Package
                        </h3>
                        <ul className="deliverables-list">
                            {detail.deliverables.map((item, i) => (
                                <li key={i}>
                                    <div 
                                        className="deliverables-icon-wrap"
                                        style={{ 
                                            background: `${detail.color}20`, 
                                            color: detail.color,
                                            border: `1px solid ${detail.color}40`
                                        }}
                                    >
                                        <Check size={16} />
                                    </div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* Core Capabilities & Features 6-Card Grid */}
            <section style={{ 
                padding: 'clamp(4.5rem, 8vw, 7.5rem) clamp(1rem, 4vw, 2.5rem)',
                background: 'var(--bg-primary)',
                position: 'relative'
            }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: detail.color, marginBottom: '1rem', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '3px' }}>
                            <Layers size={16} />
                            <span>CAPABILITIES & ARCHITECTURE</span>
                        </div>
                        <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, letterSpacing: '-1.5px', marginBottom: '1.2rem', lineHeight: 1.15 }}>
                            Core Capabilities & <span style={{ color: detail.color }}>Business Value</span>
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 1.6vw, 1.15rem)', lineHeight: 1.7 }}>
                            Key architectural features built directly into your dynamic system to automate operations, empower admins, and delight users.
                        </p>
                    </div>

                    <div className="detail-capabilities-grid">
                        {detail.benefits.map((benefit, i) => {
                            const Icon = benefit.icon
                            return (
                                <motion.div
                                    key={benefit.title}
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.08 }}
                                    className="detail-capability-card group"
                                    style={{
                                        border: '1px solid rgba(255, 255, 255, 0.07)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = `${detail.color}60`
                                        e.currentTarget.style.boxShadow = `0 14px 40px -10px ${detail.color}25`
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)'
                                        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.25)'
                                    }}
                                >
                                    <div 
                                        className="detail-capability-icon"
                                        style={{
                                            background: `radial-gradient(circle, ${detail.color}25 0%, ${detail.color}08 100%)`,
                                            color: detail.color,
                                            border: `1px solid ${detail.color}40`,
                                            boxShadow: `0 0 15px ${detail.color}20`
                                        }}
                                    >
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="detail-capability-title">{benefit.title}</h3>
                                    <p className="detail-capability-desc">{benefit.desc}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Investment Packages Section */}
            <section id="pricing" style={{ 
                padding: 'clamp(5rem, 9vw, 8.5rem) clamp(1rem, 4vw, 2.5rem)', 
                background: 'linear-gradient(180deg, rgba(124, 58, 237, 0.04) 0%, rgba(10, 10, 15, 0.8) 100%)', 
                borderTop: '1px solid rgba(255, 255, 255, 0.07)' 
            }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 'clamp(3.5rem, 6vw, 5rem)', maxWidth: '750px', margin: '0 auto clamp(3.5rem, 6vw, 5rem)' }}>
                        <div style={{ color: detail.color, marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                            <CreditCard size={32} />
                        </div>
                        <h2 style={{ fontSize: 'clamp(2.3rem, 6vw, 4rem)', marginBottom: '1.25rem', fontWeight: 900, letterSpacing: '-1.5px', lineHeight: 1.15 }}>
                            Investment <span style={{ color: detail.color }}>Packages</span>
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7 }}>
                            Engineered for high performance, business scalability, and long-term reliability. All prices are in INR.
                        </p>
                    </div>
                    
                    <div className="detail-pricing-grid">
                        {detail.pricing.map((plan, i) => (
                            <motion.div 
                                key={plan.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className={`detail-pricing-card ${plan.popular ? 'popular' : ''}`}
                                style={{
                                    borderColor: plan.popular ? detail.color : 'rgba(255, 255, 255, 0.08)',
                                    boxShadow: plan.popular ? `0 15px 50px -10px ${detail.color}40, 0 0 25px ${detail.color}20` : undefined
                                }}
                            >
                                {plan.popular && (
                                    <div 
                                        className="popular-badge-pill"
                                        style={{ 
                                            background: `linear-gradient(135deg, ${detail.color}, #00d4ff)`,
                                            boxShadow: `0 0 15px ${detail.color}60`
                                        }}
                                    >
                                        MOST POPULAR
                                    </div>
                                )}
                                <div 
                                    className="detail-plan-icon"
                                    style={{
                                        background: `${detail.color}20`,
                                        color: detail.color,
                                        border: `1px solid ${detail.color}40`
                                    }}
                                >
                                    {plan.icon}
                                </div>
                                <h3 className="detail-plan-name">{plan.name}</h3>
                                
                                <div className="detail-plan-price-row">
                                    <span className="detail-plan-price">₹{plan.price}</span>
                                    <span className="detail-plan-starting">Starting</span>
                                </div>
                                
                                <div className="detail-plan-divider" />
                                
                                <ul className="detail-plan-features">
                                    {plan.features.map((feat, index) => (
                                        <li key={index}>
                                            <Check size={16} color={detail.color} />
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link 
                                    to="/#contact"
                                    className="detail-plan-btn"
                                    style={{ 
                                        background: plan.popular 
                                            ? `linear-gradient(135deg, ${detail.color} 0%, #0066ff 100%)` 
                                            : 'rgba(255, 255, 255, 0.06)',
                                        color: '#ffffff',
                                        border: plan.popular ? 'none' : '1px solid rgba(255, 255, 255, 0.12)',
                                        boxShadow: plan.popular ? `0 8px 25px ${detail.color}50` : undefined
                                    }}
                                >
                                    <span>Launch Project</span>
                                    <ArrowUpRight size={17} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Development Roadmap & Prerequisites Section */}
            <section style={{ 
                padding: 'clamp(4.5rem, 8vw, 8rem) clamp(1rem, 4vw, 2.5rem)', 
                background: 'var(--bg-primary)'
            }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))', gap: 'clamp(3rem, 6vw, 6rem)' }}>
                        {/* Process Roadmap Column */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: detail.color, marginBottom: '2.5rem' }}>
                                <ClipboardList size={28} />
                                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', margin: 0, fontWeight: 900, letterSpacing: '-1px' }}>
                                    Development <span style={{ color: detail.color }}>Process</span>
                                </h2>
                            </div>

                            {detail.process.map((step, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08, duration: 0.5 }}
                                    className="detail-process-step"
                                >
                                    {i !== detail.process.length - 1 && (
                                        <div 
                                            className="detail-process-line"
                                            style={{ background: `linear-gradient(180deg, ${detail.color}, rgba(255, 255, 255, 0.1))` }}
                                        />
                                    )}
                                    <div 
                                        className="detail-process-node"
                                        style={{ 
                                            background: detail.color,
                                            boxShadow: `0 0 15px ${detail.color}50`
                                        }}
                                    >
                                        {i + 1}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <h4 style={{ fontSize: '1.25rem', marginBottom: '0.45rem', color: '#ffffff', fontWeight: 800 }}>
                                            {step.split(':')[0]}
                                        </h4>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: 1.65, margin: 0 }}>
                                            {step.split(':')[1] || ''}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Prerequisites & FAQ Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            {/* Prerequisites Card */}
                            <div style={{ 
                                background: 'rgba(18, 18, 28, 0.65)', 
                                padding: 'clamp(1.75rem, 4vw, 2.75rem)', 
                                borderRadius: '22px', 
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)'
                            }}>
                                <h3 style={{ fontSize: '1.6rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800 }}>
                                    <Settings color={detail.color} size={24} />
                                    <span>Prerequisites</span>
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem', fontSize: '0.98rem', lineHeight: 1.6 }}>
                                    To kick off engineering without bottlenecks, we ideally gather these essentials upfront:
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                                    {detail.requirements.map((req, i) => (
                                        <div 
                                            key={i} 
                                            style={{ 
                                                display: 'flex', 
                                                gap: '1rem', 
                                                alignItems: 'center', 
                                                background: 'rgba(255, 255, 255, 0.03)', 
                                                padding: '1rem 1.2rem', 
                                                borderRadius: '14px',
                                                border: '1px solid rgba(255, 255, 255, 0.06)'
                                            }}
                                        >
                                            <Check size={18} color={detail.color} style={{ flexShrink: 0 }} />
                                            <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff' }}>{req}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* FAQ Section */}
                            <div style={{ 
                                background: 'rgba(18, 18, 28, 0.65)', 
                                padding: 'clamp(1.75rem, 4vw, 2.75rem)', 
                                borderRadius: '22px', 
                                border: `1px solid ${detail.color}25`,
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                boxShadow: `0 8px 30px ${detail.color}10`
                            }}>
                                <h3 style={{ fontSize: '1.6rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800 }}>
                                    <HelpCircle color={detail.color} size={24} />
                                    <span>Client <span style={{ color: detail.color }}>FAQs</span></span>
                                </h3>
                                <div>
                                    {detail.faqs.map((faq, i) => (
                                        <div key={i} className="detail-faq-card">
                                            <button 
                                                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                                className="detail-faq-btn"
                                                aria-expanded={activeFaq === i}
                                            >
                                                <span>{faq.q}</span>
                                                <motion.div animate={{ rotate: activeFaq === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                                                    <ChevronDown size={19} color={detail.color} />
                                                </motion.div>
                                            </button>
                                            <AnimatePresence>
                                                {activeFaq === i && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        style={{ overflow: 'hidden' }}
                                                    >
                                                        <p className="detail-faq-answer">{faq.a}</p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Strategic Bottom Conversion CTA */}
            <section style={{ padding: 'clamp(4rem, 8vw, 8rem) clamp(1rem, 4vw, 2.5rem)', textAlign: 'center' }}>
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.7 }}
                 style={{ 
                   maxWidth: '1100px', 
                   margin: '0 auto', 
                   background: `linear-gradient(135deg, ${detail.color}15, rgba(18, 18, 28, 0.8))`, 
                   padding: 'clamp(3.5rem, 6vw, 6rem) clamp(1.5rem, 4vw, 4rem)', 
                   borderRadius: '26px', 
                   border: `1px solid ${detail.color}35`,
                   boxShadow: `0 25px 80px ${detail.color}15`, 
                   position: 'relative', 
                   overflow: 'hidden'
                 }}
               >
                 <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '350px', height: '350px', background: detail.color, filter: 'blur(160px)', opacity: 0.12, borderRadius: '50%', pointerEvents: 'none' }}></div>
                 <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '350px', height: '350px', background: '#00d4ff', filter: 'blur(160px)', opacity: 0.08, borderRadius: '50%', pointerEvents: 'none' }}></div>
                 
                 <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', marginBottom: '1.5rem', lineHeight: 1.15, fontWeight: 950, letterSpacing: '-1.5px' }}>
                    Ready to build something <br />
                    <span style={{ color: detail.color }}>Exceptional</span>?
                 </h2>
                 <p style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', color: 'var(--text-secondary)', maxWidth: '720px', margin: '0 auto 3rem', lineHeight: 1.75, fontWeight: 500 }}>
                    Let's architect a high-performance system that accelerates your business goals with industrial-grade precision and modern UX.
                 </p>
                 <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link 
                        to="/#contact" 
                        className="btn-portfolio-primary" 
                        style={{ 
                            padding: '1rem 2.5rem', 
                            fontSize: '1.05rem', 
                            borderRadius: '14px', 
                            boxShadow: `0 10px 30px ${detail.color}40`,
                            textDecoration: 'none'
                        }}
                    >
                        <span>Start Project Now</span>
                        <MessageSquare size={19} />
                    </Link>
                    <Link 
                        to="/services" 
                        className="btn-portfolio-secondary" 
                        style={{ 
                            border: `1px solid ${detail.color}60`, 
                            padding: '1rem 2.5rem', 
                            fontSize: '1.05rem', 
                            borderRadius: '14px',
                            textDecoration: 'none'
                        }}
                    >
                        <span>Browse All Services</span>
                        <ArrowUpRight size={19} />
                    </Link>
                 </div>
               </motion.div>
            </section>
        </div>
    )
}

export default ServiceDetailPage

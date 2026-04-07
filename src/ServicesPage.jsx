import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Github, Linkedin, Mail, ExternalLink,
  Code2, Globe, ArrowRight, MapPin, Check,
  Smartphone, Layout, Database, Layers,
  Shield, Cpu, Rocket, Zap, Clock, ShieldCheck, Gem,
  Target, BarChart, SmartphoneIcon, Server, Search, Mouse,
  MessageSquare, UserPlus, FileText, CheckCircle2
} from 'lucide-react'

// Reuse the 3D elements for consistency
const FloatingShape = ({ position, color, speed = 1 }) => {
  const meshRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.2 * speed
    meshRef.current.rotation.y = t * 0.3 * speed
    meshRef.current.position.y = position[1] + Math.sin(t * speed) * 0.5
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color={color} wireframe />
      </mesh>
    </Float>
  )
}

const ParticleField = () => {
  const points = useRef()
  const count = 500

  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
  }

  useFrame((state) => {
    points.current.rotation.y = state.clock.getElapsedTime() * 0.05
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#00d4ff" transparent opacity={0.6} />
    </points>
  )
}

const ServicesScene3D = () => {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#00d4ff" intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#7c3aed" intensity={0.8} />
      <ParticleField />
      <FloatingShape position={[-3, 1, -2]} color="#00d4ff" speed={0.8} />
      <FloatingShape position={[3, -1, -1]} color="#7c3aed" speed={1.2} />
      <FloatingShape position={[2, 2, -3]} color="#f472b6" speed={0.6} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
    </>
  )
}

const ServicesHero = () => {
  return (
    <section className="services-hero" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      padding: '120px 2rem 100px',
      overflow: 'hidden'
    }}>
      <div className="services-hero-canvas" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <Suspense fallback={null}>
            <ServicesScene3D />
          </Suspense>
        </Canvas>
      </div>
      <motion.div
        className="services-hero-content"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{ zIndex: 20, textAlign: 'center', maxWidth: '1200px', width: '100%' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            marginBottom: '2.5rem', display: 'inline-block', padding: '0.8rem 2.5rem',
            background: 'rgba(0, 212, 255, 0.05)', borderRadius: '100px',
            border: '1px solid rgba(0, 212, 255, 0.2)', color: 'var(--primary)',
            fontSize: '0.8rem', fontWeight: 800, letterSpacing: '5px',
            textTransform: 'uppercase', backdropFilter: 'blur(10px)'
          }}
        >
          PREMIUM SOFTWARE SOLUTIONS
        </motion.div>
        <motion.h1
          className="services-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: 'clamp(2.5rem, 10vw, 6rem)',
            color: '#fff',
            fontWeight: 950,
            lineHeight: 1.05,
            letterSpacing: '-3px',
            marginBottom: '2.5rem'
          }}
        >
          Engineering Your <br />
          <span style={{
            background: 'linear-gradient(to right, #00d4ff, #7c3aed, #f472b6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '200% auto',
            animation: 'gradientMove 5s linear infinite'
          }}>Digital Future</span>
        </motion.h1>
        <motion.p
          className="services-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            color: 'var(--text-secondary)',
            maxWidth: '800px',
            margin: '0 auto 5rem',
            lineHeight: 1.8,
            fontWeight: 500
          }}
        >
          Helping industry leaders and ambitious startups build mission-critical
          web and mobile applications with uncompromising quality and speed.
        </motion.p>

        <motion.div
          className="hero-value-props"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{
            display: 'flex',
            gap: 'clamp(2rem, 5vw, 6rem)',
            justifyContent: 'center',
            flexWrap: 'wrap',
            padding: '0 1rem'
          }}
        >
          {[
            { icon: <Zap size={32} />, label: 'ULTRA SPEED', color: 'var(--primary)', shadow: 'rgba(0, 212, 255, 0.2)' },
            { icon: <ShieldCheck size={32} />, label: 'ROBUST SECURITY', color: '#7c3aed', shadow: 'rgba(124, 58, 237, 0.2)' },
            { icon: <Rocket size={32} />, label: 'SCALABLE INFRA', color: '#f472b6', shadow: 'rgba(244, 114, 182, 0.2)' }
          ].map((prop, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{
                padding: '1.8rem',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '32px',
                color: prop.color,
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: `0 20px 40px ${prop.shadow}`,
                backdropFilter: 'blur(5px)',
                transition: 'transform 0.3s ease'
              }}>
                {prop.icon}
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fff', letterSpacing: '3px' }}>{prop.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          style={{
            marginTop: '8rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem'
          }}
        >
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '5px', fontWeight: 800 }}>EXPLORE SERVICES</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={{
              width: '30px',
              height: '50px',
              borderRadius: '20px',
              border: '2px solid rgba(0, 212, 255, 0.3)',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '8px'
            }}
          >
            <motion.div
              animate={{ height: ['8px', '16px', '8px'], opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ width: '4px', background: 'var(--primary)', borderRadius: '2px' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

const ServicesCards = () => {
  const services = [
    {
      id: 'static-website',
      name: 'Static Showcase',
      icon: Globe,
      color: '#00d4ff',
      price: '₹5k+',
      description: 'Ultra-fast, perfectly optimized sites that dominate SEO rankings and offer bulletproof security with sub-second response times.',
      tags: ['SSR/SSG', 'Astro', 'Headless'],
      features: [
        '99+ Google Lighthouse Score',
        'Headless CMS Integration',
        'Global Edge Caching',
        'Mobile-First Layouts'
      ],
      popular: false,
      cta: 'View Packages'
    },
    {
      id: 'dynamic-website',
      name: 'Dynamic Website',
      icon: Database,
      color: '#7c3aed',
      price: '₹14,999',
      description: 'Sophisticated web applications powered by robust backends, real-time data sync, and enterprise-grade administrative portals.',
      tags: ['MERN', 'Admin Panel', 'Payments', 'Auth'],
      features: [
        'Secure User Authentication',
        'Multi-role Dashboards',
        'Cloud Data Persistence',
        'API Architecture'
      ],
      popular: true,
      cta: 'View Packages'
    },
    {
      id: 'mobile-app',
      name: 'Mobile App',
      icon: Smartphone,
      color: '#f472b6',
      price: '₹14,999',
      description: 'Engaging, native-quality experiences for iOS and Android built for performance with smooth animations and hardware integration.',
      tags: ['React Native', 'Expo', 'Store Dev', 'Payments'],
      features: [
        'Offline Functionality',
        'Push Notification Flow',
        'Biometric Integration',
        'App Store Ready'
      ],
      popular: false,
      cta: 'View Packages'
    },
  ]

  return (
    <section id="services-list" style={{ padding: '6rem 2rem', position: 'relative', background: 'linear-gradient(to bottom, transparent, rgba(0, 212, 255, 0.02))' }}>
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{ fontSize: '0.8rem', color: 'var(--primary)', letterSpacing: '5px', fontWeight: 800, textTransform: 'uppercase' }}
        >
          CORE SPECIALTIES
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginTop: '1.2rem', fontWeight: 950, letterSpacing: '-1px' }}
        >
          Expert <span style={{ color: 'var(--primary)' }}>Solutions</span>
        </motion.h2>
      </div>

      <div className="services-container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // Force 3 in a row
        gap: '2.5rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <style dangerouslySetInnerHTML={{
          __html: `
          @media (max-width: 1100px) {
            .services-container { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 768px) {
            .services-container { grid-template-columns: 1fr !important; }
          }
        `}} />
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className={`services-new-card ${service.popular ? 'popular' : ''}`}
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -20 }}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
            style={{
              padding: '4rem 2.5rem',
              background: 'rgba(255,255,255,0.015)',
              borderRadius: '40px',
              border: service.popular ? `2px solid ${service.color}` : '1px solid rgba(255,255,255,0.05)',
              position: 'relative',
              overflow: 'hidden',
              backdropFilter: 'blur(40px)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: service.popular ? `0 30px 60px ${service.color}15` : '0 20px 50px rgba(0,0,0,0.3)'
            }}
          >
            {service.popular && (
              <div style={{
                position: 'absolute',
                top: '2.5rem',
                right: '2.5rem',
                background: service.color,
                color: '#fff',
                padding: '0.4rem 1.2rem',
                borderRadius: '100px',
                fontSize: '0.7rem',
                fontWeight: 900,
                letterSpacing: '1px'
              }}>
                POPULAR
              </div>
            )}

            <motion.div 
              whileHover={{ scale: 1.1, rotate: 2 }}
              style={{ 
                color: service.color, 
                marginBottom: '2rem', 
                background: `linear-gradient(135deg, ${service.color}25, ${service.color}05)`, 
                width: '64px', 
                height: '64px', 
                borderRadius: '18px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: '1rem', 
                border: `1px solid ${service.color}35`,
                boxShadow: `0 10px 30px ${service.color}20`,
                transition: 'all 0.3s ease'
              }}
            >
              <service.icon size={32} strokeWidth={2.5} />
            </motion.div>

            <div style={{ marginBottom: '1rem', color: service.color, fontWeight: 700, fontSize: '0.9rem', letterSpacing: '1px' }}>
              Base: {service.price}
            </div>

            <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 950, letterSpacing: '-1px' }}>{service.name}</h3>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.05rem', lineHeight: 1.8, minHeight: '120px' }}>
              {service.description}
            </p>

            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
              {service.tags.map(tag => (
                <span key={tag} style={{ background: 'rgba(255,255,255,0.03)', color: '#fff', padding: '0.5rem 1.2rem', borderRadius: '15px', fontSize: '0.7rem', fontWeight: 700, border: '1px solid rgba(255,255,255,0.08)' }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)', margin: '0 0 3rem' }}></div>

            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '4rem', flex: 1 }}>
              {service.features.map((feature, i) => (
                <li key={i} style={{ display: 'flex', gap: '1.2rem', marginBottom: '1.5rem', fontSize: '1rem', color: 'rgba(255,255,255,0.8)', alignItems: 'center' }}>
                  <div style={{ background: `${service.color}20`, padding: '0.4rem', borderRadius: '50%', color: service.color, display: 'flex' }}><Check size={14} /></div>
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              to={`/services/${service.id}`}
              style={{
                width: '100%',
                borderRadius: '20px',
                padding: '1.5rem',
                textAlign: 'center',
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                background: service.popular ? service.color : 'rgba(255,255,255,0.05)',
                color: '#fff',
                border: service.popular ? 'none' : '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease',
                boxShadow: service.popular ? `0 15px 35px ${service.color}40` : 'none'
              }}
              onMouseOver={(e) => {
                if (!service.popular) e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              }}
              onMouseOut={(e) => {
                if (!service.popular) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }}
            >
              {service.cta} <ArrowRight size={20} />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

const CollaborationProcess = () => {
  const steps = [
    { title: 'Discovery', desc: 'In-depth consultation to map your objectives and architecture.', color: 'var(--primary)' },
    { title: 'Strategy', desc: 'Defining the tech stack, prototypes, and development milestones.', color: '#7c3aed' },
    { title: 'Execution', desc: 'Iterative development sprints with transparent weekly progress updates.', color: '#f472b6' },
    { title: 'Launch', desc: 'Rigorous testing, performance optimization, and global deployment.', color: '#10b981' },
  ]

  return (
    <section style={{ padding: '8rem 2rem', background: 'rgba(0,0,0,0.2)', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#7c3aed', letterSpacing: '5px', fontWeight: 800 }}>WORKFLOW</span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', marginTop: '1rem', fontWeight: 950 }}>Built for <span style={{ background: 'var(--gradient-secondary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Reliability</span></h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '5rem', position: 'relative' }}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              style={{ position: 'relative' }}
            >
              <div style={{
                fontSize: '5rem',
                fontWeight: 900,
                position: 'absolute',
                top: '-2.5rem',
                left: '-1rem',
                opacity: 0.03,
                color: step.color,
                zIndex: 0
              }}>
                0{i + 1}
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ width: '40px', height: '4px', background: step.color, marginBottom: '2rem', borderRadius: '2px' }}></div>
                <h4 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#fff', fontWeight: 900, letterSpacing: '-1px' }}>{step.title}</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '1.05rem', fontWeight: 400 }}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const FinalCTA = () => {
  return (
    <section style={{ padding: '10rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '1200px',
        height: '1200px',
        background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
        opacity: 0.08,
        borderRadius: '50%',
        filter: 'blur(100px)'
      }}></div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        style={{ position: 'relative', zIndex: 10 }}
      >
        <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontWeight: 950, marginBottom: '3rem', lineHeight: 1, letterSpacing: '-4px' }}>
          Let's Architect <br />
          <span style={{
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradientMove 5s linear infinite',
            backgroundSize: '200% auto'
          }}>The Future</span>
        </h2>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.3rem',
          maxWidth: '800px',
          margin: '0 auto 6rem',
          lineHeight: 1.9,
          fontWeight: 400
        }}>
          Now accepting high-impact projects and long-term technical partnerships.
          Limited slots available for Q3 2024.
        </p>

        <Link
          to="/contact"
          className="btn btn-primary"
          style={{
            padding: '2.2rem 6rem',
            fontSize: '1.4rem',
            borderRadius: '100px',
            boxShadow: '0 30px 70px rgba(0, 212, 255, 0.4)',
            fontWeight: 850,
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}
        >
          Initiate Mission <ArrowRight size={24} style={{ marginLeft: '1.5rem' }} />
        </Link>
      </motion.div>
    </section>
  )
}

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="services-page" style={{ background: '#050508', color: '#fff', overflowX: 'hidden' }}>
      <ServicesHero />
      <div style={{ position: 'relative', zIndex: 5 }}>
        <ServicesCards />
        <CollaborationProcess />
        <FinalCTA />
      </div>
    </div>
  )
}

export default ServicesPage

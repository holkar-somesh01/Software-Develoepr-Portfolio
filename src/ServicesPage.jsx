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
import SEO from './components/SEO'

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
          PROFESSIONAL SOFTWARE SERVICES
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
          Building Great <br />
          <span style={{
            background: 'linear-gradient(to right, #00d4ff, #7c3aed, #f472b6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '200% auto',
            animation: 'gradientMove 5s linear infinite'
          }}>Web Applications</span>
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
          Helping businesses and startups build fast, reliable, and user-friendly web and mobile applications.
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
            { icon: <Zap size={32} />, label: 'FAST PERFORMANCE', color: 'var(--primary)', shadow: 'rgba(0, 212, 255, 0.2)' },
            { icon: <ShieldCheck size={32} />, label: 'SECURE', color: '#7c3aed', shadow: 'rgba(124, 58, 237, 0.2)' },
            { icon: <Rocket size={32} />, label: 'SCALABLE', color: '#f472b6', shadow: 'rgba(244, 114, 182, 0.2)' }
          ].map((prop, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{
                padding: '25px',
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
      </motion.div>
    </section>
  )
}

const ServicesCards = () => {
  const services = [
    {
      id: 'static-website',
      name: 'Static Website',
      icon: Globe,
      color: '#00d4ff',
      price: '₹5k+',
      description: 'Fast and secure static websites optimized for search engines and great user experience.',
      tags: ['React', 'Next.js', 'Tailwind'],
      features: [
        'Fast Loading Speed',
        'Easy Content Management',
        'Global Fast Hosting',
        'Mobile Friendly Design'
      ],
      popular: false,
      cta: 'More Details'
    },
    {
      id: 'dynamic-website',
      name: 'Dynamic Website',
      icon: Database,
      color: '#7c3aed',
      price: '₹14,999',
      description: 'Complete web applications with custom backends, user dashboards, and real-time database connections.',
      tags: ['MERN', 'Admin Panel', 'Payments', 'Auth'],
      features: [
        'Secure Login System',
        'Admin Dashboards',
        'Cloud Database',
        'API Integration'
      ],
      popular: true,
      cta: 'More Details'
    },
    {
      id: 'mobile-app',
      name: 'Mobile Application',
      icon: Smartphone,
      color: '#f472b6',
      price: '₹14,999',
      description: 'High-quality mobile applications for both Android and iOS with smooth animations and great performance.',
      tags: ['React Native', 'Expo', 'Play Store', 'Payments'],
      features: [
        'Works Offline',
        'Push Notifications',
        'Fingerprint/Face Login',
        'Play Store Ready'
      ],
      popular: false,
      cta: 'More Details'
    },
  ]

  return (
    <section id="services-list" className="services-section" style={{
      position: 'relative',
      background: 'linear-gradient(to bottom, transparent, rgba(0, 212, 255, 0.02))',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '4rem 1.5rem'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{ fontSize: '0.8rem', color: 'var(--primary)', letterSpacing: '5px', fontWeight: 800, textTransform: 'uppercase' }}
        >
          MY SERVICES
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginTop: '1.2rem', fontWeight: 950, letterSpacing: '-1px' }}
        >
          What I <span style={{ color: 'var(--primary)' }}>Offer</span>
        </motion.h2>
      </div>

      <div className="services-container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
        gap: '2rem',
        maxWidth: '1240px',
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
              padding: '1.5rem',
              background: 'rgba(255,255,255,0.015)',
              borderRadius: '16px',
              border: service.popular ? `2px solid ${service.color}` : '1px solid rgba(255,255,255,0.05)',
              position: 'relative',
              overflow: 'hidden',
              backdropFilter: 'blur(40px)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: service.popular ? `0 30px 60px ${service.color}15` : '0 20px 50px rgba(0,0,0,0.3)',
              height: '100%'
            }}
          >
            {service.popular && (
              <div style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: service.color,
                color: '#fff',
                padding: '0.2rem 0.8rem',
                borderRadius: '100px',
                fontSize: '0.65rem',
                fontWeight: 900,
                letterSpacing: '1px'
              }}>
                POPULAR
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', marginTop: service.popular ? '1rem' : '0' }}>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 2 }}
                style={{
                  color: service.color,
                  background: `linear-gradient(135deg, ${service.color}25, ${service.color}05)`,
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.5rem',
                  border: `1px solid ${service.color}35`,
                  boxShadow: `0 10px 30px ${service.color}20`,
                  transition: 'all 0.3s ease',
                  flexShrink: 0
                }}
              >
                <service.icon size={24} strokeWidth={2.5} />
              </motion.div>
              <h3 style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', margin: 0, fontWeight: 950, letterSpacing: '-1px', lineHeight: 1.2 }}>{service.name}</h3>
            </div>



            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem', lineHeight: 1.5 }}>
              {service.description}
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {service.tags.map(tag => (
                <span key={tag} style={{ background: 'rgba(255,255,255,0.03)', color: '#fff', padding: '0.3rem 0.8rem', borderRadius: '15px', fontSize: '0.65rem', fontWeight: 700, border: '1px solid rgba(255,255,255,0.08)' }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)', margin: '0 0 1rem' }}></div>

            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem', flex: 1 }}>
              {service.features.map((feature, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.8rem', marginBottom: '0.8rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', alignItems: 'center' }}>
                  <div style={{ background: `${service.color}20`, padding: '0.2rem', borderRadius: '50%', color: service.color, display: 'flex' }}><Check size={12} /></div>
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              to={`/services/${service.id}`}
              style={{
                width: '100%',
                borderRadius: '12px',
                padding: '0.8rem',
                textAlign: 'center',
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: '0.9rem',
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
    { title: 'Discussion', desc: 'Understanding your business needs and project requirements.', color: 'var(--primary)' },
    { title: 'Planning', desc: 'Choosing the right technology and creating a clear project plan.', color: '#7c3aed' },
    { title: 'Development', desc: 'Writing code and building the project with regular updates.', color: '#f472b6' },
    { title: 'Delivery', desc: 'Testing everything properly and launching the project live.', color: '#10b981' },
  ]

  return (
    <section style={{ padding: '4rem 2rem', background: 'rgba(0,0,0,0.2)', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#7c3aed', letterSpacing: '5px', fontWeight: 800 }}>WORKFLOW</span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', marginTop: '1rem', fontWeight: 950 }}>How I <span style={{ background: 'var(--gradient-secondary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Work</span></h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', position: 'relative' }}>
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
    <section style={{ padding: '6rem 2rem 8rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
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
        <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontWeight: 900, marginBottom: '3rem', lineHeight: 1, letterSpacing: '-4px' }}>
          Let's Work <br />
          <span style={{
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradientMove 5s linear infinite',
            backgroundSize: '200% auto'
          }}>Together</span>
        </h2>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.2rem',
          maxWidth: '800px',
          margin: '0 auto 4.5rem',
          lineHeight: 1.8,
          fontWeight: 400
        }}>
          I am currently available for new projects and freelance work.
        </p>

        <Link
          to="/contact"
          className="btn btn-primary"
          style={{
            padding: '1rem 2rem',
            fontSize: '1rem',
            borderRadius: '100px',
            boxShadow: '0 30px 70px rgba(0, 212, 255, 0.4)',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}
        >
          Contact Me <ArrowRight size={24} style={{ marginLeft: '1.5rem' }} />
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
      <SEO 
        title="Premium Software Services" 
        description="High-quality MERN stack, React Native, and Electron.js development services. Build scalable web and mobile applications with Someshwar Holkar."
        keywords="Freelance Software Developer, Web Development Services, Mobile App Development, Website Developer, Application Development, React Native Developer, MERN Stack Services"
        url="/services"
      />
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

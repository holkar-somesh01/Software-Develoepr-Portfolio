import { motion } from 'framer-motion'
import { Github, ExternalLink, Star } from 'lucide-react'

const projects = [
  {
    title: 'Jai Baba Ji Gurukul',
    description: 'Official website for Shree Sant Janardhan Swami School & Gurukul - A Next.js institutional website with admission, gallery, departments, and alumni sections.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    stars: 0,
    repo: 'https://github.com/holkar-somesh01/jaibabajigurukul',
    live: 'https://www.jaibabajigurukul.com',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop',
    isPrivate: true
  },
  {
    title: 'Sandip Sonawane - LIC Agent',
    description: 'Professional portfolio website for LIC Insurance Agent with services, gallery, testimonials, and WhatsApp contact integration.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Responsive'],
    stars: 0,
    repo: 'https://github.com/holkar-somesh01/LIC-Agent-Website',
    live: 'https://www.sandipmsonawane.in/',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop',
    isPrivate: true
  },
  {
    title: 'Jay Bhadra Construction',
    description: 'Construction company website showcasing projects, services, testimonials, and contact information for a building contractor.',
    tech: ['Next.js', 'Tailwind CSS', 'Vercel Deployment'],
    stars: 0,
    repo: 'https://github.com/holkar-somesh01/jaybhadraconstruction',
    live: 'https://jaybhadraconstruction.vercel.app/',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
    isPrivate: true
  },
  {
    title: 'Quick Billing App',
    description: 'A billing and invoice management application for businesses to track transactions.',
    tech: ['React', 'Node.js', 'MongoDB', 'Material UI'],
    stars: 1,
    repo: 'https://github.com/holkar-somesh01/Quick-Billing-App-Frontend',
    live: null,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
  },
  {
    title: 'Human Resource Management',
    description: 'HR management system for employee tracking, attendance, and payroll management.',
    tech: ['MERN Stack', 'JWT', 'Express'],
    stars: 1,
    repo: 'https://github.com/holkar-somesh01/Human-Resource-Management-Backend',
    live: null,
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop'
  }
]

const MyWork = () => {
  return (
    <section id="my-work" style={{ padding: '6rem 2rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '10%', right: '-10%', width: '500px', height: '500px', background: 'var(--primary)', filter: 'blur(200px)', opacity: 0.03, borderRadius: '50%', zIndex: 0 }}></div>
      
      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{ fontSize: '0.8rem', color: 'var(--primary)', letterSpacing: '6px', fontWeight: 800, textTransform: 'uppercase' }}
          >
            PORTFOLIO
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginTop: '1.5rem', fontWeight: 950, letterSpacing: '-2px' }}
          >
            My <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Creative Work</span>
          </motion.h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginTop: '1.5rem', maxWidth: '600px', margin: '1.5rem auto 0' }}>
            A selection of high-impact web applications and software solutions crafted with modern engineering.
          </p>
        </div>

        <div className="work-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '2.5rem' 
        }}>
          <style dangerouslySetInnerHTML={{ __html: `
            @media (max-width: 1200px) {
              .work-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 768px) {
              .work-grid { grid-template-columns: 1fr !important; }
            }
          `}} />
          {projects.map((project, index) => (
            <motion.div 
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="project-card"
              style={{
                background: 'rgba(255,255,255,0.015)',
                border: '1px solid rgba(255,255,255,0.05)',
                overflow: 'hidden',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div style={{ position: 'relative', height: '300px', overflow: 'hidden' }}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} 
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', display: 'flex', gap: '0.8rem' }}>
                  {project.tech.slice(0, 2).map(t => (
                    <span key={t} style={{ background: 'rgba(10,10,15,0.7)', backdropFilter: 'blur(10px)', color: '#fff', padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 700, border: '1px solid rgba(255,255,255,0.1)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ padding: '3rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '2rem', marginBottom: '1.2rem', fontWeight: 900, letterSpacing: '-0.5px' }}>{project.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2.5rem', flex: 1 }}>{project.description}</p>
                
                <div style={{ 
                  display: 'flex', 
                  gap: '1.2rem', 
                  marginTop: 'auto' 
                }}>
                  {project.live && (
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ 
                        flex: 2,
                        padding: '1.2rem', 
                        borderRadius: '18px', 
                        background: 'var(--primary)', 
                        color: '#000', 
                        fontSize: '0.95rem', 
                        fontWeight: 900, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: '0.8rem',
                        textDecoration: 'none',
                        boxShadow: '0 10px 25px rgba(0, 212, 255, 0.25)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 212, 255, 0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 212, 255, 0.25)';
                      }}
                    >
                      <ExternalLink size={18} /> Live Demo
                    </a>
                  )}
                  {project.repo !== '#' && (
                    <div
                      style={{ flex: 1, position: 'relative' }}
                      title={project.isPrivate ? "Source code is private" : "View Source"}
                    >
                      <a 
                        href={project.isPrivate ? undefined : project.repo} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ 
                          width: '100%',
                          padding: '1.2rem', 
                          borderRadius: '18px', 
                          background: project.isPrivate ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)', 
                          color: project.isPrivate ? 'rgba(255,255,255,0.2)' : '#fff', 
                          fontSize: '0.95rem', 
                          fontWeight: 800, 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          gap: '0.8rem',
                          textDecoration: 'none',
                          border: `1px solid ${project.isPrivate ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.1)'}`,
                          transition: 'all 0.3s ease',
                          cursor: project.isPrivate ? 'not-allowed' : 'pointer',
                          pointerEvents: project.isPrivate ? 'none' : 'auto'
                        }}
                        onMouseOver={(e) => {
                          if(!project.isPrivate) e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        }}
                        onMouseOut={(e) => {
                          if(!project.isPrivate) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        }}
                      >
                        <Github size={18} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MyWork
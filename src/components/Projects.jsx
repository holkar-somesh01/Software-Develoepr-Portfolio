import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ExternalLink,
  Github,
  Lock,
  Sparkles,
  Smartphone,
  Globe,
  ArrowUpRight,
  Code2,
  Layers
} from 'lucide-react'

const projects = [
  {
    id: 'gurukul',
    title: 'Jai Baba Ji Gurukul',
    category: 'Web Apps',
    domain: 'Institutional Platform',
    description: 'Official responsive web platform for Shree Sant Janardhan Swami School & Gurukul featuring dynamic admissions inquiries, photo galleries, departmental showcases, and alumni management.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    stars: 0,
    repo: 'https://github.com/holkar-somesh01/jaibabajigurukul',
    live: 'https://www.jaibabajigurukul.com',
    image: 'https://res.cloudinary.com/dqqputx7b/image/upload/v1784460989/Gemini_Generated_Image_ajm7i4ajm7i4ajm7_a8fjsp.png',
    isPrivate: true,
    status: 'live',
    statusLabel: 'Live Website',
    platformTag: 'Next.js 14'
  },
  {
    id: 'ayurdnyanam',
    title: 'Ayurdnyanam',
    category: 'Full Stack',
    domain: 'EdTech & Learning Platform',
    description: 'Comprehensive Ayurvedic educational ecosystem providing verified BAMS handwritten notes, interactive study guides, and video lectures. The web platform is active with mobile app in development.',
    tech: ['React', 'Node.js', 'Express', 'React Native (In Dev)'],
    stars: 0,
    repo: '#',
    live: 'https://ayurdnyanam.com/',
    image: 'https://res.cloudinary.com/dqqputx7b/image/upload/v1784460003/Gemini_Generated_Image_seackpseackpseac_v5c4eb.png',
    isPrivate: false,
    status: 'live',
    statusLabel: 'Live Portal',
    platformTag: 'Full Stack Web'
  },
  {
    id: 'ssinfra',
    title: 'SS Infra Software',
    category: 'Mobile App',
    domain: 'Fleet Management System',
    description: 'Production mobile application engineered for civil infrastructure enterprises enabling real-time heavy construction fleet tracking, operator work logs, machine telemetry, and maintenance records.',
    tech: ['React Native', 'PHP Laravel', 'REST APIs', 'MySQL'],
    stars: 1,
    repo: '#',
    live: 'https://play.google.com/store/apps/details?id=com.ssinfrastructure.app',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop',
    isPrivate: true,
    status: 'playstore',
    statusLabel: 'On Play Store',
    platformTag: 'React Native'
  },
  {
    id: 'jaybhadra',
    title: 'Jay Bhadra Construction',
    category: 'Web Apps',
    domain: 'Corporate Construction Portal',
    description: 'Modern corporate website for a premier infrastructure and building contractor showcasing architectural projects, civil services, client testimonials, and online quote requests.',
    tech: ['Next.js', 'Tailwind CSS', 'Vercel Deployment', 'Framer Motion'],
    stars: 0,
    repo: 'https://github.com/holkar-somesh01/jaybhadraconstruction',
    live: 'https://jaybhadraconstruction.vercel.app/',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
    isPrivate: true,
    status: 'live',
    statusLabel: 'Live Website',
    platformTag: 'Next.js'
  },
  {
    id: 'quickbilling',
    title: 'Quick Billing App',
    category: 'Full Stack',
    domain: 'Point-of-Sale & Invoicing',
    description: 'Full-stack point-of-sale and invoice generation suite allowing businesses to generate GST-compliant tax invoices, track sales transactions, manage stock, and export financial reports.',
    tech: ['React', 'Node.js', 'MongoDB', 'Material UI'],
    stars: 1,
    repo: 'https://github.com/holkar-somesh01/Quick-Billing-App-Frontend',
    live: null,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    isPrivate: false,
    status: 'opensource',
    statusLabel: 'Open Source',
    platformTag: 'MERN Stack'
  },
  {
    id: 'hrm',
    title: 'Human Resource Management',
    category: 'Full Stack',
    domain: 'Enterprise HRMS Platform',
    description: 'Enterprise HR management system featuring end-to-end employee lifecycle tracking, attendance and leave automation, role-based access security, and automated salary payroll processing.',
    tech: ['MERN Stack', 'JWT Auth', 'Express.js', 'MongoDB'],
    stars: 1,
    repo: 'https://github.com/holkar-somesh01/Human-Resource-Management-Backend',
    live: null,
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop',
    isPrivate: false,
    status: 'opensource',
    statusLabel: 'Open Source',
    platformTag: 'Node & Express'
  }
]

const categories = [
  { id: 'all', label: 'All Projects', icon: Layers },
  { id: 'Web Apps', label: 'Web Apps', icon: Globe },
  { id: 'Mobile App', label: 'Mobile Apps', icon: Smartphone },
  { id: 'Full Stack', label: 'Full Stack', icon: Code2 },
]

const ProjectCard = ({ project, index }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const primaryActionUrl = project.live || (project.repo !== '#' && !project.isPrivate ? project.repo : null)
  const isPlayStore = project.status === 'playstore'

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="portfolio-card group"
    >
      {/* Interactive cursor spotlight overlay */}
      <div
        className="portfolio-card-spotlight"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 212, 255, 0.12), transparent 45%)`,
        }}
      />

      {/* Media Image Section */}
      <div className="portfolio-card-media">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="portfolio-card-img"
        />

        {/* Ambient Vignette Gradient */}
        <div className="portfolio-card-media-overlay" />

        {/* Top Floating Badges */}
        <div className="portfolio-card-topbar">
          <div className={`portfolio-status-pill ${project.status === 'live'
            ? 'status-live'
            : project.status === 'playstore'
              ? 'status-playstore'
              : 'status-opensource'
            }`}>
            <span className="pulse-beacon">
              <span className="pulse-beacon-ping" />
              <span className="pulse-beacon-core" />
            </span>
            <span>{project.statusLabel}</span>
          </div>

          <div className="portfolio-category-tag">
            {project.platformTag}
          </div>
        </div>

        {/* Quick View Floating Action on Hover */}
        {primaryActionUrl && (
          <a
            href={primaryActionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="media-quick-preview"
            aria-label={`View ${project.title}`}
          >
            {isPlayStore ? <Smartphone size={16} /> : <ExternalLink size={16} />}
            <span>{isPlayStore ? 'View App' : 'Visit Site'}</span>
            <ArrowUpRight size={15} />
          </a>
        )}
      </div>

      {/* Card Content Body */}
      <div className="portfolio-card-body">
        {/* Domain Label */}
        <div className="portfolio-domain-label">
          <Layers size={13} />
          <span>{project.domain}</span>
        </div>

        {/* Card Title */}
        <div className="portfolio-card-title-row">
          <h3 className="portfolio-card-title">
            {project.title}
          </h3>
          <ArrowUpRight size={20} className="portfolio-card-title-icon" />
        </div>

        {/* Description */}
        <p className="portfolio-card-desc">
          {project.description}
        </p>

        {/* Tech Stack Chips */}
        <div className="portfolio-tech-list">
          {project.tech.map((tech) => (
            <span key={tech} className="tech-chip">
              {tech}
            </span>
          ))}
        </div>

        {/* Card Action Buttons */}
        <div className={`portfolio-card-actions ${!project.live && (project.isPrivate || project.repo === '#') ? 'single-action' : ''}`}>
          {/* Live / Preview / Play Store Button */}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-portfolio-primary"
            >
              {isPlayStore ? <Smartphone size={17} /> : <ExternalLink size={17} />}
              <span>{isPlayStore ? 'Google Play' : 'Live Preview'}</span>
            </a>
          )}

          {/* GitHub / Source Code Button */}
          {project.repo !== '#' && !project.isPrivate ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-portfolio-secondary"
            >
              <Github size={17} />
              <span>Source Code</span>
            </a>
          ) : project.isPrivate ? (
            <div
              className="btn-portfolio-private"
              title="Proprietary source code under client confidentiality"
            >
              <Lock size={15} />
              <span>Private Repo</span>
            </div>
          ) : (
            <div
              className="btn-portfolio-private"
              title="Internal proprietary code"
            >
              <Code2 size={15} />
              <span>Internal System</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const MyWork = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="my-work" className="projects-section">
      {/* Background Ambient Glow Orbs */}
      <div className="projects-ambient-glow-1" />
      <div className="projects-ambient-glow-2" />

      <div className="projects-container">
        {/* Section Header */}
        <div className="projects-header">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="projects-badge"
          >
            <Sparkles size={14} />
            <span>FEATURED WORK</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="projects-title"
          >
            Featured <span className="projects-title-gradient">Projects</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="projects-subtitle"
          >
            A curated showcase of production web platforms, enterprise mobile applications, and scalable full-stack software engineered with modern technologies and clean architecture.
          </motion.p>
        </div>

        {/* Category Filter Badges (Attractive & 100% Responsive) */}
        <div className="projects-filter-container">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id
            const count = cat.id === 'all'
              ? projects.length
              : projects.filter((p) => p.category === cat.id).length
            const Icon = cat.icon

            return (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`filter-badge-btn ${isActive ? 'active' : ''}`}
                aria-pressed={isActive}
              >
                <span className="filter-badge-icon">
                  <Icon size={14} />
                </span>
                <span>{cat.label}</span>
                <span className="filter-badge-count">
                  {count}
                </span>
              </motion.button>
            )
          })}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="projects-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id || project.title}
                project={project}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default MyWork

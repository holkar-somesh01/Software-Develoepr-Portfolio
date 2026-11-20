import { useState, useEffect } from 'react'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { lazy } from 'react'
const HeroCanvas = lazy(() => import('./HeroCanvas'))
import ConsultationModal from './ConsultationModal'

const Hero = () => {
  const [text, setText] = useState('')
  const [isModalOpen, setModalOpen] = useState(false)
  const fullText = 'Website Developer | Mobile App Developer | Freelancer'

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="hero">
      <div className="hero-canvas">
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      </div>
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <h1 className="hero-title">Someshwar Holkar</h1>
        <p className="hero-subtitle">
          <span className="typing-text">{text}</span>
        </p>
        <p className="hero-description">
          I build modern websites, mobile applications, and custom software
          that help startups, businesses, and organizations transform ideas
          into fast, secure, and scalable digital solutions.
        </p>
        <div className="hero-buttons">
          <a href="#my-work" className="btn btn-primary">
            View Projects <ArrowRight size={20} />
          </a>
          <button onClick={() => setModalOpen(true)} className="btn btn-outline cursor-pointer bg-transparent border border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff] hover:text-black">
            Hire Me <Mail size={20} />
          </button>
        </div>
        <div className="social-links">
          <a href={import.meta.env.VITE_GITHUB_URL || 'https://github.com'} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
            <Github size={22} />
          </a>
          <a href={import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com'} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
            <Linkedin size={22} />
          </a>
          {import.meta.env.VITE_CONTACT_EMAIL && (
            <a href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`} className="social-link" aria-label="Email">
              <Mail size={22} />
            </a>
          )}
        </div>
      </motion.div>
      <ConsultationModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}

export default Hero
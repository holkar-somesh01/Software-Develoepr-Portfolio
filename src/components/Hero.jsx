import { useState, useEffect } from 'react'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Scene3D from './Scene3D'

const Hero = () => {
  const [text, setText] = useState('')
  const fullText = 'MERN Stack Developer | React-Native | Freelancer'

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
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </Canvas>
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
          Building scalable web & mobile applications with modern technologies.
          Passionate about creating impactful digital experiences and available for freelance work.
        </p>
        <div className="hero-buttons">
          <Link to="/#projects" className="btn btn-primary">
            View Projects <ArrowRight size={20} />
          </Link>
          <Link to="/contact" className="btn btn-outline">
            Contact Me <Mail size={20} />
          </Link>
        </div>
        <div className="social-links">
          <a href="https://github.com/holkar-somesh01" target="_blank" rel="noopener noreferrer" className="social-link">
            <Github size={22} />
          </a>
          <a href="https://www.linkedin.com/in/someshwar-holkar-819503314/" target="_blank" rel="noopener noreferrer" className="social-link">
            <Linkedin size={22} />
          </a>
          <a href="mailto:someshwarsholkar22@gmail.com" className="social-link">
            <Mail size={22} />
          </a>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
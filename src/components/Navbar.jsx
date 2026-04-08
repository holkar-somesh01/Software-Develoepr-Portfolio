import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Github, Linkedin, Mail, Instagram, ArrowRight, Home,
  User, Briefcase, Code, Cpu, MessageSquare, Menu
} from 'lucide-react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : 'auto'
  }

  const closeMenu = () => {
    setMobileMenuOpen(false)
    document.body.style.overflow = 'auto'
  }

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/#about', icon: User },
    { name: 'Experience', href: '/#experience', icon: Briefcase },
    { name: 'Skills', href: '/#skills', icon: Code },
    { name: 'My Work', href: '/#my-work', icon: Cpu },
    { name: 'Services', href: '/services', icon: Briefcase },
  ]

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/holkar-somesh01', icon: Github },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/someshwar-holkar-819503314/', icon: Linkedin },
    { name: 'Instagram', url: 'https://www.instagram.com/soma_patil.24', icon: Instagram },
    { name: 'Email', url: 'mailto:someshwarsholkar22@gmail.com', icon: Mail },
  ]

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Link to="/" className="nav-logo">
          <span className="logo-icon">{'</>'}</span>
          <span className="logo-text">Someshwar</span>
        </Link>

        <div className="desktop-nav-container">
          <ul className="nav-links desktop-nav">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link to={item.href} className="nav-link">{item.name}</Link>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="nav-btn hide-on-mobile">
            Contact Me <MessageSquare size={16} />
          </Link>
        </div>

        <button
          className="mobile-toggle-btn"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <Menu size={28} color="white" />
        </button>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />
            <motion.div
              className="mobile-menu"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mobile-menu-header">
                <Link to="/" className="mobile-logo" onClick={closeMenu}>
                  <span className="logo-icon">{'</>'}</span>
                  <span className="logo-text">SH</span>
                </Link>
                <button className="close-btn" onClick={closeMenu}>✕</button>
              </div>

              <div className="mobile-nav-container">
                <ul className="mobile-nav-links">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Link
                        to={item.href}
                        className="mobile-nav-link"
                        onClick={closeMenu}
                      >
                        <span className="nav-link-icon">{<item.icon size={20} />}</span>
                        {item.name}
                        <ArrowRight className="arrow-icon" size={16} />
                      </Link>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + navItems.length * 0.05 }}
                  >
                    <Link
                      to="/contact"
                      className="mobile-nav-link contact-highlight"
                      onClick={closeMenu}
                    >
                      <span className="nav-link-icon"><MessageSquare size={20} /></span>
                      Contact
                      <ArrowRight className="arrow-icon" size={16} />
                    </Link>
                  </motion.li>
                </ul>

                <div className="mobile-menu-footer">
                  <div className="menu-footer-social">
                    {socialLinks.map((link, idx) => (
                      <motion.a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-social-icon"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <link.icon size={20} />
                      </motion.a>
                    ))}
                  </div>
                  <p>Let's build something amazing together!</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
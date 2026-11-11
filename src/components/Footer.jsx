import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, MapPin, Globe, Instagram } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || ''
  const contactLocation = import.meta.env.VITE_CONTACT_LOCATION || 'Aurangabad, Maharashtra'
  const ownerName = import.meta.env.VITE_OWNER_NAME || 'Someshwar Holkar'
  const githubUrl = import.meta.env.VITE_GITHUB_URL || 'https://github.com'
  const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com'
  const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL || 'https://instagram.com'

  const socialLinks = [
    { name: 'GitHub', url: githubUrl, icon: Github },
    { name: 'LinkedIn', url: linkedinUrl, icon: Linkedin },
    { name: 'Email', url: `mailto:${contactEmail}`, icon: Mail },
    { name: 'Instagram', url: instagramUrl, icon: Instagram },
  ]

  const quickLinks = [
    { name: 'Experience', url: '/#experience' },
    { name: 'Services', url: '/services' },
    { name: 'Privacy Policy', url: '/privacy-policy' },
    { name: 'Contact', url: '/contact' },
  ]

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <img src="/logos/ai-logo.png" className="logo-img-footer" alt="AI Logo" />
            <div className="footer-logo-text">
              <span className="logo-text">SH</span>
              <span className="logo-tagline">{ownerName}</span>
            </div>
          </div>
          <p className="footer-bio">
            MERN Stack Developer | React-Native Developer | Freelancer
            Building modern web and mobile applications with cutting-edge technologies.
          </p>
          <div className="footer-social">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label={link.name}
              >
                {typeof link.icon === 'string' ? link.icon : <link.icon size={18} />}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            {quickLinks.map((link) => (
              <li key={link.name}>
                {link.url.startsWith('/') ? (
                  <Link to={link.url}>{link.name}</Link>
                ) : (
                  <a href={link.url}>{link.name}</a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Contact Info</h4>
          <div className="footer-contact">
            {contactEmail && (
              <a href={`mailto:${contactEmail}`} className="contact-item">
                <Mail size={16} /> {contactEmail}
              </a>
            )}
            {contactLocation && (
              <span className="contact-item">
                <MapPin size={16} /> {contactLocation}
              </span>
            )}
            <span className="contact-item">
              <Globe size={16} /> Available for Freelance Work
            </span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} Someshwar Holkar. All rights reserved.</p>
        <p className="built-with">Built with <span>❤️</span> by Someshwar</p>
      </div>
    </footer>
  )
}

export default Footer
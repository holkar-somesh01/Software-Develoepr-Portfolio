import { motion } from 'framer-motion'
import { GitBranch, Star, Users, Github, Code2, Rocket, Brain, Smartphone } from 'lucide-react'

const About = () => {
  const stats = [
    { label: 'Repositories', value: '51+', icon: GitBranch, color: '#00d4ff' },
    { label: 'Stars Earned', value: '16+', icon: Star, color: '#7c3aed' },
    { label: 'Followers', value: '4+', icon: Users, color: '#f472b6' },
    { label: 'Open Source', value: '100+', icon: Github, color: '#10b981' },
  ]

  const expertise = [
    { title: 'Web Architect', icon: Code2, desc: 'Crafting complex MERN stack solutions' },
    { title: 'Mobile Dev', icon: Smartphone, desc: 'Building cross-platform React Native apps' },
    { title: 'Algorithmist', icon: Brain, desc: 'Optimizing through advanced DSA' },
    { title: 'Visionary', icon: Rocket, desc: 'Deploying scalable microservices' },
  ]

  return (
    <section id="about" className="section about-section">
      <div className="about-container">
        <motion.div 
          className="about-visual"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="image-wrapper">
            <div className="image-glow"></div>
            <img 
              src="https://avatars.githubusercontent.com/u/172102268?v=4" 
              alt="Someshwar Holkar" 
              className="avatar"
            />
            <div className="experience-badge">
              <span className="years">2+</span>
              <span className="text">Years of<br/>Experience</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="about-text"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="section-tag">About Me</span>
          <h2 className="about-title">Architecting Digital <br/><span>Masterpieces</span></h2>
          <p className="about-description">
            I'm a full-stack engineer driven by the challenge of transforming complex problems 
            into elegant digital experiences. My expertise lies at the intersection of 
            robust backends and fluid, high-performance frontends.
          </p>

          <div className="expertise-grid">
            {expertise.map((item, index) => (
              <div key={index} className="expertise-item">
                <div className="expertise-icon">
                  <item.icon size={20} />
                </div>
                <div className="expertise-info">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="stat-card"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="stat-icon" style={{ color: stat.color }}>
                  <stat.icon size={24} />
                </div>
                <div className="stat-content">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-name">{stat.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
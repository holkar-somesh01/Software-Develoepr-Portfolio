import { motion } from 'framer-motion'

const skills = [
  {
    name: 'React.js',
    description: 'Building dynamic UIs with hooks, context, and state management',
    icon: 'https://skillicons.dev/icons?i=react'
  },
  {
    name: 'Node.js',
    description: 'Server-side JavaScript runtime for APIs and microservices',
    icon: 'https://skillicons.dev/icons?i=nodejs'
  },
  {
    name: 'Express.js',
    description: 'Fast, minimalist web framework for Node.js',
    icon: 'https://skillicons.dev/icons?i=express'
  },
  {
    name: 'MongoDB',
    description: 'Flexible NoSQL database for modern applications',
    icon: 'https://skillicons.dev/icons?i=mongodb'
  },
  {
    name: 'TypeScript',
    description: 'Typed superset of JavaScript for better development',
    icon: 'https://skillicons.dev/icons?i=ts'
  },
  {
    name: 'React Native',
    description: 'Cross-platform mobile app development',
    icon: 'https://skillicons.dev/icons?i=react'
  },
  {
    name: 'Firebase',
    description: 'Backend-as-a-service for authentication & databases',
    icon: 'https://skillicons.dev/icons?i=firebase'
  },
  {
    name: 'Electron.js',
    description: 'Build desktop apps with web technologies',
    icon: 'https://skillicons.dev/icons?i=electron'
  },
  {
    name: 'Security',
    description: 'Implementing secure server infrastructure and auth',
    icon: 'https://img.icons8.com/fluency/144/shield.png'
  },
  {
    name: 'CI/CD',
    description: 'Automated workflows for deployment and testing',
    icon: 'https://skillicons.dev/icons?i=githubactions'
  },
]

const Skills = () => {
  return (
    <section id="skills" className="section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        My <span>Skills</span>
      </motion.h2>
      <p className="section-subtitle">
        Technologies I work with to bring ideas to life
      </p>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="skill-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="skill-icon" style={{
              width: '60px', height: '60px', marginBottom: '1.5rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <img src={skill.icon} alt={skill.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <h3 className="skill-name">{skill.name}</h3>
            <p className="skill-description">{skill.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Skills
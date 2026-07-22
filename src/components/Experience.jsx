import { motion } from 'framer-motion'

const experiences = [
  {
    company: 'Inficom Solutions',
    role: 'Software Developer',
    duration: '16 December 2025 – Present',
    description: 'Working as a Software Developer, contributing to the development of modern web applications, mobile applications, and scalable backend systems. Responsible for designing, developing, maintaining, and optimizing software solutions while following clean architecture, industry best practices, and performance-focused development.',
    isCurrent: true,
    badge: 'Current Role',
    position: 'left'
  },
  {
    company: 'Devanta Tech',
    role: 'Full Stack Developer',
    duration: '07 August 2025 – 11 December 2025',
    description: 'Worked as a Full Stack Developer, contributing to real-world software projects by developing responsive frontend interfaces, backend APIs, and database-driven features. Collaborated with the development team to deliver reliable, scalable, and user-focused applications.',
    isCurrent: false,
    badge: 'Aug 2025 – Dec 2025',
    position: 'right'
  },
  {
    company: 'SkillHub IT Solutions',
    role: 'Web Development Intern',
    duration: '01 July 2024 – 31 July 2025',
    description: 'Successfully completed a one-year web development internship focused on modern frontend and backend technologies. Gained practical experience by building responsive web applications, working with databases, collaborating on development tasks, and following professional software development workflows.',
    isCurrent: false,
    badge: 'Jul 2024 – Jul 2025',
    position: 'left'
  }
]

const Experience = () => {
  return (
    <section id="experience" className="section experience-section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Professional <span>Experience</span>
      </motion.h2>
      <p className="section-subtitle">
        Building modern software through internships, professional roles, and real-world development experience.
      </p>

      <div className="timeline">
        <div className="timeline-line"></div>

        {experiences.map((exp, index) => (
          <motion.div
            key={exp.company}
            className={`timeline-item ${exp.position} ${exp.isCurrent ? 'current' : ''}`}
            initial={{ opacity: 0, x: exp.position === 'left' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <div className="timeline-node">
              <div className={`node-dot ${exp.isCurrent ? 'active' : ''}`}></div>
            </div>
            <div className="timeline-content">
              <div className="exp-header">
                <h3 className="exp-role">{exp.role}</h3>
                <span className="exp-duration">{exp.duration}</span>
              </div>
              <h4 className="exp-company">{exp.company}</h4>
              <p className="exp-description">{exp.description}</p>
              {exp.badge && <span className="current-badge">{exp.badge}</span>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Experience
import { motion } from 'framer-motion'

const experiences = [
  {
    company: 'Inficom Solutions',
    role: 'Software Developer',
    duration: 'Present',
    description: 'Currently working as a Software Developer, building modern web and mobile applications using MERN stack and React Native.',
    isCurrent: true,
    position: 'left'
  },
  {
    company: 'Devanta Tech',
    role: 'Full Stack Developer Intern',
    duration: '6 Months',
    description: 'Worked as a Full Stack Developer Intern. Gained hands-on experience with MERN stack development and real-world project implementation.',
    isCurrent: false,
    position: 'right'
  },
  {
    company: 'SkillHub IT Solutions',
    role: 'Internship',
    duration: '12 Months',
    description: 'Completed 1-year internship program in web development. Learned modern technologies including React, Node.js, and MongoDB.',
    isCurrent: false,
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
        My <span>Experience</span>
      </motion.h2>
      <p className="section-subtitle">
        Professional journey through my career
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
              {exp.isCurrent && <span className="current-badge">Current</span>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Experience
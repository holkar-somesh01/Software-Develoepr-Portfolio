import { motion } from 'framer-motion'
import { GitBranch, Star, Users, Github, Code2, Rocket, Brain, Smartphone, Briefcase, Award } from 'lucide-react'

const About = () => {
  const stats = [
    {
      label: "Projects Completed",
      value: "5+",
      icon: Briefcase,
      color: "#00d4ff",
    },
    {
      label: "Technologies",
      value: "20+",
      icon: Code2,
      color: "#7c3aed",
    },
    {
      label: "Happy Clients",
      value: "4+",
      icon: Users,
      color: "#f472b6",
    },
    {
      label: "Years of Experience",
      value: "2+",
      icon: Award,
      color: "#10b981",
    },
  ];
  const expertise = [
    {
      title: "Website Development",
      icon: Code2,
      desc: "Building fast, responsive, and SEO-friendly websites for businesses and brands.",
    },
    {
      title: "Mobile App Development",
      icon: Smartphone,
      desc: "Creating modern cross-platform mobile applications with smooth user experiences.",
    },
    {
      title: "Custom Software",
      icon: Brain,
      desc: "Developing tailored software solutions to solve real business challenges.",
    },
    {
      title: "Backend & APIs",
      icon: Rocket,
      desc: "Building secure APIs and scalable backend systems for modern applications.",
    },
  ];

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
              loading="lazy"
              decoding="async"
              className="avatar"
            />
            <div className="experience-badge">
              <span className="years">2+</span>
              <span className="text">Years of<br />Experience</span>
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
          <h2 className="about-title">Helping Businesses to <br /><span>Build Better Software</span></h2>
          <p className="about-description">
            I build modern websites, mobile applications, and custom software that help startups, businesses, and organizations transform ideas into secure, scalable, and high-performance digital solutions. My focus is on delivering clean architecture, excellent user experience, and reliable software built for long-term growth.
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
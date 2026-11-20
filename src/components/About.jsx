import { motion } from 'framer-motion'
import { Users, Code2, Rocket, Brain, Smartphone, Briefcase, Award, Sparkles, CheckCircle2 } from 'lucide-react'
import profile from '../../public/profile.png'

const About = () => {
  const stats = [
    {
      label: "Projects Completed",
      value: "5+",
      icon: Briefcase,
      color: "#00d4ff",
      gradient: "from-cyan-400 via-sky-400 to-blue-500",
      glow: "rgba(0, 212, 255, 0.35)",
    },
    {
      label: "Technologies",
      value: "20+",
      icon: Code2,
      color: "#a78bfa",
      gradient: "from-purple-400 via-indigo-400 to-violet-500",
      glow: "rgba(167, 139, 250, 0.35)",
    },
    {
      label: "Happy Clients",
      value: "4+",
      icon: Users,
      color: "#f472b6",
      gradient: "from-pink-400 via-rose-400 to-red-400",
      glow: "rgba(244, 114, 182, 0.35)",
    },
    {
      label: "Years of Experience",
      value: "2+",
      icon: Award,
      color: "#34d399",
      gradient: "from-emerald-400 via-teal-400 to-cyan-500",
      glow: "rgba(52, 211, 153, 0.35)",
    },
  ];

  const expertise = [
    {
      title: "Website Development",
      icon: Code2,
      desc: "Building fast, responsive, and SEO-friendly websites for businesses and brands.",
      color: "#00d4ff",
      badge: "Web & Frontend",
      glow: "rgba(0, 212, 255, 0.2)",
    },
    {
      title: "Mobile App Development",
      icon: Smartphone,
      desc: "Creating modern cross-platform mobile applications with smooth user experiences.",
      color: "#818cf8",
      badge: "iOS & Android",
      glow: "rgba(129, 140, 248, 0.2)",
    },
    {
      title: "Custom Software",
      icon: Brain,
      desc: "Developing tailored software solutions to solve real business challenges.",
      color: "#f472b6",
      badge: "Architecture",
      glow: "rgba(244, 114, 182, 0.2)",
    },
    {
      title: "Backend & APIs",
      icon: Rocket,
      desc: "Building secure APIs and scalable backend systems for modern applications.",
      color: "#10b981",
      badge: "Cloud & APIs",
      glow: "rgba(16, 185, 129, 0.2)",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 260,
      },
    },
  };

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
              src={profile}
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

          {/* Attractive & Animated Expertise Cards */}
          <motion.div 
            className="expertise-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                className="expertise-card group"
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                style={{ '--accent-color': item.color, '--accent-glow': item.glow }}
              >
                {/* Ambient back-glow on hover */}
                <div 
                  className="expertise-card-glow pointer-events-none" 
                  style={{ background: `radial-gradient(circle at 30% 30%, ${item.glow} 0%, transparent 70%)` }}
                />

                <div className="expertise-card-header">
                  <div 
                    className="expertise-icon-wrap" 
                    style={{ 
                      color: item.color, 
                      backgroundColor: `${item.color}15`, 
                      borderColor: `${item.color}40`,
                      boxShadow: `0 0 16px ${item.color}25`
                    }}
                  >
                    <item.icon size={20} className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                  </div>
                  <span 
                    className="expertise-badge"
                    style={{ 
                      color: item.color, 
                      backgroundColor: `${item.color}12`, 
                      borderColor: `${item.color}30` 
                    }}
                  >
                    {item.badge}
                  </span>
                </div>

                <div className="expertise-card-body">
                  <h4 className="expertise-title group-hover:text-white transition-colors">
                    {item.title}
                  </h4>
                  <p className="expertise-desc">
                    {item.desc}
                  </p>
                </div>

                {/* Subtle bottom accent line */}
                <div 
                  className="expertise-accent-line"
                  style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Attractive & Animated Stat Cards */}
          <motion.div 
            className="stats-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card group"
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                style={{ '--stat-color': stat.color, '--stat-glow': stat.glow }}
              >
                {/* Ambient top highlight stripe */}
                <div 
                  className="stat-highlight-stripe"
                  style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
                />

                {/* Stat Icon */}
                <div 
                  className="stat-icon-wrap"
                  style={{ 
                    color: stat.color, 
                    backgroundColor: `${stat.color}14`, 
                    borderColor: `${stat.color}35`,
                    boxShadow: `0 0 18px ${stat.color}25`
                  }}
                >
                  <stat.icon size={22} className="transition-transform duration-300 group-hover:scale-115" />
                </div>

                {/* Stat Content */}
                <div className="stat-content">
                  <span 
                    className="stat-value"
                    style={{
                      textShadow: `0 0 24px ${stat.color}40`,
                    }}
                  >
                    {stat.value}
                  </span>
                  <span className="stat-name">{stat.label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
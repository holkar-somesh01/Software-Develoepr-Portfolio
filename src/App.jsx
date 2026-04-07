import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import MyWork from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ServicesPage from './ServicesPage'
import ServiceDetailPage from './ServiceDetailPage'
import PrivacyPolicyPage from './PrivacyPolicyPage'
import ScrollToTop from './components/ScrollToTop'
import ContactPage from './ContactPage'

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <About />
            <Experience />
            <Skills />
            <MyWork />
            <Contact />
          </>
        } />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:id" element={<ServiceDetailPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
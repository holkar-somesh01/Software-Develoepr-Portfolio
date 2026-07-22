import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import SEO from './components/SEO'
import ScrollToTop from './components/ScrollToTop'

const About = lazy(() => import('./components/About'))
const Experience = lazy(() => import('./components/Experience'))
const Skills = lazy(() => import('./components/Skills'))
const MyWork = lazy(() => import('./components/Projects'))
const Contact = lazy(() => import('./components/Contact'))

const ServicesPage = lazy(() => import('./ServicesPage'))
const ServiceDetailPage = lazy(() => import('./ServiceDetailPage'))
const PrivacyPolicyPage = lazy(() => import('./PrivacyPolicyPage'))
const ContactPage = lazy(() => import('./ContactPage'))

function App() {
  return (
    <>
      <SEO />
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', color: 'var(--primary)' }}>Loading...</div>}>
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
      </Suspense>
      <Footer />
    </>
  )
}

export default App
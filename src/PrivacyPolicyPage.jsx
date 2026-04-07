import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, ArrowLeft, Check, Lock, Eye, Zap } from 'lucide-react'
import { useEffect } from 'react'

const PrivacyPolicyPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const lastUpdated = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

    const sections = [
        {
            title: 'Introduction',
            icon: <Shield className="text-primary" size={24} />,
            content: 'We take your privacy seriously and are committed to protecting the personal information you share with us. This Privacy Policy describes how we collect, use, and safeguard your data when you visit our website or use our services.'
        },
        {
            title: 'Information Collection',
            icon: <Lock className="text-secondary" size={24} />,
            content: 'We may collect personal information such as your name, email address, and phone number when you contact us for services or inquiries. We also collect usage data through cookies to improve our website experience.'
        },
        {
            title: 'How We Use Your Data',
            icon: <Eye className="text-accent" size={24} />,
            content: 'Your data is used solely for providing software development services, responding to your requests, and improving our internal processes. We do not sell or share your personal information with third parties for marketing purposes.'
        },
        {
            title: 'Data Security',
            icon: <Zap className="text-primary" size={24} />,
            content: 'We implement industry-standard security measures, including SSL encryption and secure server infrastructure, to protect your data from unauthorized access, disclosure, or alteration.'
        }
    ]

    return (
        <div className="privacy-policy-page" style={{ backgroundColor: 'var(--bg-primary)', color: 'white', minHeight: '100vh' }}>


            <header style={{ paddingTop: '10rem', paddingBottom: '4rem', textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Privacy <span>Policy</span></h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Last updated: {lastUpdated}</p>
                </motion.div>
            </header>

            <main style={{ padding: '0 2rem 8rem', maxWidth: '800px', margin: '0 auto' }}>
                <motion.div
                    className="policy-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {sections.map((section, index) => (
                        <div key={index} style={{ marginBottom: '3rem', background: 'var(--card-bg)', border: '1px solid var(--card-border)', padding: '2.5rem', borderRadius: '24px' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <div style={{ background: 'rgba(0, 212, 255, 0.1)', padding: '1rem', borderRadius: '16px' }}>
                                    {section.icon}
                                </div>
                                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{section.title}</h2>
                            </div>
                            <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                                {section.content}
                            </p>
                        </div>
                    ))}

                    <div style={{ padding: '2rem', borderTop: '1px solid var(--card-border)', textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>If you have any questions about this Privacy Policy, please contact us.</p>
                        <a href="mailto:someshwarsholkar22@gmail.com" className="btn btn-outline">
                            Contact Us
                        </a>
                    </div>
                </motion.div>
            </main>


        </div>
    )
}



export default PrivacyPolicyPage

import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url, type = 'website' }) => {
  const siteName = 'Someshwar Holkar | Full Stack Developer';
  const defaultDescription = 'Professional Portfolio of Someshwar Holkar - MERN Stack Developer, React-Native Developer, and Freelancer. Expertise in React.js, Node.js, MongoDB, and Electron.js.';
  const defaultKeywords = 'Someshwar Holkar, Somesh Holkar, MERN Stack Developer, React Developer, Node.js Developer, Electron.js Developer, Portfolio, Freelance Developer, Web Development, India';
  const defaultUrl = 'https://someshwarholkar.vercel.app'; // Valid Vercel domain
  const defaultImage = '/og-image.png'; // Make sure to provide a real image path later

  const seoTitle = title ? `${title} | ${siteName}` : siteName;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;
  const seoUrl = url ? `${defaultUrl}${url}` : defaultUrl;
  const seoImage = image ? `${defaultUrl}${image}` : `${defaultUrl}${defaultImage}`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content="Someshwar Holkar" />
      <link rel="canonical" href={seoUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:creator" content="@soma_patil.24" />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Someshwar Holkar",
          "jobTitle": "Full Stack Developer",
          "url": defaultUrl,
          "sameAs": [
            "https://github.com/holkar-somesh01",
            "https://linkedin.com/in/someshwar-holkar-819503314",
            "https://instagram.com/soma_patil.24"
          ],
          "knowsAbout": ["React.js", "Node.js", "MongoDB", "Express.js", "React Native", "Electron.js", "RabbitMQ", "Redis", "MERN Stack"],
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Aurangabad",
            "addressRegion": "Maharashtra",
            "addressCountry": "India"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;

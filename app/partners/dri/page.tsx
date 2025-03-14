import Link from 'next/link';

export default function PartnerDetail() {
  return (
    <div className="partner-detail">
      <div className="partner-header">
        <img 
          src="/logos/dri-logo.jpg" 
          alt="Desert Research Institute Logo" 
          className="partner-logo"
        />
        <h1 className="partner-name">Desert Research Institute</h1>
      </div>
      
      <div className="partner-section">
        <h2>About DRI</h2>
        <p>
          The Desert Research Institute (DRI) is a recognized world leader in investigating the effects 
          of natural and human-induced environmental change and advancing technologies aimed at assessing 
          a changing planet. For more than 50 years, DRI has applied scientific understanding to support 
          the effective management of natural resources while meeting Nevada's needs for economic 
          diversification and science-based educational opportunities.
        </p>
      </div>
      
      <div className="partner-section">
        <h2>Partnership with SWSIE</h2>
        <p>
          As a founding partner of the Southwest Sustainability Innovation Engine, DRI contributes expertise
          in climate science, hydrology, and environmental monitoring. Our collaborative research focuses on
          water resource management, air quality assessment, and renewable energy integration in desert environments.
        </p>
      </div>
      
      <div className="partner-section">
        <h2>Contact Information</h2>
        <div className="contact-info">
          <p><strong>Address:</strong> 2215 Raggio Parkway, Reno, NV 89512</p>
          <p><strong>Phone:</strong> (775) 673-7300</p>
          <p><strong>Website:</strong> <a href="https://www.dri.edu" target="_blank" rel="noopener noreferrer">www.dri.edu</a></p>
          <p><strong>Email:</strong> info@dri.edu</p>
        </div>
      </div>
      
      <div className="partner-section">
        <h2>Current Projects</h2>
        <ul className="project-list">
          <li>Western Regional Climate Center</li>
          <li>Nevada Water Resources Research Institute</li>
          <li>Clean Energy Center</li>
          <li>Applied Innovation Center for Advanced Analytics</li>
        </ul>
      </div>
      
      <Link href="/" className="back-link">
        Back to Home
      </Link>
    </div>
  );
}

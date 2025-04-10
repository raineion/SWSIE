"use client"

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUserFriends, FaInfoCircle, FaChartPie, FaHandshake, FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="homepage-content">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={{
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto 40px'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 700,
            marginBottom: '1rem',
            color: '#222'
          }}>
            Southwest Sustainability Innovation Engine Partner Directory
          </h1>
          <p style={{ 
            fontSize: '1.2rem',
            lineHeight: 1.6,
            color: '#555'
          }}>
            Connecting partners across academia, industry, government, and communities to drive innovation for sustainable development in the Southwest region.
          </p>
        </div>
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}
      >
        {/* Partners Card */}
        <div 
          onClick={() => router.push('/partners')}
          style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.12)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
          }}
        >
          <div style={{ color: '#0066cc', marginBottom: '20px' }}>
            <FaUserFriends size={40} />
          </div>
          <h2 style={{ 
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '15px',
            color: '#222'
          }}>
            Our Partners
          </h2>
          <p style={{ 
            flex: 1,
            fontSize: '1rem',
            color: '#555',
            lineHeight: 1.6,
            marginBottom: '20px'
          }}>
            Discover our network of partners from various sectors working together towards sustainability innovation in the Southwest region.
          </p>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            color: '#0066cc',
            fontWeight: 600 
          }}>
            View Partners <FaArrowRight size={16} />
          </div>
        </div>

        {/* About Card */}
        <div 
          onClick={() => router.push('/about')}
          style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.12)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
          }}
        >
          <div style={{ color: '#4caf50', marginBottom: '20px' }}>
            <FaInfoCircle size={40} />
          </div>
          <h2 style={{ 
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '15px',
            color: '#222'
          }}>
            About Us
          </h2>
          <p style={{ 
            flex: 1,
            fontSize: '1rem',
            color: '#555',
            lineHeight: 1.6,
            marginBottom: '20px'
          }}>
            Learn about our mission, vision, and how the Southwest Sustainability Innovation Engine is driving positive change.
          </p>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            color: '#4caf50',
            fontWeight: 600 
          }}>
            Learn More <FaArrowRight size={16} />
          </div>
        </div>

        {/* Impact Maps Card */}
        <div 
          onClick={() => router.push('/analytics')}
          style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.12)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
          }}
        >
          <div style={{ color: '#ff9800', marginBottom: '20px' }}>
            <FaChartPie size={40} />
          </div>
          <h2 style={{ 
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '15px',
            color: '#222'
          }}>
            Impact Maps
          </h2>
          <p style={{ 
            flex: 1,
            fontSize: '1rem',
            color: '#555',
            lineHeight: 1.6,
            marginBottom: '20px'
          }}>
            Explore visualization of our partners' impact across the Southwest region through interactive maps and data.
          </p>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            color: '#ff9800',
            fontWeight: 600 
          }}>
            View Impact <FaArrowRight size={16} />
          </div>
        </div>

        {/* Benefits Card */}
        <div 
          onClick={() => router.push('/partnership-benefits')}
          style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.12)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
          }}
        >
          <div style={{ color: '#e91e63', marginBottom: '20px' }}>
            <FaHandshake size={40} />
          </div>
          <h2 style={{ 
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '15px',
            color: '#222'
          }}>
            Partnership Benefits
          </h2>
          <p style={{ 
            flex: 1,
            fontSize: '1rem',
            color: '#555',
            lineHeight: 1.6,
            marginBottom: '20px'
          }}>
            Discover the advantages of partnering with the Southwest Sustainability Innovation Engine for your organization.
          </p>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            color: '#e91e63',
            fontWeight: 600 
          }}>
            See Benefits <FaArrowRight size={16} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

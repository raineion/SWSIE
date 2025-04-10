"use client";

import React, { useState } from "react";
import Layout from '../components/Layout';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion'; // Add framer-motion import
import { FaEnvelope, FaArrowRight, FaHandshake, FaMoneyBillWave, FaLightbulb, 
         FaNetworkWired, FaExchangeAlt, FaAward } from 'react-icons/fa';

export default function PartnershipBenefitsPage() {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  
  // Add state to track which card is being hovered
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Benefits data with icons and colors
  const benefits = [
    {
      title: "Strategic Collaborations",
      description: "Connect with academic institutions, research centers, and industry leaders to form powerful partnerships that drive innovation.",
      icon: <FaHandshake />,
      color: "#0066cc"
    },
    {
      title: "Funding Opportunities",
      description: "Access to grants, investment capital, and shared resources to accelerate research and development initiatives.",
      icon: <FaMoneyBillWave />,
      color: "#4caf50"
    },
    {
      title: "Innovation Support",
      description: "Leverage cutting-edge facilities, expertise, and technologies to develop solutions to complex sustainability challenges.",
      icon: <FaLightbulb />,
      color: "#ff9800"
    },
    {
      title: "Network Expansion",
      description: "Join a thriving ecosystem of innovators, researchers, and industry experts committed to advancing sustainability in the Southwest.",
      icon: <FaNetworkWired />,
      color: "#9c27b0"
    },
    {
      title: "Knowledge Transfer",
      description: "Share and gain valuable insights, best practices, and research findings to advance your organization's sustainability goals.",
      icon: <FaExchangeAlt />,
      color: "#e91e63"
    },
    {
      title: "Recognition & Visibility",
      description: "Gain recognition for your sustainability efforts and increased visibility within the industry and among potential collaborators.",
      icon: <FaAward />,
      color: "#00bcd4"
    }
  ];

  // Handle email click
  const handleContactClick = () => {
    window.location.href = 'mailto:swsie@asu.edu?subject=Partnership%20Inquiry';
  };

  // Define animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  return (
    <Layout>
      <PageTransition>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}
        >
          {/* GUARANTEED VISIBLE TITLE - no gradient effects that might break */}
          <motion.h1 
            variants={itemVariants}
            style={{ 
              fontSize: '2.5rem', 
              fontWeight: 700, 
              textAlign: 'center', 
              marginBottom: '1.5rem',
              color: 'black',
              position: 'relative',
              zIndex: 5
            }}
          >
            Partnership Benefits
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            style={{ 
              textAlign: 'center', 
              maxWidth: '800px', 
              margin: '0 auto 40px',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              color: 'black'
            }}
          >
            Joining the Southwest Sustainability Innovation Engine as a partner provides numerous advantages for organizations of all types and sizes.
          </motion.p>
          
          {/* Enhanced Benefits Grid with hover effects and visual elements */}
          <motion.div 
            variants={itemVariants}
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '25px',
              marginBottom: '50px'
            }}
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                custom={index}
                whileHover={{ 
                  y: -8, 
                  boxShadow: `0 15px 30px rgba(0, 0, 0, 0.12), 0 0 0 2px ${benefit.color}20`
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: 'white',
                  padding: '30px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  cursor: 'default',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Decorative background element */}
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '140px',
                  height: '140px',
                  borderRadius: '70px',
                  background: `${benefit.color}08`,
                  zIndex: 0,
                  transition: 'all 0.3s ease',
                  transform: hoveredCard === index ? 'scale(1.2)' : 'scale(1)'
                }} />
                
                {/* Icon with colored background */}
                <div style={{ 
                  background: `${benefit.color}15`, 
                  color: benefit.color,
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  marginBottom: '20px',
                  transition: 'all 0.3s ease',
                  transform: hoveredCard === index ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {benefit.icon}
                </div>
                
                <h2 style={{ 
                  marginBottom: '15px',
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  position: 'relative',
                  zIndex: 1,
                  transition: 'all 0.3s ease',
                  color: hoveredCard === index ? benefit.color : '#222'
                }}>
                  {benefit.title}
                </h2>
                
                <p style={{ 
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: '#555',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Updated yellow accent section */}
          <motion.div 
            variants={itemVariants}
            style={{ 
              marginTop: '50px', 
              textAlign: 'center', 
              padding: '40px',
              background: '#FFF9C4',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              border: '1px solid #FFD600'
            }}
          >
            <h2 style={{ 
              fontSize: '2.2rem', 
              fontWeight: 700, 
              marginBottom: '20px',
              color: '#222'
            }}>
              Ready to Make an Impact?
            </h2>
            
            <p style={{ 
              fontSize: '1.1rem',
              lineHeight: '1.6',
              color: '#444',
              maxWidth: '700px',
              margin: '0 auto 30px',
              fontWeight: '400'
            }}>
              Join the Southwest Sustainability Innovation Engine and be part of a collaborative 
              effort to create sustainable solutions for our region and beyond. Contact us today to 
              explore partnership opportunities.
            </p>
            
            {/* YELLOW button with no black outline */}
            <button
              onClick={() => window.location.href = 'mailto:swsie@asu.edu?subject=Partnership%20Inquiry'}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                backgroundColor: '#FFD600',
                color: '#333333',
                border: 'none',
                borderRadius: '8px',
                padding: '16px 30px',
                fontSize: '1.15rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: isButtonHovered 
                  ? '0 8px 20px rgba(255, 214, 0, 0.4)' 
                  : '0 4px 15px rgba(255, 214, 0, 0.25)',
                transform: isButtonHovered ? 'translateY(-3px)' : 'translateY(0)',
                transition: 'all 0.2s ease',
                position: 'relative',
                zIndex: 1,
                textAlign: 'center',
                textDecoration: 'none',
                width: 'auto',
                minWidth: '220px',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            >
              <FaEnvelope size={18} color="#333333" /> 
              <span style={{ color: '#333333', fontWeight: 600 }}>Contact Us Now</span> 
              <FaArrowRight size={16} color="#333333" />
            </button>
          </motion.div>
        </motion.div>
      </PageTransition>
    </Layout>
  );
}

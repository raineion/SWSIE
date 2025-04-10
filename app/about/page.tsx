"use client"

import React, { useState } from 'react';
import Layout from '../components/Layout';
import PageTransition from '../components/PageTransition';
import { 
  FaLeaf, FaLightbulb, FaMountain, FaWater, FaSeedling, 
  FaBuilding, FaRecycle, FaGraduationCap, FaUserFriends,
  FaFlask, FaHandshake, FaChartLine
} from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function AboutPage() {
  // Add hover state for focus area cards
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  // Yellow theme colors
  const yellowTheme = {
    primary: '#ffc107', // Primary yellow
    secondary: '#ffeb3b', // Secondary lighter yellow
    light: '#fff9c4', // Very light yellow
    dark: '#ff8f00', // Darker amber
    subtle: '#fffde7', // Subtle yellow background
    text: '#212121', // Black text
    textSecondary: '#424242', // Dark grey text
  };
  
  // Focus areas with yellow theme colors
  const focusAreas = [
    {
      title: "Clean Energy",
      description: "Developing and implementing renewable energy solutions for the Southwest region",
      icon: <FaLightbulb/>,
      color: yellowTheme.dark
    },
    {
      title: "Water Management",
      description: "Creating innovative approaches to water conservation and resource management",
      icon: <FaWater/>,
      color: yellowTheme.dark
    },
    {
      title: "Sustainable Agriculture",
      description: "Advancing food systems that support environmental health and food security",
      icon: <FaSeedling/>,
      color: yellowTheme.dark
    },
    {
      title: "Climate Infrastructure",
      description: "Building resilient infrastructure adapted to Southwest climate challenges",
      icon: <FaBuilding/>,
      color: yellowTheme.dark
    },
    {
      title: "Circular Economy",
      description: "Implementing systems that minimize waste and maximize resource utilization",
      icon: <FaRecycle/>,
      color: yellowTheme.dark
    },
    {
      title: "Green Workforce",
      description: "Developing skills and opportunities for jobs in the sustainability sector",
      icon: <FaGraduationCap/>,
      color: yellowTheme.dark
    }
  ];

  // Fix transition animations with properly defined variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const cardVariants = {
    initial: { 
      scale: 1, 
      y: 0, 
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)' 
    },
    hover: { 
      scale: 1.03, 
      y: -8, 
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
      transition: {
        type: "spring",
        stiffness: 400, // Increased stiffness for quicker response
        damping: 12, // Reduced damping for faster animation
        duration: 0.2, // Reduced duration for faster effect
        delay: 0 // Explicitly set delay to 0 to ensure immediate response
      }
    }
  };

  return (
    <Layout>
      <PageTransition>
        <motion.div 
          className="about-container"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Hero section with yellow marble effect gradient */}
          <motion.div 
            variants={sectionVariants}
            style={{ 
              padding: '60px 20px',
              background: `linear-gradient(135deg, ${yellowTheme.subtle} 0%, ${yellowTheme.light} 50%, ${yellowTheme.subtle} 80%, ${yellowTheme.light} 100%)`,
              backgroundSize: '400% 400%',
              borderRadius: '0 0 20px 20px',
              marginTop: '-20px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Marble effect overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                radial-gradient(circle at 20% 30%, rgba(255, 236, 179, 0.4) 0%, transparent 30%),
                radial-gradient(circle at 80% 70%, rgba(255, 193, 7, 0.2) 0%, transparent 30%),
                radial-gradient(circle at 40% 80%, rgba(255, 236, 179, 0.3) 0%, transparent 40%)
              `,
              zIndex: 0,
            }}/>

            <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <FaLeaf style={{ 
                  fontSize: '2.5rem', 
                  color: yellowTheme.dark, 
                  marginRight: '15px'
                }}/>
                <h1 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 700,
                  color: yellowTheme.text, // Always black title
                  margin: 0
                }}>
                  About SWSIE
                </h1>
              </div>
              
              <p style={{ 
                fontSize: '1.2rem', 
                maxWidth: '800px', 
                margin: '20px auto', 
                lineHeight: 1.6,
                color: yellowTheme.textSecondary
              }}>
                The <strong>Southwest Sustainability Innovation Engine</strong> drives collaborative research, education, 
                and technological advancement to build a more sustainable future for the American Southwest region.
              </p>
            </div>
          </motion.div>
          
          {/* Mission section with card design */}
          <motion.div 
            variants={sectionVariants}
            style={{ padding: '50px 20px', maxWidth: '1000px', margin: '0 auto' }}
          >
            <motion.div
              variants={sectionVariants}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '30px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                marginBottom: '50px',
                border: `1px solid ${yellowTheme.light}`,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Yellow marble corner accent */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '150px',
                height: '150px',
                background: `
                  linear-gradient(135deg, ${yellowTheme.light} 0%, rgba(255, 245, 204, 0.2) 100%)
                `,
                borderRadius: '0 0 0 150px',
                zIndex: 0
              }}/>
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <FaMountain style={{ fontSize: '1.8rem', color: yellowTheme.dark, marginRight: '15px' }}/>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 600, margin: 0, color: yellowTheme.text }}>Our Mission</h2>
                </div>
                
                <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: yellowTheme.textSecondary, marginBottom: '20px' }}>
                  The Southwest Sustainability Innovation Engine (SWSIE) aims to accelerate innovation and 
                  technology development in the Southwest region by building collaborative partnerships between 
                  academic institutions, research organizations, industry leaders, and government agencies.
                </p>
                
                <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: yellowTheme.textSecondary }}>
                  Through these strategic partnerships, we address critical challenges in sustainability, resource management, 
                  and economic development across the Southwest United States, creating solutions that benefit both 
                  the environment and the communities that call this region home.
                </p>
              </div>
            </motion.div>
            
            {/* NSF Engines Program section with yellow accent color */}
            <motion.div
              variants={sectionVariants}
              style={{
                background: yellowTheme.subtle,
                borderRadius: '16px',
                padding: '30px',
                marginBottom: '50px',
                border: `1px solid ${yellowTheme.secondary}30`,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Yellow marble effect overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `
                  radial-gradient(circle at 10% 20%, rgba(255, 193, 7, 0.1) 0%, transparent 25%),
                  radial-gradient(circle at 90% 60%, rgba(255, 236, 179, 0.15) 0%, transparent 30%)
                `,
                zIndex: 0,
              }}/>
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <FaFlask style={{ fontSize: '1.8rem', color: yellowTheme.dark, marginRight: '15px' }}/>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 600, margin: 0, color: yellowTheme.text }}>NSF Engines Program</h2>
                </div>
                
                <p style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '20px', color: yellowTheme.textSecondary }}>
                  The SWSIE is part of the National Science Foundation's Engines program, which supports regional 
                  innovation ecosystems across the country. This program empowers diverse communities to develop 
                  and sustain technology-driven innovation ecosystems that address societal challenges.
                </p>
                
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '20px', 
                  marginTop: '30px',
                  justifyContent: 'center' 
                }}>
                  <div style={{ 
                    flex: '1', 
                    minWidth: '220px',
                    background: 'white',
                    padding: '20px',
                    borderRadius: '12px',
                    boxShadow: '0 2px 10px rgba(255, 193, 7, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    border: `1px solid ${yellowTheme.light}`
                  }}>
                    <FaHandshake style={{ fontSize: '2rem', color: yellowTheme.dark, marginBottom: '15px' }}/>
                    <h3 style={{ fontSize: '1.2rem', margin: '0 0 10px 0', color: yellowTheme.text }}>Collaboration</h3>
                    <p style={{ margin: 0, fontSize: '0.95rem', color: yellowTheme.textSecondary }}>
                      Building partnerships across academia, industry, and government
                    </p>
                  </div>
                  
                  <div style={{ 
                    flex: '1', 
                    minWidth: '220px',
                    background: 'white',
                    padding: '20px',
                    borderRadius: '12px',
                    boxShadow: '0 2px 10px rgba(255, 193, 7, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    border: `1px solid ${yellowTheme.light}`
                  }}>
                    <FaUserFriends style={{ fontSize: '2rem', color: yellowTheme.dark, marginBottom: '15px' }}/>
                    <h3 style={{ fontSize: '1.2rem', margin: '0 0 10px 0', color: yellowTheme.text }}>Community</h3>
                    <p style={{ margin: 0, fontSize: '0.95rem', color: yellowTheme.textSecondary }}>
                      Engaging diverse stakeholders from across the Southwest region
                    </p>
                  </div>
                  
                  <div style={{ 
                    flex: '1', 
                    minWidth: '220px',
                    background: 'white',
                    padding: '20px',
                    borderRadius: '12px',
                    boxShadow: '0 2px 10px rgba(255, 193, 7, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    border: `1px solid ${yellowTheme.light}`
                  }}>
                    <FaChartLine style={{ fontSize: '2rem', color: yellowTheme.dark, marginBottom: '15px' }}/>
                    <h3 style={{ fontSize: '1.2rem', margin: '0 0 10px 0', color: yellowTheme.text }}>Innovation</h3>
                    <p style={{ margin: 0, fontSize: '0.95rem', color: yellowTheme.textSecondary }}>
                      Driving technological advancement and economic growth
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Focus Areas section with yellow interactive cards */}
            <motion.div variants={sectionVariants}>
              <motion.div variants={sectionVariants} style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 600, color: yellowTheme.text }}>Our Focus Areas</h2>
                <p style={{ 
                  maxWidth: '700px', 
                  margin: '15px auto',
                  fontSize: '1.1rem',
                  color: yellowTheme.textSecondary,
                  lineHeight: 1.6
                }}>
                  We concentrate our efforts on six key areas that are critical for sustainable 
                  development in the Southwest region:
                </p>
              </motion.div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                gap: '25px',
                marginBottom: '40px'
              }}>
                {focusAreas.map((area, index) => (
                  <motion.div 
                    key={index}
                    variants={sectionVariants}
                    custom={index}
                    initial="initial"
                    whileHover="hover"
                    className="focus-area-card"
                    style={{
                      background: 'white',
                      borderRadius: '12px',
                      padding: '25px',
                      border: `1px solid ${hoveredCard === index ? yellowTheme.primary : '#eaeaea'}`,
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      willChange: 'transform, box-shadow'
                    }}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Yellow marble background accent with instant animation */}
                    <motion.div 
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '120px',
                        height: '120px',
                        background: `
                          radial-gradient(circle at center, ${yellowTheme.light}60 0%, ${yellowTheme.light}20 40%, transparent 70%)
                        `,
                        borderRadius: '0 0 0 120px',
                        zIndex: 0
                      }}
                      animate={{
                        scale: hoveredCard === index ? 1.1 : 1,
                        transition: { duration: 0.2, delay: 0 } // Faster with no delay
                      }}
                    />
                    
                    <div style={{ 
                      position: 'relative',
                      zIndex: 1
                    }}>
                      <motion.div 
                        animate={{
                          scale: hoveredCard === index ? 1.1 : 1,
                          rotate: hoveredCard === index ? 5 : 0,
                          boxShadow: hoveredCard === index ? `0 5px 15px ${yellowTheme.primary}30` : 'none',
                          transition: { duration: 0.2, delay: 0 } // Faster with no delay
                        }}
                        style={{ 
                          background: `${yellowTheme.light}`, 
                          color: yellowTheme.dark,
                          width: '55px',
                          height: '55px',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.6rem',
                          marginBottom: '15px'
                        }}
                      >
                        {area.icon}
                      </motion.div>
                      
                      <h3 style={{ 
                        fontSize: '1.4rem', 
                        margin: '0 0 10px 0',
                        color: yellowTheme.text // Always black
                      }}>
                        {area.title}
                      </h3>
                      
                      <p style={{ 
                        margin: 0, 
                        lineHeight: 1.6,
                        fontSize: '1rem',
                        color: yellowTheme.textSecondary
                      }}>
                        {area.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </PageTransition>
    </Layout>
  );
}

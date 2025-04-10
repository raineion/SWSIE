"use client"

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaBuilding } from 'react-icons/fa';


const featuredPartners = [
  {
    id: 1,
    name: 'Desert Research Institute',
    description: 'Leading environmental research institute focused on water, air quality, and ecosystem science.',
    logo: '/logos/dri-logo.jpg',
    link: '/partners/dri',
  },
  {
    id: 2,
    name: 'UNLV',
    description: 'Public research university with expertise in renewable energy, urban sustainability, and water resources.',
    logo: '/logos/unlv-logo.jpg',
    link: '/partners/unlv',
  },
  {
    id: 3,
    name: 'Arizona State University',
    description: 'Leading institution in sustainability science, renewable energy, and climate adaptation.',
    logo: '/logos/asu-logo.jpg',
    link: '/partners/asu',
  },
  {
    id: 4,
    name: 'Swire Coca-Cola',
    description: 'Beverage company with a focus on sustainable packaging, water conservation, and energy efficiency.',
    logo: '/logos/swire-logo.jpg',
    link: '/partners/swire-coca-cola',
  },
  {
    id: 5,
    name: 'Chevron',
    description: 'Energy corporation specializing in oil, natural gas, and geothermal energy production.',
    logo: '/logos/chevron-logo.jpg',
    link: '/partners/chevron',
  },
  {
    id: 6,
    name: 'NV Energy',
    description: 'Utility company providing electricity and renewable energy services in Nevada.',
    logo: '/logos/nv-energy-logo.jpg',
    link: '/partners/nv-energy',
  },
  {
    id: 7,
    name: 'Caesars Entertainment',
    description: 'Hospitality company with a focus on sustainable operations and water conservation.',
    logo: '/logos/caesars-logo.jpg',
    link: '/partners/caesars',
  },
  {
    id: 8,
    name: 'The University of Utah',
    description: 'Public research university with expertise in environmental science and renewable energy.',
    logo: '/logos/uofu-logo.jpg',
    link: '/partners/uofu',
  },
  {
    id: 9,
    name: 'Zero Labs',
    description: 'Zero Labs works with a wide range of partners, from early-stage startups to Fortune 500 companies, to bring their ideas to life.',
    logo: '/logos/zerolabs-logo.jpg',
    link: '/partners/zerolabs',
  },
  {
    id: 10,
    name: 'NVIDIA',
    description: 'Technology company specializing in graphics processing units and artificial intelligence.',
    logo: '/logos/nvidia-logo.jpg',
    link: '/partners/nvidia',
  },
  {
    id: 11,
    name: 'Starbucks',
    description: 'Global coffee company with a focus on sustainable sourcing and waste reduction.',
    logo: '/logos/starbucks.jpg',
    link: '/partners/starbucks',
  },
  {
    id: 12,
    name: 'Switch',
    description: 'Data center company with a focus on renewable energy and sustainable operations.',
    logo: '/logos/switch-logo.svg',
    link: '/partners/switch',
  },
  {
    id: 13,
    name: 'Arizona Public Service',
    description: 'Utility company providing electricity and renewable energy services in Arizona.',
    logo: '/logos/aps-logo.jpg',
    link: '/partners/aps',
  },
  {
    id: 14,
    name: 'State of Nevada',
    description: 'Government agency focused on sustainability, water conservation, and renewable energy.',
    logo: '/logos/nevada-logo.jpg',
    link: '/partners/nevada',
  },
  {
    id: 15,
    name: 'City of Salt Lake City',
    description: 'Municipal government with a focus on sustainability, renewable energy, and urban planning.',
    logo: '/logos/slc-logo.jpg',
    link: '/partners/slc',
  },
  {
    id: 16,
    name: 'State of Utah',
    description: 'Government agency focused on sustainability, water conservation, and renewable energy.',
    logo: '/logos/utah-logo.svg',
    link: '/partners/utah',
  },
  { 
    id: 17,
    name: 'City of Chandler',
    description: 'Municipal government with a focus on sustainability, renewable energy, and urban planning.',
    logo: '/logos/chandler-logo.jpg',
    link: '/partners/chandler',
  },
  {
    id: 18,
    name: 'Western Area Power Administration',
    description: 'Federal agency managing power distribution in the Western U.S. with a focus on renewable energy.',
    logo: '/logos/wapa-logo.jpg',
    link: '/partners/wapa',
  },
  {
    id: 19,
    name: 'The Water Research Foundation',
    description: 'Nonprofit organization focused on water quality, conservation, and infrastructure research.',
    logo: '/logos/wrf-logo.jpg',
    link: '/partners/water-research',
  },
  {
    id: 20,
    name: 'SciTech Institute',
    description: 'Nonprofit organization supporting STEM education and workforce development in Arizona.',
    logo: '/logos/scitech-logo.jpg',
    link: '/partners/scitech',
  },
  {
    id: 21,
    name: 'Maricopa Community College',
    description: 'Community college system with programs in sustainability, renewable energy, and environmental science.',
    logo: '/logos/mcccd-logo.jpg',
    link: '/partners/mcccd',
  },
  {
    id: 22,
    name: 'Arizona Technology Council',
    description: 'Trade association supporting technology companies and innovation in Arizona.',
    logo: '/logos/aztech-logo.jpg',
    link: '/partners/aztech',
  },
  {
    id: 23,
    name: 'City of Phoenix',
    description: 'Municipal government with a focus on sustainability, renewable energy, and urban planning.',
    logo: '/logos/phoenix-logo.jpg',
    link: '/partners/phoenix',

  },
  {
    id: 24,
    name: 'Greater Phoenix Economic Council',
    description: 'Economic development organization supporting business growth and innovation in the Phoenix metro area.',
    logo: '/logos/gpec-logo.jpg',
    link: '/partners/gpec',

  },
  {
    id: 25,
    name: 'Arizona Municipal Water Users Association',
    description: 'Association of municipal water providers focused on water conservation and policy in Arizona.',
    logo: '/logos/amwua-logo.jpg',
    link: '/partners/amwua',
  },
  {
    id: 26,
    name: 'Clear Creek Associates',
    description: 'Environmental consulting firm specializing in water resources, geology, and environmental science.',
    logo: '/logos/cca-logo.jpg',
    link: '/partners/cca',
  },
  {
    id: 27,
    name: 'Cottonwood Heights',
    description: 'Municipal government with a focus on sustainability, renewable energy, and urban planning.',
    logo: '/logos/cottonwood-logo.jpg',
    link: '/partners/cottonwood',
  },
  {
    id: 28,
    name: 'Ecolab',
    description: 'Global company providing water, hygiene, and energy technologies and services.',
    logo: '/logos/ecolab-logo.jpg',
    link: '/partners/ecolab',
  },
  {
    id: 29,
    name: 'Epic CleanTec',
    description: 'Innovative company providing sustainable water and waste management solutions.',
    logo: '/logos/epic-logo.jpg',
    link: '/partners/epic',
  },
  {
    id: 30,
    name: 'Electric Power Research Institute',
    description: 'Research organization focused on electricity generation, delivery, and use.',
    logo: '/logos/epri-logo.jpg',
    link: '/partners/epri',
  },
  {
    id: 31,
    name: 'Friends of Great Salt Lake',
    description: 'Nonprofit organization focused on conservation, education, and advocacy for the Great Salt Lake.',
    logo: '/logos/fogsl-logo.jpg',
    link: '/partners/fogsl',
  },
  {
    id: 32,
    name: 'NV5',
    description: 'Engineering consulting firm specializing in infrastructure, water resources, and environmental projects.',
    logo: '/logos/nv5-logo.jpg',
    link: '/partners/nv5',

  },
  {
    id: 33,
    name: 'Place Collaborative',
    description: 'Urban planning and design firm focused on sustainable development and community engagement.',
    logo: '/logos/place-logo.jpg',
    link: '/partners/place',

  },
  {
    id: 34,
    name: 'Plug and Play',
    description: 'Global innovation platform connecting startups with corporate partners and investors.',
    logo: '/logos/plugandplay-logo.jpg',
    link: '/partners/plugandplay',
  },
  {
    id: 35,
    name: 'City of South Jordan',
    description: 'Municipal government with a focus on sustainability, renewable energy, and urban planning.',
    logo: '/logos/southjordan-logo.jpg',
    link: '/partners/southjordan',
  },
  {
    id: 36,
    name: 'Southern Nevada Water Authority',
    description: 'Regional water utility providing water treatment, delivery, and conservation services.',
    logo: '/logos/snwa-logo.jpg',
    link: '/partners/snwa',
  },
  {
    id: 37,
    name: 'SRP',
    description: 'Utility company providing electricity and water services in Arizona.',
    logo: '/logos/srp-logo.jpg',
    link: '/partners/srp',
  },
  {
    id: 38,
    name: 'Start Up NV',
    description: 'Nonprofit organization supporting entrepreneurship and innovation in Nevada.',
    logo: '/logos/startupnv-logo.jpg',
    link: '/partners/startupnv',
  },
  {
    id: 39,
    name: 'US Magnesium',
    description: 'Magnesium production company with a focus on sustainable operations and waste management.',
    logo: '/logos/usm-logo.jpg',
    link: '/partners/usm',
  },
  {
    id: 40,
    name: 'Utah Rivers Council',
    description: 'Nonprofit organization focused on river conservation, restoration, and education in Utah.',
    logo: '/logos/urc-logo.jpg',
    link: '/partners/urc',
  }
];

// Create an array with duplicated partners to ensure continuous scrolling
const createPartners = () => {
  return [
    ...featuredPartners,
    ...featuredPartners,
    ...featuredPartners,
    ...featuredPartners,
    ...featuredPartners,
    ...featuredPartners,
    ...featuredPartners,
    ...featuredPartners,
  ].map((partner, index) => ({
    ...partner,
    id: `${partner.id}-${index}`
  }));
};

export default function PartnerCarousel() {
  const router = useRouter();
  const carouselRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [partners] = useState(createPartners());
  const animationRef = useRef<number | null>(null);
  const scrollSpeed = 0.5; // You can adjust this value (0.5-1.5 works well)

  // Add a ref to track the timeout for delayed resume
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Add references to track animation state
  const positionRef = useRef(0);
  const lastTimestampRef = useRef(0);
  
  // Enhanced animation for specific looping behavior
  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    
    const basePartnersCount = featuredPartners.length;
    const partnerCards = Array.from(inner.children);
    
    // Calculate parameters for animation
    const speed = 0.02; // pixels per millisecond
    let resetInProgress = false;
    
    // Animation with specific reset after UofU
    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === 0) {
        lastTimestampRef.current = timestamp;
      }
      
      if (!isPaused && !isDragging && !resetInProgress) {
        // Calculate elapsed time for smooth animation
        const elapsed = timestamp - lastTimestampRef.current;
        
        // Update position
        positionRef.current += elapsed * speed;
        
        // Apply transform
        inner.style.transform = `translate3d(-${positionRef.current}px, 0, 0)`;
        
        // Calculate which partner is currently at the center of the viewport
        const cardWidth = partnerCards[0]?.clientWidth || 0;
        const gapWidth = 15; // match the gap in your CSS
        const totalItemWidth = cardWidth + gapWidth;
        const centerPosition = positionRef.current + (carouselRef.current?.clientWidth || 0) / 2;
        const currentPartnerIndex = Math.floor(centerPosition / totalItemWidth) % basePartnersCount;
        
        // Check if we just passed University of Utah (ID 7, index 6)
        if (currentPartnerIndex === 0 && positionRef.current > totalItemWidth * 6.5) {
          // We've gone past UofU, reset to first partner smoothly
          resetInProgress = true;
          
          // Fade out
          inner.style.opacity = '0';
          inner.style.transition = 'opacity 0.3s ease';
          
          setTimeout(() => {
            // Reset position to first partner
            positionRef.current = 0;
            inner.style.transform = `translate3d(0, 0, 0)`;
            
            // Fade back in
            setTimeout(() => {
              inner.style.opacity = '1';
              resetInProgress = false;
              inner.style.transition = 'opacity 0.3s ease';
            }, 50);
          }, 300);
        }
      }
      
      // Update timestamp for next frame
      lastTimestampRef.current = timestamp;
      
      // Continue animation loop
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationId);
  }, [isPaused, isDragging]); // Now depends on pause state and drag state

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const carousel = carouselRef.current;
    if (carousel) {
      setStartX(e.pageX - carousel.offsetLeft);
      setScrollLeft(carousel.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const carousel = carouselRef.current;
    if (carousel) {
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
    }
  };

  // Update the mouse enter handler to clear any existing timeout
  const handleCardMouseEnter = (index: number) => {
    // Clear any existing timeout to prevent premature resume
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
    setIsPaused(true);
    setActiveIndex(index);
  };

  // Update the mouse leave handler to include a delay
  const handleCardMouseLeave = () => {
    setActiveIndex(null);
    
    // Set a timeout to resume animation after delay (2000ms = 2 seconds)
    resumeTimeoutRef.current = setTimeout(() => {
      // Update last timestamp to now to prevent jumps
      lastTimestampRef.current = performance.now();
      setIsPaused(false);
      resumeTimeoutRef.current = null;
    }, 1500); // Adjust this value for desired delay (1.5 seconds)
  };

  // Clean up the timeout when component unmounts
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  const handlePartnerClick = (link: string) => {
    router.push(link);
  };

  return (
    <motion.section 
      className="carousel-section"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          color: '#0066cc', // Explicitly set color inline
          fontWeight: 700,
          fontSize: '1.8rem', /* Reduced from 2rem */
          marginBottom: '30px' /* Reduced from 40px */
        }}
      >
        Our Featured Partners
      </motion.h2>
      
      <div 
        className="carousel-container"
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ 
          WebkitTapHighlightColor: 'transparent',
          outline: 'none',
          userSelect: 'none',
          touchAction: 'manipulation'
        }}
      >
        <div 
          className="carousel-inner"
          ref={innerRef}
          style={{ 
            display: 'flex',
            gap: '12px', /* Reduced from 15px */
            willChange: 'transform',
            transform: 'translate3d(0, 0, 0)', // Initial value with hardware acceleration
            backfaceVisibility: 'hidden' // Reduce flickering
          }}
        >
          {partners.map((partner, index) => (
            <motion.div 
              key={partner.id} 
              className="partner-card"
              onMouseEnter={() => handleCardMouseEnter(index)}
              onMouseLeave={handleCardMouseLeave}
              whileHover={{ 
                y: -8, /* Reduced from -10 */
                boxShadow: '0 12px 25px rgba(0, 0, 0, 0.18)',
                transition: { duration: 0.2 }
              }}
              style={{
                boxShadow: activeIndex === index 
                  ? '0 12px 25px rgba(0, 0, 0, 0.22)'
                  : '0 6px 12px rgba(0, 0, 0, 0.08)',
                backgroundColor: 'white',
                height: '360px', /* Reduced from 420px */
                width: '280px', /* Added explicit width */
                flexShrink: 0, /* Prevent shrinking */
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                borderRadius: '10px' /* Added rounded corners */
              }}
            >
              <div className="card-header" style={{ 
                padding: '16px 16px 8px', /* Reduced padding */
                borderBottom: '1px solid #f0f0f0'
              }}>
                {partner.logo && (
                  <div className="card-logo-container" style={{
                    height: '65px', /* Reduced from default */
                    width: '65px',
                    margin: '0 auto 10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img 
                      src={partner.logo}
                      alt={`${partner.name}`}
                      className="card-logo"
                      style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain'
                      }}
                      onError={(e) => {
                        // If logo fails to load, show icon instead
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.parentElement) {
                          e.currentTarget.parentElement.classList.add('show-icon');
                        }
                      }}
                    />
                  </div>
                )}
                {!partner.logo && (
                  <div className="card-icon-container">
                    <FaBuilding size={24} color="white" />
                  </div>
                )}
                <h3 className="card-title" style={{
                  fontSize: '1.1rem', /* Reduced from default */
                  fontWeight: '600',
                  textAlign: 'center',
                  margin: '0 0 10px'
                }}>{partner.name}</h3>
              </div>
              
              <p className="card-description" style={{
                fontSize: '0.9rem', /* Reduced from default */
                lineHeight: '1.4',
                padding: '12px 16px',
                flex: 1,
                margin: 0,
                color: '#444'
              }}>{partner.description}</p>
              
              <div className="card-button-container" style={{
                padding: '10px 16px 16px', /* Reduced padding */
                textAlign: 'center'
              }}>
                <motion.button 
                  className="card-button"
                  onClick={() => handlePartnerClick(partner.link)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    backgroundColor: '#0066cc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '8px 16px', /* Reduced from 10px 20px */
                    fontSize: '0.9rem', /* Reduced from default */
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  View Partnership Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
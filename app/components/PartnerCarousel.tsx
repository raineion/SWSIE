"use client"

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaBuilding, FaUniversity, FaCity, FaFlask } from 'react-icons/fa';

// Sample partner data - replace with your actual partners
const basePartners = [
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
    name: 'NV Energy',
    description: 'Utility company providing electricity and renewable energy services in Nevada.',
    logo: '/logos/nv-energy-logo.jpg',
    link: '/partners/nv-energy',
  },
  {
    id: 5,
    name: 'Caesars Entertainment',
    description: 'Hospitality company with a focus on sustainable operations and water conservation.',
    logo: '/logos/caesars-logo.jpg',
    link: '/partners/caesars',
  },
  {
    id: 6,
    name: 'Switch',
    description: 'Data center company with a focus on renewable energy and sustainable operations.',
    logo: '/logos/switch-logo.svg',
    link: '/partners/switch',
  },
  {
    id: 7,
    name: 'The University of Utah',
    description: 'Public research university with expertise in environmental science and renewable energy.',
    logo: '/logos/uofu-logo.jpg',
    link: '/partners/uofu',
  },  
];

// Create an array with duplicated partners to ensure continuous scrolling
const createPartners = () => {
  return [
    ...basePartners,
    ...basePartners,
    ...basePartners,
    ...basePartners,
    ...basePartners,
    ...basePartners,
    ...basePartners,
    ...basePartners,
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
    
    const basePartnersCount = basePartners.length;
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
        style={{ textAlign: 'left', paddingLeft: '20px' }}
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
      >
        <div 
          className="carousel-inner"
          ref={innerRef}
          style={{ 
            display: 'flex',
            gap: '15px', // Further reduced gap from 20px to 15px to fit more cards
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
                y: -10,
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
                transition: { duration: 0.2 }
              }}
              style={{
                boxShadow: activeIndex === index 
                  ? '0 15px 30px rgba(0, 0, 0, 0.25)'
                  : '0 8px 16px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="card-header">
                {partner.logo && (
                  <div className="card-logo-container">
                    <img 
                      src={partner.logo}
                      alt={`${partner.name}`}
                      className="card-logo"
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
                {/* Only show the icon container if there's no logo */}
                {!partner.logo && (
                  <div className="card-icon-container">
                    <FaBuilding size={24} />
                  </div>
                )}
                <h3 className="card-title">{partner.name}</h3>
              </div>
              
              <p className="card-description">{partner.description}</p>
              
              <motion.button 
                className="card-button"
                onClick={() => handlePartnerClick(partner.link)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ backgroundColor: "#0066cc" }}
              >
                View Partnership Details
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { FaUniversity, FaFlask, FaCity, FaBuilding, FaSearch, FaMapMarkerAlt, FaHandshake, FaEnvelope, FaInfoCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

// Import the PartnerCarousel component
const PartnerCarousel = dynamic(() => import('./PartnerCarousel'), {
  ssr: false,
  loading: () => <div className="loading-placeholder">Loading partners...</div>
});

// Sample partners data
const allPartners = [
  {
    id: 1,
    name: 'Desert Research Institute',
    description: 'Leading environmental research institute focused on water, air quality, and ecosystem science.',
    logo: '/logos/dri-logo.jpg',
    link: '/partners/dri',
    icon: <FaFlask size={24} />,
    category: 'Research Institute',
    location: 'Nevada',
  },
  {
    id: 2,
    name: 'UNLV',
    description: 'Public research university with expertise in renewable energy, urban sustainability, and water resources.',
    logo: '/logos/unlv-logo.jpg',
    link: '/partners/unlv',
    icon: <FaUniversity size={24} />,
    category: 'Academic',
    location: 'Las Vegas, NV',
  },
  {
    id: 3,
    name: 'Arizona State University',
    description: 'Leading institution in sustainability science, renewable energy, and climate adaptation.',
    logo: '/logos/asu-logo.jpg',
    link: '/partners/asu',
    icon: <FaUniversity size={24} />,
    category: 'Academic',
    location: 'Phoenix, AZ',
  },
  {
    id: 4,
    name: 'Coca-Cola',
    description: 'Global beverage company with a focus on sustainable packaging and water conservation.',
    logo: '/logos/coca-cola.jpg',
    link: '/partners/coca-cola',
    icon: <FaBuilding size={24} />,
    category: 'Food & Beverage',
    location: 'Atlanta, GA',
  },
  {
    id: 5,
    name: 'Chevron',
    description: 'Energy corporation specializing in oil, natural gas, and geothermal energy production.',
    logo: '/logos/chevron-logo.jpg',
    link: '/partners/chevron',
    icon: <FaBuilding size={24} />,
    category: 'Energy',
    location: 'San Ramon, CA',
  },
  {
    id: 6,
    name: 'NV Energy',
    description: 'Utility company providing electricity and renewable energy services in Nevada.',
    logo: '/logos/nv-energy-logo.jpg',
    link: '/partners/nv-energy',
    icon: <FaBuilding size={24} />,
    category: 'Energy',
    location: 'Las Vegas, NV',
  },
  {
    id: 7,
    name: 'Caesars Entertainment',
    description: 'Hospitality company with a focus on sustainable operations and water conservation.',
    logo: '/logos/caesars-logo.jpg',
    link: '/partners/caesars',
    icon: <FaCity size={23} />,
    category: 'Hospitality',
    location: 'Las Vegas, NV',
  },
  {
    id: 8,
    name: 'The University of Utah',
    description: 'Public research university with expertise in environmental science and renewable energy.',
    logo: '/logos/uofu-logo.jpg',
    link: '/partners/uofu',
    icon: <FaUniversity size={24} />,
    category: 'Academic',
    location: 'Salt Lake City, UT',
  },
  {
    id: 9,
    name: 'Zero Labs',
    description: 'With a focus on innovation, Zero Labs works with a wide range of partners, from early-stage startups to Fortune 500 companies, to bring their ideas to life..',
    logo: '/logos/zerolabs-logo.jpg',
    link: '/partners/zerolabs',
    icon: <FaCity size={23} />,
    category: 'Private Sector',
    location: 'Las Vegas, NV',
  },
  {
    id: 10,
    name: 'NVIDIA',
    description: 'Technology company specializing in graphics processing units and artificial intelligence.',
    logo: '/logos/nvidia-logo.jpg',
    link: '/partners/nvidia',
    icon: <FaBuilding size={24} />,
    category: 'Technology',
    location: 'Santa Clara, CA',
  },
  {
    id: 11,
    name: 'Starbucks',
    description: 'Global coffee company with a focus on sustainable sourcing and waste reduction.',
    logo: '/logos/starbucks.jpg',
    link: '/partners/starbucks',
    icon: <FaBuilding size={24} />,
    category: 'Food & Beverage',
    location: 'Seattle, WA',
  },
  {
    id: 12,
    name: 'Switch',
    description: 'Data center company with a focus on renewable energy and sustainable operations.',
    logo: '/logos/switch-logo.svg',
    link: '/partners/switch',
    icon: <FaBuilding size={24} />,
    category: 'Technology',
    location: 'Las Vegas, NV',
  },
  {
    id: 13,
    name: 'Arizona Public Service',
    description: 'Utility company providing electricity and renewable energy services in Arizona.',
    logo: '/logos/aps-logo.jpg',
    link: '/partners/aps',
    icon: <FaBuilding size={24} />,
    category: 'Energy',
    location: 'Phoenix, AZ',
  },
  {
    id: 14,
    name: 'State of Nevada',
    description: 'Government agency focused on sustainability, water conservation, and renewable energy.',
    logo: '/logos/nevada-logo.jpg',
    link: '/partners/nevada',
    icon: <FaBuilding size={24} />,
    category: 'Government',
    location: 'Carson City, NV',
  },
  {
    id: 15,
    name: 'City of Salt Lake City, UT',
    description: 'Municipal government with a focus on sustainability, renewable energy, and urban planning.',
    logo: '/logos/slc-logo.jpg',
    link: '/partners/slc',
    icon: <FaBuilding size={24} />,
    category: 'Government',
    location: 'Salt Lake City, UT',
  },
  {
    id: 16,
    name: 'State of Utah',
    description: 'Government agency focused on sustainability, water conservation, and renewable energy.',
    logo: '/logos/utah-logo.svg',
    link: '/partners/utah',
    icon: <FaBuilding size={24} />,
    category: 'Government',
    location: 'Salt Lake City, UT',
  },
  { 
    id: 17,
    name: 'City of Chandler, AZ',
    description: 'Municipal government with a focus on sustainability, renewable energy, and urban planning.',
    logo: '/logos/chandler-logo.jpg',
    link: '/partners/chandler',
    icon: <FaBuilding size={24} />,
    category: 'Government',
    location: 'Chandler, AZ',
  },
  {
    id: 18,
    name: 'Western Area Power Administration',
    description: 'Federal agency managing power distribution in the Western U.S. with a focus on renewable energy.',
    logo: '/logos/wapa-logo.jpg',
    link: '/partners/wapa',
    icon: <FaBuilding size={24} />,
    category: 'Government',
    location: 'Lakewood, CO',
  },
  {
    id: 19,
    name: 'The Water Research Foundation',
    description: 'Nonprofit organization focused on water quality, conservation, and infrastructure research.',
    logo: '/logos/wrf-logo.jpg',
    link: '/partners/water-research',
    icon: <FaFlask size={24} />,
    category: 'Research Institute',
    location: 'Denver, CO',
  },
  {
    id: 20,
    name: 'SciTech Institute',
    description: 'Nonprofit organization supporting STEM education and workforce development in Arizona.',
    logo: '/logos/scitech-logo.jpg',
    link: '/partners/scitech',
    icon: <FaUniversity size={24} />,
    category: 'Nonprofit',
    location: 'Phoenix, AZ',
  },

];

export default function HomePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    academic: false,
    research: false,
    government: false,
    energy: false,
    technology: false,
    foodBeverage: false,
    hospitality: false
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const partnersPerPage = 9;
  
  // Add effect to ensure component is mounted
  useEffect(() => {
    setIsLoaded(true);
    
    // Log for debugging
    console.log("HomePage component mounted");
  }, []);
  
  // Add these handler functions for the buttons
  const handleLearnMoreClick = () => {
    console.log("Learn More clicked - navigating to benefits page");
    router.push('/partnership-benefits');
  };
  
  const handleContactUsClick = () => {
    console.log("Contact Us clicked - navigating to contact page");
    router.push('/contact');
  };
  
  // Filter partners based on search and category filters
  const filteredPartners = allPartners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       partner.description.toLowerCase().includes(searchTerm.toLowerCase());
                       
    const categoryFilters = {
      academic: filters.academic && partner.category === "Academic",
      research: filters.research && partner.category === "Research Institute",
      government: filters.government && partner.category === "Government",
      energy: filters.energy && partner.category === "Energy",
      technology: filters.technology && partner.category === "Technology",
      foodBeverage: filters.foodBeverage && partner.category === "Food & Beverage",
      hospitality: filters.hospitality && partner.category === "Hospitality"
    };
    
    // If no category filters are selected, show all; otherwise check if partner matches selected categories
    const anyFilterSelected = Object.values(filters).some(value => value);
    const matchesCategory = !anyFilterSelected || Object.values(categoryFilters).some(value => value);
    
    return matchesSearch && matchesCategory;
  });

  // Handle filter changes
  const handleFilterChange = (filter) => {
    setFilters({
      ...filters,
      [filter]: !filters[filter]
    });
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setFilters({
      academic: false,
      research: false,
      government: false,
      energy: false,
      technology: false,
      foodBeverage: false,
      hospitality: false
    });
  };

  const totalPages = Math.ceil(filteredPartners.length / partnersPerPage);
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // Scroll back to the top of the partners list
      document.querySelector('.partners-list-header')?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      document.querySelector('.partners-list-header')?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handlePageClick = (page) => {
    setCurrentPage(page);
    document.querySelector('.partners-list-header')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Calculate which partners to display on the current page
  const indexOfLastPartner = currentPage * partnersPerPage;
  const indexOfFirstPartner = indexOfLastPartner - partnersPerPage;
  const currentPartners = filteredPartners.slice(indexOfFirstPartner, indexOfLastPartner);
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  // Calculate category counts dynamically based on current partners
  const getCategoryCounts = () => {
    const counts = {
      academic: 0,
      research: 0,
      government: 0,
      energy: 0,
      technology: 0,
      foodBeverage: 0,
      hospitality: 0
    };
    
    allPartners.forEach(partner => {
      if (partner.category === "Academic") {
        counts.academic++;
      } else if (partner.category === "Research Institute") {
        counts.research++;
      } else if (partner.category === "Government") {
        counts.government++;
      } else if (partner.category === "Energy") {
        counts.energy++;
      } else if (partner.category === "Technology") {
        counts.technology++;
      } else if (partner.category === "Food & Beverage") {
        counts.foodBeverage++;
      } else if (partner.category === "Hospitality") {
        counts.hospitality++;
      }
    });
    
    return counts;
  };
  
  const categoryCounts = getCategoryCounts();

  if (!isLoaded) {
    return <div className="loading-placeholder">Loading content...</div>;
  }

  return (
    <div className="homepage-wrapper" style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', paddingTop: '20px' }}>
      {/* Updated header with vertical separator and hierarchical title */}
      <motion.div 
        className="header-wrapper"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="logo-container"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="/logos/nsf-logo.jpg" alt="NSF logo" />
        </motion.div>
        
        <div className="header-separator"></div>
        
        <motion.div 
          className="title-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="swsie-title-small">NSF Engines:</span>
          <div className="swsie-title-large">
            <h1>Southwest Sustainability</h1>
            <h1>Innovation Engine Partner Directory</h1>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Content container with proper spacing */}
      <div className="content-wrapper" style={{ paddingTop: '120px' }}>
        {/* Carousel section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ background: 'transparent', padding: '0 20px', marginBottom: '40px' }}
        >
          <PartnerCarousel />
        </motion.div>

        {/* Modified Become a Partner section */}
        <div className="partner-boxes-container">
          {/* First box - info about partnership */}
          <motion.div
            className="become-partner-section become-partner-info"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="box-content centered-content">
              <h2 className="section-title partner-title-black">Partnership Benefits</h2>
              <p className="section-description">
                Join us in our mission to drive sustainability and innovation in the Southwest. As a partner, you'll collaborate with leading institutions and organizations to create impactful solutions for our region.
              </p>
              <motion.button 
                className="learn-more-button"
                onClick={handleLearnMoreClick}
                aria-label="Learn more about partnership benefits"
                whileHover={{ y: -5, boxShadow: '0 8px 22px rgba(0, 102, 204, 0.25)', backgroundColor: '#f0f7ff' }}
                whileTap={{ y: -2, boxShadow: '0 4px 12px rgba(0, 102, 204, 0.2)' }}
              >
                <FaInfoCircle size={18} style={{ marginRight: '10px' }} />
                Learn More
              </motion.button>
            </div>
          </motion.div>
          
          {/* Second box - contact us */}
          <motion.div
            className="become-partner-section become-partner-contact"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <div className="box-content centered-content">
              <div className="partner-icon">
                <FaHandshake size={48} />
              </div>
              <h2 className="section-title partner-title-black">Become a Partner</h2>
              <p className="section-description">
                Ready to make an impact? Connect with us to explore partnership opportunities.
              </p>
              <motion.button 
                className="contact-us-button"
                onClick={handleContactUsClick}
                aria-label="Contact us to become a partner"
                whileHover={{ y: -5, boxShadow: '0 8px 22px rgba(0, 102, 204, 0.4)', backgroundColor: '#0055aa' }}
                whileTap={{ y: -2, boxShadow: '0 4px 12px rgba(0, 102, 204, 0.3)' }}
              >
                <FaEnvelope size={18} style={{ marginRight: '10px' }} />
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Full list of partners with filter */}
        <motion.div
          className="partners-list-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {/* Filter section */}
          <div className="filter-section" style={{ flex: '0 0 200px', marginRight: '20px' }}>
            <h3 className="filter-title">Filter Partners</h3>
            <div className="search-container">
              <input 
                type="text" 
                className="filter-input" 
                placeholder="Search partners..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filter-category">
              <div className="filter-category-title">
                <FaUniversity /> Categories
              </div>
              <div className="filter-options">
                <label className="custom-checkbox">
                  <input 
                    type="checkbox" 
                    checked={filters.academic}
                    onChange={() => handleFilterChange('academic')}
                  />
                  <span className="checkmark"></span>
                  <span className="filter-label">Academic</span>
                  <span className="filter-count">{categoryCounts.academic}</span>
                </label>
                
                <label className="custom-checkbox">
                  <input 
                    type="checkbox"
                    checked={filters.research}
                    onChange={() => handleFilterChange('research')}
                  />
                  <span className="checkmark"></span>
                  <span className="filter-label">Research Institutes</span>
                  <span className="filter-count">{categoryCounts.research}</span>
                </label>
                
                <label className="custom-checkbox">
                  <input 
                    type="checkbox"
                    checked={filters.government}
                    onChange={() => handleFilterChange('government')}
                  />
                  <span className="checkmark"></span>
                  <span className="filter-label">Government</span>
                  <span className="filter-count">{categoryCounts.government}</span>
                </label>
                
                <label className="custom-checkbox">
                  <input 
                    type="checkbox"
                    checked={filters.energy}
                    onChange={() => handleFilterChange('energy')}
                  />
                  <span className="checkmark"></span>
                  <span className="filter-label">Energy</span>
                  <span className="filter-count">{categoryCounts.energy}</span>
                </label>
                
                <label className="custom-checkbox">
                  <input 
                    type="checkbox"
                    checked={filters.technology}
                    onChange={() => handleFilterChange('technology')}
                  />
                  <span className="checkmark"></span>
                  <span className="filter-label">Technology</span>
                  <span className="filter-count">{categoryCounts.technology}</span>
                </label>
                
                <label className="custom-checkbox">
                  <input 
                    type="checkbox"
                    checked={filters.foodBeverage}
                    onChange={() => handleFilterChange('foodBeverage')}
                  />
                  <span className="checkmark"></span>
                  <span className="filter-label">Food & Beverage</span>
                  <span className="filter-count">{categoryCounts.foodBeverage}</span>
                </label>
                
                <label className="custom-checkbox">
                  <input 
                    type="checkbox"
                    checked={filters.hospitality}
                    onChange={() => handleFilterChange('hospitality')}
                  />
                  <span className="checkmark"></span>
                  <span className="filter-label">Hospitality</span>
                  <span className="filter-count">{categoryCounts.hospitality}</span>
                </label>
              </div>
            </div>
            
            <div className="filter-actions">
              <button className="filter-button reset-filter" onClick={resetFilters}>Reset</button>
              <button className="filter-button apply-filter">Apply</button>
            </div>
          </div>

          {/* Partners list */}
          <div className="partners-list" style={{ flex: '1' }}>
            <div className="partners-list-header">
              <h3 className="partners-list-title">All Partners</h3>
              <span className="partners-count">{filteredPartners.length}</span>
            </div>
            
            {filteredPartners.length > 0 ? (
              <>
                <div className="partners-grid">
                  {currentPartners.map((partner) => (
                    <div key={partner.id} className="partner-card-item">
                      <div className="partner-card-header">
                        <div className="partner-logo-container">
                          {partner.logo ? (
                            <img 
                              src={partner.logo} 
                              alt={`${partner.name} logo`}
                              className="partner-logo"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                // Force re-render to show the icon instead
                                if (e.currentTarget.parentElement) {
                                  e.currentTarget.parentElement.classList.add('show-icon');
                                }
                              }}
                            />
                          ) : null}
                          <div className={`partner-icon-fallback ${!partner.logo ? 'show-icon' : ''}`}>
                            {partner.icon}
                          </div>
                        </div>
                        <h3 className="partner-name">{partner.name}</h3>
                      </div>
                      
                      <div className="partner-card-body">
                        <span className="partner-category">{partner.category}</span>
                        <p className="partner-description">{partner.description}</p>
                      </div>
                      
                      <div className="partner-card-footer">
                        <div className="partner-location">
                          <FaMapMarkerAlt /> {partner.location}
                        </div>
                        <a href={partner.link} className="partner-view-link">
                          View Details <FaChevronRight />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination controls */}
                {filteredPartners.length > partnersPerPage && (
                  <div className="pagination-controls">
                    <button 
                      className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      aria-label="Previous page"
                    >
                      <FaChevronLeft />
                      <span>Previous</span>
                    </button>
                    
                    <div className="pagination-pages">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          className={`pagination-page-number ${currentPage === page ? 'active' : ''}`}
                          onClick={() => handlePageClick(page)}
                          aria-label={`Page ${page}`}
                          aria-current={currentPage === page ? 'page' : undefined}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    
                    <button 
                      className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      aria-label="Next page"
                    >
                      <span>Next</span>
                      <FaChevronRight />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h3 className="empty-title">No partners found</h3>
                <p className="empty-message">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { FaUniversity, FaMapMarkerAlt, FaHandshake, FaEnvelope, FaInfoCircle, FaChevronLeft, FaChevronRight, FaCalendarAlt, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { allPartners, filterAndSortPartners, getCategoryCounts, defaultFilterState, SORT_OPTIONS, formatDate, getYear, getMonth } from './Partners';

// Import the PartnerCarousel component
const PartnerCarousel = dynamic(() => import('./PartnerCarousel'), {
  ssr: false,
  loading: () => <div className="loading-placeholder">Loading partners...</div>
});

export default function HomePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState(defaultFilterState);
  const [sortOption, setSortOption] = useState(""); // Default to empty string (no sorting)
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const partnersPerPage = 9;
  
  // Add effect to ensure component is mounted
  useEffect(() => {
    setIsLoaded(true);
    
    // Log for debugging
    console.log("HomePage component mounted");
  }, []);
  
  // Move the debug log hook up here with the other hooks
  useEffect(() => {
    if (allPartners.length > 0 && allPartners[0].partneredSince) {
      console.log("Test date parsing:", allPartners[0].partneredSince);
      console.log("Month using imported function:", getMonth(allPartners[0].partneredSince));
      console.log("Year using imported function:", getYear(allPartners[0].partneredSince));
    }
  }, []);
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  // Add these handler functions for the buttons
  const handleLearnMoreClick = () => {
    console.log("Learn More clicked - navigating to benefits page");
    router.push('/partnership-benefits');
  };
  
  const handleContactUsClick = () => {
    console.log("Contact Us clicked - navigating to contact page");
    router.push('/contact');
  };
  
  // Update to use the new filterAndSortPartners function
  const filteredPartners = filterAndSortPartners(allPartners, searchTerm, filters, sortOption);

  // Handle filter changes
  const handleFilterChange = (filter) => {
    setFilters({
      ...filters,
      [filter]: !filters[filter]
    });
  };
  
  // Handle sort option change
  const handleSortChange = (option) => {
    // If clicking the already selected option, clear it (toggle off)
    setSortOption(prevOption => prevOption === option ? "" : option);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  // Reset all filters and sorting
  const resetFilters = () => {
    setSearchTerm("");
    setFilters(defaultFilterState);
    setSortOption(""); // Reset sorting too
  };

  const totalPages = Math.ceil(filteredPartners.length / partnersPerPage);
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // Scroll back to the top of the partners list
      setTimeout(() => {
        document.querySelector('.partners-list-header')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setTimeout(() => {
        document.querySelector('.partners-list-header')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };
  
  const handlePageClick = (page) => {
    setCurrentPage(page);
    // Add a small delay to ensure state updates before scrolling
    setTimeout(() => {
      const header = document.querySelector('.partners-list-header');
      if (header) {
        header.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };
  
  // Calculate which partners to display on the current page
  const indexOfLastPartner = currentPage * partnersPerPage;
  const indexOfFirstPartner = indexOfLastPartner - partnersPerPage;
  const currentPartners = filteredPartners.slice(indexOfFirstPartner, indexOfLastPartner);
  
  // Use the imported getCategoryCounts function
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
                
                {/* Add Nonprofit filter */}
                <label className="custom-checkbox">
                  <input 
                    type="checkbox"
                    checked={filters.nonprofit}
                    onChange={() => handleFilterChange('nonprofit')}
                  />
                  <span className="checkmark"></span>
                  <span className="filter-label">Nonprofit</span>
                  <span className="filter-count">{categoryCounts.nonprofit}</span>
                </label>

                {/* Add Private Sector filter */}
                <label className="custom-checkbox">
                  <input 
                    type="checkbox"
                    checked={filters.privateSector}
                    onChange={() => handleFilterChange('privateSector')}
                  />
                  <span className="checkmark"></span>
                  <span className="filter-label">Private Sector</span>
                  <span className="filter-count">{categoryCounts.privateSector}</span>
                </label>
              </div>
            </div>
            
            {/* Update the sort section */}
            <div className="filter-category">
              <div className="filter-category-title">
                <FaSortAmountDown /> Sort By
              </div>
              <div className="filter-options sort-options">
                {/* Remove the Default option */}
                <label className="custom-radio">
                  <input 
                    type="radio"
                    checked={sortOption === SORT_OPTIONS.DATE_NEWEST}
                    onChange={() => handleSortChange(SORT_OPTIONS.DATE_NEWEST)}
                    name="sortOption"
                  />
                  <span className="radio-checkmark"></span>
                  <span className="filter-label">Newest Partners</span>
                </label>
                
                <label className="custom-radio">
                  <input 
                    type="radio"
                    checked={sortOption === SORT_OPTIONS.DATE_OLDEST}
                    onChange={() => handleSortChange(SORT_OPTIONS.DATE_OLDEST)}
                    name="sortOption"
                  />
                  <span className="radio-checkmark"></span>
                  <span className="filter-label">Longest Partnerships</span>
                </label>
                
                <label className="custom-radio">
                  <input 
                    type="radio"
                    checked={sortOption === SORT_OPTIONS.NAME_ASC}
                    onChange={() => handleSortChange(SORT_OPTIONS.NAME_ASC)}
                    name="sortOption"
                  />
                  <span className="radio-checkmark"></span>
                  <span className="filter-label">Name (A-Z)</span>
                </label>
                
                <label className="custom-radio">
                  <input 
                    type="radio"
                    checked={sortOption === SORT_OPTIONS.NAME_DESC}
                    onChange={() => handleSortChange(SORT_OPTIONS.NAME_DESC)}
                    name="sortOption"
                  />
                  <span className="radio-checkmark"></span>
                  <span className="filter-label">Name (Z-A)</span>
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
                        <div className="partner-metadata">
                          <span className="partner-category">{partner.category}</span>
                          {partner.partneredSince && (
                            <span className="partner-date">
                              <FaCalendarAlt size={14} />
                              <span>Partner since {getMonth(partner.partneredSince)}{getYear(partner.partneredSince)}</span>
                            </span>
                          )}
                        </div>
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
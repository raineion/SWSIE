"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { FaUniversity, FaMapMarkerAlt, FaHandshake, FaEnvelope, FaChevronLeft, FaChevronRight, FaCalendarAlt, FaSortAmountDown, FaCheck, FaFilter, FaBuilding } from 'react-icons/fa';
import { allPartners, filterAndSortPartners, getCategoryCounts, defaultFilterState, SORT_OPTIONS, getYear, getMonth } from '../components/Partners';
import Layout from '../components/Layout';

// Import the PartnerCarousel component
const PartnerCarousel = dynamic(() => import('../components/PartnerCarousel'), {
  ssr: false,
  loading: () => <div className="loading-placeholder"></div>
});

export default function PartnersPage() {
  // State setup
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState(defaultFilterState);
  const [sortOption, setSortOption] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const partnersPerPage = 9;
  
  // Add states to track button hover states
  const [resetHovered, setResetHovered] = useState(false);
  const [applyHovered, setApplyHovered] = useState(false);
  const [applyPressed, setApplyPressed] = useState(false);

  // Add effect to ensure component is mounted
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);
  
  // Update handler for Contact Us button to open email instead of navigation
  const handleContactUsClick = (e) => {
    e.preventDefault();
    window.location.href = 'mailto:swsie@asu.edu?subject=Partnership%20Inquiry';
  };
  
  // Filter and sort partners
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
    setSortOption("");
  };

  const totalPages = Math.ceil(filteredPartners.length / partnersPerPage);
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
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

  // Apply button handler
  const handleApplyFilters = () => {
    setApplyPressed(true);
    // Just refresh the current filters to trigger re-render
    setFilters({...filters});
    setTimeout(() => setApplyPressed(false), 200);
  };

  if (!isLoaded) {
    return (
      <Layout>
        <div className="loading-placeholder">Loading partners...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="partners-page" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 700, 
          textAlign: 'center', 
          marginBottom: '1.5rem' 
        }}>
          Our Partners
        </h1>
        
        {/* Featured Partners section with carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ background: 'transparent', marginBottom: '40px' }}
        >
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 600, 
            marginBottom: '1rem' 
          }}>
          </h2>
          <PartnerCarousel />
        </motion.div>

        {/* Partners list with filter */}
        <motion.div
          className="partners-list-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'nowrap', // Changed to keep the sidebar fixed
            alignItems: 'flex-start'
          }}
        >
          {/* Filter section with blue accents - improved selection indicators */}
          <div className="filter-section" style={{ 
            flex: '0 0 260px',
            position: 'sticky',
            top: '20px',
            alignSelf: 'flex-start',
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
            maxHeight: 'calc(100vh - 40px)',
            overflowY: 'auto'
            // Removed yellow border on the left
          }}>
            <h3 className="filter-title" style={{ 
              marginBottom: '20px', 
              fontSize: '1.2rem',
              fontWeight: 600,
              color: '#0066cc', /* Blue accent text instead of yellow */
              borderBottom: '2px solid #e6f0ff', /* Light blue border instead of yellow */
              paddingBottom: '8px'
            }}>Filter Partners</h3>
            
            <div className="search-container" style={{ marginBottom: '25px' }}>
              <input 
                type="text" 
                className="filter-input" 
                placeholder="Search partners..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05) inset',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0066cc'} /* Blue focus border */
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>
            
            {/* Categories Filter with blue accents */}
            <div className="filter-category" style={{ marginBottom: '25px' }}>
              <div className="filter-category-title" style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 600,
                marginBottom: '15px',
                fontSize: '1.05rem',
                paddingBottom: '8px',
                borderBottom: '1px solid #e6f0ff', /* Light blue border */
                color: '#004080' /* Darker blue text */
              }}>
                <FaUniversity style={{ color: '#0066cc' }} /> Categories
              </div>
              
              <div className="filter-options" style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '14px' /* Increased for better spacing */
              }}>
                {/* Academic filter option with FILLED checkbox */}
                <label 
                  className="custom-checkbox" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    cursor: 'pointer',
                    userSelect: 'none',
                    padding: '4px 6px',
                    borderRadius: '4px',
                    backgroundColor: filters.academic ? 'rgba(0, 102, 204, 0.08)' : 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!filters.academic) {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!filters.academic) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: `1px solid ${filters.academic ? '#0066cc' : '#ccc'}`,
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: filters.academic ? '#0066cc' : '#fff', /* Full blue fill when selected */
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                    position: 'relative'
                  }}>
                    {filters.academic && (
                      <FaCheck size={12} color="white" />
                    )}
                  </div>
                  <input 
                    type="checkbox" 
                    checked={filters.academic}
                    onChange={() => handleFilterChange('academic')}
                    style={{ position: 'absolute', opacity: 0 }}
                  />
                  <span style={{ flex: 1, fontSize: '0.95rem' }}>Academic</span>
                  <span style={{ 
                    backgroundColor: '#e6f0ff', /* Light blue background */
                    borderRadius: '12px', 
                    padding: '2px 8px',
                    fontSize: '0.8rem',
                    color: '#004080', /* Darker blue text */
                    fontWeight: '500',
                    flexShrink: 0
                  }}>
                    {categoryCounts.academic}
                  </span>
                </label>

                {/* Apply the same blue styling pattern to all other category checkboxes */}
                {/* Showing just one more as an example, repeat for all others */}
                <label 
                  className="custom-checkbox" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    cursor: 'pointer',
                    userSelect: 'none',
                    padding: '4px 6px',
                    borderRadius: '4px',
                    backgroundColor: filters.research ? 'rgba(0, 102, 204, 0.08)' : 'transparent', /* Light blue background when selected */
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!filters.research) {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!filters.research) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: `1px solid ${filters.research ? '#0066cc' : '#ccc'}`,
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: filters.research ? '#0066cc' : '#fff', /* Blue fill when selected */
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                  }}>
                    {filters.research && (
                      <FaCheck size={12} color="white" />
                    )}
                  </div>
                  <input 
                    type="checkbox" 
                    checked={filters.research}
                    onChange={() => handleFilterChange('research')}
                    style={{ position: 'absolute', opacity: 0 }}
                  />
                  <span style={{ flex: 1, fontSize: '0.95rem' }}>Research Institutes</span>
                  <span style={{ 
                    backgroundColor: '#e6f0ff', /* Light blue background */
                    borderRadius: '12px', 
                    padding: '2px 8px',
                    fontSize: '0.8rem',
                    color: '#004080', /* Darker blue text */
                    fontWeight: '500',
                    flexShrink: 0
                  }}>
                    {categoryCounts.research}
                  </span>
                </label>
                
                {/* Apply the same pattern to all other category options */}
                {/* ... */}
                {/* Government filter option */}
                <label 
                  className="custom-checkbox" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    cursor: 'pointer',
                    userSelect: 'none',
                    padding: '4px 6px',
                    borderRadius: '4px',
                    backgroundColor: filters.government ? 'rgba(0, 102, 204, 0.08)' : 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!filters.government) {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!filters.government) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: `1px solid ${filters.government ? '#0066cc' : '#ccc'}`,
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: filters.government ? '#0066cc' : '#fff',
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                  }}>
                    {filters.government && (
                      <FaCheck size={12} color="white" />
                    )}
                  </div>
                  <input 
                    type="checkbox" 
                    checked={filters.government}
                    onChange={() => handleFilterChange('government')}
                    style={{ position: 'absolute', opacity: 0 }}
                  />
                  <span style={{ flex: 1, fontSize: '0.95rem' }}>Government</span>
                  <span style={{ 
                    backgroundColor: '#e6f0ff',
                    borderRadius: '12px', 
                    padding: '2px 8px',
                    fontSize: '0.8rem',
                    color: '#004080',
                    fontWeight: '500',
                    flexShrink: 0
                  }}>
                    {categoryCounts.government}
                  </span>
                </label>
                
                {/* Energy filter option */}
                <label 
                  className="custom-checkbox" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    cursor: 'pointer',
                    userSelect: 'none',
                    padding: '4px 6px',
                    borderRadius: '4px',
                    backgroundColor: filters.energy ? 'rgba(0, 102, 204, 0.08)' : 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!filters.energy) {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!filters.energy) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: `1px solid ${filters.energy ? '#0066cc' : '#ccc'}`,
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: filters.energy ? '#0066cc' : '#fff',
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                  }}>
                    {filters.energy && (
                      <FaCheck size={12} color="white" />
                    )}
                  </div>
                  <input 
                    type="checkbox" 
                    checked={filters.energy}
                    onChange={() => handleFilterChange('energy')}
                    style={{ position: 'absolute', opacity: 0 }}
                  />
                  <span style={{ flex: 1, fontSize: '0.95rem' }}>Energy</span>
                  <span style={{ 
                    backgroundColor: '#e6f0ff',
                    borderRadius: '12px', 
                    padding: '2px 8px',
                    fontSize: '0.8rem',
                    color: '#004080',
                    fontWeight: '500',
                    flexShrink: 0
                  }}>
                    {categoryCounts.energy}
                  </span>
                </label>
                
                {/* Technology filter option */}
                <label 
                  className="custom-checkbox" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    cursor: 'pointer',
                    userSelect: 'none',
                    padding: '4px 6px',
                    borderRadius: '4px',
                    backgroundColor: filters.technology ? 'rgba(0, 102, 204, 0.08)' : 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!filters.technology) {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!filters.technology) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: `1px solid ${filters.technology ? '#0066cc' : '#ccc'}`,
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: filters.technology ? '#0066cc' : '#fff',
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                  }}>
                    {filters.technology && (
                      <FaCheck size={12} color="white" />
                    )}
                  </div>
                  <input 
                    type="checkbox" 
                    checked={filters.technology}
                    onChange={() => handleFilterChange('technology')}
                    style={{ position: 'absolute', opacity: 0 }}
                  />
                  <span style={{ flex: 1, fontSize: '0.95rem' }}>Technology</span>
                  <span style={{ 
                    backgroundColor: '#e6f0ff',
                    borderRadius: '12px', 
                    padding: '2px 8px',
                    fontSize: '0.8rem',
                    color: '#004080',
                    fontWeight: '500',
                    flexShrink: 0
                  }}>
                    {categoryCounts.technology}
                  </span>
                </label>
                
                {/* Food & Beverage filter option */}
                <label 
                  className="custom-checkbox" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    cursor: 'pointer',
                    userSelect: 'none',
                    padding: '4px 6px',
                    borderRadius: '4px',
                    backgroundColor: filters.foodBeverage ? 'rgba(0, 102, 204, 0.08)' : 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!filters.foodBeverage) {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!filters.foodBeverage) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: `1px solid ${filters.foodBeverage ? '#0066cc' : '#ccc'}`,
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: filters.foodBeverage ? '#0066cc' : '#fff',
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                  }}>
                    {filters.foodBeverage && (
                      <FaCheck size={12} color="white" />
                    )}
                  </div>
                  <input 
                    type="checkbox" 
                    checked={filters.foodBeverage}
                    onChange={() => handleFilterChange('foodBeverage')}
                    style={{ position: 'absolute', opacity: 0 }}
                  />
                  <span style={{ flex: 1, fontSize: '0.95rem' }}>Food & Beverage</span>
                  <span style={{ 
                    backgroundColor: '#e6f0ff',
                    borderRadius: '12px', 
                    padding: '2px 8px',
                    fontSize: '0.8rem',
                    color: '#004080',
                    fontWeight: '500',
                    flexShrink: 0
                  }}>
                    {categoryCounts.foodBeverage}
                  </span>
                </label>
                
                {/* Hospitality filter option */}
                <label 
                  className="custom-checkbox" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    cursor: 'pointer',
                    userSelect: 'none',
                    padding: '4px 6px',
                    borderRadius: '4px',
                    backgroundColor: filters.hospitality ? 'rgba(0, 102, 204, 0.08)' : 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!filters.hospitality) {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!filters.hospitality) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: `1px solid ${filters.hospitality ? '#0066cc' : '#ccc'}`,
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: filters.hospitality ? '#0066cc' : '#fff',
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                  }}>
                    {filters.hospitality && (
                      <FaCheck size={12} color="white" />
                    )}
                  </div>
                  <input 
                    type="checkbox" 
                    checked={filters.hospitality}
                    onChange={() => handleFilterChange('hospitality')}
                    style={{ position: 'absolute', opacity: 0 }}
                  />
                  <span style={{ flex: 1, fontSize: '0.95rem' }}>Hospitality</span>
                  <span style={{ 
                    backgroundColor: '#e6f0ff',
                    borderRadius: '12px', 
                    padding: '2px 8px',
                    fontSize: '0.8rem',
                    color: '#004080',
                    fontWeight: '500',
                    flexShrink: 0
                  }}>
                    {categoryCounts.hospitality}
                  </span>
                </label>
                
                {/* Nonprofit filter option */}
                <label 
                  className="custom-checkbox" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    cursor: 'pointer',
                    userSelect: 'none',
                    padding: '4px 6px',
                    borderRadius: '4px',
                    backgroundColor: filters.nonprofit ? 'rgba(0, 102, 204, 0.08)' : 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!filters.nonprofit) {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!filters.nonprofit) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: `1px solid ${filters.nonprofit ? '#0066cc' : '#ccc'}`,
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: filters.nonprofit ? '#0066cc' : '#fff',
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                  }}>
                    {filters.nonprofit && (
                      <FaCheck size={12} color="white" />
                    )}
                  </div>
                  <input 
                    type="checkbox" 
                    checked={filters.nonprofit}
                    onChange={() => handleFilterChange('nonprofit')}
                    style={{ position: 'absolute', opacity: 0 }}
                  />
                  <span style={{ flex: 1, fontSize: '0.95rem' }}>Nonprofit</span>
                  <span style={{ 
                    backgroundColor: '#e6f0ff',
                    borderRadius: '12px', 
                    padding: '2px 8px',
                    fontSize: '0.8rem',
                    color: '#004080',
                    fontWeight: '500',
                    flexShrink: 0
                  }}>
                    {categoryCounts.nonprofit}
                  </span>
                </label>
                
                {/* Private Sector filter option */}
                <label 
                  className="custom-checkbox" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    cursor: 'pointer',
                    userSelect: 'none',
                    padding: '4px 6px',
                    borderRadius: '4px',
                    backgroundColor: filters.privateSector ? 'rgba(0, 102, 204, 0.08)' : 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!filters.privateSector) {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!filters.privateSector) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: `1px solid ${filters.privateSector ? '#0066cc' : '#ccc'}`,
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: filters.privateSector ? '#0066cc' : '#fff',
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                  }}>
                    {filters.privateSector && (
                      <FaCheck size={12} color="white" />
                    )}
                  </div>
                  <input 
                    type="checkbox" 
                    checked={filters.privateSector}
                    onChange={() => handleFilterChange('privateSector')}
                    style={{ position: 'absolute', opacity: 0 }}
                  />
                  <span style={{ flex: 1, fontSize: '0.95rem' }}>Private Sector</span>
                  <span style={{ 
                    backgroundColor: '#e6f0ff',
                    borderRadius: '12px', 
                    padding: '2px 8px',
                    fontSize: '0.8rem',
                    color: '#004080',
                    fontWeight: '500',
                    flexShrink: 0
                  }}>
                    {categoryCounts.privateSector}
                  </span>
                </label>
              </div>
            </div>
            
            {/* Sort Options with blue accents */}
            <div className="filter-category" style={{ marginBottom: '25px' }}>
              <div className="filter-category-title" style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 600,
                marginBottom: '15px',
                fontSize: '1.05rem',
                paddingBottom: '8px',
                borderBottom: '1px solid #e6f0ff', /* Light blue border */
                color: '#004080' /* Darker blue text */
              }}>
                <FaSortAmountDown style={{ color: '#0066cc' }} /> Sort By
              </div>
              
              {/* Sort Options with improved radio button selection indicators */}
              <div className="filter-options sort-options" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Newest Partners sort option with FULLY FILLED blue circle */}
                <label 
                  className="custom-radio" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    cursor: 'pointer',
                    userSelect: 'none',
                    padding: '4px 6px', 
                    borderRadius: '4px',
                    backgroundColor: sortOption === SORT_OPTIONS.DATE_NEWEST ? 'rgba(0, 102, 204, 0.08)' : 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (sortOption !== SORT_OPTIONS.DATE_NEWEST) {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (sortOption !== SORT_OPTIONS.DATE_NEWEST) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {/* Completely filled blue circle when selected */}
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: `2px solid ${sortOption === SORT_OPTIONS.DATE_NEWEST ? '#0066cc' : '#ccc'}`,
                    backgroundColor: sortOption === SORT_OPTIONS.DATE_NEWEST ? '#0066cc' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                  }}>
                    {/* White checkmark for contrast */}
                    {sortOption === SORT_OPTIONS.DATE_NEWEST && (
                      <FaCheck size={10} color="white" />
                    )}
                  </div>
                  <input 
                    type="radio"
                    checked={sortOption === SORT_OPTIONS.DATE_NEWEST}
                    onChange={() => handleSortChange(SORT_OPTIONS.DATE_NEWEST)}
                    name="sortOption"
                    style={{ position: 'absolute', opacity: 0 }}
                  />
                  <span style={{ flex: 1, fontSize: '0.95rem' }}>Newest Partners</span>
                </label>
                
                {/* Longest Partnerships sort option with better filled bubble */}
                <label 
                  className="custom-radio" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    cursor: 'pointer',
                    userSelect: 'none',
                    padding: '4px 6px',
                    borderRadius: '4px',
                    backgroundColor: sortOption === SORT_OPTIONS.DATE_OLDEST ? 'rgba(0, 102, 204, 0.08)' : 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (sortOption !== SORT_OPTIONS.DATE_OLDEST) {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (sortOption !== SORT_OPTIONS.DATE_OLDEST) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: `2px solid ${sortOption === SORT_OPTIONS.DATE_OLDEST ? '#0066cc' : '#ccc'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: sortOption === SORT_OPTIONS.DATE_OLDEST ? '#0066cc' : '#fff', // Full blue fill when selected
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                    position: 'relative'
                  }}>
                    {sortOption === SORT_OPTIONS.DATE_OLDEST && (
                      <FaCheck size={10} color="white" />
                    )}
                  </div>
                  <input 
                    type="radio"
                    checked={sortOption === SORT_OPTIONS.DATE_OLDEST}
                    onChange={() => handleSortChange(SORT_OPTIONS.DATE_OLDEST)}
                    name="sortOption"
                    style={{ position: 'absolute', opacity: 0 }}
                  />
                  <span style={{ flex: 1, fontSize: '0.95rem' }}>Longest Partnerships</span>
                </label>
                
                {/* Name (A-Z) sort option with better filled bubble */}
                <label 
                  className="custom-radio" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    cursor: 'pointer',
                    userSelect: 'none',
                    padding: '4px 6px',
                    borderRadius: '4px',
                    backgroundColor: sortOption === SORT_OPTIONS.NAME_ASC ? 'rgba(0, 102, 204, 0.08)' : 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (sortOption !== SORT_OPTIONS.NAME_ASC) {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (sortOption !== SORT_OPTIONS.NAME_ASC) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: `2px solid ${sortOption === SORT_OPTIONS.NAME_ASC ? '#0066cc' : '#ccc'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: sortOption === SORT_OPTIONS.NAME_ASC ? '#0066cc' : '#fff', // Full blue fill when selected
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                    position: 'relative'
                  }}>
                    {sortOption === SORT_OPTIONS.NAME_ASC && (
                      <FaCheck size={10} color="white" />
                    )}
                  </div>
                  <input 
                    type="radio"
                    checked={sortOption === SORT_OPTIONS.NAME_ASC}
                    onChange={() => handleSortChange(SORT_OPTIONS.NAME_ASC)}
                    name="sortOption"
                    style={{ position: 'absolute', opacity: 0 }}
                  />
                  <span style={{ flex: 1, fontSize: '0.95rem' }}>Name (A-Z)</span>
                </label>
                
                {/* Name (Z-A) sort option with better filled bubble */}
                <label 
                  className="custom-radio" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    cursor: 'pointer',
                    userSelect: 'none',
                    padding: '4px 6px',
                    borderRadius: '4px',
                    backgroundColor: sortOption === SORT_OPTIONS.NAME_DESC ? 'rgba(0, 102, 204, 0.08)' : 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (sortOption !== SORT_OPTIONS.NAME_DESC) {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (sortOption !== SORT_OPTIONS.NAME_DESC) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: `2px solid ${sortOption === SORT_OPTIONS.NAME_DESC ? '#0066cc' : '#ccc'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: sortOption === SORT_OPTIONS.NAME_DESC ? '#0066cc' : '#fff', // Full blue fill when selected
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                    position: 'relative'
                  }}>
                    {sortOption === SORT_OPTIONS.NAME_DESC && (
                      <FaCheck size={10} color="white" />
                    )}
                  </div>
                  <input 
                    type="radio"
                    checked={sortOption === SORT_OPTIONS.NAME_DESC}
                    onChange={() => handleSortChange(SORT_OPTIONS.NAME_DESC)}
                    name="sortOption"
                    style={{ position: 'absolute', opacity: 0 }}
                  />
                  <span style={{ flex: 1, fontSize: '0.95rem' }}>Name (Z-A)</span>
                </label>
              </div>
            </div>
            
            {/* Filter Actions with improved hover functionality */}
            <div className="filter-actions" style={{ 
              display: 'flex', 
              gap: '10px',
              marginTop: '30px'
            }}>
              <button 
                onClick={resetFilters} 
                onMouseEnter={() => setResetHovered(true)}
                onMouseLeave={() => setResetHovered(false)}
                className={`filter-button reset-filter`}
                style={{
                  backgroundColor: resetHovered ? '#e5e5e5' : '#f1f1f1',
                }}
              >
                Reset
              </button>
              <button 
                onClick={handleApplyFilters}
                onMouseEnter={() => setApplyHovered(true)}
                onMouseLeave={() => setApplyHovered(false)}
                className="filter-button apply-filter"
                style={{
                  backgroundColor: '#0066cc',
                  background: '#0066cc',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  boxShadow: '0 2px 4px rgba(0, 102, 204, 0.3)',
                  opacity: '1',
                  visibility: 'visible',
                  display: 'flex',
                  position: 'relative',
                  zIndex: '999',
                  transform: applyPressed ? 'scale(0.98)' : 'scale(1)',
                  transition: 'all 0.2s ease',
                  borderRadius: '8px',
                  padding: '10px 15px',
                  flex: '1',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '44px',
                  cursor: 'pointer',
                  textTransform: 'none'
                }}
              >
                Apply
              </button>
            </div>
          </div>

          {/* Partners list */}
          <div className="partners-list" style={{ flex: 1 }}>
            <div className="partners-list-header" style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              padding: '0 5px'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>All Partners</h2>
              <span style={{ 
                background: '#f0f0f0', 
                borderRadius: '20px', 
                padding: '3px 12px',
                fontSize: '0.9rem',
                fontWeight: 500
              }}>
                {filteredPartners.length}
              </span>
            </div>
            
            {filteredPartners.length > 0 ? (
              <>
                <div style={{
                  display: 'grid',
                  /* Make cards smaller */
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', /* Reduced from 280px */
                  gap: '16px' /* Reduced from 18px */
                }}>
                  {currentPartners.map((partner) => (
                    <motion.div 
                      key={partner.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{
                        y: -5,
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
                      }}
                      style={{
                        background: 'white',
                        borderRadius: '10px', /* Reduced from 12px */
                        overflow: 'hidden',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s ease',
                        /* Further reduce the min-height */
                        minHeight: '380px' /* Reduced from 400px */
                      }}
                    >
                      {/* Partner card header with name and logo */}
                      <div style={{ 
                        padding: '14px', /* Reduced from 16px */
                        borderBottom: '1px solid #f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px' /* Reduced from 12px */
                      }}>
                        {/* Partner logo container - remove border for seamless look */}
                        <div style={{ 
                          width: '55px', /* Reduced from 60px */
                          height: '55px', /* Reduced from 60px */
                          flexShrink: 0,
                          borderRadius: '6px',
                          /* Border removed for seamless look */
                          border: 'none',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'transparent' /* Changed from #f9f9f9 for seamless appearance */
                        }}>
                          {partner.logo ? (
                            <img 
                              src={partner.logo} 
                              alt={`${partner.name} logo`}
                              style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain'
                              }}
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                if (e.currentTarget.parentElement) {
                                  e.currentTarget.parentElement.innerHTML = partner.icon 
                                    ? partner.icon 
                                    : `<div style="color:#999;font-size:1.5rem;">${partner.name.charAt(0)}</div>`;
                                }
                              }}
                            />
                          ) : (
                            <div style={{ color: '#999', fontSize: '1.5rem' }}>
                              {partner.icon || partner.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        
                        <div style={{ flex: 1 }}>
                          <h3 style={{ 
                            fontSize: '1rem', /* Reduced from 1.1rem */
                            fontWeight: 600, 
                            marginBottom: '5px', /* Reduced from 6px */
                            color: '#222' 
                          }}>
                            {partner.name}
                          </h3>
                          
                          {/* Make the tags more compact */}
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '4px', /* Reduced from 5px */
                            flexWrap: 'wrap'
                          }}>
                            {/* Category tag - even smaller */}
                            <span style={{
                              fontSize: '0.7rem', /* Reduced from 0.75rem */
                              padding: '1px 5px', /* Reduced from 2px 6px */
                              backgroundColor: 'rgba(0, 102, 204, 0.08)',
                              borderRadius: '12px', /* Reduced from 14px */
                              color: '#0066cc',
                              fontWeight: 500,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '2px', /* Reduced from 3px */
                              border: '1px solid rgba(0, 102, 204, 0.15)'
                            }}>
                              <FaBuilding size={8} /> {/* Reduced from 9px */}
                              {partner.category}
                            </span>
                            
                            {/* Partner since tag - even smaller */}
                            {partner.partneredSince && (
                              <span style={{
                                fontSize: '0.7rem', /* Reduced from 0.75rem */
                                padding: '1px 5px', /* Reduced from 2px 6px */
                                backgroundColor: 'rgba(75, 192, 192, 0.08)',
                                borderRadius: '12px',
                                color: '#2a9d8f',
                                fontWeight: 500,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2px',
                                border: '1px solid rgba(75, 192, 192, 0.15)'
                              }}>
                                <FaCalendarAlt size={8} />
                                Since {getMonth(partner.partneredSince)}{getYear(partner.partneredSince)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Partner card body with description - more compact */}
                      <div style={{ 
                        padding: '12px', /* Reduced from 14px */
                        flex: 1 
                      }}>
                        <p style={{ 
                          fontSize: '0.85rem', /* Reduced from 0.9rem */
                          lineHeight: 1.4, /* Reduced from 1.5 */
                          color: '#444',
                          margin: 0 /* Remove default margins */
                        }}>
                          {partner.description}
                        </p>
                      </div>
                      
                      {/* Partner card footer - more compact */}
                      <div style={{ 
                        padding: '10px', /* Reduced from 12px */
                        borderTop: '1px solid #f0f0f0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#fafafa'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.8rem', color: '#666' }}>
                          <FaMapMarkerAlt size={10} /> {/* Reduced from 12px */}
                          {partner.location}
                        </div>
                        <motion.a 
                          href={partner.link} 
                          whileHover={{ 
                            color: '#004999',
                            x: 3
                          }}
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '3px',
                            color: '#0066cc',
                            fontSize: '0.8rem', /* Reduced from 0.85rem */
                            textDecoration: 'none',
                            fontWeight: 500
                          }}
                        >
                          View Details <FaChevronRight size={9} /> {/* Reduced from 10px */}
                        </motion.a>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Pagination controls */}
                <style jsx global>{`
                  .pagination-button-active {
                    background-color: #0066cc !important;
                    color: white !important;
                  }
                `}</style>
                {filteredPartners.length > partnersPerPage && (
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '35px',
                    gap: '10px'
                  }}>
                    {/* Previous button */}
                    <motion.button 
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      whileHover={currentPage !== 1 ? { y: -2, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' } : {}}
                      style={{
                        padding: '8px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: currentPage === 1 ? '#f0f0f0' : '#fff',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        color: currentPage === 1 ? '#aaa' : '#333',
                        cursor: currentPage === 1 ? 'default' : 'pointer',
                        fontWeight: 500,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <FaChevronLeft size={14} />
                      <span>Previous</span>
                    </motion.button>
                    
                    <div style={{ display: 'flex', gap: '5px' }}>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <motion.button
                          key={page}
                          onClick={() => handlePageClick(page)}
                          whileHover={currentPage !== page ? { y: -2, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' } : {}}
                          className={currentPage === page ? 'pagination-button-active' : ''}
                          style={{
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 500,
                            transition: 'all 0.2s ease',
                            // Removed background/color inline styles to let the CSS class handle it
                          }}
                        >
                          {page}
                        </motion.button>
                      ))}
                    </div>
                    
                    {/* Next button */}
                    <motion.button 
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      whileHover={currentPage !== totalPages ? { y: -2, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' } : {}}
                      style={{
                        padding: '8px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: currentPage === totalPages ? '#f0f0f0' : '#fff',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        color: currentPage === totalPages ? '#aaa' : '#333',
                        cursor: currentPage === totalPages ? 'default' : 'pointer',
                        fontWeight: 500,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span>Next</span>
                      <FaChevronRight size={14} />
                    </motion.button>
                  </div>
                )}
              </>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '60px 0', 
                background: '#f9f9f9',
                borderRadius: '12px',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.03)'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🔍</div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '10px', color: '#333' }}>No partners found</h3>
                <p style={{ color: '#666' }}>Try adjusting your search or filters</p>
                <button 
                  onClick={resetFilters}
                  style={{
                    background: 'transparent',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    padding: '8px 20px',
                    marginTop: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0f0f0';
                    e.currentTarget.style.borderColor = '#ccc';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = '#ddd';
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}

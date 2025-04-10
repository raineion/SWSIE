"use client"

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Layout from '../components/Layout';
import PageTransition from '../components/PageTransition';
import { 
  FaChartBar, FaMapMarkerAlt,
  FaCalendarAlt, FaChartLine, FaProjectDiagram, FaUserFriends, 
  FaTools, FaShieldAlt, FaSearch, FaDownload, FaGlobeAmericas
} from 'react-icons/fa';
import { motion } from 'framer-motion';

// Import CSS
import '../../styles/analytics.css';

// Dropdown portal component that renders outside the normal DOM hierarchy
const DropdownPortal = ({ isOpen, onClose, buttonRef, children }) => {
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    // Create portal element on first render
    const el = document.createElement('div');
    el.style.position = 'absolute';
    el.style.zIndex = '99999';
    el.style.top = '0';
    el.style.left = '0';
    document.body.appendChild(el);
    setPortalElement(el); 

    // Clean up on unmount
    return () => {
      document.body.removeChild(el);
    };
  }, []);

  // Update dropdown position when button reference or open state changes
  useEffect(() => {
    if (buttonRef.current && isOpen) {
      const rect = buttonRef.current.getBoundingClientRect();
      const isDateSelector = buttonRef.current.closest('.date-selector');
      
      if (isDateSelector) {
        // Position the date selector dropdown right-aligned but directly under the button
        setPosition({
          top: rect.bottom + window.scrollY,
          left: rect.right - 180 + window.scrollX, // Align to right edge minus dropdown width
          width: rect.width
        });
      } else {
        // Default positioning for other dropdowns
        setPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width
        });
      }
    }
  }, [buttonRef, isOpen]);

  // Add click outside listener
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && buttonRef.current && !buttonRef.current.contains(e.target) && portalElement && !portalElement.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, buttonRef, portalElement]);

  // Don't render if we don't have a portal element or if dropdown is closed
  if (!portalElement || !isOpen) return null;

  // Render dropdown via portal
  return createPortal(
    <div className="analytics-dropdown-portal" style={{
      position: 'absolute',
      top: `${position.top + 5}px`,
      left: `${position.left}px`,
    }}>
      <div className="analytics-dropdown-content">
        {children}
      </div>
    </div>,
    portalElement
  );
};

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('Last 12 months');
  const dateRangeRef = useRef(null);
  
  // Add state for region selector dropdown
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const regionDropdownRef = useRef(null);
  
  // Handle region selection
  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setRegionDropdownOpen(false);
  };
  
  // Handle date range selection
  const handleDateRangeSelect = (range) => {
    setSelectedDateRange(range);
    setDateRangeOpen(false);
  };

  // Define animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const cardVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <Layout>
      <PageTransition>
        <motion.div
          className="analytics-page"
          initial="initial"
          animate="animate"
          variants={pageVariants}
        >
          {/* Clean header with date selector */}
          <motion.div 
            className="analytics-header"
            variants={cardVariants}
          >
            <h1 className="analytics-title">NSF Engines Partner Analytics</h1>
            
            <div className="header-controls">
              {/* Date selector */}
              <div className="date-selector" ref={dateRangeRef}>
                <div 
                  className="date-selector-control"
                  onClick={() => setDateRangeOpen(!dateRangeOpen)}
                >
                  <span className="date-selector-label">Viewing data for: </span>
                  <span className="date-selector-value">{selectedDateRange}</span>
                </div>
                
                <DropdownPortal 
                  isOpen={dateRangeOpen} 
                  onClose={() => setDateRangeOpen(false)}
                  buttonRef={dateRangeRef}
                >
                  {['Last 30 days', 'Last 90 days', 'Last 6 months', 'Last 12 months', 'Year to date', 'All time'].map(range => (
                    <div 
                      key={range}
                      className={`analytics-dropdown-item ${selectedDateRange === range ? 'selected' : ''}`}
                      onClick={() => handleDateRangeSelect(range)}
                    >
                      {range}
                    </div>
                  ))}
                </DropdownPortal>
              </div>
            </div>
          </motion.div>
          
          {/* Dashboard Navigation */}
          <motion.nav 
            className="dashboard-nav"
            variants={cardVariants}
          >
            <div 
              className={`dashboard-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </div>
            <div 
              className={`dashboard-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              Projects
            </div>
            <div 
              className={`dashboard-nav-item ${activeTab === 'research' ? 'active' : ''}`}
              onClick={() => setActiveTab('research')}
            >
              Research
            </div>
            <div 
              className={`dashboard-nav-item ${activeTab === 'impact' ? 'active' : ''}`}
              onClick={() => setActiveTab('impact')}
            >
              Impact
            </div>
          </motion.nav>
          
          {/* Dashboard Content */}
          <div className="analytics-dashboard">
            {/* Regional Impact Map */}
            <motion.div 
              className="analytics-card heatmap-card"
              variants={cardVariants}
            >
              <div className="card-header">
                <div className="card-title">
                  <h2>Regional Impact Map</h2>
                </div>
                <div className="card-actions">
                </div>
              </div>
              
              <div className="heatmap-container">
                <div className="placeholder-map"></div>
                {/* Region selector moved to inside the heatmap container with absolute positioning */}
                <div 
                  className="map-region-selector" 
                  ref={regionDropdownRef}
                >
                  <div 
                    onClick={() => setRegionDropdownOpen(!regionDropdownOpen)}
                  >
                    <FaMapMarkerAlt style={{ color: '#0066cc', fontSize: '0.9rem' }} />
                    <span>{selectedRegion}</span>
                  </div>
                  
                  <DropdownPortal 
                    isOpen={regionDropdownOpen} 
                    onClose={() => setRegionDropdownOpen(false)}
                    buttonRef={regionDropdownRef}
                  >
                    {['All Regions', 'Nevada', 'Arizona', 'Utah'].map(region => (
                      <div 
                        key={region}
                        className={`analytics-dropdown-item ${selectedRegion === region ? 'selected' : ''}`}
                        onClick={() => handleRegionSelect(region)}
                      >
                        {region === 'All Regions' ? (
                          <><FaGlobeAmericas size={12} style={{marginRight: '6px'}} /> {region}</>
                        ) : (
                          <><FaMapMarkerAlt size={12} style={{marginRight: '6px'}} /> {region}</>
                        )}
                      </div>
                    ))}
                  </DropdownPortal>
                </div>
                <div className="map-overlay">
                  <div className="coming-soon">Coming Soon</div>
                  <p>Interactive regional impact visualization is under development</p>
                </div>
                
                <div className="map-legend">
                  <div className="legend-title">Partner Concentration</div>
                  <div className="legend-item">
                    <div className="legend-color legend-high"></div>
                    <span>High (10+ partners)</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color legend-medium"></div>
                    <span>Medium (5-9 partners)</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color legend-low"></div>
                    <span>Low (1-4 partners)</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* KPI Metrics Row */}
            <div className="analytics-grid">
              {/* Active Projects KPI */}
              <motion.div 
                className="analytics-card"
                variants={cardVariants}
                custom={0}
              >
                <div className="card-header">
                  <div className="card-title">
                    <FaProjectDiagram className="card-icon" />
                    <h2>Active Projects</h2>
                  </div>
                </div>
                
                <div className="stats-container">
                  <div className="stat-item">
                    <span className="stat-number">
                      43
                      <span className="stat-trend">+12%</span>
                    </span>
                    <span className="stat-label">Total Projects</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">28</span>
                    <span className="stat-label">Collaborative</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">15</span>
                    <span className="stat-label">Individual</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Research Output KPI */}
              <motion.div 
                className="analytics-card"
                variants={cardVariants}
                custom={1}
              >
                <div className="card-header">
                  <div className="card-title">
                    <FaChartLine className="card-icon" />
                    <h2>Research Output</h2>
                  </div>
                </div>
                
                <div className="stats-container">
                  <div className="stat-item">
                    <span className="stat-number">
                      18
                      <span className="stat-trend">+28%</span>
                    </span>
                    <span className="stat-label">Publications</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">12</span>
                    <span className="stat-label">Patents Filed</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">5</span>
                    <span className="stat-label">Patents Granted</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Collaboration Metrics KPI */}
              <motion.div 
                className="analytics-card"
                variants={cardVariants}
                custom={2}
              >
                <div className="card-header">
                  <div className="card-title">
                    <FaUserFriends className="card-icon" />
                    <h2>Collaboration Metrics</h2>
                  </div>
                </div>
                
                <div className="stats-container">
                  <div className="stat-item">
                    <span className="stat-number">
                      35
                      <span className="stat-trend">+15%</span>
                    </span>
                    <span className="stat-label">Cross-Sector Projects</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">18</span>
                    <span className="stat-label">Joint Initiatives</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">22</span>
                    <span className="stat-label">Knowledge Transfers</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Project Activity and Timeline */}
            <div className="analytics-grid-2-1">
              {/* Recent Projects */}
              <motion.div 
                className="analytics-card"
                variants={cardVariants}
                custom={3}
              >
                <div className="card-header">
                  <div className="card-title">
                    <FaTools className="card-icon" />
                    <h2>Recent Project Activity</h2>
                  </div>
                  <div className="card-actions">
                    <button className="card-action-button">
                      <FaSearch />
                    </button>
                    <button className="card-action-button">
                      <FaDownload />
                    </button>
                  </div>
                </div>
                
                <div className="project-list-container">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="project-card">
                      <div className="project-icon">
                        <FaProjectDiagram />
                      </div>
                      <div className="project-content">
                        <h3 className="project-title">Water Conservation Initiative {i}</h3>
                        <div className="project-meta">
                          <div className="project-date">
                            <FaCalendarAlt size={12} /> Updated 2 days ago
                          </div>
                          <div className="project-partners">
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Partner Activity */}
              <motion.div 
                className="analytics-card"
                variants={cardVariants}
                custom={4}
              >
                <div className="card-header">
                  <div className="card-title">
                    <FaShieldAlt className="card-icon" />
                    <h2>Partner Highlights</h2>
                  </div>
                </div>
                
                <div className="activity-feed">
                  {[
                    { icon: <FaChartBar />, title: "ASU published new research", detail: "Water purification methods using novel materials", time: "2 days ago" },
                    { icon: <FaUserFriends />, title: "New partner joined", detail: "Welcoming City of Phoenix to the initiative", time: "1 week ago" },
                    { icon: <FaProjectDiagram />, title: "Project milestone reached", detail: "Desert conservation project phase 1 complete", time: "1 week ago" },
                    { icon: <FaChartLine />, title: "Funding milestone", detail: "$1.2M in additional research grants secured", time: "2 weeks ago" }
                  ].map((activity, i) => (
                    <div key={i} className="activity-item">
                      <div className="activity-icon">{activity.icon}</div>
                      <div className="activity-content">
                        <h4 className="activity-title">{activity.title}</h4>
                        <p className="activity-detail">{activity.detail}</p>
                        <span className="activity-timestamp">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </PageTransition>
    </Layout>
  );
}

"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  FaHome, FaInfoCircle, FaUserFriends, FaChartPie, FaHandshake
} from 'react-icons/fa';
import '../global.css';

// Pre-define navigation items outside component
const navigationItems = [
  { 
    name: 'Home', 
    path: '/', 
    icon: <FaHome />, 
    activeColor: '#0066cc',
    activeBackground: '#e6f2ff',
    activeShadow: '0 4px 12px rgba(0, 102, 204, 0.2)'
  },
  { 
    name: 'About', 
    path: '/about', 
    icon: <FaInfoCircle />, 
    activeColor: '#ffc107',
    activeBackground: '#fffde7',
    activeShadow: '0 2px 8px rgba(255, 193, 7, 0.25), inset 0 -2px 0 #ffc107'
  },
  { 
    name: 'Partners', 
    path: '/partners', 
    icon: <FaUserFriends />, 
    activeColor: '#4caf50',
    activeBackground: '#e8f5e9',
    activeShadow: '0 2px 8px rgba(76, 175, 80, 0.25), inset 0 -2px 0 #4caf50'
  },
  { 
    name: 'Impact Maps', 
    path: '/analytics', 
    icon: <FaChartPie />, 
    activeColor: '#ff9800',
    activeBackground: '#fff8e1',
    activeShadow: '0 2px 8px rgba(255, 152, 0, 0.25), inset 0 -2px 0 #ff9800'
  },
  { 
    name: 'Benefits', 
    path: '/partnership-benefits', 
    icon: <FaHandshake />, 
    activeColor: '#e91e63',
    activeBackground: '#fce4ec',
    activeShadow: '0 2px 8px rgba(233, 30, 99, 0.25), inset 0 -2px 0 #e91e63'
  }
];

const Layout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Restore navigation with fade transitions
  const handleNavigation = (path) => {
    if (path !== pathname) {
      router.push(path);
    }
  };
  
  const isActive = (path) => pathname === path;

  // Use prefetch for faster loading
  React.useEffect(() => {
    navigationItems.forEach(item => {
      if (item.path !== pathname) {
        router.prefetch(item.path);
      }
    });
  }, [pathname, router]);

  return (
    <div className="layout-wrapper" style={{
      width: '100%',
      maxWidth: '1400px',
      margin: '0 auto',
      paddingTop: '20px'
    }}>
      {/* Header section with navigation */}
      <div className="header-container" style={{
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
        padding: '24px',
        marginBottom: '30px',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          {/* Logo and title */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              width: '70px', 
              height: '70px', 
              flexShrink: 0,
              backgroundColor: 'white',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                src="/logos/nsf-logo.jpg" 
                alt="NSF Logo" 
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
            </div>

            <div style={{ height: '50px', display: 'flex', alignItems: 'center', margin: '0 15px', color: '#bbb', fontSize: '24px', fontWeight: '300' }}>
              |
            </div>

            <div>
              <div style={{ fontSize: '0.9rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '500' }}>
                NSF Engines:
              </div>
              <h1 style={{ margin: '3px 0 0', fontSize: '1.4rem', fontWeight: '700', color: '#222', lineHeight: '1.2' }}>
                Southwest Sustainability
              </h1>
              <h1 style={{ margin: '3px 0 0', fontSize: '1.4rem', fontWeight: '700', color: '#222', lineHeight: '1.2' }}>
                Innovation Engine Partner Directory
              </h1>
            </div>
          </div>
          
          {/* Navigation tabs */}
          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            justifyContent: 'flex-end', 
            minWidth: '300px',
            flexWrap: 'wrap',
            marginLeft: '20px'
          }}>
            {navigationItems.map((item) => (
              <div
                key={item.path}
                tabIndex={0}
                onClick={() => handleNavigation(item.path)}
                className="animate-gpu nav-item-transition"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  backgroundColor: isActive(item.path) ? item.activeBackground : '#fff',
                  color: isActive(item.path) ? item.activeColor : '#555',
                  fontWeight: isActive(item.path) ? 600 : 500,
                  boxShadow: isActive(item.path) ? item.activeShadow : '0 1px 3px rgba(0,0,0,0.05)',
                  position: 'relative',
                  transition: 'all 0.25s ease',
                  border: isActive(item.path) ? `1px solid rgba(${item.activeColor.replace(/[^\d,]/g, '')}, 0.3)` : '1px solid transparent'
                }}
              >
                <span style={{ color: isActive(item.path) ? item.activeColor : '#555' }}>
                  {item.icon}
                </span>
                <span style={{ whiteSpace: 'nowrap', fontSize: '0.9rem' }}>
                  {item.name}
                </span>
                {isActive(item.path) && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-1px',
                    left: '4px',
                    right: '4px',
                    height: '3px',
                    backgroundColor: item.activeColor,
                    borderRadius: '3px'
                  }}></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Yellow bottom border */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #ffc107, #ffeb3b)',
          borderBottomLeftRadius: '12px',
          borderBottomRightRadius: '12px'
        }}></div>
      </div>

      <div className="page-content" style={{ padding: '0 20px' }}>
        {children}
      </div>
    </div>
  );
};

export default React.memo(Layout);

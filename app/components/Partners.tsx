import React from 'react';
import { FaUniversity, FaFlask, FaCity, FaBuilding } from 'react-icons/fa';

// Update sorting options to remove NONE/Default
export const SORT_OPTIONS = {
  DATE_NEWEST: "newest",
  DATE_OLDEST: "oldest",
  NAME_ASC: "name_asc",
  NAME_DESC: "name_desc"
};

// Define partner categories as constants for consistent usage
export const PARTNER_CATEGORIES = {
  ACADEMIC: "Academic",
  RESEARCH: "Research Institute",
  GOVERNMENT: "Government",
  ENERGY: "Energy",
  TECHNOLOGY: "Technology",
  FOOD_BEVERAGE: "Food & Beverage",
  HOSPITALITY: "Hospitality",
  NONPROFIT: "Nonprofit",
  PRIVATE_SECTOR: "Private Sector"
};

// Update default filter state to include privateSector
export const defaultFilterState = {
  academic: false,
  research: false,
  government: false,
  energy: false,
  technology: false,
  foodBeverage: false,
  hospitality: false,
  nonprofit: false,
  privateSector: false,  // Add Private Sector filter
  sortBy: "" // Empty string for no sorting
};

export const allPartners = [
  {
    id: 1,
    name: 'Desert Research Institute',
    description: 'Leading environmental research institute focused on water, air quality, and ecosystem science.',
    logo: '/logos/dri-logo.jpg',
    link: '/partners/dri',
    icon: <FaFlask size={24} />,
    category: 'Research Institute',
    location: 'Reno, NV',
    partneredSince: '2024-03-01',
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
    partneredSince: '2024-03-01',
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
    partneredSince: '2024-03-01',
  },
  {
    id: 4,
    name: 'Swire Coca-Cola',
    description: 'Beverage company with a focus on sustainable packaging, water conservation, and energy efficiency.',
    logo: '/logos/swire-logo.jpg',
    link: '/partners/swire-coca-cola',
    icon: <FaBuilding size={24} />,
    category: 'Food & Beverage',
    location: 'Draper, UT',
    partneredSince: '2024-08-27',
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
    partneredSince: '2024-4-17',
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
    partneredSince: '2024-03-01',
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
    partneredSince: '2024-03-01',
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
    partneredSince: '2024-03-01',
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
    partneredSince: '2024-07-30',
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
    partneredSince: '2024-08-19',
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
    partneredSince: '2024-03-01',
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
    partneredSince: '2024-04-01',
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
    partneredSince: '2024-03-01',
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
    partneredSince: '2024-03-01',
  },
  {
    id: 15,
    name: 'City of Salt Lake City',
    description: 'Municipal government with a focus on sustainability, renewable energy, and urban planning.',
    logo: '/logos/slc-logo.jpg',
    link: '/partners/slc',
    icon: <FaBuilding size={24} />,
    category: 'Government',
    location: 'Salt Lake City, UT',
    partneredSince: '2024-03-01',
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
    partneredSince: '2024-03-01',
  },
  { 
    id: 17,
    name: 'City of Chandler',
    description: 'Municipal government with a focus on sustainability, renewable energy, and urban planning.',
    logo: '/logos/chandler-logo.jpg',
    link: '/partners/chandler',
    icon: <FaBuilding size={24} />,
    category: 'Government',
    location: 'Chandler, AZ',
    partneredSince: '2024-03-01',
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
    partneredSince: '2024-04-01',
  },
  {
    id: 19,
    name: 'The Water Research Foundation',
    descrition: 'Nonprofit organization focused on water quality, conservation, and infrastructure research.',
    logo: '/logos/wrf-logo.jpg',
    link: '/partners/water-research',
    icon: <FaFlask size={24} />,
    category: 'Research Institute',
    location: 'Denver, CO',
    partneredSince: '2024-03-01',
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
    partneredSince: '2024-03-01',
  },
  {
    id: 21,
    name: 'Maricopa Community College',
    description: 'Community college system with programs in sustainability, renewable energy, and environmental science.',
    logo: '/logos/mcccd-logo.jpg',
    link: '/partners/mcccd',
    icon: <FaUniversity size={24} />,
    category: 'Academic',
    location: 'Phoenix, AZ',
    partneredSince: '2024-03-01',
  },
  {
    id: 22,
    name: 'Arizona Technology Council',
    description: 'Trade association supporting technology companies and innovation in Arizona.',
    logo: '/logos/aztech-logo.jpg',
    link: '/partners/aztech',
    icon: <FaBuilding size={24} />,
    category: 'Technology',
    location: 'Phoenix, AZ',
    partneredSince: '2024-03-01',
  },
  {
    id: 23,
    name: 'City of Phoenix',
    description: 'Municipal government with a focus on sustainability, renewable energy, and urban planning.',
    logo: '/logos/phoenix-logo.jpg',
    link: '/partners/phoenix',
    icon: <FaBuilding size={24} />,
    category: 'Government',
    location: 'Phoenix, AZ',
    partneredSince: '2024-03-01',
  },
  {
    id: 24,
    name: 'Greater Phoenix Economic Council',
    description: 'Economic development organization supporting business growth and innovation in the Phoenix metro area.',
    logo: '/logos/gpec-logo.jpg',
    link: '/partners/gpec',
    icon: <FaBuilding size={24} />,
    category: 'Nonprofit',
    location: 'Phoenix, AZ',
    partneredSince: '2024-03-01',
  },
  {
    id: 25,
    name: 'Arizona Municipal Water Users Association',
    description: 'Association of municipal water providers focused on water conservation and policy in Arizona.',
    logo: '/logos/amwua-logo.jpg',
    link: '/partners/amwua',
    icon: <FaBuilding size={24} />,
    category: 'Government',
    location: 'Scottsdale, AZ',
    partneredSince: '2024-03-01',
  },
  {
    id: 26,
    name: 'Clear Creek Associates',
    description: 'Environmental consulting firm specializing in water resources, geology, and environmental science.',
    logo: '/logos/cca-logo.jpg',
    link: '/partners/cca',
    icon: <FaBuilding size={24} />,
    category: 'Private Sector',
    location: 'Phoenix, AZ',
    partneredSince: '2024-03-01',
  },
  {
    id: 27,
    name: 'Cottonwood Heights',
    description: 'Municipal government with a focus on sustainability, renewable energy, and urban planning.',
    logo: '/logos/cottonwood-logo.jpg',
    link: '/partners/cottonwood',
    icon: <FaBuilding size={24} />,
    category: 'Government',
    location: 'Cottonwood Heights, UT',
    partneredSince: '2024-03-01',
  },
  {
    id: 28,
    name: 'Ecolab',
    description: 'Global company providing water, hygiene, and energy technologies and services.',
    logo: '/logos/ecolab-logo.jpg',
    link: '/partners/ecolab',
    icon: <FaBuilding size={24} />,
    category: 'Technology',
    location: 'St. Paul, MN',
    partneredSince: '2024-03-01',
  },
  {
    id: 29,
    name: 'Epic CleanTec',
    description: 'Innovative company providing sustainable water and waste management solutions.',
    logo: '/logos/epic-logo.jpg',
    link: '/partners/epic',
    icon: <FaBuilding size={24} />,
    category: 'Technology', 
    location: 'San Francisco, CA',
    partneredSince: '2024-03-01',
  },
  {
    id: 30,
    name: 'Electric Power Research Institute',
    description: 'Research organization focused on electricity generation, delivery, and use.',
    logo: '/logos/epri-logo.jpg',
    link: '/partners/epri',
    icon: <FaBuilding size={24} />,
    category: 'Research Institute',
    location: 'Palo Alto, CA',
    partneredSince: '2024-03-01',
  },
  {
    id: 31,
    name: 'Friends of Great Salt Lake',
    description: 'Nonprofit organization focused on conservation, education, and advocacy for the Great Salt Lake.',
    logo: '/logos/fogsl-logo.jpg',
    link: '/partners/fogsl',
    icon: <FaBuilding size={24} />,
    category: 'Nonprofit',
    location: 'Salt Lake City, UT',
    partneredSince: '2024-06-01',
  },
  {
    id: 32,
    name: 'NV5',
    description: 'Engineering consulting firm specializing in infrastructure, water resources, and environmental projects.',
    logo: '/logos/nv5-logo.jpg',
    link: '/partners/nv5',
    icon: <FaBuilding size={24} />,
    category: 'Private Sector',
    location: 'Hollywood, FL',
    partneredSince: '2024-03-01',
  },
  {
    id: 33,
    name: 'Place Collaborative',
    description: 'Urban planning and design firm focused on sustainable development and community engagement.',
    logo: '/logos/place-logo.jpg',
    link: '/partners/place',
    icon: <FaBuilding size={24} />,
    category: 'Private Sector',
    location: 'Salt Lake City, UT',
    partneredSince: '2024-03-01',
  },
  {
    id: 34,
    name: 'Plug and Play',
    description: 'Global innovation platform connecting startups with corporate partners and investors.',
    logo: '/logos/plugandplay-logo.jpg',
    link: '/partners/plugandplay',
    icon: <FaBuilding size={24} />,
    category: 'Technology',
    location: 'Sunnyvale, CA',
    partneredSince: '2024-03-01',
  },
  {
    id: 35,
    name: 'City of South Jordan',
    description: 'Municipal government with a focus on sustainability, renewable energy, and urban planning.',
    logo: '/logos/southjordan-logo.jpg',
    link: '/partners/southjordan',
    icon: <FaBuilding size={24} />,
    category: 'Government',
    location: 'South Jordan, UT',
    partneredSince: '2024-03-01',
  },
  {
    id: 36,
    name: 'Southern Nevada Water Authority',
    description: 'Regional water utility providing water treatment, delivery, and conservation services.',
    logo: '/logos/snwa-logo.jpg',
    link: '/partners/snwa',
    icon: <FaBuilding size={24} />,
    category: 'Government',
    location: 'Las Vegas, NV',
    partneredSince: '2024-03-01',
  },
  {
    id: 37,
    name: 'SRP',
    description: 'Utility company providing electricity and water services in Arizona.',
    logo: '/logos/srp-logo.jpg',
    link: '/partners/srp',
    icon: <FaBuilding size={24} />,
    category: 'Energy',
    location: 'Tempe, AZ',
    partneredSince: '2024-03-01',
  },

];

// Calculate category counts dynamically based on all partners
// Update getCategoryCounts to include privateSector
export const getCategoryCounts = () => {
  const counts = {
    academic: 0,
    research: 0,
    government: 0,
    energy: 0,
    technology: 0,
    foodBeverage: 0,
    hospitality: 0,
    nonprofit: 0,
    privateSector: 0  // Add Private Sector counter
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
    } else if (partner.category === "Nonprofit") {
      counts.nonprofit++;
    } else if (partner.category === "Private Sector") {
      counts.privateSector++;  // Count Private Sector partners
    }
  });
  
  return counts;
};

// Add this helper function to ensure consistent date parsing
export const parsePartnerDate = (dateString) => {
  if (!dateString) return null;
  
  // Split the date string into parts
  const [year, month, day] = dateString.split('-').map(Number);
  
  // Create date with UTC to avoid time zone issues (month - 1 because months are 0-indexed)
  return new Date(Date.UTC(year, month - 1, day));
};

// Update the existing functions to use the new parser
export const formatDate = (dateString) => {
  const date = parsePartnerDate(dateString);
  if (!date) return '';
  
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
};

export const getYear = (dateString) => {
  const date = parsePartnerDate(dateString);
  return date ? date.getUTCFullYear() : '';
};

export const getMonth = (dateString) => {
  const date = parsePartnerDate(dateString);
  if (!date) return '';
  
  const monthNames = [
    "January ", "February ", "March ", "April ", "May ", "June ", 
    "July ", "August ", "September ", "October ", "November ", "December "
  ];
  
  return monthNames[date.getUTCMonth()];
};

// Update the filter and sort function to handle empty sort option
// Also update the filterAndSortPartners function
export function filterAndSortPartners(partners, searchTerm, filters, sortOption = "") {
  // First filter the partners
  let filteredResults = partners.filter(partner => {
    // Check if partner name includes the search term (case insensitive)
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase());
                     
    const categoryFilters = {
      academic: filters.academic && partner.category === "Academic",
      research: filters.research && partner.category === "Research Institute",
      government: filters.government && partner.category === "Government",
      energy: filters.energy && partner.category === "Energy",
      technology: filters.technology && partner.category === "Technology",
      foodBeverage: filters.foodBeverage && partner.category === "Food & Beverage",
      hospitality: filters.hospitality && partner.category === "Hospitality",
      nonprofit: filters.nonprofit && partner.category === "Nonprofit",
      privateSector: filters.privateSector && partner.category === "Private Sector" // Add Private Sector filter
    };
    
    // Only check category filters if any filter is active
    const anyFilterSelected = Object.values(filters).some(value => 
      typeof value === 'boolean' && value === true
    );
    
    // If no filters selected, show all partners that match search
    // If filters are selected, only show partners matching those filters
    const matchesCategory = !anyFilterSelected || Object.values(categoryFilters).some(value => value);
    
    return matchesSearch && matchesCategory;
  });
  
  // Sort only if a sort option is provided
  if (sortOption && sortOption !== "") {
    switch (sortOption) {
      case SORT_OPTIONS.DATE_NEWEST:
        return filteredResults.sort((a, b) => 
          new Date(b.partneredSince).getTime() - new Date(a.partneredSince).getTime());
      case SORT_OPTIONS.DATE_OLDEST:
        return filteredResults.sort((a, b) => 
          new Date(a.partneredSince).getTime() - new Date(b.partneredSince).getTime());
      case SORT_OPTIONS.NAME_ASC:
        return filteredResults.sort((a, b) => a.name.localeCompare(b.name));
      case SORT_OPTIONS.NAME_DESC:
        return filteredResults.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return filteredResults;
    }
  }
  
  return filteredResults;
}

// Get partners by category
export const getPartnersByCategory = (category) => {
  return allPartners.filter(partner => partner.category === category);
};

// Get featured partners (could be customized based on criteria)
export const getFeaturedPartners = (limit = 5) => {
  // Simple implementation that just gets the first N partners
  // You could enhance this with actual "featured" logic
  return allPartners.slice(0, limit);
};

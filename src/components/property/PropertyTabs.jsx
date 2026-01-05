import { useState } from 'react';
import { Box, Tabs, Tab, Typography, Paper } from '@mui/material';
import { Description, Map as MapIcon, Home } from '@mui/icons-material';

const PropertyTabs = ({ property }) => {
  // Track active tab index (0 = Description, 1 = Floor Plan, 2 = Location)
  const [activeTab, setActiveTab] = useState(0);

  /**
   * Handles tab selection change
   */
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        
        {/* ==================== TAB NAVIGATION ==================== */}
        {/* Full-width tab headers with icons */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth" // Tabs take equal width
          sx={{
            backgroundColor: 'grey.100',
            '& .MuiTab-root': {
              textTransform: 'none', // Keep normal text case
              fontSize: '1rem',
              fontWeight: 600,
              minHeight: 64,
              '&.Mui-selected': {
                backgroundColor: 'white', // Highlight active tab
              },
            },
            '& .MuiTabs-indicator': {
              height: 3, // Thick underline for active tab
            },
          }}
        >
          {/* Description Tab */}
          <Tab 
            icon={<Description />} 
            label="Description" 
            iconPosition="start"
            aria-label="Property description" 
          />
          
          {/* Floor Plan Tab */}
          <Tab 
            icon={<Home />} 
            label="Floor Plan" 
            iconPosition="start"
            aria-label="Property floor plan" 
          />
          
          {/* Location Tab */}
          <Tab 
            icon={<MapIcon />} 
            label="Location" 
            iconPosition="start"
            aria-label="Property location map" 
          />
        </Tabs>

        {/* ==================== TAB CONTENT AREA ==================== */}
        {/* Content changes based on selected tab */}
        <Box sx={{ p: 4 }}>
          
          {/* ==================== DESCRIPTION TAB (0) ==================== */}
          {/* Displays property description text */}
          {activeTab === 0 && (
            <Box>
              <Typography variant="h5" fontWeight={600} color="primary" sx={{ mb: 2 }}>
                Property Description
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ lineHeight: 1.8 }} // Readable line spacing
              >
                {property.description}
              </Typography>
            </Box>
          )}

          {/* ==================== FLOOR PLAN TAB (1) ==================== */}
          {/* Displays floor plan image */}
          {activeTab === 1 && (
            <Box>
              <Typography variant="h5" fontWeight={600} color="primary" sx={{ mb: 2 }}>
                Floor Plan
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Detailed floor plan showing the layout of the property
              </Typography>
              
              {/* Floor plan image container */}
              <Paper 
                elevation={3} 
                sx={{ 
                  borderRadius: 2, 
                  overflow: 'hidden', 
                  backgroundColor: 'grey.50' // Light background for image
                }}
              >
                <img
                  src={property.floorplan}
                  alt={`Floor plan for ${property.location}`}
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    display: 'block' // Remove extra spacing below image
                  }}
                />
              </Paper>
            </Box>
          )}

          {/* ==================== LOCATION TAB (2) ==================== */}
          {/* Displays interactive Google Maps embed */}
          {activeTab === 2 && (
            <Box>
              <Typography variant="h5" fontWeight={600} color="primary" sx={{ mb: 2 }}>
                Location
              </Typography>
              
              {/* Property address with emoji icon */}
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                📍 {property.location}
              </Typography>
              
              {/* Google Maps iframe container */}
              <Paper 
                elevation={3} 
                sx={{ 
                  borderRadius: 2, 
                  overflow: 'hidden', 
                  height: 500 // Fixed height for map
                }}
              >
                {/* Embedded Google Maps */}
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  // Map centered on property coordinates with zoom level 15
                  src={`https://www.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&z=15&output=embed`}
                  allowFullScreen
                  title={`Map showing location of ${property.location}`}
                  loading="lazy" // Lazy load map for performance
                />
              </Paper>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default PropertyTabs;

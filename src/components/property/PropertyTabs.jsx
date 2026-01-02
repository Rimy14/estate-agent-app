import { useState } from 'react';
import { Box, Tabs, Tab, Typography, Paper } from '@mui/material';
import { Description, Map as MapIcon, Home } from '@mui/icons-material';

const PropertyTabs = ({ property }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            backgroundColor: 'grey.100',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              minHeight: 64,
              '&.Mui-selected': {
                backgroundColor: 'white',
              },
            },
            '& .MuiTabs-indicator': {
              height: 3,
            },
          }}
        >
          <Tab icon={<Description />} label="Description" iconPosition="start" />
          <Tab icon={<Home />} label="Floor Plan" iconPosition="start" />
          <Tab icon={<MapIcon />} label="Location" iconPosition="start" />
        </Tabs>

        {/* Tab Content */}
        <Box sx={{ p: 4 }}>
          {/* Description Tab */}
          {activeTab === 0 && (
            <Box>
              <Typography variant="h5" fontWeight={600} color="primary" sx={{ mb: 2 }}>
                Property Description
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                {property.description}
              </Typography>
            </Box>
          )}

          {/* Floor Plan Tab */}
          {activeTab === 1 && (
            <Box>
              <Typography variant="h5" fontWeight={600} color="primary" sx={{ mb: 2 }}>
                Floor Plan
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Detailed floor plan showing the layout of the property
              </Typography>
              <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden', backgroundColor: 'grey.50' }}>
                <img
                  src={property.floorplan}
                  alt="Floor plan"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </Paper>
            </Box>
          )}

          {/* Location Tab */}
          {activeTab === 2 && (
            <Box>
              <Typography variant="h5" fontWeight={600} color="primary" sx={{ mb: 2 }}>
                Location
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                📍 {property.location}
              </Typography>
              <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden', height: 500 }}>
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&z=15&output=embed`}
                  allowFullScreen
                  title="Property Location"
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

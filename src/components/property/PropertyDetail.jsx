import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Chip,
} from '@mui/material';
import {
  ArrowBack,
  Favorite,
  FavoriteBorder,
  Share,
  Bed,
  Bathtub,
  Home,
  LocationOn,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import ImageGallery from '../components/property/ImageGallery';
import PropertyTabs from '../components/property/PropertyTabs';
import propertiesData from '../data/properties.json';

const PropertyDetailPage = () => {
  // Extract property ID from URL parameters
  const { id } = useParams();
  
  // Router navigation for programmatic routing
  const navigate = useNavigate();
  
  // Local state for favorite toggle
  const [isFavorite, setIsFavorite] = useState(false);

  // Find the specific property from JSON data by ID
  const property = propertiesData.properties.find(p => p.id === id);

  /**
   * Error State: Property Not Found
   * Renders 404 page when property ID is invalid
   */
  if (!property) {
    return (
      <Container sx={{ py: 8, textAlign: 'center', minHeight: 'calc(100vh - 144px)' }}>
        <Typography variant="h4" gutterBottom color="error">
          Property Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          The property you're looking for doesn't exist or has been removed.
        </Typography>
        <Button
          component={Link}
          to="/search"
          variant="contained"
          size="large"
          startIcon={<ArrowBack />}
        >
          Back to Search
        </Button>
      </Container>
    );
  }

  /**
   * Formats property price to British currency format
   */
  const formatPrice = price => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  /**
   * Toggles favorite status for this property
   */
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  /**
   * Shares property using Web Share API or clipboard fallback
   */
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.location,
        text: `Check out this property: ${formatPrice(property.price)}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    // Page wrapper with fade-in animation
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ backgroundColor: '#f5f7fa', minHeight: 'calc(100vh - 144px)' }}>
        
        {/* ==================== BACK NAVIGATION HEADER ==================== */}
        <Box sx={{ backgroundColor: 'white', borderBottom: 1, borderColor: 'divider', py: 2 }}>
          <Container maxWidth="lg">
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate('/search')}
              sx={{ fontWeight: 600 }}
              aria-label="Back to search results"
            >
              Back to Search
            </Button>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ py: 4 }}>
          
          {/* ==================== PROPERTY HEADER ==================== */}
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
              
              {/* Left: Price and Location */}
              <Box sx={{ flex: 1 }}>
                <Typography 
                  variant="h3" 
                  fontWeight={700} 
                  color="primary"
                  sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
                  gutterBottom
                >
                  {formatPrice(property.price)}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn color="primary" />
                  <Typography variant="h6" color="text.secondary">
                    {property.location}
                  </Typography>
                </Box>
              </Box>

              {/* Right: Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
                  onClick={toggleFavorite}
                  sx={{
                    py: 1.5,
                    px: 3,
                    borderRadius: 2,
                    fontWeight: 600,
                    backgroundColor: isFavorite ? 'secondary.main' : 'primary.main',
                    '&:hover': {
                      backgroundColor: isFavorite ? 'secondary.dark' : 'primary.dark',
                    },
                  }}
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {isFavorite ? 'Favorited' : 'Favorite'}
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<Share />}
                  onClick={handleShare}
                  sx={{ py: 1.5, px: 3, borderRadius: 2, fontWeight: 600 }}
                  aria-label="Share property"
                >
                  Share
                </Button>
              </Box>
            </Box>

            {/* ==================== PROPERTY STATS ==================== */}
            <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
              <Grid container spacing={3}>
                
                {/* Bedrooms */}
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Bed sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6" fontWeight={700}>
                      {property.bedrooms}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Bedrooms
                    </Typography>
                  </Box>
                </Grid>

                {/* Bathrooms */}
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Bathtub sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6" fontWeight={700}>
                      {property.bathrooms}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Bathrooms
                    </Typography>
                  </Box>
                </Grid>

                {/* Property Type */}
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Home sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6" fontWeight={700}>
                      {property.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Type
                    </Typography>
                  </Box>
                </Grid>

                {/* Postcode */}
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <LocationOn sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6" fontWeight={700}>
                      {property.postcode}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Postcode
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>

          {/* ==================== IMAGE GALLERY ==================== */}
          <Box sx={{ mb: 3 }}>
            <ImageGallery images={property.images} alt={property.location} />
          </Box>

          {/* ==================== PROPERTY TABS ==================== */}
          <PropertyTabs property={property} />
        </Container>
      </Box>
    </motion.div>
  );
};

export default PropertyDetailPage;

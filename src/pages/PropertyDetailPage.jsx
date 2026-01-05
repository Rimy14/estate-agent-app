import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  Favorite,
  FavoriteBorder,
  Bed,
  Bathtub,
  Home,
  LocationOn,
  Share,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import ImageGallery from '../components/property/ImageGallery';
import PropertyTabs from '../components/property/PropertyTabs';
import propertiesData from '../data/properties.json';
import { useFavorites } from '../context/FavoritesContext';

const PropertyDetailPage = () => {
  // Extract property ID from URL parameters
  const { id } = useParams();
  // Router navigation hook for programmatic navigation
  const navigate = useNavigate();
  
  // Access favorites context for add/remove and check functionality
  const { toggleFavorite, isFavorite } = useFavorites();

  // Find the specific property from data using URL parameter ID
  const property = propertiesData.properties.find(p => p.id === id);

  /**
   * Error State
   * Displays when URL contains invalid property ID
   * Provides navigation back to search page
   */
  if (!property) {
    return (
      <Container maxWidth="lg" sx={{ py: 10, textAlign: 'center', minHeight: 'calc(100vh - 144px)' }}>
        <Typography variant="h4" color="error" gutterBottom>
          Property Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The property you're looking for doesn't exist.
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/search')}
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
   * Handles property sharing using Web Share API or clipboard fallback
   * - Uses native share dialog on mobile devices
   */
  const handleShare = () => {
    if (navigator.share) {
      // Use Web Share API if available (mobile devices)
      navigator.share({
        title: property.location,
        text: `Check out this property: ${formatPrice(property.price)}`,
        url: window.location.href,
      });
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  /**
   * Toggles property favorite status
   * Adds or removes property from user's favorites list
   */
  const handleFavoriteClick = () => {
    toggleFavorite(property);
  };

  // Check if current property is in favorites
  const propertyIsFavorite = isFavorite(property.id);

  return (
    // Page wrapper with fade-in animation
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ backgroundColor: '#f5f7fa', minHeight: 'calc(100vh - 144px)' }}>
        
        {/* ==================== BACK NAVIGATION HEADER ==================== */}
        {/* Sticky header with back to search button */}
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

        {/* ==================== MAIN CONTENT AREA ==================== */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          
          {/* ==================== PRICE & LOCATION CARD ==================== */}
          {/* Primary information card with price, location, and action buttons */}
          <Paper elevation={2} sx={{ p: 4, borderRadius: 2, mb: 3 }}>
            
            {/* Top section: Price/Location and Action buttons */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start', 
              flexWrap: 'wrap', 
              gap: 2, 
              mb: 3 
            }}>
              
              {/* Left side: Price and Location */}
              <Box>
                {/* Property price - prominent display */}
                <Typography variant="h3" fontWeight={700} color="primary" sx={{ mb: 2 }}>
                  {formatPrice(property.price)}
                </Typography>
                
                {/* Property location with icon */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn color="primary" />
                  <Typography variant="h6" color="text.secondary">
                    {property.location}
                  </Typography>
                </Box>
              </Box>

              {/* Right side: Action Buttons (Favorite & Share) */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                
                {/* Favorite toggle button - changes appearance based on favorite status */}
                <Button
                  variant="contained"
                  startIcon={propertyIsFavorite ? <Favorite /> : <FavoriteBorder />}
                  onClick={handleFavoriteClick}
                  sx={{
                    py: 1.5,
                    px: 3,
                    borderRadius: 2,
                    fontWeight: 600,
                    // Dynamic styling based on favorite status
                    backgroundColor: propertyIsFavorite ? 'secondary.main' : 'primary.main',
                    '&:hover': {
                      backgroundColor: propertyIsFavorite ? 'secondary.dark' : 'primary.dark',
                    },
                    transition: 'all 0.3s',
                  }}
                  aria-label={propertyIsFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {propertyIsFavorite ? 'Favorited' : 'Favorite'}
                </Button>

                {/* Share button - uses Web Share API or clipboard */}
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

            <Divider sx={{ mb: 3 }} />

            {/* ==================== PROPERTY STATISTICS GRID ==================== */}
            {/* Key property features in a responsive grid layout */}
            <Grid container spacing={3}>
              
              {/* Bedrooms stat */}
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

              {/* Bathrooms stat */}
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

              {/* Property type stat */}
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

              {/* Postcode stat */}
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
          </Paper>

          {/* ==================== IMAGE GALLERY SECTION ==================== */}
          {/* Displays 6-8 property images in interactive gallery */}
          <Box sx={{ mb: 3 }}>
            <ImageGallery 
              images={property.images} 
              alt={`${property.location} property images`} 
            />
          </Box>

          {/* ==================== PROPERTY TABS SECTION ==================== */}
          {/* Tabbed interface for Description, Floor Plan, and Map */}
          <PropertyTabs property={property} />
        </Container>
      </Box>
    </motion.div>
  );
};

export default PropertyDetailPage;

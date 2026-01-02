import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  IconButton,
  Divider,
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
  CalendarMonth,
  Print,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import ImageGallery from '../components/property/ImageGallery';
import PropertyTabs from '../components/property/PropertyTabs';
import propertiesData from '../data/properties.json';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const property = propertiesData.properties.find(p => p.id === id);

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

  const formatPrice = price => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getTimeSinceAdded = (added) => {
    const monthMap = {
      January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
      July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
    };

    const addedDate = new Date(added.year, monthMap[added.month], added.day);
    const today = new Date();
    const diffTime = Math.abs(today - addedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.location,
        text: `Check out this property: ${formatPrice(property.price)}`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ backgroundColor: '#f5f7fa', minHeight: 'calc(100vh - 144px)' }}>
        {/* Back Button Header */}
        <Box sx={{ backgroundColor: 'white', borderBottom: 1, borderColor: 'divider', py: 2 }}>
          <Container maxWidth="xl">
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate('/search')}
              sx={{ fontWeight: 600 }}
            >
              Back to Search Results
            </Button>
          </Container>
        </Box>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Grid container spacing={4}>
            {/* Main Content - Left Side */}
            <Grid item xs={12} lg={8}>
              {/* Property Header */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
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
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2 }}>
                      <LocationOn sx={{ color: 'text.secondary', mt: 0.3 }} />
                      <Typography variant="h6" color="text.secondary">
                        {property.location}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Property Type & Date Badges */}
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                  <Chip 
                    label={property.type} 
                    color="primary" 
                    sx={{ fontWeight: 600 }}
                  />
                  <Chip 
                    label={property.tenure} 
                    variant="outlined" 
                    sx={{ fontWeight: 600 }}
                  />
                  <Chip 
                    icon={<CalendarMonth />}
                    label={`Added ${getTimeSinceAdded(property.added)}`}
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>

                {/* Quick Stats */}
                <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={4} sm={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Bed sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                        <Typography variant="h5" fontWeight={700}>
                          {property.bedrooms}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Bedrooms
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4} sm={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Bathtub sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                        <Typography variant="h5" fontWeight={700}>
                          {property.bathrooms}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Bathrooms
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4} sm={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Home sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                        <Typography variant="h6" fontWeight={700}>
                          {property.type}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Property Type
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4} sm={3}>
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
              </Box>

              {/* Image Gallery */}
              <ImageGallery images={property.images} alt={property.location} />

              {/* Property Tabs */}
              <PropertyTabs property={property} />
            </Grid>

            {/* Sidebar - Right Side */}
            <Grid item xs={12} lg={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  position: 'sticky',
                  top: 80,
                }}
              >
                {/* Action Buttons */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
                    onClick={toggleFavorite}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: '1rem',
                      backgroundColor: isFavorite ? 'secondary.main' : 'primary.main',
                      '&:hover': {
                        backgroundColor: isFavorite ? 'secondary.dark' : 'primary.dark',
                      },
                    }}
                  >
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    startIcon={<Share />}
                    onClick={handleShare}
                    sx={{ py: 1.5, borderRadius: 2, fontWeight: 600 }}
                  >
                    Share Property
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    startIcon={<Print />}
                    onClick={handlePrint}
                    sx={{ py: 1.5, borderRadius: 2, fontWeight: 600 }}
                  >
                    Print Details
                  </Button>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Property Summary */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Property Summary
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Property Type:
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {property.type}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Bedrooms:
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {property.bedrooms}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Bathrooms:
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {property.bathrooms}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Tenure:
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {property.tenure}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Postcode:
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {property.postcode}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Date Added:
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {property.added.month} {property.added.day}, {property.added.year}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Contact Agent */}
                <Box 
                  sx={{ 
                    textAlign: 'center',
                    p: 3,
                    backgroundColor: 'primary.main',
                    borderRadius: 2,
                    color: 'white',
                  }}
                >
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Interested in this property?
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                    Contact us for more information or to arrange a viewing
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ 
                      py: 1.5, 
                      borderRadius: 2, 
                      fontWeight: 600,
                      backgroundColor: 'white',
                      color: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'grey.100',
                      },
                    }}
                  >
                    Contact Agent
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </motion.div>
  );
};

export default PropertyDetailPage;

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
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Use Favorites Context
  const { toggleFavorite, isFavorite } = useFavorites();

  const property = propertiesData.properties.find(p => p.id === id);

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

  const formatPrice = price => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
    }).format(price);
  };

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

  const handleFavoriteClick = () => {
    toggleFavorite(property);
  };

  const propertyIsFavorite = isFavorite(property.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ backgroundColor: '#f5f7fa', minHeight: 'calc(100vh - 144px)' }}>
        {/* Back Button Header */}
        <Box sx={{ backgroundColor: 'white', borderBottom: 1, borderColor: 'divider', py: 2 }}>
          <Container maxWidth="lg">
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate('/search')}
              sx={{ fontWeight: 600 }}
            >
              Back to Search
            </Button>
          </Container>
        </Box>

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Price & Location Card */}
          <Paper elevation={2} sx={{ p: 4, borderRadius: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 3 }}>
              <Box>
                <Typography variant="h3" fontWeight={700} color="primary" sx={{ mb: 2 }}>
                  {formatPrice(property.price)}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn color="primary" />
                  <Typography variant="h6" color="text.secondary">
                    {property.location}
                  </Typography>
                </Box>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={propertyIsFavorite ? <Favorite /> : <FavoriteBorder />}
                  onClick={handleFavoriteClick}
                  sx={{
                    py: 1.5,
                    px: 3,
                    borderRadius: 2,
                    fontWeight: 600,
                    backgroundColor: propertyIsFavorite ? 'secondary.main' : 'primary.main',
                    '&:hover': {
                      backgroundColor: propertyIsFavorite ? 'secondary.dark' : 'primary.dark',
                    },
                    transition: 'all 0.3s',
                  }}
                >
                  {propertyIsFavorite ? 'Favorited' : 'Favorite'}
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<Share />}
                  onClick={handleShare}
                  sx={{ py: 1.5, px: 3, borderRadius: 2, fontWeight: 600 }}
                >
                  Share
                </Button>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Stats Grid */}
            <Grid container spacing={3}>
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

          {/* Image Gallery */}
          <Box sx={{ mb: 3 }}>
            <ImageGallery images={property.images} alt={property.location} />
          </Box>

          {/* Property Tabs */}
          <PropertyTabs property={property} />
        </Container>
      </Box>
    </motion.div>
  );
};

export default PropertyDetailPage;

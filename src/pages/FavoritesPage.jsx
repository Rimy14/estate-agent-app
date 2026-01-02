import { Container, Typography, Box, Button, Grid, Paper, IconButton, Chip } from '@mui/material';
import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Delete,
  Favorite,
  Bed,
  Bathtub,
  LocationOn,
  ArrowForward,
  DeleteSweep,
} from '@mui/icons-material';

const FavoritesPage = () => {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();

  const formatPrice = price => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (favorites.length === 0) {
    return (
      <Box
        sx={{
          minHeight: 'calc(100vh - 144px)',
          backgroundColor: '#f5f7fa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
        }}
      >
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
            <Favorite sx={{ fontSize: 80, color: 'grey.300', mb: 3 }} />
            <Typography variant="h4" fontWeight={700} gutterBottom>
              No Favorites Yet
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Start adding properties to your favorites to see them here!
            </Typography>
            <Button
              component={Link}
              to="/search"
              variant="contained"
              size="large"
              sx={{ borderRadius: 2, fontWeight: 600, px: 4 }}
            >
              Browse Properties
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: 'calc(100vh - 144px)', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h3" fontWeight={700} color="primary" gutterBottom>
              My Favorites
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {favorites.length} {favorites.length === 1 ? 'Property' : 'Properties'} Saved
            </Typography>
          </Box>

          {favorites.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteSweep />}
              onClick={clearFavorites}
              sx={{ borderRadius: 2, fontWeight: 600 }}
            >
              Clear All
            </Button>
          )}
        </Box>

        {/* Favorites Grid */}
        <Grid container spacing={3}>
          {favorites.map(property => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  {/* Remove Button */}
                  <IconButton
                    onClick={() => removeFavorite(property.id)}
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      backgroundColor: 'rgba(255,255,255,0.95)',
                      zIndex: 1,
                      '&:hover': {
                        backgroundColor: 'error.main',
                        color: 'white',
                      },
                    }}
                  >
                    <Delete />
                  </IconButton>

                  {/* Property Type Badge */}
                  <Chip
                    label={property.type}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      backgroundColor: 'rgba(26,35,126,0.95)',
                      color: 'white',
                      fontWeight: 600,
                      zIndex: 1,
                    }}
                  />

                  {/* Property Image */}
                  <Link to={`/property/${property.id}`}>
                    <Box
                      component="img"
                      src={property.thumbnail}
                      alt={property.location}
                      sx={{
                        width: '100%',
                        height: 240,
                        objectFit: 'cover',
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    />
                  </Link>

                  {/* Property Details */}
                  <Box sx={{ p: 2.5 }}>
                    <Link to={`/property/${property.id}`} style={{ textDecoration: 'none' }}>
                      <Typography variant="h5" fontWeight={700} color="primary" gutterBottom>
                        {formatPrice(property.price)}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5, mb: 2 }}>
                        <LocationOn sx={{ fontSize: 18, color: 'text.secondary', mt: 0.2 }} />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: 1.4,
                          }}
                        >
                          {property.location}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Bed sx={{ fontSize: 20, color: 'text.secondary' }} />
                          <Typography variant="body2" fontWeight={500}>
                            {property.bedrooms}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Bathtub sx={{ fontSize: 20, color: 'text.secondary' }} />
                          <Typography variant="body2" fontWeight={500}>
                            {property.bathrooms}
                          </Typography>
                        </Box>
                        <Chip label={property.tenure} size="small" variant="outlined" />
                      </Box>

                      <Button
                        fullWidth
                        variant="contained"
                        endIcon={<ArrowForward />}
                        sx={{ borderRadius: 2, fontWeight: 600 }}
                      >
                        View Details
                      </Button>
                    </Link>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FavoritesPage;

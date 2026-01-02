import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Bed,
  Bathtub,
  Home,
  LocationOn,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useFavorites } from '../../context/FavoritesContext';

const PropertyCard = ({ property }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [isDragging, setIsDragging] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Drag & Drop functionality
  const handleDragStart = (e) => {
    e.dataTransfer.setData('property', JSON.stringify(property));
    e.dataTransfer.effectAllowed = 'copy';
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8 }}
    >
      <Card
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          cursor: isDragging ? 'grabbing' : 'grab',
          opacity: isDragging ? 0.5 : 1,
          '&:hover': {
            boxShadow: 6,
          },
        }}
      >
        {/* Image with Favorite Button */}
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component={Link}
            to={`/property/${property.id}`}
            sx={{
              height: 220,
              backgroundImage: `url(${property.images?.[0] || property.picture})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'block',
              textDecoration: 'none',
            }}
          />

          {/* Property Type Badge */}
          <Chip
            label={property.type}
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              backgroundColor: 'primary.main',
              color: 'white',
              fontWeight: 600,
            }}
          />

          {/* Favorite Button */}
          <Tooltip title={isFavorite(property.id) ? 'Remove from Favorites' : 'Add to Favorites'}>
            <IconButton
              onClick={handleFavoriteClick}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                '&:hover': {
                  backgroundColor: 'white',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s',
              }}
            >
              {isFavorite(property.id) ? (
                <Favorite sx={{ color: 'secondary.main' }} />
              ) : (
                <FavoriteBorder sx={{ color: 'text.secondary' }} />
              )}
            </IconButton>
          </Tooltip>
        </Box>

        {/* Property Details */}
        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Typography variant="h5" fontWeight={700} color="primary" gutterBottom>
            {formatPrice(property.price)}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 0.5 }}>
            <LocationOn sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary" noWrap>
              {property.location}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.5,
            }}
          >
            {property.description}
          </Typography>

          {/* Property Stats */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Bed sx={{ fontSize: 20, color: 'primary.main' }} />
              <Typography variant="body2" fontWeight={600}>
                {property.bedrooms}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Bathtub sx={{ fontSize: 20, color: 'primary.main' }} />
              <Typography variant="body2" fontWeight={600}>
                {property.bathrooms}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Home sx={{ fontSize: 20, color: 'primary.main' }} />
              <Typography variant="body2" fontWeight={600}>
                {property.type}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PropertyCard;

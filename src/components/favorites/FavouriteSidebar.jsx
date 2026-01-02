import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
  Divider,
  Chip,
  useMediaQuery,
  useTheme,
  Drawer,
  Tooltip,
} from '@mui/material';
import {
  Favorite,
  Delete,
  ClearAll,
  Close,
} from '@mui/icons-material';
import { useFavorites } from '../../context/FavoritesContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const FavoritesSidebar = ({ isOpen: externalIsOpen, onClose: externalOnClose }) => {
  const { favorites, removeFavorite, clearFavorites, addFavorite } = useFavorites();
  const [isDragOver, setIsDragOver] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Use external control if provided, otherwise use internal state
  const [internalIsOpen, setInternalIsOpen] = useState(true);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  
  const handleClose = () => {
    if (externalOnClose) {
      externalOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Handle drop - ADD TO FAVORITES
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    const propertyData = e.dataTransfer.getData('property');
    
    if (propertyData) {
      try {
        const property = JSON.parse(propertyData);
        addFavorite(property);
      } catch (error) {
        console.error('Error parsing property data:', error);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  // Handle drag from favorites to remove
  const handleRemoveDrop = (e) => {
    e.preventDefault();
    const propertyId = e.dataTransfer.getData('removePropertyId');
    if (propertyId) {
      removeFavorite(propertyId);
    }
  };

  const handleRemoveDragOver = (e) => {
    e.preventDefault();
  };

  // Sidebar Content
  const sidebarContent = (
    <Box
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: isDragOver ? 'action.hover' : 'background.paper',
        border: isDragOver ? '3px dashed' : 'none',
        borderColor: 'primary.main',
        transition: 'all 0.2s',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          backgroundColor: 'primary.main',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Favorite />
            <Typography variant="h6" fontWeight={700}>
              Favorites
            </Typography>
            <Chip
              label={favorites.length}
              size="small"
              sx={{
                backgroundColor: 'secondary.main',
                color: 'white',
                fontWeight: 700,
              }}
            />
          </Box>
          
          {/* Close Button */}
          <Tooltip title="Close Sidebar">
            <IconButton
              onClick={handleClose}
              size="small"
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              <Close />
            </IconButton>
          </Tooltip>
        </Box>

        {favorites.length > 0 && (
          <Button
            fullWidth
            variant="outlined"
            size="small"
            startIcon={<ClearAll />}
            onClick={clearFavorites}
            sx={{
              borderColor: 'white',
              color: 'white',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Clear All
          </Button>
        )}
      </Box>

      {/* Drop Zone Hint */}
      {isDragOver && (
        <Box
          sx={{
            p: 3,
            textAlign: 'center',
            backgroundColor: 'primary.light',
            color: 'white',
            animation: 'pulse 1s infinite',
            '@keyframes pulse': {
              '0%, 100%': { opacity: 1 },
              '50%': { opacity: 0.8 },
            },
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            ⬇️ Drop here to add
          </Typography>
        </Box>
      )}

      {/* Favorites List */}
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        {favorites.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Favorite sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
            <Typography variant="body2" color="text.secondary">
              No favorites yet
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Drag properties here or click ❤️
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {favorites.map((property, index) => (
              <Box key={property.id}>
                <ListItem
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('removePropertyId', property.id);
                    e.dataTransfer.effectAllowed = 'move';
                  }}
                  sx={{
                    p: 2,
                    cursor: 'grab',
                    display: 'flex',
                    gap: 1,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                    '&:active': {
                      cursor: 'grabbing',
                    },
                  }}
                >
                  {/* Property Image */}
                  <Box
                    component="img"
                    src={property.thumbnail}
                    alt={property.location}
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 1,
                      objectFit: 'cover',
                      flexShrink: 0,
                    }}
                  />

                  {/* Property Info */}
                  <Box
                    component={Link}
                    to={`/property/${property.id}`}
                    onClick={handleClose}
                    sx={{
                      flexGrow: 1,
                      textDecoration: 'none',
                      color: 'inherit',
                      minWidth: 0,
                    }}
                  >
                    <Typography variant="subtitle2" fontWeight={600} noWrap>
                      {formatPrice(property.price)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {property.location}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                      <Chip label={property.type} size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
                      <Chip label={`${property.bedrooms} bed`} size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
                    </Box>
                  </Box>

                  {/* Delete Button */}
                  <Tooltip title="Remove">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.preventDefault();
                        removeFavorite(property.id);
                      }}
                      sx={{
                        color: 'error.main',
                        flexShrink: 0,
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </ListItem>
                {index < favorites.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        )}
      </Box>

      {/* Remove Drop Zone at Bottom */}
      <Box
        onDrop={handleRemoveDrop}
        onDragOver={handleRemoveDragOver}
        sx={{
          p: 2,
          backgroundColor: 'error.main',
          color: 'white',
          textAlign: 'center',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'error.dark',
          },
        }}
      >
        <Delete sx={{ fontSize: 24, mb: 0.5 }} />
        <Typography variant="caption" fontWeight={600}>
          Drag here to remove
        </Typography>
      </Box>
    </Box>
  );

  // Mobile: Use Full-Screen Drawer
  if (isMobile) {
    return (
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          sx: { 
            width: '100%',
            maxWidth: 400,
          },
        }}
        sx={{ zIndex: (theme) => theme.zIndex.appBar - 1 }}
      >
        {sidebarContent}
      </Drawer>
    );
  }

  // Desktop: Fixed Sidebar with Slide Animation
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 350 }}
          animate={{ x: 0 }}
          exit={{ x: 350 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            right: 0,
            top: 64,
            bottom: 0,
            width: 350,
            zIndex: 1000,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              height: '100%',
              borderRadius: 0,
              overflow: 'hidden',
            }}
          >
            {sidebarContent}
          </Paper>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FavoritesSidebar;

import { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Paper,
  Chip,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Collapse,
} from '@mui/material';
import { FilterList, Clear, Favorite, FavoriteBorder, Bed, Bathtub, LocationOn, ExpandMore, ExpandLess } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import propertiesData from '../data/properties.json';
import { useFavorites } from '../context/FavoritesContext';
import FavoritesSidebar from '../components/favorites/FavouriteSidebar';

const SearchPage = () => {
  const [properties] = useState(propertiesData.properties);
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    type: 'Any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    postcode: '',
    dateAfter: '',
    dateBefore: '',
  });

  // Use Favorites Context instead of local state
  const { toggleFavorite, isFavorite, favoritesCount } = useFavorites();

  // Calculate time since added
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

  // Parse property date
  const parsePropertyDate = (added) => {
    const monthMap = {
      January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
      July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
    };
    return new Date(added.year, monthMap[added.month], added.day);
  };

  // Filter properties
  const filteredProperties = properties.filter(property => {
    if (filters.type !== 'Any' && property.type !== filters.type) return false;
    if (filters.minPrice && property.price < Number(filters.minPrice)) return false;
    if (filters.maxPrice && property.price > Number(filters.maxPrice)) return false;
    if (filters.minBedrooms && property.bedrooms < Number(filters.minBedrooms)) return false;
    if (filters.maxBedrooms && property.bedrooms > Number(filters.maxBedrooms)) return false;
    
    if (filters.postcode) {
      const searchPostcode = filters.postcode.toUpperCase().trim();
      if (!property.postcode.toUpperCase().startsWith(searchPostcode)) return false;
    }

    const propertyDate = parsePropertyDate(property.added);
    if (filters.dateAfter) {
      const afterDate = new Date(filters.dateAfter);
      afterDate.setHours(0, 0, 0, 0);
      if (propertyDate < afterDate) return false;
    }
    if (filters.dateBefore) {
      const beforeDate = new Date(filters.dateBefore);
      beforeDate.setHours(23, 59, 59, 999);
      if (propertyDate > beforeDate) return false;
    }

    return true;
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      type: 'Any',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      postcode: '',
      dateAfter: '',
      dateBefore: '',
    });
  };

  const formatPrice = price => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <Box sx={{ backgroundColor: '#f5f7fa', minHeight: 'calc(100vh - 144px)', py: 4, pr: { xs: 0, md: '350px' } }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant="h3" fontWeight={700} color="primary" gutterBottom>
              Search Properties
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Find your perfect home from {properties.length} properties
            </Typography>
          </Box>

          {/* Centered Filter Box with Margins */}
          <Box sx={{ px: { xs: 0, sm: 2, md: 4 }, mb: 4 }}>
            <Paper 
              elevation={3} 
              sx={{ 
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              {/* Filter Header */}
              <Box
                onClick={() => setShowFilters(!showFilters)}
                sx={{
                  p: 2.5,
                  background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0d1442 0%, #1a237e 100%)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <FilterList />
                  <Typography variant="h6" fontWeight={600}>
                    Search Filters
                  </Typography>
                  {favoritesCount > 0 && (
                    <Chip 
                      label={`${favoritesCount} Favorite${favoritesCount !== 1 ? 's' : ''}`}
                      size="small"
                      sx={{ 
                        backgroundColor: 'rgba(245, 0, 87, 0.9)',
                        color: 'white',
                        fontWeight: 600,
                      }}
                    />
                  )}
                </Box>
                <IconButton sx={{ color: 'white' }}>
                  {showFilters ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Box>

              {/* Filter Content */}
              <Collapse in={showFilters}>
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={2}>
                    {/* Property Type */}
                    <Grid item xs={12} sm={6} md={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Property Type</InputLabel>
                        <Select
                          value={filters.type}
                          label="Property Type"
                          onChange={e => handleFilterChange('type', e.target.value)}
                        >
                          <MenuItem value="Any">Any</MenuItem>
                          <MenuItem value="House">House</MenuItem>
                          <MenuItem value="Flat">Flat</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Min Price */}
                    <Grid item xs={6} sm={6} md={3}>
                      <TextField
                        fullWidth
                        label="Min Price"
                        type="number"
                        size="small"
                        value={filters.minPrice}
                        onChange={e => handleFilterChange('minPrice', e.target.value)}
                        placeholder="£0"
                      />
                    </Grid>

                    {/* Max Price */}
                    <Grid item xs={6} sm={6} md={3}>
                      <TextField
                        fullWidth
                        label="Max Price"
                        type="number"
                        size="small"
                        value={filters.maxPrice}
                        onChange={e => handleFilterChange('maxPrice', e.target.value)}
                        placeholder="Any"
                      />
                    </Grid>

                    {/* Postcode */}
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        fullWidth
                        label="Postcode"
                        size="small"
                        value={filters.postcode}
                        onChange={e => handleFilterChange('postcode', e.target.value)}
                        placeholder="e.g. BR1"
                      />
                    </Grid>

                    {/* Min Bedrooms */}
                    <Grid item xs={6} sm={6} md={3}>
                      <TextField
                        fullWidth
                        label="Min Beds"
                        type="number"
                        size="small"
                        value={filters.minBedrooms}
                        onChange={e => handleFilterChange('minBedrooms', e.target.value)}
                        placeholder="Any"
                      />
                    </Grid>

                    {/* Max Bedrooms */}
                    <Grid item xs={6} sm={6} md={3}>
                      <TextField
                        fullWidth
                        label="Max Beds"
                        type="number"
                        size="small"
                        value={filters.maxBedrooms}
                        onChange={e => handleFilterChange('maxBedrooms', e.target.value)}
                        placeholder="Any"
                      />
                    </Grid>

                    {/* Date After */}
                    <Grid item xs={6} sm={6} md={3}>
                      <TextField
                        fullWidth
                        label="Added After"
                        type="date"
                        size="small"
                        value={filters.dateAfter}
                        onChange={e => handleFilterChange('dateAfter', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>

                    {/* Date Before */}
                    <Grid item xs={6} sm={6} md={3}>
                      <TextField
                        fullWidth
                        label="Added Before"
                        type="date"
                        size="small"
                        value={filters.dateBefore}
                        onChange={e => handleFilterChange('dateBefore', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  </Grid>

                  {/* Clear Filters Button */}
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                    <Button
                      variant="outlined"
                      startIcon={<Clear />}
                      onClick={resetFilters}
                      sx={{ 
                        borderRadius: 2,
                        px: 4,
                        py: 1,
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </Box>

                  {/* Active Filters Chips */}
                  {Object.values(filters).some(val => val !== '' && val !== 'Any') && (
                    <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                      <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ mr: 1, alignSelf: 'center' }}>
                        Active:
                      </Typography>
                      {filters.type !== 'Any' && (
                        <Chip label={filters.type} size="small" onDelete={() => handleFilterChange('type', 'Any')} color="primary" />
                      )}
                      {filters.minPrice && (
                        <Chip label={`Min: £${filters.minPrice}`} size="small" onDelete={() => handleFilterChange('minPrice', '')} color="primary" />
                      )}
                      {filters.maxPrice && (
                        <Chip label={`Max: £${filters.maxPrice}`} size="small" onDelete={() => handleFilterChange('maxPrice', '')} color="primary" />
                      )}
                      {filters.postcode && (
                        <Chip label={filters.postcode} size="small" onDelete={() => handleFilterChange('postcode', '')} color="primary" />
                      )}
                      {filters.dateAfter && (
                        <Chip label={`After: ${filters.dateAfter}`} size="small" onDelete={() => handleFilterChange('dateAfter', '')} color="primary" />
                      )}
                      {filters.dateBefore && (
                        <Chip label={`Before: ${filters.dateBefore}`} size="small" onDelete={() => handleFilterChange('dateBefore', '')} color="primary" />
                      )}
                    </Box>
                  )}
                </Box>
              </Collapse>
            </Paper>
          </Box>

          {/* Results Count */}
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant="h5" color="text.secondary" fontWeight={600}>
              {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
            </Typography>
          </Box>

          {/* Property Grid - FIXED SIZE CARDS */}
          {filteredProperties.length > 0 ? (
            <Grid container spacing={3}>
              {filteredProperties.map(property => (
                <Grid item xs={12} sm={6} md={4} key={property.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ y: -8 }}
                    style={{ height: '100%' }}
                  >
                    <Card 
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('property', JSON.stringify(property));
                        e.dataTransfer.effectAllowed = 'copy';
                      }}
                      sx={{ 
                        height: 420,
                        borderRadius: 3, 
                        position: 'relative', 
                        boxShadow: 3,
                        transition: 'box-shadow 0.3s',
                        display: 'flex',
                        flexDirection: 'column',
                        cursor: 'grab',
                        '&:active': {
                          cursor: 'grabbing',
                        },
                        '&:hover': {
                          boxShadow: 6,
                        },
                      }}
                    >
                      {/* Image Section - Fixed Height */}
                      <Box sx={{ position: 'relative', height: 240, flexShrink: 0 }}>
                        <Link to={`/property/${property.id}`}>
                          <CardMedia
                            component="img"
                            height="240"
                            image={property.thumbnail}
                            alt={property.location}
                            sx={{
                              transition: 'transform 0.3s',
                              objectFit: 'cover',
                              '&:hover': {
                                transform: 'scale(1.05)',
                              },
                            }}
                          />
                        </Link>
                        
                        <IconButton
                          onClick={() => toggleFavorite(property)}
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            backgroundColor: 'rgba(255,255,255,0.95)',
                            '&:hover': {
                              backgroundColor: 'white',
                            },
                          }}
                        >
                          {isFavorite(property.id) ? (
                            <Favorite sx={{ color: 'secondary.main' }} />
                          ) : (
                            <FavoriteBorder />
                          )}
                        </IconButton>

                        <Chip
                          label={property.type}
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 8,
                            left: 8,
                            backgroundColor: 'rgba(26,35,126,0.95)',
                            color: 'white',
                            fontWeight: 600,
                          }}
                        />

                        <Chip
                          label={getTimeSinceAdded(property.added)}
                          size="small"
                          sx={{
                            position: 'absolute',
                            bottom: 8,
                            left: 8,
                            backgroundColor: 'rgba(255,255,255,0.95)',
                            fontWeight: 500,
                            fontSize: '0.75rem',
                          }}
                        />
                      </Box>

                      {/* Content Section - Fixed Height */}
                      <CardContent 
                        sx={{ 
                          p: 2.5, 
                          height: 180,
                          display: 'flex',
                          flexDirection: 'column',
                          overflow: 'hidden',
                        }}
                      >
                        <Link to={`/property/${property.id}`} style={{ textDecoration: 'none' }}>
                          {/* Price - Fixed Space */}
                          <Typography 
                            variant="h5" 
                            fontWeight={700} 
                            color="primary" 
                            sx={{ 
                              mb: 1.5,
                              height: 32,
                              overflow: 'hidden',
                            }}
                          >
                            {formatPrice(property.price)}
                          </Typography>

                          {/* Location - Fixed 2 Lines */}
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5, mb: 2, height: 40 }}>
                            <LocationOn sx={{ fontSize: 18, color: 'text.secondary', mt: 0.2, flexShrink: 0 }} />
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

                          {/* Features - Fixed Single Line */}
                          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', height: 32 }}>
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
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper sx={{ p: 8, textAlign: 'center', borderRadius: 3 }}>
              <Typography variant="h5" color="text.secondary" gutterBottom>
                No Properties Found
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Try adjusting your filters to see more results
              </Typography>
              <Button variant="contained" size="large" startIcon={<Clear />} onClick={resetFilters}>
                Clear All Filters
              </Button>
            </Paper>
          )}
        </Container>
      </Box>

      {/* Favorites Sidebar - Fixed on right side */}
      <FavoritesSidebar />
    </>
  );
};

export default SearchPage;

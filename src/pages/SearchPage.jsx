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
  // Properties data from JSON file
  const [properties] = useState(propertiesData.properties);
  
  // Toggle state for filter panel visibility
  const [showFilters, setShowFilters] = useState(true);
  
  /**
   * Filter state object
   * Stores all search criteria values
   */
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

  // Access favorites context for add/remove and count functionality
  const { toggleFavorite, isFavorite, favoritesCount } = useFavorites();


  const getTimeSinceAdded = (added) => {
    // Month name to number mapping
    const monthMap = {
      January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
      July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
    };

    // Convert property added date to Date object
    const addedDate = new Date(added.year, monthMap[added.month], added.day);
    const today = new Date();
    
    // Calculate difference in days
    const diffTime = Math.abs(today - addedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Return appropriate human-readable format
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };


  const parsePropertyDate = (added) => {
    const monthMap = {
      January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
      July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
    };
    return new Date(added.year, monthMap[added.month], added.day);
  };

  /**
   * Filters properties based on all active search criteria
   * Implements multi-criteria filtering with AND logic
   */
  const filteredProperties = properties.filter(property => {
    // Property type filter
    if (filters.type !== 'Any' && property.type !== filters.type) return false;
    
    // Price range filters
    if (filters.minPrice && property.price < Number(filters.minPrice)) return false;
    if (filters.maxPrice && property.price > Number(filters.maxPrice)) return false;
    
    // Bedroom range filters
    if (filters.minBedrooms && property.bedrooms < Number(filters.minBedrooms)) return false;
    if (filters.maxBedrooms && property.bedrooms > Number(filters.maxBedrooms)) return false;
    
    // Postcode prefix match (case-insensitive)
    if (filters.postcode) {
      const searchPostcode = filters.postcode.toUpperCase().trim();
      if (!property.postcode.toUpperCase().startsWith(searchPostcode)) return false;
    }

    // Date range filters
    const propertyDate = parsePropertyDate(property.added);
    
    // Filter by "added after" date
    if (filters.dateAfter) {
      const afterDate = new Date(filters.dateAfter);
      afterDate.setHours(0, 0, 0, 0); // Start of day
      if (propertyDate < afterDate) return false;
    }
    
    // Filter by "added before" date
    if (filters.dateBefore) {
      const beforeDate = new Date(filters.dateBefore);
      beforeDate.setHours(23, 59, 59, 999); // End of day
      if (propertyDate > beforeDate) return false;
    }

    // Property passes all filters
    return true;
  });

 
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  /**
   * Resets all filters to default values
   */
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

  return (
    <>
      {/* ==================== MAIN SEARCH AREA ==================== */}
      {/* Main container with right padding for fixed sidebar */}
      <Box sx={{ 
        backgroundColor: '#f5f7fa', 
        minHeight: 'calc(100vh - 144px)', 
        py: 4, 
        pr: { xs: 0, md: '350px' } // Space for sidebar on desktop
      }}>
        <Container maxWidth="lg">
          
          {/* ==================== PAGE HEADER ==================== */}
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant="h3" fontWeight={700} color="primary" gutterBottom>
              Search Properties
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Find your perfect home from {properties.length} properties
            </Typography>
          </Box>

          {/* ==================== FILTER PANEL ==================== */}
          {/* Collapsible filter box with gradient header */}
          <Box sx={{ px: { xs: 0, sm: 2, md: 4 }, mb: 4 }}>
            <Paper 
              elevation={3} 
              sx={{ 
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              
              {/* Filter Header - Clickable to expand/collapse */}
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
                  
                  {/* Favorites count badge - only shown when favorites exist */}
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
                
                {/* Expand/Collapse icon */}
                <IconButton sx={{ color: 'white' }}>
                  {showFilters ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Box>

              {/* ==================== FILTER INPUTS ==================== */}
              {/* Collapsible filter content */}
              <Collapse in={showFilters}>
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={2}>
                    
                    {/* Property Type dropdown */}
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

                    {/* Minimum price input */}
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

                    {/* Maximum price input */}
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

                    {/* Postcode search input */}
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

                    {/* Minimum bedrooms input */}
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

                    {/* Maximum bedrooms input */}
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

                    {/* Date added after filter */}
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

                    {/* Date added before filter */}
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

                  {/* Clear all filters button */}
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

                  {/* ==================== ACTIVE FILTERS CHIPS ==================== */}
                  {/* Show active filter chips with individual removal */}
                  {Object.values(filters).some(val => val !== '' && val !== 'Any') && (
                    <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                      <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ mr: 1, alignSelf: 'center' }}>
                        Active:
                      </Typography>
                      
                      {/* Property type chip */}
                      {filters.type !== 'Any' && (
                        <Chip label={filters.type} size="small" onDelete={() => handleFilterChange('type', 'Any')} color="primary" />
                      )}
                      
                      {/* Min price chip */}
                      {filters.minPrice && (
                        <Chip label={`Min: £${filters.minPrice}`} size="small" onDelete={() => handleFilterChange('minPrice', '')} color="primary" />
                      )}
                      
                      {/* Max price chip */}
                      {filters.maxPrice && (
                        <Chip label={`Max: £${filters.maxPrice}`} size="small" onDelete={() => handleFilterChange('maxPrice', '')} color="primary" />
                      )}
                      
                      {/* Postcode chip */}
                      {filters.postcode && (
                        <Chip label={filters.postcode} size="small" onDelete={() => handleFilterChange('postcode', '')} color="primary" />
                      )}
                      
                      {/* Date after chip */}
                      {filters.dateAfter && (
                        <Chip label={`After: ${filters.dateAfter}`} size="small" onDelete={() => handleFilterChange('dateAfter', '')} color="primary" />
                      )}
                      
                      {/* Date before chip */}
                      {filters.dateBefore && (
                        <Chip label={`Before: ${filters.dateBefore}`} size="small" onDelete={() => handleFilterChange('dateBefore', '')} color="primary" />
                      )}
                    </Box>
                  )}
                </Box>
              </Collapse>
            </Paper>
          </Box>

          {/* ==================== RESULTS COUNT ==================== */}
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant="h5" color="text.secondary" fontWeight={600}>
              {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
            </Typography>
          </Box>

          {/* ==================== PROPERTY CARDS GRID ==================== */}
          {filteredProperties.length > 0 ? (
            <Grid container spacing={3}>
              {filteredProperties.map(property => (
                <Grid item xs={12} sm={6} md={4} key={property.id}>
                  
                  {/* Animated property card wrapper */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}  // Start below and transparent
                    animate={{ opacity: 1, y: 0 }}   // Fade in and slide up
                    transition={{ duration: 0.4 }}
                    whileHover={{ y: -8 }}          // Lift on hover
                    style={{ height: '100%' }}
                  >
                    
                    {/* Property Card - Draggable to favorites sidebar */}
                    <Card 
                      draggable
                      onDragStart={(e) => {
                        // Set drag data for favorites sidebar drop
                        e.dataTransfer.setData('property', JSON.stringify(property));
                        e.dataTransfer.effectAllowed = 'copy';
                      }}
                      sx={{ 
                        height: 420,  // Fixed height for consistent layout
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
                      
                      {/* ==================== IMAGE SECTION ==================== */}
                      {/* Property thumbnail with overlay badges */}
                      <Box sx={{ position: 'relative', height: 240, flexShrink: 0 }}>
                        
                        {/* Clickable image linking to property details */}
                        <Link to={`/property/${property.id}`}>
                          <CardMedia
                            component="img"
                            height="240"
                            image={property.thumbnail}
                            alt={`${property.location} property`}
                            sx={{
                              transition: 'transform 0.3s',
                              objectFit: 'cover',
                              '&:hover': {
                                transform: 'scale(1.05)', // Zoom on hover
                              },
                            }}
                          />
                        </Link>
                        
                        {/* Favorite toggle button - top right */}
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
                          aria-label={isFavorite(property.id) ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          {isFavorite(property.id) ? (
                            <Favorite sx={{ color: 'secondary.main' }} />
                          ) : (
                            <FavoriteBorder />
                          )}
                        </IconButton>

                        {/* Property type badge - top left */}
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

                        {/* Time since added badge - bottom left */}
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

                      {/* ==================== CONTENT SECTION ==================== */}
                      {/* Property details with fixed heights for consistency */}
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
                          
                          {/* Property price */}
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

                          {/* Property location - limited to 2 lines */}
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5, mb: 2, height: 40 }}>
                            <LocationOn sx={{ fontSize: 18, color: 'text.secondary', mt: 0.2, flexShrink: 0 }} />
                            <Typography 
                              variant="body2" 
                              color="text.secondary"
                              sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,  // Limit to 2 lines
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                lineHeight: 1.4,
                              }}
                            >
                              {property.location}
                            </Typography>
                          </Box>

                          {/* Property features - bedrooms, bathrooms, tenure */}
                          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', height: 32 }}>
                            
                            {/* Bedrooms */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Bed sx={{ fontSize: 20, color: 'text.secondary' }} />
                              <Typography variant="body2" fontWeight={500}>
                                {property.bedrooms}
                              </Typography>
                            </Box>
                            
                            {/* Bathrooms */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Bathtub sx={{ fontSize: 20, color: 'text.secondary' }} />
                              <Typography variant="body2" fontWeight={500}>
                                {property.bathrooms}
                              </Typography>
                            </Box>
                            
                            {/* Tenure (Freehold/Leasehold) */}
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
            
            /* ==================== EMPTY STATE ==================== */
            /* Shown when no properties match the filters */
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

      {/* ==================== FAVORITES SIDEBAR ==================== */}
      {/* Fixed-position sidebar on right side - accepts drag-and-drop */}
      <FavoritesSidebar />
    </>
  );
};

export default SearchPage;

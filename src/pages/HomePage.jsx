import { Box, Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Home, Star, TrendingUp } from '@mui/icons-material';
import { pageVariants, fadeInUp } from '../styles/animations';

const HomePage = () => {
  /**
   * title with introdoction of the application
   * Each feature includes an icon, title, and description
   */
  const features = [
    {
      icon: <Search sx={{ fontSize: 48 }} />,
      title: 'Advanced Search',
      description: 'Find your perfect property with our powerful multi-criteria search engine.',
    },
    {
      icon: <Home sx={{ fontSize: 48 }} />,
      title: '7 Properties',
      description: 'Browse through our curated selection of premium properties.',
    },
    {
      icon: <Star sx={{ fontSize: 48 }} />,
      title: 'Save Favorites',
      description: 'Create and manage your personalized list of favorite properties.',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 48 }} />,
      title: 'Real-time Updates',
      description: 'Get the latest property listings as soon as they become available.',
    },
  ];

  return (
    // Page wrapper with entrance/exit animations
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      
      {/* ==================== HERO SECTION ==================== */}
      {/* Main landing section with gradient background and hero content */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a237e 0%, #0d1442 100%)',
          color: 'white',
          py: { xs: 8, md: 15 }, // Responsive padding
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            
            {/* Left column: Hero text and CTA buttons */}
            <Grid item xs={12} md={7}>
              <motion.div variants={fadeInUp}>
                
                {/* Main headline */}
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' }, // Responsive font size
                    fontWeight: 800,
                    mb: 2,
                    lineHeight: 1.2,
                  }}
                >
                  Find Your Dream Home
                </Typography>
                
                {/* Hero subheading */}
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    opacity: 0.9,
                    fontWeight: 400,
                    lineHeight: 1.6,
                  }}
                >
                  Discover the perfect property with our advanced search features. Browse
                  houses, flats, and more across London's premium locations.
                </Typography>
                
                {/* CTA buttons container */}
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  
                  {/* Primary CTA: Search Properties button */}
                  <motion.div 
                    whileHover={{ scale: 1.05 }} // Scale up on hover
                    whileTap={{ scale: 0.95 }}   // Scale down on click
                  >
                    <Button
                      component={Link}
                      to="/search"
                      variant="contained"
                      size="large"
                      startIcon={<Search />}
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #f50057 0%, #ff4081 100%)',
                        boxShadow: '0 8px 24px rgba(245, 0, 87, 0.4)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #c51162 0%, #f50057 100%)',
                        },
                      }}
                    >
                      Search Properties
                    </Button>
                  </motion.div>
                  
                  {/* Secondary CTA: Learn More button */}
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: 2,
                        borderColor: 'white',
                        color: 'white',
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                      }}
                    >
                      Learn More
                    </Button>
                  </motion.div>
                </Box>
              </motion.div>
            </Grid>
            
            {/* Right column: Hero image */}
            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}  // Start off-screen to the right
                animate={{ opacity: 1, x: 0 }}   // Slide in animation
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* Image container with decorative background element */}
                <Box
                  sx={{
                    position: 'relative',
                    // Decorative gradient background behind image
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -20,
                      right: -20,
                      width: '100%',
                      height: '100%',
                      borderRadius: 4,
                      background: 'linear-gradient(135deg, #f50057 0%, #ff4081 100%)',
                      opacity: 0.2,
                    },
                  }}
                >
                  {/* Hero image*/}
                  <Box
                    component="img"
                    src="/images/hero.jpg"
                    alt="Modern luxury house with contemporary architecture"
                    sx={{
                      width: '100%',
                      borderRadius: 4,
                      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                      position: 'relative',
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ==================== FEATURES SECTION ==================== */}
      {/* Showcases the main features and benefits of the application */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        
        {/* Features section header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: 'primary.main',
            }}
          >
            Why Choose Prime Estate?
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            We provide the best tools and features to help you find your perfect property
          </Typography>
        </Box>

        {/* Features grid - responsive layout */}
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              {/* Animated feature card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}  // Start below and transparent
                whileInView={{ opacity: 1, y: 0 }} // Fade in and slide up when in viewport
                transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered animation
                viewport={{ once: true }} // Only animate once
                whileHover={{ y: -8 }}   // Lift effect on hover
              >
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    borderRadius: 4,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s',
                    '&:hover': {
                      boxShadow: '0 8px 30px rgba(0,0,0,0.12)', // Enhanced shadow on hover
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    
                    {/* Feature icon circle */}
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #1a237e 0%, #534bae 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                        color: 'white',
                      }}
                    >
                      {feature.icon}
                    </Box>
                    
                    {/* Feature title */}
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                      {feature.title}
                    </Typography>
                    
                    {/* Feature description */}
                    <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ==================== BOTTOM CTA SECTION ==================== */}
      {/* Final call-to-action section with gradient background */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f50057 0%, #ff4081 100%)',
          color: 'white',
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            
            {/* CTA heading */}
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Ready to Find Your Perfect Home?
            </Typography>
            
            {/* CTA subtext */}
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.95 }}>
              Start searching through our collection of premium properties today
            </Typography>
            
            {/* CTA button with hover animation */}
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button
                component={Link}
                to="/search"
                variant="contained"
                size="large"
                startIcon={<Search />}
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  backgroundColor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                Start Searching Now
              </Button>
            </motion.div>
          </Box>
        </Container>
      </Box>
    </motion.div>
  );
};

export default HomePage;

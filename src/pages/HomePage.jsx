import { Box, Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Home, Star, TrendingUp } from '@mui/icons-material';
import { pageVariants, fadeInUp } from '../styles/animations';

const HomePage = () => {
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
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a237e 0%, #0d1442 100%)',
          color: 'white',
          py: { xs: 8, md: 15 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <motion.div variants={fadeInUp}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 800,
                    mb: 2,
                    lineHeight: 1.2,
                  }}
                >
                  Find Your Dream Home
                </Typography>
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
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Box
                  sx={{
                    position: 'relative',
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
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                    alt="Modern house"
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

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
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
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            We provide the best tools and features to help you find your perfect property
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    borderRadius: 4,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s',
                    '&:hover': {
                      boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
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
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                      {feature.title}
                    </Typography>
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

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f50057 0%, #ff4081 100%)',
          color: 'white',
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Ready to Find Your Perfect Home?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.95 }}>
              Start searching through our collection of premium properties today
            </Typography>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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

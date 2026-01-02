import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  useScrollTrigger,
  Slide,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Home,
  Search,
  Favorite,
  Menu as MenuIcon,
  Close,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useFavorites } from '../../context/FavoritesContext';
import FavoritesSidebar from '../favorites/FavouriteSidebar';

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { favoritesCount } = useFavorites();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favoritesSidebarOpen, setFavoritesSidebarOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home', icon: <Home /> },
    { path: '/search', label: 'Search Properties', icon: <Search /> },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleFavoritesSidebar = () => {
    setFavoritesSidebarOpen(!favoritesSidebarOpen);
  };

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="sticky"
          elevation={2}
          sx={{
            background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
            backdropFilter: 'blur(10px)',
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ py: 1 }}>
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #f50057 0%, #ff4081 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(245, 0, 87, 0.3)',
                      }}
                    >
                      <Home sx={{ color: 'white', fontSize: 24 }} />
                    </Box>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        fontWeight: 700,
                        color: 'white',
                        letterSpacing: '-0.5px',
                        display: { xs: 'none', sm: 'block' },
                      }}
                    >
                      Prime Estate
                    </Typography>
                  </Box>
                </Link>
              </motion.div>

              <Box sx={{ flexGrow: 1 }} />

              {/* Desktop Navigation */}
              {!isMobile ? (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Button
                        component={Link}
                        to={link.path}
                        startIcon={link.icon}
                        sx={{
                          color: 'white',
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          fontWeight: 600,
                          backgroundColor:
                            location.pathname === link.path
                              ? 'rgba(255, 255, 255, 0.15)'
                              : 'transparent',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          },
                        }}
                      >
                        {link.label}
                      </Button>
                    </motion.div>
                  ))}

                  {/* Favorites Badge - Desktop */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <IconButton
                      onClick={toggleFavoritesSidebar}
                      sx={{
                        color: 'white',
                        ml: 1,
                        backgroundColor: favoritesSidebarOpen 
                          ? 'rgba(255, 255, 255, 0.15)' 
                          : 'transparent',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        },
                      }}
                    >
                      <Badge badgeContent={favoritesCount} color="secondary">
                        <Favorite />
                      </Badge>
                    </IconButton>
                  </motion.div>
                </Box>
              ) : (
                /* Mobile Menu Buttons */
                <>
                  {/* Favorites Badge - Mobile */}
                  <IconButton
                    onClick={toggleFavoritesSidebar}
                    sx={{ 
                      color: 'white', 
                      mr: 1,
                      backgroundColor: favoritesSidebarOpen 
                        ? 'rgba(255, 255, 255, 0.15)' 
                        : 'transparent',
                    }}
                  >
                    <Badge badgeContent={favoritesCount} color="secondary">
                      <Favorite />
                    </Badge>
                  </IconButton>

                  {/* Menu Icon */}
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={toggleMobileMenu}
                    sx={{ color: 'white' }}
                  >
                    <MenuIcon />
                  </IconButton>
                </>
              )}
            </Toolbar>
          </Container>

          {/* Mobile Navigation Drawer */}
          <Drawer
            anchor="right"
            open={mobileMenuOpen}
            onClose={toggleMobileMenu}
            PaperProps={{
              sx: {
                width: 280,
                background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
              },
            }}
          >
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                  Menu
                </Typography>
                <IconButton onClick={toggleMobileMenu} sx={{ color: 'white' }}>
                  <Close />
                </IconButton>
              </Box>

              <List>
                {navLinks.map(link => (
                  <ListItem key={link.path} disablePadding sx={{ mb: 1 }}>
                    <ListItemButton
                      component={Link}
                      to={link.path}
                      onClick={toggleMobileMenu}
                      sx={{
                        borderRadius: 2,
                        color: 'white',
                        backgroundColor:
                          location.pathname === link.path
                            ? 'rgba(255, 255, 255, 0.15)'
                            : 'transparent',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        },
                      }}
                    >
                      {link.icon}
                      <ListItemText primary={link.label} sx={{ ml: 2 }} />
                    </ListItemButton>
                  </ListItem>
                ))}

                {/* Favorites Link in Mobile Menu */}
                <ListItem disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                    onClick={() => {
                      toggleMobileMenu();
                      toggleFavoritesSidebar();
                    }}
                    sx={{
                      borderRadius: 2,
                      color: 'white',
                      backgroundColor: favoritesSidebarOpen
                        ? 'rgba(255, 255, 255, 0.15)'
                        : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      },
                    }}
                  >
                    <Badge badgeContent={favoritesCount} color="secondary">
                      <Favorite />
                    </Badge>
                    <ListItemText primary="My Favorites" sx={{ ml: 2 }} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </AppBar>
      </HideOnScroll>

      {/* Favorites Sidebar - Controlled by Header */}
      {favoritesSidebarOpen && (
        <FavoritesSidebar 
          isOpen={favoritesSidebarOpen}
          onClose={() => setFavoritesSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Header;

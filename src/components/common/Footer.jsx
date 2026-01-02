import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  Stack,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Our Team', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    services: [
      { name: 'Buy Property', href: '#' },
      { name: 'Sell Property', href: '#' },
      { name: 'Rent Property', href: '#' },
      { name: 'Property Valuation', href: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms & Conditions', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Disclaimer', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: <Facebook />, href: '#', label: 'Facebook' },
    { icon: <Twitter />, href: '#', label: 'Twitter' },
    { icon: <Instagram />, href: '#', label: 'Instagram' },
    { icon: <LinkedIn />, href: '#', label: 'LinkedIn' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #1a237e 0%, #0d1442 100%)',
        color: 'white',
        pt: 8,
        pb: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #f50057 0%, #ff4081 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <LocationOn sx={{ color: 'white', fontSize: 28 }} />
                </Box>
                <Typography variant="h5" fontWeight={700}>
                  Prime Estate
                </Typography>
              </Box>

              <Typography variant="body2" sx={{ mb: 3, opacity: 0.9, lineHeight: 1.7 }}>
                Your trusted partner in finding the perfect property. We specialize in
                residential sales and lettings across London and surrounding areas.
              </Typography>

              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone sx={{ fontSize: 20, opacity: 0.8 }} />
                  <Typography variant="body2">+44 20 1234 5678</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email sx={{ fontSize: 20, opacity: 0.8 }} />
                  <Typography variant="body2">info@primeestate.co.uk</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn sx={{ fontSize: 20, opacity: 0.8 }} />
                  <Typography variant="body2">123 High Street, London, UK</Typography>
                </Box>
              </Stack>
            </motion.div>
          </Grid>

          {/* Links Sections */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {/* Company Links */}
              <Grid item xs={12} sm={4}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Company
                  </Typography>
                  <Stack spacing={1}>
                    {footerLinks.company.map(link => (
                      <Link
                        key={link.name}
                        href={link.href}
                        underline="none"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.8)',
                          '&:hover': {
                            color: 'white',
                            transform: 'translateX(4px)',
                          },
                          transition: 'all 0.2s',
                          display: 'block',
                        }}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </Stack>
                </motion.div>
              </Grid>

              {/* Services Links */}
              <Grid item xs={12} sm={4}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Services
                  </Typography>
                  <Stack spacing={1}>
                    {footerLinks.services.map(link => (
                      <Link
                        key={link.name}
                        href={link.href}
                        underline="none"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.8)',
                          '&:hover': {
                            color: 'white',
                            transform: 'translateX(4px)',
                          },
                          transition: 'all 0.2s',
                          display: 'block',
                        }}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </Stack>
                </motion.div>
              </Grid>

              {/* Legal Links */}
              <Grid item xs={12} sm={4}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Legal
                  </Typography>
                  <Stack spacing={1}>
                    {footerLinks.legal.map(link => (
                      <Link
                        key={link.name}
                        href={link.href}
                        underline="none"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.8)',
                          '&:hover': {
                            color: 'white',
                            transform: 'translateX(4px)',
                          },
                          transition: 'all 0.2s',
                          display: 'block',
                        }}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </Stack>
                </motion.div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {currentYear} Prime Estate Agents. All rights reserved. |
            5COSC026W Advanced Client-Side Web Development
          </Typography>

          {/* Social Media Icons */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {socialLinks.map(social => (
              <motion.div
                key={social.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconButton
                  href={social.href}
                  aria-label={social.label}
                  sx={{
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

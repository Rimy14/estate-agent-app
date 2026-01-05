import { useState } from 'react';
import { Box, IconButton, Dialog, Paper } from '@mui/material';
import { ChevronLeft, ChevronRight, Close, ZoomIn } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const ImageGallery = ({ images, alt }) => {
  // Track currently displayed image index (0-based)
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Control fullscreen dialog visibility
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  /**
   * Navigate to next image in gallery
   * Wraps around to first image after last image
   */
  const nextImage = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  /**
   * Navigate to previous image in gallery
   * Wraps around to last image before first image
   */
  const prevImage = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  };

  /**
   * Jump directly to specific image by index
   */
  const goToImage = index => {
    setCurrentIndex(index);
  };

  return (
    <Box>
      
      {/* ==================== MAIN IMAGE DISPLAY ==================== */}
      {/* Primary image viewer with navigation controls */}
      <Paper
        elevation={3}
        sx={{
          position: 'relative',
          height: { xs: 300, sm: 400, md: 500 }, // Responsive height
          borderRadius: 3,
          overflow: 'hidden',
          mb: 2,
          backgroundColor: 'grey.200', // Loading background
        }}
      >
        
        {/* Animated image with fade transition */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex} // Key change triggers animation
            src={images[currentIndex]}
            alt={`${alt} - Image ${currentIndex + 1}`}
            initial={{ opacity: 0 }}  // Start transparent
            animate={{ opacity: 1 }}  // Fade in
            exit={{ opacity: 0 }}     // Fade out
            transition={{ duration: 0.3 }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Maintain aspect ratio
            }}
          />
        </AnimatePresence>

        {/* ==================== NAVIGATION ARROWS ==================== */}
        {/* Only show if gallery has multiple images */}
        {images.length > 1 && (
          <>
            {/* Previous image button - left side */}
            <IconButton
              onClick={prevImage}
              sx={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)', // Center vertically
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                '&:hover': { backgroundColor: 'white' },
                boxShadow: 2,
              }}
              aria-label="Previous image"
            >
              <ChevronLeft />
            </IconButton>

            {/* Next image button - right side */}
            <IconButton
              onClick={nextImage}
              sx={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)', // Center vertically
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                '&:hover': { backgroundColor: 'white' },
                boxShadow: 2,
              }}
              aria-label="Next image"
            >
              <ChevronRight />
            </IconButton>
          </>
        )}

        {/* ==================== FULLSCREEN BUTTON ==================== */}
        {/* Opens lightbox/fullscreen view */}
        <IconButton
          onClick={() => setFullscreenOpen(true)}
          sx={{
            position: 'absolute',
            right: 16,
            bottom: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            '&:hover': { backgroundColor: 'white' },
            boxShadow: 2,
          }}
          aria-label="View fullscreen"
        >
          <ZoomIn />
        </IconButton>

        {/* ==================== IMAGE COUNTER ==================== */}
        {/* Shows current position in gallery (e.g., "3 / 8") */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            color: 'white',
            px: 2,
            py: 1,
            borderRadius: 2,
            fontSize: '0.875rem',
            fontWeight: 600,
          }}
        >
          {currentIndex + 1} / {images.length}
        </Box>
      </Paper>

      {/* ==================== THUMBNAIL STRIP ==================== */}
      {/* Horizontal scrollable thumbnail navigation */}
      <Box
        sx={{
          display: 'flex',
          gap: 1.5,
          overflowX: 'auto', // Enable horizontal scrolling
          pb: 1,
          // Custom scrollbar styling
          '&::-webkit-scrollbar': {
            height: 8,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'grey.200',
            borderRadius: 4,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'primary.main',
            borderRadius: 4,
          },
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            onClick={() => goToImage(index)}
            sx={{
              minWidth: 100,
              height: 80,
              borderRadius: 2,
              overflow: 'hidden',
              cursor: 'pointer',
              // Highlight active thumbnail with thicker border
              border: currentIndex === index ? 3 : 2,
              borderStyle: 'solid',
              borderColor: currentIndex === index ? 'primary.main' : 'grey.300',
              transition: 'all 0.3s',
              '&:hover': {
                borderColor: 'primary.main',
                transform: 'translateY(-2px)', // Lift effect
                boxShadow: 2,
              },
            }}
          >
            <img
              src={image}
              alt={`${alt} thumbnail ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        ))}
      </Box>

      {/* ==================== FULLSCREEN DIALOG ==================== */}
      {/* Lightbox/modal view for enlarged images */}
      <Dialog
        fullScreen
        open={fullscreenOpen}
        onClose={() => setFullscreenOpen(false)}
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'rgba(0, 0, 0, 0.95)', // Dark overlay
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
        >
          
          {/* Close fullscreen button - top right */}
          <IconButton
            onClick={() => setFullscreenOpen(false)}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
              zIndex: 1,
            }}
            aria-label="Close fullscreen"
          >
            <Close />
          </IconButton>

          {/* Fullscreen image - centered and contained */}
          <img
            src={images[currentIndex]}
            alt={`${alt} fullscreen - Image ${currentIndex + 1}`}
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain', // Fit within viewport
            }}
          />

          {/* ==================== FULLSCREEN NAVIGATION ==================== */}
          {/* Navigation arrows in fullscreen mode */}
          {images.length > 1 && (
            <>
              {/* Previous button - left side */}
              <IconButton
                onClick={prevImage}
                sx={{
                  position: 'absolute',
                  left: { xs: 8, md: 32 }, // Responsive positioning
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
                }}
                aria-label="Previous image"
              >
                <ChevronLeft fontSize="large" />
              </IconButton>

              {/* Next button - right side */}
              <IconButton
                onClick={nextImage}
                sx={{
                  position: 'absolute',
                  right: { xs: 8, md: 32 }, // Responsive positioning
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
                }}
                aria-label="Next image"
              >
                <ChevronRight fontSize="large" />
              </IconButton>
            </>
          )}

          {/* Image counter in fullscreen - bottom center */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 32,
              left: '50%',
              transform: 'translateX(-50%)', // Center horizontally
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              px: 3,
              py: 1.5,
              borderRadius: 3,
              fontSize: '1rem',
              fontWeight: 600,
            }}
          >
            {currentIndex + 1} / {images.length}
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ImageGallery;

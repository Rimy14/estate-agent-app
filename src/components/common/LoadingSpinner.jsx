import { Box, CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ message = 'Loading...', size = 60 }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        gap: 3,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
        }}
      >
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress
            size={size}
            thickness={4}
            sx={{
              color: 'primary.main',
            }}
          />
          <CircularProgress
            size={size}
            thickness={4}
            variant="determinate"
            value={100}
            sx={{
              color: 'primary.light',
              opacity: 0.3,
              position: 'absolute',
              left: 0,
            }}
          />
        </Box>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
        }}
      >
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            fontWeight: 500,
            letterSpacing: '0.5px',
          }}
        >
          {message}
        </Typography>
      </motion.div>

      {/* Animated Dots */}
      <motion.div
        style={{
          display: 'flex',
          gap: '8px',
        }}
      >
        {[0, 1, 2].map(index => (
          <motion.div
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#1a237e',
            }}
            animate={{
              y: ['0%', '-50%', '0%'],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.15,
            }}
          />
        ))}
      </motion.div>
    </Box>
  );
};

export default LoadingSpinner;

import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface ImageCarouselProps {
  imageUrls: string[];
  intervalTime: number; // Time in milliseconds to switch to the next image
  fadeDuration: number; // Duration of the fade effect in milliseconds
  height: number; // Minimum height for the image container
  width: number; // Minimum width for the image container
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ imageUrls, intervalTime, fadeDuration, height, width }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const goToNextImage = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
      setFade(true);
    }, fadeDuration);
  };

  const goToPreviousImage = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
      setFade(true);
    }, fadeDuration);
  };

  useEffect(() => {
    const interval = setInterval(goToNextImage, intervalTime);
    return () => clearInterval(interval);
  }, [currentIndex, intervalTime]);

  return (
    <Box 
      sx={{ 
        position: 'relative', 
        textAlign: 'center', 
        backgroundColor: 'background.paper', // Material You surface color
        borderRadius: '16px', // Material 3 standard rounded corners
        overflow: 'hidden', 
        height: { xs: 'auto', sm: height }, // Auto height for mobile, specified for larger screens
        width: { xs: '100%', sm: width }, // Full width on mobile, specified for larger screens
        margin: '0 auto', // Center horizontally
        boxShadow: 3, // Material 3 elevation
        padding: '8px', // M3 recommended padding
      }}
    >
        <img
          src={imageUrls[currentIndex]}
          alt={`image-${currentIndex}`}
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'contain', 
            borderRadius: '8px', 
            opacity: fade ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
        />
      
      {/* Navigation Buttons with Arrow Icons */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          position: 'absolute', // Positioning the buttons over the image
          top: '50%', 
          transform: 'translateY(-50%)', 
          width: '100%' 
        }}
      >
        <IconButton 
          onClick={goToPreviousImage} 
          sx={{ 
            backgroundColor: 'background.default', 
            color: 'text.primary', 
            '&:hover': { backgroundColor: 'background.paper' }, // Slight hover effect
            boxShadow: 2, // M3 elevation for buttons
            borderRadius: '50%',
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton 
          onClick={goToNextImage} 
          sx={{ 
            backgroundColor: 'background.default', 
            color: 'text.primary', 
            '&:hover': { backgroundColor: 'background.paper' },
            boxShadow: 2,
            borderRadius: '50%',
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ImageCarousel;

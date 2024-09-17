import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface ImageCarouselProps {
  imageUrls: string[];
  intervalTime: number; // Time in milliseconds to switch to the next image
  height: number; // Minimum height for the image container
  width: number; // Minimum width for the image container
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ imageUrls, intervalTime, height, width }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const goToNextImage = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
      setFade(true);
    }, 300);
  };

  const goToPreviousImage = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
      setFade(true);
    }, 300);
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 50% opacity
        borderRadius: '16px', // Curved borders
        overflow: 'hidden', // Ensures image stays within the container
        padding: 0, // Optional padding for spacing
        height: height, // Minimum height
        width: width, // Minimum width
        margin: '0 auto', // Center horizontally
      }}
    >
        <img
          src={imageUrls[currentIndex]}
          alt={`image-${currentIndex}`}
          style={{
            height: '100%', // Full height of container
            width: '100%', // Full width of container
            backgroundPosition: "50% 50%",
            objectFit: 'contain', // Scale image to cover the container
            borderRadius: '8px', // Inner image border radius
            opacity: fade ? 1 : 0, // Control opacity for fade effect
            transition: 'opacity 0.3s ease-in-out', // Smooth fade transition
          }}
        />
   

      {/* Navigation Buttons with Arrow Icons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'sticky', bottom: '45%', width: '100%' }}>
        <IconButton onClick={goToPreviousImage} sx={{ backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff' }}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton onClick={goToNextImage} sx={{ backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff' }}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ImageCarousel;

import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface ImageCarouselProps {
  imageUrls: string[];
  intervalTime: number; // Time in milliseconds to switch to the next image
  minWidth: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ imageUrls, intervalTime, minWidth }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true); // Control fade animation

  // Function to go to the next image
  const goToNextImage = () => {
    setFade(false); // Trigger fade-out
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
      setFade(true); // Trigger fade-in after image change
    }, 300); // This should match the fade-out duration
  };

  // Function to go to the previous image
  const goToPreviousImage = () => {
    setFade(false); // Trigger fade-out
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
      setFade(true); // Trigger fade-in after image change
    }, 300); // This should match the fade-out duration
  };

  // Automatically move to the next image after `intervalTime` milliseconds
  useEffect(() => {
    const interval = setInterval(goToNextImage, intervalTime);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [currentIndex, intervalTime]);

  return (
    <Box sx={{ position: 'relative', textAlign: 'center' }}>
      {/* Image Container */}
      <img
        src={imageUrls[currentIndex]}
        alt={`image-${currentIndex}`}
        style={{
          minWidth: minWidth,
          maxWidth: '100%',
          height: 'auto',
          borderRadius: '8px',
          opacity: fade ? 1 : 0, // Control opacity for fade effect
          transition: 'opacity 0.3s ease-in-out', // Smooth fade transition
        }}
      />

   {/* Navigation Buttons with Arrow Icons */}
   <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'absolute', bottom: '2%', width: '100%' }}>
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

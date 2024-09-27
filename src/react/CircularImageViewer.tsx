import React, { useState, useEffect } from 'react';
import { Box, IconButton, useMediaQuery } from '@mui/material';

export interface CircularImageViewerProps {
  images: string[]; // Array of image source paths
  startAngle?: number; // Starting angle for the first image
  angleIncrement?: number; // Angle difference between consecutive images
  avatarSize?: number; // Diameter of the center avatar
  buttonRadius?: number; // Radius of the outer circular avatar buttons
  maxDistance?: number; // Maximum distance away from the center for the buttons
  onButtonClick?: (index: number, image: string, path: string) => void; // Callback when a button is clicked
}

const CircularImageViewer: React.FC<CircularImageViewerProps> = ({
  images,
  startAngle = 180, // Default starting angle
  angleIncrement = 30, // Default angle increment of 30 degrees
  avatarSize = 350, // Default size for the center avatar
  buttonRadius = 60, // Default radius of the circular avatar buttons
  maxDistance = 200, // Default max distance from the center
  onButtonClick, // Callback for button click
}) => {
  const [currentImage, setCurrentImage] = useState(images[0]);

  // Check if the screen is small
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  // Preload images to cache them
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  const handleImageClick = (image: string, index: number) => {
    setCurrentImage(image);

    // Trigger callback when an image is clicked
    if (onButtonClick) {
      onButtonClick(index, image, image); // Passing the index, image, and path
    }
  };
// Function to render buttons
// Function to render buttons
const renderButtons = (isSmallLayout: boolean) => {
  // If the image length is 1 or less, return null
  if (images.length <= 1) return null;

  return (
    <Box
      position="absolute"
      width={ isSmallLayout ? 'auto' : avatarSize } // Full width for small layout
      height={ isSmallLayout ? 'auto' : avatarSize } // Auto height for small layout
      display="flex"
      alignItems="center"
      justifyContent="center" // Center horizontally
      top={ isSmallLayout ? avatarSize : 'unset' } // Position below the main image for small layout
      
    >
      {images.map((image, index) => {
        const isCurrent = currentImage === image;

        if (isSmallLayout) {
          // For small layout, position in a row below the main image
          return (
            <IconButton
              key={index}
              onClick={() => handleImageClick(image, index)} // Pass index and image on click
              style={{
                margin: 1, // Add margin for small layout
                transition: 'transform 0.5s ease', // Smooth grow/shrink effect
                transform: isCurrent ? 'scale(1.2)' : 'scale(1)', // Grow if current
              }}
            >
              <Box
                component="img"
                src={image}
                alt={`Image ${index + 1}`}
                sx={{
                  width: buttonRadius,
                  height: buttonRadius,
                  boxShadow: '0px 4px 18px rgba(0, 0, 0, 0.3)',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  filter: isCurrent ? 'none' : 'grayscale(100%)', // Grey out inactive images
                  transition: 'filter 0.5s ease', // Smooth filter change
                  borderColor: '#ECDFCC',
                  border: '4px solid',
                }}
              />
            </IconButton>
          );
        } else {
          // For large layout, position in a circle
          const angle = startAngle + index * angleIncrement; // Adjust angle with padding
          const x = maxDistance * Math.cos((angle * Math.PI) / 180);
          const y = maxDistance * Math.sin((angle * Math.PI) / 180);

          return (
            <IconButton
              key={index}
              onClick={() => handleImageClick(image, index)} // Pass index and image on click
              style={{
                position: 'absolute',
                left: `calc(50% + ${x}px - ${buttonRadius / 2}px)`, // Center button for large layout
                top: `calc(50% + ${y}px - ${buttonRadius / 2}px)`,
                transition: 'transform 0.5s ease', // Smooth grow/shrink effect
                transform: isCurrent ? 'scale(1.2)' : 'scale(1)', // Grow if current
              }}
            >
              <Box
                component="img"
                src={image}
                alt={`Image ${index + 1}`}
                sx={{
                  width: buttonRadius,
                  height: buttonRadius,
                  boxShadow: '0px 4px 18px rgba(0, 0, 0, 0.3)',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  filter: isCurrent ? 'none' : 'grayscale(100%)', // Grey out inactive images
                  transition: 'filter 0.5s ease', // Smooth filter change
                  borderColor: '#ECDFCC',
                  border: '4px solid',
                }}
              />
            </IconButton>
          );
        }
      })}
    </Box>
  );
};


  const renderLayout = () => (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      width={avatarSize + buttonRadius * 2}
      height={avatarSize + buttonRadius * 2}
    >
      {/* Center box displaying the current image with parallax animation */}
      <Box 

        width={avatarSize} 
        height={avatarSize}
        sx={{ 
          borderRadius: '50%', // Keep the circular shape
          border: '8px solid #ECDFCC', // Add border around the avatar
          overflow: 'hidden', // Hide overflowing
        }}
      >
        <Box
          component="img"
          src={currentImage}
          alt="Current Image"
          sx={{
            width: avatarSize,
            height: avatarSize,
            zIndex: 0,
            objectFit: 'cover',
            transition: 'transform 5s ease', // Smooth grow/shrink effect
            boxShadow: '0px 4px 18px rgba(0, 0, 0, 0.3)', // Add shadow to the avatar
            animation: 'parallax 30s ease-in-out infinite', // Apply animation
          }}
        />
      </Box>

      {/* Render buttons */}
      {renderButtons(isSmallScreen)}

      {/* Keyframe animation definition */}
      <style>{`
        @keyframes parallax {
          0% {
            transform: scale(1);
            transform-origin: 100% 0%;
          }
          50% {
            transform: scale(1.2);
            transform-origin: 0% 100%;
          }
          100% {
            transform: scale(1);
            transform-origin: 100% 0%;
          }
        }
      `}</style>
    </Box>
  );

  return renderLayout();
};

export default CircularImageViewer;

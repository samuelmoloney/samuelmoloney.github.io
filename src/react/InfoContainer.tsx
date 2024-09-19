import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import AnimatedInfoAvatar from './AnimatedInfoAvatar';

const InfoContainer = () => {
  const [boxVisible, setBoxVisible] = useState(false);  // Track visibility for fade in/out

  // Handle when the avatar reaches the middle (fade in)
  function handleReachMiddle() {
    setBoxVisible(true);  // Fade in the box
  };

  // Handle when scrolling starts (fade out)
  function handleStartedScrolling() {
    setBoxVisible(false);  // Fade out the box
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },  // Column for small, row for large screens
        alignItems: 'center',      // Centers the items in the row
        position: 'relative',      // To allow absolute positioning of the animated line
      }}
    >
      {/* Animated Avatar in the center of the screen */}
      <AnimatedInfoAvatar
        imagePath='https://picsum.photos/id/1/512/512'
        onReachMiddle={handleReachMiddle}
        onStartedScrolling={handleStartedScrolling}
      />

      {/* Animated Line */}
      {/* <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: { xs: '10%', lg: '50%' },  // Responsive left positioning
          transform: { lg: 'translateY(-50%)' },  // Center the line on larger screens
          height: '8px',
          backgroundColor: 'black',  // Line color
          width: boxVisible ? '100%' : '0',  // Line width grows when box is visible
          transition: 'width 0.5s ease-in-out',  // Smooth transition for line growing
          zIndex: -1,  // Make sure it doesn't overlap content
        }}
      /> */}

      {/* Box with fade-in/fade-out animation */}
      <Box
        sx={{
          minHeight: '128px',
          borderRadius: 4,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(5px)',
          boxShadow: 8,
          margin: { xs: 1, sm: 2, md: 4, lg: 8 }, // Responsive margins
          width: { xs: '100%', lg: 'auto' },      // Full width for small screens
          marginTop: { xs: 2, lg: 0 },            // Adds margin on top for column layout
          opacity: boxVisible ? 1 : 0,            // Fade in (1) or fade out (0)
          transition: 'opacity 0.3s ease-in-out', // Smooth transition for fading
        }}
      >
        {/* Content inside the box */}
        <Box sx={{ padding: 2 }}>
          <Typography
            variant="h2"
            color="text.primary"
            justifyContent='center'
            sx={{
              fontSize: { xs: '1.5rem', md: '3rem' }, // Adjust font size for different screens
              padding: { xs: 1, md: 2 },
            }}
          >
            Heading
          </Typography>
          <Typography
            variant="h4"
            color="text.primary"
            sx={{
              fontSize: { xs: '1.25rem', md: '2rem' },
              padding: { xs: 1, md: 2 },
            }}
          >
            Subheading
          </Typography>
          <Typography
            variant="body1"
            color="text.primary"
            sx={{
              fontSize: { xs: '1rem', md: '1.5rem' },
              padding: { xs: 1, md: 2 },
            }}
          >
            Description <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <br />
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default InfoContainer;

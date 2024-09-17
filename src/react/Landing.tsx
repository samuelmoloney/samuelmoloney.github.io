import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Color, lerpColor, lerpColorString } from '../utils/lerpColor';
import ProfileImage from './ProfileImage'; // Assuming this is a custom component
import ScrollDownIcon from './ScrollDownIcon'; // Assuming this is a custom component
import theme from '../dist/vendors.bundle';

interface LandingProps {
  nextSectionRef: React.RefObject<HTMLDivElement>;
}

const Landing: React.FC<LandingProps> = ({ nextSectionRef }) => {

  const scrollToSection = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const landingRef = useRef<HTMLDivElement>(null);
  const [backgroundColor, setBackgroundColor] = useState('rgb(24, 28, 20)');

  useEffect(() => {
    const handleScroll = () => {
      if (landingRef.current === null) return;
      const rect = landingRef.current.getBoundingClientRect();
      const scaler = 1 - Math.min(1, Math.max(0, rect.bottom / window.innerHeight));
      const primaryColor = new Color(0, 0, 0).fromHex('#181C14');
      const secondaryColor = new Color(0, 0, 0).fromHex('#ECDFCC');
      const newColor = lerpColor(primaryColor, secondaryColor, scaler);
      setBackgroundColor(newColor.toString());
    };
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  });

  return (
    <Box
      className="landing-container"
      ref={landingRef}
      sx={{
        height: '100vh',
        backgroundColor: backgroundColor,
        backgroundImage: `
          radial-gradient(circle, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7) 250%)
        `,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: [2, 4], // Add padding for smaller screens
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Stack on mobile, row on larger screens
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: 2, md: 4 }, // Spacing between elements
          width: '100%',
          maxWidth: '1200px', // Limit width on larger screens
        }}
      >
        {/* Profile Image */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ProfileImage
            src="./assets/headshot.png"
            alt="Profile Image"
            sx={{
              width: { xs: '350px', md: '300px' }, // Adjust size for mobile and larger screens
              height: { xs: '350px', md: '300px' },
            }}
          />
        </Box>

        {/* Text and Scroll Down Icon */}
        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            variant="h2"
            color="text.primary"
            sx={{
              fontSize: { xs: '1.5rem', md: '3rem' }, // Adjust font size for different screens
              padding: { xs: 1, md: 2 },
            }}
          >
            Sam Moloney
          </Typography>
          <Typography
            variant="h4"
            color="text.primary"
            sx={{
              fontSize: { xs: '1.25rem', md: '2rem' },
              padding: { xs: 1, md: 2 },
            }}
          >
            Software Engineer
          </Typography>
          <Typography
            variant="h5"
            color="text.primary"
            sx={{
              fontSize: { xs: '1rem', md: '1.5rem' },
              padding: { xs: 1, md: 2 },
            }}
          >
            Get to know me
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <ScrollDownIcon scrollToSection={scrollToSection} parentRef={landingRef} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Landing;

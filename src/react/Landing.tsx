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
    if ( landingRef.current === null) return;
    const rect = landingRef.current.getBoundingClientRect();
    const scaler =  1 - Math.min(1, Math.max(0,(rect.bottom / window.innerHeight)));
    // get the theme primary and secondary colors
    const primaryColor = new Color(0,0,0).fromHex('#181C14');
    const secondaryColor = new Color(0,0,0).fromHex('#ECDFCC');
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
      className="landing-container" // Added class for scroll tracking
      ref={landingRef}
      sx={{
        height: '100vh',
        width: '100vw',
        backgroundColor: backgroundColor,
        backgroundImage: `
          radial-gradient(circle, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7) 250%)
        `,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        overflow: 'hidden',
      }}
    >
      {/* Center */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30vh' , overflow: 'hidden',}}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <ProfileImage src="./assets/headshot.png" alt="Profile Image" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' , margin: 18}}>
            <Typography padding={2} variant="h2" color="text.primary">
              Sam Moloney
            </Typography>
            <Typography padding={2} variant="h4" color="text.primary">
              Software Engineer
            </Typography>
            <Typography padding={2} variant="h5" color="text.primary">
                Get to know me
              </Typography>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
              <ScrollDownIcon scrollToSection={scrollToSection} parentRef = {landingRef} />
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Landing;

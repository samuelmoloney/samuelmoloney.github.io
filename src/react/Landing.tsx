import React from 'react';
import { Box, Typography } from '@mui/material';
import ProfileImage from './ProfileImage'; // Assuming this is a custom component
import ScrollDownIcon from './ScrollDownIcon'; // Assuming this is a custom component

interface LandingProps {
  nextSectionRef: React.RefObject<HTMLDivElement>;
}

const Landing: React.FC<LandingProps> = ({ nextSectionRef }) => {
  const scrollToSection = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box sx={{ 
        height: '100vh', 
        width: '100vw', 
        backgroundColor: 'rgb(24, 28, 20)', 
        backgroundImage: `
        radial-gradient(circle, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7) 250%)
      `,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',}}>
      {/* Center */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30vh' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <ProfileImage 
              src="./assets/headshot.png"
              alt="Profile Image" 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography padding={2} variant="h2" color='text.primary'>Sam Moloney</Typography>
            <Typography padding={2} variant="h4" color='text.primary'>Software Engineer</Typography>
            <ScrollDownIcon scrollToSection={scrollToSection} />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Landing;
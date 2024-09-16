import { Box, Button, ButtonGroup, Container, Stack, Typography } from '@mui/material';
import React, { useRef } from 'react';
import { styled } from '@mui/system';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import ImageContainer from './ImageContainer';
import ProfileImage from './ProfileImage';
import Spacer from './Spacer';
import ScrollDownIcon from './ScrollDownIcon';

export default function App() {

    return (  
    <Stack>
    <Landing />
      <Container id="contact" >
          <Box padding={1} margin={1} sx={{
              minHeight: '128px',
              borderRadius: 4,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(5px)',
              boxShadow: 8,
          }}>
              <Spacer />
              <Typography variant="body1" color="text.primary">under construction</Typography>
              <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
              }}>
                  <Spacer />
                  <ButtonGroup aria-label="Contact Buttons">
                      <Button color="secondary" href="https://github.com/samuelmoloney" target="_blank">
                          Github <GitHubIcon sx={{ paddingLeft: "8px" }} />
                      </Button>
                      <Button color="secondary" href="" target="_blank">
                          Linkedin <LinkedInIcon sx={{ paddingLeft: "8px" }} />
                      </Button>
                      <Button color="secondary" href="mailto:contact@sammoloney.com">
                          Email <EmailIcon sx={{ paddingLeft: "8px" }} />
                      </Button>
                  </ButtonGroup>
              </Box>
          </Box>
      </Container>
      <Box sx={{ height: '100vh', width: '100vw', }}>
     </Box>
      </Stack>
  );
}

function Landing() {

    const nextSectionRef = useRef<HTMLDivElement>(null);
    const scrollToSection = () => {
        if (nextSectionRef.current) {
          const offsetTop = nextSectionRef.current.offsetTop;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth',
          });
        }
        };
    return <Box sx={{ height: '100vh', width: '100vw', backgroundColor: 'rgb(24, 28, 20)' }}>
        {/* center */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30vh'}}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <ProfileImage 
                    src="./assets/headshot.png"
                    alt="Profile Image" 
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography padding={2} variant="h2" color="#ECDFCC">Sam moloney</Typography>
                <Typography padding={2} variant="h4" color="#ECDFCC">Software Engineer</Typography>
                <ScrollDownIcon scrollToSection={scrollToSection} />
                </div>
            </div>
        </div>
    </Box>;
}

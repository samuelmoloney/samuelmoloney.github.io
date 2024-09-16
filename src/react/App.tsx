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
import Landing from './Landing';
import { ViewColumn } from '@mui/icons-material';
import ImageCarousel from './ImageCarousel';

export default function App() {

    const pageTopRef = useRef(null);

    return (  
    <Stack>
    <Landing nextSectionRef={pageTopRef} />
      <Container id="contact"  ref ={pageTopRef}>
        <Contact/>
      </Container>
      <InfoContainer/>
      <Box sx={{ height: '100vh', width: '100vw', }}>
     </Box>
      </Stack>
  );
}
function Contact()
{
    return <Box padding={1} margin={1} sx={{
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
                <Button color="secondary" href="" target="google.com">
                    Linkedin <LinkedInIcon sx={{ paddingLeft: "8px" }} />
                </Button>
                <Button color="secondary" href="mailto:contact@sammoloney.com">
                    Email <EmailIcon sx={{ paddingLeft: "8px" }} />
                </Button>
            </ButtonGroup>
        </Box>
    </Box>;

}

function InfoContainer()
{
    return   <Box padding={1} margin={1} sx={{
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
            alignItems: 'left',
        }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' , alignItems: 'left'}}>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <ImageCarousel imageUrls={["https://via.placeholder.com/300", "https://via.placeholder.com/100", "https://via.placeholder.com/40"]} intervalTime={5000} minWidth = {400} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography padding={2} variant="h4" color='text.primary'>Text</Typography>
                </div>
            </div> 
        </Box>
    </Box>;
}


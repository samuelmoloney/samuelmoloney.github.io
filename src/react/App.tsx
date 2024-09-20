import { Box, Button, ButtonGroup, Card, Container, Stack, Typography } from '@mui/material';
import { useRef } from 'react';
import Spacer from './Spacer';
import Landing from './Landing';
import { Contact } from './Contact';
import InfoContainer from './InfoContainer';

export default function App() {

    const pageTopRef = useRef(null);

    return (  
    <Stack>
    <Landing nextSectionRef={pageTopRef} />
    <Spacer />
    <div 
    id="topPage" 
    ref ={pageTopRef}
    >
    </div>
    <Box
    padding={1}
    sx={{
      minHeight: '128px',
      borderRadius: 4,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(5px)',
      boxShadow: 8,
      margin: { xs: 1, sm: 2, md: 4, lg: 8 }, // Responsive margins
    }}
  >
    {/* under construction check back soon */}
    <Typography variant="h2" color="text.primary" textAlign={"center"}>Under Construction</Typography>
    <Typography variant="h4" color="text.primary" textAlign={"center"}>Please check back soon</Typography>
    </Box>
    {/* Aura OS */}
    <InfoContainer
    imagePath='../assets/AuraOSFrontPage.png'
    heading="Aura OS"
    subheading="A cutting-edge orchestration system designed to transform digital experiences."
    description=
    'At Aura, I served as a Software Engineer from April 2021 to August 2024, focusing on developing cutting-edge interactive streaming solutions, real-time data visualization, and immersive experiences. \n \n I contributed to a range of projects, including VR applications, mobile-to-TV integrations, live sports data processing, and cloud-based data transformations.\n \n My work spanned Unity 3D and Flutter applications, integrating live data through GraphQL and AWS services, as well as enhancing user engagement through features like 3D live data maps, interactive betting systems, and cross-platform content control.'
    />
    {/* Eye Candy */}
    <InfoContainer/>
    {/* Pine Fire Studios */}
    <InfoContainer/>

  
    <Box 
    sx={{ 
        height: '100vh',
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        }}
    >
    <Contact/>
    <Spacer />
    </Box>
    </Stack>
  );
}


// function InfoContainer()
// {
//     return     <Box
//     padding={1}
//     sx={{
//       minHeight: '128px',
//       borderRadius: 4,
//       backgroundColor: 'rgba(0, 0, 0, 0.4)',
//       backdropFilter: 'blur(5px)',
//       boxShadow: 8,
//       margin: { xs: 1, sm: 2, md: 4, lg: 8 }, // Responsive margins
//     }}
//   >
//         <Spacer />
//         <Typography 
//         variant="h2" 
//         color="text.primary"
//         textAlign={'center'}
//         >
//             heading
//         </Typography>
//         <Box sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'left',
//         }}>
//             <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' , alignItems: 'left'}}>
//                 <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
//                 <SecondExample />
//                 </div>
//                 <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//                     <Typography padding={2} variant="h4" color='text.primary'>Text</Typography>
//                 </div>
//             </div> 
//         </Box>
//     </Box>;
// }


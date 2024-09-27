import { Box, Button, ButtonGroup, Card, Container, Stack, Typography } from '@mui/material';
import { useRef } from 'react';
import Spacer from './Spacer';
import Landing from './Landing';
import { Contact } from './Contact';
import InfoContainer from './InfoContainer';
import ImageCarousel from './ImageCarousel';
import CircularImageViewer from './CircularImageViewer';

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
  
    {/* Aura OS */}
    <InfoContainer
    heading="Under Construction"
    subheading='Currently this site is under construction. Please check back later for more information.'
    description=
    ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
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


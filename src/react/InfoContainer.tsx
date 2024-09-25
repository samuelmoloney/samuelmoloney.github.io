
import { Box, Container, Typography } from '@mui/material';
import AnimatedInfoAvatar from './AnimatedInfoAvatar';
import React from 'react';
import ImageCarousel from './ImageCarousel';


interface InfoContainerProps {
    // Props for the InfoContainer component
    imagePath? : string;
    heading? : string;
    subheading? : string;
    description? : string;
}

interface InfoContainerState {
    boxVisible: boolean;
  }

class InfoContainer extends React.Component<InfoContainerProps, InfoContainerState>{
    constructor(props: InfoContainerProps){
        super(props);
        this.state = {
            boxVisible: false
        }

        this.handleReachMiddle = this.handleReachMiddle.bind(this);
        this.handleStartedScrolling = this.handleStartedScrolling.bind(this);
    }

  // Handle when the avatar reaches the middle (fade in)
  handleReachMiddle(): void {
    this.setState({ boxVisible: true });
  }

  // Handle when scrolling starts (fade out)
  handleStartedScrolling(): void {
    this.setState({ boxVisible: false });
  }

  render() {
    const { imagePath, heading, subheading, description } = this.props;
    const { boxVisible } = this.state;


    return (
      <Box
        className='info-container'
        display={'flex'}
        flexDirection={{ xs: 'column', sm: 'column', md: 'row' }}
        alignItems={'center'}
        justifyContent={'center'}
        position={'relative'}
        margin={ { xs: 1, sm: 2, md: 4, lg: 8 } } // Responsive margins
      >
        {/* Animated Avatar in the center of the screen */}
        <AnimatedInfoAvatar
          imagePath={imagePath}
          onReachMiddle={this.handleReachMiddle}
          onStartedScrolling={this.handleStartedScrolling}
        />
        {/* Box with fade-in/fade-out animation */}
        <Box
          sx={{
            width: { xs: '100%', sm: '100%', md: '100vh', lg: '100vh' },
            borderRadius: 4,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(5px)',
            boxShadow: 8,
            margin: { xs: 1, sm: 2, md: 4, lg: 8 }, // Responsive margins
            marginTop: { xs: 2, sm: 2,md: 0, lg: 0 },            // Adds margin on top for column layout
            opacity: boxVisible ? 1 : 0,            // Fade in (1) or fade out (0)
            transition: 'opacity 0.8s ease-in-out', // Smooth transition for fading
          }}
        >

          {/* Content inside the box */}
          <Box
            display={'flex'}
            flexDirection={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }}
           >

           {/* text */}     
          <Box sx={{ padding: 2 , width: {xs: "100%", sm: "100%", md: "50%", lg: "50%"}}}>
            <Typography
              variant="h2"
              color="text.primary"
              justifyContent="left"
              sx={{

                padding: { sm: 1, md: 2 },
              }}
            >
              {heading || 'Heading'}
            </Typography>
            <Typography
              variant="h4"
              color="text.primary"
              sx={{

                padding: { sm: 1, md: 2 },
              }}
            >
              {subheading || 'Subheading'}
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{
                whiteSpace: 'pre-line' ,
                padding: { sm: 1, md: 2 },
              }}
            >
                {description || 'Description'}
            </Typography>
          </Box>
     
          {/* Images */}
        <Box sx={{ alignContent: "center", justifyContent: "center"}}>
          <ImageCarousel 
          imageUrls={["https://picsum.photos/id/8/400/600","https://picsum.photos/id/2/200/300","https://picsum.photos/id/3/200/300"]} 
          intervalTime={5000} 
          animationDuration={1000}  
          />
          </Box>
            
        </Box>
        </Box>
      </Box>
    );
  }
}

export default InfoContainer;
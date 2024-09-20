
import { Box, Container, Typography } from '@mui/material';
import AnimatedInfoAvatar from './AnimatedInfoAvatar';
import React from 'react';


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
          imagePath={imagePath}
          onReachMiddle={this.handleReachMiddle}
          onStartedScrolling={this.handleStartedScrolling}
        />

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
              justifyContent="center"
              sx={{
                fontSize: { xs: '1.5rem', md: '3rem' }, // Adjust font size for different screens
                padding: { xs: 1, md: 2 },
              }}
            >
              {heading || 'Heading'}
            </Typography>
            <Typography
              variant="h4"
              color="text.primary"
              sx={{
                fontSize: { xs: '1.25rem', md: '2rem' },
                padding: { xs: 1, md: 2 },
              }}
            >
              {subheading || 'Subheading'}
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{
                fontSize: { xs: '1rem', md: '1.5rem' },
                padding: { xs: 1, md: 2 },
              }}
            >
                {description || 'Description'}
            </Typography>
          </Box>
        </Box>
      </Container>
    );
  }
}

export default InfoContainer;
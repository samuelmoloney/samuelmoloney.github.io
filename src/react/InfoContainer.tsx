import { Box, Typography } from '@mui/material';
import AnimatedInfoImageViewer from './AnimatedInfoImageViewer';
import React from 'react';

export interface InfoContainerProps {
  currentIndex?: number;
  images?: string[];
  heading?: string;
  headingLink?: string;
  subheading?: string[];
  description?: string[];
  contentOrder?: 'left' | 'right';
}

interface InfoContainerState {
  boxVisible: boolean;
  textVisible: boolean;
  currentIndex: number;
  isSmallScreen: boolean;
}

export default class InfoContainer extends React.Component<InfoContainerProps, InfoContainerState> {
  constructor(props: InfoContainerProps) {
    super(props);
    this.state = {
      boxVisible: false,
      textVisible: false,
      currentIndex: props.currentIndex || 0,
      isSmallScreen: window.innerWidth <= 900,
    };

    this.handleReachMiddle = this.handleReachMiddle.bind(this);
    this.handleStartedScrolling = this.handleStartedScrolling.bind(this);
    this.setCurrentIndex = this.setCurrentIndex.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  // Handle screen size changes
  handleResize() {
    this.setState({ isSmallScreen: window.innerWidth <= 900 });
  }

  // Handle box visibility when reaching the middle
  handleReachMiddle() {
    this.setState({ boxVisible: true });
  }

  // Handle box and text visibility on scrolling
  handleStartedScrolling() {
    this.setState({ boxVisible: false, textVisible: false });
  }

  // Set current index for image viewer
  setCurrentIndex(index: number) {
    this.setState({ currentIndex: index });
  }

  // Update text visibility when box becomes visible
  componentDidUpdate(prevProps: InfoContainerProps, prevState: InfoContainerState) {
    if (this.state.boxVisible && !prevState.boxVisible) {
      setTimeout(() => {
        this.setState({ textVisible: true });
      }, 500);
    }
  }

  // Function to render the Box with text
  renderInfoBox() {
    const { heading, headingLink, subheading, description } = this.props;
    console.log('this.props', this.props);
    console.log('this.headingLink', headingLink);
    const { boxVisible, textVisible, isSmallScreen } = this.state;
    return (
      <Box
        sx={{
          width: isSmallScreen ? '100%' : boxVisible ? '100%' : '0%',
          height: isSmallScreen ? (boxVisible ? 'auto' : '0%') : 'auto',
          borderRadius: 4,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(5px)',
          boxShadow: 8,
          opacity: boxVisible ? 1 : 0,
          transition: 'width 0.5s ease-in-out, height 0.5s ease-in-out, opacity 0.5s ease-in-out',
          overflow: 'hidden',
        }}
      >
        
        <Box
          sx={{
            padding: 2,
            whiteSpace: 'pre-wrap',
            overflow: 'hidden',
            height: '100%',
            opacity: textVisible ? 1 : 0,
            transition: 'opacity 0.2s ease-in-out',
          }}
        >
          <Box 
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'left',
          }}
          >
          <Typography variant="h1" color="text.primary" sx={{ padding: { sm: 1, md: 2 }, whiteSpace: 'pre-line' }}>
            {heading || 'Heading'}
          </Typography>
          <Typography variant="body1" component="a"  href={headingLink} target="_blank" rel="noopener noreferrer" sx={{ padding: { sm: 1, md: 2 }, whiteSpace: 'pre-line' }}>
            { headingLink ? 'website' : ''}
          </Typography>
          </Box>
          <Typography variant="h2" color="text.primary" sx={{ padding: { sm: 1, md: 2 }, whiteSpace: 'pre-line' }}>
          {subheading ? subheading[this.state.currentIndex ] : 'Subheading'}
          </Typography>
          <Typography variant="body1" color="text.primary" sx={{ padding: { sm: 1, md: 2 }, whiteSpace: 'pre-line' }}>
          {description ? description[this.state.currentIndex ] : 'Body'}
          </Typography>
        </Box>
      </Box>
    );
  }

  render() {
    const { images, contentOrder } = this.props;
    const { isSmallScreen } = this.state;

    return (
      <Box
        className="info-container"
        display={'flex'}
        flexDirection={{ xs: 'column', sm: 'column', md: 'row' }}
        alignItems={{ xs: 'center', sm: 'center', md: 'flex-start' }}
        justifyContent={'center'}
        position={'relative'}
        margin={{ xs: 1, sm: 2, md: 4, lg: 8 }}
      >
        {/* Conditionally render based on contentOrder */}
        {contentOrder === 'left' && !isSmallScreen ? (
          <>
            {this.renderInfoBox()}
            <AnimatedInfoImageViewer
              images={Array.isArray(images) ? images : []}
              onReachMiddle={this.handleReachMiddle}
              onStartedScrolling={this.handleStartedScrolling}
              onButtonClick={(index?: number) => {
                if (index !== undefined) 
                {
                    console.log('AnimatedInfoImageViewer index', index);
                    this.setCurrentIndex(index);
                }
              }}
            />
          </>
        ) : (
          <>
            <AnimatedInfoImageViewer
              images={Array.isArray(images) ? images : []}
              onReachMiddle={this.handleReachMiddle}
              onStartedScrolling={this.handleStartedScrolling}
              onButtonClick={(index?: number) => {
                console.log('index', index);
                if (index !== undefined) 
                {
                    console.log('AnimatedInfoImageViewer index', index);
                    this.setCurrentIndex(index);
                }
              }}
            />
            {this.renderInfoBox()}
          </>
        )}
      </Box>
    );
  }
}



import React, { Component } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface ImageCarouselProps {
  imageUrls: string[];
  intervalTime: number; // Time in milliseconds to switch to the next image
  animationDuration: number; // Duration of the slide effect in milliseconds

}

interface ImageCarouselState {
  currentIndex: number;
}

class ImageCarousel extends Component<ImageCarouselProps, ImageCarouselState> {
  intervalId: NodeJS.Timeout | null = null;

  constructor(props: ImageCarouselProps) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
  }

  componentDidMount() {
    this.startAutoSlide();
  }

  componentWillUnmount() {
    this.clearAutoSlide();
  }

  startAutoSlide = () => {
    this.intervalId = setInterval(this.goToNextImage, this.props.intervalTime);
  };

  clearAutoSlide = () => {
    if (this.intervalId) clearInterval(this.intervalId);
  };

  goToNextImage = () => {
    this.setState({  currentIndex: (this.state.currentIndex + 1) % this.props.imageUrls.length });
    this.clearAutoSlide();
    this.startAutoSlide();
  };

  goToPreviousImage = () => {
    this.setState({  currentIndex: (this.state.currentIndex - 1) < 0 ? this.props.imageUrls.length - 1 : this.state.currentIndex - 1 });
    this.clearAutoSlide();
    this.startAutoSlide();
  };

  goToIndex = (index: number) => {
    this.setState({ currentIndex: index });
    this.clearAutoSlide();
    this.startAutoSlide();
  }

  render() {
    const { imageUrls, animationDuration} = this.props;
    const { currentIndex } = this.state;

    return (
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '16px',
          boxShadow: 8,
        }}
      >
        <Box
          sx={{
            
            display: 'flex',
            transition: `transform ${animationDuration}ms ease-in-out` ,
            transform: `translate(${-currentIndex * (100/ imageUrls.length)}%)`,
            width: `${imageUrls.length * 100}%`,
            height: '100%',
            backgroundColor: 'primary.main',
          
          }}
        >
          {imageUrls.map((url, index) => (
            <Box
              key={index}
              component="img"
              src={url}
              sx={{

                width: `${100 / imageUrls.length}%`,
              
                objectFit: 'cover',
              }}
            />
          ))}
        </Box>

        {/* Navigation Buttons */}
        <IconButton
          onClick={this.goToPreviousImage}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '0',
            transform: 'translateY(-50%)',
            backgroundColor: 'background.default',
            zIndex: 1,
            '&:hover': { backgroundColor: 'background.paper' },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <IconButton
          onClick={this.goToNextImage}
          sx={{
            position: 'absolute',
            top: '50%',
            right: '0',
            transform: 'translateY(-50%)',
            backgroundColor: 'background.default',
            zIndex: 1,
            '&:hover': { backgroundColor: 'background.paper' },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
        {/* Navigation Dots */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '18px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
          }}
        >
          {imageUrls.map((_, index) => (
            <Box
              key={index}
              onClick={() => this.goToIndex(index)}
              sx={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: index === currentIndex ? 'action.active' : 'primary.main',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
            />
          ))}
      </Box>
      </Box>
    );
  }
}

export default ImageCarousel;

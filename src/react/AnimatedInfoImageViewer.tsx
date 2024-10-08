import { Box } from '@mui/material';
import React, { createRef } from 'react';
import CircularImageViewer, { CircularImageViewerProps } from './CircularImageViewer';

interface AnimatedInfoImageViewerProps extends CircularImageViewerProps {
  onReachMiddle: () => void;
  onStartedScrolling: () => void;

}

interface AnimatedInfoImageViewerState {
  scale: number;
  hasReachedMiddle: boolean;
}

class AnimatedInfoImageViewer extends React.Component<AnimatedInfoImageViewerProps, AnimatedInfoImageViewerState> {
  private animatedInfoAvatarRef: React.RefObject<HTMLDivElement>;

  constructor(props: AnimatedInfoImageViewerProps) {
    super(props);
    this.state = {
      scale: 0.5, // Initial scale
      hasReachedMiddle: false,
    };

    // Create ref for the avatar element
    this.animatedInfoAvatarRef = createRef<HTMLDivElement>();

    // Bind the handleScroll method
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, true);
  }

  handleScroll() {
    const { onReachMiddle, onStartedScrolling } = this.props;
    const { hasReachedMiddle } = this.state;

    const avatar = this.animatedInfoAvatarRef.current;
    if (!avatar) return;

    const avatarRect = avatar.getBoundingClientRect();
    const viewportMiddle = window.innerHeight / 2;

    // Calculate the distance from the middle of the screen
    const distanceFromMiddle = Math.abs(avatarRect.top + avatarRect.height / 2 - viewportMiddle);

    // If the avatar has passed the middle, set it to full size (scale 1)
    if (avatarRect.top < viewportMiddle) {
      this.setState({ scale: 1 });

      if (!hasReachedMiddle) {
        this.setState({ hasReachedMiddle: true });
        onReachMiddle(); // Notify the parent component
      }
    } else {
      // Scale based on distance from the middle, adjust 500 to control the scaling speed
      const newScale = Math.max(0.5, 1 - distanceFromMiddle / 500);
      this.setState({ scale: newScale });

      if (hasReachedMiddle) {
        this.setState({ hasReachedMiddle: false });
        onStartedScrolling(); // Notify the parent component
      }
    }
  }

  render() {
    const { scale } = this.state;

    return (
      <Box
        ref={this.animatedInfoAvatarRef}
        className="animatedInfoAvatar"
        style={{
          transform: `scale(${scale})`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularImageViewer{...this.props}/>
        </Box>
      </Box>
    );
  }
}

export default AnimatedInfoImageViewer;

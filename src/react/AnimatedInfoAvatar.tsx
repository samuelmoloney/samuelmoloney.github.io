import { Box, Container } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import ProfileImage from './ProfileImage';

interface AnimatedInfoAvatarProps {
    imagePath: string;
    onReachMiddle: () => void;
    onStartedScrolling: () => void;
  }

const AnimatedInfoAvatar: React.FC<AnimatedInfoAvatarProps> = ({onReachMiddle , onStartedScrolling, imagePath}) => {
  const [scale, setScale] = useState(0.5); // Initial scale
  const animatedInfoAvatarRef = useRef<HTMLDivElement>(null);
  const [hasReachedMiddle, setHasReachedMiddle] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const avatar = animatedInfoAvatarRef.current;
     
      if (!avatar) return;

      const avatarRect = avatar.getBoundingClientRect();
      const viewportMiddle = window.innerHeight / 2;

      // Calculate the distance from the middle of the screen
      const distanceFromMiddle = Math.abs(avatarRect.top + avatarRect.height / 2 - viewportMiddle);



      // If the avatar is passed the middle, set it to full size (scale 1)
      if (avatarRect.top < viewportMiddle) {
        setScale(1);

        if (!hasReachedMiddle) {
          setHasReachedMiddle(true);
          onReachMiddle();
        }

      } else {
        // Scale based on distance from the middle, adjust 500 to control the scaling speed
        const newScale = Math.max(0.5, 1 - distanceFromMiddle / 500);
        setScale(newScale);
        if(hasReachedMiddle){
          setHasReachedMiddle(false);
          onStartedScrolling();
        }
      }
    };

    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [hasReachedMiddle, onReachMiddle, onStartedScrolling]);

  return (

      <Box
        ref={animatedInfoAvatarRef}
        className="animatedInfoAvatar"
        style={{
          transform: `scale(${scale})`,
          transition: 'transform 0.3s ease-out', 
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ProfileImage
            src= {imagePath}
            alt="Profile Image"
            sx={{
              width: { xs: '350px', md: '300px' },
              height: { xs: '350px', md: '300px' },
            }}
          />
        </Box>
      </Box>

  );
};

export default AnimatedInfoAvatar;

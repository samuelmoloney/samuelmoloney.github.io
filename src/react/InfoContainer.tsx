import { Box, Typography, useMediaQuery } from '@mui/material';
import AnimatedInfoImageViewer from './AnimatedInfoImageViewer';
import React, { useState } from 'react';

interface InfoContainerProps {
    images?: string[];
    heading?: string;
    subheading?: string;
    description?: string;
    direction?: 'left' | 'right';
}

const InfoContainer: React.FC<InfoContainerProps> = ({
    images,
    heading,
    subheading,
    description,
}) => {
    const [boxVisible, setBoxVisible] = useState(false); // State for box visibility

    // Check if the screen is small
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    // Handle when the avatar reaches the middle (fade in)
    const handleReachMiddle = () => {
        setBoxVisible(true);
    };

    // Handle when scrolling starts (fade out)
    const handleStartedScrolling = () => {
        setBoxVisible(false);
    };

    return (
        <Box
            className='info-container'
            display={'flex'}
            flexDirection={{ xs: 'column', sm: 'column', md: 'row' }}
            alignItems={{ xs: 'center', sm: 'center', md: 'flex-start' }}
            justifyContent={'center'}
            position={'relative'}
            margin={{ xs: 1, sm: 2, md: 4, lg: 8 }} // Responsive margins
        >
            <AnimatedInfoImageViewer
                images={
                    images || [
                        'https://picsum.photos/id/1/400/600',
                        'https://picsum.photos/id/2/400/600',
                        'https://picsum.photos/id/3/400/600',
                        'https://picsum.photos/id/4/400/600',
                    ]
                }
                onReachMiddle={handleReachMiddle}
                onStartedScrolling={handleStartedScrolling}
            />
            <Box
                sx={{
                    width: isSmallScreen ? '100%' : (boxVisible ? '100%' : '0%'), 
                    height: isSmallScreen ? (boxVisible ? 'auto' : '0%') : '800px', // Set height based on screen size
                    borderRadius: 4,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(5px)',
                    boxShadow: 8,


                    opacity: boxVisible ? 1 : 0, // Fade in (1) or fade out (0)
                    transition: 'width 0.8s ease-in-out, height 0.8s ease-in-out, opacity 0.8s ease-in-out', // Smooth transition for width and opacity
                    overflow: 'hidden', // Prevent content overflow during transition
                }}
            >
                {/* Text */}
                <Box sx={{ padding: 2 , whiteSpace: 'pre-wrap' }}>
                    <Typography
                        variant="h2"
                        color="text.primary"
                        justifyContent="left"
                        sx={{
                            padding: { sm: 1, md: 2 },
                            whiteSpace: 'pre-line',
                        }}
                    >
                        {heading || 'Heading'}
                    </Typography>
                    <Typography
                        variant="h4"
                        color="text.primary"
                        sx={
                          {whiteSpace: 'pre-line',
                            padding: { sm: 1, md: 2 },
                            
                        }}
                    >
                        {subheading || 'Subheading'}
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.primary"
                        sx={{
                            whiteSpace: 'pre-line',
                            padding: { sm: 1, md: 2 },
                        }}
                    >
                        {description || 'Description'}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default InfoContainer;

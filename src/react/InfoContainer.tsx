import { Box, Typography, useMediaQuery } from '@mui/material';
import AnimatedInfoImageViewer from './AnimatedInfoImageViewer';
import React, { useState, useEffect } from 'react';

export interface InfoContainerProps {
    images?: string[];
    heading?: string;
    subheading?: string;
    description?: string;
    contentOrder?: 'left' | 'right';  // Added contentOrder prop
}

const InfoContainer: React.FC<InfoContainerProps> = ({
    images,
    heading,
    subheading,
    description,
    contentOrder = 'right', // Default to 'left'
}) => {
    const [boxVisible, setBoxVisible] = useState(false);
    const [textVisible, setTextVisible] = useState(false);

    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const handleReachMiddle = () => {
        setBoxVisible(true);
    };

    const handleStartedScrolling = () => {
        setBoxVisible(false);
        setTextVisible(false);
    };

    useEffect(() => {
        if (boxVisible) {
            const timer = setTimeout(() => {
                setTextVisible(true);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [boxVisible]);

    // Function to render the Box with the text
    const renderInfoBox = () => (
        <Box
            sx={{
                width: isSmallScreen ? '100%' : (boxVisible ? '100%' : '0%'),
                height: isSmallScreen ? (boxVisible ? 'auto' : '0%') : '800px',
                borderRadius: 4,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(5px)',
                boxShadow: 8,
                opacity: boxVisible ? 1 : 0,
                transition: 'width 0.8s ease-in-out, height 0.8s ease-in-out, opacity 0.8s ease-in-out',
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
                    transition: 'opacity 0.5s ease-in-out',
                }}
            >
                <Typography
                    variant="h2"
                    color="text.primary"
                    sx={{ padding: { sm: 1, md: 2 }, whiteSpace: 'pre-line' }}
                >
                    {heading || 'Heading'}
                </Typography>
                <Typography
                    variant="h4"
                    color="text.primary"
                    sx={{ padding: { sm: 1, md: 2 }, whiteSpace: 'pre-line' }}
                >
                    {subheading || 'Subheading'}
                </Typography>
                <Typography
                    variant="body1"
                    color="text.primary"
                    sx={{ padding: { sm: 1, md: 2 }, whiteSpace: 'pre-line' }}
                >
                    {description || 'Description'}
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Box
            className='info-container'
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
                    {renderInfoBox()}
                    <AnimatedInfoImageViewer
                        images={Array.isArray(images) ? images : []}
                        onReachMiddle={handleReachMiddle}
                        onStartedScrolling={handleStartedScrolling}
                    />
                </>
            ) : (
                <>
                    <AnimatedInfoImageViewer
                        images={Array.isArray(images) ? images : []}
                        onReachMiddle={handleReachMiddle}
                        onStartedScrolling={handleStartedScrolling}
                    />
                    {renderInfoBox()}
                </>
            )}
        </Box>
    );
};

export default InfoContainer;

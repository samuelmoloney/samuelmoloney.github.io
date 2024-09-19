import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import Spacer from "./Spacer";

export function Contact(): JSX.Element {
    return (
        <Box 
            padding={1} 
            margin={1} 
            sx={{
                display: 'inline-block',  // Shrink to fit content
                borderRadius: 4,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(5px)',
                boxShadow: 8,
                textAlign: 'center',  // Center the text inside the box
            }}
        >
            <Spacer />
            <Typography variant="h4" color="text.primary">Like what you see?</Typography>
            <Typography variant="h4" color="text.primary">Let's have a chat</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Spacer />
                <ButtonGroup aria-label="Contact Buttons">
                    <Button 
                        href="https://github.com/samuelmoloney" 
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ color: 'text.primary' }} 
                    >
                        Github <GitHubIcon sx={{ paddingLeft: "8px" }} />
                    </Button>
                    <Button 
                        href="https://linkedin.sammoloney.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        sx={{ color: 'text.primary' }}
                    >
                        Linkedin <LinkedInIcon sx={{ paddingLeft: "8px" }} />
                    </Button>
                    <Button 
                        href="mailto:contact@sammoloney.com"
                        sx={{ color: 'text.primary' }} 
                    >
                        Email <EmailIcon sx={{ paddingLeft: "8px" }} />
                    </Button>
                </ButtonGroup>
            </Box>
        </Box>
    );
}

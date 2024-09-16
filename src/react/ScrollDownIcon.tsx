import React from 'react';
import { ArrowDownward } from '@mui/icons-material';
import { styled } from '@mui/system';

const ScrollIcon = styled(ArrowDownward)(({ theme }) => ({
  fontSize: '50px',
  color: 'wheat',
  animation: 'bounce 2s infinite',
  cursor: 'pointer',
  '@keyframes bounce': {
    '0%, 20%, 50%, 80%, 100%': {
      transform: 'translateY(0)',
    },
    '40%': {
      transform: 'translateY(10px)',
    },
    '60%': {
      transform: 'translateY(5px)',
    },
  },
}));

const ScrollDownIcon = ({ scrollToSection }: { scrollToSection: () => void }) => {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <ScrollIcon onClick={scrollToSection} />
      </div>
    );
  };
export default ScrollDownIcon;
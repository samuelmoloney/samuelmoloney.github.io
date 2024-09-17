import React, { useEffect, useState, useRef } from 'react';
import { ArrowDownward } from '@mui/icons-material';
import { styled } from '@mui/system';

const ScrollIcon = styled(ArrowDownward)(({ theme }) => ({
  fontSize: '100px',
  color: theme.palette.text.primary,
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

const ScrollDownIcon = ({
  scrollToSection,
  parentRef,
}: {
  scrollToSection: () => void;
  parentRef: React.RefObject<HTMLDivElement>;
}) => {
  const [top, setTop] = useState<number | null>(0);

  const reference = useRef<HTMLDivElement>(null);

  useEffect(() => {

    // Function to calculate the initial position and handle scroll updates
    const handleScrollAndPosition = () => {
      if (reference.current === null || parentRef.current === null) return;
      const parentRect = parentRef.current.getBoundingClientRect();
      const rect = reference.current.getBoundingClientRect();

      // Calculate the amount of the parent element scrolled past
      const distanceScrolledPastParent = window.innerHeight - parentRect.top;
      const scalerToTop = distanceScrolledPastParent / window.innerHeight - 1;
      const scaler = Math.min(1, Math.max(0, scalerToTop));

      const start = 0; 
      const end = parentRect.height - rect.height; 

      const newTop = start + (end - start) * scaler; 
      setTop(newTop);
    };

    window.addEventListener('scroll', handleScrollAndPosition, true);
    return () => {
      window.removeEventListener('scroll', handleScrollAndPosition, true);
    };
  }, [parentRef]);


  return (
    <div
      ref={reference}
      style={{
        transform: `translateY(${top}px)`,
        textAlign: 'center',
      }}
    >
      <ScrollIcon onClick={scrollToSection} />
    </div>
  );
};

export default ScrollDownIcon;

import React from 'react';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/system';

const CircularAvatar = styled(Avatar)({
  width: '300px',   
  height: '300px',  
  borderRadius: '50%',
  border: '8px solid #ECDFCC',  
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', 
});

const ProfileImage = ({ src, alt }) => {
  return <CircularAvatar alt={alt} src={src} />;
};

export default ProfileImage;
import React from 'react';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/system';

const CircularAvatar = styled(Avatar)({
  border: '8px solid #ECDFCC',  
  boxShadow: '0px 4px 18px rgba(0, 0, 0, 0.3)', 
});

const ProfileImage = ({ src, alt, sx }) => {
  return <CircularAvatar alt={alt} src={src} sx={sx} />;
};

export default ProfileImage;
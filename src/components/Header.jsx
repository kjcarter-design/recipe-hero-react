import React from 'react';
import { Typography, Box, IconButton } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if(location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate(-1);
    }
  };

  return (
    <Box 
      sx={{ 
        position: 'static', 
        margin: 0,
        padding: 0,
        width: '100%', 
        height: '5%',
        backgroundColor: '#fff', 
        zIndex: (theme) => theme.zIndex.drawer + 1 
      }}
    >
      <Box sx={{ margin: '2rem', position: 'absolute', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      {location.pathname !== '/' && (
      <IconButton edge='start' color='inherit' aria-label='back' onClick={handleBack}>
        <ArrowBackIos />
          </IconButton>
            )}
      </Box>
      <Typography 
        variant="h3" 
        sx={{ 
          textAlign: 'center', 
          fontFamily: 'GillSansW04-BoldCondensed', 
          color: 'rgb(54, 145, 161)', 
          padding: '10px 0' 
        }}
      >
        Recipe Hero
      </Typography>
    </Box>
  );
}

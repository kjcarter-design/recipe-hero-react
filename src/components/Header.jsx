import React from 'react';
import { Typography, Box } from '@mui/material';

export default function Header() {
  return (
    <Box 
      sx={{ 
        position: 'relative', 
        margin: 0,
        padding: 0,
        width: '100%', 
        backgroundColor: '#fff', 
        zIndex: (theme) => theme.zIndex.drawer + 1 
      }}
    >
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

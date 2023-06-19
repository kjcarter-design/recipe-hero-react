import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, Tab, Tabs, Box, Typography } from '@mui/material';

export default function StartCooking({ instructions }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Start Cooking
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Start Cooking</DialogTitle>
        <DialogContent>
          <Tabs value={value} onChange={handleChange}>
            {instructions.map((instruction, index) => (
              <Tab label={`Step ${index + 1}`} key={index} />
            ))}
          </Tabs>
          {instructions.map((instruction, index) => (
            value === index && (
              <Box p={3}>
                <Typography>{instruction.display_text}</Typography>
              </Box>
            )
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
}

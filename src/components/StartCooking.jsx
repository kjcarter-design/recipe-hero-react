import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, Step, Stepper, StepLabel, Box, Typography } from '@mui/material';

export default function StartCooking({ instructions }) {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Start Cooking
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Start Cooking</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} orientation="vertical">
            {instructions.map((instruction, index) => (
              <Step key={index}>
                <StepLabel>Step {index + 1}</StepLabel>
                <Typography>{instruction.display_text}</Typography>
              </Step>
            ))}
          </Stepper>
          <Box>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" onClick={handleNext}>
              {activeStep === instructions.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export default function Instructions({ instructions }) {
  return (
    <Card>
      <CardContent>
        <Typography variant='h4'>Instructions</Typography>
        <ol>
          {instructions.map((instruction, index) => (
            <li key={index}>{instruction.display_text}</li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export default function Ingredients({ ingredients }) {
  return (
    <Card>
      <CardContent>
        <Typography variant='h4'>Ingredients</Typography>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

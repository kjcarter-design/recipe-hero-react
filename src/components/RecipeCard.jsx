import { Card, CardContent, CardMedia, Typography, Skeleton } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RecipeCard({ recipe, loading }) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <Card sx={{height: '20em'}}>
        <Skeleton variant="rectangular" width="100%" height={140} />
        <CardContent>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card onClick={() => navigate(`/recipe/${recipe.id}`, {
      replace: false,
      state: {recipeId: recipe.id}
    })} sx={{height: '20em'}}>
      <CardMedia
        component='img'
        height='140'
        image={recipe.thumbnail_url} 
        alt={recipe.name} 
      />
      <CardContent>
        <Typography variant='h5' component='div'>
          {recipe.name} 
        </Typography>
        <Typography variant='subtitle1' color='text.secondary'>
          Source: {recipe.show.name} 
        </Typography>
        <Typography variant='body2'>
          Calories: {recipe.nutrition.calories} 
        </Typography>
        <Typography variant='body2'>
          Total Time: {recipe.total_time_minutes} minutes 
        </Typography>
        <Typography variant='body2'>
          Ingredients:
          <ul>
            {recipe.sections[0].components.map((component, index) => (
              <li key={index}>{component.raw_text}</li> 
            ))}
          </ul>
        </Typography>
      </CardContent>
    </Card>
  );
}

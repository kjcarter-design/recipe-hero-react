import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';

export default function Recipe() {
	const { id } = useParams();
	const { state } = useContext(RecipeContext);
	const recipe = state.recipes.find((recipe) => recipe.id === Number(id));
  const ingredients = recipe.sections.flatMap(section => 
    section.components.map(component => component.raw_text)
  );
  
	console.log(state?.recipes);
	console.log(recipe);

	if (!recipe) {
		return <Typography variant='h4'>Recipe not found</Typography>;
	}

	return (
		<Container>
			<Typography variant='h2'>{recipe.name}</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<img
						src={recipe.thumbnail_url}
						alt={recipe.name}
						style={{ width: '100%' }}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<Card>
						<CardContent>
							<Typography variant='h4'>Ingredients</Typography>
							<ul>
								{ingredients.map((ingredient, index) => (
									<li key={index}>{ingredient}</li>
								))}
							</ul>
							<Typography variant='h4'>Instructions</Typography>
							<ol>
								{recipe.instructions.map((instruction, index) => (
									<li key={index}>{instruction.display_text}</li>
								))}
							</ol>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Container>
	);
}

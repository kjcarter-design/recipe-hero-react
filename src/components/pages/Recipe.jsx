import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Grid, Box } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import Ingredients from '../Ingredients';
import Instructions from '../Instructions';
import StartCooking from '../StartCooking';
import { RecipeContext } from '../context/RecipeContext';

export default function Recipe() {
	const { id } = useParams();
	const { state } = useContext(RecipeContext);
	const recipe = state.recipes.find((recipe) => recipe.id === Number(id));
	const ingredients = recipe.sections.flatMap((section) =>
		section.components.map((component) => component.raw_text)
	);
	const isMobile = useMediaQuery('(max-width:600px)');
	if (!recipe) {
		return <Typography variant='h4'>Recipe not found</Typography>;
	}

	return (
		<Box
			sx={{
				position: 'relative',
				height: isMobile ? '90vh' : '80vh',
				width: '100%',
				margin: 0,
				padding: 0,
			}}
		>
			<Box
				sx={{
					position: 'relative',
					height: isMobile ? '20vh' : '40vh',
					width: '100%',
					backgroundImage: `url(${recipe.thumbnail_url})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<Box
					sx={{
						position: 'absolute',
						top: 0,
						bottom: 0,
						left: 0,
						right: 0,
						backgroundImage:
							'linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0))',
					}}
				/>
			</Box>
			<Box sx={{ margin: '0rem', padding: '0rem' }}>
				<Box sx={{ width: '100vw', height: 'auto' }}>
					<Grid
						container
						spacing={1}
						sx={{ display: 'flex', alignItems: 'center', padding: '4rem' }}
					>
						<Grid item xs={12} md={4.5}>
							<Typography variant={isMobile ? 'h4' : 'h2'}>{recipe.name}</Typography>
						</Grid>
						<Grid item xs={12} md={2}>
							<StartCooking instructions={recipe.instructions} />
						</Grid>
						<Grid item xs={12} md={5} textAlign={isMobile ? 'left' : 'right'}>
							<Typography variant='body2'>
								Cook Time: {recipe.cook_time_minutes} minutes
							</Typography>
						</Grid>
						<Grid item xs={12} md={5}>
							<Typography variant='subtitle1'>{recipe.description}</Typography>
						</Grid>
					</Grid>
				</Box>
				<Grid container spacing={1} sx={{ display: 'flex' }}>
					<Grid item xs={12} md={6}>
						<Ingredients ingredients={ingredients}/>
					</Grid>
					<Grid item xs={12} md={6}>
						<Instructions instructions={recipe.instructions} />
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}

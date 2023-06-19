import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';
import {
	Container,
	Typography,
	Card,
	CardContent,
	Grid,
	Box,
	Paper,
} from '@mui/material';
import { useMediaQuery } from '@mui/material';

export default function Ingredients() {
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
				height: isMobile ? '20vh' : '80vh',
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
			<Box sx={{ margin: '2rem', padding: '1rem'}}>
					<Typography variant='h2'>{recipe.name}</Typography>
					<Grid container spacing={1} sx={{display:'flex'}}>
						<Grid item xs={12} md={4}>
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
							<Card>
								<CardContent>
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
			</Box>
		</Box>
	);
}

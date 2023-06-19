import React, { useState } from 'react';
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	Button,
	CardActions,
	Skeleton,
	Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ClampLines from 'react-clamp-lines';

export default function RecipeCard({ recipe, loading, active }) {
	const navigate = useNavigate();
	const [showIngredients, setShowIngredients] = useState(false);

	const handleCardClick = () => {
		navigate(`/recipe/${recipe.id}`, {
			replace: false,
			state: { recipeId: recipe.id },
		});
	};

	const handleButtonClick = (event) => {
		event.stopPropagation();
		setShowIngredients(!showIngredients);
	};

	const cardContent = loading ? (
		<Skeleton variant='rectangular' width='100%' height={140} />
	) : showIngredients ? (
		<CardContent
			sx={{
				flexGrow: 1,
				height: '6rem',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
				position: 'relative',
			}}
		>
			<Typography variant='body2'>
				Ingredients:
				<ul>
					{recipe.sections[0].components.map((component, index) => (
						<li key={index}>{component.raw_text}</li>
					))}
				</ul>
			</Typography>
			<Box
				sx={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					backgroundImage:
						'linear-gradient(to top, rgba(255,255,255,0), rgba(255,255,255,1))',
				}}
			/>
		</CardContent>
	) : (
		<CardContent
			sx={{
				flexGrow: 1,
				height: '6rem',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
				position: 'relative',
			}}
		>
			<ClampLines
				text={recipe.description}
				id='really-unique-id'
				lines={3}
				ellipsis=' ...See more'
				buttons={false}
				innerElement='p'
			/>

			<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
				<Typography variant='body2'>
					Cook Time: {recipe.cook_time_minutes} minutes
				</Typography>
			</Box>
			<Box
				sx={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					backgroundImage:
						'linear-gradient(to top, rgba(255,255,255,0), rgba(255,255,255,1))',
				}}
			/>
		</CardContent>
	);

	return (
		<Card
			onClick={active ? handleCardClick : null}
			sx={{
				height: { xs: '50vh', sm: '20em' },
				marginBottom: '1em',
				display: 'flex',
				flexDirection: 'column',
				opacity: active ? 1 : 0.5,
			}}
		>
			<Box sx={{ position: 'relative' }}>
				<Box sx={{ position: 'relative', flexGrow: 1 }}>
					<CardMedia
						component='img'
						height={active ? '180' : '100%'}
						image={recipe.thumbnail_url}
						alt={recipe.name}
					/>
					<Box
						sx={{
							position: 'absolute',
							bottom: 0,
							left: 0,
							right: 0,
							backgroundImage:
								'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))',
							padding: '5px',
						}}
					>
						<Typography
							variant='h5'
							component='div'
							sx={{
								color: '#fff',
                fontWeight: 'bold',
                position: 'relative',
                margin: '1rem'
							}}
						>
							{recipe.name}
						</Typography>
						<Typography variant='subtitle1' color='whitesmoke'>
							Source: {recipe.show.name}
						</Typography>
					</Box>
				</Box>
			</Box>
			{active && cardContent}
			{active && (
				<CardActions sx={{ mt: 'auto', marginBottom: '.5rem' }}>
					<Button size='small' onClick={handleButtonClick}>
						{showIngredients ? 'Description' : 'Ingredients'}
					</Button>
				</CardActions>
			)}
		</Card>
	);
}
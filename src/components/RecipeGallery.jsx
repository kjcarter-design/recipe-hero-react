import React, { useState } from 'react';
import {
	Grid,
	Paper,
	Button,
	useMediaQuery,
	useTheme,
	IconButton,
	Box,
} from '@mui/material';
import RecipeCard from './RecipeCard';
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';

export default function RecipeGallery({ recipes }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const handleNext = () => {
		setCurrentIndex((currentIndex + 1) % recipes.length);
	};

	const handlePrevious = () => {
		setCurrentIndex((currentIndex - 1 + recipes.length) % recipes.length);
	};

	return (
		<Grid container spacing={2} alignItems='center' justifyContent='center'>
			{!isMobile && (
				<Grid item xs={3}>
					<RecipeCard
						recipe={recipes[(currentIndex - 1 + recipes.length) % recipes.length]}
						active={false}
					/>
				</Grid>
			)}
			<Grid item xs={1}>
				<Box display='flex' justifyContent='center'>
					<IconButton onClick={handlePrevious}>
						<ArrowBackIos />
					</IconButton>
				</Box>
			</Grid>
			<Grid item xs={isMobile ? 10 : 4}>
				<Paper elevation={3}>
					<RecipeCard recipe={recipes[currentIndex]} active={true} />
				</Paper>
			</Grid>
			<Grid item xs={1}>
				<Box display='flex' justifyContent='center'>
					<IconButton onClick={handleNext}>
						<ArrowForwardIos />
					</IconButton>
				</Box>
			</Grid>
			{!isMobile && (
				<Grid item xs={3}>
					<RecipeCard
						recipe={recipes[(currentIndex + 1) % recipes.length]}
						active={false}
					/>
				</Grid>
			)}
		</Grid>
	);
}
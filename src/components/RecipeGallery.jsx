import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import RecipeCard from './RecipeCard';
import Slider from 'react-slick';
import { Box } from '@mui/material';

export default function RecipeGallery({ recipes }) {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	return (
		<Box p={2}>
		<Slider {...settings}>
			{recipes.map((recipe, index) => (
				<Box key={index} mb={2}>
					<RecipeCard recipe={recipe} />
				</Box>
			))}
		</Slider>
	</Box>
	);
}

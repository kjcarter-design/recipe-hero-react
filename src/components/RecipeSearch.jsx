import React, { useContext, useEffect, useState } from 'react';
import {
	Container,
	Typography,
	TextField,
	Autocomplete,
	useMediaQuery,
	useTheme,
	Chip,
	Grid,
} from '@mui/material';

import axios from 'axios';
import { FOOD_DB_API_KEY, FOOD_DB_APP_ID } from '../constants';
import { RecipeContext } from './context/RecipeContext';

export default function RecipeSearch() {
	const { dispatch, ingredients, setIngredients } =
		useContext(RecipeContext);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const [options, setOptions] = useState([]);
	const [inputValue, setInputValue] = useState('');

	const searchIngredient = async (query) => {
		try {
			const response = await axios.get(
				`https://api.edamam.com/api/food-database/v2/parser?ingr=${query}&app_id=${FOOD_DB_APP_ID}&app_key=${FOOD_DB_API_KEY}`
			);
			const uniqueFoods = response.data.hints.reduce((unique, hint) => {
				if (unique.findIndex((food) => food.label === hint.food.label) === -1) {
					unique.push(hint.food);
				}
				return unique;
			}, []);
			return uniqueFoods.map((food, index) => {
				food.label = `${food.label}`;
				return food;
			});
		} catch (error) {
			console.error('Failed to fetch ingredients', error);
		}
		return [];
	};

	useEffect(() => {
		if (inputValue) {
			searchIngredient(inputValue).then(setOptions);
		} else {
			setOptions([]);
		}
	}, [inputValue]);

	const removeIngredient = (ingredientToRemove) => {
		const newIngredients = ingredients.filter(
			(ingredient) => ingredient !== ingredientToRemove
		);
		setIngredients(newIngredients);
		localStorage.setItem('ingredients', JSON.stringify(newIngredients));
		dispatch({
			type: 'SET_INGREDIENTS',
			payload: newIngredients.map((ingredient) => ingredient.label),
		});
	};

	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Typography component={'h1'} variant='h5'>
				Search Recipes by Ingredient
			</Typography>

			<Grid
				container
				spacing={1}
				sx={{ width: { xs: '100%', sm: '500px' } }}
				margin={1}
			>
				<Grid item xs={10}>
					<Autocomplete
						multiple
						id='tags-standard'
						options={options}
						getOptionLabel={(option) => option.label}
						isOptionEqualToValue={(option, value) =>
							value && typeof value === 'object' && value.foodId
								? option.foodId === value.foodId
								: false
						}
						filterSelectedOptions
						onInputChange={(event, value) => setInputValue(value)}
						onChange={(event, value) => {
							setIngredients(value);
							dispatch({
								type: 'SET_INGREDIENTS',
								payload: value.map((ingredient) => ingredient.label),
							});
						}}
						value={ingredients}
						renderTags={() => null}
						renderInput={(params) => (
							<TextField
								{...params}
								variant='standard'
								label='Ingredients'
								placeholder='ex: Apple...'
							/>
						)}
					/>
				</Grid>
			</Grid>
			{!isMobile && (
				<Container sx={{ margin: 2, width: '30em' }}>
					{ingredients.map((ingredient, index) => (
						<Chip
							key={index}
							label={ingredient.label}
							onDelete={() => removeIngredient(ingredient)}
						/>
					))}
				</Container>
			)}
		</Container>
	);
}

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
	IconButton,
} from '@mui/material';

import axios from 'axios';
import { FOOD_DB_API_KEY, FOOD_DB_APP_ID } from '../constants';
import { RecipeContext } from './context/RecipeContext';
import { Search } from '@mui/icons-material';

export default function RecipeSearch() {
	const { state, dispatch, ingredients, setIngredients } =
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

	const handleSearch = (event, value) => {
		event.preventDefault();
		setIngredients(value);
		localStorage.setItem('ingredients', JSON.stringify(value));
	};

	const handleSearchClick = () => {
		dispatch({
			type: 'SET_INGREDIENTS',
			payload: ingredients.map((ingredient) => ingredient.label),
		});
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

			<Grid container spacing={1} sx={{ width: { xs: '100%', sm: '500px' } }} margin={1}>
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
						onChange={handleSearch}
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
				<Grid item xs={2} sx={{
							display: 'flex',
							justifyContent: 'start',
              alignItems: 'end',
						}}>
						<IconButton color='primary' onClick={handleSearchClick}>
							<Search />
						</IconButton>
				</Grid>
			</Grid>
			{!isMobile && (
        <Container sx={{ margin: 2, width: '30em' }}>
          <Typography>
            Ingredients:
          </Typography>
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

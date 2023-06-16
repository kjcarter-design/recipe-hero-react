import React, { useContext, useEffect, useState } from 'react';

import {
	Container,
	Typography,
	TextField,
	Autocomplete,
	Stack,
} from '@mui/material';
import axios from 'axios';
import { FOOD_DB_API_KEY, FOOD_DB_APP_ID } from '../constants';
import { RecipeContext } from './context/RecipeContext';
import useFetchRecipes from '../hooks/useFetchRecipes';

export default function RecipeSearch() {
  const { state, dispatch } = useContext(RecipeContext);
  const [ingredients, setIngredients] = useState([]);
  const {recipes } = useFetchRecipes(ingredients);

  useEffect(() => {
    if (recipes && recipes.length > 0) {
      dispatch({ type: 'SET_RECIPES', payload: recipes });
    }
  }, [recipes, dispatch]);
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

	const handleSearch = (event, value) => {
    event.preventDefault();
    let newIngredients = value.map((v) => v.label);
    setIngredients(newIngredients);
    dispatch({ type: 'SET_INGREDIENTS', payload: newIngredients });
  };

	useEffect(() => {
		console.log(state.ingredients);
	}, [state.ingredients]);

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
			<Stack spacing={3} sx={{ width: 500 }}>
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
					renderInput={(params) => (
						<TextField
							{...params}
							variant='standard'
							label='Ingredients'
							placeholder='Add ingredients'
						/>
					)}
				/>
			</Stack>
		</Container>
	);
}

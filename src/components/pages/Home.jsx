import { useContext, useEffect, useState } from 'react';
import RecipeGallery from '../RecipeGallery';
import RecipeSearch from '../RecipeSearch';
import useFetchRecipes from '../../hooks/useFetchRecipes';
import { RecipeContext } from '../context/RecipeContext';
import {
	Box,
	SpeedDial,
	SpeedDialAction,
	SpeedDialIcon,
	useMediaQuery,
} from '@mui/material';
import IngredientDrawer from '../IngredientDrawer';

export default function Home() {
	const isMobile = useMediaQuery('(max-width:600px)');
	const { state, dispatch } = useContext(RecipeContext);
	const { isLoading, error } = useFetchRecipes(state.ingredients);
	const { recipes } = state;
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [speedDialOpen, setSpeedDialOpen] = useState(false);
	const [ingredients, setIngredients] = useState(
		JSON.parse(localStorage.getItem('ingredients')) || []
	);

	useEffect(() => {
		localStorage.setItem('ingredients', JSON.stringify(ingredients));
	}, [ingredients]);

	useEffect(() => {
		if (state.ingredients.length > 0) {
			dispatch({ type: 'SET_RECIPES', payload: [] });
		}
	}, [state.ingredients, dispatch]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	const handleOpenDrawer = () => {
		setDrawerOpen(true);
	};

	const handleCloseDrawer = () => {
		setDrawerOpen(false);
	};

	const handleOpenSpeedDial = () => {
		setSpeedDialOpen(true);
	};

	const handleCloseSpeedDial = () => {
		setSpeedDialOpen(false);
	};

	const actions = [
		{
			icon: <SpeedDialIcon />,
			name: 'View Selected Ingredients',
			action: handleOpenDrawer,
		},
	];

	const removeIngredient = (ingredient) => {
		const newIngredients = ingredients.filter((ing) => ing !== ingredient);
		setIngredients(newIngredients);
	};
	return (
		<Box sx={{ 
			width: '100vw', 
			height: '100vh', 
			padding: 0, 
			margin: 0,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center'
		}}>
			{!isMobile && (
				<RecipeSearch
					ingredients={ingredients}
					setIngredients={setIngredients}
				/>
			)}
			{recipes.length > 0 && (
				<RecipeGallery recipes={recipes} loading={isLoading} isMobile={isMobile} />
			)}
			{isMobile && (
				<SpeedDial
					ariaLabel='SpeedDial'
					sx={{ position: 'fixed', bottom: 16, right: 16 }}
					icon={<SpeedDialIcon />}
					onClose={handleCloseSpeedDial}
					onOpen={handleOpenSpeedDial}
					open={speedDialOpen}
				>
					{actions.map((action) => (
						<SpeedDialAction
							key={action.name}
							icon={action.icon}
							tooltipTitle={action.name}
							onClick={action.action}
						/>
					))}
				</SpeedDial>
			)}
			<IngredientDrawer
				open={drawerOpen}
				onClose={handleCloseDrawer}
				ingredients={ingredients}
				removeIngredient={removeIngredient}
				isMobile={isMobile}
				setIngredients={setIngredients}
			/>
		</Box>
	);
}
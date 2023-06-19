import { Drawer, List, ListItem, Chip } from '@mui/material';
import RecipeSearch from './RecipeSearch';
import { useContext, useEffect } from 'react';
import { RecipeContext } from './context/RecipeContext';

export default function IngredientDrawer({ open, onClose, isMobile }) {
  const { dispatch, ingredients, setIngredients } = useContext(RecipeContext);


  useEffect(() => {console.log(ingredients)}, [ingredients])

  const removeIngredient = (ingredientToRemove) => {
    const newIngredients = ingredients.filter(ingredient => ingredient !== ingredientToRemove);
    setIngredients(newIngredients);
    localStorage.setItem('ingredients', JSON.stringify(newIngredients));
    dispatch({
      type: 'SET_INGREDIENTS',
      payload: newIngredients.map((ingredient) => ingredient.label),
    });
  };
  
  
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      {isMobile && <RecipeSearch />}
      <List>
        {ingredients.map((ingredient, index) => (
          <ListItem key={index}>
            <Chip
              label={ingredient.label}
              onDelete={() => removeIngredient(ingredient)}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

import { useContext, useEffect } from 'react';
import RecipeGallery from '../RecipeGallery';
import RecipeSearch from '../RecipeSearch';
import useFetchRecipes from '../../hooks/useFetchRecipes';
import { RecipeContext } from '../context/RecipeContext';

export default function Home() {
  const { state, dispatch } = useContext(RecipeContext);
  const { isLoading, error } = useFetchRecipes(state.ingredients);
  const { recipes } = state;
  
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

  return (
    <>
      <RecipeSearch />
      {recipes.length > 0 && <RecipeGallery recipes={recipes} loading={isLoading} />
}
    </>
  )
}

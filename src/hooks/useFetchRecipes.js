import{ useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { RECIPE_SEARCH_API_KEY } from '../constants';
import { RecipeContext } from './../components/context/RecipeContext';

export default function useFetchRecipes(ingredients) {
  const { dispatch } = useContext(RecipeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      try {
        const responses = await Promise.all(
          ingredients.map((ingredient) =>
            axios.get('https://tasty.p.rapidapi.com/recipes/list', {
              params: { q: ingredient, from: '0', sizes: '20' },
              headers: {
                'x-rapidapi-host': 'tasty.p.rapidapi.com',
                'x-rapidapi-key': RECIPE_SEARCH_API_KEY
              },
            })
          )
        );

        const allRecipes = responses.flatMap((response) =>
          response.data.results
        );

        const filteredRecipes = allRecipes.filter((recipe) =>
          ingredients.every((ingredient) =>
            recipe.sections.some((section) =>
              section.components.some((component) =>
                component.raw_text.toLowerCase().includes(ingredient.toLowerCase())
              )
            )
          )
        );

        console.log('Dispatching recipes:', filteredRecipes);
        dispatch({ type: 'SET_RECIPES', payload: filteredRecipes });
        
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (ingredients?.length > 0) {
      fetchRecipes();
    }
  }, [ingredients, dispatch]);

  return { isLoading, error };
}

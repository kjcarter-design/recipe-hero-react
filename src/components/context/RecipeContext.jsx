import { createContext, useEffect, useReducer, useState } from 'react';

export const RecipeContext = createContext();

const initialState = {
  recipes: [],
  ingredients: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_RECIPES':
      return { ...state, recipes: action.payload };
    case 'SET_INGREDIENTS':
      return { ...state, ingredients: action.payload };
    default:
      return state;
  }
}

export const RecipeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [ingredients, setIngredients] = useState(
    JSON.parse(localStorage.getItem('ingredients')) || []
  );

  useEffect(() => {
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
  }, [ingredients]);

  return (
    <RecipeContext.Provider value={{ state, dispatch, ingredients, setIngredients }}>
      {children}
    </RecipeContext.Provider>
  );
};

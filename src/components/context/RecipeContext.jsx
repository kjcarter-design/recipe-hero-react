import React, { createContext, useReducer, useContext } from 'react';

export const RecipeContext = createContext();

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_INGREDIENTS':
            return {...state, ingredients: action.payload};
        case 'SET_RECIPES':
            return {...state, recipes: action.payload};
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
};

export const RecipeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, { recipes: [], ingredients: [] });
    return (
        <RecipeContext.Provider value={{ state, dispatch }}>
            {children}
        </RecipeContext.Provider>
    );
};

export const useRecipes = () => useContext(RecipeContext);

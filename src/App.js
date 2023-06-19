import './App.css';
import React from 'react';
import Header from './components/Header';
import { RecipeProvider } from './components/context/RecipeContext';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './components/pages/AppRoutes';
import { Box } from '@mui/material';

export default function App() {
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
			<Header />
			<RecipeProvider>
				<Router>
					<AppRoutes />
				</Router>
			</RecipeProvider>
		</Box>
	);
};

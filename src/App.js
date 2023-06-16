import './App.css';
import Header from './components/Header';
import { RecipeProvider } from './components/context/RecipeContext';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './components/pages/AppRoutes';
import { Container, Paper } from '@mui/material';
import styled from '@emotion/styled';

const FullScreenContainer = styled(Container)({
  width: '100vw',
  height: '100vh',
  padding: 0,
  margin: 0,
});

export default function App() {
	return (
		<FullScreenContainer>
					<Header />
			<RecipeProvider>
				<Router>
					<AppRoutes />
				</Router>
			</RecipeProvider>
		</FullScreenContainer>
	);
};


import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FinalPage from './pages/FinalPage';
import Questions from './pages/Questions';
import StartPage from './pages/StartPage';

function App() {
	return (
		<Router>

    <Container maxWidth='sm'>
    <Box textAlign='center' mt={5}>
		
			<Routes>
				<Route exact path='/' element={<StartPage />} />

				<Route path='/questions' element={<Questions />} />

				<Route path='/score' element={<FinalPage />} />
			</Routes>

    </Box>
      
    </Container>
		</Router>
	);
}

export default App;

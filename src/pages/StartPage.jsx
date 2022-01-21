import { Button, CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import useAxios from '../hooks/useAxios';

const StartPage = () => {
	const { response, error, loading } = useAxios({ url: 'api_category.php' });
	const navigate = useNavigate();

	if (loading) {
		return (
			<Box mt={25}>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box>
				<Typography mt={25} color='error' variant='h5' fontWeight='bold'>
					Something went wrong!
				</Typography>
			</Box>
		);
	}

	const difficultyOptions = [
		{ id: 'easy', name: 'Easy' },
		{ id: 'medium', name: 'Medium' },
		{ id: 'hard', name: 'Hard' },
	];

	const typeOptions = [
		{ id: 'multiple', name: 'Multiple Choise' },
		{ id: 'boolean', name: 'True / False' },
	];

	const handleSubmit = e => {
		e.preventDefault();
		navigate('questions');
	};

	return (
		<div>
			<Typography variant='h2' fontWeight='bold'>
				Quiz App
			</Typography>
			<form onSubmit={handleSubmit}>
				<SelectField options={response.trivia_categories} label={'Category'} />
				<SelectField options={difficultyOptions} label={'Difficulty'} />
				<SelectField options={typeOptions} label={'Type'} />
				<InputField />
				<Box mt={3}>
					<Button fullWidth variant='contained' type='submit'>
						Get Started
					</Button>
				</Box>
			</form>
		</div>
	);
};

export default StartPage;

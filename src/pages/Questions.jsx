import { Button, CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { decode } from 'html-entities';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { changeNumberAC, changeScoreAC } from '../redux/actions';
import './Questions.css';

const Questions = () => {
	const {
		question_category,
		question_difficulty,
		question_type,
		number_of_questions,
		score,
	} = useSelector(state => state);

	const [questionIndex, setQuestionIndex] = useState(0);
	const [answers, setAnswers] = useState([]);
	const [selected, setSelected] = useState();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	function getRandomNumber(num) {
		return Math.floor(Math.random() * Math.floor(num));
	}

	let apiUrl = `api.php?amount=${number_of_questions}`;

	if (question_category) {
		apiUrl += `&category=${question_category}`;
	}
	if (question_difficulty) {
		apiUrl += `&difficulty=${question_difficulty}`;
	}
	if (question_type) {
		apiUrl += `&type=${question_type}`;
	}

	const { response, loading } = useAxios({ url: apiUrl });

	const questions = response?.results[questionIndex];

	useEffect(() => {
		if (response?.results.length) {
			const allAnswers = [...questions.incorrect_answers];
			allAnswers.splice(
				getRandomNumber(allAnswers.length+1),
				0,
				questions.correct_answer
			);
			setAnswers(allAnswers);
		}
	}, [response, questionIndex]);

	if (loading) {
		return (
			<Box mt={25}>
				<CircularProgress />
			</Box>
		);
	}

	const handleOnclickAnswer = el => {
		setSelected(el);
		if (el === questions.correct_answer) {
			dispatch(changeScoreAC(score + 1));
		}
	};

	const handleQuit = () => {
		navigate('/');
		setQuestionIndex(0);
		setAnswers([]);
		dispatch(changeScoreAC(0))
		dispatch(changeNumberAC(5))
	};

	const handleNext = () => {
		if (selected && questionIndex + 1 < response.results.length) {
			setQuestionIndex(questionIndex + 1);
			setSelected()
		} else if (!selected) {
			// alert('Select an answer')
		return
		}
			else {
			navigate('/score');
		}
	};

	const handleColor = answer => {
		if (
			selected === answer &&
			selected === response.results[questionIndex].correct_answer
		) {
			return 'success';
		} else if (
			selected === answer &&
			selected !== response.results[questionIndex].correct_answer
		) {
			return 'error';
		} else if (answer === response.results[questionIndex].correct_answer) {
			return 'success';
		} else return 'info'
		
	};

	return (
		<Box>
			<Typography variant='h5' fontWeight='bold'>
				Question {questionIndex + 1}
			</Typography>
			<Box mt={3}>
				<Typography fontWeight='bold'>
					Score: {score} / {response.results.length}
				</Typography>
			</Box>
			<Typography mt={3}>
				{decode(response.results[questionIndex].question)}
			</Typography>
			{answers.map((answer, index) => (
				<Box mt={2} key={index}>
					<Button
						id='ok'
						variant='contained'
						fullWidth
						onClick={() => handleOnclickAnswer(answer)}
						color={`${selected ? handleColor(answer) : 'primary'}`}
					>
						{decode(answer)}
					</Button>
				</Box>
			))}
			<div className='controlButtons'>
				<Button
					onClick={handleQuit}
					color='secondary'
					variant='contained'
					style={{ width: 170 }}
				>
					Quit
				</Button>
				<Button
					onClick={handleNext}
					color='warning'
					variant='contained'
					style={{ width: 170 }}
				>
					{questionIndex + 1 < response.results.length
						? 'Next question'
						: 'Submit'}
				</Button>
			</div>
		</Box>
	);
};

export default Questions;

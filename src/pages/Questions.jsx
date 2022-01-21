import { Button, CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { decode } from 'html-entities';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { changeScoreAC } from '../redux/actions';

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

	useEffect(() => {
		if (response?.results.length) {
			const questions = response.results[questionIndex];
			const allAnswers = [...questions.incorrect_answers];
			allAnswers.splice(
				getRandomNumber(questions.length),
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

	const handleOnclickAnswer = e => {
		const questions = response.results[questionIndex];
		if (e.target.textContent === questions.correct_answer) {
			dispatch(changeScoreAC(score + 1));
		}

		if (questionIndex + 1 < response.results.length) {
			setQuestionIndex(questionIndex + 1);
		} else {
			navigate('/score');
		}
	};

	return (
		<Box>
			<Typography variant='h5' fontWeight='bold'>
				Question {questionIndex + 1}
			</Typography>
			<Typography mt={5}>
				{decode(response.results[questionIndex].question)}
			</Typography>
			{answers.map((answer, index) => (
				<Box mt={2} key={index}>
					<Button variant='contained' fullWidth onClick={handleOnclickAnswer}>
						{decode(answer)}
					</Button>
				</Box>
			))}
			<Box mt={5}>
				<Typography fontWeight='bold'>
					Score: {score} / {response.results.length}
				</Typography>
			</Box>
		</Box>
	);
};

export default Questions;

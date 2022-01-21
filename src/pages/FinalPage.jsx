import { Button, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { changeNumberAC, changeScoreAC } from "../redux/actions"


const FinalPage = () => {
	const {score} = useSelector(state => state)
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleBack = () => {
		dispatch(changeScoreAC(0))
		dispatch(changeNumberAC(5))
		navigate('/')
	}

	return (
		<Box mt={15}>
			<Typography variant="h3" fontWeight='bold' mb={5} >Final Score: {score}</Typography>
			<Button variant='outlined' onClick={handleBack}>Back to Start!</Button>
		</Box>
	)
}

export default FinalPage

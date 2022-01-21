import { FormControl, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch } from 'react-redux';
import { changeNumberAC } from '../redux/actions';

const InputField = () => {
	const dispatch = useDispatch();

	const handleChange = e => {
		e.preventDefault();
		dispatch(changeNumberAC(e.target.value));
	};

	return (
		<Box mt={3}>
			<FormControl fullWidth>
				<TextField
					variant='outlined'
					label='Number of Questions'
					onChange={handleChange}
					type='number'
					size='small'
				/>
			</FormControl>
		</Box>
	);
};

export default InputField;

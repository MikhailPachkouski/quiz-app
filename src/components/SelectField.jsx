import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeCategoryAC, changeDifficultyAC, changeTypeAC } from '../redux/actions';

const SelectField = ({label, options}) => {
	const dispatch = useDispatch()
	const [value, setValue] = useState('')

const handleChange = (e) => {
	setValue(e.target.value)
	switch (label) {
		case 'Category':
			dispatch(changeCategoryAC(e.target.value))
			break;
	
		case 'Difficulty':
			dispatch(changeDifficultyAC(e.target.value))
			break;
	
		case 'Type':
			dispatch(changeTypeAC(e.target.value))
			break;
	
		default:
			break;
	}
}

	return (
		<Box width='100%' mt={3}>
			<FormControl fullWidth size='small'>
			<InputLabel>{label}</InputLabel>
				<Select value={value} label={label} onChange={handleChange}>
				{options.map(el => 
					<MenuItem value={el.id} key={el.id}>{el.name}</MenuItem>
				)}
				</Select>
			</FormControl>
		</Box>
	);
};

export default SelectField;

import React from 'react';
import Button from '@mui/material/Button';

const PrimaryButton = ({ name }: { name: string }) => {
	return (
		<Button
			className='bg-blue-400 border hover:bg-blue-600 active:bg-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-200'
			variant='contained'
			type='submit'
		>
			{name}
		</Button>
	);
};

export default PrimaryButton;

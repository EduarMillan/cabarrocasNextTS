import React from 'react';
import Button from '@mui/material/Button';

/**
 * Renders a secondary button component with the given name.
 *
 * @param {string} name - The name to be displayed on the button.
 * @return {JSX.Element} - The rendered secondary button component.
 */
const SecondaryButton = ({ name }: { name: string }) => {
	return (
		<Button
			className='bg-green-400 border hover:bg-blue-600 active:bg-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-200'
			variant='contained'
		>
			{name}
		</Button>
	);
};

export default SecondaryButton;

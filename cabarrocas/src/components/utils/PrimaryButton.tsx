import React from 'react';
import Button from '@mui/material/Button';

/**
 * Renders a primary button component with the specified name.
 *
 * @param {string} name - The name to be displayed on the button.
 * @return {JSX.Element} - The primary button component.
 */
function PrimaryButton({ name }: { name: string }) {
	return (
		<Button
			className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			type='submit'
		>
			{name}
		</Button>
	);
}

export default PrimaryButton;

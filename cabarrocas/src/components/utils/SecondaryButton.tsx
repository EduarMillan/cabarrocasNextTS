import React from 'react';
import Button from '@mui/material/Button';

type SecondaryButtonProps = {
	name: string;
	onClick?: () => void;
};

/**
 * Renders a secondary button component with the given name.
 *
 * @param {SecondaryButtonProps} props - The props for the SecondaryButton.
 * @return {JSX.Element} - The rendered secondary button component.
 */
const SecondaryButton: React.FC<SecondaryButtonProps> = ({ name, onClick }) => {
	return (
		<Button
			className='bg-green-400 border hover:bg-blue-600 active:bg-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-200'
			variant='contained'
			onClick={onClick}
		>
			{name}
		</Button>
	);
};

export default SecondaryButton;

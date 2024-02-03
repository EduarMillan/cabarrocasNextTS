import React from 'react';
import Button from '@mui/material/Button';

type PrimaryButtonProps = {
	name: string;
	onClick?: () => void;
};

/**
 * Renders a secondary button component with the given name.
 *
 * @param {PrimaryButtonProps} props - The props for the SecondaryButton.
 * @return {JSX.Element} - The rendered secondary button component.
 */
const PrimaryButton: React.FC<PrimaryButtonProps> = ({ name, onClick }) => {
	return (
		<Button
			className='bg-blue-500 borderhover:bg-blue-700  active:bg-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-200'
			type='submit'
			variant='contained'
			onClick={onClick}
		>
			{name}
		</Button>
	);
};

export default PrimaryButton;

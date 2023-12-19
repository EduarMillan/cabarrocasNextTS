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
			className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			type='submit'
			variant='contained'
			onClick={onClick}
		>
			{name}
		</Button>
	);
};

export default PrimaryButton;

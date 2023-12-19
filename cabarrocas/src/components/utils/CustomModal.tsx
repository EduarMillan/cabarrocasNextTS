import * as React from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';

type modalTypes = {
	open: boolean;
	children: React.ReactNode;
	width: DialogProps['maxWidth'];
};

export default function CustomModal(props: modalTypes) {
	const paperStyle = {
		backgroundColor: '#EAECEE',
	};

	return (
		<React.Fragment>
			<Dialog
				open={props.open}
				maxWidth={props.width}
				PaperProps={{ style: paperStyle }}
			>
				{props.children}
			</Dialog>
		</React.Fragment>
	);
}

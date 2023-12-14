/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
import React from 'react';
//import styles from './style.module.css';

// eslint-disable-next-line import/prefer-default-export
export const withError = Component => {
	class ErrorComponent extends React.Component {
		state = {
			hasError: false,
			message: '',
		};

		componentDidCatch(error) {
			this.setState({
				hasError: true,
				message: error.message,
			});
		}

		retry = () => {
			this.setState({ hasError: false, message: '' });
		};

		render() {
			if (this.state.hasError) {
				return (
					<div>
						{this.state.message}
						<button onClick={this.retry}>Retry</button>
					</div>
				);
			}
			// eslint-disable-next-line react/jsx-props-no-spreading
			return <Component {...this.props} />;
		}
	}
	ErrorComponent.displayName = `withError(${
		Component.displayName || Component.name
	})`;
	return ErrorComponent;
};

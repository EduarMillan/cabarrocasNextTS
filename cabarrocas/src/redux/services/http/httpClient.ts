import { useState } from 'react';

import axios from 'axios';
import Error from 'next/error';
import { ErrorHandler } from 'next/dist/server/app-render/create-error-handler';

/**
 * CustomHook para realizar peticiones http.
 *
 * @returns Funciones http.
 */

const useHttpClient = () => {
	const [error, setError] = useState(null);

	const handleError = err => {
		let message = 'Ocurrió un error desconocido';

		if (err.response) {
			const { data } = err.response;
			message = data.message || err.response.statusText;
		} else if (err.request) {
			message = 'El servidor no respondió a la solicitud';
		} else {
			message = err.message;
		}

		setError(message);
		throw err;
	};

	const get = async route => {
		try {
			const response = await axios.get(route, {
				baseURL: 'http://localhost:3000/api',
				headers: {
					// Authorization: `Bearer ${getToken()}`,
				},
			});
			return response;
		} catch (err) {
			handleError(err);
			return err;
		}
	};

	const post = async (route, data) => {
		try {
			const response = await axios.post(route, data, {
				baseURL: 'http://localhost:3000/api',
				headers: {
					// Authorization: `Bearer ${getToken()}`
				},
			});

			return response;
		} catch (err) {
			handleError(err);
			return err;
		}
	};

	const put = async (route, data) => {
		try {
			const response = await axios.put(route, data, {
				baseURL: 'http://localhost:3000/api',
				headers: {
					// Authorization: `Bearer ${getToken()}`
				},
			});

			return response;
		} catch (err) {
			handleError(err);
			return err;
		}
	};

	const patch = async (route, data) => {
		try {
			const response = await axios.patch(route, data, {
				baseURL: 'http://localhost:3000/api',
				headers: {
					// Authorization: `Bearer ${getToken()}`
				},
			});

			return response;
		} catch (err) {
			handleError(err);
			return err;
		}
	};

	const del = async route => {
		try {
			const response = await axios.delete(route, {
				baseURL: 'http://localhost:3000/api',
				// headers: {
				//   // Authorization: `Bearer ${getToken()}`
				// },
			});
			return response;
		} catch (err) {
			handleError(err);
			return err;
		}
	};

	return {
		get,
		post,
		put,
		patch,
		del,
		error,
	};
};

export default useHttpClient;

import axios from 'axios';

export default async function isTokenValid(token) {
	const options = {
		headers: {
		Authorization: `Bearer ${token}`
		}
	}

	try {
		const user = await axios.get(`/user`, options)

		if (user) {
			return true
		}

		console.error('Token invalid, please login again.')
		return false
	} catch (e) {
		console.error('There was an error when trying to verify your user. ' + e.message);
	}
}
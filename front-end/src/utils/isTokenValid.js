import axios from 'axios';

export default function isTokenValid(token) {
	if (token) {
		try {
			axios
				.get(`/user`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				.then((res) => {
					if (res.status === 200) {
						return true;
					} else {
						console.error('Token invalid, please login again.')
						return false;
					}
				});
		} catch (e) {
			console.error('There was an error when trying to verify your user. ' + e.message);
		}
	} else {
		console.error('Token invalid, please login again.')
		return false;
	}
}
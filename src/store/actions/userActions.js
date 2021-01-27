import axios from 'axios';

export const register = (user) => dispatch => {
	// fetch profile picture
	const imageIx = Math.floor(Math.random() * 1000)
	axios.get(`https://picsum.photos/id/${imageIx}/info`)
		.then(res => {
			const imgUrl = res.data.download_url;
			const newUser = {
				...user,
				image: imgUrl
			}
			// Dispatch Register action
			dispatch({
				type: 'REGISTER',
				payload: newUser
			})
		})
		.catch(err => {
			alert("Random image generator couldn't find an image at " + `https://picsum.photos/id/${imageIx}/info` + "; Please register again.");
			console.log(err)
		})
}

export const login = (user, rememberMe) => dispatch => {
	// Dispatch login action
	dispatch({
		type: 'LOGIN',
		payload: {user, rememberMe}
	})
	return Promise.resolve();
}

export const logout = () => dispatch => {
	// Dispatch Logout action
	dispatch({
		type: 'LOGOUT',
	})
	return Promise.resolve();
}
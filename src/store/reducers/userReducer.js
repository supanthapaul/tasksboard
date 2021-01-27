
const INITIAL_STATE = {
	user: JSON.parse(localStorage.getItem("user")) || null,
	users: JSON.parse(localStorage.getItem("users")) || []
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'REGISTER':
			// TODO: validate for unique email
			// append new user to local storage
			localStorage.setItem("users", JSON.stringify([...state.users, action.payload]))
			// add to state
			return {
				...state,
		 		users: [...state.users, action.payload]
			}
		case 'LOGIN':
			if(action.payload.rememberMe) {
				// save credentials
				localStorage.setItem("user",JSON.stringify(action.payload.user))
			}
			return {
				...state,
		 		user: action.payload.user
			}
		case 'LOGOUT':
			// remove logged in user from local storage
			localStorage.removeItem("user");
			// remove logged in user from state
			return {
				...state,
		 		user: null
			}
		default:
			return state
	}
}
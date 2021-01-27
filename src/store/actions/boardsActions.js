export const addBoard = (boardName) => dispatch => {
	dispatch({
		type: 'ADD_BOARD',
		payload: boardName
	})
	return Promise.resolve();
}

export const deleteBoard = (boardId) => dispatch => {
	dispatch({
		type: 'DELETE_BOARD',
		payload: boardId
	})
	return Promise.resolve();
}
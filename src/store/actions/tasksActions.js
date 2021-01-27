export const addTask = (boardId, title) => dispatch => {
	dispatch({
		type: 'ADD_TASK',
		payload: {boardId, title}
	})
	return Promise.resolve();
}

export const deleteTask = (taskId) => dispatch => {
	dispatch({
		type: 'DELETE_TASK',
		payload: {taskId}
	})
	return Promise.resolve();
}

export const editTask = (taskId, editedTask) => dispatch => {
	dispatch({
		type: 'EDIT_TASK',
		payload: {taskId, editedTask}
	})
	return Promise.resolve();
}

export const setCompleteTask = (taskId, completed) => dispatch => {
	dispatch({
		type: 'COMPLETE_TASK',
		payload: {taskId, completed}
	})
	return Promise.resolve();
}
export const moveTaskToBoard = (taskId, boardId) => dispatch => {
	dispatch({
		type: 'MOVE_TASK_TO_BOARD',
		payload: {taskId, boardId}
	})
	return Promise.resolve();
}
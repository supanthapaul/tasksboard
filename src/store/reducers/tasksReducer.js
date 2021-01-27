import uuid from 'react-uuid';

// {
// 	id: uuid(),
// 	boardId: uuid(),
// 	title: string,
// 	description: string,
// 	date: Date
// 	completed: boolean
// }
const INITIAL_STATE = []

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'ADD_TASK':
			const newTask = {
				id: uuid(),
				boardId: action.payload.boardId,
				title: action.payload.title,
				description: "",
				date: new Date(),
				completed: false
			}
			return [...state, newTask];
		case 'EDIT_TASK':
			return state.map(task => {
				if(task.id == action.payload.taskId) {
					return action.payload.editedTask;
				}
				return task;
			})
		case 'DELETE_TASK':
			return state.filter(task => {
				return task.id != action.payload.taskId;
			})
		case 'COMPLETE_TASK':
			return state.map(task => {
				if(task.id == action.payload.taskId) {
					return {
						...task,
						completed: action.payload.completed
					}
				}
				return task;
			})
		case 'MOVE_TASK_TO_BOARD':
			return state.map(task => {
				if(task.id == action.payload.taskId) {
					return {
						...task,
						boardId: action.payload.boardId
					}
				}
				return task;
			})
		default:
			return state;
	}
}
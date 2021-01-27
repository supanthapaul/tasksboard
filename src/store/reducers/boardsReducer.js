import uuid from 'react-uuid';

const INITIAL_STATE = [
	{
		id: uuid(),
		name: "My Tasks"
	}
]

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'ADD_BOARD':
			const newBoard = {
				id: uuid(),
				name: action.payload
			}
			return [...state, newBoard];
		case 'DELETE_BOARD':
			let newBoards = state;
			for (let i = 0; i < newBoards.length; i++) {
				if(newBoards[i].id == action.payload) {
					return [
						...state.slice(0, i),
						...state.slice(i + 1)
					]
				}
			}

		default:
			return state;
	}
}
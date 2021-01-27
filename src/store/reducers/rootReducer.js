import { combineReducers } from 'redux';
import userReducer from './userReducer';
import boardsReducer from './boardsReducer';
import tasksReducer from './tasksReducer';

export default combineReducers({
	auth: userReducer,
	boards: boardsReducer,
	tasks: tasksReducer
});
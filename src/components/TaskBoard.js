import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import Task from './Task';
import { deleteBoard } from '../store/actions/boardsActions';
import { addTask } from '../store/actions/tasksActions';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
});

const TaskBoard = ({ board, deleteBoard, tasks, addTask }) => {
	const classes = useStyles();
	const [newTask, setNewTask] = useState('');

	const onAddTask = (e) => {
		e.preventDefault();
		if(newTask.trim() == "")
			return;
		addTask(board.id, newTask);
		setNewTask("");
	}

	return (
		<Card className={classes.root}>
			<CardContent>
				<CardHeader
					action={
						<IconButton aria-label="settings" onClick={e => deleteBoard(board.id)}>
							<DeleteIcon />
						</IconButton>
					}
					title={board.name}
				/>
				<form onSubmit={e => onAddTask(e)}>
					<TextField
						margin="dense"
						id="name"
						placeholder="New task"
						fullWidth
						variant="outlined"
						autoComplete="off"
						value={newTask}
						onChange={e => setNewTask(e.target.value)}
					/>
				</form>

				<List className={classes.root}>
					{
						tasks.map(task => {
							if (task.boardId == board.id) {
								return (
									<Task task={task} key={task.id} />
								)
							}
						})
					}
					<Divider variant="inset" component="li" />
				</List>
			</CardContent>
		</Card>
	)
}
const mapStateToProps = state => ({
	tasks: state.tasks
})

const mapDispatchToProps = dispatch => ({
	deleteBoard: (boardId) => dispatch(deleteBoard(boardId)),
	addTask: (boardId, title) => dispatch(addTask(boardId, title)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskBoard);
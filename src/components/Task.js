import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import "react-datepicker/dist/react-datepicker.css";

import { setCompleteTask, deleteTask, editTask, moveTaskToBoard } from '../store/actions/tasksActions';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
});

const TaskBoard = (props) => {
	const classes = useStyles();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [task, setTask] = useState(props.task)

	// re-set task if the task prop changes from outside
	useEffect(() => {
		setTask(props.task);
	}, [props.task]);

	const onEditTask = (e) => {
		props.editTask(props.task.id, task);
		handleDialogClose();
	}
	const onDeleteTask = (e) => {
		props.deleteTask(props.task.id);
		handleDialogClose();
	}
	const onMoveTaskToBoard = (boardId) => {
		props.moveTaskToBoard(props.task.id, boardId);
		handleDialogClose();
	}

	const handleDialogClose = (e) => {
		setDialogOpen(false);
	}

	return (
		<>
			<ListItem alignItems="flex-start">
				<ListItemAvatar>
					<Checkbox
						checked={props.task.completed}
						onChange={e => props.setCompleteTask(props.task.id, e.target.checked)}
					/>
				</ListItemAvatar>
				<ListItemText
					primary={props.task.title}
					secondary={
						<React.Fragment>
							<Typography
								component="span"
								variant="body2"
								className={classes.inline}
								color="textPrimary"
							>
								{props.task.date.toLocaleDateString('en-IN', {
									day: 'numeric', month: 'short', year: 'numeric'
								}).replace(/ /g, '/')}
							</Typography>
							{props.task.description ? " — " + props.task.description : ""}
						</React.Fragment>
					}
				/>
				<ListItemSecondaryAction>
					<IconButton edge="end" aria-label="delete" onClick={e => setDialogOpen(true)}>
						<EditIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>

			<Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
				<DialogContent>
					<TextField
						margin="dense"
						id="name"
						placeholder="Title"
						fullWidth
						autoComplete="off"
						value={task.title}
						onChange={e => setTask({ ...task, title: e.target.value })}
					/>
					<TextField
						margin="dense"
						id="name"
						placeholder="Description"
						fullWidth
						autoComplete="off"
						multiline
						rowsMax={4}
						value={task.description}
						onChange={e => setTask({ ...task, description: e.target.value })}
					/>
					<TextField
						label="Task date"
						type="date"
						fullWidth
						value={JSON.stringify(task.date).slice(1, 11)}
						onChange={e => setTask({ ...task, date: new Date(e.target.value) })}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<br />
					<br />
					<Typography
						variant="h6"
						className={classes.inline}
						color="textPrimary"
					>
						Move to different board
							</Typography>
					{
						props.boards.map(board => (
							<div key={board.id}>
							<Button key={board.id} onClick={e => onMoveTaskToBoard(board.id)} color="primary">
								{board.name}
							</Button>
							<br /></div>
						))
					}
				</DialogContent>
				<DialogActions>
					<Button onClick={onDeleteTask} color="secondary">
						Delete
					</Button>
					<Button onClick={onEditTask} color="primary">
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</>

	)
}
const mapStateToProps = state => ({
	boards: state.boards
})

const mapDispatchToProps = dispatch => ({
	setCompleteTask: (taskId, completed) => dispatch(setCompleteTask(taskId, completed)),
	editTask: (taskId, editedTask) => dispatch(editTask(taskId, editedTask)),
	deleteTask: (taskId) => dispatch(deleteTask(taskId)),
	moveTaskToBoard: (taskId, boardId) => dispatch(moveTaskToBoard(taskId, boardId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskBoard);
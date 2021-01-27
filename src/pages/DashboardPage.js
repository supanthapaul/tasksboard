import { useState } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { addBoard } from '../store/actions/boardsActions';
import TaskBoard from '../components/TaskBoard';

const useStyles = makeStyles((theme) => ({
	flexCenter: {
		display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
	},
	fab: {
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  }
}));

const DashboardPage = (props) => {
	const classes = useStyles();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [boardName, setBoardName] = useState('');

	const handleDialogClose = () => {
    setDialogOpen(false);
	};
	const onAddBoard = (e) => {
		e.preventDefault();
		if(boardName.trim() === "")
			return;
		props.addBoard(boardName);
		setBoardName('');
		handleDialogClose();
	}
	return (
		<div>
			{
				props.authState.user ?
				<>
					<Typography variant="h3">Welcome, {props.authState.user.name}!</Typography>
					<Typography variant="h5">What do you want to accomplish today?</Typography>
				</>:
					<></>
			}
			{/* All boards created by user */}
			<Grid container spacing={2} >
				{
					props.boards.map(board => (
						<Grid item xs={12} sm={4} lg={3} key={board.id}>
							<TaskBoard board={board} />
						</Grid>
					))
				}
			</Grid>
			{/* New board creation dialog */}
			<Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a new board</DialogTitle>
        <DialogContent>
					<form onSubmit={onAddBoard}>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							placeholder="New list"
							fullWidth
							autoComplete="off"
							value={boardName}
							onChange={e => setBoardName(e.target.value)}
						/>
					</form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onAddBoard} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
			{/* New board creation floating action button */}
			<Fab color="primary" aria-label="add"
				className={classes.fab}
				onClick={e => setDialogOpen(true)}>
				<AddIcon />
			</Fab>
		</div>
	);
}

const mapStateToProps = state => ({
	authState: state.auth,
	boards: state.boards
})

const mapDispatchToProps = dispatch => ({
	addBoard: (boardName) => dispatch(addBoard(boardName))
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);

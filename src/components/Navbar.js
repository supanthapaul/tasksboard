import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { logout } from '../store/actions/userActions';
import * as ROUTES from '../constants/routes';

const useStyles = makeStyles((theme) => ({
  root: {
		flexGrow: 1,
		marginBottom: theme.spacing(10)
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = ({authState, logoutUser}) => {
	const classes = useStyles();
	const history = useHistory();

	const logout = (e) => {
		// logout and redirect to home
		logoutUser().then(() => {
			history.push('/');
		})
	}
  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            TasksBoard
          </Typography>
					{
						authState.user ?
						<>
							<Avatar alt={authState.user.name} src={authState.user.image} />
							<Button color="inherit" onClick={logoutUser} >Logout</Button>
						</> :
						<>
							<Button color="inherit" component={RouterLink} to={ROUTES.LOGIN}>Login</Button>
							<Button color="inherit" component={RouterLink} to={ROUTES.SIGNUP}>Signup</Button>
						</>
					}

        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = state => ({
	authState: state.auth
})

const mapDispatchToProps = dispatch => ({
	logoutUser: () => dispatch(logout())
 })

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
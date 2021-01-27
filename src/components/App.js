import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from '../components/Navbar';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import DashboardPage from '../pages/DashboardPage';
import PrivateRoute from './PrivateRoute';
import * as ROUTES from '../constants/routes';
import { logout } from '../store/actions/userActions';

const useStyles = makeStyles((theme) => ({
	flexCenter: {
		display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'
	}
}));

const App = (props) => {
	const classes = useStyles();

	return (
		<Router >
			<Navbar />

			<Route exact path={ROUTES.LOGIN} component={LoginPage} />
			<Route exact path={ROUTES.SIGNUP} component={SignupPage} />
      <PrivateRoute path={ROUTES.DASHBOARD} component={DashboardPage} />
		</Router>
	);
}

const mapStateToProps = state => ({
	...state
 })

const mapDispatchToProps = dispatch => ({
	registerUser: (user) => dispatch(logout(user))
 })

export default connect(mapStateToProps, mapDispatchToProps)(App);

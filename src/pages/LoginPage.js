import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { login } from '../store/actions/userActions';
import { logout } from '../store/actions/userActions';

const useStyles = makeStyles((theme) => ({
	pageRoot: {
		marginTop: '25vh',
		display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
	},
	link: {
		color: '#1976d2',
		textDecoration: 'none',
		'&:visited' : {
			color: '#1976d2'
		}
	},
	flexCenter: {
		display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
	},
	input: {
		marginBottom: theme.spacing(1),
		width:'400px'
	}
}));

const LoginPage = (props) => {
	const classes = useStyles();
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);

	const onFormSubmit = (e) => {
		e.preventDefault();
		const credentials = {
			email, password
		}

		// loop through registered users and check credentials
		props.authState.users.forEach(user => {
			if (credentials.email === user.email && credentials.password === user.password) {
				// correct credentials
				props.loginUser(user, rememberMe).then(() => {
					// redirect to dashboard
					history.push('/dashboard');
				})
			}
		})
	}

	useEffect(() => {
		if(props.authState.user) {
			// redirect to dashboard if user is already logged in
			history.push('/dashboard');
		}
	}, [])
	return (
		<div className={classes.pageRoot}>
			<Typography variant="h3">Welcome!</Typography>
			<Typography variant="h5">Log in to see your boards.</Typography>
			<br />
			<form noValidate autoComplete="off" onSubmit={onFormSubmit} className={classes.flexCenter}>
				<TextField id="email" name="email"
					className={classes.input}
					value={email}
					onChange={e => setEmail(e.target.value)}
					type="email" label="Email Address" variant="outlined" />
				<TextField id="password" name="password"
					className={classes.input}
					value={password}
					onChange={e => setPassword(e.target.value)}
					type="password" label="Password" variant="outlined" />
				<FormControlLabel
					control={
						<Checkbox
							checked={rememberMe}
							onChange={(e) => setRememberMe(e.target.checked)}
							name="rememberMe"
							color="primary"
						/>
					}
					label="Remember me"
				/>
				<Typography>
				<RouterLink className={classes.link} to="/register" >Don't have an account?</RouterLink>
				</Typography>
				<Button variant="contained" color="primary" type="submit" className={classes.input}>
					Login
    			</Button>
			</form>
		</div>
	);
}

const mapStateToProps = state => ({
	authState: state.auth
})

const mapDispatchToProps = dispatch => ({
	loginUser: (user, rememberMe) => dispatch(login(user, rememberMe)),
	logoutUser: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

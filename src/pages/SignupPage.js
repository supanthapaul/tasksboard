import { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import {  register } from '../store/actions/userActions';

const useStyles = makeStyles((theme) => ({
	pageRoot: {
		marginTop: '25vh',
		display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
	},
	flexCenter: {
		display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'
	},
	link: {
		color: '#1976d2',
		textDecoration: 'none',
		'&:visited' : {
			color: '#1976d2'
		}
	},
	input: {
		marginBottom: theme.spacing(1),
		width:'400px'
	}
}));

const SignupPage = (props) => {
	const classes = useStyles();
	const history = useHistory();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onFormSubmit = (e) => {
		e.preventDefault();
		const user = {
			name, email, password
		}
		props.registerUser(user);
		history.push('/');
	}
	return (
		<div className={classes.pageRoot}>
			<Typography variant="h3">Sign up!</Typography>
			<Typography variant="h5">Sign up to access the platform.</Typography>
			<br />
			<form autoComplete="off" onSubmit={onFormSubmit} className={classes.flexCenter}>
					<TextField id="name" name="name"
						className={classes.input}
						value={name}
						onChange={e => setName(e.target.value)}
						required label="Name" variant="outlined" />
					<TextField id="email" name="email"
						className={classes.input}
						value={email}
						onChange={e => setEmail(e.target.value)}
						required type="email" label="Email Address" variant="outlined" />
					<TextField id="password" name="password"
						className={classes.input}
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
						type="password" label="Password" variant="outlined" />
					<Typography>
				<RouterLink className={classes.link} to="/" >Already have an account?</RouterLink>
				</Typography>
					<Button variant="contained" color="primary" type="submit" className={classes.input}>
						Sign Up
    			</Button>
			</form>
		</div>
	);
}

const mapStateToProps = state => ({
	...state
 })

const mapDispatchToProps = dispatch => ({
	registerUser: (user) => dispatch(register(user))
 })

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);

import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
	component: Component,
	...rest
}) => {
	// we are authenticated if the 'user' state is not null
	const isAuthenticated = rest.user ? true : false;
	return (
		<Route {...rest} component={(props) => (
			isAuthenticated ? (
				<div>
					<Component {...props} />
				</div>
			) : (
					<Redirect to="/" />
				)
		)} />
	)
}
const mapStateToProps = state => ({
	user: state.auth.user
 })

export default connect(mapStateToProps)(PrivateRoute);
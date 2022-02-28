import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from 'tt-frontend-pages/Authentication/Login';
import Register from 'tt-frontend-pages/Authentication/Register';
import ForgotPassword from 'tt-frontend-pages/Authentication/ForgotPassword';
import ResetPassword from 'tt-frontend-pages/Authentication/ResetPassword';
import Board from 'tt-frontend-pages/Board/Board';
import {isLoggedIn} from 'tt-frontend-utils/Service'

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
		isLoggedIn() ? (
			<Route {...rest}  render={ props => (<Component {...props} />)} />
		) :
			<Redirect to={{
				pathname: '/login',
			}} />

	)} />
)

const PublicRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
		!isLoggedIn() ? (
			<Component {...props} />
		) :
			<Redirect to={{
				pathname: '/board',
			}} />

	)} />
)

const Routes = () => {
  return (
    <Switch>
      <PublicRoute path={"/login"} component={Login} exact />
      <PublicRoute path={"/register"} component={Register} exact />
      <PublicRoute path={"/forgot-password"} component={ForgotPassword} exact />
      <PublicRoute path={"/reset-password"} component={ResetPassword} exact />
      <PrivateRoute path={"/board"} component={Board} exact />

      <Route path="/" render={() => <Redirect to={'/login'} />} exact />
    </Switch>
  );
};

export default Routes;

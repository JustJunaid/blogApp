import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Preferences } from './containers/preferences/preferences'

const Routing = () => (
	<BrowserRouter>
		<Switch>
			<Route
				exact
				path="/"
				render={props => (
					<Redirect {...props} to={{ pathname: '/preferences' }} />
				)}
			/>
			<Route exact path="/preferences" component={Preferences} />
			<Route
				path="/*"
				render={props => <Redirect {...props} to={{ pathname: '/config' }} />}
			/>
		</Switch>
	</BrowserRouter>
)

export default Routing
